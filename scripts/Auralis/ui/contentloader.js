export class ContentLoader {
    constructor(dom) {
        this.DOM = dom;
        this.DOM.add(".auralis-content-loader");
        this.DOM.add(".auralis-content-hidden");
        this.DOM.add(".auralis-page-toolbar");
        this.DOM.add("#mainspacekeeper");
    }

    Init() {
    }

    ShowContent() {
        this.DOM.get('.auralis-content-loader')?.classList.add("auralis-hidden");
        this.DOM.getAll(".auralis-content-hidden")?.forEach(el => {
            el.classList.remove("auralis-content-hidden");
        });

        setTimeout(() => {
            this.DOM.get(".auralis-page-toolbar")?.classList.add("auralis-visible");
            this.DOM.get("#mainspacekeeper")?.classList.add("fade-in");
        }, 50);

        window.addEventListener("beforeunload", () => {
            this.DOM.get(".auralis-page-toolbar")?.classList.remove("auralis-visible");
            this.DOM.get(".auralis-page-toolbar")?.classList.add("auralis-invisible");
            this.DOM.get("#mainspacekeeper")?.classList.remove("fade-in");
            this.DOM.get("#mainspacekeeper")?.classList.add("fade-out");
        });
    }
}