import {
  StyleSheet,
  Text,
  TextStyle,
  View,
  Switch,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

import {KeyboardType} from 'react-native';
import globalStyles from 'styles/globalStyles';
import {ViewStyle} from 'react-native';
import {IInputProps} from 'components/molecules/input';
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
import moment from 'moment';
import {Spacer} from 'components/atoms';
import {Counter, Input} from 'components/molecules';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

type TFieldTypes =
  | 'text'
  | 'textarea'
  | 'password'
  | 'date'
  | 'select'
  | 'picker'
  | 'switch'
  | 'counter'
  | 'radio';

type TFieldOptions = string[] | object[];

export type IFormField<T = Record<any, any> | boolean> = {
  [key: string]: T[keyof T];
};

export type TField<T extends TFieldOptions = TFieldOptions> = {
  id: string;
  title?: string;
  placeholder: string;
  name: keyof IFormField;
  type: 'default';
  inputType: TFieldTypes;
  options: T;
} & IInputProps;

export type IFormType<T = Record<any, any>> = {
  id: string;
  title?: string;
  placeholder: string;
  name: keyof IFormField<T>;
  type?: KeyboardType;
  secureTextEntry?: boolean;
  inputType: TFieldTypes;
  prefix?: React.ReactNode;
  postfix?: React.ReactNode;
  options: string[] | object[];
  selectDropdownTextKey?: string | null;
  selectDropdownValueKey?: string | null;
} & IInputProps;

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
  formatDate?:
    | 'DD-MM-YYYY'
    | 'DD/MM/YYYY'
    | 'DD-MMM-YYYY'
    | 'DD/MMM/YYYY'
    | string;
  ListHeaderComponent?: React.ReactNode;
  ListFooterComponent?: React.ReactNode;
};

export default function InputListHook(props: TInputListProps<IFormField>) {
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
    formatDate = 'DD-MM-YYYY',
    ListHeaderComponent,
    ListFooterComponent,
  } = props;
  const [formList, setFormList] = useState<IFormType[]>(form);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const togglePasswordVisibility = (index: number) => {
    const dat = [...formList];
    dat[index].secureTextEntry = !dat[index].secureTextEntry;
    setFormList(dat);
  };

  return (
    <View>
      {ListHeaderComponent}
      {formList.map((o: IFormType, i: number) => (
        <View
          key={o.id.toString()}
          style={[
            styles.container,
            globalStyles.relative,
            {...containerStyle},
          ]}>
          {typeof o.title === 'string' && (
            <>
              <Text style={[globalStyles.headingBlack.h3, {...titleStyle}]}>
                {o.title}
              </Text>
              <Spacer height={10} />
            </>
          )}
          <Spacer height={10} />
          <Controller
            control={control}
            name={o.name as keyof IFormType}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                {(o.inputType === 'text' || o.inputType === 'password') && (
                  <Input
                    placeholder={o.placeholder}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    containerStyle={{...containerInputStyle}}
                    keyboardType={o.type}
                    secureTextEntry={
                      o.inputType === 'password' ? !o.secureTextEntry : false
                    }
                    prefix={o.prefix}
                    postfix={
                      o.inputType === 'password' ? (
                        <Ionicons
                          name={!o.secureTextEntry ? 'eye' : 'eye-off'}
                          size={24}
                          onPress={() => togglePasswordVisibility(i)}
                        />
                      ) : (
                        o.postfix
                      )
                    }
                    {...inputProps}
                  />
                )}
                {o.inputType === 'textarea' && (
                  <Input
                    placeholder={o.placeholder}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
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
                      onBlur={onBlur}
                      onFocus={() => setDatePickerVisibility(true)}
                      value={value}
                      containerStyle={{...containerInputStyle}}
                      keyboardType={o.type}
                      prefix={o.prefix}
                      postfix={
                        o.postfix !== undefined && (
                          <AntDesign
                            name="calendar"
                            size={24}
                            onPress={() => setDatePickerVisibility(true)}
                          />
                        )
                      }
                      {...inputProps}
                    />
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      onConfirm={val => {
                        setValue(
                          o.name.toString(),
                          moment(val).format(formatDate),
                        );
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
                    onSelect={(selectedItem, idx) => {
                      console.log(selectedItem, idx);
                      if (typeof selectedItem === 'object') {
                        setValue(
                          o?.name?.toString(),
                          selectedItem[o.selectDropdownValueKey!].toString(),
                        );
                      } else {
                        setValue(o?.name?.toString(), selectedItem);
                      }
                    }}
                    buttonStyle={[
                      styles.btnStyle,
                      selectDropdownProps?.buttonStyle,
                    ]}
                    buttonTextStyle={styles.btnTextStyle}
                    renderDropdownIcon={() =>
                      o.postfix === undefined ? (
                        <Ionicons name="chevron-down" size={24} />
                      ) : (
                        o.postfix
                      )
                    }
                    defaultButtonText={o.placeholder}
                    buttonTextAfterSelection={selectedItem => {
                      if (typeof selectedItem === 'object') {
                        return selectedItem[o.selectDropdownTextKey!];
                      } else {
                        return selectedItem;
                      }
                    }}
                    rowTextForSelection={item => {
                      if (typeof item === 'object') {
                        return item[o.selectDropdownTextKey!];
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
                        style={[
                          globalStyles.displayFlex,
                          globalStyles.row,
                          globalStyles.columnGap,
                        ]}
                        onPress={() =>
                          setValue(o.name.toString(), item as string)
                        }>
                        <MaterialCommunityIcons
                          name={
                            item === value[o.name]
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
                    thumbColor={value[o.name] ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => {
                      setValue(o.name as string, !value[o.name]);
                    }}
                    value={value[o.name] as boolean}
                  />
                )}
                {o.inputType === 'counter' && (
                  <Counter
                    onChangeValue={val => setValue(o.name as string, val)}
                    defaultValue={value[o.name] as number}
                  />
                )}
                <Spacer height={10} />
                {errors[o.name] ? (
                  <View
                    style={[
                      globalStyles.row,
                      globalStyles.alignCenter,
                      globalStyles.columnGap,
                    ]}>
                    <Foundation name="info" color="red" size={24} />
                    <Text style={[globalStyles.headingRegular.h3]}>
                      {errors[o.name]?.message!.toString()}
                    </Text>
                  </View>
                ) : null}
              </>
            )}
          />
        </View>
      ))}
      {ListFooterComponent}
      {submitComponent(handleSubmit(onSubmit))}
      {/* <Formik
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
            {ListHeaderComponent}
            {formList.map((o: IFormType, i: number) => (
              <View
                key={o.id.toString()}
                style={[
                  styles.container,
                  globalStyles.relative,
                  {...containerStyle},
                ]}>
                {typeof o.title === 'string' && (
                  <>
                    <Text
                      style={[globalStyles.headingBlack.h3, {...titleStyle}]}>
                      {o.title}
                    </Text>
                    <Spacer height={10} />
                  </>
                )}
                <Spacer height={10} />
                {(o.inputType === 'text' || o.inputType === 'password') && (
                  <Input
                    placeholder={o.placeholder}
                    onChangeText={handleChange(o.name)}
                    onBlur={handleBlur(o.name) || (() => {})}
                    value={values[o.name].toString()}
                    containerStyle={{...containerInputStyle}}
                    keyboardType={o.type}
                    secureTextEntry={
                      o.inputType === 'password' ? !o.secureTextEntry : false
                    }
                    prefix={o.prefix}
                    postfix={
                      o.inputType === 'password' ? (
                        <Ionicons
                          name={!o.secureTextEntry ? 'eye' : 'eye-off'}
                          size={24}
                          onPress={() => togglePasswordVisibility(i)}
                        />
                      ) : (
                        o.postfix
                      )
                    }
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
                      prefix={o.prefix}
                      postfix={
                        o.postfix !== undefined && (
                          <AntDesign
                            name="calendar"
                            size={24}
                            onPress={() => setDatePickerVisibility(true)}
                          />
                        )
                      }
                      {...inputProps}
                    />
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      onConfirm={val => {
                        handleChange(o.name)(moment(val).format(formatDate));
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
                    onSelect={(selectedItem, idx) => {
                      console.log(selectedItem, idx);
                      if (typeof selectedItem === 'object') {
                        handleChange(o.name)(
                          selectedItem[o.selectDropdownValueKey!].toString(),
                        );
                      } else {
                        handleChange(o.name)(selectedItem);
                      }
                    }}
                    buttonStyle={[
                      styles.btnStyle,
                      selectDropdownProps?.buttonStyle,
                    ]}
                    buttonTextStyle={styles.btnTextStyle}
                    renderDropdownIcon={() =>
                      o.postfix === undefined ? (
                        <Ionicons name="chevron-down" size={24} />
                      ) : (
                        o.postfix
                      )
                    }
                    defaultButtonText={o.placeholder}
                    buttonTextAfterSelection={selectedItem => {
                      if (typeof selectedItem === 'object') {
                        return selectedItem[o.selectDropdownTextKey!];
                      } else {
                        return selectedItem;
                      }
                    }}
                    rowTextForSelection={item => {
                      if (typeof item === 'object') {
                        return item[o.selectDropdownTextKey!];
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
                        style={[
                          globalStyles.displayFlex,
                          globalStyles.row,
                          globalStyles.columnGap,
                        ]}
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
                      setFieldValue(o.name as string, !values[o.name]);
                    }}
                    value={values[o.name] as boolean}
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
            {ListFooterComponent}
            {submitComponent(handleSubmit)}
          </View>
        )}
      </Formik> */}
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
