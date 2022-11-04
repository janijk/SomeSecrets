import { useState } from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
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
    const [visible, setVisible] = useState(false);
    const [copiedUn, setCopiedUn] = useState(false);
    const [copiedPass, setCopiedPass] = useState(false);
    const iconName = FontAwesome.glyphMap.hasOwnProperty(props.provider.toLowerCase()) ?
        props.provider.toLowerCase() : "square-o";

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

    // Change password text to plain text or dots depending on visibility
    const securePasswordEntry = (password, visible) => {
        if (visible == false) return `   ${password.replace(/./g, '• ')}`
        else return `   ${props.password}`
    }

    return (
        <View style={{ margin: 1 }}>
            <View style={styles.itemViewHeader}>
                <Pressable
                    onLongPress={longPress}
                    onPress={() => setExpanded(!expanded)}
                    android_ripple={{ color: "#FF79C6", borderless: true }}
                    style={styles.itemViewHeader}
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
                        <View style={[styles.flexRow, { marginLeft: 10 }]}>
                            <AntDesign style={{ alignSelf: "center" }} name={"user"} size={20} color="#FFA657" />
                            <Text style={styles.listItemText}>{`    ${props.username}`}</Text>
                        </View>
                        <Pressable
                            onPress={() => copyToClipboard(props.username, true)}
                            android_ripple={{ color: "#FF79C6", borderless: true }}
                        >
                            {copiedUn && <Text style={styles.copyTxt}>Copied</Text>}
                            <Ionicons name="md-copy-outline" size={25} color="#FFA657" />
                        </Pressable>
                    </View>
                    <View style={styles.itemView}>
                        <View style={[styles.flexRow, { marginLeft: 10 }]}>
                            <Pressable
                                onPress={() => setVisible(!visible)}
                                android_ripple={{ color: "#FF79C6", borderless: true }}
                            >
                                <Ionicons name={visible ? "eye-outline" : "eye-off-outline"} size={24} color="#FFA657" />
                            </Pressable>
                            <Text style={styles.listItemText}>{securePasswordEntry(props.password, visible)}</Text>
                        </View>
                        <Pressable
                            onPress={() => copyToClipboard(props.password, false)}
                            android_ripple={{ color: "#FF79C6", borderless: true }}
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
    listItemProvider: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#FF7B72"
    },
    listItemText: {
        fontSize: 15,
        color: "#79C0FF",
        alignSelf: "center"
    },
    itemView: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 3,
        marginTop: 3
    },
    itemViewHeader: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#282A36",
        borderRadius: 25,
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