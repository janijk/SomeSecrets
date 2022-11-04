import { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { storageRead } from '../utils/storage.utils';
import { saveNotes } from "../utils/user.utils";

export const MemoScreen = () => {
    const [text, setText] = useState(null)
    const currentUser = useSelector(state => state.loader.user);

    // Update history list on mount & everytime changes are made
    useEffect(() => {
        let mounted = true;
        const getNotes = async () => {
            try {
                const notes = await storageRead(currentUser + "Notes");
                if (mounted) {
                    setText(notes);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getNotes();
        return () => {
            mounted = false;
        }
    }, []);

    const textInputOnBlur = async () => {
        await saveNotes(text, currentUser)
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.boxContainer}>
                <Text style={styles.textH}>Notes</Text>
                <TextInput
                    multiline
                    numberOfLines={10}
                    style={styles.textInputBlue}
                    onChangeText={text => setText(text)}
                    value={text}
                    onBlur={() => textInputOnBlur()}
                    placeholder="Start writing ..."
                    placeholderTextColor="#cde3f7"
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    boxContainer: {
        backgroundColor: "#282A36",
        flex: 0,
        margin: 5,
        padding: 15,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20
    },
    textH: {
        color: "#FF7B72",
        fontSize: 20,
        marginTop: 5,
        marginBottom: 10,
        alignSelf: "center"
    },
    textInputBlue: {
        color: "#79C0FF",
        width: 350,
        fontSize: 16,
        textAlignVertical: "top",
    },
});