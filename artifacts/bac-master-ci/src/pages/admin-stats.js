"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AdminStats;
var wouter_1 = require("wouter");
var main_layout_1 = require("@/components/layout/main-layout");
var use_auth_1 = require("@/hooks/use-auth");
var card_1 = require("@/components/ui/card");
var skeleton_1 = require("@/components/ui/skeleton");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var react_query_1 = require("@tanstack/react-query");
var recharts_1 = require("recharts");
function fetchStats() {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/api/admin/stats")];
                case 1:
                    res = _a.sent();
                    if (!res.ok)
                        throw new Error("Failed to load stats");
                    return [2 /*return*/, res.json()];
            }
        });
    });
}
function fetchActivity() {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/api/admin/activity")];
                case 1:
                    res = _a.sent();
                    if (!res.ok)
                        throw new Error("Failed to load activity");
                    return [2 /*return*/, res.json()];
            }
        });
    });
}
var SERIES_COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ec4899"];
function AdminStats() {
    var _a, _b;
    var user = (0, use_auth_1.useAuth)().user;
    if ((user === null || user === void 0 ? void 0 : user.role) !== "admin")
        return <wouter_1.Redirect to="/dashboard"/>;
    var _c = (0, react_query_1.useQuery)({ queryKey: ["admin-stats"], queryFn: fetchStats }), stats = _c.data, loadingStats = _c.isLoading;
    var _d = (0, react_query_1.useQuery)({ queryKey: ["admin-activity"], queryFn: fetchActivity }), activity = _d.data, loadingActivity = _d.isLoading;
    var overviewCards = [
        { title: "Total Élèves", value: (stats === null || stats === void 0 ? void 0 : stats.totalUsers) || 0, icon: lucide_react_1.Users, color: "text-blue-500", bg: "bg-blue-500/10" },
        { title: "Leçons publiées", value: (stats === null || stats === void 0 ? void 0 : stats.totalLessons) || 0, icon: lucide_react_1.BookOpen, color: "text-primary", bg: "bg-primary/10" },
        { title: "Exercices", value: (stats === null || stats === void 0 ? void 0 : stats.totalExercises) || 0, icon: lucide_react_1.Trophy, color: "text-emerald-500", bg: "bg-emerald-500/10" },
        { title: "Avis reçus", value: (stats === null || stats === void 0 ? void 0 : stats.totalReviews) || 0, icon: lucide_react_1.Star, color: "text-amber-500", bg: "bg-amber-500/10" },
    ];
    var regData = ((_a = activity === null || activity === void 0 ? void 0 : activity.dailyRegistrations) === null || _a === void 0 ? void 0 : _a.map(function (r) { return ({
        day: r.day,
        count: Number(r.count),
    }); })) || [];
    var seriesData = ((_b = activity === null || activity === void 0 ? void 0 : activity.seriesBreakdown) === null || _b === void 0 ? void 0 : _b.map(function (r, i) { return ({
        name: "S\u00E9rie ".concat(r.series),
        value: Number(r.count),
        fill: SERIES_COLORS[i % SERIES_COLORS.length],
    }); })) || [];
    var topLessons = (activity === null || activity === void 0 ? void 0 : activity.topLessons) || [];
    return (<main_layout_1.MainLayout>
      <div className="mb-6 flex items-center gap-3">
        <wouter_1.Link href="/admin">
          <button_1.Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
            <lucide_react_1.ChevronLeft className="w-4 h-4"/> Admin
          </button_1.Button>
        </wouter_1.Link>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <lucide_react_1.BarChart2 className="w-6 h-6 text-primary"/> Statistiques & Analytiques
          </h1>
          <p className="text-sm text-muted-foreground">Suivi de l'activité de la plateforme.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {loadingStats
            ? [1, 2, 3, 4].map(function (i) { return <skeleton_1.Skeleton key={i} className="h-28 rounded-2xl"/>; })
            : overviewCards.map(function (card) { return (<card_1.Card key={card.title} className="rounded-2xl shadow-sm border-border">
              <card_1.CardContent className="p-5 flex items-center gap-4">
                <div className={"w-11 h-11 rounded-xl ".concat(card.bg, " ").concat(card.color, " flex items-center justify-center shrink-0")}>
                  <card.icon className="w-5 h-5"/>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">{card.title}</p>
                  <p className="text-2xl font-display font-bold text-foreground">{card.value.toLocaleString()}</p>
                </div>
              </card_1.CardContent>
            </card_1.Card>); })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <card_1.Card className="lg:col-span-2 rounded-2xl shadow-sm border-border">
          <card_1.CardHeader>
            <card_1.CardTitle className="font-display flex items-center gap-2">
              <lucide_react_1.TrendingUp className="w-5 h-5 text-primary"/> Inscriptions (7 derniers jours)
            </card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent>
            {loadingActivity ? (<skeleton_1.Skeleton className="h-48 w-full rounded-xl"/>) : regData.length === 0 ? (<div className="h-48 flex items-center justify-center text-sm text-muted-foreground">
                Aucune inscription récente.
              </div>) : (<div className="h-48">
                <recharts_1.ResponsiveContainer width="100%" height="100%">
                  <recharts_1.BarChart data={regData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                    <recharts_1.XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}/>
                    <recharts_1.YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} allowDecimals={false}/>
                    <recharts_1.Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0/0.1)" }} formatter={function (v) { return [v, "Inscriptions"]; }}/>
                    <recharts_1.Bar dataKey="count" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]}/>
                  </recharts_1.BarChart>
                </recharts_1.ResponsiveContainer>
              </div>)}
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card className="rounded-2xl shadow-sm border-border">
          <card_1.CardHeader>
            <card_1.CardTitle className="font-display flex items-center gap-2">
              <lucide_react_1.Users className="w-5 h-5 text-emerald-500"/> Répartition par série
            </card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent>
            {loadingActivity ? (<skeleton_1.Skeleton className="h-48 w-full rounded-xl"/>) : seriesData.length === 0 ? (<div className="h-48 flex items-center justify-center text-sm text-muted-foreground">
                Aucune donnée disponible.
              </div>) : (<div className="h-48">
                <recharts_1.ResponsiveContainer width="100%" height="100%">
                  <recharts_1.PieChart>
                    <recharts_1.Pie data={seriesData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={function (_a) {
            var name = _a.name, percent = _a.percent;
            return "".concat(name, " ").concat((percent * 100).toFixed(0), "%");
        }} labelLine={false}>
                      {seriesData.map(function (entry, i) { return (<recharts_1.Cell key={i} fill={entry.fill}/>); })}
                    </recharts_1.Pie>
                    <recharts_1.Tooltip formatter={function (v) { return [v, "Élèves"]; }}/>
                  </recharts_1.PieChart>
                </recharts_1.ResponsiveContainer>
              </div>)}
          </card_1.CardContent>
        </card_1.Card>
      </div>

      <card_1.Card className="rounded-2xl shadow-sm border-border">
        <card_1.CardHeader>
          <card_1.CardTitle className="font-display flex items-center gap-2">
            <lucide_react_1.BookOpen className="w-5 h-5 text-purple-500"/> Cours les plus consultés
          </card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent>
          {loadingActivity ? (<div className="space-y-3">
              {[1, 2, 3].map(function (i) { return <skeleton_1.Skeleton key={i} className="h-10 rounded-xl"/>; })}
            </div>) : topLessons.length === 0 ? (<p className="text-sm text-muted-foreground text-center py-6">
              Aucune donnée de consultation disponible.
            </p>) : (<div className="space-y-3">
              {topLessons.map(function (lesson, i) { return (<div key={lesson.lessonId} className="flex items-center gap-4">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{lesson.title || "Cours #".concat(lesson.lessonId)}</p>
                  </div>
                  <span className="text-sm text-muted-foreground shrink-0">{lesson.views} vues</span>
                </div>); })}
            </div>)}
        </card_1.CardContent>
      </card_1.Card>
    </main_layout_1.MainLayout>);
}
