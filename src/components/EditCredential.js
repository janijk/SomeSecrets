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
        <>
            <TextInput onChangeText={(text) => setProvider(text)} value={provider}></TextInput>
            <TextInput onChangeText={(text) => setUsername(text)} value={username}></TextInput>
            <TextInput onChangeText={(text) => setPassword(text)} value={password}></TextInput>
            <View style={styles.buttonContainer}>
                <Pressable style={styles.buttons} onPress={() => confirmDelete()}>
                    <Text>Delete</Text>
                </Pressable>
                <Pressable style={styles.buttons} onPress={() => action({ provider, username, password })}>
                    <Text>Save</Text>
                </Pressable>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    buttons: {
        marginBottom: 3,
        width: 80,
        height: 35,
        borderColor: "lightgrey",
        borderRadius: 20,
        borderWidth: 5,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center"
    },
});