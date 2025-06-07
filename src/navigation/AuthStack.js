import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

//screens
import Login from '../screens/Auth/Login';
import ResetPass from '../screens/Auth/ResetPass';
import Signup from '../screens/Auth/Signup';

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
      <Stack.Screen name="ResetPass" component={ResetPass} />
    </Stack.Navigator>
  );
};

export default AuthStack;
