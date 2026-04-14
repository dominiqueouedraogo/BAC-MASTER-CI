import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Redirect, Link } from "wouter";
import { MainLayout } from "src/components/layout/main-layout";
import { useAuth } from "src/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "src/components/ui/card";
import { Skeleton } from "src/components/ui/skeleton";
import { Button } from "src/components/ui/button";
import { BarChart2, Users, BookOpen, Trophy, ChevronLeft, TrendingUp, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie, } from "recharts";
async function fetchStats() {
    const res = await fetch("/api/admin/stats");
    if (!res.ok)
        throw new Error("Failed to load stats");
    return res.json();
}
async function fetchActivity() {
    const res = await fetch("/api/admin/activity");
    if (!res.ok)
        throw new Error("Failed to load activity");
    return res.json();
}
const SERIES_COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ec4899"];
export default function AdminStats() {
    const { user } = useAuth();
    if (user?.role !== "admin")
        return _jsx(Redirect, { to: "/dashboard" });
    const { data: stats, isLoading: loadingStats } = useQuery({ queryKey: ["admin-stats"], queryFn: fetchStats });
    const { data: activity, isLoading: loadingActivity } = useQuery({ queryKey: ["admin-activity"], queryFn: fetchActivity });
    const overviewCards = [
        { title: "Total Élèves", value: stats?.totalUsers || 0, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
        { title: "Leçons publiées", value: stats?.totalLessons || 0, icon: BookOpen, color: "text-primary", bg: "bg-primary/10" },
        { title: "Exercices", value: stats?.totalExercises || 0, icon: Trophy, color: "text-emerald-500", bg: "bg-emerald-500/10" },
        { title: "Avis reçus", value: stats?.totalReviews || 0, icon: Star, color: "text-amber-500", bg: "bg-amber-500/10" },
    ];
    const regData = activity?.dailyRegistrations?.map((r) => ({
        day: r.day,
        count: Number(r.count),
    })) || [];
    const seriesData = activity?.seriesBreakdown?.map((r, i) => ({
        name: `Série ${r.series}`,
        value: Number(r.count),
        fill: SERIES_COLORS[i % SERIES_COLORS.length],
    })) || [];
    const topLessons = activity?.topLessons || [];
    return (_jsxs(MainLayout, { children: [_jsxs("div", { className: "mb-6 flex items-center gap-3", children: [_jsx(Link, { href: "/admin", children: _jsxs(Button, { variant: "ghost", size: "sm", className: "gap-2 text-muted-foreground", children: [_jsx(ChevronLeft, { className: "w-4 h-4" }), " Admin"] }) }), _jsxs("div", { children: [_jsxs("h1", { className: "text-2xl font-display font-bold text-foreground flex items-center gap-2", children: [_jsx(BarChart2, { className: "w-6 h-6 text-primary" }), " Statistiques & Analytiques"] }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Suivi de l'activit\u00E9 de la plateforme." })] })] }), _jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8", children: loadingStats
                    ? [1, 2, 3, 4].map(i => _jsx(Skeleton, { className: "h-28 rounded-2xl" }, i))
                    : overviewCards.map(card => (_jsx(Card, { className: "rounded-2xl shadow-sm border-border", children: _jsxs(CardContent, { className: "p-5 flex items-center gap-4", children: [_jsx("div", { className: `w-11 h-11 rounded-xl ${card.bg} ${card.color} flex items-center justify-center shrink-0`, children: _jsx(card.icon, { className: "w-5 h-5" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-muted-foreground font-medium", children: card.title }), _jsx("p", { className: "text-2xl font-display font-bold text-foreground", children: card.value.toLocaleString() })] })] }) }, card.title))) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6", children: [_jsxs(Card, { className: "lg:col-span-2 rounded-2xl shadow-sm border-border", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "font-display flex items-center gap-2", children: [_jsx(TrendingUp, { className: "w-5 h-5 text-primary" }), " Inscriptions (7 derniers jours)"] }) }), _jsx(CardContent, { children: loadingActivity ? (_jsx(Skeleton, { className: "h-48 w-full rounded-xl" })) : regData.length === 0 ? (_jsx("div", { className: "h-48 flex items-center justify-center text-sm text-muted-foreground", children: "Aucune inscription r\u00E9cente." })) : (_jsx("div", { className: "h-48", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: regData, margin: { top: 5, right: 10, left: -15, bottom: 0 }, children: [_jsx(XAxis, { dataKey: "day", axisLine: false, tickLine: false, tick: { fill: "hsl(var(--muted-foreground))", fontSize: 12 } }), _jsx(YAxis, { axisLine: false, tickLine: false, tick: { fill: "hsl(var(--muted-foreground))", fontSize: 12 }, allowDecimals: false }), _jsx(Tooltip, { contentStyle: { borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0/0.1)" }, formatter: (v) => [v, "Inscriptions"] }), _jsx(Bar, { dataKey: "count", fill: "hsl(var(--primary))", radius: [6, 6, 0, 0] })] }) }) })) })] }), _jsxs(Card, { className: "rounded-2xl shadow-sm border-border", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "font-display flex items-center gap-2", children: [_jsx(Users, { className: "w-5 h-5 text-emerald-500" }), " R\u00E9partition par s\u00E9rie"] }) }), _jsx(CardContent, { children: loadingActivity ? (_jsx(Skeleton, { className: "h-48 w-full rounded-xl" })) : seriesData.length === 0 ? (_jsx("div", { className: "h-48 flex items-center justify-center text-sm text-muted-foreground", children: "Aucune donn\u00E9e disponible." })) : (_jsx("div", { className: "h-48", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(PieChart, { children: [_jsx(Pie, { data: seriesData, dataKey: "value", nameKey: "name", cx: "50%", cy: "50%", outerRadius: 70, label: ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`, labelLine: false, children: seriesData.map((entry, i) => (_jsx(Cell, { fill: entry.fill }, i))) }), _jsx(Tooltip, { formatter: (v) => [v, "Élèves"] })] }) }) })) })] })] }), _jsxs(Card, { className: "rounded-2xl shadow-sm border-border", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "font-display flex items-center gap-2", children: [_jsx(BookOpen, { className: "w-5 h-5 text-purple-500" }), " Cours les plus consult\u00E9s"] }) }), _jsx(CardContent, { children: loadingActivity ? (_jsx("div", { className: "space-y-3", children: [1, 2, 3].map(i => _jsx(Skeleton, { className: "h-10 rounded-xl" }, i)) })) : topLessons.length === 0 ? (_jsx("p", { className: "text-sm text-muted-foreground text-center py-6", children: "Aucune donn\u00E9e de consultation disponible." })) : (_jsx("div", { className: "space-y-3", children: topLessons.map((lesson, i) => (_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("span", { className: "w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0", children: i + 1 }), _jsx("div", { className: "flex-1 min-w-0", children: _jsx("p", { className: "text-sm font-medium truncate", children: lesson.title || `Cours #${lesson.lessonId}` }) }), _jsxs("span", { className: "text-sm text-muted-foreground shrink-0", children: [lesson.views, " vues"] })] }, lesson.lessonId))) })) })] })] }));
}
