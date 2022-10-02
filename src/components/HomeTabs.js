import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { PasswordListScreen } from "../screens/PasswordListScreen"
import { CreatePasswordScreen } from "../screens/CreatePasswordScreen"
import { HomeScreen } from "../screens/HomeScreen"

export const HomeTabs = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator screenOptions={{ headerShown: true }}>
            <Tab.Screen name="home" component={HomeScreen} />
            <Tab.Screen name="list" component={PasswordListScreen} />
            <Tab.Screen name="create" component={CreatePasswordScreen} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});