import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";
import { GraduationCap, Lock, Loader2, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { useToast } from "src/hooks/use-toast";
import { motion } from "framer-motion";
export default function ResetPassword() {
    const { toast } = useToast();
    const [, setLocation] = useLocation();
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const t = params.get("token");
        if (t)
            setToken(t);
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirm) {
            toast({ title: "Erreur", description: "Les mots de passe ne correspondent pas.", variant: "destructive" });
            return;
        }
        if (password.length < 6) {
            toast({ title: "Erreur", description: "Le mot de passe doit contenir au moins 6 caractères.", variant: "destructive" });
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });
            const data = await res.json();
            if (!res.ok) {
                toast({ title: "Erreur", description: data.message || "Lien invalide ou expiré.", variant: "destructive" });
                return;
            }
            setSuccess(true);
            setTimeout(() => setLocation("/login"), 3000);
        }
        catch {
            toast({ title: "Erreur", description: "Une erreur est survenue. Réessayez.", variant: "destructive" });
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden", children: [_jsx("div", { className: "absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]" }), _jsx("div", { className: "absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[120px]" }), _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.4 }, className: "w-full max-w-md", children: [_jsxs(Link, { href: "/", className: "flex items-center justify-center gap-3 mb-8", children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20", children: _jsx(GraduationCap, { className: "text-white w-7 h-7" }) }), _jsx("span", { className: "font-display font-black text-2xl tracking-tight", children: "BAC MASTER CI" })] }), _jsx("div", { className: "bg-card border border-border shadow-2xl shadow-black/5 rounded-3xl p-8 relative z-10", children: success ? (_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(CheckCircle2, { className: "w-8 h-8 text-emerald-500" }) }), _jsx("h1", { className: "text-2xl font-bold mb-2", children: "Mot de passe mis \u00E0 jour !" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "Votre mot de passe a \u00E9t\u00E9 r\u00E9initialis\u00E9 avec succ\u00E8s. Vous allez \u00EAtre redirig\u00E9 vers la page de connexion..." })] })) : (_jsxs(_Fragment, { children: [_jsx("h1", { className: "text-2xl font-bold mb-2", children: "Nouveau mot de passe" }), _jsx("p", { className: "text-muted-foreground mb-8 text-sm", children: "Choisissez un nouveau mot de passe s\u00E9curis\u00E9 pour votre compte." }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "password", children: "Nouveau mot de passe" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "absolute left-3 top-3 h-5 w-5 text-muted-foreground" }), _jsx(Input, { id: "password", type: showPassword ? "text" : "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "pl-10 pr-10 h-12 rounded-xl bg-background", value: password, onChange: e => setPassword(e.target.value), required: true, minLength: 6 }), _jsx("button", { type: "button", onClick: () => setShowPassword(v => !v), className: "absolute right-3 top-3 text-muted-foreground hover:text-foreground", children: showPassword ? _jsx(EyeOff, { className: "h-5 w-5" }) : _jsx(Eye, { className: "h-5 w-5" }) })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "confirm", children: "Confirmer le mot de passe" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "absolute left-3 top-3 h-5 w-5 text-muted-foreground" }), _jsx(Input, { id: "confirm", type: showPassword ? "text" : "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "pl-10 h-12 rounded-xl bg-background", value: confirm, onChange: e => setConfirm(e.target.value), required: true })] })] }), _jsxs(Button, { type: "submit", className: "w-full h-12 rounded-xl text-base font-semibold bg-gradient-to-r from-primary to-secondary border-0 shadow-lg shadow-primary/20", disabled: loading, children: [loading ? _jsx(Loader2, { className: "animate-spin mr-2" }) : null, "R\u00E9initialiser le mot de passe"] })] }), _jsx("div", { className: "mt-6 text-center", children: _jsx(Link, { href: "/login", className: "text-sm text-muted-foreground hover:text-foreground transition-colors", children: "Retour \u00E0 la connexion" }) })] })) })] })] }));
}
