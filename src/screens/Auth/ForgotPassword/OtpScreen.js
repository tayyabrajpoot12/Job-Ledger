import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';

import fonts from '../../../assets/fonts';
import CustomButton from '../../../components/CustomButton';
import CustomText from '../../../components/CustomText';
import Header from '../../../components/Header';
import OTPComponent from '../../../components/OTP';
import ScreenWrapper from '../../../components/ScreenWrapper';
import {className} from '../../../global-styles';
import {post} from '../../../Services/ApiRequest';
import {COLORS} from '../../../utils/COLORS';
import {ToastMessage} from '../../../utils/ToastMessage';

const OTPScreen = ({route}) => {
  const navigation = useNavigation();

  const email = route.params?.email;

  const timerRef = useRef(null);

  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);

  const startTimer = () => {
    setTimer(59);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);

      const body = {email, otp};

      const response = await post('verifyForgotPasswordOtp', body);

      if (response.data?.result) {
        navigation.navigate('ResetPassword', {
          email,
          resetToken: response?.data?.resetToken,
        });
      }
      setLoading(false);
    } catch (error) {
      ToastMessage(error.response.data.message);
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setTimer(59);
      startTimer();
      ToastMessage('OTP Sent Successfully');
      await post('forgotPassword', {email});
    } catch (error) {
      ToastMessage(error.response?.data?.message);
    }
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <ScreenWrapper headerUnScrollable={() => <Header title={'Verification'} />}>
      <CustomText
        fontSize={22}
        marginTop={5}
        color={COLORS.black}
        label={'OTP Verification'}
        fontFamily={fonts.semiBold}
      />
      <CustomText
        label={
          'Enter the verification code we just sent on your email address.'
        }
        marginBottom={25}
        color={COLORS.gray1}
        fontFamily={fonts.medium}
      />
      <OTPComponent value={otp} setValue={setOtp} />
      <CustomButton
        marginTop={35}
        title={'Verify'}
        loading={loading}
        disabled={loading}
        onPress={handleVerifyOtp}
      />
      <View style={className('justify-center align-center flex mb-8 mt-3')}>
        <CustomText
          marginRight={5}
          color={COLORS.gray}
          label={timer === 0 ? 'Didn’t received code?' : 'Resend code in:'}
        />

        {timer === 0 ? (
          <CustomText
            label={'Resend'}
            fontFamily={fonts.bold}
            onPress={handleResendOtp}
            color={COLORS.secondaryColor}
          />
        ) : (
          <CustomText
            fontFamily={fonts.bold}
            color={COLORS.secondaryColor}
            label={` 00 : ${String(timer).padStart(2, '0')}`}
          />
        )}
      </View>
    </ScreenWrapper>
  );
};

export default OTPScreen;
