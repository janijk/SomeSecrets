import { StyleSheet, View, Text } from 'react-native';
import { PasswordList } from '../components/PasswordList';


export const PasswordListScreen = () => {
    const data = [
        {
            provider: 'Google',
            username: 'First',
            password: 'bd7acbea-c1b1',
        },
        {
            provider: 'FB',
            username: 'yoloer',
            password: 'bd7acbea-c1b1',
        },
        {
            provider: 'Moodle',
            username: 'Wizard',
            password: 'bd7acbea-c1b1',
        },
        {
            provider: 'Google',
            username: 'First',
            password: 'bd7acbea-c1b1',
        },
        {
            provider: 'FB',
            username: 'yoloer',
            password: 'bd7acbea-c1b1',
        },
        {
            provider: 'Moodle',
            username: 'Wizard',
            password: 'bd7acbea-c1b1',
        },
    ];

    return (
        <>
            <Text>this is PasswordListScreen</Text>
            <View>
                <PasswordList data={data} />
            </View>
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