import React, {createContext, useContext, useState, useEffect} from 'react';
import Sound from 'react-native-sound';
import {deezerApi} from '../services/deezerApi';

export type Song = {
  id: number;
  title: string;
  artist: string;
  albumCover: string;
  currentTime?: number;
  duration: number;
  previewUrl: string;
};

type MusicPlayerContextType = {
  isPlaying: boolean;
  currentTrack: Song | null;
  likedSongs: Song[];
  playlist: Song[];
  sound: Sound | null;
  progress: number;
  currentTime: number;
  isRepeatOne: boolean;
  volume: number;
  setVolume: (value: number) => void;
  setTrack: (track: Song) => void;
  setPlaylist: (tracks: Song[]) => void;
  addToPlaylist: (track: Song) => void;
  togglePlayPause: () => void;
  playNextTrack: () => void;
  playPrevTrack: () => void;
  shufflePlaylist: () => void;
  toggleRepeatOne: () => void;
  handleSliderChange: (value: number) => void;
  addToLikedSongs: () => void;
  removeFromLikedSongs: (id: number) => void;
  fetchTrackDetails: (trackId: number) => Promise<void>;
  fetchPlaylist: (playlistId: number) => Promise<void>;
};

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(
  undefined,
);

export const MusicPlayerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Song | null>(null);
  const [playlist, setPlaylistState] = useState<Song[]>([]);
  const [likedSongs, setLikedSongs] = useState<Song[]>([]);
  const [sound, setSound] = useState<Sound | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isRepeatOne, setIsRepeatOne] = useState(false);
  const [volume, setVolume] = useState<number>(1);

  useEffect(() => {
    if (sound && isPlaying) {
      const interval = setInterval(() => {
        sound.getCurrentTime(seconds => {
          setCurrentTime(seconds);
          setProgress(seconds / (currentTrack?.duration || 1));
          setCurrentTrack(prev => {
            if (prev) {
              return {...prev, currentTime: seconds};
            }
            return prev;
          });
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [sound, isPlaying, currentTrack]);

  const handleVolumeChange = (value: number) => {
    if (sound) {
      sound.setVolume(value);
      setVolume(value);
    }
  };

  const setTrack = (track: Song) => {
    if (currentTrack?.id === track.id) {
      return;
    }

    if (sound) {
      sound.release();
    }

    const newSound = new Sound(track.previewUrl, '', error => {
      if (error) {
        console.error('Error initializing sound:', error);
        return;
      }
      newSound.setVolume(volume);
      newSound.play(success => {
        if (success) playNextTrack();
      });
      setSound(newSound);
      setIsPlaying(true);
    });

    setCurrentTrack(track);
    setProgress(0);
    setCurrentTime(0);
  };

  const setPlaylist = (tracks: Song[]) => {
    setPlaylistState(tracks);
    if (tracks.length > 0) setTrack(tracks[0]);
  };

  const addToPlaylist = (track: Song) => {
    setPlaylistState(prevPlaylist => {
      if (!prevPlaylist.some(song => song.id === track.id)) {
        return [...prevPlaylist, track];
      }
      return prevPlaylist;
    });
  };

  const togglePlayPause = () => {
    if (sound) {
      if (isPlaying) {
        sound.pause();
      } else {
        sound.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const shufflePlaylist = () => {
    const shuffledPlaylist = [...playlist];
    for (let i = shuffledPlaylist.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPlaylist[i], shuffledPlaylist[j]] = [
        shuffledPlaylist[j],
        shuffledPlaylist[i],
      ];
    }
    setPlaylistState(shuffledPlaylist);
  };

  const toggleRepeatOne = () => {
    setIsRepeatOne(prev => !prev);
  };

  const playNextTrack = () => {
    if (playlist.length > 0) {
      const currentIndex = playlist.findIndex(
        song => song.id === currentTrack?.id,
      );
      const nextIndex = (currentIndex + 1) % playlist.length;
      setTrack(playlist[nextIndex]);
    }
  };

  const playPrevTrack = () => {
    if (playlist.length > 0) {
      const currentIndex = playlist.findIndex(
        song => song.id === currentTrack?.id,
      );
      const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
      setTrack(playlist[prevIndex]);
    }
  };

  const handleSliderChange = (value: number) => {
    if (sound && currentTrack?.duration) {
      const newTime = value * currentTrack.duration;
      sound.setCurrentTime(newTime);
      setProgress(value);
      setCurrentTime(newTime);
    }
  };

  const addToLikedSongs = () => {
    if (currentTrack && !likedSongs.some(song => song.id === currentTrack.id)) {
      setLikedSongs([...likedSongs, currentTrack]);
    }
  };

  const removeFromLikedSongs = (id: number) => {
    setLikedSongs(likedSongs.filter(song => song.id !== id));
  };

  const fetchTrackDetails = async (trackId: number) => {
    const trackData = await deezerApi.getTrackDetails(trackId);
    if (trackData) {
      const song: Song = {
        id: trackData.id,
        title: trackData.title,
        artist: trackData.artist.name,
        albumCover: trackData.album.cover_medium,
        duration: trackData.duration,
        previewUrl: trackData.preview,
      };
      setTrack(song);
    }
  };

  const fetchPlaylist = async (playlistId: number) => {
    const playlistData = await deezerApi.getPlaylistTracks(playlistId);
    const tracks = playlistData.map((track: any) => ({
      id: track.id,
      title: track.title,
      artist: track.artist.name,
      albumCover: track.album.cover_medium,
      duration: track.duration,
      previewUrl: track.preview,
    }));
    setPlaylist(tracks);
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        isPlaying,
        currentTrack,
        likedSongs,
        playlist,
        sound,
        progress,
        currentTime,
        isRepeatOne,
        volume,
        setVolume: handleVolumeChange,
        setTrack,
        setPlaylist,
        addToPlaylist,
        togglePlayPause,
        playNextTrack,
        playPrevTrack,
        shufflePlaylist,
        toggleRepeatOne,
        handleSliderChange,
        addToLikedSongs,
        removeFromLikedSongs,
        fetchTrackDetails,
        fetchPlaylist,
      }}>
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (!context)
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  return context;
};
