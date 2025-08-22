import React from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import Header from '../components/Header';
import TopBarNavigator from '../Navigation/TopBarNavigator';
import { getMultiSearchUrl } from '../utills/tmdbUrls';

const SearchDetails = (props) => {
  const { query, type } = props.route.params;

  return (
    <View style={{ flex: 1, backgroundColor: '#030014' }}>
      <Header props={props} />
      <View style={{ padding: 10 }}>
        <Text style={{ color: '#D6C7FF', fontSize: 20, marginBottom: 10, fontFamily: 'Montserrat-Bold', marginHorizontal: 10 }}>
          Search Results for "{query}"
        </Text>
      </View>
      <TopBarNavigator flag={type} query={query} />
    </View>
  );
};

export default SearchDetails;