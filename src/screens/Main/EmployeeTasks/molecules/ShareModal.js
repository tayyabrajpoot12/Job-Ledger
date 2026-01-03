import {useEffect, useState} from 'react';
import {Animated, Keyboard, StyleSheet, View} from 'react-native';
import fonts from '../../../../assets/fonts';
import CustomButton from '../../../../components/CustomButton';
import CustomInput from '../../../../components/CustomInput';
import CustomModal from '../../../../components/CustomModal';
import CustomText from '../../../../components/CustomText';
import {className} from '../../../../global-styles';
import {COLORS} from '../../../../utils/COLORS';

const ShareModal = ({
  isVisible,
  onDisable,
  loading,
  onPress,
  value,
  setValue,
}) => {
  const [keyboardHeight] = useState(new Animated.Value(0));

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
            fontSize={20}
            alignSelf={'center'}
            textAlign={'center'}
            fontFamily={fonts.medium}
            label={'Share Something!'}
            textTransform={'capitalize'}
          />
          <CustomText
            marginBottom={12}
            textAlign={'center'}
            alignSelf={'center'}
            label={'Please share something about it.'}
          />
          <CustomInput
            multiline
            value={value}
            placeholder={'Type here...'}
            onChangeText={e => setValue(e)}
          />
          <View style={[className('align-center mt-2'), {width: '100%'}]}>
            <CustomButton
              title={'Proceed'}
              marginBottom={10}
              onPress={onPress}
              customText={{fontFamily: fonts.medium}}
              height={45}
              loading={loading}
              disabled={value?.trim() === '' || loading}
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

export default ShareModal;

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
