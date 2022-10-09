import { useState } from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Clipboard from 'expo-clipboard';

/**
 * Flatlist item component for credentials. Expands on click to show username and password
 * as well as other options.
 * @param {*} props credential object
 * @returns 
 */
export const PasswordListItem = ({ props, longPress }) => {
    const [expanded, setExpanded] = useState(false);

    const copyToClipboard = async (string) => {
        await Clipboard.setStringAsync(string);
    };

    return (
        <View>
            <View style={styles.itemViewHeader}>
                <Pressable
                    onLongPress={longPress}
                    onPress={() => setExpanded(!expanded)}
                    style={({ pressed }) => [
                        { backgroundColor: pressed ? 'rgb(210, 230, 255)' : null },
                        styles.listItemPressable]
                    }
                >
                    <Text style={styles.listItemProvider}>{props.provider}</Text>
                    <Ionicons name={!expanded ? "md-chevron-down" : "md-chevron-up"} size={32} color="black" />
                </Pressable>
            </View>
            {expanded ?
                <>
                    <View style={styles.itemView}>
                        <Text style={styles.listItemText}>{`Username:   ${props.username}`}</Text>
                        <Pressable
                            onPress={() => copyToClipboard(props.username)}
                            style={({ pressed }) => [{ backgroundColor: pressed ? 'rgb(210, 230, 255)' : null },
                            styles.iconPressable]}
                        >
                            <Ionicons name="md-copy-outline" size={25} color="green" />
                        </Pressable>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.listItemText}>{`Password:    ${props.password}`}</Text>
                        <Pressable
                            onPress={() => copyToClipboard(props.password)}
                            style={({ pressed }) => [{ backgroundColor: pressed ? 'rgb(210, 230, 255)' : null },
                            styles.iconPressable]}
                        >
                            <Ionicons name="md-copy-outline" size={25} color="green" />
                        </Pressable>
                    </View>
                </>
                : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    listItemProvider: {
        fontWeight: "bold",
        fontSize: 20,
    },
    listItemText: {
        fontSize: 15,
    },
    itemView: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "whitesmoke"
    },
    itemViewHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    listItemPressable: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    iconPressable: {
        borderRadius: 5
    },
})