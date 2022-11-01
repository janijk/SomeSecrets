/**
 * Generates random password according to provided props.
 * Required props style : {"len": 12, "lowers": true, "numbers": true, "specials": true, "uppers": true}
 * @param {*} props 
 * @returns String
 */
export const randomGenerator = ({ len, lowers, uppers, numbers, specials }) => {
    // Create array of numbers consisting of numbers between low and high. 
    const ascendingArray = (low, high) => {
        const array = []
        for (let i = low; i <= high; i++) {
            array.push(i)
        }
        return array
    };
    const upperCharCodes = ascendingArray(65, 90);
    const lowerCharCodes = ascendingArray(97, 122);
    const numberCharCodes = ascendingArray(48, 57);
    const symbolCharCodes = ascendingArray(33, 47)
        .concat(ascendingArray(58, 64))
        .concat(ascendingArray(91, 96))
        .concat(ascendingArray(123, 126));

    // Create a random string of characters according to provided options
    const generatePassword = (passwordLength, includeLowers, includeUppers, includeNumbers, includeSymbols) => {
        let charCodes = [];
        if (includeLowers) charCodes = charCodes.concat(lowerCharCodes);
        if (includeUppers) charCodes = charCodes.concat(upperCharCodes);
        if (includeSymbols) charCodes = charCodes.concat(symbolCharCodes);
        if (includeNumbers) charCodes = charCodes.concat(numberCharCodes);

        if (charCodes.length == 0) throw new Error('Atleast one option must be turned on');

        const passwordCharacters = []
        for (let i = 0; i < passwordLength; i++) {
            const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)];
            passwordCharacters.push(String.fromCharCode(characterCode));
        }
        return passwordCharacters.join('');
    }

    try {
        return generatePassword(len, lowers, uppers, numbers, specials);
    } catch (error) {
        console.log(error);
        return error;
    }
}