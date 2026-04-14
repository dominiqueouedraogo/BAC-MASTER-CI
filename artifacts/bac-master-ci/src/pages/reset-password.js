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
exports.default = ResetPassword;
var react_1 = require("react");
var wouter_1 = require("wouter");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var lucide_react_1 = require("lucide-react");
var use_toast_1 = require("@/hooks/use-toast");
var framer_motion_1 = require("framer-motion");
function ResetPassword() {
    var _this = this;
    var toast = (0, use_toast_1.useToast)().toast;
    var _a = (0, wouter_1.useLocation)(), setLocation = _a[1];
    var _b = (0, react_1.useState)(""), token = _b[0], setToken = _b[1];
    var _c = (0, react_1.useState)(""), password = _c[0], setPassword = _c[1];
    var _d = (0, react_1.useState)(""), confirm = _d[0], setConfirm = _d[1];
    var _e = (0, react_1.useState)(false), showPassword = _e[0], setShowPassword = _e[1];
    var _f = (0, react_1.useState)(false), loading = _f[0], setLoading = _f[1];
    var _g = (0, react_1.useState)(false), success = _g[0], setSuccess = _g[1];
    (0, react_1.useEffect)(function () {
        var params = new URLSearchParams(window.location.search);
        var t = params.get("token");
        if (t)
            setToken(t);
    }, []);
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var res, data, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    if (password !== confirm) {
                        toast({ title: "Erreur", description: "Les mots de passe ne correspondent pas.", variant: "destructive" });
                        return [2 /*return*/];
                    }
                    if (password.length < 6) {
                        toast({ title: "Erreur", description: "Le mot de passe doit contenir au moins 6 caractères.", variant: "destructive" });
                        return [2 /*return*/];
                    }
                    setLoading(true);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch("/api/auth/reset-password", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ token: token, password: password }),
                        })];
                case 2:
                    res = _b.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _b.sent();
                    if (!res.ok) {
                        toast({ title: "Erreur", description: data.message || "Lien invalide ou expiré.", variant: "destructive" });
                        return [2 /*return*/];
                    }
                    setSuccess(true);
                    setTimeout(function () { return setLocation("/login"); }, 3000);
                    return [3 /*break*/, 6];
                case 4:
                    _a = _b.sent();
                    toast({ title: "Erreur", description: "Une erreur est survenue. Réessayez.", variant: "destructive" });
                    return [3 /*break*/, 6];
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
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
          {success ? (<div className="text-center">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <lucide_react_1.CheckCircle2 className="w-8 h-8 text-emerald-500"/>
              </div>
              <h1 className="text-2xl font-bold mb-2">Mot de passe mis à jour !</h1>
              <p className="text-muted-foreground text-sm">
                Votre mot de passe a été réinitialisé avec succès. Vous allez être redirigé vers la page de connexion...
              </p>
            </div>) : (<>
              <h1 className="text-2xl font-bold mb-2">Nouveau mot de passe</h1>
              <p className="text-muted-foreground mb-8 text-sm">
                Choisissez un nouveau mot de passe sécurisé pour votre compte.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label_1.Label htmlFor="password">Nouveau mot de passe</label_1.Label>
                  <div className="relative">
                    <lucide_react_1.Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground"/>
                    <input_1.Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" className="pl-10 pr-10 h-12 rounded-xl bg-background" value={password} onChange={function (e) { return setPassword(e.target.value); }} required minLength={6}/>
                    <button type="button" onClick={function () { return setShowPassword(function (v) { return !v; }); }} className="absolute right-3 top-3 text-muted-foreground hover:text-foreground">
                      {showPassword ? <lucide_react_1.EyeOff className="h-5 w-5"/> : <lucide_react_1.Eye className="h-5 w-5"/>}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label_1.Label htmlFor="confirm">Confirmer le mot de passe</label_1.Label>
                  <div className="relative">
                    <lucide_react_1.Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground"/>
                    <input_1.Input id="confirm" type={showPassword ? "text" : "password"} placeholder="••••••••" className="pl-10 h-12 rounded-xl bg-background" value={confirm} onChange={function (e) { return setConfirm(e.target.value); }} required/>
                  </div>
                </div>

                <button_1.Button type="submit" className="w-full h-12 rounded-xl text-base font-semibold bg-gradient-to-r from-primary to-secondary border-0 shadow-lg shadow-primary/20" disabled={loading}>
                  {loading ? <lucide_react_1.Loader2 className="animate-spin mr-2"/> : null}
                  Réinitialiser le mot de passe
                </button_1.Button>
              </form>

              <div className="mt-6 text-center">
                <wouter_1.Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Retour à la connexion
                </wouter_1.Link>
              </div>
            </>)}
        </div>
      </framer_motion_1.motion.div>
    </div>);
}
