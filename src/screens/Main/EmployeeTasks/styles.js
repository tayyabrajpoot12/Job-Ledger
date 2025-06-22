import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from '../../../utils/COLORS';
import fonts from '../../../assets/fonts';

const {width} = Dimensions.get('screen');

export const styles = StyleSheet.create({
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
  summaryBox: {
    backgroundColor: '#003F7D14',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 5,
    padding: 10,
  },
});
