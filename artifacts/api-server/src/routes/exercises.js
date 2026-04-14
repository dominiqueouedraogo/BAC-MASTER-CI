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
var db_1 = require("@workspace/db");
var db_2 = require("@workspace/db");
var drizzle_orm_1 = require("drizzle-orm");
var auth_js_1 = require("../middlewares/auth.js");
var router = (0, express_1.Router)();
router.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, lessonId, subjectId, difficulty, series, conditions, rows, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.query, lessonId = _a.lessonId, subjectId = _a.subjectId, difficulty = _a.difficulty, series = _a.series;
                conditions = [];
                if (lessonId)
                    conditions.push((0, drizzle_orm_1.eq)(db_2.exercisesTable.lessonId, parseInt(lessonId)));
                if (subjectId)
                    conditions.push((0, drizzle_orm_1.eq)(db_2.exercisesTable.subjectId, parseInt(subjectId)));
                if (difficulty)
                    conditions.push((0, drizzle_orm_1.eq)(db_2.exercisesTable.difficulty, difficulty));
                if (series)
                    conditions.push((0, drizzle_orm_1.or)((0, drizzle_orm_1.eq)(db_2.exercisesTable.series, series), (0, drizzle_orm_1.eq)(db_2.exercisesTable.series, "ALL")));
                return [4 /*yield*/, db_1.db.select().from(db_2.exercisesTable)
                        .where(conditions.length > 0 ? drizzle_orm_1.and.apply(void 0, conditions) : undefined)
                        .orderBy(db_2.exercisesTable.createdAt)];
            case 1:
                rows = _b.sent();
                res.json(rows);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _b.sent();
                req.log.error({ err: err_1 }, "GetExercises error");
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, exercise, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(req.params.id);
                return [4 /*yield*/, db_1.db.select().from(db_2.exercisesTable).where((0, drizzle_orm_1.eq)(db_2.exercisesTable.id, id)).limit(1)];
            case 1:
                exercise = (_a.sent())[0];
                if (!exercise) {
                    res.status(404).json({ error: "Not found" });
                    return [2 /*return*/];
                }
                res.json(exercise);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                req.log.error({ err: err_2 }, "GetExercise error");
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/:id/submit", auth_js_1.authMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, answer, exercise, correct, pointsEarned, user, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                id = parseInt(req.params.id);
                answer = req.body.answer;
                return [4 /*yield*/, db_1.db.select().from(db_2.exercisesTable).where((0, drizzle_orm_1.eq)(db_2.exercisesTable.id, id)).limit(1)];
            case 1:
                exercise = (_a.sent())[0];
                if (!exercise) {
                    res.status(404).json({ error: "Not found" });
                    return [2 /*return*/];
                }
                correct = answer.trim().toLowerCase() === exercise.correctAnswer.trim().toLowerCase();
                pointsEarned = correct ? (exercise.difficulty === "hard" ? 30 : exercise.difficulty === "medium" ? 20 : 10) : 0;
                return [4 /*yield*/, db_1.db.insert(db_2.exerciseProgressTable).values({
                        userId: req.userId,
                        exerciseId: id,
                        correct: correct,
                        pointsEarned: pointsEarned,
                    })];
            case 2:
                _a.sent();
                if (!(pointsEarned > 0)) return [3 /*break*/, 5];
                return [4 /*yield*/, db_1.db.select().from(db_2.usersTable).where((0, drizzle_orm_1.eq)(db_2.usersTable.id, req.userId)).limit(1)];
            case 3:
                user = (_a.sent())[0];
                if (!user) return [3 /*break*/, 5];
                return [4 /*yield*/, db_1.db.update(db_2.usersTable).set({ points: user.points + pointsEarned }).where((0, drizzle_orm_1.eq)(db_2.usersTable.id, req.userId))];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                res.json({
                    correct: correct,
                    explanation: exercise.explanation,
                    correctAnswer: exercise.correctAnswer,
                    pointsEarned: pointsEarned,
                });
                return [3 /*break*/, 7];
            case 6:
                err_3 = _a.sent();
                req.log.error({ err: err_3 }, "SubmitExercise error");
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
router.post("/", auth_js_1.authMiddleware, auth_js_1.adminMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, lessonId, subjectId, series, question, type, difficulty, options, correctAnswer, explanation, isPremium, exercise, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, lessonId = _a.lessonId, subjectId = _a.subjectId, series = _a.series, question = _a.question, type = _a.type, difficulty = _a.difficulty, options = _a.options, correctAnswer = _a.correctAnswer, explanation = _a.explanation, isPremium = _a.isPremium;
                return [4 /*yield*/, db_1.db.insert(db_2.exercisesTable).values({
                        lessonId: lessonId,
                        subjectId: subjectId,
                        series: series || "ALL",
                        question: question,
                        type: type,
                        difficulty: difficulty,
                        options: options,
                        correctAnswer: correctAnswer,
                        explanation: explanation,
                        isPremium: isPremium || false,
                    }).returning()];
            case 1:
                exercise = (_b.sent())[0];
                res.status(201).json(exercise);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _b.sent();
                req.log.error({ err: err_4 }, "CreateExercise error");
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
