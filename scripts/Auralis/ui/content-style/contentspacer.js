export class ContentSpacer {
    constructor(dom) {
        this.DOM = dom;

        this.DOM.add('#il-edit-cont');
    }

    Init() {
        if(this.DOM.get('#il-edit-cont')) {
            const spacerElements = Array.from(document.querySelectorAll('*')).filter(el =>
                Array.from(el.classList).some(c => c.startsWith('ilc_section_Spacer'))
            );

            spacerElements?.forEach(el => {
                el?.style?.removeProperty('min-height');
                el?.style?.removeProperty('height');
            })
        }
    }
}