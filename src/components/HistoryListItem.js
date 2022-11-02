import { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Clipboard from 'expo-clipboard';

export const HistoryListItem = ({ item }) => {
    const [copiedPass, setCopiedPass] = useState(false);

    // Copy password to clipboard and set indicator text visible for 1 sec
    const copyToClipboard = async (string) => {
        await Clipboard.setStringAsync(string);
        setCopiedPass(true)
        setTimeout(() => {
            setCopiedPass(false);
        }, 1000);
    };

    return (
        <View style={styles.boxContainer}>
            <View style={styles.flexRow}>
                <View style={styles.genOn}>
                    <Text style={styles.textDateTime}>{`Generated on ${item.date.slice(5)}, ${item.time}`}</Text>
                    <Text style={styles.textBlue}>{item.password}</Text>
                </View>
                <Pressable
                    onPress={() => copyToClipboard(item.password)}
                    style={({ pressed }) => pressed ? styles.iconPressablePressed : styles.iconPressable}
                >
                    {copiedPass && <Text style={styles.copyTxt}>Copied</Text>}
                    <Ionicons name="md-copy-outline" size={25} color="#FFA657" />
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    boxContainer: {
        backgroundColor: "#282A36",
        flex: 1,
        margin: 6,
        padding: 6,
        borderRadius: 20
    },
    textBlue: {
        color: "#79C0FF",
        fontSize: 16,
        margin: 3,
    },
    textDateTime: {
        color: "#cde3f7",
        fontSize: 12,
        opacity: 0.7,
        margin: 3,
    },
    copyTxt: {
        position: "absolute",
        width: 50,
        top: 1,
        right: 30,
        color: "#cde3f7"
    },
    iconPressable: {
        borderRadius: 5
    },
    iconPressablePressed: {
        backgroundColor: "rgb(210, 230, 255)",
        borderRadius: 5,
    },
    flexRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end"
    },
    genOn: {
        margin: 2
    }
})