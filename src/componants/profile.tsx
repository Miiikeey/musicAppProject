import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const Profile = () => {
  const playlists = [
    'Playlist 1',
    'Playlist 2',
    'Playlist 3',
    'Playlist 4',
    'Playlist 5',
  ];

  return (
    <View style={styles.container}>
      {/* 상단 로고 */}
      <View style={styles.logoContainer}>
        <Image source={require('../img/logo.png')} style={styles.logo} />
      </View>

      {/* 프로필 섹션 */}
      <View style={styles.profileSection}>
        <Image
          source={require('../img/User.png')}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Elysia Ku</Text>

        {/* Edit 버튼과 공유 버튼 */}
        <View style={styles.profileButtons}>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Image
              source={require('../img/Export.png')}
              style={styles.shareIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Liked Songs */}
      <TouchableOpacity style={styles.likedSongs}>
        <View style={styles.likedSongsLeft}>
          <Image
            source={require('../img/Heart.png')}
            style={styles.playlistIcon}
          />
          <Text style={styles.likedSongsText}>Liked Songs</Text>
        </View>
        <Text style={styles.arrow}>➔</Text>
      </TouchableOpacity>

      {/* Playlists */}
      <Text style={styles.playlistHeader}>Playlists</Text>
      <FlatList
        data={playlists}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.playlistItem}>
            <Image
              source={require('../img/Playlist.png')}
              style={styles.playlistIcon}
            />
            <Text style={styles.playlistText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // 전체 컨테이너
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  // 상단 로고
  logoContainer: {
    alignItems: 'flex-start', // 왼쪽 정렬
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },

  // 프로필 섹션
  profileSection: {
    alignItems: 'center', // 왼쪽 정렬
    marginBottom: 20,
  },
  profileImage: {
    width: 90, // 프로필 이미지 크기
    height: 90,
    borderRadius: 45, // 원형
    marginBottom: 10,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  profileButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  editButton: {
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  shareButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },

  likedSongs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  likedSongsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likedSongsIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  likedSongsText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  arrow: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  playlistHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  playlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  playlistIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: 'contain',
  },
  playlistText: {
    fontSize: 16,
  },
});

export default Profile;
