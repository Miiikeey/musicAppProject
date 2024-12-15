import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import BottomNavBar from './BottomNavBar';
import Header from './header';
import BackButton from './BackButton';
import {useMusicPlayer} from '../context/MusicPlayerContext';

type Song = {
  id: number;
  title: string;
  artist: string;
  albumCover: string;
};

const LikedSongs = () => {
  const {likedSongs, removeFromLikedSongs} = useMusicPlayer();

  const renderSongItem = ({item}: {item: Song}) => (
    <View style={styles.songItem}>
      <Image source={{uri: item.albumCover}} style={styles.songImage} />
      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>{item.title}</Text>
        <Text style={styles.songArtist}>{item.artist}</Text>
      </View>
      <TouchableOpacity
        onPress={() => removeFromLikedSongs(item.id)}
        style={styles.removeButton}>
        <Text style={styles.removeText}>-</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.backAndTitle}>
        <BackButton />
        <Text style={styles.title}>Liked Songs</Text>
      </View>

      {likedSongs.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No liked songs yet.</Text>
        </View>
      ) : (
        <FlatList
          data={likedSongs}
          renderItem={renderSongItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.songList}
        />
      )}
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
  },
  songList: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  songImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  songInfo: {
    flex: 1,
    marginLeft: 12,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  songArtist: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  removeButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  removeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default LikedSongs;
