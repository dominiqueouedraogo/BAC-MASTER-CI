import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useParams, Link } from "wouter";
import { useGetExercise, useSubmitExercise } from "@workspace/api-client-react";
import { MainLayout } from "src/components/layout/main-layout";
import { PremiumLock } from "src/components/ui/premium-lock";
import { useAuth } from "src/hooks/use-auth";
import { Button } from "src/components/ui/button";
import { Skeleton } from "src/components/ui/skeleton";
import { ChevronLeft, CheckCircle2, XCircle, Trophy } from "lucide-react";
import { Textarea } from "src/components/ui/textarea";
import { getDifficultyColor } from "src/lib/utils";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
export default function Quiz() {
    const { id } = useParams();
    const exerciseId = parseInt(id || "0");
    const { user } = useAuth();
    const { width, height } = useWindowSize();
    const { data: exercise, isLoading } = useGetExercise(exerciseId);
    const submitMutation = useSubmitExercise();
    const [selectedOption, setSelectedOption] = useState("");
    const [openAnswer, setOpenAnswer] = useState("");
    if (isLoading) {
        return _jsx(MainLayout, { children: _jsx(Skeleton, { className: "w-full h-96 rounded-3xl" }) });
    }
    if (!exercise)
        return _jsx(MainLayout, { children: _jsx("div", { className: "p-8 text-center", children: "Exercice introuvable" }) });
    if (exercise.isPremium && !user?.isPremium) {
        return _jsx(MainLayout, { children: _jsx(PremiumLock, { title: "Exercice Premium" }) });
    }
    const handleSubmit = () => {
        const answer = exercise.type === 'open' ? openAnswer : selectedOption;
        if (!answer)
            return;
        submitMutation.mutate({ id: exerciseId, data: { answer } });
    };
    const result = submitMutation.data;
    const showConfetti = result?.correct;
    return (_jsxs(MainLayout, { children: [showConfetti && _jsx(Confetti, { width: width, height: height, recycle: false, numberOfPieces: 500 }), _jsxs(Link, { href: "/exercises", className: "inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6", children: [_jsx(ChevronLeft, { className: "w-4 h-4 mr-1" }), " Retour aux exercices"] }), _jsx("div", { className: "max-w-3xl mx-auto", children: _jsxs("div", { className: "bg-card border border-border shadow-sm rounded-3xl overflow-hidden", children: [_jsx("div", { className: "bg-secondary/5 border-b border-border p-6 flex items-center justify-between", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: `text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${getDifficultyColor(exercise.difficulty)}`, children: exercise.difficulty === 'easy' ? 'Facile' : exercise.difficulty === 'medium' ? 'Moyen' : 'Difficile' }), _jsxs("span", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider border-l border-border pl-3", children: ["S\u00E9rie ", exercise.series] })] }) }), _jsxs("div", { className: "p-6 md:p-10", children: [_jsx("h2", { className: "text-xl md:text-2xl font-bold text-foreground mb-8 leading-relaxed", children: exercise.question }), !result ? (_jsxs("div", { className: "space-y-4", children: [(exercise.type === 'mcq' || exercise.type === 'true_false') && exercise.options && (_jsx("div", { className: "grid gap-3", children: exercise.options.map((opt, i) => (_jsx("button", { onClick: () => setSelectedOption(opt), className: `w-full text-left p-4 rounded-xl border-2 transition-all font-medium text-lg ${selectedOption === opt
                                                    ? 'border-primary bg-primary/5 text-primary'
                                                    : 'border-border hover:border-primary/30 hover:bg-muted/50'}`, children: opt }, i))) })), exercise.type === 'open' && (_jsx(Textarea, { placeholder: "Saisissez votre r\u00E9ponse d\u00E9taill\u00E9e ici...", className: "min-h-[150px] text-lg p-4 rounded-xl bg-background", value: openAnswer, onChange: (e) => setOpenAnswer(e.target.value) })), _jsx("div", { className: "pt-8", children: _jsx(Button, { size: "lg", className: "w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90", disabled: (!selectedOption && !openAnswer) || submitMutation.isPending, onClick: handleSubmit, children: submitMutation.isPending ? "Vérification..." : "Valider ma réponse" }) })] })) : (_jsxs("div", { className: "animate-in fade-in slide-in-from-bottom-4 duration-500", children: [_jsxs("div", { className: `p-6 rounded-2xl border-2 mb-6 ${result.correct ? 'bg-success/10 border-success/30' : 'bg-destructive/10 border-destructive/30'}`, children: [_jsxs("div", { className: "flex items-center gap-4 mb-4", children: [result.correct ? (_jsx("div", { className: "w-12 h-12 rounded-full bg-success text-white flex items-center justify-center shrink-0 shadow-lg shadow-success/20", children: _jsx(CheckCircle2, { className: "w-6 h-6" }) })) : (_jsx("div", { className: "w-12 h-12 rounded-full bg-destructive text-white flex items-center justify-center shrink-0 shadow-lg shadow-destructive/20", children: _jsx(XCircle, { className: "w-6 h-6" }) })), _jsxs("div", { children: [_jsx("h3", { className: `text-xl font-bold ${result.correct ? 'text-success' : 'text-destructive'}`, children: result.correct ? 'Bonne réponse !' : 'Réponse incorrecte' }), result.pointsEarned > 0 && (_jsxs("p", { className: "text-amber-600 font-bold flex items-center text-sm mt-1", children: [_jsx(Trophy, { className: "w-4 h-4 mr-1" }), " +", result.pointsEarned, " points"] }))] })] }), !result.correct && (_jsxs("div", { className: "mt-4 pt-4 border-t border-destructive/20", children: [_jsx("p", { className: "text-sm font-semibold text-destructive mb-1", children: "La bonne r\u00E9ponse \u00E9tait :" }), _jsx("p", { className: "font-medium", children: result.correctAnswer })] }))] }), _jsxs("div", { className: "bg-muted/50 border border-border p-6 rounded-2xl mb-8", children: [_jsx("h4", { className: "font-bold mb-2 flex items-center gap-2", children: "Explication d\u00E9taill\u00E9e" }), _jsx("p", { className: "text-muted-foreground leading-relaxed", children: result.explanation })] }), _jsx("div", { className: "flex justify-center", children: _jsx(Link, { href: "/exercises", children: _jsx(Button, { size: "lg", variant: "outline", className: "rounded-xl h-14 px-8 border-2", children: "Passer \u00E0 un autre exercice" }) }) })] }))] })] }) })] }));
}
