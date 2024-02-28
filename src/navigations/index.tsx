import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from 'screens';

const Stack = createStackNavigator();

export default function Navigation() {
  const {Navigator, Screen} = Stack;

  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="Home" component={Home} />
    </Navigator>
  );
}
