import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { useAuth } from "@/hooks/use-auth";
import { useGetAdminStats, useGetAdminUsers } from "@workspace/api-client-react";
import { Redirect } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, BrainCircuit, FileText, Star, ShieldAlert } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminPanel() {
  const { user } = useAuth();
  
  if (user?.role !== 'admin') {
    return <Redirect to="/dashboard" />;
  }

  const { data: stats, isLoading: loadingStats } = useGetAdminStats();
  const { data: users, isLoading: loadingUsers } = useGetAdminUsers();

  return (
    <MainLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-3">
            <ShieldAlert className="text-destructive w-8 h-8" /> Administration
          </h1>
          <p className="text-muted-foreground mt-1">Supervisez la plateforme BAC MASTER CI.</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-muted/50 p-1 mb-8 rounded-xl">
          <TabsTrigger value="overview" className="rounded-lg">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="users" className="rounded-lg">Utilisateurs</TabsTrigger>
          <TabsTrigger value="content" className="rounded-lg text-muted-foreground" disabled>Gérer le contenu (Bientôt)</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {loadingStats ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[1,2,3,4,5,6].map(i => <Skeleton key={i} className="h-32 rounded-2xl" />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard title="Total Élèves" value={stats?.totalUsers || 0} icon={Users} color="text-blue-500" />
              <StatCard title="Comptes Premium" value={stats?.premiumUsers || 0} icon={Star} color="text-amber-500" />
              <StatCard title="Leçons" value={stats?.totalLessons || 0} icon={BookOpen} color="text-primary" />
              <StatCard title="Exercices" value={stats?.totalExercises || 0} icon={BrainCircuit} color="text-emerald-500" />
              <StatCard title="Annales" value={stats?.totalExams || 0} icon={FileText} color="text-purple-500" />
              <StatCard title="Avis laissés" value={stats?.totalReviews || 0} icon={Star} color="text-orange-500" />
            </div>
          )}
        </TabsContent>

        <TabsContent value="users">
          <Card className="rounded-3xl border-border shadow-sm">
            <CardHeader>
              <CardTitle className="font-display">Liste des élèves récents</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingUsers ? (
                <div className="space-y-4">
                  {[1,2,3].map(i => <Skeleton key={i} className="h-16 w-full rounded-xl" />)}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                      <tr>
                        <th className="px-6 py-4 rounded-tl-xl">Nom</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4">Série</th>
                        <th className="px-6 py-4">Points</th>
                        <th className="px-6 py-4 rounded-tr-xl">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {users?.map(u => (
                        <tr key={u.id} className="hover:bg-muted/20">
                          <td className="px-6 py-4 font-bold text-foreground">{u.name}</td>
                          <td className="px-6 py-4 text-muted-foreground">{u.email}</td>
                          <td className="px-6 py-4 font-semibold">{u.series}</td>
                          <td className="px-6 py-4">{u.points}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${u.isPremium ? 'bg-amber-500/10 text-amber-600' : 'bg-muted text-muted-foreground'}`}>
                              {u.isPremium ? 'Premium' : 'Standard'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}

function StatCard({ title, value, icon: Icon, color }: any) {
  return (
    <Card className="rounded-2xl border-border shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-muted/50 ${color}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
        <div>
          <h4 className="text-3xl font-display font-bold text-foreground">{value.toLocaleString()}</h4>
          <p className="text-sm font-medium text-muted-foreground mt-1">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
}
