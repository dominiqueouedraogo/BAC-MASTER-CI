import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useParams, Link } from "wouter";
import { MainLayout } from "src/components/layout/main-layout";
import { useAuth } from "src/hooks/use-auth";
import { Button } from "src/components/ui/button";
import { Skeleton } from "src/components/ui/skeleton";
import { useToast } from "src/hooks/use-toast";
import { ChevronLeft, FileDown, Lock, BookOpen, CheckCircle2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useUpgradeToPremium, getGetMeQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
async function fetchExam(id) {
    const res = await fetch(`/api/exams/${id}`);
    if (!res.ok)
        throw new Error("Not found");
    return res.json();
}
export default function ExamDetail() {
    const { id } = useParams();
    const examId = parseInt(id);
    const { user } = useAuth();
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [tab, setTab] = useState("subject");
    const { data: exam, isLoading } = useQuery({
        queryKey: ["exam", examId],
        queryFn: () => fetchExam(examId),
    });
    const upgradeMutation = useUpgradeToPremium();
    const isLocked = exam?.isPremium && !user?.isPremium;
    const handleUpgrade = () => {
        upgradeMutation.mutate(undefined, {
            onSuccess: (updatedUser) => {
                queryClient.setQueryData(getGetMeQueryKey(), updatedUser);
                toast({ title: "Compte Premium activé !", description: "Vous avez maintenant accès à tout le contenu." });
            },
            onError: () => {
                toast({ title: "Erreur", description: "Impossible d'activer le Premium.", variant: "destructive" });
            },
        });
    };
    return (_jsxs(MainLayout, { children: [_jsx("div", { className: "mb-6 flex items-center gap-3", children: _jsx(Link, { href: "/exams", children: _jsxs(Button, { variant: "ghost", size: "sm", className: "gap-2 text-muted-foreground", children: [_jsx(ChevronLeft, { className: "w-4 h-4" }), " Annales"] }) }) }), isLoading ? (_jsxs("div", { className: "space-y-4 max-w-4xl", children: [_jsx(Skeleton, { className: "h-10 w-2/3 rounded-xl" }), _jsx(Skeleton, { className: "h-6 w-1/3 rounded-xl" }), _jsx(Skeleton, { className: "h-96 w-full rounded-2xl" })] })) : !exam ? (_jsx("div", { className: "text-center py-20 text-muted-foreground", children: "Annale introuvable." })) : isLocked ? (_jsxs("div", { className: "max-w-2xl mx-auto text-center py-20", children: [_jsx("div", { className: "w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/20", children: _jsx(Lock, { className: "w-10 h-10 text-white" }) }), _jsx("h2", { className: "text-2xl font-display font-bold mb-3", children: "Contenu Premium" }), _jsx("p", { className: "text-muted-foreground mb-8", children: "Cette annale est r\u00E9serv\u00E9e aux membres Premium. Passez Premium pour acc\u00E9der au sujet et \u00E0 la correction." }), _jsx(Button, { size: "lg", onClick: handleUpgrade, disabled: upgradeMutation.isPending, className: "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 border-0 shadow-lg shadow-orange-500/25 px-8 rounded-xl h-12", children: "Passer Premium" })] })) : (_jsxs("div", { className: "max-w-4xl", children: [_jsxs("div", { className: "mb-6", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsxs("span", { className: "text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider", children: ["BAC ", exam.year] }), _jsxs("span", { className: "text-xs font-bold bg-muted text-muted-foreground px-3 py-1 rounded-full", children: ["S\u00E9rie ", exam.series] }), exam.isPremium && (_jsx("span", { className: "text-xs font-bold bg-amber-500/10 text-amber-600 px-3 py-1 rounded-full", children: "Premium" }))] }), _jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: exam.title }), exam.subjectName && _jsx("p", { className: "text-muted-foreground mt-1", children: exam.subjectName })] }), _jsxs("div", { className: "flex gap-2 mb-6 p-1 bg-muted/50 rounded-2xl w-fit", children: [_jsxs("button", { onClick: () => setTab("subject"), className: `flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === "subject" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`, children: [_jsx(BookOpen, { className: "w-4 h-4" }), " Sujet"] }), _jsxs("button", { onClick: () => setTab("correction"), className: `flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === "correction" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`, children: [_jsx(CheckCircle2, { className: "w-4 h-4" }), " Correction"] })] }), _jsx("div", { className: "bg-card border border-border rounded-3xl p-6 md:p-10 shadow-sm", children: tab === "subject" ? (exam.content ? (_jsx("div", { className: "prose prose-sm max-w-none dark:prose-invert", dangerouslySetInnerHTML: { __html: exam.content } })) : (_jsxs("div", { className: "text-center py-12 text-muted-foreground", children: [_jsx(BookOpen, { className: "w-10 h-10 mx-auto opacity-30 mb-3" }), _jsx("p", { children: "Le sujet n'a pas encore \u00E9t\u00E9 ajout\u00E9." })] }))) : (exam.correction ? (_jsx("div", { className: "prose prose-sm max-w-none dark:prose-invert", dangerouslySetInnerHTML: { __html: exam.correction } })) : (_jsxs("div", { className: "text-center py-12 text-muted-foreground", children: [_jsx(CheckCircle2, { className: "w-10 h-10 mx-auto opacity-30 mb-3" }), _jsx("p", { children: "La correction n'a pas encore \u00E9t\u00E9 ajout\u00E9e." })] }))) }), exam.pdfUrl && (_jsx("div", { className: "mt-4", children: _jsx("a", { href: exam.pdfUrl, target: "_blank", rel: "noopener noreferrer", children: _jsxs(Button, { variant: "outline", className: "gap-2 rounded-xl", children: [_jsx(FileDown, { className: "w-4 h-4" }), " T\u00E9l\u00E9charger le PDF"] }) }) }))] }))] }));
}
