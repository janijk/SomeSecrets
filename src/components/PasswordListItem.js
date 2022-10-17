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
        <View style={styles.container}>
            <View style={styles.itemViewHeader}>
                <Pressable
                    onLongPress={longPress}
                    onPress={() => setExpanded(!expanded)}
                    style={({ pressed }) => pressed ? styles.listItemPressablePressed : styles.listItemPressable}
                >
                    <Text style={styles.listItemProvider}>{props.provider}</Text>
                    <Ionicons name={!expanded ? "md-chevron-down" : "md-chevron-up"} size={32} color="#FFA657" />
                </Pressable>
            </View>
            {expanded ?
                <>
                    <View style={styles.itemView}>
                        <View style={styles.flexRow}>
                            <Text style={styles.listItemTextOne}>Username:</Text>
                            <Text style={styles.listItemText}>{`   ${props.username}`}</Text>
                        </View>
                        <Pressable
                            onPress={() => copyToClipboard(props.username)}
                            style={({ pressed }) => pressed ? styles.iconPressablePressed : styles.iconPressable}
                        >
                            <Ionicons name="md-copy-outline" size={25} color="#FFA657" />
                        </Pressable>
                    </View>
                    <View style={styles.itemView}>
                        <View style={styles.flexRow}>
                            <Text style={styles.listItemTextOne}>Password:</Text>
                            <Text style={styles.listItemText}>{`    ${props.password}`}</Text>
                        </View>
                        <Pressable
                            onPress={() => copyToClipboard(props.password)}
                            style={({ pressed }) => pressed ? styles.iconPressablePressed : styles.iconPressable}
                        >
                            <Ionicons name="md-copy-outline" size={25} color="#FFA657" />
                        </Pressable>
                    </View>
                </>
                : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 1
    },
    listItemProvider: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#FF7B72"
    },
    listItemTextOne: {
        fontSize: 15,
        color: "#FFA657",
    },
    listItemText: {
        fontSize: 15,
        color: "#79C0FF",
    },
    itemView: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#282A36"
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
    listItemPressablePressed: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "rgb(210, 230, 255)",
        borderRadius: 20
    },
    iconPressable: {
        borderRadius: 5
    },
    iconPressablePressed: {
        backgroundColor: "rgb(210, 230, 255)",
        borderRadius: 5,
    },
    flexRow: {
        flexDirection: "row"
    }
})