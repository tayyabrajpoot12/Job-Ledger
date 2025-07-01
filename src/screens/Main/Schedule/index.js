import React, {useCallback, useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import fonts from '../../../assets/fonts';
import CustomText from '../../../components/CustomText';
import Header from '../../../components/Header';
import ScreenWrapper from '../../../components/ScreenWrapper';
import CalendarBox from './molecules/CalendarBox';
import {useSelector} from 'react-redux';
import {get} from '../../../Services/ApiRequest';
import {useFocusEffect} from '@react-navigation/native';
import CustomDatePicker from '../../../components/CustomDatePicker';

const toLocalDate = date => {
  const localDate = new Date(date);
  return new Date(localDate.getTime() + localDate.getTimezoneOffset() * 60000);
};

const formatDateForAPI = date => {
  if (!date) {
    return '';
  }
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatDateForDisplay = date => {
  if (!date) {
    return '';
  }
  return new Date(date).toLocaleDateString();
};

const Schedule = () => {
  const [data, setData] = useState([]);
  const [hours, setHours] = useState('');
  const [loading, setLoading] = useState(true);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [endDate, setEndDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());

  const {token} = useSelector(state => state.authConfigs);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const url = `getMyProjects/${token}`;

      const res = await get(url);
      if (res.data?.result) {
        const array = res?.data?.data?.map(item => {
          return {
            title: item?.name,
            start: toLocalDate(item?.startDate),
            end: toLocalDate(item?.endDate),
            ...item,
          };
        });

        setData(array);
      }
      setLoading(false);
    } catch (error) {
      console.log(error, 'in dashboard data');
      setLoading(false);
    }
  }, [token]);

  const fetchSummary = useCallback(
    async (fromDate, toDate) => {
      try {
        setSummaryLoading(true);
        const url = `employee-projects/${token}?filter=custom&fromDate=${fromDate}&toDate=${toDate}`;

        const res = await get(url);
        if (res.data?.result) {
          setHours(res.data?.data?.totalHoursDisplay || '0');
        } else {
          setHours('0');
        }
        setSummaryLoading(false);
      } catch (error) {
        console.log(error, 'in fetching hours');
        setHours('0');
        setSummaryLoading(false);
      }
    },
    [token],
  );

  const validateDates = (start, end) => {
    if (!start || !end) {
      return {
        isValid: false,
        message: 'Please select both start and end dates',
      };
    }

    const startDateObj = new Date(start);
    const endDateObj = new Date(end);

    if (endDateObj < startDateObj) {
      return {
        isValid: false,
        message: 'End date cannot be less than start date',
      };
    }

    return {isValid: true, message: ''};
  };

  const handleStartDateChange = date => {
    setStartDate(date);
    setHours('');

    if (endDate && new Date(date) > new Date(endDate)) {
      setEndDate('');
      Alert.alert(
        'Date Validation',
        'End date cleared as it was less than the new start date',
      );
    }
  };

  const handleEndDateChange = date => {
    const validation = validateDates(startDate, date);

    if (!validation.isValid) {
      Alert.alert('Date Validation', validation.message);
      if (
        validation.message.includes('End date cannot be less than start date')
      ) {
        return;
      }
    }

    setEndDate(date);

    if (startDate && date && validation.isValid) {
      const formattedStartDate = formatDateForAPI(startDate);
      const formattedEndDate = formatDateForAPI(date);
      fetchSummary(formattedStartDate, formattedEndDate);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProjects();
    }, [fetchProjects]),
  );

  const getHoursSummaryText = () => {
    if (!startDate || !endDate) {
      return 'Please select both start and end dates to view working hours';
    }

    if (summaryLoading) {
      return 'Loading working hours...';
    }

    return `Total hours worked: ${hours}`;
  };

  return (
    <ScreenWrapper
      scrollEnabled={loading ? false : true}
      headerUnScrollable={() => <Header title={'My Schedule'} />}
      paddingHorizontal={0.1}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <CustomText
            fontSize={17}
            label={'Loading...'}
            alignSelf={'center'}
            fontFamily={fonts.semiBold}
          />
        </View>
      ) : data?.length <= 0 ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <CustomText
            fontSize={17}
            alignSelf={'center'}
            fontFamily={fonts.semiBold}
            label={'No Project Found'}
          />
        </View>
      ) : (
        <>
          <View style={styles.txtBox}>
            <CustomText
              marginBottom={10}
              fontFamily={fonts.medium}
              label={
                'Filter your working hours by selecting Start and End date'
              }
            />
            <View style={styles.row}>
              <View style={{width: '48%'}}>
                <CustomText
                  fontSize={13}
                  marginBottom={5}
                  label={'Start Date'}
                />
                <CustomDatePicker
                  value={startDate}
                  maximumDate={new Date()}
                  onChange={handleStartDateChange}
                />
              </View>
              <View style={{width: '48%'}}>
                <CustomText label={'End Date'} fontSize={13} marginBottom={5} />
                <CustomDatePicker
                  value={endDate}
                  minimumDate={startDate ? new Date(startDate) : undefined}
                  maximumDate={new Date()}
                  onChange={handleEndDateChange}
                />
              </View>
            </View>
            <View style={styles.summaryContainer}>
              <CustomText
                label={getHoursSummaryText()}
                fontSize={14}
                fontFamily={fonts.medium}
                style={styles.summaryText}
              />
            </View>
          </View>
          <CalendarBox
            events={data}
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
          />
        </>
      )}
    </ScreenWrapper>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  txtBox: {
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryContainer: {
    marginTop: 5,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 10,
  },
  summaryText: {
    textAlign: 'center',
  },
});
