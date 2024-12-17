import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {deezerApi} from '../services/deezerApi';
import BackButton from './BackButton';

const CreatePlaylist = () => {
  const [playlistName, setPlaylistName] = useState('');
  const navigation = useNavigation();

  const handleCreatePlaylist = async () => {
    if (!playlistName.trim()) {
      ToastAndroid.show('Please enter a playlist name', ToastAndroid.SHORT);
      return;
    }

    try {
      const newPlaylist = await deezerApi.createPlaylist('local', playlistName);
      if (newPlaylist) {
        ToastAndroid.show('Playlist created successfully!', ToastAndroid.SHORT);
        navigation.goBack();
      } else {
        ToastAndroid.show('Failed to create playlist', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error creating playlist:', error);
      ToastAndroid.show('Error creating playlist', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.title}>Create New Playlist</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Playlist Name"
          value={playlistName}
          onChangeText={setPlaylistName}
          autoFocus
        />

        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreatePlaylist}>
          <Text style={styles.createButtonText}>Create Playlist</Text>
        </TouchableOpacity>
      </View>
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
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  form: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 24,
  },
  createButton: {
    backgroundColor: '#0090A8',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreatePlaylist;
