import { encryption } from "./encryption.utils"
import { storageRead, storageSave, storageCheck } from "./storage.utils"
import { user } from '../consts/user'
import { credential } from '../consts/credential'

/**
 * Attempts to log user in with provided credentials. Returns [null, true] on success, else [error, false].
 * @param {*} username username
 * @param {*} pass password
 * @returns [error.message | boolean]
 */
export const login = async (username, pass) => {
    try {
        const user = await storageRead(username);
        const passEncrypted = await encryption(pass);
        if (user.password !== passEncrypted) {
            throw new Error("Invalid credentials")
        }
        return [null, true];
    } catch (error) {
        console.log(`user.utils login error: ${error}`);
        return [error.message, false];
    }
}

/**
 * Attempts to create a new user, return username on success, else error.message
 * @param {*} username 
 * @param {*} pass 
 * @returns error message | undefined
 */
export const signup = async (username, pass) => {
    let newUser = user;
    newUser.username = username;
    newUser.password = await encryption(pass);
    try {
        const exists = await storageCheck(username);
        if (exists) throw new Error("User allready exists");
        await storageSave(username, newUser);
        return username;
    } catch (error) {
        console.log(`user.utils signup error: ${error}`);
        return error.message;
    }
}

/**
 * Creates a credential object
 * @param {*} provider string
 * @param {*} username string
 * @param {*} password string
 * @returns credential object
 */
export const createCredentials = (provider = "", username = "", password = "") => {
    try {
        const cred = credential;
        cred.provider = provider;
        cred.username = username;
        cred.password = password;
        return cred;
    } catch (error) {
        return error;
    }
}

/**
 * Adds a new credential to users credentials list
 * @param {*} creds object
 * @param {*} username string
 * @returns error if cant be saved
 */
export const addNewCredential = async (creds = credential, username = "") => {
    try {
        const credsList = await storageRead(username);
        credsList.credentials.push(creds);
        await storageSave(username, credsList);
    } catch (error) {
        console.log(`user.utils addCredentials error: ${error}`);
        return error.message;
    }
}
