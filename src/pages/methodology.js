import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MainLayout } from "src/components/layout/main-layout";
import { Card, CardContent } from "src/components/ui/card";
import { Brain, Clock, Target, Lightbulb, PenTool, CheckCircle2 } from "lucide-react";
export default function Methodology() {
    const tips = [
        {
            title: "La technique Pomodoro",
            icon: Clock,
            color: "text-red-500",
            bg: "bg-red-500/10",
            desc: "Étudiez 25 minutes, faites une pause de 5 minutes. Après 4 cycles, prenez 15 minutes. Idéal pour garder la concentration sans s'épuiser."
        },
        {
            title: "Lecture Active",
            icon: Brain,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            desc: "Ne vous contentez pas de relire. Surlignez, annotez dans la marge, et essayez de résumer chaque paragraphe avec vos propres mots."
        },
        {
            title: "La méthode Feynman",
            icon: Lightbulb,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
            desc: "Expliquez le concept que vous venez d'apprendre à voix haute, comme si vous l'enseigniez à un enfant de 12 ans. Si vous bloquez, relisez le cours."
        },
        {
            title: "Fiches de révision (Flashcards)",
            icon: PenTool,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
            desc: "Une notion = une fiche. Question d'un côté, réponse de l'autre. Utilisez le système de répétition espacée pour mémoriser sur le long terme."
        }
    ];
    return (_jsxs(MainLayout, { children: [_jsxs("div", { className: "relative overflow-hidden rounded-3xl bg-primary text-white p-8 md:p-12 mb-10 shadow-xl shadow-primary/20", children: [_jsx("div", { className: "absolute top-0 right-0 w-full h-full", children: _jsx("div", { className: "absolute top-[-50%] right-[-10%] w-[60%] h-[150%] bg-white/10 rotate-12 blur-3xl rounded-full" }) }), _jsxs("div", { className: "relative z-10 max-w-2xl", children: [_jsx(Badge, { className: "bg-white/20 text-white hover:bg-white/30 mb-4 border-0", children: "Astuces d'or" }), _jsx("h1", { className: "text-3xl md:text-5xl font-display font-black mb-4 leading-tight", children: "Apprendre \u00E0 apprendre" }), _jsx("p", { className: "text-primary-foreground/80 text-lg", children: "Le secret pour r\u00E9ussir son BAC n'est pas de travailler plus dur, mais de travailler plus intelligemment." })] })] }), _jsxs("h2", { className: "text-2xl font-display font-bold mb-6 flex items-center gap-2", children: [_jsx(Target, { className: "text-primary w-6 h-6" }), " Techniques d'\u00E9tude prouv\u00E9es"] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-12", children: tips.map((tip, i) => (_jsx(Card, { className: "rounded-2xl border-border shadow-sm hover:shadow-md transition-shadow", children: _jsxs(CardContent, { className: "p-6 sm:p-8 flex gap-6", children: [_jsx("div", { className: `w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${tip.bg} ${tip.color}`, children: _jsx(tip.icon, { className: "w-7 h-7" }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold text-xl mb-2 text-foreground", children: tip.title }), _jsx("p", { className: "text-muted-foreground leading-relaxed", children: tip.desc })] })] }) }, i))) }), _jsxs("div", { className: "bg-card border border-border rounded-3xl p-8 md:p-10 shadow-sm", children: [_jsx("h2", { className: "text-2xl font-display font-bold mb-6 text-foreground", children: "Strat\u00E9gie d'Examen (J-J)" }), _jsx("div", { className: "space-y-6", children: [
                            "Lisez TOUT le sujet avant de commencer, et choisissez vos exercices.",
                            "Commencez toujours par l'exercice qui vous semble le plus facile pour prendre confiance.",
                            "Gérez votre temps : attribuez un temps max à chaque exercice selon son barème.",
                            "Soignez la présentation : un correcteur fatigué sanctionnera une copie brouillonne.",
                            "Encadrez vos résultats finaux (surtout en Maths et PC)."
                        ].map((text, i) => (_jsxs("div", { className: "flex gap-4 items-start", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-success/10 text-success flex items-center justify-center shrink-0 mt-0.5", children: _jsx(CheckCircle2, { className: "w-5 h-5" }) }), _jsx("p", { className: "text-lg text-muted-foreground", children: text })] }, i))) })] })] }));
}
// Inline badge for this file only
function Badge({ className, children }) {
    return _jsx("span", { className: `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`, children: children });
}
