import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import auth from '@react-native-firebase/auth';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SideMenu = () => {
  const navigation = useNavigation<NavigationProp>();
  const [profileName, setProfileName] = useState<string>('');

  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      setProfileName(user.displayName || user.email || 'User');
    }
  }, []);

  const handleLogout = async () => {
    try {
      await auth().signOut();
      Alert.alert('Logged Out', 'You have been successfully logged out.');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', 'Failed to log out. Please try again later.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Close Button */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}>
        <Image source={require('../img/Close.png')} style={styles.icon} />
      </TouchableOpacity>

      {/* Profile Section */}
      <TouchableOpacity
        style={styles.profileSection}
        onPress={() => navigation.navigate('Profile')}>
        <Image
          source={require('../img/User.png')}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{profileName}</Text>
      </TouchableOpacity>

      {/* Menu Items */}
      <View style={styles.menuSection}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Profile')}>
          <Image source={require('../img/Profile.png')} style={styles.icon} />
          <Text style={styles.menuText}>View Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('RecentlyPlayed')}>
          <Image
            source={require('../img/TimeMachine.png')}
            style={styles.icon}
          />
          <Text style={styles.menuText}>Recently Played</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Library')}>
          <Image
            source={require('../img/MusicLibrary.png')}
            style={styles.icon}
          />
          <Text style={styles.menuText}>Library</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Image source={require('../img/Settings.png')} style={styles.icon} />
          <Text style={styles.menuText}>Setting</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
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
    width: 80,
    height: 80,
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
