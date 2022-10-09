import { FlatList, Text, View, Pressable, StyleSheet } from "react-native"
import { PasswordListItem } from '../components/PasswordListItem'

/**
 * Password list component, implements Flatlist.
 * @param {*} credentials array of credential objects
 * @returns 
 */
export const PasswordList = ({ data, longPress }) => {
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