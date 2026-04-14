"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Login;
var react_1 = require("react");
var wouter_1 = require("wouter");
var api_client_react_1 = require("@workspace/api-client-react");
var use_auth_1 = require("@/hooks/use-auth");
var replit_auth_web_1 = require("@workspace/replit-auth-web");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var lucide_react_1 = require("lucide-react");
var use_toast_1 = require("@/hooks/use-toast");
var framer_motion_1 = require("framer-motion");
function Login() {
    var _a = (0, react_1.useState)(""), email = _a[0], setEmail = _a[1];
    var _b = (0, react_1.useState)(""), password = _b[0], setPassword = _b[1];
    var login = (0, use_auth_1.useAuth)().login;
    var replitLogin = (0, replit_auth_web_1.useAuth)().login;
    var _c = (0, wouter_1.useLocation)(), setLocation = _c[1];
    var toast = (0, use_toast_1.useToast)().toast;
    var loginMutation = (0, api_client_react_1.useLoginUser)();
    var handleSubmit = function (e) {
        e.preventDefault();
        loginMutation.mutate({ data: { email: email, password: password } }, {
            onSuccess: function (data) {
                login(data.token, data.user);
                toast({ title: "Connexion réussie", description: "Bienvenue, ".concat(data.user.name, "!") });
            },
            onError: function (err) {
                var _a, _b;
                toast({
                    title: "Erreur de connexion",
                    description: ((_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || "Identifiants incorrects.",
                    variant: "destructive",
                });
            }
        });
    };
    return (<div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Decorative background */}
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
          <h1 className="text-2xl font-bold mb-2">Bon retour ! 👋</h1>
          <p className="text-muted-foreground mb-8">Connectez-vous pour continuer votre apprentissage.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label_1.Label htmlFor="email">Adresse email</label_1.Label>
              <div className="relative">
                <lucide_react_1.Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground"/>
                <input_1.Input id="email" type="email" placeholder="eleve@example.com" className="pl-10 h-12 rounded-xl bg-background" value={email} onChange={function (e) { return setEmail(e.target.value); }} required/>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label_1.Label htmlFor="password">Mot de passe</label_1.Label>
                <wouter_1.Link href="/forgot-password" className="text-sm text-primary font-medium hover:underline">Mot de passe oublié ?</wouter_1.Link>
              </div>
              <div className="relative">
                <lucide_react_1.Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground"/>
                <input_1.Input id="password" type="password" placeholder="••••••••" className="pl-10 h-12 rounded-xl bg-background" value={password} onChange={function (e) { return setPassword(e.target.value); }} required/>
              </div>
            </div>

            <button_1.Button type="submit" className="w-full h-12 rounded-xl text-base font-semibold bg-gradient-to-r from-primary to-secondary border-0 shadow-lg shadow-primary/20 hover:shadow-xl transition-all hover:-translate-y-0.5" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? <lucide_react_1.Loader2 className="animate-spin mr-2"/> : null}
              Se connecter
            </button_1.Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"/>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-card px-3 text-muted-foreground">ou</span>
            </div>
          </div>

          <button_1.Button type="button" variant="outline" className="w-full h-12 rounded-xl text-base font-semibold border-border hover:bg-accent transition-all" onClick={replitLogin}>
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Continuer avec Replit
          </button_1.Button>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Vous n'avez pas de compte ?{" "}
            <wouter_1.Link href="/register" className="text-primary font-bold hover:underline">
              S'inscrire ici
            </wouter_1.Link>
          </div>
        </div>
      </framer_motion_1.motion.div>
    </div>);
}
