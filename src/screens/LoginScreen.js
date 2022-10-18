import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';
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
            <Text style={styles.textH}>Login</Text>
            <TextInput
                style={styles.textInputBlue}
                value={username}
                onChangeText={text => setUsername(text)}
                placeholder="username"
                placeholderTextColor={"#cde3f7"}>
            </TextInput>
            <View style={styles.itemSeprator}></View>
            <TextInput
                style={styles.textInputBlue}
                value={password}
                onChangeText={text => setPassword(text)}
                placeholder="password"
                placeholderTextColor={"#cde3f7"}>
            </TextInput>
            <View style={styles.itemSeprator}></View>
            <View style={styles.flexRow}>
                <Pressable onPress={() => navigation.navigate('signup')}
                    style={({ pressed }) => [{ borderColor: pressed ? '#FF79C6' : "lightgrey" },
                    styles.buttons]}>
                    <Text style={styles.buttonText}>SignUp</Text>
                </Pressable>
                <Pressable onPress={() => handleLogin()}
                    style={({ pressed }) => [{ borderColor: pressed ? '#FF79C6' : "lightgrey" },
                    styles.buttons]}>
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>
            </View>
            {loginMessage === null ?
                null
                :
                <Text style={styles.errorMessage}>{loginMessage}</Text>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center"
    },
    textH: {
        color: "#FF7B72",
        fontSize: 20,
        margin: 30,
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