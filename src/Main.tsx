import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, StyleSheet} from 'react-native';
import Header from './componants/header';
import BottomNavBar from './componants/BottomNavBar';
import Home from './componants/mainScreen';
import Search from './componants/search';
import Library from './componants/library';
import Login from './componants/login';
import Profile from './componants/profile';
import PlayScreen from './componants/playScreen';
import ProfileEdit from './componants/profileEdit';
import NewSongs from './componants/new';
import TopSongs from './componants/top';
import RecentlyPlayed from './componants/recent';
import {RootStackParamList} from './types/navigation';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainLayout = ({children}: {children: React.ReactNode}) => (
  <View style={styles.container}>
    <Header />
    <View style={styles.content}>{children}</View>
    <BottomNavBar />
  </View>
);

const ScreenWithLayout = (Component: React.ComponentType<any>) => {
  return (props: any) => (
    <MainLayout>
      <Component {...props} />
    </MainLayout>
  );
};

const Main = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '739921158481-q78h8l23j7ppr97hmtl84uhlbvqi7mv4.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: () => null,
        }}>
        <Stack.Screen name="Home" component={ScreenWithLayout(Home)} />
        <Stack.Screen name="Search" component={ScreenWithLayout(Search)} />
        <Stack.Screen name="Library" component={ScreenWithLayout(Library)} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Profile" component={ScreenWithLayout(Profile)} />
        <Stack.Screen name="PlayScreen" component={PlayScreen} />
        <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
        <Stack.Screen name="NewSongs" component={NewSongs} />
        <Stack.Screen name="TopSongs" component={TopSongs} />
        <Stack.Screen name="RecentlyPlayed" component={RecentlyPlayed} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default Main;
