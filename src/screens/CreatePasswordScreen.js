import { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { generateNewPassword } from '../api/passwords';
import { RadioButtonGroup } from '../components/RadioButtonGroup';

export const CreatePasswordScreen = () => {
    const [length, setLength] = useState(12);
    const [password, setPassword] = useState(null);
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

    }

    // Radiobutton onclick change boolean name of value
    const handleClick = (indx) => {
        options[indx].value = !options[indx].value;
        console.log(password);
    }

    return (
        <>
            <Text>this is CreatePasswordScreen</Text>
            <RadioButtonGroup options={options} onPress={(indx) => handleClick(indx)} />
            <Button
                onPress={() => generatePassword()}
                title="generate">
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