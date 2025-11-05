export class ContentFlipCards {
    constructor(dom, events, utils) {
        this.DOM = dom;
        this.EventHandler = events;
        this.Utils = utils;
        this.Size = 0;

        this.Cards = Array.from(document.querySelectorAll('.ilc_section_FlipCard')).map(card => {
            const front = card.querySelector('.ilc_section_FlipCardFront');
            const back = card.querySelector('.ilc_section_FlipCardBack');
            return {
                card,
                front,
                back,
                flipped: false,
                listeners: {}
            };
        });
    }

    Init() {
        if (!this.DOM.IsPageEditing) {
            this.Cards.forEach(c => {

                const wrapper = document.createElement('div');
                wrapper.className = 'flipcard-back-content';
                while (c.back.firstChild) {
                    wrapper.appendChild(c.back.firstChild);
                }
                c.back.appendChild(wrapper);
            });

            this.OnResize();
            this.EventHandler.AttachOnResize(this.OnResize.bind(this));
        }
    }

    OnMouseEnter(cardData) {
        cardData.front.style.transform = 'rotateY(-180deg) scaleX(-1)';
        cardData.back.style.transform = 'rotateY(0deg) scaleX(-1)';
        cardData.flipped = true;
    }

    OnMouseLeave(cardData) {
        cardData.front.style.transform = 'rotateY(0deg) scaleX(1)';
        cardData.back.style.transform = 'rotateY(180deg) scaleX(-1)';
        cardData.flipped = false;
    }

    AttachDesktopEvents(c) {
        // Listener definieren und speichern
        c.listeners.mouseenter = () => this.OnMouseEnter(c);
        c.listeners.mouseleave = () => this.OnMouseLeave(c);

        // Events anhängen
        c.card.addEventListener('mouseenter', c.listeners.mouseenter);
        c.card.addEventListener('mouseleave', c.listeners.mouseleave);
    }

    DetachDesktopEvents(c) {
        if (c.listeners.mouseenter) {
            c.card.removeEventListener('mouseenter', c.listeners.mouseenter);
        }
        if (c.listeners.mouseleave) {
            c.card.removeEventListener('mouseleave', c.listeners.mouseleave);
        }
    }

    AttachMobileEvents(c) {
        c.listeners.click = () => {
            this.Cards.forEach(other => {
                if (other !== c && other.flipped) {
                    this.OnMouseLeave(other);
                }
            });

            if (c.flipped) {
                this.OnMouseLeave(c);
            } else {
                this.OnMouseEnter(c);
            }
        };

        c.card.addEventListener('click', c.listeners.click);
    }

    DetachMobileEvents(c) {
        if (c.listeners.click) {
            c.card.removeEventListener('click', c.listeners.click);
        }
    }

    OnResize() {
        const newWidth = this.Utils.getScreenWidth();

        if (newWidth !== this.Size) {
            const isDesktop = newWidth > 991;

            this.Cards.forEach(c => {
                this.DetachDesktopEvents(c);
                this.DetachMobileEvents(c);

                if (isDesktop) {
                    this.AttachDesktopEvents(c);
                } else {
                    c.flipped = false;
                    this.AttachMobileEvents(c);
                }
            });
        }

        this.Size = newWidth;
    }
}

