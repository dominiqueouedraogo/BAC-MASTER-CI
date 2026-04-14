import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Link, useSearch } from "wouter";
import { useGetExercises, useGetSubjects } from "@workspace/api-client-react";
import { MainLayout } from "src/components/layout/main-layout";
import { useAuth } from "src/hooks/use-auth";
import { Card, CardContent } from "src/components/ui/card";
import { Skeleton } from "src/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "src/components/ui/select";
import { BrainCircuit, ChevronRight, Lock } from "lucide-react";
import { getDifficultyColor } from "src/lib/utils";
export default function Exercises() {
    const { user } = useAuth();
    const search = useSearch();
    const params = new URLSearchParams(search);
    const urlSubject = params.get("subject") || "all";
    const [series, setSeries] = useState(user?.series || "A");
    const [subjectId, setSubjectId] = useState(urlSubject);
    const [difficulty, setDifficulty] = useState("all");
    useEffect(() => {
        const p = new URLSearchParams(search);
        const s = p.get("subject") || "all";
        setSubjectId(s);
    }, [search]);
    const { data: subjects } = useGetSubjects({ series });
    const queryParams = { series };
    if (subjectId !== "all")
        queryParams.subjectId = parseInt(subjectId);
    if (difficulty !== "all")
        queryParams.difficulty = difficulty;
    const { data: exercises, isLoading } = useGetExercises(queryParams);
    const activeSubjectName = subjectId !== "all"
        ? subjects?.find(s => s.id.toString() === subjectId)?.name
        : null;
    return (_jsxs(MainLayout, { children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-display font-bold text-foreground", children: "Exercices & Quiz" }), _jsx("p", { className: "text-muted-foreground mt-1", children: activeSubjectName
                            ? `Exercices de ${activeSubjectName} — entraînez-vous avec des QCM et questions types.`
                            : "Entraînez-vous avec des centaines de QCM et sujets types." })] }), _jsxs("div", { className: "bg-card border border-border p-4 rounded-2xl shadow-sm mb-8 flex flex-col md:flex-row gap-4", children: [_jsxs("div", { className: "flex-1", children: [_jsx("label", { className: "text-xs font-semibold text-muted-foreground mb-1 block uppercase tracking-wider", children: "S\u00E9rie" }), _jsxs(Select, { value: series, onValueChange: (v) => setSeries(v), children: [_jsx(SelectTrigger, { className: "bg-background rounded-xl h-12", children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "A", children: "S\u00E9rie A" }), _jsx(SelectItem, { value: "C", children: "S\u00E9rie C" }), _jsx(SelectItem, { value: "D", children: "S\u00E9rie D" })] })] })] }), _jsxs("div", { className: "flex-1", children: [_jsx("label", { className: "text-xs font-semibold text-muted-foreground mb-1 block uppercase tracking-wider", children: "Mati\u00E8re" }), _jsxs(Select, { value: subjectId, onValueChange: setSubjectId, children: [_jsx(SelectTrigger, { className: "bg-background rounded-xl h-12", children: _jsx(SelectValue, { placeholder: "Toutes les mati\u00E8res" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "Toutes les mati\u00E8res" }), subjects?.map(s => (_jsx(SelectItem, { value: s.id.toString(), children: s.name }, s.id)))] })] })] }), _jsxs("div", { className: "flex-1", children: [_jsx("label", { className: "text-xs font-semibold text-muted-foreground mb-1 block uppercase tracking-wider", children: "Difficult\u00E9" }), _jsxs(Select, { value: difficulty, onValueChange: setDifficulty, children: [_jsx(SelectTrigger, { className: "bg-background rounded-xl h-12", children: _jsx(SelectValue, { placeholder: "Toutes les difficult\u00E9s" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "Toutes" }), _jsx(SelectItem, { value: "easy", children: "Facile" }), _jsx(SelectItem, { value: "medium", children: "Moyen" }), _jsx(SelectItem, { value: "hard", children: "Difficile" })] })] })] })] }), activeSubjectName && (_jsxs("div", { className: "mb-4 flex items-center gap-2", children: [_jsx("span", { className: "text-sm text-muted-foreground", children: "Filtr\u00E9 pour :" }), _jsx("span", { className: "text-sm font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full", children: activeSubjectName }), _jsx("button", { onClick: () => setSubjectId("all"), className: "text-xs text-muted-foreground underline hover:text-foreground ml-1", children: "Effacer le filtre" })] })), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6", children: isLoading ? (Array.from({ length: 6 }).map((_, i) => _jsx(Skeleton, { className: "h-48 rounded-2xl" }, i))) : exercises?.length === 0 ? (_jsxs("div", { className: "col-span-full py-20 text-center", children: [_jsx(BrainCircuit, { className: "w-16 h-16 text-muted-foreground/30 mx-auto mb-4" }), _jsx("p", { className: "text-lg text-muted-foreground", children: "Aucun exercice ne correspond \u00E0 vos crit\u00E8res." })] })) : (exercises?.map((exercise) => {
                    const subject = subjects?.find(s => s.id === exercise.subjectId);
                    return (_jsxs(Card, { className: "rounded-2xl border-border shadow-sm hover:shadow-md transition-shadow flex flex-col h-full overflow-hidden relative", children: [exercise.isPremium && !user?.isPremium && (_jsxs("div", { className: "absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10 flex items-center gap-1 shadow-sm", children: [_jsx(Lock, { className: "w-3 h-3" }), " PREMIUM"] })), _jsxs(CardContent, { className: "p-6 flex flex-col h-full pt-8", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("span", { className: "text-xs font-bold text-muted-foreground uppercase tracking-wider", children: subject?.name || 'Matière' }), _jsx("span", { className: `text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wider ${getDifficultyColor(exercise.difficulty)}`, children: exercise.difficulty === 'easy' ? 'Facile' : exercise.difficulty === 'medium' ? 'Moyen' : 'Difficile' })] }), _jsx("h3", { className: "font-bold text-foreground text-lg mb-6 line-clamp-3 leading-snug flex-1", children: exercise.question }), _jsx(Link, { href: `/exercises/${exercise.id}`, children: _jsxs("button", { className: `w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${exercise.isPremium && !user?.isPremium
                                                ? "bg-muted text-muted-foreground cursor-not-allowed"
                                                : "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"}`, children: ["Commencer l'exercice ", _jsx(ChevronRight, { className: "w-4 h-4" })] }) })] })] }, exercise.id));
                })) })] }));
}
