import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuth, setUser } from '../redux/loaderSlice';
import { login } from '../utils/user.utils'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../components/CustomButton';

export const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginMessage, setLoginMessage] = useState(null);
    const [forgotten, setForgotten] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.loader.remember);

    // Set username to last logged in user
    useEffect(() => {
        setUsername(user);
    }, [user])

    // Attempt to log user in
    const handleLogin = async () => {
        const [error, isSuccess] = await login(username, password);
        if (error) setLoginMessage(error);
        if (isSuccess === true) {
            dispatch(setIsAuth());
            dispatch(setUser(username));
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.textH}>Login</Text>
            <TextInput
                style={styles.textInputBlue}
                value={username}
                onChangeText={text => setUsername(text)}
                placeholder="username"
                placeholderTextColor={"#cde3f7"}>

            </TextInput>
            <View style={[styles.itemSeprator, loginMessage && !username && { backgroundColor: "red" }]}></View>
            <TextInput
                style={styles.textInputBlue}
                value={password}
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                placeholder="password"
                placeholderTextColor={"#cde3f7"}>
            </TextInput>
            <View style={[styles.itemSeprator, loginMessage && !password && { backgroundColor: "red" }]}></View>
            <View style={[styles.flexRow, { marginTop: 30 }]}>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        value={`  Sign up `}
                        iconSet={"AntDesign"}
                        iconName={"adduser"}
                        iconSize={18}
                        press={() => navigation.navigate('Sign up')}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        value={`  Login `}
                        iconSet={"AntDesign"}
                        iconName={"login"}
                        iconSize={18}
                        press={() => handleLogin()}
                    />
                </View>
            </View>
            {loginMessage && <Text style={styles.errorMessage}>{loginMessage}</Text>}
            <Pressable
                onPress={() => setForgotten(!forgotten)}
                style={styles.forgottenPressable}
            >
                <Text style={styles.forgottenTxt}>{!forgotten ? `Forgot password? click here ` : `Tough Luck `}</Text>
                {!forgotten ? <AntDesign name="Safety" size={24} color="#FF79C6" /> : <Ionicons name="md-skull-sharp" size={24} color="#cde3f7" />}
            </Pressable>
            <StatusBar style="light" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center"
    },
    forgottenPressable: {
        position: "absolute",
        bottom: 12,
        opacity: 0.7,
        flexDirection: "row"
    },
    forgottenTxt: {
        color: "#79C0FF"
    },
    buttonContainer: {
        margin: 6
    },
    textH: {
        color: "#FF7B72",
        fontSize: 20,
        margin: 30,
        alignSelf: "center"
    },
    textInputBlue: {
        color: "#79C0FF",
        width: 200
    },
    itemSeprator: {
        height: 1,
        marginBottom: 5,
        marginRight: 15,
        width: 200,
        alignSelf: "center",
        backgroundColor: "#FFA657",
        opacity: 0.4
    },
    flexRow: {
        flexDirection: "row",
    },
    errorMessage: {
        position: "absolute",
        bottom: 300,
        color: '#FF7B72',
    }
});