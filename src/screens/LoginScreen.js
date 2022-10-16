import { useState } from 'react';
import { Button, StyleSheet, View, Text, TextInput } from 'react-native';
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
        <SafeAreaView>
            <Text>this is LoginScreen</Text>
            <TextInput
                value={username}
                onChangeText={text => setUsername(text)}
                placeholder="username">
            </TextInput>
            <TextInput
                value={password}
                onChangeText={text => setPassword(text)}
                placeholder="password">
            </TextInput>
            <Button
                onPress={() => navigation.navigate('signup')}
                title="Sign up">
            </Button>
            <Button
                onPress={() => handleLogin()}
                title="login">
            </Button>
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});