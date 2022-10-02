import { StyleSheet, View, Text, Button } from 'react-native';

export const SignUpScreen = ({ navigation }) => {
    return (
        <>
            <Text>this is SignUpScreen</Text>
            <Button
                onPress={() => navigation.goBack()}
                title="back">
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