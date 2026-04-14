"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Courses;
var react_1 = require("react");
var wouter_1 = require("wouter");
var api_client_react_1 = require("@workspace/api-client-react");
var main_layout_1 = require("@/components/layout/main-layout");
var use_auth_1 = require("@/hooks/use-auth");
var tabs_1 = require("@/components/ui/tabs");
var card_1 = require("@/components/ui/card");
var badge_1 = require("@/components/ui/badge");
var skeleton_1 = require("@/components/ui/skeleton");
var lucide_react_1 = require("lucide-react");
var CHIMIE_KEYWORDS = [
    "avancement", "acido", "oxydoréduction", "organique", "hydrocarbure",
    "alcool", "aldéhyde", "cétone", "acide carboxylique", "ester",
    "saponification", "chimie générale", "chimie organique", "chimique",
    "composés organiques", "alcanes", "alcènes", "alcynes",
];
function isChimieLesson(title) {
    var lower = title.toLowerCase();
    return CHIMIE_KEYWORDS.some(function (k) { return lower.includes(k); });
}
function isPhysiqueChimieSubject(name) {
    var lower = name.toLowerCase();
    return lower.includes("physique") && lower.includes("chimie");
}
function Courses() {
    var _a;
    var user = (0, use_auth_1.useAuth)().user;
    var defaultSeries = (user === null || user === void 0 ? void 0 : user.series) || "A";
    var _b = (0, react_1.useState)(defaultSeries), activeSeries = _b[0], setActiveSeries = _b[1];
    var _c = (0, react_1.useState)(null), selectedSubject = _c[0], setSelectedSubject = _c[1];
    var _d = (0, api_client_react_1.useGetSubjects)({ series: activeSeries }), subjects = _d.data, loadingSubjects = _d.isLoading;
    var _e = (0, api_client_react_1.useGetLessons)({ subjectId: selectedSubject || undefined, series: activeSeries }, { query: { enabled: selectedSubject !== null } }), lessons = _e.data, loadingLessons = _e.isLoading;
    return (<main_layout_1.MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Cours</h1>
        <p className="text-muted-foreground mt-1">Accédez à tous les cours officiels du programme ivoirien.</p>
      </div>

      <tabs_1.Tabs defaultValue={activeSeries} onValueChange={function (v) { setActiveSeries(v); setSelectedSubject(null); }} className="w-full mb-8">
        <tabs_1.TabsList className="grid w-full max-w-md grid-cols-3 bg-secondary/10 p-1 rounded-xl h-auto">
          <tabs_1.TabsTrigger value="A" className="rounded-lg py-2.5 data-[state=active]:bg-card data-[state=active]:shadow-sm">Série A</tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="C" className="rounded-lg py-2.5 data-[state=active]:bg-card data-[state=active]:shadow-sm">Série C</tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="D" className="rounded-lg py-2.5 data-[state=active]:bg-card data-[state=active]:shadow-sm">Série D</tabs_1.TabsTrigger>
        </tabs_1.TabsList>
      </tabs_1.Tabs>

      {!selectedSubject ? (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loadingSubjects ? (Array.from({ length: 8 }).map(function (_, i) { return <skeleton_1.Skeleton key={i} className="h-40 rounded-2xl"/>; })) : subjects === null || subjects === void 0 ? void 0 : subjects.map(function (subject) { return (<card_1.Card key={subject.id} className="cursor-pointer hover:border-primary/50 hover:shadow-md transition-all rounded-2xl group overflow-hidden" onClick={function () { return setSelectedSubject(subject.id); }}>
              <div className="h-2 w-full" style={{ backgroundColor: subject.color || 'var(--primary)' }}/>
              <card_1.CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: subject.color || 'var(--primary)' }}>
                    <lucide_react_1.BookOpen className="w-6 h-6"/>
                  </div>
                  <badge_1.Badge variant="outline" className="bg-background">{subject.lessonCount} cours</badge_1.Badge>
                </div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{subject.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{subject.description || "Cours complet selon le programme."}</p>
              </card_1.CardContent>
            </card_1.Card>); })}
        </div>) : (<div className="animate-in slide-in-from-right-4 fade-in duration-300">
          <button onClick={function () { return setSelectedSubject(null); }} className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors">
            <lucide_react_1.ChevronRight className="w-4 h-4 rotate-180 mr-1"/>
            Retour aux matières
          </button>
          
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold">{(_a = subjects === null || subjects === void 0 ? void 0 : subjects.find(function (s) { return s.id === selectedSubject; })) === null || _a === void 0 ? void 0 : _a.name}</h2>
            <badge_1.Badge className="bg-secondary text-secondary-foreground hover:bg-secondary">Série {activeSeries}</badge_1.Badge>
          </div>

          {(function () {
                var _a, _b;
                var subjectName = (_b = (_a = subjects === null || subjects === void 0 ? void 0 : subjects.find(function (s) { return s.id === selectedSubject; })) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "";
                var splitByPart = isPhysiqueChimieSubject(subjectName);
                var physiqueLessons = splitByPart ? (lessons !== null && lessons !== void 0 ? lessons : []).filter(function (l) { return !isChimieLesson(l.title); }) : [];
                var chimieLessons = splitByPart ? (lessons !== null && lessons !== void 0 ? lessons : []).filter(function (l) { return isChimieLesson(l.title); }) : [];
                var LessonCard = function (_a) {
                    var lesson = _a.lesson;
                    return (<wouter_1.Link key={lesson.id} href={"/lessons/".concat(lesson.id)}>
                <div className="bg-card border border-border p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex flex-col h-full relative overflow-hidden group">
                  {lesson.isPremium && !(user === null || user === void 0 ? void 0 : user.isPremium) && (<div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold w-24 text-center py-1 rotate-45 translate-x-[20px] translate-y-[10px] shadow-sm">
                        PREMIUM
                      </div>
                    </div>)}
                  <h3 className="font-bold text-lg mb-2 pr-8 group-hover:text-primary transition-colors">{lesson.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">{lesson.summary}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      {lesson.videoUrl && <lucide_react_1.Play className="w-4 h-4" title="Vidéo disponible"/>}
                      {lesson.audioUrl && <lucide_react_1.Headphones className="w-4 h-4" title="Audio disponible"/>}
                      {lesson.pdfUrl && <lucide_react_1.FileText className="w-4 h-4" title="PDF disponible"/>}
                    </div>
                    {lesson.isPremium && !(user === null || user === void 0 ? void 0 : user.isPremium) ? (<lucide_react_1.Lock className="w-5 h-5 text-amber-500"/>) : (<span className="text-sm font-semibold text-primary flex items-center">
                        Commencer <lucide_react_1.ChevronRight className="w-4 h-4 ml-1"/>
                      </span>)}
                  </div>
                </div>
              </wouter_1.Link>);
                };
                if (loadingLessons) {
                    return (<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map(function (_, i) { return <skeleton_1.Skeleton key={i} className="h-32 rounded-2xl"/>; })}
                </div>);
                }
                if (!(lessons === null || lessons === void 0 ? void 0 : lessons.length)) {
                    return (<div className="py-12 text-center text-muted-foreground border border-dashed rounded-2xl">
                  Aucun cours disponible pour cette matière actuellement.
                </div>);
                }
                if (splitByPart) {
                    return (<div className="space-y-10">
                  {physiqueLessons.length > 0 && (<section>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                          <lucide_react_1.Atom className="w-5 h-5 text-blue-500"/>
                        </div>
                        <h3 className="text-xl font-bold text-foreground">Physique</h3>
                        <badge_1.Badge variant="outline" className="ml-1">{physiqueLessons.length} leçons</badge_1.Badge>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {physiqueLessons.map(function (lesson) { return <LessonCard key={lesson.id} lesson={lesson}/>; })}
                      </div>
                    </section>)}
                  {chimieLessons.length > 0 && (<section>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                          <lucide_react_1.FlaskConical className="w-5 h-5 text-green-500"/>
                        </div>
                        <h3 className="text-xl font-bold text-foreground">Chimie</h3>
                        <badge_1.Badge variant="outline" className="ml-1">{chimieLessons.length} leçons</badge_1.Badge>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {chimieLessons.map(function (lesson) { return <LessonCard key={lesson.id} lesson={lesson}/>; })}
                      </div>
                    </section>)}
                </div>);
                }
                return (<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {lessons.map(function (lesson) { return <LessonCard key={lesson.id} lesson={lesson}/>; })}
              </div>);
            })()}
        </div>)}
    </main_layout_1.MainLayout>);
}
