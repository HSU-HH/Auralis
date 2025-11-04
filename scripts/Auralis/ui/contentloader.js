export class ContentLoader {
    constructor(dom) {
        this.DOM = dom;
        this.DOM.add(".auralis-content-loader");
        this.DOM.add(".auralis-content-hidden");
        this.DOM.add(".auralis-page-toolbar");
    }

    ShowContent() {
        this.DOM.get('.auralis-content-loader')?.classList.add("auralis-hidden");
        this.DOM.get(".auralis-page-toolbar")?.classList.remove("auralis-hidden");
        this.DOM.getAll(".auralis-content-hidden")?.forEach(el => {
            el.classList.remove("auralis-content-hidden");
        });
    }
}