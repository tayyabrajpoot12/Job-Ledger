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
import {ToastMessage} from '../../../utils/ToastMessage';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required').label('Username'),
  password: Yup.string()
    .trim()
    .required('Password is required')
    .label('Password'),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async state => {
    try {
      setIsLoading(true);

      const body = {
        username: state?.username?.trim(),
        password: state.password,
      };

      const res = await post('employeeLogin', body);
      if (res.data?.result) {
        const id = res.data?.data?._id;
        dispatch(setToken(id));
      }
      setIsLoading(false);
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
        initialValues={{username: '', password: ''}}
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
              placeholder={'Username'}
              value={values.username}
              onBlur={() => setFieldTouched('username')}
              onChangeText={handleChange('username')}
              error={touched.username && errors.username}
            />
            <Error error={errors.username} visible={touched.username} />
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
              color={COLORS.gray1}
              alignSelf={'flex-end'}
              label={'Forgot Password?'}
              fontFamily={fonts.semiBold}
              onPress={() => navigation.navigate('ForgotPassword')}
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
