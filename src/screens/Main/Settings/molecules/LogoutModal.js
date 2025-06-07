import {StyleSheet, View} from 'react-native';

import fonts from '../../../../assets/fonts';
import CustomButton from '../../../../components/CustomButton';
import CustomModal from '../../../../components/CustomModal';
import CustomText from '../../../../components/CustomText';
import {className} from '../../../../global-styles';
import {COLORS} from '../../../../utils/COLORS';

const LogoutModal = ({isVisible, onDisable, StayLoggedIn, loading}) => {
  return (
    <CustomModal isChange isVisible={isVisible} onDisable={StayLoggedIn}>
      <View style={[styles.mainContainer]}>
        <View style={className(' mt-2 mb-6 mx-6')}>
          <CustomText
            label="Logout"
            textAlign="center"
            color={COLORS.black}
            alignSelf={'center'}
            fontSize={18}
            fontFamily={fonts.semiBold}
          />
          <View
            style={[
              className('bor-b-1 mb-3 mt-2 '),
              {borderBottomColor: COLORS.lightGray},
            ]}
          />
          <CustomText
            label="You are about to logout, Do you want to continue?"
            fontSize={14}
            textAlign="center"
            color={COLORS.gray1}
            alignSelf={'center'}
          />
        </View>
        <View style={[className('flex align-center justify-between')]}>
          <CustomButton
            title="Cancel"
            marginBottom={10}
            customText={[className('text-black'), {fontFamily: fonts.medium}]}
            onPress={StayLoggedIn}
            width="47%"
            backgroundColor={'transparent'}
            customStyle={{borderWidth: 1, borderColor: COLORS.lightGray}}
          />
          <CustomButton
            width="47%"
            title="Logout"
            marginBottom={10}
            loading={loading}
            disabled={loading}
            onPress={onDisable}
            indicatorcolor={'#000'}
          />
        </View>
      </View>
    </CustomModal>
  );
};

export default LogoutModal;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
  },
  image: {
    width: 25,
    height: 25,
  },
});
