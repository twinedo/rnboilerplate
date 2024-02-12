import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Animations,
  BottomNav,
  Home,
  InputComponent,
  Login,
  SideNav,
  TopNav,
} from 'screens';
import UseFetch from 'screens/use-fetch';

const Stack = createStackNavigator();

export default function Navigation() {
  const {Navigator, Screen} = Stack;

  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="Login" component={Login} />
      <Screen name="Home" component={Home} />
      <Screen name="Animations" component={Animations} />
      <Screen name="BottomNav" component={BottomNav} />
      <Screen name="SideNav" component={SideNav} />
      <Screen name="TopNav" component={TopNav} />
      <Screen name="InputComponent" component={InputComponent} />
      <Screen name="UseFetch" component={UseFetch} />
    </Navigator>
  );
}
