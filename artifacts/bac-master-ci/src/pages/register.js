"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Register;
var react_1 = require("react");
var wouter_1 = require("wouter");
var api_client_react_1 = require("@workspace/api-client-react");
var use_auth_1 = require("@/hooks/use-auth");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var lucide_react_1 = require("lucide-react");
var use_toast_1 = require("@/hooks/use-toast");
var select_1 = require("@/components/ui/select");
var framer_motion_1 = require("framer-motion");
function Register() {
    var _a = (0, react_1.useState)(""), name = _a[0], setName = _a[1];
    var _b = (0, react_1.useState)(""), email = _b[0], setEmail = _b[1];
    var _c = (0, react_1.useState)(""), password = _c[0], setPassword = _c[1];
    var _d = (0, react_1.useState)("A"), series = _d[0], setSeries = _d[1];
    var login = (0, use_auth_1.useAuth)().login;
    var _e = (0, wouter_1.useLocation)(), setLocation = _e[1];
    var toast = (0, use_toast_1.useToast)().toast;
    var registerMutation = (0, api_client_react_1.useRegisterUser)();
    var handleSubmit = function (e) {
        e.preventDefault();
        registerMutation.mutate({ data: { name: name, email: email, password: password, series: series } }, {
            onSuccess: function (data) {
                login(data.token, data.user);
                toast({ title: "Inscription réussie", description: "Bienvenue sur BAC MASTER CI !" });
            },
            onError: function (err) {
                var _a, _b;
                toast({
                    title: "Erreur d'inscription",
                    description: ((_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || "Veuillez vérifier vos informations.",
                    variant: "destructive",
                });
            }
        });
    };
    return (<div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]"/>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[120px]"/>

      <framer_motion_1.motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="w-full max-w-md">
        <wouter_1.Link href="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
            <lucide_react_1.GraduationCap className="text-white w-7 h-7"/>
          </div>
          <span className="font-display font-black text-2xl tracking-tight">BAC MASTER CI</span>
        </wouter_1.Link>

        <div className="bg-card border border-border shadow-2xl shadow-black/5 rounded-3xl p-8 relative z-10">
          <h1 className="text-2xl font-bold mb-2">Créer un compte ✨</h1>
          <p className="text-muted-foreground mb-8">Rejoignez des milliers d'élèves qui préparent leur BAC.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label_1.Label htmlFor="name">Nom complet</label_1.Label>
              <div className="relative">
                <lucide_react_1.User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground"/>
                <input_1.Input id="name" placeholder="Jean Dupont" className="pl-10 h-12 rounded-xl bg-background" value={name} onChange={function (e) { return setName(e.target.value); }} required/>
              </div>
            </div>

            <div className="space-y-2">
              <label_1.Label htmlFor="email">Adresse email</label_1.Label>
              <div className="relative">
                <lucide_react_1.Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground"/>
                <input_1.Input id="email" type="email" placeholder="eleve@example.com" className="pl-10 h-12 rounded-xl bg-background" value={email} onChange={function (e) { return setEmail(e.target.value); }} required/>
              </div>
            </div>

            <div className="space-y-2">
              <label_1.Label htmlFor="series">Série du BAC</label_1.Label>
              <div className="relative">
                <select_1.Select value={series} onValueChange={function (v) { return setSeries(v); }}>
                  <select_1.SelectTrigger className="pl-10 h-12 rounded-xl bg-background w-full">
                    <lucide_react_1.BookOpen className="absolute left-3 top-3 h-5 w-5 text-muted-foreground"/>
                    <select_1.SelectValue placeholder="Choisir une série"/>
                  </select_1.SelectTrigger>
                  <select_1.SelectContent>
                    <select_1.SelectItem value="A">Série A (Littéraire)</select_1.SelectItem>
                    <select_1.SelectItem value="C">Série C (Mathématiques)</select_1.SelectItem>
                    <select_1.SelectItem value="D">Série D (Sciences)</select_1.SelectItem>
                  </select_1.SelectContent>
                </select_1.Select>
              </div>
            </div>

            <div className="space-y-2">
              <label_1.Label htmlFor="password">Mot de passe</label_1.Label>
              <div className="relative">
                <lucide_react_1.Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground"/>
                <input_1.Input id="password" type="password" placeholder="••••••••" className="pl-10 h-12 rounded-xl bg-background" value={password} onChange={function (e) { return setPassword(e.target.value); }} minLength={6} required/>
              </div>
            </div>

            <button_1.Button type="submit" className="w-full h-12 rounded-xl text-base font-semibold bg-gradient-to-r from-primary to-secondary border-0 shadow-lg shadow-primary/20 hover:shadow-xl transition-all mt-4" disabled={registerMutation.isPending}>
              {registerMutation.isPending ? <lucide_react_1.Loader2 className="animate-spin mr-2"/> : null}
              Créer mon compte
            </button_1.Button>
          </form>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            Vous avez déjà un compte ?{" "}
            <wouter_1.Link href="/login" className="text-primary font-bold hover:underline">
              Se connecter
            </wouter_1.Link>
          </div>
        </div>
      </framer_motion_1.motion.div>
    </div>);
}
