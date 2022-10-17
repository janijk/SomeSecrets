import { FlatList, Text, View, Pressable, StyleSheet } from "react-native"
import { PasswordListItem } from '../components/PasswordListItem'
import { AntDesign } from '@expo/vector-icons';

/**
 * Password list component, implements Flatlist.
 * @param {*} credentials object
 * @param {*} function Pressable longPress 
 * @returns 
 */
export const PasswordList = ({ data, longPress }) => {
    // Sort credential to ascending order by provider name if data not undefined
    const creds = (data == undefined) ? null : data.slice().sort((a, b) => {
        let fa = a.provider.toLowerCase(),
            fb = b.provider.toLowerCase();
        if (fa < fb) return -1;
        if (fa > fb) return 1;
        return 0;
    });
    const listHeader = () => (
        <View style={styles.listHeader}>
            <Text style={styles.textBlue}>Credentials</Text>
        </View>
    )
    const listFooter = () => (
        <View style={styles.listFooter}>
            <Text style={styles.textBlue}><AntDesign name="API" size={30} color="#79C0FF" /></Text>
        </View>
    )
    const itemSeparator = () => (
        <View style={styles.itemSeprator}></View>
    )
    const listEmpty = () => (
        <View><Text style={styles.textBlue}>No saved passwords</Text></View>
    )

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item, index }) => <PasswordListItem props={item} longPress={() => longPress(index)} />}
                keyExtractor={(item, i) => item.password + i}
                ItemSeparatorComponent={itemSeparator}
                ListEmptyComponent={listEmpty}
                ListHeaderComponent={listHeader}
                ListFooterComponent={listFooter}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#282A36",
        borderRadius: 20,
        margin: 5,
        padding: 10
    },
    itemSeprator: {
        height: 1,
        marginBottom: 5,
        backgroundColor: "#FFA657",
        opacity: 0.5
    },
    listHeader: {
        margin: 10,
        alignItems: "center",
    },
    listFooter: {
        margin: 10,
        alignItems: "center",
    },
    textBlue: {
        color: "#79C0FF",
        fontSize: 16
    },
})