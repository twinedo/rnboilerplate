import {
  StyleSheet,
  Text,
  TextStyle,
  View,
  Switch,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Counter, Input, Spacer} from 'components/basic';
import {Formik} from 'formik';
import {KeyboardType} from 'react-native';
import globalStyles from 'styles/globalStyles';
import {ViewStyle} from 'react-native';
import {IInputProps} from 'components/basic/input';
import Foundation from 'react-native-vector-icons/Foundation';
import {GREY8} from 'styles/colors';
import DateTimePickerModal, {
  DateTimePickerProps,
} from 'react-native-modal-datetime-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectDropdown, {
  SelectDropdownProps,
} from 'react-native-select-dropdown';

export type IFormField<T = Record<any, any> | boolean> = {
  [key: string | number]: keyof T;
};

export type IFormType<T = Record<any, any>> = {
  id: string;
  title?: string;
  placeholder: string;
  name: keyof IFormField<T>;
  type?: KeyboardType;
  secureTextEntry?: boolean;
  inputType:
    | 'text'
    | 'textarea'
    | 'date'
    | 'select'
    | 'picker'
    | 'switch'
    | 'counter'
    | 'radio';
  prefix?: React.ReactNode;
  postfix?: React.ReactNode;
  options: string[] | object[];
} & IInputProps;

export type IFormFieldValues<T = Record<string, any>> = IFormField<T>;

export type TInputListProps<T = Record<string, any>> = {
  form: IFormType<T>[];
  initialValues: IFormField<T>;
  containerStyle?: ViewStyle | ViewStyle[];
  containerInputStyle?: ViewStyle | ViewStyle[];
  titleStyle?: TextStyle | TextStyle[];
  inputProps?: IInputProps;
  submitComponent: (handleSubmit: () => void) => React.ReactNode;
  validationSchema?: any;
  onSubmit: (values: any) => void;
  selectDropdownProps?: SelectDropdownProps;
  selectDropdownKeyValue?: string | '';
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
    selectDropdownProps,
    selectDropdownKeyValue,
    dateTimePickerProps,
  } = props;
  const [formList] = useState<IFormType[]>(form);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const [isSwitch, setIsSwitch] = useState(false);
  const toggleSwitch = () => setIsSwitch(previousState => !previousState);

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
          setFieldValue,
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
                {o.inputType === 'textarea' && (
                  <Input
                    placeholder={o.placeholder}
                    onChangeText={handleChange(o.name)}
                    onBlur={handleBlur(o.name) || (() => {})}
                    value={values[o.name].toString()}
                    keyboardType={o.type}
                    prefix={o.prefix}
                    postfix={o.postfix}
                    multiline={o.multiline}
                    numberOfLines={o.numberOfLines}
                    containerStyle={{...containerInputStyle}}
                    style={styles.textAreaStyle}
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
                      onFocus={() => setDatePickerVisibility(true)}
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
                      onConfirm={val => {
                        handleChange(o.name)(val.toString());
                        setDatePickerVisibility(false);
                      }}
                      onCancel={hideDatePicker}
                      {...dateTimePickerProps}
                    />
                  </>
                )}

                {(o.inputType === 'picker' || o.inputType === 'select') && (
                  <SelectDropdown
                    data={o.options}
                    onSelect={(selectedItem, i) => {
                      console.log(selectedItem, i);
                    }}
                    buttonStyle={[
                      styles.btnStyle,
                      selectDropdownProps?.buttonStyle,
                    ]}
                    buttonTextStyle={styles.btnTextStyle}
                    renderDropdownIcon={() => (
                      <Ionicons name="chevron-down" size={24} />
                    )}
                    defaultButtonText="Select"
                    buttonTextAfterSelection={selectedItem => {
                      if (typeof selectedItem === 'object') {
                        return selectedItem[selectDropdownKeyValue!];
                      } else {
                        return selectedItem;
                      }
                    }}
                    rowTextForSelection={item => {
                      if (typeof item === 'object') {
                        return item[selectDropdownKeyValue!];
                      } else {
                        return item;
                      }
                    }}
                    {...selectDropdownProps}
                  />
                )}
                {o.inputType === 'radio' && (
                  <View
                    style={[
                      globalStyles.row,
                      globalStyles.alignCenter,
                      globalStyles.flexWrap,
                    ]}>
                    {o.options.map(item => (
                      <TouchableOpacity
                        style={[globalStyles.displayFlex]}
                        onPress={() => handleChange(o.name)(item as string)}>
                        <MaterialCommunityIcons
                          name={
                            item === values[o.name]
                              ? 'circle-slice-8'
                              : 'circle-outline'
                          }
                          size={24}
                          color={GREY8}
                        />
                        <Text style={[globalStyles.headingRegular.h3]}>
                          {item.toString()}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
                {o.inputType === 'switch' && (
                  <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={values[o.name] ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => {
                      toggleSwitch();
                      setFieldValue(o.name as string, !values[o.name]);
                    }}
                    value={isSwitch}
                  />
                )}
                {o.inputType === 'counter' && (
                  <Counter
                    onChangeValue={val => setFieldValue(o.name as string, val)}
                    defaultValue={values[o.name] as number}
                  />
                )}
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
  btnStyle: {
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'flex-start',
    borderColor: GREY8,
    width: '100%',
    backgroundColor: 'transparent',
  },
  btnTextStyle: {
    textAlign: 'left',
    marginHorizontal: 0,
    color: GREY8,
  },
  textAreaStyle: {textAlignVertical: 'top'},
});
