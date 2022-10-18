import { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { generateNewPassword } from '../api/passwords';
import { RadioButtonGroup } from '../components/RadioButtonGroup';
import Slider from '@react-native-community/slider';
import { createCredentials, addNewCredential } from '../utils/user.utils';
import { useSelector, useDispatch } from 'react-redux';
import { reloadCredentials } from '../redux/loaderSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import Ionicons from '@expo/vector-icons/Ionicons';


export const CreatePasswordScreen = () => {
    const [length, setLength] = useState(12);
    const [provider, setProvider] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.loader.user);

    const copyToClipboard = async (string) => {
        await Clipboard.setStringAsync(string);
    };

    // Configurations for radio gutton group
    const options = [
        { name: "uppers", value: true },
        { name: "lowers", value: true },
        { name: "numbers", value: true },
        { name: "specials", value: true }
    ];

    // Call api to fetch generated password according to options
    const generatePassword = async () => {
        setLoading(true);
        const apiOptions = options.map((e) => { return JSON.parse(`{"${e.name}": ${e.value}}`) });
        apiOptions.push(JSON.parse(`{"len": ${length}}`))
        const obj = {};
        apiOptions.forEach(e => obj[Object.keys(e)] = Object.values(e).pop());
        setPassword(await generateNewPassword(obj));
        setLoading(false);
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
        }
    }

    const resetEntries = () => {
        setPassword(null);
        setUsername(null);
        setProvider(null);
        setTimeout(() => {
            setSaved(false);
        }, 1000);
    }

    // Radiobutton onclick -> change boolean of value
    const handleClick = (indx) => {
        options[indx].value = !options[indx].value;
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
                    style={({ pressed }) => [{ borderColor: pressed ? '#FF79C6' : "lightgrey" },
                    styles.buttons]}>
                    <Text style={styles.buttonText}>
                        {loading ? <ActivityIndicator size="small" color="#0000ff" /> : `Generate`}
                    </Text>
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
                            placeholder="provider name"
                            placeholderTextColor={"#cde3f7"}></TextInput>
                    </View>
                    <View style={styles.itemSeprator}></View>
                    <View style={styles.flexRow}>
                        <Text style={styles.textOrange}>{`Username:    `}</Text>
                        <TextInput
                            style={styles.textInputBlue}
                            value={username}
                            onChangeText={text => setUsername(text)}
                            placeholder="username"
                            placeholderTextColor={"#cde3f7"}></TextInput>
                    </View>
                    <View style={styles.itemSeprator}></View>
                    <View style={styles.flexRow}>
                        <Text style={styles.textOrange}>{`Password:     `}</Text>
                        <TextInput
                            style={styles.textInputBlue}
                            value={password}
                            onChangeText={text => setPassword(text)}
                            placeholder="password"
                            placeholderTextColor={"#cde3f7"}></TextInput>
                        <Pressable
                            onPress={() => { password ? copyToClipboard(password) : null }}
                            style={({ pressed }) => [{ backgroundColor: pressed ? 'rgb(210, 230, 255)' : null },
                            styles.iconPressable]}
                        >
                            <Ionicons name="md-copy-outline" size={25} color={password ? "#FFA657" : "transparent"} />
                        </Pressable>
                    </View>
                    <View style={styles.itemSeprator}></View>
                </View>

                <Pressable title='save' onPress={() => save()} disabled={saved}
                    style={({ pressed }) => [{ borderColor: pressed ? '#FF79C6' : saved ? 'green' : "lightgrey" },
                    styles.buttons]}>
                    {!saved ?
                        <Text style={styles.buttonText}>Save</Text>
                        :
                        <AntDesign name="checkcircleo" size={24} color="green" />
                    }
                </Pressable>
            </View>
            <View style={{ flex: 1 }}></View>
        </SafeAreaView>
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
    savedButtons: {
        width: 100,
        height: 40,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "black",
        backgroundColor: "lightgreen",
        justifyContent: "center"
    },
    buttons: {
        margin: 20,
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
    iconPressable: {
        marginLeft: 5,
        borderRadius: 5
    },
});