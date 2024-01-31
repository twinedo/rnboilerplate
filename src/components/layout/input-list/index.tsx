import {StyleSheet, Text, TextStyle, View} from 'react-native';
import React, {useState} from 'react';
import {Input} from 'components/basic';
import {Formik} from 'formik';
import {KeyboardType} from 'react-native';
import globalStyles from 'styles/globalStyles';
import {ViewStyle} from 'react-native';
import {IInputProps} from 'components/basic/input';
import Ionicons from 'react-native-vector-icons/Ionicons';

export type IFormType = {
  id: number;
  title: string;
  placeholder: string;
  name: keyof IFormField;
  type: KeyboardType;
  isText: boolean;
  isOption?: boolean;
  isDate?: boolean;
  isAttach?: boolean;
  prefix?: any;
  postfix?: any;
  options?: any[];
};

export type IFormField = {
  username: string;
  password: string;
};

export type TInputListProps = {
  form: IFormType[];
  initialValues: IFormField;
  containerStyle?: ViewStyle | ViewStyle[];
  containerInputStyle?: ViewStyle | ViewStyle[];
  titleStyle?: TextStyle | TextStyle[];
  inputProps?: IInputProps;
  submitComponent: (handleSubmit: () => void) => React.ReactNode;
  validationSchema?: any;
  onSubmit: (values: IFormField) => void;
};

export default function InputList(props: TInputListProps) {
  const {
    form,
    initialValues,
    containerStyle,
    containerInputStyle,
    titleStyle,
    inputProps,
    validationSchema,
    submitComponent,
    onSubmit,
  } = props;
  const [formList] = useState<IFormType[]>(form);

  return (
    <View>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={values => onSubmit(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            {formList.map((o: IFormType) => (
              <View
                key={o.id.toString()}
                style={[
                  styles.container,
                  globalStyles.relative,
                  {...containerStyle},
                ]}>
                <Text style={[globalStyles.headingBlack.h3, {...titleStyle}]}>
                  {o.title}
                </Text>
                <Input
                  placeholder={o.placeholder}
                  onChangeText={handleChange(o.name)}
                  onBlur={handleBlur(o.name)}
                  value={values[o.name].toString()}
                  containerStyle={{...containerInputStyle}}
                  keyboardType={o.type}
                  {...inputProps}
                />

                {errors[o.name] && touched[o.name] ? (
                  <View
                    style={[
                      globalStyles.row,
                      globalStyles.alignCenter,
                      globalStyles.columnGap,
                    ]}>
                    <Ionicons name="information" color="red" size={24} />
                    <Text>{errors[o.name]?.toString()}</Text>
                  </View>
                ) : null}
              </View>
            ))}
            {submitComponent(handleSubmit)}
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {marginVertical: 10, marginHorizontal: 10},
});
