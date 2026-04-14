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
var express_1 = require("express");
var bcryptjs_1 = require("bcryptjs");
var crypto_1 = require("crypto");
var db_1 = require("@workspace/db");
var db_2 = require("@workspace/db");
var drizzle_orm_1 = require("drizzle-orm");
var auth_js_1 = require("../middlewares/auth.js");
var router = (0, express_1.Router)();
router.post("/register", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, email, password, series, existing, passwordHash, user, token, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, name_1 = _a.name, email = _a.email, password = _a.password, series = _a.series;
                if (!name_1 || !email || !password || !series) {
                    res.status(400).json({ error: "Bad request", message: "Missing required fields" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, db_1.db.select().from(db_2.usersTable).where((0, drizzle_orm_1.eq)(db_2.usersTable.email, email)).limit(1)];
            case 1:
                existing = _b.sent();
                if (existing.length > 0) {
                    res.status(400).json({ error: "Bad request", message: "Email already in use" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
            case 2:
                passwordHash = _b.sent();
                return [4 /*yield*/, db_1.db.insert(db_2.usersTable).values({
                        name: name_1,
                        email: email,
                        passwordHash: passwordHash,
                        series: series,
                        role: "student",
                        points: 0,
                        isPremium: false,
                    }).returning()];
            case 3:
                user = (_b.sent())[0];
                token = (0, auth_js_1.generateToken)(user.id, user.role);
                res.status(201).json({
                    token: token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        series: user.series,
                        role: user.role,
                        avatarUrl: user.avatarUrl,
                        points: user.points,
                        isPremium: user.isPremium,
                        createdAt: user.createdAt,
                    },
                });
                return [3 /*break*/, 5];
            case 4:
                err_1 = _b.sent();
                req.log.error({ err: err_1 }, "Register error");
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.post("/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, valid, token, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, email = _a.email, password = _a.password;
                if (!email || !password) {
                    res.status(400).json({ error: "Bad request", message: "Missing email or password" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, db_1.db.select().from(db_2.usersTable).where((0, drizzle_orm_1.eq)(db_2.usersTable.email, email)).limit(1)];
            case 1:
                user = (_b.sent())[0];
                if (!user) {
                    res.status(401).json({ error: "Unauthorized", message: "Invalid credentials" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcryptjs_1.default.compare(password, user.passwordHash)];
            case 2:
                valid = _b.sent();
                if (!valid) {
                    res.status(401).json({ error: "Unauthorized", message: "Invalid credentials" });
                    return [2 /*return*/];
                }
                token = (0, auth_js_1.generateToken)(user.id, user.role);
                res.json({
                    token: token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        series: user.series,
                        role: user.role,
                        avatarUrl: user.avatarUrl,
                        points: user.points,
                        isPremium: user.isPremium,
                        createdAt: user.createdAt,
                    },
                });
                return [3 /*break*/, 4];
            case 3:
                err_2 = _b.sent();
                req.log.error({ err: err_2 }, "Login error");
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get("/me", auth_js_1.authMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.db.select().from(db_2.usersTable).where((0, drizzle_orm_1.eq)(db_2.usersTable.id, req.userId)).limit(1)];
            case 1:
                user = (_a.sent())[0];
                if (!user) {
                    res.status(404).json({ error: "Not found" });
                    return [2 /*return*/];
                }
                res.json({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    series: user.series,
                    role: user.role,
                    avatarUrl: user.avatarUrl,
                    points: user.points,
                    isPremium: user.isPremium,
                    createdAt: user.createdAt,
                });
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                req.log.error({ err: err_3 }, "GetMe error");
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/forgot-password", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user, token, expiry, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                email = req.body.email;
                if (!email) {
                    res.status(400).json({ error: "Bad request", message: "Email requis" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, db_1.db.select().from(db_2.usersTable).where((0, drizzle_orm_1.eq)(db_2.usersTable.email, email)).limit(1)];
            case 1:
                user = (_a.sent())[0];
                if (!user) {
                    res.json({ message: "Si ce compte existe, un lien de réinitialisation a été créé." });
                    return [2 /*return*/];
                }
                token = crypto_1.default.randomBytes(32).toString("hex");
                expiry = new Date(Date.now() + 60 * 60 * 1000);
                return [4 /*yield*/, db_1.db.update(db_2.usersTable)
                        .set({ resetToken: token, resetTokenExpiry: expiry })
                        .where((0, drizzle_orm_1.eq)(db_2.usersTable.id, user.id))];
            case 2:
                _a.sent();
                res.json({ message: "Lien de réinitialisation créé.", resetToken: token });
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                req.log.error({ err: err_4 }, "ForgotPassword error");
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post("/reset-password", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, token, password, user, passwordHash, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, token = _a.token, password = _a.password;
                if (!token || !password) {
                    res.status(400).json({ error: "Bad request", message: "Token et mot de passe requis" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, db_1.db.select().from(db_2.usersTable).where((0, drizzle_orm_1.eq)(db_2.usersTable.resetToken, token)).limit(1)];
            case 1:
                user = (_b.sent())[0];
                if (!user || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
                    res.status(400).json({ error: "Bad request", message: "Lien invalide ou expiré" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
            case 2:
                passwordHash = _b.sent();
                return [4 /*yield*/, db_1.db.update(db_2.usersTable)
                        .set({ passwordHash: passwordHash, resetToken: null, resetTokenExpiry: null })
                        .where((0, drizzle_orm_1.eq)(db_2.usersTable.id, user.id))];
            case 3:
                _b.sent();
                res.json({ message: "Mot de passe réinitialisé avec succès." });
                return [3 /*break*/, 5];
            case 4:
                err_5 = _b.sent();
                req.log.error({ err: err_5 }, "ResetPassword error");
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
