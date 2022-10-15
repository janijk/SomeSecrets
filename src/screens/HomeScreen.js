import { useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../redux/credentialsSlice';
import { setIsSignout, resetState } from '../redux/loaderSlice';
import { storageRead } from '../utils/storage.utils';

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