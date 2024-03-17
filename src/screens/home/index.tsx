import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import globalStyles from 'styles/globalStyles';
import InputList, {TField} from 'components/organism/input-list';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button, Spacer} from 'components/atoms';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {NavParam} from 'navigations/types';

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
  const navigation = useNavigation<StackNavigationProp<NavParam, 'Home'>>();
  const [menu] = useState([
    {
      id: 1,
      title: 'Components',
      navigate: 'InputComponent',
    },
    {
      id: 2,
      title: 'useFetch',
      navigate: 'UseFetch',
    },
    {
      id: 3,
      title: 'Bottom Navigation',
      navigate: 'BottomNav',
    },
    {
      id: 4,
      title: 'Top Navigation',
      navigate: 'TopNav',
    },
    {
      id: 5,
      title: 'Side Navigation',
      navigate: 'SideNav',
    },
    {
      id: 6,
      title: 'Animations',
      navigate: 'Animations',
    },
  ]);

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
