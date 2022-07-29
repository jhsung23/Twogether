import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTab from './MainTab';
import SignInScreen from './SignInScreen';
import {useUserContext} from '../contexts/UserContext';
import WelcomeScreen from './WelcomeScreen';
import {getUser} from '../lib/users';
import {subscribeAuth} from '../lib/auth';

const Stack = createNativeStackNavigator();

function RootStack() {
  const {user, setUser} = useUserContext();
  //console.log(user);

  useEffect(() => {
    // 컴포넌트 첫 로딩 시 로그인 상태를 확인하고 UserContext에 적용
    const unsubscribe = subscribeAuth(async currentUser => {
      unsubscribe();
      if (!currentUser) {
        return;
      }
      const profile = await getUser(currentUser.uid);
      if (!profile) {
        return;
      }
      setUser(profile);
    });
  }, [setUser]);

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="Main"
            component={MainTab}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default RootStack;
