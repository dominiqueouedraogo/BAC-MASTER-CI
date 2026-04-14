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

interface AdminExam {
  id: number;
  title: string;
  subjectName: string | null;
  series: string;
  year: number;
  isPremium: boolean;
  createdAt: string;
}

async function fetchAdminExams(): Promise<AdminExam[]> {
  const token = localStorage.getItem("bac_token") || "";
  const res = await fetch("/api/admin/exams", { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error("Failed to load exams");
  return res.json();
}

async function deleteExam(id: number): Promise<void> {
  const token = localStorage.getItem("bac_token") || "";
  const res = await fetch(`/api/exams/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete exam");
}

export default function AdminExams() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  if (user?.role !== "admin") return <Redirect to="/dashboard" />;

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

  const filtered = exams?.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    (e.subjectName || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: number, title: string) => {
    if (!confirm(`Supprimer l'annale "${title}" ?`)) return;
    deleteMutation.mutate(id);
  };

  return (
    <MainLayout>
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
            <ChevronLeft className="w-4 h-4" /> Admin
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <FileText className="w-6 h-6 text-purple-500" /> Gestion des Annales
          </h1>
          <p className="text-sm text-muted-foreground">Ajouter, modifier ou supprimer des annales du BAC.</p>
        </div>
        <Link href="/admin/add-exam">
          <Button className="gap-2 rounded-xl">
            <Plus className="w-4 h-4" /> Nouvelle annale
          </Button>
        </Link>
      </div>

      <Card className="rounded-3xl border-border shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une annale..."
                className="pl-9 rounded-xl bg-muted/50 border-0"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <span className="text-sm text-muted-foreground shrink-0">
              {filtered?.length ?? 0} annales
            </span>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="h-14 w-full rounded-xl" />)}
            </div>
          ) : !filtered?.length ? (
            <div className="py-16 text-center">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground opacity-40 mb-3" />
              <p className="text-muted-foreground">Aucune annale trouvée.</p>
              <Link href="/admin/add-exam">
                <Button className="mt-4 rounded-xl gap-2"><Plus className="w-4 h-4" /> Ajouter une annale</Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-muted-foreground uppercase bg-muted/50">
                    <th className="text-left px-4 py-3 rounded-tl-xl">#</th>
                    <th className="text-left px-4 py-3">Titre</th>
                    <th className="text-left px-4 py-3">Matière</th>
                    <th className="text-left px-4 py-3">Série</th>
                    <th className="text-left px-4 py-3">Année</th>
                    <th className="text-left px-4 py-3">Statut</th>
                    <th className="text-right px-4 py-3 rounded-tr-xl">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {filtered.map(exam => (
                    <tr key={exam.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{exam.id}</td>
                      <td className="px-4 py-3">
                        <span className="font-semibold text-foreground">{exam.title}</span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{exam.subjectName || "—"}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary">
                          {exam.series}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-foreground">{exam.year}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${exam.isPremium ? "bg-amber-500/10 text-amber-600" : "bg-emerald-500/10 text-emerald-600"}`}>
                          {exam.isPremium ? "Premium" : "Gratuit"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/edit-exam/${exam.id}`}>
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                              <Pencil className="w-3.5 h-3.5" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-destructive"
                            onClick={() => handleDelete(exam.id, exam.title)}
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </MainLayout>
  );
}
