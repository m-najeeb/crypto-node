const CryptoJS = require("crypto-js");
require("dotenv").config();

const secretKey = process.env.CRYPTO_SECRET;

function encrypt(text) {
  return CryptoJS.AES.encrypt(text.toString(), secretKey).toString();
}

function decrypt(ciphertext) {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
}

module.exports = { encrypt, decrypt };
