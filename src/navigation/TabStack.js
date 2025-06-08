/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icons from '../components/Icons';

// screen
import Home from '../screens/Main/Home';
import Schedule from '../screens/Main/Schedule';
import Settings from '../screens/Main/Settings';
import EmployeeTasks from '../screens/Main/EmployeeTasks';

import {get} from '../Services/ApiRequest';
import {setUserData} from '../store/reducer/usersSlice';
import {COLORS} from '../utils/COLORS';
import fonts from '../assets/fonts';

const Tab = createBottomTabNavigator();

const TabIcon = ({name, family, focused}) => {
  return (
    <Icons
      size={23}
      name={name}
      family={family}
      color={focused ? COLORS.primaryColor : COLORS.gray1}
    />
  );
};

const TabStack = () => {
  const dispatch = useDispatch();

  const {token} = useSelector(state => state.authConfigs);

  useFocusEffect(
    React.useCallback(() => {
      const getProfile = async () => {
        try {
          const url = `/getMyProfile/${token}`;

          const response = await get(url);
          if (response.data?.result) {
            dispatch(setUserData(response.data?.data));
          }
        } catch (error) {
          console.log(error, 'err in get user');
        }
      };
      getProfile();
      return () => {};
    }, [dispatch, token]),
  );

  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: COLORS.primaryColor,
        tabBarInactiveTintColor: '#000000',
        tabBarStyle: [styles.tabBarStyle],
        tabBarLabelStyle: styles.labelStyle,
        headerShown: false,
        tabBarHideOnKeyboard: true,
      })}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} name={'home'} />
          ),
        }}
        name={'Home'}
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} name={'calendar'} />
          ),
        }}
        name={'Schedule'}
        component={Schedule}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon
              focused={focused}
              name={'business-time'}
              family={'FontAwesome5'}
            />
          ),
          tabBarLabel: 'Projects',
        }}
        name={'EmployeeTasks'}
        component={EmployeeTasks}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon name={'settings'} focused={focused} />
          ),
        }}
        name={'Settings'}
        component={Settings}
      />
    </Tab.Navigator>
  );
};

export default TabStack;
const styles = StyleSheet.create({
  icon: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
  profile: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    borderRadius: 50,
  },
  tabBarStyle: {
    height: 75,
    backgroundColor: COLORS.white,
    paddingTop: 8,
  },
  labelStyle: {
    fontFamily: fonts.medium,
    fontSize: 11,
    marginTop: 5,
  },
});
