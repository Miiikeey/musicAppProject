import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import Sound from 'react-native-sound';

type MusicPlayerContextType = {
  isPlaying: boolean;
  currentTrack: {
    id: number;
    title: string;
    artist: string;
    albumCover: string;
    duration: number;
    previewUrl: string;
  } | null;
  sound: Sound | null;
  progress: number;
  currentTime: number;
  togglePlayPause: () => void;
  minimizePlayer: () => void;
  setTrack: (track: MusicPlayerContextType['currentTrack']) => void;
  handleSliderChange: (value: number) => void;
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
  const [currentTrack, setCurrentTrack] =
    useState<MusicPlayerContextType['currentTrack']>(null);
  const [sound, setSound] = useState<Sound | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (sound && isPlaying && currentTrack?.duration) {
      const interval = setInterval(() => {
        sound.getCurrentTime(seconds => {
          setCurrentTime(seconds);
          setProgress(seconds / currentTrack.duration); // 진행 상태를 0~1로 계산
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
      sound.setCurrentTime(newTime); // 새 시간 설정
      setCurrentTime(newTime); // 상태 업데이트
      setProgress(value); // 슬라이더 업데이트
    }
  };

  const setTrack = (track: MusicPlayerContextType['currentTrack']) => {
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
    setProgress(0); // 새 트랙 로드 시 진행 상태 초기화
    setCurrentTime(0);
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        isPlaying,
        currentTrack,
        sound,
        progress,
        currentTime,
        togglePlayPause,
        minimizePlayer: () => setIsPlaying(false),
        setTrack,
        handleSliderChange,
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
