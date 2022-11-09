import { StyleSheet, TextInput, View, Pressable, Text, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setIsPin, setPincode } from '../redux/loaderSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckBox } from '../components/CheckBox';
import { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';

export const SettingsScreen = () => {
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState("")
    const [pin, setPin] = useState("")
    const [pin2, setPin2] = useState("")
    const isPinRedux = useSelector(state => state.loader.isPin);
    const pinTrue = useSelector(state => state.loader.pincode) ? true : false;
    const [isPin, setIsPinLocal] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsPinLocal(isPinRedux)
    }, []);

    const handleEnablePinClick = () => {
        if (isPinRedux == true) dispatch(setIsPin())
        setIsPinLocal(!isPin)
    }

    const handlePinSave = () => {
        if (pin && pin == pin2) {
            setLoading(true)
            setTimeout(() => {
                dispatch(setIsPin())
                dispatch(setPincode(pin))
                setPin("")
                setPin2("")
                setLoading(false)
            }, 500);
        } else {
            setMsg("pins don't match")
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.boxContainer}>
                <View style={styles.flexRow}>
                    <Text style={styles.textH}>Pincode</Text>
                    <CheckBox text={""} isSelected={isPin} onPress={() => handleEnablePinClick()} />
                </View>
                {!pinTrue ?
                    <>
                        <TextInput
                            style={[styles.pinInput, !isPin && { opacity: 0.3 }]}
                            secureTextEntry={!isPin ? false : true}
                            editable={isPin}
                            onChangeText={(text) => setPin(text)}
                            value={pin}
                            keyboardType="number-pad"
                            placeholder={!isPin ? "disabled" : "enter pin"}
                            placeholderTextColor={!isPin ? "lightgrey" : "#79C0FF"} />
                        <TextInput
                            style={[styles.pinInput, !isPin && { opacity: 0.3 }]}
                            secureTextEntry={!isPin ? false : true}
                            editable={isPin}
                            onChangeText={(text) => setPin2(text)}
                            value={pin2}
                            keyboardType="number-pad"
                            placeholder={!isPin ? "disabled" : "repeat pin"}
                            placeholderTextColor={!isPin ? "lightgrey" : "#79C0FF"} />
                        <View style={[styles.buttonsWrap, !isPin && { opacity: 0.3 }]}>
                            <Pressable
                                onPress={() => handlePinSave()}
                                disabled={!isPin}
                                style={[styles.buttons, !isPin && { opacity: 0.3 }]}
                                android_ripple={{ color: "#FF79C6", borderless: true }}
                            >
                                <View style={[styles.flexRow, { alignItems: "center", }]}>
                                    {!loading && <AntDesign style={{ marginRight: 5 }} name="checkcircleo" size={18} color="#cde3f7" />}
                                    <Text style={styles.textBlue}>
                                        {loading ? <ActivityIndicator size="small" color="#FF79C6" /> : ` Save   `}
                                    </Text>
                                </View>
                            </Pressable>
                        </View>
                    </>
                    :
                    <Text style={[styles.textBlue, { margin: 7 }]}>
                        {loading ? null : `Pincode is enabled`}
                    </Text>
                }
                {msg && pin && pin2 && pin != pin2 && <Text style={{ color: "#FF7B72" }}>{msg}</Text>}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: -20
    },
    boxContainer: {
        backgroundColor: "#282A36",
        flex: 0,
        margin: 5,
        padding: 5,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20
    },
    flexRow: {
        flexDirection: "row"
    },
    buttons: {
        margin: 10,
        width: 100,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        borderColor: "lightgrey",
    },
    buttonsWrap: {
        margin: 10,
        width: 100,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        backgroundColor: "#282A36"
    },
    pinInput: {
        color: "#FF7B72",
        width: 200,
        height: 40,
        fontSize: 15,
        margin: 10,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "lightgrey",
        textAlign: 'center'
    },
    textBlue: {
        color: "#79C0FF",
    },
    textH: {
        color: "#FF7B72",
        fontSize: 20,
        margin: 10,
        alignSelf: "center"
    },
});