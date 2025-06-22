import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../utils/COLORS';
import CustomText from './CustomText';
import fonts from '../assets/fonts';
import Icons from './Icons';
import SkeletonCard from './SkeletonCard';

const TaskCard = ({item, onPress, loading}) => {
  const color =
    item?.status === 'active'
      ? COLORS.green
      : item?.status === 'on-hold'
      ? COLORS.yellow
      : item?.status === 'completed'
      ? COLORS.primaryColor
      : COLORS.purple;

  const bg =
    item?.status === 'active'
      ? COLORS.lightGreen
      : item?.status === 'on-hold'
      ? COLORS.lightYellow
      : item?.status === 'completed'
      ? COLORS.lightBlue
      : COLORS.lightPurple;

  return loading ? (
    <SkeletonCard />
  ) : (
    <TouchableOpacity style={styles.card} activeOpacity={0.6} onPress={onPress}>
      <View style={styles.row1}>
        <CustomText
          numberOfLines={1}
          label={item?.name}
          fontFamily={fonts.semiBold}
        />
        <View style={[styles.status, {backgroundColor: bg}]}>
          <CustomText
            fontSize={10}
            color={color}
            label={' ' + item?.status + ' '}
            alignSelf={'center'}
            textTransform={'capitalize'}
            fontFamily={fonts.medium}
          />
        </View>
      </View>
      <CustomText
        label={item?.description}
        color={COLORS.gray}
        numberOfLines={2}
        fontSize={13}
        marginTop={3}
      />
      <View style={[styles.row, {paddingRight: 25, marginTop: 5}]}>
        <Icons name={'location'} color={COLORS.gray1} size={17} top={2} />
        <CustomText
          fontSize={13}
          numberOfLines={1}
          color={COLORS.gray1}
          fontFamily={fonts.medium}
          label={item?.location?.address}
        />
      </View>
    </TouchableOpacity>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    marginBottom: 12,
    overflow: 'hidden',
    padding: 10,
  },
  row: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    columnGap: 5,
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
    borderRadius: 5,
    paddingHorizontal: 7,
    paddingVertical: 5,
  },
});
