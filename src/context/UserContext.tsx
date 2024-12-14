import React, {createContext, useContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';

// User Context 생성
const UserContext = createContext({
  isLoggedIn: false, // 로그인 상태
  setIsLoggedIn: (value: boolean) => {}, // 로그인 상태 업데이트 함수
});

export const UserProvider = ({children}: {children: React.ReactNode}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Firebase Auth 상태 감지
    const unsubscribe = auth().onAuthStateChanged(user => {
      setIsLoggedIn(!!user); // 유저가 있으면 true, 없으면 false
    });

    return unsubscribe; // 컴포넌트 언마운트 시 구독 해제
  }, []);

  return (
    <UserContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
