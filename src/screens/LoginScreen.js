import { useState } from 'react';
import { Button, StyleSheet, View, Text, TextInput, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { setIsAuth, setUser } from '../redux/loaderSlice';
import { login } from '../utils/user.utils'
import { SafeAreaView } from 'react-native-safe-area-context';

export const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginMessage, setLoginMessage] = useState(null);
    const dispatch = useDispatch();

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
            <Text style={styles.textH}>this is LoginScreen</Text>
            <TextInput
                style={styles.textInputBlue}
                value={username}
                onChangeText={text => setUsername(text)}
                placeholder="username"
                placeholderTextColor={"#cde3f7"}> { /* COPY STUFF FROM CREATE PASSWORD SCREEN */}
            </TextInput>
            <TextInput
                style={styles.textInputBlue}
                value={password}
                onChangeText={text => setPassword(text)}
                placeholder="password"
                placeholderTextColor={"#cde3f7"}>
            </TextInput>
            <Pressable onPress={() => navigation.navigate('signup')}
                style={({ pressed }) => [{ borderColor: pressed ? '#FF79C6' : "lightgrey" },
                styles.buttons]}>
                <Text style={styles.buttonText}>Sign up</Text>
            </Pressable>
            <Pressable onPress={() => handleLogin()}
                style={({ pressed }) => [{ borderColor: pressed ? '#FF79C6' : "lightgrey" },
                styles.buttons]}>
                <Text style={styles.buttonText}>login</Text>
            </Pressable>
            {loginMessage === null ?
                null
                :
                <Text>{loginMessage}</Text>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textH: {
        color: "#FF7B72",
        fontSize: 20,
        margin: 10,
        alignSelf: "center"
    },
    textBlue: {
        color: "#79C0FF",
    },
    textInputBlue: {
        color: "#79C0FF",
        width: 200
    },
    buttons: {
        marginBottom: 3,
        width: 100,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center"
    },
    buttonText: {
        color: "#79C0FF",
        fontWeight: "600"
    },
});