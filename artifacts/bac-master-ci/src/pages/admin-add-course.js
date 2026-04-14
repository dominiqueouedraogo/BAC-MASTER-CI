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
exports.default = AdminAddCourse;
var react_1 = require("react");
var wouter_1 = require("wouter");
var main_layout_1 = require("@/components/layout/main-layout");
var use_auth_1 = require("@/hooks/use-auth");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var textarea_1 = require("@/components/ui/textarea");
var label_1 = require("@/components/ui/label");
var use_toast_1 = require("@/hooks/use-toast");
var lucide_react_1 = require("lucide-react");
var react_query_1 = require("@tanstack/react-query");
var SERIES_OPTIONS = ["ALL", "A", "C", "D"];
function fetchSubjects() {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/api/admin/subjects")];
                case 1:
                    res = _a.sent();
                    if (!res.ok)
                        throw new Error("Failed to load subjects");
                    return [2 /*return*/, res.json()];
            }
        });
    });
}
function fetchLesson(id) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/api/lessons/".concat(id))];
                case 1:
                    res = _a.sent();
                    if (!res.ok)
                        throw new Error("Not found");
                    return [2 /*return*/, res.json()];
            }
        });
    });
}
function AdminAddCourse() {
    var _this = this;
    var user = (0, use_auth_1.useAuth)().user;
    var id = (0, wouter_1.useParams)().id;
    var lessonId = id ? parseInt(id) : null;
    var isEdit = !!lessonId;
    var toast = (0, use_toast_1.useToast)().toast;
    var _a = (0, react_1.useState)(false), saving = _a[0], setSaving = _a[1];
    var _b = (0, react_1.useState)({
        title: "", subjectId: "", series: "ALL", content: "", summary: "",
        keyPoints: "", examples: "", videoUrl: "", audioUrl: "", pdfUrl: "",
        isPremium: false, duration: "", order: "0",
    }), form = _b[0], setForm = _b[1];
    var _c = (0, react_1.useState)([]), exercises = _c[0], setExercises = _c[1];
    var subjects = (0, react_query_1.useQuery)({ queryKey: ["admin-subjects"], queryFn: fetchSubjects }).data;
    var lesson = (0, react_query_1.useQuery)({
        queryKey: ["lesson", lessonId],
        queryFn: function () { return fetchLesson(lessonId); },
        enabled: isEdit,
    }).data;
    (0, react_1.useEffect)(function () {
        if (lesson) {
            setForm({
                title: lesson.title || "",
                subjectId: String(lesson.subjectId || ""),
                series: lesson.series || "ALL",
                content: lesson.content || "",
                summary: lesson.summary || "",
                keyPoints: lesson.keyPoints || "",
                examples: lesson.examples || "",
                videoUrl: lesson.videoUrl || "",
                audioUrl: lesson.audioUrl || "",
                pdfUrl: lesson.pdfUrl || "",
                isPremium: lesson.isPremium || false,
                duration: String(lesson.duration || ""),
                order: String(lesson.order || "0"),
            });
        }
    }, [lesson]);
    if ((user === null || user === void 0 ? void 0 : user.role) !== "admin")
        return <wouter_1.Redirect to="/dashboard"/>;
    var setField = function (field, value) {
        return setForm(function (f) {
            var _a;
            return (__assign(__assign({}, f), (_a = {}, _a[field] = value, _a)));
        });
    };
    var addExercise = function () {
        return setExercises(function (e) { return __spreadArray(__spreadArray([], e, true), [{ question: "", correctAnswer: "", explanation: "", options: "", type: "mcq", difficulty: "medium" }], false); });
    };
    var updateExercise = function (i, field, value) {
        return setExercises(function (e) { return e.map(function (ex, idx) {
            var _a;
            return idx === i ? __assign(__assign({}, ex), (_a = {}, _a[field] = value, _a)) : ex;
        }); });
    };
    var removeExercise = function (i) {
        return setExercises(function (e) { return e.filter(function (_, idx) { return idx !== i; }); });
    };
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var body, url, method, res, savedLesson, _i, exercises_1, ex, options, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    if (!form.title || !form.subjectId || !form.content) {
                        toast({ title: "Titre, matière et contenu sont requis.", variant: "destructive" });
                        return [2 /*return*/];
                    }
                    setSaving(true);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 8, 9, 10]);
                    body = {
                        title: form.title,
                        subjectId: parseInt(form.subjectId),
                        series: form.series,
                        content: form.content,
                        summary: form.summary || null,
                        keyPoints: form.keyPoints || null,
                        examples: form.examples || null,
                        videoUrl: form.videoUrl || null,
                        audioUrl: form.audioUrl || null,
                        pdfUrl: form.pdfUrl || null,
                        isPremium: form.isPremium,
                        duration: form.duration ? parseInt(form.duration) : null,
                        order: parseInt(form.order) || 0,
                    };
                    url = isEdit ? "/api/lessons/".concat(lessonId) : "/api/lessons";
                    method = isEdit ? "PUT" : "POST";
                    return [4 /*yield*/, fetch(url, {
                            method: method,
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(body),
                        })];
                case 2:
                    res = _b.sent();
                    if (!res.ok)
                        throw new Error("Failed to save");
                    return [4 /*yield*/, res.json()];
                case 3:
                    savedLesson = _b.sent();
                    _i = 0, exercises_1 = exercises;
                    _b.label = 4;
                case 4:
                    if (!(_i < exercises_1.length)) return [3 /*break*/, 7];
                    ex = exercises_1[_i];
                    if (!ex.question || !ex.correctAnswer)
                        return [3 /*break*/, 6];
                    options = ex.options ? ex.options.split("\n").map(function (s) { return s.trim(); }).filter(Boolean) : [];
                    return [4 /*yield*/, fetch("/api/exercises", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                lessonId: savedLesson.id,
                                subjectId: parseInt(form.subjectId),
                                series: form.series,
                                question: ex.question,
                                type: ex.type,
                                difficulty: ex.difficulty,
                                options: options.length > 0 ? options : null,
                                correctAnswer: ex.correctAnswer,
                                explanation: ex.explanation,
                                isPremium: false,
                            }),
                        })];
                case 5:
                    _b.sent();
                    _b.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 4];
                case 7:
                    toast({ title: isEdit ? "Cours mis à jour !" : "Cours créé avec succès !" });
                    window.location.href = import.meta.env.BASE_URL + "admin/courses";
                    return [3 /*break*/, 10];
                case 8:
                    _a = _b.sent();
                    toast({ title: "Erreur lors de l'enregistrement.", variant: "destructive" });
                    return [3 /*break*/, 10];
                case 9:
                    setSaving(false);
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    }); };
    return (<main_layout_1.MainLayout>
      <div className="mb-6 flex items-center gap-3">
        <wouter_1.Link href="/admin/courses">
          <button_1.Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
            <lucide_react_1.ChevronLeft className="w-4 h-4"/> Cours
          </button_1.Button>
        </wouter_1.Link>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <lucide_react_1.BookOpen className="w-6 h-6 text-primary"/>
            {isEdit ? "Modifier le cours" : "Nouveau cours"}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        <card_1.Card className="rounded-3xl border-border shadow-sm">
          <card_1.CardHeader><card_1.CardTitle className="font-display text-lg">Informations générales</card_1.CardTitle></card_1.CardHeader>
          <card_1.CardContent className="space-y-4">
            <div>
              <label_1.Label htmlFor="title">Titre du cours *</label_1.Label>
              <input_1.Input id="title" value={form.title} onChange={function (e) { return setField("title", e.target.value); }} placeholder="Ex: Les Suites Numériques" className="mt-1 rounded-xl" required/>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label_1.Label htmlFor="subject">Matière *</label_1.Label>
                <select id="subject" value={form.subjectId} onChange={function (e) { return setField("subjectId", e.target.value); }} className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" required>
                  <option value="">Choisir une matière...</option>
                  {subjects === null || subjects === void 0 ? void 0 : subjects.map(function (s) { return (<option key={s.id} value={s.id}>{s.name} ({s.series})</option>); })}
                </select>
              </div>
              <div>
                <label_1.Label htmlFor="series">Série</label_1.Label>
                <select id="series" value={form.series} onChange={function (e) { return setField("series", e.target.value); }} className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                  {SERIES_OPTIONS.map(function (s) { return <option key={s} value={s}>{s}</option>; })}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label_1.Label htmlFor="duration">Durée (minutes)</label_1.Label>
                <input_1.Input id="duration" type="number" value={form.duration} onChange={function (e) { return setField("duration", e.target.value); }} placeholder="45" className="mt-1 rounded-xl"/>
              </div>
              <div>
                <label_1.Label htmlFor="order">Ordre d'affichage</label_1.Label>
                <input_1.Input id="order" type="number" value={form.order} onChange={function (e) { return setField("order", e.target.value); }} placeholder="0" className="mt-1 rounded-xl"/>
              </div>
            </div>

            <div>
              <label_1.Label htmlFor="summary">Résumé</label_1.Label>
              <textarea_1.Textarea id="summary" value={form.summary} onChange={function (e) { return setField("summary", e.target.value); }} placeholder="Courte description du cours..." className="mt-1 rounded-xl resize-none" rows={2}/>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <input type="checkbox" id="isPremium" checked={form.isPremium} onChange={function (e) { return setField("isPremium", e.target.checked); }} className="w-4 h-4 rounded"/>
              <label_1.Label htmlFor="isPremium" className="cursor-pointer">Contenu Premium (accès payant)</label_1.Label>
            </div>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card className="rounded-3xl border-border shadow-sm">
          <card_1.CardHeader><card_1.CardTitle className="font-display text-lg">Contenu pédagogique</card_1.CardTitle></card_1.CardHeader>
          <card_1.CardContent className="space-y-4">
            <div>
              <label_1.Label htmlFor="content">Explication détaillée * (HTML supporté)</label_1.Label>
              <textarea_1.Textarea id="content" value={form.content} onChange={function (e) { return setField("content", e.target.value); }} placeholder="<h2>Introduction</h2><p>Contenu du cours...</p>" className="mt-1 rounded-xl resize-y font-mono text-xs" rows={10} required/>
            </div>

            <div>
              <label_1.Label htmlFor="keyPoints">Notions clés (une notion par ligne)</label_1.Label>
              <textarea_1.Textarea id="keyPoints" value={form.keyPoints} onChange={function (e) { return setField("keyPoints", e.target.value); }} placeholder={"Définition de la suite arithmétique\nFormule du terme général\nSomme des termes"} className="mt-1 rounded-xl resize-none" rows={4}/>
              <p className="text-xs text-muted-foreground mt-1">Saisir une notion clé par ligne.</p>
            </div>

            <div>
              <label_1.Label htmlFor="examples">Exemples résolus (HTML supporté)</label_1.Label>
              <textarea_1.Textarea id="examples" value={form.examples} onChange={function (e) { return setField("examples", e.target.value); }} placeholder="<p><strong>Exemple 1 :</strong> Soit la suite...</p>" className="mt-1 rounded-xl resize-y font-mono text-xs" rows={6}/>
            </div>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card className="rounded-3xl border-border shadow-sm">
          <card_1.CardHeader><card_1.CardTitle className="font-display text-lg">Ressources multimédia</card_1.CardTitle></card_1.CardHeader>
          <card_1.CardContent className="space-y-4">
            <div>
              <label_1.Label htmlFor="videoUrl">Lien vidéo (YouTube embed URL)</label_1.Label>
              <input_1.Input id="videoUrl" value={form.videoUrl} onChange={function (e) { return setField("videoUrl", e.target.value); }} placeholder="https://www.youtube.com/embed/..." className="mt-1 rounded-xl"/>
            </div>
            <div>
              <label_1.Label htmlFor="audioUrl">Lien audio (podcast)</label_1.Label>
              <input_1.Input id="audioUrl" value={form.audioUrl} onChange={function (e) { return setField("audioUrl", e.target.value); }} placeholder="https://example.com/audio.mp3" className="mt-1 rounded-xl"/>
            </div>
            <div>
              <label_1.Label htmlFor="pdfUrl">Lien PDF</label_1.Label>
              <input_1.Input id="pdfUrl" value={form.pdfUrl} onChange={function (e) { return setField("pdfUrl", e.target.value); }} placeholder="https://example.com/cours.pdf" className="mt-1 rounded-xl"/>
            </div>
          </card_1.CardContent>
        </card_1.Card>

        {!isEdit && (<card_1.Card className="rounded-3xl border-border shadow-sm">
            <card_1.CardHeader className="flex flex-row items-center justify-between">
              <card_1.CardTitle className="font-display text-lg">Exercices</card_1.CardTitle>
              <button_1.Button type="button" variant="outline" size="sm" onClick={addExercise} className="gap-2 rounded-xl">
                <lucide_react_1.Plus className="w-4 h-4"/> Ajouter
              </button_1.Button>
            </card_1.CardHeader>
            <card_1.CardContent>
              {exercises.length === 0 ? (<div className="text-center py-6 text-sm text-muted-foreground">
                  <p>Aucun exercice ajouté. Les exercices peuvent aussi être créés depuis le menu Exercices.</p>
                  <button_1.Button type="button" variant="outline" size="sm" onClick={addExercise} className="mt-3 gap-2 rounded-xl">
                    <lucide_react_1.Plus className="w-4 h-4"/> Premier exercice
                  </button_1.Button>
                </div>) : (<div className="space-y-6">
                  {exercises.map(function (ex, i) { return (<div key={i} className="border border-border rounded-2xl p-4 space-y-3 bg-muted/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-foreground">Exercice {i + 1}</span>
                        <button_1.Button type="button" variant="ghost" size="sm" onClick={function () { return removeExercise(i); }} className="text-destructive hover:text-destructive gap-1">
                          <lucide_react_1.Trash2 className="w-4 h-4"/>
                        </button_1.Button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label_1.Label>Type</label_1.Label>
                          <select value={ex.type} onChange={function (e) { return updateExercise(i, "type", e.target.value); }} className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm">
                            <option value="mcq">QCM</option>
                            <option value="open">Question ouverte</option>
                            <option value="true_false">Vrai/Faux</option>
                          </select>
                        </div>
                        <div>
                          <label_1.Label>Difficulté</label_1.Label>
                          <select value={ex.difficulty} onChange={function (e) { return updateExercise(i, "difficulty", e.target.value); }} className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm">
                            <option value="easy">Facile (+10 pts)</option>
                            <option value="medium">Moyen (+20 pts)</option>
                            <option value="hard">Difficile (+30 pts)</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label_1.Label>Question *</label_1.Label>
                        <textarea_1.Textarea value={ex.question} onChange={function (e) { return updateExercise(i, "question", e.target.value); }} placeholder="Quelle est la valeur de u₅ ?" className="mt-1 rounded-xl resize-none" rows={2}/>
                      </div>
                      {ex.type === "mcq" && (<div>
                          <label_1.Label>Options (une par ligne)</label_1.Label>
                          <textarea_1.Textarea value={ex.options} onChange={function (e) { return updateExercise(i, "options", e.target.value); }} placeholder={"Option A\nOption B\nOption C\nOption D"} className="mt-1 rounded-xl resize-none font-mono text-xs" rows={4}/>
                        </div>)}
                      <div>
                        <label_1.Label>Bonne réponse *</label_1.Label>
                        <input_1.Input value={ex.correctAnswer} onChange={function (e) { return updateExercise(i, "correctAnswer", e.target.value); }} placeholder="Option A" className="mt-1 rounded-xl"/>
                      </div>
                      <div>
                        <label_1.Label>Explication</label_1.Label>
                        <textarea_1.Textarea value={ex.explanation} onChange={function (e) { return updateExercise(i, "explanation", e.target.value); }} placeholder="Car..." className="mt-1 rounded-xl resize-none" rows={2}/>
                      </div>
                    </div>); })}
                </div>)}
            </card_1.CardContent>
          </card_1.Card>)}

        <div className="flex gap-3 pb-8">
          <wouter_1.Link href="/admin/courses">
            <button_1.Button type="button" variant="outline" className="rounded-xl">Annuler</button_1.Button>
          </wouter_1.Link>
          <button_1.Button type="submit" disabled={saving} className="rounded-xl gap-2">
            {saving && <lucide_react_1.Loader2 className="w-4 h-4 animate-spin"/>}
            {isEdit ? "Enregistrer les modifications" : "Créer le cours"}
          </button_1.Button>
        </div>
      </form>
    </main_layout_1.MainLayout>);
}
