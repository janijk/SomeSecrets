import { useState } from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

/**
 * Flatlist item component for credentials. Expands on click to show username and password
 * as well as other options.
 * @param {*} props credential object
 * @returns 
 */
export const PasswordListItem = ({ props, longPress }) => {
    const [expanded, setExpanded] = useState(false);
    const [copiedUn, setCopiedUn] = useState(false);
    const [copiedPass, setCopiedPass] = useState(false);
    const [iconName, setIconName] = useState(
        FontAwesome.glyphMap.hasOwnProperty(props.provider.toLowerCase()) ? props.provider.toLowerCase() : "question"
    );

    // Copy username or password to clipboard and set indicator text visible for 1 sec
    const copyToClipboard = async (string, boolean) => {
        await Clipboard.setStringAsync(string);
        if (boolean) { setCopiedUn(true); setCopiedPass(false); }
        if (!boolean) { setCopiedPass(true); setCopiedUn(false); }
        setTimeout(() => {
            setCopiedUn(false);
            setCopiedPass(false);
        }, 1000);
    };

    return (
        <View style={styles.container}>
            <View style={styles.itemViewHeader}>
                <Pressable
                    onLongPress={longPress}
                    onPress={() => setExpanded(!expanded)}
                    style={({ pressed }) => pressed ? styles.listItemPressablePressed : styles.listItemPressable}
                >
                    <View style={[styles.flexRow, { alignItems: "center" }]}>
                        <FontAwesome name={iconName} size={24} color="whitesmoke" style={{ width: 25, textAlign: "center" }} />
                        <Text style={styles.listItemProvider}>{` ${props.provider}`}</Text>
                    </View>
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
                            onPress={() => copyToClipboard(props.username, true)}
                            style={({ pressed }) => pressed ? styles.iconPressablePressed : styles.iconPressable}
                        >
                            {copiedUn && <Text style={styles.copyTxt}>Copied</Text>}
                            <Ionicons name="md-copy-outline" size={25} color="#FFA657" />
                        </Pressable>
                    </View>
                    <View style={styles.itemView}>
                        <View style={styles.flexRow}>
                            <Text style={styles.listItemTextOne}>Password:</Text>
                            <Text style={styles.listItemText}>{`    ${props.password}`}</Text>
                        </View>
                        <Pressable
                            onPress={() => copyToClipboard(props.password, false)}
                            style={({ pressed }) => pressed ? styles.iconPressablePressed : styles.iconPressable}
                        >
                            {copiedPass && <Text style={styles.copyTxt}>Copied</Text>}
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
        backgroundColor: "#282A36",
        marginBottom: 3,
        marginTop: 3
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
    },
    copyTxt: {
        position: "absolute",
        width: 50,
        top: 1,
        right: 30,
        color: "#cde3f7"
    }
})