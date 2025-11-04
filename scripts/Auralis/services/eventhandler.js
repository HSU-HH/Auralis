export class EventHandler {
    CurrentScrollableElement = null;
    DocScroll = null;
    WinScroll = null;
    ScrollPosition = 0;
    ScrollHeight = 0;
    ClientHeight = 0;
    IsMobileView = false;
    PrevScreenSize = 0;
    CurrScreenSize = 0;

    constructor(utils, dom, device) {
        this.Utils = utils;
        this.DOM = dom;
        this.Device = device;

        this.resizeCallbacks = [];
        this.scrollDesktopCallbacks = [];
        this.scrollMobileCallbacks = [];
        this.screenSwitchCallbacks = [];
        this.touchStartCallbacks = [];
        this.touchMoveCallbacks = [];
        this.touchEndCallbacks = [];

        this.PrevScreenSize = window.innerWidth;
        this.CurrScreenSize = window.innerWidth;

        this.DOM.add("main");
        this.DOM.add(".il-card");
        this.DOM.add(".alert");

        this.OnTouchStart = this.OnTouchStart.bind(this);
        this.OnTouchMove = this.OnTouchMove.bind(this);
        this.OnTouchEnd = this.OnTouchEnd.bind(this);

        this.Touch = new Map();
        this.PrevTouch = new Map();
    }

    Init() {
        this.DocScroll = this.DOM.get("main");
        this.WinScroll = document.scrollingElement;

        window.addEventListener('resize', () => this.OnResize(this));
        window.addEventListener('scroll', () => this.OnScroll(this));
        this.DocScroll.addEventListener('scroll', () => this.OnScroll(this));

        if (this.Utils.getScreenWidth() > 991) {
            this.CurrentScrollableElement = this.DocScroll;
            this.IsMobileView = false;
        } else {
            this.CurrentScrollableElement = this.WinScroll;
            this.IsMobileView = true;
        }

        this.ScrollPosition = this.CurrentScrollableElement.scrollTop;
        this.ScrollHeight = this.CurrentScrollableElement.scrollHeight;
        this.ClientHeight = this.CurrentScrollableElement.clientHeight;

        this.PrevScreenSize = this.CurrScreenSize;
        this.PrevScreenSize = window.innerWidth;

        this.AttachCloseOnLeave();
    }

    AttachOnResize(funcCallback) {
        if (typeof funcCallback === 'function' && !this.resizeCallbacks.includes(funcCallback)) {
            this.resizeCallbacks.push(funcCallback);
        }
    }

    DetachOnResize(funcCallback) {
        this.resizeCallbacks = this.resizeCallbacks.filter(fn => fn !== funcCallback);
    }

    AttachOnScroll(funcCallback, toDesktop = true, toMobile = true) {
        if(toDesktop === true) {
            if (typeof funcCallback === 'function' && !this.scrollDesktopCallbacks.includes(funcCallback)) {
                this.scrollDesktopCallbacks.push(funcCallback);
            }
        }
        if(toMobile === true) {
            if (typeof funcCallback === 'function' && !this.scrollMobileCallbacks.includes(funcCallback)) {
                this.scrollMobileCallbacks.push(funcCallback);
            }
        }
    }

    DetachOnScroll(funcCallback, fromDesktop, fromMobile) {
        if(fromDesktop) {
            this.scrollDesktopCallbacks = this.scrollDesktopCallbacks.filter(fn => fn !== funcCallback);
        }
        if(fromMobile) {
            this.scrollDesktopCallbacks = this.scrollDesktopCallbacks.filter(fn => fn !== funcCallback);
        }
    }

    AttachOnScreenSwitch(funcCallback) {
        if (typeof funcCallback === 'function' && !this.screenSwitchCallbacks.includes(funcCallback)) {
            this.screenSwitchCallbacks.push(funcCallback);
        }
    }

    DetachOnScreenSwitch(funcCallback) {
        this.screenSwitchCallbacks = this.screenSwitchCallbacks.filter(fn => fn !== funcCallback);
    }

    ScrollToPosition(page, offset) {
        const containerRect = this.CurrentScrollableElement.getBoundingClientRect();
        const elemRect = page.getBoundingClientRect();

        const currentScroll = this.CurrentScrollableElement.scrollTop;
        const targetTop = elemRect.top - containerRect.top + currentScroll - offset;
        const finalTop = Math.max(0, Math.floor(targetTop));

        this.CurrentScrollableElement.scrollTo({ top: finalTop, behavior: 'smooth' });
    }

    AttachCloseOnLeave() {
        this.DOM.getAll(".il-card").forEach(card => {
            card.addEventListener('mouseleave', function() {

                const dropdown = card.querySelector('.dropdown.open');
                if (dropdown) {
                    dropdown.classList.remove('open');
                }

                const button = dropdown ? dropdown.querySelector('button') : null;
                if (button) {
                    button.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    AttachOnTouch(funcStartCallback, funcMoveCallback, funcEndCallback) {
        if (typeof funcEndCallback === 'function' && !this.touchEndCallbacks.includes(funcEndCallback)) {
            if (typeof funcMoveCallback === 'function' && !this.touchMoveCallbacks.includes(funcMoveCallback)) {
                if (typeof funcStartCallback === 'function' && !this.touchStartCallbacks.includes(funcStartCallback)) {
                    this.touchStartCallbacks.push(funcStartCallback);
                    this.touchMoveCallbacks.push(funcMoveCallback);
                    this.touchEndCallbacks.push(funcEndCallback);
                }
            }
        }
    }

    HandleTouchCapability() {
        if(this.Device.HasTouch) {
            window.addEventListener("touchstart", this.OnTouchStart);
            window.addEventListener("touchmove", this.OnTouchMove);
            window.addEventListener("touchend", this.OnTouchEnd);
        } else {
            window.removeEventListener("touchstart", this.OnTouchStart);
            window.removeEventListener("touchmove", this.OnTouchMove);
            window.removeEventListener("touchend", this.OnTouchEnd);
        }
    }

    HandleTimer() {
        // const alert = this.DOM.get(".alert");
        // if (!alert) return;
        //
        // alert.style.transition = "opacity 1s ease";
        //
        // setTimeout(() => {
        //     alert.style.opacity = "0";
        //
        //     setTimeout(() => {
        //         alert.remove();
        //     }, 1000);
        // }, 5000);
    }

    //////////////////////////////////////////////////////////
    // Events
    //////////////////////////////////////////////////////////
    OnResize(e) {
        e.PrevScreenSize = e.CurrScreenSize;
        e.CurrScreenSize = window.innerWidth;

        this.HandleTouchCapability();

        if (e.PrevScreenSize <= 991 && e.CurrScreenSize > 991) {
            e.OnScreenSwitch(e);
        } else if (e.PrevScreenSize > 991 && e.CurrScreenSize <= 991) {
            e.OnScreenSwitch(e);
        }

        e.resizeCallbacks.forEach(fn => fn());
    }

    OnScroll(e) {
        e.ScrollPosition = e.CurrentScrollableElement.scrollTop;
        e.ScrollHeight = e.CurrentScrollableElement.scrollHeight;
        e.ClientHeight = e.CurrentScrollableElement.clientHeight;

        if(e.IsMobileView) {
            e.scrollMobileCallbacks.forEach(fn => fn());
        } else {
            e.scrollDesktopCallbacks.forEach(fn => fn());
        }
    }

    OnScreenSwitch(e) {
        if (e.Utils.getScreenWidth() > 991) {
            e.CurrentScrollableElement = e.DocScroll;
            e.IsMobileView = false;
        } else {
            e.CurrentScrollableElement = e.WinScroll;
            e.IsMobileView = true;
        }
        e.ScrollPosition = e.CurrentScrollableElement.scrollTop;
        e.ScrollHeight = e.CurrentScrollableElement.scrollHeight;
        e.ClientHeight = e.CurrentScrollableElement.clientHeight;

        e.screenSwitchCallbacks.forEach(fn => fn());
    }

    OnTouchStart(e) {
        for (let t of e.changedTouches) {
            this.PrevTouch.set(t.identifier, { X: 0, Y: 0})
            this.Touch.set(t.identifier, { X: t.clientX, Y: t.clientY, StartX: t.clientX, StartY: t.clientY, DeltaX: 0, DeltaY: 0 });
        }
        e.touchStartCallbacks.forEach(fn => fn());
    }

    OnTouchMove(e) {
        for (let t of e.changedTouches) {
            let dX = this.PrevTouch[t.identifier].X;
            let dY = this.PrevTouch[t.identifier].Y;
            this.PrevTouch.set(t.identifier, { X: this.Touch[t.identifier].X, Y: this.Touch[t.identifier].clientY})
            this.Touch.set(t.identifier, { X: t.clientX, Y: t.clientY, StartX: t.clientX, StartY: t.clientY, DeltaX: dX - t.clientX, DeltaY: dY - t.clientY });
        }
        e.touchMoveCallbacks.forEach(fn => fn());
    }

    OnTouchEnd(e) {
        for (let t of e.changedTouches) {
            this.PrevTouch.delete(t.identifier);
            this.Touch.delete(t.identifier);
        }
        e.touchEndCallbacks.forEach(fn => fn());
    }
}


