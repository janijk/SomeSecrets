import { StyleSheet, View, Text, Button } from 'react-native';
import { generateNewPassword } from '../api/passwords';
import { RadioButtonGroup } from '../components/RadioButtonGroup';

export const CreatePasswordScreen = () => {

    const generatePassword = () => {
        generateNewPassword()
    }

    const handleClick = (indx) => {
        //console.log(data[indx].value);
    }

    const data = [
        { value: "uppers" },
        { value: "lowers" },
        { value: "specials" },
        { value: "length" },
    ];

    return (
        <>
            <Text>this is CreatePasswordScreen</Text>
            <RadioButtonGroup data={data} onPress={(indx) => handleClick(indx)} />
            <Button
                onPress={generatePassword}
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