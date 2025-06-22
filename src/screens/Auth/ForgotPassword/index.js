import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {View} from 'react-native';
import * as Yup from 'yup';
import fonts from '../../../assets/fonts';
import CustomButton from '../../../components/CustomButton';
import CustomInput from '../../../components/CustomInput';
import CustomText from '../../../components/CustomText';
import Error from '../../../components/Error';
import ScreenWrapper from '../../../components/ScreenWrapper';
import {className} from '../../../global-styles';
import {COLORS} from '../../../utils/COLORS';
import {ToastMessage} from '../../../utils/ToastMessage';
import Header from '../../../components/Header';
import {post} from '../../../Services/ApiRequest';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .label('Email'),
});
const ForgotPassword = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async values => {
    try {
      setLoading(true);

      const res = await post('forgotPassword', {email: values?.email});

      if (res.data?.result) {
        ToastMessage(res.data?.message);
        navigation.navigate('OTPScreen', {email: values?.email});
      }

      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
      ToastMessage(error?.response?.data?.message);
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header title={'Forgot Passoword'} />}>
      <CustomText
        fontSize={22}
        marginTop={5}
        color={COLORS.black}
        label={'Forgot Password?'}
        fontFamily={fonts.semiBold}
      />
      <CustomText
        label={
          "Don't worry! It occurs. Please enter the email address linked with your account."
        }
        color={COLORS.gray1}
        fontFamily={fonts.medium}
      />
      <Formik
        initialValues={{email: ''}}
        onSubmit={values => handleSendOTP(values)}
        validationSchema={validationSchema}>
        {({
          handleChange,
          handleSubmit,
          touched,
          errors,
          setFieldTouched,
          values,
        }) => (
          <View style={className('mt-7')}>
            <CustomInput
              placeholder={'Enter your email'}
              keyboardType={'email-address'}
              value={values.email}
              onBlur={() => setFieldTouched('email')}
              onChangeText={handleChange('email')}
              error={touched.email && errors.email}
            />
            <Error error={errors.email} visible={touched.email} />

            <CustomButton
              marginTop={20}
              loading={loading}
              disabled={loading}
              title={'Send Code'}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
    </ScreenWrapper>
  );
};

export default ForgotPassword;
