import { db, lessonsTable, exercisesTable } from "@workspace/db";
import { eq, and, gte, count } from "drizzle-orm";
import { logger } from "./logger";

const PHILO_SUBJECT_ID = 6;
const SEED_MARKER_ORDER_START = 3;
const TOTAL_LESSONS = 20;

const philoLessons = [
  // ─── Thème 1 : Raisonnement et méthodes ────────────────────────────────────
  {
    order: 3, series: "ALL",
    title: "Leçon 1 : La dissertation philosophique",
    duration: 55, isPremium: false,
    summary: "Maîtriser la méthode de la dissertation philosophique : identifier une problématique, construire un plan dialectique ou thématique, argumenter avec rigueur et exemples.",
    keyPoints: `La dissertation est un exercice de réflexion argumentée sur un problème philosophique
Étapes : analyse du sujet → problématique → plan → rédaction → conclusion
Problématique : question fondamentale qui révèle la tension dans le sujet (Oui mais… / D'un côté… de l'autre…)
Plans courants : dialectique (thèse / antithèse / synthèse) ; thématique (plusieurs angles) ; progressif
L'argument philosophique : énoncé de la thèse → justification → illustration (exemple) → transition
Distinctions conceptuelles : définir les termes du sujet, notamment les mots clés
Exemples : faits historiques, œuvres littéraires, expériences de pensée, théories des philosophes
Introduction : accroche → analyse des termes → problématique → annonce du plan
Conclusion : bilan du parcours → réponse nuancée → ouverture`,
    content: `<h2>La Dissertation Philosophique</h2>
<h3>I. Qu'est-ce que la dissertation philosophique ?</h3>
<p>La dissertation est une réflexion structurée et argumentée sur un problème philosophique. Elle exige rigueur logique, culture philosophique et esprit critique. Elle n'est ni un exposé de connaissances ni un simple catalogue d'opinions.</p>
<h3>II. Analyse du sujet et problématique</h3>
<p><strong>Analyser le sujet :</strong></p>
<ul>
  <li>Identifier les mots clés et les définir avec précision</li>
  <li>Repérer les présupposés du sujet (ce qu'il suppose comme évident)</li>
  <li>Mettre en tension les concepts (ex. : "La liberté est-elle compatible avec la loi ?")</li>
</ul>
<p><strong>La problématique</strong> est la question philosophique centrale qui organise toute la réflexion. Elle doit montrer qu'il y a un vrai problème, une tension, une difficulté.</p>
<h3>III. Le plan</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Type de plan</th><th>Structure</th><th>Usage</th></tr>
  <tr><td>Dialectique</td><td>Thèse / Antithèse / Synthèse</td><td>Sujet qui oppose deux positions</td></tr>
  <tr><td>Thématique</td><td>3 aspects différents</td><td>Sujet à explorer sous plusieurs angles</td></tr>
  <tr><td>Progressif</td><td>Du plus évident au plus profond</td><td>Sujet d'approfondissement</td></tr>
</table>
<h3>IV. Structure de l'argument</h3>
<ol>
  <li><strong>Énoncé de la thèse :</strong> affirmation claire</li>
  <li><strong>Justification :</strong> raisonnement logique</li>
  <li><strong>Illustration :</strong> exemple précis (philosophe, événement, œuvre)</li>
  <li><strong>Transition :</strong> lien vers l'argument suivant</li>
</ol>
<h3>V. Introduction et conclusion</h3>
<p><strong>Introduction :</strong> accroche (citation, paradoxe, fait) → définition des termes → problématique → annonce du plan.</p>
<p><strong>Conclusion :</strong> bilan (rappel du parcours), réponse synthétique, ouverture (nouvelle question connexe).</p>`,
    examples: `<p><strong>Sujet :</strong> "L'homme est-il libre ?"<br>
Analyse : "homme" (être de raison et de désir), "libre" (absence de contrainte ? pouvoir d'agir selon sa volonté ?).<br>
Problématique : La liberté est-elle une réalité vécue ou une illusion produite par l'ignorance de nos déterminismes ?<br>
Plan dialectique :<br>
I. L'homme semble libre : il délibère, choisit et agit (Descartes, libre arbitre).<br>
II. Cependant, il est déterminé : biologie, inconscient, société (Spinoza, Marx, Freud).<br>
III. La vraie liberté est la connaissance de nos déterminismes (Spinoza : être libre c'est agir selon sa nature profonde).</p>`,
  },
  {
    order: 4, series: "ALL",
    title: "Leçon 2 : Le commentaire de texte philosophique",
    duration: 55, isPremium: false,
    summary: "Maîtriser la méthode du commentaire de texte : situer l'auteur et l'œuvre, dégager la thèse, analyser l'argumentation, évaluer la portée philosophique.",
    keyPoints: `Le commentaire explique, analyse et discute un texte philosophique donné
Étapes : lecture attentive → identification de la thèse → plan du texte → rédaction du commentaire
Thèse de l'auteur : la position centrale défendue dans le texte
Stratégie argumentative : comment l'auteur construit-il sa démonstration ?
Explication linéaire vs thématique : analyser en suivant le fil du texte ou par thèmes
Définir les concepts clés tels qu'utilisés par l'auteur
Portée du texte : enjeux, limite de la thèse, résonances contemporaines
Ne pas projeter ses propres idées : partir du texte, pas de ses opinions personnelles
Introduction du commentaire : auteur, contexte, thèse, plan d'explication`,
    content: `<h2>Le Commentaire de Texte Philosophique</h2>
<h3>I. Présentation et objectif</h3>
<p>Le commentaire de texte demande d'expliquer un passage philosophique : comprendre ce que dit l'auteur, comment il le dit et pourquoi c'est philosophiquement important. Il ne s'agit pas d'être d'accord ou non, mais de rendre justice à la pensée de l'auteur.</p>
<h3>II. Méthodologie pas à pas</h3>
<ol>
  <li><strong>Lecture(s) attentive(s) :</strong> souligner les mots clés, noter les articulations logiques (car, donc, mais, or, cependant…)</li>
  <li><strong>Identifier la thèse :</strong> quelle est la position centrale que l'auteur défend ?</li>
  <li><strong>Repérer le plan du texte :</strong> comment le texte est-il structuré ? (hypothèse → réfutation → conclusion ?)</li>
  <li><strong>Analyser les arguments :</strong> quels raisonnements l'auteur emploie-t-il ? (exemple, déduction, analogie ?)</li>
  <li><strong>Définir les concepts clés :</strong> comment l'auteur utilise-t-il ces termes (parfois différemment du sens courant) ?</li>
  <li><strong>Évaluer la portée :</strong> quelle est l'importance de ce texte dans l'histoire de la philosophie ? Quelles limites peut-on signaler ?</li>
</ol>
<h3>III. Structure du commentaire rédigé</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Partie</th><th>Contenu</th></tr>
  <tr><td>Introduction</td><td>Présenter l'auteur, l'œuvre, le contexte, la thèse principale, le plan du commentaire</td></tr>
  <tr><td>Développement</td><td>Explication des parties du texte avec citations courtes et analyse précise</td></tr>
  <tr><td>Conclusion</td><td>Synthèse, portée de la thèse, ouverture critique</td></tr>
</table>
<h3>IV. Erreurs à éviter</h3>
<ul>
  <li>Paraphraser sans expliquer (redire autrement sans analyser)</li>
  <li>Projeter ses propres opinions sur l'auteur</li>
  <li>Oublier de citer le texte (exemples précis requis)</li>
  <li>Ignorer la structure argumentative du texte</li>
</ul>`,
    examples: `<p><strong>Extrait :</strong> "La conscience n'est pas une chose dans le monde, elle est la lumière par laquelle il y a un monde pour moi." (Merleau-Ponty)<br>
Thèse : La conscience n'est pas un objet parmi les choses, elle est la condition de possibilité de toute expérience du monde.<br>
Analyse : Merleau-Ponty s'oppose à une conception naïve de la conscience comme une chose. La métaphore de "lumière" souligne que la conscience révèle, rend visible le monde sans elle-même être visible comme un objet.<br>
Portée : Ce texte s'inscrit dans la phénoménologie (Husserl, Heidegger) et remet en question le dualisme cartésien corps/esprit.</p>`,
  },
  // ─── Thème 2 : Connaissance, vérité, réalité ───────────────────────────────
  {
    order: 5, series: "ALL",
    title: "Leçon 3 : La connaissance de l'homme et de la réalité",
    duration: 50, isPremium: false,
    summary: "Explorer les fondements et les limites de la connaissance humaine : perception, raison, expérience, et la question de l'accès à la réalité.",
    keyPoints: `Épistémologie : philosophie de la connaissance (conditions, origines, limites)
Sources de connaissance : sensible (empirisme), rationnelle (rationalisme), intuition (Bergson)
Empirisme (Locke, Hume) : toute connaissance vient de l'expérience sensorielle
Rationalisme (Descartes, Kant) : la raison est première ; certaines vérités sont a priori
Doute cartésien : méthode pour atteindre une connaissance certaine (cogito)
Limites de nos sens : illusions, hallucinations → la perception n'est pas infaillible
Le noumène (Kant) : la réalité en soi (Ding an sich) est inaccessible ; on ne connaît que les phénomènes
Sujet connaissant / objet connu : le sujet structure la réalité qu'il perçoit (révolution copernicienne de Kant)`,
    content: `<h2>La Connaissance de l'Homme et de la Réalité</h2>
<h3>I. Qu'est-ce que connaître ?</h3>
<p>Connaître, c'est saisir la réalité de manière exacte et justifiée. La philosophie distingue :</p>
<ul>
  <li><strong>Connaître</strong> (savoir justifié) vs <strong>croire</strong> (opinion non vérifiée)</li>
  <li><strong>Connaissance a priori :</strong> indépendante de l'expérience (logique, mathématiques)</li>
  <li><strong>Connaissance a posteriori :</strong> fondée sur l'expérience sensible</li>
</ul>
<h3>II. Les sources de la connaissance</h3>
<p><strong>Empirisme :</strong> Locke, Hume — L'esprit est une "table rase" (tabula rasa). Toute idée vient de l'expérience. Les sens sont la porte d'entrée du savoir.</p>
<p><strong>Rationalisme :</strong> Descartes, Spinoza, Leibniz — La raison seule garantit une connaissance certaine. Les sens trompent. Le cogito ("je pense donc je suis") est la première certitude indubitable.</p>
<p><strong>Criticisme de Kant :</strong> synthèse entre empirisme et rationalisme. L'expérience est nécessaire mais insuffisante. La raison structure l'expérience via les catégories (espace, temps, causalité).</p>
<h3>III. La réalité est-elle accessible ?</h3>
<p>Kant distingue :</p>
<ul>
  <li><strong>Phénomène :</strong> la réalité telle qu'elle nous apparaît (structurée par notre sensibilité et notre raison)</li>
  <li><strong>Noumène :</strong> la chose en soi (Ding an sich) → inaccessible à la connaissance humaine</li>
</ul>
<p>Nous ne connaissons jamais le monde "en lui-même", mais toujours à travers le filtre de notre subjectivité.</p>
<h3>IV. Limites de la perception</h3>
<p>Les illusions, mirages, rêves, hallucinations montrent que les sens peuvent tromper. Descartes les utilise pour justifier le doute méthodique. La perception n'est pas une copie fidèle du réel.</p>`,
    examples: `<p><strong>Exemple 1 :</strong> Le bâton dans l'eau paraît brisé (réfraction) → les sens trompent. Descartes conclut qu'il faut douter des données sensibles.</p>
<p><strong>Exemple 2 :</strong> Kant : avant d'observer un fait, nous y projetons des catégories (causalité, temps). Nous ne voyons jamais un phénomène "pur" — toujours structuré par notre entendement.</p>
<p><strong>Exemple 3 :</strong> Platon (allégorie de la caverne) : les hommes enchaînés ne voient que des ombres et les prennent pour la réalité → la vraie connaissance exige de se libérer des apparences.</p>`,
  },
  {
    order: 6, series: "ALL",
    title: "Leçon 4 : La vérité et les difficultés liées à son élaboration",
    duration: 50, isPremium: false,
    summary: "Analyser les différentes conceptions de la vérité, ses critères, ses obstacles (erreur, illusion, idéologie) et la question du relativisme.",
    keyPoints: `Vérité : conformité du discours à la réalité (adéquation) ou cohérence interne (cohérence)
Trois théories : vérité-correspondance (adéquation), vérité-cohérence (logique), vérité-pragmatique (utilité)
Vérité subjective vs objective : peut-on avoir une vérité universelle ?
Relativisme : la vérité dépend du point de vue, de la culture, du sujet (Protagoras : "l'homme est mesure de toutes choses")
Erreur : confusion involontaire (≠ mensonge qui est intentionnel)
Illusion : croyance persistante malgré la preuve du contraire (illusions des sens, préjugés)
Idéologie (Marx) : représentation déformée de la réalité au profit d'une classe dominante
Le doute cartésien : méthode pour atteindre des vérités indubitables
Critères de vérité : évidence (Descartes), réfutabilité (Popper), consensus intersubjectif (Habermas)`,
    content: `<h2>La Vérité et les Difficultés de son Élaboration</h2>
<h3>I. Qu'est-ce que la vérité ?</h3>
<p>La vérité est traditionnellement définie comme l'adéquation entre ce qu'on dit (ou pense) et ce qui est réellement le cas. Aristote : "Dire de ce qui est qu'il est, et de ce qui n'est pas qu'il n'est pas, voilà la vérité."</p>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Théorie</th><th>Définition</th><th>Représentants</th></tr>
  <tr><td>Correspondance</td><td>La vérité est l'adéquation entre un énoncé et la réalité</td><td>Aristote, Russell</td></tr>
  <tr><td>Cohérence</td><td>La vérité est la non-contradiction au sein d'un système</td><td>Spinoza, Hegel</td></tr>
  <tr><td>Pragmatique</td><td>Est vrai ce qui est utile, efficace pour l'action</td><td>Peirce, James</td></tr>
</table>
<h3>II. La vérité est-elle universelle ?</h3>
<p><strong>Universalisme :</strong> il existe des vérités valables pour tous, indépendamment des cultures et des individus (mathématiques, logique).</p>
<p><strong>Relativisme :</strong> Protagoras ("L'homme est la mesure de toutes choses") — la vérité serait relative au sujet ou à la culture. Mais si tout est relatif, le relativisme lui-même l'est aussi (paradoxe).</p>
<h3>III. Les obstacles à la vérité</h3>
<ul>
  <li><strong>L'erreur :</strong> jugement faux involontaire. Se corriger demande humilité et méthode.</li>
  <li><strong>L'illusion :</strong> croyance tenace malgré la connaissance du contraire (illusion d'optique, illusions collectives).</li>
  <li><strong>Les préjugés (Bacon, idoles) :</strong> obstacles mentaux à la connaissance objective — idoles de la tribu, de la caverne, du marché, du théâtre.</li>
  <li><strong>L'idéologie (Marx) :</strong> système de représentations déformées servant les intérêts d'une classe (la classe dominante impose sa vision du monde comme "naturelle").</li>
</ul>
<h3>IV. Critères de vérité</h3>
<ul>
  <li><strong>Évidence (Descartes) :</strong> ce qui s'impose clairement à l'esprit</li>
  <li><strong>Vérifiabilité :</strong> pouvoir être testé empiriquement</li>
  <li><strong>Réfutabilité (Popper) :</strong> une théorie scientifique doit pouvoir être falsifiée</li>
</ul>`,
    examples: `<p><strong>Exemple 1 :</strong> "La Terre est plate" était une croyance répandue, une erreur collective. La science (Eratosthène, navigation) a établi la vérité contraire.</p>
<p><strong>Exemple 2 (idéologie) :</strong> Pour Marx, l'idée "que la société hiérarchique est naturelle" est une idéologie qui légitime l'exploitation en la faisant paraître inévitable.</p>
<p><strong>Exemple 3 (Popper) :</strong> La théorie de la relativité d'Einstein est scientifique car elle est réfutable : une seule observation contraire suffirait à l'invalider. En revanche, une affirmation non réfutable n'est pas scientifique.</p>`,
  },
  {
    order: 7, series: "ALL",
    title: "Leçon 5 : La raison, la rationalité et leurs limites",
    duration: 50, isPremium: false,
    summary: "Définir la raison comme faculté proprement humaine, étudier ses usages (théorique, pratique) et ses limites (irrationalité, foi, inconscient).",
    keyPoints: `Raison : faculté de penser selon des principes logiques, d'établir des vérités universelles
Raison théorique : connaissance du vrai (science, logique, philosophie)
Raison pratique (Kant) : guide de l'action morale (impératif catégorique)
Rationalisme fort : la réalité entière est rationnelle et connaissable (Hegel : "ce qui est réel est rationnel")
Limites de la raison : le domaine du sentiment (Pascal), l'inconscient (Freud), la foi (Kierkegaard)
Pascal : "Le cœur a ses raisons que la raison ne connaît point" → intuition affective irréductible à la raison
Irrationalisme : certains aspects de l'existence échappent à la raison (Schopenhauer, Nietzsche)
Raison instrumentale (Horkheimer) : déviation de la raison en simple outil d'efficacité technique`,
    content: `<h2>La Raison, la Rationalité et leurs Limites</h2>
<h3>I. La raison : définition et fonctions</h3>
<p>La raison est la faculté proprement humaine de penser de manière cohérente, de suivre des principes logiques, de distinguer le vrai du faux et le bien du mal.</p>
<ul>
  <li><strong>Raison théorique :</strong> connaissance de ce qui est (vérité, science)</li>
  <li><strong>Raison pratique :</strong> guide de l'action et du jugement moral</li>
  <li><strong>Raison instrumentale :</strong> calcul des moyens pour atteindre une fin (≠ raison morale)</li>
</ul>
<h3>II. L'optimisme rationaliste</h3>
<p>Descartes : la raison est universellement partagée ("le bon sens est la chose du monde la mieux partagée"). C'est son bon usage qui fait défaut.</p>
<p>Hegel : "Tout ce qui est réel est rationnel, tout ce qui est rationnel est réel." La réalité a une structure rationnelle que la philosophie peut dévoiler.</p>
<h3>III. Les limites de la raison</h3>
<p><strong>Pascal :</strong> "Le cœur a ses raisons que la raison ne connaît point." Il y a une connaissance par le cœur (intuition, sentiment) irréductible à la démonstration rationnelle. La foi échappe à la raison.</p>
<p><strong>Freud :</strong> L'inconscient montre que l'homme n'est pas maître dans sa propre maison. Des forces irrationnelles (désirs refoulés, pulsions) orientent le comportement sans que la raison le sache.</p>
<p><strong>Nietzsche :</strong> La raison dissimule la volonté de puissance. Le dionysiaque (instinct, passion, vie) est aussi fondamental que l'apollinien (ordre, raison).</p>
<p><strong>Kierkegaard :</strong> La foi (le "saut dans l'absurde") dépasse les catégories rationnelles.</p>
<h3>IV. La raison instrumentale (École de Francfort)</h3>
<p>Horkheimer et Adorno : la raison moderne s'est réduite à une raison instrumentale — elle calcule les moyens sans questionner les fins. Résultat : barbarie technologique (nazisme, Auschwitz) malgré les Lumières.</p>`,
    examples: `<p><strong>Exemple 1 :</strong> Les mathématiques sont le triomphe de la raison pure : leurs vérités (2+2=4, théorème de Pythagore) sont universelles et nécessaires, indépendantes de toute expérience.</p>
<p><strong>Exemple 2 :</strong> Un homme amoureux sait rationnellement que son amour peut être irrationnel, mais il ne peut s'en défaire. Pascal dirait que "le cœur a ses raisons" que la raison ne peut contrôler.</p>
<p><strong>Exemple 3 :</strong> L'acte manqué (Freud) : on "oublie" un rendez-vous désagréable. L'inconscient oriente l'action de façon irrationnelle, à l'insu de la raison consciente.</p>`,
  },
  {
    order: 8, series: "ALL",
    title: "Leçon 6 : La science et ses apports à la connaissance du réel",
    duration: 50, isPremium: false,
    summary: "Étudier la démarche scientifique, ses méthodes (hypothético-déductif, expérimental), ses limites et son rapport à la technique et à la société.",
    keyPoints: `Science : discours rigoureux, méthodique et réfutable sur le réel
Méthode expérimentale (Claude Bernard) : observation → hypothèse → expérience → résultat
Méthode hypothético-déductive : partir d'hypothèses et en déduire des conséquences vérifiables
Réfutabilité (Popper) : critère de démarcation entre science et non-science
Révolutions scientifiques (Kuhn) : paradigmes → anomalies → crise → nouveau paradigme
Limites de la science : ne peut pas répondre aux questions de sens (morale, art, religion)
Science ≠ technique : la science cherche à comprendre, la technique cherche à agir/transformer
Scientisme : croire que la science peut tout expliquer → attitude critiquée par les humanistes
La science est progressive mais ne détient pas la vérité définitive`,
    content: `<h2>La Science et ses Apports à la Connaissance</h2>
<h3>I. Définition et caractères de la connaissance scientifique</h3>
<p>La science se distingue de l'opinion (doxa) par sa méthode rigoureuse et son caractère réfutable. Une connaissance scientifique est :</p>
<ul>
  <li><strong>Systématique :</strong> organisée en théories cohérentes</li>
  <li><strong>Vérifiable :</strong> testable par l'expérience ou l'observation</li>
  <li><strong>Réfutable (Popper) :</strong> peut en principe être invalidée par une observation contraire</li>
  <li><strong>Progressive :</strong> se corrige et s'améliore avec le temps</li>
</ul>
<h3>II. Les méthodes scientifiques</h3>
<p><strong>Méthode expérimentale (Claude Bernard) :</strong></p>
<ol>
  <li>Observation d'un phénomène</li>
  <li>Formulation d'une hypothèse</li>
  <li>Expérimentation (groupe test vs groupe contrôle)</li>
  <li>Interprétation des résultats</li>
  <li>Conclusion (confirmation ou infirmation de l'hypothèse)</li>
</ol>
<p><strong>Méthode hypothético-déductive :</strong> à partir d'une hypothèse, on déduit des prédictions vérifiables. Utilisée en physique théorique, en économie.</p>
<h3>III. Les révolutions scientifiques (Thomas Kuhn)</h3>
<p>La science ne progresse pas linéairement. Elle connaît des ruptures :</p>
<ul>
  <li><strong>Paradigme normal :</strong> un cadre théorique dominant (ex. : astronomie ptoléméenne)</li>
  <li><strong>Anomalies :</strong> observations qui ne cadrent pas avec le paradigme</li>
  <li><strong>Crise et révolution :</strong> le vieux paradigme est abandonné (ex. : révolution copernicienne)</li>
  <li><strong>Nouveau paradigme :</strong> une nouvelle vision du monde s'impose</li>
</ul>
<h3>IV. Limites et critiques</h3>
<ul>
  <li>La science ne répond pas aux questions de sens (pourquoi vivre ? qu'est-ce qui est juste ?)</li>
  <li><strong>Scientisme :</strong> croire que la science peut tout résoudre → illusion critiquée par Weber, Husserl</li>
  <li>La technique (application de la science) peut créer des problèmes éthiques (nucléaire, OGM, IA)</li>
</ul>`,
    examples: `<p><strong>Exemple 1 :</strong> La théorie de l'évolution de Darwin est scientifique car réfutable (une espèce trouvée au mauvais strate géologique pourrait l'invalider). La croyance en la création divine n'est pas réfutable → n'est pas scientifique (Popper).</p>
<p><strong>Exemple 2 :</strong> La mécanique newtonienne a été le paradigme dominant pendant 200 ans avant d'être remplacée par la relativité d'Einstein pour les grandes vitesses et masses.</p>`,
  },
  // ─── Thème 3 : Homme, société et liberté ──────────────────────────────────
  {
    order: 9, series: "ALL",
    title: "Leçon 7 : La liberté et la conquête de la liberté",
    duration: 55, isPremium: false,
    summary: "Analyser la notion de liberté dans ses dimensions philosophiques : libre arbitre, déterminisme, liberté politique et condition de possibilité de la liberté.",
    keyPoints: `Liberté : capacité d'agir selon sa propre volonté, sans contrainte extérieure
Libre arbitre : pouvoir de choisir entre plusieurs possibilités (Descartes, Kant)
Déterminisme (Spinoza, Marx, Freud) : tous nos actes sont déterminés → le libre arbitre est une illusion
Compatibilisme : la liberté est compatible avec le déterminisme (être libre = agir selon sa propre nature)
Liberté négative (Isaiah Berlin) : absence de contrainte, d'interférence (liberté "de")
Liberté positive : capacité réelle d'agir, de se réaliser (liberté "pour")
Obstacles à la liberté : domination sociale, économique, psychologique (aliénation)
Sartre : "L'existence précède l'essence" → l'homme est condamné à être libre (liberté radicale)
La liberté demande à être conquise (contre les habitudes, les préjugés, les oppressions)`,
    content: `<h2>La Liberté et la Conquête de la Liberté</h2>
<h3>I. Définitions de la liberté</h3>
<ul>
  <li><strong>Sens commun :</strong> faire ce qu'on veut, sans contrainte</li>
  <li><strong>Libre arbitre :</strong> pouvoir de décider librement entre plusieurs options (faculté de la volonté)</li>
  <li><strong>Liberté politique :</strong> jouissance de droits garantis par l'État</li>
  <li><strong>Liberté existentielle (Sartre) :</strong> responsabilité radicale de se définir soi-même</li>
</ul>
<h3>II. Le libre arbitre contre le déterminisme</h3>
<p><strong>Libre arbitre (Descartes, Kant) :</strong> L'homme a une volonté libre qui peut s'opposer à ses désirs et à ses inclinations naturelles. La liberté morale consiste à obéir à la loi que la raison se donne à elle-même (autonomie).</p>
<p><strong>Déterminisme (Spinoza) :</strong> "Les hommes se croient libres parce qu'ils ont conscience de leurs désirs et ignorent les causes qui les déterminent." La liberté est une illusion produite par l'ignorance.</p>
<p><strong>Déterminismes modernes :</strong> Marx (conditions économiques), Freud (inconscient), biologie (génétique). Nos choix seraient programmés par des forces extérieures à notre conscience.</p>
<h3>III. Les deux sens de la liberté (Isaiah Berlin)</h3>
<ul>
  <li><strong>Liberté négative :</strong> absence d'obstacles, de contraintes extérieures (liberté de circulation, d'expression)</li>
  <li><strong>Liberté positive :</strong> capacité effective d'agir et de se réaliser (liberté réelle, qui nécessite éducation, santé, ressources)</li>
</ul>
<h3>IV. Sartre et la liberté radicale</h3>
<p>"L'existence précède l'essence" : il n'y a pas de nature humaine fixe. L'homme se crée par ses choix. Mais cette liberté radicale s'accompagne d'une responsabilité totale (angoisse). "L'homme est condamné à être libre."</p>
<h3>V. La conquête de la liberté</h3>
<p>La liberté n'est pas donnée, elle se conquiert : contre l'oppression politique (luttes sociales, droits civiques), contre les déterminismes (éducation, conscience de soi), contre les passions (maîtrise de soi stoïcienne).</p>`,
    examples: `<p><strong>Exemple 1 :</strong> Nelson Mandela, emprisonné 27 ans, affirme n'avoir jamais perdu sa liberté intérieure. Même enchaîné, l'esprit reste libre (liberté intérieure stoïcienne).</p>
<p><strong>Exemple 2 (Sartre) :</strong> Un soldat peut choisir de résister ou de collaborer, même sous pression extrême. Sartre : même dans les pires situations, l'homme choisit — il peut choisir de mourir plutôt que de trahir.</p>
<p><strong>Exemple 3 :</strong> Le mouvement des droits civiques (Rosa Parks, MLK) illustre la conquête de la liberté politique contre la ségrégation : la liberté formelle ("tous égaux devant la loi") ne suffisait pas sans liberté réelle.</p>`,
  },
  {
    order: 10, series: "ALL",
    title: "Leçon 8 : Le devoir et la responsabilité morale",
    duration: 50, isPremium: false,
    summary: "Étudier les fondements du devoir moral chez Kant, les diverses conceptions de la morale et la question de la responsabilité individuelle et collective.",
    keyPoints: `Morale : ensemble de règles et de valeurs guidant l'action
Éthique : réflexion sur les fondements de la morale (qu'est-ce qui est bien ?)
Kant : le devoir moral s'impose inconditionnellement (impératif catégorique)
Impératif catégorique : "Agis seulement selon la maxime qui peut être universalisée"
Autonomie vs hétéronomie : agir selon sa raison (autonomie) vs obéir à une autorité extérieure (hétéronomie)
Utilitarisme (Bentham, Mill) : est moral ce qui maximise le bonheur du plus grand nombre
Morale des vertus (Aristote) : viser l'épanouissement (eudémonisme) par l'exercice des vertus
Responsabilité morale : être l'auteur de ses actes, pouvoir délibérer, agir librement
Responsabilité collective : Hannah Arendt, la "banalité du mal" — on peut commettre des crimes par conformisme`,
    content: `<h2>Le Devoir et la Responsabilité Morale</h2>
<h3>I. Qu'est-ce que la morale ?</h3>
<p>La morale est l'ensemble des règles, valeurs et normes qui guident la conduite humaine en distinguant le bien du mal. L'éthique est la réflexion philosophique sur ces fondements.</p>
<h3>II. L'éthique déontologique : Kant et le devoir</h3>
<p>Pour Kant, la valeur morale d'un acte ne dépend pas de ses conséquences, mais de l'intention et du principe qui le guide.</p>
<p><strong>Impératif catégorique :</strong> "Agis seulement d'après la maxime grâce à laquelle tu peux vouloir en même temps qu'elle devienne une loi universelle."</p>
<ul>
  <li>Le mensonge est toujours immoral car une maxime "mentir quand c'est utile" ne peut être universalisée sans se détruire (tout le monde cesserait de croire)</li>
  <li>L'homme doit être traité comme une fin en soi, jamais comme un simple moyen</li>
</ul>
<p><strong>Autonomie morale :</strong> être libre, c'est se donner à soi-même la loi morale par la raison (≠ obéir à Dieu, à la coutume, à ses désirs).</p>
<h3>III. L'utilitarisme : la morale du plus grand bonheur</h3>
<p>Bentham et Mill : est moral ce qui produit le plus grand bien pour le plus grand nombre. On évalue les actes à leurs conséquences. La morale devient un calcul du bonheur collectif.</p>
<h3>IV. L'éthique des vertus (Aristote)</h3>
<p>La morale ne consiste pas à obéir à des règles, mais à développer des vertus (courage, justice, sagesse) qui permettent de s'épanouir (eudémonisme = recherche du bonheur par le bien vivre).</p>
<h3>V. La responsabilité morale</h3>
<ul>
  <li>Pour être responsable, il faut : liberté (avoir pu agir autrement), connaissance (savoir ce qu'on fait), intention (vouloir l'acte)</li>
  <li>Hannah Arendt ("banalité du mal") : Eichmann n'était pas un monstre, mais un fonctionnaire obéissant — la démission morale ordinaire permet les pires crimes.</li>
</ul>`,
    examples: `<p><strong>Exemple 1 (Kant) :</strong> Dois-je mentir à un ami pour lui éviter une mauvaise nouvelle ? Kant : non, car universaliser le mensonge bienveillant détruirait la confiance dans le langage.</p>
<p><strong>Exemple 2 (utilitarisme) :</strong> Trolley problem — détourner un tramway qui va tuer 5 personnes vers une voie où il n'en tuera qu'une. L'utilitarisme dit : oui (moins de morts). Kant dit : non (on utilise une personne comme moyen).</p>
<p><strong>Exemple 3 (Arendt) :</strong> Le procès Eichmann (1961) : un homme "ordinaire" qui organisait les déportations sans se sentir coupable, par obéissance. Arendt y voit la "banalité du mal" : le mal naît souvent de la non-pensée, du conformisme.</p>`,
  },
  {
    order: 11, series: "ALL",
    title: "Leçon 9 : Le bonheur et le rapport entre progrès et bonheur",
    duration: 50, isPremium: false,
    summary: "Examiner les différentes conceptions du bonheur, la question de sa recherche et l'interrogation sur le lien entre progrès technique et bonheur humain.",
    keyPoints: `Bonheur : état de satisfaction complète et durable (≠ plaisir passager)
Épicure : bonheur = ataraxie (absence de trouble) + aponie (absence de douleur physique) par la maîtrise des désirs
Stoïciens (Épictète, Marc Aurèle) : bonheur dans la maîtrise de soi ; accepter ce qu'on ne peut changer
Aristote : eudémonisme — le bonheur est l'exercice de nos capacités propres dans la vertu
Hédonisme : le bonheur est la maximisation du plaisir (Épicure ≠ débauche : viser les plaisirs stables)
Peut-on être heureux sans savoir ce qu'on cherche ? → le bonheur est un idéal indéterminé (Kant)
Progrès technique : améliore les conditions matérielles mais crée de nouvelles aliénations (stress, addiction)
Le progrès est-il une illusion ? Mythe du progrès comme marche inévitable vers le mieux
Rousseau : le progrès de la civilisation corrompt l'homme naturellement bon`,
    content: `<h2>Le Bonheur et le Progrès</h2>
<h3>I. Qu'est-ce que le bonheur ?</h3>
<p>Le bonheur désigne un état de satisfaction complète et durable. Il ne doit pas être confondu avec :</p>
<ul>
  <li>Le <strong>plaisir</strong> (satisfaction passagère et partielle)</li>
  <li>La <strong>joie</strong> (émotion intense mais éphémère)</li>
  <li>La <strong>félicité</strong> (bonheur parfait, souvent religieux)</li>
</ul>
<h3>II. Les conceptions philosophiques du bonheur</h3>
<p><strong>Épicure :</strong> Le bonheur est l'ataraxie (absence de trouble de l'âme) et l'aponie (absence de douleur du corps). Il passe par la maîtrise des désirs : distinguer les désirs naturels et nécessaires (manger, dormir) des désirs vains (richesse, gloire).</p>
<p><strong>Stoïciens (Épictète) :</strong> "Il y a des choses qui dépendent de nous (notre jugement, nos désirs) et des choses qui n'en dépendent pas (la maladie, la mort)." Le bonheur consiste à maîtriser ce qui est en notre pouvoir et à accepter le reste.</p>
<p><strong>Aristote :</strong> Le bonheur (eudémonisme) est l'épanouissement de toutes nos facultés dans l'exercice de la vertu. C'est une activité, pas un état passif.</p>
<p><strong>Kant :</strong> Le bonheur est un idéal indéterminé — on sait qu'on le cherche sans savoir exactement ce qu'il est. La morale (le devoir) prime sur la recherche du bonheur.</p>
<h3>III. Progrès et bonheur</h3>
<p><strong>Argument pour :</strong> Le progrès technique améliore les conditions de vie (médecine, alimentation, confort), réduisant la douleur et la souffrance.</p>
<p><strong>Argument contre (Rousseau) :</strong> "L'homme naît bon, c'est la société qui le corrompt." La civilisation et le progrès développent l'inégalité, l'envie et l'artifice. L'homme primitif était plus heureux.</p>
<p><strong>Marcuse, Baudrillard :</strong> La société de consommation crée des besoins artificiels qui aliènent l'homme. La multiplication des biens matériels ne produit pas le bonheur.</p>`,
    examples: `<p><strong>Exemple 1 :</strong> Épicure dans son jardin : il mangeait du pain, des olives et de l'eau, mais vivait heureux car il avait l'amitié, la philosophie et la sérénité. Le luxe crée des besoins nouveaux qui rendent malheureux.</p>
<p><strong>Exemple 2 :</strong> Le paradoxe d'Easterlin (économiste) : au-delà d'un certain seuil de revenus, l'augmentation de la richesse nationale n'accroît plus le bonheur moyen des citoyens.</p>`,
  },
  {
    order: 12, series: "ALL",
    title: "Leçon 10 : La condition humaine dans la société — aliénation et citoyenneté",
    duration: 50, isPremium: false,
    summary: "Étudier la place de l'individu dans la société : aliénation, travail, liens sociaux, citoyenneté et tension entre individu et collectif.",
    keyPoints: `Condition humaine : situation de l'homme dans le monde (finitude, liberté, relation aux autres)
Aliénation (Marx) : l'ouvrier est séparé de son travail, du produit de son travail et de lui-même dans le capitalisme
Aliénation chez Hegel : l'Esprit s'aliène dans la nature avant de se retrouver en lui-même
Contrat social (Rousseau, Hobbes, Locke) : fondement de la société politique
Hobbes : "l'homme est un loup pour l'homme" → l'État est nécessaire pour éviter la guerre de tous contre tous
Rousseau : l'homme est naturellement bon ; la société crée les inégalités ; le contrat social doit restaurer la liberté
Citoyenneté : participation à la vie politique, ensemble de droits et de devoirs
Lien social : solidarité mécanique (traditions, valeurs communes) vs solidarité organique (interdépendance fonctionnelle) — Durkheim`,
    content: `<h2>La Condition Humaine — Aliénation et Citoyenneté</h2>
<h3>I. La condition humaine</h3>
<p>Hannah Arendt distingue trois activités fondamentales de la condition humaine :</p>
<ul>
  <li><strong>Le travail (labor) :</strong> production pour la survie biologique</li>
  <li><strong>L'œuvre (work) :</strong> création d'un monde durable d'objets et de culture</li>
  <li><strong>L'action (action) :</strong> engagement dans la sphère politique avec d'autres hommes</li>
</ul>
<h3>II. L'aliénation</h3>
<p><strong>Marx :</strong> Dans le capitalisme, le travailleur est aliéné :</p>
<ol>
  <li>Du produit de son travail (qui appartient au capitaliste)</li>
  <li>De l'acte de production (travail mécanique, répétitif)</li>
  <li>De son essence humaine (l'homme est naturellement un créateur)</li>
  <li>Des autres hommes (concurrence, isolement)</li>
</ol>
<p>L'aliénation moderne prend aussi des formes culturelles (industrie culturelle, société du spectacle — Debord).</p>
<h3>III. L'État et le contrat social</h3>
<p><strong>Hobbes :</strong> À l'état de nature, "l'homme est un loup pour l'homme" (bellum omnium contra omnes). Les hommes concluent un contrat pour déléguer leur puissance à un souverain (Léviathan) qui garantit la paix.</p>
<p><strong>Locke :</strong> L'état de nature est pacifique mais fragile. Le contrat social protège les droits naturels (vie, liberté, propriété). Les gouvernants peuvent être révoqués s'ils violent ce contrat.</p>
<p><strong>Rousseau :</strong> "L'homme naît libre et partout il est dans les fers." Le contrat social doit permettre de concilier liberté individuelle et volonté générale.</p>
<h3>IV. La citoyenneté</h3>
<p>Le citoyen est membre d'une communauté politique, titulaire de droits (civils, politiques, sociaux) et de devoirs (respecter la loi, participer à la vie publique). La citoyenneté active suppose engagement et délibération démocratique.</p>`,
    examples: `<p><strong>Exemple 1 :</strong> Charlie Chaplin, Les Temps modernes (1936) : l'ouvrier répète mécaniquement les mêmes gestes à la chaîne, corps aliéné par la machine. Illustration de la thèse marxiste de l'aliénation au travail.</p>
<p><strong>Exemple 2 :</strong> La Déclaration des droits de l'homme et du citoyen (1789) illustre l'idée de Locke : les droits naturels (liberté, propriété) sont garantis par la loi, et le contrat social peut être rompu si le gouvernement les viole (droit de résistance).</p>`,
  },
  // ─── Thème 4 : Politique, justice, État ───────────────────────────────────
  {
    order: 13, series: "ALL",
    title: "Leçon 11 : L'État, la loi et la souveraineté",
    duration: 55, isPremium: false,
    summary: "Analyser la nature et les fonctions de l'État, les fondements de la loi, la notion de souveraineté et les différentes formes de légitimité du pouvoir politique.",
    keyPoints: `État : organisation politique souveraine sur un territoire avec une population
Trois éléments de l'État : territoire, population, gouvernement souverain
Souveraineté : pouvoir suprême, sans autre pouvoir au-dessus de lui (Bodin)
Légitimité vs légalité : la légitimité = reconnaissance, la légalité = conformité à la loi
Max Weber : trois types de légitimité — traditionnelle, charismatique, rationnelle-légale
Rôles de l'État : maintien de l'ordre, protection des droits, services publics, régulation économique
Séparation des pouvoirs (Montesquieu) : législatif, exécutif, judiciaire
État de droit : le pouvoir est soumis à la loi (Constitution, droits fondamentaux)
Obéissance à la loi : Socrate préfère mourir plutôt que désobéir aux lois d'Athènes
Désobéissance civile (Thoreau, Gandhi, King) : refus non violent d'une loi injuste`,
    content: `<h2>L'État, la Loi et la Souveraineté</h2>
<h3>I. Qu'est-ce que l'État ?</h3>
<p>L'État est une organisation politique souveraine qui exerce son autorité sur une population dans un territoire délimité. Max Weber le définit comme le détenteur du "monopole de la violence physique légitime".</p>
<p>Éléments constitutifs : <strong>territoire</strong> (espace géographique délimité) ; <strong>population</strong> (ensemble des citoyens) ; <strong>gouvernement souverain</strong> (autorité suprême).</p>
<h3>II. La souveraineté</h3>
<p>Jean Bodin : la souveraineté est le "pouvoir absolu et perpétuel d'une République". La souveraineté peut résider dans un monarque (monarchie absolue), dans le peuple (démocratie), ou dans un groupe (aristocratie).</p>
<p>Rousseau : la souveraineté appartient au peuple et est inaliénable. La volonté générale est le fondement de la loi légitime.</p>
<h3>III. Les types de légitimité (Weber)</h3>
<ul>
  <li><strong>Légitimité traditionnelle :</strong> fondée sur la tradition, la coutume (monarchie héréditaire)</li>
  <li><strong>Légitimité charismatique :</strong> fondée sur les qualités exceptionnelles d'un chef</li>
  <li><strong>Légitimité rationnelle-légale :</strong> fondée sur des règles établies rationnellement (démocratie moderne, État de droit)</li>
</ul>
<h3>IV. Séparation des pouvoirs (Montesquieu)</h3>
<p>"Pour qu'on ne puisse abuser du pouvoir, il faut que par la disposition des choses le pouvoir arrête le pouvoir."</p>
<ul>
  <li><strong>Pouvoir législatif :</strong> faire la loi (Parlement)</li>
  <li><strong>Pouvoir exécutif :</strong> appliquer la loi (Gouvernement)</li>
  <li><strong>Pouvoir judiciaire :</strong> juger les infractions à la loi (Tribunaux)</li>
</ul>
<h3>V. Obéissance et désobéissance</h3>
<p><strong>Socrate :</strong> même condamné injustement, il accepte la mort plutôt de fuir et trahir les lois d'Athènes (Criton de Platon).</p>
<p><strong>Désobéissance civile (Thoreau) :</strong> quand une loi est profondément injuste, le citoyen a le devoir moral de lui désobéir publiquement, pacifiquement, en acceptant les sanctions.</p>`,
    examples: `<p><strong>Exemple 1 :</strong> La Constitution ivoirienne de 2016 illustre l'État de droit : elle définit les droits fondamentaux des citoyens et organise la séparation des pouvoirs (Assemblée nationale, Président, Cour des comptes).</p>
<p><strong>Exemple 2 (désobéissance civile) :</strong> Gandhi mène la "marche du sel" (1930) pour désobéir à la loi coloniale britannique interdisant aux Indiens de produire leur propre sel — une désobéissance non violente qui a mobilisé des millions de personnes.</p>`,
  },
  {
    order: 14, series: "ALL",
    title: "Leçon 12 : La justice et les inégalités sociales",
    duration: 50, isPremium: false,
    summary: "Explorer les conceptions philosophiques de la justice, l'articulation entre justice et égalité, et les réponses aux inégalités sociales.",
    keyPoints: `Justice : vertu morale et norme sociale visant à donner à chacun ce qui lui est dû
Justice commutative (Aristote) : échange équitable entre individus (contrats, commerce)
Justice distributive : répartition équitable des biens, charges et honneurs dans la cité
Égalité formelle vs égalité réelle : même traitement pour tous vs prise en compte des différences
Rawls (Théorie de la justice) : principes d'une société juste → liberties égales + différences permises si elles bénéficient aux plus défavorisés (principe de différence)
Voile d'ignorance (Rawls) : pour être juste, choisir les règles sans savoir sa place dans la société
Nozick (libéralisme libertarien) : la justice = respect des titres acquis librement ; redistribution = violation de la propriété
Marx : la justice dans un système capitaliste est formelle mais masque l'exploitation → justice réelle par la révolution
Équité ≠ égalité : l'équité tient compte des situations particulières`,
    content: `<h2>La Justice et les Inégalités Sociales</h2>
<h3>I. Qu'est-ce que la justice ?</h3>
<p>La justice est à la fois une vertu individuelle (être juste), une norme sociale (règles équitables), et une institution (système juridique). Aristote distingue :</p>
<ul>
  <li><strong>Justice commutative :</strong> équité dans les échanges entre personnes (1 heure de travail = 1 heure de salaire)</li>
  <li><strong>Justice distributive :</strong> répartition des biens sociaux en proportion du mérite ou des besoins</li>
</ul>
<h3>II. Égalité formelle et égalité réelle</h3>
<p>L'égalité formelle (même loi pour tous) peut masquer des inégalités réelles. Anatole France : "La loi, dans sa grande équité, interdit également au pauvre et au riche de dormir sous les ponts."</p>
<p><strong>Équité</strong> vs <strong>égalité</strong> : traiter les personnes différemment selon leur situation pour aboutir à une égalité réelle (ex. : quotas, actions positives).</p>
<h3>III. John Rawls — La Théorie de la Justice</h3>
<p>Rawls propose une expérience de pensée : le "voile d'ignorance". Imagine que tu dois choisir les règles de ta société sans savoir quelle place tu y occuperas (riche ou pauvre, homme ou femme, etc.). Quelles règles choisirais-tu ?</p>
<p>Les deux principes de Rawls :</p>
<ol>
  <li><strong>Principe des libertés égales :</strong> chacun a droit aux libertés fondamentales les plus étendues compatibles avec les mêmes libertés pour tous.</li>
  <li><strong>Principe de différence :</strong> les inégalités ne sont justifiées que si elles bénéficient aux membres les plus défavorisés de la société.</li>
</ol>
<h3>IV. Les critiques</h3>
<p><strong>Nozick (libertarisme) :</strong> La redistribution forcée (impôts, sécurité sociale) viole les droits de propriété des individus. La justice consiste seulement à respecter les titres acquis librement.</p>
<p><strong>Marx :</strong> Dans le capitalisme, la justice formelle masque l'exploitation réelle. La vraie justice exige la transformation des rapports de production.</p>`,
    examples: `<p><strong>Exemple 1 :</strong> Le principe de discrimination positive (quotas pour les femmes ou les minorités dans les postes de pouvoir) incarne l'idée rawlsienne : une inégalité de traitement pour corriger une inégalité de résultat.</p>
<p><strong>Exemple 2 :</strong> Le salaire minimum (SMIG en Côte d'Ivoire) illustre la justice distributive : l'État fixe un plancher pour protéger les travailleurs les moins bien lotis.</p>`,
  },
  {
    order: 15, series: "ALL",
    title: "Leçon 13 : Le citoyen, ses droits et ses devoirs",
    duration: 45, isPremium: false,
    summary: "Définir la citoyenneté, les droits fondamentaux (civils, politiques, sociaux), les devoirs du citoyen et la tension entre droits individuels et bien commun.",
    keyPoints: `Citoyen : membre d'une communauté politique jouissant de droits et soumis à des devoirs
Droits civils : liberté, propriété, sûreté, égalité devant la loi (1ère génération)
Droits politiques : voter, être élu, liberté d'expression, d'association (1ère génération)
Droits sociaux et économiques : travail, éducation, santé (2ème génération — Welfare State)
Droits collectifs : environnement, développement, paix (3ème génération)
Devoirs : payer les impôts, respecter la loi, voter, défendre le pays
Tension droits/devoirs : l'exercice des droits suppose le respect des droits des autres
Espace public (Habermas) : lieu de délibération rationnelle entre citoyens
Démocratie participative vs représentative : vote vs participation directe aux décisions`,
    content: `<h2>Le Citoyen, ses Droits et ses Devoirs</h2>
<h3>I. La citoyenneté</h3>
<p>Être citoyen, c'est appartenir à une communauté politique, bénéficier de droits et être soumis à des devoirs. La citoyenneté implique une double dimension : <strong>juridique</strong> (droits et devoirs garantis par la loi) et <strong>politique</strong> (participation à la vie démocratique).</p>
<h3>II. Les générations des droits</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Génération</th><th>Nature</th><th>Exemples</th></tr>
  <tr><td>1ère (libertés)</td><td>Droits civils et politiques</td><td>Liberté, égalité, vote, expression, propriété</td></tr>
  <tr><td>2ème (droits sociaux)</td><td>Droits économiques et sociaux</td><td>Droit au travail, à l'éducation, à la santé</td></tr>
  <tr><td>3ème (droits collectifs)</td><td>Droits de solidarité</td><td>Droit à un environnement sain, développement, paix</td></tr>
</table>
<h3>III. Les devoirs du citoyen</h3>
<ul>
  <li>Respecter les lois et les droits d'autrui</li>
  <li>Contribuer aux charges communes (impôts)</li>
  <li>Participer à la vie démocratique (voter, s'informer, délibérer)</li>
  <li>Défendre la collectivité (service civique ou militaire)</li>
</ul>
<h3>IV. Tensions et enjeux</h3>
<p><strong>Droits individuels vs bien commun :</strong> la liberté de chacun s'arrête où commence celle des autres (Mill : "harm principle"). L'État peut limiter certaines libertés individuelles pour protéger l'intérêt général.</p>
<p><strong>Habermas et l'espace public :</strong> la démocratie requiert un espace de délibération rationnelle où les citoyens débattent librement des affaires publiques. Les médias, les partis, les associations en font partie.</p>`,
    examples: `<p><strong>Exemple 1 :</strong> La Déclaration Universelle des Droits de l'Homme (ONU, 1948) codifie les droits fondamentaux valables pour tous les êtres humains, quelle que soit leur nationalité.</p>
<p><strong>Exemple 2 :</strong> Le devoir de voter : dans plusieurs pays (Belgique, Brésil), le vote est obligatoire. En Côte d'Ivoire, c'est un droit et un devoir civique, même s'il n'est pas légalement obligatoire.</p>`,
  },
  // ─── Thème 5 : Sens de la vie, culture et valeurs ─────────────────────────
  {
    order: 16, series: "ALL",
    title: "Leçon 14 : Le sens de l'humanité à travers la culture, l'histoire et les valeurs",
    duration: 50, isPremium: false,
    summary: "Explorer ce qui définit l'humanité par-delà la nature : la culture, le travail, l'histoire et les valeurs comme productions proprement humaines.",
    keyPoints: `Culture : tout ce que l'homme ajoute à la nature par son intelligence et son travail
Nature vs culture : l'homme naît dans la nature mais vit dans la culture (langage, normes, arts, religion)
L'homme est un animal culturel (Ernst Cassirer : "animal symbolicum")
Travail : transformation de la nature, expression de la liberté humaine (Hegel, Marx)
Histoire : l'homme est un être historique, il se constitue dans le temps collectif
Relativisme culturel (Lévi-Strauss) : aucune culture n'est supérieure à une autre
Ethnocentrisme : tendance à juger les autres cultures à l'aune de la sienne propre
Valeurs : principes normatifs qui guident les choix (liberté, dignité, solidarité)
L'humanisme : philosophie qui place l'homme et sa dignité au centre de toute réflexion`,
    content: `<h2>La Culture, l'Histoire et les Valeurs de l'Humanité</h2>
<h3>I. Nature et culture</h3>
<p>L'homme est le seul être qui transforme la nature selon un projet. La <strong>culture</strong> désigne l'ensemble des productions humaines : langage, arts, techniques, institutions, croyances, valeurs.</p>
<p>Ernst Cassirer : l'homme est un "animal symbolicum" — il ne réagit pas directement aux stimuli comme l'animal, il crée des symboles (mots, mythes, rituels, œuvres d'art) qui médiatisent son rapport au monde.</p>
<h3>II. L'homme comme être historique</h3>
<p>L'homme n'est pas seulement un être naturel, il est un être <strong>historique</strong> : il se constitue dans le temps, hérite d'un passé, projette un futur. L'histoire est le milieu propre de l'existence humaine.</p>
<p>Hegel : l'histoire est le déploiement de l'Esprit vers la liberté. Chaque époque représente un moment de la réalisation de la conscience de liberté.</p>
<h3>III. Le relativisme culturel</h3>
<p>Claude Lévi-Strauss : toutes les cultures sont également complexes et répondent aux mêmes problèmes fondamentaux (survie, organisation sociale, sens). L'ethnocentrisme est un obstacle à la compréhension de l'autre.</p>
<p>Mais : le relativisme culturel absolu pose un problème — peut-on condamner une pratique culturelle (mutilation, esclavage) si toutes les cultures sont "égales" ? Les droits de l'homme universels s'opposent au relativisme radical.</p>
<h3>IV. Les valeurs humaines</h3>
<p>Les valeurs sont des principes normatifs qui guident les choix et les jugements. Elles ne sont pas données par la nature — elles sont construites culturellement et historiquement. L'humanisme affirme la dignité universelle de l'être humain comme valeur fondatrice.</p>`,
    examples: `<p><strong>Exemple 1 :</strong> Le langage est la première production culturelle : les enfants isolés (enfants sauvages, comme Victor de l'Aveyron) ne développent pas naturellement le langage — ils doivent l'apprendre culturellement.</p>
<p><strong>Exemple 2 :</strong> Le masque africain (culture Yoruba, Baoulé) n'est pas un simple objet décoratif : il est chargé de significations symboliques, rituelles et communautaires. Lévi-Strauss dirait qu'il révèle une structure symbolique aussi sophistiquée que la cathédrale gothique.</p>`,
  },
  {
    order: 17, series: "ALL",
    title: "Leçon 15 : Le langage et la communication",
    duration: 50, isPremium: false,
    summary: "Analyser les fonctions du langage, ses relations à la pensée, à la vérité et au pouvoir, ainsi que les enjeux de la communication humaine.",
    keyPoints: `Langage : système de signes permettant la communication et l'expression de la pensée
Signe linguistique (Saussure) : signifiant (image acoustique) + signifié (concept) → rapport arbitraire
Fonctions du langage (Jakobson) : expressive, référentielle, conative, phatique, métalinguistique, poétique
Le langage précède-t-il la pensée ? Sapir-Whorf : la langue structure la pensée ; Wittgenstein : "les limites de mon langage sont les limites de mon monde"
Parole et silence : ce qui ne peut pas être dit (indicible, ineffable)
Langage et pouvoir : les mots peuvent dominer, manipuler (Orwell, 1984 — la "novlangue")
Dialogue et maïeutique (Socrate) : le dialogue comme méthode pour faire accoucher la vérité
Communication vraie vs communication fausse : information, propagande, rhétorique
Différence langage/langue/parole (Saussure)`,
    content: `<h2>Le Langage et la Communication</h2>
<h3>I. Qu'est-ce que le langage ?</h3>
<p>Le langage est un système de signes permettant l'expression et la communication. Saussure distingue :</p>
<ul>
  <li><strong>Langue :</strong> le système abstrait, social (le code partagé par une communauté)</li>
  <li><strong>Parole :</strong> l'usage individuel de la langue dans un contexte donné</li>
  <li><strong>Signe linguistique :</strong> union d'un signifiant (image sonore : "arbre") et d'un signifié (concept : l'idée d'arbre). Ce lien est <strong>arbitraire</strong> (aucune ressemblance naturelle).</li>
</ul>
<h3>II. Le langage et la pensée</h3>
<p><strong>Hypothèse Sapir-Whorf :</strong> La langue que nous parlons influence notre façon de penser et de percevoir le monde. Chaque langue découpe la réalité différemment.</p>
<p><strong>Wittgenstein :</strong> "Les limites de mon langage signifient les limites de mon monde." Ce que je ne peux pas exprimer, je ne peux pas penser clairement.</p>
<p>Mais : certains philosophes (Bergson) pensent que le langage appauvrit l'expérience vive — certaines réalités (l'amour, la durée intérieure) échappent aux mots.</p>
<h3>III. Les fonctions du langage (Jakobson)</h3>
<table border="1" cellpadding="5" style="border-collapse:collapse;width:100%">
  <tr><th>Fonction</th><th>Orientation</th><th>Exemple</th></tr>
  <tr><td>Référentielle</td><td>Le monde</td><td>"Il pleut aujourd'hui"</td></tr>
  <tr><td>Expressive</td><td>L'émetteur</td><td>"Comme je suis fatigué !"</td></tr>
  <tr><td>Conative</td><td>Le récepteur</td><td>"Ouvre la fenêtre !"</td></tr>
  <tr><td>Phatique</td><td>Le contact</td><td>"Allô ? Tu m'entends ?"</td></tr>
  <tr><td>Poétique</td><td>Le message</td><td>Jeux de mots, rimes</td></tr>
  <tr><td>Métalinguistique</td><td>Le code</td><td>"Que signifie ce mot ?"</td></tr>
</table>
<h3>IV. Langage et pouvoir</h3>
<p>Orwell (1984) : la "novlangue" réduit le vocabulaire pour appauvrir la pensée et rendre la résistance intellectuelle impossible. Le contrôle du langage est un instrument de domination politique.</p>
<p>Socrate (maïeutique) : le dialogue philosophique (questions/réponses) permet de "faire accoucher" la vérité que l'interlocuteur porte en lui sans le savoir.</p>`,
    examples: `<p><strong>Exemple 1 :</strong> En inuit, il existe de nombreux mots pour la neige (les distinctions importantes dans leur vie). En français, un seul mot couvre tout. Cela semble confirmer Sapir-Whorf : la langue façonne la perception.</p>
<p><strong>Exemple 2 :</strong> La propagande politique remplace les mots neutres par des mots valorisants ou dévalorisants pour orienter la pensée (ex. : "combattant de la liberté" vs "terroriste" désignant la même personne).</p>`,
  },
  {
    order: 18, series: "ALL",
    title: "Leçon 16 : La conscience et l'inconscient",
    duration: 55, isPremium: false,
    summary: "Étudier la conscience comme accès à soi et au monde, et l'hypothèse freudienne de l'inconscient comme défi à la souveraineté du sujet conscient.",
    keyPoints: `Conscience : présence à soi-même et au monde ; le sujet sait qu'il pense et qu'il existe
Conscience immédiate vs réfléchie : vivre une expérience / se savoir en train de la vivre
Cogito (Descartes) : "Je pense donc je suis" — la conscience est la première certitude
Phénoménologie (Husserl) : toute conscience est conscience de quelque chose (intentionnalité)
L'inconscient (Freud) : partie du psychisme inaccessible à la conscience directe
Structures psychiques (Freud) : ça (pulsions), moi (réalité), surmoi (interdit moral)
Mécanismes de défense : refoulement, déni, projection, sublimation
Preuves de l'inconscient : actes manqués, lapsus, rêves, symptômes névrotiques
Critique de l'inconscient : Sartre (mauvaise foi) — pas d'inconscient, on se ment à soi-même
La psychanalyse comme "blessure narcissique" : après Copernic et Darwin, Freud dépossède l'homme de sa souveraineté sur lui-même`,
    content: `<h2>La Conscience et l'Inconscient</h2>
<h3>I. La conscience</h3>
<p>La conscience est ce qui nous rend présents à nous-mêmes et au monde. On distingue :</p>
<ul>
  <li><strong>Conscience immédiate (perception) :</strong> je vois, j'entends, je ressens quelque chose</li>
  <li><strong>Conscience réfléchie :</strong> je sais que je pense, je me prends moi-même pour objet</li>
  <li><strong>Conscience morale :</strong> je juge mes actes (bien/mal)</li>
</ul>
<p>Descartes : le cogito ("je pense donc je suis") est la première certitude indubitable — même si je doute, je pense, donc j'existe en tant que chose pensante.</p>
<p>Husserl (phénoménologie) : la conscience est toujours <strong>intentionnelle</strong> — elle est toujours conscience de quelque chose. Il n'y a pas de conscience vide ou pure.</p>
<h3>II. La découverte freudienne de l'inconscient</h3>
<p>Freud postule que le psychisme comprend trois instances :</p>
<ul>
  <li><strong>Le Ça :</strong> réservoir des pulsions (Éros, Thanatos) refoulées dans l'inconscient</li>
  <li><strong>Le Moi :</strong> instance de la réalité, médiateur entre le Ça et le Surmoi</li>
  <li><strong>Le Surmoi :</strong> intériorisation des interdits moraux et sociaux</li>
</ul>
<p>Les preuves de l'inconscient : les <strong>rêves</strong> (voie royale vers l'inconscient), les <strong>actes manqués</strong> (lapsus, oublis révélateurs), les <strong>symptômes névrotiques</strong> (angoisses, phobies sans cause consciente).</p>
<h3>III. L'inconscient remet-il en cause la liberté ?</h3>
<p><strong>Sartre (critique) :</strong> L'inconscient freudien est une fiction. L'homme se ment à lui-même ("mauvaise foi") en attribuant ses conduites à un inconscient pour fuir sa responsabilité. Pour Sartre, la conscience est toujours là — mais elle peut se voiler à elle-même.</p>
<p>Freud transforme l'image de l'homme : après Copernic (la Terre n'est pas le centre) et Darwin (l'homme descend du singe), Freud montre que le moi n'est pas maître en sa propre maison — "troisième blessure narcissique".</p>`,
    examples: `<p><strong>Exemple 1 :</strong> Rêver de chutes, d'examens manqués, de personnes disparues. Pour Freud, ces images oniriques sont la réalisation déguisée de désirs inconscients refoulés pendant le jour.</p>
<p><strong>Exemple 2 :</strong> Lapsus politique : un ministre déclare "nous avons décidé de corrompre..." au lieu de "corriger" la situation. Le lapsus révèle une pensée inconsciente que la censure consciente avait voulu taire.</p>`,
  },
  {
    order: 19, series: "ALL",
    title: "Leçon 17 : Le temps et la temporalité",
    duration: 50, isPremium: false,
    summary: "Analyser les différentes dimensions du temps : temps physique (objectif), temps vécu (subjectif), mémoire, durée et rapport à la mort.",
    keyPoints: `Temps objectif : mesurable, linéaire, divisible en passé, présent, futur (Newton)
Temps subjectif (vécu) : la durée telle qu'on la ressent — peut paraître longue ou courte
Bergson : la durée (durée pure) est la forme de la conscience — distincte du temps spatial mesuré par l'horloge
Augustin : "Qu'est-ce que le temps ? Si personne ne me le demande, je le sais. Si quelqu'un me le demande, je ne le sais plus."
Passé, présent, futur : le présent seul est réel, mais passé et futur existent dans la conscience (mémoire / anticipation)
Mémoire (Bergson, Proust) : la mémoire involontaire ressuscite le passé vivant
Heidegger : l'être-vers-la-mort — l'homme est fondamentalement un être temporel et mortel
L'angoisse de la mort et la question du sens de la vie (Camus, Heidegger, Sartre)
Temps et liberté : prendre conscience de sa finitude pour mieux habiter le présent`,
    content: `<h2>Le Temps et la Temporalité</h2>
<h3>I. Le temps objectif</h3>
<p>Newton conçoit le temps comme un cadre absolu, uniforme et indépendant des événements : "Le temps absolu, vrai et mathématique, coule uniformément sans relation avec rien d'extérieur." Il est mesurable par l'horloge et identique pour tous les observateurs.</p>
<p>Einstein relativise ce temps absolu : le temps s'écoule différemment selon la vitesse et la gravité (dilatation du temps dans la relativité restreinte et générale).</p>
<h3>II. Le temps vécu (durée)</h3>
<p>Bergson distingue le <strong>temps spatializé</strong> (mesuré par l'horloge, divisé en instants égaux) de la <strong>durée pure</strong> (le temps tel qu'il est vécu intérieurement, continu, qualitativement variable).</p>
<p>Exemple : une heure d'ennui dure "plus longtemps" qu'une heure de plaisir intense — subjectivement.</p>
<h3>III. Passé, présent, futur</h3>
<p>Augustin : "Le présent du passé, c'est la mémoire. Le présent du présent, c'est la vision. Le présent du futur, c'est l'attente." Les trois dimensions temporelles coexistent dans la conscience.</p>
<p>Proust (À la recherche du temps perdu) : la mémoire involontaire (la madeleine) ressuscite le passé tel qu'il a été vécu, dans sa fraîcheur originelle — au-delà du souvenir volontaire.</p>
<h3>IV. La finitude et le sens de la vie</h3>
<p>Heidegger : l'homme est un "être-vers-la-mort" (Sein-zum-Tode). La mort n'est pas un événement futur parmi d'autres — elle est la possibilité la plus propre, la plus certaine et la plus indépassable. Prendre conscience de sa finitude est la condition d'une existence authentique.</p>
<p>Camus : face à l'absurde (l'homme cherche du sens dans un univers qui n'en a pas), il faut "se révolter, vivre et créer" — habiter pleinement le présent malgré la mort.</p>`,
    examples: `<p><strong>Exemple 1 :</strong> "La madeleine de Proust" : en trempant une madeleine dans du thé, le narrateur voit resurgi tout un monde passé (Combray) — la mémoire involontaire ressuscite le temps perdu.</p>
<p><strong>Exemple 2 :</strong> Épictète (stoïcien) : sachant qu'il va mourir, Socrate reste serein et philosophe jusqu'au bout. La conscience de la mort lui permet d'habiter pleinement le présent, sans s'attacher vainement aux biens temporels.</p>`,
  },
  // ─── Thème 6 : Technique, art, religion ────────────────────────────────────
  {
    order: 20, series: "ALL",
    title: "Leçon 18 : Le travail et la technique",
    duration: 50, isPremium: false,
    summary: "Analyser les dimensions philosophiques du travail (transformation de soi et de la nature) et de la technique (pouvoir et risque), et leurs relations à la liberté humaine.",
    keyPoints: `Travail : activité par laquelle l'homme transforme la nature pour satisfaire ses besoins
Hegel : le travail forme la conscience — la dialectique maître/esclave (l'esclave se réalise dans le travail)
Marx : le travail est l'essence de l'homme, mais le capitalisme le transforme en aliénation
Technique : ensemble des moyens et des procédés pour transformer la réalité selon un but humain
Aristote : distinction poiesis (fabrication) / praxis (action) — la technique est au service de fins
Heidegger : la technique moderne impose un "arraisonnement" (Gestell) de la nature — tout devient ressource exploitable
Risques de la technique : armes de destruction massive, pollution, déshumanisation
Ellul (La Technique) : la technique est devenue autonome et impose ses propres logiques à l'homme
Le travail donne sens à l'existence (vs le loisir) ; valeur émancipatrice vs aliénante du travail`,
    content: `<h2>Le Travail et la Technique</h2>
<h3>I. Le travail : définition et fonctions</h3>
<p>Le travail est l'activité par laquelle l'homme transforme la nature pour satisfaire ses besoins. Il se distingue de l'activité animale par son caractère <strong>intentionnel, planifié et transformateur</strong>.</p>
<p>Marx : "Ce qui distingue le plus mauvais architecte de l'abeille la plus experte, c'est qu'il a construit la cellule dans sa tête avant de la construire dans la ruche."</p>
<h3>II. Hegel et la dialectique maître/esclave</h3>
<p>Dans la <em>Phénoménologie de l'Esprit</em>, le combat pour la reconnaissance produit un maître et un esclave. Paradoxalement, c'est <strong>l'esclave</strong> qui se réalise dans le travail : il transforme le monde, donc lui-même. Le maître, ne travaillant pas, reste dépendant.</p>
<h3>III. Marx : aliénation par le travail</h3>
<p>Dans le capitalisme, le travailleur est séparé du produit de son travail, de l'acte de production, de son essence humaine et de ses semblables. Le travail qui devrait être libérateur devient une source d'aliénation.</p>
<h3>IV. La technique</h3>
<p><strong>Aristote :</strong> La technique (technê) imite et prolonge la nature pour réaliser les fins humaines. Elle est au service de l'homme.</p>
<p><strong>Heidegger :</strong> La technique moderne est fondamentalement différente — elle ne se contente pas d'utiliser la nature, elle la somme d'être une réserve d'énergie exploitable (<strong>Gestell</strong> = "arraisonnement" ou "dispositif"). Cette logique envahit tous les domaines, y compris l'humain.</p>
<p><strong>Ellul :</strong> La technique est devenue autonome — elle crée ses propres besoins, impose ses rythmes, échappe à la maîtrise humaine.</p>`,
    examples: `<p><strong>Exemple 1 :</strong> Le taylorisme (travail à la chaîne) illustre l'aliénation marxiste : l'ouvrier répète un geste simple, perd le sens de l'ensemble du processus et du produit fini. Il est réduit à un rouage de la machine productive.</p>
<p><strong>Exemple 2 :</strong> L'IA générative (ChatGPT, etc.) pose la question heideggérienne : la technique "arraisonne" désormais la créativité et l'intelligence elle-même. L'humain est-il encore au contrôle ?</p>`,
  },
  {
    order: 21, series: "ALL",
    title: "Leçon 19 : L'art et la création esthétique",
    duration: 50, isPremium: false,
    summary: "Explorer les questions de l'art : qu'est-ce qu'une œuvre d'art ? Quelle est la relation entre art, beauté, technique et expression ? Qu'est-ce que le génie créateur ?",
    keyPoints: `Esthétique : philosophie de l'art et du beau (Baumgarten, Kant)
Mimèsis (Platon) : l'art est imitation de la réalité (copie de copie → éloigne de la vérité)
Kant : le beau est ce qui plaît universellement sans concept (jugement de goût)
Hegel : l'art est une forme d'expression de l'Esprit absolu (histoire de l'art = histoire de l'Esprit)
Art et technique : l'art ≠ simple habileté technique (artisanat) ; il exprime quelque chose d'unique
Le génie (Kant) : talent naturel qui crée des règles nouvelles, inimitables
L'œuvre d'art : objet matériel doté d'une signification symbolique irréductible
Heidegger : l'œuvre d'art "ouvre un monde" — elle révèle la vérité d'une façon que le discours ne peut pas
L'art africain, les masques, la sculpture : richesse symbolique et rituelle`,
    content: `<h2>L'Art et la Création Esthétique</h2>
<h3>I. Qu'est-ce que l'art ?</h3>
<p>L'art désigne les productions humaines à visée esthétique (beaux-arts) mais aussi, au sens large, toute forme de maîtrise technique (artisanat, art culinaire). La philosophie s'interroge sur ce qui distingue l'art de la simple technique.</p>
<p><strong>Platon</strong> se méfie de l'art : la peinture d'un lit est la copie d'un lit, qui est lui-même la copie de l'Idée de lit. L'art est donc "copie de copie" — il éloigne de la vérité et peut agiter les passions dangereuses.</p>
<h3>II. L'expérience esthétique</h3>
<p><strong>Kant :</strong> Le jugement de goût ("c'est beau") prétend à l'universalité sans pouvoir le démontrer par un concept. La beauté plaît universellement mais sans concept — c'est une "finalité sans fin". Le sublime, lui, nous confronte à ce qui dépasse nos facultés (mer déchaînée, montagne).</p>
<p><strong>Hegel :</strong> L'art est une forme de manifestation de l'Esprit absolu, au même titre que la religion et la philosophie. L'histoire de l'art est l'histoire de l'Esprit se déployant dans des formes sensibles.</p>
<h3>III. Le génie créateur</h3>
<p><strong>Kant :</strong> Le génie est "le talent (don naturel) qui donne ses règles à l'art." L'artiste de génie ne suit pas des règles préétablies — il crée de nouvelles règles, inimitables. Exemple : Mozart, Picasso.</p>
<h3>IV. L'art comme révélation (Heidegger)</h3>
<p>L'œuvre d'art n'est pas un objet beau parmi d'autres — elle "met en œuvre la vérité" (Heidegger). Elle révèle un monde : les chaussures de Van Gogh font apparaître la pénibilité de la vie paysanne mieux qu'aucun discours.</p>
<h3>V. L'art africain</h3>
<p>Les masques, sculptures et textiles africains (kente ghanéen, masques baoulé ou sénoufo) ne sont pas séparables de leurs fonctions rituelles et communautaires. Lévi-Strauss et d'autres ont montré leur égale complexité symbolique avec les arts "occidentaux".</p>`,
    examples: `<p><strong>Exemple 1 :</strong> La Joconde de Léonard de Vinci : technique (sfumato, perspective) au service d'une expression irréductible à la technique. La reproduction la plus parfaite ne remplace pas l'original — valeur de l'"aura" (Benjamin).</p>
<p><strong>Exemple 2 :</strong> Le masque Dan (Côte d'Ivoire) : objet rituel chargé d'une puissance symbolique et spirituelle liée aux ancêtres. Exposé dans un musée occidental, il perd cette dimension rituelle — le contexte change son sens.</p>`,
  },
  {
    order: 22, series: "ALL",
    title: "Leçon 20 : La religion et le questionnement sur la foi",
    duration: 55, isPremium: false,
    summary: "Analyser le phénomène religieux, les relations entre foi et raison, les critiques de la religion et sa place dans les sociétés contemporaines.",
    keyPoints: `Religion : ensemble de croyances, pratiques et institutions qui relient l'homme au sacré
Sacré vs profane (Durkheim) : division fondamentale du monde en deux sphères
Foi : adhésion à des croyances sans preuve rationnelle (fides ≠ scientia)
Raison vs foi : opposition classique — peuvent-ils coexister ? (Thomas d'Aquin : harmonie ; Kierkegaard : saut dans l'absurde)
Preuves de l'existence de Dieu : argument ontologique (Anselme), cosmologique, téléologique — et leurs critiques (Kant, Hume)
Critique de la religion : Marx ("opium du peuple"), Nietzsche ("mort de Dieu"), Freud (illusion et projection)
Laïcité : séparation de l'Église et de l'État, neutralité religieuse de l'espace public
Pluralisme religieux et tolérance (Locke, Voltaire)
Religion et sens de l'existence : réponse au questionnement sur la mort, la finitude, le mal`,
    content: `<h2>La Religion et la Foi</h2>
<h3>I. Qu'est-ce que la religion ?</h3>
<p>Durkheim définit la religion comme "un système solidaire de croyances et de pratiques relatives à des choses sacrées, c'est-à-dire séparées, interdites." Il insiste sur la dimension <strong>collective</strong> de la religion (l'Église, la communauté des croyants).</p>
<p>Le sacré se distingue du profane : certains objets, lieux, temps et actes sont mis à part, chargés d'une puissance particulière.</p>
<h3>II. Foi et raison</h3>
<p><strong>Thomas d'Aquin :</strong> foi et raison ne s'opposent pas — elles ont des domaines distincts mais complémentaires. La raison peut démontrer certaines vérités religieuses (existence de Dieu par les "voies"), mais la foi révèle des vérités inaccessibles à la raison (Trinité, Incarnation).</p>
<p><strong>Kierkegaard :</strong> La foi est un "saut dans l'absurde" — elle dépasse et transgresse les catégories rationnelles. Abraham obéit à Dieu en acceptant de sacrifier Isaac, contre toute éthique rationnelle.</p>
<h3>III. Les "preuves" de l'existence de Dieu</h3>
<ul>
  <li><strong>Argument ontologique (Anselme) :</strong> Dieu est "l'être dont on ne peut rien concevoir de plus grand" → son existence est nécessaire. Kant critique : l'existence n'est pas un prédicat logique.</li>
  <li><strong>Argument cosmologique :</strong> tout ce qui existe a une cause → il doit exister une cause première (Dieu).</li>
  <li><strong>Argument téléologique :</strong> l'ordre du monde suppose un concepteur intelligent. Hume objecte : l'ordre peut résulter du hasard.</li>
</ul>
<h3>IV. Les critiques de la religion</h3>
<ul>
  <li><strong>Marx :</strong> La religion est "l'opium du peuple" — elle console des misères terrestres et détourne des luttes sociales en promettant un au-delà.</li>
  <li><strong>Nietzsche :</strong> "Dieu est mort" — la modernité a tué la croyance en Dieu. Il faut créer de nouvelles valeurs.</li>
  <li><strong>Freud :</strong> La religion est une illusion — projection du désir d'un père protecteur sur l'univers (Totem et Tabou, L'Avenir d'une illusion).</li>
</ul>
<h3>V. Religion et société contemporaine</h3>
<p>La laïcité (France, Côte d'Ivoire) sépare l'espace public de la religion. Le pluralisme religieux exige la tolérance (Locke, Voltaire). Les fondamentalismes posent le problème de la coexistence entre foi, liberté et droits humains.</p>`,
    examples: `<p><strong>Exemple 1 :</strong> En Côte d'Ivoire, coexistent Islam, Christianisme et religions traditionnelles africaines (animisme, culte des ancêtres). Cette diversité illustre le pluralisme religieux et l'enjeu de la tolérance dans une société laïque.</p>
<p><strong>Exemple 2 (Marx) :</strong> Au XIXe siècle, la misère ouvrière était compensée par la promesse du paradis ("les derniers seront les premiers"). Pour Marx, cela empêchait la prise de conscience révolutionnaire — d'où la critique de la religion comme instrument idéologique.</p>`,
  },
];

const philoExercises = [
  // Leçon 1 : Dissertation
  { lo: 3, q: "La première étape d'une dissertation philosophique consiste à :", t: "mcq", d: "easy", o: ["Rédiger la conclusion", "Analyser le sujet et dégager une problématique", "Choisir un plan thématique ou dialectique sans lire le sujet", "Citer le plus de philosophes possible"], a: "Analyser le sujet et dégager une problématique", e: "Avant de construire un plan ou de rédiger, il faut comprendre précisément ce que le sujet demande : analyser les termes clés, repérer les présupposés et formuler la problématique — la question philosophique centrale qui révèle la tension dans le sujet." },
  { lo: 3, q: "Le plan dialectique d'une dissertation suit toujours la structure : thèse / antithèse / synthèse.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "Le plan dialectique est l'un des plans classiques de la dissertation philosophique : on part d'une thèse (position A), on la met en crise avec une antithèse (position opposée B), puis on dépasse la contradiction dans une synthèse qui intègre ce qu'il y avait de juste dans les deux positions." },
  { lo: 3, q: "Qu'est-ce que la problématique dans une dissertation philosophique ?", t: "mcq", d: "medium", o: ["Le titre du devoir", "La liste des arguments utilisés", "La question philosophique centrale qui révèle la tension dans le sujet", "La conclusion du devoir"], a: "La question philosophique centrale qui révèle la tension dans le sujet", e: "La problématique est la question fondamentale que pose le sujet et qui montre qu'il y a un vrai problème — une tension entre deux positions apparemment légitimes. Elle guide toute la réflexion. Sans problématique, la dissertation n'est qu'un exposé, pas une réflexion philosophique." },

  // Leçon 2 : Commentaire de texte
  { lo: 4, q: "Dans un commentaire de texte philosophique, la paraphrase (redire le texte autrement sans expliquer) est :", t: "mcq", d: "easy", o: ["Recommandée pour montrer qu'on a compris", "Une erreur à éviter", "Obligatoire en introduction", "Suffisante si on cite bien le texte"], a: "Une erreur à éviter", e: "La paraphrase n'analyse pas — elle se contente de répéter autrement ce que dit le texte. Le commentaire exige d'expliquer pourquoi l'auteur dit ce qu'il dit, quels arguments il emploie, quelle est la portée de sa thèse." },
  { lo: 4, q: "Le commentaire de texte philosophique autorise l'élève à exposer librement ses opinions personnelles sur le sujet.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Faux", e: "Le commentaire demande de partir du texte et de rester fidèle à la pensée de l'auteur. On ne projette pas ses opinions personnelles. On peut éventuellement évaluer la portée ou les limites de la thèse, mais toujours en s'appuyant sur le texte, pas sur ses propres opinions non justifiées." },
  { lo: 4, q: "Identifier la thèse d'un texte philosophique, c'est :", t: "mcq", d: "easy", o: ["Recopier la première phrase du texte", "Trouver la position centrale que l'auteur défend dans le texte", "Énumérer tous les exemples du texte", "Résumer le texte en quelques mots"], a: "Trouver la position centrale que l'auteur défend dans le texte", e: "La thèse est l'idée principale que l'auteur cherche à démontrer ou à défendre dans le texte. Elle répond à la question : 'Que veut dire et prouver l'auteur ?' Tout le reste (arguments, exemples, concessions) sert à soutenir cette thèse centrale." },

  // Leçon 3 : Connaissance
  { lo: 5, q: "Pour Kant, la chose en soi (noumène) est :", t: "mcq", d: "medium", o: ["Directement accessible par les sens", "Inaccessible à la connaissance humaine", "Identique au phénomène", "Connue grâce aux mathématiques"], a: "Inaccessible à la connaissance humaine", e: "Kant distingue le phénomène (la réalité telle qu'elle nous apparaît, structurée par notre sensibilité et notre raison) du noumène (la chose en soi — Ding an sich). Le noumène est inaccessible : nous ne connaissons jamais le monde 'en lui-même', toujours à travers le filtre de nos facultés de connaître." },
  { lo: 5, q: "L'empirisme soutient que toute connaissance provient de l'expérience sensorielle.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "C'est la thèse centrale de l'empirisme (Locke, Hume, Berkeley) : l'esprit est une 'table rase' (tabula rasa) à la naissance ; toute idée et toute connaissance proviennent de l'expérience sensible. Cela s'oppose au rationalisme qui admet des idées innées ou des vérités a priori indépendantes de l'expérience." },
  { lo: 5, q: "La formule 'Je pense donc je suis' (cogito ergo sum) appartient à :", t: "mcq", d: "easy", o: ["Platon", "Aristote", "René Descartes", "Emmanuel Kant"], a: "René Descartes", e: "C'est la première certitude indubitable de Descartes, obtenue après le doute méthodique (douter de tout ce dont on peut douter). Même si un 'malin génie' me trompait sur tout, je ne peux pas douter que je pense — et si je pense, j'existe. Le cogito est le fondement de toute sa philosophie." },

  // Leçon 4 : Vérité
  { lo: 6, q: "Selon Karl Popper, un énoncé est scientifique s'il est :", t: "mcq", d: "medium", o: ["Vrai dans tous les cas possibles", "Réfutable (falsifiable) en principe", "Approuvé par la majorité des scientifiques", "Basé uniquement sur l'expérience"], a: "Réfutable (falsifiable) en principe", e: "Pour Popper, le critère de démarcation entre science et pseudo-science est la réfutabilité : une théorie est scientifique si et seulement si on peut concevoir une observation qui pourrait la falsifier. L'astrologie ou la psychanalyse peuvent expliquer tout et son contraire → ne sont pas scientifiques." },
  { lo: 6, q: "Le relativisme absolu est une position logiquement cohérente.", t: "true_false", d: "medium", o: ["Vrai", "Faux"], a: "Faux", e: "Le relativisme absolu (tout est relatif, il n'y a aucune vérité universelle) se contredit lui-même : si tout est relatif, alors l'affirmation 'tout est relatif' est elle-même relative et peut être vraie pour certains et fausse pour d'autres. C'est le 'paradoxe du relativisme' ou autoréfutation du relativisme." },
  { lo: 6, q: "Pour Marx, l'idéologie est :", t: "mcq", d: "medium", o: ["Un ensemble de valeurs universelles", "Une représentation déformée de la réalité qui sert les intérêts de la classe dominante", "La science de la société", "La religion du prolétariat"], a: "Une représentation déformée de la réalité qui sert les intérêts de la classe dominante", e: "Pour Marx, les idées dominantes d'une époque sont les idées de la classe dominante. L'idéologie présente les intérêts particuliers de la bourgeoisie comme des intérêts universels ('c'est naturel', 'c'est inévitable'). Elle est un obstacle à la connaissance vraie de la réalité sociale et à la prise de conscience révolutionnaire." },

  // Leçon 5 : Raison
  { lo: 7, q: "La formule 'Le cœur a ses raisons que la raison ne connaît point' est de :", t: "mcq", d: "easy", o: ["Descartes", "Kant", "Pascal", "Spinoza"], a: "Pascal", e: "C'est une citation célèbre de Blaise Pascal (Pensées). Elle signifie qu'il existe une connaissance par le cœur (foi, intuition, sentiment) qui ne se réduit pas à la démonstration rationnelle. Pascal oppose ainsi la 'raison discursive' à l''ordre du cœur' — forme de connaissance immédiate et affective irréductible à la logique." },
  { lo: 7, q: "Pour Freud, l'inconscient prouve que l'homme est entièrement maître de ses pensées et actions.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Faux", e: "C'est précisément le contraire. Pour Freud, l'hypothèse de l'inconscient montre que le moi n'est 'pas maître dans sa propre maison' — des forces inconscientes (pulsions refoulées, désirs inavouables) orientent nos comportements, nos rêves et nos actes manqués à notre insu. C'est la 'troisième blessure narcissique' infligée à l'homme." },
  { lo: 7, q: "La raison instrumentale, critiquée par Horkheimer et Adorno, désigne :", t: "mcq", d: "medium", o: ["La raison qui questionne les fins et les valeurs", "La raison réduite au calcul des moyens efficaces, sans questionner les fins", "La raison qui guide la morale chez Kant", "La raison divine accessible à l'homme"], a: "La raison réduite au calcul des moyens efficaces, sans questionner les fins", e: "La raison instrumentale (ou technique) se demande seulement 'comment faire ?' (efficacité) sans jamais se demander 'pourquoi faire ?' (sens, valeur). Horkheimer et Adorno montrent dans la Dialectique de la Raison que cette raison appauvrie a rendu possible la barbarie technologique du XXe siècle (Shoah, bombes)." },

  // Leçon 6 : Science
  { lo: 8, q: "Thomas Kuhn désigne par 'révolution scientifique' :", t: "mcq", d: "medium", o: ["La simple accumulation de nouvelles découvertes dans un domaine", "Le remplacement d'un paradigme par un nouveau paradigme incompatible", "La diffusion des théories scientifiques dans le grand public", "Le passage de l'alchimie à la chimie moderne"], a: "Le remplacement d'un paradigme par un nouveau paradigme incompatible", e: "Pour Kuhn, la science ne progresse pas linéairement par accumulation. Elle connaît des ruptures (révolutions) où le cadre théorique dominant (paradigme) est abandonné au profit d'un autre radicalement différent. Exemple : le passage de l'astronomie géocentrique (Ptolémée) à l'héliocentrique (Copernic, Galilée)." },
  { lo: 8, q: "Le scientisme est la position selon laquelle la science peut répondre à toutes les questions humaines.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "Le scientisme est bien la croyance que la méthode scientifique peut résoudre tous les problèmes humains, y compris les questions de sens, de valeur et de morale. C'est une attitude critiquée par de nombreux philosophes (Weber, Husserl, Heidegger) qui montrent que la science ne peut pas répondre aux questions existentielles ('Pourquoi vivre ? Qu'est-ce qui est juste ?')." },
  { lo: 8, q: "La méthode expérimentale (Claude Bernard) commence par :", t: "mcq", d: "easy", o: ["Formuler une hypothèse sans observer", "L'observation d'un phénomène naturel", "Tirer une conclusion définitive", "Publier les résultats"], a: "L'observation d'un phénomène naturel", e: "La méthode de Claude Bernard suit : observation → hypothèse → expérimentation → résultats → conclusion. On commence donc par observer un fait qui pose un problème ou suscite une question. C'est de cette observation que naît l'hypothèse à tester expérimentalement." },

  // Leçon 7 : Liberté
  { lo: 9, q: "Sartre affirme que 'l'homme est condamné à être libre'. Cela signifie que :", t: "mcq", d: "medium", o: ["La liberté est un choix qu'on peut refuser", "L'homme est toujours libre de choisir, même dans les situations les plus contraignantes", "L'homme souffre de trop de liberté et devrait accepter des contraintes", "La liberté n'existe que dans les sociétés démocratiques"], a: "L'homme est toujours libre de choisir, même dans les situations les plus contraignantes", e: "Pour Sartre, l'existence précède l'essence : l'homme n'a pas de nature fixe, il se définit par ses choix. Cette liberté est radicale et totale — on ne peut pas la fuir (c'est une 'condamnation'). Même le refus de choisir est un choix. Cette liberté absolue s'accompagne d'une responsabilité totale (angoisse)." },
  { lo: 9, q: "Pour Spinoza, le sentiment de liberté humaine est une illusion produite par l'ignorance de nos causes.", t: "true_false", d: "medium", o: ["Vrai", "Faux"], a: "Vrai", e: "Spinoza est un déterministe radical : 'Les hommes se croient libres parce qu'ils ont conscience de leurs désirs et de leurs appétits, sans penser aux causes qui les déterminent' (Éthique). Tout est déterminé par la nature (ou Dieu). La liberté n'est pas l'absence de déterminisme mais la compréhension de ces déterminismes." },
  { lo: 9, q: "La liberté négative (Isaiah Berlin) désigne :", t: "mcq", d: "medium", o: ["La liberté de faire ce qu'on veut sans aucune contrainte", "L'absence d'interférence ou d'obstacles extérieurs (liberté 'de')", "La capacité réelle de se réaliser et d'agir (liberté 'pour')", "La liberté politique des citoyens dans une démocratie"], a: "L'absence d'interférence ou d'obstacles extérieurs (liberté 'de')", e: "Berlin distingue deux concepts : liberté négative (absence d'obstacles, d'interférences extérieures — 'liberté de faire X sans être empêché') et liberté positive (capacité réelle d'agir, de se gouverner soi-même — 'liberté pour se réaliser'). Les libéraux classiques mettent l'accent sur la liberté négative ; les socialistes sur la liberté positive." },

  // Leçon 8 : Devoir moral
  { lo: 10, q: "L'impératif catégorique de Kant est une règle morale qui s'applique :", t: "mcq", d: "easy", o: ["Seulement dans certaines situations d'urgence", "Seulement aux chrétiens", "Inconditionnellement, à tous et en toutes circonstances", "Seulement si cela maximise le bonheur collectif"], a: "Inconditionnellement, à tous et en toutes circonstances", e: "L'impératif catégorique s'impose sans conditions ('Agis seulement selon la maxime qui peut être universalisée'). Kant l'oppose à l'impératif hypothétique ('Si tu veux atteindre tel but, fais ceci') qui est conditionnel. Le devoir moral est absolu, pas relatif aux circonstances ou aux conséquences." },
  { lo: 10, q: "L'utilitarisme évalue la valeur morale d'un acte selon ses conséquences sur le bonheur collectif.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "C'est la définition même de l'utilitarisme (Bentham, Mill) : est moral ce qui produit le plus grand bonheur pour le plus grand nombre. La morale se calcule à partir des conséquences (conséquentialisme), pas des intentions ou des principes absolus comme chez Kant. On parle aussi de 'principe d'utilité'." },
  { lo: 10, q: "Hannah Arendt parle de 'banalité du mal' pour désigner :", t: "mcq", d: "medium", o: ["La fréquence des crimes ordinaires dans la société", "Le fait que les crimes les plus graves peuvent être commis par des gens ordinaires par conformisme et absence de pensée", "La théorie selon laquelle le mal est naturel chez l'homme", "L'idée que le mal est banal car tous les hommes y sont exposés"], a: "Le fait que les crimes les plus graves peuvent être commis par des gens ordinaires par conformisme et absence de pensée", e: "Après le procès Eichmann (1961), Arendt conclut que ce bureaucrate nazi n'était pas un monstre sadique, mais un homme ordinaire qui 'ne pensait pas' — il obéissait sans réfléchir aux implications morales de ses actes. La leçon : le mal n'est pas le propre des monstres, mais peut naître de la démission de la pensée." },

  // Leçon 9 : Bonheur
  { lo: 11, q: "L'ataraxie, selon Épicure, désigne :", t: "mcq", d: "medium", o: ["La recherche du plaisir maximal", "La passion pour la sagesse", "La sérénité de l'âme, absence de trouble", "La soumission aux lois de la nature"], a: "La sérénité de l'âme, absence de trouble", e: "L'ataraxie (du grec a-taraxia : sans agitation) est pour Épicure l'état de tranquillité de l'âme que procure la satisfaction des désirs naturels et nécessaires et la maîtrise des désirs vains. Associée à l'aponie (absence de douleur physique), elle constitue le bonheur épicurien." },
  { lo: 11, q: "Rousseau pense que le progrès de la civilisation rend les hommes plus heureux.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Faux", e: "C'est précisément la thèse inverse. Pour Rousseau, 'l'homme naît bon, c'est la société qui le corrompt'. Le progrès de la civilisation (propriété, inégalités, arts et sciences) a éloigné l'homme de son état naturel de bonheur simple. La perfectibilité humaine a produit autant de misères que d'améliorations." },
  { lo: 11, q: "La conception stoïcienne du bonheur (Épictète) insiste sur :", t: "mcq", d: "medium", o: ["La satisfaction de tous ses désirs", "La richesse matérielle comme condition du bonheur", "La maîtrise de ce qui dépend de nous et l'acceptation de ce qui n'en dépend pas", "La recherche du plaisir le plus intense"], a: "La maîtrise de ce qui dépend de nous et l'acceptation de ce qui n'en dépend pas", e: "La clé du stoïcisme est la distinction entre ce qui 'dépend de nous' (nos jugements, désirs, aversions — le monde intérieur) et ce qui 'ne dépend pas de nous' (la maladie, la mort, les autres — le monde extérieur). Le bonheur stoïcien vient de la maîtrise du premier et de l'acceptation sereine du second." },

  // Leçon 10 : Condition humaine
  { lo: 12, q: "Pour Marx, l'aliénation du travailleur dans le capitalisme signifie qu'il est :", t: "mcq", d: "medium", o: ["Physiquement esclave de son patron", "Séparé du produit de son travail, de l'acte de production et de son essence humaine", "Heureux dans son travail mécanique", "Libre de quitter son emploi à tout moment"], a: "Séparé du produit de son travail, de l'acte de production et de son essence humaine", e: "Marx distingue plusieurs dimensions de l'aliénation du travailleur : séparation du produit (qui appartient au capitaliste), de l'acte de production (travail imposé, non créatif), de son essence générique (l'homme est naturellement un être créateur), et de ses semblables (concurrence). Le travail qui devrait être épanouissant devient contrainte." },
  { lo: 12, q: "Pour Hobbes, à l'état de nature, les hommes vivent en paix naturelle.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Faux", e: "Hobbes soutient précisément l'inverse : à l'état de nature, sans État, la vie est 'solitaire, misérable, dangereuse, animale et brève' (bellum omnium contra omnes — guerre de tous contre tous). C'est pour échapper à cette guerre perpétuelle que les hommes concluent le contrat social et cèdent leurs droits à un souverain (le Léviathan)." },
  { lo: 12, q: "Le contrat social chez Rousseau vise à :", t: "mcq", d: "medium", o: ["Renforcer le pouvoir des plus forts", "Concilier la liberté individuelle et la volonté générale", "Imposer la religion à tous les citoyens", "Créer un empire mondial unifié"], a: "Concilier la liberté individuelle et la volonté générale", e: "Rousseau pose le problème du contrat social : 'Trouver une forme d'association qui défende et protège de toute la force commune la personne et les biens de chaque associé, et par laquelle chacun, s'unissant à tous, n'obéisse pourtant qu'à lui-même et reste aussi libre qu'auparavant.' La solution : la volonté générale (l'intérêt commun, distinct de la somme des intérêts particuliers)." },

  // Leçon 11 : État et loi
  { lo: 13, q: "La séparation des pouvoirs (législatif, exécutif, judiciaire) est un principe développé par :", t: "mcq", d: "easy", o: ["Rousseau", "Montesquieu", "Locke", "Hobbes"], a: "Montesquieu", e: "C'est Montesquieu qui développe systématiquement la théorie de la séparation des pouvoirs dans L'Esprit des lois (1748) : 'Pour qu'on ne puisse abuser du pouvoir, il faut que par la disposition des choses le pouvoir arrête le pouvoir.' Cette théorie a inspiré les constitutions modernes (USA 1787, France 1791)." },
  { lo: 13, q: "La légitimité d'un gouvernement est la même chose que sa légalité.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Faux", e: "La légalité et la légitimité sont distinctes. Un pouvoir est légal s'il respecte les lois en vigueur. Il est légitime s'il est reconnu comme juste et valide par ceux qui lui obéissent. Un régime peut être légal mais illégitime (dictature instaurée par des lois) ; ou légitime mais pas encore légal (résistance reconnue a posteriori comme juste)." },
  { lo: 13, q: "La désobéissance civile (Thoreau, Gandhi) se caractérise par :", t: "mcq", d: "medium", o: ["Un refus violent de toutes les lois", "Un refus public, non violent d'une loi jugée injuste, en acceptant les sanctions", "Une révolution armée contre l'État", "Un simple désaccord verbal exprimé en privé"], a: "Un refus public, non violent d'une loi jugée injuste, en acceptant les sanctions", e: "La désobéissance civile (Thoreau, Gandhi, MLK) est caractérisée par : refus d'obéir à une loi injuste, caractère public (pas clandestin), non-violence, et acceptation des sanctions légales (la sanction montre le respect du principe de loi en général et renforce l'exemplarité morale de l'acte)." },

  // Leçon 12 : Justice
  { lo: 14, q: "Le 'voile d'ignorance' de Rawls est une expérience de pensée qui consiste à :", t: "mcq", d: "medium", o: ["Oublier les lois de son pays", "Choisir les règles de sa société sans savoir quelle place on y occupera", "Se mettre à la place des plus pauvres pour comprendre leur souffrance", "Ignorer les inégalités sociales pour mieux les tolérer"], a: "Choisir les règles de sa société sans savoir quelle place on y occupera", e: "Rawls propose d'imaginer que des individus rationnels choisissent les principes de justice derrière un 'voile d'ignorance' : ils ignorent tout de leur position future dans la société (riche/pauvre, homme/femme, intelligent/moins doué). Dans cette situation, ils choisiraient des principes justes car ils ne savent pas si ce sont eux les favorisés ou les défavorisés." },
  { lo: 14, q: "L'équité et l'égalité désignent exactement la même chose.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Faux", e: "L'égalité signifie traiter tout le monde de la même façon (même traitement pour tous). L'équité tient compte des différences de situation pour aboutir à une égalité de résultat. Exemple : donner à un enfant de grande taille et à un enfant de petite taille le même tabouret pour voir par-dessus la clôture (égalité) vs donner un grand tabouret au petit enfant (équité)." },
  { lo: 14, q: "Pour Nozick, une redistribution forcée des richesses (impôts) est :", t: "mcq", d: "medium", o: ["Un devoir moral de justice sociale", "Une violation des droits de propriété des individus", "La condition d'une société juste selon Rawls", "Toujours préférable pour assurer la cohésion sociale"], a: "Une violation des droits de propriété des individus", e: "Nozick (libertarisme, Anarchie, État et Utopie, 1974) s'oppose à Rawls : la justice consiste uniquement à respecter les titres acquis librement (principe d'appropriation, de transfert et de rectification). Forcer quelqu'un à reverser une partie de ses gains (impôts) revient à le contraindre à travailler pour les autres — une forme de travail forcé." },

  // Leçon 13 : Citoyenneté
  { lo: 15, q: "Les droits sociaux (droit au travail, à la santé, à l'éducation) appartiennent à :", t: "mcq", d: "easy", o: ["La première génération des droits", "La deuxième génération des droits", "La troisième génération des droits", "Aucune génération, ils ne sont pas reconnus"], a: "La deuxième génération des droits", e: "La classification en générations : 1ère génération = droits civils et politiques (liberté, vote, expression — XVIIIe-XIXe s.) ; 2ème génération = droits économiques et sociaux (travail, santé, éducation — XXe s., État providence) ; 3ème génération = droits collectifs et de solidarité (environnement, développement, paix — fin XXe s.)." },
  { lo: 15, q: "Être citoyen implique uniquement des droits, sans aucun devoir.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Faux", e: "La citoyenneté implique une réciprocité entre droits et devoirs. Les devoirs du citoyen comprennent : respecter les lois, payer les impôts, participer à la vie démocratique (voter), défendre la communauté. La philosophie politique (Rousseau, Kant) insiste sur le fait que jouir de droits suppose d'accepter les contraintes qui permettent à ces droits d'exister pour tous." },
  { lo: 15, q: "Habermas associe la démocratie délibérative à :", t: "mcq", d: "medium", o: ["Le vote comme seul mécanisme démocratique", "Un espace public de discussion rationnelle entre citoyens", "Le pouvoir d'une élite éclairée", "La révolution comme mode de changement social"], a: "Un espace public de discussion rationnelle entre citoyens", e: "Pour Habermas, la démocratie ne se réduit pas au vote. Elle requiert un espace public où les citoyens débattent librement selon des règles de discussion rationnelle (l'argumentation doit primer sur la force ou le statut social). La légitimité des décisions politiques vient de la qualité du délibération collective, pas seulement de la règle de la majorité." },

  // Leçon 14 : Culture
  { lo: 16, q: "Claude Lévi-Strauss soutient que :", t: "mcq", d: "medium", o: ["Les cultures occidentales sont supérieures aux cultures primitives", "Aucune culture n'est supérieure à une autre, toutes répondent aux mêmes problèmes fondamentaux", "La culture est une dégradation de la nature", "L'homme est avant tout un animal, pas un être culturel"], a: "Aucune culture n'est supérieure à une autre, toutes répondent aux mêmes problèmes fondamentaux", e: "Lévi-Strauss est le principal défenseur du relativisme culturel dans la seconde moitié du XXe siècle. Dans Race et Histoire (1952) et ses études structuralistes des mythes, il montre que les sociétés dites 'primitives' ont des structures symboliques et des systèmes de pensée tout aussi complexes que les sociétés industrielles. L'ethnocentrisme est un biais, pas une réalité." },
  { lo: 16, q: "L'ethnocentrisme est la tendance à juger les autres cultures à l'aune de la sienne propre.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "L'ethnocentrisme consiste à prendre sa propre culture comme référence universelle et à évaluer les autres cultures selon ces critères. C'est un obstacle majeur à la compréhension interculturelle. Il peut aller du simple préjugé ('leurs manières sont étranges') au racisme culturel ou au colonialisme ('notre civilisation est supérieure, nous devons les éduquer')." },
  { lo: 16, q: "Ernst Cassirer définit l'homme comme :", t: "mcq", d: "medium", o: ["Un animal rationnel (animal rationale)", "Un animal symbolique (animal symbolicum)", "Un animal social (zoom politikon)", "Un être naturel sans culture"], a: "Un animal symbolique (animal symbolicum)", e: "Cassirer (Essai sur l'homme) propose de redéfinir l'homme non pas comme 'animal rationnel' (Aristote) mais comme 'animal symbolicum'. L'homme ne réagit pas directement aux stimuli — il crée des symboles (langage, mythe, art, religion, science) qui médiatisent son rapport au monde. C'est la culture, le système symbolique, qui définit proprement l'humain." },

  // Leçon 15 : Langage
  { lo: 17, q: "Selon Saussure, le lien entre le signifiant et le signifié est :", t: "mcq", d: "medium", o: ["Naturel (il existe une ressemblance entre le son et la chose)", "Arbitraire (aucun lien naturel ne justifie que ce son désigne ce concept)", "Universel (identique dans toutes les langues)", "Logique (fondé sur une déduction rationnelle)"], a: "Arbitraire (aucun lien naturel ne justifie que ce son désigne ce concept)", e: "C'est un principe fondamental de la linguistique saussurienne : le signe linguistique unit un signifiant (image acoustique : les sons 'ar-bre') et un signifié (le concept d'arbre) par un lien arbitraire. Il n'y a pas de ressemblance naturelle entre les sons du mot et la chose désignée — la preuve : différentes langues ont des mots différents pour la même réalité." },
  { lo: 17, q: "Wittgenstein affirme que les limites de mon langage sont les limites de mon monde.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "C'est une citation du Tractatus logico-philosophicus (1921) de Ludwig Wittgenstein : 'Die Grenzen meiner Sprache bedeuten die Grenzen meiner Welt.' Ce qu'on ne peut pas dire clairement, on ne peut pas penser clairement non plus. Le langage structure notre capacité à penser et à percevoir le monde — ce qui dépasse le langage demeure indicible et impensable." },
  { lo: 17, q: "Dans 1984 de George Orwell, la 'novlangue' (Newspeak) sert à :", t: "mcq", d: "medium", o: ["Faciliter la communication entre les citoyens", "Réduire le vocabulaire pour rendre la pensée critique impossible", "Promouvoir la poésie et la littérature", "Traduire les lois en langue populaire"], a: "Réduire le vocabulaire pour rendre la pensée critique impossible", e: "Dans le roman d'Orwell, le Parti crée la 'novlangue' dont le but est de rendre impossible l'expression (et donc la pensée) de toute idée subversive. Moins on a de mots pour exprimer la dissidence, moins on peut penser la résistance. Orwell illustre ainsi la dimension politique du langage : contrôler les mots, c'est contrôler les pensées." },

  // Leçon 16 : Conscience
  { lo: 18, q: "Pour Husserl, la conscience est :", t: "mcq", d: "medium", o: ["Une substance indépendante du monde", "Toujours 'conscience de quelque chose' (intentionnalité)", "Un simple épiphénomène du cerveau", "Identique à l'inconscient"], a: "Toujours 'conscience de quelque chose' (intentionnalité)", e: "Le concept d'intentionnalité (de Brentano, repris par Husserl) est au cœur de la phénoménologie : toute conscience est dirigée vers un objet — elle est toujours 'conscience de quelque chose'. Il n'y a pas de conscience vide ou pure. Percevoir, imaginer, se souvenir, vouloir : ce sont toujours des actes orientés vers un objet (réel, imaginaire ou absent)." },
  { lo: 18, q: "Les actes manqués (lapsus, oublis) sont pour Freud des phénomènes révélateurs de l'inconscient.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "Dans Psychopathologie de la vie quotidienne (1901), Freud montre que les actes manqués (lapsus, oublis, maladresses) ne sont pas des hasards mais des manifestations de désirs ou de pensées inconscients qui 'percent' malgré la censure consciente. Ils sont des 'fenêtres' sur l'inconscient." },
  { lo: 18, q: "Sartre s'oppose à Freud sur l'inconscient en affirmant que :", t: "mcq", d: "medium", o: ["L'inconscient n'existe pas et ce qu'on appelle ainsi est la mauvaise foi", "L'inconscient est encore plus profond que Freud ne le croit", "L'inconscient est collectif, pas individuel (Jung a raison)", "La conscience et l'inconscient sont identiques"], a: "L'inconscient n'existe pas et ce qu'on appelle ainsi est la mauvaise foi", e: "Sartre (L'Être et le Néant) rejette l'hypothèse freudienne de l'inconscient. Pour lui, l'homme se ment à lui-même consciemment (mauvaise foi) en fuyant sa liberté et sa responsabilité. On n'est pas déterminé par l'inconscient — on choisit de ne pas se voir tel qu'on est. La 'mauvaise foi' est une forme de mensonge à soi-même." },

  // Leçon 17 : Temps
  { lo: 19, q: "Bergson distingue le temps mesuré par l'horloge du temps tel qu'il est vécu, qu'il appelle :", t: "mcq", d: "easy", o: ["Le temps absolu", "La durée (durée pure)", "Le temps relatif", "L'éternité"], a: "La durée (durée pure)", e: "Bergson distingue le temps spatialisé (quantitatif, mesuré par l'horloge, divisé en instants égaux) de la durée pure (qualitative, hétérogène, continue, telle qu'elle est vécue intérieurement). La durée est irréductible à la mesure spatiale : une heure d'ennui et une heure de bonheur ne sont pas 'la même durée' vécue." },
  { lo: 19, q: "Heidegger définit l'homme comme un 'être-vers-la-mort', ce qui signifie que la mort est :", t: "mcq", d: "medium", o: ["Un accident évitable pour ceux qui font attention", "La possibilité la plus propre, la plus certaine et la plus indépassable de l'existence humaine", "Un phénomène naturel sans portée existentielle", "Une punition divine pour les péchés commis"], a: "La possibilité la plus propre, la plus certaine et la plus indépassable de l'existence humaine", e: "Pour Heidegger (Être et Temps), la mort n'est pas un simple événement futur parmi d'autres. Elle est la structure fondamentale de l'existence : nous sommes des 'êtres-vers-la-mort'. Cette finitude radicale, assumée authentiquement (et non fuie dans le bavardage quotidien), donne à l'existence son sérieux et son intensité." },
  { lo: 19, q: "Saint Augustin affirme que le passé n'existe plus, le futur n'est pas encore — seul le présent existe.", t: "true_false", d: "medium", o: ["Vrai", "Faux"], a: "Vrai", e: "Augustin (Confessions, Livre XI) pose la question 'Qu'est-ce que le temps ?' et répond que le passé et le futur n'ont d'existence que dans l'esprit : 'Le présent du passé, c'est la mémoire ; le présent du présent, c'est la vision directe ; le présent du futur, c'est l'attente.' Seul le présent est réel, mais il existe en trois dimensions dans l'âme." },

  // Leçon 18 : Travail et technique
  { lo: 20, q: "Dans la dialectique du maître et de l'esclave (Hegel), qui se réalise le plus par le travail ?", t: "mcq", d: "medium", o: ["Le maître, car il commande", "L'esclave, car il transforme la nature et se transforme lui-même", "Ni l'un ni l'autre", "Le citoyen libre qui ne travaille pas"], a: "L'esclave, car il transforme la nature et se transforme lui-même", e: "C'est le paradoxe de Hegel : le maître ne travaille pas (il consomme) et reste dépendant de l'esclave pour sa satisfaction. L'esclave, en travaillant, transforme la nature selon sa volonté et se reconnaît dans le produit de son travail — il se réalise et conquiert une forme de liberté. C'est une inspiration directe de la philosophie marxiste du travail." },
  { lo: 20, q: "Heidegger considère que la technique moderne 'arraisonne' la nature en la réduisant à un stock de ressources exploitables.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "C'est la thèse centrale de La Question de la technique (Heidegger) : le Gestell (dispositif, arraisonnement) est l'essence de la technique moderne qui impose à tout ce qui existe de se révéler comme 'Bestand' (stock, réserve disponible). La nature n'est plus un milieu de vie mais un entrepôt d'énergie à exploiter. Cette logique envahit toutes les sphères, y compris l'humain (l'homme devient 'ressource humaine')." },
  { lo: 20, q: "La distinction marxiste entre 'travail aliéné' et 'travail émancipateur' repose sur :", t: "mcq", d: "medium", o: ["Le salaire reçu par le travailleur", "La question de savoir si le travailleur contrôle son activité et son produit ou en est séparé", "La durée du travail effectué", "Le type de marchandises produites"], a: "La question de savoir si le travailleur contrôle son activité et son produit ou en est séparé", e: "Pour Marx, le travail peut être la plus haute expression de l'humanité (transformation créatrice de la nature) ou sa plus grande négation (travail aliéné). L'aliénation est précisément cette séparation : le travailleur ne contrôle ni l'acte de production, ni le produit, ni le sens de son activité. La révolution doit restaurer un travail où l'homme reconnaît son essence dans ce qu'il produit." },

  // Leçon 19 : Art
  { lo: 21, q: "Pour Kant, un jugement de goût ('c'est beau') est :", t: "mcq", d: "medium", o: ["Purement subjectif et sans prétention à l'universalité", "Objectif, vérifiable par des critères mesurables", "Subjectif mais prétend à une validité universelle sans concept", "Identique à un jugement de connaissance scientifique"], a: "Subjectif mais prétend à une validité universelle sans concept", e: "Le génie de Kant est d'avoir montré que le jugement de goût est ni purement subjectif ('moi seul j'aime ça') ni objectivement démontrable ('voici les critères de beauté'). Il est 'subjectivement universel' : il exprime un sentiment de plaisir (subjectif) mais prétend que tout le monde devrait le partager (universel) — sans pouvoir le prouver par un concept." },
  { lo: 21, q: "Platon considère que l'art (mimèsis) est un moyen d'accéder à la vérité.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Faux", e: "Platon se méfie de l'art dans La République : la peinture est une copie d'une copie (imitation de la réalité sensible qui est déjà une copie des Idées). L'art s'éloigne donc de la vérité (les Idées) à deux degrés. De plus, il stimule les passions irrationnelles. Platon propose de bannir les poètes de la cité idéale — à l'exception de ceux qui célèbrent les dieux et les héros." },
  { lo: 21, q: "Heidegger affirme que l'œuvre d'art 'met en œuvre la vérité'. Cela signifie que :", t: "mcq", d: "medium", o: ["L'art représente fidèlement la réalité objective", "L'art révèle un monde de manière que le discours logique ne peut pas", "L'art est un instrument de propagande idéologique", "L'art ne dit rien de vrai car il est fiction"], a: "L'art révèle un monde de manière que le discours logique ne peut pas", e: "Heidegger (L'Origine de l'œuvre d'art) soutient que l'œuvre d'art n'est pas une copie du réel — elle 'ouvre un monde'. Les souliers de paysanne peints par Van Gogh ne sont pas une représentation picturale d'un objet, ils font advenir un monde (la vie paysanne, la terre, la peine) que nul discours ne pourrait épuiser. L'art dit la vérité différemment que la science ou la philosophie." },

  // Leçon 20 : Religion
  { lo: 22, q: "Pour Marx, la religion est 'l'opium du peuple', ce qui signifie qu'elle :", t: "mcq", d: "easy", o: ["Est une drogue dangereuse à interdire", "Console de la misère terrestre et détourne des luttes sociales", "Est un outil d'épanouissement personnel", "Représente la vraie connaissance de la réalité"], a: "Console de la misère terrestre et détourne des luttes sociales", e: "Marx (Introduction à la Critique de la philosophie du droit de Hegel) : 'La religion est le soupir de la créature opprimée, le sentiment d'un monde sans cœur, l'esprit d'une époque sans esprit. Elle est l'opium du peuple.' La religion offre une consolation illusoire (le paradis) qui détourne les classes opprimées de la prise de conscience de leur exploitation et de la lutte pour changer leurs conditions matérielles." },
  { lo: 22, q: "Kierkegaard affirme que la foi est un acte parfaitement rationnel, démontrable par la philosophie.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Faux", e: "Kierkegaard soutient exactement l'inverse : la foi est un 'saut dans l'absurde' qui dépasse et transgresse les catégories rationnelles. L'exemple d'Abraham (prêt à sacrifier son fils par obéissance à Dieu) est incompréhensible du point de vue éthique rationnel. La foi exige de suspendre l'éthique rationnelle — elle n'est pas rationnellement démontrable." },
  { lo: 22, q: "Durkheim définit la religion par la distinction entre :", t: "mcq", d: "medium", o: ["Dieu et les hommes", "Le sacré et le profane", "La foi et la raison", "Le clergé et les laïcs"], a: "Le sacré et le profane", e: "Pour Durkheim (Les Formes élémentaires de la vie religieuse, 1912), la division du monde en sacré (mis à part, interdit, chargé d'une puissance particulière) et profane (ordinaire, quotidien) est la caractéristique universelle de toutes les religions, au-delà de leurs contenus dogmatiques différents. La religion est avant tout un phénomène social qui crée du lien et de la cohésion communautaire." },
];

export async function seedPhiloLessons(): Promise<void> {
  const [{ lessonCount }] = await db
    .select({ lessonCount: count() })
    .from(lessonsTable)
    .where(
      and(
        eq(lessonsTable.subjectId, PHILO_SUBJECT_ID),
        gte(lessonsTable.order, SEED_MARKER_ORDER_START)
      )
    );

  if (lessonCount >= TOTAL_LESSONS) {
    logger.info("Philosophie seed lessons already present — skipping");
    return;
  }

  logger.info("Seeding Philosophie lessons and exercises …");

  for (const lesson of philoLessons) {
    const existing = await db.execute(
      `SELECT id FROM lessons WHERE subject_id = ${PHILO_SUBJECT_ID} AND "order" = ${lesson.order} AND series = 'ALL' LIMIT 1`
    );
    if (existing.rows.length > 0) continue;

    const [inserted] = await db
      .insert(lessonsTable)
      .values({
        subjectId: PHILO_SUBJECT_ID,
        series: lesson.series,
        order: lesson.order,
        title: lesson.title,
        duration: lesson.duration,
        isPremium: lesson.isPremium,
        summary: lesson.summary,
        keyPoints: lesson.keyPoints,
        content: lesson.content,
        examples: lesson.examples,
      })
      .returning({ id: lessonsTable.id });

    const exercises = philoExercises.filter(e => e.lo === lesson.order);
    for (const ex of exercises) {
      await db.insert(exercisesTable).values({
        lessonId: inserted.id,
        subjectId: PHILO_SUBJECT_ID,
        series: "ALL",
        question: ex.q,
        type: ex.t as "mcq" | "true_false" | "open",
        difficulty: ex.d as "easy" | "medium" | "hard",
        options: ex.o,
        correctAnswer: ex.a,
        explanation: ex.e,
        isPremium: false,
      });
    }
  }

  logger.info("Philosophie lessons and exercises seeded successfully");
}
