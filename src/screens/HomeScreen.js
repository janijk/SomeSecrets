import { StyleSheet, View, Text } from 'react-native';
import { signout } from '../utils/user.utils';

export const HomeScreen = () => {
    const handleSignout = () => {
        signout();
    }

    return (
        <>
            <Text>this is HomeScreen</Text>
            <Button
                onPress={handleSignout}
                title="signout">
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