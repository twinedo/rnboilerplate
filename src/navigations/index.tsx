import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, InputComponent, Login} from 'screens';
import UseFetch from 'screens/use-fetch';

const Stack = createStackNavigator();

export default function Navigation() {
  const {Navigator, Screen} = Stack;

  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="Login" component={Login} />
      <Screen name="Home" component={Home} />
      <Screen name="InputComponent" component={InputComponent} />
      <Screen name="UseFetch" component={UseFetch} />
    </Navigator>
  );
}
