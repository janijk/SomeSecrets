import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PasswordListScreen } from "../screens/PasswordListScreen"
import { PwlsStackScreen } from './PwlsStack';
import { HomeScreen } from "../screens/HomeScreen"
import { AntDesign } from '@expo/vector-icons';
import { MemoScreen } from '../screens/MemoScreen';

export const HomeTabs = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'home') {
                        iconName = focused ? 'home' : 'home';
                    } else if (route.name === 'memo') {
                        iconName = focused ? 'book' : 'book';
                    } else if (route.name === 'passwords') {
                        iconName = focused ? 'bars' : 'bars';
                    } else if (route.name === 'generate') {
                        iconName = focused ? 'key' : 'key';
                    }
                    return <AntDesign name={iconName} size={size} color={color} />;
                },
                headerShown: false
            })}
        >
            <Tab.Screen name="home" component={HomeScreen} />
            <Tab.Screen name="memo" component={MemoScreen} />
            <Tab.Screen name="passwords" component={PasswordListScreen} />
            <Tab.Screen name="generate" component={PwlsStackScreen} />
        </Tab.Navigator>
    )
}