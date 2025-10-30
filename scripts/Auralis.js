async function InitAuralis() {
    const Utils = await import('./Auralis/common/utils.js');
    const { DOM } = await import('./Auralis/common/dom.js');
    const { EventHandler } = await import('./Auralis/common/eventhandler.js');
    const { CookieManager } = await import('./Auralis/common/cookiemanager.js');
    const { ContentLoader } = await import('./Auralis/common/contentloader.js');
    const { CopyLink } = await import('./Auralis/ui/copylink.js');
    const { PagePositionMarker } = await import('./Auralis/ui/pagepositionmarker.js');
    const { ScrollToTop } = await import('./Auralis/ui/scrolltotop.js');
    const { PageMenu } = await import('./Auralis/ui/pagemenu.js');

    const cookies = new CookieManager("Auralis-Settings");
    const dom = new DOM(Utils);
    const eventhandler = new EventHandler(Utils, dom);
    const contentloader = new ContentLoader(dom);
    const copylink = new CopyLink(dom);
    const pagemarker = new PagePositionMarker(Utils, dom);
    const scrollToTop = new ScrollToTop(Utils, dom);
    const pagemenu = new PageMenu(dom);

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

    contentloader.ShowContent();
}


InitAuralis();
