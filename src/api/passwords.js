import { APIUrls } from "../consts/APIUrls";

/**
 * -------  Deprecated  ------
 * Fetches random password with provided params from password wolf API 
 * 
 * @param {*} props object
 * @returns password string or error
 */
export const generateNewPassword = async (props) => {
    const upper = props.uppers === true ? "on" : "off";
    const lower = props.lowers === true ? "on" : "off";
    const number = props.numbers === true ? "on" : "off";
    const special = props.specials === true ? "on" : "off";
    try {
        const response = await fetch(
            `${APIUrls.PasswordWolfBaseUrl}?length=${props.len}&upper=${upper}&lower=${lower}` +
            `&numbers=${number}&special=${special}&repeat=1`
        );
        if (!response.ok) throw new Error('Error occured in password generation');
        const result = await response.json();
        return result.pop().password;
    } catch (error) {
        console.log(error);
        return error;
    }
}