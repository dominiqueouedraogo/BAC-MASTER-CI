import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link } from "wouter";
import { useGetSubjects, useGetLessons } from "@workspace/api-client-react";
import { MainLayout } from "src/components/layout/main-layout";
import { useAuth } from "src/hooks/use-auth";
import { Tabs, TabsList, TabsTrigger } from "src/components/ui/tabs";
import { Card, CardContent } from "src/components/ui/card";
import { Badge } from "src/components/ui/badge";
import { Skeleton } from "src/components/ui/skeleton";
import { BookOpen, ChevronRight, Lock, Play, FileText, Headphones, Atom, FlaskConical } from "lucide-react";
const CHIMIE_KEYWORDS = [
    "avancement", "acido", "oxydoréduction", "organique", "hydrocarbure",
    "alcool", "aldéhyde", "cétone", "acide carboxylique", "ester",
    "saponification", "chimie générale", "chimie organique", "chimique",
    "composés organiques", "alcanes", "alcènes", "alcynes",
];
function isChimieLesson(title) {
    const lower = title.toLowerCase();
    return CHIMIE_KEYWORDS.some((k) => lower.includes(k));
}
function isPhysiqueChimieSubject(name) {
    const lower = name.toLowerCase();
    return lower.includes("physique") && lower.includes("chimie");
}
export default function Courses() {
    const { user } = useAuth();
    const defaultSeries = user?.series || "A";
    const [activeSeries, setActiveSeries] = useState(defaultSeries);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const { data: subjects, isLoading: loadingSubjects } = useGetSubjects({ series: activeSeries });
    const { data: lessons, isLoading: loadingLessons } = useGetLessons({ subjectId: selectedSubject || undefined, series: activeSeries }, { query: { enabled: selectedSubject !== null } });
    return (_jsxs(MainLayout, { children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-display font-bold text-foreground", children: "Cours" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "Acc\u00E9dez \u00E0 tous les cours officiels du programme ivoirien." })] }), _jsx(Tabs, { defaultValue: activeSeries, onValueChange: (v) => { setActiveSeries(v); setSelectedSubject(null); }, className: "w-full mb-8", children: _jsxs(TabsList, { className: "grid w-full max-w-md grid-cols-3 bg-secondary/10 p-1 rounded-xl h-auto", children: [_jsx(TabsTrigger, { value: "A", className: "rounded-lg py-2.5 data-[state=active]:bg-card data-[state=active]:shadow-sm", children: "S\u00E9rie A" }), _jsx(TabsTrigger, { value: "C", className: "rounded-lg py-2.5 data-[state=active]:bg-card data-[state=active]:shadow-sm", children: "S\u00E9rie C" }), _jsx(TabsTrigger, { value: "D", className: "rounded-lg py-2.5 data-[state=active]:bg-card data-[state=active]:shadow-sm", children: "S\u00E9rie D" })] }) }), !selectedSubject ? (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: loadingSubjects ? (Array.from({ length: 8 }).map((_, i) => _jsx(Skeleton, { className: "h-40 rounded-2xl" }, i))) : subjects?.map((subject) => (_jsxs(Card, { className: "cursor-pointer hover:border-primary/50 hover:shadow-md transition-all rounded-2xl group overflow-hidden", onClick: () => setSelectedSubject(subject.id), children: [_jsx("div", { className: "h-2 w-full", style: { backgroundColor: subject.color || 'var(--primary)' } }), _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-start mb-4", children: [_jsx("div", { className: "w-12 h-12 rounded-xl flex items-center justify-center text-white", style: { backgroundColor: subject.color || 'var(--primary)' }, children: _jsx(BookOpen, { className: "w-6 h-6" }) }), _jsxs(Badge, { variant: "outline", className: "bg-background", children: [subject.lessonCount, " cours"] })] }), _jsx("h3", { className: "font-bold text-lg mb-1 group-hover:text-primary transition-colors", children: subject.name }), _jsx("p", { className: "text-sm text-muted-foreground line-clamp-2", children: subject.description || "Cours complet selon le programme." })] })] }, subject.id))) })) : (_jsxs("div", { className: "animate-in slide-in-from-right-4 fade-in duration-300", children: [_jsxs("button", { onClick: () => setSelectedSubject(null), className: "flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors", children: [_jsx(ChevronRight, { className: "w-4 h-4 rotate-180 mr-1" }), "Retour aux mati\u00E8res"] }), _jsxs("div", { className: "flex items-center gap-3 mb-6", children: [_jsx("h2", { className: "text-2xl font-bold", children: subjects?.find(s => s.id === selectedSubject)?.name }), _jsxs(Badge, { className: "bg-secondary text-secondary-foreground hover:bg-secondary", children: ["S\u00E9rie ", activeSeries] })] }), (() => {
                        const subjectName = subjects?.find(s => s.id === selectedSubject)?.name ?? "";
                        const splitByPart = isPhysiqueChimieSubject(subjectName);
                        const physiqueLessons = splitByPart ? (lessons ?? []).filter(l => !isChimieLesson(l.title)) : [];
                        const chimieLessons = splitByPart ? (lessons ?? []).filter(l => isChimieLesson(l.title)) : [];
                        const LessonCard = ({ lesson }) => (_jsx(Link, { href: `/lessons/${lesson.id}`, children: _jsxs("div", { className: "bg-card border border-border p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex flex-col h-full relative overflow-hidden group", children: [lesson.isPremium && !user?.isPremium && (_jsx("div", { className: "absolute top-0 right-0 w-16 h-16 overflow-hidden", children: _jsx("div", { className: "absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold w-24 text-center py-1 rotate-45 translate-x-[20px] translate-y-[10px] shadow-sm", children: "PREMIUM" }) })), _jsx("h3", { className: "font-bold text-lg mb-2 pr-8 group-hover:text-primary transition-colors", children: lesson.title }), _jsx("p", { className: "text-sm text-muted-foreground line-clamp-2 mb-4 flex-1", children: lesson.summary }), _jsxs("div", { className: "flex items-center justify-between mt-auto pt-4 border-t border-border/50", children: [_jsxs("div", { className: "flex items-center gap-3 text-muted-foreground", children: [lesson.videoUrl && _jsx(Play, { className: "w-4 h-4", title: "Vid\u00E9o disponible" }), lesson.audioUrl && _jsx(Headphones, { className: "w-4 h-4", title: "Audio disponible" }), lesson.pdfUrl && _jsx(FileText, { className: "w-4 h-4", title: "PDF disponible" })] }), lesson.isPremium && !user?.isPremium ? (_jsx(Lock, { className: "w-5 h-5 text-amber-500" })) : (_jsxs("span", { className: "text-sm font-semibold text-primary flex items-center", children: ["Commencer ", _jsx(ChevronRight, { className: "w-4 h-4 ml-1" })] }))] })] }) }, lesson.id));
                        if (loadingLessons) {
                            return (_jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: Array.from({ length: 4 }).map((_, i) => _jsx(Skeleton, { className: "h-32 rounded-2xl" }, i)) }));
                        }
                        if (!lessons?.length) {
                            return (_jsx("div", { className: "py-12 text-center text-muted-foreground border border-dashed rounded-2xl", children: "Aucun cours disponible pour cette mati\u00E8re actuellement." }));
                        }
                        if (splitByPart) {
                            return (_jsxs("div", { className: "space-y-10", children: [physiqueLessons.length > 0 && (_jsxs("section", { children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx("div", { className: "w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center", children: _jsx(Atom, { className: "w-5 h-5 text-blue-500" }) }), _jsx("h3", { className: "text-xl font-bold text-foreground", children: "Physique" }), _jsxs(Badge, { variant: "outline", className: "ml-1", children: [physiqueLessons.length, " le\u00E7ons"] })] }), _jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: physiqueLessons.map(lesson => _jsx(LessonCard, { lesson: lesson }, lesson.id)) })] })), chimieLessons.length > 0 && (_jsxs("section", { children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx("div", { className: "w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center", children: _jsx(FlaskConical, { className: "w-5 h-5 text-green-500" }) }), _jsx("h3", { className: "text-xl font-bold text-foreground", children: "Chimie" }), _jsxs(Badge, { variant: "outline", className: "ml-1", children: [chimieLessons.length, " le\u00E7ons"] })] }), _jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: chimieLessons.map(lesson => _jsx(LessonCard, { lesson: lesson }, lesson.id)) })] }))] }));
                        }
                        return (_jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: lessons.map(lesson => _jsx(LessonCard, { lesson: lesson }, lesson.id)) }));
                    })()] }))] }));
}
