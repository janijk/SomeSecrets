import * as Crypto from 'expo-crypto';

/**
 * Encrypts provided value with SHA256
 * @param {*} value 
 * @returns values SHA256 digest
 */
export const encryption = async (value) => {
    try {
        return await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            value
        );
    } catch (error) {
        console.log(error);
    }    
}