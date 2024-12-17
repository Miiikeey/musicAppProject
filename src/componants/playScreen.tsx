import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  ToastAndroid,
  FlatList,
} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../types/navigation';
import Slider from '@react-native-community/slider';
import {useNavigation} from '@react-navigation/native';
import {useMusicPlayer} from '../context/MusicPlayerContext';
import Share from 'react-native-share';
import MoreButton from './MoreButton';

type PlayScreenRouteProp = RouteProp<RootStackParamList, 'PlayScreen'>;

const PlayScreen = () => {
  const route = useRoute<PlayScreenRouteProp>();
  const navigation = useNavigation();

  const {
    currentTrack,
    isPlaying,
    togglePlayPause,
    handleSliderChange,
    progress,
    setTrack,
    setPlaylist,
    fetchTrackDetails,
    fetchPlaylist,
    addToLikedSongs,
    playlist,
    playNextTrack,
    playPrevTrack,
    toggleRepeatOne,
    shufflePlaylist,
    isRepeatOne,
  } = useMusicPlayer();

  const [isPlaylistVisible, setIsPlaylistVisible] = useState(false);

  useEffect(() => {
    const {trackId, playlistId} = route.params;

    if (currentTrack && currentTrack.id === trackId) {
      return;
    }

    if (trackId) {
      fetchTrackDetails(trackId);
    } else if (playlistId) {
      fetchPlaylist(playlistId);
    }
  }, [route.params, currentTrack]);

  const minimizePlayer = () => {
    navigation.goBack();
  };

  const formatTime = (seconds: number) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleLikeSong = () => {
    addToLikedSongs();
    ToastAndroid.show('Added to Liked Songs!', ToastAndroid.SHORT);
  };

  const handleShareSong = () => {
    if (currentTrack) {
      const shareOptions = {
        title: `Listen to ${currentTrack.title} by ${currentTrack.artist}`,
        message: `Check out this track: "${currentTrack.title}" by ${currentTrack.artist}!`,
        url: currentTrack.previewUrl,
      };

      Share.open(shareOptions)
        .then(() =>
          ToastAndroid.show('Shared successfully!', ToastAndroid.SHORT),
        )
        .catch(err => {
          if (err?.message !== 'User did not share') {
            console.error('Error sharing:', err);
            ToastAndroid.show(
              'Error occurred during sharing.',
              ToastAndroid.SHORT,
            );
          }
        });
    }
  };

  const togglePlaylist = () => {
    setIsPlaylistVisible(prev => !prev);
  };

  if (!currentTrack) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0090A8" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={minimizePlayer}>
          <Image source={require('../img/Down.png')} style={styles.iconSmall} />
        </TouchableOpacity>
        <MoreButton />
      </View>

      <Image source={{uri: currentTrack.albumCover}} style={styles.albumArt} />

      <View style={styles.trackInfo}>
        <Text style={styles.trackTitle} numberOfLines={1}>
          {currentTrack.title}
        </Text>
        <Text style={styles.artistName}>{currentTrack.artist}</Text>
      </View>

      <View style={styles.progressContainer}>
        <Slider
          style={styles.progressBar}
          minimumValue={0}
          maximumValue={1}
          value={progress}
          onValueChange={handleSliderChange}
          minimumTrackTintColor="#0090A8"
          maximumTrackTintColor="#C9C5C5"
          thumbTintColor="#0090A8"
        />
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>
            {formatTime(currentTrack?.currentTime || 0)}
          </Text>

          <Text style={styles.timeText}>
            {formatTime(currentTrack?.duration || 0)}
          </Text>
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity onPress={shufflePlaylist}>
          <Image
            source={require('../img/Shuffle.png')}
            style={styles.iconMedium}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={playPrevTrack}>
          <Image
            source={require('../img/Prev.png')}
            style={styles.iconMedium}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlayPause} style={styles.playButton}>
          <Image
            source={
              isPlaying
                ? require('../img/Stop.png')
                : require('../img/Play.png')
            }
            style={styles.iconLarge}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={playNextTrack}>
          <Image
            source={require('../img/Next.png')}
            style={styles.iconMedium}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleRepeatOne}>
          <Image
            source={
              isRepeatOne
                ? require('../img/RepeatOne.png')
                : require('../img/RepeatOneOff.png')
            }
            style={styles.iconMedium}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomControls}>
        <TouchableOpacity onPress={handleLikeSong}>
          <Image
            source={require('../img/Heart.png')}
            style={styles.iconMedium}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShareSong}>
          <Image
            source={require('../img/Export.png')}
            style={styles.iconMedium}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlaylist}>
          <Image
            source={require('../img/Playlist.png')}
            style={styles.iconMedium}
          />
        </TouchableOpacity>
      </View>

      {isPlaylistVisible && (
        <View style={styles.playlistContainer}>
          <Text style={styles.playlistTitle}>Playlist</Text>
          <FlatList
            data={playlist}
            renderItem={({item}) => (
              <View style={styles.playlistItem}>
                <Text>{item.title}</Text>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      )}
    </SafeAreaView>
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
  albumArt: {
    width: 350,
    height: 350,
    resizeMode: 'cover',
    alignSelf: 'center',
    marginBottom: 30,
    marginTop: 30,
  },
  trackInfo: {
    alignItems: 'center',
    marginBottom: 32,
  },
  trackTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  artistName: {
    fontSize: 20,
    color: '#666',
  },
  progressContainer: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  progressBar: {
    width: '100%',
    height: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  timeText: {
    fontSize: 14,
    color: '#666',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    marginBottom: 48,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 32,
    marginBottom: 32,
  },
  iconSmall: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  iconMedium: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  iconLarge: {
    width: 56,
    height: 56,
    resizeMode: 'contain',
  },
  playButton: {
    borderRadius: 32,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playlistContainer: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    bottom: 20,
    backgroundColor: 'white',
    height: 500,
    padding: 16,
    borderRadius: 10,
    elevation: 5,
  },
  playlistTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  playlistItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default PlayScreen;
