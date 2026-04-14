import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useLoginUser } from "@workspace/api-client-react";
import { useAuth } from "src/hooks/use-auth";
import { useAuth as useReplitAuth } from "@workspace/replit-auth-web";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";
import { GraduationCap, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useToast } from "src/hooks/use-toast";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const { login: replitLogin } = useReplitAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const loginMutation = useLoginUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { data: { email, password } },
      {
        onSuccess: (data) => {
          login(data.token, data.user);
          toast({ title: "Connexion réussie", description: `Bienvenue, ${data.user.name}!` });
        },
        onError: (err) => {
          toast({
            title: "Erreur de connexion",
            description: err.response?.data?.message || "Identifiants incorrects.",
            variant: "destructive",
          });
        }
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Decorative background */}
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
          <h1 className="text-2xl font-bold mb-2">Bon retour ! 👋</h1>
          <p className="text-muted-foreground mb-8">Connectez-vous pour continuer votre apprentissage.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Adresse email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="eleve@example.com" 
                  className="pl-10 h-12 rounded-xl bg-background"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mot de passe</Label>
                <Link href="/forgot-password" className="text-sm text-primary font-medium hover:underline">Mot de passe oublié ?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  className="pl-10 h-12 rounded-xl bg-background"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 rounded-xl text-base font-semibold bg-gradient-to-r from-primary to-secondary border-0 shadow-lg shadow-primary/20 hover:shadow-xl transition-all hover:-translate-y-0.5"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? <Loader2 className="animate-spin mr-2" /> : null}
              Se connecter
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-card px-3 text-muted-foreground">ou</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full h-12 rounded-xl text-base font-semibold border-border hover:bg-accent transition-all"
            onClick={replitLogin}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Continuer avec Replit
          </Button>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Vous n'avez pas de compte ?{" "}
            <Link href="/register" className="text-primary font-bold hover:underline">
              S'inscrire ici
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
