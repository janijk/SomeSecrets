import { StyleSheet, View, Text } from 'react-native';

export const SplashScreen = () => {
    return (
        <>
            <Text>this is SplashScreen</Text>
            <Text>App is loading</Text>

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