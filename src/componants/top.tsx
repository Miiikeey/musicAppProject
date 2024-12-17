import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import BottomNavBar from './BottomNavBar';
import Header from './header';
import BackButton from './BackButton';
import {deezerApi, DeezerTrack} from '../services/deezerApi';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const TopSongs = () => {
  const [activeFilter, setActiveFilter] = useState<string>('By period');
  const [topTracks, setTopTracks] = useState<DeezerTrack[]>([]);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    fetchTopTracks();
  }, []);

  const fetchTopTracks = async () => {
    try {
      const tracks = await deezerApi.getTopTracks();
      setTopTracks(tracks.slice(0, 10));
    } catch (error) {
      console.error('Error fetching top tracks:', error);
    }
  };

  const renderSong = ({item, index}: {item: DeezerTrack; index: number}) => (
    <TouchableOpacity
      style={styles.songContainer}
      onPress={() => navigation.navigate('PlayScreen', {trackId: item.id})}>
      <Text style={styles.songRank}>{index + 1}</Text>
      <Image source={{uri: item.album.cover_medium}} style={styles.songImage} />
      <View style={styles.songInfo}>
        <Text style={styles.songTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.songArtist}>{item.artist.name}</Text>
      </View>
      <TouchableOpacity>
        <Image
          source={require('../img/more_vert.png')}
          style={styles.moreIcon}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderFilterButton = (filterName: string) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        activeFilter === filterName && styles.activeFilter,
      ]}
      onPress={() => setActiveFilter(filterName)}>
      <Text
        style={[
          activeFilter === filterName
            ? styles.filterTextActive
            : styles.filterText,
        ]}>
        {filterName}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.backAndTitle}>
        <BackButton />
        <Text style={styles.title}>Top Songs</Text>
      </View>
      <View style={styles.filterContainer}>
        {renderFilterButton('By period')}
        {renderFilterButton('By genre')}
        {renderFilterButton('By Artist')}
        {renderFilterButton('Trending')}
      </View>

      <FlatList
        data={topTracks}
        renderItem={renderSong}
        keyExtractor={item => item.id.toString()}
        style={styles.songList}
        showsVerticalScrollIndicator={false}
      />

      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backAndTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginLeft: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeFilter: {
    backgroundColor: '#0090A8',
    borderColor: '#0090A8',
  },
  filterText: {
    fontSize: 14,
    color: '#777',
  },
  filterTextActive: {
    fontSize: 14,
    color: '#fff',
  },
  songList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  songContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  songRank: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0090A8',
    marginRight: 16,
  },
  songImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  songArtist: {
    fontSize: 14,
    color: '#777',
  },
  moreIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export default TopSongs;
