import {StyleSheet, View} from 'react-native';

import fonts from '../../../../assets/fonts';
import CustomButton from '../../../../components/CustomButton';
import CustomModal from '../../../../components/CustomModal';
import CustomText from '../../../../components/CustomText';
import {COLORS} from '../../../../utils/COLORS';

const ResetSuccessModal = ({isVisible, onDisable}) => {
  return (
    <CustomModal isVisible={isVisible}>
      <View style={[styles.mainContainer]}>
        <CustomText
          label="Password Changed!"
          fontSize={18}
          textAlign="center"
          alignSelf={'center'}
          fontFamily={fonts.bold}
        />
        <CustomText
          label="Please login with you updated password!"
          textAlign="center"
          alignSelf={'center'}
          marginBottom={20}
        />

        <CustomButton
          title="Back to Login"
          marginBottom={10}
          onPress={onDisable}
        />
      </View>
    </CustomModal>
  );
};

export default ResetSuccessModal;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 30,
    borderRadius: 20,
    width: '94%',
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.lightBlack,
    backgroundColor: COLORS.black,
  },
  image: {
    width: 128,
    height: 128,
  },
});
