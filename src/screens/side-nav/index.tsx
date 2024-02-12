import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {GREY10, RED, WHITE} from 'styles/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import globalStyles from 'styles/globalStyles';
import {RouteProp, useRoute} from '@react-navigation/native';
import {NavParam} from 'navigations/types';
import {Home, Profile, Transactions} from 'screens';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {percentageHeight} from 'utils/screenSize';

function CustomDrawerContent(props) {
  //   const {_onLogout} = authStore();

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={[
          globalStyles.displayFlex,
          globalStyles.verticalDefaultPadding,
          {height: percentageHeight(98)},
        ]}>
        <View
          style={[
            globalStyles.relative,
            globalStyles.alignCenter,
            {marginVertical: 10},
          ]}>
          <View style={[globalStyles.relative, {borderRadius: 50}]}>
            <Image
              source={require('assets/images/img_avatar.png')}
              style={{width: 100, height: 100, borderRadius: 50}}
            />
          </View>
          <Text style={[globalStyles.headingBold.h3]}>FirstName</Text>
          <Text style={[globalStyles.headingRegular.h3, {color: '#959595'}]}>
            ID: 132132131
          </Text>
        </View>
        <View style={globalStyles.displayFlex}>
          <DrawerItemList {...props} />
        </View>
        <DrawerItem
          label="Logout"
          onPress={() => {}} //add function Logout
          style={styles.logoutStyle}
          labelStyle={styles.logoutLabelStyle}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

const SideNav = () => {
  const route = useRoute<RouteProp<NavParam>>();
  const [focusedMenu, setFocusedMenu] = useState('');

  const listMenu = [
    {
      id: 1,
      name: 'Home',
      component: Home,
      label: 'Home',
      icon: (
        <SimpleLineIcons
          name="home"
          size={24}
          color={focusedMenu === 'Home' ? RED : '#959595'}
        />
      ),
    },
    {
      id: 2,
      name: 'Transactions',
      component: Transactions,
      label: 'Transactions',
      icon: (
        <MaterialCommunityIcons
          name="bell-badge-outline"
          size={24}
          color={focusedMenu === 'Transactions' ? RED : '#959595'}
        />
      ),
    },
    {
      id: 3,
      name: 'Profile',
      component: Profile,
      label: 'Profile',
      icon: (
        <Ionicons
          name="person-outline"
          size={24}
          color={focusedMenu === 'Profile' ? RED : '#959595'}
        />
      ),
    },
  ];

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {backgroundColor: WHITE},
        drawerItemStyle: {
          backgroundColor: WHITE,
          borderWidth: 1,
          borderColor: GREY10,
          borderRadius: 20,
        },
        drawerStatusBarAnimation: 'fade',
      }}>
      {listMenu.map(o => (
        <Drawer.Screen
          key={o.id.toString()}
          name={o.name}
          component={o.component}
          options={{
            headerStyle: globalStyles.bgTransparent,
            drawerLabel: ({focused}) => {
              focused && setFocusedMenu(o.name);
              return (
                <View
                  style={[
                    globalStyles.row,
                    globalStyles.columnGap,
                    globalStyles.alignCenter,
                    globalStyles.justifyCenter,
                  ]}>
                  {o.icon}
                  <Text
                    style={[
                      focused
                        ? globalStyles.headingBlack.h3
                        : globalStyles.headingRegular.h3,
                      {color: focused ? RED : '#959595'},
                    ]}>
                    {o.label}
                  </Text>
                </View>
              );
            },
            headerShown: true,

            drawerActiveBackgroundColor: 'red',
          }}
        />
      ))}
    </Drawer.Navigator>
  );
};

export default SideNav;

const styles = StyleSheet.create({
  logoutStyle: {
    backgroundColor: WHITE,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: RED,
    marginTop: 30,
    paddingLeft: 30,
  },
  logoutLabelStyle: {
    textAlign: 'center',
    fontSize: 24,
    color: RED,
  },
});
