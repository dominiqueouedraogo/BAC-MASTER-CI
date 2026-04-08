import { useState } from "react";
import { useParams, Link } from "wouter";
import { MainLayout } from "@/components/layout/main-layout";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, FileDown, Lock, BookOpen, CheckCircle2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useUpgradeToPremium, getGetMeQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

async function fetchExam(id: number) {
  const res = await fetch(`/api/exams/${id}`);
  if (!res.ok) throw new Error("Not found");
  return res.json();
}

export default function ExamDetail() {
  const { id } = useParams<{ id: string }>();
  const examId = parseInt(id);
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<"subject" | "correction">("subject");

  const { data: exam, isLoading } = useQuery({
    queryKey: ["exam", examId],
    queryFn: () => fetchExam(examId),
  });

  const upgradeMutation = useUpgradeToPremium();

  const isLocked = exam?.isPremium && !user?.isPremium;

  const handleUpgrade = () => {
    upgradeMutation.mutate(undefined, {
      onSuccess: (updatedUser) => {
        queryClient.setQueryData(getGetMeQueryKey(), updatedUser);
        toast({ title: "Compte Premium activé !", description: "Vous avez maintenant accès à tout le contenu." });
      },
      onError: () => {
        toast({ title: "Erreur", description: "Impossible d'activer le Premium.", variant: "destructive" });
      },
    });
  };

  return (
    <MainLayout>
      <div className="mb-6 flex items-center gap-3">
        <Link href="/exams">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
            <ChevronLeft className="w-4 h-4" /> Annales
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-4 max-w-4xl">
          <Skeleton className="h-10 w-2/3 rounded-xl" />
          <Skeleton className="h-6 w-1/3 rounded-xl" />
          <Skeleton className="h-96 w-full rounded-2xl" />
        </div>
      ) : !exam ? (
        <div className="text-center py-20 text-muted-foreground">Annale introuvable.</div>
      ) : isLocked ? (
        <div className="max-w-2xl mx-auto text-center py-20">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/20">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-display font-bold mb-3">Contenu Premium</h2>
          <p className="text-muted-foreground mb-8">
            Cette annale est réservée aux membres Premium. Passez Premium pour accéder au sujet et à la correction.
          </p>
          <Button
            size="lg"
            onClick={handleUpgrade}
            disabled={upgradeMutation.isPending}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 border-0 shadow-lg shadow-orange-500/25 px-8 rounded-xl h-12"
          >
            Passer Premium
          </Button>
        </div>
      ) : (
        <div className="max-w-4xl">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider">BAC {exam.year}</span>
              <span className="text-xs font-bold bg-muted text-muted-foreground px-3 py-1 rounded-full">Série {exam.series}</span>
              {exam.isPremium && (
                <span className="text-xs font-bold bg-amber-500/10 text-amber-600 px-3 py-1 rounded-full">Premium</span>
              )}
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground">{exam.title}</h1>
            {exam.subjectName && <p className="text-muted-foreground mt-1">{exam.subjectName}</p>}
          </div>

          <div className="flex gap-2 mb-6 p-1 bg-muted/50 rounded-2xl w-fit">
            <button
              onClick={() => setTab("subject")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === "subject" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <BookOpen className="w-4 h-4" /> Sujet
            </button>
            <button
              onClick={() => setTab("correction")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === "correction" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <CheckCircle2 className="w-4 h-4" /> Correction
            </button>
          </div>

          <div className="bg-card border border-border rounded-3xl p-6 md:p-10 shadow-sm">
            {tab === "subject" ? (
              exam.content ? (
                <div
                  className="prose prose-sm max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: exam.content }}
                />
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <BookOpen className="w-10 h-10 mx-auto opacity-30 mb-3" />
                  <p>Le sujet n'a pas encore été ajouté.</p>
                </div>
              )
            ) : (
              exam.correction ? (
                <div
                  className="prose prose-sm max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: exam.correction }}
                />
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <CheckCircle2 className="w-10 h-10 mx-auto opacity-30 mb-3" />
                  <p>La correction n'a pas encore été ajoutée.</p>
                </div>
              )
            )}
          </div>

          {exam.pdfUrl && (
            <div className="mt-4">
              <a href={exam.pdfUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2 rounded-xl">
                  <FileDown className="w-4 h-4" /> Télécharger le PDF
                </Button>
              </a>
            </div>
          )}
        </div>
      )}
    </MainLayout>
  );
}
