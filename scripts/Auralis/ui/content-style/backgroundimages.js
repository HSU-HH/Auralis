export class BackgroundImages {
    constructor(dom) {
        this.DOM = dom;

        this.DOM.add(".ilc_media_cont_BackgroundImage");
    }

    Init() {
        const bg_images = this.DOM.getAll(".ilc_media_cont_BackgroundImage");

        bg_images?.forEach((imgContainer) => {
            const parent = this.#FindParent(imgContainer);
            const image = imgContainer.querySelector("img");
            if (!parent || !image) return;

            const imageUrl = image.getAttribute("src");
            parent.style.backgroundImage = `url('${imageUrl}')`;
            parent.style.backgroundSize = "cover";
            parent.style.backgroundPosition = "center";
            parent.style.backgroundRepeat = "no-repeat";

            imgContainer.style.display = "none";
        });
    }

    #FindParent(element) {
        return element.closest('[class^="ilc_section_"], [class*=" ilc_section_"]');
    }
}