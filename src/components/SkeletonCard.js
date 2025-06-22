/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Skeleton} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../utils/COLORS';

const {width} = Dimensions.get('window');

const SkeletonCard = () => {
  const skeletonStyle = {
    backgroundColor: '#EBEBEB',
  };
  const renderGrade = () => {
    return (
      <LinearGradient
        colors={['#EBEBEB', '#EBEBEB']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={StyleSheet.absoluteFill}
      />
    );
  };
  return (
    <View style={styles.mainCard}>
      <View style={styles.skeletonHeader}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Skeleton
            animation="pulse"
            LinearGradientComponent={renderGrade}
            skeletonStyle={skeletonStyle}
            width={190}
            height={25}
            style={styles.customSkeleton}
          />
          <Skeleton
            LinearGradientComponent={renderGrade}
            animation="pulse"
            width={70}
            height={25}
            borderRadius={5}
            style={styles.customSkeleton}
          />
        </View>

        <Skeleton
          animation="pulse"
          width={160}
          height={20}
          LinearGradientComponent={renderGrade}
          skeletonStyle={skeletonStyle}
          style={[styles.customSkeleton, {marginTop: 7}]}
        />
        <Skeleton
          animation="pulse"
          width={130}
          height={20}
          LinearGradientComponent={renderGrade}
          skeletonStyle={skeletonStyle}
          style={[styles.customSkeleton, {marginTop: 7}]}
        />
      </View>
      <Skeleton
        animation="pulse"
        LinearGradientComponent={renderGrade}
        style={styles.cardImg}
        skeletonStyle={skeletonStyle}
      />
    </View>
  );
};
export default SkeletonCard;

const styles = StyleSheet.create({
  mainCard: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
    overflow: 'hidden',
  },
  customSkeleton: {
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
  },
  main_container: {
    width: (width - 15 * 4) / 1.9,
    height: 'auto',
  },
  skeletonHeader: {
    marginBottom: 5,
    position: 'absolute',
    zIndex: 99999,
    width: '95%',
    top: 10,
    left: 5,
  },
  cardImg: {
    width: '100%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: 100,
  },
  skeletonContent: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});
