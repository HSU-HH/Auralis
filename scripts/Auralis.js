async function InitAuralis() {
    const Utils = await import('./Auralis/common/utils.js');
    const { DOM } = await import('./Auralis/common/dom.js');
    const { DeviceHandler } = await import('./Auralis/services/devicehandler.js');
    const { EventHandler } = await import('./Auralis/services/eventhandler.js');
    const { CookieManager } = await import('./Auralis/services/cookiemanager.js');
    const { ContentLoader } = await import('./Auralis/ui/contentloader.js');
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

    const device = new DeviceHandler();
    const cookies = new CookieManager("Auralis-Settings");
    const dom = new DOM(Utils);
    const eventhandler = new EventHandler(Utils, dom, device);
    const contentloader = new ContentLoader(dom);
    const copylink = new CopyLink(dom);
    const pagemarker = new PagePositionMarker(Utils, dom);
    const scrollToTop = new ScrollToTop(Utils, dom);
    const pagemenu = new PageMenu(dom);

    const style_spacer = new ContentSpacer(dom);
    const style_bannerimages = new ContentBannerImages(dom);
    const style_parallaximages = new ContentParallaxImages(dom);
    const style_images = new ContentImages(dom);
    const style_flipcards = new ContentFlipCards(dom, eventhandler, Utils);


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
    try {
        eventhandler.Init();
    } catch {
        console.debug("Error: Initialize EventHandler()");
    }
    try {
        cookies.Init();
    } catch {
        console.debug("Error: Initialize CookieManager()");
    }


    try {
        copylink.Init();
    } catch {
        console.debug("Error: Initlialize CopyLink()");
    }
    try {
        scrollToTop.Init(eventhandler);
    } catch {
        console.debug("Error: Initialize ScrollToTop()");
    }
    try {
        pagemarker.Init(eventhandler);
    } catch {
        console.debug("Error: Initialize PagePositionMarker()");
    }
    try {
        pagemenu.Init(eventhandler, cookies);
    } catch {
        console.debug("Error: Initialize PageMenu()");
    }

    try {
        style_spacer.Init();
    } catch {
        console.debug("Error: Initialize ContentSpacer()");
    }
    try {
        style_images.Init();
    } catch {
        console.debug("Error: Initialize ContentImages()");
    }
    try {
        style_bannerimages.Init(eventhandler);
    } catch {
        console.debug("Error: Initialize ContentBannerImages()");
    }
    try {
        style_parallaximages.Init(eventhandler);
    } catch {
        console.debug("Error: Initialize ContentParallaxImages()");
    }
    try {
        style_flipcards.Init();
    } catch {
        console.debug("Error: Initialize ContentFlipCards()");
    }

    contentloader.ShowContent();
}


InitAuralis();
