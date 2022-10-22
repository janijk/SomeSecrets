import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PasswordListScreen } from "../screens/PasswordListScreen"
import { CreatePasswordScreen } from "../screens/CreatePasswordScreen"
import { HomeScreen } from "../screens/HomeScreen"
import { AntDesign } from '@expo/vector-icons';

export const HomeTabs = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'home') {
                        iconName = focused ? 'home' : 'home';
                    } else if (route.name === 'list') {
                        iconName = focused ? 'bars' : 'bars';
                    } else if (route.name === 'create') {
                        iconName = focused ? 'key' : 'key';
                    }
                    return <AntDesign name={iconName} size={size} color={color} />;
                },
                headerShown: false
            })}
        >
            <Tab.Screen name="home" component={HomeScreen} />
            <Tab.Screen name="list" component={PasswordListScreen} />
            <Tab.Screen name="create" component={CreatePasswordScreen} />
        </Tab.Navigator>
    )
}