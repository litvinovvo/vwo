var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.findInternal = function(a, d, b) {
    a instanceof String && (a = String(a));
    for (var e = a.length, f = 0; f < e; f++) {
        var k = a[f];
        if (d.call(b, k, f, a))
            return {
                i: f,
                v: k
            }
    }
    return {
        i: -1,
        v: void 0
    }
}
;
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, d, b) {
    a != Array.prototype && a != Object.prototype && (a[d] = b.value)
}
;
$jscomp.getGlobal = function(a) {
    return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a
}
;
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, d, b, e) {
    if (d) {
        b = $jscomp.global;
        a = a.split(".");
        for (e = 0; e < a.length - 1; e++) {
            var f = a[e];
            f in b || (b[f] = {});
            b = b[f]
        }
        a = a[a.length - 1];
        e = b[a];
        d = d(e);
        d != e && null != d && $jscomp.defineProperty(b, a, {
            configurable: !0,
            writable: !0,
            value: d
        })
    }
}
;
$jscomp.polyfill("Array.prototype.find", function(a) {
    return a ? a : function(a, b) {
        return $jscomp.findInternal(this, a, b).v
    }
}, "es6", "es3");
Moff.modules.create("SocialLink", function() {
    function a() {
        window.inlineJS.push(function() {
            g.$find("" + c.instagram + c.openInLightbox).length && Moff.leftovers.push("//www.instagram.com/embed.js");
            g.$find("" + c.twitter + c.openInLightbox).length && Moff.leftovers.push("//platform.twitter.com/widgets.js")
        })
    }
    function d() {
        $(g.scope).on("click", "" + c.facebook + c.openInLightbox, function(a) {
            var b = encodeURIComponent($(a.currentTarget).attr("href"));
            h.openInlinePopup({
                maxWidth: 500,
                callbacks: {
                    afterOpen: function() {
                        var a = window.getComputedStyle(this.contentContainer[0])
                          , l = parseInt(a.paddingTop, 10)
                          , d = parseInt(a.paddingBottom, 10)
                          , c = parseInt(a.paddingLeft, 10)
                          , e = parseInt(a.paddingRight, 10)
                          , f = parseInt(a.marginTop, 10)
                          , n = parseInt(a.marginBottom, 10)
                          , g = parseInt(a.marginLeft, 10);
                        a = parseInt(a.marginRight, 10);
                        c = Math.min(window.innerWidth, 500) - c - e - g - a;
                        l = window.innerHeight - l - d - f - n;
                        this.content.html('<iframe \n\t\t\t\t\t\t\tsrc="https://www.facebook.com/plugins/page.php?' + ["href=" + b, "tabs=timeline", "width=" + c, "height=" + l, "small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false"].join("&") + '"\n\t\t\t\t\t\t\twidth="' + c + '"\n\t\t\t\t\t\t\theight="' + l + '"\n\t\t\t\t\t\t\tstyle="border: none; overflow: hidden; display: block;"\n\t\t\t\t\t\t\tscrolling="no"\n\t\t\t\t\t\t\tframeborder="0"\n\t\t\t\t\t\t\tallowTransparency="true"\n\t\t\t\t\t\t\tallow="encrypted-media\n\t\t\t\t\t\t\tstyle=""></iframe>')
                    }
                }
            });
            a.preventDefault()
        })
    }
    function b() {
        $(g.scope).on("click", "" + c.youtube + c.openInLightbox, function(a) {
            var b = $(a.currentTarget).attr("href").match(p);
            b && (b = b[2],
            h.openInlinePopup({
                maxWidth: 800,
                content: function() {
                    return '<div class="aspect-ratio-block __xs-16x9">\n\t\t\t\t\t\t<iframe src="//youtube.com/embed/' + b + '"\n\t\t\t\t\t\t\t\tstyle="position: absolute; height: 100%; width: 100%;"\n\t\t\t\t\t\t\t\tframeborder="0"\n\t\t\t\t\t\t\t\tallowfullscreen\n\t\t\t\t\t\t\t\tallowtransparency></iframe>\n\t\t\t\t\t</div>'
                }
            }),
            a.preventDefault())
        })
    }
    function e() {
        $(g.scope).on("click", "" + c.instagram + c.openInLightbox, function(a) {
            var b = $(a.currentTarget).attr("href");
            h.openInlinePopup({
                maxWidth: 500,
                waiting: function(a) {
                    var c = this;
                    k(b, function(b) {
                        c.content.html(b.replace(/min-width:.+?;/i, ""));
                        a();
                        setTimeout(function() {
                            window.instgrm.Embeds.process();
                            c.content.find(".instagram-media").css("min-width", "")
                        }, 0)
                    })
                }
            });
            a.preventDefault()
        })
    }
    function f() {
        $(g.scope).on("click", "" + c.twitter + c.openInLightbox, function(a) {
            var b = $(a.currentTarget).attr("href");
            h.openInlinePopup({
                maxWidth: 500,
                content: function() {
                    return '<a class="twitter-timeline" href="' + b + '"></a>'
                },
                callbacks: {
                    afterOpen: function() {
                        window.twttr.widgets.load()
                    }
                }
            });
            a.preventDefault()
        })
    }
    function k(a, b) {
        m[a] ? b(m[a]) : $.get("https://api.instagram.com/oembed/?url=" + a + "&omitscript=true", function(c) {
            m[a] = c.html;
            b(c.html)
        })
    }
    var g = this
      , c = {
        openInLightbox: ".js-social-link-open-in-lightbox",
        facebook: ".js-social-link-facebook",
        instagram: ".js-social-link-instagram",
        twitter: ".js-social-link-twitter",
        youtube: ".js-social-link-youtube"
    }
      , p = /(\.be\/|v=|embed\/)([^&?]+)/i
      , m = {}
      , h = void 0;
    this.init = function() {
        h = Moff.modules.get("Popup");
        a();
        d();
        b();
        Moff.event.on("afterLeftovers", function() {
           // e();
           // f()
        })
    }
});
Moff.modules.initClass("SocialLink", {
    scopeSelector: "body"
});
