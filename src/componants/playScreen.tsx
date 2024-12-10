import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';

const PlayScreen = () => {
  const [isPlaying, setIsPlaying] = useState(false); // 재생 상태 관리

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying); // 상태를 반대로 토글
  };

  return (
    <View style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <Image source={require('../img/logo.png')} style={styles.logoIcon} />
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <Image
              source={require('../img/Down.png')}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../img/more_vert.png')}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* 앨범 커버 */}
      <View style={styles.albumArtContainer}>
        <Image
          source={require('../img/album_cover.png')}
          style={styles.albumArt}
        />
      </View>

      {/* 노래 정보 */}
      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>Trouble</Text>
        <Text style={styles.songArtist}>Christopher & Lee young Ji</Text>
      </View>

      {/* 재생 슬라이더 */}
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#0090A8"
          maximumTrackTintColor="#ddd"
          thumbTintColor="#0090A8"
        />
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>0:00</Text>
          <Text style={styles.timeText}>2:36</Text>
        </View>
      </View>

      {/* 재생 컨트롤 */}
      <View style={styles.controls}>
        <TouchableOpacity>
          <Image
            source={require('../img/Shuffle.png')}
            style={styles.controlIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../img/Prev.png')}
            style={styles.controlIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlayPause}>
          <Image
            source={
              isPlaying
                ? require('../img/Stop.png') // 정지 버튼 이미지
                : require('../img/Play.png') // 재생 버튼 이미지
            }
            style={styles.playIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../img/Next.png')}
            style={styles.controlIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../img/RepeatOne.png')}
            style={styles.controlIcon}
          />
        </TouchableOpacity>
      </View>

      {/* 하단 추가 옵션 */}
      <View style={styles.footer}>
        <TouchableOpacity>
          <Image
            source={require('../img/Heart.png')}
            style={styles.footerIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../img/Export.png')}
            style={styles.footerIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../img/Playlist.png')}
            style={styles.footerIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 50,
  },
  logoIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  albumArtContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  albumArt: {
    width: 350,
    height: 350,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  songInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  songTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  songArtist: {
    fontSize: 16,
    color: '#777',
  },
  sliderContainer: {
    marginBottom: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -10,
  },
  timeText: {
    fontSize: 14,
    color: '#777',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 30,
  },
  controlIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  playIcon: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
  },
  footerIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
});

export default PlayScreen;
