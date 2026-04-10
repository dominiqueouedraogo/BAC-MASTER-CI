import { useState } from "react";
import { Link } from "wouter";
import { useGetSubjects, useGetLessons, GetSubjectsSeries, GetLessonsSeries } from "@workspace/api-client-react";
import { MainLayout } from "@/components/layout/main-layout";
import { useAuth } from "@/hooks/use-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, ChevronRight, Lock, Play, FileText, Headphones, Atom, FlaskConical } from "lucide-react";
import { cn, formatTime } from "@/lib/utils";

const CHIMIE_KEYWORDS = [
  "avancement", "acido", "oxydoréduction", "organique", "hydrocarbure",
  "alcool", "aldéhyde", "cétone", "acide carboxylique", "ester",
  "saponification", "chimie générale", "chimie organique", "chimique",
  "composés organiques", "alcanes", "alcènes", "alcynes",
];

function isChimieLesson(title: string): boolean {
  const lower = title.toLowerCase();
  return CHIMIE_KEYWORDS.some((k) => lower.includes(k));
}

function isPhysiqueChimieSubject(name: string): boolean {
  const lower = name.toLowerCase();
  return lower.includes("physique") && lower.includes("chimie");
}

export default function Courses() {
  const { user } = useAuth();
  const defaultSeries = user?.series || "A";
  const [activeSeries, setActiveSeries] = useState<string>(defaultSeries);
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null);

  const { data: subjects, isLoading: loadingSubjects } = useGetSubjects({ series: activeSeries as GetSubjectsSeries });
  
  const { data: lessons, isLoading: loadingLessons } = useGetLessons(
    { subjectId: selectedSubject || undefined, series: activeSeries as GetLessonsSeries },
    { query: { enabled: selectedSubject !== null } }
  );

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Cours</h1>
        <p className="text-muted-foreground mt-1">Accédez à tous les cours officiels du programme ivoirien.</p>
      </div>

      <Tabs defaultValue={activeSeries} onValueChange={(v) => { setActiveSeries(v); setSelectedSubject(null); }} className="w-full mb-8">
        <TabsList className="grid w-full max-w-md grid-cols-3 bg-secondary/10 p-1 rounded-xl h-auto">
          <TabsTrigger value="A" className="rounded-lg py-2.5 data-[state=active]:bg-card data-[state=active]:shadow-sm">Série A</TabsTrigger>
          <TabsTrigger value="C" className="rounded-lg py-2.5 data-[state=active]:bg-card data-[state=active]:shadow-sm">Série C</TabsTrigger>
          <TabsTrigger value="D" className="rounded-lg py-2.5 data-[state=active]:bg-card data-[state=active]:shadow-sm">Série D</TabsTrigger>
        </TabsList>
      </Tabs>

      {!selectedSubject ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loadingSubjects ? (
            Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-40 rounded-2xl" />)
          ) : subjects?.map((subject) => (
            <Card 
              key={subject.id} 
              className="cursor-pointer hover:border-primary/50 hover:shadow-md transition-all rounded-2xl group overflow-hidden"
              onClick={() => setSelectedSubject(subject.id)}
            >
              <div className="h-2 w-full" style={{ backgroundColor: subject.color || 'var(--primary)' }} />
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                    style={{ backgroundColor: subject.color || 'var(--primary)' }}
                  >
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <Badge variant="outline" className="bg-background">{subject.lessonCount} cours</Badge>
                </div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{subject.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{subject.description || "Cours complet selon le programme."}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="animate-in slide-in-from-right-4 fade-in duration-300">
          <button 
            onClick={() => setSelectedSubject(null)}
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors"
          >
            <ChevronRight className="w-4 h-4 rotate-180 mr-1" />
            Retour aux matières
          </button>
          
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold">{subjects?.find(s => s.id === selectedSubject)?.name}</h2>
            <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary">Série {activeSeries}</Badge>
          </div>

          {(() => {
            const subjectName = subjects?.find(s => s.id === selectedSubject)?.name ?? "";
            const splitByPart = isPhysiqueChimieSubject(subjectName);
            const physiqueLessons = splitByPart ? (lessons ?? []).filter(l => !isChimieLesson(l.title)) : [];
            const chimieLessons  = splitByPart ? (lessons ?? []).filter(l =>  isChimieLesson(l.title)) : [];

            const LessonCard = ({ lesson }: { lesson: typeof lessons[0] }) => (
              <Link key={lesson.id} href={`/lessons/${lesson.id}`}>
                <div className="bg-card border border-border p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex flex-col h-full relative overflow-hidden group">
                  {lesson.isPremium && !user?.isPremium && (
                    <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold w-24 text-center py-1 rotate-45 translate-x-[20px] translate-y-[10px] shadow-sm">
                        PREMIUM
                      </div>
                    </div>
                  )}
                  <h3 className="font-bold text-lg mb-2 pr-8 group-hover:text-primary transition-colors">{lesson.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">{lesson.summary}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      {lesson.videoUrl && <Play className="w-4 h-4" title="Vidéo disponible" />}
                      {lesson.audioUrl && <Headphones className="w-4 h-4" title="Audio disponible" />}
                      {lesson.pdfUrl && <FileText className="w-4 h-4" title="PDF disponible" />}
                    </div>
                    {lesson.isPremium && !user?.isPremium ? (
                      <Lock className="w-5 h-5 text-amber-500" />
                    ) : (
                      <span className="text-sm font-semibold text-primary flex items-center">
                        Commencer <ChevronRight className="w-4 h-4 ml-1" />
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );

            if (loadingLessons) {
              return (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32 rounded-2xl" />)}
                </div>
              );
            }

            if (!lessons?.length) {
              return (
                <div className="py-12 text-center text-muted-foreground border border-dashed rounded-2xl">
                  Aucun cours disponible pour cette matière actuellement.
                </div>
              );
            }

            if (splitByPart) {
              return (
                <div className="space-y-10">
                  {physiqueLessons.length > 0 && (
                    <section>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                          <Atom className="w-5 h-5 text-blue-500" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground">Physique</h3>
                        <Badge variant="outline" className="ml-1">{physiqueLessons.length} leçons</Badge>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {physiqueLessons.map(lesson => <LessonCard key={lesson.id} lesson={lesson} />)}
                      </div>
                    </section>
                  )}
                  {chimieLessons.length > 0 && (
                    <section>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                          <FlaskConical className="w-5 h-5 text-green-500" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground">Chimie</h3>
                        <Badge variant="outline" className="ml-1">{chimieLessons.length} leçons</Badge>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {chimieLessons.map(lesson => <LessonCard key={lesson.id} lesson={lesson} />)}
                      </div>
                    </section>
                  )}
                </div>
              );
            }

            return (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {lessons.map(lesson => <LessonCard key={lesson.id} lesson={lesson} />)}
              </div>
            );
          })()}
        </div>
      )}
    </MainLayout>
  );
}
