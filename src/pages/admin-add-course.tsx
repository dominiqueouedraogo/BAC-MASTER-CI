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

interface Subject { id: number; name: string; series: string; }
interface ExerciseField { question: string; correctAnswer: string; explanation: string; options: string; type: string; difficulty: string; }

const SERIES_OPTIONS = ["ALL", "A", "C", "D"];

async function fetchSubjects(): Promise<Subject[]> {
  const res = await fetch("/api/admin/subjects");
  if (!res.ok) throw new Error("Failed to load subjects");
  return res.json();
}

async function fetchLesson(id: number) {
  const res = await fetch(`/api/lessons/${id}`);
  if (!res.ok) throw new Error("Not found");
  return res.json();
}

export default function AdminAddCourse() {
  const { user } = useAuth();
  const { id } = useParams<{ id?: string }>();
  const lessonId = id ? parseInt(id) : null;
  const isEdit = !!lessonId;
  const { toast } = useToast();

  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "", subjectId: "", series: "ALL", content: "", summary: "",
    keyPoints: "", examples: "", videoUrl: "", audioUrl: "", pdfUrl: "",
    isPremium: false, duration: "", order: "0",
  });
  const [exercises, setExercises] = useState<ExerciseField[]>([]);

  const { data: subjects } = useQuery({ queryKey: ["admin-subjects"], queryFn: fetchSubjects });
  const { data: lesson } = useQuery({
    queryKey: ["lesson", lessonId],
    queryFn: () => fetchLesson(lessonId!),
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

  if (user?.role !== "admin") return <Redirect to="/dashboard" />;

  const setField = (field: string, value: string | boolean) =>
    setForm(f => ({ ...f, [field]: value }));

  const addExercise = () =>
    setExercises(e => [...e, { question: "", correctAnswer: "", explanation: "", options: "", type: "mcq", difficulty: "medium" }]);

  const updateExercise = (i: number, field: string, value: string) =>
    setExercises(e => e.map((ex, idx) => idx === i ? { ...ex, [field]: value } : ex));

  const removeExercise = (i: number) =>
    setExercises(e => e.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: React.FormEvent) => {
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

      if (!res.ok) throw new Error("Failed to save");
      const savedLesson = await res.json();

      for (const ex of exercises) {
        if (!ex.question || !ex.correctAnswer) continue;
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
    } catch {
      toast({ title: "Erreur lors de l'enregistrement.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <MainLayout>
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin/courses">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
            <ChevronLeft className="w-4 h-4" /> Cours
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            {isEdit ? "Modifier le cours" : "Nouveau cours"}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        <Card className="rounded-3xl border-border shadow-sm">
          <CardHeader><CardTitle className="font-display text-lg">Informations générales</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Titre du cours *</Label>
              <Input id="title" value={form.title} onChange={e => setField("title", e.target.value)}
                placeholder="Ex: Les Suites Numériques" className="mt-1 rounded-xl" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="subject">Matière *</Label>
                <select
                  id="subject"
                  value={form.subjectId}
                  onChange={e => setField("subjectId", e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                >
                  <option value="">Choisir une matière...</option>
                  {subjects?.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.series})</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="series">Série</Label>
                <select
                  id="series"
                  value={form.series}
                  onChange={e => setField("series", e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {SERIES_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="duration">Durée (minutes)</Label>
                <Input id="duration" type="number" value={form.duration} onChange={e => setField("duration", e.target.value)}
                  placeholder="45" className="mt-1 rounded-xl" />
              </div>
              <div>
                <Label htmlFor="order">Ordre d'affichage</Label>
                <Input id="order" type="number" value={form.order} onChange={e => setField("order", e.target.value)}
                  placeholder="0" className="mt-1 rounded-xl" />
              </div>
            </div>

            <div>
              <Label htmlFor="summary">Résumé</Label>
              <Textarea id="summary" value={form.summary} onChange={e => setField("summary", e.target.value)}
                placeholder="Courte description du cours..." className="mt-1 rounded-xl resize-none" rows={2} />
            </div>

            <div className="flex items-center gap-3 pt-1">
              <input
                type="checkbox"
                id="isPremium"
                checked={form.isPremium}
                onChange={e => setField("isPremium", e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <Label htmlFor="isPremium" className="cursor-pointer">Contenu Premium (accès payant)</Label>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-border shadow-sm">
          <CardHeader><CardTitle className="font-display text-lg">Contenu pédagogique</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="content">Explication détaillée * (HTML supporté)</Label>
              <Textarea id="content" value={form.content} onChange={e => setField("content", e.target.value)}
                placeholder="<h2>Introduction</h2><p>Contenu du cours...</p>"
                className="mt-1 rounded-xl resize-y font-mono text-xs" rows={10} required />
            </div>

            <div>
              <Label htmlFor="keyPoints">Notions clés (une notion par ligne)</Label>
              <Textarea id="keyPoints" value={form.keyPoints} onChange={e => setField("keyPoints", e.target.value)}
                placeholder={"Définition de la suite arithmétique\nFormule du terme général\nSomme des termes"}
                className="mt-1 rounded-xl resize-none" rows={4} />
              <p className="text-xs text-muted-foreground mt-1">Saisir une notion clé par ligne.</p>
            </div>

            <div>
              <Label htmlFor="examples">Exemples résolus (HTML supporté)</Label>
              <Textarea id="examples" value={form.examples} onChange={e => setField("examples", e.target.value)}
                placeholder="<p><strong>Exemple 1 :</strong> Soit la suite...</p>"
                className="mt-1 rounded-xl resize-y font-mono text-xs" rows={6} />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-border shadow-sm">
          <CardHeader><CardTitle className="font-display text-lg">Ressources multimédia</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="videoUrl">Lien vidéo (YouTube embed URL)</Label>
              <Input id="videoUrl" value={form.videoUrl} onChange={e => setField("videoUrl", e.target.value)}
                placeholder="https://www.youtube.com/embed/..." className="mt-1 rounded-xl" />
            </div>
            <div>
              <Label htmlFor="audioUrl">Lien audio (podcast)</Label>
              <Input id="audioUrl" value={form.audioUrl} onChange={e => setField("audioUrl", e.target.value)}
                placeholder="https://example.com/audio.mp3" className="mt-1 rounded-xl" />
            </div>
            <div>
              <Label htmlFor="pdfUrl">Lien PDF</Label>
              <Input id="pdfUrl" value={form.pdfUrl} onChange={e => setField("pdfUrl", e.target.value)}
                placeholder="https://example.com/cours.pdf" className="mt-1 rounded-xl" />
            </div>
          </CardContent>
        </Card>

        {!isEdit && (
          <Card className="rounded-3xl border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-display text-lg">Exercices</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={addExercise} className="gap-2 rounded-xl">
                <Plus className="w-4 h-4" /> Ajouter
              </Button>
            </CardHeader>
            <CardContent>
              {exercises.length === 0 ? (
                <div className="text-center py-6 text-sm text-muted-foreground">
                  <p>Aucun exercice ajouté. Les exercices peuvent aussi être créés depuis le menu Exercices.</p>
                  <Button type="button" variant="outline" size="sm" onClick={addExercise} className="mt-3 gap-2 rounded-xl">
                    <Plus className="w-4 h-4" /> Premier exercice
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {exercises.map((ex, i) => (
                    <div key={i} className="border border-border rounded-2xl p-4 space-y-3 bg-muted/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-foreground">Exercice {i + 1}</span>
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeExercise(i)}
                          className="text-destructive hover:text-destructive gap-1">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Type</Label>
                          <select value={ex.type} onChange={e => updateExercise(i, "type", e.target.value)}
                            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm">
                            <option value="mcq">QCM</option>
                            <option value="open">Question ouverte</option>
                            <option value="true_false">Vrai/Faux</option>
                          </select>
                        </div>
                        <div>
                          <Label>Difficulté</Label>
                          <select value={ex.difficulty} onChange={e => updateExercise(i, "difficulty", e.target.value)}
                            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm">
                            <option value="easy">Facile (+10 pts)</option>
                            <option value="medium">Moyen (+20 pts)</option>
                            <option value="hard">Difficile (+30 pts)</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <Label>Question *</Label>
                        <Textarea value={ex.question} onChange={e => updateExercise(i, "question", e.target.value)}
                          placeholder="Quelle est la valeur de u₅ ?" className="mt-1 rounded-xl resize-none" rows={2} />
                      </div>
                      {ex.type === "mcq" && (
                        <div>
                          <Label>Options (une par ligne)</Label>
                          <Textarea value={ex.options} onChange={e => updateExercise(i, "options", e.target.value)}
                            placeholder={"Option A\nOption B\nOption C\nOption D"} className="mt-1 rounded-xl resize-none font-mono text-xs" rows={4} />
                        </div>
                      )}
                      <div>
                        <Label>Bonne réponse *</Label>
                        <Input value={ex.correctAnswer} onChange={e => updateExercise(i, "correctAnswer", e.target.value)}
                          placeholder="Option A" className="mt-1 rounded-xl" />
                      </div>
                      <div>
                        <Label>Explication</Label>
                        <Textarea value={ex.explanation} onChange={e => updateExercise(i, "explanation", e.target.value)}
                          placeholder="Car..." className="mt-1 rounded-xl resize-none" rows={2} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <div className="flex gap-3 pb-8">
          <Link href="/admin/courses">
            <Button type="button" variant="outline" className="rounded-xl">Annuler</Button>
          </Link>
          <Button type="submit" disabled={saving} className="rounded-xl gap-2">
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {isEdit ? "Enregistrer les modifications" : "Créer le cours"}
          </Button>
        </div>
      </form>
    </MainLayout>
  );
}
