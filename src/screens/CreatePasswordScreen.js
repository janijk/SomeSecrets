import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createCredentials, addNewCredential, addEntryToHistory } from '../utils/user.utils';
import { randomGenerator } from '../utils/randomGenerator.utils';
import { timeStamp } from '../utils/time.utils';
import { RadioButtonGroup } from '../components/RadioButtonGroup';
import Slider from '@react-native-community/slider';
import { reloadCredentials } from '../redux/loaderSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import * as Clipboard from 'expo-clipboard';
import { CustomButton } from '../components/CustomButton';

export const CreatePasswordScreen = ({ navigation }) => {
    const [length, setLength] = useState(12);
    const [provider, setProvider] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);
    const [valid, setValid] = useState(true);
    const [copiedPass, setCopiedPass] = useState(false);
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.loader.user);
    const options = [// Configurations for radio gutton group
        { name: "uppers", value: true },
        { name: "lowers", value: true },
        { name: "numbers", value: true },
        { name: "specials", value: true }
    ];

    // Radiobutton onclick -> change boolean of value
    const handleClick = (indx) => {
        options[indx].value = !options[indx].value;
    }

    // Copy password to clipboard, save it to history and set indicator text visible for 1 sec
    const copyToClipboard = async (string) => {
        setCopiedPass(true)
        const generated = timeStamp();
        generated.password = string;
        await addEntryToHistory(generated, currentUser);
        await Clipboard.setStringAsync(string);
        setTimeout(() => {
            setCopiedPass(false);
        }, 1000);
    };

    // Generate random password according to options
    const generatePassword = () => {
        setLoading(true);
        const apiOptions = options.map(e => { return JSON.parse(`{"${e.name}": ${e.value}}`) });
        apiOptions.push(JSON.parse(`{"len": ${length}}`))
        const obj = {};
        apiOptions.forEach(e => obj[Object.keys(e)] = Object.values(e).pop());
        setTimeout(() => {
            setPassword(randomGenerator(obj));
            setLoading(false);
        }, 500);
    }

    // Save new credential
    const save = async () => {
        if (provider && username && password) {
            const creds = createCredentials(provider, username, password);
            const result = await addNewCredential(creds, currentUser);
            if (result === undefined) {
                dispatch(reloadCredentials());
                setSaved(true);
                resetEntries();
            }
        } else setValid(false);
    }

    // Set everything back to default after password is saved
    const resetEntries = () => {
        setPassword(null);
        setUsername(null);
        setProvider(null);
        setValid(true);
        setTimeout(() => {
            setSaved(false);
        }, 1000);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.boxContainer}>
                <Text style={styles.textH}>Generate</Text>
                <RadioButtonGroup options={options} onPress={(indx) => handleClick(indx)} />
                <View style={styles.slider}>
                    <Text style={styles.textBlue}>length: {length}</Text>
                    <Slider
                        style={{ width: 270, height: 40 }}
                        minimumValue={1}
                        maximumValue={30}
                        step={1}
                        minimumTrackTintColor="#FF7B72"
                        maximumTrackTintColor="#FFA657"
                        thumbTintColor='#2675bd'
                        value={length}
                        onValueChange={(sliderValue) => setLength(sliderValue)}
                    />
                </View>
                <Pressable disabled={loading}
                    onPress={() => generatePassword()}
                    style={({ pressed }) => [{ borderColor: pressed ? '#FF79C6' : "lightgrey" }, styles.buttons]}>
                    <View style={[styles.flexRow, { alignItems: "center" }]}>
                        {!loading && <MaterialIcons style={{ marginRight: 1 }} name="autorenew" size={19} color="#cde3f7" />}
                        <Text style={styles.buttonText}>
                            {loading ? <ActivityIndicator size="small" color="#FF79C6" /> : `Generate `}
                        </Text>
                    </View>
                </Pressable>
            </View>
            <View style={styles.boxContainer}>
                <Text style={styles.textH}>Edit</Text>
                <View>
                    <View style={styles.flexRow}>
                        <Text style={styles.textOrange}>{`Provider:       `}</Text>
                        <TextInput
                            style={styles.textInputBlue}
                            value={provider}
                            onChangeText={text => setProvider(text)}
                            placeholder={valid ? "provider name" : "*required"}
                            placeholderTextColor={valid ? "#cde3f7" : "red"}>
                        </TextInput>
                    </View>
                    <View style={[styles.itemSeprator, !valid && !provider && { backgroundColor: "red" }]}></View>
                    <View style={styles.flexRow}>
                        <Text style={styles.textOrange}>{`Username:    `}</Text>
                        <TextInput
                            style={styles.textInputBlue}
                            value={username}
                            onChangeText={text => setUsername(text)}
                            placeholder={valid ? "username" : "*required"}
                            placeholderTextColor={valid ? "#cde3f7" : "red"}>
                        </TextInput>
                    </View>
                    <View style={[styles.itemSeprator, !valid && !username && { backgroundColor: "red" }]}></View>
                    <View style={styles.flexRow}>
                        <Text style={styles.textOrange}>{`Password:     `}</Text>
                        <TextInput
                            style={styles.textInputBlue}
                            value={password}
                            onChangeText={text => setPassword(text)}
                            placeholder={valid ? "password" : "*required"}
                            placeholderTextColor={valid ? "#cde3f7" : "red"}>
                        </TextInput>
                        <Pressable
                            onPress={() => { password ? copyToClipboard(password) : null }}
                            android_ripple={{ color: "#FF79C6", borderless: true }}
                        >
                            {copiedPass && <Text style={styles.copyTxt}>Copied</Text>}
                            <Ionicons name="md-copy-outline" size={25} color={password ? "#FFA657" : "transparent"} />
                        </Pressable>
                    </View>
                    <View style={[styles.itemSeprator, !valid && !password && { backgroundColor: "red" }]}></View>
                </View>
                <Pressable onPress={() => save()} disabled={saved}
                    style={({ pressed }) => [{ borderColor: pressed ? '#FF79C6' : saved ? 'green' : "lightgrey" },
                    styles.buttons]}>
                    <View style={[styles.flexRow, { alignItems: "center" }]}>
                        {!saved && <AntDesign style={{ marginRight: 5 }} name="checkcircleo" size={18} color="#cde3f7" />}
                        {!saved ? <Text style={styles.buttonText}>{` Save   `}</Text> : <AntDesign name="checkcircleo" size={24} color="green" />}
                    </View>
                </Pressable>
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ marginTop: 30 }}>
                    <CustomButton
                        value={` History `}
                        iconSet={"MaterialIcons"}
                        iconName={"history"}
                        iconSize={22}
                        press={() => navigation.navigate('history')}
                    />
                </View>
            </View>
            <StatusBar style="light" />
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    boxContainer: {
        backgroundColor: "#282A36",
        flex: 1,
        margin: 5,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20
    },
    slider: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttons: {
        marginTop: 25,
        marginBottom: 15,
        width: 100,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center"
    },
    buttonText: {
        color: "#79C0FF",
        fontWeight: "600"
    },
    textH: {
        color: "#FF7B72",
        fontSize: 20,
        margin: 10,
        alignSelf: "center"
    },
    textBlue: {
        color: "#79C0FF",
        marginTop: 10
    },
    textInputBlue: {
        color: "#79C0FF",
        width: 200
    },
    textOrange: {
        fontSize: 15,
        color: "#FFA657",
        alignSelf: "center"
    },
    flexRow: {
        flexDirection: "row"
    },
    itemSeprator: {
        height: 1,
        marginBottom: 5,
        marginRight: 15,
        width: 280,
        alignSelf: "center",
        backgroundColor: "#FFA657",
        opacity: 0.4
    },
    copyTxt: {
        position: "absolute",
        width: 50,
        top: 29,
        right: 22,
        color: "#cde3f7"
    }
});