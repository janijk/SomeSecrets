import { Button, StyleSheet, View, Text } from 'react-native';

export const LoginScreen = ({ navigation }) => {
    return (
        <>
            <Text>this is LoginScreen</Text>
            <Button
                onPress={() => navigation.navigate('signup')}
                title="Sign up">
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