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
router.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var lessonId, reviews, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                lessonId = parseInt(req.query.lessonId);
                if (!lessonId) {
                    res.status(400).json({ error: "lessonId required" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, db_1.db.select({
                        id: db_2.reviewsTable.id,
                        lessonId: db_2.reviewsTable.lessonId,
                        userId: db_2.reviewsTable.userId,
                        userName: db_2.usersTable.name,
                        rating: db_2.reviewsTable.rating,
                        comment: db_2.reviewsTable.comment,
                        isApproved: db_2.reviewsTable.isApproved,
                        createdAt: db_2.reviewsTable.createdAt,
                    }).from(db_2.reviewsTable)
                        .leftJoin(db_2.usersTable, (0, drizzle_orm_1.eq)(db_2.reviewsTable.userId, db_2.usersTable.id))
                        .where((0, drizzle_orm_1.eq)(db_2.reviewsTable.lessonId, lessonId))];
            case 1:
                reviews = _a.sent();
                res.json(reviews.filter(function (r) { return r.isApproved; }));
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                req.log.error({ err: err_1 }, "GetReviews error");
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/", auth_js_1.authMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, lessonId, rating, comment, review, user, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, lessonId = _a.lessonId, rating = _a.rating, comment = _a.comment;
                return [4 /*yield*/, db_1.db.insert(db_2.reviewsTable).values({
                        lessonId: lessonId,
                        userId: req.userId,
                        rating: rating,
                        comment: comment,
                        isApproved: false,
                    }).returning()];
            case 1:
                review = (_b.sent())[0];
                return [4 /*yield*/, db_1.db.select().from(db_2.usersTable).where((0, drizzle_orm_1.eq)(db_2.usersTable.id, req.userId)).limit(1)];
            case 2:
                user = (_b.sent())[0];
                res.status(201).json(__assign(__assign({}, review), { userName: (user === null || user === void 0 ? void 0 : user.name) || "Utilisateur" }));
                return [3 /*break*/, 4];
            case 3:
                err_2 = _b.sent();
                req.log.error({ err: err_2 }, "CreateReview error");
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.put("/:id/moderate", auth_js_1.authMiddleware, auth_js_1.adminMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, approved, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(req.params.id);
                approved = req.body.approved;
                return [4 /*yield*/, db_1.db.update(db_2.reviewsTable).set({ isApproved: approved }).where((0, drizzle_orm_1.eq)(db_2.reviewsTable.id, id))];
            case 1:
                _a.sent();
                res.json({ success: true, message: "Review moderated" });
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                req.log.error({ err: err_3 }, "ModerateReview error");
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
