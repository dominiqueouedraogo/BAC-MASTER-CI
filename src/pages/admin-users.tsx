import { useState } from "react";
import { Redirect, Link } from "wouter";
import { MainLayout } from "src/components/layout/main-layout";
import { useAuth } from "src/hooks/use-auth";
import { Card, CardContent, CardHeader } from "src/components/ui/card";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Badge } from "src/components/ui/badge";
import { Skeleton } from "src/components/ui/skeleton";
import { Users, Search, ChevronLeft, Trophy, Shield, CheckCircle2, XCircle, Star, UserCheck } from "lucide-react";
import { useGetAdminUsers } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { getGetAdminUsersQueryKey } from "@workspace/api-client-react";

type AdminUser = {
  id: number;
  name: string;
  email: string;
  series: string | null;
  role: string;
  avatarUrl: string | null;
  points: number | null;
  isPremium: boolean | null;
  replitId?: string | null;
  createdAt: string;
};

export default function AdminUsers() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [updating, setUpdating] = useState<number | null>(null);
  const queryClient = useQueryClient();

  if (user?.role !== "admin") return <Redirect to="/dashboard" />;

  const { data: users, isLoading } = useGetAdminUsers();

  const filtered = (users as AdminUser[] | undefined)?.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    (u.series || "").toLowerCase().includes(search.toLowerCase())
  );

  const seriesBadge = (series: string | null) => {
    const map: Record<string, string> = {
      A: "bg-purple-500/10 text-purple-600 border-purple-200",
      C: "bg-blue-500/10 text-blue-600 border-blue-200",
      D: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
    };
    return map[series || ""] || "bg-muted text-muted-foreground";
  };

  const patchUser = async (id: number, patch: Record<string, unknown>) => {
    setUpdating(id);
    try {
      const token = localStorage.getItem("bac_token");
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify(patch),
      });
      if (res.ok) {
        queryClient.invalidateQueries({ queryKey: getGetAdminUsersQueryKey() });
      }
    } finally {
      setUpdating(null);
    }
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
  };

  const totalUsers = users?.length ?? 0;
  const premiumCount = (users as AdminUser[] | undefined)?.filter(u => u.isPremium).length ?? 0;
  const replitCount = (users as AdminUser[] | undefined)?.filter(u => (u as AdminUser).replitId).length ?? 0;

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
            <Users className="w-6 h-6 text-primary" /> Gestion des Utilisateurs
          </h1>
          <p className="text-sm text-muted-foreground">Consulter et gérer tous les comptes.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="rounded-2xl border-border shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalUsers}</p>
              <p className="text-xs text-muted-foreground">Utilisateurs total</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-border shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Star className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{premiumCount}</p>
              <p className="text-xs text-muted-foreground">Comptes Premium</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-border shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{replitCount}</p>
              <p className="text-xs text-muted-foreground">Via Replit Auth</p>
            </div>
          </CardContent>
        </Card>
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
              {filtered?.length ?? 0} résultats
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
              <p>Aucun utilisateur trouvé.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-muted-foreground uppercase bg-muted/50">
                    <th className="text-left px-4 py-3 rounded-tl-xl">Utilisateur</th>
                    <th className="text-left px-4 py-3">Série</th>
                    <th className="text-left px-4 py-3">Points</th>
                    <th className="text-left px-4 py-3">Auth</th>
                    <th className="text-left px-4 py-3">Premium</th>
                    <th className="text-left px-4 py-3">Rôle</th>
                    <th className="text-left px-4 py-3 rounded-tr-xl">Inscrit le</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {filtered.map(u => {
                    const adminUser = u as AdminUser;
                    const isUpdating = updating === adminUser.id;
                    return (
                      <tr key={adminUser.id} className="hover:bg-muted/20 transition-colors">
                        {/* Name + email */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                              {adminUser.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-foreground leading-tight">{adminUser.name}</p>
                              <p className="text-xs text-muted-foreground">{adminUser.email}</p>
                            </div>
                          </div>
                        </td>

                        {/* Series selector */}
                        <td className="px-4 py-4">
                          <select
                            disabled={isUpdating || adminUser.role === "admin"}
                            value={adminUser.series || "A"}
                            onChange={e => patchUser(adminUser.id, { series: e.target.value })}
                            className={`text-xs font-bold px-2 py-1 rounded-full border cursor-pointer ${seriesBadge(adminUser.series)} disabled:cursor-default`}
                          >
                            <option value="A">A</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                          </select>
                        </td>

                        {/* Points */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1.5">
                            <Trophy className="w-3.5 h-3.5 text-amber-500" />
                            <span className="font-semibold">{adminUser.points ?? 0}</span>
                          </div>
                        </td>

                        {/* Auth method */}
                        <td className="px-4 py-4">
                          <div className="flex flex-col gap-1">
                            {adminUser.replitId ? (
                              <Badge className="text-[10px] bg-green-500/10 text-green-700 border-green-200 gap-1 w-fit">
                                <CheckCircle2 className="w-3 h-3" /> Replit
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-[10px] text-muted-foreground gap-1 w-fit">
                                <XCircle className="w-3 h-3" /> Email
                              </Badge>
                            )}
                          </div>
                        </td>

                        {/* Premium toggle */}
                        <td className="px-4 py-4">
                          <button
                            disabled={isUpdating}
                            onClick={() => patchUser(adminUser.id, { isPremium: !adminUser.isPremium })}
                            className={`px-2.5 py-1 rounded-full text-xs font-bold transition-colors ${
                              adminUser.isPremium
                                ? "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20"
                                : "bg-muted text-muted-foreground hover:bg-muted/80"
                            }`}
                          >
                            {adminUser.isPremium ? "Premium ✓" : "Standard"}
                          </button>
                        </td>

                        {/* Role toggle */}
                        <td className="px-4 py-4">
                          {adminUser.id === user?.id ? (
                            <div className="flex items-center gap-1.5 text-destructive">
                              <Shield className="w-3.5 h-3.5" />
                              <span className="text-xs font-bold uppercase">Admin</span>
                            </div>
                          ) : (
                            <button
                              disabled={isUpdating}
                              onClick={() => patchUser(adminUser.id, { role: adminUser.role === "admin" ? "student" : "admin" })}
                              className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full transition-colors ${
                                adminUser.role === "admin"
                                  ? "bg-destructive/10 text-destructive hover:bg-destructive/20"
                                  : "bg-muted text-muted-foreground hover:bg-muted/80"
                              }`}
                            >
                              {adminUser.role === "admin" ? (
                                <><Shield className="w-3 h-3" /> Admin</>
                              ) : "Élève"}
                            </button>
                          )}
                        </td>

                        {/* Registered date */}
                        <td className="px-4 py-4 text-xs text-muted-foreground whitespace-nowrap">
                          {formatDate(adminUser.createdAt)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </MainLayout>
  );
}
