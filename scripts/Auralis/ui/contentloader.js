export class ContentLoader {
    constructor(dom, events) {
        this.DOM = dom;
        this.EventHandler = events;

        this.DOM.add(".auralis-content-loader");
        this.DOM.add(".auralis-content-hidden");
        this.DOM.add(".auralis-page-menu-block");
        this.DOM.add("#mainspacekeeper");
    }

    Init() {
        this.EventHandler.AttachOnUnload(this.OnUnload());
    }

    OnUnload() {
        this.DOM.get(".auralis-page-menu-block")?.classList.add("auralis-invisible");
        this.DOM.get("#mainspacekeeper")?.classList.remove("fade-in");
        this.DOM.get("#mainspacekeeper")?.classList.add("fade-out");
    }

ShowContent() {
        this.DOM.get('.auralis-content-loader')?.classList.add("auralis-hidden");
        this.DOM.getAll(".auralis-content-hidden")?.forEach(el => {
            el.classList.remove("auralis-content-hidden");
        });

        setTimeout(() => {
            this.DOM.get(".auralis-page-menu-block")?.classList.remove("auralis-invisible");
            this.DOM.get("#mainspacekeeper")?.classList.remove("fade-out");
            this.DOM.get("#mainspacekeeper")?.classList.add("fade-in");
        }, 50);
    }
}