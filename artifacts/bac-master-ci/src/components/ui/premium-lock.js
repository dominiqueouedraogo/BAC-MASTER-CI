"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PremiumLock = PremiumLock;
var lucide_react_1 = require("lucide-react");
var button_1 = require("./button");
var api_client_react_1 = require("@workspace/api-client-react");
var react_query_1 = require("@tanstack/react-query");
var use_toast_1 = require("@/hooks/use-toast");
function PremiumLock(_a) {
    var _b = _a.title, title = _b === void 0 ? "Contenu Premium" : _b, _c = _a.description, description = _c === void 0 ? "Ce contenu est réservé aux membres Premium. Mettez à niveau votre compte pour y accéder." : _c;
    var queryClient = (0, react_query_1.useQueryClient)();
    var toast = (0, use_toast_1.useToast)().toast;
    var upgradeMutation = (0, api_client_react_1.useUpgradeToPremium)();
    var handleUpgrade = function () {
        upgradeMutation.mutate(undefined, {
            onSuccess: function (updatedUser) {
                queryClient.setQueryData((0, api_client_react_1.getGetMeQueryKey)(), updatedUser);
                toast({ title: "Compte Premium activé !", description: "Vous avez maintenant accès à tout le contenu." });
            },
            onError: function () {
                toast({ title: "Erreur", description: "Impossible d'activer le Premium. Réessayez.", variant: "destructive" });
            },
        });
    };
    return (<div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-12 text-center shadow-sm">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2070&auto=format&fit=crop')] opacity-[0.03] bg-cover bg-center"/>
      <div className="relative z-10 flex flex-col items-center max-w-md mx-auto">
        <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-amber-500/20">
          <lucide_react_1.Lock className="w-8 h-8 text-white"/>
        </div>
        <h3 className="text-2xl font-display font-bold text-foreground mb-3">{title}</h3>
        <p className="text-muted-foreground mb-8">
          {description}
        </p>
        <button_1.Button size="lg" onClick={handleUpgrade} disabled={upgradeMutation.isPending} className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 border-0 shadow-lg shadow-orange-500/25 w-full sm:w-auto px-8 rounded-xl h-14 text-lg">
          {upgradeMutation.isPending ? <lucide_react_1.Loader2 className="w-5 h-5 animate-spin mr-2"/> : null}
          Passer Premium
        </button_1.Button>
      </div>
    </div>);
}
