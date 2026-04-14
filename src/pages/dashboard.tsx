import { useAuth } from "src/hooks/use-auth";
import { MainLayout } from "src/components/layout/main-layout";
import { useGetProgress, useGetDailyGoals } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "src/components/ui/card";
import { Progress } from "src/components/ui/progress";
import { BookOpen, BrainCircuit, Trophy, Flame, PlayCircle, Star } from "lucide-react";
import { Skeleton } from "src/components/ui/skeleton";
import { Link } from "wouter";
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from "recharts";

export default function Dashboard() {
  const { user } = useAuth();
  
  const { data: progress, isLoading: loadingProgress } = useGetProgress();
  const { data: goals, isLoading: loadingGoals } = useGetDailyGoals();

  const mockChartData = [
    { name: 'Lun', points: 120 }, { name: 'Mar', points: 200 },
    { name: 'Mer', points: 150 }, { name: 'Jeu', points: 300 },
    { name: 'Ven', points: 250 }, { name: 'Sam', points: 400 },
    { name: 'Dim', points: 350 },
  ];

  if (loadingProgress || loadingGoals) {
    return (
      <MainLayout>
        <div className="space-y-6">
          <Skeleton className="h-10 w-1/3" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1,2,3,4].map(i => <Skeleton key={i} className="h-32 rounded-2xl" />)}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Skeleton className="lg:col-span-2 h-64 rounded-2xl" />
            <Skeleton className="h-64 rounded-2xl" />
          </div>
        </div>
      </MainLayout>
    );
  }

  const p = progress || { totalLessons: 0, completedLessons: 0, completedExercises: 0, points: 0, streak: 0, recentLessons: [] };
  const g = goals || { lessonsPerDay: 2, exercisesPerDay: 5, lessonsCompletedToday: 0, exercisesCompletedToday: 0 };

  const lessonProgress = Math.min(100, (g.lessonsCompletedToday / g.lessonsPerDay) * 100);
  const exerciseProgress = Math.min(100, (g.exercisesCompletedToday / g.exercisesPerDay) * 100);

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Bonjour, {user?.name?.split(' ')[0]} 👋</h1>
        <p className="text-muted-foreground mt-1">Prêt pour une nouvelle session de révision ? (Série {user?.series})</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Cours terminés" value={p.completedLessons.toString()} icon={BookOpen} color="text-blue-500" bg="bg-blue-500/10" />
        <StatCard title="Exercices faits" value={p.completedExercises.toString()} icon={BrainCircuit} color="text-emerald-500" bg="bg-emerald-500/10" />
        <StatCard title="Points accumulés" value={p.points.toString()} icon={Trophy} color="text-amber-500" bg="bg-amber-500/10" />
        <StatCard title="Jours consécutifs" value={`${p.streak} j`} icon={Flame} color="text-orange-500" bg="bg-orange-500/10" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Activity Chart */}
        <Card className="lg:col-span-2 rounded-2xl shadow-sm border-border">
          <CardHeader>
            <CardTitle className="font-display">Activité de la semaine</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}} />
                  <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                  <Area type="monotone" dataKey="points" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorPoints)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Daily Goals */}
        <Card className="rounded-2xl shadow-sm border-border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500" /> Objectifs Quotidiens
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Lire {g.lessonsPerDay} cours</span>
                <span className="text-muted-foreground">{g.lessonsCompletedToday}/{g.lessonsPerDay}</span>
              </div>
              <Progress value={lessonProgress} className="h-2 bg-secondary/20" indicatorClassName="bg-secondary" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Faire {g.exercisesPerDay} exercices</span>
                <span className="text-muted-foreground">{g.exercisesCompletedToday}/{g.exercisesPerDay}</span>
              </div>
              <Progress value={exerciseProgress} className="h-2 bg-primary/20" />
            </div>
            {lessonProgress >= 100 && exerciseProgress >= 100 && (
              <div className="bg-success/10 text-success border border-success/20 p-3 rounded-xl text-center text-sm font-semibold animate-in zoom-in">
                Objectifs atteints ! +50 points 🎉
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Lessons */}
      <div>
        <h2 className="text-xl font-display font-bold mb-4">Reprendre là où vous vous étiez arrêté</h2>
        {p.recentLessons && p.recentLessons.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {p.recentLessons.map(lesson => (
              <Link key={lesson.id} href={`/lessons/${lesson.id}`}>
                <div className="bg-card border border-border p-4 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <PlayCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{lesson.subjectName}</p>
                    <h3 className="font-semibold text-foreground line-clamp-1">{lesson.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-card border border-border border-dashed p-8 rounded-2xl text-center">
            <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground">Aucun cours récent. Allez dans l'onglet Cours pour commencer !</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

function StatCard({ title, value, icon: Icon, color, bg }: any) {
  return (
    <Card className="rounded-2xl shadow-sm border-border overflow-hidden">
      <CardContent className="p-6 flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl ${bg} ${color} flex items-center justify-center shrink-0`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-2xl font-display font-bold text-foreground">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
