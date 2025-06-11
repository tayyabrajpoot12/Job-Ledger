/* eslint-disable react-hooks/exhaustive-deps */
import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {Linking, Platform, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';

import {Images} from '../../../assets/images';
import ConfirmationModal from '../../../components/ConfirmationModal';
import Header from '../../../components/Header';
import ScreenWrapper from '../../../components/ScreenWrapper';
import {get, post} from '../../../Services/ApiRequest';
import {ToastMessage} from '../../../utils/ToastMessage';
import Slider from './molecules/Slider';
import TaskSummary from './molecules/TaskSummary';
import TaskDetailer from './molecules/TaskDetailer';
import CustomText from '../../../components/CustomText';
import fonts from '../../../assets/fonts';
import {COLORS} from '../../../utils/COLORS';

const TaskDetails = () => {
  const {params} = useRoute();
  const intervalRef = useRef(null);

  const task = params?.task;
  const employeeId = task?.assignedEmployees?.[0]?._id;

  const [timer, setTimer] = useState(0);
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(1);
  const [action, setAction] = useState('');
  const [distance, setDistance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [timeSummary, setTimeSummary] = useState([]);
  const [pageLoader, setPageLoader] = useState(true);
  const [modalLoader, setModalLoader] = useState(false);

  const isImg = task?.images?.[0]?.includes('https');
  const images = isImg ? task?.images : [Images.dummy];

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
            enableHighAccuracy: false,
            timeout: 20000,
            maximumAge: 10000,
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
        Linking.openSettings();
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
        }));
        setTimeSummary(formattedSummary);
      }
    } catch (error) {
      console.log('Error getting time summary:', error);
    }
  };

  const handleAdd = async punchStatus => {
    try {
      const userLocation = await getLocation();

      const apiData = {
        employeeId: employeeId,
        projectId: task?._id,
        location: {
          lat: userLocation.latitude,
          lng: userLocation.longitude,
          address: 'Current Location',
        },
        action: action,
        punchStatus: punchStatus,
      };

      const response = await post('punchInOut', apiData);

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
      setLoading(false);
      setShow(false);
      setModalLoader(false);
    } catch (error) {
      console.log(error.response?.data, 'in add');
      setLoading(false);
      setModalLoader(false);
    }
  };

  const handlePunchInOut = async punchAction => {
    try {
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

      if (Math.round(dis) > 100) {
        setLoading(false);
        setDistance(dis);
        setShow(true);
        return;
      }

      handleAdd('green');
    } catch (error) {
      console.error('Error in punch in/out:', error);
      setLoading(false);
    }
  };

  const fetchData = async () => {
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

  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header title={'Project Details'} />}
      scrollEnabled>
      <Slider images={images} isImg={isImg} />
      <TaskDetailer task={task} />
      {pageLoader ? (
        <View>
          <CustomText
            marginTop={60}
            alignSelf={'center'}
            fontFamily={fonts.semiBold}
            color={COLORS.primaryColor}
            label={'Loading Summary...'}
          />
        </View>
      ) : (
        <TaskSummary
          timer={timer}
          active={active}
          loading={loading}
          isRunning={isRunning}
          timeSummary={timeSummary}
          handlePunchInOut={handlePunchInOut}
        />
      )}
      <ConfirmationModal
        isVisible={show}
        loading={modalLoader}
        title={'Proceed Anyway'}
        onPress={() => {
          setModalLoader(true);
          handleAdd('red');
        }}
        onDisable={() => setShow(false)}
        desc={`You are ${Math.round(
          distance,
        )}m away from project location. Status will be marked as outside location.`}
      />
    </ScreenWrapper>
  );
};

export default TaskDetails;
