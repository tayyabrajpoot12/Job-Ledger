import {Formik} from 'formik';
import {useState} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import * as Yup from 'yup';

import fonts from '../../../assets/fonts';
import CustomButton from '../../../components/CustomButton';
import CustomInput from '../../../components/CustomInput';
import CustomText from '../../../components/CustomText';
import Error from '../../../components/Error';
import Header from '../../../components/Header';
import ScreenWrapper from '../../../components/ScreenWrapper';
import {className} from '../../../global-styles';
import {setToken} from '../../../store/reducer/AuthConfig';
import {COLORS} from '../../../utils/COLORS';

import {useNavigation} from '@react-navigation/native';
import {ToastMessage} from '../../../utils/ToastMessage';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .transform(value => value.trim())
    .test(
      'not-empty',
      'Name cannot be empty or just spaces',
      value => value && value.trim().length > 0,
    )
    .min(3, 'Must be at least 3 characters long')
    .required('Name is required')
    .label('Name'),

  email: Yup.string().required('Email is required').email().label('Email'),
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

const Signup = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async state => {
    try {
      setIsLoading(true);

      const body = {
        email: state?.email,
        password: state.password,
        name: state?.name?.trim(),
        confirmPassword: state.confirmPassword,
      };

      console.log(body);

      dispatch(setToken('response.data?.token'));

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      ToastMessage(error?.response?.data?.message);
      setIsLoading(false);
    }
  };

  return (
    <ScreenWrapper scrollEnabled headerUnScrollable={() => <Header />}>
      <CustomText
        label={'Sign up'}
        fontSize={20}
        fontFamily={fonts.semiBold}
        color={COLORS.primaryColor}
      />

      <Formik
        initialValues={{name: '', email: '', password: '', confirmPassword: ''}}
        onSubmit={values => handleSignup(values)}
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
              placeholder={'Name'}
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={() => setFieldTouched('name')}
              error={touched.name && errors.name}
            />
            <Error error={errors.name} visible={touched.name} />
            <CustomInput
              placeholder={'Email'}
              value={values.email}
              onBlur={() => setFieldTouched('email')}
              onChangeText={handleChange('email')}
              error={touched.email && errors.email}
            />
            <Error error={errors.email} visible={touched.email} />

            <CustomInput
              placeholder={'Password'}
              secureTextEntry
              value={values.password}
              onBlur={() => setFieldTouched('password')}
              onChangeText={handleChange('password')}
              error={touched.password && errors.password}
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
              title={'Signup'}
              marginTop={20}
              loading={isLoading}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
      <CustomText
        marginTop={20}
        alignSelf={'center'}
        label={'Already have an account? Login'}
        onPress={() => navigation.goBack()}
      />
    </ScreenWrapper>
  );
};

export default Signup;
