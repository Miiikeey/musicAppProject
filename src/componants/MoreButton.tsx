import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {useMusicPlayer} from '../context/MusicPlayerContext';

const MoreButton = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const {addToPlaylist, addToLikedSongs, currentTrack} = useMusicPlayer();

  const toggleMenu = () => setMenuVisible(prev => !prev);

  const handleAddToPlaylist = () => {
    if (currentTrack) {
      addToPlaylist(currentTrack);
      console.log('Track added to Playlist:', currentTrack.title);
    }
    toggleMenu();
  };

  const handleAddToLiked = () => {
    addToLikedSongs();
    console.log('Track added to Liked Songs');
    toggleMenu();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleMenu} style={styles.moreButton}>
        <Image
          source={require('../img/more_vert.png')}
          style={styles.moreIcon}
        />
      </TouchableOpacity>

      {menuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity
            onPress={handleAddToPlaylist}
            style={styles.menuItem}>
            <Text style={styles.menuText}>Add to Playlist</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAddToLiked} style={styles.menuItem}>
            <Text style={styles.menuText}>Add to Liked Songs</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  moreButton: {
    padding: 8,
  },
  moreIcon: {
    width: 24,
    height: 24,
  },
  menu: {
    position: 'absolute',
    top: 30,
    right: 0,
    width: 150,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    zIndex: 1000,
  },
  menuItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuText: {
    fontSize: 16,
    color: '#0090A8',
  },
});

export default MoreButton;
