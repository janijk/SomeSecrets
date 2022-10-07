import { APIUrls } from "../consts/APIUrls";

/**
 * Fetches random password with provided params from password wolf API
 * 
 * 
 * @param {*} props object
 * @returns password string or error.message
 */
export const generateNewPassword = async (props) => {
    try {
        const response = await fetch(
            `${APIUrls.PasswordWolfBaseUrl}?length=${props.len}&upper=${props.uppers}&lower=${props.lowers}
            &numbers=${props.numbers}&special=${props.specials}&repeat=1`
        );
        if (!response.ok) throw new Error('Error occured in password generation');
        const result = await response.json();
        return result.pop().password;
    } catch (error) {
        console.log(error);
        return error.message;
    }
}