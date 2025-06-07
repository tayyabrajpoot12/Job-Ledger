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
import {ToastMessage} from '../../../utils/ToastMessage';
import ResetSuccessModal from './molecules/ResetSuccessModal';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character',
    ),
  confirmPassword: Yup.string()
    .required('Please enter confirm password')
    .oneOf([Yup.ref('password'), null], 'Passwords do not match'),
});
const ResetPass = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [isResetModal, setResetModal] = useState(false);

  const handleSetNewPassword = async values => {
    try {
      setResetModal(true);
    } catch (error) {
      ToastMessage(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header title={'Reset Password'} />}>
      <AuthWrapper
        heading="Create New Password"
        desc="Your new password must be unique from those previously used.">
        <ResetSuccessModal
          isVisible={isResetModal}
          onDisable={() => {
            setResetModal(false);
            setTimeout(() => {
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'Login',
                  },
                ],
              });
            }, 1000);
          }}
        />

        <Formik
          initialValues={{password: '', confirmPassword: ''}}
          onSubmit={values => handleSetNewPassword(values)}
          validationSchema={validationSchema}>
          {({
            handleChange,
            handleSubmit,
            touched,
            errors,
            setFieldTouched,
            values,
          }) => (
            <View style={className('mt-3')}>
              <CustomInput
                placeholder="Password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
                error={touched.password && errors.password}
                secureTextEntry
              />
              <Error error={errors.password} visible={touched.password} />
              <CustomInput
                placeholder="Confirm Password"
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={() => setFieldTouched('confirmPassword')}
                error={touched.confirmPassword && errors.confirmPassword}
                secureTextEntry
              />
              <Error
                error={errors.confirmPassword}
                visible={touched.confirmPassword}
              />
              <CustomButton
                title={'Reset Password'}
                onPress={handleSubmit}
                loading={loading}
                disabled={loading}
                customStyle={{marginTop: 12}}
              />
            </View>
          )}
        </Formik>
      </AuthWrapper>
    </ScreenWrapper>
  );
};

export default ResetPass;
