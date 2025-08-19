import {FlatList} from 'react-native';
import MovieCard from './MovieCard';

const RenderMovieFlatList = ({data, nav}) => (
    <FlatList
      data={data}
      horizontal={true}
      style={{ paddingHorizontal: 10 }}
      renderItem={({ item }) => <MovieCard item={item} nav={nav} />}
      keyExtractor={item => item.id.toString()}

    />
  );

export default RenderMovieFlatList;