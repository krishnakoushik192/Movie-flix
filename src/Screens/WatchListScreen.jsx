import React, { useContext } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ContextApi } from '../Context/ContextApi';
import { Swipeable } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

const WatchListScreen = (props) => {
  const { watchlist, removeFromWatchlist } = useContext(ContextApi);
  const RenderMovie = ({ movie }) => {
    const rightActions = () => (
      <TouchableOpacity onPress={() => removeFromWatchlist(movie.id)} style={styles.deleteButton}>
        <Icon name="trash" size={24} color="white" />
        <Text style={{ color: 'white', marginLeft: 5 }}>Remove</Text>
      </TouchableOpacity>
    )
    return (
      <Swipeable renderRightActions={rightActions}>
        <Pressable
          key={movie.id}
          style={({ pressed }) => [
            styles.movieItem,
            pressed && { opacity: 0.8 },
          ]}
          onPress={() =>
            props.navigation.navigate('MovieDetail', { id: movie.id })
          }
        >
          {/* Movie Poster */}
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            }}
            style={styles.poster}
          />
          {/* Movie Info */}
          <View style={styles.info}>
            <Text style={styles.movieTitle} numberOfLines={2}>
              {movie.title}
            </Text>
            <Text style={styles.meta}>
              {movie.release_date?.slice(0, 4)}
            </Text>
            <Text style={styles.meta}>{movie.type}</Text>
          </View>
        </Pressable>
      </Swipeable>
    )
  }
  const RenderTVShow = ({ tv }) => {
    const rightActions = () => (
      <TouchableOpacity onPress={() => removeFromWatchlist(tv.id)} style={styles.deleteButton}>
        <Icon name="trash" size={24} color="white" />
        <Text style={{ color: 'white', marginLeft: 5 }}>Remove</Text>
      </TouchableOpacity>
    )
    return (
      <Swipeable renderRightActions={rightActions}>
      <Pressable
        key={tv.id}
        style={({ pressed }) => [
          styles.movieItem,
          pressed && { opacity: 0.8 },
        ]}
        onPress={() =>
          props.navigation.navigate('TvDetail', { id: tv.id })
        }
      >
        {/* Movie Poster */}
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${tv.poster_path}`,
          }}
          style={styles.poster}
        />

        {/* Movie Info */}
        <View style={styles.info}>
          <Text style={styles.movieTitle} numberOfLines={2}>
            {tv.name}
          </Text>
          <Text style={styles.meta}>
            {tv.first_air_date?.slice(0, 4)}
          </Text>
          <Text style={styles.meta}>{tv.type}</Text>
        </View>

      </Pressable>
      </Swipeable>
    )
  }

  return (
    <View style={styles.container}>
      <Header />

      <Text style={styles.title}>Your Watchlist</Text>

      {watchlist.length === 0 ? (
        <Text style={styles.emptyText}>Your watchlist is empty.</Text>
      ) : (
        <FlatList
          data={watchlist}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            item.type === 'Movie' ? (
              <RenderMovie movie={item} />
            ) : (
              <RenderTVShow tv={item} />
            )
          )}
          contentContainerStyle={styles.scrollContainer}
        />
      )}
    </View>
  );
};

export default WatchListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030014',
  },
  title: {
    color: '#D6C7FF',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Montserrat-Bold',
  },
  emptyText: {
    color: '#D6C7FF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Montserrat-Regular',
  },
  scrollContainer: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  movieItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#160931ff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
  },
  poster: {
    width: width * 0.22,
    height: width * 0.33,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  movieTitle: {
    color: '#D6C7FF',
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
  },
  meta: {
    color: '#AFA2D5',
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    marginTop: 2,
  },
  deleteButton: {
    padding: 6,
    alignSelf: 'center',
    backgroundColor: '#FF3B30',
    flexDirection: 'row',
    borderRadius: 8,
  },
});
