import React from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      {/* 로고 이미지 */}
      <Image style={styles.logo} source={require('../img/logo.png')} />

      {/* 로그인 버튼 */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>LOG IN</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  loginButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#007bff',
    borderRadius: 20,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Header;
