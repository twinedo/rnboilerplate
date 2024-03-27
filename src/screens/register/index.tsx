import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Button} from 'components/atoms';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {NavParam} from 'navigations/types';
import globalStyles from 'styles/globalStyles';
import {InputListHook} from 'components/organism';
import {IFormField, IFormType} from 'components/organism/input-listhook';
import {yupResolver} from '@hookform/resolvers/yup';

const RegisterSchema = Yup.object().shape({
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
      name: 'username' as keyof IFormField,
      type: 'default',
      inputType: 'text',
      options: [],
    },
    {
      id: '2',
      title: 'Password',
      placeholder: 'Password',
      name: 'password' as keyof IFormField,
      type: 'default',
      inputType: 'password',
      options: [],
    },
  ]);

  return (
    <View>
      <Text>Login</Text>
      <InputListHook
        form={formList}
        initialValues={{username: '', password: ''}}
        resolver={yupResolver(RegisterSchema)}
        onSubmit={values => console.log('val', values)}
        ListFooterComponent={
          <Pressable style={[globalStyles.horizontalDefaultPadding]}>
            <Text>Register</Text>
          </Pressable>
        }
        submitComponent={handleSubmit => (
          <Button
            // onPress={handleSubmit}
            onPress={() => navigation.navigate('Home')}
            containerStyle={{borderRadius: 5, margin: 10}}>
            Submit
          </Button>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
