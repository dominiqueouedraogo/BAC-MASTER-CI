"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainLayout = MainLayout;
var react_1 = require("react");
var wouter_1 = require("wouter");
var use_auth_1 = require("@/hooks/use-auth");
var utils_1 = require("@/lib/utils");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
function MainLayout(_a) {
    var _b, _c;
    var children = _a.children;
    var _d = (0, use_auth_1.useAuth)(), user = _d.user, logout = _d.logout;
    var location = (0, wouter_1.useLocation)()[0];
    var _e = (0, react_1.useState)(false), isMobileMenuOpen = _e[0], setIsMobileMenuOpen = _e[1];
    var navigation = [
        { name: 'Tableau de bord', href: '/dashboard', icon: lucide_react_1.LayoutDashboard },
        { name: 'Cours', href: '/courses', icon: lucide_react_1.BookOpen },
        { name: 'Exercices', href: '/exercises', icon: lucide_react_1.BrainCircuit },
        { name: 'Annales BAC', href: '/exams', icon: lucide_react_1.FileText },
        { name: 'Tuteur IA', href: '/chat', icon: lucide_react_1.MessageSquareText },
        { name: 'Méthodologie', href: '/methodology', icon: lucide_react_1.GraduationCap },
        { name: 'Classement', href: '/leaderboard', icon: lucide_react_1.Trophy },
        { name: 'Profil', href: '/profile', icon: lucide_react_1.User },
    ];
    if ((user === null || user === void 0 ? void 0 : user.role) === 'admin') {
        navigation.push({ name: 'Administration', href: '/admin', icon: lucide_react_1.ShieldAlert });
    }
    var toggleMobileMenu = function () { return setIsMobileMenuOpen(!isMobileMenuOpen); };
    var closeMobileMenu = function () { return setIsMobileMenuOpen(false); };
    return (<div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-card border-r border-border shadow-sm z-10">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
            <lucide_react_1.GraduationCap className="text-white w-6 h-6"/>
          </div>
          <span className="font-display font-bold text-xl tracking-tight">BAC MASTER CI</span>
        </div>

        <div className="px-6 pb-4">
          {user ? (<div className="bg-primary/5 rounded-xl p-4 flex items-center gap-3 border border-primary/10">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                {((_b = user.name) === null || _b === void 0 ? void 0 : _b.charAt(0).toUpperCase()) || 'U'}
              </div>
              <div>
                <p className="text-sm font-bold text-foreground leading-tight">{user.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Série {user.series}</p>
              </div>
            </div>) : (<div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
              <p className="text-sm text-muted-foreground mb-3">Connectez-vous pour accéder à toutes les fonctionnalités.</p>
              <div className="flex gap-2">
                <wouter_1.Link href="/login" className="flex-1">
                  <button_1.Button size="sm" className="w-full">Se connecter</button_1.Button>
                </wouter_1.Link>
                <wouter_1.Link href="/register" className="flex-1">
                  <button_1.Button size="sm" variant="outline" className="w-full">S'inscrire</button_1.Button>
                </wouter_1.Link>
              </div>
            </div>)}
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          {navigation.map(function (item) {
            var isActive = location === item.href || location.startsWith("".concat(item.href, "/"));
            return (<wouter_1.Link key={item.name} href={item.href} className={(0, utils_1.cn)("flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium", isActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "text-muted-foreground hover:bg-secondary/10 hover:text-foreground")}>
                <item.icon className={(0, utils_1.cn)("w-5 h-5", isActive ? "text-primary-foreground" : "text-muted-foreground")}/>
                {item.name}
              </wouter_1.Link>);
        })}
        </nav>

        <div className="p-4 border-t border-border mt-auto">
          {user ? (<>
              {!user.isPremium && (<div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl p-4 border border-amber-500/20 mb-4">
                  <h4 className="font-bold text-amber-600 text-sm mb-1">Passer Premium</h4>
                  <p className="text-xs text-muted-foreground mb-3">Débloquez tous les cours et corrections détaillées.</p>
                  <button_1.Button size="sm" className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 hover:from-amber-600 hover:to-orange-600">
                    Mettre à niveau
                  </button_1.Button>
                </div>)}
              <button onClick={logout} className="flex w-full items-center gap-3 px-4 py-3 text-destructive hover:bg-destructive/10 rounded-xl transition-colors font-medium">
                <lucide_react_1.LogOut className="w-5 h-5"/>
                Se déconnecter
              </button>
            </>) : (<wouter_1.Link href="/login">
              <button className="flex w-full items-center gap-3 px-4 py-3 text-primary hover:bg-primary/10 rounded-xl transition-colors font-medium">
                <lucide_react_1.LogIn className="w-5 h-5"/>
                Se connecter
              </button>
            </wouter_1.Link>)}
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="md:hidden flex items-center justify-between p-4 bg-card border-b border-border shadow-sm z-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <lucide_react_1.GraduationCap className="text-white w-5 h-5"/>
            </div>
            <span className="font-display font-bold text-lg">BAC MASTER</span>
          </div>
          <button_1.Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <lucide_react_1.X /> : <lucide_react_1.Menu />}
          </button_1.Button>
        </header>

        {/* Mobile Navigation Overlay */}
        {isMobileMenuOpen && (<div className="md:hidden fixed inset-0 z-50 bg-background flex flex-col pt-16 animate-in slide-in-from-top">
            <button_1.Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={closeMobileMenu}>
              <lucide_react_1.X />
            </button_1.Button>
            <div className="p-6">
              {user ? (<div className="bg-primary/5 rounded-xl p-4 flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                    {((_c = user.name) === null || _c === void 0 ? void 0 : _c.charAt(0).toUpperCase()) || 'U'}
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{user.name}</p>
                    <p className="text-sm text-muted-foreground">Série {user.series}</p>
                  </div>
                </div>) : (<div className="bg-primary/5 rounded-xl p-4 border border-primary/10 mb-6">
                  <p className="text-sm text-muted-foreground mb-3">Connectez-vous pour accéder à toutes les fonctionnalités.</p>
                  <div className="flex gap-2">
                    <wouter_1.Link href="/login" className="flex-1" onClick={closeMobileMenu}>
                      <button_1.Button size="sm" className="w-full">Se connecter</button_1.Button>
                    </wouter_1.Link>
                    <wouter_1.Link href="/register" className="flex-1" onClick={closeMobileMenu}>
                      <button_1.Button size="sm" variant="outline" className="w-full">S'inscrire</button_1.Button>
                    </wouter_1.Link>
                  </div>
                </div>)}
              <nav className="space-y-2">
                {navigation.map(function (item) {
                var isActive = location === item.href || location.startsWith("".concat(item.href, "/"));
                return (<wouter_1.Link key={item.name} href={item.href} onClick={closeMobileMenu} className={(0, utils_1.cn)("flex items-center gap-4 px-4 py-4 rounded-xl transition-all font-medium text-lg", isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary/10")}>
                      <item.icon className="w-6 h-6"/>
                      {item.name}
                    </wouter_1.Link>);
            })}
              </nav>
              {user ? (<button onClick={function () { logout(); closeMobileMenu(); }} className="flex w-full items-center gap-4 px-4 py-4 mt-8 text-destructive hover:bg-destructive/10 rounded-xl font-medium text-lg">
                  <lucide_react_1.LogOut className="w-6 h-6"/>
                  Se déconnecter
                </button>) : (<wouter_1.Link href="/login" onClick={closeMobileMenu}>
                  <button className="flex w-full items-center gap-4 px-4 py-4 mt-8 text-primary hover:bg-primary/10 rounded-xl font-medium text-lg">
                    <lucide_react_1.LogIn className="w-6 h-6"/>
                    Se connecter
                  </button>
                </wouter_1.Link>)}
            </div>
          </div>)}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-background/50 relative">
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"/>
          <div className="relative z-10 max-w-6xl mx-auto p-4 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>);
}
