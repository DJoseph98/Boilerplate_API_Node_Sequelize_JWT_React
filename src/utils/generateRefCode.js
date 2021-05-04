
const { customAlphabet } = require('nanoid')

const CHARACTER_SET =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const REFERRAL_CODE_LENGTH = 8;

const generateRefCode = async () => {
    try {
        const referralCodeGen = await customAlphabet(CHARACTER_SET, REFERRAL_CODE_LENGTH);
        console.log(referralCodeGen)
        return { error: false, referralCode: referralCodeGen }
    } catch (error) {
        return { error: true }
    }
}

module.exports = { generateRefCode }