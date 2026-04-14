"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Exams;
var react_1 = require("react");
var wouter_1 = require("wouter");
var api_client_react_1 = require("@workspace/api-client-react");
var main_layout_1 = require("@/components/layout/main-layout");
var use_auth_1 = require("@/hooks/use-auth");
var card_1 = require("@/components/ui/card");
var skeleton_1 = require("@/components/ui/skeleton");
var lucide_react_1 = require("lucide-react");
var select_1 = require("@/components/ui/select");
var button_1 = require("@/components/ui/button");
function Exams() {
    var user = (0, use_auth_1.useAuth)().user;
    var _a = (0, react_1.useState)((user === null || user === void 0 ? void 0 : user.series) || "A"), series = _a[0], setSeries = _a[1];
    var _b = (0, react_1.useState)("all"), year = _b[0], setYear = _b[1];
    var queryParams = { series: series };
    if (year !== "all")
        queryParams.year = parseInt(year);
    var _c = (0, api_client_react_1.useGetExams)(queryParams), exams = _c.data, isLoading = _c.isLoading;
    return (<main_layout_1.MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Annales du BAC</h1>
        <p className="text-muted-foreground mt-1">Anciens sujets de Côte d'Ivoire avec corrections détaillées.</p>
      </div>

      <div className="bg-card border border-border p-4 rounded-2xl shadow-sm mb-8 flex gap-4 max-w-xl">
        <div className="flex-1">
          <label className="text-xs font-semibold text-muted-foreground mb-1 block uppercase">Série</label>
          <select_1.Select value={series} onValueChange={function (v) { return setSeries(v); }}>
            <select_1.SelectTrigger className="bg-background rounded-xl">
              <select_1.SelectValue />
            </select_1.SelectTrigger>
            <select_1.SelectContent>
              <select_1.SelectItem value="A">Série A</select_1.SelectItem>
              <select_1.SelectItem value="C">Série C</select_1.SelectItem>
              <select_1.SelectItem value="D">Série D</select_1.SelectItem>
            </select_1.SelectContent>
          </select_1.Select>
        </div>
        <div className="flex-1">
          <label className="text-xs font-semibold text-muted-foreground mb-1 block uppercase">Année</label>
          <select_1.Select value={year} onValueChange={setYear}>
            <select_1.SelectTrigger className="bg-background rounded-xl">
              <select_1.SelectValue placeholder="Toutes les années"/>
            </select_1.SelectTrigger>
            <select_1.SelectContent>
              <select_1.SelectItem value="all">Toutes</select_1.SelectItem>
              <select_1.SelectItem value="2024">2024</select_1.SelectItem>
              <select_1.SelectItem value="2023">2023</select_1.SelectItem>
              <select_1.SelectItem value="2022">2022</select_1.SelectItem>
              <select_1.SelectItem value="2021">2021</select_1.SelectItem>
              <select_1.SelectItem value="2020">2020</select_1.SelectItem>
            </select_1.SelectContent>
          </select_1.Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (Array.from({ length: 6 }).map(function (_, i) { return <skeleton_1.Skeleton key={i} className="h-48 rounded-2xl"/>; })) : (exams === null || exams === void 0 ? void 0 : exams.length) === 0 ? (<div className="col-span-full py-20 text-center border border-dashed rounded-3xl">
            <lucide_react_1.FileText className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4"/>
            <p className="text-lg text-muted-foreground">Aucune annale trouvée pour ces critères.</p>
          </div>) : (exams === null || exams === void 0 ? void 0 : exams.map(function (exam) { return (<card_1.Card key={exam.id} className="rounded-3xl border-border shadow-sm overflow-hidden flex flex-col group">
              <div className="bg-muted/50 p-6 border-b border-border flex items-start justify-between">
                <div>
                  <div className="text-4xl font-display font-black text-primary/20 absolute -top-2 -right-4 -z-10 select-none pointer-events-none group-hover:scale-110 transition-transform">
                    {exam.year}
                  </div>
                  <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">BAC {exam.year}</span>
                  <h3 className="font-bold text-xl text-foreground">{exam.subjectName}</h3>
                </div>
                {exam.isPremium && !(user === null || user === void 0 ? void 0 : user.isPremium) && (<lucide_react_1.Lock className="w-5 h-5 text-amber-500 shrink-0"/>)}
              </div>
              <card_1.CardContent className="p-6 flex-1 flex flex-col bg-card">
                <p className="font-medium text-foreground mb-6 line-clamp-2">{exam.title}</p>
                <div className="mt-auto flex flex-col gap-2">
                  <wouter_1.Link href={"/exams/".concat(exam.id)}>
                    <button_1.Button className="w-full rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                      Voir le sujet & correction
                    </button_1.Button>
                  </wouter_1.Link>
                  {exam.pdfUrl && (<a href={exam.pdfUrl} target="_blank" rel="noopener noreferrer">
                      <button_1.Button variant="outline" className="w-full rounded-xl gap-2 text-muted-foreground hover:text-foreground" disabled={exam.isPremium && !(user === null || user === void 0 ? void 0 : user.isPremium)}>
                        <lucide_react_1.FileDown className="w-4 h-4"/> Télécharger PDF
                      </button_1.Button>
                    </a>)}
                </div>
              </card_1.CardContent>
            </card_1.Card>); }))}
      </div>
    </main_layout_1.MainLayout>);
}
