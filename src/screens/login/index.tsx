import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import InputList, {
  IFormField,
  IFormType,
} from 'components/organism/input-listhook';
import {Button} from 'components/atoms';
import * as Yup from 'yup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {NavParam} from 'navigations/types';
import globalStyles from 'styles/globalStyles';
import {InputListHook} from 'components/organism';
import {Controller, useFieldArray, useForm} from 'react-hook-form';

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

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {} as TLoginField,
  });

  const onSubmit = (data: TLoginField) => console.log(data);

  return (
    <ScrollView>
      <Text>Login</Text>
      <InputList
        form={formList}
        initialValues={{username: '', password: ''}}
        validationSchema={LoginSchema}
        onSubmit={values => console.log('val', values)}
        ListFooterComponent={
          <Pressable style={globalStyles.horizontalDefaultPadding}>
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
      <InputListHook
        form={formList}
        initialValues={{username: '', password: ''}}
        validationSchema={LoginSchema}
        onSubmit={values => console.log('val', values)}
        ListFooterComponent={
          <Pressable style={globalStyles.horizontalDefaultPadding}>
            <Text>Register</Text>
          </Pressable>
        }
        submitComponent={handleSubmit => (
          <Button
            onPress={handleSubmit}
            // onPress={() => navigation.navigate('Home')}
            containerStyle={{borderRadius: 5, margin: 10}}>
            Submit
          </Button>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
