import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link, Redirect } from "wouter";
import { MainLayout } from "src/components/layout/main-layout";
import { useAuth } from "src/hooks/use-auth";
import { Card, CardContent, CardHeader } from "src/components/ui/card";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Skeleton } from "src/components/ui/skeleton";
import { useToast } from "src/hooks/use-toast";
import { Plus, Pencil, Trash2, Search, FileText, ChevronLeft } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
async function fetchAdminExams() {
    const token = localStorage.getItem("bac_token") || "";
    const res = await fetch("/api/admin/exams", { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok)
        throw new Error("Failed to load exams");
    return res.json();
}
async function deleteExam(id) {
    const token = localStorage.getItem("bac_token") || "";
    const res = await fetch(`/api/exams/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok)
        throw new Error("Failed to delete exam");
}
export default function AdminExams() {
    const { user } = useAuth();
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");
    if (user?.role !== "admin")
        return _jsx(Redirect, { to: "/dashboard" });
    const { data: exams, isLoading } = useQuery({
        queryKey: ["admin-exams"],
        queryFn: fetchAdminExams,
    });
    const deleteMutation = useMutation({
        mutationFn: deleteExam,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-exams"] });
            toast({ title: "Annale supprimée avec succès." });
        },
        onError: () => {
            toast({ title: "Erreur lors de la suppression.", variant: "destructive" });
        },
    });
    const filtered = exams?.filter(e => e.title.toLowerCase().includes(search.toLowerCase()) ||
        (e.subjectName || "").toLowerCase().includes(search.toLowerCase()));
    const handleDelete = (id, title) => {
        if (!confirm(`Supprimer l'annale "${title}" ?`))
            return;
        deleteMutation.mutate(id);
    };
    return (_jsxs(MainLayout, { children: [_jsxs("div", { className: "mb-6 flex items-center gap-3", children: [_jsx(Link, { href: "/admin", children: _jsxs(Button, { variant: "ghost", size: "sm", className: "gap-2 text-muted-foreground", children: [_jsx(ChevronLeft, { className: "w-4 h-4" }), " Admin"] }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("h1", { className: "text-2xl font-display font-bold text-foreground flex items-center gap-2", children: [_jsx(FileText, { className: "w-6 h-6 text-purple-500" }), " Gestion des Annales"] }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Ajouter, modifier ou supprimer des annales du BAC." })] }), _jsx(Link, { href: "/admin/add-exam", children: _jsxs(Button, { className: "gap-2 rounded-xl", children: [_jsx(Plus, { className: "w-4 h-4" }), " Nouvelle annale"] }) })] }), _jsxs(Card, { className: "rounded-3xl border-border shadow-sm", children: [_jsx(CardHeader, { className: "pb-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Rechercher une annale...", className: "pl-9 rounded-xl bg-muted/50 border-0", value: search, onChange: e => setSearch(e.target.value) })] }), _jsxs("span", { className: "text-sm text-muted-foreground shrink-0", children: [filtered?.length ?? 0, " annales"] })] }) }), _jsx(CardContent, { children: isLoading ? (_jsx("div", { className: "space-y-3", children: [1, 2, 3, 4, 5].map(i => _jsx(Skeleton, { className: "h-14 w-full rounded-xl" }, i)) })) : !filtered?.length ? (_jsxs("div", { className: "py-16 text-center", children: [_jsx(FileText, { className: "w-12 h-12 mx-auto text-muted-foreground opacity-40 mb-3" }), _jsx("p", { className: "text-muted-foreground", children: "Aucune annale trouv\u00E9e." }), _jsx(Link, { href: "/admin/add-exam", children: _jsxs(Button, { className: "mt-4 rounded-xl gap-2", children: [_jsx(Plus, { className: "w-4 h-4" }), " Ajouter une annale"] }) })] })) : (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { children: _jsxs("tr", { className: "text-xs text-muted-foreground uppercase bg-muted/50", children: [_jsx("th", { className: "text-left px-4 py-3 rounded-tl-xl", children: "#" }), _jsx("th", { className: "text-left px-4 py-3", children: "Titre" }), _jsx("th", { className: "text-left px-4 py-3", children: "Mati\u00E8re" }), _jsx("th", { className: "text-left px-4 py-3", children: "S\u00E9rie" }), _jsx("th", { className: "text-left px-4 py-3", children: "Ann\u00E9e" }), _jsx("th", { className: "text-left px-4 py-3", children: "Statut" }), _jsx("th", { className: "text-right px-4 py-3 rounded-tr-xl", children: "Actions" })] }) }), _jsx("tbody", { className: "divide-y divide-border/50", children: filtered.map(exam => (_jsxs("tr", { className: "hover:bg-muted/20 transition-colors", children: [_jsx("td", { className: "px-4 py-3 text-muted-foreground font-mono text-xs", children: exam.id }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: "font-semibold text-foreground", children: exam.title }) }), _jsx("td", { className: "px-4 py-3 text-muted-foreground", children: exam.subjectName || "—" }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: "px-2 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary", children: exam.series }) }), _jsx("td", { className: "px-4 py-3 font-semibold text-foreground", children: exam.year }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: `px-2 py-0.5 rounded-full text-xs font-bold ${exam.isPremium ? "bg-amber-500/10 text-amber-600" : "bg-emerald-500/10 text-emerald-600"}`, children: exam.isPremium ? "Premium" : "Gratuit" }) }), _jsx("td", { className: "px-4 py-3", children: _jsxs("div", { className: "flex items-center justify-end gap-2", children: [_jsx(Link, { href: `/admin/edit-exam/${exam.id}`, children: _jsx(Button, { variant: "ghost", size: "sm", className: "text-muted-foreground hover:text-primary", children: _jsx(Pencil, { className: "w-3.5 h-3.5" }) }) }), _jsx(Button, { variant: "ghost", size: "sm", className: "text-muted-foreground hover:text-destructive", onClick: () => handleDelete(exam.id, exam.title), disabled: deleteMutation.isPending, children: _jsx(Trash2, { className: "w-3.5 h-3.5" }) })] }) })] }, exam.id))) })] }) })) })] })] }));
}
