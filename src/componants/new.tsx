import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import BottomNavBar from './BottomNavBar';

type Song = {
  id: string;
  title: string;
  artist: string;
  image: any;
};

const NewSongs = () => {
  // 필터 상태 관리
  const [activeFilter, setActiveFilter] = useState<string>('By period');

  // Sample Data
  const songs: Song[] = [
    {
      id: '1',
      title: 'Trouble',
      artist: 'Christopher & Lee young Ji',
      image: require('../img/album_cover.png'),
    },
  ];

  // 각 곡의 항목 렌더링
  const renderSong = ({item}: {item: Song}) => (
    <View style={styles.songContainer}>
      <Text style={styles.songRank}>{item.id}</Text>
      <Image source={item.image} style={styles.songImage} />
      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>{item.title}</Text>
        <Text style={styles.songArtist}>{item.artist}</Text>
      </View>
      <TouchableOpacity>
        <Image
          source={require('../img/more_vert.png')}
          style={styles.moreIcon}
        />
      </TouchableOpacity>
    </View>
  );

  // 필터 버튼 렌더링 함수
  const renderFilterButton = (filterName: string) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        activeFilter === filterName && styles.activeFilter,
      ]}
      onPress={() => setActiveFilter(filterName)}>
      <Text
        style={[
          activeFilter === filterName
            ? styles.filterTextActive
            : styles.filterText,
        ]}>
        {filterName}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <Image source={require('../img/logo.png')} style={styles.logo} />
        <TouchableOpacity>
          <Image source={require('../img/User.png')} style={styles.userIcon} />
        </TouchableOpacity>
      </View>

      {/* 제목 */}
      <Text style={styles.title}>New Releases</Text>

      {/* 필터 버튼 */}
      <View style={styles.filterContainer}>
        {renderFilterButton('Song')}
        {renderFilterButton('Album')}
        {renderFilterButton('Vedio')}
      </View>

      {/* 곡 목록 */}
      <FlatList
        data={songs}
        renderItem={renderSong}
        keyExtractor={item => item.id}
        style={styles.songList}
      />

      {/* 하단 네비게이션 */}
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  userIcon: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeFilter: {
    backgroundColor: '#0090A8',
    borderColor: '#0090A8',
  },
  filterText: {
    fontSize: 14,
    color: '#777',
  },
  filterTextActive: {
    fontSize: 14,
    color: '#fff',
  },
  songList: {
    flex: 1,
  },
  songContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  songRank: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0090A8',
    marginRight: 16,
  },
  songImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  songArtist: {
    fontSize: 14,
    color: '#777',
  },
  moreIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export default NewSongs;
