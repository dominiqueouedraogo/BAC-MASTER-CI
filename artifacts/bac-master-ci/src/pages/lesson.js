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
exports.default = LessonDetail;
var wouter_1 = require("wouter");
var api_client_react_1 = require("@workspace/api-client-react");
var main_layout_1 = require("@/components/layout/main-layout");
var premium_lock_1 = require("@/components/ui/premium-lock");
var use_auth_1 = require("@/hooks/use-auth");
var skeleton_1 = require("@/components/ui/skeleton");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var progress_1 = require("@/components/ui/progress");
var react_1 = require("react");
var textarea_1 = require("@/components/ui/textarea");
var use_toast_1 = require("@/hooks/use-toast");
function LessonDetail() {
    var _this = this;
    var id = (0, wouter_1.useParams)().id;
    var lessonId = parseInt(id || "0");
    var user = (0, use_auth_1.useAuth)().user;
    var toast = (0, use_toast_1.useToast)().toast;
    var _a = (0, api_client_react_1.useGetLesson)(lessonId), lesson = _a.data, isLoading = _a.isLoading;
    var markComplete = (0, api_client_react_1.useMarkLessonComplete)();
    var reviews = (0, api_client_react_1.useGetReviews)({ lessonId: lessonId }).data;
    var exercises = (0, api_client_react_1.useGetExercises)({ lessonId: lessonId }).data;
    var submitReview = (0, api_client_react_1.useCreateReview)();
    var _b = (0, react_1.useState)(5), rating = _b[0], setRating = _b[1];
    var _c = (0, react_1.useState)(""), comment = _c[0], setComment = _c[1];
    var _d = (0, react_1.useState)(null), quiz = _d[0], setQuiz = _d[1];
    var _e = (0, react_1.useState)(false), quizLoading = _e[0], setQuizLoading = _e[1];
    var _f = (0, react_1.useState)(0), quizStep = _f[0], setQuizStep = _f[1];
    var _g = (0, react_1.useState)([]), quizAnswers = _g[0], setQuizAnswers = _g[1];
    var _h = (0, react_1.useState)(false), quizFinished = _h[0], setQuizFinished = _h[1];
    var _j = (0, react_1.useState)(0), quizPointsEarned = _j[0], setQuizPointsEarned = _j[1];
    var _k = (0, react_1.useState)(null), selectedOption = _k[0], setSelectedOption = _k[1];
    var _l = (0, react_1.useState)(false), showExplanation = _l[0], setShowExplanation = _l[1];
    (0, react_1.useEffect)(function () {
        if (lesson && (!lesson.isPremium || (user === null || user === void 0 ? void 0 : user.isPremium))) {
            var timer_1 = setTimeout(function () {
                markComplete.mutate({ lessonId: lessonId });
            }, 5000);
            return function () { return clearTimeout(timer_1); };
        }
    }, [lesson, user, lessonId]);
    if (isLoading) {
        return (<main_layout_1.MainLayout>
        <skeleton_1.Skeleton className="h-8 w-64 mb-4"/>
        <skeleton_1.Skeleton className="h-64 w-full rounded-2xl mb-8"/>
        <skeleton_1.Skeleton className="h-4 w-full mb-2"/>
        <skeleton_1.Skeleton className="h-4 w-5/6"/>
      </main_layout_1.MainLayout>);
    }
    if (!lesson)
        return <main_layout_1.MainLayout><div className="p-8 text-center text-red-500">Leçon introuvable</div></main_layout_1.MainLayout>;
    var isLocked = lesson.isPremium && !(user === null || user === void 0 ? void 0 : user.isPremium);
    var handleReviewSubmit = function (e) {
        e.preventDefault();
        submitReview.mutate({ data: { lessonId: lessonId, rating: rating, comment: comment } }, {
            onSuccess: function () {
                toast({ title: "Merci pour votre avis !" });
                setComment("");
            }
        });
    };
    var keyPointsList = lesson.keyPoints
        ? lesson.keyPoints.split("\n").map(function (s) { return s.trim(); }).filter(Boolean)
        : [];
    var generateQuiz = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, data, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setQuizLoading(true);
                    setQuiz(null);
                    setQuizStep(0);
                    setQuizAnswers([]);
                    setQuizFinished(false);
                    setSelectedOption(null);
                    setShowExplanation(false);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch("/api/chat/quiz-generate", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ lessonId: lessonId, series: user === null || user === void 0 ? void 0 : user.series }),
                        })];
                case 2:
                    res = _b.sent();
                    if (!res.ok)
                        throw new Error("Failed");
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _b.sent();
                    setQuiz(data);
                    return [3 /*break*/, 6];
                case 4:
                    _a = _b.sent();
                    toast({ title: "Impossible de générer le quiz. Réessayez.", variant: "destructive" });
                    return [3 /*break*/, 6];
                case 5:
                    setQuizLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var handleAnswer = function (option) {
        if (selectedOption !== null)
            return;
        setSelectedOption(option);
        setShowExplanation(true);
        var newAnswers = __spreadArray(__spreadArray([], quizAnswers, true), [option], false);
        setQuizAnswers(newAnswers);
    };
    var handleNext = function () { return __awaiter(_this, void 0, void 0, function () {
        var correctCount, res, data, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!quiz)
                        return [2 /*return*/];
                    if (!(quizStep < quiz.questions.length - 1)) return [3 /*break*/, 1];
                    setQuizStep(function (s) { return s + 1; });
                    setSelectedOption(null);
                    setShowExplanation(false);
                    return [3 /*break*/, 7];
                case 1:
                    setQuizFinished(true);
                    correctCount = quiz.questions.filter(function (q, i) { return quizAnswers[i] === q.correctAnswer; }).length;
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 6, , 7]);
                    return [4 /*yield*/, fetch("/api/chat/quiz-complete", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ correctAnswers: correctCount }),
                        })];
                case 3:
                    res = _b.sent();
                    if (!res.ok) return [3 /*break*/, 5];
                    return [4 /*yield*/, res.json()];
                case 4:
                    data = _b.sent();
                    setQuizPointsEarned(data.pointsEarned || 0);
                    _b.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    _a = _b.sent();
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    var quizScore = quiz ? quiz.questions.filter(function (q, i) { return quizAnswers[i] === q.correctAnswer; }).length : 0;
    var currentQ = quiz === null || quiz === void 0 ? void 0 : quiz.questions[quizStep];
    return (<main_layout_1.MainLayout>
      <div className="flex items-center text-sm text-muted-foreground mb-6 overflow-x-auto whitespace-nowrap pb-2">
        <wouter_1.Link href="/courses" className="hover:text-primary">Cours</wouter_1.Link>
        <lucide_react_1.ChevronRight className="w-4 h-4 mx-2 shrink-0"/>
        <span>{lesson.subjectName}</span>
        <lucide_react_1.ChevronRight className="w-4 h-4 mx-2 shrink-0"/>
        <span className="text-foreground font-medium truncate max-w-[200px]">{lesson.title}</span>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary">Série {lesson.series}</span>
          {lesson.duration && <span className="text-xs text-muted-foreground">{lesson.duration} min</span>}
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">{lesson.title}</h1>
        {lesson.summary && <p className="text-lg text-muted-foreground max-w-3xl">{lesson.summary}</p>}
      </div>

      {isLocked ? (<premium_lock_1.PremiumLock />) : (<div className="space-y-8 animate-in fade-in duration-500">

          {(lesson.videoUrl || lesson.audioUrl || lesson.pdfUrl) && (<div className="bg-card border border-border p-4 rounded-2xl shadow-sm flex flex-wrap gap-3">
              {lesson.videoUrl && (<a href={lesson.videoUrl} target="_blank" rel="noopener noreferrer">
                  <button_1.Button variant="secondary" className="gap-2 rounded-xl">
                    <lucide_react_1.PlayCircle className="w-5 h-5 text-primary"/> Voir la vidéo
                  </button_1.Button>
                </a>)}
              {lesson.audioUrl && (<a href={lesson.audioUrl} target="_blank" rel="noopener noreferrer">
                  <button_1.Button variant="outline" className="gap-2 rounded-xl">
                    <lucide_react_1.Headphones className="w-5 h-5"/> Écouter le podcast
                  </button_1.Button>
                </a>)}
              {lesson.pdfUrl && (<a href={lesson.pdfUrl} target="_blank" rel="noopener noreferrer">
                  <button_1.Button variant="outline" className="gap-2 rounded-xl ml-auto">
                    <lucide_react_1.FileDown className="w-5 h-5"/> Télécharger PDF
                  </button_1.Button>
                </a>)}
            </div>)}

          {/* Explication détaillée */}
          <div className="bg-card border border-border rounded-3xl p-6 md:p-10 shadow-sm">
            <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
              <lucide_react_1.BookOpen className="w-5 h-5 text-primary"/> Explication détaillée
            </h2>
            <div className="prose prose-blue dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-primary prose-img:rounded-xl prose-table:w-full prose-td:px-3 prose-th:px-3" dangerouslySetInnerHTML={{ __html: lesson.content }}/>
            <div className="mt-10 pt-6 border-t border-border flex items-center gap-2 text-success font-medium text-sm">
              <lucide_react_1.CheckCircle2 className="w-5 h-5"/> Cours marqué comme lu automatiquement.
            </div>
          </div>

          {/* Notions clés */}
          {keyPointsList.length > 0 && (<div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-display font-bold mb-5 flex items-center gap-2">
                <lucide_react_1.Lightbulb className="w-5 h-5 text-amber-500"/> Notions principales à retenir
              </h2>
              <ul className="space-y-3">
                {keyPointsList.map(function (point, i) { return (<li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-foreground">{point}</span>
                  </li>); })}
              </ul>
            </div>)}

          {/* Exemples résolus */}
          {lesson.examples && (<div className="bg-card border border-border rounded-3xl p-6 md:p-10 shadow-sm">
              <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                <lucide_react_1.Star className="w-5 h-5 text-purple-500 fill-purple-500"/> Exemples résolus
              </h2>
              <div className="prose prose-blue dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold" dangerouslySetInnerHTML={{ __html: lesson.examples }}/>
            </div>)}

          {/* Exercices liés */}
          {exercises && exercises.length > 0 && (<div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                <lucide_react_1.BrainCircuit className="w-5 h-5 text-emerald-500"/> Exercices et corrections
              </h2>
              <div className="space-y-6">
                {exercises.map(function (exercise, i) { return (<div key={exercise.id} className="border border-border rounded-2xl p-5 bg-muted/20">
                    <div className="flex items-start gap-3 mb-4">
                      <span className="w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{exercise.question}</p>
                        {exercise.difficulty && (<span className={"inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ".concat(exercise.difficulty === "hard" ? "bg-red-500/10 text-red-600" :
                            exercise.difficulty === "medium" ? "bg-amber-500/10 text-amber-600" :
                                "bg-emerald-500/10 text-emerald-600")}>
                            {exercise.difficulty === "hard" ? "Difficile" : exercise.difficulty === "medium" ? "Moyen" : "Facile"}
                          </span>)}
                      </div>
                    </div>
                    {exercise.options && Array.isArray(exercise.options) && exercise.options.length > 0 && (<ul className="space-y-2 mb-4 ml-10">
                        {exercise.options.map(function (opt, j) { return (<li key={j} className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full border border-border text-[10px] font-bold flex items-center justify-center shrink-0">
                              {String.fromCharCode(65 + j)}
                            </span>
                            {opt}
                          </li>); })}
                      </ul>)}
                    <details className="ml-10">
                      <summary className="text-sm font-semibold text-primary cursor-pointer hover:underline">
                        Voir la correction
                      </summary>
                      <div className="mt-3 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                        <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400 mb-1">
                          Réponse correcte : <span className="font-normal">{exercise.correctAnswer}</span>
                        </p>
                        {exercise.explanation && (<p className="text-sm text-muted-foreground mt-2">{exercise.explanation}</p>)}
                      </div>
                    </details>
                  </div>); })}
              </div>
              <div className="mt-6 pt-4 border-t border-border">
                <wouter_1.Link href={"/exercises?subject=".concat(lesson.subjectId)}>
                  <button_1.Button variant="outline" className="rounded-xl gap-2">
                    <lucide_react_1.BrainCircuit className="w-4 h-4"/> Voir tous les exercices de {lesson.subjectName}
                    <lucide_react_1.ChevronRight className="w-4 h-4"/>
                  </button_1.Button>
                </wouter_1.Link>
              </div>
            </div>)}

          {/* AI Quiz Section */}
          <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-display font-bold mb-2 flex items-center gap-2">
              <lucide_react_1.BrainCircuit className="w-5 h-5 text-blue-500"/> Évaluation IA
            </h2>
            <p className="text-sm text-muted-foreground mb-5">
              Testez votre compréhension avec un quiz généré par l'IA basé sur ce cours. Chaque bonne réponse rapporte 10 points.
            </p>

            {!quiz && !quizLoading && (<button_1.Button onClick={generateQuiz} className="rounded-xl gap-2">
                <lucide_react_1.BrainCircuit className="w-4 h-4"/> Générer un Quiz IA
              </button_1.Button>)}

            {quizLoading && (<div className="flex items-center gap-3 text-muted-foreground py-4">
                <lucide_react_1.Loader2 className="w-5 h-5 animate-spin"/>
                <span>Génération du quiz en cours...</span>
              </div>)}

            {quiz && !quizFinished && currentQ && (<div className="animate-in fade-in duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-muted-foreground">
                    Question {quizStep + 1} / {quiz.questions.length}
                  </span>
                  <progress_1.Progress value={((quizStep) / quiz.questions.length) * 100} className="w-32 h-2"/>
                </div>
                <div className="bg-muted/30 rounded-2xl p-5 mb-4">
                  <p className="font-semibold text-foreground text-base">{currentQ.question}</p>
                </div>
                <div className="grid gap-3 mb-4">
                  {currentQ.options.map(function (opt, i) {
                    var isSelected = selectedOption === opt;
                    var isCorrect = opt === currentQ.correctAnswer;
                    var showResult = selectedOption !== null;
                    return (<button key={i} onClick={function () { return handleAnswer(opt); }} disabled={selectedOption !== null} className={"w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ".concat(showResult
                            ? isCorrect
                                ? "border-emerald-500 bg-emerald-500/10 text-emerald-700"
                                : isSelected
                                    ? "border-red-400 bg-red-400/10 text-red-600"
                                    : "border-border bg-muted/20 text-muted-foreground"
                            : "border-border bg-muted/20 hover:border-primary hover:bg-primary/5 text-foreground cursor-pointer")}>
                        <span className="inline-flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-[11px] font-bold shrink-0">
                            {String.fromCharCode(65 + i)}
                          </span>
                          {opt}
                        </span>
                      </button>);
                })}
                </div>
                {showExplanation && (<div className={"p-4 rounded-xl mb-4 text-sm ".concat(selectedOption === currentQ.correctAnswer ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-700" : "bg-red-400/10 border border-red-400/20 text-red-700")}>
                    <p className="font-semibold mb-1">
                      {selectedOption === currentQ.correctAnswer ? "✓ Bonne réponse !" : "\u2717 La bonne r\u00E9ponse \u00E9tait : ".concat(currentQ.correctAnswer)}
                    </p>
                    <p className="text-sm opacity-90">{currentQ.explanation}</p>
                  </div>)}
                {selectedOption !== null && (<button_1.Button onClick={handleNext} className="rounded-xl gap-2">
                    {quizStep < quiz.questions.length - 1 ? "Question suivante" : "Voir les résultats"}
                    <lucide_react_1.ChevronRight className="w-4 h-4"/>
                  </button_1.Button>)}
              </div>)}

            {quiz && quizFinished && (<div className="text-center py-4 animate-in fade-in duration-300">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <lucide_react_1.Trophy className="w-10 h-10 text-amber-500"/>
                </div>
                <h3 className="text-2xl font-display font-bold mb-2">Quiz terminé !</h3>
                <p className="text-lg text-muted-foreground mb-2">
                  Score : <strong className="text-foreground">{quizScore} / {quiz.questions.length}</strong>
                </p>
                {quizPointsEarned > 0 && (<p className="text-emerald-600 font-semibold text-base mb-4">+{quizPointsEarned} points gagnés 🎉</p>)}
                <div className="flex justify-center gap-3">
                  <button_1.Button variant="outline" onClick={generateQuiz} className="rounded-xl gap-2">
                    <lucide_react_1.BrainCircuit className="w-4 h-4"/> Nouveau quiz
                  </button_1.Button>
                  <wouter_1.Link href="/leaderboard">
                    <button_1.Button className="rounded-xl gap-2">
                      <lucide_react_1.Trophy className="w-4 h-4"/> Classement
                    </button_1.Button>
                  </wouter_1.Link>
                </div>
              </div>)}
          </div>

          {/* Review Section */}
          <div className="bg-card border border-border rounded-3xl p-6 md:p-10 shadow-sm">
            <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
              <lucide_react_1.Star className="w-5 h-5 text-amber-500 fill-amber-500"/> Avis sur ce cours
            </h3>

            <form onSubmit={handleReviewSubmit} className="mb-8 p-6 bg-muted/50 rounded-2xl border border-border/50">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-medium">Votre note :</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(function (star) { return (<lucide_react_1.Star key={star} className={"w-6 h-6 cursor-pointer transition-colors ".concat(rating >= star ? "text-amber-500 fill-amber-500" : "text-muted-foreground")} onClick={function () { return setRating(star); }}/>); })}
                </div>
              </div>
              <textarea_1.Textarea placeholder="Qu'avez-vous pensé de ce cours ?" className="mb-4 bg-background rounded-xl resize-none" value={comment} onChange={function (e) { return setComment(e.target.value); }}/>
              <button_1.Button type="submit" disabled={submitReview.isPending} className="rounded-xl">
                Envoyer mon avis
              </button_1.Button>
            </form>

            <div className="space-y-4">
              {(reviews === null || reviews === void 0 ? void 0 : reviews.length) === 0 ? (<p className="text-muted-foreground text-sm italic">Soyez le premier à donner votre avis.</p>) : (reviews === null || reviews === void 0 ? void 0 : reviews.map(function (review) { return (<div key={review.id} className="border-b border-border pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm">{review.userName}</span>
                      <div className="flex">
                        {__spreadArray([], Array(5), true).map(function (_, i) { return (<lucide_react_1.Star key={i} className={"w-3 h-3 ".concat(i < review.rating ? "text-amber-500 fill-amber-500" : "text-muted-foreground/30")}/>); })}
                      </div>
                    </div>
                    {review.comment && <p className="text-sm text-muted-foreground">{review.comment}</p>}
                  </div>); }))}
            </div>
          </div>

        </div>)}
    </main_layout_1.MainLayout>);
}
