import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { 
  BookOpen, 
  GraduationCap, 
  LayoutDashboard, 
  Trophy, 
  User, 
  MessageSquareText, 
  BrainCircuit, 
  FileText,
  LogOut,
  Menu,
  X,
  ShieldAlert
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Tableau de bord', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Cours', href: '/courses', icon: BookOpen },
    { name: 'Exercices', href: '/exercises', icon: BrainCircuit },
    { name: 'Annales BAC', href: '/exams', icon: FileText },
    { name: 'Tuteur IA', href: '/chat', icon: MessageSquareText },
    { name: 'Méthodologie', href: '/methodology', icon: GraduationCap },
    { name: 'Classement', href: '/leaderboard', icon: Trophy },
    { name: 'Profil', href: '/profile', icon: User },
  ];

  if (user?.role === 'admin') {
    navigation.push({ name: 'Administration', href: '/admin', icon: ShieldAlert });
  }

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-card border-r border-border shadow-sm z-10">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
            <GraduationCap className="text-white w-6 h-6" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">BAC MASTER CI</span>
        </div>

        <div className="px-6 pb-4">
          <div className="bg-primary/5 rounded-xl p-4 flex items-center gap-3 border border-primary/10">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <p className="text-sm font-bold text-foreground leading-tight">{user?.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Série {user?.series}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = location === item.href || location.startsWith(`${item.href}/`);
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                    : "text-muted-foreground hover:bg-secondary/10 hover:text-foreground"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border mt-auto">
          {!user?.isPremium && (
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl p-4 border border-amber-500/20 mb-4">
              <h4 className="font-bold text-amber-600 text-sm mb-1">Passer Premium</h4>
              <p className="text-xs text-muted-foreground mb-3">Débloquez tous les cours et corrections détaillées.</p>
              <Button size="sm" className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 hover:from-amber-600 hover:to-orange-600">
                Mettre à niveau
              </Button>
            </div>
          )}
          <button 
            onClick={logout}
            className="flex w-full items-center gap-3 px-4 py-3 text-destructive hover:bg-destructive/10 rounded-xl transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" />
            Se déconnecter
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="md:hidden flex items-center justify-between p-4 bg-card border-b border-border shadow-sm z-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <GraduationCap className="text-white w-5 h-5" />
            </div>
            <span className="font-display font-bold text-lg">BAC MASTER</span>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </header>

        {/* Mobile Navigation Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-background flex flex-col pt-16 animate-in slide-in-from-top">
            <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={closeMobileMenu}>
              <X />
            </Button>
            <div className="p-6">
              <div className="bg-primary/5 rounded-xl p-4 flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="font-bold text-foreground">{user?.name}</p>
                  <p className="text-sm text-muted-foreground">Série {user?.series}</p>
                </div>
              </div>
              <nav className="space-y-2">
                {navigation.map((item) => {
                  const isActive = location === item.href || location.startsWith(`${item.href}/`);
                  return (
                    <Link 
                      key={item.name} 
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={cn(
                        "flex items-center gap-4 px-4 py-4 rounded-xl transition-all font-medium text-lg",
                        isActive 
                          ? "bg-primary text-primary-foreground" 
                          : "text-muted-foreground hover:bg-secondary/10"
                      )}
                    >
                      <item.icon className="w-6 h-6" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
              <button 
                onClick={() => { logout(); closeMobileMenu(); }}
                className="flex w-full items-center gap-4 px-4 py-4 mt-8 text-destructive hover:bg-destructive/10 rounded-xl font-medium text-lg"
              >
                <LogOut className="w-6 h-6" />
                Se déconnecter
              </button>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-background/50 relative">
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-6xl mx-auto p-4 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
