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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var db_1 = require("@workspace/db");
var db_2 = require("@workspace/db");
var drizzle_orm_1 = require("drizzle-orm");
var auth_js_1 = require("../middlewares/auth.js");
var integrations_openai_ai_server_1 = require("@workspace/integrations-openai-ai-server");
var router = (0, express_1.Router)();
var EDUCATIONAL_SYSTEM_PROMPT = "Tu es un tuteur IA sp\u00E9cialis\u00E9 pour les lyc\u00E9ens en Terminale (A, C, D) en C\u00F4te d'Ivoire. \nTu t'appelles \"BAC Assistant\".\nTu r\u00E9ponds UNIQUEMENT aux questions \u00E9ducatives: math\u00E9matiques, physique-chimie, SVT, fran\u00E7ais, philosophie, anglais, histoire-g\u00E9ographie, et toute autre mati\u00E8re du programme scolaire ivoirien.\nSi la question n'est pas \u00E9ducative, refuse poliment en disant: \"Je suis d\u00E9sol\u00E9, je suis uniquement disponible pour r\u00E9pondre aux questions \u00E9ducatives li\u00E9es aux programmes scolaires. Posez-moi une question sur vos cours!\"\nR\u00E9ponds toujours en fran\u00E7ais, de mani\u00E8re claire et p\u00E9dagogique, comme un professeur bienveillant.\nDonne des explications d\u00E9taill\u00E9es, des exemples concrets et des conseils pratiques.";
function isEducationalQuestion(message) {
    var nonEducationalPatterns = [
        /\b(recette|cuisine|restaurant|film|movie|musique|sport|football|jeu|game|politique|religion|argent|money|amour|love|date|rencontre|blague|joke)\b/i,
        /\b(hack|pirater|tricher|cheat|voler|steal)\b/i,
    ];
    var educationalPatterns = [
        /\b(math|calcul|équation|fonction|géométrie|algèbre|trigonométrie|statistique)\b/i,
        /\b(physique|chimie|atome|molécule|réaction|force|énergie|électricité)\b/i,
        /\b(svt|biologie|cellule|plante|animal|corps humain|reproduction|écologie)\b/i,
        /\b(français|littérature|grammaire|conjugaison|dissertation|texte|lecture)\b/i,
        /\b(philosophie|philo|pensée|argument|thèse|antithèse)\b/i,
        /\b(anglais|english|grammar|vocabulary|traduction)\b/i,
        /\b(histoire|géographie|géo|guerre|révolution|pays|capitale|continent)\b/i,
        /\b(bac|terminal|exercice|cours|leçon|devoirs|examen|révision|étude)\b/i,
        /\b(comment|expliquer|définition|qu'est-ce|pourquoi|résoudre|calculer)\b/i,
    ];
    var hasNonEducational = nonEducationalPatterns.some(function (p) { return p.test(message); });
    var hasEducational = educationalPatterns.some(function (p) { return p.test(message); });
    if (hasEducational)
        return true;
    if (hasNonEducational)
        return false;
    return true;
}
router.post("/message", auth_js_1.authMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, message, context, isEducational, reply, systemContent, history_1, messages, completion, err_1;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 7, , 8]);
                _a = req.body, message = _a.message, context = _a.context;
                if (!message) {
                    res.status(400).json({ error: "Message required" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, db_1.db.insert(db_2.chatMessagesTable).values({
                        userId: req.userId,
                        role: "user",
                        content: message,
                    })];
            case 1:
                _d.sent();
                isEducational = isEducationalQuestion(message);
                reply = void 0;
                if (!!isEducational) return [3 /*break*/, 2];
                reply = "Je suis désolé, je suis uniquement disponible pour répondre aux questions éducatives liées aux programmes scolaires. Posez-moi une question sur vos cours de Terminale!";
                return [3 /*break*/, 5];
            case 2:
                systemContent = context
                    ? "".concat(EDUCATIONAL_SYSTEM_PROMPT, "\n\nContexte du cours actuel: ").concat(context)
                    : EDUCATIONAL_SYSTEM_PROMPT;
                return [4 /*yield*/, db_1.db.select().from(db_2.chatMessagesTable)
                        .where((0, drizzle_orm_1.eq)(db_2.chatMessagesTable.userId, req.userId))
                        .orderBy((0, drizzle_orm_1.desc)(db_2.chatMessagesTable.createdAt))
                        .limit(10)];
            case 3:
                history_1 = _d.sent();
                messages = __spreadArray(__spreadArray([
                    { role: "system", content: systemContent }
                ], history_1.reverse().map(function (m) { return ({
                    role: m.role,
                    content: m.content,
                }); }), true), [
                    { role: "user", content: message },
                ], false);
                return [4 /*yield*/, integrations_openai_ai_server_1.openai.chat.completions.create({
                        model: "gpt-5.2",
                        max_completion_tokens: 8192,
                        messages: messages,
                    })];
            case 4:
                completion = _d.sent();
                reply = ((_c = (_b = completion.choices[0]) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.content) || "Je n'ai pas pu générer une réponse. Réessayez.";
                _d.label = 5;
            case 5: return [4 /*yield*/, db_1.db.insert(db_2.chatMessagesTable).values({
                    userId: req.userId,
                    role: "assistant",
                    content: reply,
                })];
            case 6:
                _d.sent();
                res.json({ reply: reply, isEducational: isEducational });
                return [3 /*break*/, 8];
            case 7:
                err_1 = _d.sent();
                req.log.error({ err: err_1 }, "ChatMessage error");
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
router.get("/history", auth_js_1.authMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var messages, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.db.select().from(db_2.chatMessagesTable)
                        .where((0, drizzle_orm_1.eq)(db_2.chatMessagesTable.userId, req.userId))
                        .orderBy(db_2.chatMessagesTable.createdAt)
                        .limit(50)];
            case 1:
                messages = _a.sent();
                res.json(messages);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                req.log.error({ err: err_2 }, "GetChatHistory error");
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/quiz-generate", auth_js_1.authMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, lessonId, series, lesson, contentPreview, seriesLabel, prompt_1, completion, rawContent, jsonMatch, quizData, err_3;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 3, , 4]);
                _a = req.body, lessonId = _a.lessonId, series = _a.series;
                if (!lessonId) {
                    res.status(400).json({ error: "lessonId required" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, db_1.db.select().from(db_2.lessonsTable).where((0, drizzle_orm_1.eq)(db_2.lessonsTable.id, lessonId)).limit(1)];
            case 1:
                lesson = (_d.sent())[0];
                if (!lesson) {
                    res.status(404).json({ error: "Lesson not found" });
                    return [2 /*return*/];
                }
                contentPreview = lesson.content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 3000);
                seriesLabel = series || lesson.series || "D";
                prompt_1 = "Tu es un enseignant qui cr\u00E9e des quiz pour des \u00E9l\u00E8ves de Terminale ".concat(seriesLabel, " en C\u00F4te d'Ivoire.\n\nBas\u00E9 sur ce contenu de cours:\n---\n").concat(contentPreview, "\n---\n\nG\u00E9n\u00E8re exactement 5 questions \u00E0 choix multiples (QCM) en fran\u00E7ais. \n\nR\u00C9PONDS UNIQUEMENT avec un JSON valide, sans texte avant ou apr\u00E8s. Format exact:\n{\n  \"questions\": [\n    {\n      \"question\": \"Question ici?\",\n      \"options\": [\"Option A\", \"Option B\", \"Option C\", \"Option D\"],\n      \"correctAnswer\": \"Option A\",\n      \"explanation\": \"Explication courte ici.\"\n    }\n  ]\n}\n\nR\u00E8gles:\n- 5 questions obligatoires\n- 4 options par question\n- Niveau adapt\u00E9 \u00E0 la Terminale ").concat(seriesLabel, "\n- Questions vari\u00E9es couvrant diff\u00E9rents aspects du cours\n- R\u00E9ponses claires et univoques");
                return [4 /*yield*/, integrations_openai_ai_server_1.openai.chat.completions.create({
                        model: "gpt-5.2",
                        max_completion_tokens: 2000,
                        messages: [
                            { role: "system", content: "Tu génères des quiz éducatifs. Réponds uniquement en JSON valide." },
                            { role: "user", content: prompt_1 },
                        ],
                    })];
            case 2:
                completion = _d.sent();
                rawContent = ((_c = (_b = completion.choices[0]) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.content) || "";
                jsonMatch = rawContent.match(/\{[\s\S]*\}/);
                if (!jsonMatch) {
                    res.status(500).json({ error: "Failed to parse quiz response" });
                    return [2 /*return*/];
                }
                quizData = JSON.parse(jsonMatch[0]);
                res.json({
                    lessonTitle: lesson.title,
                    questions: quizData.questions || [],
                });
                return [3 /*break*/, 4];
            case 3:
                err_3 = _d.sent();
                req.log.error({ err: err_3 }, "QuizGenerate error");
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post("/quiz-complete", auth_js_1.authMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var correctAnswers, pts, user, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                correctAnswers = req.body.correctAnswers;
                pts = Math.max(0, parseInt(correctAnswers) || 0) * 10;
                if (!(pts > 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, db_1.db.select().from(db_2.usersTable).where((0, drizzle_orm_1.eq)(db_2.usersTable.id, req.userId)).limit(1)];
            case 1:
                user = (_a.sent())[0];
                if (!user) return [3 /*break*/, 3];
                return [4 /*yield*/, db_1.db.update(db_2.usersTable).set({ points: user.points + pts }).where((0, drizzle_orm_1.eq)(db_2.usersTable.id, req.userId))];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                res.json({ pointsEarned: pts, message: pts > 0 ? "+".concat(pts, " points gagn\u00E9s !") : "Aucun point gagné." });
                return [3 /*break*/, 5];
            case 4:
                err_4 = _a.sent();
                req.log.error({ err: err_4 }, "QuizComplete error");
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
