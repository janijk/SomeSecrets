import { useState } from "react"
import { FlatList, Text, View, Pressable, StyleSheet } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';

export const PasswordList = ({ data }) => {
    const itemHeader = () => (
        <View style={styles.itemHeader}></View>
    )
    const itemFooter = () => (
        <View style={styles.itemFooter}></View>
    )
    const itemSeparator = () => (
        <View style={styles.seprator}></View>
    )
    const listEmpty = () => (
        <View><Text>No saved passwords</Text></View>
    )

    const ListItem = ({ props }) => {
        const [expanded, setExpanded] = useState(false);
        return (
            <View>
                <View style={styles.itemViewHeader}>
                    <Pressable style={styles.listItemPressable} onPress={() => setExpanded(!expanded)}>
                        <Text style={styles.listItemProvider}>{props.provider}</Text>
                        <Ionicons name={!expanded ? "md-chevron-down" : "md-chevron-up"} size={32} color="green" />
                    </Pressable>
                </View>
                {expanded ?
                    <>
                        <View style={styles.itemView}>
                            <Text style={styles.listItemText}>{`Username:   ${props.username}`}</Text>
                            <Pressable>
                                <Ionicons name="md-copy-outline" size={25} color="green" />
                            </Pressable>
                        </View>
                        <View style={styles.itemView}>
                            <Text style={styles.listItemText}>{`Password:    ${props.password}`}</Text>
                            <Pressable>
                                <Ionicons name="md-copy-outline" size={25} color="green" />
                            </Pressable>
                        </View>
                    </>
                    : null
                }
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => <ListItem props={item} />}
                keyExtractor={(item, i) => item.password + i}
                ItemSeparatorComponent={itemSeparator}
                ListEmptyComponent={listEmpty}
                ListHeaderComponent={itemHeader}
                ListFooterComponent={itemFooter}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "lightgrey",
    },
    seprator: {
        height: 1,
        marginBottom: 5,
        backgroundColor: "white",// '#03095e',
        opacity: 0.5
    },
    listItemProvider: {
        fontWeight: "bold",
        fontSize: 20,
    },
    listItemText: {
        fontSize: 15,
    },
    itemView: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "whitesmoke"
        // borderWidth: 1, borderColor: "black"
    },
    itemViewHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    listItemPressable: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
})