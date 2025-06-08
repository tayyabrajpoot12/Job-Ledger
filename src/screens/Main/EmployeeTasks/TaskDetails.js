/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Dimensions, View, Animated} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
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

const TaskDetails = () => {
  const {params} = useRoute();
  const intervalRef = useRef(null);

  const task = params?.task;
  const [active, setActive] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeSummary, setTimeSummary] = useState([]);
  const [punchInTime, setPunchInTime] = useState(null);

  const images = task?.images || [Images.dummy];

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTimer = seconds => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePunchIn = () => {
    const now = moment();
    setPunchInTime(now);
    setTimer(0);
    setIsRunning(true);
    setActive(2);
  };

  const handlePunchOut = () => {
    const now = moment();
    const totalSeconds = timer;

    const summaryEntry = {
      id: Date.now(),
      date: punchInTime.format('DD MMM'),
      timeIn: punchInTime.format('HH:mm'),
      timeOut: now.format('HH:mm'),
      total: formatTimer(totalSeconds),
      totalSeconds: totalSeconds,
    };

    setTimeSummary(prev => [summaryEntry, ...prev]);
    setIsRunning(false);
    setTimer(0);
    setPunchInTime(null);
    setActive(1);
  };

  const color =
    task?.status === 'active'
      ? COLORS.green
      : task?.status === 'on-hold'
      ? COLORS.yellow
      : COLORS.purple;

  const bg =
    task?.status === 'active'
      ? COLORS.lightGreen
      : task?.status === 'on-hold'
      ? COLORS.lightYellow
      : COLORS.lightPurple;

  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header title={'Project Details'} />}
      scrollEnabled>
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
            color={color}
            fontSize={12}
            alignSelf={'center'}
            fontFamily={fonts.medium}
            textTransform={'capitalize'}
            label={' ' + task?.status + ' '}
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

      {(isRunning || timer > 0) && (
        <View style={styles.timerContainer}>
          <CustomText
            label="Current Session"
            fontFamily={fonts.medium}
            color={COLORS.primaryColor}
            alignSelf={'center'}
          />
          <CustomText
            marginTop={5}
            fontSize={17}
            alignSelf={'center'}
            color={COLORS.green}
            label={formatTimer(timer)}
            fontFamily={fonts.semiBold}
          />
        </View>
      )}

      {active === 1 ? (
        <CustomButton
          height={45}
          marginTop={20}
          borderRadius={30}
          title={'Punch In'}
          onPress={handlePunchIn}
        />
      ) : (
        <CustomButton
          height={45}
          marginTop={20}
          borderRadius={30}
          title={'Punch Out'}
          onPress={handlePunchOut}
        />
      )}

      <CustomText
        marginTop={15}
        label="Time Summary"
        fontFamily={fonts.medium}
        color={COLORS.primaryColor}
      />

      <View style={styles.descBG}>
        <View style={styles.width25}>
          <CustomText label="Date" fontFamily={fonts.medium} fontSize={12} />
        </View>
        <View style={styles.width25}>
          <CustomText label="Time In" fontFamily={fonts.medium} fontSize={12} />
        </View>
        <View style={styles.width25}>
          <CustomText
            label="Time Out"
            fontFamily={fonts.medium}
            fontSize={12}
          />
        </View>
        <View style={styles.width25}>
          <CustomText
            fontSize={12}
            label="Total Time"
            fontFamily={fonts.medium}
          />
        </View>
      </View>

      {timeSummary.map(entry => (
        <View key={entry.id} style={styles.summaryRow}>
          <View style={styles.width25}>
            <CustomText
              label={entry.date}
              fontFamily={fonts.regular}
              fontSize={11}
              color={COLORS.inputLabel}
            />
          </View>
          <View style={styles.width25}>
            <CustomText
              label={entry.timeIn}
              fontFamily={fonts.regular}
              fontSize={11}
              color={COLORS.inputLabel}
            />
          </View>
          <View style={styles.width25}>
            <CustomText
              label={entry.timeOut}
              fontFamily={fonts.regular}
              fontSize={11}
              color={COLORS.inputLabel}
            />
          </View>
          <View style={styles.width25}>
            <CustomText
              label={entry.total}
              fontFamily={fonts.medium}
              fontSize={11}
              color={COLORS.primaryColor}
            />
          </View>
        </View>
      ))}

      {timeSummary.length === 0 && (
        <View style={styles.noDataContainer}>
          <CustomText
            fontSize={12}
            color={COLORS.gray1}
            alignSelf={'center'}
            fontFamily={fonts.medium}
            label="No time entries yet"
          />
        </View>
      )}
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
  width25: {
    width: '25%',
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
    paddingHorizontal: 15,
    height: 30,
  },
  descBG: {
    backgroundColor: '#003F7D14',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  timerContainer: {
    alignItems: 'center',
    marginTop: 15,
    paddingVertical: 15,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: COLORS.white,
    marginBottom: 2,
    borderRadius: 3,
  },
  noDataContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    marginTop: 5,
  },
});
