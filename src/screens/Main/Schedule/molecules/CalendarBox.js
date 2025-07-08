import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Calendar} from 'react-native-big-calendar';
import fonts from '../../../../assets/fonts';
import CustomText from '../../../../components/CustomText';
import Icons from '../../../../components/Icons';
import {COLORS} from '../../../../utils/COLORS';

const CalendarBox = ({currentDate, setCurrentDate, events = []}) => {
  const navigation = useNavigation();

  const handlePress = e => {
    navigation.navigate('TaskDetails', {
      task: {...e?.projectId, startDate: e?.fromDate},
    });
  };

  const handlePrev = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNext = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + 1);
      return newDate;
    });
  };

  return (
    <View style={{marginBottom: 20, zIndex: 1}}>
      <View style={styles.navigationButtons}>
        <TouchableOpacity
          onPress={handlePrev}
          style={[styles.navButton, {backgroundColor: COLORS.primaryColor}]}>
          <Icons
            size={25}
            color={COLORS.white}
            family={'Feather'}
            name={'chevron-left'}
          />
        </TouchableOpacity>
        <CustomText
          fontSize={16}
          label={currentDate?.toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
          fontFamily={fonts.semiBold}
          color={COLORS.primaryColor}
        />
        <TouchableOpacity onPress={handleNext} style={[styles.navButton]}>
          <Icons
            size={25}
            color={COLORS.white}
            family={'Feather'}
            name={'chevron-right'}
          />
        </TouchableOpacity>
      </View>

      <Calendar
        events={events}
        date={new Date(currentDate) || new Date()}
        height={450}
        mode={'month'}
        eventCellStyle={event => ({
          ...styles.event,
          height: 30,
          backgroundColor: event.bg || COLORS.primaryColor,
        })}
        swipeEnabled={false}
        onPressEvent={e => handlePress(e)}
        onPressDateHeader={e => console.log(e)}
        activeDate={new Date()}
        showTime={false}
        hideNowIndicator
        dayHeaderHighlightColor="white"
        showVerticalScrollIndicator={true}
        calendarCellTextStyle={{
          fontFamily: fonts.regular,
          fontSize: 16,
        }}
        overlapOffset={0}
        scrollOffsetMinutes={0}
        onPressMoreLabel={e => {
          console.log('more press');
        }}
        moreLabel="See More"
        moreLabelStyle={{color: COLORS.white}} // Updated color for See More label
        isEventOrderingEnabled
        itemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        calendarCellStyle={{borderColor: COLORS.lightGray}}
      />
    </View>
  );
};

export default CalendarBox;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
    alignSelf: 'flex-end',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  box: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray1,
    paddingHorizontal: 10,
    paddingBottom: 5,
    paddingTop: 2,
  },
  selected: {
    backgroundColor: COLORS.primaryColor,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray1,
    paddingHorizontal: 10,
    paddingBottom: 5,
    paddingTop: 2,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    paddingHorizontal: 20,
  },
  navButton: {
    backgroundColor: COLORS.primaryColor,
    borderRadius: 50,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    color: COLORS.white,
    fontSize: 18,
    fontFamily: fonts.medium,
  },
  event: {
    paddingHorizontal: 5,
    borderRadius: 5,
    paddingVertical: 2,
    marginTop: 2,
    backgroundColor: COLORS.primaryColor,
  },
  itemSeparator: {
    height: 6,
    marginBottom: 20,
  },
});
