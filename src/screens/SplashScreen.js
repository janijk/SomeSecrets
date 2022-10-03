import { StyleSheet, View, Text } from 'react-native';

export const SplashScreen = () => {
    return (
        <>
            <Text>this is SplashScreen</Text>
            <p>App is loading</p>

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