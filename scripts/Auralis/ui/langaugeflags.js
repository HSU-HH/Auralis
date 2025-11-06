export class LanguageFlags {

    constructor(dom, icon_path) {
        this.Icons = {
            "English": "english-gb.svg",
            "Deutsch": "german.svg",
            "Italienisch": "italy.svg",
            "Französisch": "french.svg"
        };

        this.DOM = dom;
        this.icon_path = icon_path;

        this.DOM.add(".il-maincontrols-slate-content ul li");
    }

    Init() {
        const buttons = this.DOM.getAll(".il-maincontrols-slate-content ul li");

        buttons?.forEach((button) => {
            const labelSpan = button.querySelector(".bulky-label");
            const imgElement = button.querySelector("img.icon.none.small");

            if (labelSpan && imgElement) {
                const labelText = labelSpan.textContent.trim();

                if (this.Icons[labelText]) {
                    imgElement.src = this.icon_path + this.Icons[labelText];
                    imgElement.style.filter = "unset";
                }
            }
        });
    }
}