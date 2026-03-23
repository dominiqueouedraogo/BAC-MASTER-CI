import { useState } from "react";
import { Redirect, Link } from "wouter";
import { MainLayout } from "@/components/layout/main-layout";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Search, ChevronLeft, Trophy, Shield } from "lucide-react";
import { useGetAdminUsers } from "@workspace/api-client-react";

export default function AdminUsers() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");

  if (user?.role !== "admin") return <Redirect to="/dashboard" />;

  const { data: users, isLoading } = useGetAdminUsers();

  const filtered = users?.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    (u.series || "").toLowerCase().includes(search.toLowerCase())
  );

  const seriesBadge = (series: string | null) => {
    const map: Record<string, string> = {
      A: "bg-purple-500/10 text-purple-600",
      C: "bg-blue-500/10 text-blue-600",
      D: "bg-emerald-500/10 text-emerald-600",
    };
    return map[series || ""] || "bg-muted text-muted-foreground";
  };

  return (
    <MainLayout>
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
            <ChevronLeft className="w-4 h-4" /> Admin
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" /> Gestion des Élèves
          </h1>
          <p className="text-sm text-muted-foreground">Consulter et gérer les comptes élèves.</p>
        </div>
      </div>

      <Card className="rounded-3xl border-border shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom, email ou série..."
                className="pl-9 rounded-xl bg-muted/50 border-0"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <span className="text-sm text-muted-foreground shrink-0">
              {filtered?.length ?? 0} élèves
            </span>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-16 w-full rounded-xl" />)}
            </div>
          ) : !filtered?.length ? (
            <div className="py-16 text-center text-muted-foreground">
              <Users className="w-12 h-12 mx-auto opacity-40 mb-3" />
              <p>Aucun élève trouvé.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-muted-foreground uppercase bg-muted/50">
                    <th className="text-left px-4 py-3 rounded-tl-xl">Nom</th>
                    <th className="text-left px-4 py-3">Email</th>
                    <th className="text-left px-4 py-3">Série</th>
                    <th className="text-left px-4 py-3">Points</th>
                    <th className="text-left px-4 py-3">Statut</th>
                    <th className="text-left px-4 py-3 rounded-tr-xl">Rôle</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {filtered.map(u => (
                    <tr key={u.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                            {u.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-semibold text-foreground">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-muted-foreground text-xs">{u.email}</td>
                      <td className="px-4 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${seriesBadge(u.series)}`}>
                          {u.series || "—"}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1.5">
                          <Trophy className="w-3.5 h-3.5 text-amber-500" />
                          <span className="font-semibold">{u.points ?? 0}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${u.isPremium ? "bg-amber-500/10 text-amber-600" : "bg-muted text-muted-foreground"}`}>
                          {u.isPremium ? "Premium" : "Standard"}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        {u.role === "admin" ? (
                          <div className="flex items-center gap-1.5 text-destructive">
                            <Shield className="w-3.5 h-3.5" />
                            <span className="text-xs font-bold uppercase">Admin</span>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">{u.role || "student"}</span>
                        )}
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
