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
exports.default = ExamDetail;
var react_1 = require("react");
var wouter_1 = require("wouter");
var main_layout_1 = require("@/components/layout/main-layout");
var use_auth_1 = require("@/hooks/use-auth");
var button_1 = require("@/components/ui/button");
var skeleton_1 = require("@/components/ui/skeleton");
var use_toast_1 = require("@/hooks/use-toast");
var lucide_react_1 = require("lucide-react");
var react_query_1 = require("@tanstack/react-query");
var api_client_react_1 = require("@workspace/api-client-react");
var react_query_2 = require("@tanstack/react-query");
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
function ExamDetail() {
    var id = (0, wouter_1.useParams)().id;
    var examId = parseInt(id);
    var user = (0, use_auth_1.useAuth)().user;
    var toast = (0, use_toast_1.useToast)().toast;
    var queryClient = (0, react_query_2.useQueryClient)();
    var _a = (0, react_1.useState)("subject"), tab = _a[0], setTab = _a[1];
    var _b = (0, react_query_1.useQuery)({
        queryKey: ["exam", examId],
        queryFn: function () { return fetchExam(examId); },
    }), exam = _b.data, isLoading = _b.isLoading;
    var upgradeMutation = (0, api_client_react_1.useUpgradeToPremium)();
    var isLocked = (exam === null || exam === void 0 ? void 0 : exam.isPremium) && !(user === null || user === void 0 ? void 0 : user.isPremium);
    var handleUpgrade = function () {
        upgradeMutation.mutate(undefined, {
            onSuccess: function (updatedUser) {
                queryClient.setQueryData((0, api_client_react_1.getGetMeQueryKey)(), updatedUser);
                toast({ title: "Compte Premium activé !", description: "Vous avez maintenant accès à tout le contenu." });
            },
            onError: function () {
                toast({ title: "Erreur", description: "Impossible d'activer le Premium.", variant: "destructive" });
            },
        });
    };
    return (<main_layout_1.MainLayout>
      <div className="mb-6 flex items-center gap-3">
        <wouter_1.Link href="/exams">
          <button_1.Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
            <lucide_react_1.ChevronLeft className="w-4 h-4"/> Annales
          </button_1.Button>
        </wouter_1.Link>
      </div>

      {isLoading ? (<div className="space-y-4 max-w-4xl">
          <skeleton_1.Skeleton className="h-10 w-2/3 rounded-xl"/>
          <skeleton_1.Skeleton className="h-6 w-1/3 rounded-xl"/>
          <skeleton_1.Skeleton className="h-96 w-full rounded-2xl"/>
        </div>) : !exam ? (<div className="text-center py-20 text-muted-foreground">Annale introuvable.</div>) : isLocked ? (<div className="max-w-2xl mx-auto text-center py-20">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/20">
            <lucide_react_1.Lock className="w-10 h-10 text-white"/>
          </div>
          <h2 className="text-2xl font-display font-bold mb-3">Contenu Premium</h2>
          <p className="text-muted-foreground mb-8">
            Cette annale est réservée aux membres Premium. Passez Premium pour accéder au sujet et à la correction.
          </p>
          <button_1.Button size="lg" onClick={handleUpgrade} disabled={upgradeMutation.isPending} className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 border-0 shadow-lg shadow-orange-500/25 px-8 rounded-xl h-12">
            Passer Premium
          </button_1.Button>
        </div>) : (<div className="max-w-4xl">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider">BAC {exam.year}</span>
              <span className="text-xs font-bold bg-muted text-muted-foreground px-3 py-1 rounded-full">Série {exam.series}</span>
              {exam.isPremium && (<span className="text-xs font-bold bg-amber-500/10 text-amber-600 px-3 py-1 rounded-full">Premium</span>)}
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground">{exam.title}</h1>
            {exam.subjectName && <p className="text-muted-foreground mt-1">{exam.subjectName}</p>}
          </div>

          <div className="flex gap-2 mb-6 p-1 bg-muted/50 rounded-2xl w-fit">
            <button onClick={function () { return setTab("subject"); }} className={"flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ".concat(tab === "subject" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}>
              <lucide_react_1.BookOpen className="w-4 h-4"/> Sujet
            </button>
            <button onClick={function () { return setTab("correction"); }} className={"flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ".concat(tab === "correction" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}>
              <lucide_react_1.CheckCircle2 className="w-4 h-4"/> Correction
            </button>
          </div>

          <div className="bg-card border border-border rounded-3xl p-6 md:p-10 shadow-sm">
            {tab === "subject" ? (exam.content ? (<div className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: exam.content }}/>) : (<div className="text-center py-12 text-muted-foreground">
                  <lucide_react_1.BookOpen className="w-10 h-10 mx-auto opacity-30 mb-3"/>
                  <p>Le sujet n'a pas encore été ajouté.</p>
                </div>)) : (exam.correction ? (<div className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: exam.correction }}/>) : (<div className="text-center py-12 text-muted-foreground">
                  <lucide_react_1.CheckCircle2 className="w-10 h-10 mx-auto opacity-30 mb-3"/>
                  <p>La correction n'a pas encore été ajoutée.</p>
                </div>))}
          </div>

          {exam.pdfUrl && (<div className="mt-4">
              <a href={exam.pdfUrl} target="_blank" rel="noopener noreferrer">
                <button_1.Button variant="outline" className="gap-2 rounded-xl">
                  <lucide_react_1.FileDown className="w-4 h-4"/> Télécharger le PDF
                </button_1.Button>
              </a>
            </div>)}
        </div>)}
    </main_layout_1.MainLayout>);
}
