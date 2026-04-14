import { useState } from "react";
import { Link } from "wouter";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";
import { GraduationCap, Mail, ArrowLeft, Loader2, CheckCircle2, Copy, Check } from "lucide-react";
import { useToast } from "src/hooks/use-toast";
import { motion } from "framer-motion";

export default function ForgotPassword() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const resetUrl = resetToken
    ? `${window.location.origin}${import.meta.env.BASE_URL}reset-password?token=${resetToken}`
    : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.resetToken) {
        setResetToken(data.resetToken);
      } else {
        toast({ title: "Vérifiez votre email", description: data.message });
      }
    } catch {
      toast({ title: "Erreur", description: "Une erreur est survenue. Réessayez.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!resetUrl) return;
    navigator.clipboard.writeText(resetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Lien copié !" });
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
        <Link href="/login" className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
            <GraduationCap className="text-white w-7 h-7" />
          </div>
          <span className="font-display font-black text-2xl tracking-tight">BAC MASTER CI</span>
        </Link>

        <div className="bg-card border border-border shadow-2xl shadow-black/5 rounded-3xl p-8 relative z-10">
          {resetToken ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Lien créé !</h1>
              <p className="text-muted-foreground mb-6 text-sm">
                Utilisez ce lien pour réinitialiser votre mot de passe. Il expire dans 1 heure.
              </p>
              <div className="bg-muted/50 rounded-2xl p-4 mb-4 text-left">
                <p className="text-xs text-muted-foreground mb-2 font-semibold uppercase tracking-wider">Lien de réinitialisation</p>
                <p className="text-xs font-mono break-all text-foreground leading-relaxed">{resetUrl}</p>
              </div>
              <div className="flex gap-3">
                <Button onClick={handleCopy} variant="outline" className="flex-1 rounded-xl gap-2">
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copié !" : "Copier le lien"}
                </Button>
                <a href={resetUrl!} className="flex-1">
                  <Button className="w-full rounded-xl">Réinitialiser</Button>
                </a>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-2">Mot de passe oublié ?</h1>
              <p className="text-muted-foreground mb-8 text-sm">
                Entrez votre adresse email et nous vous fournirons un lien pour réinitialiser votre mot de passe.
              </p>

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
                      onChange={e => setEmail(e.target.value)}
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
                  Envoyer le lien
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Link href="/login" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Retour à la connexion
                </Link>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
