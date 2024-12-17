import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import Sound from 'react-native-sound';

type Song = {
  id: number;
  title: string;
  artist: string;
  albumCover: string;
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
  togglePlayPause: () => void;
  minimizePlayer: () => void;
  setTrack: (track: Song) => void;
  setPlaylist: (tracks: Song[]) => void;
  playNextTrack: () => void;
  handleSliderChange: (value: number) => void;
  addToLikedSongs: () => void;
  removeFromLikedSongs: (id: number) => void;
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
  const [likedSongs, setLikedSongs] = useState<Song[]>([]);
  const [playlist, setPlaylistState] = useState<Song[]>([]);
  const [sound, setSound] = useState<Sound | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (sound) {
      sound.play(success => {
        if (success) {
          playNextTrack();
        } else {
          console.error('Playback failed due to audio decoding errors.');
        }
      });
    }
  }, [sound]);

  useEffect(() => {
    if (sound && isPlaying && currentTrack?.duration) {
      const interval = setInterval(() => {
        sound.getCurrentTime(seconds => {
          setCurrentTime(seconds);
          setProgress(seconds / currentTrack.duration);
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [sound, isPlaying, currentTrack]);

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

  const handleSliderChange = (value: number) => {
    if (sound && currentTrack?.duration) {
      const newTime = value * currentTrack.duration;
      sound.setCurrentTime(newTime);
      setCurrentTime(newTime);
      setProgress(value);
    }
  };

  const setTrack = (track: Song) => {
    if (!track) return;

    if (sound) {
      sound.release();
    }

    const newSound = new Sound(track.previewUrl, '', error => {
      if (!error) {
        console.log('Sound initialized:', track.title);
        setSound(newSound);
      } else {
        console.error('Error initializing sound:', error);
      }
    });

    setCurrentTrack(track);
    setSound(newSound);
    setIsPlaying(true);
    setProgress(0);
    setCurrentTime(0);
  };

  const setPlaylist = (tracks: Song[]) => {
    setPlaylistState(tracks);
    if (tracks.length > 0) {
      setTrack(tracks[0]);
    }
  };

  const playNextTrack = () => {
    if (playlist.length > 0) {
      const currentIndex = playlist.findIndex(
        song => song.id === currentTrack?.id,
      );
      const nextIndex = currentIndex + 1;

      if (nextIndex < playlist.length) {
        setTrack(playlist[nextIndex]);
      } else {
        setIsPlaying(false);
        setCurrentTrack(null);
        setSound(null);
        setProgress(0);
        setCurrentTime(0);
      }
    }
  };

  const addToLikedSongs = () => {
    if (currentTrack) {
      setLikedSongs(prevLikedSongs => {
        if (!prevLikedSongs.some(song => song.id === currentTrack.id)) {
          return [...prevLikedSongs, currentTrack];
        }
        return prevLikedSongs;
      });
    }
  };

  const removeFromLikedSongs = (id: number) => {
    setLikedSongs(prevLikedSongs =>
      prevLikedSongs.filter(song => song.id !== id),
    );
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
        togglePlayPause,
        minimizePlayer: () => setIsPlaying(false),
        setTrack,
        setPlaylist,
        playNextTrack,
        handleSliderChange,
        addToLikedSongs,
        removeFromLikedSongs,
      }}>
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return context;
};
