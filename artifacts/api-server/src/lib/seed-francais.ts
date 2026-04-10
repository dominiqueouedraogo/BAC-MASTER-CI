import { db, lessonsTable, exercisesTable } from "@workspace/db";
import { eq, and, gte, count } from "drizzle-orm";
import { logger } from "./logger";

const FR_SUBJECT_ID = 5;
const SEED_MARKER_ORDER_START = 4;
const TOTAL_LESSONS = 15;

const francaisLessons = [
  // ─── Partie 1 : Lecture et analyse de textes littéraires ──────────────────
  {
    order: 4, series: "ALL",
    title: "Leçon 1 : La lecture méthodique et l'épreuve orale",
    duration: 50, isPremium: false,
    summary: "Maîtriser la lecture méthodique d'un texte littéraire : identifier les niveaux de sens, les procédés d'écriture et préparer une présentation orale structurée.",
    keyPoints: `Lecture méthodique : analyse rigoureuse d'un texte à partir de ses aspects formels et sémantiques
Trois étapes : lecture cursive (sens global) → lecture analytique (procédés) → interprétation (sens profond)
Niveaux de lecture : littéral (ce qui est dit), symbolique (ce que cela signifie), idéologique (valeurs transmises)
Procédés d'écriture : figures de style, type de discours, modes et temps verbaux, structure du texte
L'épreuve orale de français : présenter un texte de façon claire et argumentée en 10-15 minutes
Plan de présentation orale : situer le texte (auteur, œuvre, contexte) → présenter la thèse → analyser les procédés → conclure
Questions de l'examinateur : savoir répondre avec précision et nuance
Vocabulaire de l'analyse littéraire : diégèse, narration, focalisation, registre, tonalité, énonciation`,
    content: `<h2>La Lecture Méthodique et l'Épreuve Orale</h2>
<h3>I. Qu'est-ce que la lecture méthodique ?</h3>
<p>La lecture méthodique consiste à analyser un texte littéraire de façon rigoureuse et systématique, en passant du sens global aux procédés d'écriture, puis à l'interprétation. Elle s'oppose à la lecture impressionniste ("j'aime ce texte parce qu'il est beau").</p>
<p>Les trois temps de la lecture méthodique :</p>
<ol>
  <li><strong>Lecture cursive :</strong> comprendre le sens général, le contexte, le genre, le registre</li>
  <li><strong>Lecture analytique :</strong> repérer les procédés d'écriture (figures de style, structure, temps verbaux, types de discours)</li>
  <li><strong>Interprétation :</strong> dégager le sens profond, les valeurs, la portée du texte</li>
</ol>
<h3>II. Les niveaux de lecture</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Niveau</th><th>Question</th><th>Exemple</th></tr>
  <tr><td>Littéral</td><td>Que dit le texte ?</td><td>Une description d'une vieille maison à l'abandon</td></tr>
  <tr><td>Symbolique</td><td>Que signifie-t-il ?</td><td>La maison symbolise la mémoire ou la vieillesse</td></tr>
  <tr><td>Idéologique</td><td>Quelles valeurs transmet-il ?</td><td>Nostalgie du passé, critique de la modernité</td></tr>
</table>
<h3>III. Préparer l'épreuve orale</h3>
<p>L'épreuve orale de français au BAC demande de <strong>présenter un texte étudié</strong> puis de <strong>répondre aux questions de l'examinateur</strong>.</p>
<p><strong>Structure de la présentation :</strong></p>
<ol>
  <li><strong>Situer le texte :</strong> auteur, œuvre, époque, contexte biographique ou historique</li>
  <li><strong>Présenter la thèse :</strong> quelle est l'idée centrale du texte ? De quoi parle-t-il vraiment ?</li>
  <li><strong>Analyser les procédés :</strong> comment l'auteur dit-il ce qu'il dit ? (figures de style, ton, structure…)</li>
  <li><strong>Interpréter :</strong> quel est le sens profond ? Quel effet produit le texte sur le lecteur ?</li>
  <li><strong>Conclure :</strong> bilan de l'analyse, ouverture (rapprochement avec un autre texte ou une thématique)</li>
</ol>
<h3>IV. Vocabulaire de l'analyse littéraire</h3>
<ul>
  <li><strong>Registre (ou tonalité) :</strong> lyrique, comique, tragique, épique, fantastique, polémique…</li>
  <li><strong>Focalisation :</strong> interne (narrateur = personnage), externe (narrateur observateur), omnisciente</li>
  <li><strong>Énonciation :</strong> qui parle, à qui, dans quel cadre (narration, dialogue, discours direct/indirect)</li>
  <li><strong>Diégèse :</strong> l'univers fictionnel du récit</li>
</ul>`,
    examples: `<p><strong>Exemple de présentation orale :</strong><br>
Texte : extrait de <em>L'Enfant noir</em> de Camara Laye.<br>
1. Situer : Roman autobiographique de Camara Laye (Guinéen, 1953), évoque son enfance en Afrique de l'Ouest.<br>
2. Thèse : Ce passage décrit avec nostalgie et tendresse le souvenir de la forge paternelle et du génie protecteur du père.<br>
3. Procédés : imparfait de durée (habitude), champ lexical de la lumière et du feu, personnification du serpent noir, discours indirect libre.<br>
4. Sens : L'enfant cherche à préserver la mémoire d'un monde traditionnel menacé par la modernité coloniale.<br>
5. Ouverture : rapprocher avec <em>Une si longue lettre</em> de Mariama Bâ (nostalgie et mémoire en Afrique).</p>`,
  },
  {
    order: 5, series: "ALL",
    title: "Leçon 2 : Le résumé de texte argumentatif",
    duration: 45, isPremium: false,
    summary: "Apprendre à résumer fidèlement un texte argumentatif en restituant thèse, arguments et structure, dans un nombre de mots précis.",
    keyPoints: `Résumé : reformulation fidèle et condensée d'un texte, en respectant le sens et la structure
Objectif : réduire à environ 1/4 ou 1/3 du texte original (respecter la consigne de mots)
Étapes : lire entièrement → identifier thèse + arguments → rédiger au brouillon → réviser
Ne pas : citer (pas de guillemets), commenter (pas d'opinion personnelle), trahir le sens (fidélité au texte)
Thèse : l'idée principale que l'auteur défend
Arguments : les raisons qui soutiennent la thèse
Connecteurs logiques : car, donc, cependant, en outre, de plus, ainsi, en revanche…
Reformuler = changer les mots sans changer le sens (paraphrase intelligente ≠ copier)
Respecter l'ordre du texte : ne pas réorganiser à sa guise`,
    content: `<h2>Le Résumé de Texte Argumentatif</h2>
<h3>I. Définition et objectif</h3>
<p>Le résumé est une reformulation condensée et fidèle d'un texte. Il s'agit de restituer :</p>
<ul>
  <li>La <strong>thèse</strong> de l'auteur (l'idée centrale défendue)</li>
  <li>Les <strong>arguments principaux</strong> (les raisons avancées à l'appui)</li>
  <li>La <strong>structure du texte</strong> (l'ordre dans lequel les idées se déploient)</li>
</ul>
<p>Le résumé doit être <strong>objectif</strong> (pas d'opinion personnelle), <strong>fidèle</strong> (ne pas trahir la pensée de l'auteur) et <strong>concis</strong> (respecter le quota de mots demandé, souvent 1/4 à 1/3 du texte).</p>
<h3>II. Méthodologie</h3>
<ol>
  <li><strong>Lecture globale :</strong> comprendre de quoi parle le texte, quel est son registre et son intention.</li>
  <li><strong>Identifier la structure :</strong> découper le texte en parties logiques (thèse, arguments 1, 2, 3, conclusion).</li>
  <li><strong>Extraire les idées clés :</strong> pour chaque partie, noter l'idée principale en quelques mots.</li>
  <li><strong>Rédiger le résumé :</strong> reformuler en vos propres mots, en respectant l'ordre du texte et en utilisant des connecteurs logiques.</li>
  <li><strong>Vérifier :</strong> compte de mots, fidélité, absence de citations et d'opinions personnelles.</li>
</ol>
<h3>III. Règles absolues</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>INTERDIT</th><th>AUTORISÉ</th></tr>
  <tr><td>Citer le texte mot à mot (guillemets)</td><td>Reformuler avec d'autres mots</td></tr>
  <tr><td>Donner son opinion ("Je pense que…")</td><td>Rester dans la perspective de l'auteur</td></tr>
  <tr><td>Ajouter des informations extérieures</td><td>Se limiter strictement au texte</td></tr>
  <tr><td>Réorganiser les idées dans un autre ordre</td><td>Respecter la progression du texte</td></tr>
  <tr><td>Résumer seulement le début ou la fin</td><td>Couvrir tout le texte de façon équilibrée</td></tr>
</table>
<h3>IV. Connecteurs logiques utiles</h3>
<p><strong>Addition :</strong> de plus, en outre, par ailleurs, également<br>
<strong>Opposition :</strong> cependant, en revanche, pourtant, mais, or<br>
<strong>Cause :</strong> car, en effet, parce que, puisque<br>
<strong>Conséquence :</strong> donc, ainsi, c'est pourquoi, par conséquent<br>
<strong>Illustration :</strong> ainsi, par exemple, notamment<br>
<strong>Conclusion :</strong> en conclusion, finalement, en définitive</p>`,
    examples: `<p><strong>Texte original (extrait) :</strong> "Le téléphone portable est devenu un instrument indispensable à notre vie quotidienne. Il nous permet non seulement de communiquer en tout lieu et à toute heure, mais aussi d'accéder à une quantité infinie d'informations. Cependant, cette omniprésence a un coût : elle nous rend dépendants, incapables de déconnecter, et fragilise nos relations humaines directes."</p>
<p><strong>Résumé (≈ 1/3) :</strong> "Le téléphone portable s'est imposé comme un outil incontournable de notre quotidien, facilitant communication et accès à l'information. Toutefois, cette dépendance numérique nuit à notre capacité de déconnexion et appauvrit nos liens sociaux réels."</p>`,
  },
  {
    order: 6, series: "ALL",
    title: "Leçon 3 : Le commentaire composé",
    duration: 55, isPremium: false,
    summary: "Maîtriser la méthode du commentaire composé : construire un plan analytique, analyser les procédés d'écriture et interpréter le texte littéraire.",
    keyPoints: `Commentaire composé : analyse organisée d'un texte littéraire par axes thématiques (≠ linéaire)
Structure : introduction + 2 ou 3 axes (parties) + conclusion
Introduction : accroche → situer le texte → présenter le projet de lecture → annoncer le plan
Axes : chaque axe développe un aspect du texte illustré par des citations et des analyses de procédés
Procédés à analyser : figures de style, registre, types de phrases, champs lexicaux, temps verbaux, structure
Citation : toujours courte et suivie d'une analyse (jamais de citation non commentée)
Conclusion : bilan du commentaire + ouverture (autre texte, autre œuvre, problème général)
Projet de lecture : l'idée directrice qui organise tout le commentaire (ce qu'on veut démontrer)
Tonalité du texte : lyrique, comique, tragique, ironique, didactique, polémique…`,
    content: `<h2>Le Commentaire Composé</h2>
<h3>I. Définition</h3>
<p>Le commentaire composé est une analyse littéraire organisée <strong>par axes thématiques</strong> (et non ligne par ligne comme dans une explication linéaire). Il vise à démontrer un <strong>projet de lecture</strong> — une idée directrice qui rend compte de l'originalité et de la richesse du texte.</p>
<h3>II. Structure</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Partie</th><th>Contenu</th></tr>
  <tr><td>Introduction</td><td>Accroche → Présentation du texte (auteur, œuvre, contexte) → Projet de lecture → Annonce du plan</td></tr>
  <tr><td>Axe I</td><td>Titre de l'axe + développement avec citations + analyses de procédés + interprétation</td></tr>
  <tr><td>Axe II</td><td>Idem</td></tr>
  <tr><td>Axe III (si besoin)</td><td>Idem</td></tr>
  <tr><td>Conclusion</td><td>Bilan → réponse au projet de lecture → Ouverture</td></tr>
</table>
<h3>III. Le projet de lecture</h3>
<p>Le projet de lecture est l'idée centrale qui guide tout le commentaire. Il répond à la question : <em>"Qu'est-ce que ce texte fait et comment le fait-il ?"</em></p>
<p>Exemples : "Ce poème de Senghor célèbre la beauté de la femme africaine en la confondant avec la richesse de la terre noire, dans un registre lyrique et sensuel." → Les axes pourraient être : I. Un éloge de la femme africaine / II. Une fusion entre femme et nature / III. Un poème lyrique et engagé.</p>
<h3>IV. Analyser un procédé</h3>
<p>Ne jamais nommer un procédé sans l'analyser. La formule est : <strong>nommer le procédé → citer → analyser → interpréter</strong>.</p>
<p><em>Mauvais :</em> "Il y a une métaphore : 'la nuit de ton sein'."<br>
<em>Bon :</em> "La métaphore 'la nuit de ton sein' assimile la peau sombre de la femme aimée à la profondeur bienveillante de la nuit, créant une image de protection et de plénitude."</p>
<h3>V. Registres littéraires à identifier</h3>
<ul>
  <li><strong>Lyrique :</strong> expression des sentiments personnels (je, émotion, musicalité)</li>
  <li><strong>Épique :</strong> grandeur, héroïsme, hyperboles</li>
  <li><strong>Tragique :</strong> fatalité, souffrance, mort inévitable</li>
  <li><strong>Comique :</strong> humour, ironie, situation ridicule</li>
  <li><strong>Polémique :</strong> attaque, critique virulente</li>
  <li><strong>Didactique :</strong> volonté d'instruire, expliquer, démontrer</li>
</ul>`,
    examples: `<p><strong>Texte :</strong> "Femme nue, femme noire / Vêtue de ta couleur qui est vie, de ta forme qui est beauté !" (Senghor)<br>
<strong>Projet de lecture :</strong> Ce poème fait de la femme africaine le symbole vivant de la beauté et de la vitalité de l'Afrique.<br>
<strong>Axe I :</strong> Un éloge de la femme africaine — L'apostrophe ("Femme nue, femme noire") place la femme au cœur du poème comme destinataire d'un hommage direct et personnel. L'adjectif "nue" suggère la beauté naturelle et l'authenticité.<br>
<strong>Axe II :</strong> La femme et la nature confondues — La métaphore "ta couleur qui est vie" fait de la peau sombre un symbole de vitalité et de fécondité. La femme et la terre africaine ne font qu'un.</p>`,
  },
  {
    order: 7, series: "ALL",
    title: "Leçon 4 : La dissertation littéraire",
    duration: 55, isPremium: false,
    summary: "Construire une dissertation littéraire rigoureuse : formuler une problématique, bâtir un plan dialectique ou thématique, argumenter avec des exemples tirés des œuvres.",
    keyPoints: `Dissertation littéraire : réflexion organisée sur une affirmation ou une question portant sur la littérature
Problématique littéraire : tension entre deux positions sur un fait littéraire ("La littérature est-elle un simple divertissement ou aussi un outil de connaissance ?")
Plans possibles : dialectique (thèse/antithèse/synthèse) ou thématique (trois aspects différents)
Argument littéraire = thèse + exemple précis (auteur, œuvre, passage) + analyse + lien avec la thèse
Éviter les généralités vagues : toujours illustrer avec des exemples précis
Introduction : accroche littéraire → définition des termes du sujet → problématique → annonce du plan
Corps du devoir : minimum 2 grandes parties avec 2-3 sous-parties chacune
Conclusion : bilan nuancé + ouverture (autre œuvre, autre question)
Transitions : les grandes parties doivent être reliées par des phrases de transition`,
    content: `<h2>La Dissertation Littéraire</h2>
<h3>I. Définition et enjeux</h3>
<p>La dissertation littéraire consiste à réfléchir de façon organisée et argumentée sur une question ou une affirmation portant sur la littérature (un genre, un auteur, une fonction de la littérature, un mouvement…). Elle mobilise des exemples précis tirés des œuvres étudiées.</p>
<h3>II. Analyser le sujet et formuler la problématique</h3>
<p><strong>Étape 1 — Analyser les termes :</strong> définir chaque mot clé du sujet.</p>
<p><strong>Étape 2 — Trouver la tension :</strong> le sujet pose toujours un problème, une contradiction, un débat. La problématique est la question qui révèle cette tension.</p>
<p><em>Exemple de sujet :</em> "La littérature est-elle utile ?"<br>
Termes : "littérature" (textes à valeur artistique), "utile" (qui sert à quelque chose — mais à quoi ?).<br>
Tension : La littérature produit du plaisir (esthétique) et semble "inutile" au sens pratique, mais elle nourrit l'empathie, la pensée critique, la connaissance humaine → elle est utile autrement.</p>
<h3>III. Construire le plan</h3>
<p><strong>Plan dialectique :</strong></p>
<ol>
  <li>Partie I : La littérature semble d'abord inutile (divertissement pur)</li>
  <li>Partie II : Mais elle remplit des fonctions essentielles (connaissance, critique sociale, empathie)</li>
  <li>Partie III : En réalité, l'utilité de la littérature réside dans sa capacité à humaniser</li>
</ol>
<h3>IV. L'argument littéraire</h3>
<p>Un argument en dissertation littéraire se structure ainsi :</p>
<ol>
  <li><strong>Affirmation :</strong> "La littérature permet de comprendre des conditions de vie éloignées de la nôtre."</li>
  <li><strong>Exemple précis :</strong> "Dans <em>Une si longue lettre</em> de Mariama Bâ, Ramatoulaye décrit les inégalités subies par les femmes sénégalaises dans le système de la polygamie."</li>
  <li><strong>Analyse :</strong> "Par le genre épistolaire (lettre), l'auteure donne voix à une intériorité féminine longtemps ignorée."</li>
  <li><strong>Lien :</strong> "Le lecteur élargit ainsi son horizon moral et social, ce qui constitue une forme d'utilité profonde de la littérature."</li>
</ol>`,
    examples: `<p><strong>Sujet :</strong> "Le roman africain a-t-il pour vocation principale de dénoncer les injustices sociales ?"</p>
<p><strong>Problématique :</strong> Le roman africain est-il avant tout un instrument de dénonciation politique et sociale, ou poursuit-il d'autres ambitions (esthétiques, identitaires, universelles) ?</p>
<p><strong>Plan thématique :</strong><br>
I. La dénonciation comme vocation fondatrice (négritude, décolonisation)<br>
II. Une ambition esthétique et identitaire au-delà de la dénonciation<br>
III. La vocation universelle du roman africain : raconter l'humain</p>`,
  },
  // ─── Partie 2 : Genre littéraire et œuvres étudiées ──────────────────────
  {
    order: 8, series: "ALL",
    title: "Leçon 5 : Le théâtre — structure, personnages et conflit",
    duration: 50, isPremium: false,
    summary: "Étudier le théâtre comme genre littéraire : structure dramatique, types de personnages, conflits, didascalies, et techniques d'analyse d'une pièce.",
    keyPoints: `Théâtre : texte écrit pour être joué sur scène, lu par un acteur devant un public
Structure classique : actes et scènes ; exposition → nœud → péripéties → dénouement
Règles classiques (XVIIe siècle) : unité de temps (24h), de lieu (un seul endroit), d'action (une intrigue principale)
Types de théâtre : tragédie (héros noble, fin malheureuse), comédie (personnages ordinaires, fin heureuse), drame (mélange)
Personnages : protagoniste (héros), antagoniste (opposant), confident, meneur de jeu…
Conflit dramatique : moteur de la pièce — opposition entre personnages, désirs contradictoires, fatalité
Didascalies : indications scéniques de l'auteur (hors dialogue) pour les décors, les gestes, les tons
Stichomythie : échange rapide de répliques courtes, crée tension ou affrontement
Théâtre africain contemporain : Bernard Dadié, Guillaume Oyono-Mbia`,
    content: `<h2>Le Théâtre</h2>
<h3>I. Définition et spécificité du genre</h3>
<p>Le théâtre est un texte <strong>destiné à la représentation</strong> sur scène. Il s'adresse à deux types de lecteurs : le metteur en scène/acteur (qui l'interprète) et le public (qui le reçoit). La double énonciation est caractéristique du théâtre : le personnage parle à un autre personnage, mais le spectateur entend et comprend ce que le personnage ne comprend pas (ironie dramatique).</p>
<h3>II. Structure dramatique</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Moment</th><th>Rôle</th></tr>
  <tr><td>Exposition</td><td>Présente les personnages, le lieu, la situation initiale — souvent Acte I</td></tr>
  <tr><td>Nœud / Crise</td><td>Le conflit est clairement posé, la tension monte</td></tr>
  <tr><td>Péripéties</td><td>Rebondissements, obstacles, faux espoirs</td></tr>
  <tr><td>Point culminant</td><td>Moment de tension maximale (crise, révélation)</td></tr>
  <tr><td>Dénouement</td><td>Résolution du conflit (tragique ou comique)</td></tr>
</table>
<h3>III. Les genres théâtraux</h3>
<ul>
  <li><strong>Tragédie :</strong> héros noble, conflit contre la fatalité ou les dieux, fin malheureuse (mort). Ex. : Sophocle (Œdipe Roi), Racine (Phèdre).</li>
  <li><strong>Comédie :</strong> personnages ordinaires, situation comique, fin heureuse (mariage, réconciliation). Ex. : Molière (L'Avare, Le Bourgeois Gentilhomme).</li>
  <li><strong>Drame :</strong> mélange du tragique et du comique, personnages complexes. Ex. : Théâtre africain de Bernard Dadié (Monsieur Thôgô-gnini).</li>
</ul>
<h3>IV. Analyser un extrait théâtral</h3>
<ul>
  <li>Type de scène (exposition, conflit, dénouement…)</li>
  <li>Nature du conflit (physique ? psychologique ? social ?)</li>
  <li>Caractérisation des personnages (by their words, gestures, reactions)</li>
  <li>Procédés : stichomythie, monologue, aparté, double énonciation, didascalies</li>
  <li>Registre et tonalité (comique, tragique, pathétique…)</li>
</ul>`,
    examples: `<p><strong>Exemple — Monsieur Thôgô-gnini de Bernard Dadié (1970) :</strong><br>
Protagoniste : Thôgô-gnini, commerçant africain corrompu qui imite servilement les colonisateurs.<br>
Conflit : entre les valeurs traditionnelles africaines et l'opportunisme colonial.<br>
Registre : satire comique — Dadié se moque avec férocité des "collabos" africains qui trahissent leur peuple pour profiter du système colonial.<br>
Procédé clé : l'ironie dramatique — le spectateur comprend la lâcheté du personnage que lui-même ne voit pas.</p>`,
  },
  {
    order: 9, series: "ALL",
    title: "Leçon 6 : La poésie — formes, rythme et images",
    duration: 50, isPremium: false,
    summary: "Analyser un texte poétique : versification, figures de style, registre lyrique ou engagé, et situer la poésie négro-africaine dans son contexte.",
    keyPoints: `Poésie : genre littéraire qui travaille le langage par le rythme, les sons et les images
Versification classique : vers réguliers (alexandrin = 12 syllabes), rime (embrassée, croisée, plate)
Poésie moderne : vers libres, prose poétique, calligramme — rupture avec les règles classiques
Rythme : coupes, césures, enjambements, assonances et allitérations
Figures de style poétiques : métaphore, comparaison, personnification, anaphore, hyperbole, oxymore
Registre lyrique : expression des sentiments personnels (amour, mélancolie, nature)
Poésie engagée (négritude) : Senghor, Césaire, Damas — revendiquer l'identité noire et résister à l'oppression coloniale
Poésie épique : célébrer un héros, un peuple, une action collective
Analyser un poème : forme → images → rythme → registre → sens`,
    content: `<h2>La Poésie</h2>
<h3>I. Définition et caractères</h3>
<p>La poésie travaille la <strong>matière du langage</strong> (sons, rythmes, images) pour produire un effet esthétique et émotionnel que la prose ordinaire ne peut pas atteindre. Elle peut être lyrique (expression du moi), épique (récit d'exploits), ou engagée (revendication politique).</p>
<h3>II. La versification</h3>
<p><strong>Vers classiques :</strong></p>
<ul>
  <li><strong>Alexandrin :</strong> 12 syllabes, coupé par une césure au milieu (6//6). Ex. : "Je suis venu trop tard // dans un monde trop vieux" (Musset)</li>
  <li><strong>Rimes :</strong> plates (AABB), croisées (ABAB), embrassées (ABBA)</li>
</ul>
<p><strong>Vers libres (poésie moderne) :</strong> pas de règles fixes de mètre ou de rime. La musicalité vient des répétitions, des images, des ruptures de rythme.</p>
<h3>III. Figures de style poétiques</h3>
<table border="1" cellpadding="5" style="border-collapse:collapse;width:100%">
  <tr><th>Figure</th><th>Définition</th><th>Exemple</th></tr>
  <tr><td>Métaphore</td><td>Comparaison sans "comme"</td><td>"La vie est un long fleuve tranquille"</td></tr>
  <tr><td>Comparaison</td><td>Comparaison avec "comme", "tel que"</td><td>"Comme un oiseau en cage"</td></tr>
  <tr><td>Personnification</td><td>Prêter des qualités humaines à une chose</td><td>"La forêt murmure ses secrets"</td></tr>
  <tr><td>Anaphore</td><td>Répétition en début de vers</td><td>"Nègre, je suis…"</td></tr>
  <tr><td>Hyperbole</td><td>Exagération expressive</td><td>"Des millions de larmes"</td></tr>
  <tr><td>Oxymore</td><td>Association de contraires</td><td>"Cette obscure clarté"</td></tr>
</table>
<h3>IV. La poésie négro-africaine (Négritude)</h3>
<p>Le mouvement de la Négritude (1930-1960) regroupe des poètes africains et antillais (Senghor, Césaire, Damas) qui revendiquent la beauté et la richesse des cultures africaines face au mépris colonial.</p>
<ul>
  <li><strong>Léopold Sédar Senghor :</strong> célèbre la femme africaine, la terre, les rythmes ancestraux (<em>Chants d'ombre</em>, <em>Éthiopiques</em>)</li>
  <li><strong>Aimé Césaire :</strong> poésie de la révolte contre le colonialisme (<em>Cahier d'un retour au pays natal</em>)</li>
</ul>`,
    examples: `<p><strong>Poème de Senghor ("Femme noire") :</strong><br>
"Femme nue, femme noire / Vêtue de ta couleur qui est vie, de ta forme qui est beauté !"<br>
<strong>Analyse :</strong><br>
• <em>Anaphore</em> ("Femme nue, femme noire") : insistance solennelle, comme une invocation.<br>
• <em>Métaphore</em> ("ta couleur qui est vie") : la peau sombre est associée à la vitalité et à la fécondité.<br>
• <em>Registre lyrique et épique :</em> le poème est à la fois une déclaration d'amour personnel et un hymne à toute l'Afrique.<br>
• <em>Vers libres</em> : rythme ample et respirant, proche des rythmes musicaux africains.</p>`,
  },
  {
    order: 10, series: "ALL",
    title: "Leçon 7 : Le roman — structure, narration et personnages",
    duration: 50, isPremium: false,
    summary: "Analyser un roman dans ses composantes narratives : structure du récit, modes de narration, construction des personnages et thèmes développés.",
    keyPoints: `Roman : genre narratif long en prose, avec des personnages fictifs évoluant dans un univers fictif (diégèse)
Narrateur : qui raconte l'histoire ? (auteur ≠ narrateur)
Focalisation : point de vue du narrateur — interne (dedans un personnage), externe (observateur), omnisciente (sait tout)
Types de discours : direct (dialogue avec guillemets), indirect (sans guillemets, avec "que"), indirect libre (mélange)
Structure narrative : situation initiale → élément perturbateur → péripéties → résolution → situation finale (schéma quinaire)
Personnages : plat (type, sans évolution) vs rond (complexe, qui évolue)
Temps du récit : ellipse (sauter dans le temps), sommaire (résumer), scène (temps réel), pause (description)
Roman africain : Bernard Dadié (Climbié), Camara Laye (L'Enfant noir), Mariama Bâ (Une si longue lettre)`,
    content: `<h2>Le Roman</h2>
<h3>I. Le roman : genre et définition</h3>
<p>Le roman est un long récit en prose qui présente des personnages fictifs dans un univers narratif (diégèse). Il se distingue par sa liberté formelle : il n'a pas de règles fixes de longueur, de structure ou de style. C'est le genre littéraire dominant depuis le XIXe siècle.</p>
<h3>II. Le narrateur et la focalisation</h3>
<p>L'<strong>auteur</strong> est la personne réelle qui écrit le roman. Le <strong>narrateur</strong> est la voix fictive qui raconte. Ils ne sont pas identiques.</p>
<table border="1" cellpadding="5" style="border-collapse:collapse;width:100%">
  <tr><th>Focalisation</th><th>Description</th><th>Effet</th></tr>
  <tr><td>Omnisciente (zéro)</td><td>Le narrateur sait tout sur tous les personnages</td><td>Vue globale, sentiment de maîtrise totale</td></tr>
  <tr><td>Interne</td><td>Le narrateur raconte depuis l'intérieur d'un personnage</td><td>Identification, accès aux pensées, subjectivité</td></tr>
  <tr><td>Externe</td><td>Le narrateur observe de l'extérieur, sans accès aux pensées</td><td>Objectivité apparente, mystère, distance</td></tr>
</table>
<h3>III. Les modes de discours</h3>
<ul>
  <li><strong>Discours direct :</strong> "Je suis fatigué", dit-il. (guillemets, tirets)</li>
  <li><strong>Discours indirect :</strong> Il dit qu'il était fatigué. (subordonnée, temps décalé)</li>
  <li><strong>Discours indirect libre :</strong> Il était fatigué. À quoi bon continuer ? (sans guillemets, sans "que" — mélange narrateur/personnage)</li>
</ul>
<h3>IV. Structure du récit (schéma quinaire)</h3>
<ol>
  <li><strong>Situation initiale :</strong> présentation de l'univers stable du départ</li>
  <li><strong>Élément perturbateur :</strong> événement qui rompt l'équilibre</li>
  <li><strong>Péripéties :</strong> tentatives de résolution, obstacles, rebondissements</li>
  <li><strong>Résolution :</strong> l'élément perturbateur est traité (résolu ou non)</li>
  <li><strong>Situation finale :</strong> nouvel équilibre (identique ou différent de l'initial)</li>
</ol>
<h3>V. Le roman africain</h3>
<p>Le roman africain en français naît dans les années 1950-1960, lié aux mouvements de décolonisation. Il explore les thèmes de l'identité culturelle, du conflit entre tradition et modernité, de l'exil et de la condition des femmes.</p>
<p>Œuvres majeures à connaître : <em>L'Enfant noir</em> (Camara Laye, 1953), <em>Une si longue lettre</em> (Mariama Bâ, 1979), <em>Climbié</em> (Bernard Dadié, 1956).</p>`,
    examples: `<p><strong>Exemple — L'Enfant noir (Camara Laye) :</strong><br>
Narrateur : homodiégétique (le narrateur est le personnage principal — "je") + focalisation interne.<br>
Structure : autobiographique — de l'enfance en Guinée aux études à Paris, structurée par la mémoire affective et non par une intrigue traditionnelle.<br>
Temps du récit : nombreuses scènes (description détaillée de la forge, des rites d'initiation) alternent avec des sommaires (résumé d'une période scolaire).<br>
Thèmes : nostalgie de l'enfance africaine, rupture avec les traditions, découverte de la modernité, deuil d'un paradis perdu.</p>`,
  },
  {
    order: 11, series: "ALL",
    title: "Leçon 8 : Récit autobiographique, de voyage et historique",
    duration: 45, isPremium: false,
    summary: "Étudier les formes de récits factuels et mémoriaux : autobiographie, mémoires, récit de voyage et récit historique — pacte autobiographique, vérité et littérature.",
    keyPoints: `Autobiographie : récit rétrospectif en prose fait par l'auteur sur sa propre vie (Lejeune : "pacte autobiographique")
Pacte autobiographique (Lejeune) : auteur = narrateur = personnage → le lecteur croit à la vérité du récit
Mémoires : récit historique vu par un témoin (≠ autobiographie centrée sur le moi)
Journal intime : récit au jour le jour, sans perspective rétrospective
Récit de voyage : découverte d'un espace étranger, mélange de description et de réflexion
Regard de l'autre : le voyageur révèle autant sa propre culture que celle qu'il observe
Récit historique : restituer des événements réels dans une forme narrative (chronique, témoignage)
Autofiction : mélange de faits réels et de fiction assumé (≠ autobiographie pure)
Exemples : Camara Laye (L'Enfant noir), Cheikh Hamidou Kane (L'Aventure ambiguë)`,
    content: `<h2>Récit Autobiographique, de Voyage et Historique</h2>
<h3>I. L'autobiographie et le pacte autobiographique</h3>
<p>Philippe Lejeune définit l'autobiographie comme un "récit rétrospectif en prose qu'une personne réelle fait de sa propre existence, lorsqu'elle met l'accent sur sa vie individuelle, en particulier sur l'histoire de sa personnalité."</p>
<p>Le <strong>pacte autobiographique</strong> est un contrat implicite avec le lecteur : auteur = narrateur = personnage principal. Le lecteur accepte de croire à la vérité du récit. On ne peut pas mentir dans une autobiographie sans trahir ce pacte.</p>
<p>À distinguer de l'<strong>autofiction</strong> (Doubrovsky) : l'auteur mélange délibérément vrai et imaginaire tout en gardant son nom propre.</p>
<h3>II. Mémoires, journal intime et récit de voyage</h3>
<table border="1" cellpadding="5" style="border-collapse:collapse;width:100%">
  <tr><th>Genre</th><th>Caractéristiques</th><th>Exemple</th></tr>
  <tr><td>Autobiographie</td><td>Récit rétrospectif, centré sur le moi, pacte autobiographique</td><td>Rousseau, Les Confessions</td></tr>
  <tr><td>Mémoires</td><td>Témoignage historique, perspective plus collective</td><td>De Gaulle, Mémoires de guerre</td></tr>
  <tr><td>Journal intime</td><td>Récit quotidien, sans recul, daté</td><td>Anne Frank, Le Journal d'Anne Frank</td></tr>
  <tr><td>Récit de voyage</td><td>Découverte d'un espace étranger, regard sur l'autre</td><td>Ibn Battûta, Michel de Montaigne</td></tr>
</table>
<h3>III. Le récit de voyage et le regard sur l'autre</h3>
<p>Le voyageur-narrateur observe une société étrangère, mais son regard révèle autant ses propres présupposés culturels que la réalité observée. C'est ce qu'on appelle l'<strong>ethnocentrisme</strong> ou, à l'inverse, le <strong>relativisme culturel</strong> — quand le voyageur remet en question ses propres certitudes.</p>
<p>Montesquieu utilise le récit de voyage fictif dans les <em>Lettres persanes</em> (1721) pour critiquer la société française à travers le regard d'un Persan — regard extérieur ironique sur les mœurs des Européens.</p>
<h3>IV. Le récit autobiographique africain</h3>
<p><em>L'Aventure ambiguë</em> de Cheikh Hamidou Kane (1961) est à la frontière du roman autobiographique et du récit philosophique : Samba Diallo, jeune Sénégalais envoyé en France pour étudier, vit le déchirement entre deux cultures, deux visions du monde — la tradition coranique et la modernité occidentale.</p>`,
    examples: `<p><strong>L'Enfant noir (Camara Laye) — autobiographie :</strong><br>
Pacte autobiographique : l'auteur, le narrateur et le personnage principal portent le même nom et la même biographie.<br>
Rétrospection nostalgique : écrit à Paris, loin de la Guinée, l'auteur reconstruit son enfance africaine avec une distance temporelle qui accentue la nostalgie.<br>
Tension autobiographique : la beauté idyllique du passé africain masque peut-être les difficultés réelles — certains critiques (Mongo Béti) ont reproché à Laye d'avoir "embelli" la réalité coloniale.</p>`,
  },
  // ─── Partie 3 : Langue et grammaire ──────────────────────────────────────
  {
    order: 12, series: "ALL",
    title: "Leçon 9 : Perfectionnement de la langue — syntaxe et grammaire",
    duration: 45, isPremium: false,
    summary: "Maîtriser les règles fondamentales de la syntaxe française, la conjugaison des temps littéraires, la ponctuation et les niveaux de langue.",
    keyPoints: `Syntaxe : organisation des mots dans la phrase pour produire un sens cohérent
Phrase simple vs complexe : une seule proposition vs plusieurs propositions reliées
Subordination : propositions subordonnées relatives, conjonctives, interrogatives indirectes, infinitives
Accord sujet-verbe : règles et pièges (sujet collectif, sujet inversé, sujet composé)
Accord du participe passé : avec avoir (accord avec le COD si placé avant), avec être (accord avec le sujet)
Temps littéraires : passé simple (récit), imparfait (description/habitude), plus-que-parfait (antériorité), conditionnel
Ponctuation : virgule, point-virgule, deux-points, tirets, guillemets — fonctions précises
Niveaux de langue : soutenu, courant, familier, argotique — adapter son registre au contexte
Connecteurs logiques : maîtriser les articulateurs du discours (opposition, cause, conséquence, illustration)`,
    content: `<h2>Perfectionnement de la Langue</h2>
<h3>I. La syntaxe</h3>
<p>La syntaxe est l'ensemble des règles qui gouvernent l'ordre et les relations des mots dans la phrase.</p>
<p><strong>Types de propositions :</strong></p>
<ul>
  <li><strong>Principale :</strong> la proposition qui peut exister seule ("Il lisait un roman")</li>
  <li><strong>Subordonnée relative :</strong> introduite par un pronom relatif (qui, que, dont, où) — précise un nom</li>
  <li><strong>Subordonnée conjonctive :</strong> introduite par une conjonction (que, parce que, quand, si…) — complète le verbe principal</li>
</ul>
<h3>II. Règles d'accord délicates</h3>
<p><strong>Accord du participe passé :</strong></p>
<ul>
  <li>Avec <strong>être</strong> : s'accorde avec le sujet. Ex. : "Elle est partie."</li>
  <li>Avec <strong>avoir</strong> : s'accorde avec le COD si celui-ci est <em>placé avant</em> le verbe. Ex. : "Les livres que j'ai lus." (COD "livres" avant "lus" → accord)</li>
  <li>Verbes pronominaux : accorde selon la nature du pronom réfléchi (COD ou COI).</li>
</ul>
<h3>III. Les temps du récit littéraire</h3>
<table border="1" cellpadding="5" style="border-collapse:collapse;width:100%">
  <tr><th>Temps</th><th>Usage littéraire</th><th>Exemple</th></tr>
  <tr><td>Passé simple</td><td>Action ponctuelle et délimitée dans le récit</td><td>"Il entra dans la pièce."</td></tr>
  <tr><td>Imparfait</td><td>Description, habitude, action en cours dans le passé</td><td>"Il lisait chaque soir."</td></tr>
  <tr><td>Plus-que-parfait</td><td>Action antérieure à une autre action passée</td><td>"Il avait déjà lu ce roman."</td></tr>
  <tr><td>Conditionnel passé</td><td>Hypothèse sur le passé</td><td>"Il aurait pu réussir."</td></tr>
</table>
<h3>IV. La ponctuation</h3>
<ul>
  <li><strong>Virgule ( , ) :</strong> sépare des éléments de même nature, encadre une apposition</li>
  <li><strong>Point-virgule ( ; ) :</strong> sépare deux propositions indépendantes mais liées logiquement</li>
  <li><strong>Deux-points ( : ) :</strong> annoncent une explication, une liste, une citation</li>
  <li><strong>Guillemets ( « » ) :</strong> citation, discours direct, mise à distance d'un mot</li>
  <li><strong>Tirets ( — ) :</strong> dialogue (théâtre, roman) ou incise explicative</li>
</ul>
<h3>V. Les niveaux de langue</h3>
<ul>
  <li><strong>Niveau soutenu :</strong> dissertation, commentaire, discours officiel</li>
  <li><strong>Niveau courant :</strong> conversation ordinaire, lettres formelles</li>
  <li><strong>Niveau familier :</strong> conversation entre amis</li>
  <li><strong>Niveau argotique/vulgaire :</strong> à éviter dans les productions scolaires</li>
</ul>`,
    examples: `<p><strong>Pièges classiques :</strong></p>
<p>"La foule d'élèves <em>criait</em>" → sujet collectif singulier → verbe au singulier.</p>
<p>"C'est vous qui <em>avez</em> raison" → le pronom relatif "qui" a pour antécédent "vous" → accord avec vous → "avez".</p>
<p>"Les résultats que nous avons <em>obtenus</em>" → COD "résultats" avant le verbe → accord au masculin pluriel.</p>`,
  },
  {
    order: 13, series: "ALL",
    title: "Leçon 10 : Les procédés rhétoriques et stylistiques",
    duration: 50, isPremium: false,
    summary: "Identifier et analyser les principales figures de style et procédés rhétoriques dans les textes littéraires et argumentatifs.",
    keyPoints: `Figures de style : procédés qui donnent au langage une expressivité particulière
Figures d'analogie : métaphore, comparaison, allégorie, personnification
Figures d'opposition : antithèse, oxymore, paradoxe, ironie
Figures d'insistance/amplification : anaphore, gradation, hyperbole, accumulation/énumération
Figures d'atténuation/substitution : litote, euphémisme, périphrpase, synecdoque, métonymie
Figures sonores : allitération (consonnes), assonance (voyelles)
Rhétorique : art de persuader par le discours (ethos, pathos, logos — Aristote)
Ethos : image de l'orateur (crédibilité) ; Pathos : appel aux émotions ; Logos : argument logique
Analyser une figure : la nommer → citer → expliquer l'effet produit`,
    content: `<h2>Procédés Rhétoriques et Stylistiques</h2>
<h3>I. Les figures de style : panorama</h3>
<p>Les figures de style sont des procédés qui transforment le langage ordinaire pour produire un effet esthétique, émotionnel ou argumentatif. On les classe selon leur fonction.</p>
<h3>II. Figures d'analogie (rapprochements)</h3>
<table border="1" cellpadding="5" style="border-collapse:collapse;width:100%">
  <tr><th>Figure</th><th>Définition</th><th>Exemple</th></tr>
  <tr><td>Comparaison</td><td>Rapproche deux éléments avec un outil comparatif (comme, tel, ainsi que)</td><td>"Il est fort comme un lion"</td></tr>
  <tr><td>Métaphore</td><td>Rapproche deux éléments sans outil comparatif</td><td>"C'est un lion sur le terrain"</td></tr>
  <tr><td>Personnification</td><td>Prête des qualités humaines à un animal, une chose</td><td>"La forêt respire"</td></tr>
  <tr><td>Allégorie</td><td>Représentation concrète d'une idée abstraite</td><td>La Balance = la Justice</td></tr>
</table>
<h3>III. Figures d'opposition</h3>
<ul>
  <li><strong>Antithèse :</strong> opposition de deux idées dans des termes symétriques. "Il faut manger pour vivre, et non pas vivre pour manger."</li>
  <li><strong>Oxymore :</strong> réunit deux termes contradictoires. "Cette obscure clarté" (Corneille)</li>
  <li><strong>Ironie :</strong> dire le contraire de ce qu'on pense pour railler. "Quelle belle idée !" (dit sarcastiquement)</li>
  <li><strong>Paradoxe :</strong> affirmation apparemment absurde qui révèle une vérité profonde.</li>
</ul>
<h3>IV. Figures d'insistance</h3>
<ul>
  <li><strong>Anaphore :</strong> répétition d'un mot ou groupe en début de vers/phrase. "J'ai la nostalgie de toi, j'ai la nostalgie de tes mains, j'ai la nostalgie de ton sourire."</li>
  <li><strong>Gradation :</strong> énumération en crescendo ou décrescendo. "Je l'aperçus, je frémis, je pâlis."</li>
  <li><strong>Hyperbole :</strong> exagération volontaire. "Je t'ai cherché des milliers d'années."</li>
  <li><strong>Accumulation/Énumération :</strong> liste de termes qui s'accumulent pour produire un effet d'abondance ou d'écrasement.</li>
</ul>
<h3>V. Figures d'atténuation et de substitution</h3>
<ul>
  <li><strong>Litote :</strong> dire moins pour suggérer plus. "Ce n'est pas mal" = c'est très bien.</li>
  <li><strong>Euphémisme :</strong> atténuer une réalité dure. "Il nous a quittés" = il est mort.</li>
  <li><strong>Métonymie :</strong> désigner une chose par une autre qui lui est associée. "Boire un verre" = boire le contenu du verre.</li>
  <li><strong>Périphrase :</strong> remplacer un mot par une expression. "Le roi des animaux" = le lion.</li>
</ul>
<h3>VI. La rhétorique : ethos, pathos, logos</h3>
<p>Aristote distingue trois modes de persuasion :</p>
<ul>
  <li><strong>Ethos :</strong> l'image que l'orateur donne de lui-même (autorité, crédibilité, honnêteté)</li>
  <li><strong>Pathos :</strong> l'appel aux émotions du destinataire (pitié, indignation, enthousiasme)</li>
  <li><strong>Logos :</strong> l'argument logique, la démonstration rationnelle</li>
</ul>`,
    examples: `<p><strong>Analyse d'un extrait :</strong> "Nous ne voulions pas, nous ne pouvions pas, nous ne devions pas laisser tomber nos frères." (Discours politique imaginaire)<br>
• <em>Anaphore</em> : "nous ne..." × 3 → insistance solennelle, renforcement de la conviction<br>
• <em>Gradation</em> : vouloir → pouvoir → devoir → ascension vers l'obligation morale absolue<br>
• <em>Pathos</em> : "nos frères" — appel à la solidarité fraternelle, aux émotions de l'auditoire<br>
• <em>Logos</em> : la triple négation enchaînée construit une démonstration logique par élimination</p>`,
  },
  {
    order: 14, series: "ALL",
    title: "Leçon 11 : Reformulation et réécriture de phrases",
    duration: 40, isPremium: false,
    summary: "Exercer la reformulation, la transformation syntaxique et la réécriture de phrases pour gagner en précision, clarté et fluidité stylistique.",
    keyPoints: `Reformuler : dire la même chose autrement, avec d'autres mots ou une autre structure
Transformation syntaxique : passif → actif, discours direct → indirect, propositions à restructurer
Passif : le sujet subit l'action ; actif : le sujet accomplit l'action
Discours indirect : attention aux changements de temps, de personnes et d'adverbes
Nominalisaton : transformer un verbe en nom (agir → action, partir → départ)
Réécriture stylistique : alléger, varier les structures, éviter les répétitions
Substituts lexicaux : pronoms, synonymes, termes génériques pour éviter les répétitions
Fluidité : éviter les phrases trop longues ou trop courtes ; varier la longueur des phrases
Clarté : un sujet = une phrase ; éviter les relatives enchâssées multiples`,
    content: `<h2>Reformulation et Réécriture de Phrases</h2>
<h3>I. Pourquoi reformuler ?</h3>
<p>La reformulation est une compétence essentielle pour le résumé, la prise de notes et la réécriture littéraire. Elle consiste à reproduire le sens d'un énoncé en changeant les mots et/ou la structure syntaxique, sans en trahir le sens.</p>
<h3>II. Transformations syntaxiques fondamentales</h3>
<p><strong>Voix active → Voix passive :</strong></p>
<ul>
  <li>Active : "Le professeur explique la leçon." → Passive : "La leçon est expliquée par le professeur."</li>
  <li>Règle : l'objet direct devient sujet ; le verbe se met à l'auxiliaire "être" + participe passé ; le sujet actif devient complément d'agent (par + sujet).</li>
</ul>
<p><strong>Discours direct → Discours indirect :</strong></p>
<ul>
  <li>Direct : Il dit : "Je viendrai demain."</li>
  <li>Indirect : Il dit qu'il viendrait le lendemain.</li>
  <li>Changements : temps verbaux (présent → imparfait ; futur → conditionnel), pronoms personnels, adverbes de temps (demain → le lendemain, hier → la veille).</li>
</ul>
<h3>III. La nominalisation</h3>
<p>La nominalisation consiste à transformer un verbe ou un adjectif en nom. Elle alourdit parfois le style mais est souvent requise dans les textes académiques ou journalistiques.</p>
<ul>
  <li>arriver → arrivée / arrivage</li>
  <li>développer → développement</li>
  <li>analyser → analyse</li>
  <li>fort → force / fortifier → fortification</li>
</ul>
<h3>IV. Améliorer le style : fluidité et clarté</h3>
<p><strong>Éviter les répétitions :</strong> utiliser des pronoms (il, elle, celui-ci), des synonymes ou des termes génériques ("cet auteur", "cet ouvrage").</p>
<p><strong>Varier la longueur des phrases :</strong> alterner phrases courtes (impact, choc) et phrases longues (développement, nuance).</p>
<p><strong>Éviter les pléonasmes :</strong> "monter en haut", "descendre en bas", "au jour d'aujourd'hui" → supprimer le terme redondant.</p>
<p><strong>Préférer le concret à l'abstrait :</strong> "mettre en œuvre des mesures de nature à favoriser le développement…" → "favoriser le développement par des mesures concrètes".</p>`,
    examples: `<p><strong>Exercice de réécriture :</strong></p>
<p>Phrase originale : "Le fait que les élèves qui ne travaillent pas suffisamment ont des résultats qui sont mauvais est quelque chose qui est évident."</p>
<p>Reformulation claire : "Les élèves peu travailleurs obtiennent manifestement de mauvais résultats."</p>
<p>Améliorations : suppression de "le fait que" (lourd), des relatives inutiles ("qui sont", "qui est"), de "quelque chose qui est".</p>`,
  },
  // ─── Partie 4 : Rédaction et productions écrites ──────────────────────────
  {
    order: 15, series: "ALL",
    title: "Leçon 12 : Rédaction d'une lettre argumentative ou informative",
    duration: 45, isPremium: false,
    summary: "Maîtriser les codes de la lettre formelle : mise en page, registre, argumentation adaptée au destinataire et à l'objectif de la lettre.",
    keyPoints: `Lettre formelle : communication écrite officielle entre un émetteur et un destinataire institutionnel
Structure obligatoire : lieu/date, nom/adresse de l'émetteur, nom/adresse du destinataire, objet, corps, formule de politesse, signature
Lettre argumentative : défendre une position, convaincre le destinataire d'agir ou de changer d'avis
Lettre informative : transmettre des informations de façon claire et structurée
Ton : soutenu, neutre, poli — éviter l'agressivité même en cas de réclamation
Registre de langue : toujours soutenu ou courant en lettre formelle
Formules de politesse : "Veuillez agréer, Monsieur/Madame, l'expression de mes sincères salutations" (formule la plus courante)
L'objet : une ligne précise qui résume le motif de la lettre
Adaptation au destinataire : registre, arguments et ton varient selon le destinataire (directeur d'école, ministre, rédacteur de journal)`,
    content: `<h2>La Lettre Argumentative et Informative</h2>
<h3>I. Structure d'une lettre formelle</h3>
<table border="1" cellpadding="5" style="border-collapse:collapse;width:100%">
  <tr><th>Élément</th><th>Emplacement</th><th>Contenu</th></tr>
  <tr><td>Coordonnées de l'émetteur</td><td>Haut gauche</td><td>Nom, prénom, adresse, téléphone, email</td></tr>
  <tr><td>Coordonnées du destinataire</td><td>Haut droite</td><td>Titre, nom, adresse de l'organisation</td></tr>
  <tr><td>Lieu et date</td><td>Haut droite (sous destinataire)</td><td>Abidjan, le 10 avril 2026</td></tr>
  <tr><td>Objet</td><td>Centré ou à gauche</td><td>Objet : Demande de bourse scolaire</td></tr>
  <tr><td>Formule d'appel</td><td>Début du corps</td><td>Monsieur le Directeur / Madame la Ministre</td></tr>
  <tr><td>Corps de la lettre</td><td>Milieu</td><td>Paragraphes organisés : contexte → argumentation → demande</td></tr>
  <tr><td>Formule de politesse</td><td>Avant signature</td><td>Phrase de congé respectueuse</td></tr>
  <tr><td>Signature</td><td>Bas droite</td><td>Prénom et nom, éventuellement cachet</td></tr>
</table>
<h3>II. La lettre argumentative</h3>
<p>La lettre argumentative vise à <strong>convaincre</strong> le destinataire d'adopter une position ou d'effectuer une action. Elle se structure comme une argumentation :</p>
<ol>
  <li><strong>Contexte :</strong> rappeler pourquoi on écrit (situation, problème)</li>
  <li><strong>Thèse :</strong> énoncer clairement la position ou la demande</li>
  <li><strong>Arguments :</strong> 2 à 3 arguments développés, chacun illustré et justifié</li>
  <li><strong>Conclusion/Demande :</strong> formuler précisément l'action attendue du destinataire</li>
</ol>
<h3>III. Formules de politesse selon le destinataire</h3>
<ul>
  <li><strong>Supérieur hiérarchique :</strong> "Veuillez agréer, Monsieur le Directeur, l'expression de mon profond respect."</li>
  <li><strong>Personnalité officielle :</strong> "Je vous prie d'agréer, Madame la Ministre, l'assurance de ma très haute considération."</li>
  <li><strong>Correspondant ordinaire :</strong> "Veuillez agréer, Monsieur/Madame, mes sincères salutations."</li>
</ul>
<h3>IV. La lettre informative</h3>
<p>La lettre informative transmet des faits ou des informations de façon claire et organisée. Elle suit la même structure mais son corps est organisé par points d'information numérotés ou par paragraphes thématiques, sans argumentation polémique.</p>`,
    examples: `<p><strong>Exemple de lettre argumentative :</strong><br>
Sujet : "Écrivez une lettre au directeur de votre école pour lui demander d'améliorer les conditions de la bibliothèque."</p>
<p><strong>Argument 1 :</strong> La bibliothèque dispose de moins de 200 ouvrages pour 800 élèves, ce qui rend impossible un travail de recherche sérieux dans les matières littéraires.<br>
<strong>Argument 2 :</strong> L'éclairage défectueux nuit à la santé visuelle des élèves et les décourage de fréquenter ce lieu pourtant essentiel.<br>
<strong>Demande :</strong> Je vous prie de bien vouloir envisager l'acquisition d'une centaine d'ouvrages de référence et la réfection de l'éclairage avant la rentrée prochaine.</p>`,
  },
  {
    order: 16, series: "ALL",
    title: "Leçon 13 : Rédaction d'un article de journal ou texte de presse",
    duration: 45, isPremium: false,
    summary: "Comprendre les codes de l'écriture journalistique : types d'articles, structure en pyramide inversée, style journalistique, titraille et énonciation.",
    keyPoints: `Article de presse : texte informatif ou d'opinion publié dans un journal ou une revue
Genres journalistiques : reportage, interview, chronique, éditorial, brève, portrait, tribune libre
Structure en pyramide inversée : information la plus importante d'abord → détails ensuite
5W (Who/What/When/Where/Why) : les cinq questions auxquelles doit répondre tout article d'information
Titraille : chapeau (lead), titre, intertitre, légende — chaque élément a un rôle précis
Style journalistique : phrases courtes, vocabulaire précis, verbes actifs, pas de jargon inutile
Article d'opinion (éditorial, tribune) : défend une position, diffère du reportage (qui informe)
Objectivité vs subjectivité : le journaliste d'information vise l'objectivité ; le chroniqueur assume sa subjectivité
Sources : citer ses sources renforce la crédibilité (selon un rapport de… / d'après une étude de…)`,
    content: `<h2>L'Article de Journal et le Texte de Presse</h2>
<h3>I. Les genres journalistiques</h3>
<table border="1" cellpadding="5" style="border-collapse:collapse;width:100%">
  <tr><th>Genre</th><th>Objectif</th><th>Registre</th></tr>
  <tr><td>Reportage</td><td>Relater un événement de façon factuelle</td><td>Objectif, neutre</td></tr>
  <tr><td>Brève</td><td>Informer rapidement en peu de mots</td><td>Concis, factuel</td></tr>
  <tr><td>Interview</td><td>Recueillir et publier les propos d'une personnalité</td><td>Neutre + direct</td></tr>
  <tr><td>Portrait</td><td>Décrire une personnalité de façon vivante</td><td>Vivant, descriptif</td></tr>
  <tr><td>Éditorial</td><td>Exprimer le point de vue de la rédaction</td><td>Engagé, argumentatif</td></tr>
  <tr><td>Tribune libre / Chronique</td><td>Donner son opinion personnelle</td><td>Subjectif, littéraire</td></tr>
</table>
<h3>II. La structure en pyramide inversée</h3>
<p>L'article d'information commence par l'essentiel et descend vers les détails :</p>
<ol>
  <li><strong>Chapeau (lead) :</strong> résumé de l'article en 2-3 lignes, répond aux 5W</li>
  <li><strong>Corps :</strong> développement par ordre d'importance décroissante</li>
  <li><strong>Détails/contexte :</strong> informations complémentaires, citations, données chiffrées</li>
</ol>
<h3>III. Les 5W du journalisme</h3>
<ul>
  <li><strong>Who :</strong> Qui est concerné ?</li>
  <li><strong>What :</strong> Que s'est-il passé ?</li>
  <li><strong>When :</strong> Quand ?</li>
  <li><strong>Where :</strong> Où ?</li>
  <li><strong>Why :</strong> Pourquoi ? (parfois + How : comment ?)</li>
</ul>
<h3>IV. Style journalistique</h3>
<ul>
  <li><strong>Phrases courtes :</strong> une idée = une phrase</li>
  <li><strong>Verbes actifs :</strong> "Le gouvernement a annoncé" plutôt que "Il a été annoncé par le gouvernement"</li>
  <li><strong>Citations :</strong> toujours entre guillemets avec attribution claire ("selon le ministre…", "a déclaré…")</li>
  <li><strong>Chiffres précis :</strong> "3 millions de FCFA" plutôt que "beaucoup d'argent"</li>
  <li><strong>Titre accrocheur :</strong> bref, informatif ou provocateur selon le type d'article</li>
</ul>`,
    examples: `<p><strong>Exemple de chapeau (lead) :</strong><br>
"Le lycée Moderne de Cocody a accueilli jeudi 9 avril plus de 500 candidats au concours d'entrée en classe de Terminale. Cette année, les épreuves de mathématiques et de français ont été jugées 'particulièrement difficiles' par plusieurs correcteurs interrogés par notre rédaction."</p>
<p>→ Who : 500 candidats. What : concours d'entrée. When : jeudi 9 avril. Where : lycée Moderne de Cocody. Why : sélection pour la Terminale. How : épreuves jugées difficiles.</p>`,
  },
  {
    order: 17, series: "ALL",
    title: "Leçon 14 : Rédaction d'un texte argumentatif sur un sujet de société",
    duration: 50, isPremium: false,
    summary: "Rédiger un texte argumentatif complet sur un sujet de société : thèse, concession, réfutation, exemples et conclusion engagée.",
    keyPoints: `Texte argumentatif : vise à défendre une thèse sur un problème réel ou de société
Thèse : position claire et défendue avec des arguments et des exemples
Concession : reconnaître la part de vérité dans la position adverse (prouve l'honnêteté intellectuelle)
Réfutation : montrer pourquoi la position adverse est insuffisante ou fausse
Argumentation en 3 temps : thèse → concession-réfutation → conclusion renforcée
Exemples : faits d'actualité, statistiques, œuvres littéraires, événements historiques
Sujets de société courants : l'éducation des filles, l'environnement, les réseaux sociaux, la démocratie
Ton : convaincant mais mesuré — éviter l'extrémisme ou la langue de bois
Engagement : un texte argumentatif suppose une prise de position claire, assumée, argumentée`,
    content: `<h2>Le Texte Argumentatif sur un Sujet de Société</h2>
<h3>I. Définition et objectif</h3>
<p>Un texte argumentatif vise à <strong>défendre une position</strong> sur un problème réel : un enjeu social, politique, éducatif, culturel ou environnemental. Il s'adresse à un lecteur qu'il faut convaincre ou persuader.</p>
<h3>II. Structure type</h3>
<ol>
  <li><strong>Introduction :</strong> présenter le sujet de société → formuler la problématique → annoncer la thèse</li>
  <li><strong>Argument 1 + exemple :</strong> premier argument fort avec illustration précise</li>
  <li><strong>Argument 2 + exemple :</strong> deuxième argument</li>
  <li><strong>Concession :</strong> reconnaître une limite ou objection valide à sa thèse</li>
  <li><strong>Réfutation :</strong> montrer pourquoi cette objection ne remet pas en cause la thèse</li>
  <li><strong>Conclusion :</strong> bilan + réaffirmation de la thèse + appel à l'action ou ouverture</li>
</ol>
<h3>III. La concession-réfutation</h3>
<p>La concession-réfutation est le signe d'une pensée nuancée et honnête. Structure :</p>
<ul>
  <li><strong>Concession :</strong> "Certes / Il est vrai que / On peut admettre que… [point valide de l'adversaire]"</li>
  <li><strong>Réfutation :</strong> "Cependant / Néanmoins / Mais… [argument qui dépasse la concession]"</li>
</ul>
<h3>IV. Articulateurs d'un texte argumentatif</h3>
<table border="1" cellpadding="5" style="border-collapse:collapse;width:100%">
  <tr><th>Fonction</th><th>Exemples de connecteurs</th></tr>
  <tr><td>Introduire un argument</td><td>Premièrement, D'abord, Tout d'abord, En premier lieu</td></tr>
  <tr><td>Ajouter un argument</td><td>De plus, En outre, Par ailleurs, Ensuite</td></tr>
  <tr><td>Opposer / Concéder</td><td>Certes, Il est vrai que, Cependant, Toutefois, En revanche</td></tr>
  <tr><td>Illustrer</td><td>Ainsi, Par exemple, C'est le cas de, Notamment</td></tr>
  <tr><td>Conclure</td><td>En conclusion, En définitive, Finalement, Ainsi</td></tr>
</table>
<h3>V. Sujets de société au programme</h3>
<ul>
  <li>La scolarisation des filles en Afrique subsaharienne</li>
  <li>L'impact des réseaux sociaux sur la jeunesse</li>
  <li>Le changement climatique et la responsabilité africaine</li>
  <li>La démocratie et ses défis en Afrique</li>
  <li>Le rapport entre tradition et modernité dans les sociétés africaines</li>
</ul>`,
    examples: `<p><strong>Sujet :</strong> "Les réseaux sociaux sont-ils un danger pour la jeunesse africaine ?"</p>
<p><strong>Thèse :</strong> Les réseaux sociaux constituent un danger réel pour la jeunesse africaine s'ils ne sont pas utilisés de façon critique et maîtrisée.</p>
<p><strong>Arg. 1 :</strong> Ils favorisent la dépendance et la dispersion — de nombreux élèves passent plusieurs heures par jour sur TikTok ou Instagram au détriment du travail scolaire.</p>
<p><strong>Arg. 2 :</strong> Ils exposent à la désinformation — les fausses nouvelles (fake news) se propagent plus vite que les vérités vérifiées, créant des représentations erronées du monde.</p>
<p><strong>Concession :</strong> Certes, les réseaux sociaux ont permis à de nombreux jeunes entrepreneurs africains de lancer des activités et de se faire connaître à l'échelle mondiale.</p>
<p><strong>Réfutation :</strong> Cependant, ces bénéfices ne concernent qu'une minorité d'utilisateurs conscients et formés ; pour la majorité, la consommation passive des contenus demeure prédominante.</p>`,
  },
  {
    order: 18, series: "ALL",
    title: "Leçon 15 : Révision et préparation au baccalauréat",
    duration: 60, isPremium: false,
    summary: "Consolider les compétences essentielles pour le baccalauréat de français : épreuves, stratégies de révision, gestion du temps et des erreurs fréquentes.",
    keyPoints: `Épreuves de français au BAC ivoirien : composition écrite + épreuve orale
Épreuve écrite : commentaire composé, dissertation littéraire ou résumé + questionnaire de texte
Épreuve orale : présentation d'un texte étudié + entretien avec l'examinateur
Gestion du temps : 30 min pour lire et analyser, 30 min pour le plan, 1h30 pour la rédaction, 30 min pour la révision
Erreurs fréquentes : hors-sujet, manque d'exemples, paraphrase (résumé au lieu d'analyser), introduction trop courte
Stratégie de révision : revoir les œuvres étudiées (passages clés + auteur + contexte + thèmes), les définitions des figures de style et les règles de grammaire
Lors de l'examen : lire tout le sujet avant de commencer, choisir le sujet maîtrisé, planifier au brouillon
Conseils oral : parler clairement, regarder l'examinateur, ne pas lire ses notes, montrer l'enthousiasme pour les textes`,
    content: `<h2>Révision et Préparation au Baccalauréat</h2>
<h3>I. Structure des épreuves de français au BAC</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Épreuve</th><th>Durée</th><th>Nature</th></tr>
  <tr><td>Écrit</td><td>4 heures</td><td>Commentaire composé OU dissertation littéraire + questions de langue/grammaire</td></tr>
  <tr><td>Oral</td><td>20-30 min</td><td>Présentation d'un texte étudié + entretien avec l'examinateur</td></tr>
</table>
<h3>II. Gestion du temps à l'écrit</h3>
<table border="1" cellpadding="5" style="border-collapse:collapse;width:100%">
  <tr><th>Phase</th><th>Durée recommandée</th></tr>
  <tr><td>Lecture du sujet et choix</td><td>15-20 minutes</td></tr>
  <tr><td>Analyse, plan au brouillon</td><td>30-40 minutes</td></tr>
  <tr><td>Rédaction</td><td>2h15 – 2h30</td></tr>
  <tr><td>Relecture et correction</td><td>20-30 minutes</td></tr>
</table>
<h3>III. Erreurs fréquentes et comment les éviter</h3>
<ul>
  <li><strong>Hors-sujet :</strong> analyser le sujet mot par mot avant de commencer ; reformuler le sujet en ses propres termes.</li>
  <li><strong>Paraphrase :</strong> ne jamais se contenter de répéter le texte ; toujours analyser et interpréter.</li>
  <li><strong>Absence d'exemples :</strong> chaque argument doit être illustré par un exemple précis (auteur, œuvre, passage).</li>
  <li><strong>Introduction trop courte :</strong> l'introduction doit comporter accroche + présentation + problématique + annonce du plan.</li>
  <li><strong>Conclusion absente :</strong> même brève, la conclusion est obligatoire et doit répondre à la problématique.</li>
</ul>
<h3>IV. Stratégie de révision efficace</h3>
<ol>
  <li><strong>Revoir les œuvres au programme :</strong> fiche par œuvre (auteur, contexte, thèmes, passages clés, procédés)</li>
  <li><strong>Maîtriser les figures de style :</strong> les définir, les reconnaître et les analyser</li>
  <li><strong>Revoir les règles grammaticales délicates :</strong> accord du participe passé, subjonctif, temps du récit</li>
  <li><strong>S'entraîner sur des sujets d'annales :</strong> faire un plan complet en temps limité</li>
  <li><strong>Préparer l'oral :</strong> choisir 5-6 textes à fond et préparer une présentation minutée (10 min)</li>
</ol>
<h3>V. Conseils pour l'épreuve orale</h3>
<ul>
  <li>Parler distinctement et sans lire ses notes (regard vers l'examinateur)</li>
  <li>Structurer clairement : annoncer le plan oral ("Je vous présenterai d'abord… puis j'analyserai… enfin je montrerai…")</li>
  <li>Citer des passages précis du texte de mémoire (pas forcément mot à mot)</li>
  <li>Montrer un intérêt sincère pour le texte : l'examinateur évalue l'enthousiasme et la réflexion personnelle</li>
  <li>En cas de trou de mémoire : reformuler la question, réfléchir à voix haute</li>
</ul>`,
    examples: `<p><strong>Fiche de révision type — L'Enfant noir (Camara Laye) :</strong><br>
• Auteur : Camara Laye (Guinéen, 1928-1980)<br>
• Œuvre : L'Enfant noir (1953) — roman autobiographique<br>
• Genre : récit d'enfance / autobiographie<br>
• Thèmes : mémoire de l'enfance, tradition africaine, initiation, conflit tradition/modernité, nostalgie<br>
• Passages clés : scène de la forge (père et génie du fer), nuit de l'initiation, départ pour Paris<br>
• Procédés : focalisation interne, imparfait d'habitude, champ lexical de la lumière et du feu, discours indirect libre<br>
• Citation à retenir : "Mon père était forgeron, et l'art de la forge est un art secret, l'art de travailler avec le feu."</p>`,
  },
];

const francaisExercises = [
  // Leçon 1
  { lo: 4, q: "Dans une lecture méthodique, la 'focalisation interne' signifie que :", t: "mcq", d: "easy", o: ["Le narrateur est extérieur et observe les personnages de l'extérieur", "Le narrateur raconte depuis l'intérieur d'un personnage, avec accès à ses pensées", "Le narrateur est omniscient et sait tout sur tous", "Le narrateur est le personnage principal et parle à la première personne"], a: "Le narrateur raconte depuis l'intérieur d'un personnage, avec accès à ses pensées", e: "La focalisation interne signifie que le récit est filtré par le point de vue (et la subjectivité) d'un personnage. Le lecteur accède aux pensées et aux émotions de ce personnage mais ne sait que ce que ce personnage sait. C'est le cas du journal intime et de nombreux récits à la première personne." },
  { lo: 4, q: "Pour l'épreuve orale de français, la première étape de la présentation est de situer le texte (auteur, œuvre, contexte).", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "La présentation orale d'un texte commence toujours par la contextualisation : qui est l'auteur ? dans quelle œuvre ce texte s'inscrit-il ? à quelle époque et dans quel contexte littéraire ou historique ? Cette mise en contexte est essentielle pour montrer à l'examinateur que vous avez compris le texte dans sa globalité avant d'entrer dans l'analyse." },
  { lo: 4, q: "Le registre 'polémique' dans un texte littéraire se caractérise par :", t: "mcq", d: "medium", o: ["L'expression de sentiments amoureux intenses", "Une attaque virulente contre une personne ou une idée", "La célébration d'exploits héroïques", "La volonté d'instruire et d'expliquer"], a: "Une attaque virulente contre une personne ou une idée", e: "Le registre polémique (du grec polemos : guerre) est caractérisé par un ton agressif et combatif : l'auteur attaque, accuse, réfute ou dénonce. On le reconnaît aux questions rhétoriques, aux hyperboles péjoratives, aux interpellations directes et à l'ironie mordante. Exemple : les pamphlets politiques, certains articles de presse d'opinion engagée." },
  // Leçon 2
  { lo: 5, q: "Dans un résumé de texte, il est autorisé de citer mot à mot des passages entre guillemets.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Faux", e: "Le résumé exige une reformulation totale : on ne cite jamais le texte original entre guillemets. Le but est de montrer qu'on a compris et qu'on est capable de restituer les idées dans ses propres mots. Copier des passages du texte, même brièvement, est une faute rédhibitoire dans un résumé." },
  { lo: 5, q: "Un résumé de texte doit respecter :", t: "mcq", d: "easy", o: ["L'ordre des idées du texte original", "Un ordre librement choisi par le rédacteur", "Un plan en 3 parties obligatoirement", "La chronologie des événements réels"], a: "L'ordre des idées du texte original", e: "Un résumé doit refléter la structure du texte original — on ne réorganise pas les idées selon ses propres préférences. Modifier l'ordre, c'est trahir la progression logique de l'auteur et donc son raisonnement. Le résumé est une version réduite et fidèle du texte, pas une réorganisation personnelle." },
  { lo: 5, q: "Pour résumer un texte argumentatif à un quart de sa longueur, quelle est la première étape ?", t: "mcq", d: "medium", o: ["Commencer à écrire immédiatement", "Lire entièrement le texte et identifier la thèse et les arguments", "Supprimer tous les exemples et les illustrations", "Traduire le texte dans un registre familier"], a: "Lire entièrement le texte et identifier la thèse et les arguments", e: "Avant d'écrire une seule ligne, il faut comprendre le texte dans son ensemble : Quelle est la thèse centrale ? Quels sont les arguments principaux ? Comment le texte est-il structuré ? Cette phase d'analyse est indispensable pour pouvoir ensuite reformuler de façon fidèle et proportionnée." },
  // Leçon 3
  { lo: 6, q: "Dans un commentaire composé, une citation non analysée est :", t: "mcq", d: "easy", o: ["Un signe de bonne culture littéraire", "Une erreur méthodologique", "Suffisante pour illustrer l'argument", "Appréciée par les correcteurs"], a: "Une erreur méthodologique", e: "Une citation doit toujours être suivie d'une analyse qui explique ce que l'auteur fait avec cet extrait (procédé utilisé) et l'effet produit (interprétation). Citer sans analyser, c'est faire de la paraphrase déguisée. La formule gagnante : nommer le procédé → citer → analyser → interpréter." },
  { lo: 6, q: "Le 'projet de lecture' d'un commentaire composé est l'idée directrice qui organise toute l'analyse.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "Le projet de lecture (parfois appelé 'thèse du commentaire' ou 'axe directeur') est la réponse à la question : que veut démontrer ce commentaire ? C'est l'idée forte qui donne une cohérence à toutes les parties. Il est annoncé dans l'introduction et vérifié dans la conclusion. Sans projet de lecture, le commentaire est une succession d'observations sans fil directeur." },
  { lo: 6, q: "Le registre 'lyrique' dans un texte se caractérise principalement par :", t: "mcq", d: "easy", o: ["La présence de dialogues dramatiques entre personnages", "L'expression des sentiments personnels de l'auteur/narrateur", "La description d'événements héroïques et grandioses", "Un ton neutre et objectif"], a: "L'expression des sentiments personnels de l'auteur/narrateur", e: "Le registre lyrique est associé à l'expression intense et personnelle des émotions : amour, mélancolie, nostalgie, exaltation. On le reconnaît à l'usage du 'je', à la présence de figures d'analogie (métaphores, comparaisons), à la musicalité du langage et à l'expressivité des sentiments. La poésie romantique et la Négritude sont des exemples canoniques." },
  // Leçon 4
  { lo: 7, q: "Dans une dissertation littéraire, la problématique doit :", t: "mcq", d: "easy", o: ["Répondre directement à la question du sujet dès l'introduction", "Révéler la tension ou le débat que pose le sujet et guider toute la réflexion", "Résumer le plan du devoir en une phrase", "Donner l'opinion personnelle de l'élève"], a: "Révéler la tension ou le débat que pose le sujet et guider toute la réflexion", e: "La problématique est la question philosophique ou littéraire centrale qui montre qu'il y a un vrai problème à résoudre — une tension entre deux positions légitimes. Elle ne doit pas être trop facile (pas de réponse évidente) ni trop vague. Elle organise toute la réflexion : les parties de la dissertation sont des réponses partielles et progressives à cette question." },
  { lo: 7, q: "Un argument en dissertation littéraire sans exemple d'œuvre est considéré comme incomplet.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "En dissertation littéraire, chaque argument doit être illustré par un exemple précis tiré d'une ou plusieurs œuvres littéraires étudiées (ou de culture générale). Un argument sans exemple reste abstrait et non convaincant. La structure requise est : thèse (affirmation) → exemple précis (auteur, œuvre, passage) → analyse de l'exemple → lien avec la thèse." },
  { lo: 7, q: "Le plan dialectique d'une dissertation suit la structure :", t: "mcq", d: "easy", o: ["Description / Narration / Argumentation", "Thèse / Antithèse / Synthèse", "Introduction / Développement / Conclusion", "Problème / Causes / Solutions"], a: "Thèse / Antithèse / Synthèse", e: "Le plan dialectique (ou hégélien) part d'une position (thèse), la confronte à une position opposée (antithèse), puis dépasse les deux dans une synthèse qui intègre ce qu'il y avait de vrai dans chacune. Ce plan est adapté aux sujets qui opposent deux visions : 'La littérature doit-elle être engagée ou est-elle libre de tout engagement ?' → I. La littérature engagée / II. La littérature pour l'art / III. Une synthèse possible." },
  // Leçon 5
  { lo: 8, q: "La stichomythie au théâtre désigne :", t: "mcq", d: "medium", o: ["Un long monologue du personnage principal", "Un échange rapide de répliques courtes entre deux personnages", "La liste des personnages en début de pièce", "Les indications scéniques de l'auteur"], a: "Un échange rapide de répliques courtes entre deux personnages", e: "La stichomythie (du grec stikhos : vers + muthia : conversation) est un procédé dramatique où deux personnages échangent des répliques d'un vers (ou d'une courte phrase) chacun. Ce rythme haché crée une tension dramatique intense, une impression d'affrontement verbal ou de conflit qui s'accélère. On la retrouve souvent dans les moments de crise ou de dispute." },
  { lo: 8, q: "Dans une tragédie classique (XVIIe siècle), le dénouement est toujours heureux.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Faux", e: "C'est précisément le contraire. La tragédie classique se caractérise par un dénouement malheureux — généralement la mort du héros ou la destruction de ce qu'il aimait. Le héros tragique est confronté à une fatalité (destin, faute originelle) contre laquelle il lutte et perd. Le dénouement heureux est la caractéristique de la comédie, pas de la tragédie." },
  { lo: 8, q: "Dans Monsieur Thôgô-gnini de Bernard Dadié, le personnage principal est présenté comme :", t: "mcq", d: "medium", o: ["Un héros courageux qui résiste au colonialisme", "Un commerçant africain corrompu qui imite servilement les colonisateurs", "Un philosophe qui réfléchit à l'avenir de l'Afrique", "Une victime innocente du système colonial"], a: "Un commerçant africain corrompu qui imite servilement les colonisateurs", e: "Thôgô-gnini est un 'collaborateur' colonial — il profite du système colonial en imitant les Européens et en trahissant sa propre communauté. Bernard Dadié le présente avec une ironie cinglante : ce personnage qui croit s'élever en imitant les colonisateurs révèle en réalité sa propre déchéance. C'est une satire sociale et politique du phénomène de l'aliénation coloniale." },
  // Leçon 6
  { lo: 9, q: "Un alexandrin est un vers de :", t: "mcq", d: "easy", o: ["8 syllabes", "10 syllabes", "12 syllabes", "14 syllabes"], a: "12 syllabes", e: "L'alexandrin est le vers classique de la poésie française : 12 syllabes, divisé par une césure (pause) au milieu (6//6). Il a été dominant du XVIIe au XIXe siècle (Racine, Hugo, Lamartine). La règle du compte de syllabes exige de prendre en compte le 'e muet' en fin de mot (il compte s'il est avant une consonne, ne compte pas devant une voyelle ou en fin de vers)." },
  { lo: 9, q: "Le mouvement de la Négritude revendique la supériorité culturelle africaine sur les cultures occidentales.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Faux", e: "La Négritude ne revendique pas la supériorité des cultures africaines, mais leur égale valeur et leur dignité face au mépris colonial. Senghor, Césaire et Damas affirment la beauté, la richesse et la validité des cultures africaines et antillaises — non pour les hisser 'au-dessus' des cultures occidentales, mais pour les réhabiliter après des siècles de dévalorisation coloniale." },
  { lo: 9, q: "L'oxymore est une figure de style qui :", t: "mcq", d: "easy", o: ["Répète un mot en début de plusieurs vers", "Associe deux termes de sens contraire", "Remplace un nom par un autre qui lui est associé", "Exagère volontairement la réalité"], a: "Associe deux termes de sens contraire", e: "L'oxymore (ou oxymoron) unit dans une même expression deux termes qui semblent se contredire, créant un effet de surprise et révélant une vérité paradoxale. Exemples célèbres : 'cette obscure clarté' (Corneille), 'douce violence', 'beau monstre', 'soleil noir'. En poésie africaine : 'la beauté des larmes', pour évoquer la dignité dans la souffrance." },
  // Leçon 7
  { lo: 10, q: "La focalisation omnisciente dans un roman signifie que :", t: "mcq", d: "easy", o: ["Le narrateur ne connaît que les actes extérieurs des personnages", "Le narrateur a accès aux pensées et aux sentiments de tous les personnages", "Le récit est raconté à la première personne par le héros", "Le lecteur sait plus de choses que le narrateur"], a: "Le narrateur a accès aux pensées et aux sentiments de tous les personnages", e: "La focalisation zéro (ou omnisciente) donne au narrateur une connaissance totale : il sait ce que pensent tous les personnages, ce qui s'est passé avant et ce qui surviendra après. C'est la focalisation des romans réalistes classiques (Balzac, Flaubert) et de nombreux romans africains. Elle confère une impression de maîtrise et d'autorité narrative." },
  { lo: 10, q: "Le discours indirect libre se caractérise par le fait qu'il mêle la voix du narrateur et la voix du personnage sans outil de discours formel.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "Le discours indirect libre (DIL) est une forme hybride : il intègre les pensées ou paroles d'un personnage dans le récit du narrateur sans guillemets ni 'il dit que'. On reconnaît le DIL à la présence de marques subjectives (adverbes, questions, exclamations) à l'intérieur d'un passage narratif (usage du passé). Ex. : 'Il rentra chez lui. À quoi bon continuer ? La vie ne valait rien.' (les deux dernières phrases sont en DIL)." },
  { lo: 10, q: "Dans Une si longue lettre de Mariama Bâ, le genre littéraire utilisé est :", t: "mcq", d: "easy", o: ["Le théâtre (pièce en 3 actes)", "Le roman épistolaire (échanges de lettres)", "L'autobiographie classique", "Le récit de voyage"], a: "Le roman épistolaire (échanges de lettres)", e: "Une si longue lettre (1979) est un roman épistolaire : il est entièrement constitué de la longue lettre que Ramatoulaye écrit à son amie Aïssatou, après la mort de son mari et la douleur de la polygamie subie. Le genre épistolaire (lettre) permet à Mariama Bâ de donner voix à l'intimité et à la réflexion intérieure d'une femme sénégalaise, ce qui constitue en soi un acte littéraire et féministe." },
  // Leçon 8
  { lo: 11, q: "Le pacte autobiographique (Philippe Lejeune) est respecté quand :", t: "mcq", d: "medium", o: ["L'auteur invente librement des événements dans son récit de vie", "L'auteur, le narrateur et le personnage principal sont la même personne (même nom)", "Le texte est présenté comme un roman même s'il s'inspire de la réalité", "Le lecteur accepte de ne pas vérifier les faits racontés"], a: "L'auteur, le narrateur et le personnage principal sont la même personne (même nom)", e: "Philippe Lejeune définit le pacte autobiographique comme le contrat implicite entre l'auteur et le lecteur : il y a identité entre l'auteur (personne réelle qui signe le livre), le narrateur (qui dit 'je' dans le récit) et le personnage principal (qui vit les aventures racontées). Ce pacte engage l'auteur à la vérité factuelle de ce qu'il raconte." },
  { lo: 11, q: "L'autofiction se distingue de l'autobiographie parce qu'elle mélange délibérément faits réels et éléments fictifs.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "L'autofiction (terme inventé par Serge Doubrovsky en 1977) désigne un récit où l'auteur utilise son propre nom et des éléments autobiographiques réels, mais les mélange consciemment avec des éléments inventés ou recomposés. Le contrat de lecture est différent : le lecteur ne peut pas distinguer le vrai du fictif. C'est une forme hybride entre autobiographie et roman." },
  { lo: 11, q: "Dans L'Aventure ambiguë de Cheikh Hamidou Kane, le personnage de Samba Diallo incarne :", t: "mcq", d: "medium", o: ["Un colon français qui découvre l'Afrique", "Un jeune Sénégalais déchiré entre culture traditionnelle coranique et modernité occidentale", "Un militant politique qui combat le colonialisme par les armes", "Un enfant africain qui refuse toute éducation étrangère"], a: "Un jeune Sénégalais déchiré entre culture traditionnelle coranique et modernité occidentale", e: "Samba Diallo est le héros romanesque de L'Aventure ambiguë (1961) : brillant élève formé à l'école coranique, il est envoyé en France pour étudier la philosophie occidentale. Il vit un déchirement existentiel entre deux visions du monde incompatibles — la tradition spirituelle africano-islamique et la rationalité moderne occidentale. Ce déchirement intérieur symbolise celui de toute une génération d'intellectuels africains post-coloniaux." },
  // Leçon 9
  { lo: 12, q: "Le participe passé 'vu' dans la phrase 'Les films que j'ai vus' s'accorde au masculin pluriel parce que :", t: "mcq", d: "medium", o: ["Le verbe 'voir' est un verbe de perception qui s'accorde toujours", "Le COD 'films' est placé avant le verbe et est masculin pluriel", "Le sujet 'je' est masculin", "Les films sont masculin pluriel en tant que nom"], a: "Le COD 'films' est placé avant le verbe et est masculin pluriel", e: "Avec l'auxiliaire 'avoir', le participe passé s'accorde avec le COD uniquement si celui-ci est placé AVANT le verbe. Dans 'les films que j'ai vus', 'que' est le pronom relatif COD, mis pour 'les films' (masculin pluriel) — il est placé avant 'ai vus' → accord : 'vus'. Si le COD est après le verbe ('j'ai vu des films'), il n'y a pas d'accord." },
  { lo: 12, q: "Le passé simple est le temps du récit littéraire utilisé pour les actions ponctuelles et délimitées.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "Le passé simple est le temps narratif de base dans le roman et le conte français classique. Il indique une action achevée, ponctuelle et délimitée dans le temps passé ('Il entra dans la salle'). Il s'oppose à l'imparfait qui exprime la durée, la description et l'habitude ('Il entrait toujours par la grande porte'). Dans la littérature africaine contemporaine, certains auteurs utilisent le présent de narration pour donner plus d'immédiateté." },
  { lo: 12, q: "La ponctuation 'deux-points' ( : ) sert principalement à :", t: "mcq", d: "easy", o: ["Séparer des propositions indépendantes de longueur équivalente", "Annoncer une explication, une liste ou une citation", "Marquer une opposition entre deux idées", "Indiquer une pause légère dans une énumération"], a: "Annoncer une explication, une liste ou une citation", e: "Les deux-points annoncent toujours ce qui suit : une explication de ce qui précède ('Il était fatigué : il avait marché toute la journée'), une énumération ('Les genres littéraires : le roman, la poésie, le théâtre, l'essai') ou une citation en discours direct ('Il dit : \"Je reviendrai demain.\"'). Ne pas confondre avec le point-virgule qui sépare deux propositions indépendantes mais liées logiquement." },
  // Leçon 10
  { lo: 13, q: "La métaphore se distingue de la comparaison par :", t: "mcq", d: "easy", o: ["La présence d'un outil comparatif explicite (comme, tel, ainsi que)", "L'absence d'outil comparatif — le rapprochement est direct et implicite", "Le fait qu'elle porte toujours sur des éléments de la nature", "Sa longueur (plus courte que la comparaison)"], a: "L'absence d'outil comparatif — le rapprochement est direct et implicite", e: "La comparaison dit explicitement le rapprochement ('Il est brave comme un lion') avec un outil comparatif. La métaphore supprime l'outil comparatif et identifie directement les deux termes ('C'est un lion sur le terrain de foot'). La métaphore est plus condensée et plus puissante stylistiquement car elle crée une identification totale, pas seulement une ressemblance." },
  { lo: 13, q: "L'anaphore est une figure de style qui consiste à répéter un terme ou un groupe de termes en fin de phrase ou de vers.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Faux", e: "L'anaphore répète un terme ou un groupe en DÉBUT de phrases ou de vers (pas en fin). Ex. : 'J'ai rêvé de toi, j'ai rêvé de tes mains, j'ai rêvé de ta voix.' La répétition en FIN de phrase ou de vers s'appelle épiphore (ou épistrophe). Ces deux figures créent un effet d'insistance ou d'incantation, fréquent dans la poésie de la Négritude (Senghor, Césaire)." },
  { lo: 13, q: "Dans la rhétorique classique (Aristote), l'ethos désigne :", t: "mcq", d: "medium", o: ["L'appel aux émotions du destinataire", "L'argument logique et rationnel", "L'image de crédibilité et d'autorité que l'orateur projette de lui-même", "Le contexte social et historique du discours"], a: "L'image de crédibilité et d'autorité que l'orateur projette de lui-même", e: "Aristote distingue trois modes de persuasion : l'ethos (la crédibilité de l'orateur — son caractère, son autorité, son honnêteté perçue), le pathos (l'émotion suscitée chez l'auditoire) et le logos (l'argument logique). Un discours convaincant mobilise les trois. Un orateur peut avoir un excellent logos (argument parfait) mais échouer s'il a un mauvais ethos (il n'est pas cru)." },
  // Leçon 11
  { lo: 14, q: "La transformation 'voix active → voix passive' déplace :", t: "mcq", d: "easy", o: ["Le sujet à la fin de la phrase sans autre changement", "Le complément d'objet direct en position sujet et transforme le verbe avec 'être' + participe passé", "L'ordre des mots sans changer le temps du verbe", "Seulement le pronom sujet"], a: "Le complément d'objet direct en position sujet et transforme le verbe avec 'être' + participe passé", e: "La transformation passive suit un mécanisme précis : le COD de la phrase active devient le sujet de la phrase passive ; le verbe se met à la forme 'être + participe passé' (qui s'accorde avec le nouveau sujet) ; le sujet actif devient le complément d'agent introduit par 'par'. Ex. : 'Le chat (sujet) mange (verbe) la souris (COD)' → 'La souris (sujet passif) est mangée (verbe passif) par le chat (agent)'." },
  { lo: 14, q: "Dans le passage du discours direct au discours indirect, le temps 'futur simple' devient :", t: "mcq", d: "medium", o: ["Imparfait", "Conditionnel présent", "Passé composé", "Subjonctif présent"], a: "Conditionnel présent", e: "La concordance des temps dans le passage au discours indirect : présent → imparfait / passé composé → plus-que-parfait / futur simple → conditionnel présent / futur antérieur → conditionnel passé. Ex. : Direct : 'Il dit : \"Je partirai demain.\"' → Indirect : 'Il dit qu'il partirait le lendemain.' (futur → conditionnel ; demain → le lendemain)." },
  { lo: 14, q: "La nominalisation consiste à transformer un verbe ou un adjectif en nom.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "La nominalisation est une opération syntaxique très fréquente dans le français soutenu et académique : on transforme un verbe (développer → développement, analyser → analyse) ou un adjectif (fragile → fragilité, libre → liberté) en un nom. Cela permet des constructions plus concises et abstraites, souvent utilisées dans les textes de presse, les rapports officiels et les dissertations." },
  // Leçon 12
  { lo: 15, q: "Dans une lettre formelle, la 'formule de politesse' se place :", t: "mcq", d: "easy", o: ["Après la date et avant l'objet", "Avant la signature, à la fin de la lettre", "Au début de chaque paragraphe du corps", "Après l'adresse du destinataire"], a: "Avant la signature, à la fin de la lettre", e: "La formule de politesse est la phrase finale du corps de la lettre, juste avant la signature. Elle varie selon le destinataire : plus longue et respectueuse pour un supérieur hiérarchique ou une personnalité officielle, plus simple pour un correspondant ordinaire. Elle ne doit pas être tronquée ou oubliée — son absence est une faute de politesse grave dans la communication formelle." },
  { lo: 15, q: "L'objet d'une lettre formelle est une phrase longue qui résume tous les arguments de la lettre.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Faux", e: "L'objet d'une lettre formelle est au contraire une mention très brève et concise (une ligne) qui indique le motif de la lettre. Ex. : 'Objet : Demande de stage', 'Objet : Réclamation facture n°2547', 'Objet : Candidature au poste d'enseignant'. Il ne résume pas les arguments mais indique immédiatement au destinataire pourquoi on lui écrit, afin de faciliter le traitement de la lettre." },
  { lo: 15, q: "Dans une lettre argumentative adressée à un directeur d'école, le ton doit être :", t: "mcq", d: "easy", o: ["Familier et décontracté pour paraître sympathique", "Agressif pour montrer sa détermination", "Soutenu, respectueux et convaincant", "Identique à un texto ou message sur les réseaux sociaux"], a: "Soutenu, respectueux et convaincant", e: "Une lettre à un supérieur hiérarchique (directeur, ministre, chef d'entreprise) doit adopter un registre soutenu et un ton respectueux, même si le contenu est une réclamation ou une critique. L'agressivité est contre-productive (elle braquerait le destinataire) et le familier est déplacé. L'objectif est de convaincre, ce qui requiert de gagner la confiance et le respect du destinataire." },
  // Leçon 13
  { lo: 16, q: "La structure en 'pyramide inversée' dans le journalisme consiste à :", t: "mcq", d: "easy", o: ["Commencer par les détails et finir par l'information principale", "Commencer par l'information la plus importante et descendre vers les détails", "Construire un plan en 3 parties équilibrées", "Réserver la conclusion pour la fin de l'article"], a: "Commencer par l'information la plus importante et descendre vers les détails", e: "La pyramide inversée est le principe d'organisation de base de l'article de presse informatif : l'information essentielle (qui répond aux 5W) est donnée dès le début (chapeau/lead), puis les détails, les contextes et les précisions viennent ensuite par ordre d'importance décroissante. Cela permet au lecteur pressé de s'arrêter n'importe où en ayant quand même saisi l'essentiel." },
  { lo: 16, q: "Un éditorial de journal est un texte neutre et factuel qui rapporte les événements objectivement.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Faux", e: "L'éditorial est précisément un texte de point de vue : il exprime l'opinion de la rédaction (ou du rédacteur en chef) sur un événement ou un sujet d'actualité. Il se distingue du reportage (qui vise l'objectivité factuelle). L'éditorial assume une subjectivité assumée et argumentée — c'est un texte argumentatif et engagé, pas un texte informatif neutre." },
  { lo: 16, q: "Les '5W' du journalisme désignent les cinq questions fondamentales auxquelles doit répondre tout article d'information. Parmi ces questions, laquelle est absente ?", t: "mcq", d: "medium", o: ["Who (Qui ?)", "What (Quoi ?)", "Why (Pourquoi ?)", "Which (Lequel ?)"], a: "Which (Lequel ?)", e: "Les 5W du journalisme anglophone sont : Who (Qui est concerné ?), What (Que s'est-il passé ?), When (Quand ?), Where (Où ?) et Why (Pourquoi ?). Parfois on ajoute un 6ème : How (Comment ?). 'Which' (lequel) n'est pas une des cinq questions fondamentales. Un chapeau (lead) qui répond à ces 5 questions donne immédiatement l'essentiel de l'information au lecteur." },
  // Leçon 14
  { lo: 17, q: "Dans un texte argumentatif, la 'concession' consiste à :", t: "mcq", d: "easy", o: ["Nier totalement la position adverse", "Reconnaître la part de vérité dans la position adverse avant de la dépasser", "Répéter sa thèse avec force", "Donner uniquement des exemples favorables à sa position"], a: "Reconnaître la part de vérité dans la position adverse avant de la dépasser", e: "La concession est le signe d'une argumentation honnête et nuancée : on admet que la position adverse a une part de validité ('Certes, il est vrai que…') avant de montrer pourquoi cette concession ne remet pas en cause la thèse centrale ('Cependant / néanmoins…'). Cette technique renforce la crédibilité de l'auteur (ethos) et anticipe les objections du lecteur." },
  { lo: 17, q: "Un texte argumentatif peut se passer de conclusion si le développement est suffisamment convaincant.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Faux", e: "La conclusion est une partie obligatoire de tout texte argumentatif. Elle remplit trois fonctions essentielles : faire le bilan du parcours argumentatif (résumer les arguments), réaffirmer la thèse de façon plus nuancée (réponse à la problématique) et ouvrir sur une perspective plus large (question connexe, appel à l'action, ouverture). Un texte sans conclusion paraît inachevé et donne l'impression que l'auteur n'est pas parvenu à conclure sa pensée." },
  { lo: 17, q: "Pour argumenter sur le thème 'Les réseaux sociaux et la jeunesse', quel type de preuve est le plus convaincant ?", t: "mcq", d: "medium", o: ["Des opinions personnelles non vérifiées", "Des statistiques précises, des études citées et des exemples concrets", "Des anecdotes personnelles sans source", "Des jugements moraux généraux sur la jeunesse"], a: "Des statistiques précises, des études citées et des exemples concrets", e: "Dans un texte argumentatif sérieux, les preuves les plus convaincantes sont les données vérifiables (statistiques, études scientifiques), les exemples concrets et précis, et les témoignages d'autorités (experts, institutions reconnues). Les opinions personnelles non vérifiées et les anecdotes sans source constituent des arguments faibles qui n'emportent pas la conviction d'un lecteur critique." },
  // Leçon 15
  { lo: 18, q: "À l'épreuve écrite de français au BAC, quelle est la durée recommandée pour la phase de relecture finale ?", t: "mcq", d: "easy", o: ["5 minutes", "20-30 minutes", "1 heure", "Aucune relecture n'est nécessaire"], a: "20-30 minutes", e: "La relecture est une phase cruciale que les élèves ont tendance à négliger par manque de temps. Il faut y consacrer 20 à 30 minutes : relire pour les fautes d'orthographe et de grammaire, vérifier la cohérence du plan, s'assurer que les citations sont bien référencées, contrôler l'accord des participes passés et la ponctuation. Une copie bien relue peut gagner 1 à 2 points." },
  { lo: 18, q: "La paraphrase est une erreur rédhibitoire dans le commentaire composé parce qu'elle résume le texte sans l'analyser.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "La paraphrase consiste à reprendre le contenu du texte avec d'autres mots, sans analyser les procédés d'écriture ni interpréter le sens profond. C'est une erreur fréquente et sévèrement sanctionnée car elle prouve que l'élève n'a pas compris la démarche analytique. Le commentaire doit toujours aller au-delà de 'ce que dit le texte' pour expliquer 'comment il le dit et pourquoi', c'est-à-dire analyser les choix stylistiques de l'auteur." },
  { lo: 18, q: "Pour l'épreuve orale de français, que doit faire un candidat en cas de trou de mémoire sur un passage précis ?", t: "mcq", d: "medium", o: ["Se taire et attendre que l'examinateur intervienne", "Inventer un passage de l'œuvre", "Reformuler la question à voix haute et réfléchir à voix haute pour montrer sa démarche", "Demander à changer de texte"], a: "Reformuler la question à voix haute et réfléchir à voix haute pour montrer sa démarche", e: "En cas de trou de mémoire, la meilleure stratégie est de reformuler la question pour gagner du temps ('Si je comprends bien, vous me demandez…') et de réfléchir à voix haute pour montrer sa démarche intellectuelle. L'examinateur évalue non seulement les connaissances mais aussi la capacité à raisonner. Inventer est dangereux (risque d'erreur grave) ; se taire est inefficace." },
];

export async function seedFrancaisLessons(): Promise<void> {
  const [{ lessonCount }] = await db
    .select({ lessonCount: count() })
    .from(lessonsTable)
    .where(
      and(
        eq(lessonsTable.subjectId, FR_SUBJECT_ID),
        gte(lessonsTable.order, SEED_MARKER_ORDER_START)
      )
    );

  if (lessonCount >= TOTAL_LESSONS) {
    logger.info("Français seed lessons already present — skipping");
    return;
  }

  logger.info("Seeding Français lessons and exercises …");

  for (const lesson of francaisLessons) {
    const existing = await db.execute(
      `SELECT id FROM lessons WHERE subject_id = ${FR_SUBJECT_ID} AND "order" = ${lesson.order} AND series = 'ALL' LIMIT 1`
    );
    if (existing.rows.length > 0) continue;

    const [inserted] = await db
      .insert(lessonsTable)
      .values({
        subjectId: FR_SUBJECT_ID,
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

    const exercises = francaisExercises.filter(e => e.lo === lesson.order);
    for (const ex of exercises) {
      await db.insert(exercisesTable).values({
        lessonId: inserted.id,
        subjectId: FR_SUBJECT_ID,
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

  logger.info("Français lessons and exercises seeded successfully");
}
