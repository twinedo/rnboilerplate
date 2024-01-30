import {
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React, {ReactNode} from 'react';
import {BLACK, PRIMARY} from 'styles/colors';

type IButtonProps = {
  children?: ReactNode | boolean;
  text?: string | ReactNode | boolean;
  prefix?: ReactNode;
  postfix?: ReactNode;
  containerStyle?: ViewStyle | ViewStyle[];
  onPress?: () => void;
  textColor?: string;
  textStyle?: TextStyle | TextStyle[];
  backgroundColor?: string;
} & TouchableOpacityProps;

const Button = (props: IButtonProps & TouchableOpacityProps) => {
  const {
    text = 'Press',
    textStyle,
    prefix,
    postfix,
    containerStyle,
    onPress,
    children,
    textColor,
    backgroundColor = PRIMARY,
  } = props;
  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.container,
        {backgroundColor: backgroundColor},
        {...containerStyle},
      ]}
      onPress={onPress}>
      {prefix}
      {typeof children === 'string' ? (
        <Text style={[styles.text, {...textStyle}, {color: textColor}]}>
          {text}
        </Text>
      ) : (
        children
      )}

      {postfix}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: BLACK,
    fontSize: 18,
  },
});
