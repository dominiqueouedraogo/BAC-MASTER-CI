import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useRegisterUser, RegisterRequestSeries } from "@workspace/api-client-react";
import { useAuth } from "src/hooks/use-auth";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";
import { GraduationCap, Mail, Lock, User as UserIcon, BookOpen, Loader2 } from "lucide-react";
import { useToast } from "src/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "src/components/ui/select";
import { motion } from "framer-motion";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [series, setSeries] = useState<RegisterRequestSeries>("A");
  
  const { login } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const registerMutation = useRegisterUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(
      { data: { name, email, password, series } },
      {
        onSuccess: (data) => {
          login(data.token, data.user);
          toast({ title: "Inscription réussie", description: "Bienvenue sur BAC MASTER CI !" });
        },
        onError: (err) => {
          toast({
            title: "Erreur d'inscription",
            description: err.response?.data?.message || "Veuillez vérifier vos informations.",
            variant: "destructive",
          });
        }
      }
    );
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
          <h1 className="text-2xl font-bold mb-2">Créer un compte ✨</h1>
          <p className="text-muted-foreground mb-8">Rejoignez des milliers d'élèves qui préparent leur BAC.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="name" 
                  placeholder="Jean Dupont" 
                  className="pl-10 h-12 rounded-xl bg-background"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

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
              <Label htmlFor="series">Série du BAC</Label>
              <div className="relative">
                <Select value={series} onValueChange={(v) => setSeries(v as RegisterRequestSeries)}>
                  <SelectTrigger className="pl-10 h-12 rounded-xl bg-background w-full">
                    <BookOpen className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <SelectValue placeholder="Choisir une série" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Série A (Littéraire)</SelectItem>
                    <SelectItem value="C">Série C (Mathématiques)</SelectItem>
                    <SelectItem value="D">Série D (Sciences)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  className="pl-10 h-12 rounded-xl bg-background"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 rounded-xl text-base font-semibold bg-gradient-to-r from-primary to-secondary border-0 shadow-lg shadow-primary/20 hover:shadow-xl transition-all mt-4"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? <Loader2 className="animate-spin mr-2" /> : null}
              Créer mon compte
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            Vous avez déjà un compte ?{" "}
            <Link href="/login" className="text-primary font-bold hover:underline">
              Se connecter
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
