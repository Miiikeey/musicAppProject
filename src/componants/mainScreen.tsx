import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import {deezerApi, DeezerTrack} from '../services/deezerApi';
import MiniPlayer from './MiniPlayer';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Home = () => {
  const navigation = useNavigation<NavigationProp>();
  const [recommendations, setRecommendations] = useState<DeezerTrack[]>([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState<DeezerTrack[]>([]);
  const [topSongs, setTopSongs] = useState<DeezerTrack[]>([]);
  const [newReleases, setNewReleases] = useState<DeezerTrack[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [recommendedTracks, recentTracks, topTracks, newTracks] =
      await Promise.all([
        deezerApi.getTopTracks(),
        deezerApi.getTopTracks(),
        deezerApi.getTopTracks(),
        deezerApi.getTopTracks(),
      ]);

    setRecommendations(recommendedTracks.slice(0, 3));
    setRecentlyPlayed(recentTracks.slice(0, 3));
    setTopSongs(topTracks.slice(0, 4));
    setNewReleases(newTracks.slice(0, 5));
  };

  const renderRecommendationItem = ({item}: {item: DeezerTrack}) => (
    <TouchableOpacity
      style={styles.recommendationItem}
      onPress={() => navigation.navigate('PlayScreen', {trackId: item.id})}>
      <Image
        source={{uri: item.album.cover_medium}}
        style={styles.albumCover}
      />
      <Text style={styles.trackTitle}>{item.title}</Text>
      <Text style={styles.artistName}>{item.artist.name}</Text>
    </TouchableOpacity>
  );

  const renderTopSongItem = ({
    item,
    index,
  }: {
    item: DeezerTrack;
    index: number;
  }) => (
    <TouchableOpacity
      style={styles.topSongItem}
      onPress={() => navigation.navigate('PlayScreen', {trackId: item.id})}>
      <Text style={styles.rankNumber}>{index + 1}</Text>
      <Image
        source={{uri: item.album.cover_medium}}
        style={styles.topSongCover}
      />
      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>{item.title}</Text>
        <Text style={styles.songArtist}>{item.artist.name}</Text>
      </View>
      <TouchableOpacity style={styles.moreButton}>
        <Image
          source={require('../img/more_vert.png')}
          style={styles.moreIcon}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Recommendation</Text>
        <FlatList
          data={recommendations}
          renderItem={renderRecommendationItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recently Played</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('RecentlyPlayed')}>
            <Image
              source={require('../img/Down.png')}
              style={styles.chevronIcon}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={recentlyPlayed}
          renderItem={renderRecommendationItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Songs</Text>
          <TouchableOpacity onPress={() => navigation.navigate('TopSongs')}>
            <Image
              source={require('../img/Down.png')}
              style={styles.chevronIcon}
            />
          </TouchableOpacity>
        </View>
        {topSongs.map((song, index) => (
          <View key={song.id.toString()}>
            {renderTopSongItem({item: song, index})}
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>New Releases</Text>
          <TouchableOpacity onPress={() => navigation.navigate('NewSongs')}>
            <Image
              source={require('../img/Down.png')}
              style={styles.chevronIcon}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={newReleases}
          renderItem={renderRecommendationItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  recommendationItem: {
    marginRight: 16,
    width: 160,
  },
  albumCover: {
    width: 160,
    height: 160,
    borderRadius: 8,
    marginBottom: 8,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  artistName: {
    fontSize: 14,
    color: '#666',
  },
  topSongItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rankNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0090A8',
    width: 40,
  },
  topSongCover: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginRight: 12,
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  songArtist: {
    fontSize: 14,
    color: '#666',
  },
  moreButton: {
    padding: 8,
  },
  moreIcon: {
    width: 24,
    height: 24,
  },
  chevronIcon: {
    width: 24,
    height: 24,
  },
});

export default Home;
