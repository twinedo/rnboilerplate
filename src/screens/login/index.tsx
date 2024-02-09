import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import InputList, {IFormType} from 'components/layout/input-list';
import {Button} from 'components/basic';
import * as Yup from 'yup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {NavParam} from 'navigations/types';
import {useLoginAPI} from 'services/api/auth';
import {useAppSelector} from 'stores/hooks';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

export type TLoginField = {
  username: string;
  password: string;
};

export default function Login() {
  const navigation = useNavigation<StackNavigationProp<NavParam, 'Login'>>();
  const [formList, setFormList] = useState<IFormType[]>([
    {
      id: '1',
      title: 'Username',
      placeholder: 'Username',
      name: 'username',
      type: 'default',
      inputType: 'text',
      options: [],
    },
    {
      id: '2',
      title: 'Password',
      placeholder: 'Password',
      name: 'password',
      type: 'default',
      inputType: 'text',
      options: [],
    },
  ]);

  const {login} = useLoginAPI();
  const authState = useAppSelector(state => state.auth);

  console.log('authSTate', authState);

  return (
    <View>
      <Text>Login</Text>
      <InputList
        form={formList}
        initialValues={{username: '', password: ''}}
        validationSchema={LoginSchema}
        onSubmit={values => {
          console.log('val', values);
          login();
        }}
        submitComponent={handleSubmit => (
          <Button
            onPress={handleSubmit}
            // onPress={() => navigation.navigate('Home')}
            containerStyle={{borderRadius: 5, margin: 10}}>
            Submit
          </Button>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
