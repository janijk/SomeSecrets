import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreatePasswordScreen } from "../screens/CreatePasswordScreen"
import { GenerationHistoryScreen } from '../screens/GenerationHistoryScreen';

export const PwlsStackScreen = () => {
    const PwlsStack = createNativeStackNavigator();

    return (
        <PwlsStack.Navigator screenOptions={{ animation: 'slide_from_right' }}>
            <PwlsStack.Screen name="create" component={CreatePasswordScreen} options={{ headerShown: false }} />
            <PwlsStack.Screen name="history" component={GenerationHistoryScreen} />
        </PwlsStack.Navigator>
    );
}