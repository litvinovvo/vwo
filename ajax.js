(function() {
    Moff.ajaxSystem = new function() {
        function u(a, b) {
            for (var c = [], d = b.length, e = 0; e < d; e++)
                c.push({
                    name: "" + a + "[]",
                    value: b[e]
                });
            return c
        }
        function p(a) {
            var b = window.location
              , b = $.extend({
                pushState: !0,
                popState: !0,
                preventRequest: !1,
                data: [],
                postData: [],
                baseUrl: "" + b.protocol + "//" + "b.host" + "" + b.pathname + "" + b.search
            }, a);
       
            if (!b.event) {
                a = JSON.stringify(q(a));
                var c = a.length
                  , d = 0
                  , e = 0
                  , h = void 0;
                if (0 === a.length)
                    a = d;
                else {
                    for (; e < c; e++)
                        h = a.charCodeAt(e),
                        d = (d << 5) - d + h,
                        d |= 0;
                    a = d.toString()
                }
                b.event = a
            }
            "function" === typeof b.success && b.pushState && (k.addSuccessCallback(b.moduleId, [b.event], b.success),
            delete b.success);
            b.preloader && "function" === typeof b.preloader.show && "function" === typeof b.preloader.hide && b.pushState && (k.addPreloader(b.moduleId, [b.event], b.preloader.show, b.preloader.hide),
            delete b.preloader);
            return b
        }
        function q(a) {
            var b = {};
            $.each(a, function(a, d) {
                $.isPlainObject(d) ? b[a] = q(d) : $.isFunction(d) && (b[a] = d.toString())
            });
            return b
        }
        function l(a) {
            return $.extend({
                getData: [],
                success: {},
                preloader: {}
            }, a || {})
        }
        function v(a) {
            var b = [];
            a.event && f[a.event] && f[a.event].getData.forEach(function(a) {
                return b = b.concat(a())
            });
            return b.concat(a.data).filter(function(b) {
                return "" !== b.value
            })
        }
        function n(a, b) {
            !1 !== a.preloader && a.event && f[a.event] && function() {
                var c = Object.keys(f[a.event].success).filter(function(b) {
                    return "undefined" !== b
                })
                  , d = Object.keys(f[a.event].preloader ? f[a.event].preloader : {})
                  , e = f[a.event].preloader
                  , h = {};
                if (1 < c.length)
                    k["" + b + "Preloader"]($(".container-global"), !0);
                else
                    c.forEach(function(a) {
                        if ("undefined" === typeof e[a])
                            k["" + b + "Preloader"]($(Moff.modules.getById(a).scope));
                        else
                            "function" === typeof e[a][b] && (h[a] = !0,
                            e[a][b]())
                    }),
                    d.forEach(function(a) {
                        if (!h[a] && "function" === typeof e[a][b])
                            e[a][b]()
                    })
            }();
            if (a.preloader && "function" === typeof a.preloader[b])
                a.preloader[b]();
            if (a.success && "undefined" === typeof a.preloader)
                k["" + b + "Preloader"]($(Moff.modules.getById(a.moduleId).scope))
        }
        function w(a, b) {
            a.event && f[a.event] && $.each(f[a.event].success, function(a, d) {
                d(b[a])
            });
            "function" === typeof a.success && a.success(b[a.moduleId])
        }
        function r(a) {
            n(a, "hide");
            var b = $('<div class="ajax-system-error js-ajax-system-error"><div class="ajax-system-error_inner">' + t + ' <a href="#" class="ajax-system-error_close js-ajax-error-close">x</a></div></div>').appendTo("body");
            b.find(".js-ajax-try-again").on("click", function(c) {
                k.request(a);
                b.remove();
                c.preventDefault()
            });
            b.find(".js-ajax-error-close").on("click", function(a) {
                b.remove();
                a.preventDefault()
            });
            "function" === typeof a.error && a.error()
        }
        var k = this
          , g = {}
          , f = {}
          , t = void 0;
        this.init = function() {
            var a = this;
            t = window.ajaxErrorMessage;
            delete window.ajaxErrorMessage;
            window.addEventListener("popstate", function(b) {
                b.state && b.state.popState && b.state.timestamp !== window.localStorage.getItem("lastAjaxWithPopState") && a.request(b.state)
            })
        }
        ;
        this.addGetDataCallback = function(a, b) {
            a.forEach(function(a) {
                f[a] = l(f[a]);
                f[a].getData.push(b)
            })
        }
        ;
        this.addSuccessCallback = function(a, b, c) {
            b.forEach(function(b) {
                f[b] = l(f[b]);
                f[b].success[a] = c
            })
        }
        ;
        this.addPreloader = function(a, b, c, d) {
            b.forEach(function(b) {
                f[b] = l(f[b]);
                f[b].preloader[a] = {
                    show: c,
                    hide: d
                }
            })
        }
        ;
        this.showPreloader = function(a, b) {
            function c() {
                var b = window.pageYOffset
                  , a = Math.max(Math.min(k, b + f), m) - Math.min(Math.max(m, b), k)
                  , b = Math.min(Math.max(Math.max(b - m, 0) + a / 2, 25), h - l / 2);
                g.css("top", b)
            }
            var d = void 0 === b ? !1 : b
              , e = $(a)
              , h = e.height()
              , f = window.innerHeight
              , m = e.offset().top
              , k = m + e.height()
              , g = void 0
              , l = void 0;
            e.hasClass("module-preloader") || (e.addClass("module-preloader").append('<div class="module-preloader_locker ' + (d ? "__upper" : "") + ' js-module-preloader-locker">\n\t\t\t\t\t\t<div class="module-preloader_overlay"></div>\n\t\t\t\t\t\t<div class="module-preloader_circle js-module-preloader-circle' + (100 > h ? " __small" : "") + "" + (Moff.detect.browser.msie ? " __ie" : "") + '">\n\t\t\t\t\t\t\t<svg class="preloader" width="' + (100 > h ? "25px" : "50px") + '"\n\t\t\t\t\t\t\t\theight="' + (100 > h ? "25px" : "50px") + '"\n\t\t\t\t\t\t\t\tviewbox="0 0 50 50">\n\t\t\t\t\t\t\t\t<circle class="preloader_background-circle" cx="25" cy="25" r="21px"></circle>\n\t\t\t\t\t\t\t\t<circle class="preloader_animated-circle" cx="25" cy="25" r="21px"></circle>\n\t\t\t\t\t\t\t\t<polyline class="preloader_checkmark" points="15,25 24,35 35,15"></polyline>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>'),
            g = e.find(".js-module-preloader-circle"),
            l = g.outerHeight(),
            c(),
            $(window).on("scroll.preloader", c))
        }
        ;
        this.hidePreloader = function(a) {
            $(window).off("scroll.preloader");
            $(a).removeClass("module-preloader").find(".js-module-preloader-locker:last").remove()
        }
        ;
        this.register = function(a) {
            var b = this;
            a.getDataCallbacks && a.getDataCallbacks.forEach(function(a) {
                return b.addGetDataCallback(a.on, a.callback)
            });
            a.successCallbacks && a.successCallbacks.forEach(function(c) {
                return b.addSuccessCallback(a.moduleId, c.on, c.callback)
            });
            a.preloaders && a.preloaders.forEach(function(c) {
                return b.addPreloader(a.moduleId, c.on, c.show, c.hide)
            })
        }
        ;
        this.request = function(a) {
            var b = p(a)
              , c = b.postData.length ? "POST" : "GET"
              , d = this.createURL(b)
              , e = b.postData.filter(function(b) {
                return "" !== b.value
            });
            n(b, "show");
            b.preventRequest && (!b.historyUrl && b.event && g[b.event] ? g[b.event].abort() : g.otherRequest && g.otherRequest.abort());
            c = $.ajax({
                type: c,
                url: d,
                data: e,
                dataType: "json",
                success: function(a) {
                    if ("object" === typeof a) {
                        w(b, a);
                        n(b, "hide");
                        k.changeCanonical({
                            canonical: a.canonical,
                            prev: a.prev,
                            next: a.next
                        });
                        var c = a.noindex
                          , e = $('head [content="noindex"]');
                        c && !e.length ? $("head").append('<meta name="robots" content="noindex">') : !c && e.length && e.remove();
                        b.popState && (b.timestamp = b.timestamp || Date.now().toString(),
                        window.localStorage.setItem("lastAjaxWithPopState", b.timestamp));
                        c = a.url;
                        e = a.title;
                        !b.historyUrl && Moff.detect.history && !1 !== b.pushState && c !== window.location.pathname + window.location.search && (b.preventRequest = !0,
                        b.historyUrl = d,
                        history.pushState(b, e, c));
                        e && Moff.detect.history && !1 !== b.pushState && (document.title = e);
                        $("body").append(a.javascript);
                        Moff.event.trigger("ajaxSystem:success");
                        Moff.event.trigger("ajaxSystem." + b.event + ":success")
                    } else
                        r(b),
                        Moff.event.trigger("ajaxSystem." + b.event + ":error")
                },
                error: function(a) {
                    "abort" !== a.statusText && (r(b),
                    Moff.event.trigger("ajaxSystem:error"),
                    Moff.event.trigger("ajaxSystem." + b.event + ":error"))
                }
            });
            a.preventRequest && (!a.historyUrl && a.event && g[a.event] ? g[a.event] = c : g.otherRequest = c)
        }
        ;
        this.createURL = function(a) {
            var b = void 0
              , c = void 0
              , d = [];
            if (a.historyUrl)
                return a.historyUrl;
            a = p(a);
            var e = v(a)
              , c = a.baseUrl + (-1 === a.baseUrl.indexOf("?") ? "?" : "&");
            a.event && f[a.event] ? (b = Object.keys(f[a.event].success),
            a.moduleId && -1 === b.indexOf(a.moduleId.toString()) && b.push(a.moduleId)) : b = [a.moduleId];
            a.action && d.push("_action=" + encodeURIComponent(a.action));
            d.push($.param(e.concat(u("_modules", b))));
            return 'https://sparkhyundai.dev.dealerfire.com.website.tp3.df-tp.com' + c + d.join("&");
        }
        ;
        this.changeCanonical = function(a) {
            $.each(a, function(a, c) {
                var d = $('head [rel="' + a + '"]');
                c ? d.length ? d.attr("href", c) : $("head").append('<link rel="' + a + '" href="' + c + '">') : d.length && d.remove()
            })
        }
    }
    ;
    Moff.ajaxSystem.init()
}
)();
