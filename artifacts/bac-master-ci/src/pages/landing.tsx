import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, BrainCircuit, Trophy, ArrowRight, CheckCircle2, MessageSquareText } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden">
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">BAC MASTER CI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-semibold text-foreground hover:text-primary transition-colors hidden sm:block">
              Se connecter
            </Link>
            <Link href="/register">
              <Button className="bg-primary text-white rounded-full px-6 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
                S'inscrire
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-4 relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`} 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-30 dark:opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/80 to-background" />
        </div>

        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6 border border-primary/20">
              🎓 #1 Plateforme éducative en Côte d'Ivoire
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight text-foreground mb-6 leading-[1.1]">
              Préparez votre BAC <br/>
              <span className="text-gradient">avec confiance</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Des cours complets, des exercices interactifs, des annales corrigées et un tuteur IA disponible 24/7 pour les Terminales A, C et D.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto rounded-full h-14 px-8 text-lg font-semibold bg-gradient-to-r from-primary to-secondary shadow-xl shadow-primary/25 hover:-translate-y-1 transition-transform border-0">
                  Commencer gratuitement <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full h-14 px-8 text-lg font-semibold border-2 hover:bg-secondary/5">
                  J'ai déjà un compte
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Tout ce dont vous avez besoin</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Une méthode d'apprentissage prouvée, conçue spécifiquement pour le programme ivoirien.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: BookOpen, title: "Cours détaillés", desc: "Des résumés clairs, des PDF téléchargeables et des explications audio.", color: "text-blue-500", bg: "bg-blue-500/10" },
              { icon: BrainCircuit, title: "Exercices interactifs", desc: "Quiz et exercices type BAC avec corrections instantanées.", color: "text-emerald-500", bg: "bg-emerald-500/10" },
              { icon: MessageSquareText, title: "Tuteur IA 24/7", desc: "Bloqué sur un problème ? Notre IA vous guide pas à pas.", color: "text-purple-500", bg: "bg-purple-500/10" },
              { icon: Trophy, title: "Gamification", desc: "Gagnez des points, des badges et montez dans le classement.", color: "text-amber-500", bg: "bg-amber-500/10" }
            ].map((feat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-card p-8 rounded-3xl border border-border shadow-lg shadow-black/5 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-2xl ${feat.bg} ${feat.color} flex items-center justify-center mb-6`}>
                  <feat.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                <p className="text-muted-foreground">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Series Info */}
      <section className="py-24 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Adapté à votre série</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Que vous soyez en série littéraire ou scientifique, BAC MASTER CI personnalise votre expérience d'apprentissage.
              </p>
              <ul className="space-y-4">
                {['Terminale A (Philosophie, Lettres, Langues)', 'Terminale C (Mathématiques, Physique-Chimie)', 'Terminale D (SVT, Mathématiques, Physique-Chimie)'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center text-success">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 w-full max-w-md lg:max-w-none relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-3xl" />
              <img 
                src={`${import.meta.env.BASE_URL}images/methodology-hero.png`} 
                alt="Student studying" 
                className="relative z-10 w-full rounded-3xl shadow-2xl border border-white/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <GraduationCap className="text-primary w-6 h-6" />
            <span className="font-display font-bold text-xl">BAC MASTER CI</span>
          </div>
          <p className="text-muted-foreground mb-8">L'excellence éducative à portée de main.</p>
          <div className="text-sm text-muted-foreground/60">
            © {new Date().getFullYear()} BAC MASTER CI. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}
