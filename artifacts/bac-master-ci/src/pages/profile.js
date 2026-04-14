"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Profile;
var react_1 = require("react");
var main_layout_1 = require("@/components/layout/main-layout");
var use_auth_1 = require("@/hooks/use-auth");
var api_client_react_1 = require("@workspace/api-client-react");
var react_query_1 = require("@tanstack/react-query");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var use_toast_1 = require("@/hooks/use-toast");
var select_1 = require("@/components/ui/select");
var lucide_react_1 = require("lucide-react");
var date_fns_1 = require("date-fns");
var locale_1 = require("date-fns/locale");
function Profile() {
    var _a = (0, use_auth_1.useAuth)(), user = _a.user, login = _a.login;
    var toast = (0, use_toast_1.useToast)().toast;
    var queryClient = (0, react_query_1.useQueryClient)();
    var _b = (0, react_1.useState)((user === null || user === void 0 ? void 0 : user.name) || ""), name = _b[0], setName = _b[1];
    var _c = (0, react_1.useState)((user === null || user === void 0 ? void 0 : user.series) || "A"), series = _c[0], setSeries = _c[1];
    var updateMutation = (0, api_client_react_1.useUpdateProfile)();
    var badges = (0, api_client_react_1.useGetUserBadges)().data;
    var upgradeMutation = (0, api_client_react_1.useUpgradeToPremium)();
    var handleUpgrade = function () {
        upgradeMutation.mutate(undefined, {
            onSuccess: function (updatedUser) {
                queryClient.setQueryData((0, api_client_react_1.getGetMeQueryKey)(), updatedUser);
                toast({ title: "Compte Premium activé !", description: "Vous avez maintenant accès à tout le contenu." });
            },
            onError: function () {
                toast({ title: "Erreur", description: "Impossible d'activer le Premium. Réessayez.", variant: "destructive" });
            },
        });
    };
    var handleSave = function (e) {
        e.preventDefault();
        updateMutation.mutate({ data: { name: name, series: series } }, {
            onSuccess: function (updatedUser) {
                // Update local state by calling login with same token but new user
                var token = localStorage.getItem("bac_token") || "";
                login(token, updatedUser);
                toast({ title: "Profil mis à jour", description: "Vos informations ont été enregistrées." });
            }
        });
    };
    if (!user)
        return null;
    return (<main_layout_1.MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Mon Profil</h1>
        <p className="text-muted-foreground mt-1">Gérez vos informations personnelles et visualisez vos réussites.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          {/* Avatar Card */}
          <card_1.Card className="rounded-3xl border-border shadow-sm text-center pt-8">
            <card_1.CardContent>
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary p-1 mb-4 shadow-xl">
                <div className="w-full h-full bg-card rounded-full flex items-center justify-center text-5xl font-bold text-primary">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </div>
              <h2 className="text-2xl font-bold text-foreground">{user.name}</h2>
              <p className="text-muted-foreground mb-4">Série {user.series}</p>
              
              <div className="inline-flex items-center justify-center bg-muted/50 rounded-xl p-3 border border-border w-full">
                <div className="text-center px-4 border-r border-border">
                  <div className="text-2xl font-display font-bold text-amber-500">{user.points}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Points</div>
                </div>
                <div className="text-center px-4">
                  <div className="text-2xl font-display font-bold text-primary">{user.role === 'admin' ? 'Admin' : 'Élève'}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Rôle</div>
                </div>
              </div>
            </card_1.CardContent>
          </card_1.Card>

          {/* Premium Card */}
          <card_1.Card className="rounded-3xl border-0 bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-orange-500/20">
            <card_1.CardContent className="p-8 relative overflow-hidden">
              <lucide_react_1.Crown className="absolute -bottom-4 -right-4 w-32 h-32 text-white/10 rotate-12"/>
              <div className="relative z-10">
                <h3 className="text-2xl font-display font-bold mb-2">Statut {user.isPremium ? "Premium" : "Gratuit"}</h3>
                <p className="text-white/80 mb-6 text-sm">
                  {user.isPremium
            ? "Vous avez accès à tout le contenu en illimité. Profitez-en !"
            : "Passez Premium pour débloquer toutes les annales corrigées et l'audio."}
                </p>
                {!user.isPremium && (<button_1.Button className="w-full bg-white text-orange-600 hover:bg-white/90 rounded-xl font-bold shadow-lg" onClick={handleUpgrade} disabled={upgradeMutation.isPending}>
                    {upgradeMutation.isPending ? <lucide_react_1.Loader2 className="w-4 h-4 animate-spin mr-2"/> : null}
                    Débloquer Premium
                  </button_1.Button>)}
              </div>
            </card_1.CardContent>
          </card_1.Card>
        </div>

        <div className="lg:col-span-2 space-y-8">
          {/* Edit Form */}
          <card_1.Card className="rounded-3xl border-border shadow-sm">
            <card_1.CardContent className="p-8">
              <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                <lucide_react_1.User className="w-5 h-5 text-primary"/> Informations Personnelles
              </h3>
              <form onSubmit={handleSave} className="space-y-6">
                <div className="space-y-2">
                  <label_1.Label>Nom complet</label_1.Label>
                  <input_1.Input value={name} onChange={function (e) { return setName(e.target.value); }} className="h-12 rounded-xl bg-muted/30"/>
                </div>
                <div className="space-y-2">
                  <label_1.Label>Adresse email (lecture seule)</label_1.Label>
                  <input_1.Input value={user.email} disabled className="h-12 rounded-xl bg-muted/50 text-muted-foreground cursor-not-allowed"/>
                </div>
                <div className="space-y-2">
                  <label_1.Label>Série</label_1.Label>
                  <select_1.Select value={series} onValueChange={function (v) { return setSeries(v); }}>
                    <select_1.SelectTrigger className="h-12 rounded-xl bg-muted/30">
                      <select_1.SelectValue />
                    </select_1.SelectTrigger>
                    <select_1.SelectContent>
                      <select_1.SelectItem value="A">Série A (Littéraire)</select_1.SelectItem>
                      <select_1.SelectItem value="C">Série C (Mathématiques)</select_1.SelectItem>
                      <select_1.SelectItem value="D">Série D (Sciences)</select_1.SelectItem>
                    </select_1.SelectContent>
                  </select_1.Select>
                </div>
                <button_1.Button type="submit" disabled={updateMutation.isPending} className="rounded-xl px-8 h-12 gap-2">
                  {updateMutation.isPending ? <lucide_react_1.Loader2 className="w-4 h-4 animate-spin"/> : <lucide_react_1.Save className="w-4 h-4"/>}
                  Enregistrer les modifications
                </button_1.Button>
              </form>
            </card_1.CardContent>
          </card_1.Card>

          {/* Badges */}
          <card_1.Card className="rounded-3xl border-border shadow-sm">
            <card_1.CardContent className="p-8">
              <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                <lucide_react_1.Medal className="w-5 h-5 text-primary"/> Mes Badges
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {badges === null || badges === void 0 ? void 0 : badges.map(function (badge) { return (<div key={badge.id} className={"p-4 rounded-2xl text-center border-2 transition-all ".concat(badge.earned ? 'border-primary/20 bg-primary/5' : 'border-border/50 bg-muted/20 opacity-60 grayscale')}>
                    <div className="text-4xl mb-3">{badge.icon}</div>
                    <p className="font-bold text-sm leading-tight text-foreground">{badge.name}</p>
                    {badge.earned && badge.earnedAt && (<p className="text-[10px] text-muted-foreground mt-2 font-medium">
                        Obtenu le {(0, date_fns_1.format)(new Date(badge.earnedAt), "dd MMM yyyy", { locale: locale_1.fr })}
                      </p>)}
                  </div>); })}
                {!badges || badges.length === 0 ? (<div className="col-span-full py-8 text-center text-muted-foreground text-sm italic">
                    Aucun badge disponible pour le moment.
                  </div>) : null}
              </div>
            </card_1.CardContent>
          </card_1.Card>
        </div>
      </div>
    </main_layout_1.MainLayout>);
}
