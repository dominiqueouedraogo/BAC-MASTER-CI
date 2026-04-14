import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useGetLeaderboard } from "@workspace/api-client-react";
import { MainLayout } from "src/components/layout/main-layout";
import { Skeleton } from "src/components/ui/skeleton";
import { Trophy, Medal, Award, Flame } from "lucide-react";
import { useAuth } from "src/hooks/use-auth";
export default function Leaderboard() {
    const { user } = useAuth();
    const { data: leaderboard, isLoading } = useGetLeaderboard({ limit: 50 });
    return (_jsxs(MainLayout, { children: [_jsxs("div", { className: "mb-8 text-center max-w-2xl mx-auto", children: [_jsx("div", { className: "w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-amber-500/20", children: _jsx(Trophy, { className: "w-10 h-10 text-amber-500" }) }), _jsx("h1", { className: "text-3xl md:text-4xl font-display font-black text-foreground mb-4", children: "Classement National" }), _jsx("p", { className: "text-muted-foreground", children: "Comparez vos scores avec les meilleurs \u00E9l\u00E8ves de C\u00F4te d'Ivoire. Chaque exercice compl\u00E9t\u00E9 vous rapproche du sommet !" })] }), _jsxs("div", { className: "max-w-4xl mx-auto bg-card border border-border shadow-sm rounded-3xl overflow-hidden", children: [_jsxs("div", { className: "bg-secondary/5 px-6 py-4 border-b border-border flex text-xs font-bold uppercase tracking-wider text-muted-foreground", children: [_jsx("div", { className: "w-16 text-center", children: "Rang" }), _jsx("div", { className: "flex-1", children: "\u00C9l\u00E8ve" }), _jsx("div", { className: "w-24 hidden sm:block text-center", children: "S\u00E9rie" }), _jsx("div", { className: "w-24 text-right", children: "Points" })] }), isLoading ? (_jsx("div", { className: "p-6 space-y-4", children: Array.from({ length: 10 }).map((_, i) => _jsx(Skeleton, { className: "h-16 w-full rounded-xl" }, i)) })) : (_jsx("div", { className: "divide-y divide-border/50", children: leaderboard?.map((entry, index) => {
                            const isMe = entry.userId === user?.id;
                            let rankStyle = "text-muted-foreground font-bold";
                            let rowStyle = isMe ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-muted/30";
                            let RankIcon = null;
                            if (entry.rank === 1) {
                                rankStyle = "text-yellow-500 font-black";
                                RankIcon = Trophy;
                                rowStyle += " bg-yellow-500/5";
                            }
                            else if (entry.rank === 2) {
                                rankStyle = "text-gray-400 font-black";
                                RankIcon = Medal;
                            }
                            else if (entry.rank === 3) {
                                rankStyle = "text-amber-700 font-black";
                                RankIcon = Award;
                            }
                            return (_jsxs("div", { className: `px-6 py-4 flex items-center transition-colors ${rowStyle}`, children: [_jsx("div", { className: `w-16 text-center text-lg ${rankStyle} flex items-center justify-center gap-1`, children: RankIcon ? _jsx(RankIcon, { className: "w-5 h-5" }) : `#${entry.rank}` }), _jsxs("div", { className: "flex-1 flex items-center gap-4 pl-4", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm shadow-sm border-2 border-white dark:border-background", children: entry.name.charAt(0) }), _jsxs("div", { children: [_jsxs("div", { className: "font-bold text-foreground flex items-center gap-2", children: [entry.name, isMe && _jsx("span", { className: "text-[10px] bg-primary text-white px-2 py-0.5 rounded-full uppercase tracking-wider", children: "Moi" })] }), _jsxs("div", { className: "text-xs text-muted-foreground flex items-center gap-1 mt-0.5", children: [_jsx(Award, { className: "w-3 h-3" }), " ", entry.badges, " badges"] })] })] }), _jsxs("div", { className: "w-24 hidden sm:flex items-center justify-center text-sm font-semibold text-muted-foreground", children: ["S\u00E9rie ", entry.series] }), _jsx("div", { className: "w-24 text-right", children: _jsxs("div", { className: "font-display font-bold text-lg text-amber-500 flex items-center justify-end gap-1", children: [entry.points.toLocaleString(), " ", _jsx(Flame, { className: "w-4 h-4 text-orange-500" })] }) })] }, entry.userId));
                        }) }))] })] }));
}
