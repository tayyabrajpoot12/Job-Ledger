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
import {COLORS} from '../../../utils/COLORS';

import {useNavigation} from '@react-navigation/native';
import {post} from '../../../Services/ApiRequest';
import {setToken} from '../../../store/reducer/AuthConfig';
import {regEmail} from '../../../utils/constants';
import {ToastMessage} from '../../../utils/ToastMessage';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .matches(regEmail, 'Please enter correct email')
    .label('Email'),
  password: Yup.string()
    .trim()
    .required('Password is required')
    .label('Password'),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async () => {
    try {
      navigation.navigate('ResetPass', {token: ''});
    } catch (err) {
      console.log(err?.response);
      ToastMessage(err?.response?.data?.message);
    }
  };

  const handleLogin = async state => {
    try {
      setIsLoading(true);

      const body = {
        email: state?.email?.trim(),
        password: state.password,
      };

      const res = await post('employeeLogin', body);
      if (res.data?.result) {
        const id = res.data?.data?._id;
        dispatch(setToken(id));
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      ToastMessage(error?.response?.data?.message);
      setIsLoading(false);
    }
  };

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header isBack={false} title={'Job Ledger'} />}>
      <CustomText
        fontSize={20}
        marginTop={5}
        label={'Login'}
        fontFamily={fonts.semiBold}
        color={COLORS.primaryColor}
      />
      <CustomText label={'Enter your login details'} />

      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={values => handleLogin(values)}
        validationSchema={validationSchema}>
        {({
          handleChange,
          handleSubmit,
          touched,
          errors,
          setFieldTouched,
          values,
        }) => (
          <View style={className('mt-4')}>
            <CustomInput
              placeholder={'Email'}
              value={values.email}
              keyboardType={'email-address'}
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
              marginBottom={10}
            />
            <Error error={errors.password} visible={touched.password} />
            <CustomText
              label={'Forgot Password?'}
              fontFamily={fonts.semiBold}
              onPress={handleForgotPassword}
              alignSelf={'flex-end'}
              color={COLORS.gray1}
            />
            <CustomButton
              marginTop={25}
              title={'Login'}
              loading={isLoading}
              disabled={isLoading}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
    </ScreenWrapper>
  );
};

export default Login;
