import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

/**
 * Generate radio buttons according to given params. Params take in onPress function
 * and list [{name: "name"},]   of names for buttons.
 * @param {*} param0 
 * @returns Pressables wrapped in a View
 */
export const RadioButtonGroup = ({ options, onPress }) => {

    const RadioButton = ({ item, index, onPress }) => {
        const [selected, setSelected] = useState(true);
        return (
            <View>
                <Text style={styles.text}> {item.name}</Text>
                <Pressable
                    onPress={() => { onPress(index), setSelected(!selected) }}
                    style={!selected ? styles.buttons : styles.selectedButtons}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {options.map((item, index) => {
                return (
                    <RadioButton key={index} item={item} index={index} onPress={onPress} />
                );
            })}
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
        marginBottom: 3,
        width: 35,
        height: 35,
        borderColor: "lightgrey",
        borderRadius: 20,
        borderWidth: 5,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center"
    },
    selectedButtons: {
        marginBottom: 3,
        width: 35,
        height: 35,
        borderColor: "lightgrey",
        borderRadius: 20,
        borderWidth: 5,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: "#2675bd",
    },
    text: {
        margin: 5,
        color: "#79C0FF",
        alignItems: "center",
        alignSelf: "center"
    }
});