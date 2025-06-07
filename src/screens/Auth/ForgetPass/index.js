import {Formik} from 'formik';
import React, {useState} from 'react';
import {View} from 'react-native';
import * as Yup from 'yup';

import AuthWrapper from '../../../components/AuthWrapper';
import CustomButton from '../../../components/CustomButton';
import CustomInput from '../../../components/CustomInput';
import Error from '../../../components/Error';
import Header from '../../../components/Header';
import ScreenWrapper from '../../../components/ScreenWrapper';
import {className} from '../../../global-styles';
import {post} from '../../../Services/ApiRequest';
import {ToastMessage} from '../../../utils/ToastMessage';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .label('Email'),
});
const ForgetPass = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async ({values}) => {
    try {
      setLoading(true);
      const body = {
        email: values?.email,
      };
      const response = await post('users/forget-password', body);
      console.log('res-------------', response.data);
      if (response.data?.success) {
        navigation.navigate('OTPScreen', {
          isAccountCreated: true,
          token: response.data?.token,
        });
      }
    } catch (error) {
      console.log(error.response.data);
      ToastMessage(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper headerUnScrollable={() => <Header />}>
      <AuthWrapper heading="Forgot Password?" desc="forgotPassDesc">
        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={values =>
            navigation.navigate('OTPScreen', {
              isAccountCreated: true,
              token: '1234',
            })
          }
          validationSchema={validationSchema}>
          {({
            handleChange,
            handleSubmit,
            touched,
            errors,
            setFieldTouched,
            values,
            isValid,
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
                title={'Send Code'}
                onPress={handleSubmit}
                customStyle={{marginTop: 20}}
              />
            </View>
          )}
        </Formik>
      </AuthWrapper>
    </ScreenWrapper>
  );
};

export default ForgetPass;
