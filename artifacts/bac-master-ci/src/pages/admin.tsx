import { Link, Redirect } from "wouter";
import { MainLayout } from "@/components/layout/main-layout";
import { useAuth } from "@/hooks/use-auth";
import { useGetAdminStats } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, BookOpen, BrainCircuit, FileText, Star, ShieldAlert, BarChart2, Plus, ArrowRight } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

export default function AdminPanel() {
  const { user } = useAuth();

  if (user?.role !== "admin") {
    return <Redirect to="/dashboard" />;
  }

  const { data: stats, isLoading: loadingStats } = useGetAdminStats();

  const navCards = [
    {
      href: "/admin/courses",
      icon: BookOpen,
      label: "Gestion des Cours",
      description: "Lister, modifier et supprimer les cours.",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      href: "/admin/add-course",
      icon: Plus,
      label: "Ajouter un Cours",
      description: "Créer un nouveau cours avec exercices.",
      color: "text-emerald-600",
      bg: "bg-emerald-500/10",
    },
    {
      href: "/admin/exams",
      icon: FileText,
      label: "Gestion des Annales",
      description: "Ajouter, modifier et supprimer les annales.",
      color: "text-purple-600",
      bg: "bg-purple-500/10",
    },
    {
      href: "/admin/stats",
      icon: BarChart2,
      label: "Statistiques",
      description: "Activité, inscriptions, cours populaires.",
      color: "text-blue-600",
      bg: "bg-blue-500/10",
    },
    {
      href: "/admin/users",
      icon: Users,
      label: "Élèves",
      description: "Consulter et gérer les comptes élèves.",
      color: "text-orange-600",
      bg: "bg-orange-500/10",
    },
  ];

  return (
    <MainLayout>
      <div className="mb-8 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center">
          <ShieldAlert className="text-destructive w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Administration</h1>
          <p className="text-muted-foreground mt-0.5">Supervisez la plateforme BAC MASTER CI.</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {loadingStats ? (
          [1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-24 rounded-2xl" />)
        ) : (
          <>
            <StatCard title="Total Élèves" value={stats?.totalUsers || 0} icon={Users} color="text-blue-500" bg="bg-blue-500/10" />
            <StatCard title="Comptes Premium" value={stats?.premiumUsers || 0} icon={Star} color="text-amber-500" bg="bg-amber-500/10" />
            <StatCard title="Leçons" value={stats?.totalLessons || 0} icon={BookOpen} color="text-primary" bg="bg-primary/10" />
            <StatCard title="Exercices" value={stats?.totalExercises || 0} icon={BrainCircuit} color="text-emerald-500" bg="bg-emerald-500/10" />
            <StatCard title="Annales" value={stats?.totalExams || 0} icon={FileText} color="text-purple-500" bg="bg-purple-500/10" />
            <StatCard title="Avis reçus" value={stats?.totalReviews || 0} icon={Star} color="text-orange-500" bg="bg-orange-500/10" />
          </>
        )}
      </div>

      {/* Navigation Cards */}
      <h2 className="text-lg font-display font-bold text-foreground mb-4">Gérer la plateforme</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {navCards.map(card => (
          <Link key={card.href} href={card.href}>
            <Card className="rounded-2xl border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group">
              <CardContent className="p-6 flex items-center gap-5">
                <div className={`w-14 h-14 rounded-2xl ${card.bg} ${card.color} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                  <card.icon className="w-7 h-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-foreground text-base">{card.label}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{card.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </MainLayout>
  );
}

function StatCard({ title, value, icon: Icon, color, bg }: any) {
  return (
    <Card className="rounded-2xl border-border shadow-sm">
      <CardContent className="p-5 flex items-center gap-4">
        <div className={`w-10 h-10 rounded-xl ${bg} ${color} flex items-center justify-center shrink-0`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-2xl font-display font-bold text-foreground">{value.toLocaleString()}</h4>
          <p className="text-xs font-medium text-muted-foreground mt-0.5">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
}
