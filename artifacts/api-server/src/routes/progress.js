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
router.get("/", auth_js_1.authMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, totalLessonsCount, totalExercisesCount, completedLessonsCount, completedExercisesCount, correctExercisesCount, user, totalLessons, completedLessons, totalExercises, completedExercises, correctExercises, progressPercentage, recentProgressRows, recentLessonIds, recentLessons, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 10, , 11]);
                userId = req.userId;
                return [4 /*yield*/, db_1.db.select({ count: (0, drizzle_orm_1.sql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["count(*)"], ["count(*)"]))) }).from(db_2.lessonsTable)];
            case 1:
                totalLessonsCount = (_a.sent())[0];
                return [4 /*yield*/, db_1.db.select({ count: (0, drizzle_orm_1.sql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["count(*)"], ["count(*)"]))) }).from(db_2.exercisesTable)];
            case 2:
                totalExercisesCount = (_a.sent())[0];
                return [4 /*yield*/, db_1.db.select({ count: (0, drizzle_orm_1.sql)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["count(*)"], ["count(*)"]))) }).from(db_2.lessonProgressTable).where((0, drizzle_orm_1.eq)(db_2.lessonProgressTable.userId, userId))];
            case 3:
                completedLessonsCount = (_a.sent())[0];
                return [4 /*yield*/, db_1.db.select({ count: (0, drizzle_orm_1.sql)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["count(*)"], ["count(*)"]))) }).from(db_2.exerciseProgressTable).where((0, drizzle_orm_1.eq)(db_2.exerciseProgressTable.userId, userId))];
            case 4:
                completedExercisesCount = (_a.sent())[0];
                return [4 /*yield*/, db_1.db.select({ count: (0, drizzle_orm_1.sql)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["count(*)"], ["count(*)"]))) }).from(db_2.exerciseProgressTable).where((0, drizzle_orm_1.eq)(db_2.exerciseProgressTable.userId, userId))];
            case 5:
                correctExercisesCount = (_a.sent())[0];
                return [4 /*yield*/, db_1.db.select().from(db_2.usersTable).where((0, drizzle_orm_1.eq)(db_2.usersTable.id, userId)).limit(1)];
            case 6:
                user = (_a.sent())[0];
                totalLessons = Number((totalLessonsCount === null || totalLessonsCount === void 0 ? void 0 : totalLessonsCount.count) || 0);
                completedLessons = Number((completedLessonsCount === null || completedLessonsCount === void 0 ? void 0 : completedLessonsCount.count) || 0);
                totalExercises = Number((totalExercisesCount === null || totalExercisesCount === void 0 ? void 0 : totalExercisesCount.count) || 0);
                completedExercises = Number((completedExercisesCount === null || completedExercisesCount === void 0 ? void 0 : completedExercisesCount.count) || 0);
                correctExercises = Number((correctExercisesCount === null || correctExercisesCount === void 0 ? void 0 : correctExercisesCount.count) || 0);
                progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
                return [4 /*yield*/, db_1.db.select().from(db_2.lessonProgressTable)
                        .where((0, drizzle_orm_1.eq)(db_2.lessonProgressTable.userId, userId))
                        .orderBy(db_2.lessonProgressTable.completedAt)
                        .limit(5)];
            case 7:
                recentProgressRows = _a.sent();
                recentLessonIds = recentProgressRows.map(function (r) { return r.lessonId; });
                recentLessons = [];
                if (!(recentLessonIds.length > 0)) return [3 /*break*/, 9];
                return [4 /*yield*/, db_1.db.select({
                        id: db_2.lessonsTable.id,
                        title: db_2.lessonsTable.title,
                        subjectId: db_2.lessonsTable.subjectId,
                        subjectName: db_2.subjectsTable.name,
                        series: db_2.lessonsTable.series,
                        content: db_2.lessonsTable.content,
                        summary: db_2.lessonsTable.summary,
                        videoUrl: db_2.lessonsTable.videoUrl,
                        audioUrl: db_2.lessonsTable.audioUrl,
                        pdfUrl: db_2.lessonsTable.pdfUrl,
                        isPremium: db_2.lessonsTable.isPremium,
                        duration: db_2.lessonsTable.duration,
                        order: db_2.lessonsTable.order,
                        createdAt: db_2.lessonsTable.createdAt,
                    }).from(db_2.lessonsTable)
                        .leftJoin(db_2.subjectsTable, (0, drizzle_orm_1.eq)(db_2.lessonsTable.subjectId, db_2.subjectsTable.id))
                        .where((0, drizzle_orm_1.eq)(db_2.lessonsTable.id, recentLessonIds[0]))];
            case 8:
                recentLessons = _a.sent();
                _a.label = 9;
            case 9:
                res.json({
                    totalLessons: totalLessons,
                    completedLessons: completedLessons,
                    totalExercises: totalExercises,
                    completedExercises: completedExercises,
                    correctExercises: correctExercises,
                    progressPercentage: progressPercentage,
                    points: (user === null || user === void 0 ? void 0 : user.points) || 0,
                    streak: (user === null || user === void 0 ? void 0 : user.streak) || 0,
                    recentLessons: recentLessons,
                });
                return [3 /*break*/, 11];
            case 10:
                err_1 = _a.sent();
                req.log.error({ err: err_1 }, "GetProgress error");
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); });
router.post("/lesson/:lessonId", auth_js_1.authMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var lessonId_1, userId, existing, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                lessonId_1 = parseInt(req.params.lessonId);
                userId = req.userId;
                return [4 /*yield*/, db_1.db.select().from(db_2.lessonProgressTable)
                        .where((0, drizzle_orm_1.eq)(db_2.lessonProgressTable.userId, userId))
                        .limit(1)];
            case 1:
                existing = _a.sent();
                if (!!existing.some(function (p) { return p.lessonId === lessonId_1; })) return [3 /*break*/, 4];
                return [4 /*yield*/, db_1.db.insert(db_2.lessonProgressTable).values({ userId: userId, lessonId: lessonId_1, completed: true })];
            case 2:
                _a.sent();
                return [4 /*yield*/, db_1.db.update(db_2.usersTable).set({ points: (0, drizzle_orm_1.sql)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["", " + 10"], ["", " + 10"])), db_2.usersTable.points) }).where((0, drizzle_orm_1.eq)(db_2.usersTable.id, userId))];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                res.json({ success: true, message: "Progress updated" });
                return [3 /*break*/, 6];
            case 5:
                err_2 = _a.sent();
                req.log.error({ err: err_2 }, "MarkLessonComplete error");
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
