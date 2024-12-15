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

const songs = [
  {
    id: '1',
    title: 'Heart of Gold',
    artist: 'Shawn Mendes',
    image: '../img/album_cover.png',
  },
];

type Song = {
  id: string;
  title: string;
  artist: string;
  image: string;
};

const RecentlyPlayed = () => {
  const renderSongItem = ({item}: {item: Song}) => (
    <View style={styles.songItem}>
      <Image source={{uri: item.image}} style={styles.songImage} />
      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>{item.title}</Text>
        <Text style={styles.songArtist}>{item.artist}</Text>
      </View>
      <TouchableOpacity style={styles.moreButton}>
        <Text style={styles.moreText}>⋮</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.backAndTitle}>
        <BackButton />
        <Text style={styles.title}>Recently Played</Text>
      </View>
      <Text style={styles.dateText}>2024.11.07</Text>

      <FlatList
        data={songs}
        renderItem={renderSongItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.songList}
      />
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  dateText: {
    fontSize: 14,
    color: '#888',
    marginLeft: 16,
    marginTop: 8,
  },
  songList: {
    paddingHorizontal: 16,
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
  moreButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  moreText: {
    fontSize: 18,
    color: '#666',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 12,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 20,
  },
});

export default RecentlyPlayed;
