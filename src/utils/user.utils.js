import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/credentialsSlice";
import { setIsAuth, setUsername } from "../redux/loaderSlice";
import { encryption } from "./encryption.utils"
import { storageUtil } from "./storage.utils"

/**
 * Attempts to log user in with provided credentials, on match sets user data to Redux state.
 * @param {*} username username
 * @param {*} pass password
 * @returns error message if error
 */
export const login = async (username, pass) => { 
    try {
        const user = await storageUtil.storageRead(username);
        const passEncrypted = await encryption(pass);
        if(user.password === passEncrypted) {
            useDispatch(setCredentials(user.credentials));
            useDispatch(setIsAuth());
            useDispatch(setUsername(username));
            return undefined;
        }
    } catch (error) {
        console.log(error);
        return "Invalid credentials";
    }
}
