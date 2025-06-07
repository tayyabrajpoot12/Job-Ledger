import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import fonts from '../../../assets/fonts';
import CustomText from '../../../components/CustomText';
import Header from '../../../components/Header';
import ScreenWrapper from '../../../components/ScreenWrapper';
import CalendarBox from './molecules/CalendarBox';

const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header title={'My Schedule'} />}
      paddingHorizontal={0.1}>
      <View style={styles.txtBox}>
        <CustomText label={'Monthly Planner'} fontFamily={fonts.semiBold} />
        <CustomText label={'View and manage your upcoming tasks by month.'} />
      </View>
      <CalendarBox currentDate={currentDate} setCurrentDate={setCurrentDate} />
    </ScreenWrapper>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  txtBox: {
    paddingHorizontal: 20,
  },
});
