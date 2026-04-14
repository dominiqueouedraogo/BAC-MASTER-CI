import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams, Link } from "wouter";
import { useGetLesson, useMarkLessonComplete, useGetReviews, useCreateReview, useGetExercises } from "@workspace/api-client-react";
import { MainLayout } from "src/components/layout/main-layout";
import { PremiumLock } from "src/components/ui/premium-lock";
import { useAuth } from "src/hooks/use-auth";
import { Skeleton } from "src/components/ui/skeleton";
import { ChevronRight, PlayCircle, Headphones, FileDown, CheckCircle2, Star, BrainCircuit, Lightbulb, BookOpen, Loader2, Trophy } from "lucide-react";
import { Button } from "src/components/ui/button";
import { Progress } from "src/components/ui/progress";
import { useEffect, useState } from "react";
import { Textarea } from "src/components/ui/textarea";
import { useToast } from "src/hooks/use-toast";
export default function LessonDetail() {
    const { id } = useParams();
    const lessonId = parseInt(id || "0");
    const { user } = useAuth();
    const { toast } = useToast();
    const { data: lesson, isLoading } = useGetLesson(lessonId);
    const markComplete = useMarkLessonComplete();
    const { data: reviews } = useGetReviews({ lessonId });
    const { data: exercises } = useGetExercises({ lessonId });
    const submitReview = useCreateReview();
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [quiz, setQuiz] = useState(null);
    const [quizLoading, setQuizLoading] = useState(false);
    const [quizStep, setQuizStep] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState([]);
    const [quizFinished, setQuizFinished] = useState(false);
    const [quizPointsEarned, setQuizPointsEarned] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);
    useEffect(() => {
        if (lesson && (!lesson.isPremium || user?.isPremium)) {
            const timer = setTimeout(() => {
                markComplete.mutate({ lessonId });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [lesson, user, lessonId]);
    if (isLoading) {
        return (_jsxs(MainLayout, { children: [_jsx(Skeleton, { className: "h-8 w-64 mb-4" }), _jsx(Skeleton, { className: "h-64 w-full rounded-2xl mb-8" }), _jsx(Skeleton, { className: "h-4 w-full mb-2" }), _jsx(Skeleton, { className: "h-4 w-5/6" })] }));
    }
    if (!lesson)
        return _jsx(MainLayout, { children: _jsx("div", { className: "p-8 text-center text-red-500", children: "Le\u00E7on introuvable" }) });
    const isLocked = lesson.isPremium && !user?.isPremium;
    const handleReviewSubmit = (e) => {
        e.preventDefault();
        submitReview.mutate({ data: { lessonId, rating, comment } }, {
            onSuccess: () => {
                toast({ title: "Merci pour votre avis !" });
                setComment("");
            }
        });
    };
    const keyPointsList = lesson.keyPoints
        ? lesson.keyPoints.split("\n").map(s => s.trim()).filter(Boolean)
        : [];
    const generateQuiz = async () => {
        setQuizLoading(true);
        setQuiz(null);
        setQuizStep(0);
        setQuizAnswers([]);
        setQuizFinished(false);
        setSelectedOption(null);
        setShowExplanation(false);
        try {
            const res = await fetch("/api/chat/quiz-generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ lessonId, series: user?.series }),
            });
            if (!res.ok)
                throw new Error("Failed");
            const data = await res.json();
            setQuiz(data);
        }
        catch {
            toast({ title: "Impossible de générer le quiz. Réessayez.", variant: "destructive" });
        }
        finally {
            setQuizLoading(false);
        }
    };
    const handleAnswer = (option) => {
        if (selectedOption !== null)
            return;
        setSelectedOption(option);
        setShowExplanation(true);
        const newAnswers = [...quizAnswers, option];
        setQuizAnswers(newAnswers);
    };
    const handleNext = async () => {
        if (!quiz)
            return;
        if (quizStep < quiz.questions.length - 1) {
            setQuizStep(s => s + 1);
            setSelectedOption(null);
            setShowExplanation(false);
        }
        else {
            setQuizFinished(true);
            const correctCount = quiz.questions.filter((q, i) => quizAnswers[i] === q.correctAnswer).length;
            try {
                const res = await fetch("/api/chat/quiz-complete", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ correctAnswers: correctCount }),
                });
                if (res.ok) {
                    const data = await res.json();
                    setQuizPointsEarned(data.pointsEarned || 0);
                }
            }
            catch { }
        }
    };
    const quizScore = quiz ? quiz.questions.filter((q, i) => quizAnswers[i] === q.correctAnswer).length : 0;
    const currentQ = quiz?.questions[quizStep];
    return (_jsxs(MainLayout, { children: [_jsxs("div", { className: "flex items-center text-sm text-muted-foreground mb-6 overflow-x-auto whitespace-nowrap pb-2", children: [_jsx(Link, { href: "/courses", className: "hover:text-primary", children: "Cours" }), _jsx(ChevronRight, { className: "w-4 h-4 mx-2 shrink-0" }), _jsx("span", { children: lesson.subjectName }), _jsx(ChevronRight, { className: "w-4 h-4 mx-2 shrink-0" }), _jsx("span", { className: "text-foreground font-medium truncate max-w-[200px]", children: lesson.title })] }), _jsxs("div", { className: "mb-8", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsxs("span", { className: "px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary", children: ["S\u00E9rie ", lesson.series] }), lesson.duration && _jsxs("span", { className: "text-xs text-muted-foreground", children: [lesson.duration, " min"] })] }), _jsx("h1", { className: "text-3xl md:text-4xl font-display font-bold text-foreground mb-4", children: lesson.title }), lesson.summary && _jsx("p", { className: "text-lg text-muted-foreground max-w-3xl", children: lesson.summary })] }), isLocked ? (_jsx(PremiumLock, {})) : (_jsxs("div", { className: "space-y-8 animate-in fade-in duration-500", children: [(lesson.videoUrl || lesson.audioUrl || lesson.pdfUrl) && (_jsxs("div", { className: "bg-card border border-border p-4 rounded-2xl shadow-sm flex flex-wrap gap-3", children: [lesson.videoUrl && (_jsx("a", { href: lesson.videoUrl, target: "_blank", rel: "noopener noreferrer", children: _jsxs(Button, { variant: "secondary", className: "gap-2 rounded-xl", children: [_jsx(PlayCircle, { className: "w-5 h-5 text-primary" }), " Voir la vid\u00E9o"] }) })), lesson.audioUrl && (_jsx("a", { href: lesson.audioUrl, target: "_blank", rel: "noopener noreferrer", children: _jsxs(Button, { variant: "outline", className: "gap-2 rounded-xl", children: [_jsx(Headphones, { className: "w-5 h-5" }), " \u00C9couter le podcast"] }) })), lesson.pdfUrl && (_jsx("a", { href: lesson.pdfUrl, target: "_blank", rel: "noopener noreferrer", children: _jsxs(Button, { variant: "outline", className: "gap-2 rounded-xl ml-auto", children: [_jsx(FileDown, { className: "w-5 h-5" }), " T\u00E9l\u00E9charger PDF"] }) }))] })), _jsxs("div", { className: "bg-card border border-border rounded-3xl p-6 md:p-10 shadow-sm", children: [_jsxs("h2", { className: "text-xl font-display font-bold mb-6 flex items-center gap-2", children: [_jsx(BookOpen, { className: "w-5 h-5 text-primary" }), " Explication d\u00E9taill\u00E9e"] }), _jsx("div", { className: "prose prose-blue dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-primary prose-img:rounded-xl prose-table:w-full prose-td:px-3 prose-th:px-3", dangerouslySetInnerHTML: { __html: lesson.content } }), _jsxs("div", { className: "mt-10 pt-6 border-t border-border flex items-center gap-2 text-success font-medium text-sm", children: [_jsx(CheckCircle2, { className: "w-5 h-5" }), " Cours marqu\u00E9 comme lu automatiquement."] })] }), keyPointsList.length > 0 && (_jsxs("div", { className: "bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm", children: [_jsxs("h2", { className: "text-xl font-display font-bold mb-5 flex items-center gap-2", children: [_jsx(Lightbulb, { className: "w-5 h-5 text-amber-500" }), " Notions principales \u00E0 retenir"] }), _jsx("ul", { className: "space-y-3", children: keyPointsList.map((point, i) => (_jsxs("li", { className: "flex items-start gap-3", children: [_jsx("span", { className: "w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5", children: i + 1 }), _jsx("span", { className: "text-foreground", children: point })] }, i))) })] })), lesson.examples && (_jsxs("div", { className: "bg-card border border-border rounded-3xl p-6 md:p-10 shadow-sm", children: [_jsxs("h2", { className: "text-xl font-display font-bold mb-6 flex items-center gap-2", children: [_jsx(Star, { className: "w-5 h-5 text-purple-500 fill-purple-500" }), " Exemples r\u00E9solus"] }), _jsx("div", { className: "prose prose-blue dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold", dangerouslySetInnerHTML: { __html: lesson.examples } })] })), exercises && exercises.length > 0 && (_jsxs("div", { className: "bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm", children: [_jsxs("h2", { className: "text-xl font-display font-bold mb-6 flex items-center gap-2", children: [_jsx(BrainCircuit, { className: "w-5 h-5 text-emerald-500" }), " Exercices et corrections"] }), _jsx("div", { className: "space-y-6", children: exercises.map((exercise, i) => (_jsxs("div", { className: "border border-border rounded-2xl p-5 bg-muted/20", children: [_jsxs("div", { className: "flex items-start gap-3 mb-4", children: [_jsx("span", { className: "w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5", children: i + 1 }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "font-semibold text-foreground", children: exercise.question }), exercise.difficulty && (_jsx("span", { className: `inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${exercise.difficulty === "hard" ? "bg-red-500/10 text-red-600" :
                                                                exercise.difficulty === "medium" ? "bg-amber-500/10 text-amber-600" :
                                                                    "bg-emerald-500/10 text-emerald-600"}`, children: exercise.difficulty === "hard" ? "Difficile" : exercise.difficulty === "medium" ? "Moyen" : "Facile" }))] })] }), exercise.options && Array.isArray(exercise.options) && exercise.options.length > 0 && (_jsx("ul", { className: "space-y-2 mb-4 ml-10", children: exercise.options.map((opt, j) => (_jsxs("li", { className: "text-sm text-muted-foreground flex items-center gap-2", children: [_jsx("span", { className: "w-5 h-5 rounded-full border border-border text-[10px] font-bold flex items-center justify-center shrink-0", children: String.fromCharCode(65 + j) }), opt] }, j))) })), _jsxs("details", { className: "ml-10", children: [_jsx("summary", { className: "text-sm font-semibold text-primary cursor-pointer hover:underline", children: "Voir la correction" }), _jsxs("div", { className: "mt-3 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl", children: [_jsxs("p", { className: "text-sm font-bold text-emerald-700 dark:text-emerald-400 mb-1", children: ["R\u00E9ponse correcte : ", _jsx("span", { className: "font-normal", children: exercise.correctAnswer })] }), exercise.explanation && (_jsx("p", { className: "text-sm text-muted-foreground mt-2", children: exercise.explanation }))] })] })] }, exercise.id))) }), _jsx("div", { className: "mt-6 pt-4 border-t border-border", children: _jsx(Link, { href: `/exercises?subject=${lesson.subjectId}`, children: _jsxs(Button, { variant: "outline", className: "rounded-xl gap-2", children: [_jsx(BrainCircuit, { className: "w-4 h-4" }), " Voir tous les exercices de ", lesson.subjectName, _jsx(ChevronRight, { className: "w-4 h-4" })] }) }) })] })), _jsxs("div", { className: "bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm", children: [_jsxs("h2", { className: "text-xl font-display font-bold mb-2 flex items-center gap-2", children: [_jsx(BrainCircuit, { className: "w-5 h-5 text-blue-500" }), " \u00C9valuation IA"] }), _jsx("p", { className: "text-sm text-muted-foreground mb-5", children: "Testez votre compr\u00E9hension avec un quiz g\u00E9n\u00E9r\u00E9 par l'IA bas\u00E9 sur ce cours. Chaque bonne r\u00E9ponse rapporte 10 points." }), !quiz && !quizLoading && (_jsxs(Button, { onClick: generateQuiz, className: "rounded-xl gap-2", children: [_jsx(BrainCircuit, { className: "w-4 h-4" }), " G\u00E9n\u00E9rer un Quiz IA"] })), quizLoading && (_jsxs("div", { className: "flex items-center gap-3 text-muted-foreground py-4", children: [_jsx(Loader2, { className: "w-5 h-5 animate-spin" }), _jsx("span", { children: "G\u00E9n\u00E9ration du quiz en cours..." })] })), quiz && !quizFinished && currentQ && (_jsxs("div", { className: "animate-in fade-in duration-300", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("span", { className: "text-sm font-medium text-muted-foreground", children: ["Question ", quizStep + 1, " / ", quiz.questions.length] }), _jsx(Progress, { value: ((quizStep) / quiz.questions.length) * 100, className: "w-32 h-2" })] }), _jsx("div", { className: "bg-muted/30 rounded-2xl p-5 mb-4", children: _jsx("p", { className: "font-semibold text-foreground text-base", children: currentQ.question }) }), _jsx("div", { className: "grid gap-3 mb-4", children: currentQ.options.map((opt, i) => {
                                            const isSelected = selectedOption === opt;
                                            const isCorrect = opt === currentQ.correctAnswer;
                                            const showResult = selectedOption !== null;
                                            return (_jsx("button", { onClick: () => handleAnswer(opt), disabled: selectedOption !== null, className: `w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${showResult
                                                    ? isCorrect
                                                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-700"
                                                        : isSelected
                                                            ? "border-red-400 bg-red-400/10 text-red-600"
                                                            : "border-border bg-muted/20 text-muted-foreground"
                                                    : "border-border bg-muted/20 hover:border-primary hover:bg-primary/5 text-foreground cursor-pointer"}`, children: _jsxs("span", { className: "inline-flex items-center gap-3", children: [_jsx("span", { className: "w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-[11px] font-bold shrink-0", children: String.fromCharCode(65 + i) }), opt] }) }, i));
                                        }) }), showExplanation && (_jsxs("div", { className: `p-4 rounded-xl mb-4 text-sm ${selectedOption === currentQ.correctAnswer ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-700" : "bg-red-400/10 border border-red-400/20 text-red-700"}`, children: [_jsx("p", { className: "font-semibold mb-1", children: selectedOption === currentQ.correctAnswer ? "✓ Bonne réponse !" : `✗ La bonne réponse était : ${currentQ.correctAnswer}` }), _jsx("p", { className: "text-sm opacity-90", children: currentQ.explanation })] })), selectedOption !== null && (_jsxs(Button, { onClick: handleNext, className: "rounded-xl gap-2", children: [quizStep < quiz.questions.length - 1 ? "Question suivante" : "Voir les résultats", _jsx(ChevronRight, { className: "w-4 h-4" })] }))] })), quiz && quizFinished && (_jsxs("div", { className: "text-center py-4 animate-in fade-in duration-300", children: [_jsx("div", { className: "w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4", children: _jsx(Trophy, { className: "w-10 h-10 text-amber-500" }) }), _jsx("h3", { className: "text-2xl font-display font-bold mb-2", children: "Quiz termin\u00E9 !" }), _jsxs("p", { className: "text-lg text-muted-foreground mb-2", children: ["Score : ", _jsxs("strong", { className: "text-foreground", children: [quizScore, " / ", quiz.questions.length] })] }), quizPointsEarned > 0 && (_jsxs("p", { className: "text-emerald-600 font-semibold text-base mb-4", children: ["+", quizPointsEarned, " points gagn\u00E9s \uD83C\uDF89"] })), _jsxs("div", { className: "flex justify-center gap-3", children: [_jsxs(Button, { variant: "outline", onClick: generateQuiz, className: "rounded-xl gap-2", children: [_jsx(BrainCircuit, { className: "w-4 h-4" }), " Nouveau quiz"] }), _jsx(Link, { href: "/leaderboard", children: _jsxs(Button, { className: "rounded-xl gap-2", children: [_jsx(Trophy, { className: "w-4 h-4" }), " Classement"] }) })] })] }))] }), _jsxs("div", { className: "bg-card border border-border rounded-3xl p-6 md:p-10 shadow-sm", children: [_jsxs("h3", { className: "text-xl font-display font-bold mb-6 flex items-center gap-2", children: [_jsx(Star, { className: "w-5 h-5 text-amber-500 fill-amber-500" }), " Avis sur ce cours"] }), _jsxs("form", { onSubmit: handleReviewSubmit, className: "mb-8 p-6 bg-muted/50 rounded-2xl border border-border/50", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx("span", { className: "text-sm font-medium", children: "Votre note :" }), _jsx("div", { className: "flex gap-1", children: [1, 2, 3, 4, 5].map(star => (_jsx(Star, { className: `w-6 h-6 cursor-pointer transition-colors ${rating >= star ? "text-amber-500 fill-amber-500" : "text-muted-foreground"}`, onClick: () => setRating(star) }, star))) })] }), _jsx(Textarea, { placeholder: "Qu'avez-vous pens\u00E9 de ce cours ?", className: "mb-4 bg-background rounded-xl resize-none", value: comment, onChange: e => setComment(e.target.value) }), _jsx(Button, { type: "submit", disabled: submitReview.isPending, className: "rounded-xl", children: "Envoyer mon avis" })] }), _jsx("div", { className: "space-y-4", children: reviews?.length === 0 ? (_jsx("p", { className: "text-muted-foreground text-sm italic", children: "Soyez le premier \u00E0 donner votre avis." })) : (reviews?.map(review => (_jsxs("div", { className: "border-b border-border pb-4 last:border-0", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "font-bold text-sm", children: review.userName }), _jsx("div", { className: "flex", children: [...Array(5)].map((_, i) => (_jsx(Star, { className: `w-3 h-3 ${i < review.rating ? "text-amber-500 fill-amber-500" : "text-muted-foreground/30"}` }, i))) })] }), review.comment && _jsx("p", { className: "text-sm text-muted-foreground", children: review.comment })] }, review.id)))) })] })] }))] }));
}
