import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/credentialsSlice";
import { setIsAuth, setUser, setIsSignout, resetState } from "../redux/loaderSlice";
import { encryption } from "./encryption.utils"
import { storageUtil } from "./storage.utils"
import { user } from '../consts/user'

/**
 * Attempts to log user in with provided credentials, on match sets user data to Redux state.
 * @param {*} username username
 * @param {*} pass password
 * @returns error message | undefined
 */
export const login = async (username, pass) => { 
    try {
        const user = await storageUtil.storageRead(username);
        const passEncrypted = await encryption(pass);
        if(user.password === passEncrypted) {
            useDispatch(setCredentials(user.credentials));
            useDispatch(setIsAuth());
            useDispatch(setUser(username));
            return undefined;
        }
    } catch (error) {
        console.log(error);
        return "Invalid credentials";
    }
}

/**
 * Attempts to create a new user, logs in if success, else return error
 * @param {*} username 
 * @param {*} pass 
 * @returns error message | undefined
 */
export const signup = async (username, pass) => {
    let newUser = user;
    newUser.username = username;
    newUser.password = pass;
    try {
        const exists = await storageUtil.storageCheck(username);
        if(exists) throw new Error("User allready exists");              
        await storageUtil.storageSave(username,newUser);
        useDispatch(setIsAuth());
        useDispatch(setUser(username)); 
    } catch (error) {
        console.log(error);
        return error.message;
    }
}

/**
 * Sign out current user. Resets loaderSlice state to initial values;
 */
export const signout = () =>{
    useDispatch(setIsSignout());
    setTimeout(useDispatch(resetState()), 2000);
    
}
