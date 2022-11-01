import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';


export const CheckBox = ({ isSelected, onPress }) => {

    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => { onPress() }}
                style={!isSelected ? styles.buttons : styles.selectedButtons}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        margin: 5,
        flexDirection: "row",
        borderColor: "black",
        justifyContent: "center",
    },
    buttons: {
        margin: 2,
        width: 20,
        height: 20,
        borderColor: "#cde3f7",
        borderRadius: 20,
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center"
    },
    selectedButtons: {
        margin: 2,
        width: 20,
        height: 20,
        borderColor: "#cde3f7",
        borderRadius: 20,
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: "#2675bd",
    },
});