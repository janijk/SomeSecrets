import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export const RadioButtonGroup = ({ data, onPress }) => {

    const RadioButton = ({ item, index, onPress }) => {
        const [selected, setSelected] = useState(false);
        return (
            <View>
                <Text style={styles.text}> {item.value}</Text>
                <Pressable
                    onPress={(i) => { onPress(index), setSelected(!selected) }}
                    style={selected ? styles.buttons : styles.selectedButtons}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {data.map((item, index) => {
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
        color: "black",
        alignItems: "center",
        alignSelf: "center"
    }
});