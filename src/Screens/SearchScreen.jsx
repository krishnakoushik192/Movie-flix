import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';

const Genres = ["Action and Adventure", "Anime", "Comedy", "Documentary", "Drama", "Fantasy", "Kids", "Mystery and Thrillers", "Romance", "Science Fiction"]

const SearchScreen = (props) => {
  const [search, setSearch] = useState('');

  const { width } = Dimensions.get('window');


  return (
    <View style={{ flex: 1, backgroundColor: '#030014' }}>
      <Header props={props} />
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#D6C7FF" style={styles.icon} />
        <TextInput
          placeholder="Search movies..."
          placeholderTextColor="#888"
          style={styles.input}
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={() => {
            if (search.trim()) {
              props.navigation.navigate('SearchDetails', { query: search, type: 'bar' });
            }
            setSearch('');
          }}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={Genres}
          keyExtractor={(item,id) => id}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ padding: 15, backgroundColor: '#1E1E2F', borderRadius: 10, margin: 5, width: (width / 2) - 20, alignItems: 'center', justifyContent: 'center' }}
              onPress={() => props.navigation.navigate('SearchDetails', { query: item , type: 'genre' })}
            >
              <Text style={{ color: '#D6C7FF' ,textAlign:'center'}}>{item}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ padding: 10 }}
          ListHeaderComponent={<Text style={{ color: '#D6C7FF', fontSize: 24, marginBottom: 10,fontFamily:'Montserrat-Bold',marginHorizontal: 10 }}>Genres</Text>}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E2F',
    borderRadius: 30,
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 15,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
})
export default SearchScreen;