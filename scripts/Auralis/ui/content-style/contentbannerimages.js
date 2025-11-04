export class ContentBannerImages {
    constructor(dom) {
        this.DOM = dom;

        this.DOM.add(".ilc_media_cont_PageBanner");
        this.DOM.add(".ilc_media_cont_PageBanner50H");
        this.DOM.add(".auralis-banner-image");
        this.DOM.add(".auralis-banner-caption");
        this.DOM.add(".auralis-banner-copyright");
        this.DOM.add("#mainscrolldiv");
        this.DOM.add(".auralis-scroll-to-content");
        this.DOM.add('[class^=\"ilc_media_cont_\"]');
    }

    Init(events) {
        this.EventHandler = events;

        if(this.DOM.IsPageEditing) {
            this.DOM.get(".auralis-banner-image").remove();
            this.DOM.get(".auralis-banner-caption").remove();
        } else {
            this.InitBannerImages();
        }
    }

    InitBannerImages() {
        this.img_element = this.DOM.get(".auralis-banner-image");
        this.img_caption = this.DOM.get(".auralis-banner-caption");
        this.img_copyright = this.DOM.get(".auralis-banner-copyright");

        let img1 = this.DOM.getAll(".ilc_media_cont_PageBanner");
        let img2 = this.DOM.getAll(".ilc_media_cont_PageBanner50H");

        let img = [...img1, ...img2].sort((a, b) =>
            a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
        );
        if (img.length === 0) return this.ExitNoBannerImage();

        if (NodeList.prototype.isPrototypeOf(img) || Array.isArray(img)) {
            if (img.length === 0) return this.ExitNoBannerImage();
            img = img[0];
        }

        const container = img;
        const innerImg = container.querySelector("img");
        if (!innerImg)  return this.ExitNoBannerImage();

        const src = innerImg.getAttribute("data-src") || innerImg.getAttribute("src") || innerImg.src;
        if (!src)  return this.ExitNoBannerImage();

        this.img_element.style.backgroundImage = `url("${src}")`;
        const offset_h = this.DOM.SystemInfoHeight + this.DOM.HeaderHeight + this.DOM.BreadcrumbsHeight;
        if (img.classList.contains("ilc_media_cont_PageBanner")) {
            this.img_element.style.height = `calc(100vh - ${offset_h}px)`;
        }

        const figcaption = container.querySelector("figcaption > div");
        if (figcaption) {
            let text = figcaption.textContent;
            text = text.replace(/\(R\)/g, "®");

            const regexQuoted = /"([^"]*?)\(c\)([^"]*?)"/gi;
            const regexPlain = /\s*\(c\)\s*/gi;

            let matchQuoted = regexQuoted.exec(text);

            if (matchQuoted) {
                text = text.replace(matchQuoted[0], "").trim();
                const quotedText = matchQuoted[0].replace(/\(c\)/i, "").replace(/"/g, "").trim();
                this.img_copyright.textContent = quotedText;

                if(text !== "") {
                    this.img_caption.textContent = text;
                } else {
                    this.img_caption.remove();
                }
            } else if (/\(c\)/i.test(text)) {
                text = text.replace(regexPlain, "").trim();
                this.img_copyright.textContent = text;
                this.img_caption.remove();
            } else {
                this.img_caption.textContent = text;
                this.img_copyright.remove();
            }
        } else {
            this.img_caption.remove();
            this.img_copyright.remove();
        }

        const scroll_button = this.DOM.get(".auralis-scroll-to-content");
        this.content_top = this.DOM.get("#mainscrolldiv");

        if(scroll_button && this.content_top) {
            scroll_button.addEventListener('click', this.OnScrollToContent.bind(this));
        }

        container.remove();
    }

    HandleImageCaption() {
        const img_elements = this.DOM.getAll('[class^=\"ilc_media_cont_\"]');

        img_elements.forEach(element => {
            const figcaption = element.querySelector("figcaption > div");

            if (figcaption) {
                let text = figcaption.textContent;
                text = text.replace(/\(R\)/g, "®");

                const regexQuoted = /"([^"]*?)\(c\)([^"]*?)"/gi;
                const regexPlain = /\s*\(c\)\s*/gi;

                let matchQuoted = regexQuoted.exec(text);

                if (matchQuoted) {
                    text = text.replace(matchQuoted[0], "").trim();
                    const quotedText = matchQuoted[0].replace(/\(c\)/i, "").replace(/"/g, "").trim();
                    this.img_copyright.textContent = quotedText;

                    if(text !== "") {
                        this.img_caption.textContent = text;
                    } else {
                        this.img_caption.remove();
                    }
                } else if (/\(c\)/i.test(text)) {
                    text = text.replace(regexPlain, "").trim();
                    this.img_copyright.textContent = text;
                    this.img_caption.remove();
                } else {
                    this.img_caption.textContent = text;
                    this.img_copyright.remove();
                }
            }
        });
    }

    ExitNoBannerImage() {
        try {
            this.img_element.remove();
            this.img_caption.remove();
        } catch {
            console.debug("Error: ExitNoBannerImage");
        }
    }

    OnScrollToContent() {
        let offset = this.DOM.BreadcrumbsHeight;
        if(!offset) offset = 33;

        this.EventHandler.ScrollToPosition(this.DOM.get('#mainscrolldiv'), offset);
    }
}