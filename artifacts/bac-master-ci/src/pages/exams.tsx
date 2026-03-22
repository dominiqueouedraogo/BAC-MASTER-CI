import { useState } from "react";
import { useGetExams, GetExamsSeries } from "@workspace/api-client-react";
import { MainLayout } from "@/components/layout/main-layout";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, FileDown, Lock } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function Exams() {
  const { user } = useAuth();
  const [series, setSeries] = useState<GetExamsSeries>(user?.series as GetExamsSeries || "A");
  const [year, setYear] = useState<string>("all");

  const queryParams: any = { series };
  if (year !== "all") queryParams.year = parseInt(year);

  const { data: exams, isLoading } = useGetExams(queryParams);

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Annales du BAC</h1>
        <p className="text-muted-foreground mt-1">Anciens sujets de Côte d'Ivoire avec corrections détaillées.</p>
      </div>

      <div className="bg-card border border-border p-4 rounded-2xl shadow-sm mb-8 flex gap-4 max-w-xl">
        <div className="flex-1">
          <label className="text-xs font-semibold text-muted-foreground mb-1 block uppercase">Série</label>
          <Select value={series} onValueChange={(v) => setSeries(v as GetExamsSeries)}>
            <SelectTrigger className="bg-background rounded-xl">
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
          <label className="text-xs font-semibold text-muted-foreground mb-1 block uppercase">Année</label>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="bg-background rounded-xl">
              <SelectValue placeholder="Toutes les années" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
              <SelectItem value="2020">2020</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-48 rounded-2xl" />)
        ) : exams?.length === 0 ? (
          <div className="col-span-full py-20 text-center border border-dashed rounded-3xl">
            <FileText className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">Aucune annale trouvée pour ces critères.</p>
          </div>
        ) : (
          exams?.map((exam) => (
            <Card key={exam.id} className="rounded-3xl border-border shadow-sm overflow-hidden flex flex-col group">
              <div className="bg-muted/50 p-6 border-b border-border flex items-start justify-between">
                <div>
                  <div className="text-4xl font-display font-black text-primary/20 absolute -top-2 -right-4 -z-10 select-none pointer-events-none group-hover:scale-110 transition-transform">
                    {exam.year}
                  </div>
                  <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">BAC {exam.year}</span>
                  <h3 className="font-bold text-xl text-foreground">{exam.subjectName}</h3>
                </div>
                {exam.isPremium && !user?.isPremium && (
                  <Lock className="w-5 h-5 text-amber-500 shrink-0" />
                )}
              </div>
              <CardContent className="p-6 flex-1 flex flex-col bg-card">
                <p className="font-medium text-foreground mb-6 line-clamp-2">{exam.title}</p>
                <div className="mt-auto flex flex-col gap-2">
                  <Button 
                    className="w-full rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                    disabled={exam.isPremium && !user?.isPremium}
                  >
                    Voir le sujet & correction
                  </Button>
                  {exam.pdfUrl && (
                    <Button 
                      variant="outline" 
                      className="w-full rounded-xl gap-2 text-muted-foreground hover:text-foreground"
                      disabled={exam.isPremium && !user?.isPremium}
                    >
                      <FileDown className="w-4 h-4" /> Télécharger PDF
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </MainLayout>
  );
}
