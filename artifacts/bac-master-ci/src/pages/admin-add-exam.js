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
exports.default = AdminAddExam;
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
var SERIES_OPTIONS = ["A", "C", "D"];
var YEARS = Array.from({ length: 15 }, function (_, i) { return String(new Date().getFullYear() - i); });
function fetchSubjects() {
    return __awaiter(this, void 0, void 0, function () {
        var token, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = localStorage.getItem("bac_token") || "";
                    return [4 /*yield*/, fetch("/api/admin/subjects", { headers: { Authorization: "Bearer ".concat(token) } })];
                case 1:
                    res = _a.sent();
                    if (!res.ok)
                        throw new Error("Failed to load subjects");
                    return [2 /*return*/, res.json()];
            }
        });
    });
}
function fetchExam(id) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/api/exams/".concat(id))];
                case 1:
                    res = _a.sent();
                    if (!res.ok)
                        throw new Error("Not found");
                    return [2 /*return*/, res.json()];
            }
        });
    });
}
function AdminAddExam() {
    var _this = this;
    var user = (0, use_auth_1.useAuth)().user;
    var id = (0, wouter_1.useParams)().id;
    var examId = id ? parseInt(id) : null;
    var isEdit = !!examId;
    var toast = (0, use_toast_1.useToast)().toast;
    var _a = (0, react_1.useState)(false), saving = _a[0], setSaving = _a[1];
    var _b = (0, react_1.useState)({
        title: "",
        subjectId: "",
        series: "A",
        year: String(new Date().getFullYear()),
        content: "",
        correction: "",
        pdfUrl: "",
        isPremium: false,
    }), form = _b[0], setForm = _b[1];
    var subjects = (0, react_query_1.useQuery)({ queryKey: ["admin-subjects"], queryFn: fetchSubjects }).data;
    var exam = (0, react_query_1.useQuery)({
        queryKey: ["exam", examId],
        queryFn: function () { return fetchExam(examId); },
        enabled: isEdit,
    }).data;
    (0, react_1.useEffect)(function () {
        if (exam) {
            setForm({
                title: exam.title || "",
                subjectId: String(exam.subjectId || ""),
                series: exam.series || "A",
                year: String(exam.year || new Date().getFullYear()),
                content: exam.content || "",
                correction: exam.correction || "",
                pdfUrl: exam.pdfUrl || "",
                isPremium: exam.isPremium || false,
            });
        }
    }, [exam]);
    if ((user === null || user === void 0 ? void 0 : user.role) !== "admin")
        return <wouter_1.Redirect to="/dashboard"/>;
    var setField = function (field, value) {
        return setForm(function (f) {
            var _a;
            return (__assign(__assign({}, f), (_a = {}, _a[field] = value, _a)));
        });
    };
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var token, body, url, method, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    if (!form.title || !form.subjectId) {
                        toast({ title: "Titre et matière sont requis.", variant: "destructive" });
                        return [2 /*return*/];
                    }
                    setSaving(true);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, 4, 5]);
                    token = localStorage.getItem("bac_token") || "";
                    body = {
                        title: form.title,
                        subjectId: parseInt(form.subjectId),
                        series: form.series,
                        year: parseInt(form.year),
                        content: form.content || null,
                        correction: form.correction || null,
                        pdfUrl: form.pdfUrl || null,
                        isPremium: form.isPremium,
                    };
                    url = isEdit ? "/api/exams/".concat(examId) : "/api/exams";
                    method = isEdit ? "PUT" : "POST";
                    return [4 /*yield*/, fetch(url, {
                            method: method,
                            headers: { "Content-Type": "application/json", Authorization: "Bearer ".concat(token) },
                            body: JSON.stringify(body),
                        })];
                case 2:
                    res = _b.sent();
                    if (!res.ok)
                        throw new Error("Failed to save");
                    toast({ title: isEdit ? "Annale mise à jour !" : "Annale créée avec succès !" });
                    window.location.href = import.meta.env.BASE_URL + "admin/exams";
                    return [3 /*break*/, 5];
                case 3:
                    _a = _b.sent();
                    toast({ title: "Erreur lors de l'enregistrement.", variant: "destructive" });
                    return [3 /*break*/, 5];
                case 4:
                    setSaving(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (<main_layout_1.MainLayout>
      <div className="mb-6 flex items-center gap-3">
        <wouter_1.Link href="/admin/exams">
          <button_1.Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
            <lucide_react_1.ChevronLeft className="w-4 h-4"/> Annales
          </button_1.Button>
        </wouter_1.Link>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <lucide_react_1.FileText className="w-6 h-6 text-purple-500"/>
            {isEdit ? "Modifier l'annale" : "Nouvelle annale"}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        <card_1.Card className="rounded-3xl border-border shadow-sm">
          <card_1.CardHeader><card_1.CardTitle className="font-display text-lg">Informations générales</card_1.CardTitle></card_1.CardHeader>
          <card_1.CardContent className="space-y-4">
            <div>
              <label_1.Label htmlFor="title">Titre de l'annale *</label_1.Label>
              <input_1.Input id="title" value={form.title} onChange={function (e) { return setField("title", e.target.value); }} placeholder="Ex: Mathématiques BAC 2023 - Série C" className="mt-1 rounded-xl" required/>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label_1.Label htmlFor="subject">Matière *</label_1.Label>
                <select id="subject" value={form.subjectId} onChange={function (e) { return setField("subjectId", e.target.value); }} className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" required>
                  <option value="">Choisir...</option>
                  {subjects === null || subjects === void 0 ? void 0 : subjects.map(function (s) { return (<option key={s.id} value={s.id}>{s.name} ({s.series})</option>); })}
                </select>
              </div>
              <div>
                <label_1.Label htmlFor="series">Série</label_1.Label>
                <select id="series" value={form.series} onChange={function (e) { return setField("series", e.target.value); }} className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                  {SERIES_OPTIONS.map(function (s) { return <option key={s} value={s}>{s}</option>; })}
                </select>
              </div>
              <div>
                <label_1.Label htmlFor="year">Année</label_1.Label>
                <select id="year" value={form.year} onChange={function (e) { return setField("year", e.target.value); }} className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                  {YEARS.map(function (y) { return <option key={y} value={y}>{y}</option>; })}
                </select>
              </div>
            </div>

            <div>
              <label_1.Label htmlFor="pdfUrl">Lien PDF (optionnel)</label_1.Label>
              <input_1.Input id="pdfUrl" value={form.pdfUrl} onChange={function (e) { return setField("pdfUrl", e.target.value); }} placeholder="https://example.com/annale.pdf" className="mt-1 rounded-xl"/>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <input type="checkbox" id="isPremium" checked={form.isPremium} onChange={function (e) { return setField("isPremium", e.target.checked); }} className="w-4 h-4 rounded"/>
              <label_1.Label htmlFor="isPremium" className="cursor-pointer">Contenu Premium (accès payant)</label_1.Label>
            </div>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card className="rounded-3xl border-border shadow-sm">
          <card_1.CardHeader><card_1.CardTitle className="font-display text-lg">Sujet</card_1.CardTitle></card_1.CardHeader>
          <card_1.CardContent>
            <div>
              <label_1.Label htmlFor="content">Contenu du sujet (HTML supporté)</label_1.Label>
              <textarea_1.Textarea id="content" value={form.content} onChange={function (e) { return setField("content", e.target.value); }} placeholder="<h2>Partie I</h2><p>Soit f la fonction définie par...</p>" className="mt-1 rounded-xl resize-y font-mono text-xs" rows={10}/>
            </div>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card className="rounded-3xl border-border shadow-sm">
          <card_1.CardHeader><card_1.CardTitle className="font-display text-lg">Correction</card_1.CardTitle></card_1.CardHeader>
          <card_1.CardContent>
            <div>
              <label_1.Label htmlFor="correction">Correction détaillée (HTML supporté)</label_1.Label>
              <textarea_1.Textarea id="correction" value={form.correction} onChange={function (e) { return setField("correction", e.target.value); }} placeholder="<h2>Correction Partie I</h2><p>On a f(x) = ...</p>" className="mt-1 rounded-xl resize-y font-mono text-xs" rows={10}/>
            </div>
          </card_1.CardContent>
        </card_1.Card>

        <div className="flex gap-3 pb-8">
          <wouter_1.Link href="/admin/exams">
            <button_1.Button type="button" variant="outline" className="rounded-xl">Annuler</button_1.Button>
          </wouter_1.Link>
          <button_1.Button type="submit" disabled={saving} className="rounded-xl gap-2">
            {saving && <lucide_react_1.Loader2 className="w-4 h-4 animate-spin"/>}
            {isEdit ? "Enregistrer les modifications" : "Créer l'annale"}
          </button_1.Button>
        </div>
      </form>
    </main_layout_1.MainLayout>);
}
