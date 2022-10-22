import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSignout, resetState } from '../redux/loaderSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export const HomeScreen = () => {
    const dispatch = useDispatch();

    const handleSignout = () => {
        dispatch(resetState());
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainers}>
                <Image style={styles.homeImage} source={require("../../assets/lock.png")}></Image>
            </View>
            <View style={styles.innerContainers}>
                <Pressable onPress={() => handleSignout()}
                    style={({ pressed }) => [{ borderColor: pressed ? '#FF79C6' : "lightgrey" },
                    styles.buttons]}>
                    <Text style={styles.buttonText}>LogOut</Text>
                </Pressable>
            </View>
            <StatusBar style="light" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    homeImage: {
        width: 300,
        height: 300,
        borderRadius: 150,
        opacity: 0.8,
    },
    textBlue: {
        color: "#79C0FF",
    },
    innerContainers: {
        flex: 1,
        justifyContent: "center"
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