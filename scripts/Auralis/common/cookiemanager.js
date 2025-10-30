export class CookieManager {
    Values = {};

    constructor(name) {
        this.cookieName = name;
    }

    Init() {
        const cookie = this.#getCookie(this.cookieName);
        if (cookie) {
            try {
                this.Values = JSON.parse(cookie);

                console.debug(this.cookieName + "-Cookie:");
                Object.entries(this.Values).forEach(([key, value]) => {
                    console.debug(`${key}:`, value);
                });
            } catch (e) {
                console.warn("Cookie " + this.cookieName + " konnte nicht gelesen werden – wird zurückgesetzt.");
                this.Values = {};
            }
        } else {
            this.Values = {};
        }
    }

    Set(key, value) {
        this.Values[key] = value;
    }

    Get(key, defaultValue = null) {
        return this.Values.hasOwnProperty(key) ? this.Values[key] : defaultValue;
    }

    Update(days = 30) {
        const json = JSON.stringify(this.Values);
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${this.cookieName}=${encodeURIComponent(json)}; expires=${date.toUTCString()}; path=/`;
    }

    #getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return decodeURIComponent(parts.pop().split(";").shift());
        return null;
    }
}
