import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../Login';
import Register from '../Register';
import Home from '../Home';
import Pagination from '../Pagination';

const Navigation = () => {
    const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName={'Register'}>
       <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Pagination" component={Pagination} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation