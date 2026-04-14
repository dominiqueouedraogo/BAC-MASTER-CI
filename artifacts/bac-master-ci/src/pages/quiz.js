"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Quiz;
var react_1 = require("react");
var wouter_1 = require("wouter");
var api_client_react_1 = require("@workspace/api-client-react");
var main_layout_1 = require("@/components/layout/main-layout");
var premium_lock_1 = require("@/components/ui/premium-lock");
var use_auth_1 = require("@/hooks/use-auth");
var button_1 = require("@/components/ui/button");
var skeleton_1 = require("@/components/ui/skeleton");
var lucide_react_1 = require("lucide-react");
var textarea_1 = require("@/components/ui/textarea");
var utils_1 = require("@/lib/utils");
var react_confetti_1 = require("react-confetti");
var react_use_1 = require("react-use");
function Quiz() {
    var id = (0, wouter_1.useParams)().id;
    var exerciseId = parseInt(id || "0");
    var user = (0, use_auth_1.useAuth)().user;
    var _a = (0, react_use_1.useWindowSize)(), width = _a.width, height = _a.height;
    var _b = (0, api_client_react_1.useGetExercise)(exerciseId), exercise = _b.data, isLoading = _b.isLoading;
    var submitMutation = (0, api_client_react_1.useSubmitExercise)();
    var _c = (0, react_1.useState)(""), selectedOption = _c[0], setSelectedOption = _c[1];
    var _d = (0, react_1.useState)(""), openAnswer = _d[0], setOpenAnswer = _d[1];
    if (isLoading) {
        return <main_layout_1.MainLayout><skeleton_1.Skeleton className="w-full h-96 rounded-3xl"/></main_layout_1.MainLayout>;
    }
    if (!exercise)
        return <main_layout_1.MainLayout><div className="p-8 text-center">Exercice introuvable</div></main_layout_1.MainLayout>;
    if (exercise.isPremium && !(user === null || user === void 0 ? void 0 : user.isPremium)) {
        return <main_layout_1.MainLayout><premium_lock_1.PremiumLock title="Exercice Premium"/></main_layout_1.MainLayout>;
    }
    var handleSubmit = function () {
        var answer = exercise.type === 'open' ? openAnswer : selectedOption;
        if (!answer)
            return;
        submitMutation.mutate({ id: exerciseId, data: { answer: answer } });
    };
    var result = submitMutation.data;
    var showConfetti = result === null || result === void 0 ? void 0 : result.correct;
    return (<main_layout_1.MainLayout>
      {showConfetti && <react_confetti_1.default width={width} height={height} recycle={false} numberOfPieces={500}/>}
      
      <wouter_1.Link href="/exercises" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6">
        <lucide_react_1.ChevronLeft className="w-4 h-4 mr-1"/> Retour aux exercices
      </wouter_1.Link>

      <div className="max-w-3xl mx-auto">
        <div className="bg-card border border-border shadow-sm rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="bg-secondary/5 border-b border-border p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={"text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ".concat((0, utils_1.getDifficultyColor)(exercise.difficulty))}>
                {exercise.difficulty === 'easy' ? 'Facile' : exercise.difficulty === 'medium' ? 'Moyen' : 'Difficile'}
              </span>
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider border-l border-border pl-3">Série {exercise.series}</span>
            </div>
          </div>

          {/* Question Body */}
          <div className="p-6 md:p-10">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-8 leading-relaxed">
              {exercise.question}
            </h2>

            {!result ? (<div className="space-y-4">
                {(exercise.type === 'mcq' || exercise.type === 'true_false') && exercise.options && (<div className="grid gap-3">
                    {exercise.options.map(function (opt, i) { return (<button key={i} onClick={function () { return setSelectedOption(opt); }} className={"w-full text-left p-4 rounded-xl border-2 transition-all font-medium text-lg ".concat(selectedOption === opt
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border hover:border-primary/30 hover:bg-muted/50')}>
                        {opt}
                      </button>); })}
                  </div>)}

                {exercise.type === 'open' && (<textarea_1.Textarea placeholder="Saisissez votre réponse détaillée ici..." className="min-h-[150px] text-lg p-4 rounded-xl bg-background" value={openAnswer} onChange={function (e) { return setOpenAnswer(e.target.value); }}/>)}

                <div className="pt-8">
                  <button_1.Button size="lg" className="w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90" disabled={(!selectedOption && !openAnswer) || submitMutation.isPending} onClick={handleSubmit}>
                    {submitMutation.isPending ? "Vérification..." : "Valider ma réponse"}
                  </button_1.Button>
                </div>
              </div>) : (<div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className={"p-6 rounded-2xl border-2 mb-6 ".concat(result.correct ? 'bg-success/10 border-success/30' : 'bg-destructive/10 border-destructive/30')}>
                  <div className="flex items-center gap-4 mb-4">
                    {result.correct ? (<div className="w-12 h-12 rounded-full bg-success text-white flex items-center justify-center shrink-0 shadow-lg shadow-success/20">
                        <lucide_react_1.CheckCircle2 className="w-6 h-6"/>
                      </div>) : (<div className="w-12 h-12 rounded-full bg-destructive text-white flex items-center justify-center shrink-0 shadow-lg shadow-destructive/20">
                        <lucide_react_1.XCircle className="w-6 h-6"/>
                      </div>)}
                    <div>
                      <h3 className={"text-xl font-bold ".concat(result.correct ? 'text-success' : 'text-destructive')}>
                        {result.correct ? 'Bonne réponse !' : 'Réponse incorrecte'}
                      </h3>
                      {result.pointsEarned > 0 && (<p className="text-amber-600 font-bold flex items-center text-sm mt-1">
                          <lucide_react_1.Trophy className="w-4 h-4 mr-1"/> +{result.pointsEarned} points
                        </p>)}
                    </div>
                  </div>
                  
                  {!result.correct && (<div className="mt-4 pt-4 border-t border-destructive/20">
                      <p className="text-sm font-semibold text-destructive mb-1">La bonne réponse était :</p>
                      <p className="font-medium">{result.correctAnswer}</p>
                    </div>)}
                </div>

                <div className="bg-muted/50 border border-border p-6 rounded-2xl mb-8">
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    Explication détaillée
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {result.explanation}
                  </p>
                </div>

                <div className="flex justify-center">
                  <wouter_1.Link href="/exercises">
                    <button_1.Button size="lg" variant="outline" className="rounded-xl h-14 px-8 border-2">
                      Passer à un autre exercice
                    </button_1.Button>
                  </wouter_1.Link>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </main_layout_1.MainLayout>);
}
