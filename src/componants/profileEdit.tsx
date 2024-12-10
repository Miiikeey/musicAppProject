import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const ProfileEdit = () => {
  return (
    <View style={styles.container}>
      {/* 뒤로가기 아이콘 */}
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      {/* 제목 */}
      <Text style={styles.title}>Edit Profile</Text>

      {/* 프로필 이미지 */}
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

      {/* Input section */}
      <View style={styles.inputSection}>
        <Text style={styles.label}>Username</Text>
        <TextInput style={styles.input} />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, styles.disabledInput]}
          editable={false}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} secureTextEntry />

        <Text style={styles.label}>Confirmed Password</Text>
        <TextInput style={styles.input} secureTextEntry />

        <Text style={styles.label}>Phone</Text>
        <TextInput style={styles.input} keyboardType="phone-pad" />

        {/* Subscription Plan */}
        <Text style={styles.label}>Subscription Plan</Text>
        <View style={styles.subscriptionRow}>
          <Text style={styles.subscriptionText}>Premium</Text>
          <TouchableOpacity style={styles.editSubscriptionButton}>
            <Text style={styles.editSubscriptionText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Save Button */}
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity style={styles.saveButton}>
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
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
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
  subscriptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  subscriptionText: {
    fontSize: 16,
  },
  editSubscriptionButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
  },
  editSubscriptionText: {
    fontSize: 14,
    fontWeight: 'bold',
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
