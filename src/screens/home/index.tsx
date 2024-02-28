import {FlatList, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import globalStyles from 'styles/globalStyles';
import {Button, Spacer} from 'components/basic';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {NavParam} from 'navigations/types';

export default function Home() {
  const navigation = useNavigation<StackNavigationProp<NavParam, 'Home'>>();

  const menu = [
    {
      id: 1,
      title: 'adw',
      navigate: 'daw',
    },
  ];
  return (
    <View
      style={[
        globalStyles.displayFlex,
        globalStyles.horizontalDefaultPadding,
        globalStyles.verticalDefaultPadding,
      ]}>
      <FlatList
        data={menu}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => <Spacer height={30} />}
        renderItem={({item}) => (
          <Button
            onPress={() =>
              navigation.navigate(item.navigate as keyof NavParam)
            }>
            {item.title}
          </Button>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
