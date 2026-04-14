"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
router.get("/stats", auth_js_1.authMiddleware, auth_js_1.adminMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var totalUsers, premiumUsers, totalLessons, totalExercises, totalExams, totalReviews, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                return [4 /*yield*/, db_1.db.select({ count: (0, drizzle_orm_1.sql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["count(*)"], ["count(*)"]))) }).from(db_2.usersTable)];
            case 1:
                totalUsers = (_a.sent())[0];
                return [4 /*yield*/, db_1.db.select({ count: (0, drizzle_orm_1.sql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["count(*)"], ["count(*)"]))) }).from(db_2.usersTable).where((0, drizzle_orm_1.sql)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["is_premium = true"], ["is_premium = true"]))))];
            case 2:
                premiumUsers = (_a.sent())[0];
                return [4 /*yield*/, db_1.db.select({ count: (0, drizzle_orm_1.sql)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["count(*)"], ["count(*)"]))) }).from(db_2.lessonsTable)];
            case 3:
                totalLessons = (_a.sent())[0];
                return [4 /*yield*/, db_1.db.select({ count: (0, drizzle_orm_1.sql)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["count(*)"], ["count(*)"]))) }).from(db_2.exercisesTable)];
            case 4:
                totalExercises = (_a.sent())[0];
                return [4 /*yield*/, db_1.db.select({ count: (0, drizzle_orm_1.sql)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["count(*)"], ["count(*)"]))) }).from(db_2.examsTable)];
            case 5:
                totalExams = (_a.sent())[0];
                return [4 /*yield*/, db_1.db.select({ count: (0, drizzle_orm_1.sql)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["count(*)"], ["count(*)"]))) }).from(db_2.reviewsTable)];
            case 6:
                totalReviews = (_a.sent())[0];
                res.json({
                    totalUsers: Number((totalUsers === null || totalUsers === void 0 ? void 0 : totalUsers.count) || 0),
                    premiumUsers: Number((premiumUsers === null || premiumUsers === void 0 ? void 0 : premiumUsers.count) || 0),
                    totalLessons: Number((totalLessons === null || totalLessons === void 0 ? void 0 : totalLessons.count) || 0),
                    totalExercises: Number((totalExercises === null || totalExercises === void 0 ? void 0 : totalExercises.count) || 0),
                    totalExams: Number((totalExams === null || totalExams === void 0 ? void 0 : totalExams.count) || 0),
                    totalReviews: Number((totalReviews === null || totalReviews === void 0 ? void 0 : totalReviews.count) || 0),
                });
                return [3 /*break*/, 8];
            case 7:
                err_1 = _a.sent();
                req.log.error({ err: err_1 }, "GetAdminStats error");
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
router.get("/users", auth_js_1.authMiddleware, auth_js_1.adminMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.db.select({
                        id: db_2.usersTable.id,
                        name: db_2.usersTable.name,
                        email: db_2.usersTable.email,
                        series: db_2.usersTable.series,
                        role: db_2.usersTable.role,
                        avatarUrl: db_2.usersTable.avatarUrl,
                        points: db_2.usersTable.points,
                        isPremium: db_2.usersTable.isPremium,
                        replitId: db_2.usersTable.replitId,
                        createdAt: db_2.usersTable.createdAt,
                    }).from(db_2.usersTable).orderBy((0, drizzle_orm_1.desc)(db_2.usersTable.createdAt))];
            case 1:
                users = _a.sent();
                res.json(users);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                req.log.error({ err: err_2 }, "GetAdminUsers error");
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.patch("/users/:id", auth_js_1.authMiddleware, auth_js_1.adminMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, role, isPremium, series, updates, updated, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                id = parseInt(req.params.id);
                _a = req.body, role = _a.role, isPremium = _a.isPremium, series = _a.series;
                updates = {};
                if (role !== undefined)
                    updates.role = role;
                if (isPremium !== undefined)
                    updates.isPremium = isPremium;
                if (series !== undefined)
                    updates.series = series;
                return [4 /*yield*/, db_1.db.update(db_2.usersTable).set(updates).where((0, drizzle_orm_1.eq)(db_2.usersTable.id, id))];
            case 1:
                _b.sent();
                return [4 /*yield*/, db_1.db.select().from(db_2.usersTable).where((0, drizzle_orm_1.eq)(db_2.usersTable.id, id))];
            case 2:
                updated = (_b.sent())[0];
                res.json(updated);
                return [3 /*break*/, 4];
            case 3:
                err_3 = _b.sent();
                req.log.error({ err: err_3 }, "PatchAdminUser error");
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get("/activity", auth_js_1.authMiddleware, auth_js_1.adminMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dailyRegistrations, topLessons, seriesBreakdown, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, db_1.db.execute((0, drizzle_orm_1.sql)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n      SELECT TO_CHAR(created_at, 'Dy') AS day, COUNT(*) AS count\n      FROM users\n      WHERE created_at >= NOW() - INTERVAL '7 days'\n      GROUP BY TO_CHAR(created_at, 'Dy'), DATE(created_at)\n      ORDER BY DATE(created_at)\n    "], ["\n      SELECT TO_CHAR(created_at, 'Dy') AS day, COUNT(*) AS count\n      FROM users\n      WHERE created_at >= NOW() - INTERVAL '7 days'\n      GROUP BY TO_CHAR(created_at, 'Dy'), DATE(created_at)\n      ORDER BY DATE(created_at)\n    "]))))];
            case 1:
                dailyRegistrations = _a.sent();
                return [4 /*yield*/, db_1.db
                        .select({
                        lessonId: db_2.lessonProgressTable.lessonId,
                        title: db_2.lessonsTable.title,
                        views: (0, drizzle_orm_1.sql)(templateObject_9 || (templateObject_9 = __makeTemplateObject(["count(*)"], ["count(*)"]))),
                    })
                        .from(db_2.lessonProgressTable)
                        .leftJoin(db_2.lessonsTable, (0, drizzle_orm_1.eq)(db_2.lessonProgressTable.lessonId, db_2.lessonsTable.id))
                        .groupBy(db_2.lessonProgressTable.lessonId, db_2.lessonsTable.title)
                        .orderBy((0, drizzle_orm_1.desc)((0, drizzle_orm_1.sql)(templateObject_10 || (templateObject_10 = __makeTemplateObject(["count(*)"], ["count(*)"])))))
                        .limit(5)];
            case 2:
                topLessons = _a.sent();
                return [4 /*yield*/, db_1.db.execute((0, drizzle_orm_1.sql)(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n      SELECT series, COUNT(*) AS count\n      FROM users\n      WHERE role = 'student'\n      GROUP BY series\n      ORDER BY count DESC\n    "], ["\n      SELECT series, COUNT(*) AS count\n      FROM users\n      WHERE role = 'student'\n      GROUP BY series\n      ORDER BY count DESC\n    "]))))];
            case 3:
                seriesBreakdown = _a.sent();
                res.json({
                    dailyRegistrations: dailyRegistrations.rows,
                    topLessons: topLessons,
                    seriesBreakdown: seriesBreakdown.rows,
                });
                return [3 /*break*/, 5];
            case 4:
                err_4 = _a.sent();
                req.log.error({ err: err_4 }, "GetAdminActivity error");
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.get("/subjects", auth_js_1.authMiddleware, auth_js_1.adminMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var subjects, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.db.select().from(db_2.subjectsTable).orderBy(db_2.subjectsTable.order)];
            case 1:
                subjects = _a.sent();
                res.json(subjects);
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                req.log.error({ err: err_5 }, "GetAdminSubjects error");
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/courses", auth_js_1.authMiddleware, auth_js_1.adminMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var lessons, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.db
                        .select({
                        id: db_2.lessonsTable.id,
                        title: db_2.lessonsTable.title,
                        subjectId: db_2.lessonsTable.subjectId,
                        subjectName: db_2.subjectsTable.name,
                        series: db_2.lessonsTable.series,
                        isPremium: db_2.lessonsTable.isPremium,
                        duration: db_2.lessonsTable.duration,
                        order: db_2.lessonsTable.order,
                        createdAt: db_2.lessonsTable.createdAt,
                    })
                        .from(db_2.lessonsTable)
                        .leftJoin(db_2.subjectsTable, (0, drizzle_orm_1.eq)(db_2.lessonsTable.subjectId, db_2.subjectsTable.id))
                        .orderBy(db_2.lessonsTable.order)];
            case 1:
                lessons = _a.sent();
                res.json(lessons);
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                req.log.error({ err: err_6 }, "GetAdminCourses error");
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/exams", auth_js_1.authMiddleware, auth_js_1.adminMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var exams, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.db
                        .select({
                        id: db_2.examsTable.id,
                        title: db_2.examsTable.title,
                        subjectId: db_2.examsTable.subjectId,
                        subjectName: db_2.subjectsTable.name,
                        series: db_2.examsTable.series,
                        year: db_2.examsTable.year,
                        isPremium: db_2.examsTable.isPremium,
                        createdAt: db_2.examsTable.createdAt,
                    })
                        .from(db_2.examsTable)
                        .leftJoin(db_2.subjectsTable, (0, drizzle_orm_1.eq)(db_2.examsTable.subjectId, db_2.subjectsTable.id))
                        .orderBy((0, drizzle_orm_1.desc)(db_2.examsTable.year))];
            case 1:
                exams = _a.sent();
                res.json(exams);
                return [3 /*break*/, 3];
            case 2:
                err_7 = _a.sent();
                req.log.error({ err: err_7 }, "GetAdminExams error");
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.delete("/courses/:id", auth_js_1.authMiddleware, auth_js_1.adminMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = parseInt(req.params.id);
                return [4 /*yield*/, db_1.db.delete(db_2.exercisesTable).where((0, drizzle_orm_1.eq)(db_2.exercisesTable.lessonId, id))];
            case 1:
                _a.sent();
                return [4 /*yield*/, db_1.db.delete(db_2.lessonsTable).where((0, drizzle_orm_1.eq)(db_2.lessonsTable.id, id))];
            case 2:
                _a.sent();
                res.json({ success: true, message: "Course and linked exercises deleted" });
                return [3 /*break*/, 4];
            case 3:
                err_8 = _a.sent();
                req.log.error({ err: err_8 }, "DeleteAdminCourse error");
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11;
