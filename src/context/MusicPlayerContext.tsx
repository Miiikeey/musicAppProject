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
  sound: Sound | null;
  progress: number;
  currentTime: number;
  togglePlayPause: () => void;
  minimizePlayer: () => void;
  setTrack: (track: Song) => void;
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
  const [sound, setSound] = useState<Sound | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

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
        setSound(newSound);
      }
    });
    setCurrentTrack(track);
    setSound(newSound);
    setIsPlaying(true);
    setProgress(0);
    setCurrentTime(0);
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
        sound,
        progress,
        currentTime,
        togglePlayPause,
        minimizePlayer: () => setIsPlaying(false),
        setTrack,
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
