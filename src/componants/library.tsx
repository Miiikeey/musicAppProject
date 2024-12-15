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
import {deezerApi, DeezerTrack} from '../services/deezerApi';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import BackButton from './BackButton';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type LibrarySection = 'favorites' | 'playlists' | 'albums';

const Library = () => {
  const [activeSection, setActiveSection] =
    useState<LibrarySection>('favorites');
  const [tracks, setTracks] = useState<DeezerTrack[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    loadContent();
  }, [activeSection]);

  const loadContent = async () => {
    setIsLoading(true);
    try {
      // For demo purposes, we'll use getTopTracks
      // In a real app, you'd use different endpoints based on activeSection
      const data = await deezerApi.getTopTracks();
      setTracks(data);
    } catch (error) {
      console.error('Error loading library content:', error);
    }
    setIsLoading(false);
  };

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

  const renderSectionButton = (section: LibrarySection, label: string) => (
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
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title}>Library</Text>

      <View style={styles.sectionButtons}>
        {renderSectionButton('favorites', 'Favorites')}
        {renderSectionButton('playlists', 'Playlists')}
        {renderSectionButton('albums', 'Albums')}
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#0090A8" />
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
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionButtons: {
    flexDirection: 'row',
    marginBottom: 16,
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
