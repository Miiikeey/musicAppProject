import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
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

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<DeezerTrack[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  const handleSearch = async (text: string) => {
    setSearchQuery(text);
    if (text.length > 2) {
      setIsLoading(true);
      const results = await deezerApi.searchTracks(text);
      setSearchResults(results);
      setIsLoading(false);
    }
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

  return (
    <View style={styles.container}>
      <BackButton />
      <TextInput
        style={styles.searchInput}
        placeholder="Search for tracks..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      
      {isLoading ? (
        <ActivityIndicator size="large" color="#0090A8" />
      ) : (
        <FlatList
          data={searchResults}
          renderItem={renderTrackItem}
          keyExtractor={item => item.id.toString()}
          style={styles.resultsList}
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
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  resultsList: {
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

export default Search;
