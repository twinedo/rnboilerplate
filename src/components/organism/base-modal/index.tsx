import {StyleSheet, View, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import Modal, {ModalProps} from 'react-native-modal';
import globalStyles from 'styles/globalStyles';
import {WHITE} from 'styles/colors';

export type TBaseModal = {
  children: ReactNode;
  containerStyle?: ViewStyle | ViewStyle[];
} & ModalProps;

export default function BaseModal(props: TBaseModal) {
  const {children, containerStyle} = props;
  return (
    <View>
      <Modal>
        <View style={globalStyles.displayFlex}>
          <View
            style={[
              globalStyles.horizontalDefaultPadding,
              globalStyles.verticalDefaultPadding,
              styles.container,
              {...containerStyle},
            ]}>
            {children}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {borderRadius: 20, backgroundColor: WHITE},
});
