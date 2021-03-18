! function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define
        .amd ? define([], e) : "object" == typeof exports ? exports.MA = e() : t.MA = e()
}(window, (function() {
    return function(t) {
        var e = {};

        function i(s) {
            if (e[s]) return e[s].exports;
            var o = e[s] = {
                i: s,
                l: !1,
                exports: {}
            };
            return t[s].call(o.exports, o, o.exports, i), o.l = !0, o.exports
        }
        return i.m = t, i.c = e, i.d = function(t, e, s) {
            i.o(t, e) || Object.defineProperty(t, e, {
                enumerable: !0,
                get: s
            })
        }, i.r = function(t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(t, "__esModule", {
                value: !0
            })
        }, i.t = function(t, e) {
            if (1 & e && (t = i(t)), 8 & e) return t;
            if (4 & e && "object" == typeof t && t && t.__esModule) return t;
            var s = Object.create(null);
            if (i.r(s), Object.defineProperty(s, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
                for (var o in t) i.d(s, o, function(e) {
                    return t[e]
                }.bind(null, o));
            return s
        }, i.n = function(t) {
            var e = t && t.__esModule ? function() {
                return t.default
            } : function() {
                return t
            };
            return i.d(e, "a", e), e
        }, i.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }, i.p = "", i(i.s = 12)
    }([function(t, e, i) {
        "use strict";

        function s(t) {
            for (var i in t) e.hasOwnProperty(i) || (e[i] = t[i])
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), s(i(6)), s(i(7)), s(i(3))
    }, function(t, e, i) {
        "use strict";

        function s(t) {
            for (var i in t) e.hasOwnProperty(i) || (e[i] = t[i])
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), s(i(9)), s(i(10)), s(i(5))
    }, function(t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.data = {}, e.observers = {}
    }, function(t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var s = i(2),
            o = function() {
                function t(t, e, i) {
                    this.key = "", this.id = t, this.key = e, this.fn = i
                }
                return t.prototype.unsubscribe = function() {
                    delete s.observers[this.id]
                }, t
            }();
        e.Observer = o
    }, function(t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.data = {}, e.observers = {}
    }, function(t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var s = i(4),
            o = function() {
                function t(t, e, i) {
                    this.key = "", this.id = t, this.key = e, this.fn = i
                }
                return t.prototype.unsubscribe = function() {
                    delete s.observers[this.id]
                }, t
            }();
        e.Observer = o
    }, function(t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var s = function() {
            function t() {}
            return t.get = function(t) {
                var e, i = new RegExp("(^| )" + t + "=([^;]*)(;|$)");
                return (e = document.cookie.match(i)) ? decodeURIComponent(e[2]) : ""
            }, t.set = function(t, e, i) {
                var s = window,
                    o = s.escape(t) + "=" + s.escape(e) + ";";
                (i || (i = {}), i.expires) && (o += "expires=" + new Date((new Date).getTime() + 1e3 * i.expires * 60 * 60 *
                    24).toUTCString() + ";");
                i.path && (o += "path=" + i.path + ";"), i.domain && (o += "domain=" + i.domain + ";"), document.cookie = o
            }, t.delete = function(e, i) {
                t.get(e) && (i || (i = {}), i.expires = -1, t.set(e, "", i))
            }, t
        }();
        e.Cookie = s
    }, function(t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var s = i(2),
            o = i(3),
            r = i(8),
            n = function() {
                function t() {}
                return t.get = function(t) {
                    if (!t && void 0 === t) return s.data;
                    for (var e = t.split("."), i = s.data, o = 0, r = e; o < r.length; o++) {
                        if (void 0 === (i = i[r[o]])) return
                    }
                    return i
                }, t.set = function(e, i) {
                    for (var o = e.split("."), r = s.data, n = 0; n < o.length - 1; ++n) r[o[n]] || (r[o[n]] = {}), r = r[o[n]];
                    for (var h in r[o[o.length - 1]] = i, s.observers) e === s.observers[h].key ? s.observers[h].fn(i) : 0 ===
                        e.indexOf(s.observers[h].key) && s.observers[h].fn(t.get(s.observers[h].key))
                }, t.updated = function(e) {
                    for (var i in s.observers) 0 === e.indexOf(s.observers[i].key) && s.observers[i].fn(t.get(s.observers[i].key))
                }, t.subscribe = function(e, i) {
                    var n = r.s8(),
                        h = new o.Observer(n, e, i);
                    s.observers[n] = h;
                    var c = t.get(e);
                    return null != c && i(c), h
                }, t
            }();
        e.Store = n
    }, function(t, e, i) {
        "use strict";

        function s() {
            return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.s4 = s, e.s8 = function() {
            return s() + s()
        }
    }, function(t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var s = function() {
            function t() {}
            return t.get = function(t) {
                var e, i = new RegExp("(^| )" + t + "=([^;]*)(;|$)");
                return (e = document.cookie.match(i)) ? decodeURIComponent(e[2]) : ""
            }, t.set = function(t, e, i) {
                var s = window,
                    o = s.escape(t) + "=" + s.escape(e) + ";";
                (i || (i = {}), i.expires) && (o += "expires=" + new Date((new Date).getTime() + 1e3 * i.expires * 60 * 60 *
                    24).toUTCString() + ";");
                i.path && (o += "path=" + i.path + ";"), i.domain && (o += "domain=" + i.domain + ";"), document.cookie = o
            }, t.delete = function(e, i) {
                t.get(e) && (i || (i = {}), i.expires = -1, t.set(e, "", i))
            }, t
        }();
        e.Cookie = s
    }, function(t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var s = i(4),
            o = i(5),
            r = i(11),
            n = function() {
                function t() {}
                return t.get = function(t) {
                    if (!t && void 0 === t) return s.data;
                    for (var e = t.split("."), i = s.data, o = 0, r = e; o < r.length; o++) {
                        if (void 0 === (i = i[r[o]])) return
                    }
                    return i
                }, t.set = function(e, i) {
                    for (var o = e.split("."), r = s.data, n = 0; n < o.length - 1; ++n) r[o[n]] || (r[o[n]] = {}), r = r[o[n]];
                    for (var h in r[o[o.length - 1]] = i, s.observers) e === s.observers[h].key ? s.observers[h].fn(i) : 0 ===
                        e.indexOf(s.observers[h].key) && s.observers[h].fn(t.get(s.observers[h].key))
                }, t.updated = function(e) {
                    for (var i in s.observers) 0 === e.indexOf(s.observers[i].key) && s.observers[i].fn(t.get(s.observers[i].key))
                }, t.subscribe = function(e, i) {
                    var n = r.s8(),
                        h = new o.Observer(n, e, i);
                    s.observers[n] = h;
                    var c = t.get(e);
                    return null != c && i(c), h
                }, t
            }();
        e.Store = n
    }, function(t, e, i) {
        "use strict";

        function s() {
            return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.s4 = s, e.s8 = function() {
            return s() + s()
        }
    }, function(t, e, i) {
        "use strict";
        i.r(e);
        var s, o = i(0);

        function r() {
            return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
        }

        function n() {
            return r() + r()
        }
        class h {
            constructor(t, e, i, s, o, r, n) {
                this.x = t, this.y = e, this.x |= 0, this.y |= 0, this.direction = i, this.anchorIndex = s, this.id = o, this
                    .hidden = r, this.out = n
            }
            floor() {
                this.x |= 0, this.y |= 0
            }
            round() {
                this.x = Math.round(this.x), this.y = Math.round(this.y)
            }
            clone() {
                const t = new h(this.x, this.y, this.direction, this.anchorIndex, this.id, this.hidden, this.out);
                return this.data && (t.data = this.data), t
            }
            hit(t, e = 5) {
                return t.x > this.x - e && t.x < this.x + e && t.y > this.y - e && t.y < this.y + e
            }
            rotate(t, e) {
                if (!t || 360 === t) return this;
                t *= Math.PI / 180;
                const i = (this.x - e.x) * Math.cos(t) - (this.y - e.y) * Math.sin(t) + e.x,
                    s = (this.x - e.x) * Math.sin(t) + (this.y - e.y) * Math.cos(t) + e.y;
                return this.x = i, this.y = s, this
            }
        }

        function c(t, e) {
            if (e.length < 3) return !1;
            let i = !1,
                s = e[e.length - 1];
            for (const o of e)(o.y < t.y && s.y >= t.y || o.y >= t.y && s.y < t.y) && o.x + (t.y - o.y) * (s.x - o.x) / (s.y -
                o.y) > t.x && (i = !i), s = o;
            return i
        }

        function a(t, e, i) {
            return c(t, [new h(e.x - 8, e.y - 8), new h(i.x - 8, i.y - 8), new h(i.x + 8, i.y + 8), new h(e.x + 8, e.y + 8)])
        }

        function d(t, e) {
            return 0 | Math.sqrt(Math.pow(Math.abs(t.x - e.x), 2) + Math.pow(Math.abs(t.y - e.y), 2))
        }

        function l(t, e, i, s) {
            let o, r, n, h, c, a, d, l = "string" == typeof i;
            const y = parseInt,
                f = Math.round;
            if ("number" != typeof t || t < -1 || t > 1 || "string" != typeof e || "r" !== e[0] && "#" !== e[0] || i && !l)
                return null;
            const u = t => {
                let e = t.length;
                const i = {};
                if (e > 9) {
                    if ([o, r, n, l] = t = t.split(","), (e = t.length) < 3 || e > 4) return null;
                    i.r = y("a" === o[3] ? o.slice(5) : o.slice(4)), i.g = y(r), i.b = y(n), i.a = l ? parseFloat(l) : -1
                } else {
                    if (8 === e || 6 === e || e < 4) return null;
                    e < 6 && (t = "#" + t[1] + t[1] + t[2] + t[2] + t[3] + t[3] + (e > 4 ? t[4] + t[4] : "")), t = y(t.slice(1),
                        16), 9 === e || 5 === e ? (i.r = t >> 24 & 255, i.g = t >> 16 & 255, i.b = t >> 8 & 255, i.a = f((255 & t) /
                        .255) / 1e3) : (i.r = t >> 16, i.g = t >> 8 & 255, i.b = 255 & t, i.a = -1)
                }
                return i
            };
            return d = e.length > 9, d = l ? i.length > 9 || "c" === i && !d : d, c = u(e), h = t < 0, a = i && "c" !== i ?
                u(i) : h ? {
                    r: 0,
                    g: 0,
                    b: 0,
                    a: -1
                } : {
                    r: 255,
                    g: 255,
                    b: 255,
                    a: -1
                }, h = 1 - (t = h ? -1 * t : t), c && a ? (s ? (o = f(h * c.r + t * a.r), r = f(h * c.g + t * a.g), n = f(h *
                c.b + t * a.b)) : (o = f((h * c.r ** 2 + t * a.r ** 2) ** .5), r = f((h * c.g ** 2 + t * a.g ** 2) ** .5), n =
                f((h * c.b ** 2 + t * a.b ** 2) ** .5)), l = c.a, a = a.a, l = (c = l >= 0 || a >= 0) ? l < 0 ? a : a < 0 ?
                l : l * h + a * t : 0, d ? "rgb" + (c ? "a(" : "(") + o + "," + r + "," + n + (c ? "," + f(1e3 * l) / 1e3 :
                "") + ")" : "#" + (4294967296 + 16777216 * o + 65536 * r + 256 * n + (c ? f(255 * l) : 0)).toString(16).slice(
                1, c ? void 0 : -2)) : null
        }

        function y(t, e) {
            return +e ? +e : e && "%" === e[e.length - 1] ? (e = e.substr(0, e.length - 1), Math.round(t * +e / 100)) : 0
        }
        class f {
            constructor(t, e, i, s) {
                this.x = t, this.y = e, this.width = i, this.height = s, this.center = new h(0, 0), this.floor()
            }
            floor() {
                this.x |= 0, this.y |= 0, this.width |= 0, this.height |= 0, this.ex = this.x + this.width, this.ey = this.y +
                    this.height, this.calceCenter()
            }
            round() {
                this.x = Math.round(this.x), this.y = Math.round(this.y), this.width = Math.round(this.width), this.height =
                    Math.round(this.height), this.ex = this.x + this.width, this.ey = this.y + this.height, this.calceCenter()
            }
            clone() {
                return new f(this.x, this.y, this.width, this.height)
            }
            hit(t, e = 0) {
                return t.x > this.x - e && t.x < this.ex + e && t.y > this.y - e && t.y < this.ey + e
            }
            hitRect(t) {
                return t.x > this.x && t.x < this.ex && t.y > this.y && t.y < this.ey || t.ex > this.x && t.ex < this.ex && t
                        .y > this.y && t.y < this.ey || t.ex > this.x && t.ex < this.ex && t.ey > this.y && t.ey < this.ey || t.x >
                    this.x && t.x < this.ex && t.ey > this.y && t.ey < this.ey
            }
            hitRotate(t, e, i) {
                const s = this.toPoints();
                for (const t of s) t.rotate(e, i);
                return c(t, s)
            }
            calceCenter() {
                this.center.x = this.x + this.width / 2, this.center.y = this.y + this.height / 2
            }
            toPoints() {
                return [new h(this.x, this.y), new h(this.ex, this.y), new h(this.ex, this.ey), new h(this.x, this.ey)]
            }
            scale(t, e) {
                e || (e = this.center), this.x = e.x - (e.x - this.x) * t, this.y = e.y - (e.y - this.y) * t, this.width *= t,
                    this.height *= t, this.ex = this.x + this.width, this.ey = this.y + this.height, this.calceCenter()
            }
        }
        class u {
            constructor(t) {
                this.id = "", this.name = "", this.tags = [], this.rect = new f(0, 0, 0, 0), this.lineWidth = 1, this.rotate =
                    0, this.offsetRotate = 0, this.globalAlpha = 1, this.dash = 0, this.strokeStyle = "", this.fillStyle = "",
                    this.font = {
                        color: "",
                        fontFamily: '"Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial',
                        fontSize: 12,
                        lineHeight: 1.5,
                        fontStyle: "normal",
                        fontWeight: "normal",
                        textAlign: "center",
                        textBaseline: "middle"
                    }, this.animateStart = 0, this.animateCycleIndex = 0, this.locked = !1, t ? (this.id = t.id || n(), this.name =
                    t.name || "", this.tags = t.tags || [], t.rect && (this.rect = new f(t.rect.x, t.rect.y, t.rect.width, t.rect
                    .height)), this.dash = t.dash || 0, this.lineDash = t.lineDash, this.lineWidth = t.lineWidth || 1, this.strokeStyle =
                    t.strokeStyle || "", this.fillStyle = t.fillStyle || "", this.lineCap = t.lineCap, this.globalAlpha = t.globalAlpha ||
                    1, this.rotate = t.rotate || 0, this.offsetRotate = t.offsetRotate || 0, t.font && Object.assign(this.font,
                    t.font), this.animateCycle = t.animateCycle, this.nextAnimate = t.nextAnimate, this.animatePlay = t.animatePlay,
                    this.data = t.data || "", this.locked = t.locked) : this.id = n()
            }
            render(t) {
                switch (t.save(), (this.rotate || this.offsetRotate) && (t.translate(this.rect.center.x, this.rect.center.y),
                    t.rotate((this.rotate + this.offsetRotate) * Math.PI / 180), t.translate(-this.rect.center.x, -this.rect.center
                    .y)), this.lineWidth > 1 && (t.lineWidth = this.lineWidth), this.strokeStyle ? t.strokeStyle = this.strokeStyle :
                    t.strokeStyle = "#333", this.fillStyle ? t.fillStyle = this.fillStyle : t.fillStyle = "transparent", this.lineCap &&
                (t.lineCap = this.lineCap), this.globalAlpha < 1 && (t.globalAlpha = this.globalAlpha), this.dash) {
                    case 1:
                        t.setLineDash([5, 5]);
                        break;
                    case 2:
                        t.setLineDash([10, 10]);
                        break;
                    case 3:
                        t.setLineDash([10, 10, 2, 10])
                }
                if (this.lineDash && t.setLineDash(this.lineDash), this.draw(t), t.restore(), this.children)
                    for (const e of this.children) e.render(t)
            }
            hit(t, e = 0) {
                if (!this.rotate) return this.rect.hit(t, e);
                const i = this.rect.toPoints();
                for (const t of i) t.rotate(this.rotate, this.rect.center);
                return c(t, i)
            }
        }

        function x(t, e) {
            const i = e.rect.width * e.borderRadius,
                s = e.rect.height * e.borderRadius;
            let o = i < s ? i : s;
            e.rect.width < 2 * o && (o = e.rect.width / 2), e.rect.height < 2 * o && (o = e.rect.height / 2), t.beginPath(),
                t.moveTo(e.rect.x + o, e.rect.y), t.arcTo(e.rect.x + e.rect.width, e.rect.y, e.rect.x + e.rect.width, e.rect.y +
                e.rect.height, o), t.arcTo(e.rect.x + e.rect.width, e.rect.y + e.rect.height, e.rect.x, e.rect.y + e.rect.height,
                o), t.arcTo(e.rect.x, e.rect.y + e.rect.height, e.rect.x, e.rect.y, o), t.arcTo(e.rect.x, e.rect.y, e.rect.x +
                e.rect.width, e.rect.y, o), t.closePath(), t.fill(), t.stroke()
        }

        function g(t, e) {
            t.beginPath(), t.ellipse(e.rect.x + e.rect.width / 2, e.rect.y + e.rect.height / 2, e.rect.width / 2, e.rect.height /
                2, 0, 0, 2 * Math.PI), t.fill(), t.stroke()
        }

        function p(t, e) {
            t.beginPath(), t.moveTo(e.rect.x + e.rect.width / 2, e.rect.y), t.lineTo(e.rect.x + e.rect.width, e.rect.y + e.rect
                .height), t.lineTo(e.rect.x, e.rect.y + e.rect.height), t.closePath(), t.fill(), t.stroke()
        }

        function m(t, e) {
            t.beginPath(), t.moveTo(e.rect.x + e.rect.width / 2, e.rect.y), t.lineTo(e.rect.x + e.rect.width, e.rect.y + e.rect
                .height / 2), t.lineTo(e.rect.x + e.rect.width / 2, e.rect.y + e.rect.height), t.lineTo(e.rect.x, e.rect.y +
                e.rect.height / 2), t.closePath(), t.fill(), t.stroke()
        }

        function w(t, e) {
            t.beginPath(), t.moveTo(e.rect.x, e.rect.y + e.rect.height / 2), t.lineTo(e.rect.x + e.rect.height / 2, e.rect.y),
                t.lineTo(e.rect.x + e.rect.height / 2, e.rect.y + e.rect.height / 3), t.lineTo(e.rect.x + e.rect.width, e.rect
                .y + e.rect.height / 3), t.lineTo(e.rect.x + e.rect.width, e.rect.y + 2 * e.rect.height / 3), t.lineTo(e.rect
                .x + (e.rect.width - e.rect.height / 2), e.rect.y + 2 * e.rect.height / 3), t.lineTo(e.rect.x + e.rect.height /
                2, e.rect.y + 2 * e.rect.height / 3), t.lineTo(e.rect.x + e.rect.height / 2, e.rect.y + e.rect.height), t.closePath(),
                t.fill(), t.stroke()
        }

        function v(t, e) {
            t.beginPath(), t.moveTo(e.rect.x, e.rect.y + e.rect.height / 3), t.lineTo(e.rect.x + (e.rect.width - e.rect.height /
                2), e.rect.y + e.rect.height / 3), t.lineTo(e.rect.x + (e.rect.width - e.rect.height / 2), e.rect.y), t.lineTo(
                e.rect.x + e.rect.width, e.rect.y + e.rect.height / 2), t.lineTo(e.rect.x + (e.rect.width - e.rect.height / 2),
                e.rect.y + e.rect.height), t.lineTo(e.rect.x + (e.rect.width - e.rect.height / 2), e.rect.y + 2 * e.rect.height /
                3), t.lineTo(e.rect.x, e.rect.y + 2 * e.rect.height / 3), t.closePath(), t.fill(), t.stroke()
        }

        function L(t, e) {
            t.beginPath(), t.moveTo(e.rect.x, e.rect.y + e.rect.height / 2), t.lineTo(e.rect.x + e.rect.height / 2, e.rect.y),
                t.lineTo(e.rect.x + e.rect.height / 2, e.rect.y + e.rect.height / 3), t.lineTo(e.rect.x + (e.rect.width - e.rect
                .height / 2), e.rect.y + e.rect.height / 3), t.lineTo(e.rect.x + (e.rect.width - e.rect.height / 2), e.rect.y),
                t.lineTo(e.rect.x + e.rect.width, e.rect.y + e.rect.height / 2), t.lineTo(e.rect.x + (e.rect.width - e.rect.height /
                2), e.rect.y + e.rect.height), t.lineTo(e.rect.x + (e.rect.width - e.rect.height / 2), e.rect.y + 2 * e.rect.height /
                3), t.lineTo(e.rect.x + e.rect.height / 2, e.rect.y + 2 * e.rect.height / 3), t.lineTo(e.rect.x + e.rect.height /
                2, e.rect.y + e.rect.height), t.closePath(), t.fill(), t.stroke()
        }

        function b(t) {
            const e = [];
            let i = "";
            for (let s = 0; s < t.length; ++s) {
                const o = t.charCodeAt(s);
                o < 33 || o > 126 ? (i && (e.push(i), i = ""), e.push(t[s])) : i += t[s]
            }
            return i && e.push(i), e
        }

        function R(t, e, i) {
            const s = [];
            let o = e[0] || "";
            for (let r = 1; r < e.length; ++r) {
                const n = e[r] || "";
                t.measureText(o + n).width < i ? o += n : (s.push(o), o = n)
            }
            return s.push(o), s
        }

        function P(t, e) {
            if (!e.text) return;
            t.save(), t.beginPath(), t.font =
                `${e.font.fontStyle||"normal"} normal ${e.font.fontWeight||"normal"} ${e.font.fontSize}px/${e.font.lineHeight} ${e.font.fontFamily}`,
                e.font.color ? t.fillStyle = e.font.color : t.fillStyle = "#222", e.font.textAlign && (t.textAlign = e.font.textAlign),
            e.font.textBaseline && (t.textBaseline = e.font.textBaseline);
            const i = e.getTextRect(),
                s = [],
                o = e.text.split(/[\n,]/g);
            for (let e = 0; e < o.length; ++e) {
                const r = R(t, b(o[e]), i.width);
                s.push.apply(s, r)
            }
            const r = e.font.fontSize * e.font.lineHeight;
            let n = e.textMaxLine;
            const h = i.height / r;
            n || (n = s.length > h ? h : s.length);
            let c = i.x + i.width / 2,
                a = i.y + (i.height - r * n) / 2 + 4 * r / 7;
            switch (t.textAlign) {
                case "left":
                    c = i.x;
                    break;
                case "right":
                    c = i.x + i.width
            }
            switch (t.textBaseline) {
                case "top":
                    a = i.y + (r - e.font.fontSize) / 2;
                    break;
                case "bottom":
                    a = i.ey - r * s.length + r
            }! function(t, e, i, s, o, r, n, h) {
                h = !h || h > e.length ? e.length : Math.ceil(h);
                for (let o = 0; o < h - 1; ++o) t.fillText(e[o], i, s + o * n);
                if (h || (h = 1), h < e.length) {
                    let r = e[h - 1] + "...";
                    t.measureText(r).width > o && (r = e[h - 1].substr(0, e[h - 1].length - 2) + "..."), t.fillText(r, i, s + (h -
                        1) * n)
                } else t.fillText(e[h - 1], i, s + (h - 1) * n)
            }(t, s, c, a, i.width, i.height, r, n), t.restore()
        }

        function T(t, e) {
            t.beginPath();
            const i = e.rect.y + e.rect.height / 2;
            t.moveTo(e.rect.x, i), t.lineTo(e.rect.x + e.rect.width, i), t.stroke()
        }

        function k(t) {
            t.anchors.push(new h(t.rect.x + t.rect.width / 2, t.rect.y, s.Up)), t.anchors.push(new h(t.rect.x + 3 * t.rect.width /
                4, t.rect.y + t.rect.height / 2, s.Right)), t.anchors.push(new h(t.rect.x + t.rect.width / 2, t.rect.y + t.rect
                .height, s.Bottom)), t.anchors.push(new h(t.rect.x + t.rect.width / 4, t.rect.y + t.rect.height / 2, s.Left))
        }

        function S(t) {
            t.anchors.push(new h(t.rect.x, t.rect.y + t.rect.height / 2, s.Left)), t.anchors.push(new h(t.rect.x + t.rect.width,
                t.rect.y + t.rect.height / 2, s.Right))
        }

        function C(t) {
            t.anchors.push(new h(t.rect.x, t.rect.y + t.rect.height / 2, s.Left)), t.anchors.push(new h(t.rect.x + t.rect.width,
                t.rect.y + t.rect.height / 2, s.Right))
        }

        function I(t) {
            let e = t.rect.width / 2,
                i = t.rect.height / 2;
            e > i ? e = i : i = e;
            let s = t.rect.height / 10;
            s < 10 && (s = 10), t.iconRect = new f(t.rect.x + (t.rect.width - e) / 2, t.rect.y + s, e, i)
        }

        function N(t) {
            let e = t.rect.height / 20;
            e < 5 && (e = 0), t.textRect = new f(t.rect.x + t.rect.width / 4, t.rect.y + 2 * t.rect.height / 3 - e, t.rect.width /
                2, t.rect.height / 3 - 5);
            const i = 5 * t.rect.width / 7,
                s = 5 * t.rect.height / 7;
            t.fullTextRect = new f(t.rect.x + (t.rect.width - i) / 2, t.rect.y + (t.rect.height - s) / 2, i, s)
        }

        function A(t) {
            let e = 2 * t.rect.width / 7,
                i = 2 * t.rect.height / 7;
            e > i ? e = i : i = e;
            let s = e;
            s < 10 && (s = 10), t.iconRect = new f(t.rect.x + (t.rect.width - e) / 2, t.rect.y + s, e, i)
        }

        function M(t) {
            t.textRect = new f(t.rect.x + t.rect.width / 4, t.rect.y + 2 * t.rect.height / 3, t.rect.width / 2, t.rect.height /
                3 - 5);
            const e = t.rect.width / 2,
                i = 3 * t.rect.height / 7;
            t.fullTextRect = new f(t.rect.x + (t.rect.width - e) / 2, t.rect.y + t.rect.height / 2 - 5, e, i)
        }

        function z(t) {
            let e = t.rect.width / 3,
                i = t.rect.height / 3;
            e > i ? e = i : i = e;
            let s = t.rect.width / 5;
            s < 10 && (s = 10), t.iconRect = new f(t.rect.x + (t.rect.width - e) / 2, t.rect.y + s, e, i)
        }

        function B(t) {
            let e = t.rect.height / 10;
            e < 5 && (e = 0), t.textRect = new f(t.rect.x + t.rect.width / 3, t.rect.y + 2 * t.rect.height / 3 - e, t.rect.width /
                3, t.rect.height / 3 - 5);
            const i = t.rect.width / 2,
                s = 1 * t.rect.height / 2;
            t.fullTextRect = new f(t.rect.x + (t.rect.width - i) / 2, t.rect.y + t.rect.height / 4, i, s)
        }

        function D(t) {
            t.iconRect = new f(0, 0, 0, 0)
        }

        function E(t) {
            t.textRect = new f(t.rect.x + t.rect.height / 2, t.rect.y + t.rect.height / 3, t.rect.width - t.rect.height / 2,
                t.rect.height / 3), t.fullTextRect = t.textRect
        }

        function F(t) {
            t.iconRect = new f(0, 0, 0, 0)
        }

        function W(t) {
            t.textRect = new f(t.rect.x, t.rect.y + t.rect.height / 3, t.rect.width - t.rect.height / 2, t.rect.height / 3),
                t.fullTextRect = t.textRect
        }

        function H(t) {
            t.iconRect = new f(0, 0, 0, 0)
        }

        function O(t) {
            t.textRect = new f(t.rect.x + t.rect.height / 2, t.rect.y + t.rect.height / 3, t.rect.width - t.rect.height, t.rect
                .height / 3), t.fullTextRect = t.textRect
        }

        function U(t) {
            t.iconRect = new f(0, 0, 0, 0)
        }

        function _(t) {
            t.fullTextRect = new f(t.rect.x + 10, t.rect.y + t.rect.height / 2 - 20, t.rect.width - 20, 20), t.textRect = t
                .fullTextRect
        }

        function j(t, e) {
            t.beginPath(), t.moveTo(e.from.x, e.from.y), t.lineTo(e.to.x, e.to.y), t.stroke()
        }

        function Y(t, e) {}

        function $(t) {
            t.controlPoints = []
        }! function(t) {
            t[t.None = 0] = "None", t[t.Up = 1] = "Up", t[t.Right = 2] = "Right", t[t.Bottom = 3] = "Bottom", t[t.Left = 4] =
                "Left"
        }(s || (s = {}));
        const X = 50;

        function G(t, e) {
            t.beginPath(), t.moveTo(e.from.x, e.from.y);
            for (const i of e.controlPoints) t.lineTo(i.x, i.y);
            t.lineTo(e.to.x, e.to.y), t.stroke()
        }

        function K(t, e) {
            t.fillStyle = "#fff", t.lineWidth = 2;
            for (const i of e.controlPoints) t.beginPath(), t.arc(i.x, i.y, 4, 0, 2 * Math.PI), t.stroke(), t.fill()
        }

        function q(t) {
            t.controlPoints = [];
            const e = Q(t.from, t.to);
            t.from.direction && t.controlPoints.push(e);
            const i = Q(t.to, t.from);
            let o;
            switch (e.direction) {
                case s.Up:
                    o = function(t, e) {
                        if (t.x === e.x || t.y === e.y) return [];
                        if (t.y > e.y) return e.direction === s.Up && t.y - e.y > 3 * X ? t.x < e.x ? e.x - t.x < X ? [new h(t.x -
                            2 * X, t.y), new h(t.x - 2 * X, e.y)] : [new h(t.x, e.y)] : t.x - e.x < X ? [new h(t.x + 2 * X, t.y),
                            new h(t.x + 2 * X, e.y)
                        ] : [new h(t.x, e.y)] : e.direction === s.Left && t.x > e.x || e.direction === s.Right && t.x < e.x ? [
                            new h(e.x, t.y)
                        ] : [new h(t.x, e.y)];
                        if (e.direction === s.Bottom) {
                            if (t.x < e.x) return Z(t, e); {
                                const i = Z(e, t);
                                return [i[1], i[0]]
                            }
                        }
                        return [new h(e.x, t.y)]
                    }(e, i);
                    break;
                case s.Right:
                    o = function(t, e) {
                        if (t.x === e.x || t.y === e.y) return [];
                        if (t.x < e.x) return e.direction === s.Right && e.x - t.x > 3 * X ? t.y < e.y ? e.y - t.y < X ? [new h(t.x,
                            t.y - 2 * X), new h(e.x, t.y - 2 * X)] : [new h(e.x, t.y)] : t.y - e.y < X ? [new h(t.x, t.y + 2 * X),
                            new h(e.x, t.y + 2 * X)
                        ] : [new h(e.x, t.y)] : e.direction === s.Right || e.direction === s.Up && t.y < e.y || e.direction ===
                        s.Bottom && t.y > e.y ? [new h(e.x, t.y)] : [new h(t.x, e.y)];
                        if (e.direction === s.Left) {
                            if (t.y < e.y) return tt(t, e); {
                                const i = tt(e, t);
                                return [i[1], i[0]]
                            }
                        }
                        return [new h(t.x, e.y)]
                    }(e, i);
                    break;
                case s.Bottom:
                    o = function(t, e) {
                        if (t.x === e.x || t.y === e.y) return [];
                        if (t.y < e.y) return e.direction === s.Bottom && e.y - t.y > 3 * X ? t.x < e.x ? e.x - t.x < X ? [new h(t.x -
                            2 * X, t.y), new h(t.x - 2 * X, e.y)] : [new h(t.x, e.y)] : t.x - e.x < X ? [new h(t.x + 2 * X, t.y),
                            new h(t.x + 2 * X, e.y)
                        ] : [new h(t.x, e.y)] : e.direction === s.Left && t.x > e.x || e.direction === s.Right && t.x < e.x ? [
                            new h(e.x, t.y)
                        ] : [new h(t.x, e.y)];
                        if (e.direction === s.Up) {
                            if (t.x < e.x) return Z(t, e); {
                                const i = Z(e, t);
                                return [i[1], i[0]]
                            }
                        }
                        return [new h(e.x, t.y)]
                    }(e, i);
                    break;
                case s.Left:
                    o = function(t, e) {
                        if (t.x === e.x || t.y === e.y) return [];
                        if (t.x > e.x) return e.direction === s.Left && t.x - e.x > 3 * X ? t.y < e.y ? e.y - t.y < X ? [new h(t.x,
                            t.y + 2 * X), new h(e.x, t.y + 2 * X)] : [new h(e.x, t.y)] : t.y - e.y < X ? [new h(t.x, t.y - 2 * X),
                            new h(e.x, t.y - 2 * X)
                        ] : [new h(e.x, t.y)] : e.direction === s.Left || e.direction === s.Up && t.y < e.y || e.direction === s.Bottom &&
                        t.y > e.y ? [new h(e.x, t.y)] : [new h(t.x, e.y)];
                        if (e.direction === s.Left) {
                            if (t.y < e.y) return tt(t, e); {
                                const i = tt(e, t);
                                return [i[1], i[0]]
                            }
                        }
                        return [new h(t.x, e.y)]
                    }(e, i)
            }
            t.controlPoints.push.apply(t.controlPoints, o), t.to.direction && t.controlPoints.push(i)
        }

        function V(t, e) {
            if (!e.controlPoints || !e.controlPoints.length) return a(t, e.from, e.to);
            if (a(t, e.from, e.controlPoints[0])) return !0;
            if (a(t, e.to, e.controlPoints[e.controlPoints.length - 1])) return !0;
            for (let i = 0; i < e.controlPoints.length - 1; ++i)
                if (a(t, e.controlPoints[i], e.controlPoints[i + 1])) return !0;
            return !1
        }

        function J(t, e) {
            const i = [e.from];
            i.push.apply(i, e.controlPoints), i.push(e.to);
            for (const e of i) Math.abs(t.x - e.x) < 7 && (t.x = e.x), Math.abs(t.y - e.y) < 7 && (t.y = e.y)
        }

        function Q(t, e) {
            const i = t.clone();
            switch (t.direction) {
                case s.Up:
                    e.y < t.y ? i.y -= Math.floor((t.y - e.y) / 2) : i.y -= X;
                    break;
                case s.Right:
                    e.x > t.x ? i.x += Math.floor((e.x - t.x) / 2) : i.x += X;
                    break;
                case s.Bottom:
                    e.y > t.y ? i.y += Math.floor((e.y - t.y) / 2) : i.y += X;
                    break;
                case s.Left:
                    e.x < t.x ? i.x -= Math.floor((t.x - e.x) / 2) : i.x -= X
            }
            return i
        }

        function Z(t, e) {
            const i = t.x + (e.x - t.x) / 2;
            return [new h(i, t.y), new h(i, e.y)]
        }

        function tt(t, e) {
            const i = t.y + (e.y - t.y) / 2;
            return [new h(t.x, i), new h(e.x, i)]
        }
        const et = 80;

        function it(t, e) {
            t.beginPath(), t.moveTo(e.from.x, e.from.y), t.bezierCurveTo(e.controlPoints[0].x, e.controlPoints[0].y, e.controlPoints[
                1].x, e.controlPoints[1].y, e.to.x, e.to.y), t.stroke()
        }

        function st(t, e) {
            t.fillStyle = t.strokeStyle + "80", t.lineWidth = 1, t.beginPath(), t.moveTo(e.from.x, e.from.y), t.lineTo(e.controlPoints[
                0].x, e.controlPoints[0].y), t.stroke(), t.beginPath(), t.moveTo(e.to.x, e.to.y), t.lineTo(e.controlPoints[1]
                .x, e.controlPoints[1].y), t.stroke(), t.fillStyle = "#fff", t.lineWidth = 2;
            for (const i of e.controlPoints) t.beginPath(), t.arc(i.x, i.y, 4, 0, 2 * Math.PI), t.stroke(), t.fill()
        }

        function ot(t) {
            t.controlPoints = [ht(t.from, t.to), ht(t.to, t.from)], o.Store.set("pts-" + t.id, null)
        }

        function rt(t, e) {
            let i = o.Store.get("pts-" + e.id);
            if (!i) {
                i = [e.from];
                for (let t = .01; t < 1; t += .01) i.push(nt(t, e.from, e.controlPoints[0], e.controlPoints[1], e.to));
                i.push(e.to), o.Store.set("pts-" + e.id, i)
            }
            const s = i.length - 1;
            for (let e = 0; e < s; ++e)
                if (a(t, i[e], i[e + 1])) return !0;
            return !1
        }

        function nt(t, e, i, s, o) {
            const {
                x: r,
                y: n
            } = e, {
                x: c,
                y: a
            } = o, {
                x: d,
                y: l
            } = i, {
                x: y,
                y: f
            } = s;
            return new h(r * (1 - t) * (1 - t) * (1 - t) + 3 * d * t * (1 - t) * (1 - t) + 3 * y * t * t * (1 - t) + c * t *
                t * t, n * (1 - t) * (1 - t) * (1 - t) + 3 * l * t * (1 - t) * (1 - t) + 3 * f * t * t * (1 - t) + a * t * t *
                t)
        }

        function ht(t, e) {
            const i = new h(t.x, t.y, t.direction, t.anchorIndex, t.id);
            let o = et;
            if ((t.direction === s.Up || t.direction === s.Bottom) && Math.abs(t.x - e.x) < 3) return e.y > t.y ? (o = Math
                .floor((e.y - t.y) / 3), i.y += o) : (o = Math.floor((t.y - e.y) / 3), i.y -= o), i;
            if ((t.direction === s.Left || t.direction === s.Right) && Math.abs(t.y - e.y) < 3) return e.x > t.x ? (o =
                Math.floor((e.x - t.x) / 3), i.x += o) : (o = Math.floor((t.x - e.x) / 3), i.x -= o), i;
            switch (t.direction) {
                case s.Up:
                    i.y -= o;
                    break;
                case s.Right:
                    i.x += o;
                    break;
                case s.Bottom:
                    i.y += o;
                    break;
                case s.Left:
                    i.x -= o
            }
            return i
        }

        function ct(t, e, i, s, o) {
            const r = new f(i.x - 17, i.y - 5, 15, 10);
            s && 1 !== s && r.scale(s, new h(r.x + 15, r.y + 5)), t.translate(i.x, i.y), t.rotate(Math.atan2(i.y - e.y, i.x -
                e.x)), t.translate(-i.x, -i.y), t.moveTo(r.x, r.y), t.lineTo(r.x + r.width, r.y + r.height / 2), t.lineTo(r.x,
                r.y + r.height), t.closePath(), t.lineWidth = 2, t.stroke(), o && (t.fillStyle = o), t.fill()
        }

        function at(t, e, i, s) {
            ct(t, e, i, s, "#fff")
        }

        function dt(t, e, i, s, o) {
            const r = new f(i.x - 16, i.y - 4, 14, 8);
            s && 1 !== s && r.scale(s, new h(r.x + 14, r.y + 4)), t.translate(i.x, i.y), t.rotate(Math.atan2(i.y - e.y, i.x -
                e.x)), t.translate(-i.x, -i.y), t.moveTo(r.x + r.width / 2, r.y), t.lineTo(r.x + r.width, r.y + r.height / 2),
                t.lineTo(r.x + r.width / 2, r.y + r.height), t.lineTo(r.x, r.y + r.height / 2), t.closePath(), t.lineWidth = 2,
                t.stroke(), o && (t.fillStyle = o), t.fill()
        }

        function lt(t, e, i, s) {
            dt(t, e, i, s, "#fff")
        }

        function yt(t, e, i, s, o) {
            const r = new f(i.x - 12, i.y - 5, 10, 10);
            s && 1 !== s && r.scale(s, new h(r.x + 9, r.y + 5)), t.translate(i.x, i.y), t.rotate(Math.atan2(i.y - e.y, i.x -
                e.x)), t.translate(-i.x, -i.y), t.arc(r.center.x, r.center.y, r.width / 2, 0, 2 * Math.PI), t.lineWidth = 2,
                t.stroke(), o && (t.fillStyle = o), t.fill()
        }

        function ft(t, e, i, s) {
            yt(t, e, i, s, "#fff")
        }

        function ut(t) {
            t.anchors.push(new h(t.rect.x, t.rect.y + t.rect.height / 2, s.Left)), t.anchors.push(new h(t.rect.x + t.rect.width /
                2, t.rect.y, s.Up)), t.anchors.push(new h(t.rect.x + t.rect.width, t.rect.y + t.rect.height / 2, s.Right)), t
                .anchors.push(new h(t.rect.x + t.rect.width / 2, t.rect.y + t.rect.height, s.Bottom));
            for (let e = 5; e < 360; e += 5) {
                if (e % 90 == 0) continue;
                const i = Math.floor(e / 90),
                    s = new h(t.rect.center.x + Math.sin(e / 180 * Math.PI) * t.rect.width / 2, t.rect.center.y + Math.cos(e /
                        180 * Math.PI) * t.rect.height / 2, i);
                s.hidden = !0, t.anchors.push(s)
            }
        }

        function xt(t, e, i, s) {
            const o = new f(i.x - 12, i.y - 6, 12, 12);
            s && 1 !== s && o.scale(s, new h(o.x + 12, o.y + 6)), t.translate(i.x, i.y), t.rotate(Math.atan2(i.y - e.y, i.x -
                e.x)), t.translate(-i.x, -i.y), t.moveTo(o.x, o.y), t.lineTo(o.x + o.width, o.y + o.height / 2), t.lineTo(o.x,
                o.y + o.height), t.stroke()
        }

        function gt(t, e, i, s) {
            const o = new f(i.x - 12, i.y - 6, 12, 12);
            s && 1 !== s && o.scale(s, new h(o.x + 12, o.y + 6)), t.translate(i.x, i.y), t.rotate(Math.atan2(i.y - e.y, i.x -
                e.x)), t.translate(-i.x, -i.y), i.x > e.x ? (t.moveTo(o.x, o.y), t.lineTo(o.x + o.width, o.y + o.height / 2)) :
                (t.moveTo(o.x + o.width, o.y + o.height / 2), t.lineTo(o.x, o.y + o.height)), t.stroke()
        }

        function pt(t, e, i, s) {
            const o = new f(i.x - 12, i.y - 6, 12, 12);
            s && 1 !== s && o.scale(s, new h(o.x + 12, o.y + 6)), t.translate(i.x, i.y), t.rotate(Math.atan2(i.y - e.y, i.x -
                e.x)), t.translate(-i.x, -i.y), i.x < e.x ? (t.moveTo(o.x, o.y), t.lineTo(o.x + o.width, o.y + o.height / 2)) :
                (t.moveTo(o.x + o.width, o.y + o.height / 2), t.lineTo(o.x, o.y + o.height)), t.stroke()
        }

        function mt(t, e) {
            t.beginPath(), t.moveTo(e.rect.x + e.rect.width / 2, e.rect.y), t.lineTo(e.rect.x + e.rect.width, e.rect.y + 2 *
                e.rect.height / 5), t.lineTo(e.rect.x + 4 * e.rect.width / 5, e.rect.y + e.rect.height), t.lineTo(e.rect.x +
                e.rect.width / 5, e.rect.y + e.rect.height), t.lineTo(e.rect.x, e.rect.y + 2 * e.rect.height / 5), t.closePath(),
                t.fill(), t.stroke()
        }

        function wt(t) {
            let e = t.rect.width / 2,
                i = t.rect.height / 2;
            e > i ? e = i : i = e;
            let s = t.rect.height / 7;
            s < 10 && (s = 10), t.iconRect = new f(t.rect.x + (t.rect.width - e) / 2, t.rect.y + s, e, i)
        }

        function vt(t) {
            t.textRect = new f(t.rect.x + t.rect.width / 5, t.rect.y + 5 * t.rect.height / 7, 3 * t.rect.width / 5, t.rect.height /
                4);
            const e = 3 * t.rect.width / 5,
                i = 3 * t.rect.height / 5;
            t.fullTextRect = new f(t.rect.x + (t.rect.width - e) / 2, t.rect.y + t.rect.height / 4, e, i)
        }

        function Lt(t) {
            t.anchors.push(new h(t.rect.x + t.rect.width / 2, t.rect.y, s.Up)), t.anchors.push(new h(t.rect.x + t.rect.width,
                t.rect.y + 2 * t.rect.height / 5, s.Right)), t.anchors.push(new h(t.rect.x + 4 * t.rect.width / 5, t.rect.y +
                t.rect.height, s.Bottom)), t.anchors.push(new h(t.rect.x + t.rect.width / 5, t.rect.y + t.rect.height, s.Bottom)),
                t.anchors.push(new h(t.rect.x, t.rect.y + 2 * t.rect.height / 5, s.Left))
        }

        function bt(t, e) {
            t.beginPath();
            const i = e.rect.width / 5;
            t.moveTo(e.rect.x + i, e.rect.y), t.lineTo(e.rect.x + e.rect.width - i, e.rect.y), t.lineTo(e.rect.x + e.rect.width,
                e.rect.y + e.rect.height / 2), t.lineTo(e.rect.x + e.rect.width - i, e.rect.y + e.rect.height), t.lineTo(e.rect
                .x + i, e.rect.y + e.rect.height), t.lineTo(e.rect.x, e.rect.y + e.rect.height / 2), t.closePath(), t.fill(),
                t.stroke()
        }

        function Rt(t) {
            t.anchors.push(new h(t.rect.x + t.rect.width / 2, t.rect.y, s.Up)), t.anchors.push(new h(t.rect.x + t.rect.width,
                t.rect.y + t.rect.height / 2, s.Right)), t.anchors.push(new h(t.rect.x + t.rect.width / 2, t.rect.y + t.rect.height,
                s.Bottom)), t.anchors.push(new h(t.rect.x, t.rect.y + t.rect.height / 2, s.Left));
            const e = new h(t.rect.x + t.rect.width / 10, t.rect.y + t.rect.height / 4, s.Left);
            e.hidden = !0, t.anchors.push(e);
            const i = new h(t.rect.x + t.rect.width / 10, t.rect.y + 3 * t.rect.height / 4, s.Left);
            i.hidden = !0, t.anchors.push(i);
            const o = new h(t.rect.x + 9 * t.rect.width / 10, t.rect.y + t.rect.height / 4, s.Right);
            o.hidden = !0, t.anchors.push(o);
            const r = new h(t.rect.x + 9 * t.rect.width / 10, t.rect.y + 3 * t.rect.height / 4, s.Right);
            r.hidden = !0, t.anchors.push(r)
        }

        function Pt(t) {
            const e = 3 * t.rect.width / 5,
                i = 3 * t.rect.height / 4;
            t.iconRect = new f(t.rect.x + t.rect.width / 5 + t.paddingLeftNum, t.rect.y + t.paddingTopNum, e - t.paddingLeftNum -
                t.paddingRightNum, i - t.paddingTopNum - t.paddingBottomNum), t.fullIconRect = new f(t.rect.x + t.rect.width /
                5 + t.paddingLeftNum, t.rect.y + t.paddingTopNum, e - t.paddingLeftNum - t.paddingRightNum, t.rect.height - t
                .paddingTopNum - t.paddingBottomNum)
        }

        function Tt(t) {
            const e = 3 * t.rect.width / 5,
                i = t.rect.height / 4;
            t.textRect = new f(t.rect.x + t.rect.width / 5 + t.paddingLeftNum, t.rect.y + t.rect.height - i + t.paddingTopNum,
                e - t.paddingLeftNum - t.paddingRightNum, i), t.fullTextRect = new f(t.rect.x + t.rect.width / 5 + t.paddingLeftNum,
                t.rect.y + t.paddingTopNum, e - t.paddingLeftNum - t.paddingRightNum, t.rect.height - t.paddingTopNum - t.paddingBottomNum
            )
        }

        function kt(t, e) {
            t.beginPath();
            for (let i = 0; i < 5; ++i) t.lineTo(Math.cos((18 + 72 * i) / 180 * Math.PI) * e.rect.width / 2 + e.rect.x + e.rect
                .width / 2, -Math.sin((18 + 72 * i) / 180 * Math.PI) * e.rect.width / 2 + e.rect.y + e.rect.height / 2), t.lineTo(
                Math.cos((54 + 72 * i) / 180 * Math.PI) * e.rect.width / 4 + e.rect.x + e.rect.width / 2, -Math.sin((54 + 72 *
                i) / 180 * Math.PI) * e.rect.width / 4 + e.rect.y + e.rect.height / 2);
            t.closePath(), t.fill(), t.stroke()
        }

        function St(t) {
            t.anchors.push(new h(Math.cos(.1 * Math.PI) * t.rect.width / 2 + t.rect.x + t.rect.width / 2, -Math.sin(.1 *
                Math.PI) * t.rect.width / 2 + t.rect.y + t.rect.height / 2, s.Right)), t.anchors.push(new h(Math.cos(.5 *
                Math.PI) * t.rect.width / 2 + t.rect.x + t.rect.width / 2, -Math.sin(.5 * Math.PI) * t.rect.width / 2 + t.rect
                .y + t.rect.height / 2, s.Up)), t.anchors.push(new h(Math.cos(.9 * Math.PI) * t.rect.width / 2 + t.rect.x + t
                .rect.width / 2, -Math.sin(.9 * Math.PI) * t.rect.width / 2 + t.rect.y + t.rect.height / 2, s.Left)), t.anchors
                .push(new h(Math.cos(1.3 * Math.PI) * t.rect.width / 2 + t.rect.x + t.rect.width / 2, -Math.sin(1.3 * Math.PI) *
                    t.rect.width / 2 + t.rect.y + t.rect.height / 2, s.Bottom)), t.anchors.push(new h(Math.cos(1.7 * Math.PI) * t
                .rect.width / 2 + t.rect.x + t.rect.width / 2, -Math.sin(1.7 * Math.PI) * t.rect.width / 2 + t.rect.y + t.rect
                .height / 2, s.Bottom))
        }

        function Ct(t) {
            t.iconRect = new f(0, 0, 0, 0)
        }

        function It(t) {
            const e = 2 * t.rect.width / 5,
                i = 2 * t.rect.height / 5;
            t.fullTextRect = new f(t.rect.x + (t.rect.width - e) / 2, t.rect.y + (t.rect.height - i) / 2, e, i), t.textRect =
                t.fullTextRect
        }

        function Nt(t, e) {
            t.beginPath(), t.moveTo(e.rect.x + e.rect.width / 5, e.rect.y + 13 * e.rect.height / 16), t.bezierCurveTo(e.rect
                .x - e.rect.width / 15, e.rect.y + 13 * e.rect.height / 16, e.rect.x - e.rect.width / 15, e.rect.y + 7 * e.rect
                .height / 16, e.rect.x + e.rect.width / 5, e.rect.y + 7 * e.rect.height / 16), t.bezierCurveTo(e.rect.x + e.rect
                .width / 5, e.rect.y, e.rect.x + 4 * e.rect.width / 5, e.rect.y, e.rect.x + 4 * e.rect.width / 5, e.rect.y +
                7 * e.rect.height / 16), t.bezierCurveTo(e.rect.x + 16 * e.rect.width / 15, e.rect.y + 7 * e.rect.height / 16,
                e.rect.x + 16 * e.rect.width / 15, e.rect.y + 13 * e.rect.height / 16, e.rect.x + 4 * e.rect.width / 5, e.rect
                .y + 13 * e.rect.height / 16), t.closePath(), t.fill(), t.stroke()
        }

        function At(t) {
            t.anchors.push(new h(t.rect.x, t.rect.y + 3 * t.rect.height / 5, s.Left)), t.anchors.push(new h(t.rect.x + t.rect
                .width / 2, t.rect.y + t.rect.height / 9, s.Up)), t.anchors.push(new h(t.rect.x + t.rect.width, t.rect.y + 3 *
                t.rect.height / 5, s.Right)), t.anchors.push(new h(t.rect.x + t.rect.width / 2, t.rect.y + 4 * t.rect.height /
                5, s.Bottom))
        }

        function Mt(t) {
            t.iconRect = new f(0, 0, 0, 0)
        }

        function zt(t) {
            t.textRect = new f(t.rect.x + t.rect.width / 4, t.rect.y + t.rect.height / 4, t.rect.width / 2, 6 * t.rect.height /
                11), t.fullTextRect = t.textRect
        }

        function Bt(t, e) {
            t.beginPath(), t.moveTo(e.rect.x, e.rect.y), t.lineTo(e.rect.x + e.rect.width, e.rect.y), t.lineTo(e.rect.x + e
                .rect.width, e.rect.y + 3 * e.rect.height / 4), t.lineTo(e.rect.x + 8 * e.rect.width / 16, e.rect.y + 3 * e.rect
                .height / 4), t.lineTo(e.rect.x + e.rect.width / 4, e.rect.ey), t.lineTo(e.rect.x + 5 * e.rect.width / 16, e.rect
                .y + 3 * e.rect.height / 4), t.lineTo(e.rect.x, e.rect.y + 3 * e.rect.height / 4), t.closePath(), t.fill(), t
                .stroke()
        }

        function Dt(t) {
            t.iconRect = new f(0, 0, 0, 0), t.fullIconRect = t.iconRect
        }

        function Et(t) {
            t.textRect = new f(t.rect.x + t.paddingLeftNum, t.rect.y + t.paddingTopNum, t.rect.width - t.paddingLeftNum - t
                .paddingRightNum, 3 * t.rect.height / 4 - t.paddingTopNum - t.paddingBottomNum), t.fullTextRect = t.textRect
        }

        function Ft(t) {
            t.anchors.push(new h(t.rect.x, t.rect.y + 3 * t.rect.height / 8, s.Left)), t.anchors.push(new h(t.rect.x + t.rect
                .width / 2, t.rect.y, s.Up)), t.anchors.push(new h(t.rect.x + t.rect.width, t.rect.y + 3 * t.rect.height / 8,
                s.Right)), t.anchors.push(new h(t.rect.x + t.rect.width / 4, t.rect.ey, s.Bottom))
        }

        function Wt(t, e) {
            t.beginPath();
            const i = e.rect.width / 6;
            t.moveTo(e.rect.x, e.rect.y), t.lineTo(e.rect.ex - i, e.rect.y), t.lineTo(e.rect.ex, e.rect.y + i), t.lineTo(e.rect
                .ex, e.rect.ey), t.lineTo(e.rect.x, e.rect.ey), t.closePath(), t.moveTo(e.rect.ex - i, e.rect.y), t.lineTo(e.rect
                .ex - i, e.rect.y + i), t.lineTo(e.rect.ex, e.rect.y + i), t.fill(), t.stroke()
        }
        const Ht = 5,
            Ot = 30;

        function Ut(t) {
            let e = t.rect.x,
                i = t.rect.y,
                s = t.rect.width;
            t.imageWidth && (s = t.imageWidth, e += (t.rect.width - s) / 2);
            let o = t.rect.height - t.textRect.height - Ht;
            o < Ot && (o = Ot);
            const r = jt(t);
            if (r !== Ot) {
                o = r;
                let e = t.rect.ey - t.textRect.y;
                e < 0 && (e = 0), i += (t.rect.height - e - o) / 2
            }
            t.iconRect = new f(e, i, s, o), t.textRect.y = t.iconRect.ey + Ht, t.textRect.ey = t.textRect.y + t.textRect.height,
                t.fullIconRect = t.rect
        }

        function _t(t) {
            let e = 0;
            const i = t.font.fontSize * t.font.lineHeight;
            if (t.textMaxLine) e = i * t.textMaxLine;
            else {
                e = i * R(o.Store.get("LT:offscreen").getContext("2d"), b(t.text), t.rect.width).length
            }
            let s = t.rect.ey - e;
            const r = jt(t);
            s - r - Ht < t.rect.y && (s = t.rect.y + r + Ht), t.textRect = new f(t.rect.x, s, t.rect.width, e), t.fullTextRect =
                t.rect
        }

        function jt(t) {
            let e = Ot;
            return t.image ? t.imageHeight > 0 && (e = t.imageHeight) : t.icon && t.iconSize > 0 && (e = t.iconSize), e
        }
        class Yt {
            constructor(t, e, i, s, o = "", r = "") {
                this.points = [], this.fillStyle = "", this.strokeStyle = "", this.points.push(t), this.points.push(e), this.points
                    .push(i), this.points.push(s), this.fillStyle = o, this.strokeStyle = r || o
            }
            render(t) {
                t.save(), t.fillStyle = this.fillStyle, t.strokeStyle = this.strokeStyle, t.beginPath();
                for (let e = 0; e < this.points.length; ++e) e ? t.lineTo(this.points[e].x, this.points[e].y) : t.moveTo(this
                    .points[e].x, this.points[e].y);
                t.closePath(), t.fill(), t.stroke(), t.restore()
            }
        }
        class $t {
            constructor(t, e, i, s = "#ddd", o = "#ccc") {
                this.surfaces = [];
                const r = e * Math.sin(45 * Math.PI / 180),
                    n = new h(t.x, t.y + r),
                    c = new h(t.ex - r, t.y + r),
                    a = new h(t.ex - r, t.ey),
                    d = new h(t.x, t.ey);
                this.surfaces.push(new Yt(n, c, a, d, s, o)), this.surfaces.push(new Yt(n, new h(t.x + r, t.y), new h(t.ex, t
                    .y), c, l(.5, s), o)), this.surfaces.push(new Yt(c, new h(t.ex, t.y), new h(t.ex, t.ey - r), a, l(.6, s), o))
            }
            render(t) {
                for (const e of this.surfaces) e.render(t)
            }
        }

        function Xt(t, e) {
            new $t(e.rect, e.z, e.zRotate, e.fillStyle, e.strokeStyle).render(t)
        }

        function Gt(t) {
            const e = t.z * Math.sin(45 * Math.PI / 180);
            t.anchors.push(new h(t.rect.x, t.rect.ey - (t.rect.height - e) / 2, s.Left)), t.anchors.push(new h(t.rect.x + t
                .rect.width / 2, t.rect.y + e / 2, s.Up)), t.anchors.push(new h(t.rect.ex - e / 2, t.rect.y + t.rect.height /
                2, s.Right)), t.anchors.push(new h(t.rect.x + (t.rect.width - e) / 2, t.rect.y + t.rect.height, s.Bottom))
        }

        function Kt(t) {
            t.fullIconRect = t.fullTextRect, t.iconRect = new f(t.fullIconRect.x, t.fullIconRect.y, t.fullIconRect.width, 2 *
                t.fullIconRect.height / 3)
        }

        function qt(t) {
            const e = t.z * Math.sin(45 * Math.PI / 180);
            t.fullTextRect = new f(t.rect.x, t.rect.y + e, t.rect.width - e, t.rect.height - e), t.textRect = new f(t.fullTextRect
                .x + 10, t.fullTextRect.y + 2 * t.fullTextRect.height / 3, t.fullTextRect.width - 20, t.fullTextRect.height /
                3 - 5)
        }

        function Vt(t, e) {
            t.beginPath();
            const i = e.rect.width / 4,
                s = e.rect.x + e.rect.width / 2;
            t.arc(s, e.rect.y + i, i, 0, 2 * Math.PI), t.moveTo(e.rect.x, e.rect.y + 3 * i), t.lineTo(e.rect.ex, e.rect.y +
                3 * i), t.moveTo(s, e.rect.y + 2 * i), t.lineTo(s, e.rect.y + 4 * i), t.moveTo(s, e.rect.y + 4 * i), t.lineTo(
                e.rect.x, e.rect.ey), t.moveTo(s, e.rect.y + 4 * i), t.lineTo(e.rect.ex, e.rect.ey), t.fill(), t.stroke()
        }

        function Jt(t) {
            t.iconRect = new f(0, 0, 0, 0)
        }

        function Qt(t) {
            t.textRect = new f(0, 0, 0, 0), t.fullTextRect = t.textRect
        }
        const Zt = {},
            te = {},
            ee = {},
            ie = {},
            se = {},
            oe = {};

        function re(t, e, i, s, o, r) {
            return !(Zt[t] && !r) && (Zt[t] = e, ie[t] = i, te[t] = s, ee[t] = o, !0)
        }
        console.log("Init middles."), Zt.combine = x, Zt.div = x, Zt.rectangle = x, Zt.circle = g, te.circle = I, ee.circle =
            N, ie.circle = ut, Zt.triangle = p, ie.triangle = k, te.triangle = A, ee.triangle = M, Zt.diamond = m, te.diamond =
            z, ee.diamond = B, Zt.hexagon = bt, te.hexagon = Pt, ee.hexagon = Tt, ie.hexagon = Rt, Zt.pentagon = mt, te.pentagon =
            wt, ee.pentagon = vt, ie.pentagon = Lt, Zt.pentagram = kt, te.pentagram = Ct, ee.pentagram = It, ie.pentagram =
            St, Zt.leftArrow = w, ie.leftArrow = S, te.leftArrow = D, ee.leftArrow = E, Zt.rightArrow = v, ie.rightArrow =
            S, te.rightArrow = F, ee.rightArrow = W, Zt.twowayArrow = L, ie.twowayArrow = S, te.twowayArrow = H, ee.twowayArrow =
            O, Zt.cloud = Nt, ie.cloud = At, te.cloud = Mt, ee.cloud = zt, Zt.message = Bt, ie.message = Ft, te.message =
            Dt, ee.message = Et, Zt.file = Wt, Zt.text = P, te.text = U, ie.text = t => {}, Zt.line = T, ie.line = C, te.line =
            U, ee.line = _, Zt.image = (t, e) => {}, te.image = Ut, ee.image = _t, Zt.cube = Xt, ie.cube = Gt, te.cube = Kt,
            ee.cube = qt, Zt.people = Vt, te.people = Jt, ee.people = Qt, se.line = {
            drawFn: j,
            drawControlPointsFn: Y,
            controlPointsFn: $,
            pointIn: V
        }, se.polyline = {
            drawFn: G,
            drawControlPointsFn: K,
            controlPointsFn: q,
            dockControlPointFn: J,
            pointIn: V
        }, se.curve = {
            drawFn: it,
            drawControlPointsFn: st,
            controlPointsFn: ot,
            pointIn: rt
        }, oe.triangleSolid = ct, oe.triangle = at, oe.diamondSolid = dt, oe.diamond = lt, oe.circleSolid = yt, oe.circle =
            ft, oe.line = xt, oe.lineUp = gt, oe.lineDown = pt;
        class ne extends u {
            constructor(t) {
                super(t), this.is3D = !1, this.zRotate = 0, this.imageRatio = !0, this.anchors = [], this.rotatedAnchors = [],
                    this.animateType = 0, this.animateDuration = 0, this.animateFrames = [], this.imgLoaded = !1, this.is3D = t.is3D,
                    this.z = t.z, this.zRotate = t.zRotate || 0, this.borderRadius = +t.borderRadius || 0, this.borderRadius > 1 &&
                (this.borderRadius = 1), this.icon = t.icon, this.iconFamily = t.iconFamily, this.iconSize = +t.iconSize,
                    this.iconColor = t.iconColor, this.image = t.image, t.imgNaturalWidth && (this.imgNaturalWidth = t.imgNaturalWidth),
                t.imgNaturalHeight && (this.imgNaturalHeight = t.imgNaturalHeight), t.imageWidth && (this.imageWidth = t.imageWidth),
                t.imageHeight && (this.imageHeight = t.imageHeight), this.imageRatio = t.imageRatio, this.imageAlign = t.imageAlign ||
                    "center", this.bkType = t.bkType, this.gradientFromColor = t.gradientFromColor, this.gradientToColor = t.gradientToColor,
                    this.gradientAngle = t.gradientAngle || 0, this.gradientRadius = t.gradientRadius || .01, this.paddingTop =
                    t.paddingTop || 0, this.paddingBottom = t.paddingBottom || 0, this.paddingLeft = t.paddingLeft || 0, this.paddingRight =
                    t.paddingRight || 0, this.text = t.text, t.textMaxLine && (this.textMaxLine = +t.textMaxLine || 0), t.children &&
                t.children[0] && t.children[0].parentRect && (this.paddingLeft = t.children[0].parentRect.offsetX, this.paddingRight =
                    0, this.paddingTop = t.children[0].parentRect.offsetY, this.paddingBottom = 0), t.parentRect && (this.rectInParent = {
                    x: 100 * t.parentRect.x + "%",
                    y: 100 * t.parentRect.y + "%",
                    width: 100 * t.parentRect.width + "%",
                    height: 100 * t.parentRect.height + "%",
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0,
                    marginLeft: 0,
                    rotate: t.parentRect.rotate
                }, this.paddingTop = t.parentRect.marginY, this.paddingBottom = t.parentRect.marginY, this.paddingLeft = t.parentRect
                    .marginX, this.paddingRight = t.parentRect.marginX), this.childStand = t.childStand, this.stand = t.stand,
                t.rectInParent && (this.rectInParent = t.rectInParent), t.animateFrames && (this.animateFrames = t.animateFrames),
                t.animateDuration && (this.animateDuration = t.animateDuration), this.animateType = t.animateType ? t.animateType :
                    t.animateDuration ? "custom" : "", this.iframe = t.iframe, this.audio = t.audio, this.video = t.video, this.play =
                    t.play, this.nextPlay = t.nextPlay, this.init(), this.setChild(t.children)
            }
            static cloneState(t) {
                const e = new ne(t);
                return delete e.animateFrames, e
            }
            init() {
                var t;
                this.calcAbsPadding(), ee[this.name] ? ee[this.name](this) : function(t) {
                    const e = t.rect.height - t.paddingTopNum - t.paddingBottomNum;
                    t.textRect = new f(t.rect.x + t.paddingLeftNum, t.rect.y + t.paddingTopNum + 3 * e / 4, t.rect.width - t.paddingLeftNum -
                        t.paddingRightNum, e / 4), t.fullTextRect = new f(t.rect.x + t.paddingLeftNum, t.rect.y + t.paddingTopNum,
                        t.rect.width - t.paddingLeftNum - t.paddingRightNum, e)
                }(this), te[this.name] ? te[this.name](this) : ((t = this).iconRect = new f(t.rect.x + t.paddingLeftNum, t.rect
                    .y + t.paddingTopNum, t.rect.width - t.paddingLeftNum - t.paddingRightNum, 3 * t.rect.height / 4 - t.paddingTopNum -
                    t.paddingBottomNum), t.fullIconRect = new f(t.rect.x + t.paddingLeftNum, t.rect.y + t.paddingTopNum, t.rect
                    .width - t.paddingLeftNum - t.paddingRightNum, t.rect.height - t.paddingTopNum - t.paddingBottomNum)), this
                    .calcAnchors(), (this.audio || this.video || this.iframe || this.gif) && o.Store.set("LT:addDiv", this)
            }
            calcAbsPadding() {
                this.paddingLeftNum = y(this.rect.width, this.paddingLeft), this.paddingRightNum = y(this.rect.width, this.paddingRight),
                    this.paddingTopNum = y(this.rect.height, this.paddingTop), this.paddingBottomNum = y(this.rect.height, this.paddingBottom)
            }
            setChild(t) {
                if (t) {
                    this.children = [];
                    for (let e = 0; e < t.length; ++e) {
                        const i = new ne(t[e]);
                        i.parentId = this.id, i.calcChildRect(this), i.init(), i.setChild(t[e]), this.children.push(i)
                    }
                }
            }
            calcChildRect(t) {
                const e = t.rect.width - t.paddingLeftNum - t.paddingRightNum,
                    i = t.rect.height - t.paddingTopNum - t.paddingBottomNum;
                let s = t.rect.x + t.paddingLeftNum + y(e, this.rectInParent.x) + y(e, this.rectInParent.marginLeft),
                    o = t.rect.y + t.paddingTopNum + y(i, this.rectInParent.y) + y(e, this.rectInParent.marginTop);
                const r = y(e, this.rectInParent.width),
                    n = y(i, this.rectInParent.height);
                void 0 === this.rectInParent.marginLeft && this.rectInParent.marginRight && (s -= y(e, this.rectInParent.marginRight)),
                void 0 === this.rectInParent.marginTop && this.rectInParent.marginBottom && (o -= y(e, this.rectInParent.marginBottom)),
                    this.rect = new f(s, o, r, n), this.rectInParent.rotate || (this.rectInParent.rotate = 0), this.rotate =
                    this.rectInParent.rotate + t.rotate + t.offsetRotate
            }
            draw(t) {
                if (Zt[this.name]) {
                    switch (this.bkType) {
                        case 1:
                            this.drawBkLinearGradient(t);
                            break;
                        case 2:
                            this.drawBkRadialGradient(t)
                    }
                    Zt[this.name](t, this), "text" !== this.name && this.text && (t.save(), t.shadowColor = "", t.shadowBlur = 0,
                        P(t, this), t.restore()), this.image ? this.drawImg(t) : this.icon && (t.save(), t.shadowColor = "", t.shadowBlur =
                        0,
                        function(t, e) {
                            t.save(), t.textAlign = "center", t.textBaseline = "middle";
                            const i = e.getIconRect();
                            let s = i.x + i.width / 2,
                                o = i.y + i.height / 2;
                            switch (e.imageAlign) {
                                case "top":
                                    o = i.y, t.textBaseline = "top";
                                    break;
                                case "bottom":
                                    o = i.ey, t.textBaseline = "bottom";
                                    break;
                                case "left":
                                    s = i.x, t.textAlign = "left";
                                    break;
                                case "right":
                                    s = i.ex, t.textAlign = "right";
                                    break;
                                case "left-top":
                                    s = i.x, o = i.y, t.textAlign = "left", t.textBaseline = "top";
                                    break;
                                case "right-top":
                                    s = i.ex, o = i.y, t.textAlign = "right", t.textBaseline = "top";
                                    break;
                                case "left-bottom":
                                    s = i.x, o = i.ey, t.textAlign = "left", t.textBaseline = "bottom";
                                    break;
                                case "right-bottom":
                                    s = i.ex, o = i.ey, t.textAlign = "right", t.textBaseline = "bottom"
                            }
                            e.iconSize > 0 ? t.font = `${e.iconSize}px ${e.iconFamily}` : i.width > i.height ? t.font =
                                `${i.height}px ${e.iconFamily}` : t.font = `${i.width}px ${e.iconFamily}`, e.iconColor || (e.iconColor =
                                "#2f54eb"), t.fillStyle = e.iconColor, t.beginPath(), t.fillText(e.icon, s, o), t.restore()
                        }(t, this), t.restore())
                }
            }
            drawBkLinearGradient(t) {
                const e = new h(this.rect.x, this.rect.center.y),
                    i = new h(this.rect.ex, this.rect.center.y);
                this.gradientAngle && (e.rotate(this.gradientAngle, this.rect.center), i.rotate(this.gradientAngle, this.rect
                    .center));
                const s = t.createLinearGradient(e.x, e.y, i.x, i.y);
                s.addColorStop(0, this.gradientFromColor), s.addColorStop(1, this.gradientToColor), t.fillStyle = s
            }
            drawBkRadialGradient(t) {
                let e = this.rect.width;
                e < this.rect.height && (e = this.rect.height), e *= .5;
                const i = t.createRadialGradient(this.rect.center.x, this.rect.center.y, e * this.gradientRadius, this.rect.center
                    .x, this.rect.center.y, e);
                i.addColorStop(0, this.gradientFromColor), i.addColorStop(1, this.gradientToColor), t.fillStyle = i
            }
            drawImg(t) {
                if (this.lastImage !== this.image && (this.img = null), this.img) {
                    t.save(), t.shadowColor = "", t.shadowBlur = 0;
                    const e = this.getIconRect();
                    let i = e.x,
                        s = e.y,
                        r = e.width,
                        n = e.height;
                    switch (this.imageWidth && (r = this.imageWidth), this.imageHeight && (n = this.imageHeight), this.imageRatio &&
                    (this.imageWidth ? n = this.imgNaturalHeight / this.imgNaturalWidth * r : r = this.imgNaturalWidth / this.imgNaturalHeight *
                        n), "image" !== this.name && (i += (e.width - r) / 2, s += (e.height - n) / 2), this.imageAlign) {
                        case "top":
                            s = e.y;
                            break;
                        case "bottom":
                            s = e.ey - n;
                            break;
                        case "left":
                            i = e.x;
                            break;
                        case "right":
                            i = e.ex - r;
                            break;
                        case "left-top":
                            i = e.x, s = e.y;
                            break;
                        case "right-top":
                            i = e.ex - r, s = e.y;
                            break;
                        case "left-bottom":
                            i = e.x, s = e.ey - n;
                            break;
                        case "right-bottom":
                            i = e.ex - r, s = e.ey - n
                    }
                    return t.drawImage(this.img, i, s, r, n), t.restore(), void(this.imgLoaded || (this.imgLoaded = !0, o.Store.set(
                        "LT:render", !0)))
                }
                this.img = new Image, this.img.crossOrigin = "Anonymous", this.img.src = this.image, !this.gif && this.image.indexOf(
                    ".gif") > 0 && (this.gif = !0, o.Store.set("LT:addDiv", this)), this.img.onload = () => {
                    this.imgLoaded = !1, this.lastImage = this.image, this.imgNaturalWidth = this.img.naturalWidth, this.imgNaturalHeight =
                        this.img.naturalHeight, this.drawImg(t)
                }
            }
            calcAnchors() {
                var t;
                this.anchors = [], ie[this.name] ? ie[this.name](this) : ((t = this).anchors.push(new h(t.rect.x, t.rect.y +
                    t.rect.height / 2, s.Left)), t.anchors.push(new h(t.rect.x + t.rect.width / 2, t.rect.y, s.Up)), t.anchors
                    .push(new h(t.rect.x + t.rect.width, t.rect.y + t.rect.height / 2, s.Right)), t.anchors.push(new h(t.rect.x +
                    t.rect.width / 2, t.rect.y + t.rect.height, s.Bottom))), this.calcRotateAnchors()
            }
            calcRotateAnchors(t) {
                void 0 === t && (t = this.rotate), this.rotatedAnchors = [];
                for (const e of this.anchors) this.rotatedAnchors.push(e.clone().rotate(t, this.rect.center))
            }
            getTextRect() {
                let t = this.textRect;
                return this.icon || this.image || (t = this.fullTextRect), t
            }
            getIconRect() {
                let t = this.iconRect;
                return this.text || (t = this.fullIconRect || this.fullTextRect || this.rect), t
            }
            calcRectInParent(t) {
                this.rectInParent = {
                    x: (this.rect.x - t.rect.x) / t.rect.width * 100 + "%",
                    y: (this.rect.y - t.rect.y) / t.rect.height * 100 + "%",
                    width: this.rect.width / t.rect.width * 100 + "%",
                    height: this.rect.height / t.rect.height * 100 + "%",
                    rotate: this.rotate
                }
            }
            getDockWatchers() {
                this.dockWatchers = this.rect.toPoints(), this.dockWatchers.unshift(this.rect.center)
            }
            clearImg() {
                this.img = null
            }
            updateAnimateProps() {
                let t = 0;
                for (let e = 0; e < this.animateFrames.length; ++e) this.animateFrames[e].start = t, t += this.animateFrames[
                    e].duration, this.animateFrames[e].end = t, this.animateFrames[e].initState = ne.cloneState(e ? this.animateFrames[
                e - 1].state : this)
            }
            animate(t) {
                let e = t - this.animateStart;
                if (e > this.animateDuration) {
                    if (++this.animateCycleIndex >= this.animateCycle && this.animateCycle > 0) {
                        this.animateStart = 0, this.animateCycleIndex = 0;
                        const t = this.animateFrames[this.animateFrames.length - 1];
                        return this.dash = t.state.dash, this.strokeStyle = t.state.strokeStyle, this.fillStyle = t.state.fillStyle,
                            this.font = t.state.font, this.lineWidth = t.state.lineWidth, this.rotate = t.state.rotate, this.globalAlpha =
                            t.state.globalAlpha, t.state.rect && t.state.rect.width && (this.rect = new f(t.state.rect.x, t.state.rect
                            .y, t.state.rect.width, t.state.rect.height), this.init()), this.round(), o.Store.set("animateEnd", {
                            type: "node",
                            data: this
                        }), this.nextAnimate
                    }
                    this.animateStart = t, e = 0, this.animateFrames[0].initState = ne.cloneState(this)
                }
                let i = !1;
                for (let t = 0; t < this.animateFrames.length; ++t) {
                    const s = this.animateFrames[t];
                    if (e >= s.start && e < s.end) {
                        this.dash = s.state.dash, this.strokeStyle = s.state.strokeStyle, this.fillStyle = s.state.fillStyle, this.font =
                            s.state.font;
                        const t = (e - s.start) / s.duration;
                        s.linear ? (s.state.rect.x !== s.initState.rect.x && (this.rect.x = s.initState.rect.x + (s.state.rect.x -
                            s.initState.rect.x) * t, i = !0), s.state.rect.y !== s.initState.rect.y && (this.rect.y = s.initState.rect
                            .y + (s.state.rect.y - s.initState.rect.y) * t, i = !0), s.state.rect.width !== s.initState.rect.width &&
                        (this.rect.width = s.initState.rect.width + (s.state.rect.width - s.initState.rect.width) * t, i = !0), s
                            .state.rect.height !== s.initState.rect.height && (this.rect.height = s.initState.rect.height + (s.state.rect
                            .height - s.initState.rect.height) * t, i = !0), this.rect.ex = this.rect.x + this.rect.width, this.rect
                            .ey = this.rect.y + this.rect.height, this.rect.calceCenter(), void 0 !== s.initState.z && s.state.z !==
                        s.initState.z && (this.z = s.initState.z + (s.state.z - s.initState.z) * t, i = !0), s.state.borderRadius !==
                        s.initState.borderRadius && (this.borderRadius = s.initState.borderRadius + (s.state.borderRadius - s.initState
                            .borderRadius) * t), s.state.lineWidth !== s.initState.lineWidth && (this.lineWidth = s.initState.lineWidth +
                            (s.state.lineWidth - s.initState.lineWidth) * t), s.state.rotate !== s.initState.rotate && (this.rotate =
                            s.initState.rotate + (s.state.rotate - s.initState.rotate) * t, i = !0), s.state.globalAlpha !== s.initState
                            .globalAlpha && (this.globalAlpha = s.initState.globalAlpha + (s.state.globalAlpha - s.initState.globalAlpha) *
                            t)) : (this.rect = s.state.rect, this.lineWidth = s.state.lineWidth, this.rotate = s.state.rotate, this.globalAlpha =
                            s.state.globalAlpha)
                    }
                }
                i && (this.init(), o.Store.set("nodeRectChanged", this))
            }
            scale(t, e) {
                if (e || (e = this.rect.center), this.rect.x = e.x - (e.x - this.rect.x) * t, this.rect.y = e.y - (e.y - this
                    .rect.y) * t, this.rect.width *= t, this.rect.height *= t, this.imageWidth && (this.imageWidth *= t), this.imageHeight &&
                (this.imageHeight *= t), this.font.fontSize *= t, this.iconSize *= t, this.rect.round(), this.animateFrames)
                    for (const i of this.animateFrames) i.state && (i.state = new ne(i.state), i.state.scale(t, e));
                if (this.init(), this.children)
                    for (const i of this.children) i.scale(t, e)
            }
            translate(t, e) {
                if (this.rect.x += t, this.rect.y += e, this.rect.ex = this.rect.x + this.rect.width, this.rect.ey = this.rect
                    .y + this.rect.height, this.rect.calceCenter(), this.animateFrames)
                    for (const i of this.animateFrames) i.state && (i.state.rect.x += t, i.state.rect.y += e, i.state.rect.ex =
                        i.state.rect.x + i.state.rect.width, i.state.rect.ey = i.state.rect.y + i.state.rect.height);
                if (this.init(), this.children)
                    for (const i of this.children) i.translate(t, e)
            }
            round() {
                if (this.rect.round(), this.children)
                    for (const t of this.children) t.rect.round()
            }
        }
        class he extends u {
            constructor(t) {
                if (super(t), this.controlPoints = [], this.animateColor = "", this.animateSpan = 1, this.animatePos = 0, t) {
                    t.from && (this.from = new h(t.from.x, t.from.y, t.from.direction, t.from.anchorIndex, t.from.id)), t.to &&
                    (this.to = new h(t.to.x, t.to.y, t.to.direction, t.to.anchorIndex, t.to.id));
                    for (const e of t.controlPoints) this.controlPoints.push(new h(e.x, e.y, e.direction, e.anchorIndex, e.id));
                    this.fromArrow = t.fromArrow || "", this.toArrow = t.toArrow || "", t.animateColor && (this.animateColor = t
                        .animateColor), t.animateSpan && (this.animateSpan = t.animateSpan), t.length && (this.length = t.length)
                } else this.name = "curve", this.fromArrow = "triangleSolid"
            }
            setFrom(t, e = "") {
                this.from = t, this.fromArrow = e
            }
            setTo(t, e = "triangleSolid") {
                this.to = t, this.toArrow = e
            }
            calcControlPoints() {
                this.to && se[this.name] && se[this.name].controlPointsFn(this)
            }
            draw(t) {
                se[this.name] && se[this.name].drawFn(t, this);
                const e = o.Store.get("scale");
                if (this.fromArrow && oe[this.fromArrow]) {
                    t.save(), t.beginPath(), this.strokeStyle ? t.fillStyle = this.strokeStyle : t.fillStyle = t.strokeStyle;
                    let i = this.to;
                    "curve" === this.name ? i = nt(.9, this.to, this.controlPoints[1], this.controlPoints[0], this.from) :
                        "line" !== this.name && this.controlPoints.length && (i = this.controlPoints[0]), oe[this.fromArrow](t, i,
                        this.from, e), t.restore()
                }
                if (this.toArrow && oe[this.toArrow]) {
                    t.save(), t.beginPath(), this.strokeStyle ? t.fillStyle = this.strokeStyle : t.fillStyle = t.strokeStyle;
                    let i = this.from;
                    "curve" === this.name ? i = nt(.9, this.from, this.controlPoints[0], this.controlPoints[1], this.to) :
                        "line" !== this.name && this.controlPoints.length && (i = this.controlPoints[this.controlPoints.length - 1]),
                        oe[this.toArrow](t, i, this.to, e), t.restore()
                }
            }
            pointIn(t) {
                return se[this.name].pointIn(t, this)
            }
            getLen() {
                switch (this.name) {
                    case "line":
                        return d(this.from, this.to);
                    case "polyline":
                        if (!this.controlPoints || !this.controlPoints.length) return d(this.from, this.to);
                        let t = 0,
                            e = this.from;
                        for (const i of this.controlPoints) t += d(e, i), e = i;
                        return 0 | (t += d(e, this.to));
                    case "curve":
                        return function(t, e, i, s) {
                            const o = document.createElementNS("http://www.w3.org/2000/svg", "path");
                            return o.setAttribute("d", `M${t.x} ${t.y} C${e.x} ${e.y} ${i.x} ${i.y} ${s.x} ${s.y}`), 0 | o.getTotalLength()
                        }(this.from, this.controlPoints[0], this.controlPoints[1], this.to)
                }
                return 0
            }
            animate() {
                if (this.animatePos += this.animateSpan, this.lineDash = [this.animatePos, this.length - this.animatePos + 1],
                this.animatePos > this.length + this.animateSpan) {
                    if (++this.animateCycleIndex >= this.animateCycle && this.animateCycle > 0) return this.animateStart = 0, o.Store
                        .set("animateEnd", {
                            type: "line",
                            data: this
                        }), this.nextAnimate;
                    this.animatePos = this.animateSpan
                }
            }
            round() {
                this.from.round(), this.to.round()
            }
        }
        class ce {
            constructor(t) {
                if (this.nodes = [], this.lines = [], this.lineName = "curve", this.fromArrowType = "", this.toArrowType =
                    "triangleSolid", this.scale = 1, this.locked = 0, t) {
                    this.nodes = [];
                    for (const e of t.nodes) this.nodes.push(new ne(e));
                    this.lines = [];
                    for (const e of t.lines) this.lines.push(new he(e));
                    this.lineName = t.lineName || "curve", this.fromArrowType = t.fromArrowType || "", this.toArrowType = t.toArrowType ||
                        "triangleSolid", this.scale = t.scale || 1, this.locked = t.locked || 0
                }
            }
        }
        class ae {
            constructor(t, e = {}) {
                if (this.parentElem = t, this.options = e, this.data = o.Store.get("topology-data"), this.canvas = document.createElement(
                    "canvas"), this.width = 0, this.height = 0, this.canvas.style.position = "absolute", this.canvas.style.left =
                    "0", this.canvas.style.top = "0", this.canvas.style.outline = "none", !ae.dpiRatio) {
                    const t = this.canvas.getContext("2d"),
                        e = t.webkitBackingStorePixelRatio || t.mozBackingStorePixelRatio || t.msBackingStorePixelRatio || t.oBackingStorePixelRatio ||
                            t.backingStorePixelRatio || 1;
                    ae.dpiRatio = window.devicePixelRatio / e + .25
                }
            }
            resize(t) {
                t ? (this.width = 0 | t.width, this.height = 0 | t.height) : (this.options.width && "auto" !== this.options.width ?
                    this.width = +this.options.width : this.width = this.parentElem.clientWidth, this.options.height && "auto" !==
                this.options.height ? this.height = +this.options.height : this.height = this.parentElem.clientHeight - 8),
                    this.canvas.style.width = this.width + "px", this.canvas.style.height = this.height + "px", this.canvas.width =
                    this.width * ae.dpiRatio | 0, this.canvas.height = this.height * ae.dpiRatio | 0, this.canvas.getContext(
                    "2d").scale(ae.dpiRatio, ae.dpiRatio), o.Store.set("LT:size", {
                    width: this.canvas.width,
                    height: this.canvas.height
                })
            }
            render() {
                this.canvas.getContext("2d").clearRect(0, 0, this.canvas.width, this.canvas.height)
            }
            getDpiRatio() {
                return ae.dpiRatio
            }
        }
        ae.dpiRatio = 0;
        class de extends ae {
            constructor(t, e = {}) {
                super(t, e), this.parentElem = t, this.options = e, this.activeLayer = o.Store.get("LT:ActiveLayer"), this.hoverLayer =
                    o.Store.get("LT:HoverLayer"), this.animateLayer = o.Store.get("LT:AnimateLayer"), o.Store.set("LT:offscreen",
                    this.canvas)
            }
            render() {
                super.render();
                const t = this.canvas.getContext("2d");
                t.strokeStyle = this.options.color, this.renderNodes(), this.renderLines(), this.animateLayer.render(t), this
                    .activeLayer.render(t), this.hoverLayer.render(t)
            }
            renderNodes() {
                if (!this.data.nodes.length) return;
                const t = this.canvas.getContext("2d");
                for (const e of this.data.nodes) e.render(t)
            }
            renderLines() {
                if (!this.data.lines.length) return;
                const t = this.canvas.getContext("2d");
                let e = 0;
                for (const i of this.data.lines) i.to ? (i.render(t), ++e) : this.data.lines.splice(e++, 1)
            }
        }
        class le extends ae {
            constructor(t, e = {}) {
                super(t, e), this.parentElem = t, this.options = e, this.offscreen = o.Store.get("LT:offscreen"), this.parentElem
                    .appendChild(this.canvas)
            }
            render() {
                const t = this.canvas.getContext("2d");
                t.clearRect(0, 0, this.canvas.width, this.canvas.height), t.drawImage(this.offscreen, 0, 0, this.width, this.height)
            }
        }
        class ye {
            constructor(t = {}) {
                this.options = t, this.data = o.Store.get("topology-data"), this.anchorRadius = 4, this.hoverAnchorIndex = -1,
                    this.dockLineX = 0, this.dockLineY = 0, o.Store.set("LT:HoverLayer", this), this.options.hoverColor || (this
                    .options.hoverColor = "#d4380d"), this.options.dragColor || (this.options.dragColor = "#d4380d")
            }
            setLine(t, e = "", i = "curve") {
                this.line = new he, this.line.name = i, this.line.setFrom(t, e), this.data.lines.push(this.line)
            }
            lineTo(t, e = "triangleSolid") {
                this.line && !this.line.locked && (this.line.setTo(t, e), (this.line.from.id || this.line.to.id) && this.line
                    .calcControlPoints())
            }
            lineFrom(t) {
                this.line.locked || (this.line.setFrom(t, this.line.fromArrow), (this.line.from.id || this.line.to.id) &&
                this.line.calcControlPoints())
            }
            lineMove(t, e) {
                if (this.line.locked) return;
                const i = t.x - e.x,
                    s = t.y - e.y;
                if (this.line.setTo(new h(this.initLine.to.x + i, this.initLine.to.y + s), this.line.toArrow), this.line.setFrom(
                    new h(this.initLine.from.x + i, this.initLine.from.y + s), this.line.fromArrow), this.line.from.id || this.line
                    .to.id) this.line.calcControlPoints();
                else {
                    for (let t = 0; t < this.initLine.controlPoints.length; ++t) this.line.controlPoints[t].x = this.initLine.controlPoints[
                        t].x + i, this.line.controlPoints[t].y = this.initLine.controlPoints[t].y + s;
                    o.Store.set("pts-" + this.line.id, null)
                }
            }
            render(t) {
                if (this.data.locked < 0) return;
                if (t.save(), t.strokeStyle = this.options.hoverColor, t.fillStyle = "#fff", this.node && !this.data.locked) {
                    this.nodeRect || (this.nodeRect = this.getParentRect(this.node)), this.nodeRect && (t.save(), t.globalAlpha =
                        .2, t.beginPath(), t.strokeRect(this.nodeRect.x, this.nodeRect.y, this.nodeRect.width, this.nodeRect.height),
                        t.restore());
                    for (let e = 0; e < this.node.rotatedAnchors.length; ++e) this.node.locked || this.node.rotatedAnchors[e].hidden &&
                    this.hoverAnchorIndex !== e || (t.beginPath(), t.arc(this.node.rotatedAnchors[e].x, this.node.rotatedAnchors[
                        e].y, this.anchorRadius, 0, 2 * Math.PI), t.fill(), t.stroke())
                }
                this.line && this.line.to && this.line.render(t);
                const e = o.Store.get("activeLine");
                if (e && se[e.name].drawControlPointsFn(t, e), t.fillStyle = this.options.hoverColor, this.dockAnchor && (t.beginPath(),
                    t.arc(this.dockAnchor.x, this.dockAnchor.y, 4, 0, 2 * Math.PI), t.fill()), this.hoverLineCP && (t.beginPath(),
                    t.arc(this.hoverLineCP.x, this.hoverLineCP.y, 5, 0, 2 * Math.PI), t.fill()), t.strokeStyle = this.options.dragColor +
                    "50", t.fillStyle = this.options.dragColor + "30", t.lineWidth = 1, this.dockLineX > 0) {
                    const e = o.Store.get("LT:size");
                    t.beginPath(), t.moveTo(this.dockLineX, 0), t.lineTo(this.dockLineX, e.height), t.stroke()
                }
                if (this.dockLineY > 0) {
                    const e = o.Store.get("LT:size");
                    t.beginPath(), t.moveTo(0, this.dockLineY), t.lineTo(e.width, this.dockLineY), t.stroke()
                }
                this.dragRect && (t.strokeStyle = this.options.dragColor, t.beginPath(), t.strokeRect(this.dragRect.x, this.dragRect
                    .y, this.dragRect.width, this.dragRect.height), t.fillRect(this.dragRect.x, this.dragRect.y, this.dragRect
                    .width, this.dragRect.height)), t.restore()
            }
            getParentRect(t) {
                if (!t.parentId) return null;
                for (const e of this.data.nodes)
                    if (e.id === t.parentId) {
                        const t = this.getParentRect(e);
                        return t || e.rect
                    } return null
            }
            clear() {
                this.node = null, this.line = null
            }
        }
        class fe {
            constructor(t = {}) {
                this.options = t, this.data = o.Store.get("topology-data"), this.rotateCPs = [], this.sizeCPs = [], this.nodes = [],
                    this.lines = [], this.rotate = 0, this.initialSizeCPs = [], this.nodeRects = [], this.childrenRects = {},
                    this.dockWatchers = [], this.rotating = !1, o.Store.set("LT:ActiveLayer", this), this.options.activeColor ||
                (this.options.activeColor = "#d4380d")
            }
            calcControlPoints() {
                if (1 === this.nodes.length) {
                    if (this.rect = this.nodes[0].rect, this.sizeCPs = this.nodes[0].rect.toPoints(), this.rotateCPs = [new h(
                        this.nodes[0].rect.x + this.nodes[0].rect.width / 2, this.nodes[0].rect.y - 35), new h(this.nodes[0].rect
                        .x + this.nodes[0].rect.width / 2, this.nodes[0].rect.y)], this.rotate || this.nodes[0].rotate) {
                        for (const t of this.sizeCPs) this.nodes[0].rotate && t.rotate(this.nodes[0].rotate, this.nodes[0].rect.center),
                        this.rotate && t.rotate(this.rotate, this.rect.center);
                        for (const t of this.rotateCPs) this.nodes[0].rotate && t.rotate(this.nodes[0].rotate, this.nodes[0].rect.center),
                        this.rotate && t.rotate(this.rotate, this.rect.center)
                    }
                    return void(this.options.hideRotateCP && (this.rotateCPs = [new h(-1e3, -1e3), new h(-1e3, -1e3)]))
                }
                let t = 99999,
                    e = 99999,
                    i = -99999,
                    s = -99999;
                const o = this.getPoints();
                for (const r of o) t > r.x && (t = r.x), e > r.y && (e = r.y), i < r.x && (i = r.x), s < r.y && (s = r.y);
                this.rect = new f(t, e, i - t, s - e), this.sizeCPs = [new h(t, e), new h(i, e), new h(i, s), new h(t, s)],
                    this.rotateCPs = [new h(t + (i - t) / 2, e - 35), new h(t + (i - t) / 2, e)], this.options.hideRotateCP && (
                    this.rotateCPs = [new h(-1e3, -1e3), new h(-1e3, -1e3)])
            }
            locked() {
                for (const t of this.nodes)
                    if (!t.locked) return !1;
                for (const t of this.lines)
                    if (!t.locked) return !1;
                return !0
            }
            getPoints() {
                const t = [];
                for (const e of this.nodes) {
                    const i = e.rect.toPoints();
                    if (e.rotate)
                        for (const t of i) t.rotate(e.rotate, e.rect.center);
                    t.push.apply(t, i)
                }
                return t
            }
            clear() {
                this.lines = [], this.nodes = [], o.Store.set("LT:activeNode", null)
            }
            saveNodeRects() {
                this.nodeRects = [], this.childrenRects = {};
                for (const t of this.nodes) this.nodeRects.push(new f(t.rect.x, t.rect.y, t.rect.width, t.rect.height)), this
                    .saveChildrenRects(t);
                this.initialSizeCPs = [];
                for (const t of this.sizeCPs) {
                    const e = t.clone();
                    1 === this.nodes.length && this.nodes[0].rotate && e.rotate(-this.nodes[0].rotate, this.nodes[0].rect.center),
                        this.initialSizeCPs.push(e)
                }
                this.getDockWatchers()
            }
            saveChildrenRects(t) {
                if (t.children)
                    for (const e of t.children) this.childrenRects[e.id] = new f(e.rect.x, e.rect.y, e.rect.width, e.rect.height),
                        this.saveChildrenRects(e)
            }
            resizeNodes(t, e) {
                let i = 0;
                const s = new h(0, 0);
                let o, r, n, c;
                for (const h of this.nodes) {
                    switch (t) {
                        case 0:
                            o = e.x, r = e.y, n = this.initialSizeCPs[2].x - e.x, c = this.initialSizeCPs[2].y - e.y, s.x = n > 5 ? o :
                                this.initialSizeCPs[2].x - 5, s.y = c > 5 ? r : this.initialSizeCPs[2].y - 5;
                            break;
                        case 1:
                            r = e.y, n = e.x - this.initialSizeCPs[0].x, c = this.initialSizeCPs[2].y - e.y, s.x = this.initialSizeCPs[
                                0].x, s.y = c > 5 ? r : this.initialSizeCPs[2].y - 5;
                            break;
                        case 2:
                            n = e.x - this.initialSizeCPs[0].x, c = e.y - this.initialSizeCPs[0].y, s.x = this.initialSizeCPs[0].x, s.y =
                                this.initialSizeCPs[0].y;
                            break;
                        case 3:
                            o = e.x, n = this.initialSizeCPs[2].x - e.x, c = e.y - this.initialSizeCPs[0].y, s.x = n > 5 ? o : this.initialSizeCPs[
                                2].x - 5, s.y = this.initialSizeCPs[0].y
                    }
                    n = n > 5 ? n : 5, c = c > 5 ? c : 5, this.calcResizedPos(h.rect, this.nodeRects[i], s, n / (this.initialSizeCPs[
                        2].x - this.initialSizeCPs[0].x), c / (this.initialSizeCPs[2].y - this.initialSizeCPs[0].y)), h.rect.floor(),
                        h.rect.calceCenter(), h.init(), this.updateChildren(h), ++i
                }
                this.updateLines()
            }
            calcResizedPos(t, e, i, s, o) {
                t.x = i.x + (e.x - this.initialSizeCPs[0].x) * s, t.y = i.y + (e.y - this.initialSizeCPs[0].y) * o, t.width =
                    e.width * s, t.height = e.height * o, t.ex = t.x + t.width, t.ey = t.y + t.height
            }
            moveNodes(t, e) {
                if (this.nodeRects.length !== this.nodes.length) return;
                let i = 0;
                for (const s of this.nodes)
                    if (!s.locked) {
                        if (s.rect.x = this.nodeRects[i].x + t, s.rect.y = this.nodeRects[i].y + e, s.rect.ex = s.rect.x + s.rect.width,
                            s.rect.ey = s.rect.y + s.rect.height, s.rect.floor(), s.rect.calceCenter(), s.init(), this.updateChildren(
                            s), s.parentId && s.stand) {
                            let t;
                            for (const e of this.data.nodes)
                                if (e.id === s.parentId) {
                                    t = e;
                                    break
                                } s.calcRectInParent(t)
                        }++i
                    } this.updateLines(), this.options.on && this.options.on("moveNodes", this.nodes)
            }
            updateChildren(t) {
                if (t.children)
                    for (const e of t.children) e.calcChildRect(t), e.init(), this.updateChildren(e)
            }
            updateLines(t) {
                t || (t = this.nodes);
                for (const e of this.data.lines) {
                    let i = !1;
                    for (const s of t) e.from.id === s.id && (e.from.x = s.rotatedAnchors[e.from.anchorIndex].x, e.from.y = s.rotatedAnchors[
                        e.from.anchorIndex].y, i = !0), e.to.id === s.id && (e.to.x = s.rotatedAnchors[e.to.anchorIndex].x, e.to.y =
                        s.rotatedAnchors[e.to.anchorIndex].y, i = !0), s.children && this.updateLines(s.children);
                    i && e.calcControlPoints()
                }
            }
            changeLineType() {
                for (const t of this.lines) t.calcControlPoints()
            }
            offsetRotate(t) {
                this.rotating = !0;
                let e = 0;
                for (const i of this.nodes) {
                    const s = this.nodeRects[e].center.clone();
                    this.nodes.length > 1 && s.rotate(t, this.rect.center), i.rect.x = s.x - i.rect.width / 2, i.rect.y = s.y -
                        i.rect.height / 2, i.rect.ex = i.rect.x + i.rect.width, i.rect.ey = i.rect.y + i.rect.height, i.rect.calceCenter(),
                        i.init(), i.offsetRotate = t, i.calcRotateAnchors(i.rotate + i.offsetRotate), this.updateChildren(i), ++e
                }
                this.rotate = t
            }
            updateRotate() {
                for (const t of this.nodes) t.rotate += t.offsetRotate, t.offsetRotate = 0;
                this.rotate = 0, this.rotating = !1
            }
            addNode(t) {
                this.nodes.push(t), 1 === this.nodes.length && o.Store.set("LT:activeNode", this.nodes[0])
            }
            setNodes(t) {
                this.nodes = t, this.lines = [], 1 === this.nodes.length && o.Store.set("LT:activeNode", this.nodes[0])
            }
            hasNode(t) {
                let e = !1;
                for (const i of this.nodes)
                    if (i.id === t.id) {
                        e = !0;
                        break
                    } return e
            }
            setLines(t) {
                this.nodes = [], this.lines = t
            }
            render(t) {
                if (!(this.data.locked < -1) && (this.nodes.length || this.lines.length)) {
                    1 !== this.nodes.length && this.rotating || this.calcControlPoints(), t.save(), t.strokeStyle = this.options
                        .activeColor, t.fillStyle = "#fff", t.lineWidth = 1;
                    for (const e of this.nodes) {
                        const i = new ne(e);
                        i.fillStyle = null, i.bkType = 0, i.icon = "", i.image = "", i.text = "", i.children = null, "transparent" !==
                        i.strokeStyle && (i.strokeStyle = "#ffffff", i.lineWidth += 2, i.render(t), i.strokeStyle = "#d4380d", i.lineWidth -=
                            2), i.render(t)
                    }
                    for (const e of this.lines) {
                        if (!e.to) continue;
                        const i = new he(e);
                        i.strokeStyle = "#ffffff", i.lineWidth += 1, i.render(t), i.strokeStyle = "#d4380d", i.lineWidth -= 1, i.render(
                            t)
                    }
                    if (this.rotate && this.nodes.length > 1 && (t.translate(this.rect.center.x, this.rect.center.y), t.rotate(
                        this.rotate * Math.PI / 180), t.translate(-this.rect.center.x, -this.rect.center.y)), t.save(), t.globalAlpha =
                        .3, t.translate(.5, .5), t.beginPath(), t.moveTo(this.sizeCPs[0].x, this.sizeCPs[0].y), t.lineTo(this.sizeCPs[
                        1].x, this.sizeCPs[1].y), t.lineTo(this.sizeCPs[2].x, this.sizeCPs[2].y), t.lineTo(this.sizeCPs[3].x, this
                        .sizeCPs[3].y), t.closePath(), t.stroke(), t.restore(), this.data.locked || this.locked()) t.restore();
                    else {
                        t.beginPath(), t.moveTo(this.rotateCPs[0].x, this.rotateCPs[0].y), t.lineTo(this.rotateCPs[1].x, this.rotateCPs[
                            1].y), t.stroke(), t.beginPath(), t.arc(this.rotateCPs[0].x, this.rotateCPs[0].y, 5, 0, 2 * Math.PI), t.fill(),
                            t.stroke(), t.lineWidth = 1;
                        for (const e of this.sizeCPs) t.save(), t.beginPath(), 1 === this.nodes.length && (this.nodes[0].rotate ||
                            this.rotate) && (t.translate(e.x, e.y), t.rotate((this.nodes[0].rotate + this.rotate) * Math.PI / 180), t
                            .translate(-e.x, -e.y)), t.fillRect(e.x - 4.5, e.y - 4.5, 8, 8), t.strokeRect(e.x - 5.5, e.y - 5.5, 10,
                            10), t.restore();
                        t.restore()
                    }
                }
            }
            getDockWatchers() {
                if (1 === this.nodes.length) return this.dockWatchers = this.nodeRects[0].toPoints(), void this.dockWatchers.unshift(
                    this.nodeRects[0].center);
                this.rect && (this.dockWatchers = this.rect.toPoints(), this.dockWatchers.unshift(this.rect.center))
            }
            alignNodes(t) {
                switch (t) {
                    case "left":
                        for (const t of this.nodes) t.rect.x = this.rect.x, t.rect.floor(), t.rect.calceCenter(), t.init(), this.updateChildren(
                            t);
                        break;
                    case "right":
                        for (const t of this.nodes) t.rect.x = this.rect.ex - t.rect.width, t.rect.floor(), t.rect.calceCenter(), t
                            .init(), this.updateChildren(t);
                        break;
                    case "top":
                        for (const t of this.nodes) t.rect.y = this.rect.y, t.rect.floor(), t.rect.calceCenter(), t.init(), this.updateChildren(
                            t);
                        break;
                    case "bottom":
                        for (const t of this.nodes) t.rect.y = this.rect.ey - t.rect.height, t.rect.floor(), t.rect.calceCenter(),
                            t.init(), this.updateChildren(t);
                        break;
                    case "center":
                        for (const t of this.nodes) t.rect.x = this.rect.center.x - t.rect.width / 2, t.rect.floor(), t.rect.calceCenter(),
                            t.init(), this.updateChildren(t);
                        break;
                    case "middle":
                        for (const t of this.nodes) t.rect.y = this.rect.center.y - t.rect.height / 2, t.rect.floor(), t.rect.calceCenter(),
                            t.init(), this.updateChildren(t)
                }
                this.updateLines()
            }
        }
        class ue {
            constructor(t = {}) {
                this.options = t, this.data = o.Store.get("topology-data"), this.nodes = [], this.lines = [], this.last =
                    Date.now(), o.Store.set("LT:AnimateLayer", this), this.options.animateColor || (this.options.animateColor =
                    "#ff6600")
            }
            start(t = !0) {
                this.timer && cancelAnimationFrame(this.timer), t && (this.nodes = [], this.lines = []), this.getNodes(this.data
                    .nodes), this.getLines(), this.animate()
            }
            getNodes(t, e = "") {
                if (t)
                    for (const i of t) {
                        let t = !1;
                        e && i.tags.indexOf(e) > -1 && (i.animateStart = Date.now());
                        for (let e = 0; e < this.nodes.length; ++e) this.nodes[e].id === i.id && (i.animateCycleIndex = 1, t = !0,
                        i.animateStart || this.nodes.splice(e, 1));
                        !t && i.animateStart && (i.updateAnimateProps(), this.nodes.push(i), this.getNodes(i.children))
                    }
            }
            getLines(t = "") {
                for (const e of this.data.lines) {
                    let i = !1;
                    t && e.tags.indexOf(t) > -1 && (e.animateStart = Date.now());
                    for (let t = 0; t < this.lines.length; ++t) this.lines[t].id === e.id && (this.lines[t].animateCycle = e.animateCycle,
                        this.lines[t].animateCycleIndex = 1, this.lines[t].animateColor = e.animateColor || this.options.animateColor,
                        this.lines[t].strokeStyle = e.animateColor || this.options.animateColor, this.lines[t].animateSpan = e.animateSpan,
                        i = !0, e.animateStart ? this.lines[t].animateStart = e.animateStart : this.lines.splice(t, 1));
                    if (!i && e.animateStart) {
                        const t = new he(e);
                        t.animateStart = e.animateStart, t.fromArrow = "", t.toArrow = "", t.lineCap = "round", t.lineWidth += 1, t
                            .fillStyle = "#fff", t.strokeStyle = t.animateColor || this.options.animateColor, t.length = t.getLen(),
                            this.lines.push(t)
                    }
                }
            }
            animate() {
                this.lines.length || this.nodes.length ? this.timer = requestAnimationFrame(() => {
                    const t = Date.now(),
                        e = t - this.last;
                    if (this.last = t, e > 15) {
                        for (let e = 0; e < this.lines.length; ++e) {
                            if (this.lines[e].animateStart > t) continue;
                            const i = this.lines[e].animate();
                            if (!this.lines[e].animateStart)
                                for (const t of this.data.lines)
                                    if (this.lines[e].id === t.id) {
                                        t.animateStart = 0;
                                        break
                                    } i && (this.lines.splice(e, 1), this.getNodes(this.data.nodes, i), this.getLines(i)), this.lines[e] &&
                            !this.lines[e].animateStart && this.lines.splice(e, 1)
                        }
                        for (let e = 0; e < this.nodes.length; ++e)
                            if (!(this.nodes[e].animateStart > t))
                                if (this.nodes[e].animateDuration && this.nodes[e].animateStart) {
                                    const i = this.nodes[e].animate(t);
                                    i && (this.getNodes(this.data.nodes, i), this.getLines(i))
                                } else this.nodes.splice(e, 1);
                        o.Store.set("LT:render", !0)
                    }
                    this.animate()
                }) : this.timer = null
            }
            updateLines(t) {
                t || (t = this.nodes);
                for (const e of this.lines) {
                    let i = !1;
                    for (const s of t) e.from.id === s.id && (e.from.x = s.rotatedAnchors[e.from.anchorIndex].x, e.from.y = s.rotatedAnchors[
                        e.from.anchorIndex].y, i = !0), e.to.id === s.id && (e.to.x = s.rotatedAnchors[e.to.anchorIndex].x, e.to.y =
                        s.rotatedAnchors[e.to.anchorIndex].y, i = !0), s.children && this.updateLines(s.children);
                    i && (e.calcControlPoints(), e.length = e.getLen())
                }
            }
            render(t) {
                for (const e of this.lines) e.render(t)
            }
            destroy() {
                this.timer && cancelAnimationFrame(this.timer)
            }
        }
        class xe {
            constructor(t, e = {}) {
                this.parentElem = t, this.options = e, this.data = o.Store.get("topology-data"), this.canvas = document.createElement(
                    "div"), this.player = document.createElement("div"), this.videos = {}, this.audios = {}, this.iframes = {},
                    this.gifs = {}, this.addDiv = t => {
                    t.audio && (this.audios[t.id] && this.audios[t.id].media.src !== t.audio && (this.audios[t.id].media.src =
                        t.audio), this.setElemPosition(t, this.audios[t.id] && this.audios[t.id].player || this.addMedia(t,
                        "audio"))), t.video && (this.videos[t.id] && this.videos[t.id].media.src !== t.video && (this.videos[t.id]
                        .media.src = t.video), this.setElemPosition(t, this.videos[t.id] && this.videos[t.id].player || this.addMedia(
                        t, "video"))), t.iframe && (this.iframes[t.id] && this.iframes[t.id].src !== t.iframe && (this.iframes[t.id]
                        .src = t.iframe), this.setElemPosition(t, this.iframes[t.id] || this.addIframe(t))), t.gif && (this.gifs[
                        t.id] && this.gifs[t.id].src !== t.image && (this.gifs[t.id].src = t.image), this.setElemPosition(t,
                        this.gifs[t.id] || this.addGif(t)))
                }, this.options.playIcon || (this.options.playIcon = "iconfont icon-play"), this.options.pauseIcon || (this.options
                    .pauseIcon = "iconfont icon-pause"), this.options.fullScreenIcon || (this.options.fullScreenIcon =
                    "iconfont icon-full-screen"), this.options.loopIcon || (this.options.loopIcon = "iconfont icon-loop"), this
                    .canvas.style.position = "absolute", this.canvas.style.left = "0", this.canvas.style.top = "0", this.canvas.style
                    .outline = "none", this.canvas.style.background = "transparent", t.appendChild(this.canvas), t.appendChild(
                    this.player), this.createPlayer(), this.subcribe = o.Store.subscribe("LT:addDiv", this.addDiv), this.subcribeNode =
                    o.Store.subscribe("LT:activeNode", t => {
                        if (t && (t.video || t.audio)) {
                            if (t.audio && this.audios[t.id]) this.media = this.audios[t.id].media;
                            else {
                                if (!t.video || !this.videos[t.id]) return;
                                this.media = this.videos[t.id].media
                            }
                            this.curNode = t, this.player.style.top = this.parentElem.offsetTop + this.parentElem.clientHeight - 40 +
                                "px", this.getMediaCurrent(), this.media.paused ? this.playBtn.className = this.options.playIcon : this.playBtn
                                .className = this.options.pauseIcon
                        } else this.player.style.top = "-99999px"
                    }), document.addEventListener("fullscreenchange", t => {
                    this.media && (document.fullscreen ? (this.media.controls = !0, this.media.style.userSelect = "initial",
                        this.media.style.pointerEvents = "initial") : (this.media.style.userSelect = "none", this.media.style.pointerEvents =
                        "none", this.media.controls = !1))
                })
            }
            createPlayer() {
                this.player.style.position = "fixed", this.player.style.outline = "none", this.player.style.left = this.parentElem
                    .offsetLeft + "px", this.player.style.top = "-99999px", this.player.style.width = this.parentElem.clientWidth +
                    "px", this.player.style.height = "40px", this.player.style.padding = "10px 15px", this.player.style.background =
                    "rgba(200,200,200,.1)", this.player.style.display = "flex", this.player.style.alignItems = "center", this.player
                    .style.userSelect = "initial", this.player.style.pointerEvents = "initial", this.player.style.zIndex = "1",
                    this.playBtn = document.createElement("i"), this.currentTime = document.createElement("span"), this.progress =
                    document.createElement("div"), this.progressCurrent = document.createElement("div"), this.loop = document.createElement(
                    "i");
                const t = document.createElement("i");
                this.playBtn.className = this.options.playIcon, this.playBtn.style.fontSize = "18px", this.playBtn.style.lineHeight =
                    "20px", this.playBtn.style.cursor = "pointer", this.currentTime.style.padding = "0 10px", this.currentTime.innerText =
                    "0 / 0", this.progress.style.position = "relative", this.progress.style.flexGrow = "1", this.progress.style.top =
                    "0", this.progress.style.height = "4px", this.progress.style.background = "#ccc", this.progress.style.borderRadius =
                    "2px", this.progress.style.overflow = "hidden", this.progress.style.cursor = "pointer", this.progressCurrent
                    .style.position = "absolute", this.progressCurrent.style.left = "0", this.progressCurrent.style.top = "0",
                    this.progressCurrent.style.bottom = "0", this.progressCurrent.style.width = "0", this.progressCurrent.style.background =
                    "#52c41a", this.loop.style.margin = "0 10px", this.loop.style.padding = "2px 5px", this.loop.style.borderRadius =
                    "2px", this.loop.className = this.options.loopIcon, this.loop.style.fontSize = "18px", this.loop.style.lineHeight =
                    "20px", this.loop.style.cursor = "pointer", t.className = this.options.fullScreenIcon, t.style.fontSize =
                    "17px", t.style.lineHeight = "20px", t.style.cursor = "pointer", this.player.appendChild(this.playBtn), this
                    .player.appendChild(this.currentTime), this.player.appendChild(this.progress), this.progress.appendChild(
                    this.progressCurrent), this.player.appendChild(this.loop), this.player.appendChild(t), this.playBtn.onclick =
                    () => {
                        this.media.paused ? (this.media.play(), this.playBtn.className = this.options.pauseIcon) : (this.media.pause(),
                            this.playBtn.className = this.options.playIcon)
                    }, this.progress.onclick = t => {
                    this.media.currentTime = t.offsetX / this.progress.clientWidth * this.media.duration
                }, this.loop.onclick = () => {
                    this.media.loop = !this.media.loop, this.curNode.playLoop = this.media.loop, this.media.loop ? this.loop.style
                        .background = "#ddd" : this.loop.style.background = "none"
                }, t.onclick = () => {
                    this.media.requestFullscreen()
                }
            }
            getMediaCurrent() {
                this.media && (this.currentTime.innerText = this.formatSeconds(this.media.currentTime) + " / " + this.formatSeconds(
                    this.media.duration), this.progressCurrent.style.width = this.media.currentTime / this.media.duration *
                    this.progress.clientWidth + "px")
            }
            addMedia(t, e) {
                const i = document.createElement("div"),
                    s = document.createElement("div"),
                    r = document.createElement(e);
                return s.style.position = "absolute", s.style.outline = "none", s.style.left = "0", s.style.bottom = "0", s.style
                    .height = "2px", s.style.background = "#52c41a", r.style.position = "absolute", r.style.outline = "none", r.style
                    .left = "0", r.style.right = "0", r.style.top = "0", r.style.bottom = "0", "video" === e && (r.style.width =
                    t.rect.width + "px", r.style.height = t.rect.height + "px"), i.style.background = "transparent", 1 === t.play &&
                (r.autoplay = !0), r.loop = t.playLoop, r.ontimeupdate = () => {
                    s.style.width = r.currentTime / r.duration * t.rect.width + "px", this.getMediaCurrent(), this.media === r &&
                    (t.playLoop ? (r.loop = !0, this.loop.style.background = "#ddd") : (r.loop = !1, this.loop.style.background =
                        "none"))
                }, r.onended = () => {
                    o.Store.set("mediaEnd", t), this.media === r && (this.playBtn.className = this.options.playIcon), this.playNext(
                        t.nextPlay)
                }, r.onloadedmetadata = () => {
                    this.getMediaCurrent()
                }, r.src = t[e], i.appendChild(r), i.appendChild(s), this[e + "s"][t.id] = {
                    player: i,
                    current: s,
                    media: r
                }, this.canvas.appendChild(i), i
            }
            playNext(t) {
                if (t)
                    for (const e of this.data.nodes) e.tags.indexOf(t) > -1 && (e.audio && this.audios[e.id] && this.audios[e.id]
                        .media && this.audios[e.id].media.paused ? this.audios[e.id].media.play() : e.video && this.videos[e.id].media &&
                        this.videos[e.id].media.paused && this.videos[e.id].media.play())
            }
            addIframe(t) {
                const e = document.createElement("iframe");
                return e.scrolling = "no", e.frameBorder = "0", e.src = t.iframe, this.iframes[t.id] = e, this.canvas.appendChild(
                    e), e
            }
            addGif(t) {
                return this.gifs[t.id] = t.img, this.canvas.appendChild(t.img), t.img
            }
            setElemPosition(t, e) {
                e.style.position = "absolute", e.style.outline = "none", e.style.left = t.rect.x + "px", e.style.top = t.rect
                    .y + "px", e.style.width = t.rect.width + "px", e.style.height = t.rect.height + "px", t.video && this.videos[
                    t.id] && this.videos[t.id].media && (this.videos[t.id].media.style.width = "100%", this.videos[t.id].media.style
                    .height = "100%"), this.data.locked > -1 ? (e.style.userSelect = "none", e.style.pointerEvents = "none") :
                    (e.style.userSelect = "initial", e.style.pointerEvents = "initial")
            }
            removeDiv(t) {
                this.curNode && t.id === this.curNode.id && (this.curNode = null, this.media = null, this.player.style.top =
                    "-99999px"), t.audio && (this.canvas.removeChild(this.audios[t.id].player), this.audios[t.id] = null), t.video &&
                (this.canvas.removeChild(this.videos[t.id].player), this.videos[t.id] = null), t.iframe && (this.canvas.removeChild(
                    this.iframes[t.id]), this.iframes[t.id] = null)
            }
            clear() {
                for (const t of this.data.nodes) t.audio && (this.canvas.removeChild(this.audios[t.id].player), this.audios[t
                    .id] = null), t.video && (this.canvas.removeChild(this.videos[t.id].player), this.videos[t.id] = null), t.iframe &&
                (this.canvas.removeChild(this.iframes[t.id]), this.iframes[t.id] = null)
            }
            formatSeconds(t) {
                const e = Math.floor(t / 3600),
                    i = Math.floor(t / 60) % 60,
                    s = Math.floor(t % 60);
                let o = s + "";
                return o = i ? i + ":" + s : "0:" + s, e && (o = e + ":" + i + ":" + s), o
            }
            resize(t) {
                t ? (this.canvas.style.width = t.width + "px", this.canvas.style.height = t.height + "px") : (this.options.width &&
                "auto" !== this.options.width ? this.canvas.style.width = this.options.width + "px" : this.canvas.style.width =
                    this.parentElem.clientWidth + "px", this.options.height && "auto" !== this.options.height ? this.canvas.style
                    .height = this.options.height + "px" : this.canvas.style.height = this.parentElem.clientHeight - 8 + "px")
            }
            render() {
                for (const t of this.data.nodes) this.addDiv(t)
            }
            destroy() {
                this.clear(), this.subcribe.unsubscribe(), this.subcribeNode.unsubscribe()
            }
        }
        const ge = ["nw-resize", "ne-resize", "se-resize", "sw-resize"];
        var pe;
        ! function(t) {
            t[t.None = 0] = "None", t[t.Line = 1] = "Line", t[t.LineMove = 2] = "LineMove", t[t.LineFrom = 3] = "LineFrom",
                t[t.LineTo = 4] = "LineTo", t[t.LineControlPoint = 5] = "LineControlPoint", t[t.Nodes = 6] = "Nodes", t[t.ResizeCP =
                7] = "ResizeCP", t[t.HoverAnchors = 8] = "HoverAnchors", t[t.Rotate = 9] = "Rotate"
        }(pe || (pe = {}));
        const me = 10;
        var we = i(1);

        function ve(t, e) {
            const i = e.rect.width * e.borderRadius,
                s = e.rect.height * e.borderRadius;
            let o = i < s ? i : s;
            e.rect.width < 2 * o && (o = e.rect.width / 2), e.rect.height < 2 * o && (o = e.rect.height / 2), t.beginPath(),
                t.moveTo(e.rect.x + o, e.rect.y), t.arcTo(e.rect.x + e.rect.width, e.rect.y, e.rect.x + e.rect.width, e.rect.y +
                e.rect.height, o), t.arcTo(e.rect.x + e.rect.width, e.rect.y + e.rect.height, e.rect.x, e.rect.y + e.rect.height,
                o), t.arcTo(e.rect.x, e.rect.y + e.rect.height, e.rect.x, e.rect.y, o), t.arcTo(e.rect.x, e.rect.y, e.rect.x +
                e.rect.width, e.rect.y, o), t.closePath(), t.fill(), t.stroke()
        }

        function Le(t) {
            t.iconRect = new f(0, 0, 0, 0)
        }

        function be(t) {
            t.textRect = new f(t.rect.x, t.rect.y, t.rect.width, t.rect.height), t.fullTextRect = t.textRect
        }
        re("flowData", (function(t, e) {
            t.beginPath();
            const i = e.rect.width / 7;
            t.moveTo(e.rect.x + i, e.rect.y), t.lineTo(e.rect.ex, e.rect.y), t.lineTo(e.rect.x + e.rect.width - i, e.rect
                .ey), t.lineTo(e.rect.x, e.rect.ey), t.closePath(), t.fill(), t.stroke()
        }), (function(t) {
            t.anchors.push(new h(t.rect.x + t.rect.width / 14, t.rect.y + t.rect.height / 2, s.Left)), t.anchors.push(
                new h(t.rect.x + 4 * t.rect.width / 7, t.rect.y, s.Up)), t.anchors.push(new h(t.rect.x + 13 * t.rect.width /
                14, t.rect.y + t.rect.height / 2, s.Right)), t.anchors.push(new h(t.rect.x + 3 * t.rect.width / 7, t.rect.ey,
                s.Bottom))
        }), (function(t) {
            t.iconRect = new f(0, 0, 0, 0)
        }), (function(t) {
            t.textRect = new f(t.rect.x + t.rect.width / 7, t.rect.y, 5 * t.rect.width / 7, t.rect.height), t.fullTextRect =
                t.textRect
        })), re("flowSubprocess", (function(t, e) {
            t.beginPath();
            const i = e.rect.width / 7;
            t.moveTo(e.rect.x, e.rect.y), t.lineTo(e.rect.ex, e.rect.y), t.lineTo(e.rect.ex, e.rect.ey), t.lineTo(e.rect
                .x, e.rect.ey), t.closePath(), t.moveTo(e.rect.x + i, e.rect.y), t.lineTo(e.rect.x + i, e.rect.ey), t.moveTo(
                e.rect.ex - i, e.rect.y), t.lineTo(e.rect.ex - i, e.rect.ey), t.fill(), t.stroke()
        }), null, (function(t) {
            t.iconRect = new f(0, 0, 0, 0)
        }), (function(t) {
            t.textRect = new f(t.rect.x + t.rect.width / 7, t.rect.y, 5 * t.rect.width / 7, t.rect.height), t.fullTextRect =
                t.textRect
        })), re("flowDb", (function(t, e) {
            t.beginPath();
            const i = e.rect.height / 7;
            t.moveTo(e.rect.x, e.rect.y + i), t.bezierCurveTo(e.rect.x, e.rect.y - i / 2 | 0, e.rect.ex, e.rect.y - i /
                2 | 0, e.rect.ex, e.rect.y + i), t.lineTo(e.rect.ex, e.rect.ey - i), t.bezierCurveTo(e.rect.ex, e.rect.ey +
                i / 2 | 0, e.rect.x, e.rect.ey + i / 2 | 0, e.rect.x, e.rect.ey - i), t.closePath(), t.moveTo(e.rect.x, e.rect
                .ey - i), t.bezierCurveTo(e.rect.x, e.rect.ey - 2 * i | 0, e.rect.ex, e.rect.ey - 2 * i | 0, e.rect.ex, e.rect
                .ey - i), t.fill(), t.stroke()
        }), null, (function(t) {
            t.iconRect = new f(0, 0, 0, 0)
        }), (function(t) {
            t.textRect = new f(t.rect.x, t.rect.y + t.rect.height / 8, t.rect.width, 5 * t.rect.height / 8), t.fullTextRect =
                t.textRect
        })), re("flowDocument", (function(t, e) {
            t.beginPath();
            const i = e.rect.x + e.rect.width / 2,
                s = e.rect.y + 6 * e.rect.height / 7,
                o = e.rect.height / 6;
            t.moveTo(e.rect.x, e.rect.y), t.lineTo(e.rect.ex, e.rect.y), t.lineTo(e.rect.ex, s), t.bezierCurveTo(e.rect.ex -
                20, s - o, i + e.rect.width / 5, s - o, i, s), t.bezierCurveTo(i - e.rect.width / 5, s + o, e.rect.x, s +
                o, e.rect.x, s), t.closePath(), t.fill(), t.stroke()
        }), (function(t) {
            t.anchors.push(new h(t.rect.x, t.rect.y + t.rect.height / 2, s.Left)), t.anchors.push(new h(t.rect.x + t.rect
                .width / 2, t.rect.y, s.Up)), t.anchors.push(new h(t.rect.x + t.rect.width, t.rect.y + t.rect.height / 2,
                s.Right)), t.anchors.push(new h(t.rect.x + t.rect.width / 2, t.rect.y + 6 * t.rect.height / 7, s.Bottom))
        }), (function(t) {
            t.iconRect = new f(0, 0, 0, 0)
        }), (function(t) {
            t.textRect = new f(t.rect.x, t.rect.y, t.rect.width, 5 * t.rect.height / 7), t.fullTextRect = t.textRect
        })), re("flowInternalStorage", (function(t, e) {
            t.beginPath(), t.moveTo(e.rect.x, e.rect.y), t.lineTo(e.rect.ex, e.rect.y), t.lineTo(e.rect.ex, e.rect.ey),
                t.lineTo(e.rect.x, e.rect.ey), t.closePath();
            const i = e.rect.width / 7;
            t.moveTo(e.rect.x, e.rect.y + i), t.lineTo(e.rect.ex, e.rect.y + i), t.moveTo(e.rect.x + i, e.rect.y), t.lineTo(
                e.rect.x + i, e.rect.ey), t.fill(), t.stroke()
        }), null, (function(t) {
            t.iconRect = new f(0, 0, 0, 0)
        }), (function(t) {
            const e = t.rect.width / 7;
            t.textRect = new f(t.rect.x + e, t.rect.y + e, t.rect.width - e, t.rect.height - e), t.fullTextRect = t.textRect
        })), re("flowExternStorage", (function(t, e) {
            t.beginPath();
            const i = e.rect.width / 10;
            t.moveTo(e.rect.x + 2 * i, e.rect.y), t.bezierCurveTo(e.rect.x - 2 * i / 3, e.rect.y, e.rect.x - 2 * i / 3,
                e.rect.ey, e.rect.x + 2 * i, e.rect.ey), t.lineTo(e.rect.ex, e.rect.ey), t.bezierCurveTo(e.rect.ex - i, e.rect
                .ey, e.rect.ex - i, e.rect.y, e.rect.ex, e.rect.y), t.closePath(), t.fill(), t.stroke()
        }), (function(t) {
            t.anchors.push(new h(t.rect.x, t.rect.y + t.rect.height / 2, s.Left)), t.anchors.push(new h(t.rect.x + 8 * t
                .rect.width / 15, t.rect.y, s.Up)), t.anchors.push(new h(t.rect.x + 13 * t.rect.width / 14, t.rect.y + t.rect
                .height / 2, s.Right)), t.anchors.push(new h(t.rect.x + 8 * t.rect.width / 15, t.rect.ey, s.Bottom))
        }), (function(t) {
            t.iconRect = new f(0, 0, 0, 0)
        }), (function(t) {
            t.textRect = new f(t.rect.x + t.rect.width / 6, t.rect.y, 3 * t.rect.width / 4, t.rect.height), t.fullTextRect =
                t.textRect
        })), re("flowQueue", (function(t, e) {
            t.beginPath(), t.ellipse(e.rect.x + e.rect.width / 2, e.rect.y + e.rect.height / 2, e.rect.width / 2, e.rect
                .height / 2, 0, 0, 2 * Math.PI), t.moveTo(e.rect.x + e.rect.width / 2, e.rect.ey), t.lineTo(e.rect.ex, e.rect
                .ey), t.fill(), t.stroke()
        }), null, (function(t) {
            t.iconRect = new f(0, 0, 0, 0)
        }), (function(t) {
            const e = 5 * t.rect.width / 7,
                i = 5 * t.rect.height / 7;
            t.textRect = new f(t.rect.x + (t.rect.width - e) / 2, t.rect.y + (t.rect.height - i) / 2, e, i), t.fullTextRect =
                t.textRect
        })), re("flowManually", (function(t, e) {
            t.beginPath();
            const i = e.rect.height / 4;
            t.moveTo(e.rect.x, e.rect.y + i), t.lineTo(e.rect.ex, e.rect.y), t.lineTo(e.rect.ex, e.rect.ey), t.lineTo(e.rect
                .x, e.rect.ey), t.closePath(), t.fill(), t.stroke()
        }), (function(t) {
            t.anchors.push(new h(t.rect.x, t.rect.y + 5 * t.rect.height / 8, s.Left)), t.anchors.push(new h(t.rect.x + t
                .rect.width / 2, t.rect.y + t.rect.height / 8, s.Up)), t.anchors.push(new h(t.rect.ex, t.rect.y + t.rect.height /
                2, s.Right)), t.anchors.push(new h(t.rect.x + t.rect.width / 2, t.rect.ey, s.Bottom))
        }), (function(t) {
            t.iconRect = new f(0, 0, 0, 0)
        }), (function(t) {
            t.textRect = new f(t.rect.x, t.rect.y + t.rect.height / 4, t.rect.width, 3 * t.rect.height / 4), t.fullTextRect =
                t.textRect
        })), re("flowDisplay", (function(t, e) {
            t.beginPath();
            const i = e.rect.width / 8;
            t.moveTo(e.rect.x + i, e.rect.y), t.lineTo(e.rect.ex - i, e.rect.y), t.bezierCurveTo(e.rect.ex + i / 3, e.rect
                .y, e.rect.ex + i / 3, e.rect.ey, e.rect.ex - i, e.rect.ey), t.lineTo(e.rect.x + i, e.rect.ey), t.lineTo(e
                .rect.x, e.rect.y + e.rect.height / 2), t.closePath(), t.fill(), t.stroke()
        }), (function(t) {
            t.anchors.push(new h(t.rect.x, t.rect.y + t.rect.height / 2, s.Left)), t.anchors.push(new h(t.rect.x + t.rect
                .width / 2, t.rect.y, s.Up)), t.anchors.push(new h(t.rect.x + t.rect.width, t.rect.y + t.rect.height / 2,
                s.Right)), t.anchors.push(new h(t.rect.x + t.rect.width / 2, t.rect.y + t.rect.height, s.Bottom))
        }), (function(t) {
            t.iconRect = new f(0, 0, 0, 0)
        }), (function(t) {
            t.textRect = new f(t.rect.x + t.rect.width / 8, t.rect.y, 3 * t.rect.width / 4, t.rect.height), t.fullTextRect =
                t.textRect
        })), re("flowParallel", (function(t, e) {
            t.beginPath(), t.moveTo(e.rect.x, e.rect.y), t.lineTo(e.rect.ex, e.rect.y), t.moveTo(e.rect.x, e.rect.ey), t
                .lineTo(e.rect.ex, e.rect.ey), t.fill(), t.stroke()
        }), (function(t) {
            t.anchors.push(new h(t.rect.x + t.rect.width / 2, t.rect.y, s.Up)), t.anchors.push(new h(t.rect.x + t.rect.width /
                2, t.rect.y + t.rect.height, s.Bottom))
        }), null, null), re("flowComment", (function(t, e) {
            t.beginPath();
            const i = e.rect.width / 4;
            t.moveTo(e.rect.x + i, e.rect.y), t.lineTo(e.rect.x, e.rect.y), t.lineTo(e.rect.x, e.rect.ey), t.lineTo(e.rect
                .x + i, e.rect.ey), t.fill(), t.stroke()
        }), (function(t) {
            t.anchors.push(new h(t.rect.x, t.rect.y + t.rect.height / 2, s.Left))
        }), null, null), re("activityFinal", (function(t, e) {
            t.beginPath(), t.ellipse(e.rect.x + e.rect.width / 2, e.rect.y + e.rect.height / 2, e.rect.width / 2, e.rect
                .height / 2, 0, 0, 2 * Math.PI), t.stroke(), t.beginPath(), t.fillStyle = t.strokeStyle, t.ellipse(e.rect.x +
                e.rect.width / 2, e.rect.y + e.rect.height / 2, e.rect.width / 4, e.rect.height / 4, 0, 0, 2 * Math.PI), t
                .fill()
        }), null, (function(t) {
            t.iconRect = new f(0, 0, 0, 0)
        }), (function(t) {
            const e = 5 * t.rect.width / 7,
                i = 5 * t.rect.height / 7;
            t.textRect = new f(t.rect.x + (t.rect.width - e) / 2, t.rect.y + (t.rect.height - i) / 2, e, i), t.fullTextRect =
                t.textRect
        })), re("swimlaneV", (function(t, e) {
            const i = e.rect.width * e.borderRadius,
                s = e.rect.height * e.borderRadius;
            let o = i < s ? i : s;
            e.rect.width < 2 * o && (o = e.rect.width / 2), e.rect.height < 2 * o && (o = e.rect.height / 2), t.beginPath(),
                t.moveTo(e.rect.x + o, e.rect.y), t.arcTo(e.rect.x + e.rect.width, e.rect.y, e.rect.x + e.rect.width, e.rect
                .y + e.rect.height, o), t.arcTo(e.rect.x + e.rect.width, e.rect.y + e.rect.height, e.rect.x, e.rect.y + e.rect
                .height, o), t.arcTo(e.rect.x, e.rect.y + e.rect.height, e.rect.x, e.rect.y, o), t.arcTo(e.rect.x, e.rect.y,
                e.rect.x + e.rect.width, e.rect.y, o), t.closePath(), t.moveTo(e.rect.x, e.rect.y + 40), t.lineTo(e.rect.ex,
                e.rect.y + 40), t.fill(), t.stroke()
        }), null, (function(t) {
            t.iconRect = new f(0, 0, 0, 0)
        }), (function(t) {
            t.textRect = new f(t.rect.x, t.rect.y, t.rect.width, 40), t.fullTextRect = t.textRect
        })), re("swimlaneH", (function(t, e) {
            const i = e.rect.width * e.borderRadius,
                s = e.rect.height * e.borderRadius;
            let o = i < s ? i : s;
            e.rect.width < 2 * o && (o = e.rect.width / 2), e.rect.height < 2 * o && (o = e.rect.height / 2), t.beginPath(),
                t.moveTo(e.rect.x + o, e.rect.y), t.arcTo(e.rect.x + e.rect.width, e.rect.y, e.rect.x + e.rect.width, e.rect
                .y + e.rect.height, o), t.arcTo(e.rect.x + e.rect.width, e.rect.y + e.rect.height, e.rect.x, e.rect.y + e.rect
                .height, o), t.arcTo(e.rect.x, e.rect.y + e.rect.height, e.rect.x, e.rect.y, o), t.arcTo(e.rect.x, e.rect.y,
                e.rect.x + e.rect.width, e.rect.y, o), t.closePath(), t.moveTo(e.rect.x + 40, e.rect.y), t.lineTo(e.rect.x +
                40, e.rect.ey), t.fill(), t.stroke()
        }), null, (function(t) {
            t.iconRect = new f(0, 0, 0, 0)
        }), (function(t) {
            t.textRect = new f(t.rect.x + 10, t.rect.y, 20, t.rect.height), t.fullTextRect = t.textRect
        })), re("forkH", ve, (function(t) {
            t.anchors.push(new h(t.rect.x, t.rect.y + t.rect.height / 2, s.Left)), t.anchors.push(new h(t.rect.ex, t.rect
                .y + t.rect.height / 2, s.Right));
            for (let e = 5; t.rect.x + e < t.rect.ex; e += 5) {
                const i = new h(t.rect.x + e, t.rect.y, s.Up),
                    o = new h(t.rect.x + e, t.rect.ey, s.Bottom);
                i.hidden = !0, i.out = !0, o.hidden = !0, o.out = !0, t.anchors.push(i), t.anchors.push(o)
            }
        }), Le, be), re("forkV", ve, (function(t) {
            t.anchors.push(new h(t.rect.x + t.rect.width / 2, t.rect.y, s.Up)), t.anchors.push(new h(t.rect.x + t.rect.width /
                2, t.rect.ey, s.Bottom));
            for (let e = 5; t.rect.y + e < t.rect.ey; e += 5) {
                const i = new h(t.rect.x, t.rect.y + e, s.Left),
                    o = new h(t.rect.ex, t.rect.y + e, s.Right);
                i.hidden = !0, i.out = !0, o.hidden = !0, o.out = !0, t.anchors.push(i), t.anchors.push(o)
            }
        }), Le, be), re("simpleClass", (function(t, e) {
            const i = e.rect.width * e.borderRadius,
                s = e.rect.height * e.borderRadius;
            let o = i < s ? i : s;
            e.rect.width < 2 * o && (o = e.rect.width / 2), e.rect.height < 2 * o && (o = e.rect.height / 2), t.beginPath(),
                t.moveTo(e.rect.x + o, e.rect.y), t.arcTo(e.rect.x + e.rect.width, e.rect.y, e.rect.x + e.rect.width, e.rect
                .y + e.rect.height, o), t.arcTo(e.rect.x + e.rect.width, e.rect.y + e.rect.height, e.rect.x, e.rect.y + e.rect
                .height, o), t.arcTo(e.rect.x, e.rect.y + e.rect.height, e.rect.x, e.rect.y, o), t.arcTo(e.rect.x, e.rect.y,
                e.rect.x + e.rect.width, e.rect.y, o), t.closePath(), t.moveTo(e.rect.x, e.rect.y + 40), t.lineTo(e.rect.ex,
                e.rect.y + 40), t.fill(), t.stroke()
        }), null, (function(t) {
            t.iconRect = new f(0, 0, 0, 0)
        }), (function(t) {
            t.textRect = new f(t.rect.x, t.rect.y, t.rect.width, 40), t.fullTextRect = t.textRect
        })), re("interfaceClass", (function(t, e) {
            const i = e.rect.width * e.borderRadius,
                s = e.rect.height * e.borderRadius;
            let o = i < s ? i : s;
            e.rect.width < 2 * o && (o = e.rect.width / 2), e.rect.height < 2 * o && (o = e.rect.height / 2), t.beginPath(),
                t.moveTo(e.rect.x + o, e.rect.y), t.arcTo(e.rect.x + e.rect.width, e.rect.y, e.rect.x + e.rect.width, e.rect
                .y + e.rect.height, o), t.arcTo(e.rect.x + e.rect.width, e.rect.y + e.rect.height, e.rect.x, e.rect.y + e.rect
                .height, o), t.arcTo(e.rect.x, e.rect.y + e.rect.height, e.rect.x, e.rect.y, o), t.arcTo(e.rect.x, e.rect.y,
                e.rect.x + e.rect.width, e.rect.y, o), t.closePath(), t.moveTo(e.rect.x, e.rect.y + 40), t.lineTo(e.rect.ex,
                e.rect.y + 40);
            const r = e.rect.y + 20 + e.rect.height / 2;
            t.moveTo(e.rect.x, r), t.lineTo(e.rect.ex, r), t.fill(), t.stroke()
        }), null, (function(t) {
            t.iconRect = new f(0, 0, 0, 0)
        }), (function(t) {
            t.textRect = new f(t.rect.x, t.rect.y, t.rect.width, 40), t.fullTextRect = t.textRect
        })), re("lifeline", (function(t, e) {
            const i = e.rect.width * e.borderRadius,
                s = 50 * e.borderRadius;
            let o = i < s ? i : s;
            e.rect.width < 2 * o && (o = e.rect.width / 2), 50 < 2 * o && (o = 25), t.beginPath(), t.moveTo(e.rect.x + o,
                e.rect.y), t.arcTo(e.rect.x + e.rect.width, e.rect.y, e.rect.x + e.rect.width, e.rect.y + 50, o), t.arcTo(
                e.rect.x + e.rect.width, e.rect.y + 50, e.rect.x, e.rect.y + 50, o), t.arcTo(e.rect.x, e.rect.y + 50, e.rect
                .x, e.rect.y, o), t.arcTo(e.rect.x, e.rect.y, e.rect.x + e.rect.width, e.rect.y, o), t.closePath(), t.fill(),
                t.stroke(), t.save(), t.beginPath(), t.lineWidth = 1, t.setLineDash([7, 7]);
            const r = e.rect.x + e.rect.width / 2;
            t.moveTo(r, e.rect.y + 50 + 1), t.lineTo(r, e.rect.ey), t.stroke(), t.restore()
        }), (function(t) {
            t.anchors.push(new h(t.rect.x, t.rect.y + 25, s.Left)), t.anchors.push(new h(t.rect.x + t.rect.width / 2, t.rect
                .y, s.Up)), t.anchors.push(new h(t.rect.x + t.rect.width, t.rect.y + 25, s.Right)), t.anchors.push(new h(t
                .rect.x + t.rect.width / 2, t.rect.y + 50, s.Bottom)), t.anchors.push(new h(t.rect.x + t.rect.width / 2, t
                .rect.ey, s.Bottom))
        }), (function(t) {
            t.iconRect = new f(0, 0, 0, 0)
        }), (function(t) {
            t.textRect = new f(t.rect.x, t.rect.y, t.rect.width, 50), t.fullTextRect = t.textRect
        })), re("sequenceFocus", (function(t, e) {
            t.beginPath(), t.rect(e.rect.x, e.rect.y, e.rect.width, e.rect.height), this.fillStyle ? t.fillStyle = this.fillStyle :
                t.fillStyle = "#fff", t.fill(), t.stroke()
        }), (function(t) {
            t.anchors.push(new h(t.rect.x + t.rect.width / 2, t.rect.y, s.Up)), t.anchors.push(new h(t.rect.x + t.rect.width /
                2, t.rect.ey, s.Bottom));
            for (let e = 5; t.rect.y + e < t.rect.ey; e += 5) {
                const i = new h(t.rect.x, t.rect.y + e, s.Left),
                    o = new h(t.rect.ex, t.rect.y + e, s.Right);
                i.hidden = !0, i.out = !0, o.hidden = !0, o.out = !0, t.anchors.push(i), t.anchors.push(o)
            }
        }), (function(t) {
            t.iconRect = new f(0, 0, 0, 0)
        }), (function(t) {
            t.textRect = new f(0, 0, 0, 0), t.fullTextRect = t.textRect
        })), window.Le5leTopology = {
            Topology: class {
                constructor(t, e) {
                    this.data = new ce, this.caches = {
                        index: 0,
                        list: []
                    }, this.input = document.createElement("textarea"), this.lastTranlated = {
                        x: 0,
                        y: 0
                    }, this.moveIn = {
                        type: pe.None,
                        activeAnchorIndex: 0,
                        hoverAnchorIndex: 0,
                        hoverNode: null,
                        hoverLine: null,
                        lineControlPoint: null
                    }, this.nodesMoved = !1, this.scheduledAnimationFrame = !1, this.onMouseMove = t => {
                        if (this.scheduledAnimationFrame || this.data.locked < -2) return;
                        if ((t.ctrlKey || t.altKey) && this.mouseDown) return this.translate(t.offsetX - this.mouseDown.x, t.offsetY -
                            this.mouseDown.y, !0), !1;
                        if (this.data.locked < 0 && this.mouseDown && this.moveIn.type !== pe.None) return;
                        this.scheduledAnimationFrame = !0;
                        const e = new h(t.offsetX, t.offsetY);
                        requestAnimationFrame(() => {
                            if (this.scheduledAnimationFrame = !1, !this.mouseDown) return this.getMoveIn(e), this.moveIn.hoverNode ?
                                (this.hoverLayer.node = this.moveIn.hoverNode, !this.lastHoverNode && this.options.on && this.options
                                    .on("moveInNode", this.moveIn.hoverNode)) : this.lastHoverNode && (this.options.on && this.options
                                .on("moveOutNode", this.moveIn.hoverNode), this.hoverLayer.node = null), this.moveIn.type === pe.LineControlPoint ?
                                this.hoverLayer.hoverLineCP = this.moveIn.lineControlPoint : this.hoverLayer.hoverLineCP && (this.hoverLayer
                                .hoverLineCP = null), void(this.moveIn.hoverNode === this.lastHoverNode && this.moveIn.type !== pe
                                .HoverAnchors && this.hoverLayer.lasthoverLineCP === this.hoverLayer.hoverLineCP || (this.hoverLayer
                                .lasthoverLineCP = this.hoverLayer.hoverLineCP, this.render()));
                            switch ((e.x + 50 > this.parentElem.clientWidth + this.parentElem.scrollLeft || e.y + 50 > this.parentElem
                                .clientHeight + this.parentElem.scrollTop) && (this.options.on && this.options.on("moveOutParent",
                                e), e.x + 50 > this.divLayer.canvas.clientWidth && (this.canvas.width += 200), e.y + 50 > this.divLayer
                                .canvas.clientHeight && (this.canvas.height += 200), this.resize({
                                width: this.canvas.width,
                                height: this.canvas.height
                            })), this.moveIn.type) {
                                case pe.None:
                                    this.hoverLayer.dragRect = new f(this.mouseDown.x, this.mouseDown.y, e.x - this.mouseDown.x, e.y -
                                        this.mouseDown.y);
                                    break;
                                case pe.Nodes:
                                    if (this.activeLayer.locked()) break;
                                    this.nodesMoved = !0;
                                    const t = e.x - this.mouseDown.x,
                                        i = e.y - this.mouseDown.y;
                                    if (t || i) {
                                        const e = this.getDockPos(t, i);
                                        this.activeLayer.moveNodes(e.x ? e.x : t, e.y ? e.y : i)
                                    }
                                    break;
                                case pe.ResizeCP:
                                    this.activeLayer.resizeNodes(this.moveIn.activeAnchorIndex, e), this.options.on && this.options.on(
                                        "resizeNodes", this.activeLayer.nodes);
                                    break;
                                case pe.LineTo:
                                case pe.HoverAnchors:
                                    let s = this.data.toArrowType;
                                    this.moveIn.hoverLine && (s = this.moveIn.hoverLine.toArrow), this.hoverLayer.lineTo(this.getLineDock(
                                        e), s);
                                    break;
                                case pe.LineFrom:
                                    this.hoverLayer.lineFrom(this.getLineDock(e));
                                    break;
                                case pe.LineMove:
                                    this.hoverLayer.lineMove(e, this.mouseDown);
                                    break;
                                case pe.LineControlPoint:
                                    this.moveIn.hoverLine.controlPoints[this.moveIn.lineControlPoint.id].x = e.x, this.moveIn.hoverLine
                                        .controlPoints[this.moveIn.lineControlPoint.id].y = e.y, se[this.moveIn.hoverLine.name] && se[this
                                        .moveIn.hoverLine.name].dockControlPointFn && se[this.moveIn.hoverLine.name].dockControlPointFn(
                                        this.moveIn.hoverLine.controlPoints[this.moveIn.lineControlPoint.id], this.moveIn.hoverLine);
                                    break;
                                case pe.Rotate:
                                    this.activeLayer.nodes.length && (this.activeLayer.offsetRotate(this.getAngle(e)), this.activeLayer
                                        .updateLines()), this.options.on && this.options.on("rotateNodes", this.activeLayer.nodes)
                            }
                            this.render()
                        })
                    }, this.onmousedown = t => {
                        switch (this.mouseDown = {
                            x: t.offsetX,
                            y: t.offsetY
                        }, o.Store.set("activeLine", null), t.altKey && (this.divLayer.canvas.style.cursor = "move"), this.inputNode &&
                        this.setNodeText(), this.moveIn.type) {
                            case pe.None:
                                this.activeLayer.clear(), this.hoverLayer.clear(), this.options.on && this.options.on("space", null);
                                break;
                            case pe.Line:
                            case pe.LineControlPoint:
                                t.ctrlKey ? (this.activeLayer.lines.push(this.moveIn.hoverLine), this.options.on && (this.data.lines.length >
                                1 || this.data.nodes.length ? this.options.on("multi", {
                                    nodes: this.activeLayer.nodes,
                                    lines: this.activeLayer.lines
                                }) : this.options.on("line", this.moveIn.hoverLine))) : (this.activeLayer.nodes = [], this.activeLayer
                                    .lines = [this.moveIn.hoverLine], this.options.on && this.options.on("line", this.moveIn.hoverLine)),
                                    o.Store.set("activeLine", this.moveIn.hoverLine);
                                break;
                            case pe.LineMove:
                                this.hoverLayer.initLine = new he(this.moveIn.hoverLine);
                            case pe.LineFrom:
                            case pe.LineTo:
                                this.activeLayer.nodes = [], this.activeLayer.lines = [this.moveIn.hoverLine], this.options.on && this
                                    .options.on("line", this.moveIn.hoverLine), o.Store.set("activeLine", this.moveIn.hoverLine), this.hoverLayer
                                    .line = this.moveIn.hoverLine;
                                break;
                            case pe.HoverAnchors:
                                this.hoverLayer.setLine(new h(this.moveIn.hoverNode.rotatedAnchors[this.moveIn.hoverAnchorIndex].x,
                                    this.moveIn.hoverNode.rotatedAnchors[this.moveIn.hoverAnchorIndex].y, this.moveIn.hoverNode.rotatedAnchors[
                                        this.moveIn.hoverAnchorIndex].direction, this.moveIn.hoverAnchorIndex, this.moveIn.hoverNode.id),
                                    this.data.fromArrowType, this.data.lineName);
                            case pe.Nodes:
                                if (!this.moveIn.hoverNode || this.activeLayer.hasNode(this.moveIn.hoverNode)) break;
                                t.ctrlKey ? (this.activeLayer.addNode(this.moveIn.hoverNode), this.options.on && (this.activeLayer.nodes
                                    .length > 1 || this.activeLayer.lines.length ? this.options.on("multi", {
                                    nodes: this.activeLayer.nodes,
                                    lines: this.activeLayer.lines
                                }) : this.options.on("node", this.moveIn.hoverNode))) : (this.activeLayer.setNodes([this.moveIn.hoverNode]),
                                this.options.on && this.options.on("node", this.moveIn.hoverNode))
                        }
                        this.activeLayer.nodes.length && this.activeLayer.saveNodeRects(), this.render()
                    }, this.onmouseup = t => {
                        if (this.mouseDown = null, this.lastTranlated.x && this.cache(), this.lastTranlated.x = 0, this.lastTranlated
                            .y = 0, this.hoverLayer.dockAnchor = null, this.hoverLayer.dockLineX = 0, this.hoverLayer.dockLineY = 0,
                            this.divLayer.canvas.style.cursor = "default", this.hoverLayer.dragRect) this.getRectNodes(this.data.nodes,
                            this.hoverLayer.dragRect), this.getRectLines(this.data.lines, this.hoverLayer.dragRect), this.options.on &&
                        this.activeLayer.nodes && this.activeLayer.nodes.length && this.options.on("multi", {
                            nodes: this.activeLayer.nodes,
                            lines: this.activeLayer.lines
                        });
                        else switch (this.moveIn.type) {
                            case pe.HoverAnchors:
                                this.hoverLayer.line && this.hoverLayer.line.to && (this.data.lines.push(this.hoverLayer.line), this.activeLayer
                                    .nodes = [], this.hoverLayer.line.to.id || !this.options.disableEmptyLine ? (this.activeLayer.lines = [
                                    this.hoverLayer.line
                                ], o.Store.set("activeLine", this.hoverLayer.line), this.options.on && this.options.on("addLine",
                                    this.hoverLayer.line)) : this.data.lines.pop()), this.offscreen.render(), this.hoverLayer.line =
                                    null;
                                break;
                            case pe.Rotate:
                                this.activeLayer.updateRotate();
                                break;
                            case pe.LineControlPoint:
                                o.Store.set("pts-" + this.moveIn.hoverLine.id, null)
                        }
                        this.hoverLayer.dragRect = null, this.render(), (this.nodesMoved || this.moveIn.type !== pe.None) &&
                        this.cache(), this.nodesMoved = !1
                    }, this.ondblclick = t => {
                        switch (this.moveIn.type) {
                            case pe.Nodes:
                                if (this.moveIn.hoverNode) {
                                    const e = this.clickText(this.moveIn.hoverNode, new h(t.offsetX, t.offsetY));
                                    e && this.showInput(e.node, e.textRect), this.options.on && this.options.on("dblclick", this.moveIn.hoverNode)
                                }
                        }
                    }, this.onkeydown = t => {
                        let e = !1,
                            i = 0,
                            s = 0;
                        switch (t.keyCode) {
                            case 8:
                            case 46:
                                if (!this.activeLayer.nodes.length && !this.activeLayer.lines.length) return;
                                this.delete();
                                break;
                            case 37:
                                i = -5, t.ctrlKey && (i = -1), e = !0;
                                break;
                            case 38:
                                s = -5, t.ctrlKey && (s = -1), e = !0;
                                break;
                            case 39:
                                i = 5, t.ctrlKey && (i = 1), e = !0;
                                break;
                            case 40:
                                s = 5, t.ctrlKey && (s = 1), e = !0
                        }
                        e && ((i || s) && (this.activeLayer.saveNodeRects(), this.activeLayer.moveNodes(i, s)), this.render(),
                            this.cache())
                    }, o.Store.set("topology-data", this.data), this.options = e || {}, this.options.font || (this.options.font = {
                        color: "#222",
                        fontFamily: '"Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial',
                        fontSize: 12,
                        lineHeight: 1.5,
                        textAlign: "center",
                        textBaseline: "middle"
                    }), this.options.color || (this.options.color = "#222"), this.options.rotateCursor || (this.options.rotateCursor =
                        "/assets/img/rotate.cur"), this.options.font.fontFamily || (this.options.font.fontFamily =
                        '"Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial'), this.options.font.color ||
                    (this.options.font.color = "#222"), this.options.font.fontSize || (this.options.font.fontSize = 12), this
                        .options.font.lineHeight || (this.options.font.lineHeight = 1.5), this.options.font.textAlign || (this.options
                        .font.textAlign = "center"), this.options.font.textBaseline || (this.options.font.textBaseline =
                        "middle"), this.parentElem = "string" == typeof t ? document.getElementById(t) : t, this.parentElem.style
                        .position = "relative", this.activeLayer = new fe(this.options), this.hoverLayer = new ye(this.options),
                        this.animateLayer = new ue(this.options), this.offscreen = new de(this.parentElem, this.options), this.canvas =
                        new le(this.parentElem, this.options), this.divLayer = new xe(this.parentElem, this.options), this.resize(),
                        this.divLayer.canvas.ondragover = t => t.preventDefault(), this.divLayer.canvas.ondrop = t => {
                        this.ondrop(t)
                    }, this.subcribe = o.Store.subscribe("LT:render", () => {
                        this.render()
                    }), this.subcribeAnimateMoved = o.Store.subscribe("nodeRectChanged", t => {
                        this.activeLayer.updateLines(this.data.nodes), this.animateLayer.updateLines(this.data.nodes)
                    }), this.subcribeMediaEnd = o.Store.subscribe("mediaEnd", t => {
                        t.nextPlay && (this.animateLayer.getNodes(this.data.nodes, t.nextPlay), this.animateLayer.getLines(t.nextPlay),
                            this.animateLayer.animate()), this.options.on && this.options.on("mediaEnd", t)
                    }), this.subcribeAnimateEnd = o.Store.subscribe("animateEnd", t => {
                        if (t) {
                            switch (t.type) {
                                case "node":
                                    this.offscreen.render()
                            }
                            this.divLayer.playNext(t.data.nextAnimate), this.options.on && this.options.on("animateEnd", t)
                        }
                    }), this.divLayer.canvas.onmousemove = this.onMouseMove, this.divLayer.canvas.onmousedown = this.onmousedown,
                        this.divLayer.canvas.onmouseup = this.onmouseup, this.divLayer.canvas.ondblclick = this.ondblclick, this.divLayer
                        .canvas.tabIndex = 0, this.divLayer.canvas.onkeydown = this.onkeydown, this.divLayer.canvas.onwheel = t => {
                        if (t.ctrlKey || t.altKey) return t.preventDefault(), t.deltaY < 0 ? this.scale(1.1) : this.scale(.9),
                            this.divLayer.canvas.focus(), !1
                    }, this.divLayer.canvas.ontouchend = t => {
                        this.ontouched(t)
                    }, this.input.style.position = "absolute", this.input.style.zIndex = "-1", this.input.style.left =
                        "-1000px", this.input.style.width = "0", this.input.style.height = "0", this.input.style.outline = "none",
                        this.input.style.border = "1px solid #cdcdcd", this.input.style.resize = "none", this.parentElem.appendChild(
                        this.input), this.cache()
                }
                resize(t) {
                    this.canvas.resize(t), this.offscreen.resize(t), this.divLayer.resize(t), this.render(), this.options.on &&
                    this.options.on("resize", t)
                }
                ondrop(t) {
                    t.preventDefault();
                    const e = JSON.parse(t.dataTransfer.getData("Text"));
                    e.rect.x = t.offsetX - e.rect.width / 2 << 0, e.rect.y = t.offsetY - e.rect.height / 2 << 0;
                    const i = new ne(e);
                    this.addNode(i, !0), "div" === i.name && this.options.on && this.options.on("LT:addDiv", i)
                }
                getTouchOffset(t) {
                    let e = this.parentElem,
                        i = 0,
                        s = 0;
                    for (; e;) i += e.offsetLeft, s += e.offsetTop, e = e.offsetParent;
                    return {
                        offsetX: t.pageX - i,
                        offsetY: t.pageY - s
                    }
                }
                ontouched(t) {
                    if (!this.touchedNode) return;
                    const e = this.getTouchOffset(t.changedTouches[0]);
                    this.touchedNode.rect.x = e.offsetX - this.touchedNode.rect.width / 2, this.touchedNode.rect.y = e.offsetY -
                        this.touchedNode.rect.height / 2, this.addNode(new ne(this.touchedNode), !0), this.touchedNode = void 0
                }
                addNode(t, e = !1) {
                    return !(this.data.locked < 0 || !Zt[t.name]) && (t.init || (t = new ne(t)), 1 !== this.data.scale && t.scale(
                        this.data.scale), e && this.activeLayer.setNodes([t]), this.data.nodes.push(t), this.render(), this.cache(),
                    this.options.on && this.options.on("addNode", t), !0)
                }
                addLine(t, e = !1) {
                    if (this.data.locked) return !1;
                    e && this.activeLayer.setLines([t]), this.data.lines.push(t), this.offscreen.render(), this.cache(), this.options
                        .on && this.options.on("addLine", t)
                }
                addLineByPt(t, e, i, s, o, r = !1) {
                    const n = new he({
                        name: t,
                        from: e,
                        fromArrow: i,
                        to: s,
                        toArrow: o
                    });
                    this.addLine(n, r)
                }
                render(t = !1) {
                    t && (this.activeLayer.nodes = [], this.activeLayer.lines = [], this.hoverLayer.node = null, this.hoverLayer
                        .line = null, o.Store.set("activeLine", null)), this.offscreen.render(), this.canvas.render()
                }
                open(t) {
                    this.divLayer.clear(), this.animateLayer.nodes = [], this.animateLayer.lines = [], this.lock(t.locked || 0),
                    t.lineName && (this.data.lineName = t.lineName), this.data.scale = t.scaleState || 1, o.Store.set("scale",
                        this.data.scale), this.options.on && this.options.on("scale", this.data.scale), this.data.nodes = [],
                        this.data.lines = [];
                    for (const e of t.nodes) this.data.nodes.push(new ne(e));
                    for (const e of t.lines) this.data.lines.push(new he(e));
                    this.caches.list = [], this.cache(), this.overflow(), this.render(!0)
                }
                overflow() {
                    const t = this.getRect();
                    (t.width > this.canvas.width || t.height > this.canvas.height) && this.resize({
                        width: t.ex + 200,
                        height: t.ey + 200
                    })
                }
                setNodeText() {
                    this.inputNode.text = this.input.value, this.input.style.zIndex = "-1", this.input.style.left = "-1000px",
                        this.input.style.width = "0", this.inputNode = null, this.cache(), this.offscreen.render()
                }
                clickText(t, e) {
                    const i = t.getTextRect();
                    if (i.hitRotate(e, t.rotate, t.rect.center)) return {
                        node: t,
                        textRect: i
                    };
                    if (!t.children) return null;
                    for (const i of t.children) {
                        const t = this.clickText(i, e);
                        if (t) return t
                    }
                    return null
                }
                getMoveIn(t) {
                    if (this.lastHoverNode = this.moveIn.hoverNode, this.moveIn.type = pe.None, this.moveIn.hoverNode = null,
                        this.moveIn.lineControlPoint = null, this.moveIn.hoverLine = null, this.hoverLayer.hoverAnchorIndex = -1,
                        this.hoverLayer.nodeRect = null, this.data.locked > -1 && !this.activeLayer.locked() && this.activeLayer.rotateCPs[
                        0] && this.activeLayer.rotateCPs[0].hit(t, 15)) return this.moveIn.type = pe.Rotate, void(this.divLayer.canvas
                        .style.cursor = `url("${this.options.rotateCursor}"), auto`);
                    if (this.activeLayer.nodes.length && c(t, this.activeLayer.sizeCPs) && (this.moveIn.type = pe.Nodes), !
                        this.data.locked)
                        for (let e = 0; e < this.activeLayer.sizeCPs.length; ++e)
                            if (this.activeLayer.sizeCPs[e].hit(t, 10)) return this.moveIn.type = pe.ResizeCP, this.moveIn.activeAnchorIndex =
                                e, void(this.divLayer.canvas.style.cursor = ge[e]);
                    for (const e of this.activeLayer.lines) {
                        for (let i = 0; i < e.controlPoints.length; ++i)
                            if (e.controlPoints[i].hit(t)) return e.controlPoints[i].id = i, this.moveIn.type = pe.LineControlPoint,
                                this.moveIn.lineControlPoint = e.controlPoints[i], this.moveIn.hoverLine = e, void(this.divLayer.canvas
                                .style.cursor = "pointer");
                        if (this.inLine(t, e)) return
                    }
                    if (this.divLayer.canvas.style.cursor = "default", this.inNodes(t, this.activeLayer.nodes)) return void(
                        this.hoverLayer.nodeRect = null);
                    if (this.inNodes(t, this.data.nodes)) return;
                    let e = 0;
                    for (const i of this.data.lines)
                        if (++e, i.to) {
                            if (this.inLine(t, i)) return
                        } else this.data.lines.splice(e - 1, 1)
                }
                inNodes(t, e) {
                    for (let i = e.length - 1; i > -1; --i)
                        if (this.inNode(t, e[i])) return !0
                }
                inNode(t, e) {
                    if (e.childStand && e.children && e.children.length && this.inNodes(t, e.children)) return this.hoverLayer
                        .nodeRect = e.rect, !0;
                    if (e.hit(t)) {
                        if (this.hoverLayer.nodeRect || (this.hoverLayer.nodeRect = e.rect), this.moveIn.hoverNode = e, this.moveIn
                            .type = pe.Nodes, this.data.locked < 0 || e.locked) return void(this.divLayer.canvas.style.cursor =
                            "pointer");
                        this.divLayer.canvas.style.cursor = "move";
                        for (let i = 0; i < e.rotatedAnchors.length; ++i)
                            if (!e.rotatedAnchors[i].out && e.rotatedAnchors[i].hit(t, 5)) return this.moveIn.hoverNode = e, this.moveIn
                                .type = pe.HoverAnchors, this.moveIn.hoverAnchorIndex = i, this.hoverLayer.hoverAnchorIndex = i, this.divLayer
                                .canvas.style.cursor = "crosshair", !0;
                        return !0
                    }
                    if (e.hit(t, 5)) {
                        if (this.hoverLayer.nodeRect && (this.hoverLayer.nodeRect = e.rect), this.data.locked < 0 || e.locked)
                            return !0;
                        for (let i = 0; i < e.rotatedAnchors.length; ++i)
                            if (e.rotatedAnchors[i].hit(t, 5)) return this.moveIn.hoverNode = e, this.moveIn.type = pe.HoverAnchors,
                                this.moveIn.hoverAnchorIndex = i, this.hoverLayer.hoverAnchorIndex = i, this.divLayer.canvas.style.cursor =
                                "crosshair", !0
                    }
                }
                inLine(t, e) {
                    return e.from.hit(t, 10) ? (this.moveIn.type = pe.LineFrom, this.moveIn.hoverLine = e, this.data.locked <
                    0 || e.locked ? this.divLayer.canvas.style.cursor = "pointer" : this.divLayer.canvas.style.cursor =
                        "move", !0) : e.to.hit(t, 10) ? (this.moveIn.type = pe.LineTo, this.moveIn.hoverLine = e, this.data.locked <
                    0 || e.locked ? this.divLayer.canvas.style.cursor = "pointer" : this.divLayer.canvas.style.cursor =
                        "move", !0) : !!e.pointIn(t) && (this.moveIn.type = pe.LineMove, this.moveIn.hoverLine = e, this.divLayer
                        .canvas.style.cursor = "pointer", (e.from.id || e.to.id) && (this.moveIn.type = pe.Line), !0)
                }
                getLineDock(t) {
                    this.hoverLayer.dockAnchor = null;
                    for (const e of this.data.nodes) {
                        e.rect.hit(t, 10) && (this.hoverLayer.node = e);
                        for (let i = 0; i < e.rotatedAnchors.length; ++i)
                            if (e.rotatedAnchors[i].hit(t, 10)) {
                                t.id = e.id, t.anchorIndex = i, t.direction = e.rotatedAnchors[t.anchorIndex].direction, t.x = e.rotatedAnchors[
                                    t.anchorIndex].x, t.y = e.rotatedAnchors[t.anchorIndex].y, this.hoverLayer.dockAnchor = e.rotatedAnchors[
                                    i];
                                break
                            } if (t.id) break
                    }
                    return t
                }
                getRectNodes(t, e) {
                    e.width < 0 && (e.width = -e.width, e.x = e.ex, e.ex = e.x + e.width), e.height < 0 && (e.height = -e.height,
                        e.y = e.ey, e.ey = e.y + e.height);
                    for (const i of t) e.hitRect(i.rect) && this.activeLayer.addNode(i)
                }
                getRectLines(t, e) {
                    e.width < 0 && (e.width = -e.width, e.x = e.ex, e.ex = e.x + e.width), e.height < 0 && (e.height = -e.height,
                        e.y = e.ey, e.ey = e.y + e.height), this.activeLayer.lines = [];
                    for (const i of t) e.hit(i.from) && e.hit(i.to) && this.activeLayer.lines.push(i)
                }
                getAngle(t) {
                    if (t.x === this.activeLayer.rect.center.x) return t.y <= this.activeLayer.rect.center.y ? 0 : 180;
                    if (t.y === this.activeLayer.rect.center.y) return t.x < this.activeLayer.rect.center.x ? 270 : 90;
                    const e = t.x - this.activeLayer.rect.center.x,
                        i = t.y - this.activeLayer.rect.center.y;
                    let s = Math.atan(Math.abs(e / i)) / (2 * Math.PI) * 360;
                    return e > 0 && i > 0 ? s = 180 - s : e < 0 && i > 0 ? s += 180 : e < 0 && i < 0 && (s = 360 - s), 1 ===
                    this.activeLayer.nodes.length ? s - this.activeLayer.nodes[0].rotate : s
                }
                showInput(t, e) {
                    this.data.locked || this.options.hideInput || (this.inputNode = t, this.input.value = t.text, this.input.style
                        .left = e.x + "px", this.input.style.top = e.y + "px", this.input.style.width = e.width + "px", this.input
                        .style.height = e.height + "px", this.input.style.zIndex = "1000", this.input.focus())
                }
                getRect() {
                    let t = 99999,
                        e = 99999,
                        i = -99999,
                        s = -99999;
                    const o = [];
                    for (const t of this.data.nodes) {
                        const e = t.rect.toPoints();
                        if (t.rotate)
                            for (const i of e) i.rotate(t.rotate, t.rect.center);
                        o.push.apply(o, e)
                    }
                    for (const t of this.data.lines)
                        if (o.push(t.from), o.push(t.to), "curve" === t.name)
                            for (let e = .01; e < 1; e += .02) o.push(nt(e, t.from, t.controlPoints[0], t.controlPoints[1], t.to));
                    for (const r of o) t > r.x && (t = r.x), e > r.y && (e = r.y), i < r.x && (i = r.x), s < r.y && (s = r.y);
                    return new f(t, e, i - t, s - e)
                }
                getNodesRect(t) {
                    let e = 99999,
                        i = 99999,
                        s = -99999,
                        o = -99999;
                    const r = [];
                    for (const e of t) {
                        const t = e.rect.toPoints();
                        if (e.rotate)
                            for (const i of t) i.rotate(e.rotate, e.rect.center);
                        r.push.apply(r, t)
                    }
                    for (const t of r) e > t.x && (e = t.x), i > t.y && (i = t.y), s < t.x && (s = t.x), o < t.y && (o = t.y);
                    return new f(e, i, s - e, o - i)
                }
                getDockPos(t, e) {
                    this.hoverLayer.dockLineX = 0, this.hoverLayer.dockLineY = 0;
                    const i = {
                        x: 0,
                        y: 0
                    };
                    let s = 0,
                        o = 0,
                        r = me,
                        n = me;
                    for (const h of this.activeLayer.dockWatchers)
                        for (const c of this.data.nodes)
                            if (!this.activeLayer.hasNode(c) && "text" !== c.name) {
                                c.dockWatchers || c.getDockWatchers();
                                for (const a of c.dockWatchers)(s = Math.abs(a.x - h.x - t)) < r && (r = -99999, i.x = a.x - h.x, this.hoverLayer
                                    .dockLineX = 0 | a.x), (o = Math.abs(a.y - h.y - e)) < n && (n = -99999, i.y = a.y - h.y, this.hoverLayer
                                    .dockLineY = 0 | a.y)
                            } return i
                }
                cache() {
                    const t = new ce(this.data);
                    this.caches.index < this.caches.list.length - 1 ? this.caches.list.splice(this.caches.index + 1, this.caches
                        .list.length - this.caches.index - 1, t) : this.caches.list.push(t), this.caches.index = this.caches.list
                        .length - 1
                }
                undo() {
                    if (this.data.locked || this.caches.index < 1) return;
                    this.divLayer.clear();
                    const t = this.caches.list[--this.caches.index];
                    this.data.nodes.splice(0, this.data.nodes.length), this.data.lines.splice(0, this.data.lines.length), this
                        .data.nodes.push.apply(this.data.nodes, t.nodes), this.data.lines.push.apply(this.data.lines, t.lines),
                        this.render(!0), this.divLayer.render()
                }
                redo() {
                    if (this.data.locked || this.caches.index > this.caches.list.length - 2) return;
                    this.divLayer.clear();
                    const t = this.caches.list[++this.caches.index];
                    this.data.nodes.splice(0, this.data.nodes.length), this.data.lines.splice(0, this.data.lines.length), this
                        .data.nodes.push.apply(this.data.nodes, t.nodes), this.data.lines.push.apply(this.data.lines, t.lines),
                        this.render(!0), this.divLayer.render()
                }
                toImage(t, e, i) {
                    const s = this.getRect();
                    s.x -= 10, s.y -= 10, s.width += 20, s.height += 20, s.round();
                    const o = s.clone();
                    o.scale(this.offscreen.getDpiRatio(), new h(0, 0)), o.round();
                    const r = document.createElement("canvas");
                    r.width = o.width, r.height = o.height, r.style.width = s.width + "px", r.style.height = s.height + "px";
                    const n = r.getContext("2d");
                    return t && "image/png" !== t && (n.fillStyle = "white", n.fillRect(0, 0, r.width, r.height)), n.drawImage(
                        this.offscreen.canvas, o.x, o.y, o.width, o.height, 0, 0, o.width, o.height), i ? (r.toBlob(i), "") : r.toDataURL(
                        t, e)
                }
                saveAsImage(t, e, i) {
                    const s = document.createElement("a");
                    s.setAttribute("download", t || "le5le.topology.png"), s.setAttribute("href", this.toImage(e, i));
                    const o = document.createEvent("MouseEvents");
                    o.initEvent("click", !0, !0), s.dispatchEvent(o)
                }
                delete() {
                    const t = [],
                        e = [];
                    let i = 0;
                    for (const t of this.activeLayer.lines) {
                        i = 0;
                        for (const s of this.data.lines) {
                            if (t.id === s.id) {
                                e.push.apply(e, this.data.lines.splice(i, 1));
                                break
                            }++i
                        }
                    }
                    for (const e of this.activeLayer.nodes)(i = this.findNode(e)) > -1 && (this.divLayer.removeDiv(this.data.nodes[
                        i]), t.push.apply(t, this.data.nodes.splice(i, 1)));
                    this.activeLayer.saveNodeRects(), this.render(!0), this.cache(), this.options.on && this.options.on(
                        "delete", {
                            nodes: t,
                            lines: e
                        })
                }
                cut() {
                    if (!this.data.locked) {
                        this.clipboard = new ce({
                            nodes: [],
                            lines: []
                        });
                        for (const t of this.activeLayer.nodes) {
                            this.clipboard.nodes.push(new ne(t));
                            const e = this.findNode(t);
                            e > -1 && (this.divLayer.removeDiv(this.data.nodes[e]), this.data.nodes.splice(e, 1))
                        }
                        for (const t of this.activeLayer.lines) {
                            this.clipboard.lines.push(new he(t));
                            let e = 0;
                            for (const i of this.data.lines) t.id === i.id && this.data.lines.splice(e, 1), ++e
                        }
                        this.cache(), this.activeLayer.clear(), this.hoverLayer.node = null, this.moveIn.hoverLine = null, this.moveIn
                            .hoverNode = null, this.render(), this.options.on && this.options.on("delete", {
                            nodes: this.clipboard.nodes,
                            lines: this.clipboard.lines
                        })
                    }
                }
                copy() {
                    this.clipboard = new ce({
                        nodes: [],
                        lines: []
                    });
                    for (const t of this.activeLayer.nodes) this.clipboard.nodes.push(new ne(t));
                    for (const t of this.activeLayer.lines) this.clipboard.lines.push(new he(t))
                }
                parse() {
                    if (!this.clipboard || this.data.locked) return;
                    this.hoverLayer.node = null, this.hoverLayer.line = null, this.activeLayer.nodes = [], this.activeLayer.lines = [];
                    const t = {};
                    for (const e of this.clipboard.nodes) {
                        const i = e.id;
                        e.id = n(), t[i] = e.id, e.rect.x += 20, e.rect.ex += 20, e.rect.y += 20, e.rect.ey += 20;
                        const s = new ne(e);
                        this.data.nodes.push(s), this.activeLayer.nodes.push(s)
                    }
                    for (const e of this.clipboard.lines) {
                        e.id = n(), e.from = new h(e.from.x + 20, e.from.y + 20, e.from.direction, e.from.anchorIndex, t[e.from.id]),
                            e.to = new h(e.to.x + 20, e.to.y + 20, e.to.direction, e.to.anchorIndex, t[e.to.id]);
                        const i = [];
                        for (const t of e.controlPoints) i.push(new h(t.x + 20, t.y + 20));
                        const s = new he(e);
                        s.controlPoints = i, this.data.lines.push(s), this.activeLayer.lines.push(s)
                    }
                    this.render(), this.cache(), this.options.on && (this.clipboard.nodes.length > 1 || this.clipboard.lines.length >
                    1 || this.clipboard.nodes.length && this.clipboard.lines.length ? this.options.on("multi", {
                        nodes: this.clipboard.nodes,
                        lines: this.clipboard.lines
                    }) : this.clipboard.nodes.length ? this.options.on("addNode", this.activeLayer.nodes[0]) : this.clipboard
                        .lines.length && this.options.on("addLine", this.activeLayer.lines[0]))
                }
                animate() {
                    this.animateLayer.start(!1)
                }
                updateProps(t) {
                    t && (t.round(), t.init(), this.activeLayer.updateLines([t])), this.activeLayer.calcControlPoints(), this.activeLayer
                        .saveNodeRects(), this.activeLayer.changeLineType(), this.render(), this.cache()
                }
                lock(t) {
                    this.data.locked = t, this.options.on && this.options.on("locked", this.data.locked)
                }
                lockNodes(t, e) {
                    for (const i of this.data.nodes)
                        for (const s of t)
                            if (i.id === s.id) {
                                i.locked = e;
                                break
                            } this.options.on && this.options.on("lockNodes", {
                        nodes: t,
                        lock: e
                    })
                }
                lockLines(t, e) {
                    for (const i of this.data.lines)
                        for (const s of t)
                            if (i.id === s.id) {
                                i.locked = e;
                                break
                            } this.options.on && this.options.on("lockLines", {
                        lines: t,
                        lock: e
                    })
                }
                top(t) {
                    const e = this.findNode(t);
                    e > -1 && (this.data.nodes.push(this.data.nodes[e]), this.data.nodes.splice(e, 1))
                }
                bottom(t) {
                    const e = this.findNode(t);
                    e > -1 && (this.data.nodes.unshift(this.data.nodes[e]), this.data.nodes.splice(e + 1, 1))
                }
                combine(t, e) {
                    const i = this.getNodesRect(t);
                    for (const e of t) {
                        const t = this.findNode(e);
                        t > -1 && this.data.nodes.splice(t, 1)
                    }
                    const s = new ne({
                        name: "combine",
                        rect: new f(i.x, i.y, i.width, i.height),
                        text: "",
                        paddingLeft: 0,
                        paddingRight: 0,
                        paddingTop: 0,
                        paddingBottom: 0,
                        childStand: e,
                        strokeStyle: "transparent"
                    });
                    s.children = [];
                    for (const i of t) i.parentId = s.id, i.stand = e, i.calcRectInParent(s), s.children.push(i);
                    this.data.nodes.push(s), this.activeLayer.setNodes([s]), this.options.on && this.options.on("node", s),
                        this.cache()
                }
                uncombine(t) {
                    if ("combine" !== t.name) return;
                    const e = this.findNode(t);
                    e > -1 && this.data.nodes.splice(e, 1);
                    for (const e of t.children) e.parentId = void 0, e.rectInParent = void 0, e.stand = void 0, this.data.nodes
                        .push(e);
                    this.cache()
                }
                findNode(t) {
                    for (let e = 0; e < this.data.nodes.length; ++e)
                        if (t.id === this.data.nodes[e].id) return e;
                    return -1
                }
                translate(t, e, i) {
                    i || (this.lastTranlated.x = 0, this.lastTranlated.y = 0);
                    const s = t - this.lastTranlated.x,
                        r = e - this.lastTranlated.y;
                    for (const t of this.data.nodes) t.translate(s, r);
                    for (const t of this.data.lines) {
                        t.from.x += s, t.from.y += r, t.to.x += s, t.to.y += r;
                        for (const e of t.controlPoints) e.x += s, e.y += r;
                        o.Store.set("pts-" + t.id, null)
                    }
                    this.lastTranlated.x = t, this.lastTranlated.y = e, this.overflow(), this.render(), this.cache(), this.options
                        .on && this.options.on("translate", {
                        x: t,
                        y: e
                    })
                }
                scale(t) {
                    this.data.scale *= t;
                    const e = this.getRect().center;
                    for (const i of this.data.nodes) i.scale(t, e);
                    for (const i of this.data.lines) {
                        i.from.x = e.x - (e.x - i.from.x) * t, i.from.y = e.y - (e.y - i.from.y) * t, i.to.x = e.x - (e.x - i.to.x) *
                            t, i.to.y = e.y - (e.y - i.to.y) * t, i.from.round(), i.to.round();
                        for (const s of i.controlPoints) s.x = e.x - (e.x - s.x) * t, s.y = e.y - (e.y - s.y) * t;
                        o.Store.set("pts-" + i.id, null)
                    }
                    o.Store.set("scale", this.data.scale), this.overflow(), this.render(), this.cache(), this.options.on &&
                    this.options.on("scale", this.data.scale)
                }
                scaleTo(t) {
                    this.scale(t / this.data.scale)
                }
                round() {
                    for (const t of this.data.nodes) t.round()
                }
                alignNodes(t) {
                    this.activeLayer.alignNodes(t), this.render()
                }
                destroy() {
                    this.subcribe.unsubscribe(), this.subcribeAnimateEnd.unsubscribe(), this.subcribeAnimateMoved.unsubscribe(),
                        this.subcribeMediaEnd.unsubscribe(), this.animateLayer.destroy(), this.divLayer.destroy()
                }
            },
            registerNode: re,
            Pen: u,
            Node: ne,
            Point: h,
            Line: he,
            Rect: f,
            Store: we.Store,
            Observer: we.Observer,
            s8: n
        }
    }])
}));
