import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import fonts from '../../../../assets/fonts';
import {Images} from '../../../../assets/images';
import CustomText from '../../../../components/CustomText';
import Icons from '../../../../components/Icons';
import ImageFast from '../../../../components/ImageFast';
import {COLORS} from '../../../../utils/COLORS';
import SkeletonCard from './SkeletonCard';

const HomeTaskCard = ({item, loading}) => {
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

  return loading ? (
    <SkeletonCard />
  ) : (
    <TouchableOpacity style={styles.card} activeOpacity={0.6}>
      <ImageFast
        source={item?.images ? {uri: item?.images[0]} : Images.dummy}
        resizeMode="stretch"
        style={styles.image}
      />
      <View style={[styles.status, {backgroundColor: bg}]}>
        <CustomText
          fontSize={12}
          color={color}
          alignSelf={'center'}
          fontFamily={fonts.medium}
          textTransform={'capitalize'}
          label={' ' + item?.status + ' '}
        />
      </View>
      <View style={{paddingHorizontal: 10, marginTop: 10}}>
        <View style={styles.row1}>
          <CustomText
            width={150}
            numberOfLines={1}
            label={item?.name}
            fontFamily={fonts.semiBold}
          />
          <View style={styles.row}>
            <Icons
              top={2}
              size={16}
              family={'Feather'}
              name={'dollar-sign'}
              color={COLORS.primaryColor}
            />
            <CustomText
              label={item?.budget}
              fontFamily={fonts.semiBold}
              color={COLORS.primaryColor}
            />
          </View>
        </View>
        <View style={[styles.row, {paddingRight: 15, marginVertical: 5}]}>
          <Icons name={'location'} color={COLORS.gray1} size={16} top={2} />
          <CustomText
            fontSize={13}
            color={COLORS.gray1}
            label={item?.address}
            fontFamily={fonts.medium}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HomeTaskCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    marginBottom: 12,
    marginRight: 15,
    width: 240,
    overflow: 'hidden',
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
    paddingHorizontal: 10,
    height: 30,
    position: 'absolute',
    right: 5,
    top: 5,
  },
  image: {
    height: 120,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
});
