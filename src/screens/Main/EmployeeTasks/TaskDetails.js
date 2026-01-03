import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';

import {useSelector} from 'react-redux';
import fonts from '../../../assets/fonts';
import CustomButton from '../../../components/CustomButton';
import CustomText from '../../../components/CustomText';
import Header from '../../../components/Header';
import ScreenWrapper from '../../../components/ScreenWrapper';
import {get, post, put} from '../../../Services/ApiRequest';
import {COLORS} from '../../../utils/COLORS';
import constants from '../../../utils/constants';
import {ToastMessage} from '../../../utils/ToastMessage';
import LateModal from './molecules/LateModal';
import ShareModal from './molecules/ShareModal';
import TaskDetailer from './molecules/TaskDetailer';
import TaskSummary from './molecules/TaskSummary';
import BreakModal from './molecules/BreakModal';

const TaskDetails = () => {
  const {params} = useRoute();
  const intervalRef = useRef(null);

  const {userData} = useSelector(state => state?.users);
  const employeeId = useSelector(state => state?.authConfigs?.token);

  const task = params?.task;

  const adminId = userData?.createdBy?._id;

  const [timer, setTimer] = useState(0);
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(1);
  const [reason, setReason] = useState('');
  const [action, setAction] = useState('');
  const [distance, setDistance] = useState(0);
  const [loader, setLoader] = useState(false);
  const [breakVal, setBreakVal] = useState('');
  const [loading, setLoading] = useState(false);
  const [shareInfo, setShareInfo] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [timeSummary, setTimeSummary] = useState([]);
  const [pageLoader, setPageLoader] = useState(true);
  const [shareModal, setShareModal] = useState(false);
  const [breakModal, setBreakModal] = useState(false);
  const [modalLoader, setModalLoader] = useState(false);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      try {
        Geolocation.getCurrentPosition(
          position => resolve(position.coords),
          error => reject(error),
          {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0,
            forceRequestLocation: true,
            showLocationDialog: true,
          },
        );
      } catch (err) {
        console.error('Crash in location:', err);
        reject(err);
      }
    });
  };

  const requestLocationPermission = async () => {
    try {
      const permission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

      const result = await request(permission);

      if (result === RESULTS.GRANTED) {
        return true;
      } else if (result === RESULTS.BLOCKED) {
        ToastMessage(
          'Location permission is blocked. Please enable it in settings.',
        );
        return false;
      } else {
        ToastMessage('Please grant location permission to proceed');
        return false;
      }
    } catch (error) {
      console.log('Permission error:', error);
      ToastMessage('Error requesting location permission');
      return false;
    }
  };

  const getCurrentStatus = async () => {
    try {
      const url = `getCurrentStatus/${task?._id}?employeeId=${employeeId}`;

      const response = await get(url);

      if (response?.data?.data) {
        const status = response.data?.data?.currentStatus;

        if (status === 'punched_in') {
          setActive(2);
          setIsRunning(true);
          const punchInTime = response?.data?.data?.activePunchIn?.punchInTime;
          const elapsed = moment().diff(moment(punchInTime), 'seconds');
          setTimer(elapsed);
        } else {
          setActive(1);
          setIsRunning(false);
          setTimer(0);
        }
      }
    } catch (error) {
      ToastMessage(error?.response?.data?.message);
      console.log('Error getting current status:', error.response.data);
    }
  };

  const getTimeSummary = async () => {
    try {
      const body = {
        employeeId: employeeId,
        projectId: task?._id,
      };

      const response = await post('getTimeSummary', body);

      if (response?.data?.result) {
        const summary = response?.data?.data?.records;

        const formattedSummary = summary?.map(entry => ({
          id: entry?._id || Date.now(),
          date: moment(entry?.date).format('DD MMM'),
          timeIn: moment(entry?.punchInTime).format('HH:mm'),
          timeOut: entry?.punchOutTime
            ? moment(entry?.punchOutTime).format('HH:mm')
            : '--',
          punchStatus: entry?.punchStatus,
          totalHours: entry?.totalHours,
          shareSomething: entry?.shareSomething,
        }));
        setTimeSummary(formattedSummary);
      }
    } catch (error) {
      ToastMessage(error?.response?.data?.message);
      console.log('Error getting time summary:', error);
    }
  };

  const getPlaceName = async (latitude, longitude) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${constants.GOOGLE_API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'OK') {
        return data?.results[0]?.formatted_address;
      } else {
        console.error('Geocoding error:', data.status);
        return null;
      }
    } catch (error) {
      console.error('Error fetching geocode:', error);
      return null;
    }
  };

  const handleAdd = async (punchStatus, actionPunch) => {
    try {
      const userLocation = await getLocation();
      const place = await getPlaceName(
        userLocation?.latitude,
        userLocation?.longitude,
      );

      const actionToSend = actionPunch || action;

      let endDate = new Date();

      const apiData = {
        employeeId: employeeId,
        projectId: task?._id,
        location: {
          lat: userLocation.latitude,
          lng: userLocation.longitude,
          address: place || 'Not Found',
        },
        action: actionToSend,
        punchStatus: punchStatus,
      };

      if (punchStatus === 'red') {
        if (actionToSend === 'punch_in') {
          apiData.reasonLatePunchIn = reason?.trim();
        } else {
          apiData.reasonLatePunchOut = reason?.trim();
        }
      }

      if (actionToSend === 'punch_out' && breakVal) {
        apiData.breakTime = parseInt(breakVal);
        endDate = moment().add(parseInt(breakVal), 'minutes').toDate();
      }

      if (timeSummary?.length === 0 && !task?.startDate) {
        await put(`updateProject/${task?._id}`, {
          startDate: new Date().toISOString(),
          adminId: adminId,
        });
      }

      const response = await post('punchInOut', apiData);

      if (actionToSend === 'punch_out') {
        await put(`updateProject/${task?._id}`, {
          endDate: endDate.toISOString(),
          adminId: adminId,
        });
      }

      if (response?.data?.result) {
        fetchData();
        ToastMessage(
          `Successfully punched ${action === 'punch_in' ? 'in' : 'out'}!`,
        );

        setTimer(0);

        if (action === 'punch_in') {
          setIsRunning(true);
          setActive(2);
        } else {
          setIsRunning(false);
          setActive(1);
        }
      } else {
        ToastMessage(
          'Failed to punch ' + (action === 'punch_in' ? 'in' : 'out'),
        );
      }
      setReason('');
      setBreakVal('');
      setLoading(false);
      setShow(false);
      setModalLoader(false);
    } catch (error) {
      console.log(error.response?.data, 'in add');
      setLoading(false);
      setModalLoader(false);
    }
  };

  const handleBreakSelection = async selectedBreakVal => {
    try {
      setBreakVal(selectedBreakVal);
      setBreakModal(false);

      const userLocation = await getLocation();
      const dis = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        task?.location?.lat || 0,
        task?.location?.lng || 0,
      );

      setDistance(dis);

      if (Math.round(dis) > 100) {
        setShow(true);
        return;
      }

      handleAdd('green', 'punch_out');
    } catch (error) {
      console.error('Error in break selection:', error);
      setLoading(false);
    }
  };

  const handlePunchInOut = async punchAction => {
    try {
      if (moment(task?.startDate).isAfter(moment())) {
        return ToastMessage('Project will start soon');
      }

      setAction(punchAction);
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        return;
      }

      setLoading(true);

      const userLocation = await getLocation();

      const dis = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        task?.location?.lat || 0,
        task?.location?.lng || 0,
      );

      if (punchAction === 'punch_out') {
        setBreakModal(true);
        setLoading(false);
        return;
      }

      if (Math.round(dis) > 100) {
        setLoading(false);
        setDistance(dis);
        setShow(true);
        return;
      }

      handleAdd('green', punchAction);
    } catch (error) {
      console.error('Error in punch in/out:', error);
      setLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      setLoader(true);
      const recordId = timeSummary[0]?.id;

      await put('editSummary', {
        recordId,
        shareSomething: shareInfo,
      });

      setShareInfo('');
      setShareModal(false);
      setLoader(false);
      getTimeSummary();
    } catch (error) {
      setLoader(false);
      console.log(error, 'in share something');
    }
  };

  const fetchData = async () => {
    if (moment(task?.startDate).isAfter(moment())) {
      setPageLoader(false);
      return ToastMessage('Project will start soon');
    }
    setPageLoader(true);

    await getCurrentStatus();
    await getTimeSummary();
    setPageLoader(false);
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  useEffect(() => {
    fetchData();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const canShare =
    active === 2 && timeSummary?.length > 0 && !timeSummary[0]?.shareSomething;

  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header title={'Project Details'} />}
      scrollEnabled>
      <TaskDetailer task={task} />
      {pageLoader ? (
        <CustomText
          marginTop={60}
          alignSelf={'center'}
          fontFamily={fonts.semiBold}
          color={COLORS.primaryColor}
          label={'Loading Summary...'}
        />
      ) : (
        <TaskSummary
          timer={timer}
          active={active}
          loading={loading}
          isRunning={isRunning}
          timeSummary={timeSummary}
          salary={userData?.salary || 0}
          handlePunchInOut={handlePunchInOut}
          hide={task?.status === 'completed'}
        />
      )}
      {canShare && (
        <CustomButton
          marginTop={20}
          marginBottom={30}
          title={'Share Something'}
          onPress={() => setShareModal(true)}
        />
      )}
      <LateModal
        reason={reason}
        isVisible={show}
        setReason={setReason}
        loading={modalLoader}
        distance={Math.round(distance)}
        onDisable={() => setShow(false)}
        onPress={() => {
          setModalLoader(true);
          handleAdd('red');
        }}
      />
      <BreakModal
        breakVal={breakVal}
        isVisible={breakModal}
        setBreakVal={setBreakVal}
        onPress={handleBreakSelection}
        onDisable={() => {
          setBreakModal(false);
          setLoading(false);
        }}
      />
      <ShareModal
        loading={loader}
        value={shareInfo}
        onPress={handleShare}
        isVisible={shareModal}
        setValue={setShareInfo}
        onDisable={() => setShareModal(false)}
      />
    </ScreenWrapper>
  );
};

export default TaskDetails;
