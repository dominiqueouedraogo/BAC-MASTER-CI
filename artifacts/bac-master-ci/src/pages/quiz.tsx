import { useState } from "react";
import { useParams, Link } from "wouter";
import { useGetExercise, useSubmitExercise } from "@workspace/api-client-react";
import { MainLayout } from "@/components/layout/main-layout";
import { PremiumLock } from "@/components/ui/premium-lock";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, CheckCircle2, XCircle, Trophy } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { getDifficultyColor } from "@/lib/utils";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function Quiz() {
  const { id } = useParams();
  const exerciseId = parseInt(id || "0");
  const { user } = useAuth();
  const { width, height } = useWindowSize();
  
  const { data: exercise, isLoading } = useGetExercise(exerciseId);
  const submitMutation = useSubmitExercise();

  const [selectedOption, setSelectedOption] = useState<string>("");
  const [openAnswer, setOpenAnswer] = useState<string>("");

  if (isLoading) {
    return <MainLayout><Skeleton className="w-full h-96 rounded-3xl" /></MainLayout>;
  }

  if (!exercise) return <MainLayout><div className="p-8 text-center">Exercice introuvable</div></MainLayout>;

  if (exercise.isPremium && !user?.isPremium) {
    return <MainLayout><PremiumLock title="Exercice Premium" /></MainLayout>;
  }

  const handleSubmit = () => {
    const answer = exercise.type === 'open' ? openAnswer : selectedOption;
    if (!answer) return;
    submitMutation.mutate({ id: exerciseId, data: { answer } });
  };

  const result = submitMutation.data;
  const showConfetti = result?.correct;

  return (
    <MainLayout>
      {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={500} />}
      
      <Link href="/exercises" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6">
        <ChevronLeft className="w-4 h-4 mr-1" /> Retour aux exercices
      </Link>

      <div className="max-w-3xl mx-auto">
        <div className="bg-card border border-border shadow-sm rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="bg-secondary/5 border-b border-border p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${getDifficultyColor(exercise.difficulty)}`}>
                {exercise.difficulty === 'easy' ? 'Facile' : exercise.difficulty === 'medium' ? 'Moyen' : 'Difficile'}
              </span>
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider border-l border-border pl-3">Série {exercise.series}</span>
            </div>
          </div>

          {/* Question Body */}
          <div className="p-6 md:p-10">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-8 leading-relaxed">
              {exercise.question}
            </h2>

            {!result ? (
              <div className="space-y-4">
                {(exercise.type === 'mcq' || exercise.type === 'true_false') && exercise.options && (
                  <div className="grid gap-3">
                    {exercise.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedOption(opt)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all font-medium text-lg ${
                          selectedOption === opt 
                            ? 'border-primary bg-primary/5 text-primary' 
                            : 'border-border hover:border-primary/30 hover:bg-muted/50'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {exercise.type === 'open' && (
                  <Textarea 
                    placeholder="Saisissez votre réponse détaillée ici..."
                    className="min-h-[150px] text-lg p-4 rounded-xl bg-background"
                    value={openAnswer}
                    onChange={(e) => setOpenAnswer(e.target.value)}
                  />
                )}

                <div className="pt-8">
                  <Button 
                    size="lg" 
                    className="w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90"
                    disabled={(!selectedOption && !openAnswer) || submitMutation.isPending}
                    onClick={handleSubmit}
                  >
                    {submitMutation.isPending ? "Vérification..." : "Valider ma réponse"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className={`p-6 rounded-2xl border-2 mb-6 ${result.correct ? 'bg-success/10 border-success/30' : 'bg-destructive/10 border-destructive/30'}`}>
                  <div className="flex items-center gap-4 mb-4">
                    {result.correct ? (
                      <div className="w-12 h-12 rounded-full bg-success text-white flex items-center justify-center shrink-0 shadow-lg shadow-success/20">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-destructive text-white flex items-center justify-center shrink-0 shadow-lg shadow-destructive/20">
                        <XCircle className="w-6 h-6" />
                      </div>
                    )}
                    <div>
                      <h3 className={`text-xl font-bold ${result.correct ? 'text-success' : 'text-destructive'}`}>
                        {result.correct ? 'Bonne réponse !' : 'Réponse incorrecte'}
                      </h3>
                      {result.pointsEarned > 0 && (
                        <p className="text-amber-600 font-bold flex items-center text-sm mt-1">
                          <Trophy className="w-4 h-4 mr-1" /> +{result.pointsEarned} points
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {!result.correct && (
                    <div className="mt-4 pt-4 border-t border-destructive/20">
                      <p className="text-sm font-semibold text-destructive mb-1">La bonne réponse était :</p>
                      <p className="font-medium">{result.correctAnswer}</p>
                    </div>
                  )}
                </div>

                <div className="bg-muted/50 border border-border p-6 rounded-2xl mb-8">
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    Explication détaillée
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {result.explanation}
                  </p>
                </div>

                <div className="flex justify-center">
                  <Link href="/exercises">
                    <Button size="lg" variant="outline" className="rounded-xl h-14 px-8 border-2">
                      Passer à un autre exercice
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
