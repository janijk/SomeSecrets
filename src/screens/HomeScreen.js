import { StyleSheet, View, Text, Button, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSignout, resetState } from '../redux/loaderSlice';
import { SafeAreaView } from 'react-native-safe-area-context';

export const HomeScreen = () => {
    const dispatch = useDispatch();

    const handleSignout = () => {
        dispatch(resetState());
    }

    return (
        <SafeAreaView style={styles.container}>
            <Pressable onPress={() => handleSignout()}
                style={({ pressed }) => [{ borderColor: pressed ? '#FF79C6' : "lightgrey" },
                styles.buttons]}>
                <Text style={styles.buttonText}>Signout</Text>
            </Pressable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textBlue: {
        color: "#79C0FF",
    },
    buttons: {
        marginBottom: 3,
        width: 100,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center"
    },
    buttonText: {
        color: "#79C0FF",
        fontWeight: "600"
    },
});