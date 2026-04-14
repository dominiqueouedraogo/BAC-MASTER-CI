"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Dashboard;
var use_auth_1 = require("@/hooks/use-auth");
var main_layout_1 = require("@/components/layout/main-layout");
var api_client_react_1 = require("@workspace/api-client-react");
var card_1 = require("@/components/ui/card");
var progress_1 = require("@/components/ui/progress");
var lucide_react_1 = require("lucide-react");
var skeleton_1 = require("@/components/ui/skeleton");
var wouter_1 = require("wouter");
var recharts_1 = require("recharts");
function Dashboard() {
    var _a;
    var user = (0, use_auth_1.useAuth)().user;
    var _b = (0, api_client_react_1.useGetProgress)(), progress = _b.data, loadingProgress = _b.isLoading;
    var _c = (0, api_client_react_1.useGetDailyGoals)(), goals = _c.data, loadingGoals = _c.isLoading;
    var mockChartData = [
        { name: 'Lun', points: 120 }, { name: 'Mar', points: 200 },
        { name: 'Mer', points: 150 }, { name: 'Jeu', points: 300 },
        { name: 'Ven', points: 250 }, { name: 'Sam', points: 400 },
        { name: 'Dim', points: 350 },
    ];
    if (loadingProgress || loadingGoals) {
        return (<main_layout_1.MainLayout>
        <div className="space-y-6">
          <skeleton_1.Skeleton className="h-10 w-1/3"/>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(function (i) { return <skeleton_1.Skeleton key={i} className="h-32 rounded-2xl"/>; })}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <skeleton_1.Skeleton className="lg:col-span-2 h-64 rounded-2xl"/>
            <skeleton_1.Skeleton className="h-64 rounded-2xl"/>
          </div>
        </div>
      </main_layout_1.MainLayout>);
    }
    var p = progress || { totalLessons: 0, completedLessons: 0, completedExercises: 0, points: 0, streak: 0, recentLessons: [] };
    var g = goals || { lessonsPerDay: 2, exercisesPerDay: 5, lessonsCompletedToday: 0, exercisesCompletedToday: 0 };
    var lessonProgress = Math.min(100, (g.lessonsCompletedToday / g.lessonsPerDay) * 100);
    var exerciseProgress = Math.min(100, (g.exercisesCompletedToday / g.exercisesPerDay) * 100);
    return (<main_layout_1.MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Bonjour, {(_a = user === null || user === void 0 ? void 0 : user.name) === null || _a === void 0 ? void 0 : _a.split(' ')[0]} 👋</h1>
        <p className="text-muted-foreground mt-1">Prêt pour une nouvelle session de révision ? (Série {user === null || user === void 0 ? void 0 : user.series})</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Cours terminés" value={p.completedLessons.toString()} icon={lucide_react_1.BookOpen} color="text-blue-500" bg="bg-blue-500/10"/>
        <StatCard title="Exercices faits" value={p.completedExercises.toString()} icon={lucide_react_1.BrainCircuit} color="text-emerald-500" bg="bg-emerald-500/10"/>
        <StatCard title="Points accumulés" value={p.points.toString()} icon={lucide_react_1.Trophy} color="text-amber-500" bg="bg-amber-500/10"/>
        <StatCard title="Jours consécutifs" value={"".concat(p.streak, " j")} icon={lucide_react_1.Flame} color="text-orange-500" bg="bg-orange-500/10"/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Activity Chart */}
        <card_1.Card className="lg:col-span-2 rounded-2xl shadow-sm border-border">
          <card_1.CardHeader>
            <card_1.CardTitle className="font-display">Activité de la semaine</card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="h-[200px] w-full">
              <recharts_1.ResponsiveContainer width="100%" height="100%">
                <recharts_1.AreaChart data={mockChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <recharts_1.XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}/>
                  <recharts_1.Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}/>
                  <recharts_1.Area type="monotone" dataKey="points" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorPoints)"/>
                </recharts_1.AreaChart>
              </recharts_1.ResponsiveContainer>
            </div>
          </card_1.CardContent>
        </card_1.Card>

        {/* Daily Goals */}
        <card_1.Card className="rounded-2xl shadow-sm border-border">
          <card_1.CardHeader>
            <card_1.CardTitle className="font-display flex items-center gap-2">
              <lucide_react_1.Star className="w-5 h-5 text-amber-500"/> Objectifs Quotidiens
            </card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Lire {g.lessonsPerDay} cours</span>
                <span className="text-muted-foreground">{g.lessonsCompletedToday}/{g.lessonsPerDay}</span>
              </div>
              <progress_1.Progress value={lessonProgress} className="h-2 bg-secondary/20" indicatorClassName="bg-secondary"/>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Faire {g.exercisesPerDay} exercices</span>
                <span className="text-muted-foreground">{g.exercisesCompletedToday}/{g.exercisesPerDay}</span>
              </div>
              <progress_1.Progress value={exerciseProgress} className="h-2 bg-primary/20"/>
            </div>
            {lessonProgress >= 100 && exerciseProgress >= 100 && (<div className="bg-success/10 text-success border border-success/20 p-3 rounded-xl text-center text-sm font-semibold animate-in zoom-in">
                Objectifs atteints ! +50 points 🎉
              </div>)}
          </card_1.CardContent>
        </card_1.Card>
      </div>

      {/* Recent Lessons */}
      <div>
        <h2 className="text-xl font-display font-bold mb-4">Reprendre là où vous vous étiez arrêté</h2>
        {p.recentLessons && p.recentLessons.length > 0 ? (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {p.recentLessons.map(function (lesson) { return (<wouter_1.Link key={lesson.id} href={"/lessons/".concat(lesson.id)}>
                <div className="bg-card border border-border p-4 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <lucide_react_1.PlayCircle className="w-6 h-6"/>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{lesson.subjectName}</p>
                    <h3 className="font-semibold text-foreground line-clamp-1">{lesson.title}</h3>
                  </div>
                </div>
              </wouter_1.Link>); })}
          </div>) : (<div className="bg-card border border-border border-dashed p-8 rounded-2xl text-center">
            <lucide_react_1.BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50"/>
            <p className="text-muted-foreground">Aucun cours récent. Allez dans l'onglet Cours pour commencer !</p>
          </div>)}
      </div>
    </main_layout_1.MainLayout>);
}
function StatCard(_a) {
    var title = _a.title, value = _a.value, Icon = _a.icon, color = _a.color, bg = _a.bg;
    return (<card_1.Card className="rounded-2xl shadow-sm border-border overflow-hidden">
      <card_1.CardContent className="p-6 flex items-center gap-4">
        <div className={"w-12 h-12 rounded-xl ".concat(bg, " ").concat(color, " flex items-center justify-center shrink-0")}>
          <Icon className="w-6 h-6"/>
        </div>
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-2xl font-display font-bold text-foreground">{value}</p>
        </div>
      </card_1.CardContent>
    </card_1.Card>);
}
