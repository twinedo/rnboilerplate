import React, {useContext} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {AppContext} from '../../services/context/Context';

const Home = () => {
  const {state, func} = useContext(AppContext);
  const {authContext} = func;

  console.log('satteah', state);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home Sweet Home</Text>
      <Pressable style={styles.btnLogout} onPress={() => authContext.signOut()}>
        <Text style={{color: 'white'}}>Klik untuk Logout</Text>
      </Pressable>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  btnLogout: {
    alignItems: 'center',
    backgroundColor: 'red',
    width: '50%',
    borderRadius: 10,
  },
});
