import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, Input} from 'components/basic';
import {Formik} from 'formik';

export default function InputList() {
  return (
    <View>
      <Formik
        initialValues={{email: ''}}
        onSubmit={values => console.log(values)}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View>
            <Input
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            <Button onPress={() => handleSubmit()}>Submit</Button>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({});
