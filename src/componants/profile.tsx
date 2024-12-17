import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import {deezerApi, type DeezerPlaylist} from '../services/deezerApi';
import auth from '@react-native-firebase/auth';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Profile = () => {
  const navigation = useNavigation<NavigationProp>();
  const [playlists, setPlaylists] = useState<DeezerPlaylist[]>([]);
  const [loading, setLoading] = useState(true);
  const [profileName, setProfileName] = useState<string>('');

  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      setProfileName(user.displayName || user.email || 'User');
    }
  }, []);

  const fetchUserPlaylists = async () => {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        console.log('No user logged in');
        return;
      }

      const userPlaylists = await deezerApi.getUserPlaylists(currentUser.uid);
      setPlaylists(userPlaylists);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        fetchUserPlaylists();
      } else {
        setPlaylists([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileSection}>
        <Image
          style={styles.profileImage}
          source={require('../img/User.png')}
        />
        <Text style={styles.profileName}>{profileName}</Text>

        <View style={styles.profileButtons}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('ProfileEdit')}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.likedSongsSection}
        onPress={() => navigation.navigate('LikedSongs')}>
        <View style={styles.likedSongsLeft}>
          <Image
            source={require('../img/Heart.png')}
            style={styles.heartIcon}
          />
          <Text style={styles.likedSongsText}>Liked Songs</Text>
        </View>
        <Image source={require('../img/Down.png')} style={styles.chevronIcon} />
      </TouchableOpacity>

      <View style={styles.playlistsSection}>
        <Text style={styles.playlistsTitle}>Playlists</Text>
        <ScrollView>
          {playlists.map((playlist, index) => (
            <TouchableOpacity
              key={playlist.id || index}
              style={styles.playlistItem}
              onPress={() =>
                navigation.navigate('PlayScreen', {playlistId: playlist.id})
              }>
              <View style={styles.playlistLeft}>
                <Image
                  source={require('../img/album_cover.png')}
                  style={styles.playlistIcon}
                />
                <Text style={styles.playlistName}>{`Playlist ${
                  index + 1
                }`}</Text>
              </View>
              <Image
                source={require('../img/Down.png')}
                style={styles.chevronIcon}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  profileButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginRight: 16,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  shareButton: {
    padding: 8,
  },
  shareIcon: {
    width: 24,
    height: 24,
  },
  likedSongsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  likedSongsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  likedSongsText: {
    fontSize: 18,
    fontWeight: '500',
  },
  chevronIcon: {
    width: 24,
    height: 24,
  },
  playlistsSection: {
    flex: 1,
    paddingHorizontal: 16,
  },
  playlistsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  playlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  playlistLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playlistIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  playlistName: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default Profile;
