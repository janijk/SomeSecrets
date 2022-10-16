import { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, Pressable } from 'react-native';
import { generateNewPassword } from '../api/passwords';
import { RadioButtonGroup } from '../components/RadioButtonGroup';
import Slider from '@react-native-community/slider';
import { createCredentials, addNewCredential } from '../utils/user.utils';
import { useSelector, useDispatch } from 'react-redux';
import { reloadCredentials } from '../redux/loaderSlice';
import { SafeAreaView } from 'react-native-safe-area-context';

export const CreatePasswordScreen = () => {
    const [length, setLength] = useState(12);
    const [provider, setProvider] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [saved, setSaved] = useState(false);
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.loader.user);

    // Configurations for radio gutton group
    const options = [
        { name: "uppers", value: true },
        { name: "lowers", value: true },
        { name: "numbers", value: true },
        { name: "specials", value: true }
    ];

    // Call api to fetch generated password according to options
    const generatePassword = async () => {
        const apiOptions = options.map((e) => { return JSON.parse(`{"${e.name}": ${e.value}}`) });
        apiOptions.push(JSON.parse(`{"len": ${length}}`))
        const obj = {};
        apiOptions.forEach(e => obj[Object.keys(e)] = Object.values(e).pop());
        setPassword(await generateNewPassword(obj));
        setSaved(false);
    }

    // Save new credential
    const save = async () => {
        if (provider && username && password) {
            const creds = createCredentials(provider, username, password);
            const result = await addNewCredential(creds, currentUser);
            if (result === undefined) {
                dispatch(reloadCredentials())
                resetEntries()
                setSaved(true);
            }
        }
    }

    const resetEntries = () => {
        setPassword(null);
        setUsername(null);
        setProvider(null);
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
                        style={{ width: 250, height: 40 }}
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
                <Pressable onPress={() => generatePassword()}
                    style={({ pressed }) => [{ borderColor: pressed ? '#FF79C6' : "lightgrey" },
                    styles.buttons]}>
                    <Text style={styles.buttonText}>Generate</Text>
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
                            placeholder="provider"
                            placeholderTextColor={"#79C0FF"}></TextInput>
                    </View>
                    <View style={styles.flexRow}>
                        <Text style={styles.textOrange}>{`Username:    `}</Text>
                        <TextInput
                            style={styles.textInputBlue}
                            value={username}
                            onChangeText={text => setUsername(text)}
                            placeholder="username"
                            placeholderTextColor={"#79C0FF"}></TextInput>
                    </View>
                    <View style={styles.flexRow}>
                        <Text style={styles.textOrange}>{`Password:     `}</Text>
                        <TextInput
                            style={styles.textInputBlue}
                            value={password}
                            onChangeText={text => setPassword(text)}
                            placeholder="password"
                            placeholderTextColor={"#79C0FF"}></TextInput>
                    </View>
                </View>
                {!saved ?
                    <Pressable title='save' onPress={() => save()} disabled={saved}
                        style={({ pressed }) => [{ borderColor: pressed ? '#FF79C6' : "lightgrey" },
                        styles.buttons]}>
                        <Text style={styles.buttonText}>Save</Text>
                    </Pressable>
                    :
                    <Text>Saved</Text>
                }
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
        borderRadius: 20
    },
    slider: {
        flexDirection: "row",
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
    textH: {
        color: "#FF7B72",
        fontSize: 20,
        margin: 10,
        alignSelf: "center"
    },
    textBlue: {
        color: "#79C0FF",
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
    }
});