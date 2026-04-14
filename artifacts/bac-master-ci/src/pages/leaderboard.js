"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Leaderboard;
var api_client_react_1 = require("@workspace/api-client-react");
var main_layout_1 = require("@/components/layout/main-layout");
var skeleton_1 = require("@/components/ui/skeleton");
var lucide_react_1 = require("lucide-react");
var use_auth_1 = require("@/hooks/use-auth");
function Leaderboard() {
    var user = (0, use_auth_1.useAuth)().user;
    var _a = (0, api_client_react_1.useGetLeaderboard)({ limit: 50 }), leaderboard = _a.data, isLoading = _a.isLoading;
    return (<main_layout_1.MainLayout>
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-amber-500/20">
          <lucide_react_1.Trophy className="w-10 h-10 text-amber-500"/>
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-black text-foreground mb-4">Classement National</h1>
        <p className="text-muted-foreground">Comparez vos scores avec les meilleurs élèves de Côte d'Ivoire. Chaque exercice complété vous rapproche du sommet !</p>
      </div>

      <div className="max-w-4xl mx-auto bg-card border border-border shadow-sm rounded-3xl overflow-hidden">
        <div className="bg-secondary/5 px-6 py-4 border-b border-border flex text-xs font-bold uppercase tracking-wider text-muted-foreground">
          <div className="w-16 text-center">Rang</div>
          <div className="flex-1">Élève</div>
          <div className="w-24 hidden sm:block text-center">Série</div>
          <div className="w-24 text-right">Points</div>
        </div>

        {isLoading ? (<div className="p-6 space-y-4">
            {Array.from({ length: 10 }).map(function (_, i) { return <skeleton_1.Skeleton key={i} className="h-16 w-full rounded-xl"/>; })}
          </div>) : (<div className="divide-y divide-border/50">
            {leaderboard === null || leaderboard === void 0 ? void 0 : leaderboard.map(function (entry, index) {
                var isMe = entry.userId === (user === null || user === void 0 ? void 0 : user.id);
                var rankStyle = "text-muted-foreground font-bold";
                var rowStyle = isMe ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-muted/30";
                var RankIcon = null;
                if (entry.rank === 1) {
                    rankStyle = "text-yellow-500 font-black";
                    RankIcon = lucide_react_1.Trophy;
                    rowStyle += " bg-yellow-500/5";
                }
                else if (entry.rank === 2) {
                    rankStyle = "text-gray-400 font-black";
                    RankIcon = lucide_react_1.Medal;
                }
                else if (entry.rank === 3) {
                    rankStyle = "text-amber-700 font-black";
                    RankIcon = lucide_react_1.Award;
                }
                return (<div key={entry.userId} className={"px-6 py-4 flex items-center transition-colors ".concat(rowStyle)}>
                  <div className={"w-16 text-center text-lg ".concat(rankStyle, " flex items-center justify-center gap-1")}>
                    {RankIcon ? <RankIcon className="w-5 h-5"/> : "#".concat(entry.rank)}
                  </div>
                  
                  <div className="flex-1 flex items-center gap-4 pl-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm shadow-sm border-2 border-white dark:border-background">
                      {entry.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-foreground flex items-center gap-2">
                        {entry.name}
                        {isMe && <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Moi</span>}
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <lucide_react_1.Award className="w-3 h-3"/> {entry.badges} badges
                      </div>
                    </div>
                  </div>

                  <div className="w-24 hidden sm:flex items-center justify-center text-sm font-semibold text-muted-foreground">
                    Série {entry.series}
                  </div>

                  <div className="w-24 text-right">
                    <div className="font-display font-bold text-lg text-amber-500 flex items-center justify-end gap-1">
                      {entry.points.toLocaleString()} <lucide_react_1.Flame className="w-4 h-4 text-orange-500"/>
                    </div>
                  </div>
                </div>);
            })}
          </div>)}
      </div>
    </main_layout_1.MainLayout>);
}
