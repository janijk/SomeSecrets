import React, { useRef, useState, useEffect } from 'react';
import { AppState } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { persistor } from './src/redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from "./src/screens/LoginScreen"
import { SignUpScreen } from "./src/screens/SignUpScreen"
import { HomeTabs } from './src/components/HomeTabs';
import { SplashScreen } from './src/screens/SplashScreen';
import { PinScreen } from './src/screens/PinScreen';
import { setPinCorrect } from './src/redux/loaderSlice';

export default function App() {
  const appState = useRef(AppState.currentState);
  const Stack = createNativeStackNavigator();
  const isAuth = useSelector(state => state.loader.isAuth);
  const isPinEnabled = useSelector(state => state.loader.isPin);
  const isPinCorrect = useSelector(state => state.loader.pinCorrect);
  const w = useSelector(state => state.loader);

  const dispatch = useDispatch();
  const MyTheme = {
    dark: true,
    colors: {
      primary: '#FF79C6',
      background: '#212121',
      card: '#282A36',
      text: '#79C0FF',
      border: '#FF79C6',
      notification: '#79C0FF',
    },
  };

  useEffect(() => {
    const subscription = AppState.addEventListener("change", stateChange);
    console.log("UE:", w);
    return () => {
      subscription.remove();
      console.log("Appstate sub removed");
    };
  }, []);

  const stateChange = (nextAppState) => {
    if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!');
      console.log("loader", w);
    }
    if (appState.current.match(/active/) && nextAppState === 'background') {
      dispatch(setPinCorrect())
      console.log('App goes to back');
    }
    appState.current = nextAppState;
  };

  return (
    <PersistGate loading={<SplashScreen />} persistor={persistor}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator initialRouteName='login' screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
          {!isAuth ? (
            <>
              <Stack.Screen name="login" component={LoginScreen} />
              <Stack.Screen name="Sign up" component={SignUpScreen} options={{ headerShown: true }} />
            </>
          ) : (
            <>
              {isPinEnabled && !isPinCorrect ? (
                <Stack.Screen name="pin" component={PinScreen} />
              ) : (
                <Stack.Screen name='hometabs' component={HomeTabs} />
              )}
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PersistGate>
  );
}
