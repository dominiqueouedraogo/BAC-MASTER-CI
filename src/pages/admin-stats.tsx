import { Redirect, Link } from "wouter";
import { MainLayout } from "src/components/layout/main-layout";
import { useAuth } from "src/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "src/components/ui/card";
import { Skeleton } from "src/components/ui/skeleton";
import { Button } from "src/components/ui/button";
import { BarChart2, Users, BookOpen, Trophy, ChevronLeft, TrendingUp, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell,
  PieChart, Pie, Legend, AreaChart, Area,
} from "recharts";

async function fetchStats() {
  const res = await fetch("/api/admin/stats");
  if (!res.ok) throw new Error("Failed to load stats");
  return res.json();
}

async function fetchActivity() {
  const res = await fetch("/api/admin/activity");
  if (!res.ok) throw new Error("Failed to load activity");
  return res.json();
}

const SERIES_COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ec4899"];

export default function AdminStats() {
  const { user } = useAuth();
  if (user?.role !== "admin") return <Redirect to="/dashboard" />;

  const { data: stats, isLoading: loadingStats } = useQuery({ queryKey: ["admin-stats"], queryFn: fetchStats });
  const { data: activity, isLoading: loadingActivity } = useQuery({ queryKey: ["admin-activity"], queryFn: fetchActivity });

  const overviewCards = [
    { title: "Total Élèves", value: stats?.totalUsers || 0, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Leçons publiées", value: stats?.totalLessons || 0, icon: BookOpen, color: "text-primary", bg: "bg-primary/10" },
    { title: "Exercices", value: stats?.totalExercises || 0, icon: Trophy, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Avis reçus", value: stats?.totalReviews || 0, icon: Star, color: "text-amber-500", bg: "bg-amber-500/10" },
  ];

  const regData = activity?.dailyRegistrations?.map((r: any) => ({
    day: r.day,
    count: Number(r.count),
  })) || [];

  const seriesData = activity?.seriesBreakdown?.map((r: any, i: number) => ({
    name: `Série ${r.series}`,
    value: Number(r.count),
    fill: SERIES_COLORS[i % SERIES_COLORS.length],
  })) || [];

  const topLessons = activity?.topLessons || [];

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
            <BarChart2 className="w-6 h-6 text-primary" /> Statistiques & Analytiques
          </h1>
          <p className="text-sm text-muted-foreground">Suivi de l'activité de la plateforme.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {loadingStats
          ? [1, 2, 3, 4].map(i => <Skeleton key={i} className="h-28 rounded-2xl" />)
          : overviewCards.map(card => (
            <Card key={card.title} className="rounded-2xl shadow-sm border-border">
              <CardContent className="p-5 flex items-center gap-4">
                <div className={`w-11 h-11 rounded-xl ${card.bg} ${card.color} flex items-center justify-center shrink-0`}>
                  <card.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">{card.title}</p>
                  <p className="text-2xl font-display font-bold text-foreground">{card.value.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2 rounded-2xl shadow-sm border-border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" /> Inscriptions (7 derniers jours)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loadingActivity ? (
              <Skeleton className="h-48 w-full rounded-xl" />
            ) : regData.length === 0 ? (
              <div className="h-48 flex items-center justify-center text-sm text-muted-foreground">
                Aucune inscription récente.
              </div>
            ) : (
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={regData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                    <XAxis dataKey="day" axisLine={false} tickLine={false}
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false}
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} allowDecimals={false} />
                    <Tooltip
                      contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0/0.1)" }}
                      formatter={(v: number) => [v, "Inscriptions"]}
                    />
                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm border-border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-500" /> Répartition par série
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loadingActivity ? (
              <Skeleton className="h-48 w-full rounded-xl" />
            ) : seriesData.length === 0 ? (
              <div className="h-48 flex items-center justify-center text-sm text-muted-foreground">
                Aucune donnée disponible.
              </div>
            ) : (
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={seriesData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                      {seriesData.map((entry: any, i: number) => (
                        <Cell key={i} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: number) => [v, "Élèves"]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl shadow-sm border-border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-500" /> Cours les plus consultés
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loadingActivity ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-10 rounded-xl" />)}
            </div>
          ) : topLessons.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              Aucune donnée de consultation disponible.
            </p>
          ) : (
            <div className="space-y-3">
              {topLessons.map((lesson: any, i: number) => (
                <div key={lesson.lessonId} className="flex items-center gap-4">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{lesson.title || `Cours #${lesson.lessonId}`}</p>
                  </div>
                  <span className="text-sm text-muted-foreground shrink-0">{lesson.views} vues</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </MainLayout>
  );
}
