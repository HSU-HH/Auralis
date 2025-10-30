export class PageMenu {
    IsPinned = false;
    IsHidden = false;
    TogglePoint = 50;

    constructor(dom) {
        this.DOM = dom;

        this.DOM.add(".auralis-page-menu-block");
        this.DOM.add("#auralis-page-menu-pin-btn");
        this.DOM.add("#ilTab");
    }

    Init(events, cookies) {
        this.EventHandler = events;
        this.CookieManager = cookies;

        this.menu = this.DOM.get(".auralis-page-menu-block");
        this.btn = this.DOM.get("#auralis-page-menu-pin-btn");

        this.TogglePoint = this.menu.clientHeight;

        this.IsPinned = this.CookieManager.Values["PageMenuPinned"];
        if (this.IsPinned) {
            this.btn.classList.add("auralis-pinned");
        } else {
            if (this.btn.classList.contains("auralis-pinned")) {
                this.btn.classList.remove("auralis-pinned");
            }
        }

        if(!this.DOM.get("#ilTab")) {
            this.Hide();
        }

        if(this.DOM.IsDashboard || this.DOM.IsLoginScreen || this.DOM.IsLogoutScreen) {
            this.Hide();
        } else {
            this.EventHandler.AttachOnScroll(this.OnScroll.bind(this), true, false);
            this.EventHandler.AttachOnScreenSwitch(this.OnResize.bind(this));
            this.btn.addEventListener('click', this.OnPin.bind(this));
        }
    }

    Hide() {
        if (this.menu) {
            this.menu.style.display = 'none';
        }
    }

    OnPin() {
        this.IsPinned = !this.IsPinned;

        if (this.IsPinned) {
            this.btn.classList.add("auralis-pinned");
            if(this.menu.classList.contains("auralis-page-menu-hidden")) {
                this.menu.classList.remove("auralis-page-menu-hidden");
            }
            this.IsHidden = false;
        } else {
            if (this.btn.classList.contains("auralis-pinned")) {
                this.btn.classList.remove("auralis-pinned");
            }
        }

        this.CookieManager.Values["PageMenuPinned"] = this.IsPinned;
        this.CookieManager.Update();
    }

    OnScroll() {
        if(!this.IsPinned) {
            if (this.EventHandler.CurrentScrollableElement.scrollTop > this.TogglePoint && !this.IsHidden) {
                this.menu.classList.add("auralis-page-menu-hidden");
                this.IsHidden = true;
            } else if(this.EventHandler.CurrentScrollableElement.scrollTop <= this.TogglePoint && this.IsHidden) {
                this.menu.classList.remove("auralis-page-menu-hidden");
                this.IsHidden = false;
            }
        } else {
            if(this.menu.classList.contains("auralis-page-menu-hidden")) {
                this.menu.classList.remove("auralis-page-menu-hidden");
            }
        }
    }

    OnResize() {
        if(this.EventHandler.IsMobileView) {
            if(this.menu.classList.contains("auralis-page-menu-hidden")) {
                this.menu.classList.remove("auralis-page-menu-hidden");
            }
        } else {
            if(this.IsPinned) {
                this.IsHidden = false;
                if(this.menu.classList.contains("auralis-page-menu-hidden")) {
                    this.menu.classList.remove("auralis-page-menu-hidden");
                }
                if(!this.btn.classList.contains("auralis-pinned")) {
                    this.btn.classList.add("auralis-pinned");
                }
            } else {
                if (this.EventHandler.CurrentScrollableElement.scrollTop > this.TogglePoint) {
                    this.menu.classList.add("auralis-page-menu-hidden");
                    this.IsHidden = true;
                } else {
                    if(this.menu.classList.contains("auralis-page-menu-hidden")){
                        this.menu.classList.remove("auralis-page-menu-hidden");
                    }
                    this.IsHidden = false;
                }
            }
        }
    }
}