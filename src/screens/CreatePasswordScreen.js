import { StyleSheet, View, Text } from 'react-native';
import { generateNewPassword } from '../api/passwords';
import { RadioButtonGroup } from '../components/RadioButtonGroup';

export const CreatePasswordScreen = () => {

    const generatePassword = () => {
        generateNewPassword()
    }
    // CONTINUE HERE
    const handleClick = (indx) => {
       //data[indx] = 
    }     
    const data = [
        {uppers:"uppers"},
        {lowers:"lowers"},
        {specials:"specials"},
        {length:"length"},
    ]    
    
    return (
        <>
            <Text>this is CreatePasswordScreen</Text>
            <RadioButtonGroup data={data} onPress={handleClick(indx)}/>
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