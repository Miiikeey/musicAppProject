import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  SectionList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import {deezerApi} from '../services/deezerApi';
import BottomNavBar from './BottomNavBar';
import Header from './header';
import BackButton from './BackButton';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const RecentlyPlayed = () => {
  const [sections, setSections] = useState<any[]>([]);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    loadRecentlyPlayed();
  }, []);

  const loadRecentlyPlayed = async () => {
    const tracks = await fetchRecentlyPlayed();

    const groupedRecords: {[key: string]: any[]} = {};
    tracks.forEach(track => {
      if (!groupedRecords[track.date]) {
        groupedRecords[track.date] = [];
      }
      groupedRecords[track.date].push(track);
    });

    setSections(
      Object.keys(groupedRecords).map(date => ({
        title: date,
        data: groupedRecords[date],
      })),
    );
  };

  const fetchRecentlyPlayed = async () => {
    try {
      const response = await deezerApi.getTopTracks();
      return response.map((track: any) => ({
        id: track.id,
        title: track.title,
        artist: track.artist.name,
        image: track.album.cover_medium,
        date: new Date().toISOString().split('T')[0],
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  const renderSongItem = ({item}: {item: any}) => (
    <TouchableOpacity
      style={styles.songItem}
      onPress={() => navigation.navigate('PlayScreen', {trackId: item.id})}>
      <Image source={{uri: item.image}} style={styles.songImage} />
      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>{item.title}</Text>
        <Text style={styles.songArtist}>{item.artist}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSectionHeader = ({
    section: {title},
  }: {
    section: {title: string};
  }) => <Text style={styles.sectionHeader}>{title}</Text>;

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.backAndTitle}>
        <BackButton />
        <Text style={styles.title}>Recently Played</Text>
      </View>

      <SectionList
        sections={sections}
        renderItem={renderSongItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.songList}
      />

      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backAndTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginLeft: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#f8f8f8',
    margin: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  songList: {
    paddingHorizontal: 16,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  songImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  songInfo: {
    flex: 1,
    marginLeft: 12,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  songArtist: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default RecentlyPlayed;
