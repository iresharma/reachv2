import Cookie from "js-cookie"

class SecureLocalstorage {

    SECRET_KEY = "cmVhY2gtc3lzdGVtcy1zZWN1cmUta2V5";

    setItem(key: string, value: string) {
        Cookie.set(key, value, {secure: true})
    }

    getItem(key: string): string {
        return Cookie.get(key) ?? ""
    }

    removeItem(key: string) {
        Cookie.remove(key)
    }
}

const secureLocalStorage = new SecureLocalstorage();

export {secureLocalStorage};
