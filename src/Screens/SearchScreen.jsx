import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import { ContextApi } from '../Context/ContextApi';

const Genres = ["Action and adventure", "Anime", "Comedy", "Documentary", "Drama", "Fantasy", "Kids", "Mystery and thrillers", "Romance", "Science fiction"]

const SearchScreen = () => {
  const { movieGenresApi, tvGenresApi } = useContext(ContextApi);
  const [search, setSearch] = useState('')
  console.log(movieGenresApi);
  console.log(tvGenresApi);

  const { width } = Dimensions.get('window');


  return (
    <View style={{ flex: 1, backgroundColor: '#030014' }}>
      <Header />
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#D6C7FF" style={styles.icon} />
        <TextInput
          placeholder="Search movies..."
          placeholderTextColor="#888"
          style={styles.input}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.heading}>Genres</Text>
        <FlatList
          data={Genres}
          keyExtractor={(item,id) => id}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ padding: 15, backgroundColor: '#1E1E2F', borderRadius: 10, margin: 5, width: (width / 2) - 20, alignItems: 'center', justifyContent: 'center' }}
              // onPress={() => handleGenrePress(item)}
            >
              <Text style={{ color: '#D6C7FF' ,textAlign:'center'}}>{item}</Text>
            </TouchableOpacity>
          )}
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