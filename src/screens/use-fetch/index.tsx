import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import globalStyles from 'styles/globalStyles';
import {Toolbar} from 'components/basic';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {NavParam} from 'navigations/types';
import useFetching from 'services/useFetching';

type ApiResponse = {
  data: string;
  // Add more properties as needed
};

export default function UseFetch() {
  const navigation = useNavigation<StackNavigationProp<NavParam, 'UseFetch'>>();

  const {} = useFetching<ApiResponse>({
    func: async () => {
      // const response = await
    },
  });
  return (
    <View style={[globalStyles.displayFlex]}>
      <Toolbar
        prefix={
          <Ionicons
            name="chevron-left"
            size={24}
            onPress={() => navigation.goBack()}
          />
        }
      />
      <View style={[globalStyles.displayFlex]}>
        <Text>UseFetch</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
