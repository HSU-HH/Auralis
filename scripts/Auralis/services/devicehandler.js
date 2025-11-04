export class DeviceHandler {
    constructor() {
        const info = this.#detectMobileDevice();

        this.IsMobile = info.isMobile;
        this.IsPhone = info.isPhone;
        this.IsTablet = info.isTablet;
        this.HasTouch = info.isTouchCapable;

        this.ScreenWidth = info.screenWidth;
        this.ScreenHeight = info.screenHeight;
        this.DevicePixelRatio = window.devicePixelRatio || 1;
    }

    /**
     * Private Methode zur Geräteerkennung
     */
    #detectMobileDevice() {
        const ua = navigator.userAgent || '';
        const platform = navigator.platform || '';
        const uaData = navigator.userAgentData || null;
        const maxTouchPoints = navigator.maxTouchPoints || 0;

        // Modern: navigator.userAgentData.mobile
        const uaDataMobile = uaData && typeof uaData.mobile === 'boolean' ? uaData.mobile : null;

        // Klassische mobile UAs
        const reMobile = /\b(Mobi(le)?|Android|iPhone|iPod|Opera Mini|IEMobile|WPDesktop|BlackBerry|BB10|Silk-Accelerated)\b/i;
        const uaMobileMatch = reMobile.test(ua);

        // iPad-Erkennung (neue iPads melden sich als "Macintosh")
        const isProbablyIPad = /\biPad\b/i.test(ua) ||
            ((/MacIntel/i.test(platform) || /Macintosh/i.test(ua)) && maxTouchPoints > 1);

        // Android-Tablet (Android ohne "Mobile")
        const isAndroid = /\bAndroid\b/i.test(ua);
        const isAndroidTablet = isAndroid && !/\bMobile\b/i.test(ua);

        // Touch-Fähigkeit
        const isTouch = ('ontouchstart' in window) || maxTouchPoints > 0;
        const coarsePointer = matchMedia('(pointer: coarse)').matches;

        // Bildschirmgröße
        const screenWidth = screen.width || window.innerWidth;
        const screenHeight = screen.height || window.innerHeight;
        const small = screenWidth <= 820;
        const medium = screenWidth > 820 && screenWidth <= 1200;

        // Heuristiken
        const isPhone =
            uaDataMobile === true ||
            uaMobileMatch ||
            (isTouch && coarsePointer && small);

        const isTablet =
            isProbablyIPad ||
            isAndroidTablet ||
            (isTouch && coarsePointer && medium);

        const isMobile = isPhone || isTablet;

        return {
            isMobile,
            isPhone,
            isTablet,
            isTouchCapable: isTouch,
            screenWidth,
            screenHeight
        };
    }
}
