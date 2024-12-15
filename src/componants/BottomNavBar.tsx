import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const BottomNavBar = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();

  return (
    <View style={styles.navBar}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={[styles.navItem, route.name === 'Home' && styles.activeNavItem]}>
        <Image source={require('../img/Home.png')} style={styles.navIcon} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Search')}
        style={[
          styles.navItem,
          route.name === 'Search' && styles.activeNavItem,
        ]}>
        <Image source={require('../img/search.png')} style={styles.navIcon} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Library')}
        style={[
          styles.navItem,
          route.name === 'Library' && styles.activeNavItem,
        ]}>
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
    backgroundColor: '#fff',
  },
  navIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  navItem: {
    padding: 8,
    borderRadius: 8,
  },
  activeNavItem: {
    backgroundColor: '#f0f0f0',
  },
});

export default BottomNavBar;
