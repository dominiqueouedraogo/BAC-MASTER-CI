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

interface Subject { id: number; name: string; series: string; }

const SERIES_OPTIONS = ["A", "C", "D"];
const YEARS = Array.from({ length: 15 }, (_, i) => String(new Date().getFullYear() - i));

async function fetchSubjects(): Promise<Subject[]> {
  const token = localStorage.getItem("bac_token") || "";
  const res = await fetch("/api/admin/subjects", { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error("Failed to load subjects");
  return res.json();
}

async function fetchExam(id: number) {
  const res = await fetch(`/api/exams/${id}`);
  if (!res.ok) throw new Error("Not found");
  return res.json();
}

export default function AdminAddExam() {
  const { user } = useAuth();
  const { id } = useParams<{ id?: string }>();
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
    queryFn: () => fetchExam(examId!),
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

  if (user?.role !== "admin") return <Redirect to="/dashboard" />;

  const setField = (field: string, value: string | boolean) =>
    setForm(f => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
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

      if (!res.ok) throw new Error("Failed to save");

      toast({ title: isEdit ? "Annale mise à jour !" : "Annale créée avec succès !" });
      window.location.href = import.meta.env.BASE_URL + "admin/exams";
    } catch {
      toast({ title: "Erreur lors de l'enregistrement.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <MainLayout>
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin/exams">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
            <ChevronLeft className="w-4 h-4" /> Annales
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <FileText className="w-6 h-6 text-purple-500" />
            {isEdit ? "Modifier l'annale" : "Nouvelle annale"}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        <Card className="rounded-3xl border-border shadow-sm">
          <CardHeader><CardTitle className="font-display text-lg">Informations générales</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Titre de l'annale *</Label>
              <Input id="title" value={form.title} onChange={e => setField("title", e.target.value)}
                placeholder="Ex: Mathématiques BAC 2023 - Série C" className="mt-1 rounded-xl" required />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="subject">Matière *</Label>
                <select
                  id="subject"
                  value={form.subjectId}
                  onChange={e => setField("subjectId", e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                >
                  <option value="">Choisir...</option>
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
              <div>
                <Label htmlFor="year">Année</Label>
                <select
                  id="year"
                  value={form.year}
                  onChange={e => setField("year", e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="pdfUrl">Lien PDF (optionnel)</Label>
              <Input id="pdfUrl" value={form.pdfUrl} onChange={e => setField("pdfUrl", e.target.value)}
                placeholder="https://example.com/annale.pdf" className="mt-1 rounded-xl" />
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
          <CardHeader><CardTitle className="font-display text-lg">Sujet</CardTitle></CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="content">Contenu du sujet (HTML supporté)</Label>
              <Textarea id="content" value={form.content} onChange={e => setField("content", e.target.value)}
                placeholder="<h2>Partie I</h2><p>Soit f la fonction définie par...</p>"
                className="mt-1 rounded-xl resize-y font-mono text-xs" rows={10} />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-border shadow-sm">
          <CardHeader><CardTitle className="font-display text-lg">Correction</CardTitle></CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="correction">Correction détaillée (HTML supporté)</Label>
              <Textarea id="correction" value={form.correction} onChange={e => setField("correction", e.target.value)}
                placeholder="<h2>Correction Partie I</h2><p>On a f(x) = ...</p>"
                className="mt-1 rounded-xl resize-y font-mono text-xs" rows={10} />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3 pb-8">
          <Link href="/admin/exams">
            <Button type="button" variant="outline" className="rounded-xl">Annuler</Button>
          </Link>
          <Button type="submit" disabled={saving} className="rounded-xl gap-2">
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {isEdit ? "Enregistrer les modifications" : "Créer l'annale"}
          </Button>
        </div>
      </form>
    </MainLayout>
  );
}
