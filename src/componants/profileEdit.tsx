import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import BackButton from './BackButton';

const ProfileEdit = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  useEffect(() => {
    const user = auth().currentUser;

    if (user) {
      setUserInfo({
        username: user.displayName || '',
        email: user.email || '',
        password: '',
        confirmPassword: '',
        phone: user.phoneNumber || '',
      });
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setUserInfo({...userInfo, [field]: value});
  };

  const handleSave = () => {
    const user = auth().currentUser;
    if (user) {
      const updates: any = {};
      if (userInfo.username) updates.displayName = userInfo.username;
      if (userInfo.phone) updates.phoneNumber = userInfo.phone;

      user.updateProfile(updates).then(() => {
        console.log('Profile updated');
      });
    }
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title}>Edit Profile</Text>

      <View style={styles.profileContainer}>
        <Image
          source={require('../img/User.png')}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editIcon}>
          <Image
            source={require('../img/Edit.png')}
            style={styles.editIconImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={userInfo.username}
          onChangeText={text => handleInputChange('username', text)}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, styles.disabledInput]}
          value={userInfo.email}
          editable={false}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={userInfo.password}
          onChangeText={text => handleInputChange('password', text)}
          secureTextEntry
        />

        <Text style={styles.label}>Confirmed Password</Text>
        <TextInput
          style={styles.input}
          value={userInfo.confirmPassword}
          onChangeText={text => handleInputChange('confirmPassword', text)}
          secureTextEntry
        />

        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value={userInfo.phone}
          onChangeText={text => handleInputChange('phone', text)}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.saveButtonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: '27%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 5,
  },
  editIconImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  inputSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    color: '#999',
  },
  saveButtonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#0090A8',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 120,
    borderRadius: 25,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileEdit;
