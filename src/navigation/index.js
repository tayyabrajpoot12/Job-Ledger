import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

//screens
import AuthStack from './AuthStack';
import MainStack from './MainStack';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  const {token} = useSelector(state => state.authConfigs);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      {token ? (
        <>
          <Stack.Screen name="MainStack" component={MainStack} />
        </>
      ) : (
        <>
          <Stack.Screen name="AuthStack" component={AuthStack} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigation;
