import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";
import { GraduationCap, Lock, Loader2, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { useToast } from "src/hooks/use-toast";
import { motion } from "framer-motion";

export default function ResetPassword() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("token");
    if (t) setToken(t);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      toast({ title: "Erreur", description: "Les mots de passe ne correspondent pas.", variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: "Erreur", description: "Le mot de passe doit contenir au moins 6 caractères.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast({ title: "Erreur", description: data.message || "Lien invalide ou expiré.", variant: "destructive" });
        return;
      }
      setSuccess(true);
      setTimeout(() => setLocation("/login"), 3000);
    } catch {
      toast({ title: "Erreur", description: "Une erreur est survenue. Réessayez.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Link href="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
            <GraduationCap className="text-white w-7 h-7" />
          </div>
          <span className="font-display font-black text-2xl tracking-tight">BAC MASTER CI</span>
        </Link>

        <div className="bg-card border border-border shadow-2xl shadow-black/5 rounded-3xl p-8 relative z-10">
          {success ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Mot de passe mis à jour !</h1>
              <p className="text-muted-foreground text-sm">
                Votre mot de passe a été réinitialisé avec succès. Vous allez être redirigé vers la page de connexion...
              </p>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-2">Nouveau mot de passe</h1>
              <p className="text-muted-foreground mb-8 text-sm">
                Choisissez un nouveau mot de passe sécurisé pour votre compte.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="password">Nouveau mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10 h-12 rounded-xl bg-background"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(v => !v)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirmer le mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="confirm"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 h-12 rounded-xl bg-background"
                      value={confirm}
                      onChange={e => setConfirm(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl text-base font-semibold bg-gradient-to-r from-primary to-secondary border-0 shadow-lg shadow-primary/20"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="animate-spin mr-2" /> : null}
                  Réinitialiser le mot de passe
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Retour à la connexion
                </Link>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
