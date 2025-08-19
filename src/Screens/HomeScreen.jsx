import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, ScrollView, StyleSheet, } from 'react-native';
import Header from '../components/Header';
import useFetch from '../Hooks/useFetch';
import { getTmdbUrl } from '../utills/tmdbUrls';
import RenderMovieFlatList from '../components/RenderMovieFlatlist';
import RenderTvFlatList from '../components/RenderTvFlatlist';

const HomeScreen = (props) => {
  const popularUrl = getTmdbUrl('movie/popular');
  const topRatedUrl = getTmdbUrl('movie/top_rated');
  const upcomingUrl = getTmdbUrl('movie/upcoming');
  const popularTvUrl = getTmdbUrl('tv/popular');
  const topRatedTvUrl = getTmdbUrl('tv/top_rated');
  const { data: popularMovies, loading: popularLoading, error: popularError } = useFetch(popularUrl);
  const { data: topRatedMovies, loading: topRatedLoading, error: topRatedError } = useFetch(topRatedUrl);
  const { data: upcomingMovies, loading: upcomingLoading, error: upcomingError } = useFetch(upcomingUrl);
  const { data: popularTvShows, loading: popularTvLoading, error: popularTvError } = useFetch(popularTvUrl);
  const { data: topRatedTvShows, loading: topRatedTvLoading, error: topRatedTvError } = useFetch(topRatedTvUrl);
  const isLoading = popularLoading || topRatedLoading || upcomingLoading || popularTvLoading || topRatedTvLoading;
  return (
    <View style={styles.container}>
      <Header />
      {isLoading ? <ActivityIndicator color="#A855F7" size={'large'} /> :
        <ScrollView>
          <Text style={styles.header}>
            Popular Movies
          </Text>
          <RenderMovieFlatList data={popularMovies} nav={props.navigation} />
          {popularError ? <Text style={styles.errorText}>Please try again later</Text> : null}
          <Text style={styles.header}>
            Top Rated Movies
          </Text>
          <RenderMovieFlatList data={topRatedMovies} nav={props.navigation} />
          {topRatedError ? <Text style={styles.errorText}>Please try again later</Text> : null}
          <Text style={styles.header}>
            Upcoming Movies
          </Text>
          <RenderMovieFlatList data={upcomingMovies} nav={props.navigation} />
          {upcomingError ? <Text style={styles.errorText}>Please try again later</Text> : null}
          <Text style={styles.header}>
            Popular Tv Shows
          </Text>
          <RenderTvFlatList data={popularTvShows} nav={props.navigation} />
          {popularTvError ? <Text style={styles.errorText}>Please try again later</Text> : null}
          <Text style={styles.header}>
            Top Rated Tv Shows
          </Text>
          <RenderTvFlatList data={topRatedTvShows} nav={props.navigation} />
          {topRatedTvError ? <Text style={styles.errorText}>Please try again later</Text> : null}
        </ScrollView>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030014',
  },
  header: {
    color: 'white',
    fontSize: 24,
    margin: 10,
    fontFamily: 'Montserrat-BoldItalic',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
});

export default HomeScreen;