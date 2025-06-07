import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {View} from 'react-native';
import * as Yup from 'yup';
import CustomButton from '../../../components/CustomButton';
import CustomInput from '../../../components/CustomInput';
import Error from '../../../components/Error';
import Header from '../../../components/Header';
import ScreenWrapper from '../../../components/ScreenWrapper';
import {className} from '../../../global-styles';
import {ToastMessage} from '../../../utils/ToastMessage';
import CustomText from '../../../components/CustomText';
import fonts from '../../../assets/fonts';
import {useSelector} from 'react-redux';
import {post} from '../../../Services/ApiRequest';

const validationSchema = Yup.object().shape({
  password: Yup.string().trim().required('Please enter Current Password'),
  newPassword: Yup.string()
    .required('Please enter New Password')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Za-z]/, 'New Password must contain at least one letter')
    .matches(/[0-9]/, 'New Password must contain at least one number')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'New Password must contain at least one special character',
    ),

  confirmPassword: Yup.string()
    .required('Please enter Confirm Password')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords do not match'),
});

const ChangePassword = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const {token} = useSelector(state => state.authConfigs);

  const handlePress = async values => {
    try {
      setLoading(true);

      const body = {
        employeeId: token,
        newPassword: values.newPassword,
        currentPassword: values.password,
      };

      const res = await post('changeEmployeePassword', body);

      if (res.data?.result) {
        navigation.reset({index: 0, routes: [{name: 'TabStack'}]});
        ToastMessage('Password updated successfully');
      }
      setLoading(false);
    } catch (error) {
      ToastMessage(error?.response?.data?.message);
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header title={'Reset Password'} />}>
      <CustomText
        label={'Secure Your Account'}
        fontSize={16}
        marginTop={20}
        fontFamily={fonts.semiBold}
      />
      <CustomText
        label={'Keep your account secure by updating your password.'}
      />
      <Formik
        initialValues={{password: '', newPassword: '', confirmPassword: ''}}
        onSubmit={values => handlePress(values)}
        validationSchema={validationSchema}>
        {({
          handleChange,
          handleSubmit,
          touched,
          errors,
          setFieldTouched,
          values,
        }) => (
          <View style={className('mt-5')}>
            <CustomInput
              placeholder="Current Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={() => setFieldTouched('password')}
              error={touched.password && errors.password}
              secureTextEntry
            />
            <Error error={errors.password} visible={touched.password} />
            <CustomInput
              placeholder="New Password"
              value={values.newPassword}
              onChangeText={handleChange('newPassword')}
              onBlur={() => setFieldTouched('newPassword')}
              error={touched.newPassword && errors.newPassword}
              secureTextEntry
            />
            <Error error={errors.newPassword} visible={touched.newPassword} />
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
              title={'Change Password'}
              onPress={handleSubmit}
              loading={loading}
              disabled={loading}
              customStyle={{marginTop: 12}}
            />
          </View>
        )}
      </Formik>
    </ScreenWrapper>
  );
};

export default ChangePassword;
