import { Lock, Loader2 } from "lucide-react";
import { Button } from "./button";
import { useUpgradeToPremium, getGetMeQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface PremiumLockProps {
  title?: string;
  description?: string;
}

export function PremiumLock({ 
  title = "Contenu Premium", 
  description = "Ce contenu est réservé aux membres Premium. Mettez à niveau votre compte pour y accéder." 
}: PremiumLockProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const upgradeMutation = useUpgradeToPremium();

  const handleUpgrade = () => {
    upgradeMutation.mutate(undefined, {
      onSuccess: (updatedUser) => {
        queryClient.setQueryData(getGetMeQueryKey(), updatedUser);
        toast({ title: "Compte Premium activé !", description: "Vous avez maintenant accès à tout le contenu." });
      },
      onError: () => {
        toast({ title: "Erreur", description: "Impossible d'activer le Premium. Réessayez.", variant: "destructive" });
      },
    });
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-12 text-center shadow-sm">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2070&auto=format&fit=crop')] opacity-[0.03] bg-cover bg-center" />
      <div className="relative z-10 flex flex-col items-center max-w-md mx-auto">
        <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-amber-500/20">
          <Lock className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-display font-bold text-foreground mb-3">{title}</h3>
        <p className="text-muted-foreground mb-8">
          {description}
        </p>
        <Button
          size="lg"
          onClick={handleUpgrade}
          disabled={upgradeMutation.isPending}
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 border-0 shadow-lg shadow-orange-500/25 w-full sm:w-auto px-8 rounded-xl h-14 text-lg"
        >
          {upgradeMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
          Passer Premium
        </Button>
      </div>
    </div>
  );
}
