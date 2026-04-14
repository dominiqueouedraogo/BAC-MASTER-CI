"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var db_1 = require("@workspace/db");
var db_2 = require("@workspace/db");
var drizzle_orm_1 = require("drizzle-orm");
var auth_js_1 = require("../middlewares/auth.js");
var router = (0, express_1.Router)();
router.get("/leaderboard", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var limit, users, leaderboard, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                limit = parseInt(req.query.limit || "20");
                return [4 /*yield*/, db_1.db.select({
                        id: db_2.usersTable.id,
                        name: db_2.usersTable.name,
                        series: db_2.usersTable.series,
                        points: db_2.usersTable.points,
                        avatarUrl: db_2.usersTable.avatarUrl,
                    }).from(db_2.usersTable).orderBy((0, drizzle_orm_1.desc)(db_2.usersTable.points)).limit(limit)];
            case 1:
                users = _a.sent();
                leaderboard = users.map(function (u, i) { return ({
                    rank: i + 1,
                    userId: u.id,
                    name: u.name,
                    avatarUrl: u.avatarUrl,
                    series: u.series,
                    points: u.points,
                    badges: 0,
                }); });
                res.json(leaderboard);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                req.log.error({ err: err_1 }, "GetLeaderboard error");
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/badges", auth_js_1.authMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var allBadges, userBadges_1, earnedBadgeIds_1, result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, db_1.db.select().from(db_2.badgesTable)];
            case 1:
                allBadges = _a.sent();
                return [4 /*yield*/, db_1.db.select().from(db_2.userBadgesTable).where((0, drizzle_orm_1.eq)(db_2.userBadgesTable.userId, req.userId))];
            case 2:
                userBadges_1 = _a.sent();
                earnedBadgeIds_1 = new Set(userBadges_1.map(function (ub) { return ub.badgeId; }));
                result = allBadges.map(function (b) {
                    var _a;
                    return (__assign(__assign({}, b), { earned: earnedBadgeIds_1.has(b.id), earnedAt: ((_a = userBadges_1.find(function (ub) { return ub.badgeId === b.id; })) === null || _a === void 0 ? void 0 : _a.earnedAt) || null }));
                });
                res.json(result);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                req.log.error({ err: err_2 }, "GetBadges error");
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
