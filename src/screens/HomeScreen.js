import { StyleSheet, View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { setIsSignout, resetState } from '../redux/loaderSlice';

export const HomeScreen = () => {
    const dispatch = useDispatch();

    const handleSignout = () => {
        dispatch(resetState());
    }

    return (
        <>
            <Text>this is HomeScreen</Text>
            <Button
                onPress={() => handleSignout()}
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