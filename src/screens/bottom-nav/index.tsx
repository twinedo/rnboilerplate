import {Dimensions, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Home, Profile, Transactions} from 'screens';
import {GREY1} from 'styles/colors';
import {percentageWidth} from 'utils/screenSize';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';

const Tab = createMaterialTopTabNavigator();

export default function BottomNav() {
  const [menu] = useState([
    {
      id: '1',
      name: 'Home',
      component: Home,
      title: 'Home',
      icon: (color: string) => (
        <SimpleLineIcons name="home" size={24} color={color} />
      ),
    },
    {
      id: '2',
      name: 'Transactions',
      component: Transactions,
      title: 'Transactions',
      icon: (color: string) => (
        <MaterialCommunityIcons
          name="bell-badge-outline"
          size={24}
          color={color}
        />
      ),
    },
    {
      id: '3',
      name: 'Profile',
      component: Profile,
      title: 'Profile',
      icon: (color: string) => (
        <Octicons name="person" size={24} color={color} />
      ),
    },
  ]);

  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      initialLayout={{width: Dimensions.get('window').width}}
      screenOptions={{
        animationEnabled: true,
        tabBarActiveTintColor: '#e91e63',
        tabBarInactiveTintColor: GREY1,
        tabBarStyle: styles.tabBar,
        tabBarIndicatorStyle: styles.tabIndicator,
      }}>
      {menu.map(o => (
        <Tab.Screen
          key={o.id}
          name={o.name}
          component={o.component}
          options={{
            tabBarIcon: ({color}) => o.icon(color),
            title: o.title,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
    elevation: 20,
    height: 70,
  },
  tabIndicator: {
    position: 'absolute',
    top: 0,
    left: percentageWidth(8),
    right: 0,
    elevation: 5,
    backgroundColor: '#e91e63',
    borderRadius: 30,
    height: 5,
    width: percentageWidth(16),
  },
});
