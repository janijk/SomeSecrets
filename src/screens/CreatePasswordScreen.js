import { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, Pressable } from 'react-native';
import { generateNewPassword } from '../api/passwords';
import { RadioButtonGroup } from '../components/RadioButtonGroup';
import Slider from '@react-native-community/slider';
import { createCredentials, addNewCredential } from '../utils/user.utils';
import { useSelector, useDispatch } from 'react-redux';
import { reloadCredentials } from '../redux/loaderSlice';

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
        <>
            <Text>this is CreatePasswordScreen</Text>
            <RadioButtonGroup options={options} onPress={(indx) => handleClick(indx)} />
            <View style={styles.slider}>
                <Text>length: {length}</Text>
                <Slider
                    style={{ width: 250, height: 40 }}
                    minimumValue={1}
                    maximumValue={30}
                    step={1}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    thumbTintColor='#2675bd'
                    value={length}
                    onValueChange={(sliderValue) => setLength(sliderValue)}
                />
            </View>
            <Button
                onPress={() => generatePassword()}
                title="generate">
            </Button>
            {password ?
                <>
                    <TextInput
                        value={provider}
                        onChangeText={text => setProvider(text)}
                        placeholder="provider"></TextInput>
                    <TextInput
                        value={username}
                        onChangeText={text => setUsername(text)}
                        placeholder="username"></TextInput>
                    <TextInput
                        value={password}
                        onChangeText={text => setPassword(text)}
                        placeholder="password"></TextInput>
                    {!saved ?
                        <Pressable title='save' onPress={() => save()} disabled={saved}
                            style={!saved ? styles.buttons : styles.savedButtons}>
                            <Text style={styles.text}>save</Text>
                        </Pressable>
                        :
                        <Text>Saved</Text>
                    }
                </>
                :
                null
            }
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
    slider: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttons: {
        width: 100,
        height: 40,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "black",
        backgroundColor: "lightblue",
        justifyContent: "center"

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
    text: {
        margin: 5,
        color: "black",
        alignItems: "center",
        alignSelf: "center"
    }
});