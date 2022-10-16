import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { persistor } from './src/redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from "./src/screens/LoginScreen"
import { SignUpScreen } from "./src/screens/SignUpScreen"
import { HomeTabs } from './src/components/HomeTabs';
import { SplashScreen } from './src/screens/SplashScreen';
import { useFonts } from 'expo-font'; // Implement or not to implement?

export default function App() {
  const Stack = createNativeStackNavigator();
  const isAuth = useSelector(state => state.loader.isAuth);
  const isSignout = useSelector(state => state.loader.isSignout);

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

  return (
    <PersistGate loading={<SplashScreen />} persistor={persistor}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator initialRouteName='login' screenOptions={{ headerShown: false }}>
          {!isAuth ? (
            <>
              <Stack.Screen name="login" component={LoginScreen} />
              <Stack.Screen name="signup" component={SignUpScreen} />
            </>
          ) : (
            <Stack.Screen name='hometabs' component={HomeTabs} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PersistGate>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
