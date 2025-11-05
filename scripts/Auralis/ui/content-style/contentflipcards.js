import {getScreenWidth} from "../../common/utils";

export class ContentFlipCards {
    constructor(dom, events, utils) {
        this.DOM = dom;
        this.EventHandler = events;
        this.Utils = utils;

        this.Cards = Array.from(document.querySelectorAll('.ilc_section_FlipCard')).map(card => {
            const front = card.querySelector('.ilc_section_FlipCardFront');
            const back = card.querySelector('.ilc_section_FlipCardBack');
            return { card, front, back, flipped: false };
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

    OnResize() {
        if(this.Utils.getScreenWidth() ) {

            this.Cards.forEach(c => {
                c.card.replaceWith(c.card.cloneNode(true));
            });

            if (!this.Device.IsMobile) {
                this.Cards.forEach(c => {
                    c.card.addEventListener('mouseenter', () => this.OnMouseEnter(c));
                    c.card.addEventListener('mouseleave', () => this.OnMouseLeave(c));
                });
            } else {
                this.Cards.forEach(c => {
                    c.flipped = false;
                    c.card.addEventListener('click', () => {
                        if (c.flipped) {
                            this.OnMouseLeave(c);
                        } else {
                            this.OnMouseEnter(c);
                        }
                    });
                });
            }
        }
        this.Size = this.Utils.getScreenWidth();
    }
}

