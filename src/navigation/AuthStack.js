import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

//screens
import Login from '../screens/Auth/Login';
import Signup from '../screens/Auth/Signup';
import OTPScreen from '../screens/Auth/ForgotPassword/OtpScreen';
import ResetPassword from '../screens/Auth/ForgotPassword/ResetPassword';
import ForgotPassword from '../screens/Auth/ForgotPassword';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="OTPScreen" component={OTPScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default AuthStack;
