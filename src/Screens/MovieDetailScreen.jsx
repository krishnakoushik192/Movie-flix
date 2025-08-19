import React, { use, useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getTmdbUrl } from '../utills/tmdbUrls';
import useFetch from '../Hooks/useFetch';
import RenderMovieFlatList from '../components/RenderMovieFlatlist';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ContextApi } from '../Context/ContextApi';

const MovieDetailScreen = (props) => {
  const { addToWatchlist } = useContext(ContextApi);
  const [details, setDetails] = useState(null);
  const [casting, setCasting] = useState(null);
  const [error, setError] = useState('');
  const [castError, setCastErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [castLoading, setCastLoading] = useState(false);
  const { id } = props.route.params;

  const detailsUrl = getTmdbUrl(`movie/${id}`);
  const relatedUrl = getTmdbUrl(`movie/${id}/similar`);
  const castUrl = getTmdbUrl(`movie/${id}/credits`);
  const { data: related, loading: loader, error: errmsg } = useFetch(relatedUrl);

  const fetching = async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      setDetails(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCasting = async (url) => {
    try {
      setCastLoading(true);
      const response = await fetch(url);
      const data = await response.json();

      const topCast = data.cast?.slice(0, 6) || [];
      const director = data.crew?.find(member => member.job === "Director") || null;
      const producer = data.crew?.find(member => member.job === "Producer") || null;
      const writer = data.crew?.find(member => member.job === "Writer") || null;

      setCasting({ topCast, director, producer, writer });
    } catch (err) {
      setCastErr(err.message);
    } finally {
      setCastLoading(false);
    }
  };

  useEffect(() => {
    fetching(detailsUrl);
    fetchCasting(castUrl);
  }, [id]);

  const isLoading  = loader || castLoading|| loading;
  const errormsg = error || errmsg || castError;

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (errormsg) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>Please try again later.</Text>
      </View>
    );
  }

  if (!details) return null;

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView >
        {/* Header */}
        <ImageBackground
          source={{ uri: `https://image.tmdb.org/t/p/w500${details.backdrop_path}` }}
          style={styles.headerImage}
        >
          <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ padding: 10 }}>
            <MaterialCommunityIcons name="step-backward" size={28} color="#fff" />
          </TouchableOpacity>
          <View style={styles.overlay}>
            <Text style={styles.title}>{details.title}</Text>
            <Text style={styles.subtitle}>
              {details.release_date?.slice(0, 4)} • {details.runtime} min
            </Text>
          </View>
        </ImageBackground>

        {/* Content */}
        <View style={styles.container}>
          {/* Rating */}
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <View style={styles.ratingBox}>
              <Text style={styles.ratingText}>
                ⭐ {details.vote_average?.toFixed(1)} ({details.vote_count} votes)
              </Text>
            </View>
            <TouchableOpacity onPress={() => {addToWatchlist({...details, type: 'Movie'})}} style={styles.trailerButton}>
              <MaterialCommunityIcons name="movie-open-play" size={24} color="#ffffff" />
              <Text style={styles.trailerButtonText}>Add to Watchlist</Text>
            </TouchableOpacity>
          </View>

          {/* Overview */}
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.text}>{details.overview}</Text>

          {/* Release Date & Status */}
          <View style={styles.row}>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Release Date</Text>
              <Text style={styles.infoValue}>
                {new Date(details.release_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Status</Text>
              <Text style={styles.infoValue}>{details.status}</Text>
            </View>
          </View>

          {/* Genres */}
          <Text style={styles.sectionTitle}>Genres</Text>
          <View style={styles.tagContainer}>
            {details.genres?.map((g, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{g.name}</Text>
              </View>
            ))}
          </View>

          {/* Countries */}
          <Text style={styles.sectionTitle}>Countries</Text>
          <Text style={styles.text}>
            {details.production_countries?.map(c => c.name).join(' • ')}
          </Text>

          {/* Budget & Revenue */}
          <Text style={styles.sectionTitle}>Budget & Revenue</Text>
          <Text style={styles.text}>
            Budget: {details.budget === 0 ? 'N/A' : `$${details.budget?.toLocaleString()}`} | Revenue: {details.revenue === 0 ? 'Still Counting' : `$${details.revenue?.toLocaleString()}`}
          </Text>

          {/* Tagline */}
          {details.tagline ? (
            <>
              <Text style={styles.sectionTitle}>Tagline</Text>
              <Text style={[styles.text, { fontStyle: 'italic' }]}>{details.tagline}</Text>
            </>
          ) : null}

          {/* Production Companies */}
          <Text style={styles.sectionTitle}>Production Companies</Text>
          <Text style={styles.text}>
            {details.production_companies?.map(c => c.name).join(' • ')}
          </Text>

          {/* Similar Movies */}
          <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>Similar Movies</Text>
          <RenderMovieFlatList data={related} nav={props.navigation} />

          {/* Crew Section */}
          <Text style={[styles.sectionTitle, { marginTop: 20, marginBottom: 10 }]}>Crew</Text>
          <View style={styles.castContainer}>
            {casting?.director && (
              <View style={styles.castMember}>
                <Image source={{ uri: `https://image.tmdb.org/t/p/w500${casting.director.profile_path}` }} style={styles.castImage} />
                <Text style={styles.castName}>{casting.director.name}</Text>
                <Text style={styles.castCharacter}>Director</Text>
              </View>
            )}

            {casting?.producer && (
              <View style={styles.castMember}>
                <Image source={{ uri: `https://image.tmdb.org/t/p/w500${casting.producer.profile_path}` }} style={styles.castImage} />
                <Text style={styles.castName}>{casting.producer.name}</Text>
                <Text style={styles.castCharacter}>Producer</Text>
              </View>
            )}

            {casting?.writer && (
              <View style={styles.castMember}>
                <Image source={{ uri: `https://image.tmdb.org/t/p/w500${casting.writer.profile_path}` }} style={styles.castImage} />
                <Text style={styles.castName}>{casting.writer.name}</Text>
                <Text style={styles.castCharacter}>Writer</Text>
              </View>
            )}
          </View>

          {/* Cast */}
          <Text style={[styles.sectionTitle, { marginTop: 20, marginBottom: 10 }]}>Top Cast</Text>
          <View style={styles.castContainer}>
            {casting?.topCast?.map(member => (
              <View key={member.id} style={styles.castMember}>
                <Image source={{ uri: `https://image.tmdb.org/t/p/w500${member.profile_path}` }} style={styles.castImage} />
                <Text style={styles.castName}>{member.name}</Text>
                <Text style={styles.castCharacter}>{member.character}</Text>
              </View>
            ))}
          </View>

          {/* Back Button */}
          <LinearGradient
            colors={['#A855F7', '#6D28D9']}
            style={{ borderRadius: 8, margin: 10 }}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
          >
            <TouchableOpacity onPress={() => props.navigation.goBack()} style={{
              padding: 10,
              borderRadius: 5,
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 10,
            }}>
              <MaterialCommunityIcons name="step-backward" size={26} color="#ffffff" />
              <Text style={{ color: '#ffffff', fontSize: 18 }}>Back to Home</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#030014',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#030014',
  },
  headerImage: {
    height: 300,
    justifyContent: 'space-between',

  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
  },
  subtitle: {
    color: '#bbb',
    fontSize: 14,
    marginTop: 4,
  },
  container: {
    padding: 16,
  },
  ratingBox: {
    backgroundColor: '#111122',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  ratingText: {
    color: '#FFD700',
    fontSize: 16,
  },
  trailerButton: {
    backgroundColor: '#A855F7',
    padding: 5,
    borderRadius: 8,
    alignItems: 'center',
    // marginTop: 12,
    flexDirection: 'row',
    gap: 8,
  },
  trailerButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    marginTop: 16,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
  },
  text: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  infoBox: {
    flex: 1,
  },
  infoLabel: {
    color: '#bbb',
    fontSize: 12,
  },
  infoValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Montserrat-Bold',
    marginTop: 2,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  tag: {
    backgroundColor: '#1A1A2E',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginRight: 6,
    marginTop: 6,
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
  },
  crew: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Montserrat-Bold',
    marginTop: 2,
  },
  castContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  castMember: {
    width: 100,
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 12,
  },
  castImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  castName: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Montserrat-Bold',
    marginTop: 4,
    textAlign: 'center',
  },
  castCharacter: {
    color: '#bbb',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default MovieDetailScreen;
