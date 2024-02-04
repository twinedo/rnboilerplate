import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import globalStyles from 'styles/globalStyles';
import InputList, {TField} from 'components/layout/input-list';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button} from 'components/basic';

export type THomeField = {
  username: string;
  password: string;
  date: string;
  select: string;
  radio: string;
  counter: number;
  switch: boolean;
  textarea: string;
};

export default function Home() {
  const [formList] = useState<TField[]>([
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
      inputType: 'password',
      options: [],
    },
    {
      id: '3',
      title: 'Date',
      placeholder: '01/12/2024',
      name: 'date',
      type: 'default',
      inputType: 'date',
      options: [],
    },
    {
      id: '4',
      title: 'Select',
      placeholder: 'Select',
      name: 'select',
      type: 'default',
      inputType: 'picker',
      options: ['test1', 'test2'],
    },
    {
      id: '5',
      title: 'Switch',
      placeholder: 'Switch',
      name: 'switch',
      type: 'default',
      inputType: 'switch',
      options: [],
    },
    {
      id: '6',
      title: 'Radio',
      placeholder: 'Radio',
      name: 'radio',
      type: 'default',
      inputType: 'radio',
      options: ['One', 'Two'],
    },
    {
      id: '7',
      title: 'Counter',
      placeholder: 'Counter',
      name: 'counter',
      type: 'default',
      inputType: 'counter',
      options: [],
    },
    {
      id: '8',
      title: 'Text Area',
      placeholder: 'Text Area',
      name: 'textarea',
      type: 'default',
      inputType: 'textarea',
      multiline: true,
      numberOfLines: 5,
      containerStyle: {height: 100},
      style: {height: 100},
      options: [],
    },
  ]);

  return (
    <View
      style={[
        globalStyles.displayFlex,
        globalStyles.horizontalDefaultPadding,
        globalStyles.verticalDefaultPadding,
      ]}>
      <ScrollView>
        <InputList
          form={formList}
          initialValues={{
            username: '',
            password: '',
            date: '',
            select: '',
            switch: false,
            radio: '',
            counter: 0,
            textarea: '',
          }}
          onSubmit={values => console.log('val', values)}
          selectDropdownKeyValue="value"
          submitComponent={handleSubmit => (
            <Button
              onPress={handleSubmit}
              containerStyle={{borderRadius: 5, margin: 10}}>
              Cek
            </Button>
          )}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
