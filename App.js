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

export default function App() {
  const Stack = createNativeStackNavigator();
  const isAuth = useSelector(state => state.loader.isAuth);
  const isSignout = useSelector(state => state.loader.isSignout);

  return (
    <PersistGate loading={<SplashScreen />} persistor={persistor}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='login' screenOptions={{ headerShown: true }}>
          {!isAuth ? (
            <>
              <Stack.Screen name="login" component={LoginScreen} options={{
                animationTypeForReplace: isSignout ? 'pop' : 'push'
              }} />
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
