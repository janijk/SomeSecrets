import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { PasswordList } from '../components/PasswordList';
import { EditCredential } from '../components/EditCredential';
import { useSelector } from 'react-redux';
import { storageRead } from '../utils/storage.utils';
import { editCredentials } from '../utils/user.utils';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton } from '../components/CustomButton';

export const PasswordListScreen = () => {
    const [editView, setEditView] = useState(false);
    const [credential, setCredential] = useState(null);
    const [credentials, setCredentials] = useState(null);
    const currentUser = useSelector(state => state.loader.user);
    const reload = useSelector(state => state.loader.reload);

    // Update credentials list on mount & everytime changes are made
    useEffect(() => {
        let mounted = true;
        const getCredentials = async () => {
            try {
                const { credentials } = await storageRead(currentUser);
                if (mounted) {
                    const sorted = sort(credentials)
                    setCredentials(sorted);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getCredentials();
        return () => {
            mounted = false;
        }
    }, [reload]);

    // Sort array of credentials ascending by provider name
    const sort = (array) => {
        const sorted = (array == undefined) ? null : array.slice().sort((a, b) => {
            let fa = a.provider.toLowerCase(),
                fb = b.provider.toLowerCase();
            if (fa < fb) return -1;
            if (fa > fb) return 1;
            return 0;
        });
        return sorted;
    };

    // Handles PasswordListItem Pressable onLongPress. indx param is the index of
    // specific credential object in credential array. Set editing view visible.
    const handleLongPress = (indx) => {
        setCredential(credentials[indx]);
        setEditView(!editView);
    };

    // Handles saving of edited credential or its deletion.
    const handleAction = async (action) => {
        if (action.delete == true) {
            let filtered = credentials.filter(e => e != credential);
            let result = await editCredentials(filtered, currentUser);
            if (result === undefined) setCredentials(filtered);
        } else {
            let edited = credentials.map(e => {
                if (e == credential) e = action;
                return e;
            });
            let result = await editCredentials(edited, currentUser);
            if (result === undefined) setCredentials(edited);
        }
        setEditView(!editView);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                {!editView ?
                    <PasswordList data={credentials} longPress={(indx) => handleLongPress(indx)} />
                    :
                    <>
                        <EditCredential credential={credential} action={(action) => handleAction(action)} />
                        <View style={styles.containerEdit}>
                            <CustomButton
                                value={` Cancel `}
                                iconSet={"AntDesign"}
                                iconName={"closecircleo"}
                                iconSize={18}
                                press={() => setEditView(!editView)}
                            />
                        </View>
                    </>
                }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 4,
        marginRight: 6
    },
    containerEdit: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20
    },
});