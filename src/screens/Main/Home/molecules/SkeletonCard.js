/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Skeleton} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../../../utils/COLORS';

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
        LinearGradientComponent={renderGrade}
        style={styles.cardImg}
        skeletonStyle={skeletonStyle}
      />
      <View style={styles.skeletonContent}>
        <Skeleton
          animation="pulse"
          LinearGradientComponent={renderGrade}
          skeletonStyle={skeletonStyle}
          width={170}
          height={20}
        />
        <Skeleton
          animation="pulse"
          width={130}
          height={20}
          style={{marginTop: 10}}
          LinearGradientComponent={renderGrade}
          skeletonStyle={skeletonStyle}
        />
      </View>
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
    width: 240,
    marginBottom: 12,
    marginRight: 15,

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
    alignItems: 'flex-end',
    marginBottom: 5,
    position: 'absolute',
    zIndex: 99999,
    width: '95%',
    top: 10,
    left: 5,
  },
  cardImg: {
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 100,
    marginBottom: 10,
  },
  skeletonContent: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});
