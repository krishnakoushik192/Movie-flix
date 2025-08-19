import React, { useContext } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { ContextApi } from '../Context/ContextApi';
import Icon from 'react-native-vector-icons/FontAwesome';

const TvCard = ({ item, nav }) => {
  // console.log(item);
  const { tvGenresApi } = useContext(ContextApi);
  const { name, poster_path, genre_ids, vote_average , id} = item;
  const posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  // Convert genre IDs to names
  const genreNames = genre_ids
    .map(id => {
      const genre = tvGenresApi.find(g => g.id === id);
      return genre ? genre.name : null;
    })
    .filter(Boolean)
    .join(', ');

  return (
    <Pressable onPress={() => nav.navigate('TvDetail', { id })}>
      <View style={{
        marginHorizontal: 15,
        marginRight: 10,
        width: 140,
        borderRadius: 10,
      }}>
        {/* Poster */}
        <Image
          source={{ uri: posterUrl }}
          style={{
            height: 210,
            borderRadius: 10,
          }}
          resizeMode='cover'
        />

        {/* Name */}
        <Text style={{
          color: 'white',
          fontWeight: 'bold',
          fontFamily: 'Montserrat-Bold',
          marginTop: 5,
        }}>
          {name}
        </Text>

        {/* Rating */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
          <Icon name="star" size={12} color="gold" style={{ marginRight: 4 }} />
          <Text style={{ color: 'white', fontSize: 12 }}>
            {vote_average ? vote_average.toFixed(1) : 'N/A'}
          </Text>
        </View>

        {/* Genre + Type */}
        <Text style={{ color: '#bbb', fontSize: 11, marginTop: 2 }}>
          {genreNames ? `${genreNames} • TV Show` : 'TV Show'}
        </Text>
      </View>
    </Pressable>
  );
};

export default TvCard;
