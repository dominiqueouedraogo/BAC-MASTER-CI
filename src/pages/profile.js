import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { MainLayout } from "src/components/layout/main-layout";
import { useAuth } from "src/hooks/use-auth";
import { useUpdateProfile, useGetUserBadges, useUpgradeToPremium, getGetMeQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "src/components/ui/card";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";
import { useToast } from "src/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "src/components/ui/select";
import { User, Medal, Crown, Save, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
export default function Profile() {
    const { user, login } = useAuth();
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [name, setName] = useState(user?.name || "");
    const [series, setSeries] = useState(user?.series || "A");
    const updateMutation = useUpdateProfile();
    const { data: badges } = useGetUserBadges();
    const upgradeMutation = useUpgradeToPremium();
    const handleUpgrade = () => {
        upgradeMutation.mutate(undefined, {
            onSuccess: (updatedUser) => {
                queryClient.setQueryData(getGetMeQueryKey(), updatedUser);
                toast({ title: "Compte Premium activé !", description: "Vous avez maintenant accès à tout le contenu." });
            },
            onError: () => {
                toast({ title: "Erreur", description: "Impossible d'activer le Premium. Réessayez.", variant: "destructive" });
            },
        });
    };
    const handleSave = (e) => {
        e.preventDefault();
        updateMutation.mutate({ data: { name, series } }, {
            onSuccess: (updatedUser) => {
                // Update local state by calling login with same token but new user
                const token = localStorage.getItem("bac_token") || "";
                login(token, updatedUser);
                toast({ title: "Profil mis à jour", description: "Vos informations ont été enregistrées." });
            }
        });
    };
    if (!user)
        return null;
    return (_jsxs(MainLayout, { children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-display font-bold text-foreground", children: "Mon Profil" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "G\u00E9rez vos informations personnelles et visualisez vos r\u00E9ussites." })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsxs("div", { className: "lg:col-span-1 space-y-8", children: [_jsx(Card, { className: "rounded-3xl border-border shadow-sm text-center pt-8", children: _jsxs(CardContent, { children: [_jsx("div", { className: "w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary p-1 mb-4 shadow-xl", children: _jsx("div", { className: "w-full h-full bg-card rounded-full flex items-center justify-center text-5xl font-bold text-primary", children: user.name.charAt(0).toUpperCase() }) }), _jsx("h2", { className: "text-2xl font-bold text-foreground", children: user.name }), _jsxs("p", { className: "text-muted-foreground mb-4", children: ["S\u00E9rie ", user.series] }), _jsxs("div", { className: "inline-flex items-center justify-center bg-muted/50 rounded-xl p-3 border border-border w-full", children: [_jsxs("div", { className: "text-center px-4 border-r border-border", children: [_jsx("div", { className: "text-2xl font-display font-bold text-amber-500", children: user.points }), _jsx("div", { className: "text-xs text-muted-foreground uppercase tracking-wider font-bold", children: "Points" })] }), _jsxs("div", { className: "text-center px-4", children: [_jsx("div", { className: "text-2xl font-display font-bold text-primary", children: user.role === 'admin' ? 'Admin' : 'Élève' }), _jsx("div", { className: "text-xs text-muted-foreground uppercase tracking-wider font-bold", children: "R\u00F4le" })] })] })] }) }), _jsx(Card, { className: "rounded-3xl border-0 bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-orange-500/20", children: _jsxs(CardContent, { className: "p-8 relative overflow-hidden", children: [_jsx(Crown, { className: "absolute -bottom-4 -right-4 w-32 h-32 text-white/10 rotate-12" }), _jsxs("div", { className: "relative z-10", children: [_jsxs("h3", { className: "text-2xl font-display font-bold mb-2", children: ["Statut ", user.isPremium ? "Premium" : "Gratuit"] }), _jsx("p", { className: "text-white/80 mb-6 text-sm", children: user.isPremium
                                                        ? "Vous avez accès à tout le contenu en illimité. Profitez-en !"
                                                        : "Passez Premium pour débloquer toutes les annales corrigées et l'audio." }), !user.isPremium && (_jsxs(Button, { className: "w-full bg-white text-orange-600 hover:bg-white/90 rounded-xl font-bold shadow-lg", onClick: handleUpgrade, disabled: upgradeMutation.isPending, children: [upgradeMutation.isPending ? _jsx(Loader2, { className: "w-4 h-4 animate-spin mr-2" }) : null, "D\u00E9bloquer Premium"] }))] })] }) })] }), _jsxs("div", { className: "lg:col-span-2 space-y-8", children: [_jsx(Card, { className: "rounded-3xl border-border shadow-sm", children: _jsxs(CardContent, { className: "p-8", children: [_jsxs("h3", { className: "text-xl font-display font-bold mb-6 flex items-center gap-2", children: [_jsx(User, { className: "w-5 h-5 text-primary" }), " Informations Personnelles"] }), _jsxs("form", { onSubmit: handleSave, className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Nom complet" }), _jsx(Input, { value: name, onChange: e => setName(e.target.value), className: "h-12 rounded-xl bg-muted/30" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Adresse email (lecture seule)" }), _jsx(Input, { value: user.email, disabled: true, className: "h-12 rounded-xl bg-muted/50 text-muted-foreground cursor-not-allowed" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "S\u00E9rie" }), _jsxs(Select, { value: series, onValueChange: (v) => setSeries(v), children: [_jsx(SelectTrigger, { className: "h-12 rounded-xl bg-muted/30", children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "A", children: "S\u00E9rie A (Litt\u00E9raire)" }), _jsx(SelectItem, { value: "C", children: "S\u00E9rie C (Math\u00E9matiques)" }), _jsx(SelectItem, { value: "D", children: "S\u00E9rie D (Sciences)" })] })] })] }), _jsxs(Button, { type: "submit", disabled: updateMutation.isPending, className: "rounded-xl px-8 h-12 gap-2", children: [updateMutation.isPending ? _jsx(Loader2, { className: "w-4 h-4 animate-spin" }) : _jsx(Save, { className: "w-4 h-4" }), "Enregistrer les modifications"] })] })] }) }), _jsx(Card, { className: "rounded-3xl border-border shadow-sm", children: _jsxs(CardContent, { className: "p-8", children: [_jsxs("h3", { className: "text-xl font-display font-bold mb-6 flex items-center gap-2", children: [_jsx(Medal, { className: "w-5 h-5 text-primary" }), " Mes Badges"] }), _jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4", children: [badges?.map((badge) => (_jsxs("div", { className: `p-4 rounded-2xl text-center border-2 transition-all ${badge.earned ? 'border-primary/20 bg-primary/5' : 'border-border/50 bg-muted/20 opacity-60 grayscale'}`, children: [_jsx("div", { className: "text-4xl mb-3", children: badge.icon }), _jsx("p", { className: "font-bold text-sm leading-tight text-foreground", children: badge.name }), badge.earned && badge.earnedAt && (_jsxs("p", { className: "text-[10px] text-muted-foreground mt-2 font-medium", children: ["Obtenu le ", format(new Date(badge.earnedAt), "dd MMM yyyy", { locale: fr })] }))] }, badge.id))), !badges || badges.length === 0 ? (_jsx("div", { className: "col-span-full py-8 text-center text-muted-foreground text-sm italic", children: "Aucun badge disponible pour le moment." })) : null] })] }) })] })] })] }));
}
