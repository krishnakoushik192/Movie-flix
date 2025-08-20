import React , {useContext} from 'react';
import { View, Text, FlatList, Image, Dimensions, StyleSheet, Pressable } from 'react-native';
import { getMultiSearchUrl,getTmdbGenreUrl  } from '../utills/tmdbUrls';
import useFetch from '../Hooks/useFetch';
import { ContextApi } from '../Context/ContextApi';

const { width: screenWidth } = Dimensions.get('window');

const SearchTV = (props) => {
  const { tv } = useContext(ContextApi).genres;
  console.log('SearchTV props:', props);
  const { query, type, flag } = props.route.params;
  const url = flag === 'bar' ? getMultiSearchUrl('tv', query) : getTmdbGenreUrl('discover/tv', tv[query]);
  const { data, loading, error } = useFetch(url);

  console.log('SearchTV data:', data);

  // Calculate responsive dimensions
  const getItemWidth = () => {
    const margin = 10;
    const numColumns = screenWidth < 400 ? 2 : screenWidth < 600 ? 3 : 4;
    return (screenWidth - (margin * 2 * numColumns)) / numColumns;
  };

  const getNumColumns = () => {
    return screenWidth < 400 ? 2 : screenWidth < 600 ? 3 : 4;
  };

  const itemWidth = getItemWidth();
  const numColumns = getNumColumns();

  const RenderItem = ({ item }) => (
    <Pressable onPress={() => props.navigation.navigate('TvDetail', { id: item.id })}>
      <View style={[styles.itemContainer, { width: itemWidth }]}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
          style={[styles.posterImage, { width: itemWidth - 10, height: (itemWidth - 10) * 1.5 }]}
          resizeMode="cover"
        />
        <Text
          style={[styles.titleText, { width: itemWidth - 10 }]}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {item.title || item.name}
        </Text>
      </View>
    </Pressable>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.statusText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.statusText}>No results found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={numColumns}
        key={numColumns} // Force re-render when columns change
        renderItem={RenderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030014',
    paddingTop: 10,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#030014',
  },
  flatListContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  itemContainer: {
    margin: 5,
    alignItems: 'center',
  },
  posterImage: {
    borderRadius: 8,
    backgroundColor: '#1a1a1a',
  },
  titleText: {
    color: '#D6C7FF',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 16,
  },
  statusText: {
    color: '#D6C7FF',
    fontSize: 16,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default SearchTV;