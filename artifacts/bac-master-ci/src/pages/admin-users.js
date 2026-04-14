"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.default = AdminUsers;
var react_1 = require("react");
var wouter_1 = require("wouter");
var main_layout_1 = require("@/components/layout/main-layout");
var use_auth_1 = require("@/hooks/use-auth");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var badge_1 = require("@/components/ui/badge");
var skeleton_1 = require("@/components/ui/skeleton");
var lucide_react_1 = require("lucide-react");
var api_client_react_1 = require("@workspace/api-client-react");
var react_query_1 = require("@tanstack/react-query");
var api_client_react_2 = require("@workspace/api-client-react");
function AdminUsers() {
    var _this = this;
    var _a, _b, _c, _d;
    var user = (0, use_auth_1.useAuth)().user;
    var _e = (0, react_1.useState)(""), search = _e[0], setSearch = _e[1];
    var _f = (0, react_1.useState)(null), updating = _f[0], setUpdating = _f[1];
    var queryClient = (0, react_query_1.useQueryClient)();
    if ((user === null || user === void 0 ? void 0 : user.role) !== "admin")
        return <wouter_1.Redirect to="/dashboard"/>;
    var _g = (0, api_client_react_1.useGetAdminUsers)(), users = _g.data, isLoading = _g.isLoading;
    var filtered = users === null || users === void 0 ? void 0 : users.filter(function (u) {
        return u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase()) ||
            (u.series || "").toLowerCase().includes(search.toLowerCase());
    });
    var seriesBadge = function (series) {
        var map = {
            A: "bg-purple-500/10 text-purple-600 border-purple-200",
            C: "bg-blue-500/10 text-blue-600 border-blue-200",
            D: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
        };
        return map[series || ""] || "bg-muted text-muted-foreground";
    };
    var patchUser = function (id, patch) { return __awaiter(_this, void 0, void 0, function () {
        var token, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setUpdating(id);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 3, 4]);
                    token = localStorage.getItem("bac_token");
                    return [4 /*yield*/, fetch("/api/admin/users/".concat(id), {
                            method: "PATCH",
                            headers: __assign({ "Content-Type": "application/json" }, (token ? { Authorization: "Bearer ".concat(token) } : {})),
                            body: JSON.stringify(patch),
                        })];
                case 2:
                    res = _a.sent();
                    if (res.ok) {
                        queryClient.invalidateQueries({ queryKey: (0, api_client_react_2.getGetAdminUsersQueryKey)() });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    setUpdating(null);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var formatDate = function (iso) {
        return new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
    };
    var totalUsers = (_a = users === null || users === void 0 ? void 0 : users.length) !== null && _a !== void 0 ? _a : 0;
    var premiumCount = (_b = users === null || users === void 0 ? void 0 : users.filter(function (u) { return u.isPremium; }).length) !== null && _b !== void 0 ? _b : 0;
    var replitCount = (_c = users === null || users === void 0 ? void 0 : users.filter(function (u) { return u.replitId; }).length) !== null && _c !== void 0 ? _c : 0;
    return (<main_layout_1.MainLayout>
      <div className="mb-6 flex items-center gap-3">
        <wouter_1.Link href="/admin">
          <button_1.Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
            <lucide_react_1.ChevronLeft className="w-4 h-4"/> Admin
          </button_1.Button>
        </wouter_1.Link>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <lucide_react_1.Users className="w-6 h-6 text-primary"/> Gestion des Utilisateurs
          </h1>
          <p className="text-sm text-muted-foreground">Consulter et gérer tous les comptes.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <card_1.Card className="rounded-2xl border-border shadow-sm">
          <card_1.CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <lucide_react_1.Users className="w-5 h-5 text-primary"/>
            </div>
            <div>
              <p className="text-2xl font-bold">{totalUsers}</p>
              <p className="text-xs text-muted-foreground">Utilisateurs total</p>
            </div>
          </card_1.CardContent>
        </card_1.Card>
        <card_1.Card className="rounded-2xl border-border shadow-sm">
          <card_1.CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <lucide_react_1.Star className="w-5 h-5 text-amber-500"/>
            </div>
            <div>
              <p className="text-2xl font-bold">{premiumCount}</p>
              <p className="text-xs text-muted-foreground">Comptes Premium</p>
            </div>
          </card_1.CardContent>
        </card_1.Card>
        <card_1.Card className="rounded-2xl border-border shadow-sm">
          <card_1.CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
              <lucide_react_1.UserCheck className="w-5 h-5 text-green-600"/>
            </div>
            <div>
              <p className="text-2xl font-bold">{replitCount}</p>
              <p className="text-xs text-muted-foreground">Via Replit Auth</p>
            </div>
          </card_1.CardContent>
        </card_1.Card>
      </div>

      <card_1.Card className="rounded-3xl border-border shadow-sm">
        <card_1.CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <lucide_react_1.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
              <input_1.Input placeholder="Rechercher par nom, email ou série..." className="pl-9 rounded-xl bg-muted/50 border-0" value={search} onChange={function (e) { return setSearch(e.target.value); }}/>
            </div>
            <span className="text-sm text-muted-foreground shrink-0">
              {(_d = filtered === null || filtered === void 0 ? void 0 : filtered.length) !== null && _d !== void 0 ? _d : 0} résultats
            </span>
          </div>
        </card_1.CardHeader>
        <card_1.CardContent>
          {isLoading ? (<div className="space-y-3">
              {[1, 2, 3, 4].map(function (i) { return <skeleton_1.Skeleton key={i} className="h-16 w-full rounded-xl"/>; })}
            </div>) : !(filtered === null || filtered === void 0 ? void 0 : filtered.length) ? (<div className="py-16 text-center text-muted-foreground">
              <lucide_react_1.Users className="w-12 h-12 mx-auto opacity-40 mb-3"/>
              <p>Aucun utilisateur trouvé.</p>
            </div>) : (<div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-muted-foreground uppercase bg-muted/50">
                    <th className="text-left px-4 py-3 rounded-tl-xl">Utilisateur</th>
                    <th className="text-left px-4 py-3">Série</th>
                    <th className="text-left px-4 py-3">Points</th>
                    <th className="text-left px-4 py-3">Auth</th>
                    <th className="text-left px-4 py-3">Premium</th>
                    <th className="text-left px-4 py-3">Rôle</th>
                    <th className="text-left px-4 py-3 rounded-tr-xl">Inscrit le</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {filtered.map(function (u) {
                var _a;
                var adminUser = u;
                var isUpdating = updating === adminUser.id;
                return (<tr key={adminUser.id} className="hover:bg-muted/20 transition-colors">
                        {/* Name + email */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                              {adminUser.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-foreground leading-tight">{adminUser.name}</p>
                              <p className="text-xs text-muted-foreground">{adminUser.email}</p>
                            </div>
                          </div>
                        </td>

                        {/* Series selector */}
                        <td className="px-4 py-4">
                          <select disabled={isUpdating || adminUser.role === "admin"} value={adminUser.series || "A"} onChange={function (e) { return patchUser(adminUser.id, { series: e.target.value }); }} className={"text-xs font-bold px-2 py-1 rounded-full border cursor-pointer ".concat(seriesBadge(adminUser.series), " disabled:cursor-default")}>
                            <option value="A">A</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                          </select>
                        </td>

                        {/* Points */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1.5">
                            <lucide_react_1.Trophy className="w-3.5 h-3.5 text-amber-500"/>
                            <span className="font-semibold">{(_a = adminUser.points) !== null && _a !== void 0 ? _a : 0}</span>
                          </div>
                        </td>

                        {/* Auth method */}
                        <td className="px-4 py-4">
                          <div className="flex flex-col gap-1">
                            {adminUser.replitId ? (<badge_1.Badge className="text-[10px] bg-green-500/10 text-green-700 border-green-200 gap-1 w-fit">
                                <lucide_react_1.CheckCircle2 className="w-3 h-3"/> Replit
                              </badge_1.Badge>) : (<badge_1.Badge variant="outline" className="text-[10px] text-muted-foreground gap-1 w-fit">
                                <lucide_react_1.XCircle className="w-3 h-3"/> Email
                              </badge_1.Badge>)}
                          </div>
                        </td>

                        {/* Premium toggle */}
                        <td className="px-4 py-4">
                          <button disabled={isUpdating} onClick={function () { return patchUser(adminUser.id, { isPremium: !adminUser.isPremium }); }} className={"px-2.5 py-1 rounded-full text-xs font-bold transition-colors ".concat(adminUser.isPremium
                        ? "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20"
                        : "bg-muted text-muted-foreground hover:bg-muted/80")}>
                            {adminUser.isPremium ? "Premium ✓" : "Standard"}
                          </button>
                        </td>

                        {/* Role toggle */}
                        <td className="px-4 py-4">
                          {adminUser.id === (user === null || user === void 0 ? void 0 : user.id) ? (<div className="flex items-center gap-1.5 text-destructive">
                              <lucide_react_1.Shield className="w-3.5 h-3.5"/>
                              <span className="text-xs font-bold uppercase">Admin</span>
                            </div>) : (<button disabled={isUpdating} onClick={function () { return patchUser(adminUser.id, { role: adminUser.role === "admin" ? "student" : "admin" }); }} className={"flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full transition-colors ".concat(adminUser.role === "admin"
                            ? "bg-destructive/10 text-destructive hover:bg-destructive/20"
                            : "bg-muted text-muted-foreground hover:bg-muted/80")}>
                              {adminUser.role === "admin" ? (<><lucide_react_1.Shield className="w-3 h-3"/> Admin</>) : "Élève"}
                            </button>)}
                        </td>

                        {/* Registered date */}
                        <td className="px-4 py-4 text-xs text-muted-foreground whitespace-nowrap">
                          {formatDate(adminUser.createdAt)}
                        </td>
                      </tr>);
            })}
                </tbody>
              </table>
            </div>)}
        </card_1.CardContent>
      </card_1.Card>
    </main_layout_1.MainLayout>);
}
