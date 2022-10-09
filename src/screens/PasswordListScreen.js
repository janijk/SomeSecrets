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
    // Handles PasswordListItem Pressable onLongPress. indx param is the index of
    // specific credential object in credential array.
    const handleLongPress = (indx) => {
        // User actions on specific credential entry edit/delete 
        console.log(indx);
    }
    // Sort credential to ascending order by provider name
    (sortAscending = () => {
        data.sort((a, b) => {
            let fa = a.provider.toLowerCase(),
                fb = b.provider.toLowerCase();
            if (fa < fb) return -1;
            if (fa > fb) return 1;
            return 0;
        });
    })();
    return (
        <>
            <Text>this is PasswordListScreen</Text>
            <View>
                <PasswordList data={data} longPress={(indx) => handleLongPress(indx)} />
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