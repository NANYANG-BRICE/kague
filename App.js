import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import Dashboard from './src/screens/Dashboard';
import Register from './src/screens/Register';
import OPT from './src/screens/OPT';
import ResetPassword from './src/screens/ResetPassword';
import Onboarding from './src/screens/Onboarding';
import Jobs from './src/screens/Jobs';
import Contacts from './src/screens/Contacts';
import JobsOffer from './src/screens/JobsOffer';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="JobsOffer" component={JobsOffer} />
        <Stack.Screen name="Jobs" component={Jobs} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="OPT" component={OPT} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="forgot" component={ResetPassword} />
        <Stack.Screen name="Contacts" component={Contacts} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

