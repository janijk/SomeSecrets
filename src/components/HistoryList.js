import { View, FlatList, StyleSheet } from "react-native"
import { HistoryListItem } from "./HistoryListItem"

export const HistoryList = ({ data }) => {
    const reversedData = data.reverse()

    const listHeader = () => (
        <View style={styles.listHeader}></View>
    )

    return (
        <View>
            <FlatList
                data={reversedData}
                renderItem={({ item }) => <HistoryListItem item={item} />}
                keyExtractor={(item, i) => item.password + i}
                ListHeaderComponent={listHeader}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    listHeader: {
        margin: 6,
        alignItems: "center",
    },
})