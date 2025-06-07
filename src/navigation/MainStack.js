import {createNativeStackNavigator} from '@react-navigation/native-stack';

//screens
import TabStack from './TabStack';
import ChangePassword from '../screens/Main/Settings/ChangePassword';
import EditProfile from '../screens/Main/Settings/EditProfile';
import TaskDetails from '../screens/Main/EmployeeTasks/TaskDetails';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="TabStack" component={TabStack} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="TaskDetails" component={TaskDetails} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
};

export default MainStack;
