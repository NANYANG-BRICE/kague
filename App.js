import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import Dashboard from './src/screens/Dashboard';
import Register from './src/screens/Register';
import OPT from './src/screens/OPT';
import ResetPassword from './src/screens/ResetPassword';
import Onboarding from './src/screens/Onboarding';
import Settings from './src/screens/Settings';
import Profile from './src/screens/Profile';
import Jobs from './src/screens/Jobs';
import Experience from './src/screens/Experience';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Experience" component={Experience} />
        <Stack.Screen name="Jobs" component={Jobs} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="OPT" component={OPT} />
        <Stack.Screen name="forgot" component={ResetPassword} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

