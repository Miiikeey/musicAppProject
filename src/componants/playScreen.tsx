import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../types/navigation';
import {deezerApi, DeezerTrack} from '../services/deezerApi';
import Sound from 'react-native-sound';
import Slider from '@react-native-community/slider';
import {useNavigation} from '@react-navigation/native';

type PlayScreenRouteProp = RouteProp<RootStackParamList, 'PlayScreen'>;

const PlayScreen = () => {
  const route = useRoute<PlayScreenRouteProp>();
  const [track, setTrack] = useState<DeezerTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Sound | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    loadTrack();
    return () => {
      sound?.release();
    };
  }, []);

  useEffect(() => {
    if (sound && isPlaying && track?.duration) {
      const interval = setInterval(() => {
        sound.getCurrentTime(seconds => {
          setCurrentTime(seconds);
          setProgress(seconds / track.duration);
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [sound, isPlaying, track]);

  const loadTrack = async () => {
    const {trackId, playlistId} = route.params;

    if (trackId) {
      const trackData = await deezerApi.getTrackDetails(trackId);
      if (trackData) {
        setTrack(trackData);
        setupSound(trackData.preview);
      }
    } else if (playlistId) {
      // Handle playlist loading
      const playlistTracks = await deezerApi.getPlaylistTracks(playlistId);
      if (playlistTracks?.length > 0) {
        setTrack(playlistTracks[0]);
        setupSound(playlistTracks[0].preview);
      }
    }
  };

  const setupSound = (previewUrl: string) => {
    const newSound = new Sound(previewUrl, '', error => {
      if (error) {
        console.error('Error loading sound:', error);
        return;
      }
      newSound.setNumberOfLoops(0);
      newSound.setVolume(1.0);
    });
    setSound(newSound);
  };

  const togglePlayPause = () => {
    if (sound) {
      if (isPlaying) {
        sound.pause();
      } else {
        sound.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (seconds: number) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSliderChange = (value: number) => {
    if (sound && track?.duration) {
      const newTime = value * track.duration;
      sound.setCurrentTime(newTime);
      setCurrentTime(newTime);
      setProgress(value);
    }
  };

  const minimizePlayer = () => {
    navigation.goBack();
  };

  if (!track) {
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
        <TouchableOpacity>
          <Image
            source={require('../img/more_vert.png')}
            style={styles.iconSmall}
          />
        </TouchableOpacity>
      </View>

      <Image source={{uri: track.album.cover_medium}} style={styles.albumArt} />

      <View style={styles.trackInfo}>
        <Text
          style={styles.trackTitle}
          numberOfLines={1} // 한 줄로 제한
          adjustsFontSizeToFit // 폰트를 자동으로 줄임
          minimumFontScale={0.8} // 최소 폰트 크기 비율
        >
          {track.title}
        </Text>
        <Text style={styles.artistName}>{track.artist.name}</Text>
      </View>

      <View style={styles.progressContainer}>
        <Slider
          style={styles.progressBar}
          minimumValue={0}
          maximumValue={1}
          value={progress}
          onValueChange={handleSliderChange}
          minimumTrackTintColor="#0090A8"
          maximumTrackTintColor="#ddd"
          thumbTintColor="#0090A8"
        />
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
          <Text style={styles.timeText}>
            {formatTime(track?.duration || 0)}
          </Text>
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity>
          <Image
            source={require('../img/Shuffle.png')}
            style={styles.iconMedium}
          />
        </TouchableOpacity>
        <TouchableOpacity>
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
            style={[styles.iconLarge, styles.whiteIcon]}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../img/Next.png')}
            style={styles.iconMedium}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../img/RepeatOne.png')}
            style={styles.iconMedium}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomControls}>
        <TouchableOpacity>
          <Image
            source={require('../img/Heart.png')}
            style={styles.iconMedium}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../img/Export.png')}
            style={styles.iconMedium}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../img/Playlist.png')}
            style={styles.iconMedium}
          />
        </TouchableOpacity>
      </View>
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
    backgroundColor: '#000',
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
  whiteIcon: {
    tintColor: '#fff',
  },
});

export default PlayScreen;
