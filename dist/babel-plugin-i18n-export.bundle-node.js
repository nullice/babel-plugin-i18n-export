!function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports
        ? exports["babel-plugin-i18n-export"] = t()
        : e["babel-plugin-i18n-export"] = t()
}(global, function () {
    return function (e) {
        var t = {}

        function n (r)
        {
            if (t[r]) return t[r].exports
            var o = t[r] = {i: r, l: !1, exports: {}}
            return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
        }

        return n.m = e, n.c = t, n.d = function (e, t, r) {
            n.o(e, t) || Object.defineProperty(e, t, {configurable: !1, enumerable: !0, get: r})
        }, n.r = function (e) {Object.defineProperty(e, "__esModule", {value: !0})}, n.n = function (e) {
            var t = e && e.__esModule
                ? function () {return e.default}
                : function () {return e}
            return n.d(t, "a", t), t
        }, n.o = function (e, t) {return Object.prototype.hasOwnProperty.call(e, t)}, n.p = "", n.w = {}, n(n.s = 4)
    }([
        function (e, t) {e.exports = require("fs")}, function (e, t, n) {
            "use strict"
            var r = n(0)
            t.a = function (e, t) {
                for (var n = {}, o = 0; o < e.length; o++)
                {
                    var a = e[o], i = "", l = ""
                    "object" == typeof a.functionArgs || "array" == typeof a.functionArgs ? (i = "$$$" + a.functionArgs[0] + "=", l = a.functionArgs[1]) : l = a.functionArgs, n[i +
                    l] = l
                }
                if (r.existsSync("local") || r.mkdirSync("local"), t.opts.exportRaw) r.writeFileSync("local/ExportRaw." + Math.random() + ".json",
                    JSON.stringify({callList: e}, null, 4)) else
                {
                    var c = {translationMap: {}}
                    if (r.existsSync("local/Export.language.json")) try
                    {c = JSON.parse(r.readFileSync("local/Export.language.json"))} catch (e)
                    {c = {translationMap: {}}}
                    r.writeFileSync("local/Export.language.json", JSON.stringify({translationMap: Object.assign(c.translationMap, n)}, null, 4))
                }
            }
        }, function (e, t) {
            e.exports = function (e) {
                if (!e.webpackPolyfill)
                {
                    var t = Object.create(e)
                    t.children || (t.children = []), Object.defineProperty(t, "loaded", {enumerable: !0, get: function () {return t.l}}), Object.defineProperty(t, "id",
                        {enumerable: !0, get: function () {return t.i}}), Object.defineProperty(t, "exports", {enumerable: !0}), t.webpackPolyfill = 1
                }
                return t
            }
        }, function (e, t, n) {
            "use strict"
            n.r(t), function (e) {
                var t = n(1), r = (n(0), [])
                e.exports = function (e) {
                    e.types
                    return {
                        visitor: {
                            CallExpression: {
                                enter: function (e, t) {
                                    if ("CallExpression" === e.type && e.node.callee)
                                    {
                                        var n = e.node, o = null
                                        if (o = "MemberExpression" == n.callee.type && n.callee.property ? n.callee.property.name : n.callee.name, n.callee && "tool" === o)
                                        {
                                            var a = []
                                            n.arguments && n.arguments.forEach(function (e) {
                                                "StringLiteral" === e.type ? a.push(e.value) : "NumericLiteral" === e.type ? a.push(e.value) : "TemplateLiteral" === e.type &&
                                                    a.push(function (e) {
                                                        for (var t = "", n = 0; n < e.quasis.length; n++)
                                                        {
                                                            var r = e.quasis[n]
                                                            t += r.value.cooked, e.expressions[n] && (t += "${" + n + "}")
                                                        }
                                                        return t
                                                    }(e))
                                            }), 1 === a.length && (a = a[0])
                                            var i = {functionName: o, functionArgs: a}
                                            r.push(i)
                                        }
                                    }
                                },
                            },
                        }, post: function (e) {Object(t.a)(r, e)},
                    }
                }
            }.call(this, n(2)(e))
        }, function (e, t, n) {
            "use strict"
            n.r(t)
            var r = n(3)
            t.default = r
        }]).default
})
