import React, {useContext, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {AppContext} from '../../services/context/Context';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {state, func} = useContext(AppContext);

  const onChangeUsername = (text) => {
    setUsername(text);
  };

  const onChangePass = (value) => {
    setPassword(value);
  };

  const {authState} = state;
  const {authContext} = func;

  const signInHandler = (user, pass) => {
    authContext.signIn(user, pass);
  };
  console.log('authState', authState);

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        style={{borderWidth: 1, width: '50%', borderColor: 'black'}}
        onChangeText={(text) => onChangeUsername(text)}
      />
      <TextInput
        style={{borderWidth: 1, width: '50%', borderColor: 'black'}}
        onChangeText={(text) => onChangePass(text)}
      />
      <Pressable
        style={styles.btnLogin}
        onPress={() => signInHandler(username, password)}>
        <Text style={styles.txtLogin}>Klik untuk Login</Text>
      </Pressable>
      <Text>
        {authState.userName !== null ? 'Berhasil Login' : 'Gagal Login'}
      </Text>

      {authState.error !== null ? <Text>{authState.error}</Text> : null}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  btnLogin: {
    alignItems: 'center',
    backgroundColor: 'blue',
    width: '50%',
    borderRadius: 10,
  },
  txtLogin: {color: 'white'},
});
