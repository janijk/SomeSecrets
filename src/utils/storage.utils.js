import * as SecureStore from 'expo-secure-store';

/**
 * Get data from SecureStore, throws error if no matches found for key.
 * @param {*} key 
 * @returns object
 */
export const storageRead = async (key) => {
    try {
        let data = await SecureStore.getItemAsync(key);
        if (data === null) throw new Error("No value found with provided key")
        else return JSON.parse(data);
    } catch (error) {
        return error;
    }
}

/**
 * Check if key value pair exists in SecureStore
 * true if exists, else false
 * @param {*} key 
 * @returns true | false
 */
export const storageCheck = async (key) => {
    try {
        let exists = await SecureStore.getItemAsync(key);
        if (exists === null) return false;
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

/**
 * Save key, value pair to SecureStore
 * @param {*} key 
 * @param {*} value 
 */
export const storageSave = async (key, value) => {
    try {
        SecureStore.setItemAsync(key, JSON.stringify(value));
    } catch (error) {
        return error;
    }
}

/**
 * Remove key, value pair from SecureStore
 * @param {*} key 
 */
export const storageRemove = async (key) => {
    try {
        SecureStore.deleteItemAsync(key);
    } catch (error) {
        return error;
    }
}
