import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { useAuth } from "@/hooks/use-auth";
import { useUpdateProfile, useGetUserBadges, UpdateProfileRequestSeries } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Medal, Crown, Save, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function Profile() {
  const { user, login } = useAuth();
  const { toast } = useToast();
  
  const [name, setName] = useState(user?.name || "");
  const [series, setSeries] = useState<UpdateProfileRequestSeries>(user?.series as UpdateProfileRequestSeries || "A");
  
  const updateMutation = useUpdateProfile();
  const { data: badges } = useGetUserBadges();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(
      { data: { name, series } },
      {
        onSuccess: (updatedUser) => {
          // Update local state by calling login with same token but new user
          const token = localStorage.getItem("bac_token") || "";
          login(token, updatedUser);
          toast({ title: "Profil mis à jour", description: "Vos informations ont été enregistrées." });
        }
      }
    );
  };

  if (!user) return null;

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Mon Profil</h1>
        <p className="text-muted-foreground mt-1">Gérez vos informations personnelles et visualisez vos réussites.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          {/* Avatar Card */}
          <Card className="rounded-3xl border-border shadow-sm text-center pt-8">
            <CardContent>
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
            </CardContent>
          </Card>

          {/* Premium Card */}
          <Card className="rounded-3xl border-0 bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-orange-500/20">
            <CardContent className="p-8 relative overflow-hidden">
              <Crown className="absolute -bottom-4 -right-4 w-32 h-32 text-white/10 rotate-12" />
              <div className="relative z-10">
                <h3 className="text-2xl font-display font-bold mb-2">Statut {user.isPremium ? "Premium" : "Gratuit"}</h3>
                <p className="text-white/80 mb-6 text-sm">
                  {user.isPremium 
                    ? "Vous avez accès à tout le contenu en illimité. Profitez-en !" 
                    : "Passez Premium pour débloquer toutes les annales corrigées et l'audio."}
                </p>
                {!user.isPremium && (
                  <Button className="w-full bg-white text-orange-600 hover:bg-white/90 rounded-xl font-bold shadow-lg">
                    Débloquer Premium
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-8">
          {/* Edit Form */}
          <Card className="rounded-3xl border-border shadow-sm">
            <CardContent className="p-8">
              <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" /> Informations Personnelles
              </h3>
              <form onSubmit={handleSave} className="space-y-6">
                <div className="space-y-2">
                  <Label>Nom complet</Label>
                  <Input 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    className="h-12 rounded-xl bg-muted/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Adresse email (lecture seule)</Label>
                  <Input 
                    value={user.email} 
                    disabled 
                    className="h-12 rounded-xl bg-muted/50 text-muted-foreground cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Série</Label>
                  <Select value={series} onValueChange={(v) => setSeries(v as UpdateProfileRequestSeries)}>
                    <SelectTrigger className="h-12 rounded-xl bg-muted/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">Série A (Littéraire)</SelectItem>
                      <SelectItem value="C">Série C (Mathématiques)</SelectItem>
                      <SelectItem value="D">Série D (Sciences)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  type="submit" 
                  disabled={updateMutation.isPending}
                  className="rounded-xl px-8 h-12 gap-2"
                >
                  {updateMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Enregistrer les modifications
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Badges */}
          <Card className="rounded-3xl border-border shadow-sm">
            <CardContent className="p-8">
              <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                <Medal className="w-5 h-5 text-primary" /> Mes Badges
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {badges?.map((badge) => (
                  <div key={badge.id} className={`p-4 rounded-2xl text-center border-2 transition-all ${badge.earned ? 'border-primary/20 bg-primary/5' : 'border-border/50 bg-muted/20 opacity-60 grayscale'}`}>
                    <div className="text-4xl mb-3">{badge.icon}</div>
                    <p className="font-bold text-sm leading-tight text-foreground">{badge.name}</p>
                    {badge.earned && badge.earnedAt && (
                      <p className="text-[10px] text-muted-foreground mt-2 font-medium">
                        Obtenu le {format(new Date(badge.earnedAt), "dd MMM yyyy", { locale: fr })}
                      </p>
                    )}
                  </div>
                ))}
                {!badges || badges.length === 0 ? (
                  <div className="col-span-full py-8 text-center text-muted-foreground text-sm italic">
                    Aucun badge disponible pour le moment.
                  </div>
                ) : null}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
