import { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { generateNewPassword } from '../api/passwords';
import { RadioButtonGroup } from '../components/RadioButtonGroup';

export const CreatePasswordScreen = () => {
    const [length, setLength] = useState(12);
    const options = [
        { name: "uppers", value: true },
        { name: "lowers", value: true },
        { name: "specials", value: true }
    ];

    // Call api to fetch generated password according to options
    const generatePassword = () => {
        let apiOptions = options.map((e) => { return `${e.name}: ${e.value}` })
        apiOptions.push(`passLength: ${length}`)
        console.log({ ...apiOptions });
        //generateNewPassword(apiOptions)
    }

    // Radiobutton onclick change boolean name of value
    const handleClick = (indx) => {
        options[indx].value = !options[indx].value;
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