import { useState } from 'react';
import { Button, StyleSheet, View, Text, TextInput } from 'react-native';
import {login} from '../utils/user.utils'

export const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginMessage, setLoginMessage] = useState(null);

    const handleLogin = async () =>{
        const signin = await login(username, password);
        if(signin !== undefined) setLoginMessage(signin);
    }

    return (
        <>
            <Text>this is LoginScreen</Text>
            <TextInput value={username} onChangeText={setUsername(value)} placeholder="username"></TextInput>
            <TextInput value={password} onChangeText={setPassword(value)} placeholder="password"></TextInput>
            {loginMessage !== null?
                null
                :  
                <Text>{loginMessage}</Text>
            }
            <Button
                onPress={() => navigation.navigate('signup')}
                title="Sign up">
            </Button>
            <Button
                onPress={handleLogin}
                title="login">
            </Button>
        </>
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