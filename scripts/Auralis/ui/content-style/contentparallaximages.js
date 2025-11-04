export class ContentParallaxImages {
    constructor(dom) {
        this.DOM = dom;
        this.parallaxElements = [];

        this.DOM.add(".ilc_section_Parallax");
        this.DOM.add('[class^=\"ilc_media_cont_\"]');
    }

    Init(events) {
        this.EventHandler = events;

        if(this.DOM.IsPageEditing) {
            this.InitParallaxImagesEditor();
        } else {
            this.InitParallaxImages();

            this.EventHandler.AttachOnScroll(this.OnScroll.bind(this));
        }
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

    InitParallaxImages() {
        const parallaxContainers = this.DOM.getAll(".ilc_section_Parallax");

        if (!parallaxContainers || parallaxContainers.length === 0) return;

        parallaxContainers.forEach(parallaxContainer => {
            const img = parallaxContainer.querySelector('img');
            const fig = parallaxContainer.querySelector('figure');

            if (!img) return;

            const src = img.getAttribute("data-src") || img.getAttribute("src") || img.src;
            if (!src) return;

            const parallaxImage = document.createElement('div');
            parallaxImage.classList.add("auralis-parallax-image");
            parallaxImage.style.backgroundImage = `url("${src}")`;
            parallaxContainer.prepend(parallaxImage);


            if (fig && fig.parentElement) {
                fig.parentElement.remove();
            }

            this.parallaxElements.push({
                container: parallaxContainer,
                image: parallaxImage
            });
        });
    }

    InitParallaxImagesEditor() {
        const parallaxContainers = this.DOM.getAll(".ilc_section_Parallax");

        if (!parallaxContainers || parallaxContainers.length === 0) return;

        parallaxContainers.forEach(parallaxContainer => {
            const img = parallaxContainer.querySelector("img");
            if (img) {
                const src = img.getAttribute("data-src") || img.getAttribute("src") || img.src;
                if (src) {
                    // Wenn Bildquelle bereits vorhanden, sofort verarbeiten
                    this.handleParallaxImage(img, parallaxContainer);
                } else {
                    // Wenn kein src vorhanden, auf spätere Änderung warten
                    this.waitForImageSrc(img, parallaxContainer);
                }
            }

            // 2️⃣ Beobachter für spätere MediaContainer einrichten
            const containerObserver = new MutationObserver(mutations => {
                for (const mutation of mutations) {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1 && node.classList.contains("ilc_media_cont_MediaContainer")) {
                            this.observeMediaContainer(node, parallaxContainer);
                        }
                    });
                }
            });

            containerObserver.observe(parallaxContainer, { childList: true, subtree: true });
        });
    }

    // Beobachtet den MediaContainer auf ein neues img-Element
    observeMediaContainer(mediaContainer, parallaxContainer) {
        const mediaObserver = new MutationObserver(mutations => {
            for (const mutation of mutations) {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1 && node.tagName === "IMG") {
                        mediaObserver.disconnect();
                        this.waitForImageSrc(node, parallaxContainer);
                    }
                });
            }
        });

        mediaObserver.observe(mediaContainer, { childList: true, subtree: true });
    }


// Wartet, bis das src-Attribut gesetzt ist
    waitForImageSrc(img, parallaxContainer) {
        const interval = setInterval(() => {
            const src = img.getAttribute("data-src") || img.getAttribute("src") || img.src;
            if (src) {
                clearInterval(interval);
                setTimeout(() => {
                    this.handleParallaxImage(img, parallaxContainer);
                }, 50);
            }
        }, 50);
    }


// Führt den Parallax-Erstellungscode aus
    handleParallaxImage(img, parallaxContainer) {
        const fig = parallaxContainer.querySelector('figure');
        const src = img.getAttribute("data-src") || img.getAttribute("src") || img.src;
        if (!src) return;

        const parallaxImage = document.createElement('div');
        parallaxImage.classList.add("auralis-parallax-image");
        parallaxImage.style.backgroundImage = `url("${src}")`;

        parallaxContainer.prepend(parallaxImage);
        parallaxContainer.style.removeProperty('position');

        if (fig && fig.parentElement) {
            fig.parentElement.remove();
        }

        this.parallaxElements.push({
            container: parallaxContainer,
            image: parallaxImage
        });
    }

    HandleParallaxMove() {
        const windowHeight = this.EventHandler.ClientHeight;

        if (!this.parallaxElements || this.parallaxElements.length === 0) return;

        this.parallaxElements.forEach(({ container, image }) => {
            const rect = container.getBoundingClientRect();
            const containerTop = rect.top;
            const containerHeight = rect.height;

            const visible = containerTop < windowHeight && containerTop + containerHeight > 0;
            if (!visible) return;

            const progress = 1 - (containerTop + containerHeight) / (windowHeight + containerHeight);
            const clampedProgress = Math.max(0, Math.min(1, progress));

            const topValue = clampedProgress * 100;
            image.style.backgroundPositionY = `${topValue}%`;
        });
    }

    OnScroll() {
        this.HandleParallaxMove();
    }
}