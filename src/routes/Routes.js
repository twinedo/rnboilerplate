import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../pages/auth/Login';
import Home from '../pages/home/Home';
import {NavigationContainer} from '@react-navigation/native';
import {AppContext} from '../services/context/Context';
const Stack = createStackNavigator();

const Routes = () => {
  const {state} = useContext(AppContext);
  const {authState} = state;
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {authState.userToken === null ? (
          <Stack.Screen name="Login" component={Login} />
        ) : (
          <Stack.Screen name="Home" component={Home} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
