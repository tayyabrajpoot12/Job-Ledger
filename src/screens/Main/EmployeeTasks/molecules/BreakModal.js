import {useEffect, useState} from 'react';
import {Animated, Keyboard, StyleSheet, View} from 'react-native';
import fonts from '../../../../assets/fonts';
import CustomButton from '../../../../components/CustomButton';
import CustomDropdown from '../../../../components/CustomDropDown';
import CustomModal from '../../../../components/CustomModal';
import CustomText from '../../../../components/CustomText';
import {className} from '../../../../global-styles';
import {COLORS} from '../../../../utils/COLORS';

const options = [
  {
    _id: '30',
    title: 'I took 0 break',
  },
  {
    _id: '15',
    title: 'I took 1 break',
  },
  {
    _id: '0',
    title: 'I took 2 break',
  },
];

const BreakModal = ({
  isVisible,
  onDisable,
  loading,
  onPress,
  breakVal,
  setBreakVal,
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
            label={'Please Wait!'}
            fontFamily={fonts.medium}
            textTransform={'capitalize'}
          />
          <CustomText
            marginBottom={12}
            textAlign={'center'}
            alignSelf={'center'}
            label={'Please select the number of breaks you took today.'}
          />
          <CustomDropdown
            data={options}
            value={breakVal}
            setValue={setBreakVal}
            placeholder={'Choose break'}
          />

          <View style={[className('align-center mt-2'), {width: '100%'}]}>
            <CustomButton
              height={45}
              title={'Proceed'}
              marginBottom={10}
              loading={loading}
              disabled={!breakVal || loading}
              onPress={() => onPress(breakVal)}
              customText={{fontFamily: fonts.medium}}
            />
            <CustomButton
              height={45}
              title="Cancel"
              color={'#000'}
              marginBottom={10}
              onPress={onDisable}
              backgroundColor={'transparent'}
              customText={{fontFamily: fonts.medium}}
            />
          </View>
        </View>
      </Animated.View>
    </CustomModal>
  );
};

export default BreakModal;

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
