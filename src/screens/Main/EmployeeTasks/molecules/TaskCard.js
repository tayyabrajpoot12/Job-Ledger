import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import fonts from '../../../../assets/fonts';
import CustomText from '../../../../components/CustomText';
import Icons from '../../../../components/Icons';
import {COLORS} from '../../../../utils/COLORS';
import moment from 'moment';

const converter = date => {
  return moment(date, 'YYYY-MM-DD').format('MMM Do, YYYY');
};

const TaskCard = ({item, onPress}) => {
  const color =
    item?.status === 'Active'
      ? COLORS.green
      : item?.status === 'On Hold'
      ? COLORS.yellow
      : COLORS.purple;

  const bg =
    item?.status === 'Active'
      ? COLORS.lightGreen
      : item?.status === 'On Hold'
      ? COLORS.lightYellow
      : COLORS.lightPurple;

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.6} onPress={onPress}>
      <View style={styles.row1}>
        <CustomText
          label={item?.name}
          alignSelf={'center'}
          fontFamily={fonts.semiBold}
        />
        <View style={[styles.status, {backgroundColor: bg}]}>
          <CustomText
            fontSize={12}
            color={color}
            label={item?.status}
            alignSelf={'center'}
            fontFamily={fonts.medium}
          />
        </View>
      </View>
      <CustomText
        marginTop={5}
        fontSize={13}
        numberOfLines={2}
        color={COLORS.gray1}
        label={item?.description}
      />
      <View style={styles.row1}>
        <View style={styles.row}>
          <Icons
            top={2}
            size={16}
            family={'Feather'}
            name={'dollar-sign'}
            color={COLORS.primaryColor}
          />
          <CustomText
            label={item?.laborBudget}
            fontFamily={fonts.semiBold}
            color={COLORS.primaryColor}
          />
        </View>
        <View style={styles.row}>
          <Icons name={'date'} family={'Fontisto'} size={14} />
          <CustomText
            fontSize={12}
            marginLeft={5}
            color={COLORS.lightBlack}
            fontFamily={fonts.medium}
            label={converter(item?.startDate) + ' to '}
          />
          <CustomText
            fontSize={12}
            color={COLORS.lightBlack}
            fontFamily={fonts.medium}
            label={converter(item?.endDate)}
          />
        </View>
      </View>
      <View style={[styles.row, {paddingRight: 15}]}>
        <Icons name={'location'} color={COLORS.gray1} size={16} top={2} />
        <CustomText
          fontSize={13}
          color={COLORS.gray1}
          label={item?.address}
          fontFamily={fonts.medium}
        />
      </View>
    </TouchableOpacity>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    marginBottom: 12,
    elevation: 1,
  },
  row: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop: 7,
  },
  row1: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  status: {
    backgroundColor: COLORS.lightPurple,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 20,
    height: 30,
  },
});
