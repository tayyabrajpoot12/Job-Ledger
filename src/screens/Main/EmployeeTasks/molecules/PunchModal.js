import {useEffect, useState} from 'react';
import {Animated, Keyboard, StyleSheet, View} from 'react-native';
import fonts from '../../../../assets/fonts';
import CustomButton from '../../../../components/CustomButton';
import CustomInput from '../../../../components/CustomInput';
import CustomModal from '../../../../components/CustomModal';
import CustomText from '../../../../components/CustomText';
import {className} from '../../../../global-styles';
import {COLORS} from '../../../../utils/COLORS';

const PunchModal = ({
  isVisible,
  onDisable,
  distance,
  loading,
  onPress,
  heading,
  reason,
  setReason,
}) => {
  const [keyboardHeight, set] = useState(new Animated.Value(0));

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener('keyboardWillShow', event => {
      Animated.timing(keyboardHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height,
        useNativeDriver: false,
      }).start();
    });
    const keyboardWillHide = Keyboard.addListener('keyboardWillHide', event => {
      Animated.timing(keyboardHeight, {
        duration: event.duration,
        toValue: 0,
        useNativeDriver: false,
      }).start();
    });
    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  return (
    <CustomModal
      isVisible={isVisible}
      onDisable={loading ? () => '' : onDisable}>
      <Animated.View style={{marginBottom: keyboardHeight}}>
        <View style={[styles.mainContainer]}>
          <CustomText
            label={heading || 'Please Wait!'}
            fontSize={20}
            fontFamily={fonts.medium}
            alignSelf={'center'}
            textAlign={'center'}
            textTransform={'capitalize'}
            marginBottom={10}
          />
          <CustomText
            label={`You are ${distance}m away from project location. Status will be marked as outside location.`}
            fontSize={12}
            textAlign={'center'}
            alignSelf={'center'}
            marginTop={8}
            marginBottom={12}
          />
          <CustomInput
            multiline
            value={reason}
            onChangeText={e => setReason(e)}
            placeholder={'Type reason for late...'}
          />
          <View style={[className('align-center mt-2'), {width: '100%'}]}>
            <CustomButton
              title={'Proceed'}
              marginBottom={10}
              onPress={onPress}
              customText={{fontFamily: fonts.medium}}
              height={45}
              loading={loading}
              disabled={reason?.trim() === '' || loading}
            />
            <CustomButton
              title="Cancel"
              marginBottom={10}
              customText={{fontFamily: fonts.medium}}
              onPress={onDisable}
              backgroundColor={'transparent'}
              color={'#000'}
              height={45}
            />
          </View>
        </View>
      </Animated.View>
    </CustomModal>
  );
};

export default PunchModal;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    borderRadius: 20,
    paddingHorizontal: 28,
    marginHorizontal: 24,
    paddingTop: 26,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
});
