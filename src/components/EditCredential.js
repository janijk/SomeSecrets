import { useState } from "react";
import { TextInput, Text, Pressable, StyleSheet, View, Alert } from "react-native"
import { AntDesign } from '@expo/vector-icons';

export const EditCredential = ({ credential, action }) => {
    const [provider, setProvider] = useState(credential.provider);
    const [username, setUsername] = useState(credential.username);
    const [password, setPassword] = useState(credential.password);
    const [valid, setValid] = useState(true);

    const confirmDelete = () => {
        Alert.alert('Warning', `Irreversible action, confirm delete.`,
            [{ text: 'Delete', onPress: () => action({ delete: true }) }, { text: 'Cancel' }], { cancelable: true })
    };

    const onSave = () => {
        if (!username || !provider || !password) setValid(false);
        else action({ provider, username, password })
    };

    return (
        <View style={styles.container}>
            <View style={[styles.flexRow, { justifyContent: "center" }]}>
                <Text style={styles.textDarkRed}>Edit info</Text>
                <View style={styles.delete}>
                    <Pressable
                        onPress={() => confirmDelete()}
                        android_ripple={{ color: "#FF79C6", borderless: true }}
                    >
                        <AntDesign name="delete" size={20} color={"#79C0FF"} />
                    </Pressable>
                </View>
            </View>
            <View style={styles.flexRow}>
                <Text style={styles.textOrange}>{`Provider:       `}</Text>
                <TextInput
                    style={styles.textBlue}
                    onChangeText={(text) => setProvider(text)}
                    value={provider}>
                </TextInput>
            </View>
            <View style={[styles.itemSeprator, !valid && !provider && { backgroundColor: "red" }]}></View>
            <View style={styles.flexRow}>
                <Text style={styles.textOrange}>{`Username:    `}</Text>
                <TextInput
                    style={styles.textBlue}
                    onChangeText={(text) => setUsername(text)}
                    value={username}>
                </TextInput>
            </View>
            <View style={[styles.itemSeprator, !valid && !username && { backgroundColor: "red" }]}></View>
            <View style={styles.flexRow}>
                <Text style={styles.textOrange}>{`Password:     `}</Text>
                <TextInput
                    style={styles.textBlue}
                    onChangeText={(text) => setPassword(text)}
                    value={password}>
                </TextInput>
            </View>
            <View style={[styles.itemSeprator, !valid && !password && { backgroundColor: "red" }]}></View>
            <View style={styles.buttonContainer}>
                <Pressable
                    onPress={() => onSave()}
                    style={({ pressed }) => [{ borderColor: pressed ? '#FF79C6' : "lightgrey" }, styles.buttons]}
                >
                    <Text style={styles.buttonText}>Save</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#282A36",
        flex: 0,
        margin: 5,
        borderRadius: 20
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 15
    },
    textBlue: {
        color: "#79C0FF",
        alignSelf: "center",
        width: 200,
    },
    textOrange: {
        color: "#FFA657",
        alignSelf: "center"
    },
    textDarkRed: {
        color: "#FF7B72",
        fontSize: 20,
        marginBottom: 5,
        alignSelf: "center",
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
    delete: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        right: 5,
        height: 30,
        width: 30,
        borderRadius: 20,
    },
    deletePressable: {

    }
});