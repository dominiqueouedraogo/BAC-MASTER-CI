import { useGetLeaderboard } from "@workspace/api-client-react";
import { MainLayout } from "src/components/layout/main-layout";
import { Skeleton } from "src/components/ui/skeleton";
import { Trophy, Medal, Award, Flame } from "lucide-react";
import { useAuth } from "src/hooks/use-auth";

export default function Leaderboard() {
  const { user } = useAuth();
  const { data: leaderboard, isLoading } = useGetLeaderboard({ limit: 50 });

  return (
    <MainLayout>
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-amber-500/20">
          <Trophy className="w-10 h-10 text-amber-500" />
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

        {isLoading ? (
          <div className="p-6 space-y-4">
            {Array.from({ length: 10 }).map((_, i) => <Skeleton key={i} className="h-16 w-full rounded-xl" />)}
          </div>
        ) : (
          <div className="divide-y divide-border/50">
            {leaderboard?.map((entry, index) => {
              const isMe = entry.userId === user?.id;
              
              let rankStyle = "text-muted-foreground font-bold";
              let rowStyle = isMe ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-muted/30";
              let RankIcon = null;

              if (entry.rank === 1) {
                rankStyle = "text-yellow-500 font-black";
                RankIcon = Trophy;
                rowStyle += " bg-yellow-500/5";
              } else if (entry.rank === 2) {
                rankStyle = "text-gray-400 font-black";
                RankIcon = Medal;
              } else if (entry.rank === 3) {
                rankStyle = "text-amber-700 font-black";
                RankIcon = Award;
              }

              return (
                <div key={entry.userId} className={`px-6 py-4 flex items-center transition-colors ${rowStyle}`}>
                  <div className={`w-16 text-center text-lg ${rankStyle} flex items-center justify-center gap-1`}>
                    {RankIcon ? <RankIcon className="w-5 h-5" /> : `#${entry.rank}`}
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
                        <Award className="w-3 h-3" /> {entry.badges} badges
                      </div>
                    </div>
                  </div>

                  <div className="w-24 hidden sm:flex items-center justify-center text-sm font-semibold text-muted-foreground">
                    Série {entry.series}
                  </div>

                  <div className="w-24 text-right">
                    <div className="font-display font-bold text-lg text-amber-500 flex items-center justify-end gap-1">
                      {entry.points.toLocaleString()} <Flame className="w-4 h-4 text-orange-500" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
