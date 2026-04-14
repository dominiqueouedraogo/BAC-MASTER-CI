import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useLoginUser } from "@workspace/api-client-react";
import { useAuth } from "src/hooks/use-auth";
import { useAuth as useReplitAuth } from "@workspace/replit-auth-web";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";
import { GraduationCap, Mail, Lock, Loader2 } from "lucide-react";
import { useToast } from "src/hooks/use-toast";
import { motion } from "framer-motion";
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const { login: replitLogin } = useReplitAuth();
    const [, setLocation] = useLocation();
    const { toast } = useToast();
    const loginMutation = useLoginUser();
    const handleSubmit = (e) => {
        e.preventDefault();
        loginMutation.mutate({ data: { email, password } }, {
            onSuccess: (data) => {
                login(data.token, data.user);
                toast({ title: "Connexion réussie", description: `Bienvenue, ${data.user.name}!` });
            },
            onError: (err) => {
                toast({
                    title: "Erreur de connexion",
                    description: err.response?.data?.message || "Identifiants incorrects.",
                    variant: "destructive",
                });
            }
        });
    };
    return (_jsxs("div", { className: "min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden", children: [_jsx("div", { className: "absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]" }), _jsx("div", { className: "absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[120px]" }), _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.4 }, className: "w-full max-w-md", children: [_jsxs(Link, { href: "/", className: "flex items-center justify-center gap-3 mb-8", children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20", children: _jsx(GraduationCap, { className: "text-white w-7 h-7" }) }), _jsx("span", { className: "font-display font-black text-2xl tracking-tight", children: "BAC MASTER CI" })] }), _jsxs("div", { className: "bg-card border border-border shadow-2xl shadow-black/5 rounded-3xl p-8 relative z-10", children: [_jsx("h1", { className: "text-2xl font-bold mb-2", children: "Bon retour ! \uD83D\uDC4B" }), _jsx("p", { className: "text-muted-foreground mb-8", children: "Connectez-vous pour continuer votre apprentissage." }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "email", children: "Adresse email" }), _jsxs("div", { className: "relative", children: [_jsx(Mail, { className: "absolute left-3 top-3 h-5 w-5 text-muted-foreground" }), _jsx(Input, { id: "email", type: "email", placeholder: "eleve@example.com", className: "pl-10 h-12 rounded-xl bg-background", value: email, onChange: (e) => setEmail(e.target.value), required: true })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { htmlFor: "password", children: "Mot de passe" }), _jsx(Link, { href: "/forgot-password", className: "text-sm text-primary font-medium hover:underline", children: "Mot de passe oubli\u00E9 ?" })] }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "absolute left-3 top-3 h-5 w-5 text-muted-foreground" }), _jsx(Input, { id: "password", type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "pl-10 h-12 rounded-xl bg-background", value: password, onChange: (e) => setPassword(e.target.value), required: true })] })] }), _jsxs(Button, { type: "submit", className: "w-full h-12 rounded-xl text-base font-semibold bg-gradient-to-r from-primary to-secondary border-0 shadow-lg shadow-primary/20 hover:shadow-xl transition-all hover:-translate-y-0.5", disabled: loginMutation.isPending, children: [loginMutation.isPending ? _jsx(Loader2, { className: "animate-spin mr-2" }) : null, "Se connecter"] })] }), _jsxs("div", { className: "relative my-6", children: [_jsx("div", { className: "absolute inset-0 flex items-center", children: _jsx("div", { className: "w-full border-t border-border" }) }), _jsx("div", { className: "relative flex justify-center text-sm", children: _jsx("span", { className: "bg-card px-3 text-muted-foreground", children: "ou" }) })] }), _jsxs(Button, { type: "button", variant: "outline", className: "w-full h-12 rounded-xl text-base font-semibold border-border hover:bg-accent transition-all", onClick: replitLogin, children: [_jsxs("svg", { className: "w-5 h-5 mr-2", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("path", { d: "M12 2L2 7L12 12L22 7L12 2Z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }), _jsx("path", { d: "M2 17L12 22L22 17", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }), _jsx("path", { d: "M2 12L12 17L22 12", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })] }), "Continuer avec Replit"] }), _jsxs("div", { className: "mt-6 text-center text-sm text-muted-foreground", children: ["Vous n'avez pas de compte ?", " ", _jsx(Link, { href: "/register", className: "text-primary font-bold hover:underline", children: "S'inscrire ici" })] })] })] })] }));
}
