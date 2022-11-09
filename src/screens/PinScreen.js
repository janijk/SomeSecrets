import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useSelector, useDispatch } from 'react-redux';
import { setPinCorrect } from '../redux/loaderSlice';
import { encryption } from '../utils/encryption.utils';
import { NumPad } from '../components/NumPad';

export const PinScreen = () => {
    const [pin, setPin] = useState("")
    const dispatch = useDispatch();
    const currentPincode = useSelector(state => state.loader.pincode);

    // Check if pincode is correct
    const checkPin = async (pinCode) => {
        const check = await encryption(pinCode)
        if (check === currentPincode) dispatch(setPinCorrect())
        else setPin("")
    }

    const handleClick = (value) => {
        let temp = pin;
        if (value == -1) pin == '' ? null : setPin(temp.slice(0, -1))
        else if (value == -2) checkPin(pin)
        else setPin(temp += value)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <TextInput style={styles.textH} secureTextEntry={true} editable={false} value={pin}></TextInput>
            </View>
            <View style={styles.numPadContainer}>
                <NumPad press={(value) => handleClick(value)} />
            </View>
            <StatusBar style="light" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#212121"
    },
    numPadContainer: {
        width: 275
    },
    textH: {
        color: "#FF7B72",
        width: 250,
        fontSize: 25,
        margin: 30,
        alignSelf: "center",
        textAlign: "center",
        letterSpacing: 5
    },
});