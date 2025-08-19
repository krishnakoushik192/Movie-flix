import {FlatList} from 'react-native';
import TvCard from './TvCard';

const RenderTvFlatList = ({data, nav}) => (
    <FlatList
      data={data}
      horizontal={true}
      style={{ paddingHorizontal: 10 }}
      renderItem={({ item }) => <TvCard item={item} nav={nav} />}
      keyExtractor={item => item.id.toString()}

    />
  );

export default RenderTvFlatList;