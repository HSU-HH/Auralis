export class ScrollToTop {
    constructor(utils, dom) {
        this.Utils = utils;
        this.DOM = dom;

        this.DOM.add("#auralis-page-top");
        this.DOM.add(".auralis-scroll-to-top-button");
    }

    Init(events) {
        this.EventHandler = events;
        this.button = this.DOM.get(".auralis-scroll-to-top-button");
        this.page_top = this.DOM.get("#auralis-page-top");

        this.EventHandler.AttachOnScroll(this.OnScroll.bind(this));
        this.button.addEventListener('click', this.OnClick.bind(this));
    }

    OnScroll() {
        if (this.EventHandler.ScrollPosition > 50) {
            this.button.classList.remove('auralis-invisible');
        } else {
            this.button.classList.add('auralis-invisible');
        }
    }

    OnClick() {
        if(this.Utils.getScreenWidth() > 991) {
            const top = this.page_top;
            top.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
}