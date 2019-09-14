function _toConsumableArray(h) {
    if (Array.isArray(h)) {
        for (var k = 0, t = Array(h.length); k < h.length; k++)
            t[k] = h[k];
        return t
    }
    return Array.from(h)
}
Moff.modules.create("HeaderTheme3", function() {
    function h() {
        var a = c.$find(b.searchBtn)
            , e = c.$find(b.searchBarWrapper);
        k();
        $(window).on("resize.header", Moff.utils.throttle(function() {
            return k()
        }, 350));
        a.on("click", function() {
            a.hasClass(d.searchBtnTriggered) ? (w.toggleClass(d.searchInnerShow),
                e.toggleClass(d.searchOveflow),
                setTimeout(function() {
                    return e.toggleClass(d.searchContainerShow)
                }, 350)) : (e.toggleClass(d.searchContainerShow),
                w.toggleClass(d.searchInnerShow),
                setTimeout(function() {
                    return e.toggleClass(d.searchOveflow)
                }, 350));
            a.toggleClass(d.searchBtnTriggered)
        })
    }
    function k() {
        w.css("height", p.find(b.mainBar).height())
    }
    function t() {
        var a = p.find(b.socialIconsList)
            , e = p.find(b.socialIconsToggle)
            , c = p.find(b.socialIconsFlyout);
        if (a.length)
            e.on("click", function(b) {
                e.toggleClass(d.socialIconsToggleActive);
                e.hasClass(d.socialIconsToggleActive) ? (c.toggleClass(d.socialIconsFlyoutContainerShow),
                    a.toggleClass(d.socialIconsListFlyout)) : (a.toggleClass(d.socialIconsListFlyout),
                    setTimeout(function() {
                        return c.toggleClass(d.socialIconsFlyoutContainerShow)
                    }, 350));
                b.preventDefault()
            })
    }
    function B() {
        u = c.$find(b.menu);
        x = c.$find(b.menuWrapper);
        y = c.$find(b.mainMenu);
        C = c.$find(b.flyOutPanel);
        L();
        M();
        N()
    }
    function O() {
        y.on("click", b.menuLink, function(a) {
            a = $(a.currentTarget);
            a = a.hasClass(b.vehicleMenuLink.slice(1)) ? a.find(b.vehicleMenuLinkTitle).text().trim() : a.text().trim();
            Moff.event.trigger("dsa.navigationClick", {
                data: {
                    LinkObject: {
                        text: a,
                        position: "topNav"
                    }
                }
            })
        })
    }
    function L() {
        c.$find(b.subMenuTrigger).on("click", function(a) {
            if (l) {
                var e = $(a.currentTarget)
                    , c = e.find(b.menuLinkIcon)
                    , f = e.siblings(b.subMenuCollapse);
                D(f, e, d.subMenuOpened, c);
                a.preventDefault()
            }
        });
        c.$find(b.menuLink).on("click", function() {
            if (/xs|sm/.test(Moff.getMode())) {
                var a = $(this)
                    , e = d.menuMobileCurrentLinkLevel[a.data("level") - 1];
                a.hasClass(b.subMenuTrigger.slice(1)) || (c.$find(d.menuMobileCurrentLinkLevel.map(function(a) {
                    return "." + a
                }).join(",")).removeClass(d.menuMobileCurrentLinkLevel.join(" ")),
                    a.addClass(e))
            }
        })
    }
    function P() {
        v.$block.on("click", function(a) {
            var e = v.hasMod("close");
            l && (e || E(),
                c.$find(b.subMenu).css({
                    paddingLeft: "",
                    paddingRight: ""
                }),
                Moff.event.trigger("fly-out-panel." + (e ? "hide" : "show"), "header-theme3-menu"),
                a.preventDefault())
        });
        Moff.event.on("fly-out-panel.show", function(a) {
            "header-theme3-menu" === a && v.close()
        });
        Moff.event.on("fly-out-panel.hide", function(a) {
            "header-theme3-menu" === a && (v.unClose(),
                setTimeout(function() {
                    return y.find("" + b.subMenuTrigger + "." + d.subMenuOpened).trigger("click")
                }, 300))
        })
    }
    function M() {
        c.$find(b.subMenuTrigger).on("click", function() {
            if (/md|lg/.test(Moff.getMode()) && Moff.detect.touch) {
                var a = $(this);
                a.data("toggled") || (event.preventDefault(),
                    a.data("toggled", !0))
            }
        });
        c.$find(b.menuParentTriggerLevel1).on("mouseleave", function() {
            /md|lg/.test(Moff.getMode()) && Moff.detect.touch && $(this).find(b.subMenuTrigger).data("toggled", !1)
        })
    }
    function N() {
        c.$find(b.menuParentTriggerLevel1).on("mouseenter", function() {
            if (!l) {
                var a = $(this).find("" + b.subMenu + ":first")
                    , e = a.find(b.vehicleSubMenu)
                    , n = Q(a)
                    , f = F()
                    , g = n > f ? f : n
                    , n = n > f ? "" : "hidden";
                a.css({
                    height: g,
                    top: "100%",
                    overflow: n
                });
                e.css({
                    "min-height": g,
                    overflow: n
                });
                c.$find(b.subMenuBackground).addClass(d.subMenuBackgroundShow).height(g)
            }
        }).on("mouseleave", function() {
            l || ($(this).find("" + b.subMenu + ":first, " + b.vehicleSubMenu).css({
                height: "",
                "min-height": ""
            }),
                c.$find(b.subMenuBackground).removeClass(d.subMenuBackgroundShow).removeAttr("style"))
        });
        c.$find("." + d.menuColums).on("click", b.subMenuTrigger, function(a) {
            if (l)
                return !1;
            var e = $(a.currentTarget)
                , n = e.find(b.menuLinkIcon)
                , f = e.siblings(b.subMenuCollapse)
                , g = e.parents(b.subMenuLevel2)
                , G = e.parents(b.subMenuInnerLevel2)
                , R = !!e.hasClass(d.subMenuOpened)
                , q = G.outerHeight()
                , h = $(window).height() - c.$find(b.subMenuBackground).offset().top + $(window).scrollTop() - 5
                , k = g.find(b.subMenuInnerLevel2).get().reduce(function(a, b) {
                var e = $(b)
                    , c = e.outerHeight();
                return !e.is(G) && c > a ? c : a
            }, 0)
                , r = f.outerHeight()
                , m = void 0;
            R ? m = q - r < k ? k : q - r : (r = S(f),
                m = q + r < k ? k : q + r);
            m > h && (m = h);
            g.height(m);
            c.$find(b.subMenuBackground).height(m);
            D(f, e, d.subMenuOpened, n);
            a.preventDefault();
            return !1
        })
    }
    function S(a) {
        a.css({
            position: "absolute",
            visibility: "hidden",
            display: "block",
            height: ""
        });
        var b = a.outerHeight();
        a.css({
            position: "",
            visibility: "",
            display: "",
            height: 0
        });
        return b
    }
    function D(a, c, n, f) {
        f = void 0 === f ? null : f;
        a.hasClass(d.collapsing) || (c.hasClass(n) ? (a.collapse("hide"),
            setTimeout(function() {
                a.find("" + b.subMenuTrigger + "." + d.subMenuOpened).trigger("click")
            }, 300)) : a.collapse("show"),
            c.toggleClass(n),
        f && f.toggleClass(d.menuLinkIconOpened))
    }
    function H() {
        /xs|sm/.test(Moff.getMode()) ? z("mobile") : (z("desktop"),
            x.css("overflow", "hidden"),
            z(u.outerWidth() > x.outerWidth() ? "mobile" : "desktop"),
            x.css("overflow", ""));
        T()
    }
    function z(a) {
        l = a = "mobile" === (void 0 === a ? "mobile" : a);
        u.toggleClass(d.menuDesktop, !a);
        I.toggleClass(d.menuTriggerHide, !a);
        Moff.cookie.set("headerTheme3isMenuMobile", a, {
            expires: 864E3,
            path: "/"
        });
        E()
    }
    function E() {
        var a = p.find(b.stickyContainer)
            , c = J.offset().top
            , d = window.pageYOffset
            , c = l ? p.outerHeight() - d + c : "";
        C.css({
            top: a.length ? c - a.position().top : c,
            height: l ? window.innerHeight - c : ""
        })
    }
    function T() {
        var a = c.$find(b.mainMenu)
            , e = c.$find("" + b.subMenuInnerLevel2 + ':not("' + b.vehicleMenu + '")');
        u.hasClass(d.menuDesktop) && $.each(e, function(c, e) {
            var g = $(e)
                , k = g.find(b.menuLinkIconLevel2)
                , h = g.width()
                , q = g.closest(b.menuParentTriggerLevel1)
                , l = g.find(b.subMenuLevel3)
                , p = g.parent(b.subMenu)
                , r = parseInt(g.css("padding-top"), 10)
                , m = !!g.parents("." + d.menuColums).length;
            if (!q.length)
                return !1;
            if (m)
                return !0;
            var m = document.documentElement.clientWidth
                , u = m - (a.offset().left + a.width())
                , v = m - (q.offset().left + h)
                , h = Math.min(m - (q.offset().left + h), 0)
                , q = !!h || !!Math.min(v - l.width(), 0);
            k.toggleClass(d.menuLinkIconRight, !!h);
            p.css({
                paddingLeft: h ? "calc(1000em - " + Math.abs(h - u) + "px)" : "1000em",
                paddingRight: m - (g.offset().left + p.width())
            });
            var k = l.map(function() {
                return $(this).height() + r
            }).get()
                , t = Math.max.apply(Math, [g.outerHeight()].concat(_toConsumableArray(k)))
                , w = Math.max(F(), t);
            $.each(l, function(a, c) {
                var e = $(c)
                    , d = e.closest(b.menuParentTrigger)
                    , g = d.position().top + d.outerHeight()
                    , d = d.position().top + e.height() > w
                    , g = e.height() + r < t ? g - t : g - e.height() - r;
                e.css({
                    top: d ? "auto" : "",
                    bottom: d ? g : ""
                })
            });
            l.toggleClass(d.subMenuRight, q);
            return !0
        })
    }
    function F() {
        return $(window).height() - c.$find(b.subMenuBackground).offset().top + $(window).scrollTop() - 5
    }
    function Q(a) {
        var c = a.find(b.menuParentTrigger)
            , d = a.find(b.subMenuInnerLevel3)
            , f = a.find(b.subMenuInner).get().reduce(function(a, b) {
            return Math.max(a, $(b).outerHeight())
        }, 0);
        c.length && d.length && (c = c.map(function() {
            var a = $(this).find(b.subMenuLevel3);
            return 0 > a.position().top ? a.outerHeight() : $(this).position().top + a.outerHeight()
        }).get(),
            f = Math.max.apply(Math, [f].concat(_toConsumableArray(c))));
        $.each(a.find(b.vehicleSubMenu), function() {
            f = Math.max(f, $(this).outerHeight())
        });
        return f
    }
    function U(a) {
        u.html($(a).find(b.menu).html());
        B()
    }
    var c = this
        , b = {
        wrapper: ".js-wrapper",
        menu: ".js-menu",
        menuWrapper: ".js-menu-wrapper",
        menuLink: ".js-menu-link",
        vehicleMenuLink: ".js-vehicle-menu-link",
        vehicleMenuLinkTitle: ".js-vehicle-menu-link-title",
        menuLinkIcon: ".js-icon",
        menuLinkIconLevel2: ".js-icon-level-2",
        mainMenu: ".js-main-menu",
        menuTrigger: ".js-menu-trigger",
        menuTriggerWrapper: ".js-menu-trigger-wrapper",
        menuParentTrigger: ".js-sub-menu-trigger-li",
        menuParentTriggerLevel1: ".js-sub-menu-trigger-li-level-1",
        menuParentTriggerLevel2: ".js-sub-menu-trigger-li-level-2",
        subMenu: ".js-sub-menu",
        subMenuLevel2: ".js-sub-menu-level-2",
        subMenuLevel3: ".js-sub-menu-level-3",
        subMenuInner: ".js-sub-menu-inner",
        subMenuInnerLevel2: ".js-sub-menu-inner-level-2",
        subMenuInnerLevel3: ".js-sub-menu-inner-level-3",
        subMenuTrigger: ".js-sub-menu-trigger",
        subMenuCollapse: ".js-sub-menu-collapse",
        subMenuBackground: ".js-sub-menu-background",
        vehicleMenu: ".js-vehicle-menu",
        vehicleSubMenu: ".js-vehicle-sub-menu",
        sticky: ".js-sticky",
        stickyContainer: ".js-sticky-container",
        flyOutPanel: ".js-fly-out-panel",
        mainBar: ".js-main-bar",
        socialIconsToggle: ".js-social-icons-toggle",
        socialIconsList: ".js-social-icons-list",
        socialIconsFlyout: ".js-social-icons-flyout",
        searchBar: ".js-header-search",
        searchBarWrapper: ".js-header-search-wrapper",
        searchBtn: ".js-search-btn"
    }
        , d = {
        hidden: "hidden",
        searchBtnTriggered: "search-btn_triggered",
        menuDesktop: "mod-menu_desktop",
        collapsing: "collapsing",
        menuLinkIconOpened: "menu-link__icon-state_opened",
        menuLinkIconRight: "menu-link__icon-state_right",
        menuMobileCurrentLinkLevel: ["menu-link_level-1-current-mobile", "menu-link_level-2-current-mobile", "menu-link_level-3-current-mobile"],
        menuTriggerHide: "top-bar__menu-toggle_hide",
        subMenuRight: "menu__sub-menu_right",
        subMenuOpened: "menu__link_sub-menu-opened",
        subMenuBackgroundShow: "sub-menu-background_show",
        socialIconsListFlyout: "social-icons__icon-list_show",
        socialIconsFlyoutContainerShow: "social-icons__flyout-container_show",
        socialIconsToggleActive: "social-icons__icon_toggle-active",
        searchContainerShow: "search-bar__flyout-container_show",
        searchInnerShow: "search-bar__flyout-inner_show",
        searchOveflow: "search-bar__flyout-container_overflow",
        menuColums: "menu__sub-menu_columns"
    }
        , l = !0
        , p = void 0
        , K = void 0
        , y = void 0
        , u = void 0
        , v = void 0
        , I = void 0
        , x = void 0
        , C = void 0
        , A = void 0
        , w = void 0
        , J = void 0;
    this.init = function() {
        var a = c.config.liveSearchState && "1" === c.config.liveSearchState;
        p = $(c.scope);
        K = Moff.modules.get("Sticky");
        A = c.$find(b.sticky);
        w = c.$find(b.searchBar);
        J = c.$find(b.wrapper);
        Moff.modules.initClass("HeaderContact", {
            id: c.id,
            scopeSelector: c.scopeSelector,
            data: c.data
        });
        a && Moff.modules.initClass("LiveSearch", {
            id: c.id,
            scopeSelector: c.scopeSelector,
            data: c.data.headerLiveSearch,
            config: c.config.liveSearchConfig
        });
        c.afterCssLoaded(function() {
            setTimeout(function() {
                v = BEM.findChildBlocksFirst($(c.scope), "menu-icon");
                I = c.$find(b.menuTriggerWrapper);
                P();
                B();
                l = !u.hasClass(d.menuDesktop);
                O();
                H();
                //$(window).on("resize.header", H);
                c.ajaxAddSuccessCallback(["inventory.filtering", "inventory.search"], U);
                t();
                A.length && K.initSticky(A);
                a && h()
            }, 0)
        })
    }
});
