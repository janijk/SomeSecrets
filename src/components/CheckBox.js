import { View, Text, Pressable, StyleSheet } from 'react-native';


export const CheckBox = ({ isSelected, onPress, text }) => {

    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => onPress()}
                style={!isSelected ? styles.buttons : styles.selectedButtons}
            />
            <Text style={styles.text}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        flexDirection: "row",
    },
    text: {
        margin: 5,
        fontSize: 16,
        color: "#79C0FF",
        alignItems: "center",
        alignSelf: "center"
    },
    buttons: {
        margin: 2,
        width: 25,
        height: 25,
        borderColor: "#cde3f7",
        borderRadius: 25,
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center"
    },
    selectedButtons: {
        margin: 2,
        width: 25,
        height: 25,
        borderColor: "#cde3f7",
        borderRadius: 25,
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: "#2675bd",
    },
});