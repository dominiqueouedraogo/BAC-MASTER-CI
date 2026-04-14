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
var oidc = require("openid-client");
var express_1 = require("express");
var api_zod_1 = require("@workspace/api-zod");
var db_1 = require("@workspace/db");
var drizzle_orm_1 = require("drizzle-orm");
var auth_js_1 = require("../lib/auth.js");
var OIDC_COOKIE_TTL = 10 * 60 * 1000;
var router = (0, express_1.Router)();
function getOrigin(req) {
    var proto = req.headers["x-forwarded-proto"] || "https";
    var host = req.headers["x-forwarded-host"] || req.headers["host"] || "localhost";
    return "".concat(proto, "://").concat(host);
}
function setSessionCookie(res, sid) {
    res.cookie(auth_js_1.SESSION_COOKIE, sid, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: auth_js_1.SESSION_TTL,
    });
}
function setOidcCookie(res, name, value) {
    res.cookie(name, value, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: OIDC_COOKIE_TTL,
    });
}
function getSafeReturnTo(value) {
    if (typeof value !== "string" ||
        !value.startsWith("/") ||
        value.startsWith("//")) {
        return "/";
    }
    return value;
}
function upsertUser(claims) {
    return __awaiter(this, void 0, void 0, function () {
        var replitId, email, firstName, lastName, profileImageUrl, displayName, conditions, existing, updated, created;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    replitId = claims.sub;
                    email = claims.email || null;
                    firstName = claims.first_name || null;
                    lastName = claims.last_name || null;
                    profileImageUrl = (claims.profile_image_url ||
                        claims.picture);
                    displayName = [firstName, lastName].filter(Boolean).join(" ") || email || "Student";
                    conditions = [(0, drizzle_orm_1.eq)(db_1.usersTable.replitId, replitId)];
                    if (email)
                        conditions.push((0, drizzle_orm_1.eq)(db_1.usersTable.email, email));
                    return [4 /*yield*/, db_1.db
                            .select()
                            .from(db_1.usersTable)
                            .where(drizzle_orm_1.or.apply(void 0, conditions))
                            .limit(1)];
                case 1:
                    existing = (_a.sent())[0];
                    if (!existing) return [3 /*break*/, 3];
                    return [4 /*yield*/, db_1.db
                            .update(db_1.usersTable)
                            .set({
                            replitId: replitId,
                            avatarUrl: profileImageUrl !== null && profileImageUrl !== void 0 ? profileImageUrl : existing.avatarUrl,
                            updatedAt: new Date(),
                        })
                            .where((0, drizzle_orm_1.eq)(db_1.usersTable.id, existing.id))
                            .returning()];
                case 2:
                    updated = (_a.sent())[0];
                    return [2 /*return*/, updated];
                case 3: return [4 /*yield*/, db_1.db
                        .insert(db_1.usersTable)
                        .values({
                        name: displayName,
                        email: email,
                        replitId: replitId,
                        avatarUrl: profileImageUrl,
                        series: "A",
                        role: "student",
                        points: 0,
                        isPremium: false,
                    })
                        .returning()];
                case 4:
                    created = (_a.sent())[0];
                    return [2 /*return*/, created];
            }
        });
    });
}
function toSessionUser(user) {
    var _a, _b, _c, _d, _e;
    return {
        id: String(user.id),
        email: (_a = user.email) !== null && _a !== void 0 ? _a : null,
        firstName: (_c = (_b = user.name) === null || _b === void 0 ? void 0 : _b.split(" ")[0]) !== null && _c !== void 0 ? _c : null,
        lastName: ((_d = user.name) === null || _d === void 0 ? void 0 : _d.split(" ").slice(1).join(" ")) || null,
        profileImageUrl: (_e = user.avatarUrl) !== null && _e !== void 0 ? _e : null,
    };
}
router.get("/auth/user", function (req, res) {
    res.json(api_zod_1.GetCurrentAuthUserResponse.parse({
        user: req.isAuthenticated() ? req.user : null,
    }));
});
router.get("/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var config, callbackUrl, returnTo, state, nonce, codeVerifier, codeChallenge, redirectTo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, auth_js_1.getOidcConfig)()];
            case 1:
                config = _a.sent();
                callbackUrl = "".concat(getOrigin(req), "/api/callback");
                returnTo = getSafeReturnTo(req.query.returnTo);
                state = oidc.randomState();
                nonce = oidc.randomNonce();
                codeVerifier = oidc.randomPKCECodeVerifier();
                return [4 /*yield*/, oidc.calculatePKCECodeChallenge(codeVerifier)];
            case 2:
                codeChallenge = _a.sent();
                redirectTo = oidc.buildAuthorizationUrl(config, {
                    redirect_uri: callbackUrl,
                    scope: "openid email profile offline_access",
                    code_challenge: codeChallenge,
                    code_challenge_method: "S256",
                    prompt: "login consent",
                    state: state,
                    nonce: nonce,
                });
                setOidcCookie(res, "code_verifier", codeVerifier);
                setOidcCookie(res, "nonce", nonce);
                setOidcCookie(res, "state", state);
                setOidcCookie(res, "return_to", returnTo);
                res.redirect(redirectTo.href);
                return [2 /*return*/];
        }
    });
}); });
router.get("/callback", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var config, callbackUrl, codeVerifier, nonce, expectedState, currentUrl, tokens, _a, returnTo, claims, dbUser, now, sessionData, sid;
    var _b, _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0: return [4 /*yield*/, (0, auth_js_1.getOidcConfig)()];
            case 1:
                config = _f.sent();
                callbackUrl = "".concat(getOrigin(req), "/api/callback");
                codeVerifier = (_b = req.cookies) === null || _b === void 0 ? void 0 : _b.code_verifier;
                nonce = (_c = req.cookies) === null || _c === void 0 ? void 0 : _c.nonce;
                expectedState = (_d = req.cookies) === null || _d === void 0 ? void 0 : _d.state;
                if (!codeVerifier || !expectedState) {
                    res.redirect("/api/login");
                    return [2 /*return*/];
                }
                currentUrl = new URL("".concat(callbackUrl, "?").concat(new URL(req.url, "http://".concat(req.headers.host)).searchParams));
                _f.label = 2;
            case 2:
                _f.trys.push([2, 4, , 5]);
                return [4 /*yield*/, oidc.authorizationCodeGrant(config, currentUrl, {
                        pkceCodeVerifier: codeVerifier,
                        expectedNonce: nonce,
                        expectedState: expectedState,
                        idTokenExpected: true,
                    })];
            case 3:
                tokens = _f.sent();
                return [3 /*break*/, 5];
            case 4:
                _a = _f.sent();
                res.redirect("/api/login");
                return [2 /*return*/];
            case 5:
                returnTo = getSafeReturnTo((_e = req.cookies) === null || _e === void 0 ? void 0 : _e.return_to);
                res.clearCookie("code_verifier", { path: "/" });
                res.clearCookie("nonce", { path: "/" });
                res.clearCookie("state", { path: "/" });
                res.clearCookie("return_to", { path: "/" });
                claims = tokens.claims();
                if (!claims) {
                    res.redirect("/api/login");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, upsertUser(claims)];
            case 6:
                dbUser = _f.sent();
                now = Math.floor(Date.now() / 1000);
                sessionData = {
                    user: toSessionUser(dbUser),
                    access_token: tokens.access_token,
                    refresh_token: tokens.refresh_token,
                    expires_at: tokens.expiresIn() ? now + tokens.expiresIn() : claims.exp,
                };
                return [4 /*yield*/, (0, auth_js_1.createSession)(sessionData)];
            case 7:
                sid = _f.sent();
                setSessionCookie(res, sid);
                res.redirect(returnTo);
                return [2 /*return*/];
        }
    });
}); });
router.get("/logout", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var config, origin, sid, endSessionUrl;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, auth_js_1.getOidcConfig)()];
            case 1:
                config = _a.sent();
                origin = getOrigin(req);
                sid = (0, auth_js_1.getSessionId)(req);
                return [4 /*yield*/, (0, auth_js_1.clearSession)(res, sid)];
            case 2:
                _a.sent();
                endSessionUrl = oidc.buildEndSessionUrl(config, {
                    client_id: process.env.REPL_ID,
                    post_logout_redirect_uri: origin,
                });
                res.redirect(endSessionUrl.href);
                return [2 /*return*/];
        }
    });
}); });
router.post("/mobile-auth/token-exchange", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var parsed, _a, code, code_verifier, redirect_uri, state, nonce, config, callbackUrl, tokens, claims, dbUser, now, sessionData, sid, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                parsed = api_zod_1.ExchangeMobileAuthorizationCodeBody.safeParse(req.body);
                if (!parsed.success) {
                    res.status(400).json({ error: "Missing or invalid required parameters" });
                    return [2 /*return*/];
                }
                _a = parsed.data, code = _a.code, code_verifier = _a.code_verifier, redirect_uri = _a.redirect_uri, state = _a.state, nonce = _a.nonce;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, (0, auth_js_1.getOidcConfig)()];
            case 2:
                config = _b.sent();
                callbackUrl = new URL(redirect_uri);
                callbackUrl.searchParams.set("code", code);
                callbackUrl.searchParams.set("state", state);
                callbackUrl.searchParams.set("iss", auth_js_1.ISSUER_URL);
                return [4 /*yield*/, oidc.authorizationCodeGrant(config, callbackUrl, {
                        pkceCodeVerifier: code_verifier,
                        expectedNonce: nonce !== null && nonce !== void 0 ? nonce : undefined,
                        expectedState: state,
                        idTokenExpected: true,
                    })];
            case 3:
                tokens = _b.sent();
                claims = tokens.claims();
                if (!claims) {
                    res.status(401).json({ error: "No claims in ID token" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, upsertUser(claims)];
            case 4:
                dbUser = _b.sent();
                now = Math.floor(Date.now() / 1000);
                sessionData = {
                    user: toSessionUser(dbUser),
                    access_token: tokens.access_token,
                    refresh_token: tokens.refresh_token,
                    expires_at: tokens.expiresIn() ? now + tokens.expiresIn() : claims.exp,
                };
                return [4 /*yield*/, (0, auth_js_1.createSession)(sessionData)];
            case 5:
                sid = _b.sent();
                res.json(api_zod_1.ExchangeMobileAuthorizationCodeResponse.parse({ token: sid }));
                return [3 /*break*/, 7];
            case 6:
                err_1 = _b.sent();
                req.log.error({ err: err_1 }, "Mobile token exchange error");
                res.status(500).json({ error: "Token exchange failed" });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
router.post("/mobile-auth/logout", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sid;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sid = (0, auth_js_1.getSessionId)(req);
                if (!sid) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, auth_js_1.deleteSession)(sid)];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                res.json(api_zod_1.LogoutMobileSessionResponse.parse({ success: true }));
                return [2 /*return*/];
        }
    });
}); });
exports.default = router;
