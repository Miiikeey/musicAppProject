import React from 'react';
import {View, StyleSheet} from 'react-native';
import Header from './componants/header';
import BottomNavBar from './componants/BottomNavBar';

const Main = () => {
  return (
    <View style={styles.container}>
      <Header />
      {/* 나머지 화면 내용 */}
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
});

export default Main;
