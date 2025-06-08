import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import fonts from '../../../../assets/fonts';
import CustomText from '../../../../components/CustomText';
import Icons from '../../../../components/Icons';
import {COLORS} from '../../../../utils/COLORS';
import moment from 'moment';
import ImageFast from '../../../../components/ImageFast';
import {Images} from '../../../../assets/images';

const converter = date => {
  return moment(date, 'YYYY-MM-DD').format('MMM Do, YYYY');
};

const TaskCard = ({item, onPress}) => {
  const color =
    item?.status === 'active'
      ? COLORS.green
      : item?.status === 'on-hold'
      ? COLORS.yellow
      : COLORS.purple;

  const bg =
    item?.status === 'active'
      ? COLORS.lightGreen
      : item?.status === 'on-hold'
      ? COLORS.lightYellow
      : COLORS.lightPurple;

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.6} onPress={onPress}>
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
      <ImageFast
        style={styles.image}
        resizeMode={'stretch'}
        source={item?.images ? {uri: item?.images[0]} : Images.dummy}
      />
      <View style={styles.box}>
        <View style={styles.row1}>
          <CustomText
            fontSize={13}
            width={120}
            numberOfLines={1}
            label={item?.name}
            fontFamily={fonts.semiBold}
          />
          <View style={styles.row}>
            <Icons
              top={2}
              size={14}
              family={'Feather'}
              name={'dollar-sign'}
              color={COLORS.primaryColor}
            />
            <CustomText
              fontSize={13}
              label={item?.laborBudget}
              fontFamily={fonts.bold}
              color={COLORS.primaryColor}
            />
          </View>
        </View>
        <View style={styles.row1}>
          <View style={styles.row}>
            <Icons name={'date'} family={'Fontisto'} size={12} />
            <CustomText
              fontSize={10}
              marginLeft={5}
              color={COLORS.lightBlack}
              fontFamily={fonts.semiBold}
              label={converter(item?.startDate) + ' to '}
            />
            <CustomText
              fontSize={10}
              color={COLORS.lightBlack}
              fontFamily={fonts.semiBold}
              label={converter(item?.endDate)}
            />
          </View>
        </View>
        <View style={[styles.row, {paddingRight: 15}]}>
          <Icons name={'location'} color={COLORS.gray1} size={14} top={2} />
          <CustomText
            fontSize={12}
            color={COLORS.gray1}
            label={item?.address}
            fontFamily={fonts.medium}
          />
        </View>
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
    flexDirection: 'row',
  },
  row: {
    alignItems: 'flex-start',
    flexDirection: 'row',
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
    position: 'absolute',
    zIndex: 1,
    left: 5,
    top: 5,
  },
  image: {
    width: 130,
    height: 100,
  },
  box: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'space-evenly',
  },
});
