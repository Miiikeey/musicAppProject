import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';

const BottomNavBar = () => {
  return (
    <View style={styles.navBar}>
      <TouchableOpacity>
        <Image source={require('../img/Home.png')} style={styles.navIcon} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={require('../img/search.png')} style={styles.navIcon} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require('../img/MusicLibrary.png')}
          style={styles.navIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

export default BottomNavBar;
