import Crypto from "crypto-es";

class SecureLocalstorage {

    SECRET_KEY = "cmVhY2gtc3lzdGVtcy1zZWN1cmUta2V5";

    setItem(key: string, value: string) {
        const keyEncrypt = Crypto.AES.encrypt(key, this.SECRET_KEY).toString();
        const valueEncrypt = Crypto.AES.encrypt(value, this.SECRET_KEY).toString();

        // localStorage.setItem(keyEncrypt, valueEncrypt)
        localStorage.setItem(key, value)
    }

    getItem(key: string): string {
        // const keyEncrypt = Crypto.AES.encrypt(key, this.SECRET_KEY).toString();
        // const encryptedValue = localStorage.getItem(keyEncrypt) ?? "";
        // const value = Crypto.AES.decrypt(encryptedValue, this.SECRET_KEY).toString();
        // return value;

        return localStorage.getItem(key)
    }
}

const secureLocalStorage = new SecureLocalstorage();

export {secureLocalStorage};
