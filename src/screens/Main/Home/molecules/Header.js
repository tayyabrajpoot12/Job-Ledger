import React from 'react';
import {Image, StatusBar, StyleSheet, View} from 'react-native';
import {Images} from '../../../../assets/images';
import CustomText from '../../../../components/CustomText';
import {COLORS} from '../../../../utils/COLORS';
import {useSelector} from 'react-redux';

const HomeHeader = () => {
  const {userData} = useSelector(state => state.users);

  return (
    <View style={styles.header}>
      <View style={styles.box}>
        <CustomText label={'Welcome'} fontSize={12} color={COLORS.gray} />
        <CustomText label={userData?.firstName + ' ' + userData?.lastName} />
      </View>
      <Image source={Images.user} style={styles.logo} />
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  header: {
    marginTop: StatusBar.currentHeight,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
  },
  logo: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
    borderRadius: 50,
  },
  box: {
    flex: 1,
  },
});
