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

    HandleImageCaption(images) {
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

    InitParallaxImages() {
        const parallaxContainers = this.DOM.getAll(".ilc_section_Parallax");

        if (!parallaxContainers || parallaxContainers.length === 0) return;

        parallaxContainers.forEach(parallaxContainer => {
            const img = parallaxContainer.querySelector('img');
            const fig = parallaxContainer.querySelector('figure');

            //HandleImageCaption(fig);

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