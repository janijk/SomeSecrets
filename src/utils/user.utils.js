import { encryption } from "./encryption.utils"
import { storageRead, storageSave, storageCheck } from "./storage.utils"
import { user } from '../consts/user'

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
