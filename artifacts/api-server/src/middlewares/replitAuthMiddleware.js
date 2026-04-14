"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replitAuthMiddleware = replitAuthMiddleware;
var oidc = require("openid-client");
var auth_js_1 = require("../lib/auth.js");
function refreshIfExpired(sid, session) {
    return __awaiter(this, void 0, void 0, function () {
        var now, config, tokens, _a;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    now = Math.floor(Date.now() / 1000);
                    if (!session.expires_at || now <= session.expires_at)
                        return [2 /*return*/, session];
                    if (!session.refresh_token)
                        return [2 /*return*/, null];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, (0, auth_js_1.getOidcConfig)()];
                case 2:
                    config = _c.sent();
                    return [4 /*yield*/, oidc.refreshTokenGrant(config, session.refresh_token)];
                case 3:
                    tokens = _c.sent();
                    session.access_token = tokens.access_token;
                    session.refresh_token = (_b = tokens.refresh_token) !== null && _b !== void 0 ? _b : session.refresh_token;
                    session.expires_at = tokens.expiresIn()
                        ? now + tokens.expiresIn()
                        : session.expires_at;
                    return [4 /*yield*/, (0, auth_js_1.updateSession)(sid, session)];
                case 4:
                    _c.sent();
                    return [2 /*return*/, session];
                case 5:
                    _a = _c.sent();
                    return [2 /*return*/, null];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function replitAuthMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var sid, session, refreshed;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    req.isAuthenticated = function () {
                        return this.user != null;
                    };
                    sid = (0, auth_js_1.getSessionId)(req);
                    if (!sid) {
                        next();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, (0, auth_js_1.getSession)(sid)];
                case 1:
                    session = _b.sent();
                    if (!!((_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.id)) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, auth_js_1.clearSession)(res, sid)];
                case 2:
                    _b.sent();
                    next();
                    return [2 /*return*/];
                case 3: return [4 /*yield*/, refreshIfExpired(sid, session)];
                case 4:
                    refreshed = _b.sent();
                    if (!!refreshed) return [3 /*break*/, 6];
                    return [4 /*yield*/, (0, auth_js_1.clearSession)(res, sid)];
                case 5:
                    _b.sent();
                    next();
                    return [2 /*return*/];
                case 6:
                    req.user = refreshed.user;
                    next();
                    return [2 /*return*/];
            }
        });
    });
}
