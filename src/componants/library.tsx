import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {deezerApi, DeezerTrack, DeezerPlaylist} from '../services/deezerApi';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import auth from '@react-native-firebase/auth';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type LibrarySection = 'Playlists' | 'Artists' | 'Albums' | 'Podcasts';

const Library = () => {
  const [activeSection, setActiveSection] = useState<LibrarySection>('Playlists');
  const [tracks, setTracks] = useState<DeezerTrack[]>([]);
  const [playlists, setPlaylists] = useState<DeezerPlaylist[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    loadContent();
  }, [activeSection, refreshTrigger]);

  const loadContent = async () => {
    setIsLoading(true);
    try {
      switch (activeSection) {
        case 'Playlists':
          const user = auth().currentUser;
          if (user) {
            const userPlaylists = await deezerApi.getUserPlaylists(user.uid);
            setPlaylists(userPlaylists);
          }
          break;
        case 'Artists':
        case 'Albums':
        case 'Podcasts':
          const data = await deezerApi.getTopTracks();
          setTracks(data);
          break;
      }
    } catch (error) {
      console.error('Error loading library content:', error);
    }
    setIsLoading(false);
  };

  const renderSectionButton = (section: LibrarySection) => (
    <TouchableOpacity
      style={[
        styles.sectionButton,
        activeSection === section && styles.activeSectionButton,
      ]}
      onPress={() => setActiveSection(section)}>
      <Text
        style={[
          styles.sectionButtonText,
          activeSection === section && styles.activeSectionButtonText,
        ]}>
        {section}
      </Text>
    </TouchableOpacity>
  );

  const renderTrackItem = ({item}: {item: DeezerTrack}) => (
    <TouchableOpacity
      style={styles.trackItem}
      onPress={() => navigation.navigate('PlayScreen', {trackId: item.id})}>
      <Image
        source={{uri: item.album.cover_medium}}
        style={styles.trackImage}
      />
      <View style={styles.trackInfo}>
        <Text style={styles.trackTitle}>{item.title}</Text>
        <Text style={styles.artistName}>{item.artist.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderPlaylistItem = ({item, index}: {item: DeezerPlaylist; index: number}) => (
    <TouchableOpacity
      style={styles.playlistItem}
      onPress={() => navigation.navigate('PlayScreen', {playlistId: item.id})}>
      <View style={styles.playlistLeft}>
        <Image source={require('../img/Play.png')} style={styles.playIcon} />
        <View style={styles.playlistLines}>
          <View style={styles.line} />
          <View style={styles.line} />
          <View style={styles.line} />
        </View>
      </View>
      <Text style={styles.playlistTitle}>{item.title || `Playlist ${index + 1}`}</Text>
    </TouchableOpacity>
  );

  const handleAddPlaylist = () => {
    navigation.navigate('CreatePlaylist', {
      onPlaylistCreated: () => setRefreshTrigger(prev => prev + 1),
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Library</Text>
        <TouchableOpacity onPress={() => {}}>
          <Image source={require('../img/search.png')} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.sectionButtons}>
        {renderSectionButton('Playlists')}
        {renderSectionButton('Artists')}
        {renderSectionButton('Albums')}
        {renderSectionButton('Podcasts')}
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#0090A8" />
      ) : activeSection === 'Playlists' ? (
        <>
          <TouchableOpacity
            style={styles.likedSongsButton}
            onPress={() => navigation.navigate('LikedSongs')}>
            <Image source={require('../img/Heart.png')} style={styles.heartIcon} />
            <Text style={styles.likedSongsText}>Liked Songs</Text>
            <Image source={require('../img/Down.png')} style={styles.arrowIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addPlaylistButton}
            onPress={handleAddPlaylist}>
            <Text style={styles.addPlaylistText}>+ Add New Playlist</Text>
          </TouchableOpacity>

          <Text style={styles.recentText}>Recents</Text>

          <FlatList
            data={playlists}
            renderItem={renderPlaylistItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.playlistList}
          />
        </>
      ) : (
        <FlatList
          data={tracks}
          renderItem={renderTrackItem}
          keyExtractor={item => item.id.toString()}
          style={styles.trackList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
  sectionButtons: {
    flexDirection: 'row',
    padding: 8,
    gap: 8,
  },
  sectionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeSectionButton: {
    backgroundColor: '#0090A8',
    borderColor: '#0090A8',
  },
  sectionButtonText: {
    fontSize: 14,
    color: '#666',
  },
  activeSectionButtonText: {
    color: '#fff',
  },
  likedSongsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  heartIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  likedSongsText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  arrowIcon: {
    width: 24,
    height: 24,
  },
  addPlaylistButton: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  addPlaylistText: {
    fontSize: 16,
    color: '#0090A8',
    fontWeight: '500',
  },
  recentText: {
    fontSize: 12,
    color: '#666',
    padding: 16,
    paddingBottom: 8,
  },
  playlistList: {
    flex: 1,
  },
  playlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  playlistLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  playIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  playlistLines: {
    width: 20,
  },
  line: {
    height: 2,
    backgroundColor: '#666',
    marginVertical: 2,
  },
  playlistTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  trackList: {
    flex: 1,
  },
  trackItem: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  trackImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  trackInfo: {
    marginLeft: 12,
    flex: 1,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  artistName: {
    fontSize: 14,
    color: '#666',
  },
});

export default Library;
