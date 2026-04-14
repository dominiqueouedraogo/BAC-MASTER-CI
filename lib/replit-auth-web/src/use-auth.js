"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuth = useAuth;
var react_1 = require("react");
function useAuth() {
    var _a = (0, react_1.useState)(null), user = _a[0], setUser = _a[1];
    var _b = (0, react_1.useState)(true), isLoading = _b[0], setIsLoading = _b[1];
    (0, react_1.useEffect)(function () {
        var cancelled = false;
        fetch("/api/auth/user", { credentials: "include" })
            .then(function (res) {
            if (!res.ok)
                throw new Error("HTTP ".concat(res.status));
            return res.json();
        })
            .then(function (data) {
            var _a;
            if (!cancelled) {
                setUser((_a = data.user) !== null && _a !== void 0 ? _a : null);
                setIsLoading(false);
            }
        })
            .catch(function () {
            if (!cancelled) {
                setUser(null);
                setIsLoading(false);
            }
        });
        return function () {
            cancelled = true;
        };
    }, []);
    var login = (0, react_1.useCallback)(function () {
        var base = import.meta.env.BASE_URL.replace(/\/+$/, "") || "/";
        window.location.href = "/api/login?returnTo=".concat(encodeURIComponent(base));
    }, []);
    var logout = (0, react_1.useCallback)(function () {
        window.location.href = "/api/logout";
    }, []);
    return {
        user: user,
        isLoading: isLoading,
        isAuthenticated: !!user,
        login: login,
        logout: logout,
    };
}
