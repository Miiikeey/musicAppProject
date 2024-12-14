import React, {useEffect, useState} from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation'; // RootStackParamList 가져오기
import auth from '@react-native-firebase/auth'; // Firebase Auth 가져오기

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Header = () => {
  const navigation = useNavigation<NavigationProp>();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  useEffect(() => {
    // Firebase Auth 상태 변경 감지
    const unsubscribe = auth().onAuthStateChanged(user => {
      setIsLoggedIn(!!user); // user가 있으면 true, 없으면 false
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 구독 해제
  }, []);

  return (
    <View style={styles.headerContainer}>
      {/* 로고 */}
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image style={styles.logo} source={require('../img/logo.png')} />
      </TouchableOpacity>

      {/* 로그인 상태에 따라 버튼 변경 */}
      {!isLoggedIn ? (
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>LOG IN</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image style={styles.userIcon} source={require('../img/User.png')} />
        </TouchableOpacity>
      )}
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
  },
  loginButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#0090A8',
    borderRadius: 20,
  },
  loginText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default Header;
