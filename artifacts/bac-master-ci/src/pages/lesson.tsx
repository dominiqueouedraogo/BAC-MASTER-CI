import { useParams, Link } from "wouter";
import { useGetLesson, useMarkLessonComplete, useGetReviews, useCreateReview, useGetExercises } from "@workspace/api-client-react";
import { MainLayout } from "@/components/layout/main-layout";
import { PremiumLock } from "@/components/ui/premium-lock";
import { useAuth } from "@/hooks/use-auth";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, PlayCircle, Headphones, FileDown, CheckCircle2, Star, BrainCircuit, Lightbulb, BookOpen, Loader2, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function LessonDetail() {
  const { id } = useParams();
  const lessonId = parseInt(id || "0");
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: lesson, isLoading } = useGetLesson(lessonId);
  const markComplete = useMarkLessonComplete();
  const { data: reviews } = useGetReviews({ lessonId });
  const { data: exercises } = useGetExercises({ lessonId });
  const submitReview = useCreateReview();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [quiz, setQuiz] = useState<null | { lessonTitle: string; questions: Array<{ question: string; options: string[]; correctAnswer: string; explanation: string }> }>(null);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizPointsEarned, setQuizPointsEarned] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (lesson && (!lesson.isPremium || user?.isPremium)) {
      const timer = setTimeout(() => {
        markComplete.mutate({ lessonId });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [lesson, user, lessonId]);

  if (isLoading) {
    return (
      <MainLayout>
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-64 w-full rounded-2xl mb-8" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6" />
      </MainLayout>
    );
  }

  if (!lesson) return <MainLayout><div className="p-8 text-center text-red-500">Leçon introuvable</div></MainLayout>;

  const isLocked = lesson.isPremium && !user?.isPremium;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReview.mutate({ data: { lessonId, rating, comment } }, {
      onSuccess: () => {
        toast({ title: "Merci pour votre avis !" });
        setComment("");
      }
    });
  };

  const keyPointsList: string[] = lesson.keyPoints
    ? lesson.keyPoints.split("\n").map(s => s.trim()).filter(Boolean)
    : [];

  const generateQuiz = async () => {
    setQuizLoading(true);
    setQuiz(null);
    setQuizStep(0);
    setQuizAnswers([]);
    setQuizFinished(false);
    setSelectedOption(null);
    setShowExplanation(false);
    try {
      const res = await fetch("/api/chat/quiz-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, series: user?.series }),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setQuiz(data);
    } catch {
      toast({ title: "Impossible de générer le quiz. Réessayez.", variant: "destructive" });
    } finally {
      setQuizLoading(false);
    }
  };

  const handleAnswer = (option: string) => {
    if (selectedOption !== null) return;
    setSelectedOption(option);
    setShowExplanation(true);
    const newAnswers = [...quizAnswers, option];
    setQuizAnswers(newAnswers);
  };

  const handleNext = async () => {
    if (!quiz) return;
    if (quizStep < quiz.questions.length - 1) {
      setQuizStep(s => s + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
      const correctCount = quiz.questions.filter((q, i) => quizAnswers[i] === q.correctAnswer).length;
      try {
        const res = await fetch("/api/chat/quiz-complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ correctAnswers: correctCount }),
        });
        if (res.ok) {
          const data = await res.json();
          setQuizPointsEarned(data.pointsEarned || 0);
        }
      } catch {}
    }
  };

  const quizScore = quiz ? quiz.questions.filter((q, i) => quizAnswers[i] === q.correctAnswer).length : 0;
  const currentQ = quiz?.questions[quizStep];

  return (
    <MainLayout>
      <div className="flex items-center text-sm text-muted-foreground mb-6 overflow-x-auto whitespace-nowrap pb-2">
        <Link href="/courses" className="hover:text-primary">Cours</Link>
        <ChevronRight className="w-4 h-4 mx-2 shrink-0" />
        <span>{lesson.subjectName}</span>
        <ChevronRight className="w-4 h-4 mx-2 shrink-0" />
        <span className="text-foreground font-medium truncate max-w-[200px]">{lesson.title}</span>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary">Série {lesson.series}</span>
          {lesson.duration && <span className="text-xs text-muted-foreground">{lesson.duration} min</span>}
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">{lesson.title}</h1>
        {lesson.summary && <p className="text-lg text-muted-foreground max-w-3xl">{lesson.summary}</p>}
      </div>

      {isLocked ? (
        <PremiumLock />
      ) : (
        <div className="space-y-8 animate-in fade-in duration-500">

          {(lesson.videoUrl || lesson.audioUrl || lesson.pdfUrl) && (
            <div className="bg-card border border-border p-4 rounded-2xl shadow-sm flex flex-wrap gap-3">
              {lesson.videoUrl && (
                <a href={lesson.videoUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" className="gap-2 rounded-xl">
                    <PlayCircle className="w-5 h-5 text-primary" /> Voir la vidéo
                  </Button>
                </a>
              )}
              {lesson.audioUrl && (
                <a href={lesson.audioUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2 rounded-xl">
                    <Headphones className="w-5 h-5" /> Écouter le podcast
                  </Button>
                </a>
              )}
              {lesson.pdfUrl && (
                <a href={lesson.pdfUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2 rounded-xl ml-auto">
                    <FileDown className="w-5 h-5" /> Télécharger PDF
                  </Button>
                </a>
              )}
            </div>
          )}

          {/* Explication détaillée */}
          <div className="bg-card border border-border rounded-3xl p-6 md:p-10 shadow-sm">
            <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" /> Explication détaillée
            </h2>
            <div
              className="prose prose-blue dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-primary prose-img:rounded-xl prose-table:w-full prose-td:px-3 prose-th:px-3"
              dangerouslySetInnerHTML={{ __html: lesson.content }}
            />
            <div className="mt-10 pt-6 border-t border-border flex items-center gap-2 text-success font-medium text-sm">
              <CheckCircle2 className="w-5 h-5" /> Cours marqué comme lu automatiquement.
            </div>
          </div>

          {/* Notions clés */}
          {keyPointsList.length > 0 && (
            <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-display font-bold mb-5 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" /> Notions principales à retenir
              </h2>
              <ul className="space-y-3">
                {keyPointsList.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Exemples résolus */}
          {lesson.examples && (
            <div className="bg-card border border-border rounded-3xl p-6 md:p-10 shadow-sm">
              <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                <Star className="w-5 h-5 text-purple-500 fill-purple-500" /> Exemples résolus
              </h2>
              <div
                className="prose prose-blue dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold"
                dangerouslySetInnerHTML={{ __html: lesson.examples }}
              />
            </div>
          )}

          {/* Exercices liés */}
          {exercises && exercises.length > 0 && (
            <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-emerald-500" /> Exercices et corrections
              </h2>
              <div className="space-y-6">
                {exercises.map((exercise, i) => (
                  <div key={exercise.id} className="border border-border rounded-2xl p-5 bg-muted/20">
                    <div className="flex items-start gap-3 mb-4">
                      <span className="w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{exercise.question}</p>
                        {exercise.difficulty && (
                          <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            exercise.difficulty === "hard" ? "bg-red-500/10 text-red-600" :
                            exercise.difficulty === "medium" ? "bg-amber-500/10 text-amber-600" :
                            "bg-emerald-500/10 text-emerald-600"
                          }`}>
                            {exercise.difficulty === "hard" ? "Difficile" : exercise.difficulty === "medium" ? "Moyen" : "Facile"}
                          </span>
                        )}
                      </div>
                    </div>
                    {exercise.options && Array.isArray(exercise.options) && exercise.options.length > 0 && (
                      <ul className="space-y-2 mb-4 ml-10">
                        {(exercise.options as string[]).map((opt, j) => (
                          <li key={j} className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full border border-border text-[10px] font-bold flex items-center justify-center shrink-0">
                              {String.fromCharCode(65 + j)}
                            </span>
                            {opt}
                          </li>
                        ))}
                      </ul>
                    )}
                    <details className="ml-10">
                      <summary className="text-sm font-semibold text-primary cursor-pointer hover:underline">
                        Voir la correction
                      </summary>
                      <div className="mt-3 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                        <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400 mb-1">
                          Réponse correcte : <span className="font-normal">{exercise.correctAnswer}</span>
                        </p>
                        {exercise.explanation && (
                          <p className="text-sm text-muted-foreground mt-2">{exercise.explanation}</p>
                        )}
                      </div>
                    </details>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-border">
                <Link href={`/exercises?subject=${lesson.subjectId}`}>
                  <Button variant="outline" className="rounded-xl gap-2">
                    <BrainCircuit className="w-4 h-4" /> Voir tous les exercices de {lesson.subjectName}
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* AI Quiz Section */}
          <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-display font-bold mb-2 flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-blue-500" /> Évaluation IA
            </h2>
            <p className="text-sm text-muted-foreground mb-5">
              Testez votre compréhension avec un quiz généré par l'IA basé sur ce cours. Chaque bonne réponse rapporte 10 points.
            </p>

            {!quiz && !quizLoading && (
              <Button onClick={generateQuiz} className="rounded-xl gap-2">
                <BrainCircuit className="w-4 h-4" /> Générer un Quiz IA
              </Button>
            )}

            {quizLoading && (
              <div className="flex items-center gap-3 text-muted-foreground py-4">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Génération du quiz en cours...</span>
              </div>
            )}

            {quiz && !quizFinished && currentQ && (
              <div className="animate-in fade-in duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-muted-foreground">
                    Question {quizStep + 1} / {quiz.questions.length}
                  </span>
                  <Progress value={((quizStep) / quiz.questions.length) * 100} className="w-32 h-2" />
                </div>
                <div className="bg-muted/30 rounded-2xl p-5 mb-4">
                  <p className="font-semibold text-foreground text-base">{currentQ.question}</p>
                </div>
                <div className="grid gap-3 mb-4">
                  {currentQ.options.map((opt, i) => {
                    const isSelected = selectedOption === opt;
                    const isCorrect = opt === currentQ.correctAnswer;
                    const showResult = selectedOption !== null;
                    return (
                      <button
                        key={i}
                        onClick={() => handleAnswer(opt)}
                        disabled={selectedOption !== null}
                        className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                          showResult
                            ? isCorrect
                              ? "border-emerald-500 bg-emerald-500/10 text-emerald-700"
                              : isSelected
                              ? "border-red-400 bg-red-400/10 text-red-600"
                              : "border-border bg-muted/20 text-muted-foreground"
                            : "border-border bg-muted/20 hover:border-primary hover:bg-primary/5 text-foreground cursor-pointer"
                        }`}
                      >
                        <span className="inline-flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-[11px] font-bold shrink-0">
                            {String.fromCharCode(65 + i)}
                          </span>
                          {opt}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {showExplanation && (
                  <div className={`p-4 rounded-xl mb-4 text-sm ${selectedOption === currentQ.correctAnswer ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-700" : "bg-red-400/10 border border-red-400/20 text-red-700"}`}>
                    <p className="font-semibold mb-1">
                      {selectedOption === currentQ.correctAnswer ? "✓ Bonne réponse !" : `✗ La bonne réponse était : ${currentQ.correctAnswer}`}
                    </p>
                    <p className="text-sm opacity-90">{currentQ.explanation}</p>
                  </div>
                )}
                {selectedOption !== null && (
                  <Button onClick={handleNext} className="rounded-xl gap-2">
                    {quizStep < quiz.questions.length - 1 ? "Question suivante" : "Voir les résultats"}
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            )}

            {quiz && quizFinished && (
              <div className="text-center py-4 animate-in fade-in duration-300">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-10 h-10 text-amber-500" />
                </div>
                <h3 className="text-2xl font-display font-bold mb-2">Quiz terminé !</h3>
                <p className="text-lg text-muted-foreground mb-2">
                  Score : <strong className="text-foreground">{quizScore} / {quiz.questions.length}</strong>
                </p>
                {quizPointsEarned > 0 && (
                  <p className="text-emerald-600 font-semibold text-base mb-4">+{quizPointsEarned} points gagnés 🎉</p>
                )}
                <div className="flex justify-center gap-3">
                  <Button variant="outline" onClick={generateQuiz} className="rounded-xl gap-2">
                    <BrainCircuit className="w-4 h-4" /> Nouveau quiz
                  </Button>
                  <Link href="/leaderboard">
                    <Button className="rounded-xl gap-2">
                      <Trophy className="w-4 h-4" /> Classement
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Review Section */}
          <div className="bg-card border border-border rounded-3xl p-6 md:p-10 shadow-sm">
            <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" /> Avis sur ce cours
            </h3>

            <form onSubmit={handleReviewSubmit} className="mb-8 p-6 bg-muted/50 rounded-2xl border border-border/50">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-medium">Votre note :</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      className={`w-6 h-6 cursor-pointer transition-colors ${rating >= star ? "text-amber-500 fill-amber-500" : "text-muted-foreground"}`}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
              </div>
              <Textarea
                placeholder="Qu'avez-vous pensé de ce cours ?"
                className="mb-4 bg-background rounded-xl resize-none"
                value={comment}
                onChange={e => setComment(e.target.value)}
              />
              <Button type="submit" disabled={submitReview.isPending} className="rounded-xl">
                Envoyer mon avis
              </Button>
            </form>

            <div className="space-y-4">
              {reviews?.length === 0 ? (
                <p className="text-muted-foreground text-sm italic">Soyez le premier à donner votre avis.</p>
              ) : (
                reviews?.map(review => (
                  <div key={review.id} className="border-b border-border pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm">{review.userName}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < review.rating ? "text-amber-500 fill-amber-500" : "text-muted-foreground/30"}`} />
                        ))}
                      </div>
                    </div>
                    {review.comment && <p className="text-sm text-muted-foreground">{review.comment}</p>}
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      )}
    </MainLayout>
  );
}
