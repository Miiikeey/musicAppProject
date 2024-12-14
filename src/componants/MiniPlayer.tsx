import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';
import {useMusicPlayer} from '../context/MusicPlayerContext';

const MiniPlayer = () => {
  const {
    currentTrack,
    togglePlayPause,
    isPlaying,
    progress,
    handleSliderChange,
  } = useMusicPlayer();

  console.log('Current Track:', currentTrack);

  if (!currentTrack) return null;

  return (
    <View style={styles.miniPlayer}>
      <Image source={{uri: currentTrack.albumCover}} style={styles.albumArt} />
      <View style={styles.trackInfo}>
        <Text style={styles.trackTitle} numberOfLines={1}>
          {currentTrack.title}
        </Text>
        <Text style={styles.artistName}>{currentTrack.artist}</Text>
        {/* 슬라이더 추가 */}
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={progress} // 0~1 사이의 값
          onValueChange={handleSliderChange} // 슬라이더 변경 처리 함수
          minimumTrackTintColor="#0090A8"
          maximumTrackTintColor="#ddd"
          thumbTintColor="#0090A8"
        />
      </View>
      <TouchableOpacity onPress={togglePlayPause}>
        <Image
          source={
            isPlaying ? require('../img/Stop.png') : require('../img/Play.png')
          }
          style={styles.playIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  miniPlayer: {
    position: 'absolute',
    bottom: 0,
    left: 5,
    right: 5,
    height: 80,
    backgroundColor: '#A7D8DD',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    elevation: 5,
  },
  albumArt: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  trackInfo: {
    flex: 1,
    marginHorizontal: 10,
  },
  trackTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  artistName: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  slider: {
    width: '100%',
    height: 20,
  },
  playIcon: {
    width: 30,
    height: 30,
  },
});

export default MiniPlayer;
