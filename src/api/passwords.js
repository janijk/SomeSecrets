import { APIUrls } from "../consts/APIUrls";

/**
 * Fetches random password with provided params from password wolf API
 * @param {*} props length: number
 * @param {*} props uppers: on/off
 * @param {*} props lowers: on/off
 * @param {*} props specials: on/off
 * @returns password string or error.message
 */
export const generateNewPassword = async (props) =>{
    try {
        const response = await fetch(`${APIUrls.PasswordWolfBaseUrl}?length=${props.length}
            &upper=${props.uppers}&lower=${props.lowers}
            &numbers=${props.numbers}&special=${props.specials}&repeat=1`)
        if(!response.ok) throw new Error('Error occured in password generation');
        const pass = await response.json();
        return pass;
    } catch (error) {
        console.log(error);
        return error.message;
    }
}