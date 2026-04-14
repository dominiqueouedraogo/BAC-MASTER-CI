import { useState, useEffect } from "react";
import { Link, useSearch } from "wouter";
import { useGetExercises, useGetSubjects, GetExercisesDifficulty, GetExercisesSeries } from "@workspace/api-client-react";
import { MainLayout } from "src/components/layout/main-layout";
import { useAuth } from "src/hooks/use-auth";
import { Card, CardContent } from "src/components/ui/card";
import { Skeleton } from "src/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "src/components/ui/select";
import { BrainCircuit, ChevronRight, Lock } from "lucide-react";
import { getDifficultyColor } from "src/lib/utils";

export default function Exercises() {
  const { user } = useAuth();
  const search = useSearch();
  const params = new URLSearchParams(search);
  const urlSubject = params.get("subject") || "all";

  const [series, setSeries] = useState<GetExercisesSeries>(user?.series as GetExercisesSeries || "A");
  const [subjectId, setSubjectId] = useState<string>(urlSubject);
  const [difficulty, setDifficulty] = useState<string>("all");

  useEffect(() => {
    const p = new URLSearchParams(search);
    const s = p.get("subject") || "all";
    setSubjectId(s);
  }, [search]);

  const { data: subjects } = useGetSubjects({ series });

  const queryParams: any = { series };
  if (subjectId !== "all") queryParams.subjectId = parseInt(subjectId);
  if (difficulty !== "all") queryParams.difficulty = difficulty as GetExercisesDifficulty;

  const { data: exercises, isLoading } = useGetExercises(queryParams);

  const activeSubjectName = subjectId !== "all"
    ? subjects?.find(s => s.id.toString() === subjectId)?.name
    : null;

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Exercices & Quiz</h1>
        <p className="text-muted-foreground mt-1">
          {activeSubjectName
            ? `Exercices de ${activeSubjectName} — entraînez-vous avec des QCM et questions types.`
            : "Entraînez-vous avec des centaines de QCM et sujets types."}
        </p>
      </div>

      <div className="bg-card border border-border p-4 rounded-2xl shadow-sm mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="text-xs font-semibold text-muted-foreground mb-1 block uppercase tracking-wider">Série</label>
          <Select value={series} onValueChange={(v) => setSeries(v as GetExercisesSeries)}>
            <SelectTrigger className="bg-background rounded-xl h-12">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A">Série A</SelectItem>
              <SelectItem value="C">Série C</SelectItem>
              <SelectItem value="D">Série D</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <label className="text-xs font-semibold text-muted-foreground mb-1 block uppercase tracking-wider">Matière</label>
          <Select value={subjectId} onValueChange={setSubjectId}>
            <SelectTrigger className="bg-background rounded-xl h-12">
              <SelectValue placeholder="Toutes les matières" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les matières</SelectItem>
              {subjects?.map(s => (
                <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <label className="text-xs font-semibold text-muted-foreground mb-1 block uppercase tracking-wider">Difficulté</label>
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger className="bg-background rounded-xl h-12">
              <SelectValue placeholder="Toutes les difficultés" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes</SelectItem>
              <SelectItem value="easy">Facile</SelectItem>
              <SelectItem value="medium">Moyen</SelectItem>
              <SelectItem value="hard">Difficile</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {activeSubjectName && (
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filtré pour :</span>
          <span className="text-sm font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">{activeSubjectName}</span>
          <button
            onClick={() => setSubjectId("all")}
            className="text-xs text-muted-foreground underline hover:text-foreground ml-1"
          >
            Effacer le filtre
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-48 rounded-2xl" />)
        ) : exercises?.length === 0 ? (
          <div className="col-span-full py-20 text-center">
            <BrainCircuit className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">Aucun exercice ne correspond à vos critères.</p>
          </div>
        ) : (
          exercises?.map((exercise) => {
            const subject = subjects?.find(s => s.id === exercise.subjectId);
            return (
              <Card key={exercise.id} className="rounded-2xl border-border shadow-sm hover:shadow-md transition-shadow flex flex-col h-full overflow-hidden relative">
                {exercise.isPremium && !user?.isPremium && (
                  <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10 flex items-center gap-1 shadow-sm">
                    <Lock className="w-3 h-3" /> PREMIUM
                  </div>
                )}
                <CardContent className="p-6 flex flex-col h-full pt-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{subject?.name || 'Matière'}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wider ${getDifficultyColor(exercise.difficulty)}`}>
                      {exercise.difficulty === 'easy' ? 'Facile' : exercise.difficulty === 'medium' ? 'Moyen' : 'Difficile'}
                    </span>
                  </div>

                  <h3 className="font-bold text-foreground text-lg mb-6 line-clamp-3 leading-snug flex-1">
                    {exercise.question}
                  </h3>

                  <Link href={`/exercises/${exercise.id}`}>
                    <button className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                      exercise.isPremium && !user?.isPremium
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
                    }`}>
                      Commencer l'exercice <ChevronRight className="w-4 h-4" />
                    </button>
                  </Link>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </MainLayout>
  );
}
