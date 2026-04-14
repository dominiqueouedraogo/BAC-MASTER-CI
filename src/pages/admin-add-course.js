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
import { ChevronLeft, Plus, Trash2, BookOpen, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
const SERIES_OPTIONS = ["ALL", "A", "C", "D"];
async function fetchSubjects() {
    const res = await fetch("/api/admin/subjects");
    if (!res.ok)
        throw new Error("Failed to load subjects");
    return res.json();
}
async function fetchLesson(id) {
    const res = await fetch(`/api/lessons/${id}`);
    if (!res.ok)
        throw new Error("Not found");
    return res.json();
}
export default function AdminAddCourse() {
    const { user } = useAuth();
    const { id } = useParams();
    const lessonId = id ? parseInt(id) : null;
    const isEdit = !!lessonId;
    const { toast } = useToast();
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        title: "", subjectId: "", series: "ALL", content: "", summary: "",
        keyPoints: "", examples: "", videoUrl: "", audioUrl: "", pdfUrl: "",
        isPremium: false, duration: "", order: "0",
    });
    const [exercises, setExercises] = useState([]);
    const { data: subjects } = useQuery({ queryKey: ["admin-subjects"], queryFn: fetchSubjects });
    const { data: lesson } = useQuery({
        queryKey: ["lesson", lessonId],
        queryFn: () => fetchLesson(lessonId),
        enabled: isEdit,
    });
    useEffect(() => {
        if (lesson) {
            setForm({
                title: lesson.title || "",
                subjectId: String(lesson.subjectId || ""),
                series: lesson.series || "ALL",
                content: lesson.content || "",
                summary: lesson.summary || "",
                keyPoints: lesson.keyPoints || "",
                examples: lesson.examples || "",
                videoUrl: lesson.videoUrl || "",
                audioUrl: lesson.audioUrl || "",
                pdfUrl: lesson.pdfUrl || "",
                isPremium: lesson.isPremium || false,
                duration: String(lesson.duration || ""),
                order: String(lesson.order || "0"),
            });
        }
    }, [lesson]);
    if (user?.role !== "admin")
        return _jsx(Redirect, { to: "/dashboard" });
    const setField = (field, value) => setForm(f => ({ ...f, [field]: value }));
    const addExercise = () => setExercises(e => [...e, { question: "", correctAnswer: "", explanation: "", options: "", type: "mcq", difficulty: "medium" }]);
    const updateExercise = (i, field, value) => setExercises(e => e.map((ex, idx) => idx === i ? { ...ex, [field]: value } : ex));
    const removeExercise = (i) => setExercises(e => e.filter((_, idx) => idx !== i));
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.title || !form.subjectId || !form.content) {
            toast({ title: "Titre, matière et contenu sont requis.", variant: "destructive" });
            return;
        }
        setSaving(true);
        try {
            const body = {
                title: form.title,
                subjectId: parseInt(form.subjectId),
                series: form.series,
                content: form.content,
                summary: form.summary || null,
                keyPoints: form.keyPoints || null,
                examples: form.examples || null,
                videoUrl: form.videoUrl || null,
                audioUrl: form.audioUrl || null,
                pdfUrl: form.pdfUrl || null,
                isPremium: form.isPremium,
                duration: form.duration ? parseInt(form.duration) : null,
                order: parseInt(form.order) || 0,
            };
            const url = isEdit ? `/api/lessons/${lessonId}` : "/api/lessons";
            const method = isEdit ? "PUT" : "POST";
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            if (!res.ok)
                throw new Error("Failed to save");
            const savedLesson = await res.json();
            for (const ex of exercises) {
                if (!ex.question || !ex.correctAnswer)
                    continue;
                const options = ex.options ? ex.options.split("\n").map(s => s.trim()).filter(Boolean) : [];
                await fetch("/api/exercises", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        lessonId: savedLesson.id,
                        subjectId: parseInt(form.subjectId),
                        series: form.series,
                        question: ex.question,
                        type: ex.type,
                        difficulty: ex.difficulty,
                        options: options.length > 0 ? options : null,
                        correctAnswer: ex.correctAnswer,
                        explanation: ex.explanation,
                        isPremium: false,
                    }),
                });
            }
            toast({ title: isEdit ? "Cours mis à jour !" : "Cours créé avec succès !" });
            window.location.href = import.meta.env.BASE_URL + "admin/courses";
        }
        catch {
            toast({ title: "Erreur lors de l'enregistrement.", variant: "destructive" });
        }
        finally {
            setSaving(false);
        }
    };
    return (_jsxs(MainLayout, { children: [_jsxs("div", { className: "mb-6 flex items-center gap-3", children: [_jsx(Link, { href: "/admin/courses", children: _jsxs(Button, { variant: "ghost", size: "sm", className: "gap-2 text-muted-foreground", children: [_jsx(ChevronLeft, { className: "w-4 h-4" }), " Cours"] }) }), _jsx("div", { children: _jsxs("h1", { className: "text-2xl font-display font-bold text-foreground flex items-center gap-2", children: [_jsx(BookOpen, { className: "w-6 h-6 text-primary" }), isEdit ? "Modifier le cours" : "Nouveau cours"] }) })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6 max-w-3xl", children: [_jsxs(Card, { className: "rounded-3xl border-border shadow-sm", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "font-display text-lg", children: "Informations g\u00E9n\u00E9rales" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "title", children: "Titre du cours *" }), _jsx(Input, { id: "title", value: form.title, onChange: e => setField("title", e.target.value), placeholder: "Ex: Les Suites Num\u00E9riques", className: "mt-1 rounded-xl", required: true })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "subject", children: "Mati\u00E8re *" }), _jsxs("select", { id: "subject", value: form.subjectId, onChange: e => setField("subjectId", e.target.value), className: "mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50", required: true, children: [_jsx("option", { value: "", children: "Choisir une mati\u00E8re..." }), subjects?.map(s => (_jsxs("option", { value: s.id, children: [s.name, " (", s.series, ")"] }, s.id)))] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "series", children: "S\u00E9rie" }), _jsx("select", { id: "series", value: form.series, onChange: e => setField("series", e.target.value), className: "mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50", children: SERIES_OPTIONS.map(s => _jsx("option", { value: s, children: s }, s)) })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "duration", children: "Dur\u00E9e (minutes)" }), _jsx(Input, { id: "duration", type: "number", value: form.duration, onChange: e => setField("duration", e.target.value), placeholder: "45", className: "mt-1 rounded-xl" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "order", children: "Ordre d'affichage" }), _jsx(Input, { id: "order", type: "number", value: form.order, onChange: e => setField("order", e.target.value), placeholder: "0", className: "mt-1 rounded-xl" })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "summary", children: "R\u00E9sum\u00E9" }), _jsx(Textarea, { id: "summary", value: form.summary, onChange: e => setField("summary", e.target.value), placeholder: "Courte description du cours...", className: "mt-1 rounded-xl resize-none", rows: 2 })] }), _jsxs("div", { className: "flex items-center gap-3 pt-1", children: [_jsx("input", { type: "checkbox", id: "isPremium", checked: form.isPremium, onChange: e => setField("isPremium", e.target.checked), className: "w-4 h-4 rounded" }), _jsx(Label, { htmlFor: "isPremium", className: "cursor-pointer", children: "Contenu Premium (acc\u00E8s payant)" })] })] })] }), _jsxs(Card, { className: "rounded-3xl border-border shadow-sm", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "font-display text-lg", children: "Contenu p\u00E9dagogique" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "content", children: "Explication d\u00E9taill\u00E9e * (HTML support\u00E9)" }), _jsx(Textarea, { id: "content", value: form.content, onChange: e => setField("content", e.target.value), placeholder: "<h2>Introduction</h2><p>Contenu du cours...</p>", className: "mt-1 rounded-xl resize-y font-mono text-xs", rows: 10, required: true })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "keyPoints", children: "Notions cl\u00E9s (une notion par ligne)" }), _jsx(Textarea, { id: "keyPoints", value: form.keyPoints, onChange: e => setField("keyPoints", e.target.value), placeholder: "Définition de la suite arithmétique\nFormule du terme général\nSomme des termes", className: "mt-1 rounded-xl resize-none", rows: 4 }), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Saisir une notion cl\u00E9 par ligne." })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "examples", children: "Exemples r\u00E9solus (HTML support\u00E9)" }), _jsx(Textarea, { id: "examples", value: form.examples, onChange: e => setField("examples", e.target.value), placeholder: "<p><strong>Exemple 1 :</strong> Soit la suite...</p>", className: "mt-1 rounded-xl resize-y font-mono text-xs", rows: 6 })] })] })] }), _jsxs(Card, { className: "rounded-3xl border-border shadow-sm", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "font-display text-lg", children: "Ressources multim\u00E9dia" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "videoUrl", children: "Lien vid\u00E9o (YouTube embed URL)" }), _jsx(Input, { id: "videoUrl", value: form.videoUrl, onChange: e => setField("videoUrl", e.target.value), placeholder: "https://www.youtube.com/embed/...", className: "mt-1 rounded-xl" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "audioUrl", children: "Lien audio (podcast)" }), _jsx(Input, { id: "audioUrl", value: form.audioUrl, onChange: e => setField("audioUrl", e.target.value), placeholder: "https://example.com/audio.mp3", className: "mt-1 rounded-xl" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "pdfUrl", children: "Lien PDF" }), _jsx(Input, { id: "pdfUrl", value: form.pdfUrl, onChange: e => setField("pdfUrl", e.target.value), placeholder: "https://example.com/cours.pdf", className: "mt-1 rounded-xl" })] })] })] }), !isEdit && (_jsxs(Card, { className: "rounded-3xl border-border shadow-sm", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [_jsx(CardTitle, { className: "font-display text-lg", children: "Exercices" }), _jsxs(Button, { type: "button", variant: "outline", size: "sm", onClick: addExercise, className: "gap-2 rounded-xl", children: [_jsx(Plus, { className: "w-4 h-4" }), " Ajouter"] })] }), _jsx(CardContent, { children: exercises.length === 0 ? (_jsxs("div", { className: "text-center py-6 text-sm text-muted-foreground", children: [_jsx("p", { children: "Aucun exercice ajout\u00E9. Les exercices peuvent aussi \u00EAtre cr\u00E9\u00E9s depuis le menu Exercices." }), _jsxs(Button, { type: "button", variant: "outline", size: "sm", onClick: addExercise, className: "mt-3 gap-2 rounded-xl", children: [_jsx(Plus, { className: "w-4 h-4" }), " Premier exercice"] })] })) : (_jsx("div", { className: "space-y-6", children: exercises.map((ex, i) => (_jsxs("div", { className: "border border-border rounded-2xl p-4 space-y-3 bg-muted/20", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("span", { className: "text-sm font-semibold text-foreground", children: ["Exercice ", i + 1] }), _jsx(Button, { type: "button", variant: "ghost", size: "sm", onClick: () => removeExercise(i), className: "text-destructive hover:text-destructive gap-1", children: _jsx(Trash2, { className: "w-4 h-4" }) })] }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("div", { children: [_jsx(Label, { children: "Type" }), _jsxs("select", { value: ex.type, onChange: e => updateExercise(i, "type", e.target.value), className: "mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm", children: [_jsx("option", { value: "mcq", children: "QCM" }), _jsx("option", { value: "open", children: "Question ouverte" }), _jsx("option", { value: "true_false", children: "Vrai/Faux" })] })] }), _jsxs("div", { children: [_jsx(Label, { children: "Difficult\u00E9" }), _jsxs("select", { value: ex.difficulty, onChange: e => updateExercise(i, "difficulty", e.target.value), className: "mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm", children: [_jsx("option", { value: "easy", children: "Facile (+10 pts)" }), _jsx("option", { value: "medium", children: "Moyen (+20 pts)" }), _jsx("option", { value: "hard", children: "Difficile (+30 pts)" })] })] })] }), _jsxs("div", { children: [_jsx(Label, { children: "Question *" }), _jsx(Textarea, { value: ex.question, onChange: e => updateExercise(i, "question", e.target.value), placeholder: "Quelle est la valeur de u\u2085 ?", className: "mt-1 rounded-xl resize-none", rows: 2 })] }), ex.type === "mcq" && (_jsxs("div", { children: [_jsx(Label, { children: "Options (une par ligne)" }), _jsx(Textarea, { value: ex.options, onChange: e => updateExercise(i, "options", e.target.value), placeholder: "Option A\nOption B\nOption C\nOption D", className: "mt-1 rounded-xl resize-none font-mono text-xs", rows: 4 })] })), _jsxs("div", { children: [_jsx(Label, { children: "Bonne r\u00E9ponse *" }), _jsx(Input, { value: ex.correctAnswer, onChange: e => updateExercise(i, "correctAnswer", e.target.value), placeholder: "Option A", className: "mt-1 rounded-xl" })] }), _jsxs("div", { children: [_jsx(Label, { children: "Explication" }), _jsx(Textarea, { value: ex.explanation, onChange: e => updateExercise(i, "explanation", e.target.value), placeholder: "Car...", className: "mt-1 rounded-xl resize-none", rows: 2 })] })] }, i))) })) })] })), _jsxs("div", { className: "flex gap-3 pb-8", children: [_jsx(Link, { href: "/admin/courses", children: _jsx(Button, { type: "button", variant: "outline", className: "rounded-xl", children: "Annuler" }) }), _jsxs(Button, { type: "submit", disabled: saving, className: "rounded-xl gap-2", children: [saving && _jsx(Loader2, { className: "w-4 h-4 animate-spin" }), isEdit ? "Enregistrer les modifications" : "Créer le cours"] })] })] })] }));
}
