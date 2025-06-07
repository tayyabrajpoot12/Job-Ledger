import {useState} from 'react';
import {StyleSheet} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import AuthWrapper from '../../../components/AuthWrapper';
import CustomButton from '../../../components/CustomButton';
import Header from '../../../components/Header';
import OTPComponent from '../../../components/OTP';
import ScreenWrapper from '../../../components/ScreenWrapper';
import {post} from '../../../Services/ApiRequest';
import {setToken} from '../../../store/reducer/AuthConfig';
import {setUserData} from '../../../store/reducer/usersSlice';
import {ToastMessage} from '../../../utils/ToastMessage';

const OTPScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const isAccountCreated = route?.params?.isAccountCreated;
  const bodySignUp = route?.params?.bodySignUp;
  const token = route?.params?.token;
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerifyOtp = async () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'ResetPass',
          params: {
            token: token,
          },
        },
      ],
    });
  };

  const handleCheckOtp = async () => {
    setLoading(true);
    try {
      const body = {
        email: bodySignUp?.email,
        code: otp,
      };
      const response = await post('users/verify-otp/registration', body);

      if (response.data.success) {
        handleRegisterUser();
        ToastMessage(response.data?.message);
      } else {
        ToastMessage(response.data?.message);
      }
    } catch (error) {
      ToastMessage(error.response?.data?.error);
      console.log(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterUser = async () => {
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    const body = {
      email: bodySignUp?.email,
      phone: bodySignUp?.phone,
      password: bodySignUp?.password,
      fcmtoken: fcmToken,
      name: bodySignUp?.name,
      code: token,
    };
    try {
      const response = await post('users/signup/customer', body);
      if (response.data.success) {
        ToastMessage(response.data.message);
        dispatch(setToken(response.data?.token));
        dispatch(setUserData(response.data?.user));
      }
    } catch (err) {
      console.log(err.response.data.message || err.response.data.error);
      ToastMessage(err.response.data.message || err.response.data.error);
    }
  };
  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header />}
      footerUnScrollable={() => (
        <CustomButton
          title={isAccountCreated ? 'Done' : 'Continue'}
          marginTop={40}
          width="90%"
          marginBottom={30}
          loading={loading}
          disabled={loading || otp.length < 4}
          onPress={isAccountCreated ? handleVerifyOtp : handleCheckOtp}
        />
      )}>
      <AuthWrapper
        heading="OTP Verification"
        desc="Enter the verification code we just sent on your email address.">
        <OTPComponent value={otp} setValue={setOtp} />
      </AuthWrapper>
    </ScreenWrapper>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({});
