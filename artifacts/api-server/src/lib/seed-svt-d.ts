import { db, lessonsTable, exercisesTable } from "@workspace/db";
import { eq, and, gte, count } from "drizzle-orm";
import { logger } from "./logger";

const SVT_D_SUBJECT_ID = 4;
const SEED_MARKER_ORDER_START = 5;
const TOTAL_LESSONS = 21;

const svtDLessons = [
  {
    title: "Leçon 1 : Le tissu musculaire et la contraction musculaire",
    subjectId: SVT_D_SUBJECT_ID,
    series: "D",
    order: 5,
    duration: 55,
    isPremium: false,
    summary: "Étudier la structure du tissu musculaire strié squelettique et les mécanismes moléculaires de la contraction musculaire au niveau de la fibre musculaire.",
    keyPoints: `Le muscle squelettique est composé de fibres musculaires (cellules géantes polynucléées)
La fibre musculaire contient des myofibrilles formées de sarcomères (unité contractile)
Le sarcomère contient des filaments d'actine (fins) et de myosine (épais)
La contraction = glissement des filaments d'actine sur la myosine (théorie des filaments glissants)
L'ATP est indispensable à la contraction musculaire (énergie fournie par hydrolyse de l'ATP)
Le calcium (Ca²⁺) libéré par le réticulum sarcoplasmique déclenche la contraction
Un potentiel d'action musculaire précède chaque contraction (couplage excitation-contraction)`,
    content: `<h2>Le Tissu Musculaire et la Contraction Musculaire</h2>
<h3>I. Structure du tissu musculaire strié squelettique</h3>
<p>Le muscle squelettique est formé de <strong>fibres musculaires</strong>, qui sont de très grandes cellules plurinucléées (jusqu'à 30 cm de long) entourées par le <em>sarcolemme</em> (membrane plasmique) et le <em>réticulum sarcoplasmique</em> (réservoir de calcium).</p>
<p>Chaque fibre contient des <strong>myofibrilles</strong> alignées en parallèle. Chaque myofibrille est composée d'une répétition d'unités appelées <strong>sarcomères</strong>, délimitées par des stries Z.</p>
<h3>II. Structure du sarcomère</h3>
<p>Le sarcomère (unité contractile) contient :</p>
<ul>
  <li><strong>Filaments épais</strong> : formés de molécules de <em>myosine</em>. Chaque tête de myosine peut se lier à l'actine.</li>
  <li><strong>Filaments fins</strong> : formés d'<em>actine</em> associée à la tropomyosine et à la troponine.</li>
  <li><strong>Bande A</strong> (sombre) : zone d'actine + myosine superposées</li>
  <li><strong>Bande I</strong> (claire) : zone d'actine seule</li>
  <li><strong>Zone H</strong> : zone de myosine seule (disparaît lors de la contraction)</li>
</ul>
<h3>III. Mécanisme moléculaire de la contraction (théorie des filaments glissants)</h3>
<p>Lors de la contraction :</p>
<ol>
  <li>Un <strong>potentiel d'action</strong> arrive à la jonction neuromusculaire → libération d'acétylcholine</li>
  <li>Le sarcolemme se dépolarise → l'influx se propage dans les tubules T</li>
  <li>Le <strong>Ca²⁺</strong> est libéré du réticulum sarcoplasmique</li>
  <li>Le Ca²⁺ se lie à la troponine → démasque les sites de liaison sur l'actine</li>
  <li>Les têtes de myosine (après hydrolyse de l'ATP) se lient à l'actine → <strong>pont actomyosine</strong></li>
  <li>Les têtes pivotent → <strong>glissement des filaments</strong> d'actine vers le centre du sarcomère</li>
  <li>Le sarcomère se raccourcit → la bande I et la zone H diminuent, la bande A reste constante</li>
  <li>L'ATP se fixe sur la myosine → rupture du pont et recyclage</li>
</ol>
<h3>IV. Sources d'énergie pour la contraction</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Filière</th><th>Durée</th><th>Substrat</th></tr>
  <tr><td>Phosphocréatine (anaérobie)</td><td>Très courte (< 10 s)</td><td>Créatine phosphate</td></tr>
  <tr><td>Glycolyse anaérobie</td><td>Courte (< 2 min)</td><td>Glycogène → acide lactique</td></tr>
  <tr><td>Respiration cellulaire (aérobie)</td><td>Longue durée</td><td>Glucose + O₂ → ATP + CO₂ + H₂O</td></tr>
</table>`,
    examples: `<p><strong>Exemple 1 :</strong> Lors d'une course à pied, la fibre musculaire du quadriceps reçoit un potentiel d'action. Le Ca²⁺ libéré active les ponts actomyosine. L'hydrolyse de l'ATP permet le pivotement des têtes de myosine → raccourcissement du sarcomère → contraction visible du muscle.</p>
<p><strong>Exemple 2 :</strong> Un sprinter de 100 m utilise d'abord la filière phosphocréatine (2-3 s), puis la glycolyse anaérobie. Après la course, il rembourse sa dette en O₂ par la respiration cellulaire.</p>
<p><strong>Exemple 3 – Rigor mortis :</strong> Après la mort, l'ATP n'est plus produit. Les ponts actomyosine restent formés (pas de détachement), ce qui provoque la rigidité cadavérique.</p>`,
  },
  {
    title: "Leçon 2 : Le fonctionnement du tissu nerveux (influx nerveux et synapse)",
    subjectId: SVT_D_SUBJECT_ID,
    series: "D",
    order: 6,
    duration: 60,
    isPremium: false,
    summary: "Comprendre la structure du neurone, la genèse et la propagation de l'influx nerveux, et le fonctionnement des synapses chimiques.",
    keyPoints: `Le neurone est l'unité structurale et fonctionnelle du tissu nerveux
Le potentiel de repos = -70 mV (intérieur négatif) grâce à la pompe Na⁺/K⁺-ATPase
Le potentiel d'action (PA) : dépolarisation (+40 mV) puis repolarisation → propagation unidirectionnelle
La synapse est la zone de communication entre deux neurones
La synapse chimique fonctionne par libération de neurotransmetteurs (ex : acétylcholine, dopamine)
Synapse excitatrice : dépolarise le neurone postsynaptique
Synapse inhibitrice : hyperpolarise le neurone postsynaptique (Cl⁻ entre, K⁺ sort)`,
    content: `<h2>Le Fonctionnement du Tissu Nerveux</h2>
<h3>I. Structure du neurone</h3>
<p>Le neurone est composé de :</p>
<ul>
  <li><strong>Corps cellulaire (soma)</strong> : contient le noyau et les organites</li>
  <li><strong>Dendrites</strong> : prolongements courts qui reçoivent les informations</li>
  <li><strong>Axone</strong> : prolongement long qui conduit l'influx vers les autres cellules</li>
  <li><strong>Gaine de myéline</strong> (sur certains axones) : accélère la conduction (conduction saltatoire)</li>
</ul>
<h3>II. Le potentiel de repos et le potentiel d'action</h3>
<p><strong>Potentiel de repos :</strong> -70 mV → l'intérieur de la membrane est négatif. Maintenu par la pompe Na⁺/K⁺ (3 Na⁺ sortent, 2 K⁺ entrent, consomme de l'ATP).</p>
<p><strong>Potentiel d'action (PA) :</strong></p>
<ol>
  <li><strong>Dépolarisation</strong> : ouverture des canaux Na⁺ voltage-dépendants → entrée massive de Na⁺ → potentiel monte à +40 mV</li>
  <li><strong>Repolarisation</strong> : fermeture des canaux Na⁺, ouverture des canaux K⁺ → sortie de K⁺ → retour vers -70 mV</li>
  <li><strong>Hyperpolarisation</strong> : légère overshoot (-80 mV) puis retour au repos</li>
</ol>
<p>Le PA se propage de manière <strong>unidirectionnelle</strong> et <strong>sans décrémentation</strong> (tout ou rien).</p>
<h3>III. La synapse chimique</h3>
<p>La synapse est formée d'un <strong>bouton présynaptique</strong>, d'une <strong>fente synaptique</strong> (20 nm) et d'une <strong>membrane postsynaptique</strong>.</p>
<p><strong>Fonctionnement :</strong></p>
<ol>
  <li>Le PA arrive au bouton présynaptique</li>
  <li>Entrée de Ca²⁺ → fusion des vésicules synaptiques avec la membrane → <strong>exocytose du neurotransmetteur</strong></li>
  <li>Le neurotransmetteur traverse la fente et se lie aux récepteurs postsynaptiques</li>
  <li>Synapse excitatrice (ex. : acétylcholine) → entrée de Na⁺ → dépolarisation (PPSE)</li>
  <li>Synapse inhibitrice (ex. : GABA) → entrée de Cl⁻ ou sortie de K⁺ → hyperpolarisation (PPSI)</li>
</ol>
<h3>IV. Organisation du nerf</h3>
<p>Un nerf est un faisceau d'axones entourés de tissu conjonctif :</p>
<ul>
  <li><strong>Endonèvre</strong> : entoure chaque axone</li>
  <li><strong>Périnèvre</strong> : entoure chaque fascicule</li>
  <li><strong>Épinèvre</strong> : entoure l'ensemble du nerf</li>
</ul>`,
    examples: `<p><strong>Exemple 1 – Propagation du PA :</strong> Lors du retrait rapide de la main d'une flamme, un PA naît à l'extrémité du neurone sensoriel de la main, se propage à 100 m/s le long de l'axone myélinisé (conduction saltatoire aux nœuds de Ranvier) jusqu'à la moelle épinière.</p>
<p><strong>Exemple 2 – Synapse neuromusculaire :</strong> Le neurone moteur libère de l'acétylcholine → se lie aux récepteurs nicotiniques du sarcolemme → dépolarisation → PA musculaire → contraction.</p>
<p><strong>Exemple 3 – Inhibition synaptique :</strong> Les neurones GABA-ergiques libèrent du GABA dans le SNC → ouverture des canaux Cl⁻ → hyperpolarisation → inhibition de l'activité neuronale (effet anxiolytique des benzodiazépines qui potentialisent le GABA).</p>`,
  },
  {
    title: "Leçon 3 : La communication neuro-hormonale",
    subjectId: SVT_D_SUBJECT_ID,
    series: "D",
    order: 7,
    duration: 55,
    isPremium: false,
    summary: "Comprendre comment le système nerveux et le système hormonal coordonnent les fonctions de l'organisme, avec focus sur l'axe hypothalamo-hypophysaire.",
    keyPoints: `Le système nerveux agit rapidement par voie électrique (influx) et chimique (neurotransmetteurs)
Le système hormonal agit lentement par voie sanguine (hormones = messagers chimiques)
L'hypothalamus est le centre intégrateur des deux systèmes (neuro-endocrine)
L'axe hypothalamo-hypophysaire règle de nombreuses glandes endocrines (thyroïde, surrénales, gonades)
Rétrocontrôle négatif : une hormone élevée inhibe sa propre production (régulation en boucle)
Rétrocontrôle positif : amplifie le signal (ex. : ovulation – pic de LH)
Les hormones sont de nature chimique diverse : stéroïdes, peptides, amines`,
    content: `<h2>La Communication Neuro-Hormonale</h2>
<h3>I. Les deux modes de communication</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Critère</th><th>Voie nerveuse</th><th>Voie hormonale</th></tr>
  <tr><td>Vitesse</td><td>Rapide (ms à s)</td><td>Lente (min à h)</td></tr>
  <tr><td>Support</td><td>Influx nerveux</td><td>Sang</td></tr>
  <tr><td>Messager</td><td>Neurotransmetteur</td><td>Hormone</td></tr>
  <tr><td>Cible</td><td>Cellule voisine</td><td>Organes distants (cellules cibles)</td></tr>
  <tr><td>Durée d'action</td><td>Courte</td><td>Longue</td></tr>
</table>
<h3>II. L'axe hypothalamo-hypophysaire</h3>
<p>L'<strong>hypothalamus</strong> est une région du cerveau qui contrôle l'hypophyse (glande pituitaire). Il produit des <em>neurohormones</em> (releasing hormones ou RH) qui stimulent ou inhibent l'hypophyse.</p>
<p><strong>Hypophyse</strong> : glande maîtresse, sécrète des hormones stimulatrices des glandes périphériques :</p>
<ul>
  <li>TSH → stimule la thyroïde (T3, T4)</li>
  <li>FSH et LH → stimulent les gonades (œstrogènes, testostérone)</li>
  <li>ACTH → stimule les surrénales (cortisol)</li>
  <li>GH (hormone de croissance)</li>
</ul>
<h3>III. Le rétrocontrôle (feedback)</h3>
<p><strong>Rétrocontrôle négatif :</strong> Quand le taux d'hormone périphérique est élevé, il inhibe l'hypothalamus et l'hypophyse → moins de RH et de TSH/FSH → moins d'hormone. Ce mécanisme maintient l'homéostasie.</p>
<p><strong>Exemple :</strong> Thyroïde : T3/T4 ↑ → inhibe TSH et TRH → T3/T4 revient à la normale.</p>
<p><strong>Rétrocontrôle positif :</strong> Rare, amplifie le signal. Exemple : pic d'œstrogènes → pic de LH → ovulation.</p>
<h3>IV. Nature chimique des hormones</h3>
<ul>
  <li><strong>Hormones stéroïdes</strong> : dérivées du cholestérol (œstrogènes, testostérone, cortisol) → pénètrent dans la cellule, agissent sur l'ADN</li>
  <li><strong>Hormones peptidiques</strong> : protéines (insuline, GH, LH, FSH) → se lient à des récepteurs membranaires</li>
  <li><strong>Hormones aminées</strong> : dérivées d'acides aminés (adrénaline, thyroxine)</li>
</ul>`,
    examples: `<p><strong>Exemple 1 – Régulation de la glycémie :</strong> Après un repas, la glycémie monte → le pancréas sécrète de l'<em>insuline</em> → les cellules captent le glucose → glycémie baisse. En cas de jeûne, le glucagon est sécrété pour libérer le glucose du foie.</p>
<p><strong>Exemple 2 – Stress :</strong> Face à un danger, l'hypothalamus active le système nerveux sympathique → les surrénales libèrent l'<em>adrénaline</em> → cœur accéléré, bronches dilatées, glycémie augmentée → réponse de fuite ou de combat.</p>
<p><strong>Exemple 3 – Rétrocontrôle :</strong> Un enfant hypothyroïdien a peu de T3/T4 → pas de rétrocontrôle négatif → TSH reste élevée → on mesure TSH élevée dans le sang pour diagnostiquer l'hypothyroïdie.</p>`,
  },
  {
    title: "Leçon 4 : Le fonctionnement du cœur et l'activité cardiaque",
    subjectId: SVT_D_SUBJECT_ID,
    series: "D",
    order: 8,
    duration: 55,
    isPremium: false,
    summary: "Étudier la structure du cœur, le cycle cardiaque (révolution cardiaque), la régulation de la fréquence cardiaque et la conduction électrique du cœur.",
    keyPoints: `Le cœur est un muscle creux (myocarde) avec 4 cavités : 2 oreillettes + 2 ventricules
La révolution cardiaque comprend : systole auriculaire, systole ventriculaire et diastole générale
La fréquence cardiaque normale est de 60-80 battements/min au repos
Le nœud sinusal (pacemaker) génère l'automatisme cardiaque (70 PA/min)
Voie de conduction : nœud sinusal → nœud auriculo-ventriculaire → faisceau de His → fibres de Purkinje
L'ECG enregistre l'activité électrique du cœur (onde P, complexe QRS, onde T)
Régulation : système sympathique accélère (noradrénaline), parasympathique ralentit (acétylcholine)`,
    content: `<h2>Le Fonctionnement du Cœur</h2>
<h3>I. Structure du cœur</h3>
<p>Le cœur est situé dans le médiastin, entouré par le <strong>péricarde</strong>. Sa paroi est formée du <strong>myocarde</strong> (muscle cardiaque). Il comprend 4 cavités :</p>
<ul>
  <li><strong>Oreillette droite (OD)</strong> : reçoit le sang veineux (veine cave)</li>
  <li><strong>Ventricule droit (VD)</strong> : envoie le sang vers les poumons (artère pulmonaire)</li>
  <li><strong>Oreillette gauche (OG)</strong> : reçoit le sang oxygéné (veines pulmonaires)</li>
  <li><strong>Ventricule gauche (VG)</strong> : propulse le sang vers tout le corps (aorte)</li>
</ul>
<p>Des <strong>valves</strong> assurent l'unidirectionnalité du flux (valves auriculo-ventriculaires : mitrale et tricuspide ; valves sigmoïdes : aortique et pulmonaire).</p>
<h3>II. La révolution cardiaque</h3>
<ol>
  <li><strong>Systole auriculaire</strong> (0,1 s) : les oreillettes se contractent → sang passe dans les ventricules</li>
  <li><strong>Systole ventriculaire</strong> (0,3 s) : les ventricules se contractent → sang éjecté vers l'aorte et l'artère pulmonaire</li>
  <li><strong>Diastole générale</strong> (0,4 s) : tout le cœur se relâche → remplissage passif</li>
</ol>
<p>Durée totale d'un cycle : 0,8 s → fréquence cardiaque = 75 batt/min au repos.</p>
<h3>III. La conduction électrique</h3>
<ul>
  <li><strong>Nœud sinusal</strong> (Keith-Flack) : pacemaker naturel, génère ~70 PA/min</li>
  <li><strong>Nœud auriculo-ventriculaire</strong> (Aschoff-Tawara) : reçoit le signal, léger délai</li>
  <li><strong>Faisceau de His</strong> et <strong>fibres de Purkinje</strong> : conduisent vers les ventricules</li>
</ul>
<h3>IV. L'ECG</h3>
<ul>
  <li><strong>Onde P</strong> : dépolarisation des oreillettes (systole auriculaire)</li>
  <li><strong>Complexe QRS</strong> : dépolarisation des ventricules (systole ventriculaire)</li>
  <li><strong>Onde T</strong> : repolarisation des ventricules (diastole)</li>
</ul>
<h3>V. Régulation nerveuse et hormonale</h3>
<ul>
  <li><strong>Système sympathique</strong> → noradrénaline → ↑ fréquence et force contractile</li>
  <li><strong>Système parasympathique</strong> (nerf vague/X) → acétylcholine → ↓ fréquence cardiaque</li>
  <li><strong>Adrénaline</strong> (médullosurrénale) → ↑ fréquence cardiaque (effort, stress)</li>
</ul>`,
    examples: `<p><strong>Exemple 1 – Calcul du débit cardiaque :</strong> Débit cardiaque (DC) = Fréquence (FC) × Volume d'éjection systolique (VES). Au repos : DC = 70 × 70 mL = 4 900 mL/min ≈ 5 L/min. À l'effort : DC peut atteindre 25 L/min.</p>
<p><strong>Exemple 2 – Lecture d'ECG :</strong> Si l'espace PR est allongé (> 0,2 s) → bloc auriculo-ventriculaire. Si le complexe QRS est élargi → trouble de conduction ventriculaire.</p>
<p><strong>Exemple 3 :</strong> Lors d'un effort, le cerveau active le système sympathique → noradrénaline → fréquence cardiaque passe de 70 à 180 batt/min → débit cardiaque multiplié par 4.</p>`,
  },
  {
    title: "Leçon 5 : Le sang et le milieu intérieur",
    subjectId: SVT_D_SUBJECT_ID,
    series: "D",
    order: 9,
    duration: 50,
    isPremium: false,
    summary: "Étudier la composition du sang, le transport des gaz respiratoires, le rôle du milieu intérieur et les mécanismes de l'homéostasie.",
    keyPoints: `Le sang est composé d'un plasma (55%) et d'éléments figurés (45%) : GR, GB, plaquettes
Le plasma contient eau, protéines (albumine, fibrinogène), glucose, ions, hormones, déchets
L'hémoglobine (Hb) des GR transporte O₂ (oxyhémoglobine) et CO₂ (carbhémoglobine)
La courbe de dissociation de l'Hb est sigmoïde : Hb se sature en O₂ dans les poumons et libère l'O₂ dans les tissus
Le CO₂ est transporté sous 3 formes : dissous (7%), carbhémoglobine (23%), bicarbonates HCO₃⁻ (70%)
Le milieu intérieur = liquide interstitiel + plasma + lymphe
L'homéostasie maintient constants : température, pH sanguin (7,35-7,45), glycémie (0,8-1,2 g/L), pression osmotique`,
    content: `<h2>Le Sang et le Milieu Intérieur</h2>
<h3>I. Composition du sang</h3>
<p>Le sang est un tissu conjonctif liquide composé de :</p>
<ul>
  <li><strong>Plasma</strong> (55%) : eau + protéines (albumine, fibrinogène, immunoglobulines) + nutriments (glucose, AA) + ions + hormones + déchets (urée, CO₂)</li>
  <li><strong>Globules rouges / Érythrocytes</strong> (45%) : cellules sans noyau contenant l'hémoglobine, durée de vie 120 jours</li>
  <li><strong>Globules blancs / Leucocytes</strong> : défense immunitaire (granulocytes, lymphocytes, monocytes)</li>
  <li><strong>Plaquettes / Thrombocytes</strong> : hémostase (coagulation)</li>
</ul>
<h3>II. Transport des gaz respiratoires</h3>
<p><strong>Transport de l'O₂ :</strong></p>
<ul>
  <li>97% lié à l'hémoglobine (oxyhémoglobine : Hb + O₂ → HbO₂)</li>
  <li>3% dissous dans le plasma</li>
  <li>Dans les poumons : pO₂ élevée → Hb se sature (Hb + 4 O₂ → HbO₂)</li>
  <li>Dans les tissus : pO₂ faible, pCO₂ élevée, pH bas → Hb libère l'O₂ (effet Bohr)</li>
</ul>
<p><strong>Transport du CO₂ :</strong></p>
<ul>
  <li>70% sous forme de bicarbonates HCO₃⁻ (dans le plasma)</li>
  <li>23% lié à l'Hb (carbhémoglobine : HbCO₂)</li>
  <li>7% dissous dans le plasma</li>
</ul>
<h3>III. Le milieu intérieur et l'homéostasie</h3>
<p>Le <strong>milieu intérieur</strong> est l'ensemble des liquides entourant les cellules : plasma sanguin + liquide interstitiel + lymphe. Claude Bernard (1857) a défini la constance du milieu intérieur comme condition de la vie.</p>
<p><strong>Paramètres homéostatiques :</strong></p>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Paramètre</th><th>Valeur normale</th><th>Régulateur principal</th></tr>
  <tr><td>Glycémie</td><td>0,8-1,2 g/L</td><td>Insuline/glucagon (pancréas)</td></tr>
  <tr><td>pH sanguin</td><td>7,35-7,45</td><td>Poumons, rein, tampons HCO₃⁻</td></tr>
  <tr><td>Température</td><td>37°C</td><td>Hypothalamus</td></tr>
  <tr><td>Osmolarité</td><td>285-295 mOsm/L</td><td>ADH (hypothalamus), rein</td></tr>
</table>`,
    examples: `<p><strong>Exemple 1 :</strong> Un individu à 4 500 m d'altitude où la pO₂ est faible produit plus de GR par érythropoïèse (stimulée par l'EPO) → plus d'Hb → meilleur transport de l'O₂.</p>
<p><strong>Exemple 2 – Effet Bohr :</strong> Pendant l'effort, les muscles produisent du CO₂ et de l'acide lactique → pH baisse → l'Hb a moins d'affinité pour l'O₂ → libère plus d'O₂ aux muscles qui en ont besoin.</p>
<p><strong>Exemple 3 :</strong> En cas d'acidose respiratoire (CO₂ augmente), les poumons hyperventilent pour éliminer le CO₂ excess → pH revient vers 7,4.</p>`,
  },
  {
    title: "Leçon 6 : Le système immunitaire et la défense de l'organisme",
    subjectId: SVT_D_SUBJECT_ID,
    series: "D",
    order: 10,
    duration: 60,
    isPremium: false,
    summary: "Comprendre les mécanismes de l'immunité innée et adaptative, le rôle des lymphocytes T et B, et le principe de la vaccination.",
    keyPoints: `L'immunité innée est non spécifique, immédiate (barrières, phagocytose, inflammation)
L'immunité adaptative est spécifique, lente, et présente une mémoire immunologique
Les antigènes (Ag) sont des molécules étrangères reconnues par le système immunitaire
Les lymphocytes B produisent des anticorps (immunité humorale) contre les Ag extracellulaires
Les lymphocytes T (LT cytotoxiques CD8⁺) détruisent les cellules infectées (immunité cellulaire)
Les LT auxiliaires (CD4⁺) activent les LB et LT cytotoxiques
La vaccination induit une mémoire immunologique (lymphocytes mémoire) sans maladie
Le CMH (complexe majeur d'histocompatibilité) présente les antigènes aux lymphocytes T`,
    content: `<h2>Le Système Immunitaire et la Défense de l'Organisme</h2>
<h3>I. Les lignes de défense</h3>
<p><strong>1ère ligne (Barrières physiques et chimiques) :</strong> peau, muqueuses, larmes, salive, pH gastrique → empêchent l'entrée des pathogènes.</p>
<p><strong>2ème ligne (Immunité innée) :</strong> Non spécifique, rapide (minutes/heures) :</p>
<ul>
  <li><strong>Phagocytose</strong> : neutrophiles et macrophages englobent et détruisent les pathogènes</li>
  <li><strong>Inflammation</strong> : histamine, cytokines → rougeur, chaleur, douleur, gonflement → recrutement des défenses</li>
  <li><strong>Système du complément</strong> : protéines qui lysent les bactéries</li>
</ul>
<p><strong>3ème ligne (Immunité adaptative) :</strong> Spécifique, lente (jours), avec mémoire.</p>
<h3>II. Les acteurs de l'immunité adaptative</h3>
<ul>
  <li><strong>Cellules présentatrices d'antigènes (CPA)</strong> : macrophages, cellules dendritiques → présentent les Ag via le CMH aux lymphocytes T</li>
  <li><strong>Lymphocytes T auxiliaires (LTh, CD4⁺)</strong> : sécrètent des interleukines → activent LB et LTc</li>
  <li><strong>Lymphocytes T cytotoxiques (LTc, CD8⁺)</strong> : détruisent les cellules infectées et les cellules tumorales (immunité cellulaire)</li>
  <li><strong>Lymphocytes B</strong> : se différencient en plasmocytes → sécrètent des <strong>anticorps</strong> (immunoglobulines) spécifiques de l'Ag (immunité humorale)</li>
</ul>
<h3>III. Structure et rôle des anticorps</h3>
<p>Un anticorps est une glycoprotéine en forme de Y, composée de 2 chaînes lourdes et 2 chaînes légères, reliées par des ponts disulfure. Il possède 2 sites de liaison à l'Ag (paratopes).</p>
<p>Les anticorps neutralisent les Ag, facilitent la phagocytose (opsonisation) et activent le complément.</p>
<h3>IV. La mémoire immunologique et la vaccination</h3>
<p>Après une première infection, des <strong>lymphocytes mémoire</strong> persistent. Lors d'une seconde exposition au même Ag, la réponse est plus rapide et plus intense (réponse secondaire).</p>
<p>La <strong>vaccination</strong> consiste à introduire un Ag atténué ou inactivé → réponse primaire → lymphocytes mémoire → protection si contact avec le pathogène réel.</p>`,
    examples: `<p><strong>Exemple 1 – Rhume :</strong> Le virus de la grippe pénètre dans les voies respiratoires. Les macrophages le phagocytent et présentent ses Ag aux LT. Les LTh activent les LB qui produisent des anticorps anti-grippaux. Les LTc éliminent les cellules infectées.</p>
<p><strong>Exemple 2 – SIDA :</strong> Le VIH infecte spécifiquement les LT CD4⁺. Leur destruction progressive paralyse l'immunité adaptative → l'organisme ne peut plus répondre aux infections (infections opportunistes).</p>
<p><strong>Exemple 3 – Vaccination anti-COVID :</strong> Le vaccin ARNm code pour la protéine Spike du SARS-CoV-2. Les cellules produisent cette protéine → réponse immunitaire → anticorps et lymphocytes mémoire → protection contre la maladie grave.</p>`,
  },
  {
    title: "Leçon 7 : Les appareils reproducteurs mâle et femelle",
    subjectId: SVT_D_SUBJECT_ID,
    series: "D",
    order: 11,
    duration: 50,
    isPremium: false,
    summary: "Identifier et décrire la structure et les fonctions des organes des appareils génitaux mâle et femelle.",
    keyPoints: `L'appareil génital mâle : testicules, épididymes, canaux déférents, vésicules séminales, prostate, pénis
Les testicules ont deux fonctions : gamétogène (production de spermatozoïdes) et endocrine (testostérone)
L'appareil génital femelle : ovaires, trompes de Fallope, utérus, vagin
Les ovaires ont deux fonctions : gamétogène (production d'ovules) et endocrine (œstrogènes, progestérone)
La trompe de Fallope est le lieu de la fécondation
L'utérus est le lieu de la nidation et du développement embryonnaire (endomètre)
Le cycle ovarien et le cycle utérin durent 28 jours et sont synchronisés`,
    content: `<h2>Les Appareils Reproducteurs Mâle et Femelle</h2>
<h3>I. L'appareil génital mâle</h3>
<p><strong>Organes :</strong></p>
<ul>
  <li><strong>Testicules</strong> : glandes paires situées dans le scrotum (33°C, plus frais que 37°C). Fonctions : production de spermatozoïdes (tubes séminifères) et sécrétion de testostérone (cellules de Leydig)</li>
  <li><strong>Épididyme</strong> : maturation et stockage des spermatozoïdes</li>
  <li><strong>Canal déférent</strong> : transport des spermatozoïdes vers l'urètre</li>
  <li><strong>Vésicules séminales + prostate + glandes de Cowper</strong> : sécrètent le liquide séminal (fructose, enzymes) → sperme = spermatozoïdes + liquide séminal</li>
  <li><strong>Pénis</strong> : organe de copulation et de miction</li>
</ul>
<h3>II. L'appareil génital femelle</h3>
<ul>
  <li><strong>Ovaires</strong> : 2 gonades féminines, produisent les ovocytes et les hormones féminines (œstrogènes + progestérone)</li>
  <li><strong>Trompes de Fallope (utérines)</strong> : captent l'ovocyte → lieu de la fécondation → transportent l'embryon vers l'utérus</li>
  <li><strong>Utérus</strong> : organe musculaire creux (myomètre + endomètre) → lieu de la nidation et de la grossesse</li>
  <li><strong>Col de l'utérus</strong> : barrière entre utérus et vagin, sécrète la glaire cervicale</li>
  <li><strong>Vagin</strong> : organe de copulation et de parturition</li>
  <li><strong>Vulve</strong> : organes génitaux externes (grandes et petites lèvres, clitoris)</li>
</ul>
<h3>III. Les cycles de la femme</h3>
<p><strong>Cycle ovarien (28 jours) :</strong></p>
<ol>
  <li>Phase folliculaire (J1-J14) : croissance du follicule sous influence de FSH → sécrétion d'œstrogènes</li>
  <li>Ovulation (J14) : pic de LH → rupture du follicule mûr → libération de l'ovocyte II</li>
  <li>Phase lutéale (J15-J28) : corps jaune → sécrétion de progestérone + œstrogènes</li>
</ol>
<p><strong>Cycle utérin (28 jours) :</strong></p>
<ol>
  <li>Menstruation (J1-J5) : chute des hormones → nécrose de l'endomètre → règles</li>
  <li>Phase proliférative (J6-J14) : œstrogènes → reconstruction de l'endomètre</li>
  <li>Phase sécrétoire (J15-J28) : progestérone → endomètre épaissi, glandes actives (préparation à la nidation)</li>
</ol>`,
    examples: `<p><strong>Exemple 1 :</strong> Un homme de 25 ans produit environ 300 millions de spermatozoïdes par jour dans les tubes séminifères. La spermatogenèse dure 74 jours. La temperature < 37°C est essentielle (une cryptorchidie non traitée entraîne la stérilité).</p>
<p><strong>Exemple 2 :</strong> Chez la femme, si l'ovocyte n'est pas fécondé, le corps jaune régresse, la progestérone chute → les règles surviennent à J28. Si fécondation : l'embryon produit de l'hCG → maintien du corps jaune → pas de règles → signe de grossesse.</p>`,
  },
  {
    title: "Leçon 8 : La gamétogenèse (spermatogenèse et ovogenèse)",
    subjectId: SVT_D_SUBJECT_ID,
    series: "D",
    order: 12,
    duration: 55,
    isPremium: false,
    summary: "Décrire les étapes de la formation des gamètes mâles (spermatogenèse) et femelles (ovogenèse) en soulignant les différences et les mécanismes de méiose.",
    keyPoints: `La gamétogenèse est la formation des gamètes à partir de cellules souches diploïdes (2n=46)
La méiose réduit le nombre de chromosomes de 2n à n (gamètes haploïdes n=23)
La spermatogenèse se déroule en continu à partir de la puberté dans les tubes séminifères
Étapes : spermatogonie → spermatocyte I → 2 spermatocytes II → 4 spermatides → 4 spermatozoïdes
L'ovogenèse débute in utero et s'arrête à la ménopause
Un seul ovocyte fonctionnel est produit par ovulation (les 3 autres deviennent des globules polaires)
La FSH stimule la gamétogenèse ; la LH déclenche l'ovulation`,
    content: `<h2>La Gamétogenèse</h2>
<h3>I. Rappel : la méiose</h3>
<p>La méiose est une double division cellulaire qui produit 4 cellules haploïdes (n chromosomes) à partir d'une cellule diploïde (2n chromosomes). Elle comprend :</p>
<ul>
  <li><strong>Méiose I</strong> (réductionnelle) : séparation des chromosomes homologues → 2 cellules à n chromosomes dupliqués</li>
  <li><strong>Méiose II</strong> (équationnelle) : séparation des chromatides → 4 cellules haploïdes</li>
</ul>
<h3>II. La spermatogenèse</h3>
<p>Se déroule dans les <strong>tubes séminifères</strong>, en continu de la puberté jusqu'à la vieillesse.</p>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Phase</th><th>Cellule</th><th>Ploïdie</th><th>Processus</th></tr>
  <tr><td>Multiplication</td><td>Spermatogonie A → B</td><td>2n = 46</td><td>Mitoses</td></tr>
  <tr><td>Accroissement</td><td>Spermatocyte I</td><td>2n = 46</td><td>Croissance</td></tr>
  <tr><td>Maturation 1</td><td>2 Spermatocytes II</td><td>n = 23</td><td>Méiose I</td></tr>
  <tr><td>Maturation 2</td><td>4 Spermatides</td><td>n = 23</td><td>Méiose II</td></tr>
  <tr><td>Différenciation</td><td>4 Spermatozoïdes</td><td>n = 23</td><td>Spermiogenèse</td></tr>
</table>
<p>Structure du spermatozoïde : tête (noyau + acrosome), pièce intermédiaire (mitochondries), flagelle.</p>
<h3>III. L'ovogenèse</h3>
<p>Se déroule dans les <strong>ovaires</strong>, de la vie fœtale (avant la naissance) jusqu'à la ménopause.</p>
<ul>
  <li>In utero : les ovogonies se multiplient (7 millions à 5 mois de gestation) puis entrent en méiose I → ovocytes I bloqués en prophase I jusqu'à la puberté</li>
  <li>À la puberté (chaque cycle) : un follicule mûrit → méiose I achevée → ovocyte II + 1er globule polaire</li>
  <li>Au moment de l'ovulation : ovocyte II libéré, bloqué en métaphase II</li>
  <li>Fécondation : achèvement de la méiose II → ovotide + 2ème globule polaire</li>
</ul>
<p><strong>Différences clés :</strong> La spermatogenèse donne 4 spermatozoïdes viables ; l'ovogenèse ne donne qu'1 ovocyte fonctionnel (les 3 globules polaires dégénèrent). L'ovogenèse est limitée (stock fini) ; la spermatogenèse est continue.</p>`,
    examples: `<p><strong>Exemple 1 :</strong> Une femme naît avec ~2 millions de follicules primaires. Vers la puberté, il en reste ~400 000. Au cours de sa vie reproductrice, environ 400 ovules seront libérés. À la ménopause (50 ans), le stock est épuisé → plus d'ovulation → plus de règles.</p>
<p><strong>Exemple 2 :</strong> La FSH stimule la croissance des follicules et la production d'œstrogènes. La LH déclenche l'ovulation (pic à J14). En l'absence de FSH (hypophysectomie), la spermatogenèse et l'ovogenèse s'arrêtent.</p>`,
  },
  {
    title: "Leçon 9 : La fécondation et les débuts du développement embryonnaire",
    subjectId: SVT_D_SUBJECT_ID,
    series: "D",
    order: 13,
    duration: 55,
    isPremium: false,
    summary: "Décrire les étapes de la fécondation et les premières étapes du développement embryonnaire humain jusqu'à la nidation.",
    keyPoints: `La fécondation se produit dans la trompe de Fallope dans les 12-24 h après l'ovulation
La fécondation = fusion d'un spermatozoïde (n) + ovocyte II (n) → zygote (2n = 46)
Étapes : réaction acrosomiale, pénétration du spermatozoïde, réaction de zone (blocage polyspermie)
Achèvement de la méiose II de l'ovocyte après pénétration du spermatozoïde
La segmentation : divisions successives du zygote → morula → blastocyste
La nidation (implantation) : le blastocyste s'implante dans l'endomètre utérin (J6-J10)
Le trophoblaste devient le placenta ; l'embryoblaste donne l'embryon`,
    content: `<h2>La Fécondation et les Débuts du Développement Embryonnaire</h2>
<h3>I. La fécondation</h3>
<p>La fécondation a lieu dans le <strong>tiers externe de la trompe de Fallope</strong>, dans les 12-24 h suivant l'ovulation.</p>
<p><strong>Étapes :</strong></p>
<ol>
  <li><strong>Capacitation</strong> : les spermatozoïdes acquièrent leur pouvoir fécondant dans les voies génitales féminines (6-8h)</li>
  <li><strong>Réaction acrosomiale</strong> : contact avec la zone pellucide → libération d'enzymes acrosomiales → dissolution de la zone pellucide</li>
  <li><strong>Pénétration</strong> : un spermatozoïde fusionne avec la membrane de l'ovocyte → entrée du noyau spermatique</li>
  <li><strong>Réaction de zone</strong> : modification de la zone pellucide → imperméable aux autres spermatozoïdes (blocage de la polyspermie)</li>
  <li><strong>Achèvement de la méiose II</strong> : l'ovocyte II complète sa méiose → ovotide + 2ème globule polaire</li>
  <li><strong>Amphimixie</strong> : fusion des pronoyaux mâle et femelle → zygote (2n = 46 chromosomes)</li>
</ol>
<h3>II. La segmentation (clivage)</h3>
<p>Le zygote subit des divisions mitotiques rapides sans croissance cellulaire :</p>
<ul>
  <li>J1 : 2 cellules (blastomères)</li>
  <li>J2 : 4 cellules</li>
  <li>J3 : 16 cellules → <strong>morula</strong> (masse compacte)</li>
  <li>J4-J5 : cavité se forme → <strong>blastocyste</strong> (trophoblaste périphérique + bouton embryonnaire/embryoblaste)</li>
</ul>
<h3>III. La nidation (implantation)</h3>
<p>Le blastocyste se libère de la zone pellucide (éclosion) et s'implante dans l'endomètre utérin entre <strong>J6 et J10</strong> après la fécondation.</p>
<ul>
  <li><strong>Trophoblaste</strong> : s'enfonce dans l'endomètre → futur placenta</li>
  <li><strong>Embryoblaste</strong> : donnera l'embryon proprement dit</li>
  <li>Le trophoblaste sécrète l'<strong>hCG</strong> (hormone chorionique gonadotrope) → maintient le corps jaune → progestérone → empêche les règles</li>
</ul>
<p>C'est la détection de l'hCG dans les urines qui confirme la grossesse (test de grossesse).</p>`,
    examples: `<p><strong>Exemple 1 – FIV (fécondation in vitro) :</strong> Lors d'une FIV, les ovocytes sont prélevés par ponction folliculaire, fécondés in vitro avec les spermatozoïdes du partenaire, puis les embryons obtenus au stade blastocyste sont transférés dans l'utérus.</p>
<p><strong>Exemple 2 :</strong> Un test de grossesse urinaire détecte l'hCG à partir du 10ème jour après la fécondation (nidation terminée). L'hCG est produite par le trophoblaste, maintient le corps jaune et donc la progestérone, évitant les règles.</p>`,
  },
  {
    title: "Leçon 10 : Le développement embryonnaire jusqu'à la naissance",
    subjectId: SVT_D_SUBJECT_ID,
    series: "D",
    order: 14,
    duration: 55,
    isPremium: false,
    summary: "Décrire les grandes étapes du développement de l'embryon et du fœtus de la nidation à la parturition, en incluant le rôle du placenta.",
    keyPoints: `La grossesse dure environ 38 semaines (266 jours) ou 40 semaines d'aménorrhée (SA)
Stade embryonnaire (S1-S8) : organogenèse (formation de tous les organes)
Stade fœtal (S9-S38) : croissance et maturation des organes
Le placenta assure les échanges entre la mère et le fœtus (nutriments, O₂, déchets, hormones)
Le sang maternel et le sang fœtal ne se mélangent pas (barrière placentaire)
Les annexes embryonnaires : placenta, cordon ombilical, amnios, allantoïde, sac vitellin
La parturition est déclenchée par l'ocytocine (hypothalamus) et les prostaglandines
La progestérone maintient la grossesse ; sa chute déclenche le travail`,
    content: `<h2>Le Développement Embryonnaire jusqu'à la Naissance</h2>
<h3>I. Les grandes étapes de la grossesse</h3>
<p>La grossesse est divisée en 3 trimestres :</p>
<p><strong>1er trimestre (S1-S13) :</strong></p>
<ul>
  <li>Nidation, gastrulation, neurulation</li>
  <li>Formation des 3 feuillets embryonnaires :
    <ul>
      <li><strong>Ectoderme</strong> → peau, système nerveux</li>
      <li><strong>Mésoderme</strong> → muscles, squelette, cœur, reins</li>
      <li><strong>Endoderme</strong> → tube digestif, poumons, foie</li>
    </ul>
  </li>
  <li>À 8 semaines : tous les organes sont ébauché (fin de la période embryonnaire)</li>
  <li>Risque maximal de tératogènes (alcool, médicaments, radiations)</li>
</ul>
<p><strong>2ème trimestre (S14-S27) :</strong></p>
<ul>
  <li>Croissance rapide, mouvements fœtaux perceptibles</li>
  <li>Sexe visible à l'échographie (S20)</li>
  <li>Développement du cerveau, os, muscles</li>
</ul>
<p><strong>3ème trimestre (S28-S38) :</strong></p>
<ul>
  <li>Maturation des poumons (surfactant), prise de poids importante</li>
  <li>Position tête en bas (présentation céphalique)</li>
</ul>
<h3>II. Le placenta</h3>
<p>Le placenta est un organe d'échange formé à partir du trophoblaste et de l'endomètre. Il est pleinement fonctionnel à la 12ème semaine.</p>
<p><strong>Rôles :</strong></p>
<ul>
  <li>Nutrition : transfert de glucose, AA, lipides de la mère au fœtus</li>
  <li>Respiration : transfert d'O₂ (mère → fœtus) et de CO₂ (fœtus → mère)</li>
  <li>Excrétion : élimination des déchets métaboliques du fœtus</li>
  <li>Protection : barrière anti-infectieuse (partielle) et immunologique</li>
  <li>Endocrine : sécrète hCG, progestérone, œstrogènes, HPL (hormone placentaire lactogène)</li>
</ul>
<p><strong>Important :</strong> Les sangs maternel et fœtal ne se mélangent jamais (barrière placentaire). Les échanges se font par diffusion, transport actif.</p>
<h3>III. La parturition (accouchement)</h3>
<p>La naissance est déclenchée par :</p>
<ol>
  <li>Diminution de la progestérone → utérus devient sensible aux contractions</li>
  <li>Augmentation des œstrogènes → utérus se prépare</li>
  <li>L'<strong>ocytocine</strong> (hypothalamus → neurohypophyse) → contractions utérines (réflexe de Ferguson : rétrocontrôle positif)</li>
  <li>Les prostaglandines amplifient les contractions</li>
</ol>`,
    examples: `<p><strong>Exemple 1 :</strong> La thalidomide (médicament prescrit aux femmes enceintes dans les années 1960) était tératogène pendant le 1er trimestre → malformations des membres (phocomélie). Cela a montré que la barrière placentaire ne protège pas contre tous les médicaments.</p>
<p><strong>Exemple 2 :</strong> La rupture prématurée des membranes (amnios) avant 34 SA peut déclencher un accouchement prématuré. On administre des corticoïdes pour accélérer la maturation pulmonaire du fœtus et du sulfate de magnésium pour retarder les contractions.</p>`,
  },
  {
    title: "Leçon 11 : Modes de reproduction sexuée et asexuée chez les végétaux et certains animaux",
    subjectId: SVT_D_SUBJECT_ID,
    series: "D",
    order: 15,
    duration: 50,
    isPremium: false,
    summary: "Comparer les modes de reproduction sexuée et asexuée, leurs avantages et inconvénients, chez les plantes et certains animaux.",
    keyPoints: `La reproduction asexuée (végétative) ne fait pas intervenir de gamètes ni de méiose → clones génétiquement identiques
Types de reproduction asexuée : bouturage, marcottage, stolons, rhizomes, bulbes, gemmes, bourgeonnement, parthénogenèse
La reproduction sexuée implique la méiose et la fécondation → diversité génétique
Avantage reproduction asexuée : rapide, pas de partenaire nécessaire, conservation des caractères adaptés
Avantage reproduction sexuée : diversité génétique → meilleure adaptation à l'environnement changeant
Chez les végétaux : alternance de générations (gamétophyte n et sporophyte 2n)
Pollinisation : transfert du pollen (grain de pollen = gamétophyte mâle) vers le pistil`,
    content: `<h2>Modes de Reproduction chez les Végétaux et Certains Animaux</h2>
<h3>I. La reproduction asexuée</h3>
<p>La reproduction asexuée (ou végétative) ne fait pas intervenir de gamètes. Elle repose sur la <strong>mitose</strong> → individus fils génétiquement identiques à la mère (<strong>clones</strong>).</p>
<p><strong>Chez les végétaux :</strong></p>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Mode</th><th>Exemple</th><th>Description</th></tr>
  <tr><td>Stolon</td><td>Fraisier</td><td>Tiges rampantes qui forment de nouveaux plants</td></tr>
  <tr><td>Rhizome</td><td>Iris, gingembre</td><td>Tiges souterraines horizontales</td></tr>
  <tr><td>Bulbe</td><td>Oignon, ail</td><td>Organe souterrain avec réserves</td></tr>
  <tr><td>Bouturage naturel</td><td>Cactus</td><td>Fragment de plante qui régénère un individu entier</td></tr>
  <tr><td>Gemme</td><td>Mousse</td><td>Petits amas de cellules qui se dispersent</td></tr>
</table>
<p><strong>Chez les animaux :</strong> bourgeonnement (Hydre d'eau douce), régénération (Planaire, étoile de mer), parthénogenèse (abeille → mâles haploïdes, puceron).</p>
<h3>II. La reproduction sexuée chez les végétaux</h3>
<p>Chez les plantes à fleurs (<strong>angiospermes</strong>) :</p>
<ol>
  <li><strong>Pollinisation</strong> : transfert du pollen (gamète mâle) vers le pistil (entomophile ou anémophile)</li>
  <li><strong>Germination du pollen</strong> : tube pollinique pousse dans le style → amène les gamètes mâles jusqu'à l'ovule</li>
  <li><strong>Double fécondation</strong> : 1 spermatozoïde + ovosphère → zygote (2n) → graine/embryon ; 1 spermatozoïde + noyaux polaires → albumen (3n)</li>
  <li><strong>Formation du fruit</strong> : ovaire se transforme en fruit, ovule en graine</li>
</ol>
<h3>III. Comparaison des deux modes</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Critère</th><th>Reproduction asexuée</th><th>Reproduction sexuée</th></tr>
  <tr><td>Gamètes</td><td>Non</td><td>Oui</td></tr>
  <tr><td>Diversité génétique</td><td>Nulle (clones)</td><td>Grande (recombinaison)</td></tr>
  <tr><td>Rapidité</td><td>Rapide</td><td>Plus lente</td></tr>
  <tr><td>Partenaire</td><td>Inutile</td><td>Nécessaire (sauf autofécondation)</td></tr>
  <tr><td>Adaptation</td><td>Faible si environnement change</td><td>Forte potentielle</td></tr>
</table>`,
    examples: `<p><strong>Exemple 1 :</strong> Les agriculteurs multiplient les bananiers par rejets (stolons) car les bananiers cultivés sont triploïdes et stériles. La reproduction végétative permet de conserver les variétés de qualité.</p>
<p><strong>Exemple 2 :</strong> Chez les pucerons, en été (conditions favorables), la reproduction est asexuée par parthénogenèse → population rapide. En automne (conditions difficiles), les pucerons se reproduisent sexuellement → œufs résistants capables de survivre l'hiver.</p>`,
  },
  {
    title: "Leçon 12 : La mise en place des gisements miniers en Côte d'Ivoire",
    subjectId: SVT_D_SUBJECT_ID,
    series: "D",
    order: 16,
    duration: 55,
    isPremium: false,
    summary: "Comprendre les processus géologiques qui ont conduit à la formation des principaux gisements miniers (or, bauxite, manganèse, diamant, nickel) en Côte d'Ivoire.",
    keyPoints: `La Côte d'Ivoire est riche en ressources minières : or, bauxite, manganèse, fer, diamant, nickel, pétrole
Le sous-sol ivoirien est principalement composé de roches précambriennes (bouclier ouest-africain)
Les gisements aurifères se trouvent dans les ceintures de roches vertes (Birimien, 2 milliards d'années)
La bauxite (Al₂O₃ nH₂O) résulte de l'altération latéritique des roches granitiques sous climat tropical
Le manganèse de Grand-Lahou et le fer de Séguéla sont associés à des formations sédimentaires
Les processus de formation : magmatisme, métamorphisme, sédimentation, altération, hydrothermalisme
Les gisements off-shore de pétrole résultent de la sédimentation marine du bassin sédimentaire côtier`,
    content: `<h2>La Mise en Place des Gisements Miniers en Côte d'Ivoire</h2>
<h3>I. Contexte géologique</h3>
<p>La Côte d'Ivoire est située sur le <strong>bouclier ou craton ouest-africain</strong>, l'une des plus anciennes structures géologiques d'Afrique (2,1 à 2,3 milliards d'années). Ce craton est formé principalement de :</p>
<ul>
  <li>Roches cristallines précambriennes : granites, gneiss, migmatites</li>
  <li>Ceintures de roches vertes biriminines (Birimien) : volcanites, schistes, quartzites</li>
  <li>Bassin sédimentaire côtier (Mio-Pliocène) : sables, argiles, grès</li>
</ul>
<h3>II. Principaux gisements et leur formation</h3>
<p><strong>Or :</strong> La Côte d'Ivoire est le 2ème producteur d'or en Afrique de l'Ouest. Les gisements se trouvent dans les <strong>ceintures de roches vertes biriminines</strong> (Ity, Tongon, Bonikro, Agbaou).</p>
<ul>
  <li>Formation : <em>hydrothermalisme</em> → des fluides chauds riches en or circulent dans les fractures des roches vertes → précipitation de l'or dans les filons de quartz</li>
  <li>L'or se trouve également sous forme <em>alluvionnaire</em> (orpaillage dans les rivières) après érosion des gîtes primaires</li>
</ul>
<p><strong>Bauxite :</strong> Dépôts de Boke, Man, Touba.</p>
<ul>
  <li>Formation : <em>altération latéritique</em> → sous le climat tropical humide, les roches granitiques sont profondément altérées → lessivage de la silice et enrichissement en aluminium (Al₂O₃) et fer (Fe₂O₃) → formation des latérites bauxitiques</li>
</ul>
<p><strong>Manganèse :</strong> Grand-Lahou, Moanda. Formation sédimentaire marine en milieu anoxique.</p>
<p><strong>Nickel-Cobalt :</strong> Sipilou. Associé aux roches ultrabasiques (péridotites) et à leur altération latéritique.</p>
<p><strong>Pétrole et gaz :</strong> Off-shore, bassin sédimentaire (Abidjan). Formation par maturation thermique de la matière organique marine enfouie (kérogène → hydrocarbures).</p>
<h3>III. Tableau de synthèse</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Minerai</th><th>Zone</th><th>Processus de formation</th></tr>
  <tr><td>Or</td><td>Roches vertes biriminines</td><td>Hydrothermalisme</td></tr>
  <tr><td>Bauxite</td><td>Granites altérés (nord-ouest)</td><td>Altération latéritique</td></tr>
  <tr><td>Manganèse</td><td>Littoral / bassins sédimentaires</td><td>Sédimentation marine</td></tr>
  <tr><td>Nickel-cobalt</td><td>Roches ultrabasiques (ouest)</td><td>Altération latéritique</td></tr>
  <tr><td>Pétrole</td><td>Off-shore (bassin côtier)</td><td>Maturation thermique du kérogène</td></tr>
</table>`,
    examples: `<p><strong>Exemple 1 :</strong> La mine d'or de Tongon (nord de la CI), opérée par Randgold Resources, extrait l'or de roches volcaniques biriminiennes. L'or est dissous dans des fluides hydrothermaux à haute température (250-350°C) qui circulent dans des failles → précipitation lors du refroidissement.</p>
<p><strong>Exemple 2 :</strong> La bauxite se forme sous les tropiques car les précipitations abondantes (1 500-2 000 mm/an) favorisent l'altération chimique profonde. Au nord-ouest de la CI (Man, Touba), les conditions climatiques et les roches granitiques anciennes ont favorisé l'accumulation de bauxite.</p>`,
  },
  {
    title: "Leçon 13 : Les processus géologiques (métamorphisme, sédimentation, formation des roches)",
    subjectId: SVT_D_SUBJECT_ID,
    series: "D",
    order: 17,
    duration: 55,
    isPremium: false,
    summary: "Étudier les trois grands types de roches (magmatiques, sédimentaires, métamorphiques) et les processus de formation, avec le cycle des roches.",
    keyPoints: `Les roches magmatiques se forment par refroidissement du magma (plutoniques : granite ; volcaniques : basalte)
Les roches sédimentaires résultent de l'accumulation et de la lithification de sédiments (grès, calcaire, argile)
Les roches métamorphiques se forment par transformation d'une roche préexistante sous P et T élevées sans fusion
Le métamorphisme de contact (intrusion magmatique) vs métamorphisme régional (zones de subduction)
La diagenèse transforme les sédiments meubles en roches sédimentaires consolidées
Le cycle des roches (cycle lithologique) : magmatique → sédimentaire → métamorphique → fusion → magmatique
La lithosphère ivoirienne est dominée par des roches métamorphiques et magmatiques précambriennes`,
    content: `<h2>Les Processus Géologiques et la Formation des Roches</h2>
<h3>I. Les roches magmatiques</h3>
<p>Elles se forment par refroidissement et cristallisation du magma (roche en fusion).</p>
<ul>
  <li><strong>Roches plutoniques (intrusives)</strong> : magma refroidit lentement en profondeur → grands cristaux → granite, gabbro, diorite</li>
  <li><strong>Roches volcaniques (extrusives)</strong> : magma refroidit rapidement en surface → petits cristaux ou verre volcanique → basalte, rhyolite, andésite</li>
</ul>
<p>Composition chimique du magma : SiO₂ dominant (magma acide → granite, rhyolite ; magma basique → basalte, gabbro).</p>
<h3>II. Les roches sédimentaires</h3>
<p>Formation par sédimentation et diagenèse :</p>
<ol>
  <li><strong>Érosion</strong> : dégradation mécanique et chimique des roches</li>
  <li><strong>Transport</strong> : par l'eau, le vent, la glace</li>
  <li><strong>Dépôt (sédimentation)</strong> : accumulation de particules en couches (strates)</li>
  <li><strong>Diagenèse</strong> : compaction + cimentation → lithification (roches consolidées)</li>
</ol>
<p>Types : grès (sable cimenté), calcaire (CaCO₃ biogénique), argile, charbon (matière organique), sel (évaporites).</p>
<h3>III. Les roches métamorphiques</h3>
<p>Formées par transformation (à l'état solide) d'une roche préexistante sous l'action de <strong>température (T)</strong> et <strong>pression (P)</strong> élevées, sans fusion totale.</p>
<ul>
  <li><strong>Métamorphisme de contact</strong> : autour d'une intrusion magmatique → T élevée, P faible → cornéenne, marbre (calcaire métamorphisé), quartzite (grès métamorphisé)</li>
  <li><strong>Métamorphisme régional</strong> : zones de subduction ou collision → T et P très élevées → schiste, gneiss, éclogite</li>
</ul>
<h3>IV. Le cycle des roches</h3>
<p>Les roches évoluent en un cycle perpétuel :</p>
<ul>
  <li>Magma → refroidissement → roche magmatique</li>
  <li>Roche magmatique → érosion → sédimentation → roche sédimentaire</li>
  <li>Roche sédimentaire ou magmatique → enfouissement (P+T) → roche métamorphique</li>
  <li>Roche métamorphique → fusion → magma → cycle recommence</li>
</ul>`,
    examples: `<p><strong>Exemple 1 :</strong> Le granite (roche plutonique) se refroidit en profondeur sur des millions d'années → gros cristaux de quartz, feldspath et mica visibles à l'œil nu. Le basalte du plateau de Man (CI) est une roche volcanique : magma éjecté en surface → refroidissement rapide → texture microlithique.</p>
<p><strong>Exemple 2 :</strong> Les schistes biriminiens de la CI sont des argiles et des sédiments volcaniques transformés par métamorphisme régional (T ~400°C, P ~5 kbar) lors de la tectonique éburnéenne (2 Ga) → formation des roches vertes riches en minéraux métallifères.</p>`,
  },
  {
    title: "Leçon 14 : Les besoins énergétiques de la société et les ressources naturelles",
    subjectId: SVT_D_SUBJECT_ID,
    series: "D",
    order: 18,
    duration: 50,
    isPremium: false,
    summary: "Analyser les besoins en énergie de la société moderne, les différentes sources d'énergie (fossiles et renouvelables) et les enjeux du développement durable.",
    keyPoints: `Les énergies fossiles (pétrole, gaz, charbon) représentent ~80% de la consommation mondiale mais sont non renouvelables
La combustion des énergies fossiles libère du CO₂ → effet de serre renforcé → réchauffement climatique
Les énergies renouvelables : solaire, éolien, hydraulique, géothermie, biomasse
La Côte d'Ivoire produit de l'électricité surtout par l'hydroélectricité (barrages) et le gaz naturel
L'uranium produit l'énergie nucléaire (fission) : faible CO₂ mais déchets radioactifs
La transition énergétique vise à réduire les fossiles et développer les renouvelables
L'efficacité énergétique et la sobriété sont des solutions complémentaires`,
    content: `<h2>Les Besoins Énergétiques et les Ressources Naturelles</h2>
<h3>I. Les besoins énergétiques mondiaux</h3>
<p>La demande mondiale en énergie ne cesse d'augmenter avec la croissance démographique et le développement industriel. Les principaux secteurs consommateurs sont :</p>
<ul>
  <li>Industrie (30%)</li>
  <li>Transport (25%)</li>
  <li>Bâtiment (résidentiel + tertiaire) (35%)</li>
  <li>Agriculture (10%)</li>
</ul>
<h3>II. Les énergies fossiles</h3>
<p>Le pétrole, le charbon et le gaz naturel sont issus de la transformation de matière organique enregistrée sur des millions d'années (kérogène → hydrocarbures).</p>
<p>Avantages : haute densité énergétique, infrastructures existantes, coût historiquement faible.</p>
<p>Inconvénients : non renouvelables (réserves limitées), émettent CO₂ et CH₄ → réchauffement climatique, pollution locale (particules, SO₂, NOₓ).</p>
<h3>III. Les énergies renouvelables</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Source</th><th>Principe</th><th>Avantages/Inconvénients</th></tr>
  <tr><td>Solaire photovoltaïque</td><td>Cellules PV convertissent la lumière en électricité</td><td>Propre, inépuisable / intermittent, coût des batteries</td></tr>
  <tr><td>Éolien</td><td>Le vent actionne des turbines</td><td>Propre / intermittent, impact visuel</td></tr>
  <tr><td>Hydraulique</td><td>Énergie cinétique de l'eau (barrages)</td><td>Régulier, pilotable / impact écosystèmes fluviaux</td></tr>
  <tr><td>Géothermie</td><td>Chaleur interne de la Terre</td><td>Continu / géographiquement limité</td></tr>
  <tr><td>Biomasse</td><td>Combustion de matière organique</td><td>Stockable / émissions si non géré duralement</td></tr>
</table>
<h3>IV. Cas de la Côte d'Ivoire</h3>
<p>La CI couvre ses besoins électriques par :</p>
<ul>
  <li>Hydroélectricité (~40%) : barrages de Kossou, Taabo, Ayamé, Soubré</li>
  <li>Gaz naturel (~50%) : centrales thermiques (Azito, Ciprel)</li>
  <li>Pétrole : raffinerie de la SIR (Abidjan)</li>
</ul>
<p>Défis : développer le solaire (ensoleillement abondant), réduire la dépendance au gaz importé, électrifier les zones rurales.</p>`,
    examples: `<p><strong>Exemple 1 :</strong> Le barrage de Soubré (sur le Sassandra), inauguré en 2017, a une capacité de 275 MW. Son remplissage a déplacé des populations et modifié le régime hydrologique du fleuve. Ce compromis illustre les enjeux du développement durable.</p>
<p><strong>Exemple 2 :</strong> La Conférence de Paris (COP21, 2015) a fixé l'objectif de limiter le réchauffement à +1,5°C. Pour y parvenir, les pays doivent atteindre la neutralité carbone d'ici 2050, ce qui implique d'abandonner les énergies fossiles progressivement.</p>`,
  },
  {
    title: "Leçon 15 : Les conséquences de l'exploitation minière sur l'environnement et la santé",
    subjectId: SVT_D_SUBJECT_ID,
    series: "D",
    order: 19,
    duration: 50,
    isPremium: false,
    summary: "Analyser les impacts environnementaux et sanitaires de l'exploitation minière en Côte d'Ivoire et présenter les mesures de mitigation et de réhabilitation.",
    keyPoints: `L'exploitation minière cause des impacts environnementaux majeurs : déforestation, pollution des eaux et des sols, perte de biodiversité
Les métaux lourds (mercure, cyanure, arsenic) utilisés dans l'extraction de l'or contaminent les cours d'eau
L'orpaillage artisanal est particulièrement néfaste : utilisation de mercure, travail des enfants, risques d'accidents
La santé des populations riveraines est affectée : intoxication aux métaux lourds, maladies respiratoires (silicose), paludisme
Des mesures de réhabilitation existent : remblaiement, reboisement, traitement des eaux
Le code minier ivoirien impose des études d'impact environnemental (EIE) avant toute exploitation
Le développement minier durable nécessite un équilibre entre bénéfices économiques et protection de l'environnement`,
    content: `<h2>Conséquences de l'Exploitation Minière sur l'Environnement et la Santé</h2>
<h3>I. Impacts environnementaux</h3>
<p><strong>1. Déforestation et destruction des écosystèmes :</strong></p>
<ul>
  <li>Ouverture des mines à ciel ouvert → décapage de la végétation sur des hectares</li>
  <li>Destruction des forêts galeries et des zones humides</li>
  <li>Perte de biodiversité (faune et flore endémiques)</li>
</ul>
<p><strong>2. Pollution des eaux :</strong></p>
<ul>
  <li><em>Mercure</em> (Hg) : utilisé dans l'orpaillage artisanal pour amalgamer l'or → très toxique → contamination des rivières → bioaccumulation dans les poissons → intoxication humaine (maladie de Minamata)</li>
  <li><em>Cyanure</em> : utilisé dans les mines industrielles pour lessiver l'or → très toxique en cas de déversement accidentel</li>
  <li>Eaux acides (drainage minier acide) : oxydation des sulfures → SO₄²⁻ + H⁺ → acidification des rivières → mort des organismes aquatiques</li>
</ul>
<p><strong>3. Dégradation des sols :</strong></p>
<ul>
  <li>Mines à ciel ouvert → stériles (déchets de roche) → perturbation topographique</li>
  <li>Compaction et imperméabilisation des sols autour des sites</li>
</ul>
<h3>II. Impacts sur la santé humaine</h3>
<ul>
  <li><strong>Silicose</strong> : inhalation de poussières de silice par les mineurs → fibrose pulmonaire irréversible</li>
  <li><strong>Intoxication au mercure</strong> : tremblements, troubles neuropsychiatriques, malformations congénitales</li>
  <li><strong>Paludisme et maladies vectorielles</strong> : les excavations créent des plans d'eau stagnante → prolifération des moustiques</li>
  <li>Traumatismes et accidents de travail dans les mines artisanales</li>
</ul>
<h3>III. Mesures de mitigation et réhabilitation</h3>
<ul>
  <li>Étude d'Impact Environnemental et Social (EIES) obligatoire avant toute exploitation</li>
  <li>Traitement des eaux minières avant rejet (neutralisation, décantation)</li>
  <li>Remblaiement et réaménagement des carrières en fin d'exploitation</li>
  <li>Reboisement des zones déboisées</li>
  <li>Substitution du mercure dans l'orpaillage artisanal (tables à secousses, gravimétrie)</li>
  <li>Renforcement du Code minier et inspections régulières</li>
</ul>`,
    examples: `<p><strong>Exemple 1 :</strong> Dans la région d'Ity (Toulepleu), des études ont révélé des concentrations de mercure au-dessus des normes OMS dans les rivières et dans les cheveux des orpailleurs artisanaux. Les enfants travaillant sur ces sites présentent des retards cognitifs liés à l'intoxication au Hg.</p>
<p><strong>Exemple 2 :</strong> La mine industrielle d'Agbaou (opérée par Endeavour Mining) applique un plan de gestion environnementale : recyclage des eaux, dépôts de résidus étanches, boisement compensatoire et fonds de réhabilitation de 5 millions USD déposés auprès du gouvernement ivoirien.</p>`,
  },
  {
    title: "Leçon 16 : Formation et composition des sols",
    subjectId: SVT_D_SUBJECT_ID,
    series: "D",
    order: 20,
    duration: 50,
    isPremium: false,
    summary: "Décrire les processus de pédogenèse, la composition et la structure verticale du sol (horizons pédologiques) et les types de sols en Côte d'Ivoire.",
    keyPoints: `Le sol est un système complexe formé par l'altération de la roche mère sous l'action du climat, des organismes vivants, du relief et du temps
La pédogenèse est la science de la formation des sols
Le profil pédologique présente des horizons : A (humus, matière organique) → B (illuviation) → C (roche mère altérée) → R (roche mère)
La matière organique du sol = humus (produit de décomposition par les décomposeurs : champignons, bactéries, vers)
La fraction minérale : argile + limon + sable (texture) détermine les propriétés physiques du sol
La capacité d'échange cationique (CEC) dépend de la teneur en argile et en humus
Les ferralsols (sols latéritiques) dominent en Côte d'Ivoire (riches en Fe₂O₃, Al₂O₃, pauvres en nutriments)`,
    content: `<h2>Formation et Composition des Sols</h2>
<h3>I. Définition et formation du sol (pédogenèse)</h3>
<p>Le <strong>sol</strong> est la couche superficielle de l'écorce terrestre, formée par l'altération de la roche mère sous l'influence de facteurs pédogénétiques :</p>
<ul>
  <li><strong>Roche mère</strong> : substrat géologique de départ (granite, basalte, calcaire...)</li>
  <li><strong>Climat</strong> : températures et précipitations → vitesse d'altération chimique</li>
  <li><strong>Organismes</strong> : végétaux (racines), animaux (vers de terre), microorganismes (bactéries, champignons) → matière organique et bioturbation</li>
  <li><strong>Relief/topographie</strong> : influence l'érosion et le drainage</li>
  <li><strong>Temps</strong> : plus un sol est vieux, plus il est évolué (latéritisation en zone tropicale)</li>
</ul>
<h3>II. Le profil pédologique</h3>
<p>Un sol mature présente des <strong>horizons</strong> superposés :</p>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Horizon</th><th>Nom</th><th>Caractéristiques</th></tr>
  <tr><td>O</td><td>Organique</td><td>Litière : feuilles mortes, débris végétaux</td></tr>
  <tr><td>A</td><td>Humifère</td><td>Mélange matière organique (humus) + minéraux → couleur sombre</td></tr>
  <tr><td>E</td><td>Éluvial</td><td>Lessivage des éléments (argiles, oxydes)</td></tr>
  <tr><td>B</td><td>Illuvial</td><td>Accumulation des éléments lessivés de A/E → argile, oxydes</td></tr>
  <tr><td>C</td><td>Roche altérée</td><td>Roche mère en voie d'altération (altérite)</td></tr>
  <tr><td>R</td><td>Roche mère</td><td>Roche consolidée, non altérée</td></tr>
</table>
<h3>III. Composition du sol</h3>
<p>Le sol est composé de :</p>
<ul>
  <li><strong>Fraction minérale</strong> (45%) : argile (< 2 µm), limon (2-50 µm), sable (50 µm-2 mm) → détermine la texture</li>
  <li><strong>Matière organique</strong> (5%) : humus, racines, organismes vivants</li>
  <li><strong>Eau</strong> (25%) : eau de gravité + eau capillaire + eau liée</li>
  <li><strong>Air</strong> (25%) : O₂, CO₂, N₂ dans les pores</li>
</ul>
<h3>IV. Les sols de Côte d'Ivoire</h3>
<p>Sous le climat tropical humide, la pédogenèse produit principalement des <strong>ferralsols</strong> (ou sols ferrallitiques / latérites) :</p>
<ul>
  <li>Enrichis en oxydes de fer (Fe₂O₃ → couleur rouge) et d'aluminium (Al₂O₃)</li>
  <li>Appauvris en bases (Ca²⁺, Mg²⁺, K⁺) → faible fertilité naturelle</li>
  <li>Indurés en profondeur (cuirasse latéritique)</li>
  <li>La forêt dense fournit l'humus indispensable → déforestation → perte rapide de fertilité</li>
</ul>`,
    examples: `<p><strong>Exemple 1 :</strong> En zone forestière ivoirienne (Côte d'Ivoire Sud), le sol forestier a un horizon A riche en humus (5-10% de MO) qui nourrit les cultures. Après déforestation pour la culture du cacao ou du café, l'humus se dégrade en 5-10 ans → appauvrissement du sol.</p>
<p><strong>Exemple 2 :</strong> La cuirasse latéritique (laterite) est une roche très dure formée par l'induration de l'horizon B sous les tropiques. Elle est utilisée comme matériau de construction (pisé, blocs) dans les villages du nord de la CI, mais sa formation signe l'épuisement du sol.</p>`,
  },
  {
    title: "Leçon 17 : Rôle du sol dans l'agriculture et la productivité",
    subjectId: SVT_D_SUBJECT_ID,
    series: "D",
    order: 21,
    duration: 50,
    isPremium: false,
    summary: "Analyser les fonctions agronomiques du sol et les facteurs qui déterminent la fertilité et la productivité agricole.",
    keyPoints: `Le sol fournit aux plantes : eau, nutriments minéraux (N, P, K, Ca, Mg, S et oligo-éléments), ancrage, atmosphère racinaire
La fertilité du sol dépend de la texture (argile-limon-sable), de la structure, du pH et de la teneur en matière organique
L'azote (N) est le nutriment le plus limitant : assimilé sous forme NH₄⁺ et NO₃⁻
Le cycle de l'azote : fixation biologique (Rhizobium) → nitrification → dénitrification
Le pH optimal pour la plupart des cultures est 6,0-7,0 (légèrement acide)
Les amendements (chaux, compost) et les engrais (NPK) améliorent la fertilité
L'agriculture durable cherche à maintenir la fertilité du sol à long terme`,
    content: `<h2>Rôle du Sol dans l'Agriculture</h2>
<h3>I. Fonctions agronomiques du sol</h3>
<p>Le sol joue un rôle fondamental pour les plantes cultivées :</p>
<ul>
  <li><strong>Support mécanique</strong> : ancrage des racines (surtout important pour les arbres)</li>
  <li><strong>Réservoir d'eau</strong> : eau capillaire disponible pour les plantes (capacité de rétention en eau)</li>
  <li><strong>Réservoir de nutriments</strong> : N, P, K (macroéléments) + Ca, Mg, S + Fe, Zn, Mn, Cu (oligo-éléments)</li>
  <li><strong>Activité biologique</strong> : bactéries, champignons mycorhiziens → décomposition de la MO → libération de nutriments</li>
  <li><strong>Tampon chimique</strong> : régule le pH, contrôle la disponibilité des nutriments</li>
</ul>
<h3>II. La fertilité du sol</h3>
<p>La <strong>fertilité</strong> est la capacité du sol à produire des rendements élevés. Elle dépend de :</p>
<ul>
  <li><strong>Texture</strong> : sol limoneux = idéal (retient eau et nutriments mais bien drainé)</li>
  <li><strong>Structure</strong> : agrégats stables → bonne porosité → enracinement facile</li>
  <li><strong>pH</strong> : 6,0-7,0 optimal. pH < 5 → toxicité Al³⁺, Mn²⁺ ; pH > 8 → carence en Fe, P</li>
  <li><strong>Matière organique</strong> : améliore la structure, la CEC, l'activité biologique</li>
</ul>
<h3>III. Le cycle de l'azote</h3>
<ol>
  <li><strong>Fixation biologique</strong> : Rhizobium (légumineuses) et Azotobacter (sol) → N₂ atmosphérique → NH₃</li>
  <li><strong>Ammonification</strong> : décomposition de la MO → NH₄⁺</li>
  <li><strong>Nitrification</strong> : NH₄⁺ → NO₂⁻ → NO₃⁻ (bactéries Nitrosomonas, Nitrobacter)</li>
  <li><strong>Absorption racinaire</strong> : plantes assimilent NH₄⁺ et NO₃⁻</li>
  <li><strong>Dénitrification</strong> : NO₃⁻ → N₂ (anaérobie) → pertes gazeuses</li>
</ol>
<h3>IV. Améliorer la fertilité</h3>
<ul>
  <li><strong>Amendements organiques</strong> : compost, fumier → apportent MO et nutriments</li>
  <li><strong>Amendements calco-magnésiens</strong> : chaux → neutralise l'acidité</li>
  <li><strong>Engrais minéraux NPK</strong> : apport direct de nutriments (à utiliser avec précaution pour éviter la pollution)</li>
  <li><strong>Rotation des cultures</strong> : légumineuses → enrichissent le sol en N</li>
  <li><strong>Jachère améliorée</strong> : rétablissement de la fertilité naturelle</li>
</ul>`,
    examples: `<p><strong>Exemple 1 :</strong> La culture du café en Côte d'Ivoire (région de Daloa) se fait sur des ferralsols pauvres en bases. L'application régulière de compost issu des pulpes de café et d'un amendement calcique a permis de relever le pH de 4,8 à 5,8 → augmentation des rendements de 30%.</p>
<p><strong>Exemple 2 :</strong> L'Association niébé-maïs : le niébé (légumineuse) fixe l'azote atmosphérique via Rhizobium → enrichit le sol en azote disponible pour le maïs → moins d'engrais nécessaire → économies pour le petit agriculteur.</p>`,
  },
  {
    title: "Leçon 18 : Dégradation des sols et mesures de conservation",
    subjectId: SVT_D_SUBJECT_ID,
    series: "D",
    order: 22,
    duration: 50,
    isPremium: false,
    summary: "Identifier les principaux processus de dégradation des sols (érosion, salinisation, acidification, pollution) et les pratiques de conservation et de réhabilitation.",
    keyPoints: `L'érosion (hydrique et éolienne) est la principale cause de perte de sol dans le monde
La déforestation favorise l'érosion hydrique : pluies directes + ruissellement
La salinisation résulte de l'irrigation mal gérée (sel s'accumule à la surface)
L'acidification est accentuée par les pluies acides et les engrais azotés (NH₄⁺)
La pollution des sols par les pesticides, les métaux lourds et les déchets industriels
Les techniques de conservation : agroforesterie, couverture végétale permanente, terrasses, haies vives
La lutte contre la désertification est cruciale dans le nord de la Côte d'Ivoire`,
    content: `<h2>Dégradation des Sols et Mesures de Conservation</h2>
<h3>I. L'érosion des sols</h3>
<p>L'érosion est l'arrachement et le transport des particules du sol par les agents physiques.</p>
<p><strong>Érosion hydrique :</strong></p>
<ul>
  <li>Splash (impact des gouttes) → décolle les agrégats</li>
  <li>Ruissellement en nappe → transport des particules</li>
  <li>Ravinement → formation de ravines et de badlands</li>
</ul>
<p>Facteurs aggravants : déforestation (absence de couvert), sols nus, fortes pentes, pluies intenses tropicales.</p>
<p><strong>Érosion éolienne :</strong> dans les zones sahéliennes (nord CI) → désertification. Les sols sableux fins sont emportés → erg (dunes).</p>
<h3>II. La salinisation</h3>
<p>Accumulation de sels solubles (NaCl, Na₂SO₄...) dans les horizons superficiels du sol.</p>
<ul>
  <li>Cause principale : irrigation avec de l'eau chargée en sel + évaporation intense → sel remonte par capillarité</li>
  <li>Conséquences : sol blanc encroûté → toxicité des ions Na⁺ et Cl⁻ pour les plantes → perte de rendement voire mort végétale</li>
  <li>Zones touchées : périmètres irrigués (deltas, zones arides)</li>
</ul>
<h3>III. L'acidification</h3>
<ul>
  <li>Pluies acides (SO₂ + NOₓ → H₂SO₄ + HNO₃) → lessivage des bases</li>
  <li>Fertilisation ammoniacale excessive → nitrification → H⁺ libéré</li>
  <li>Sous les tropiques : pluies abondantes → lessivage naturel des bases → sols naturellement acides</li>
  <li>pH trop bas → toxicité Al³⁺, Mn²⁺ → blocage de l'absorption de P et des bases</li>
</ul>
<h3>IV. La pollution des sols</h3>
<ul>
  <li>Pesticides (herbicides, insecticides) → tuent les microorganismes du sol, pollution des nappes phréatiques</li>
  <li>Métaux lourds (Pb, Cd, Hg, As) → mines, peintures, industrie → bioaccumulation dans la chaîne alimentaire</li>
  <li>Déchets plastiques → obstacle à la vie biologique du sol</li>
</ul>
<h3>V. Mesures de conservation</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Technique</th><th>Principe</th></tr>
  <tr><td>Agroforesterie</td><td>Arbres + cultures → ombrage, litière, fixation N, protection du sol</td></tr>
  <tr><td>Couverture végétale</td><td>Sol nu toujours couvert (mulch, résidus de culture) → protection contre l'érosion</td></tr>
  <tr><td>Terrasses / banquettes</td><td>Réduire la pente → ralentir le ruissellement</td></tr>
  <tr><td>Haies vives</td><td>Brise-vent, fixation du sol en pente</td></tr>
  <tr><td>Chaulage</td><td>Corriger l'acidité → améliorer la disponibilité des nutriments</td></tr>
</table>`,
    examples: `<p><strong>Exemple 1 :</strong> Dans les collines de l'Ouest ivoirien (Man, Danané), la déforestation pour les cultures vivrières expose les pentes aux pluies (1 600 mm/an). Des ravines de plusieurs mètres de profondeur se forment en quelques années → perte irréversible du sol arable.</p>
<p><strong>Exemple 2 :</strong> Le projet ANADER en CI promeut l'agroforesterie cacao-arbres d'ombrage (Terminalia superba, Albizia spp.) → maintien du couvert, litière organique, moins d'engrais nécessaire, meilleure résistance au changement climatique.</p>`,
  },
  {
    title: "Leçon 19 : Les sols de Côte d'Ivoire et leur importance pour l'économie agricole",
    subjectId: SVT_D_SUBJECT_ID,
    series: "D",
    order: 23,
    duration: 50,
    isPremium: false,
    summary: "Présenter les principaux types de sols de Côte d'Ivoire, leur distribution géographique et leur rôle dans les grandes cultures agricoles (cacao, café, hévéa, coton, riz).",
    keyPoints: `La CI est le premier producteur mondial de cacao (2 millions de tonnes/an)
Les sols ferrallitiques dominent au sud (zone forestière) : adaptés au cacao, café, hévéa, palmier à huile
Les sols ferrugineux tropicaux se trouvent au centre et nord (savane) : coton, anacarde, igname, mil
Les sols hydromorphes des bas-fonds sont exploités pour la riziculture irriguée
La zonation Nord-Sud des sols correspond à un gradient pluviométrique (> 1 600 mm au sud, < 1 000 mm au nord)
Le cacao constitue 40% des recettes d'exportation de la CI
La durabilité agricole est menacée par la déforestation accélérée : seulement 3% de forêt primaire restante`,
    content: `<h2>Les Sols de Côte d'Ivoire et l'Économie Agricole</h2>
<h3>I. Les principaux types de sols</h3>
<p><strong>1. Sols ferrallitiques (ferralsols) :</strong></p>
<ul>
  <li>Localisation : zone forestière sud et centre-ouest (Abidjan, San-Pédro, Man)</li>
  <li>Caractéristiques : rouges-jaunes, acides (pH 4,5-5,5), pauvres en bases, riches en Fe₂O₃ et Al₂O₃</li>
  <li>Cultures : cacao, café robusta, hévéa, palmier à huile</li>
</ul>
<p><strong>2. Sols ferrugineux tropicaux :</strong></p>
<ul>
  <li>Localisation : zone de savane centro-nord (Bouaké, Korhogo, Daloa)</li>
  <li>Caractéristiques : beige-rougeâtres, texture sablo-argileuse, pH 5,5-6,5, moins lessivés</li>
  <li>Cultures : coton, anacarde (noix de cajou), igname, maïs, mil</li>
</ul>
<p><strong>3. Sols hydromorphes :</strong></p>
<ul>
  <li>Localisation : bas-fonds, vallées fluviales (Bandama, Sassandra, Comoé)</li>
  <li>Caractéristiques : engorgés, riches en MO, argiles gonflantes (vertisols)</li>
  <li>Cultures : riz, cultures maraîchères</li>
</ul>
<h3>II. Les grandes cultures et leur rapport aux sols</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Culture</th><th>Production mondiale</th><th>Zone/Sol</th><th>Enjeux</th></tr>
  <tr><td>Cacao</td><td>1er mondial (40% PIB agricole)</td><td>Ferrallitique sud</td><td>Déforestation, changement climatique</td></tr>
  <tr><td>Café</td><td>4ème en Afrique</td><td>Ferrallitique ouest</td><td>Concurrence, vieillissement des plants</td></tr>
  <tr><td>Hévéa</td><td>3ème en Afrique</td><td>Ferrallitique SW</td><td>Monoculture, empreinte eau</td></tr>
  <tr><td>Anacarde</td><td>1er mondial</td><td>Ferrugineux nord</td><td>Valeur ajoutée locale à développer</td></tr>
  <tr><td>Coton</td><td>Régional</td><td>Ferrugineux nord</td><td>Pesticides, dégradation des sols</td></tr>
</table>
<h3>III. Défis pour la durabilité agricole</h3>
<ul>
  <li>La frontière agricole s'est considérablement avancée depuis les années 1960 → 90% des forêts denses ont été défrichées</li>
  <li>Le cacao ivoirien pousse souvent dans des zones protégées illégalement (forêt classée du Cavally, Taï)</li>
  <li>Programme de certification durable : Rainforest Alliance, UTZ, Fair Trade → meilleure gestion des sols</li>
</ul>`,
    examples: `<p><strong>Exemple 1 :</strong> La "cacaoculture durable" promue par les programmes REDD+ en CI vise à tripler les rendements de cacao sur les terres déjà défrichées (intensification) plutôt que d'étendre les surfaces. Objectif : produire 2 Mt de cacao sans déforestation supplémentaire.</p>
<p><strong>Exemple 2 :</strong> Dans le nord de la CI (Korhogo), les sols ferrugineux tropicaux, bien que moins fertiles, permettent la culture de l'anacarde (Anacardium occidentale). La CI est devenue le 1er producteur mondial de noix de cajou brute, mais la transformation locale reste insuffisante (85% exportée brute).</p>`,
  },
  {
    title: "Leçon 20 : Les bases de la génétique (chromosomes, gènes, allèles, croisements)",
    subjectId: SVT_D_SUBJECT_ID,
    series: "D",
    order: 24,
    duration: 60,
    isPremium: false,
    summary: "Maîtriser les concepts fondamentaux de la génétique : chromosome, gène, allèle, dominance, récessivité, et appliquer les lois de Mendel aux croisements mono et dihybrides.",
    keyPoints: `Chromosome = structure d'ADN + protéines (histones), portant les gènes
Gène = séquence d'ADN codant pour un caractère héréditaire ; chaque gène a un locus précis
Allèle = forme alternative d'un gène (A et a sont 2 allèles du même gène)
Homozygote : 2 allèles identiques (AA ou aa) / Hétérozygote : 2 allèles différents (Aa)
Loi de Mendel I (ségrégation) : les 2 allèles d'un gène se séparent lors de la méiose
Loi de Mendel II (assortiment indépendant) : 2 gènes sur des chromosomes différents se séparent indépendamment
Phénotype = caractère observable / Génotype = composition allélique
Dominance : l'allèle dominant (A) s'exprime dans Aa / Récessivité : l'allèle récessif (a) ne s'exprime que dans aa`,
    content: `<h2>Les Bases de la Génétique</h2>
<h3>I. Vocabulaire fondamental</h3>
<ul>
  <li><strong>Chromosome</strong> : structure d'ADN enroulé autour d'histones. L'homme a 2n = 46 chromosomes (23 paires). Les chromosomes 1-22 = autosomes ; paires 23 = gonosomes (XX chez la femme, XY chez l'homme)</li>
  <li><strong>Gène</strong> : segment d'ADN codant pour une protéine ou un ARN. Chaque gène occupe un <em>locus</em> précis sur un chromosome</li>
  <li><strong>Allèle</strong> : version alternative d'un gène. Ex : allèle A (groupe A) et allèle B (groupe B) pour le gène ABO</li>
  <li><strong>Génotype</strong> : composition allélique d'un individu (AA, Aa, aa)</li>
  <li><strong>Phénotype</strong> : caractère observable (résulte du génotype + environnement)</li>
</ul>
<h3>II. Les lois de Mendel</h3>
<p><strong>1ère loi (Uniformité des hybrides F1) :</strong><br>
En croisant deux parents purs (PP × pp), tous les descendants F1 ont le même phénotype → <strong>dominance</strong> de l'allèle P.</p>
<p>Ex. : plante pois AA (lisse) × aa (ridé) → tous Aa (lisse) en F1.</p>
<p><strong>2ème loi (Ségrégation des allèles) :</strong><br>
En F2 (croisement F1 × F1) : Aa × Aa → AA : 2Aa : aa en proportion 1:2:1 (génotypique) et 3:1 (phénotypique : 3 lisses pour 1 ridé).</p>
<p><strong>3ème loi (Indépendance des gènes) :</strong><br>
Pour deux gènes sur des chromosomes différents : AABB × aabb → F1 : AaBb → F2 : 9 A_B_ : 3 A_bb : 3 aaB_ : 1 aabb (ratio 9:3:3:1).</p>
<h3>III. Tableau de Punnett</h3>
<p>Outil pour prédire les génotypes des descendants. Ex. : Aa × Aa :</p>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th></th><th>A</th><th>a</th></tr>
  <tr><th>A</th><td>AA</td><td>Aa</td></tr>
  <tr><th>a</th><td>Aa</td><td>aa</td></tr>
</table>
<p>Résultat : 1/4 AA + 2/4 Aa + 1/4 aa → 3/4 phénotype dominant + 1/4 phénotype récessif</p>
<h3>IV. Hérédité liée au sexe</h3>
<p>Les gènes portés par le chromosome X s'expriment différemment chez l'homme (X¹Y) et la femme (X¹X²).</p>
<p>Exemple : daltonisme (allèle récessif X^d). Femme X^D X^d = porteuse saine / Homme X^d Y = daltonien.</p>`,
    examples: `<p><strong>Exemple 1 – Monohybridisme :</strong> Drépanocytose : allèle normal HbA (dominant) × allèle drépanocytaire HbS (récessif). Parents porteurs sains HbA/HbS × HbA/HbS → 1/4 HbS/HbS (drépanocytaire), 1/2 porteurs sains, 1/4 normaux.</p>
<p><strong>Exemple 2 – Groupe sanguin (codominance) :</strong> IA et IB sont codominants : un individu IA/IB est du groupe AB. i est récessif : ii → groupe O. Tableau de Punnett pour IA/i × IB/i → 1/4 groupe AB + 1/4 groupe A + 1/4 groupe B + 1/4 groupe O.</p>`,
  },
  {
    title: "Leçon 21 : Les mécanismes de l'évolution (mutations, sélection naturelle, spéciation)",
    subjectId: SVT_D_SUBJECT_ID,
    series: "D",
    order: 25,
    duration: 55,
    isPremium: false,
    summary: "Comprendre les mécanismes évolutifs : mutations, dérive génétique, sélection naturelle darwinienne, et les processus de spéciation (formation de nouvelles espèces).",
    keyPoints: `La théorie de l'évolution de Darwin (1859) : variation + sélection naturelle → adaptation
Les mutations de l'ADN sont la source première de la variation génétique (aléatoires, héritables si germinales)
La sélection naturelle élimine les individus les moins adaptés à leur milieu
La dérive génétique est un changement aléatoire de fréquences alléliques dans les petites populations
La spéciation = formation de nouvelles espèces → nécessite un isolement reproducteur
Spéciation allopatrique : séparation géographique → accumulation de différences génétiques
Spéciation sympatrique : même lieu mais isolement reproducteur (polyploïdie chez les végétaux)
Les preuves de l'évolution : fossiles, anatomie comparée, biochimie moléculaire (ADN)`,
    content: `<h2>Les Mécanismes de l'Évolution</h2>
<h3>I. La théorie de Darwin et la sélection naturelle</h3>
<p>Charles Darwin (1859, <em>L'Origine des espèces</em>) a proposé que l'évolution résulte de :</p>
<ol>
  <li><strong>Variation</strong> : les individus d'une population ne sont pas identiques</li>
  <li><strong>Hérédité</strong> : les caractères se transmettent aux descendants</li>
  <li><strong>Surproduction</strong> : plus d'individus naissent qu'il ne peut en survivre</li>
  <li><strong>Sélection naturelle</strong> : les individus les mieux adaptés survivent et se reproduisent davantage</li>
</ol>
<p>La sélection agit sur le <strong>phénotype</strong> mais ce sont les <strong>gènes</strong> (génotype) qui sont transmis → fréquences alléliques changent au fil des générations.</p>
<h3>II. Les sources de variation génétique</h3>
<ul>
  <li><strong>Mutations</strong> : modification de la séquence d'ADN. Peuvent être ponctuelles (substitution d'un nucléotide), insertions, délétions. Aléatoires, mais leur fréquence est augmentée par les mutagènes (UV, radiations, substances chimiques).</li>
  <li><strong>Recombinaison génétique</strong> (crossing-over lors de la méiose I) → brassage intrachromosomique</li>
  <li><strong>Fécondation aléatoire</strong> → brassage interchromosomique</li>
  <li><strong>Migration</strong> (flux de gènes entre populations)</li>
</ul>
<h3>III. La dérive génétique</h3>
<p>Dans les petites populations, les fréquences alléliques fluctuent aléatoirement (hasard des reproductions) → certains allèles peuvent être fixés ou perdus sans avantage sélectif.</p>
<ul>
  <li><strong>Effet fondateur</strong> : une petite population colonise un nouveau milieu → faible diversité génétique initiale</li>
  <li><strong>Goulot d'étranglement</strong> : réduction drastique d'une population → perte de diversité allélique</li>
</ul>
<h3>IV. La spéciation</h3>
<p>La spéciation est le processus par lequel une population se divise en deux ou plusieurs espèces distinctes.</p>
<p><strong>Spéciation allopatrique (par isolement géographique) :</strong></p>
<ol>
  <li>Isolement géographique (montagne, mer, désert) sépare deux populations de la même espèce</li>
  <li>Les mutations et la sélection naturelle s'accumulent différemment dans chaque population</li>
  <li>Après suffisamment de temps → isolement reproducteur → deux espèces distinctes</li>
</ol>
<p><strong>Spéciation sympatrique :</strong> même territoire, mais isolement reproducteur (changement de comportement, polyploïdie chez les plantes). Ex. : blé hexaploïde (6n) résulte de 3 hybridations + polyploïdisations.</p>
<h3>V. Les preuves de l'évolution</h3>
<ul>
  <li><strong>Fossiles</strong> : montrent la succession des formes de vie au cours des temps géologiques</li>
  <li><strong>Anatomie comparée</strong> : organes homologues (même origine, fonctions différentes) → ex. : bras humain, aile de chauve-souris, nageoire de dauphin</li>
  <li><strong>Biologie moléculaire</strong> : comparaison des séquences d'ADN/protéines → plus les séquences sont similaires, plus les espèces sont proches</li>
  <li><strong>Biogéographie</strong> : répartition géographique des espèces (îles, continents)</li>
</ul>`,
    examples: `<p><strong>Exemple 1 – Résistance aux antibiotiques :</strong> Les bactéries sensibles à la pénicilline meurent. Celles qui ont une mutation conférant la résistance survivent et se reproduisent → sélection naturelle → en quelques générations, la majorité de la population bactérienne est résistante.</p>
<p><strong>Exemple 2 – Pinsons de Darwin :</strong> En colonisant les Galápagos depuis le continent, une petite population de pinsons (effet fondateur) s'est différenciée en 14 espèces selon les niches écologiques disponibles (insectivores, granivores, nectarivores). Chaque île a sélectionné les individus les mieux adaptés à ses ressources.</p>`,
  },
];

const svtDExercises = [
  // Leçon 1 : Tissu musculaire
  { lessonOrder: 5, question: "Quelle est l'unité contractile de base du muscle strié squelettique ?", type: "mcq", difficulty: "easy", options: ["La myofibrille", "Le sarcomère", "La fibre musculaire", "La myosine"], correctAnswer: "Le sarcomère", explanation: "Le sarcomère est l'unité contractile délimitée entre deux stries Z. C'est le raccourcissement des sarcomères qui produit la contraction musculaire visible." },
  { lessonOrder: 5, question: "Lors de la contraction musculaire, l'ATP est nécessaire pour :", type: "mcq", difficulty: "medium", options: ["Former les filaments de myosine", "Rompre les ponts actomyosine et permettre le pivotement des têtes de myosine", "Libérer le calcium du cytoplasme", "Synthétiser de nouvelles protéines musculaires"], correctAnswer: "Rompre les ponts actomyosine et permettre le pivotement des têtes de myosine", explanation: "L'ATP est hydrolysée par la myosine ATPase. Elle est indispensable à la fois pour le pivotement (contraction) et pour le détachement des ponts actomyosine (permettant le cycle suivant)." },
  { lessonOrder: 5, question: "La bande A du sarcomère reste de longueur constante lors de la contraction musculaire.", type: "true_false", difficulty: "medium", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "La bande A correspond à la zone occupée par les filaments de myosine, dont la longueur ne change pas lors de la contraction. C'est la bande I et la zone H qui raccourcissent (théorie des filaments glissants)." },

  // Leçon 2 : Tissu nerveux
  { lessonOrder: 6, question: "Quelle est la valeur du potentiel de repos d'un neurone ?", type: "mcq", difficulty: "easy", options: ["+40 mV", "-70 mV", "0 mV", "-55 mV"], correctAnswer: "-70 mV", explanation: "Le potentiel de repos est d'environ -70 mV. L'intérieur de la membrane est négatif par rapport à l'extérieur, maintenu par la pompe Na⁺/K⁺-ATPase qui expulse 3 Na⁺ pour 2 K⁺ entrants." },
  { lessonOrder: 6, question: "Lors d'une synapse chimique excitatrice, le neurotransmetteur provoque :", type: "mcq", difficulty: "medium", options: ["Une hyperpolarisation du neurone postsynaptique", "Une dépolarisation du neurone postsynaptique", "Une inhibition du neurone présynaptique", "La fermeture des canaux Na⁺ postsynaptiques"], correctAnswer: "Une dépolarisation du neurone postsynaptique", explanation: "À une synapse excitatrice (ex. : acétylcholine), le neurotransmetteur se lie à ses récepteurs → ouverture des canaux Na⁺ → entrée de Na⁺ → dépolarisation (PPSE = Potentiel Post-Synaptique Excitateur)." },
  { lessonOrder: 6, question: "La conduction saltatoire le long d'un axone myélinisé est plus lente que la conduction le long d'un axone non myélinisé.", type: "true_false", difficulty: "easy", options: ["Vrai", "Faux"], correctAnswer: "Faux", explanation: "La conduction saltatoire est au contraire plus RAPIDE. La myéline isole l'axone et le PA saute d'un nœud de Ranvier au suivant, ce qui accélère considérablement la conduction (jusqu'à 100 m/s vs 1 m/s sans myéline)." },

  // Leçon 3 : Communication neuro-hormonale
  { lessonOrder: 7, question: "Quel organe est considéré comme le centre intégrateur du système neuro-endocrine ?", type: "mcq", difficulty: "easy", options: ["L'hypophyse", "La thyroïde", "L'hypothalamus", "Les surrénales"], correctAnswer: "L'hypothalamus", explanation: "L'hypothalamus est le centre intégrateur du système neuro-endocrine. Il produit des neurohormones (releasing hormones) qui contrôlent l'hypophyse, qui elle-même régule les glandes endocrines périphériques." },
  { lessonOrder: 7, question: "Le rétrocontrôle négatif exercé par les hormones périphériques sur l'axe hypothalamo-hypophysaire permet :", type: "mcq", difficulty: "medium", options: ["D'amplifier la production hormonale", "De maintenir des taux hormonaux stables (homéostasie)", "De déclencher l'ovulation", "D'augmenter la fréquence cardiaque"], correctAnswer: "De maintenir des taux hormonaux stables (homéostasie)", explanation: "Le rétrocontrôle négatif fonctionne en boucle : si l'hormone T est trop élevée, elle inhibe l'hypothalamus et l'hypophyse qui réduisent leur sécrétion → T revient à la normale. C'est le principal mécanisme homéostatique du système endocrine." },
  { lessonOrder: 7, question: "Les hormones stéroïdes agissent en se liant à des récepteurs membranaires car elles ne peuvent pas traverser la membrane plasmique.", type: "true_false", difficulty: "medium", options: ["Vrai", "Faux"], correctAnswer: "Faux", explanation: "Les hormones stéroïdes sont lipophiles (dérivées du cholestérol) et TRAVERSENT facilement la membrane plasmique. Elles se lient à des récepteurs intracellulaires et agissent directement sur l'expression des gènes. Ce sont les hormones peptidiques qui utilisent des récepteurs membranaires." },

  // Leçon 4 : Cœur
  { lessonOrder: 8, question: "Quelle structure cardiaque joue le rôle de pacemaker naturel ?", type: "mcq", difficulty: "easy", options: ["Le nœud auriculo-ventriculaire", "Le faisceau de His", "Le nœud sinusal (sino-auriculaire)", "Les fibres de Purkinje"], correctAnswer: "Le nœud sinusal (sino-auriculaire)", explanation: "Le nœud sinusal (Keith-Flack), situé dans l'oreillette droite, génère spontanément des potentiels d'action à une fréquence de 70/min environ. C'est le pacemaker naturel du cœur qui impulse le rythme à toutes les autres cellules cardiaques." },
  { lessonOrder: 8, question: "Sur un électrocardiogramme (ECG), le complexe QRS correspond à :", type: "mcq", difficulty: "medium", options: ["La dépolarisation des oreillettes (systole auriculaire)", "La repolarisation des ventricules (diastole)", "La dépolarisation des ventricules (systole ventriculaire)", "Le remplissage passif des ventricules"], correctAnswer: "La dépolarisation des ventricules (systole ventriculaire)", explanation: "Le complexe QRS représente la dépolarisation (contraction) des ventricules. L'onde P correspond à la dépolarisation des oreillettes et l'onde T à la repolarisation (relaxation) des ventricules." },
  { lessonOrder: 8, question: "La stimulation du nerf vague (système parasympathique) augmente la fréquence cardiaque.", type: "true_false", difficulty: "easy", options: ["Vrai", "Faux"], correctAnswer: "Faux", explanation: "La stimulation du nerf vague (parasympathique) libère de l'acétylcholine sur le nœud sinusal → DIMINUE la fréquence cardiaque (effet chronotrope négatif). C'est le système sympathique qui, par la noradrénaline, AUGMENTE la fréquence cardiaque." },

  // Leçon 5 : Sang et milieu intérieur
  { lessonOrder: 9, question: "Sous quelle forme principale le CO₂ est-il transporté dans le sang ?", type: "mcq", difficulty: "medium", options: ["Dissous dans le plasma", "Lié à l'hémoglobine (carbhémoglobine)", "Sous forme de bicarbonates HCO₃⁻", "Lié à l'albumine plasmatique"], correctAnswer: "Sous forme de bicarbonates HCO₃⁻", explanation: "70% du CO₂ sanguin est transporté sous forme de bicarbonates (HCO₃⁻) dans le plasma, formés dans les hématies par la réaction : CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻ (catalysée par l'anhydrase carbonique)." },
  { lessonOrder: 9, question: "Le pH sanguin normal est compris entre :", type: "mcq", difficulty: "easy", options: ["6,5 et 7,0", "7,35 et 7,45", "7,45 et 7,80", "7,0 et 7,2"], correctAnswer: "7,35 et 7,45", explanation: "Le pH sanguin normal est légèrement basique, entre 7,35 et 7,45. En dessous de 7,35 = acidose (dangereuse), au-dessus de 7,45 = alcalose. Ce pH est maintenu par les systèmes tampons, les poumons et les reins." },
  { lessonOrder: 9, question: "L'effet Bohr indique que l'hémoglobine libère davantage d'O₂ lorsque le pH est bas (milieu acide).", type: "true_false", difficulty: "medium", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "L'effet Bohr : en milieu acide (pH bas, CO₂ élevé), l'affinité de l'hémoglobine pour l'O₂ diminue → elle libère plus facilement l'O₂. C'est très utile dans les muscles actifs où le CO₂ et l'acide lactique font baisser le pH." },

  // Leçon 6 : Système immunitaire
  { lessonOrder: 10, question: "Quelles cellules produisent les anticorps lors d'une réponse immunitaire humorale ?", type: "mcq", difficulty: "easy", options: ["Les lymphocytes T cytotoxiques (CD8⁺)", "Les macrophages", "Les plasmocytes (lymphocytes B différenciés)", "Les cellules NK (Natural Killer)"], correctAnswer: "Les plasmocytes (lymphocytes B différenciés)", explanation: "Les lymphocytes B, activés par les antigènes et les lymphocytes T auxiliaires, se différencient en plasmocytes. Les plasmocytes produisent massivement des anticorps (immunoglobulines) spécifiques de l'antigène. C'est l'immunité humorale." },
  { lessonOrder: 10, question: "La vaccination induit une protection immunitaire en provoquant :", type: "mcq", difficulty: "medium", options: ["Une maladie atténuée suivie d'une guérison spontanée", "La production de lymphocytes mémoire sans déclencher la maladie", "La destruction directe des pathogènes par les anticorps vaccinaux", "Une immunité non spécifique contre toutes les infections"], correctAnswer: "La production de lymphocytes mémoire sans déclencher la maladie", explanation: "Le vaccin introduit un antigène atténué ou inactivé → réponse immunitaire primaire → formation de lymphocytes mémoire → lors d'une infection réelle, la réponse secondaire est rapide et puissante avant l'apparition des symptômes." },
  { lessonOrder: 10, question: "Les lymphocytes T cytotoxiques (CD8⁺) détruisent les cellules infectées par voie directe (contact cellule-cellule).", type: "true_false", difficulty: "easy", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "Les LT cytotoxiques (LTc, CD8⁺) reconnaissent les peptides antigéniques présentés par le CMH de classe I des cellules infectées → libèrent des perforines et des granzymes → lyse de la cellule infectée (immunité à médiation cellulaire)." },

  // Leçon 7 : Appareils reproducteurs
  { lessonOrder: 11, question: "Quelle est la double fonction des testicules ?", type: "mcq", difficulty: "easy", options: ["Sécréter le sperme et produire les androgènes", "Produire les spermatozoïdes (fonction gamétogène) et sécréter la testostérone (fonction endocrine)", "Stocker les spermatozoïdes et les transporter vers l'urètre", "Sécréter le liquide séminal et produire la FSH"], correctAnswer: "Produire les spermatozoïdes (fonction gamétogène) et sécréter la testostérone (fonction endocrine)", explanation: "Les testicules ont deux fonctions distinctes : 1) Fonction gamétogène : production de spermatozoïdes dans les tubes séminifères (cellules de Sertoli). 2) Fonction endocrine : sécrétion de testostérone par les cellules de Leydig (entre les tubes séminifères)." },
  { lessonOrder: 11, question: "La fécondation a lieu dans :", type: "mcq", difficulty: "easy", options: ["L'utérus", "Le vagin", "Le tiers externe de la trompe de Fallope", "L'ovaire"], correctAnswer: "Le tiers externe de la trompe de Fallope", explanation: "La fécondation se produit dans le tiers externe (ampullaire) de la trompe de Fallope. C'est là que l'ovocyte II, libéré lors de l'ovulation, rencontre les spermatozoïdes qui ont remonté les voies génitales féminines." },
  { lessonOrder: 11, question: "La progestérone, sécrétée par le corps jaune, favorise la prolifération de l'endomètre utérin pendant la phase folliculaire.", type: "true_false", difficulty: "medium", options: ["Vrai", "Faux"], correctAnswer: "Faux", explanation: "C'est les ŒSTROGÈNES qui favorisent la prolifération de l'endomètre pendant la phase folliculaire (J6-J14). La progestérone (sécrétée par le corps jaune en phase lutéale, J15-J28) assure la phase sécrétoire de l'endomètre (préparation à la nidation), non la prolifération." },

  // Leçon 8 : Gamétogenèse
  { lessonOrder: 12, question: "Combien de spermatozoïdes fonctionnels sont produits à partir d'un spermatocyte I lors de la spermatogenèse ?", type: "mcq", difficulty: "easy", options: ["1", "2", "4", "8"], correctAnswer: "4", explanation: "Un spermatocyte I (2n) subit la méiose I → 2 spermatocytes II (n), puis la méiose II → 4 spermatides (n), qui se différencient en 4 spermatozoïdes. Contrairement à l'ovogenèse qui ne donne qu'1 ovocyte fonctionnel, la spermatogenèse produit 4 gamètes viables." },
  { lessonOrder: 12, question: "Lors de l'ovogenèse, l'ovocyte II est bloqué en :", type: "mcq", difficulty: "medium", options: ["Prophase I", "Métaphase I", "Métaphase II", "Anaphase II"], correctAnswer: "Métaphase II", explanation: "Au moment de l'ovulation, l'ovocyte II est bloqué en MÉTAPHASE II. La méiose II ne s'achève que si la fécondation se produit. Sans fécondation, l'ovocyte dégénère (atrésie). La méiose I s'était achevée juste avant l'ovulation (sous l'action du pic de LH)." },
  { lessonOrder: 12, question: "La spermatogenèse se déroule en continu de la puberté jusqu'à la mort chez l'homme, tandis que l'ovogenèse est limitée à un stock fini d'ovocytes constitué avant la naissance.", type: "true_false", difficulty: "easy", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "C'est exact. Les cellules souches spermatogoniales se divisent en continu. En revanche, les ovogonies se multiplient seulement jusqu'au 5ème mois de vie fœtale, puis entrent en méiose I bloquée. La femme dispose d'un stock fini (~1-2 millions à la naissance) qui s'épuise progressivement jusqu'à la ménopause." },

  // Leçon 9 : Fécondation
  { lessonOrder: 13, question: "Quel est l'événement qui bloque la polyspermie (pénétration de plusieurs spermatozoïdes) lors de la fécondation ?", type: "mcq", difficulty: "medium", options: ["La réaction acrosomiale", "La capacitation des spermatozoïdes", "La réaction de zone (modification de la zone pellucide)", "L'achèvement de la méiose II"], correctAnswer: "La réaction de zone (modification de la zone pellucide)", explanation: "Dès qu'un spermatozoïde fusionne avec l'ovocyte, une réaction corticale modifie la zone pellucide → elle devient imperméable aux autres spermatozoïdes. Ce mécanisme (blocage lent de la polyspermie) empêche la fusion de plusieurs spermatozoïdes qui provoquerait une anomalie du nombre de chromosomes." },
  { lessonOrder: 13, question: "Le blastocyste s'implante dans l'endomètre utérin :", type: "mcq", difficulty: "easy", options: ["Immédiatement après la fécondation (J1)", "Entre J3 et J4 (stade morula)", "Entre J6 et J10 après la fécondation", "À J14 lors de l'ovulation suivante"], correctAnswer: "Entre J6 et J10 après la fécondation", explanation: "La nidation se produit entre J6 et J10 après la fécondation. Le blastocyste voyage dans la trompe (J1-J5), éclot de la zone pellucide puis s'implante dans l'endomètre enrichi par la progestérone du corps jaune." },
  { lessonOrder: 13, question: "L'hCG (hormone chorionique gonadotrope) est sécrétée par l'embryon pour maintenir le corps jaune et empêcher les règles.", type: "true_false", difficulty: "easy", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "Dès la nidation, le trophoblaste sécrète l'hCG. Cette hormone a le même effet que la LH → elle maintient le corps jaune → progestérone continue → l'endomètre ne se désintègre pas → absence de règles. C'est la détection de l'hCG dans les urines par les tests de grossesse." },

  // Leçon 10 : Développement embryonnaire
  { lessonOrder: 14, question: "Quel feuillet embryonnaire donne naissance au système nerveux et à la peau ?", type: "mcq", difficulty: "easy", options: ["L'endoderme", "Le mésoderme", "L'ectoderme", "Le trophoblaste"], correctAnswer: "L'ectoderme", explanation: "L'ectoderme (feuillet externe) donne naissance au système nerveux central et périphérique (par neurulation), à la peau et ses annexes (poils, ongles, glandes sudoripares), au cristallin et à la rétine." },
  { lessonOrder: 14, question: "Le placenta :", type: "mcq", difficulty: "medium", options: ["Permet le mélange du sang maternel et fœtal pour faciliter les échanges", "Assure les échanges entre la mère et le fœtus sans mélange des sangs, et a une fonction endocrine", "Est formé uniquement à partir de l'embryoblaste", "N'est fonctionnel qu'à partir du 6ème mois de grossesse"], correctAnswer: "Assure les échanges entre la mère et le fœtus sans mélange des sangs, et a une fonction endocrine", explanation: "Le placenta assure les échanges (O₂, nutriments, déchets) par diffusion à travers la barrière placentaire, sans que les sangs maternel et fœtal se mélangent. Il sécrète également des hormones (hCG, progestérone, œstrogènes, HPL) indispensables au maintien de la grossesse." },
  { lessonOrder: 14, question: "La période embryonnaire (les 8 premières semaines) est la plus sensible aux agents tératogènes (alcool, médicaments, radiations) car c'est la période d'organogenèse.", type: "true_false", difficulty: "easy", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "Durant l'organogenèse (S1-S8), tous les organes se forment. C'est la période la plus vulnérable aux tératogènes. Après S8, on entre dans la période fœtale (croissance et maturation), moins sensible mais pas sans risque (ex. : SNC qui se développe tout au long de la grossesse)." },

  // Leçon 11 : Reproduction végétative
  { lessonOrder: 15, question: "Quelle est la caractéristique principale des individus issus de la reproduction asexuée (végétative) ?", type: "mcq", difficulty: "easy", options: ["Ils sont génétiquement différents de la plante mère", "Ils sont des clones génétiquement identiques à la plante mère", "Ils résultent de la fusion de deux gamètes", "Ils possèdent une plus grande diversité génétique que les individus issus de la reproduction sexuée"], correctAnswer: "Ils sont des clones génétiquement identiques à la plante mère", explanation: "La reproduction asexuée (bouturage, stolons, rhizomes, bulbes...) repose sur la mitose, ce qui produit des individus avec exactement le même génotype que la plante mère → clones. Cela est utile pour conserver des variétés, mais limite l'adaptation à long terme." },
  { lessonOrder: 15, question: "Chez les angiospermes, la double fécondation produit :", type: "mcq", difficulty: "medium", options: ["Deux zygotes diploïdes qui forment deux embryons", "Un zygote diploïde (→ embryon) et une cellule triploïde (→ albumen)", "Un zygote diploïde et un globule polaire", "Un embryon haploïde et un fruit diploïde"], correctAnswer: "Un zygote diploïde (→ embryon) et une cellule triploïde (→ albumen)", explanation: "La double fécondation des angiospermes : 1er spermatozoïde + ovosphère (n) → zygote (2n) → embryon. 2ème spermatozoïde + noyaux polaires (2n) → cellule (3n) → albumen (tissu nutritif de la graine). C'est une caractéristique unique des angiospermes." },
  { lessonOrder: 15, question: "La reproduction sexuée est avantageuse par rapport à la reproduction asexuée car elle génère de la diversité génétique, favorable à l'adaptation en milieu changeant.", type: "true_false", difficulty: "easy", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "La reproduction sexuée (méiose + fécondation aléatoire) génère une immense diversité génétique. Cette variabilité est la matière première de la sélection naturelle. Dans un environnement changeant, avoir des individus génétiquement variés augmente les chances qu'au moins certains survivent." },

  // Leçon 12 : Gisements miniers
  { lessonOrder: 16, question: "Les gisements aurifères de Côte d'Ivoire se trouvent principalement dans :", type: "mcq", difficulty: "medium", options: ["Le bassin sédimentaire côtier", "Les roches vertes biriminiennes (formations précambriennes)", "Les cuirasses latéritiques", "Les roches ultrabasiques (péridotites)"], correctAnswer: "Les roches vertes biriminiennes (formations précambriennes)", explanation: "Les gisements d'or ivoiriens (Tongon, Ity, Bonikro, Agbaou) sont associés aux ceintures de roches vertes biriminiennes, âgées d'environ 2 milliards d'années. L'or y a été concentré par des processus hydrothermaux : des fluides chauds riches en or ont circulé dans les fractures des roches vertes." },
  { lessonOrder: 16, question: "La bauxite se forme principalement par :", type: "mcq", difficulty: "medium", options: ["Hydrothermalisme à haute température", "Altération latéritique des roches granitiques sous climat tropical humide", "Sédimentation marine en milieu anoxique", "Fusion partielle de roches ultrabasiques"], correctAnswer: "Altération latéritique des roches granitiques sous climat tropical humide", explanation: "La bauxite (Al₂O₃ nH₂O) est un minerai d'aluminium qui résulte de l'altération chimique intense (latéritisation) des roches granitiques sous le climat tropical humide. Les pluies lessivient la silice et les bases, laissant un résidu enrichi en aluminium et en oxydes de fer." },
  { lessonOrder: 16, question: "La Côte d'Ivoire est le 1er producteur mondial d'or en Afrique.", type: "true_false", difficulty: "easy", options: ["Vrai", "Faux"], correctAnswer: "Faux", explanation: "La Côte d'Ivoire est le 2ème producteur d'or en Afrique de l'Ouest (après le Ghana), et non le premier en Afrique (le Ghana et l'Afrique du Sud sont devant). Elle produit environ 30-40 tonnes d'or par an." },

  // Leçon 13 : Processus géologiques
  { lessonOrder: 17, question: "Le granite est une roche :", type: "mcq", difficulty: "easy", options: ["Sédimentaire détritique", "Volcanique (extrusive)", "Plutonique (intrusive) magmatique", "Métamorphique régionale"], correctAnswer: "Plutonique (intrusive) magmatique", explanation: "Le granite est une roche magmatique plutonique (intrusive) : le magma refroidit lentement en profondeur, ce qui permet la formation de grands cristaux visibles à l'œil nu (texture grenue). Si le même magma refroidit rapidement en surface, il donne de la rhyolite (texture microlithique)." },
  { lessonOrder: 17, question: "Le marbre est une roche métamorphique formée à partir de :", type: "mcq", difficulty: "medium", options: ["Du granite transformé par le métamorphisme", "Du calcaire transformé par la chaleur et la pression (métamorphisme)", "Du basalte altéré en surface", "Des sédiments argileux compactés"], correctAnswer: "Du calcaire transformé par la chaleur et la pression (métamorphisme)", explanation: "Le marbre est la transformation métamorphique du calcaire (CaCO₃). Sous l'effet de la chaleur et de la pression (typiquement au contact d'une intrusion magmatique = métamorphisme de contact), les cristaux de calcite se recristallisent en grands cristaux → marbre." },
  { lessonOrder: 17, question: "Dans le cycle des roches, une roche sédimentaire peut être transformée en roche métamorphique par enfouissement à grande profondeur.", type: "true_false", difficulty: "easy", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "Le cycle lithologique est continu. Une roche sédimentaire enfouie à grande profondeur (subduction, collision) est soumise à une pression et une température croissantes → transformation métamorphique (sans fusion). Si P et T sont encore plus élevées → fusion → magma → roches magmatiques." },

  // Leçon 14 : Ressources énergétiques
  { lessonOrder: 18, question: "Quelle est la principale source d'électricité de la Côte d'Ivoire ?", type: "mcq", difficulty: "easy", options: ["Le charbon", "L'énergie nucléaire", "L'hydroélectricité et le gaz naturel", "Le solaire photovoltaïque"], correctAnswer: "L'hydroélectricité et le gaz naturel", explanation: "La Côte d'Ivoire produit son électricité principalement à partir de l'hydroélectricité (~40%, barrages de Kossou, Taabo, Soubré) et du gaz naturel (~50%, centrales thermiques d'Azito et Ciprel). Le solaire reste marginal mais est en développement." },
  { lessonOrder: 18, question: "Les énergies fossiles (pétrole, charbon, gaz) sont qualifiées de non renouvelables parce que :", type: "mcq", difficulty: "medium", options: ["Elles produisent trop de CO₂ pour être utilisées durablement", "Leur formation géologique a nécessité des millions d'années et leurs réserves s'épuisent bien plus vite qu'elles ne se reconstituent", "Elles ne peuvent pas être utilisées dans les pays tropicaux", "Leur combustion ne produit pas assez d'énergie pour les besoins modernes"], correctAnswer: "Leur formation géologique a nécessité des millions d'années et leurs réserves s'épuisent bien plus vite qu'elles ne se reconstituent", explanation: "Les énergies fossiles se sont formées sur des millions d'années par transformation de matière organique (kérogène → hydrocarbures). Nous les consommons en quelques siècles → les réserves diminuent inévitablement → non renouvelables à l'échelle humaine." },
  { lessonOrder: 18, question: "L'énergie solaire photovoltaïque et l'énergie éolienne sont des sources d'énergie intermittentes car elles dépendent des conditions météorologiques.", type: "true_false", difficulty: "easy", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "Le solaire ne produit de l'électricité que quand il y a du soleil (jour, temps clair), et l'éolien seulement quand le vent souffle. Cette intermittence est un défi majeur pour leur intégration dans le réseau électrique, nécessitant des solutions de stockage (batteries) ou des sources d'appoint." },

  // Leçon 15 : Conséquences exploitation minière
  { lessonOrder: 19, question: "Le mercure est utilisé dans l'orpaillage artisanal pour :", type: "mcq", difficulty: "medium", options: ["Dissoudre les roches et libérer les filons d'or", "Former un amalgame avec l'or, facilitant sa récupération", "Traiter les eaux de lavage du minerai", "Alimenter les machines de concassage"], correctAnswer: "Former un amalgame avec l'or, facilitant sa récupération", explanation: "Le mercure (Hg) a la propriété de former un amalgame solide avec l'or. Les orpailleurs artisanaux versent du mercure sur le concentré de minerai → l'or s'amalgame → on réchauffe le mélange → le mercure s'évapore (très toxique) → l'or reste. Cette pratique contamine gravement les rivières et la santé des artisans." },
  { lessonOrder: 19, question: "La silicose est une maladie professionnelle qui touche les mineurs, causée par :", type: "mcq", difficulty: "easy", options: ["L'intoxication au mercure par ingestion d'eau contaminée", "L'inhalation de poussières de silice lors du forage et du concassage", "L'exposition aux rayonnements dans les mines d'uranium", "La contamination par le cyanure dans les mines industrielles d'or"], correctAnswer: "L'inhalation de poussières de silice lors du forage et du concassage", explanation: "La silicose résulte de l'inhalation prolongée de micro-particules de silice (SiO₂) libérées lors du forage, du dynamitage et du concassage des roches. Ces particules déposées dans les poumons provoquent une fibrose pulmonaire progressive et irréversible." },
  { lessonOrder: 19, question: "Une Étude d'Impact Environnemental et Social (EIES) est obligatoire avant toute exploitation minière en Côte d'Ivoire selon le code minier.", type: "true_false", difficulty: "easy", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "Le code minier ivoirien (révisé en 2014 et 2019) stipule qu'une EIES est obligatoire avant l'octroi d'un permis d'exploitation. Ce document évalue les impacts potentiels sur l'environnement, les communautés, l'eau et l'air, et propose des mesures de mitigation et de réhabilitation." },

  // Leçon 16 : Formation des sols
  { lessonOrder: 20, question: "Quel horizon du sol est le plus riche en matière organique (humus) ?", type: "mcq", difficulty: "easy", options: ["L'horizon R (roche mère)", "L'horizon B (illuvial)", "L'horizon C (roche altérée)", "L'horizon A (humifère)"], correctAnswer: "L'horizon A (humifère)", explanation: "L'horizon A est la couche de surface du sol. C'est là que s'accumulent la matière organique en décomposition (humus) et les minéraux. Il est généralement de couleur sombre (noirâtre à brun foncé) et est le siège de la plus grande activité biologique." },
  { lessonOrder: 20, question: "Les ferralsols (sols latéritiques) qui dominent en Côte d'Ivoire sont caractérisés par :", type: "mcq", difficulty: "medium", options: ["Une richesse en calcium et magnésium et un pH neutre", "Un enrichissement en oxydes de fer et d'aluminium, un pH acide et une faible fertilité naturelle", "Une texture principalement sableuse et une grande fertilité", "Une teneur élevée en humus et une CEC élevée"], correctAnswer: "Un enrichissement en oxydes de fer et d'aluminium, un pH acide et une faible fertilité naturelle", explanation: "Les ferralsols résultent d'une altération latéritique intense sous le climat tropical humide. Le lessivage intense des pluies évacue les bases (Ca, Mg, K) et la silice → enrichissement relatif en Fe₂O₃ (couleur rouge) et Al₂O₃. Ces sols ont un pH acide (4,5-5,5) et une faible fertilité naturelle." },
  { lessonOrder: 20, question: "Le sol est un milieu vivant : les microorganismes, les champignons et les vers de terre jouent un rôle essentiel dans la décomposition de la matière organique et la libération des nutriments.", type: "true_false", difficulty: "easy", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "La biologie du sol est fondamentale pour sa fertilité. Les bactéries et champignons décomposeurs minéralisent la matière organique → libèrent N, P, K assimilables. Les mycorhizes aident les racines à absorber l'eau et les minéraux. Les vers de terre mélangent et aèrent le sol (bioturbation) → ils sont des indicateurs de la qualité du sol." },

  // Leçon 17 : Rôle du sol
  { lessonOrder: 21, question: "Quel est le nutriment minéral le plus limitant pour la croissance des plantes cultivées ?", type: "mcq", difficulty: "medium", options: ["Le calcium (Ca)", "Le fer (Fe)", "L'azote (N)", "Le manganèse (Mn)"], correctAnswer: "L'azote (N)", explanation: "L'azote est le nutriment le plus limitant car il est indispensable à la synthèse des protéines, de la chlorophylle et des acides nucléiques. Il est souvent déficient dans les sols car il est très mobile (lessivage des nitrates, dénitrification). C'est pourquoi les engrais azotés sont les plus utilisés en agriculture." },
  { lessonOrder: 21, question: "La fixation biologique de l'azote atmosphérique est réalisée par :", type: "mcq", difficulty: "easy", options: ["Les champignons mycorhiziens", "Les bactéries Rhizobium associées aux légumineuses", "Les plantes à travers la photosynthèse", "Les vers de terre en décomposant la matière organique"], correctAnswer: "Les bactéries Rhizobium associées aux légumineuses", explanation: "Les bactéries du genre Rhizobium forment des nodosités sur les racines des légumineuses (soja, niébé, arachide, fève). En symbiose avec la plante, elles fixent le N₂ atmosphérique et le transforment en NH₃ assimilable, enrichissant ainsi le sol en azote." },
  { lessonOrder: 21, question: "Un sol argileux retient généralement mieux l'eau et les nutriments qu'un sol sableux.", type: "true_false", difficulty: "easy", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "Les argiles ont une très petite taille de particule (<2 µm) → grande surface spécifique → forte capacité de rétention en eau et capacité d'échange cationique (CEC) élevée → retient les cations nutritifs (Ca²⁺, K⁺, Mg²⁺). Les sables (50 µm-2 mm) ont peu de surface et retiennent peu l'eau et les nutriments (sols filtrants)." },

  // Leçon 18 : Dégradation des sols
  { lessonOrder: 22, question: "La salinisation des sols dans les périmètres irrigués est principalement causée par :", type: "mcq", difficulty: "medium", options: ["L'utilisation excessive d'engrais azotés", "L'irrigation avec de l'eau chargée en sel combinée à une forte évaporation", "La déforestation qui accentue le lessivage des bases", "L'acidification due aux pluies acides industrielles"], correctAnswer: "L'irrigation avec de l'eau chargée en sel combinée à une forte évaporation", explanation: "Lors de l'irrigation, des sels dissous dans l'eau sont apportés au sol. Sous le soleil tropical, l'eau s'évapore mais les sels restent → accumulation progressive en surface. La remontée capillaire par évapotranspiration aggrave le phénomène → encroûtement salin → sol blanc, stérile." },
  { lessonOrder: 22, question: "Quelle pratique agricole est la plus efficace pour lutter contre l'érosion hydrique sur les pentes tropicales ?", type: "mcq", difficulty: "medium", options: ["Labour profond pour augmenter la porosité", "Maintien d'un couvert végétale permanent et aménagement de terrasses", "Apport massif d'engrais pour stimuler la croissance racinaire", "Déforestation pour faciliter l'accès aux sols fertiles"], correctAnswer: "Maintien d'un couvert végétale permanent et aménagement de terrasses", explanation: "La protection contre l'érosion hydrique nécessite : 1) Couvrir le sol en permanence (mulch, cultures de couverture) → les racines retiennent les agrégats, la végétation ralentit l'impact des gouttes. 2) Réduire la pente par des terrasses → ralentit le ruissellement et favorise l'infiltration." },
  { lessonOrder: 22, question: "La déforestation en Côte d'Ivoire favorise l'érosion hydrique des sols car elle prive le sol de la protection du couvert végétal contre l'impact des fortes pluies tropicales.", type: "true_false", difficulty: "easy", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "En forêt, la canopée intercepte les pluies, les racines maintiennent la structure du sol et la litière absorbe l'énergie des gouttes. Après déforestation, les pluies tropicales intenses (jusqu'à 100 mm/h) frappent directement le sol nu → érosion par splash → ruissellement → formation de ravines." },

  // Leçon 19 : Sols CI et agriculture
  { lessonOrder: 23, question: "Quelle est la principale culture d'exportation de la Côte d'Ivoire, faisant du pays le 1er producteur mondial ?", type: "mcq", difficulty: "easy", options: ["Le café robusta", "L'hévéa (caoutchouc naturel)", "Le cacao", "L'anacarde (noix de cajou)"], correctAnswer: "Le cacao", explanation: "La Côte d'Ivoire est le premier producteur mondial de cacao avec environ 2 millions de tonnes par an (40% de la production mondiale). Le cacao représente 40% des recettes d'exportation du pays et est cultivé principalement dans la zone forestière du sud et de l'ouest, sur des ferralsols." },
  { lessonOrder: 23, question: "Les sols ferrugineux tropicaux du nord de la Côte d'Ivoire (région de Korhogo) sont principalement adaptés à la culture de :", type: "mcq", difficulty: "medium", options: ["Le cacao et le café (cultures forestières)", "Le coton et l'anacarde (cultures de savane)", "Le riz irrigué (bas-fonds hydromorphes)", "Le palmier à huile et l'hévéa"], correctAnswer: "Le coton et l'anacarde (cultures de savane)", explanation: "Les sols ferrugineux tropicaux du nord CI (savane soudanienne) sont moins acides et moins lessivés que les ferralsols du sud. Ils conviennent à des cultures de savane comme le coton (fibre industrielle), l'anacarde (noix de cajou dont la CI est le 1er producteur mondial), l'igname et le maïs." },
  { lessonOrder: 23, question: "La CI est devenue le 1er producteur mondial de noix de cajou brute, mais la plus grande partie de la production est exportée brute sans transformation locale.", type: "true_false", difficulty: "easy", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "La CI produit environ 900 000 tonnes de noix de cajou brutes par an (1er mondial). Cependant, environ 80-85% est exporté brut vers l'Inde et le Vietnam pour transformation. La transformation locale reste insuffisante, ce qui prive le pays de la valeur ajoutée et des emplois générés par cette industrie." },

  // Leçon 20 : Génétique
  { lessonOrder: 24, question: "Lors d'un croisement Aa × Aa, quelle est la proportion d'individus homozygotes récessifs (aa) en F1 ?", type: "mcq", difficulty: "medium", options: ["1/4", "1/2", "3/4", "0 (aucun)"], correctAnswer: "1/4", explanation: "Tableau de Punnett pour Aa × Aa : AA (1/4) + Aa (2/4) + aa (1/4). La proportion d'homozygotes récessifs (aa) est de 1/4 (25%). Le ratio phénotypique est 3 (dominant) : 1 (récessif), ce qui correspond à la 2ème loi de Mendel (ségrégation des allèles)." },
  { lessonOrder: 24, question: "Le daltonisme (allèle récessif lié à l'X) est plus fréquent chez les hommes que chez les femmes car :", type: "mcq", difficulty: "medium", options: ["Les hommes ont plus de récepteurs à la couleur que les femmes", "Les hommes n'ont qu'un chromosome X et expriment l'allèle récessif sans nécessiter d'être homozygotes", "Les femmes sont naturellement immunisées contre le daltonisme", "Le chromosome Y protège les hommes contre les maladies chromosomiques"], correctAnswer: "Les hommes n'ont qu'un chromosome X et expriment l'allèle récessif sans nécessiter d'être homozygotes", explanation: "Chez l'homme (XY), un seul allèle récessif sur l'X suffit pour exprimer la maladie car il n'y a pas de second X pour compenser. Chez la femme (XX), il faudrait deux allèles récessifs (homozygote XX^d X^d) → beaucoup plus rare. Les femmes peuvent être porteuses saines (hétérozygotes)." },
  { lessonOrder: 24, question: "Deux gènes situés sur des chromosomes différents (non homologues) ségrègent indépendamment lors de la méiose, selon la 3ème loi de Mendel.", type: "true_false", difficulty: "easy", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "La loi d'assortiment indépendant (3ème loi de Mendel) stipule que deux gènes situés sur des chromosomes homologues différents (non liés) se séparent indépendamment lors de la méiose I. En F2 d'un dihybride, on obtient le ratio 9:3:3:1. Cette loi ne s'applique pas aux gènes liés (sur le même chromosome)." },

  // Leçon 21 : Évolution
  { lessonOrder: 25, question: "Selon la théorie de Darwin, la sélection naturelle agit en favorisant :", type: "mcq", difficulty: "easy", options: ["Les mutations les plus fréquentes dans une population", "Les individus les mieux adaptés à leur environnement qui survivent et se reproduisent davantage", "La formation de nouvelles espèces par isolement géographique uniquement", "L'élimination de toute variation génétique dans une population"], correctAnswer: "Les individus les mieux adaptés à leur environnement qui survivent et se reproduisent davantage", explanation: "La sélection naturelle de Darwin repose sur : 1) la variation entre individus, 2) l'hérédité des caractères, 3) la compétition pour les ressources (surproduction), 4) la survie préférentielle des individus les mieux adaptés → ils laissent plus de descendants → les gènes favorables augmentent en fréquence." },
  { lessonOrder: 25, question: "La spéciation allopatrique se produit quand :", type: "mcq", difficulty: "medium", options: ["Deux populations du même lieu développent un isolement reproducteur par polyploïdie", "Une barrière géographique sépare deux populations qui évoluent différemment jusqu'à l'isolement reproducteur", "Une mutation unique dans une population crée immédiatement une nouvelle espèce", "La dérive génétique élimine tous les allèles d'une petite population insulaire"], correctAnswer: "Une barrière géographique sépare deux populations qui évoluent différemment jusqu'à l'isolement reproducteur", explanation: "La spéciation allopatrique (du grec allos = autre, patria = pays) est la forme la plus courante de spéciation. Une barrière géographique (montagne, mer, désert) isole deux populations → elles n'échangent plus de gènes → mutations + sélection naturelle différentes → divergence génétique → isolement reproducteur → deux espèces distinctes." },
  { lessonOrder: 25, question: "La résistance croissante des bactéries aux antibiotiques est un exemple contemporain de sélection naturelle à l'œuvre.", type: "true_false", difficulty: "easy", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "L'antibiorésistance illustre parfaitement la sélection naturelle : dans une population bactérienne, des individus portent spontanément des mutations de résistance. L'antibiothérapie élimine les bactéries sensibles → seules les résistantes survivent et se reproduisent → la résistance se propage. C'est une évolution observable en temps réel." },
];

export async function seedSvtDLessons(): Promise<void> {
  const [{ lessonCount }] = await db
    .select({ lessonCount: count() })
    .from(lessonsTable)
    .where(
      and(
        eq(lessonsTable.subjectId, SVT_D_SUBJECT_ID),
        gte(lessonsTable.order, SEED_MARKER_ORDER_START)
      )
    );

  if (lessonCount >= TOTAL_LESSONS) {
    logger.info("SVT D seed lessons already present — skipping");
    return;
  }

  logger.info("Seeding SVT D lessons and exercises …");

  for (const lesson of svtDLessons) {
    const s = lesson.title.replace(/'/g, "''");
    const existing = await db.execute(
      `SELECT id FROM lessons WHERE subject_id = ${SVT_D_SUBJECT_ID} AND title = '${s}' LIMIT 1`
    );
    if (existing.rows.length > 0) continue;

    const [inserted] = await db
      .insert(lessonsTable)
      .values({
        subjectId: lesson.subjectId,
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

    const exercises = svtDExercises.filter(e => e.lessonOrder === lesson.order);
    for (const ex of exercises) {
      await db.insert(exercisesTable).values({
        lessonId: inserted.id,
        subjectId: SVT_D_SUBJECT_ID,
        series: "D",
        question: ex.question,
        type: ex.type as "mcq" | "true_false" | "open",
        difficulty: ex.difficulty as "easy" | "medium" | "hard",
        options: ex.options,
        correctAnswer: ex.correctAnswer,
        explanation: ex.explanation,
        isPremium: false,
      });
    }
  }

  logger.info("SVT D lessons and exercises seeded successfully");
}
