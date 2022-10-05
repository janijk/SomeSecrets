import { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';
import { signup } from '../utils/user.utils'
import { useDispatch } from "react-redux";
import { setIsAuth, setUser, setIsSignout, resetState } from "../redux/loaderSlice";


export const SignUpScreen = ({ navigation }) => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordTwo, setPasswordTwo] = useState(null);
    const [signupMessage, setsignupMessage] = useState(null);
    const dispatch = useDispatch();

    const handleSignup = async () => {
        setsignupMessage(null);
        if (password && password === passwordTwo) {
            const result = await signup(username, password);
            if (result === username) {
                dispatch(setUser(username));
                dispatch(setIsAuth());
            } else {
                setsignupMessage(result);
            }
        }
    }

    return (
        <>
            <Text>this is SignUpScreen</Text>
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
            <TextInput
                value={passwordTwo}
                onChangeText={text => setPasswordTwo(text)}
                placeholder="retype password">
            </TextInput>
            <Button
                onPress={() => handleSignup()}
                title="signup">
            </Button>
            <Button
                onPress={() => navigation.goBack()}
                title="back">
            </Button>
            {signupMessage === null ?
                null
                :
                <Text>{signupMessage}</Text>
            }
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