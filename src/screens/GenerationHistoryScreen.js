import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { HistoryList } from '../components/HistoryList';
import { asyncStorageRead } from '../utils/storage.utils';

export const GenerationHistoryScreen = ({ navigation }) => {
    const [generationHistory, setGenerationHistory] = useState(null);
    const currentUser = useSelector(state => state.loader.user);

    // Update history list on mount & everytime changes are made
    useEffect(() => {
        let mounted = true;
        const getHistory = async () => {
            try {
                const history = await asyncStorageRead(currentUser + "History");
                if (mounted && history[0]) {
                    setGenerationHistory(history);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getHistory();
        return () => {
            mounted = false;
        }
    }, []);

    return (
        <View style={styles.container}>
            {generationHistory && <HistoryList data={generationHistory} />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 4,
        marginRight: 6,
    },
});