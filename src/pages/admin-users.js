import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
export default function AdminUsers() {
    const { user } = useAuth();
    const [search, setSearch] = useState("");
    const [updating, setUpdating] = useState(null);
    const queryClient = useQueryClient();
    if (user?.role !== "admin")
        return _jsx(Redirect, { to: "/dashboard" });
    const { data: users, isLoading } = useGetAdminUsers();
    const filtered = users?.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        (u.series || "").toLowerCase().includes(search.toLowerCase()));
    const seriesBadge = (series) => {
        const map = {
            A: "bg-purple-500/10 text-purple-600 border-purple-200",
            C: "bg-blue-500/10 text-blue-600 border-blue-200",
            D: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
        };
        return map[series || ""] || "bg-muted text-muted-foreground";
    };
    const patchUser = async (id, patch) => {
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
        }
        finally {
            setUpdating(null);
        }
    };
    const formatDate = (iso) => {
        return new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
    };
    const totalUsers = users?.length ?? 0;
    const premiumCount = users?.filter(u => u.isPremium).length ?? 0;
    const replitCount = users?.filter(u => u.replitId).length ?? 0;
    return (_jsxs(MainLayout, { children: [_jsxs("div", { className: "mb-6 flex items-center gap-3", children: [_jsx(Link, { href: "/admin", children: _jsxs(Button, { variant: "ghost", size: "sm", className: "gap-2 text-muted-foreground", children: [_jsx(ChevronLeft, { className: "w-4 h-4" }), " Admin"] }) }), _jsxs("div", { children: [_jsxs("h1", { className: "text-2xl font-display font-bold text-foreground flex items-center gap-2", children: [_jsx(Users, { className: "w-6 h-6 text-primary" }), " Gestion des Utilisateurs"] }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Consulter et g\u00E9rer tous les comptes." })] })] }), _jsxs("div", { className: "grid grid-cols-3 gap-4 mb-6", children: [_jsx(Card, { className: "rounded-2xl border-border shadow-sm", children: _jsxs(CardContent, { className: "p-4 flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center", children: _jsx(Users, { className: "w-5 h-5 text-primary" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-2xl font-bold", children: totalUsers }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Utilisateurs total" })] })] }) }), _jsx(Card, { className: "rounded-2xl border-border shadow-sm", children: _jsxs(CardContent, { className: "p-4 flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center", children: _jsx(Star, { className: "w-5 h-5 text-amber-500" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-2xl font-bold", children: premiumCount }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Comptes Premium" })] })] }) }), _jsx(Card, { className: "rounded-2xl border-border shadow-sm", children: _jsxs(CardContent, { className: "p-4 flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center", children: _jsx(UserCheck, { className: "w-5 h-5 text-green-600" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-2xl font-bold", children: replitCount }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Via Replit Auth" })] })] }) })] }), _jsxs(Card, { className: "rounded-3xl border-border shadow-sm", children: [_jsx(CardHeader, { className: "pb-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Rechercher par nom, email ou s\u00E9rie...", className: "pl-9 rounded-xl bg-muted/50 border-0", value: search, onChange: e => setSearch(e.target.value) })] }), _jsxs("span", { className: "text-sm text-muted-foreground shrink-0", children: [filtered?.length ?? 0, " r\u00E9sultats"] })] }) }), _jsx(CardContent, { children: isLoading ? (_jsx("div", { className: "space-y-3", children: [1, 2, 3, 4].map(i => _jsx(Skeleton, { className: "h-16 w-full rounded-xl" }, i)) })) : !filtered?.length ? (_jsxs("div", { className: "py-16 text-center text-muted-foreground", children: [_jsx(Users, { className: "w-12 h-12 mx-auto opacity-40 mb-3" }), _jsx("p", { children: "Aucun utilisateur trouv\u00E9." })] })) : (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { children: _jsxs("tr", { className: "text-xs text-muted-foreground uppercase bg-muted/50", children: [_jsx("th", { className: "text-left px-4 py-3 rounded-tl-xl", children: "Utilisateur" }), _jsx("th", { className: "text-left px-4 py-3", children: "S\u00E9rie" }), _jsx("th", { className: "text-left px-4 py-3", children: "Points" }), _jsx("th", { className: "text-left px-4 py-3", children: "Auth" }), _jsx("th", { className: "text-left px-4 py-3", children: "Premium" }), _jsx("th", { className: "text-left px-4 py-3", children: "R\u00F4le" }), _jsx("th", { className: "text-left px-4 py-3 rounded-tr-xl", children: "Inscrit le" })] }) }), _jsx("tbody", { className: "divide-y divide-border/50", children: filtered.map(u => {
                                            const adminUser = u;
                                            const isUpdating = updating === adminUser.id;
                                            return (_jsxs("tr", { className: "hover:bg-muted/20 transition-colors", children: [_jsx("td", { className: "px-4 py-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0", children: adminUser.name.charAt(0).toUpperCase() }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold text-foreground leading-tight", children: adminUser.name }), _jsx("p", { className: "text-xs text-muted-foreground", children: adminUser.email })] })] }) }), _jsx("td", { className: "px-4 py-4", children: _jsxs("select", { disabled: isUpdating || adminUser.role === "admin", value: adminUser.series || "A", onChange: e => patchUser(adminUser.id, { series: e.target.value }), className: `text-xs font-bold px-2 py-1 rounded-full border cursor-pointer ${seriesBadge(adminUser.series)} disabled:cursor-default`, children: [_jsx("option", { value: "A", children: "A" }), _jsx("option", { value: "C", children: "C" }), _jsx("option", { value: "D", children: "D" })] }) }), _jsx("td", { className: "px-4 py-4", children: _jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx(Trophy, { className: "w-3.5 h-3.5 text-amber-500" }), _jsx("span", { className: "font-semibold", children: adminUser.points ?? 0 })] }) }), _jsx("td", { className: "px-4 py-4", children: _jsx("div", { className: "flex flex-col gap-1", children: adminUser.replitId ? (_jsxs(Badge, { className: "text-[10px] bg-green-500/10 text-green-700 border-green-200 gap-1 w-fit", children: [_jsx(CheckCircle2, { className: "w-3 h-3" }), " Replit"] })) : (_jsxs(Badge, { variant: "outline", className: "text-[10px] text-muted-foreground gap-1 w-fit", children: [_jsx(XCircle, { className: "w-3 h-3" }), " Email"] })) }) }), _jsx("td", { className: "px-4 py-4", children: _jsx("button", { disabled: isUpdating, onClick: () => patchUser(adminUser.id, { isPremium: !adminUser.isPremium }), className: `px-2.5 py-1 rounded-full text-xs font-bold transition-colors ${adminUser.isPremium
                                                                ? "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20"
                                                                : "bg-muted text-muted-foreground hover:bg-muted/80"}`, children: adminUser.isPremium ? "Premium ✓" : "Standard" }) }), _jsx("td", { className: "px-4 py-4", children: adminUser.id === user?.id ? (_jsxs("div", { className: "flex items-center gap-1.5 text-destructive", children: [_jsx(Shield, { className: "w-3.5 h-3.5" }), _jsx("span", { className: "text-xs font-bold uppercase", children: "Admin" })] })) : (_jsx("button", { disabled: isUpdating, onClick: () => patchUser(adminUser.id, { role: adminUser.role === "admin" ? "student" : "admin" }), className: `flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full transition-colors ${adminUser.role === "admin"
                                                                ? "bg-destructive/10 text-destructive hover:bg-destructive/20"
                                                                : "bg-muted text-muted-foreground hover:bg-muted/80"}`, children: adminUser.role === "admin" ? (_jsxs(_Fragment, { children: [_jsx(Shield, { className: "w-3 h-3" }), " Admin"] })) : "Élève" })) }), _jsx("td", { className: "px-4 py-4 text-xs text-muted-foreground whitespace-nowrap", children: formatDate(adminUser.createdAt) })] }, adminUser.id));
                                        }) })] }) })) })] })] }));
}
