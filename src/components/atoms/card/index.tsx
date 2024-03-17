import {Pressable, PressableProps, StyleSheet, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import globalStyles from 'styles/globalStyles';
import {WHITE} from 'styles/colors';

export type TCard = {
  children: ReactNode;
  containerStyle?: ViewStyle | ViewStyle[];
} & PressableProps;

export default function Card({children, containerStyle}: TCard) {
  return (
    <Pressable
      style={[
        globalStyles.verticalDefaultPadding,
        globalStyles.horizontalDefaultPadding,
        styles.container,
        containerStyle,
      ]}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    borderRadius: 10,
    elevation: 5,
  },
});
