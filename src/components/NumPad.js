import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * Numpad. press returns value from -2 to 9. -1 is backspace, -2 is enter.
 * @param {*} param0 
 * @returns 
 */
export const NumPad = ({ press }) => {
    const RoundButton = ({ value }) => {
        return (
            <View>
                <Pressable
                    style={styles.buttons}
                    onPress={() => press(value)}
                    android_ripple={{ color: "lightgrey", borderless: true }}
                >
                    {value != -1 && value != -2 && <Text style={styles.buttonText}>{value}</Text>}
                    {value == -1 && <Ionicons name="md-backspace-outline" size={25} color="#FF79C6" />}
                    {value == -2 && <Ionicons name="md-enter-outline" size={25} color="#FF79C6" />}
                </Pressable>
            </View>
        )
    }

    return (
        <View>
            <View style={styles.flexRow}>
                <RoundButton value={1} />
                <RoundButton value={2} />
                <RoundButton value={3} />
            </View>
            <View style={styles.flexRow}>
                <RoundButton value={4} />
                <RoundButton value={5} />
                <RoundButton value={6} />
            </View>
            <View style={styles.flexRow}>
                <RoundButton value={7} />
                <RoundButton value={8} />
                <RoundButton value={9} />
            </View>
            <View style={styles.flexRow}>
                <RoundButton value={-1} />
                <RoundButton value={0} />
                <RoundButton value={-2} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttons: {
        margin: 6,
        height: 60,
        width: 60,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "lightgrey",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center"
    },
    buttonText: {
        color: "#79C0FF",
        fontWeight: "100",
        fontSize: 30
    },
    flexRow: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
});