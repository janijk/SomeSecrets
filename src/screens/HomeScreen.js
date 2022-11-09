import { StyleSheet, View, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { resetState } from '../redux/loaderSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { CustomButton } from '../components/CustomButton';

export const HomeScreen = ({ navigation }) => {
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
                <View style={styles.buttonsContainer}>
                    <CustomButton
                        value={`  Logout `}
                        iconSet={"AntDesign"}
                        iconName={"logout"}
                        iconSize={18}
                        press={() => handleSignout()}
                    />
                    <CustomButton
                        value={`  Settings`}
                        iconSet={"AntDesign"}
                        iconName={"setting"}
                        iconSize={18}
                        press={() => navigation.navigate('settings')}
                    />
                </View>
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
        justifyContent: "center",
    },
    buttonsContainer: {
        height: 100,
        justifyContent: "space-between",
    },
});