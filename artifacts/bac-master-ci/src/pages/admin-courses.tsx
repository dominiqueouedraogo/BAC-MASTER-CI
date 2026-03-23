import { useState } from "react";
import { Link, Redirect } from "wouter";
import { MainLayout } from "@/components/layout/main-layout";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Search, BookOpen, ShieldAlert, ChevronLeft } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface AdminCourse {
  id: number;
  title: string;
  subjectName: string | null;
  series: string;
  isPremium: boolean;
  duration: number | null;
  order: number;
  createdAt: string;
}

async function fetchAdminCourses(): Promise<AdminCourse[]> {
  const res = await fetch("/api/admin/courses");
  if (!res.ok) throw new Error("Failed to load courses");
  return res.json();
}

async function deleteCourse(id: number): Promise<void> {
  const res = await fetch(`/api/admin/courses/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete course");
}

export default function AdminCourses() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  if (user?.role !== "admin") return <Redirect to="/dashboard" />;

  const { data: courses, isLoading } = useQuery({
    queryKey: ["admin-courses"],
    queryFn: fetchAdminCourses,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-courses"] });
      toast({ title: "Cours supprimé avec succès." });
    },
    onError: () => {
      toast({ title: "Erreur lors de la suppression.", variant: "destructive" });
    },
  });

  const filtered = courses?.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    (c.subjectName || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: number, title: string) => {
    if (!confirm(`Supprimer le cours "${title}" et tous ses exercices ?`)) return;
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
            <BookOpen className="w-6 h-6 text-primary" /> Gestion des Cours
          </h1>
          <p className="text-sm text-muted-foreground">Ajouter, modifier ou supprimer des cours.</p>
        </div>
        <Link href="/admin/add-course">
          <Button className="gap-2 rounded-xl">
            <Plus className="w-4 h-4" /> Nouveau cours
          </Button>
        </Link>
      </div>

      <Card className="rounded-3xl border-border shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un cours..."
                className="pl-9 rounded-xl bg-muted/50 border-0"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <span className="text-sm text-muted-foreground shrink-0">
              {filtered?.length ?? 0} cours
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
              <BookOpen className="w-12 h-12 mx-auto text-muted-foreground opacity-40 mb-3" />
              <p className="text-muted-foreground">Aucun cours trouvé.</p>
              <Link href="/admin/add-course">
                <Button className="mt-4 rounded-xl gap-2"><Plus className="w-4 h-4" /> Ajouter un cours</Button>
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
                    <th className="text-left px-4 py-3">Statut</th>
                    <th className="text-right px-4 py-3 rounded-tr-xl">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {filtered.map(course => (
                    <tr key={course.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{course.id}</td>
                      <td className="px-4 py-3">
                        <span className="font-semibold text-foreground">{course.title}</span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{course.subjectName || "—"}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary">
                          {course.series}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${course.isPremium ? "bg-amber-500/10 text-amber-600" : "bg-emerald-500/10 text-emerald-600"}`}>
                          {course.isPremium ? "Premium" : "Gratuit"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/edit-course/${course.id}`}>
                            <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-primary">
                              <Pencil className="w-3.5 h-3.5" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-1 text-muted-foreground hover:text-destructive"
                            onClick={() => handleDelete(course.id, course.title)}
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
