export class PagePositionMarker {
    constructor(utils, dom) {
        this.Utils = utils;
        this.DOM = dom;

        this.DOM.add(".auralis-mobile-page-position-marker");
        this.DOM.add(".auralis-page-position-marker");
    }

    Init(events) {
        this.EventHandler = events;
        this.mobileElement = this.DOM.get(".auralis-mobile-page-position-marker");
        this.scroll_element = this.DOM.get(".auralis-page-position-marker");

        this.EventHandler.AttachOnScroll(this.OnUpdate.bind(this), true, true);
        this.EventHandler.AttachOnScreenSwitch(this.OnUpdate.bind(this));
    }

    OnUpdate() {
        const scrollPosition = this.EventHandler.ScrollPosition;
        const docHeight = this.EventHandler.ScrollHeight - this.EventHandler.ClientHeight;
        let percentage = ((scrollPosition / docHeight) * 105) - 5;

        const secondValue = Math.min(percentage + 5, 100);
        percentage = Math.min(percentage, 100);
        percentage = Math.max(percentage, 0);

        this.mobileElement?.style.setProperty('--page-pos1', percentage + "%");
        this.mobileElement?.style.setProperty('--page-pos2', secondValue + "%");
        this.scroll_element?.style.setProperty('--page-pos1', percentage + "%");
        this.scroll_element?.style.setProperty('--page-pos2', secondValue + "%");
    }
}
