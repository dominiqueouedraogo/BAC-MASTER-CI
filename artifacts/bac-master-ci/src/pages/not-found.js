"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NotFound;
var wouter_1 = require("wouter");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
function NotFound() {
    return (<div className="min-h-screen w-full flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2070&auto=format&fit=crop')] opacity-[0.02] bg-cover bg-center"/>
      <div className="text-center relative z-10">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          <lucide_react_1.FileQuestion className="w-12 h-12 text-muted-foreground"/>
        </div>
        <h1 className="text-6xl font-display font-black text-foreground mb-4">404</h1>
        <h2 className="text-2xl font-bold text-muted-foreground mb-8">Oups ! Cette page n'existe pas.</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Il semble que vous ayez perdu votre chemin dans vos révisions. Retournons à l'essentiel.
        </p>
        <wouter_1.Link href="/">
          <button_1.Button size="lg" className="rounded-xl px-8 h-14 text-lg font-semibold gap-2">
            <lucide_react_1.Home className="w-5 h-5"/> Retour à l'accueil
          </button_1.Button>
        </wouter_1.Link>
      </div>
    </div>);
}
