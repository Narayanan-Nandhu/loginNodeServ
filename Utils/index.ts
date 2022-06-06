import crypto from 'crypto';
import CONSTANTS from './constants';

const alphaNumericString = (length: Number) => {
    var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

const algorithm = CONSTANTS.CRYPTO_ALGORITHM;
const passKeyValue = process.env.PASSWORD_ENCRYPTION_KEY || 'keyboardCat';


const encrypt = (data: string) => {
    let passKey = crypto.createCipher(algorithm, passKeyValue);
    let encryptedData = passKey.update(data, 'utf8', 'hex')
    encryptedData += passKey.final('hex');
    return encryptedData;
}


const decrypt = (data: string) => {
    let passKey = crypto.createDecipher(algorithm, passKeyValue);
    var encryptedData = passKey.update(data, 'hex', 'utf8')
    encryptedData += passKey.final('utf8');
    return encryptedData;
}

export default {
    alphaNumericString,
    encrypt,
    decrypt
}