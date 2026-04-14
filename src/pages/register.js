import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useRegisterUser } from "@workspace/api-client-react";
import { useAuth } from "src/hooks/use-auth";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";
import { GraduationCap, Mail, Lock, User as UserIcon, BookOpen, Loader2 } from "lucide-react";
import { useToast } from "src/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "src/components/ui/select";
import { motion } from "framer-motion";
export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [series, setSeries] = useState("A");
    const { login } = useAuth();
    const [, setLocation] = useLocation();
    const { toast } = useToast();
    const registerMutation = useRegisterUser();
    const handleSubmit = (e) => {
        e.preventDefault();
        registerMutation.mutate({ data: { name, email, password, series } }, {
            onSuccess: (data) => {
                login(data.token, data.user);
                toast({ title: "Inscription réussie", description: "Bienvenue sur BAC MASTER CI !" });
            },
            onError: (err) => {
                toast({
                    title: "Erreur d'inscription",
                    description: err.response?.data?.message || "Veuillez vérifier vos informations.",
                    variant: "destructive",
                });
            }
        });
    };
    return (_jsxs("div", { className: "min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden", children: [_jsx("div", { className: "absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]" }), _jsx("div", { className: "absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[120px]" }), _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.4 }, className: "w-full max-w-md", children: [_jsxs(Link, { href: "/", className: "flex items-center justify-center gap-3 mb-8", children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20", children: _jsx(GraduationCap, { className: "text-white w-7 h-7" }) }), _jsx("span", { className: "font-display font-black text-2xl tracking-tight", children: "BAC MASTER CI" })] }), _jsxs("div", { className: "bg-card border border-border shadow-2xl shadow-black/5 rounded-3xl p-8 relative z-10", children: [_jsx("h1", { className: "text-2xl font-bold mb-2", children: "Cr\u00E9er un compte \u2728" }), _jsx("p", { className: "text-muted-foreground mb-8", children: "Rejoignez des milliers d'\u00E9l\u00E8ves qui pr\u00E9parent leur BAC." }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "name", children: "Nom complet" }), _jsxs("div", { className: "relative", children: [_jsx(UserIcon, { className: "absolute left-3 top-3 h-5 w-5 text-muted-foreground" }), _jsx(Input, { id: "name", placeholder: "Jean Dupont", className: "pl-10 h-12 rounded-xl bg-background", value: name, onChange: (e) => setName(e.target.value), required: true })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "email", children: "Adresse email" }), _jsxs("div", { className: "relative", children: [_jsx(Mail, { className: "absolute left-3 top-3 h-5 w-5 text-muted-foreground" }), _jsx(Input, { id: "email", type: "email", placeholder: "eleve@example.com", className: "pl-10 h-12 rounded-xl bg-background", value: email, onChange: (e) => setEmail(e.target.value), required: true })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "series", children: "S\u00E9rie du BAC" }), _jsx("div", { className: "relative", children: _jsxs(Select, { value: series, onValueChange: (v) => setSeries(v), children: [_jsxs(SelectTrigger, { className: "pl-10 h-12 rounded-xl bg-background w-full", children: [_jsx(BookOpen, { className: "absolute left-3 top-3 h-5 w-5 text-muted-foreground" }), _jsx(SelectValue, { placeholder: "Choisir une s\u00E9rie" })] }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "A", children: "S\u00E9rie A (Litt\u00E9raire)" }), _jsx(SelectItem, { value: "C", children: "S\u00E9rie C (Math\u00E9matiques)" }), _jsx(SelectItem, { value: "D", children: "S\u00E9rie D (Sciences)" })] })] }) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "password", children: "Mot de passe" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "absolute left-3 top-3 h-5 w-5 text-muted-foreground" }), _jsx(Input, { id: "password", type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "pl-10 h-12 rounded-xl bg-background", value: password, onChange: (e) => setPassword(e.target.value), minLength: 6, required: true })] })] }), _jsxs(Button, { type: "submit", className: "w-full h-12 rounded-xl text-base font-semibold bg-gradient-to-r from-primary to-secondary border-0 shadow-lg shadow-primary/20 hover:shadow-xl transition-all mt-4", disabled: registerMutation.isPending, children: [registerMutation.isPending ? _jsx(Loader2, { className: "animate-spin mr-2" }) : null, "Cr\u00E9er mon compte"] })] }), _jsxs("div", { className: "mt-8 text-center text-sm text-muted-foreground", children: ["Vous avez d\u00E9j\u00E0 un compte ?", " ", _jsx(Link, { href: "/login", className: "text-primary font-bold hover:underline", children: "Se connecter" })] })] })] })] }));
}
