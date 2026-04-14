"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AdminPanel;
var wouter_1 = require("wouter");
var main_layout_1 = require("@/components/layout/main-layout");
var use_auth_1 = require("@/hooks/use-auth");
var api_client_react_1 = require("@workspace/api-client-react");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var skeleton_1 = require("@/components/ui/skeleton");
function AdminPanel() {
    var user = (0, use_auth_1.useAuth)().user;
    if ((user === null || user === void 0 ? void 0 : user.role) !== "admin") {
        return <wouter_1.Redirect to="/dashboard"/>;
    }
    var _a = (0, api_client_react_1.useGetAdminStats)(), stats = _a.data, loadingStats = _a.isLoading;
    var navCards = [
        {
            href: "/admin/courses",
            icon: lucide_react_1.BookOpen,
            label: "Gestion des Cours",
            description: "Lister, modifier et supprimer les cours.",
            color: "text-primary",
            bg: "bg-primary/10",
        },
        {
            href: "/admin/add-course",
            icon: lucide_react_1.Plus,
            label: "Ajouter un Cours",
            description: "Créer un nouveau cours avec exercices.",
            color: "text-emerald-600",
            bg: "bg-emerald-500/10",
        },
        {
            href: "/admin/exams",
            icon: lucide_react_1.FileText,
            label: "Gestion des Annales",
            description: "Ajouter, modifier et supprimer les annales.",
            color: "text-purple-600",
            bg: "bg-purple-500/10",
        },
        {
            href: "/admin/stats",
            icon: lucide_react_1.BarChart2,
            label: "Statistiques",
            description: "Activité, inscriptions, cours populaires.",
            color: "text-blue-600",
            bg: "bg-blue-500/10",
        },
        {
            href: "/admin/users",
            icon: lucide_react_1.Users,
            label: "Élèves",
            description: "Consulter et gérer les comptes élèves.",
            color: "text-orange-600",
            bg: "bg-orange-500/10",
        },
    ];
    return (<main_layout_1.MainLayout>
      <div className="mb-8 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center">
          <lucide_react_1.ShieldAlert className="text-destructive w-6 h-6"/>
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Administration</h1>
          <p className="text-muted-foreground mt-0.5">Supervisez la plateforme BAC MASTER CI.</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {loadingStats ? ([1, 2, 3, 4, 5, 6].map(function (i) { return <skeleton_1.Skeleton key={i} className="h-24 rounded-2xl"/>; })) : (<>
            <StatCard title="Total Élèves" value={(stats === null || stats === void 0 ? void 0 : stats.totalUsers) || 0} icon={lucide_react_1.Users} color="text-blue-500" bg="bg-blue-500/10"/>
            <StatCard title="Comptes Premium" value={(stats === null || stats === void 0 ? void 0 : stats.premiumUsers) || 0} icon={lucide_react_1.Star} color="text-amber-500" bg="bg-amber-500/10"/>
            <StatCard title="Leçons" value={(stats === null || stats === void 0 ? void 0 : stats.totalLessons) || 0} icon={lucide_react_1.BookOpen} color="text-primary" bg="bg-primary/10"/>
            <StatCard title="Exercices" value={(stats === null || stats === void 0 ? void 0 : stats.totalExercises) || 0} icon={lucide_react_1.BrainCircuit} color="text-emerald-500" bg="bg-emerald-500/10"/>
            <StatCard title="Annales" value={(stats === null || stats === void 0 ? void 0 : stats.totalExams) || 0} icon={lucide_react_1.FileText} color="text-purple-500" bg="bg-purple-500/10"/>
            <StatCard title="Avis reçus" value={(stats === null || stats === void 0 ? void 0 : stats.totalReviews) || 0} icon={lucide_react_1.Star} color="text-orange-500" bg="bg-orange-500/10"/>
          </>)}
      </div>

      {/* Navigation Cards */}
      <h2 className="text-lg font-display font-bold text-foreground mb-4">Gérer la plateforme</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {navCards.map(function (card) { return (<wouter_1.Link key={card.href} href={card.href}>
            <card_1.Card className="rounded-2xl border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group">
              <card_1.CardContent className="p-6 flex items-center gap-5">
                <div className={"w-14 h-14 rounded-2xl ".concat(card.bg, " ").concat(card.color, " flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform")}>
                  <card.icon className="w-7 h-7"/>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-foreground text-base">{card.label}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{card.description}</p>
                </div>
                <lucide_react_1.ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0"/>
              </card_1.CardContent>
            </card_1.Card>
          </wouter_1.Link>); })}
      </div>
    </main_layout_1.MainLayout>);
}
function StatCard(_a) {
    var title = _a.title, value = _a.value, Icon = _a.icon, color = _a.color, bg = _a.bg;
    return (<card_1.Card className="rounded-2xl border-border shadow-sm">
      <card_1.CardContent className="p-5 flex items-center gap-4">
        <div className={"w-10 h-10 rounded-xl ".concat(bg, " ").concat(color, " flex items-center justify-center shrink-0")}>
          <Icon className="w-5 h-5"/>
        </div>
        <div>
          <h4 className="text-2xl font-display font-bold text-foreground">{value.toLocaleString()}</h4>
          <p className="text-xs font-medium text-muted-foreground mt-0.5">{title}</p>
        </div>
      </card_1.CardContent>
    </card_1.Card>);
}
