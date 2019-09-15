Moff.modules.create("InViewport", function() {
    function f(a, d) {
        var b = a.inCallback
          , h = a.outCallback
          , e = void 0 === d ? !1 : d;
        $.each(a.$elements, function(a, d) {
            var f = {
                $element: $(d),
                node: d,
                inCallback: b,
                outCallback: h,
                isOnce: e
            };
            c.push(f)
        })
    }
    function e() {
        //return;
        for (var a = 0, d = c.length; a < d; a++) {
            var b = c[a];
            b && (Moff.utils.isElementInDom(b.node) ? (!b.inViewport && g(b.node) ? (b.inViewport = !0,
            b.inCallback && (b.inCallback(b.$element),
            b.isOnce && (c[a] = null))) : b.inViewport && !g(b.node) && (b.inViewport = !1,
            b.outCallback && (b.outCallback(b.$element),
            b.isOnce && (c[a] = null))),
            c.length !== d && (d = c.length,
            a = -1)) : c[a] = null)
        }
        c = c.filter(function(a) {
            return a
        })
    }
    function g(a) {
        //a = a.getBoundingClientRect();
        a = {left: 0, bottom: 0, right: 0, top: 0};
        var d = a.left
          , b = a.bottom
          , c = a.right;
        return a.top < window.innerHeight && 0 < b && d < window.innerWidth && 0 < c
    }
    var c = [];
    this.init = function() {
        $(window).on("scroll.inViewport resize.inViewport", Moff.utils.throttle(function() {
            return e()
        }, 100))
    }
    ;
    this.once = function(a) {
        f(a, !0);
        e()
    }
    ;
    this.on = function(a) {
        f(a);
        e()
    }
});
Moff.modules.initClass("InViewport", {
    scopeSelector: "body"
});
