import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from "./src/screens/LoginScreen"
import { HomeScreen } from "./src/screens/HomeScreen"
import { PasswordListScreen } from "./src/screens/PasswordListScreen"
import { CreatePasswordScreen } from "./src/screens/CreatePasswordScreen"
import { SignUpScreen } from "./src/screens/SignUpScreen"

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='login'>
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="signup" component={SignUpScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
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
