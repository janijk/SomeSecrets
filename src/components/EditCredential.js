import { useState } from "react";
import { TextInput, Text, Pressable, StyleSheet, View, Alert } from "react-native"

export const EditCredential = ({ credential, action }) => {
    const [provider, setProvider] = useState(credential.provider);
    const [username, setUsername] = useState(credential.username);
    const [password, setPassword] = useState(credential.password);

    const confirmDelete = () => {
        Alert.alert('Warning', `Irreversible action, confirm delete.`,
            [{ text: 'Delete', onPress: () => action({ delete: true }) }, { text: 'Cancel' }], { cancelable: true })
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textDarkRed}>Edit info</Text>
            <View style={styles.flexRow}>
                <Text style={styles.textOrange}>{`Provider:       `}</Text>
                <TextInput style={styles.textBlue} onChangeText={(text) => setProvider(text)} value={provider}></TextInput>
            </View>
            <View style={styles.itemSeprator}></View>
            <View style={styles.flexRow}>
                <Text style={styles.textOrange}>{`Username:    `}</Text>
                <TextInput style={styles.textBlue} onChangeText={(text) => setUsername(text)} value={username}></TextInput>
            </View>
            <View style={styles.itemSeprator}></View>
            <View style={styles.flexRow}>
                <Text style={styles.textOrange}>{`Password:     `}</Text>
                <TextInput style={styles.textBlue} onChangeText={(text) => setPassword(text)} value={password}></TextInput>
            </View>
            <View style={styles.itemSeprator}></View>
            <View style={styles.buttonContainer}>
                <Pressable onPress={() => confirmDelete()}
                    style={({ pressed }) => [{ borderColor: pressed ? '#FF79C6' : "lightgrey" },
                    styles.buttons]}>
                    <Text style={styles.buttonText}>Delete</Text>
                </Pressable>
                <Pressable onPress={() => action({ provider, username, password })}
                    style={({ pressed }) => [{ borderColor: pressed ? '#FF79C6' : "lightgrey" },
                    styles.buttons]}>
                    <Text style={styles.buttonText}>Save</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 15
    },
    textBlue: {
        color: "#79C0FF",
        alignSelf: "center",
        width: 220,
    },
    textOrange: {
        color: "#FFA657",
        alignSelf: "center"
    },
    textDarkRed: {
        color: "#FF7B72",
        fontSize: 20,
        marginBottom: 5,
        alignSelf: "center"
    },
    buttons: {
        marginBottom: 3,
        width: 100,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center"
    },
    buttonText: {
        color: "#79C0FF",
        fontWeight: "600"
    },
    flexRow: {
        flexDirection: "row",
    },
    itemSeprator: {
        height: 1,
        marginBottom: 5,
        width: '95%',
        alignSelf: "center",
        backgroundColor: "#FFA657",
        opacity: 0.4
    },
});