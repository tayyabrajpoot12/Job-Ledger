import moment from 'moment';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {COLORS} from '../utils/COLORS';
import CustomText from './CustomText';
import Icons from './Icons';

const CustomDatePicker = ({
  mode = 'date',
  value,
  onChange,
  placeholder = 'Select date',
  maximumDate,
  minimumDate,
}) => {
  const [open, setOpen] = useState(false);

  const formattedValue = value
    ? mode === 'date'
      ? moment(value).format('YYYY-DD-MM')
      : moment(value).format('HH:mm A')
    : placeholder;

  return (
    <>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        style={[styles.dateTimePickerContainer]}>
        <CustomText
          fontSize={13}
          marginTop={2}
          label={formattedValue}
          color={value ? COLORS.primaryColor : COLORS.placeHolder}
        />
        <View style={styles.circle}>
          <Icons
            size={18}
            color={COLORS.primaryColor}
            family={'MaterialCommunityIcons'}
            name={
              mode === 'date' ? 'calendar-range' : 'clock-time-five-outline'
            }
          />
        </View>
      </TouchableOpacity>
      <DatePicker
        modal
        open={open}
        mode={mode}
        date={value || new Date()}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        onConfirm={selectedValue => {
          setOpen(false);
          onChange(selectedValue);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default CustomDatePicker;

const styles = StyleSheet.create({
  dateTimePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
    marginBottom: 15,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    backgroundColor: COLORS.white,
  },
  circle: {
    backgroundColor: COLORS.lightBlue,
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});
