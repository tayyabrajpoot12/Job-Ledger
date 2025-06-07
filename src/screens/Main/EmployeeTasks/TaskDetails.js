/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Dimensions, View, Animated} from 'react-native';
import React, {useState} from 'react';
import ScreenWrapper from '../../../components/ScreenWrapper';
import Header from '../../../components/Header';
import ImageFast from '../../../components/ImageFast';
import {COLORS} from '../../../utils/COLORS';
import {Images} from '../../../assets/images';
import CustomText from '../../../components/CustomText';
import moment from 'moment';
import {useRoute} from '@react-navigation/native';
import fonts from '../../../assets/fonts';
import Icons from '../../../components/Icons';
import CustomButton from '../../../components/CustomButton';

const {width} = Dimensions.get('screen');
const images = [Images.dummy, Images.dummy, Images.dummy];

const TaskDetails = () => {
  const {params} = useRoute();

  const task = params?.task;
  const [active, setActive] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  const color =
    task?.status === 'Active'
      ? COLORS.green
      : task?.status === 'On Hold'
      ? COLORS.yellow
      : COLORS.purple;

  const bg =
    task?.status === 'Active'
      ? COLORS.lightGreen
      : task?.status === 'On Hold'
      ? COLORS.lightYellow
      : COLORS.lightPurple;

  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header title={'Project Details'} />}>
      <View>
        <Animated.FlatList
          data={images}
          showsHorizontalScrollIndicator={false}
          horizontal
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          onScrollToIndexFailed={info => {
            console.error('Failed to scroll to index:', info.index);
          }}
          onMomentumScrollEnd={e => {
            const x = e.nativeEvent.contentOffset.x;
            setCurrentIndex((x / width)?.toFixed(0));
          }}
          initialScrollIndex={currentIndex}
          pagingEnabled
          renderItem={({item}) => (
            <Animated.View style={styles.sliderItem}>
              <ImageFast source={item} style={styles.image} />
            </Animated.View>
          )}
        />
        <Animated.View style={styles.dotContainer}>
          {images?.map((_, i) => (
            <Animated.View
              key={i}
              style={[
                styles.dot,
                {
                  height: i == currentIndex ? 10 : 8,
                  width: i == currentIndex ? 20 : 8,
                  backgroundColor:
                    i == currentIndex ? COLORS.primaryColor : COLORS.gray1,
                },
              ]}
            />
          ))}
        </Animated.View>
      </View>
      <View style={styles.row1}>
        <CustomText
          label={task?.name}
          fontFamily={fonts.semiBold}
          fontSize={16}
          marginTop={10}
        />
        <View style={[styles.status, {backgroundColor: bg}]}>
          <CustomText
            fontSize={12}
            color={color}
            label={task?.status}
            alignSelf={'center'}
            fontFamily={fonts.medium}
          />
        </View>
      </View>
      <CustomText
        label="Description"
        fontFamily={fonts.medium}
        marginTop={5}
        color={COLORS.primaryColor}
      />
      <CustomText
        label={task?.description}
        color={COLORS.inputLabel}
        fontSize={12}
      />
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
        <View style={{width: '33%'}}>
          <CustomText
            label="Total Budget"
            fontFamily={fonts.medium}
            color={COLORS.primaryColor}
          />
          <View style={styles.row}>
            <Icons name={'dollar-sign'} family={'Feather'} top={-1} size={16} />
            <CustomText
              label={task?.budget}
              fontFamily={fonts.semiBold}
              fontSize={16}
            />
          </View>
        </View>
        <View style={{width: '33%'}}>
          <CustomText
            label="My Earning"
            fontFamily={fonts.medium}
            color={COLORS.primaryColor}
          />
          <View style={styles.row}>
            <Icons name={'dollar-sign'} family={'Feather'} top={-1} size={16} />
            <CustomText
              label={task?.laborBudget}
              fontFamily={fonts.semiBold}
              fontSize={16}
            />
          </View>
        </View>
        <View style={{width: '33%'}}>
          <CustomText
            label="Material Cost"
            fontFamily={fonts.medium}
            color={COLORS.primaryColor}
          />
          <View style={styles.row}>
            <Icons name={'dollar-sign'} family={'Feather'} top={-1} size={16} />
            <CustomText
              label={task?.materialCosts}
              fontFamily={fonts.semiBold}
              fontSize={16}
            />
          </View>
        </View>
      </View>
      <CustomText
        marginTop={10}
        label="Project Location"
        fontFamily={fonts.medium}
        color={COLORS.primaryColor}
      />
      <View style={styles.row}>
        <Icons name={'location'} />
        <CustomText
          fontSize={13}
          marginLeft={5}
          color={COLORS.gray1}
          label={task?.address}
        />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
        <View style={{width: '50%'}}>
          <CustomText
            label="Start Date"
            fontFamily={fonts.medium}
            color={COLORS.primaryColor}
          />
          <CustomText
            fontSize={13}
            color={COLORS.black}
            fontFamily={fonts.medium}
            label={`${moment(task?.startDate).format('ddd DD MMM YYYY')}`}
          />
        </View>

        <View style={{width: '50%'}}>
          <CustomText
            label="End Date"
            fontFamily={fonts.medium}
            color={COLORS.primaryColor}
          />
          <CustomText
            fontSize={13}
            color={COLORS.black}
            fontFamily={fonts.medium}
            label={`${moment(task?.endDate).format('ddd DD MMM YYYY')}`}
          />
        </View>
      </View>
      {active === 1 ? (
        <CustomButton
          height={45}
          marginTop={20}
          borderRadius={30}
          title={'Punch In'}
          onPress={() => setActive(2)}
        />
      ) : (
        <CustomButton
          height={45}
          marginTop={20}
          borderRadius={30}
          title={'Punch Out'}
          onPress={() => setActive(1)}
        />
      )}
      <CustomText
        marginTop={15}
        label="Time Summary"
        fontFamily={fonts.medium}
        color={COLORS.primaryColor}
      />

      <View style={styles.descBG}>
        <View style={styles.width20}>
          <CustomText label="Date" fontFamily={fonts.medium} fontSize={12} />
        </View>
        <View style={styles.width20}>
          <CustomText label="Time In" fontFamily={fonts.medium} fontSize={12} />
        </View>
        <View style={styles.width20}>
          <CustomText
            label="Time Out"
            fontFamily={fonts.medium}
            fontSize={12}
          />
        </View>
        <View style={styles.width20}>
          <CustomText label="Total" fontFamily={fonts.medium} fontSize={12} />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default TaskDetails;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  width20: {
    width: '20%',
    alignItems: 'center',
  },
  sliderItem: {
    width: width - 50,
    height: 160,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  dot: {
    marginHorizontal: 3,
    borderRadius: 100,
  },
  dotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    alignSelf: 'center',
  },
  time: {
    color: COLORS.inputLabel,
    fontFamily: fonts.medium,
    fontSize: 9,
    letterSpacing: 0.1,
  },
  total: {
    color: COLORS.primaryColor,
    fontFamily: fonts.bold,
    fontSize: 12,
    letterSpacing: 0.1,
  },
  status: {
    backgroundColor: COLORS.lightPurple,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    paddingHorizontal: 20,
    height: 30,
  },
  descBG: {
    backgroundColor: '#003F7D14',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
