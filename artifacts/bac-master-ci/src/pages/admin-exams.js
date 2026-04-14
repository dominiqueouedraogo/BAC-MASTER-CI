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
exports.default = AdminExams;
var react_1 = require("react");
var wouter_1 = require("wouter");
var main_layout_1 = require("@/components/layout/main-layout");
var use_auth_1 = require("@/hooks/use-auth");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var skeleton_1 = require("@/components/ui/skeleton");
var use_toast_1 = require("@/hooks/use-toast");
var lucide_react_1 = require("lucide-react");
var react_query_1 = require("@tanstack/react-query");
function fetchAdminExams() {
    return __awaiter(this, void 0, void 0, function () {
        var token, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = localStorage.getItem("bac_token") || "";
                    return [4 /*yield*/, fetch("/api/admin/exams", { headers: { Authorization: "Bearer ".concat(token) } })];
                case 1:
                    res = _a.sent();
                    if (!res.ok)
                        throw new Error("Failed to load exams");
                    return [2 /*return*/, res.json()];
            }
        });
    });
}
function deleteExam(id) {
    return __awaiter(this, void 0, void 0, function () {
        var token, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = localStorage.getItem("bac_token") || "";
                    return [4 /*yield*/, fetch("/api/exams/".concat(id), {
                            method: "DELETE",
                            headers: { Authorization: "Bearer ".concat(token) },
                        })];
                case 1:
                    res = _a.sent();
                    if (!res.ok)
                        throw new Error("Failed to delete exam");
                    return [2 /*return*/];
            }
        });
    });
}
function AdminExams() {
    var _a;
    var user = (0, use_auth_1.useAuth)().user;
    var toast = (0, use_toast_1.useToast)().toast;
    var queryClient = (0, react_query_1.useQueryClient)();
    var _b = (0, react_1.useState)(""), search = _b[0], setSearch = _b[1];
    if ((user === null || user === void 0 ? void 0 : user.role) !== "admin")
        return <wouter_1.Redirect to="/dashboard"/>;
    var _c = (0, react_query_1.useQuery)({
        queryKey: ["admin-exams"],
        queryFn: fetchAdminExams,
    }), exams = _c.data, isLoading = _c.isLoading;
    var deleteMutation = (0, react_query_1.useMutation)({
        mutationFn: deleteExam,
        onSuccess: function () {
            queryClient.invalidateQueries({ queryKey: ["admin-exams"] });
            toast({ title: "Annale supprimée avec succès." });
        },
        onError: function () {
            toast({ title: "Erreur lors de la suppression.", variant: "destructive" });
        },
    });
    var filtered = exams === null || exams === void 0 ? void 0 : exams.filter(function (e) {
        return e.title.toLowerCase().includes(search.toLowerCase()) ||
            (e.subjectName || "").toLowerCase().includes(search.toLowerCase());
    });
    var handleDelete = function (id, title) {
        if (!confirm("Supprimer l'annale \"".concat(title, "\" ?")))
            return;
        deleteMutation.mutate(id);
    };
    return (<main_layout_1.MainLayout>
      <div className="mb-6 flex items-center gap-3">
        <wouter_1.Link href="/admin">
          <button_1.Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
            <lucide_react_1.ChevronLeft className="w-4 h-4"/> Admin
          </button_1.Button>
        </wouter_1.Link>
        <div className="flex-1">
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <lucide_react_1.FileText className="w-6 h-6 text-purple-500"/> Gestion des Annales
          </h1>
          <p className="text-sm text-muted-foreground">Ajouter, modifier ou supprimer des annales du BAC.</p>
        </div>
        <wouter_1.Link href="/admin/add-exam">
          <button_1.Button className="gap-2 rounded-xl">
            <lucide_react_1.Plus className="w-4 h-4"/> Nouvelle annale
          </button_1.Button>
        </wouter_1.Link>
      </div>

      <card_1.Card className="rounded-3xl border-border shadow-sm">
        <card_1.CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <lucide_react_1.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
              <input_1.Input placeholder="Rechercher une annale..." className="pl-9 rounded-xl bg-muted/50 border-0" value={search} onChange={function (e) { return setSearch(e.target.value); }}/>
            </div>
            <span className="text-sm text-muted-foreground shrink-0">
              {(_a = filtered === null || filtered === void 0 ? void 0 : filtered.length) !== null && _a !== void 0 ? _a : 0} annales
            </span>
          </div>
        </card_1.CardHeader>
        <card_1.CardContent>
          {isLoading ? (<div className="space-y-3">
              {[1, 2, 3, 4, 5].map(function (i) { return <skeleton_1.Skeleton key={i} className="h-14 w-full rounded-xl"/>; })}
            </div>) : !(filtered === null || filtered === void 0 ? void 0 : filtered.length) ? (<div className="py-16 text-center">
              <lucide_react_1.FileText className="w-12 h-12 mx-auto text-muted-foreground opacity-40 mb-3"/>
              <p className="text-muted-foreground">Aucune annale trouvée.</p>
              <wouter_1.Link href="/admin/add-exam">
                <button_1.Button className="mt-4 rounded-xl gap-2"><lucide_react_1.Plus className="w-4 h-4"/> Ajouter une annale</button_1.Button>
              </wouter_1.Link>
            </div>) : (<div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-muted-foreground uppercase bg-muted/50">
                    <th className="text-left px-4 py-3 rounded-tl-xl">#</th>
                    <th className="text-left px-4 py-3">Titre</th>
                    <th className="text-left px-4 py-3">Matière</th>
                    <th className="text-left px-4 py-3">Série</th>
                    <th className="text-left px-4 py-3">Année</th>
                    <th className="text-left px-4 py-3">Statut</th>
                    <th className="text-right px-4 py-3 rounded-tr-xl">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {filtered.map(function (exam) { return (<tr key={exam.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{exam.id}</td>
                      <td className="px-4 py-3">
                        <span className="font-semibold text-foreground">{exam.title}</span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{exam.subjectName || "—"}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary">
                          {exam.series}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-foreground">{exam.year}</td>
                      <td className="px-4 py-3">
                        <span className={"px-2 py-0.5 rounded-full text-xs font-bold ".concat(exam.isPremium ? "bg-amber-500/10 text-amber-600" : "bg-emerald-500/10 text-emerald-600")}>
                          {exam.isPremium ? "Premium" : "Gratuit"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <wouter_1.Link href={"/admin/edit-exam/".concat(exam.id)}>
                            <button_1.Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                              <lucide_react_1.Pencil className="w-3.5 h-3.5"/>
                            </button_1.Button>
                          </wouter_1.Link>
                          <button_1.Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive" onClick={function () { return handleDelete(exam.id, exam.title); }} disabled={deleteMutation.isPending}>
                            <lucide_react_1.Trash2 className="w-3.5 h-3.5"/>
                          </button_1.Button>
                        </div>
                      </td>
                    </tr>); })}
                </tbody>
              </table>
            </div>)}
        </card_1.CardContent>
      </card_1.Card>
    </main_layout_1.MainLayout>);
}
