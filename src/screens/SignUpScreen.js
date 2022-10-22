import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';
import { signup } from '../utils/user.utils'
import { useDispatch } from "react-redux";
import { setIsAuth, setUser } from "../redux/loaderSlice";
import { SafeAreaView } from 'react-native-safe-area-context';

export const SignUpScreen = ({ navigation }) => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordTwo, setPasswordTwo] = useState(null);
    const [signupMessage, setsignupMessage] = useState(null);
    const [valid, setValid] = useState(true);
    const dispatch = useDispatch();

    // Attempt to create account for user. On success set user as currently logged in user.
    const handleSignup = async () => {
        setsignupMessage(null);
        if (username && password && password === passwordTwo) {
            const result = await signup(username, password);
            if (result === username) {
                dispatch(setUser(username));
                dispatch(setIsAuth());
            } else {
                setsignupMessage(result);
            }
        } else setValid(false);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.textH}>Create Account</Text>
            <TextInput
                style={styles.textInputBlue}
                value={username}
                onChangeText={text => setUsername(text)}
                placeholder={valid ? "username" : "*required"}
                placeholderTextColor={valid ? "#cde3f7" : "red"}>
            </TextInput>
            <View style={[styles.itemSeprator, !valid && !password && { backgroundColor: "red" }]}></View>
            <TextInput
                style={styles.textInputBlue}
                value={password}
                onChangeText={text => setPassword(text)}
                placeholder={valid ? "password" : "*required"}
                placeholderTextColor={valid ? "#cde3f7" : "red"}>
            </TextInput>
            <View style={[styles.itemSeprator, !valid && !password && { backgroundColor: "red" }]}></View>
            <TextInput
                style={styles.textInputBlue}
                value={passwordTwo}
                onChangeText={text => setPasswordTwo(text)}
                placeholder={valid ? "retype password" : "*required"}
                placeholderTextColor={valid ? "#cde3f7" : "red"}>
            </TextInput>
            <View style={[styles.itemSeprator, !valid && !password && { backgroundColor: "red" }]}></View>
            <View style={styles.flexRow}>
                <Pressable onPress={() => navigation.goBack()}
                    style={({ pressed }) => [{ borderColor: pressed ? '#FF79C6' : "lightgrey" },
                    styles.buttons]}>
                    <Text style={styles.buttonText}>Back</Text>
                </Pressable>
                <Pressable onPress={() => handleSignup()}
                    style={({ pressed }) => [{ borderColor: pressed ? '#FF79C6' : "lightgrey" },
                    styles.buttons]}>
                    <Text style={styles.buttonText}>Create</Text>
                </Pressable>
            </View>
            {signupMessage === null ? null : <Text style={styles.errorMessage}>{signupMessage}</Text>}
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
        margin: 30,
        alignSelf: "center"
    },
    textInputBlue: {
        color: "#79C0FF",
        width: 200
    },
    buttons: {
        margin: 15,
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
        margin: 30,
    },
    errorMessage: {
        color: '#FF7B72',
    }
});