import { View, Text, Pressable, StyleSheet } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

export const CustomButton = ({ value, iconName, iconSize, iconSet, press }) => {

    return (
        <View>
            <Pressable
                onPress={press}
                style={({ pressed }) => [{ borderColor: pressed ? '#FF79C6' : "lightgrey" }, styles.buttons]}
            >
                <View style={[styles.flexRow, { alignItems: "center" }]}>
                    {iconSet === "MaterialIcons" && <MaterialIcons name={iconName} size={iconSize} color="#cde3f7" />}
                    {iconSet === "AntDesign" && <AntDesign name={iconName} size={iconSize} color="#cde3f7" />}
                    <Text style={styles.buttonText}>{`${value}`}</Text>
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttons: {
        marginBottom: 3,
        width: 100,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
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
});