export class ContentImages {
    constructor(dom) {
        this.DOM = dom;
        this.parallaxElements = [];

        this.DOM.add('[class^="ilc_media_cont_Media"]');
    }

    Init() {
        const images = this.DOM.getAll('[class^="ilc_media_cont_Media"]');
        images.forEach(image => {
            const caption = image.querySelector(".ilc_media_caption_MediaCaption");
            const imgWrapper = image.querySelector(".ilc_Mob");
            const img = imgWrapper ? imgWrapper.querySelector("img") : null;

            if (!caption || !img) return;

            let text = caption.textContent.trim();
            let copyrightText = null;

            // Prüfen, ob (c) oder (C) enthalten ist
            const hasC = /\(c\)|\(C\)/.test(text);
            if (!hasC) return;

            // Prüfen, ob es in Anführungszeichen steht
            const quotedMatch = text.match(/["“”']([^"“”']*(?:\(c\)|\(C\))[^"“”']*)["“”']/);

            if (quotedMatch) {
                // Nur den Inhalt innerhalb der Anführungszeichen übernehmen
                copyrightText = quotedMatch[1]
                    .replace(/\(c\)|\(C\)/, "")
                    .trim();

                // Alles von den Anführungszeichen inklusive entfernen
                text = text.replace(quotedMatch[0], "").trim();
            } else {
                // Alles ab (c)/(C) entfernen und den Teil danach als Copyright übernehmen
                const cMatch = text.match(/(\(c\)|\(C\)).*$/);
                if (cMatch) {
                    copyrightText = cMatch[0]
                        .replace(/\(c\)|\(C\)/, "")
                        .trim();
                    text = text.replace(cMatch[0], "").trim();
                }
            }

            // Copyright-Element erzeugen
            if (copyrightText) {
                const copyright = document.createElement("div");
                copyright.classList.add("auralis-image-copyright");
                copyright.textContent = copyrightText;

                // Nach dem <img> einfügen
                img.insertAdjacentElement("afterend", copyright);
            }

            // Wenn der Text nach der Bereinigung leer ist → parent entfernen
            if (!text.length) {
                const parent = caption.parentElement;
                if (parent) parent.remove();
            } else {
                // Falls noch Text vorhanden ist, aktualisieren
                caption.textContent = text;
            }
        });
    }


    // InitBannerImages() {
    //     this.img_element = this.DOM.get(".hsu-banner-image");
    //     this.img_caption = this.DOM.get(".hsu-banner-caption");
    //     this.img_copyright = this.DOM.get(".hsu-banner-copyright");
    //
    //     let img1 = this.DOM.getAll(".ilc_media_cont_PageBanner");
    //     let img2 = this.DOM.getAll(".ilc_media_cont_PageBanner50H");
    //
    //     let img = [...img1, ...img2].sort((a, b) =>
    //         a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
    //     );
    //     if (img.length === 0) return this.ExitNoBannerImage();
    //
    //     if (NodeList.prototype.isPrototypeOf(img) || Array.isArray(img)) {
    //         if (img.length === 0) return this.ExitNoBannerImage();
    //         img = img[0];
    //     }
    //
    //     const container = img;
    //     const innerImg = container.querySelector("img");
    //     if (!innerImg) return this.ExitNoBannerImage();
    //
    //     const src = innerImg.getAttribute("data-src") || innerImg.getAttribute("src") || innerImg.src;
    //     if (!src) return this.ExitNoBannerImage();
    //
    //     this.img_element.style.backgroundImage = `url("${src}")`;
    //     const offset_h = this.DOM.SystemInfoHeight + this.DOM.HeaderHeight + this.DOM.BreadcrumbsHeight;
    //     if (img.classList.contains("ilc_media_cont_PageBanner")) {
    //         this.img_element.style.height = `calc(100vh - ${offset_h}px)`;
    //     }
    //
    //     const figcaption = container.querySelector("figcaption > div");
    //     if (figcaption) {
    //         let text = figcaption.textContent;
    //         text = text.replace(/\(R\)/g, "®");
    //
    //         const regexQuoted = /"([^"]*?)\(c\)([^"]*?)"/gi;
    //         const regexPlain = /\s*\(c\)\s*/gi;
    //
    //         let matchQuoted = regexQuoted.exec(text);
    //
    //         if (matchQuoted) {
    //             text = text.replace(matchQuoted[0], "").trim();
    //             const quotedText = matchQuoted[0].replace(/\(c\)/i, "").replace(/"/g, "").trim();
    //             this.img_copyright.textContent = quotedText;
    //
    //             if (text !== "") {
    //                 this.img_caption.textContent = text;
    //             } else {
    //                 this.img_caption.remove();
    //             }
    //         } else if (/\(c\)/i.test(text)) {
    //             text = text.replace(regexPlain, "").trim();
    //             this.img_copyright.textContent = text;
    //             this.img_caption.remove();
    //         } else {
    //             this.img_caption.textContent = text;
    //             this.img_copyright.remove();
    //         }
    //     } else {
    //         return this.ExitNoBannerImage();
    //     }
    //
    //     const scroll_button = this.DOM.get(".hsu-scroll-to-content");
    //     this.content_top = this.DOM.get("#mainscrolldiv");
    //
    //     if (scroll_button && this.content_top) {
    //         scroll_button.addEventListener('click', this.OnScrollToContent.bind(this));
    //     }
    //
    //     container.remove();
    // }
    //
    // HandleImageCaption() {
    //     const img_elements = this.DOM.getAll('[class^=\"ilc_media_cont_\"]');
    //
    //     img_elements.forEach(element => {
    //         const figcaption = element.querySelector("figcaption > div");
    //
    //         if (figcaption) {
    //             let text = figcaption.textContent;
    //             text = text.replace(/\(R\)/g, "®");
    //
    //             const regexQuoted = /"([^"]*?)\(c\)([^"]*?)"/gi;
    //             const regexPlain = /\s*\(c\)\s*/gi;
    //
    //             let matchQuoted = regexQuoted.exec(text);
    //
    //             if (matchQuoted) {
    //                 text = text.replace(matchQuoted[0], "").trim();
    //                 const quotedText = matchQuoted[0].replace(/\(c\)/i, "").replace(/"/g, "").trim();
    //                 this.img_copyright.textContent = quotedText;
    //
    //                 if (text !== "") {
    //                     this.img_caption.textContent = text;
    //                 } else {
    //                     this.img_caption.remove();
    //                 }
    //             } else if (/\(c\)/i.test(text)) {
    //                 text = text.replace(regexPlain, "").trim();
    //                 this.img_copyright.textContent = text;
    //                 this.img_caption.remove();
    //             } else {
    //                 this.img_caption.textContent = text;
    //                 this.img_copyright.remove();
    //             }
    //         }
    //     });
    // }
    //
    // InitParallaxImages() {
    //     const parallaxContainers = this.DOM.getAll(".ilc_section_Parallax");
    //
    //     if (!parallaxContainers || parallaxContainers.length === 0) return;
    //
    //     parallaxContainers.forEach(parallaxContainer => {
    //         const img = parallaxContainer.querySelector('img');
    //         const fig = parallaxContainer.querySelector('figure');
    //
    //         if (!img) return;
    //
    //         const src = img.getAttribute("data-src") || img.getAttribute("src") || img.src;
    //         if (!src) return;
    //
    //         const parallaxImage = document.createElement('div');
    //         parallaxImage.classList.add("hsu-parallax-image");
    //         parallaxImage.style.backgroundImage = `url("${src}")`;
    //         parallaxContainer.prepend(parallaxImage);
    //
    //
    //         if (fig && fig.parentElement) {
    //             fig.parentElement.remove();
    //         }
    //
    //         this.parallaxElements.push({
    //             container: parallaxContainer,
    //             image: parallaxImage
    //         });
    //     });
    // }
    //
    // UpdateParallaxBlock() {
    //     this.ParallaxContainers = this.DOM.getAll(".ilc_section_Parallax");
    // }
    //
    // ObserveMediaContainerImage(mediaContainer) {
    //     const img = mediaContainer.querySelector("img");
    //     if (!img) return;
    //
    //     const imgObserver = new MutationObserver((mutationsList) => {
    //         for (const mutation of mutationsList) {
    //             if (
    //                 mutation.type === "attributes" &&
    //                 mutation.attributeName === "src" &&
    //                 img.src
    //             ) {
    //                 // UpdateEditorView();
    //             }
    //         }
    //     });
    //
    //     imgObserver.observe(img, {attributes: true, attributeFilter: ["src"]});
    // }
    //
    //
    // ObserveMediaContainer(parallaxEl) {
    //     const mediaObserver = new MutationObserver((mutationsList) => {
    //         for (const mutation of mutationsList) {
    //             if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
    //                 mutation.addedNodes.forEach((node) => {
    //                     if (
    //                         node.nodeType === Node.ELEMENT_NODE &&
    //                         node.classList.contains("ilc_media_cont_MediaContainer")
    //                     ) {
    //                         this.ObserveMediaContainerImage(node);
    //                     }
    //
    //                     // Falls tief verschachtelt hinzugefügt wird:
    //                     const nestedMedia = node.querySelector(".ilc_media_cont_MediaContainer");
    //                     if (nestedMedia) {
    //                         this.ObserveMediaContainerImage(nestedMedia);
    //                     }
    //                 });
    //             }
    //         }
    //     });
    //
    //     mediaObserver.observe(parallaxEl, {childList: true, subtree: true});
    // }
    //
    // InitEditorObserver() {
    //     const parallaxObserver = new MutationObserver((mutationsList) => {
    //         for (const mutation of mutationsList) {
    //             if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
    //                 mutation.addedNodes.forEach((node) => {
    //                     if (node.nodeType !== Node.ELEMENT_NODE) return;
    //
    //                     if (node.classList.contains("ilc_section_Parallax")) {
    //                         // UpdateParallaxBlocks();
    //                         this.ObserveMediaContainer(node);
    //                     }
    //                 });
    //             }
    //         }
    //     });
    //
    //     parallaxObserver.observe(this.DOM.EditorContent, {childList: true, subtree: true});
    // }
    //
    //
    // InitParallaxImagesEditor() {
    //     // this.ObserveEditorView();
    //
    //     this.ParallaxContainers = this.DOM.getAll(".ilc_section_Parallax");
    //     if (!this.ParallaxContainers || this.ParallaxContainers.length === 0) return;
    //
    //     this.ParallaxContainers.forEach(parallaxContainer => {
    //         const img = parallaxContainer.querySelector('img');
    //         const fig = parallaxContainer.querySelector('figure');
    //
    //         if (!img) return;
    //
    //         const src = img.getAttribute("data-src") || img.getAttribute("src") || img.src;
    //         if (!src) return;
    //
    //         parallaxContainer.style.backgroundImage = `url("${src}")`;
    //         parallaxContainer.style.backgroundSize = 'cover';
    //
    //         img.setAttribute("src", "");
    //
    //         const br = parallaxContainer.querySelectorAll('br');
    //         if (br) {
    //             const lastBr = br[br.length - 1];
    //             lastBr.remove();
    //         }
    //
    //         const dropdown = parallaxContainer.querySelector('[data-copg-ed-type="add-area"]');
    //         if (dropdown) {
    //             // dropdown.style.display = "none";
    //             dropdown.insertAdjacentElement('beforebegin', document.createElement('br'));
    //             dropdown.remove();
    //         }
    //         // dropdowns[0].remove();
    //         // if(img) {
    //         //     img.remove();
    //         // }
    //
    //         // const parallaxImage = document.createElement('div');
    //         // parallaxImage.classList.add("hsu-parallax-image");
    //         // parallaxImage.style.backgroundImage = `url("${src}")`;
    //         // parallaxContainer.prepend(parallaxImage);
    //         //
    //         // if (fig && fig.parentElement) {
    //         //     fig.parentElement.remove();
    //         // }
    //         //
    //         // this.parallaxElements.push({
    //         //     container: parallaxContainer,
    //         //     image: parallaxImage
    //         // });
    //     });
    // }
    //
    // HandleParallaxMove() {
    //     const windowHeight = this.EventHandler.ClientHeight;
    //
    //     if (!this.parallaxElements || this.parallaxElements.length === 0) return;
    //
    //     this.parallaxElements.forEach(({container, image}) => {
    //         const rect = container.getBoundingClientRect();
    //         const containerTop = rect.top;
    //         const containerHeight = rect.height;
    //
    //         const visible = containerTop < windowHeight && containerTop + containerHeight > 0;
    //         if (!visible) return;
    //
    //         const progress = 1 - (containerTop + containerHeight) / (windowHeight + containerHeight);
    //         const clampedProgress = Math.max(0, Math.min(1, progress));
    //
    //         const topValue = clampedProgress * 100;
    //         image.style.backgroundPositionY = `${topValue}%`;
    //     });
    // }
    //
    // ExitNoBannerImage() {
    //     this.img_element.remove();
    //     this.img_caption.remove();
    // }
    //
    // OnScroll() {
    //     this.HandleParallaxMove();
    // }
    //
    // OnScrollToContent() {
    //     let offset = this.DOM.BreadcrumbsHeight;
    //     if (!offset) offset = 33;
    //
    //     this.EventHandler.ScrollToPosition(this.DOM.get('#mainscrolldiv'), offset);
    // }
}