"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Exercises;
var react_1 = require("react");
var wouter_1 = require("wouter");
var api_client_react_1 = require("@workspace/api-client-react");
var main_layout_1 = require("@/components/layout/main-layout");
var use_auth_1 = require("@/hooks/use-auth");
var card_1 = require("@/components/ui/card");
var skeleton_1 = require("@/components/ui/skeleton");
var select_1 = require("@/components/ui/select");
var lucide_react_1 = require("lucide-react");
var utils_1 = require("@/lib/utils");
function Exercises() {
    var _a;
    var user = (0, use_auth_1.useAuth)().user;
    var search = (0, wouter_1.useSearch)();
    var params = new URLSearchParams(search);
    var urlSubject = params.get("subject") || "all";
    var _b = (0, react_1.useState)((user === null || user === void 0 ? void 0 : user.series) || "A"), series = _b[0], setSeries = _b[1];
    var _c = (0, react_1.useState)(urlSubject), subjectId = _c[0], setSubjectId = _c[1];
    var _d = (0, react_1.useState)("all"), difficulty = _d[0], setDifficulty = _d[1];
    (0, react_1.useEffect)(function () {
        var p = new URLSearchParams(search);
        var s = p.get("subject") || "all";
        setSubjectId(s);
    }, [search]);
    var subjects = (0, api_client_react_1.useGetSubjects)({ series: series }).data;
    var queryParams = { series: series };
    if (subjectId !== "all")
        queryParams.subjectId = parseInt(subjectId);
    if (difficulty !== "all")
        queryParams.difficulty = difficulty;
    var _e = (0, api_client_react_1.useGetExercises)(queryParams), exercises = _e.data, isLoading = _e.isLoading;
    var activeSubjectName = subjectId !== "all"
        ? (_a = subjects === null || subjects === void 0 ? void 0 : subjects.find(function (s) { return s.id.toString() === subjectId; })) === null || _a === void 0 ? void 0 : _a.name
        : null;
    return (<main_layout_1.MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Exercices & Quiz</h1>
        <p className="text-muted-foreground mt-1">
          {activeSubjectName
            ? "Exercices de ".concat(activeSubjectName, " \u2014 entra\u00EEnez-vous avec des QCM et questions types.")
            : "Entraînez-vous avec des centaines de QCM et sujets types."}
        </p>
      </div>

      <div className="bg-card border border-border p-4 rounded-2xl shadow-sm mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="text-xs font-semibold text-muted-foreground mb-1 block uppercase tracking-wider">Série</label>
          <select_1.Select value={series} onValueChange={function (v) { return setSeries(v); }}>
            <select_1.SelectTrigger className="bg-background rounded-xl h-12">
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
          <label className="text-xs font-semibold text-muted-foreground mb-1 block uppercase tracking-wider">Matière</label>
          <select_1.Select value={subjectId} onValueChange={setSubjectId}>
            <select_1.SelectTrigger className="bg-background rounded-xl h-12">
              <select_1.SelectValue placeholder="Toutes les matières"/>
            </select_1.SelectTrigger>
            <select_1.SelectContent>
              <select_1.SelectItem value="all">Toutes les matières</select_1.SelectItem>
              {subjects === null || subjects === void 0 ? void 0 : subjects.map(function (s) { return (<select_1.SelectItem key={s.id} value={s.id.toString()}>{s.name}</select_1.SelectItem>); })}
            </select_1.SelectContent>
          </select_1.Select>
        </div>
        <div className="flex-1">
          <label className="text-xs font-semibold text-muted-foreground mb-1 block uppercase tracking-wider">Difficulté</label>
          <select_1.Select value={difficulty} onValueChange={setDifficulty}>
            <select_1.SelectTrigger className="bg-background rounded-xl h-12">
              <select_1.SelectValue placeholder="Toutes les difficultés"/>
            </select_1.SelectTrigger>
            <select_1.SelectContent>
              <select_1.SelectItem value="all">Toutes</select_1.SelectItem>
              <select_1.SelectItem value="easy">Facile</select_1.SelectItem>
              <select_1.SelectItem value="medium">Moyen</select_1.SelectItem>
              <select_1.SelectItem value="hard">Difficile</select_1.SelectItem>
            </select_1.SelectContent>
          </select_1.Select>
        </div>
      </div>

      {activeSubjectName && (<div className="mb-4 flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filtré pour :</span>
          <span className="text-sm font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">{activeSubjectName}</span>
          <button onClick={function () { return setSubjectId("all"); }} className="text-xs text-muted-foreground underline hover:text-foreground ml-1">
            Effacer le filtre
          </button>
        </div>)}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (Array.from({ length: 6 }).map(function (_, i) { return <skeleton_1.Skeleton key={i} className="h-48 rounded-2xl"/>; })) : (exercises === null || exercises === void 0 ? void 0 : exercises.length) === 0 ? (<div className="col-span-full py-20 text-center">
            <lucide_react_1.BrainCircuit className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4"/>
            <p className="text-lg text-muted-foreground">Aucun exercice ne correspond à vos critères.</p>
          </div>) : (exercises === null || exercises === void 0 ? void 0 : exercises.map(function (exercise) {
            var subject = subjects === null || subjects === void 0 ? void 0 : subjects.find(function (s) { return s.id === exercise.subjectId; });
            return (<card_1.Card key={exercise.id} className="rounded-2xl border-border shadow-sm hover:shadow-md transition-shadow flex flex-col h-full overflow-hidden relative">
                {exercise.isPremium && !(user === null || user === void 0 ? void 0 : user.isPremium) && (<div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10 flex items-center gap-1 shadow-sm">
                    <lucide_react_1.Lock className="w-3 h-3"/> PREMIUM
                  </div>)}
                <card_1.CardContent className="p-6 flex flex-col h-full pt-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{(subject === null || subject === void 0 ? void 0 : subject.name) || 'Matière'}</span>
                    <span className={"text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wider ".concat((0, utils_1.getDifficultyColor)(exercise.difficulty))}>
                      {exercise.difficulty === 'easy' ? 'Facile' : exercise.difficulty === 'medium' ? 'Moyen' : 'Difficile'}
                    </span>
                  </div>

                  <h3 className="font-bold text-foreground text-lg mb-6 line-clamp-3 leading-snug flex-1">
                    {exercise.question}
                  </h3>

                  <wouter_1.Link href={"/exercises/".concat(exercise.id)}>
                    <button className={"w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ".concat(exercise.isPremium && !(user === null || user === void 0 ? void 0 : user.isPremium)
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground")}>
                      Commencer l'exercice <lucide_react_1.ChevronRight className="w-4 h-4"/>
                    </button>
                  </wouter_1.Link>
                </card_1.CardContent>
              </card_1.Card>);
        }))}
      </div>
    </main_layout_1.MainLayout>);
}
