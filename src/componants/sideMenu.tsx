import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const SideMenu = () => {
  return (
    <View style={styles.container}>
      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton}>
        <Image source={require('../img/Close.png')} style={styles.icon} />
      </TouchableOpacity>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={require('../img/User.png')}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Elysia Ku</Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menuSection}>
        <TouchableOpacity style={styles.menuItem}>
          <Image
            source={require('../img/Profile.png')} // View Profile 아이콘
            style={styles.icon}
          />
          <Text style={styles.menuText}>View Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Image
            source={require('../img/TimeMachine.png')} // Recently Played 아이콘
            style={styles.icon}
          />
          <Text style={styles.menuText}>Recently Played</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Image
            source={require('../img/MusicLibrary.png')} // Library 아이콘
            style={styles.icon}
          />
          <Text style={styles.menuText}>Library</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Image
            source={require('../img/Settings.png')} // Settings 아이콘
            style={styles.icon}
          />
          <Text style={styles.menuText}>Setting</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>LOG OUT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  closeButton: {
    alignSelf: 'flex-start',
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  menuSection: {
    marginVertical: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuText: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#0090A8',
    justifyContent: 'center',
    height: 50,
    width: 100,
    borderRadius: 25,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SideMenu;
