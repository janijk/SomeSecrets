import * as SecureStore from 'expo-secure-store';

/**
 * Utilities for SecureStore interaction: storageRead(key), storageSave(key,value), storageRemove(key)
 */
export const storageUtil = () => {

    /**
     * Get data from SecureStore
     * @param {*} key 
     * @returns object
     */
    const storageRead = async (key) => {  
        try {        
            let data = await SecureStore.getItemAsync(key);
            if(data === null) throw "No value found with provided key"
            else return JSON.parse(data);           
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Save key, value pair to SecureStore
     * @param {*} key 
     * @param {*} value 
     */
    const storageSave = async (key, value) => {
        try {        
            SecureStore.setItemAsync(key, JSON.stringify(value)); 
        } catch (error) {
            console.log(error);
        }    
    }

    /**
     * Remove key, value pair from SecureStore
     * @param {*} key 
     */
    const storageRemove = async (key) => {
        try {
            SecureStore.deleteItemAsync(key);
        } catch (error) {
            console.log(error);
        }
    }
}