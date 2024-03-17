import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import globalStyles from 'styles/globalStyles';
import {Card, Spacer} from 'components/atoms';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {NavParam} from 'navigations/types';
import useFetching from 'services/useFetching';
import {getAllProducts, useGetProducts} from 'services/api/products';
import {PRIMARY} from 'styles/colors';
import {Toolbar} from 'components/molecules';

type ApiResponse = {
  data: string;
  // Add more properties as needed
};

export default function UseFetch() {
  const navigation = useNavigation<StackNavigationProp<NavParam, 'UseFetch'>>();

  // const { data, isFetching, error, refetch } = useFetching(getAllProducts);

  const [currentPage, setCurrentPage] = useState(0);

  const {data, refetch, isFetching, error} = useGetProducts({
    page: currentPage,
  });

  console.log('isFetching', isFetching);
  console.log('datanya', data);

  useEffect(() => {
    if (data) {
      console.log('datanya', data.data);
    }
  }, [data]);

  return (
    <View style={[globalStyles.displayFlex]}>
      <Toolbar
        prefix={
          <Ionicons
            name="chevron-back"
            size={24}
            onPress={() => navigation.goBack()}
          />
        }
      />
      <View
        style={[
          globalStyles.displayFlex,
          globalStyles.horizontalDefaultPadding,
          globalStyles.verticalDefaultPadding,
        ]}>
        <Text
          style={[globalStyles.headingBlack.h1, globalStyles.textAlignCenter]}>
          UseFetch
        </Text>
        {isFetching ? (
          <ActivityIndicator size={24} color={PRIMARY} />
        ) : (
          <FlatList
            data={data?.data?.data ?? []}
            keyExtractor={(_, i) => i.toString()}
            ItemSeparatorComponent={() => <Spacer height={10} />}
            contentContainerStyle={{gap: 4, padding: 4}}
            renderItem={({item}) => (
              <Card>
                <Text style={[globalStyles.headingBlack.h1]}>
                  {item.owner.firstName}
                </Text>
              </Card>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
