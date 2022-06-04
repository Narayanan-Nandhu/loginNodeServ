import utils from "../../../utils";
import chai from 'chai';



describe('Testing the utility functions', ()=> {

    it('should test the alphanumeric gives specified length of string', () => {
        let lengthOfStr = 10;
        const res = utils.alphaNumericString(lengthOfStr);
        expect(res).toHaveLength(lengthOfStr)
    });

    it('should encryption & decryption mehtods', () => {
        const message = "copyCat";
        const encryptedData = utils.encrypt(message);
        expect(typeof(encryptedData)).toBe(typeof(''));

        const decryptedData = utils.decrypt(encryptedData);
        expect((decryptedData)).toStrictEqual(message);
    })

})