import {StyleSheet, Text, TextStyle, View} from 'react-native';
import React, {ReactNode, useState} from 'react';
import {Input, Spacer} from 'components/basic';
import {Formik} from 'formik';
import {KeyboardType} from 'react-native';
import globalStyles from 'styles/globalStyles';
import {ViewStyle} from 'react-native';
import {IInputProps} from 'components/basic/input';
import Foundation from 'react-native-vector-icons/Foundation';
import {WHITE} from 'styles/colors';
import DateTimePickerModal, {
  DateTimePickerProps,
} from 'react-native-modal-datetime-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DropDownPicker, {
  DropDownPickerProps,
  ItemType,
} from 'react-native-dropdown-picker';

export type IFormField<T = Record<string, any>> = {
  [key: string]: keyof T;
};

export type DropdownItemScheme = {
  label: string; // required
  value: string; // required
  icon?: ReactNode;
  parent?: string;
  selectable?: boolean;
  disabled?: boolean;
  testID?: string;
  containerStyle?: ViewStyle | ViewStyle[];
  labelStyle?: TextStyle | TextStyle[];
};

export type IFormType<T = Record<string, any>> = {
  id: string;
  title?: string;
  placeholder: string;
  name: keyof IFormField<T>;
  type: KeyboardType;
  secureTextEntry?: boolean;
  inputType: 'text' | 'date' | 'select' | 'picker' | 'switch' | 'counter';
  prefix?: React.ReactNode;
  postfix?: React.ReactNode;
  options: ItemType<string>[];
} & IInputProps;

export type IFormFieldValues<T = Record<string, any>> = IFormField<T>;

export type TInputListProps<T = Record<string, any>> = {
  form: IFormType<T>[];
  initialValues: IFormFieldValues<T>;
  containerStyle?: ViewStyle | ViewStyle[];
  containerInputStyle?: ViewStyle | ViewStyle[];
  titleStyle?: TextStyle | TextStyle[];
  inputProps?: IInputProps;
  submitComponent: (handleSubmit: () => void) => React.ReactNode;
  validationSchema?: any;
  onSubmit: (values: any) => void;
  dropdownPickerProps?: DropDownPickerProps<any>;
  dateTimePickerProps?: DateTimePickerProps;
};

export default function InputList<T>(props: TInputListProps<IFormField<T>>) {
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
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

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
            {formList.map((o: IFormType, index: number) => (
              <View
                key={o.id.toString()}
                style={[
                  styles.container,
                  globalStyles.relative,
                  {...containerStyle},
                ]}>
                {typeof o.title === 'string' && (
                  <Text style={[globalStyles.headingBlack.h3, {...titleStyle}]}>
                    {o.title}
                  </Text>
                )}
                <Spacer height={10} />
                {o.inputType === 'text' && (
                  <Input
                    placeholder={o.placeholder}
                    onChangeText={handleChange(o.name)}
                    onBlur={handleBlur(o.name) || (() => {})}
                    value={values[o.name].toString()}
                    containerStyle={{...containerInputStyle}}
                    keyboardType={o.type}
                    secureTextEntry={o.secureTextEntry}
                    prefix={o.prefix}
                    postfix={o.postfix}
                    {...inputProps}
                  />
                )}
                {o.inputType === 'date' && (
                  <>
                    <Input
                      placeholder={o.placeholder}
                      onChangeText={() => setDatePickerVisibility(true)}
                      onPressIn={() => setDatePickerVisibility(true)}
                      onBlur={handleBlur(o.name) || (() => {})}
                      value={values[o.name].toString()}
                      containerStyle={{...containerInputStyle}}
                      keyboardType={o.type}
                      secureTextEntry={o.secureTextEntry}
                      prefix={o.prefix}
                      postfix={
                        <AntDesign
                          name="calendar"
                          size={24}
                          onPress={() => setDatePickerVisibility(true)}
                        />
                      }
                      {...inputProps}
                    />
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      onConfirm={val => handleChange(o.name)(val.toString())}
                      onCancel={hideDatePicker}
                      {...props.dateTimePickerProps}
                    />
                  </>
                )}

                {o.inputType === 'picker' ||
                  (o.inputType === 'select' && (
                    <DropDownPicker
                      open={isDropdownVisible}
                      theme="LIGHT"
                      value={values[o.name].toString()}
                      items={o.options}
                      setOpen={setIsDropdownVisible}
                      setValue={(value: any) => handleChange(o.name)(value)}
                      zIndex={3000 + index}
                      zIndexInverse={1000 + index}
                      {...props.dropdownPickerProps}
                    />
                  ))}
                <Spacer height={10} />
                {errors[o.name] && touched[o.name] ? (
                  <View
                    style={[
                      globalStyles.row,
                      globalStyles.alignCenter,
                      globalStyles.columnGap,
                    ]}>
                    <Foundation name="info" color="red" size={24} />
                    <Text style={[globalStyles.headingRegular.h3]}>
                      {errors[o.name]!.toString()}
                    </Text>
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
