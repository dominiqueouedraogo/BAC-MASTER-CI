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
var lessonFields = {
    id: db_2.lessonsTable.id,
    title: db_2.lessonsTable.title,
    subjectId: db_2.lessonsTable.subjectId,
    subjectName: db_2.subjectsTable.name,
    series: db_2.lessonsTable.series,
    content: db_2.lessonsTable.content,
    summary: db_2.lessonsTable.summary,
    keyPoints: db_2.lessonsTable.keyPoints,
    examples: db_2.lessonsTable.examples,
    videoUrl: db_2.lessonsTable.videoUrl,
    audioUrl: db_2.lessonsTable.audioUrl,
    pdfUrl: db_2.lessonsTable.pdfUrl,
    isPremium: db_2.lessonsTable.isPremium,
    duration: db_2.lessonsTable.duration,
    order: db_2.lessonsTable.order,
    createdAt: db_2.lessonsTable.createdAt,
};
router.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, subjectId, series, conditions, rows, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.query, subjectId = _a.subjectId, series = _a.series;
                conditions = [];
                if (subjectId)
                    conditions.push((0, drizzle_orm_1.eq)(db_2.lessonsTable.subjectId, parseInt(subjectId)));
                if (series)
                    conditions.push((0, drizzle_orm_1.or)((0, drizzle_orm_1.eq)(db_2.lessonsTable.series, series), (0, drizzle_orm_1.eq)(db_2.lessonsTable.series, "ALL")));
                return [4 /*yield*/, db_1.db
                        .select(lessonFields)
                        .from(db_2.lessonsTable)
                        .leftJoin(db_2.subjectsTable, (0, drizzle_orm_1.eq)(db_2.lessonsTable.subjectId, db_2.subjectsTable.id))
                        .where(conditions.length > 0 ? drizzle_orm_1.and.apply(void 0, conditions) : undefined)
                        .orderBy(db_2.lessonsTable.order)];
            case 1:
                rows = _b.sent();
                res.json(rows);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _b.sent();
                req.log.error({ err: err_1 }, "GetLessons error");
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, row, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(req.params.id);
                return [4 /*yield*/, db_1.db
                        .select(lessonFields)
                        .from(db_2.lessonsTable)
                        .leftJoin(db_2.subjectsTable, (0, drizzle_orm_1.eq)(db_2.lessonsTable.subjectId, db_2.subjectsTable.id))
                        .where((0, drizzle_orm_1.eq)(db_2.lessonsTable.id, id))
                        .limit(1)];
            case 1:
                row = (_a.sent())[0];
                if (!row) {
                    res.status(404).json({ error: "Not found" });
                    return [2 /*return*/];
                }
                res.json(row);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                req.log.error({ err: err_2 }, "GetLesson error");
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/", auth_js_1.authMiddleware, auth_js_1.adminMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, subjectId, series, content, summary, keyPoints, examples, videoUrl, audioUrl, pdfUrl, isPremium, duration, order, lesson, subject, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, title = _a.title, subjectId = _a.subjectId, series = _a.series, content = _a.content, summary = _a.summary, keyPoints = _a.keyPoints, examples = _a.examples, videoUrl = _a.videoUrl, audioUrl = _a.audioUrl, pdfUrl = _a.pdfUrl, isPremium = _a.isPremium, duration = _a.duration, order = _a.order;
                return [4 /*yield*/, db_1.db.insert(db_2.lessonsTable).values({
                        title: title,
                        subjectId: subjectId,
                        series: series || "ALL",
                        content: content,
                        summary: summary,
                        keyPoints: keyPoints,
                        examples: examples,
                        videoUrl: videoUrl,
                        audioUrl: audioUrl,
                        pdfUrl: pdfUrl,
                        isPremium: isPremium || false,
                        duration: duration,
                        order: order || 0,
                    }).returning()];
            case 1:
                lesson = (_b.sent())[0];
                return [4 /*yield*/, db_1.db.select().from(db_2.subjectsTable).where((0, drizzle_orm_1.eq)(db_2.subjectsTable.id, subjectId)).limit(1)];
            case 2:
                subject = (_b.sent())[0];
                res.status(201).json(__assign(__assign({}, lesson), { subjectName: (subject === null || subject === void 0 ? void 0 : subject.name) || "" }));
                return [3 /*break*/, 4];
            case 3:
                err_3 = _b.sent();
                req.log.error({ err: err_3 }, "CreateLesson error");
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.put("/:id", auth_js_1.authMiddleware, auth_js_1.adminMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, title, subjectId, series, content, summary, keyPoints, examples, videoUrl, audioUrl, pdfUrl, isPremium, duration, order, lesson, subject, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                id = parseInt(req.params.id);
                _a = req.body, title = _a.title, subjectId = _a.subjectId, series = _a.series, content = _a.content, summary = _a.summary, keyPoints = _a.keyPoints, examples = _a.examples, videoUrl = _a.videoUrl, audioUrl = _a.audioUrl, pdfUrl = _a.pdfUrl, isPremium = _a.isPremium, duration = _a.duration, order = _a.order;
                return [4 /*yield*/, db_1.db.update(db_2.lessonsTable).set({
                        title: title,
                        subjectId: subjectId,
                        series: series,
                        content: content,
                        summary: summary,
                        keyPoints: keyPoints,
                        examples: examples,
                        videoUrl: videoUrl,
                        audioUrl: audioUrl,
                        pdfUrl: pdfUrl,
                        isPremium: isPremium,
                        duration: duration,
                        order: order,
                    }).where((0, drizzle_orm_1.eq)(db_2.lessonsTable.id, id)).returning()];
            case 1:
                lesson = (_b.sent())[0];
                return [4 /*yield*/, db_1.db.select().from(db_2.subjectsTable).where((0, drizzle_orm_1.eq)(db_2.subjectsTable.id, lesson.subjectId)).limit(1)];
            case 2:
                subject = (_b.sent())[0];
                res.json(__assign(__assign({}, lesson), { subjectName: (subject === null || subject === void 0 ? void 0 : subject.name) || "" }));
                return [3 /*break*/, 4];
            case 3:
                err_4 = _b.sent();
                req.log.error({ err: err_4 }, "UpdateLesson error");
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.delete("/:id", auth_js_1.authMiddleware, auth_js_1.adminMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(req.params.id);
                return [4 /*yield*/, db_1.db.delete(db_2.lessonsTable).where((0, drizzle_orm_1.eq)(db_2.lessonsTable.id, id))];
            case 1:
                _a.sent();
                res.json({ success: true, message: "Lesson deleted" });
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                req.log.error({ err: err_5 }, "DeleteLesson error");
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
