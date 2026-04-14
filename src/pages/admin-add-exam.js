import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Redirect, useParams, Link } from "wouter";
import { MainLayout } from "src/components/layout/main-layout";
import { useAuth } from "src/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "src/components/ui/card";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Textarea } from "src/components/ui/textarea";
import { Label } from "src/components/ui/label";
import { useToast } from "src/hooks/use-toast";
import { ChevronLeft, FileText, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
const SERIES_OPTIONS = ["A", "C", "D"];
const YEARS = Array.from({ length: 15 }, (_, i) => String(new Date().getFullYear() - i));
async function fetchSubjects() {
    const token = localStorage.getItem("bac_token") || "";
    const res = await fetch("/api/admin/subjects", { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok)
        throw new Error("Failed to load subjects");
    return res.json();
}
async function fetchExam(id) {
    const res = await fetch(`/api/exams/${id}`);
    if (!res.ok)
        throw new Error("Not found");
    return res.json();
}
export default function AdminAddExam() {
    const { user } = useAuth();
    const { id } = useParams();
    const examId = id ? parseInt(id) : null;
    const isEdit = !!examId;
    const { toast } = useToast();
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        title: "",
        subjectId: "",
        series: "A",
        year: String(new Date().getFullYear()),
        content: "",
        correction: "",
        pdfUrl: "",
        isPremium: false,
    });
    const { data: subjects } = useQuery({ queryKey: ["admin-subjects"], queryFn: fetchSubjects });
    const { data: exam } = useQuery({
        queryKey: ["exam", examId],
        queryFn: () => fetchExam(examId),
        enabled: isEdit,
    });
    useEffect(() => {
        if (exam) {
            setForm({
                title: exam.title || "",
                subjectId: String(exam.subjectId || ""),
                series: exam.series || "A",
                year: String(exam.year || new Date().getFullYear()),
                content: exam.content || "",
                correction: exam.correction || "",
                pdfUrl: exam.pdfUrl || "",
                isPremium: exam.isPremium || false,
            });
        }
    }, [exam]);
    if (user?.role !== "admin")
        return _jsx(Redirect, { to: "/dashboard" });
    const setField = (field, value) => setForm(f => ({ ...f, [field]: value }));
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.title || !form.subjectId) {
            toast({ title: "Titre et matière sont requis.", variant: "destructive" });
            return;
        }
        setSaving(true);
        try {
            const token = localStorage.getItem("bac_token") || "";
            const body = {
                title: form.title,
                subjectId: parseInt(form.subjectId),
                series: form.series,
                year: parseInt(form.year),
                content: form.content || null,
                correction: form.correction || null,
                pdfUrl: form.pdfUrl || null,
                isPremium: form.isPremium,
            };
            const url = isEdit ? `/api/exams/${examId}` : "/api/exams";
            const method = isEdit ? "PUT" : "POST";
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify(body),
            });
            if (!res.ok)
                throw new Error("Failed to save");
            toast({ title: isEdit ? "Annale mise à jour !" : "Annale créée avec succès !" });
            window.location.href = import.meta.env.BASE_URL + "admin/exams";
        }
        catch {
            toast({ title: "Erreur lors de l'enregistrement.", variant: "destructive" });
        }
        finally {
            setSaving(false);
        }
    };
    return (_jsxs(MainLayout, { children: [_jsxs("div", { className: "mb-6 flex items-center gap-3", children: [_jsx(Link, { href: "/admin/exams", children: _jsxs(Button, { variant: "ghost", size: "sm", className: "gap-2 text-muted-foreground", children: [_jsx(ChevronLeft, { className: "w-4 h-4" }), " Annales"] }) }), _jsx("div", { children: _jsxs("h1", { className: "text-2xl font-display font-bold text-foreground flex items-center gap-2", children: [_jsx(FileText, { className: "w-6 h-6 text-purple-500" }), isEdit ? "Modifier l'annale" : "Nouvelle annale"] }) })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6 max-w-3xl", children: [_jsxs(Card, { className: "rounded-3xl border-border shadow-sm", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "font-display text-lg", children: "Informations g\u00E9n\u00E9rales" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "title", children: "Titre de l'annale *" }), _jsx(Input, { id: "title", value: form.title, onChange: e => setField("title", e.target.value), placeholder: "Ex: Math\u00E9matiques BAC 2023 - S\u00E9rie C", className: "mt-1 rounded-xl", required: true })] }), _jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "subject", children: "Mati\u00E8re *" }), _jsxs("select", { id: "subject", value: form.subjectId, onChange: e => setField("subjectId", e.target.value), className: "mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50", required: true, children: [_jsx("option", { value: "", children: "Choisir..." }), subjects?.map(s => (_jsxs("option", { value: s.id, children: [s.name, " (", s.series, ")"] }, s.id)))] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "series", children: "S\u00E9rie" }), _jsx("select", { id: "series", value: form.series, onChange: e => setField("series", e.target.value), className: "mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50", children: SERIES_OPTIONS.map(s => _jsx("option", { value: s, children: s }, s)) })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "year", children: "Ann\u00E9e" }), _jsx("select", { id: "year", value: form.year, onChange: e => setField("year", e.target.value), className: "mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50", children: YEARS.map(y => _jsx("option", { value: y, children: y }, y)) })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "pdfUrl", children: "Lien PDF (optionnel)" }), _jsx(Input, { id: "pdfUrl", value: form.pdfUrl, onChange: e => setField("pdfUrl", e.target.value), placeholder: "https://example.com/annale.pdf", className: "mt-1 rounded-xl" })] }), _jsxs("div", { className: "flex items-center gap-3 pt-1", children: [_jsx("input", { type: "checkbox", id: "isPremium", checked: form.isPremium, onChange: e => setField("isPremium", e.target.checked), className: "w-4 h-4 rounded" }), _jsx(Label, { htmlFor: "isPremium", className: "cursor-pointer", children: "Contenu Premium (acc\u00E8s payant)" })] })] })] }), _jsxs(Card, { className: "rounded-3xl border-border shadow-sm", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "font-display text-lg", children: "Sujet" }) }), _jsx(CardContent, { children: _jsxs("div", { children: [_jsx(Label, { htmlFor: "content", children: "Contenu du sujet (HTML support\u00E9)" }), _jsx(Textarea, { id: "content", value: form.content, onChange: e => setField("content", e.target.value), placeholder: "<h2>Partie I</h2><p>Soit f la fonction d\u00E9finie par...</p>", className: "mt-1 rounded-xl resize-y font-mono text-xs", rows: 10 })] }) })] }), _jsxs(Card, { className: "rounded-3xl border-border shadow-sm", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "font-display text-lg", children: "Correction" }) }), _jsx(CardContent, { children: _jsxs("div", { children: [_jsx(Label, { htmlFor: "correction", children: "Correction d\u00E9taill\u00E9e (HTML support\u00E9)" }), _jsx(Textarea, { id: "correction", value: form.correction, onChange: e => setField("correction", e.target.value), placeholder: "<h2>Correction Partie I</h2><p>On a f(x) = ...</p>", className: "mt-1 rounded-xl resize-y font-mono text-xs", rows: 10 })] }) })] }), _jsxs("div", { className: "flex gap-3 pb-8", children: [_jsx(Link, { href: "/admin/exams", children: _jsx(Button, { type: "button", variant: "outline", className: "rounded-xl", children: "Annuler" }) }), _jsxs(Button, { type: "submit", disabled: saving, className: "rounded-xl gap-2", children: [saving && _jsx(Loader2, { className: "w-4 h-4 animate-spin" }), isEdit ? "Enregistrer les modifications" : "Créer l'annale"] })] })] })] }));
}
