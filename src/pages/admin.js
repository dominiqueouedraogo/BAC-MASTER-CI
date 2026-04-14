import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link, Redirect } from "wouter";
import { MainLayout } from "src/components/layout/main-layout";
import { useAuth } from "src/hooks/use-auth";
import { useGetAdminStats } from "@workspace/api-client-react";
import { Card, CardContent } from "src/components/ui/card";
import { Users, BookOpen, BrainCircuit, FileText, Star, ShieldAlert, BarChart2, Plus, ArrowRight } from "lucide-react";
import { Skeleton } from "src/components/ui/skeleton";
export default function AdminPanel() {
    const { user } = useAuth();
    if (user?.role !== "admin") {
        return _jsx(Redirect, { to: "/dashboard" });
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
    return (_jsxs(MainLayout, { children: [_jsxs("div", { className: "mb-8 flex items-center gap-4", children: [_jsx("div", { className: "w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center", children: _jsx(ShieldAlert, { className: "text-destructive w-6 h-6" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-display font-bold text-foreground", children: "Administration" }), _jsx("p", { className: "text-muted-foreground mt-0.5", children: "Supervisez la plateforme BAC MASTER CI." })] })] }), _jsx("div", { className: "grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10", children: loadingStats ? ([1, 2, 3, 4, 5, 6].map(i => _jsx(Skeleton, { className: "h-24 rounded-2xl" }, i))) : (_jsxs(_Fragment, { children: [_jsx(StatCard, { title: "Total \u00C9l\u00E8ves", value: stats?.totalUsers || 0, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" }), _jsx(StatCard, { title: "Comptes Premium", value: stats?.premiumUsers || 0, icon: Star, color: "text-amber-500", bg: "bg-amber-500/10" }), _jsx(StatCard, { title: "Le\u00E7ons", value: stats?.totalLessons || 0, icon: BookOpen, color: "text-primary", bg: "bg-primary/10" }), _jsx(StatCard, { title: "Exercices", value: stats?.totalExercises || 0, icon: BrainCircuit, color: "text-emerald-500", bg: "bg-emerald-500/10" }), _jsx(StatCard, { title: "Annales", value: stats?.totalExams || 0, icon: FileText, color: "text-purple-500", bg: "bg-purple-500/10" }), _jsx(StatCard, { title: "Avis re\u00E7us", value: stats?.totalReviews || 0, icon: Star, color: "text-orange-500", bg: "bg-orange-500/10" })] })) }), _jsx("h2", { className: "text-lg font-display font-bold text-foreground mb-4", children: "G\u00E9rer la plateforme" }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: navCards.map(card => (_jsx(Link, { href: card.href, children: _jsx(Card, { className: "rounded-2xl border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group", children: _jsxs(CardContent, { className: "p-6 flex items-center gap-5", children: [_jsx("div", { className: `w-14 h-14 rounded-2xl ${card.bg} ${card.color} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`, children: _jsx(card.icon, { className: "w-7 h-7" }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h3", { className: "font-display font-bold text-foreground text-base", children: card.label }), _jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: card.description })] }), _jsx(ArrowRight, { className: "w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" })] }) }) }, card.href))) })] }));
}
function StatCard({ title, value, icon: Icon, color, bg }) {
    return (_jsx(Card, { className: "rounded-2xl border-border shadow-sm", children: _jsxs(CardContent, { className: "p-5 flex items-center gap-4", children: [_jsx("div", { className: `w-10 h-10 rounded-xl ${bg} ${color} flex items-center justify-center shrink-0`, children: _jsx(Icon, { className: "w-5 h-5" }) }), _jsxs("div", { children: [_jsx("h4", { className: "text-2xl font-display font-bold text-foreground", children: value.toLocaleString() }), _jsx("p", { className: "text-xs font-medium text-muted-foreground mt-0.5", children: title })] })] }) }));
}
