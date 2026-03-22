import { useParams, Link } from "wouter";
import { useGetLesson, useMarkLessonComplete, useGetReviews, useCreateReview } from "@workspace/api-client-react";
import { MainLayout } from "@/components/layout/main-layout";
import { PremiumLock } from "@/components/ui/premium-lock";
import { useAuth } from "@/hooks/use-auth";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, PlayCircle, Headphones, FileDown, CheckCircle2, Star, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
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
  const submitReview = useCreateReview();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    // Auto mark as read after 5 seconds if not premium-locked
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
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">{lesson.title}</h1>
        {lesson.summary && <p className="text-lg text-muted-foreground max-w-3xl">{lesson.summary}</p>}
      </div>

      {isLocked ? (
        <PremiumLock />
      ) : (
        <div className="space-y-8 animate-in fade-in duration-500">
          
          {/* Media Section */}
          {(lesson.videoUrl || lesson.audioUrl || lesson.pdfUrl) && (
            <div className="bg-card border border-border p-4 rounded-2xl shadow-sm flex flex-wrap gap-4">
              {lesson.videoUrl && (
                <Button variant="secondary" className="gap-2 rounded-xl">
                  <PlayCircle className="w-5 h-5 text-primary" /> Voir la vidéo
                </Button>
              )}
              {lesson.audioUrl && (
                <Button variant="outline" className="gap-2 rounded-xl">
                  <Headphones className="w-5 h-5" /> Écouter le podcast
                </Button>
              )}
              {lesson.pdfUrl && (
                <Button variant="outline" className="gap-2 rounded-xl ml-auto">
                  <FileDown className="w-5 h-5" /> Télécharger PDF
                </Button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="bg-card border border-border rounded-3xl p-6 md:p-10 shadow-sm">
            <div className="prose prose-blue dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-primary prose-img:rounded-xl">
              <ReactMarkdown>{lesson.content}</ReactMarkdown>
            </div>
            
            <div className="mt-12 pt-6 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-2 text-success font-medium">
                <CheckCircle2 className="w-5 h-5" /> Cours marqué comme lu
              </div>
              <Link href="/exercises">
                <Button className="rounded-xl gap-2">
                  Passer aux exercices <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
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
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`w-6 h-6 cursor-pointer transition-colors ${rating >= star ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground'}`}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
              </div>
              <Textarea 
                placeholder="Qu'avez-vous pensé de ce cours ?" 
                className="mb-4 bg-background rounded-xl resize-none"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button type="submit" disabled={submitReview.isPending} className="rounded-xl">
                Envoyer mon avis
              </Button>
            </form>

            <div className="space-y-4">
              {reviews?.length === 0 ? (
                <p className="text-muted-foreground text-sm italic">Soyez le premier à donner votre avis.</p>
              ) : (
                reviews?.map((review) => (
                  <div key={review.id} className="border-b border-border pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm">{review.userName}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground/30'}`} />
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
