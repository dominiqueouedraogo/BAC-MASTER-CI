"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
    var series_1, subjects, withCounts, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                series_1 = req.query.series;
                return [4 /*yield*/, db_1.db.select().from(db_2.subjectsTable).orderBy(db_2.subjectsTable.order)];
            case 1:
                subjects = _a.sent();
                if (series_1) {
                    subjects = subjects.filter(function (s) { return s.series === series_1 || s.series === "ALL"; });
                }
                return [4 /*yield*/, Promise.all(subjects.map(function (s) { return __awaiter(void 0, void 0, void 0, function () {
                        var seriesCondition, count;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    seriesCondition = series_1
                                        ? (0, drizzle_orm_1.or)((0, drizzle_orm_1.eq)(db_2.lessonsTable.series, series_1), (0, drizzle_orm_1.eq)(db_2.lessonsTable.series, "ALL"))
                                        : undefined;
                                    return [4 /*yield*/, db_1.db.select({ count: (0, drizzle_orm_1.sql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["count(*)"], ["count(*)"]))) })
                                            .from(db_2.lessonsTable)
                                            .where(seriesCondition
                                            ? (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(db_2.lessonsTable.subjectId, s.id), seriesCondition)
                                            : (0, drizzle_orm_1.eq)(db_2.lessonsTable.subjectId, s.id))];
                                case 1:
                                    count = (_a.sent())[0];
                                    return [2 /*return*/, __assign(__assign({}, s), { lessonCount: Number((count === null || count === void 0 ? void 0 : count.count) || 0) })];
                            }
                        });
                    }); }))];
            case 2:
                withCounts = _a.sent();
                res.json(withCounts);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                req.log.error({ err: err_1 }, "GetSubjects error");
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, subject, count, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = parseInt(req.params.id);
                return [4 /*yield*/, db_1.db.select().from(db_2.subjectsTable).where((0, drizzle_orm_1.eq)(db_2.subjectsTable.id, id)).limit(1)];
            case 1:
                subject = (_a.sent())[0];
                if (!subject) {
                    res.status(404).json({ error: "Not found" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, db_1.db.select({ count: (0, drizzle_orm_1.sql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["count(*)"], ["count(*)"]))) }).from(db_2.lessonsTable).where((0, drizzle_orm_1.eq)(db_2.lessonsTable.subjectId, id))];
            case 2:
                count = (_a.sent())[0];
                res.json(__assign(__assign({}, subject), { lessonCount: Number((count === null || count === void 0 ? void 0 : count.count) || 0) }));
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                req.log.error({ err: err_2 }, "GetSubject error");
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post("/", auth_js_1.authMiddleware, auth_js_1.adminMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, series, description, icon, color, subject, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, name_1 = _a.name, series = _a.series, description = _a.description, icon = _a.icon, color = _a.color;
                return [4 /*yield*/, db_1.db.insert(db_2.subjectsTable).values({ name: name_1, series: series || "ALL", description: description, icon: icon, color: color }).returning()];
            case 1:
                subject = (_b.sent())[0];
                res.status(201).json(__assign(__assign({}, subject), { lessonCount: 0 }));
                return [3 /*break*/, 3];
            case 2:
                err_3 = _b.sent();
                req.log.error({ err: err_3 }, "CreateSubject error");
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
var templateObject_1, templateObject_2;
