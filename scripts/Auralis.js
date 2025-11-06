function Initialize(instance, debugText, ...args) {
    if (!instance || typeof instance.Init !== "function") {
        console.debug(`Error: ${debugText} — keine gültige Init()-Methode gefunden.`);
        return;
    }

    try {
        instance.Init(...args); // alle zusätzlichen Parameter weitergeben
    } catch (error) {
        console.debug(`Error: ${debugText}`, error);
    }
}

async function InitAuralis() {
    const flag_icon_path = "Customizing/global/skin/auralis/images/icons/languages/";

    const Utils = await import('./Auralis/common/utils.js');
    const { DOM } = await import('./Auralis/common/dom.js');
    const { DeviceHandler } = await import('./Auralis/services/devicehandler.js');
    const { EventHandler } = await import('./Auralis/services/eventhandler.js');
    const { CookieManager } = await import('./Auralis/services/cookiemanager.js');
    const { ContentLoader } = await import('./Auralis/ui/contentloader.js');
    const { LanguageFlags } = await import('./Auralis/ui/langaugeflags.js');
    const { CopyLink } = await import('./Auralis/ui/copylink.js');
    const { PagePositionMarker } = await import('./Auralis/ui/pagepositionmarker.js');
    const { ScrollToTop } = await import('./Auralis/ui/scrolltotop.js');
    const { PageMenu } = await import('./Auralis/ui/pagemenu.js');

    // Content-Style-Modifications
    const { ContentSpacer } = await import('./Auralis/ui/content-style/contentspacer.js');
    const { ContentBannerImages } = await import('./Auralis/ui/content-style/contentbannerimages.js');
    const { ContentParallaxImages } = await import('./Auralis/ui/content-style/contentparallaximages.js');
    const { ContentImages } = await import('./Auralis/ui/content-style/contentimages.js');
    const { ContentFlipCards } = await import('./Auralis/ui/content-style/contentflipcards.js');
    const { BackgroundImages } = await import('./Auralis/ui/content-style/backgroundimages.js');

    const device = new DeviceHandler();
    const cookies = new CookieManager("Auralis-Settings");
    const dom = new DOM(Utils);
    const eventhandler = new EventHandler(Utils, dom, device);
    const contentloader = new ContentLoader(dom);
    const languageflags = new LanguageFlags(dom, flag_icon_path);
    const copylink = new CopyLink(dom);
    const pagemarker = new PagePositionMarker(Utils, dom);
    const scrollToTop = new ScrollToTop(Utils, dom);
    const pagemenu = new PageMenu(dom);

    const style_spacer = new ContentSpacer(dom);
    const style_bannerimages = new ContentBannerImages(dom);
    const style_parallaximages = new ContentParallaxImages(dom);
    const style_images = new ContentImages(dom);
    const style_flipcards = new ContentFlipCards(dom, eventhandler, Utils);
    const style_bg_images = new BackgroundImages(dom);


    // Objekt-Klassen anhand der URL festlegen
    dom.addObjectClass("ilwikihandlergui", "auralis-wiki");
    dom.addObjectClass("ilobjwikigui", "auralis-wiki");
    dom.addObjectClass("ilDashboardGUI", "auralis-dashboard");
    dom.addObjectClass("ilmembershipoverviewgui", "auralis-memberships");
    dom.addObjectClass("ilCalendarPresentationGUI", "auralis-calendar");
    dom.addObjectClass("ilUserCertificateGUI", "auralis-certifications");
    dom.addObjectClass("ilObjBlogGUI", "auralis-blog");
    dom.addObjectClass("ilobjsurveygui", "auralis-survey");
    dom.addObjectClass("ilobjtestgui", "auralis-test");
    dom.addObjectClass("ilDclRecordListGUI", "auralis-datacollection");


    dom.Init();
    contentloader.Init();

    // Execute Modifications
    Initialize(eventhandler, "Error: Initialize EventHandler()");
    Initialize(cookies, "Error: Initialize CookieManager()");

    Initialize(copylink, "Error: Initlialize CopyLink()");
    Initialize(scrollToTop, "Error: Initialize ScrollToTop()", eventhandler);
    Initialize(pagemarker, "Error: Initialize PagePositionMarker()", eventhandler);
    Initialize(pagemenu, "Error: Initialize PageMenu()", eventhandler, cookies);
    Initialize(languageflags, "Error: Initialize LanguageFlags()");

    Initialize(style_spacer, "Error: Initialize ContentSpacer()");
    Initialize(style_images, "Error: Initialize ContentImages()");
    Initialize(style_bannerimages, "Error: Initialize ContentBannerImages()");
    Initialize(style_parallaximages, "Error: Initialize ContentParallaxImages()", eventhandler);
    Initialize(style_bg_images, "Error: Initialize ContentBackgroundImages()");
    Initialize(style_flipcards, "Error: Initialize ContentFlipCards()");

    contentloader.ShowContent();
}


InitAuralis();
