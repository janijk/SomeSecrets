import { FlatList, Text, View, Pressable, StyleSheet } from "react-native"
import { PasswordListItem } from '../components/PasswordListItem'

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
            <Text>List begins</Text>
        </View>
    )
    const listFooter = () => (
        <View style={styles.listFooter}>
            <Text>List ends</Text>
        </View>
    )
    const itemSeparator = () => (
        <View style={styles.itemSeprator}></View>
    )
    const listEmpty = () => (
        <View><Text>No saved passwords</Text></View>
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
        backgroundColor: "lightgrey",
    },
    itemSeprator: {
        height: 1,
        marginBottom: 5,
        backgroundColor: "white",
        opacity: 0.5
    },
    listHeader: {
        height: 25,
        alignItems: "center"
    },
    listFooter: {
        height: 25,
        alignItems: "center"
    }
})