import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from "../screens/HomeScreen"
import { SettingsScreen } from '../screens/SettingsScreen';

export const HomeStack = () => {
    const HomeStack = createNativeStackNavigator();

    return (
        <HomeStack.Navigator screenOptions={{ animation: 'slide_from_right' }}>
            <HomeStack.Screen name="homeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <HomeStack.Screen name="settings" component={SettingsScreen} />
        </HomeStack.Navigator>
    );
}