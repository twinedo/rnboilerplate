import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import InputList, {IFormType} from 'components/layout/input-list';
import {Button} from 'components/basic';

export default function Login() {
  const [formList, setFormList] = useState<IFormType[]>([
    {
      id: 1,
      title: 'Username',
      placeholder: 'Username',
      name: 'username',
      type: 'default',
      isText: true,
    },
    {
      id: 2,
      title: 'Password',
      placeholder: 'Password',
      name: 'password',
      type: 'default',
      isText: true,
    },
  ]);

  return (
    <View>
      <Text>Login</Text>
      <InputList
        form={formList}
        initialValues={{username: '', password: ''}}
        onSubmit={values => console.log('val', values)}
        submitComponent={handleSubmit => (
          <Button
            onPress={handleSubmit}
            containerStyle={{borderRadius: 5, margin: 10}}>
            Submit
          </Button>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
