import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import fonts from '../../../assets/fonts';
import CustomText from '../../../components/CustomText';
import Header from '../../../components/Header';
import ScreenWrapper from '../../../components/ScreenWrapper';
import CalendarBox from './molecules/CalendarBox';
import {useSelector} from 'react-redux';
import {get} from '../../../Services/ApiRequest';
import {useFocusEffect} from '@react-navigation/native';

const toLocalDate = date => {
  const localDate = new Date(date);
  return new Date(localDate.getTime() + localDate.getTimezoneOffset() * 60000);
};

const Schedule = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useFocusEffect(
    useCallback(() => {
      fetchProjects();
    }, [fetchProjects]),
  );

  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header title={'My Schedule'} />}
      paddingHorizontal={0.1}>
      <View style={styles.txtBox}>
        <CustomText label={'Monthly Planner'} fontFamily={fonts.semiBold} />
        <CustomText label={'View and manage your upcoming tasks by month.'} />
      </View>
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
        <CalendarBox
          events={data}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
      )}
    </ScreenWrapper>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  txtBox: {
    paddingHorizontal: 20,
  },
});
