import { db, lessonsTable, exercisesTable } from "@workspace/db";
import { eq, and, gte, count } from "drizzle-orm";
import { logger } from "./logger";

const PC_D_SUBJECT_ID = 3;
const SEED_MARKER_ORDER_START = 3;
const TOTAL_LESSONS = 29;

const physChimDLessons = [
  // ─── Thème 1 : Mécanique ───────────────────────────────────────────────────
  {
    order: 3, series: "D", title: "Leçon 1 : Repérage d'un mobile et notion de référentiel",
    duration: 45, isPremium: false,
    summary: "Décrire le mouvement d'un mobile en choisissant un référentiel adapté, repérer sa position par des coordonnées et calculer ses caractéristiques cinématiques.",
    keyPoints: `Référentiel : solide (ou repère) par rapport auquel on décrit le mouvement
Référentiels courants : terrestre, géocentrique, héliocentrique
Repère d'espace : (O, x⃗, y⃗, z⃗) cartésien, cylindrique ou sphérique
Vecteur position : OM⃗ = x⃗e_x + y⃗e_y
Vecteur vitesse : v⃗ = d(OM⃗)/dt ; |v⃗| = vitesse scalaire
Vecteur accélération : a⃗ = dv⃗/dt
Trajectoire : ensemble des positions successives du mobile
Un mouvement n'est ni uniforme ni varié de façon absolue — cela dépend du référentiel`,
    content: `<h2>Repérage d'un Mobile et Notion de Référentiel</h2>
<h3>I. Le référentiel</h3>
<p>Pour décrire le mouvement d'un objet (mobile), on a besoin d'un <strong>référentiel</strong> : un solide de référence et une horloge (repère espace-temps).</p>
<ul>
  <li><strong>Référentiel terrestre :</strong> lié à la Terre. Valable pour les expériences de laboratoire et les mouvements à courte durée.</li>
  <li><strong>Référentiel géocentrique :</strong> centre = centre de la Terre, axes dirigés vers des étoiles lointaines. Utilisé pour les satellites.</li>
  <li><strong>Référentiel héliocentrique (de Copernic) :</strong> centre = Soleil. Utilisé pour l'étude des planètes.</li>
</ul>
<h3>II. Repérage de la position</h3>
<p>Dans un repère cartésien (O, x⃗, y⃗, z⃗), la position du mobile M est donnée par ses coordonnées (x(t), y(t), z(t)).</p>
<p>Vecteur position : OM⃗(t) = x(t)⃗e_x + y(t)⃗e_y + z(t)⃗e_z</p>
<h3>III. Vitesse</h3>
<p>Le <strong>vecteur vitesse</strong> est la dérivée du vecteur position par rapport au temps :</p>
<p style="text-align:center">v⃗(t) = dOM⃗/dt → coordonnées : vx = dx/dt ; vy = dy/dt</p>
<p>La <strong>vitesse scalaire</strong> (valeur algébrique) : v = |v⃗| = √(vx²+vy²+vz²)</p>
<h3>IV. Accélération</h3>
<p>Le <strong>vecteur accélération</strong> : a⃗(t) = dv⃗/dt</p>
<p>Composantes : ax = dvx/dt ; ay = dvy/dt</p>
<h3>V. Trajectoire</h3>
<p>La trajectoire est l'ensemble des positions successives du mobile dans l'espace. Elle peut être rectiligne, circulaire, parabolique, etc. — elle dépend du référentiel choisi.</p>`,
    examples: `<p><strong>Exemple 1 :</strong> Un piéton marche à 5 km/h par rapport au sol. Dans un bus allant à 50 km/h dans le même sens, le piéton a une vitesse de 55 km/h (référentiel terrestre) ou de −45 km/h (référentiel du bus).</p>
<p><strong>Exemple 2 :</strong> Un mobile a pour position x(t)=3t²+1. Sa vitesse vx=6t et son accélération ax=6 (m/s²), constante.</p>`,
  },
  {
    order: 4, series: "D", title: "Leçon 2 : Mouvement rectiligne uniforme et uniformément varié",
    duration: 50, isPremium: false,
    summary: "Étudier les deux types fondamentaux de mouvement rectiligne : le MRU (accélération nulle) et le MRUV (accélération constante), avec leurs équations horaires.",
    keyPoints: `MRU : v = cste, a = 0 → x(t) = x₀ + v·t (trajectoire rectiligne)
MRUV : a = cste ≠ 0 → v(t) = v₀ + a·t ; x(t) = x₀ + v₀t + ½at²
Relation v²−v₀² = 2a(x−x₀) (hors temps)
Chute libre verticale : a = g ≈ 9,81 m/s² vers le bas (en l'absence d'air)
Mouvement sur plan incliné : a = g·sin θ (sans frottement)
Distance de freinage : d = v₀²/(2|a|) (MRUV avec a < 0)
Graphes : v(t) = droite (MRUV) ; x(t) = parabole (MRUV) ; x(t) = droite (MRU)`,
    content: `<h2>Mouvement Rectiligne Uniforme et Uniformément Varié</h2>
<h3>I. Mouvement Rectiligne Uniforme (MRU)</h3>
<p>Un mouvement est <strong>rectiligne uniforme</strong> si sa trajectoire est une droite et sa vitesse est constante.</p>
<ul>
  <li>Accélération : a = 0</li>
  <li>Vitesse : v = constante</li>
  <li>Équation horaire : x(t) = x₀ + v·t</li>
</ul>
<p>Graphe v(t) : horizontale. Graphe x(t) : droite de pente v.</p>
<h3>II. Mouvement Rectiligne Uniformément Varié (MRUV)</h3>
<p>Un mouvement est <strong>MRUV</strong> si sa trajectoire est une droite et son accélération est constante.</p>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Grandeur</th><th>Expression</th></tr>
  <tr><td>Accélération</td><td>a = constante</td></tr>
  <tr><td>Vitesse</td><td>v(t) = v₀ + a·t</td></tr>
  <tr><td>Position</td><td>x(t) = x₀ + v₀t + ½at²</td></tr>
  <tr><td>Sans le temps</td><td>v² − v₀² = 2a(x − x₀)</td></tr>
</table>
<ul>
  <li>Si a > 0 et v₀ > 0 : mouvement accéléré</li>
  <li>Si a < 0 et v₀ > 0 : mouvement décéléré (freinage)</li>
</ul>
<h3>III. Chute libre verticale</h3>
<p>Objet lâché sans vitesse initiale (v₀ = 0), en l'absence de frottements, avec axe Oz vers le bas :</p>
<ul>
  <li>a = g ≈ 9,81 m/s²</li>
  <li>v(t) = g·t</li>
  <li>z(t) = ½·g·t²</li>
  <li>Durée de chute de hauteur h : t = √(2h/g)</li>
</ul>`,
    examples: `<p><strong>Exemple 1 (MRU) :</strong> Une voiture roule à 90 km/h (25 m/s). En 4 s, elle parcourt x = 25×4 = 100 m.</p>
<p><strong>Exemple 2 (MRUV) :</strong> Freinage depuis v₀=20 m/s avec a=−4 m/s². Durée d'arrêt : 0=20−4t → t=5 s. Distance : d=v₀²/(2|a|)=400/8=50 m.</p>
<p><strong>Exemple 3 (Chute libre) :</strong> Bille lâchée de 80 m. Durée : t=√(2×80/9,81)≈4,04 s. Vitesse d'impact : v=9,81×4,04≈39,6 m/s.</p>`,
  },
  {
    order: 5, series: "D", title: "Leçon 3 : Mouvement de rotation d'un solide autour d'un axe fixe",
    duration: 50, isPremium: false,
    summary: "Décrire et analyser la rotation d'un solide autour d'un axe fixe : position angulaire, vitesse angulaire, accélération angulaire et cinématique du point.",
    keyPoints: `Position angulaire θ (rad) ; vitesse angulaire ω = dθ/dt (rad/s) ; accélération angulaire α = dω/dt (rad/s²)
Rotation uniforme : ω = cste, θ(t) = θ₀ + ω·t
Rotation uniformément variée : α = cste, ω(t) = ω₀ + α·t ; θ(t) = θ₀ + ω₀t + ½αt²
Lien avec la cinématique d'un point M à distance R de l'axe :
  vitesse linéaire v = Rω ; accélération tangentielle aₜ = Rα ; accélération centripète aₙ = Rω² = v²/R
Période T = 2π/ω ; fréquence f = ω/(2π) = 1/T
Vecteur accélération = aₜ (tangent) + aₙ (centripète, dirigé vers l'axe)`,
    content: `<h2>Mouvement de Rotation d'un Solide autour d'un Axe Fixe</h2>
<h3>I. Description angulaire</h3>
<p>Pour un solide tournant autour d'un axe fixe (Δ), on repère la position angulaire θ(t) en radians.</p>
<ul>
  <li><strong>Vitesse angulaire :</strong> ω(t) = dθ/dt (rad/s)</li>
  <li><strong>Accélération angulaire :</strong> α(t) = dω/dt (rad/s²)</li>
</ul>
<p>Convention : sens trigonométrique positif, sens horaire négatif.</p>
<h3>II. Rotation uniforme et uniformément variée</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th></th><th>Rotation uniforme</th><th>Rotation uniformément variée</th></tr>
  <tr><td>α</td><td>0</td><td>constante ≠ 0</td></tr>
  <tr><td>ω(t)</td><td>ω₀ = cste</td><td>ω₀ + α·t</td></tr>
  <tr><td>θ(t)</td><td>θ₀ + ω₀·t</td><td>θ₀ + ω₀t + ½αt²</td></tr>
</table>
<h3>III. Cinématique d'un point du solide</h3>
<p>Un point M à distance R de l'axe a :</p>
<ul>
  <li><strong>Vitesse linéaire :</strong> v = R·ω (tangente au cercle)</li>
  <li><strong>Accélération tangentielle :</strong> aₜ = R·α (tangente)</li>
  <li><strong>Accélération centripète :</strong> aₙ = R·ω² = v²/R (vers l'axe)</li>
  <li><strong>Accélération totale :</strong> a = √(aₜ²+aₙ²)</li>
</ul>
<h3>IV. Période et fréquence</h3>
<ul>
  <li>Période : T = 2π/ω (temps pour un tour complet)</li>
  <li>Fréquence : f = 1/T = ω/(2π) en Hz</li>
  <li>Vitesse angulaire en tr/min : n → ω = 2πn/60</li>
</ul>`,
    examples: `<p><strong>Exemple 1 :</strong> Roue tournant à 300 tr/min. ω = 2π×300/60 = 10π rad/s ≈ 31,4 rad/s. Pour R=0,2 m : v=0,2×10π≈6,28 m/s.</p>
<p><strong>Exemple 2 :</strong> Ventilateur partant du repos, atteignant ω=20 rad/s en 5 s. α=20/5=4 rad/s². Angle parcouru : θ=½×4×25=50 rad ≈ 7,96 tours.</p>`,
  },
  {
    order: 6, series: "D", title: "Leçon 4 : Lois de Newton — force, quantité de mouvement, projectiles",
    duration: 55, isPremium: false,
    summary: "Énoncer et appliquer les trois lois de Newton, définir la quantité de mouvement et étudier le mouvement parabolique des projectiles.",
    keyPoints: `1ère loi (inertie) : si ΣF⃗ = 0⃗, alors v⃗ = cste (repos ou MRU)
2ème loi (fondamentale) : ΣF⃗ = m·a⃗ (F en N, m en kg, a en m/s²)
3ème loi (action-réaction) : F⃗_{A/B} = −F⃗_{B/A} (forces égales et opposées)
Quantité de mouvement : p⃗ = m·v⃗ ; ΣF⃗ = dp⃗/dt
Impulsion : J⃗ = F⃗·Δt = Δp⃗
Projectile (tir parabolique) : ax=0 (MRU horizontal) ; ay=−g (MRUV vertical)
x(t)=v₀cosα·t ; y(t)=v₀sinα·t−½gt² (α=angle initial)
Portée maximale pour α=45°`,
    content: `<h2>Lois de Newton</h2>
<h3>I. Première loi de Newton — Principe d'inertie</h3>
<p>Dans un référentiel galiléen, si la résultante des forces extérieures est nulle, le centre de masse du système reste au repos ou en MRU :</p>
<p style="text-align:center">ΣF⃗_ext = 0⃗ ⟺ v⃗ = constante</p>
<h3>II. Deuxième loi de Newton — Principe fondamental de la dynamique (PFD)</h3>
<p style="text-align:center; font-size:1.1em"><strong>ΣF⃗_ext = m·a⃗</strong></p>
<p>Avec : ΣF⃗ en Newton (N), m en kilogramme (kg), a⃗ en m/s².</p>
<p>Application : projeter sur chaque axe → équations scalaires.</p>
<h3>III. Troisième loi de Newton — Principe des actions réciproques</h3>
<p>Si un corps A exerce une force F⃗ sur B, alors B exerce sur A une force opposée :<br>
F⃗_{A/B} = −F⃗_{B/A} (même droite d'action, même intensité, sens opposé)</p>
<h3>IV. Quantité de mouvement et impulsion</h3>
<p>Quantité de mouvement : p⃗ = m·v⃗. Le PFD s'écrit aussi ΣF⃗ = dp⃗/dt.</p>
<p>Conservation de p⃗ : si ΣF⃗_ext = 0⃗, alors p⃗_total = constante (chocs, explosions).</p>
<p>Impulsion : J⃗ = F⃗·Δt = Δp⃗ = m·Δv⃗</p>
<h3>V. Mouvement des projectiles</h3>
<p>Objet lancé avec vitesse v₀ à l'angle α par rapport à l'horizontale, dans le vide :</p>
<ul>
  <li>ax = 0 → x(t) = v₀cosα·t</li>
  <li>ay = −g → y(t) = v₀sinα·t − ½gt²</li>
  <li>vx = v₀cosα = constante ; vy = v₀sinα − gt</li>
</ul>
<p><strong>Hauteur maximale :</strong> H = (v₀sinα)²/(2g). <strong>Portée :</strong> R = v₀²sin(2α)/g → max pour α=45°.</p>`,
    examples: `<p><strong>Exemple 1 :</strong> Bloc de 5 kg poussé par F=20 N sur sol horizontal sans frottement. ΣF=20 N → a=20/5=4 m/s².</p>
<p><strong>Exemple 2 (projectile) :</strong> Balle lancée à 30 m/s à 45°. H=(30×sin45°)²/(2×9,81)=450/2/9,81≈22,9 m. Portée=30²×sin90°/9,81≈91,7 m.</p>`,
  },
  {
    order: 7, series: "D", title: "Leçon 5 : Travail, puissance et énergie mécanique",
    duration: 55, isPremium: false,
    summary: "Calculer le travail d'une force, la puissance, l'énergie cinétique et potentielle, et appliquer le théorème de conservation de l'énergie mécanique.",
    keyPoints: `Travail d'une force constante : W = F⃗·d⃗ = F·d·cosθ (J)
W > 0 : force motrice ; W < 0 : force résistante ; W = 0 si F⃗⊥d⃗
Puissance : P = W/Δt = F⃗·v⃗ = F·v·cosθ (W = J/s)
Énergie cinétique : Ec = ½mv² (J)
Théorème de l'énergie cinétique : W_total = ΔEc = Ec_f − Ec_i
Énergie potentielle de pesanteur : Ep = mgh (référence h=0 arbitraire)
Énergie mécanique : Em = Ec + Ep
Conservation : si forces non conservatives = 0 → Em = constante
W(frottements) = ΔEm = Em_f − Em_i (< 0 : dissipation)`,
    content: `<h2>Travail, Puissance et Énergie Mécanique</h2>
<h3>I. Travail d'une force</h3>
<p>Le travail d'une force F⃗ constante lors d'un déplacement d⃗ :</p>
<p style="text-align:center">W = F⃗·d⃗ = F·d·cosθ (en joules, J)</p>
<p>où θ est l'angle entre F⃗ et d⃗.</p>
<ul>
  <li>θ < 90° → W > 0 (force motrice)</li>
  <li>θ = 90° → W = 0 (force ne travaille pas, ex. force normale)</li>
  <li>θ > 90° → W < 0 (force résistante)</li>
</ul>
<h3>II. Puissance</h3>
<p>P = dW/dt = F⃗·v⃗ = F·v·cosθ (en watts, W = J/s)</p>
<h3>III. Énergie cinétique et théorème de l'énergie cinétique</h3>
<p>Ec = ½mv² (en J, avec m en kg et v en m/s)</p>
<p><strong>Théorème de l'énergie cinétique :</strong></p>
<p style="text-align:center">W_total = Ec_f − Ec_i = ΔEc</p>
<h3>IV. Énergie potentielle et énergie mécanique</h3>
<p>Énergie potentielle de pesanteur (axe vertical z vers le haut) : Ep = m·g·z</p>
<p>Énergie mécanique : Em = Ec + Ep = ½mv² + mgh</p>
<p><strong>Conservation de l'énergie mécanique :</strong><br>
En l'absence de frottements : Em = constante → ½mv²+mgh = ½mv₀²+mgh₀</p>
<p>Avec frottements : ΔEm = W(frottements) < 0 (l'énergie mécanique diminue).</p>`,
    examples: `<p><strong>Exemple 1 :</strong> Travail du poids (m=2 kg, h=5 m) : W(P)=mgh=2×9,81×5=98,1 J.</p>
<p><strong>Exemple 2 (conservation Em) :</strong> Bille (m=0,1 kg) lâchée de h=3 m. En bas : Em conservée → ½mv²=mgh → v=√(2gh)=√(2×9,81×3)≈7,67 m/s.</p>
<p><strong>Exemple 3 (puissance) :</strong> Moteur soulevant 500 kg à 0,2 m/s. P=mGv=500×9,81×0,2=981 W≈1 kW.</p>`,
  },
  // ─── Thème 2 : Électricité ─────────────────────────────────────────────────
  {
    order: 8, series: "D", title: "Leçon 6 : Courant continu, tension, résistance — lois d'Ohm et Kirchhoff",
    duration: 55, isPremium: false,
    summary: "Maîtriser les concepts fondamentaux des circuits en courant continu : intensité, tension, résistance, loi d'Ohm et lois de Kirchhoff.",
    keyPoints: `Courant électrique : I = dq/dt (ampères, A) ; sens conventionnel : + vers −
Tension (DDP) : U = VA − VB (volts, V)
Loi d'Ohm : U = R·I (résistance R en ohms, Ω)
Puissance dissipée (effet Joule) : P = UI = RI² = U²/R (watts, W)
Loi des nœuds (Kirchhoff 1) : ΣI_entrants = ΣI_sortants
Loi des mailles (Kirchhoff 2) : ΣU = 0 (dans une maille fermée)
Résistances en série : R_eq = R₁+R₂+…+Rₙ
Résistances en parallèle : 1/R_eq = 1/R₁+1/R₂+…+1/Rₙ`,
    content: `<h2>Circuits en Courant Continu — Lois Fondamentales</h2>
<h3>I. Grandeurs électriques</h3>
<ul>
  <li><strong>Charge :</strong> q en coulombs (C). <strong>Courant :</strong> I = dq/dt en ampères (A).</li>
  <li><strong>Tension :</strong> U_AB = V_A − V_B en volts (V). Mesurée par un voltmètre (en parallèle).</li>
  <li><strong>Résistance :</strong> R en ohms (Ω). Mesurée par un ohmmètre.</li>
</ul>
<h3>II. Loi d'Ohm</h3>
<p>Pour un conducteur ohmique (résistance pure) :<br>
U = R·I (ou I = U/R, ou R = U/I)</p>
<p>Puissance dissipée par effet Joule : P = U·I = R·I² = U²/R (en W).</p>
<h3>III. Lois de Kirchhoff</h3>
<p><strong>Loi des nœuds (conservation de la charge) :</strong><br>
En tout nœud du circuit : Σ I_entrants = Σ I_sortants</p>
<p><strong>Loi des mailles (conservation de l'énergie) :</strong><br>
Pour toute maille fermée : ΣU = 0 (en adoptant une convention de signe).</p>
<h3>IV. Associations de résistances</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Montage</th><th>Résistance équivalente</th><th>Tensions/courants</th></tr>
  <tr><td>Série</td><td>R_eq = R₁+R₂+…</td><td>I même ; U se répartit</td></tr>
  <tr><td>Parallèle</td><td>1/R_eq = 1/R₁+1/R₂+…</td><td>U même ; I se répartit</td></tr>
</table>
<p>Diviseur de tension (série) : U₁ = U_total × R₁/(R₁+R₂)</p>
<p>Diviseur de courant (parallèle) : I₁ = I_total × R₂/(R₁+R₂)</p>`,
    examples: `<p><strong>Exemple 1 :</strong> R₁=10 Ω et R₂=20 Ω en série sous U=12 V. R_eq=30 Ω, I=0,4 A, U₁=4 V, U₂=8 V.</p>
<p><strong>Exemple 2 :</strong> R₁=6 Ω et R₂=12 Ω en parallèle. 1/R_eq=1/6+1/12=3/12=1/4 → R_eq=4 Ω. Sous 12 V : I_total=3 A, I₁=2 A, I₂=1 A.</p>`,
  },
  {
    order: 9, series: "D", title: "Leçon 7 : Dipôles passifs et actifs — associations de résistances",
    duration: 50, isPremium: false,
    summary: "Distinguer les dipôles passifs (résistances, condensateurs, bobines) des dipôles actifs (générateurs), et maîtriser les caractéristiques des générateurs réels.",
    keyPoints: `Dipôle passif : ne peut que consommer de l'énergie (R, C, L)
Dipôle actif : source d'énergie (pile, générateur, source de tension)
Générateur réel de tension : U = E − r·I (E = force électromotrice, r = résistance interne)
Récepteur réel : U = E_contre + r·I (E_contre = f.c.é.m. de contre-réaction)
Puissance fournie par le générateur : P_totale = E·I
Puissance utile : P_utile = U·I = (E−rI)·I
Rendement : η = P_utile/P_totale = U/E = 1 − rI/E
Adaptation d'impédance : puissance maximale transmise quand r = R_charge`,
    content: `<h2>Dipôles Passifs et Actifs</h2>
<h3>I. Dipôles passifs</h3>
<ul>
  <li><strong>Résistance (R) :</strong> U = R·I ; ne stocke pas d'énergie, dissipe par effet Joule.</li>
  <li><strong>Condensateur (C) :</strong> i = C·du/dt ; stocke l'énergie sous forme électrostatique Ec = ½CU².</li>
  <li><strong>Bobine (L) :</strong> u = L·di/dt ; stocke l'énergie sous forme magnétique Em = ½LI².</li>
</ul>
<h3>II. Dipôles actifs — Générateur réel</h3>
<p>Un générateur réel est modélisé par une source de tension idéale E (force électromotrice, f.é.m.) en série avec une résistance interne r :</p>
<p style="text-align:center">U = E − r·I</p>
<ul>
  <li>En circuit ouvert (I=0) : U = E</li>
  <li>En court-circuit (U=0) : I_cc = E/r (à éviter !)</li>
  <li>En charge (R_ext) : I = E/(R_ext+r) ; U = R_ext·E/(R_ext+r)</li>
</ul>
<h3>III. Bilan de puissance</h3>
<ul>
  <li>Puissance fournie par le générateur : P_gen = E·I</li>
  <li>Pertes internes (effet Joule) : P_int = r·I²</li>
  <li>Puissance utile (délivrée à la charge) : P_utile = R_ext·I² = E·I − r·I²</li>
  <li>Rendement : η = P_utile/P_gen = R_ext/(R_ext+r)</li>
</ul>
<h3>IV. Association de générateurs</h3>
<ul>
  <li>En série (même sens) : E_eq = ΣEᵢ ; r_eq = Σrᵢ</li>
  <li>En parallèle identiques : E_eq = E ; r_eq = r/n</li>
</ul>`,
    examples: `<p><strong>Exemple 1 :</strong> Pile E=9 V, r=1 Ω, R_ext=8 Ω. I=9/9=1 A. U_borne=9−1=8 V. P_utile=8 W. η=8/9≈89%.</p>
<p><strong>Exemple 2 :</strong> 3 piles identiques (E=1,5 V, r=0,5 Ω) en série. E_eq=4,5 V, r_eq=1,5 Ω. Sous charge R=4,5 Ω : I=4,5/6=0,75 A.</p>`,
  },
  {
    order: 10, series: "D", title: "Leçon 8 : Dipôle RC — charge et décharge d'un condensateur",
    duration: 55, isPremium: false,
    summary: "Étudier la charge et la décharge d'un condensateur dans un circuit RC : équation différentielle, solutions exponentielles, constante de temps τ.",
    keyPoints: `Condensateur : C en farads (F) ; relation q = C·u_C ; i = C·du_C/dt
Charge (E branché) : u_C(t) = E(1−e^{−t/τ}) ; i(t) = (E/R)e^{−t/τ}
Décharge (court-circuit) : u_C(t) = U₀e^{−t/τ} ; i(t) = −(U₀/R)e^{−t/τ}
Constante de temps τ = RC (en secondes) : temps pour atteindre 63% de la valeur finale
À t = 5τ : condensateur pratiquement chargé (99,3%) ou déchargé (0,7%)
Énergie stockée : E_C = ½C·u_C² (joules)
Équation différentielle : RC·du_C/dt + u_C = E (1er ordre)`,
    content: `<h2>Dipôle RC — Charge et Décharge</h2>
<h3>I. Le condensateur</h3>
<p>Capacité C en farads (F). Relations fondamentales :<br>
q = C·u_C (charge stockée) ; i = dq/dt = C·du_C/dt</p>
<p>Énergie stockée : E_C = ½C·u_C² (J)</p>
<h3>II. Charge du condensateur</h3>
<p>Circuit série R-C-E. Loi des mailles : E = u_R + u_C = R·i + u_C<br>
Avec i = C·du_C/dt :</p>
<p style="text-align:center">RC·(du_C/dt) + u_C = E</p>
<p><strong>Solution (conditions initiales u_C(0)=0) :</strong></p>
<ul>
  <li>u_C(t) = E(1 − e^{−t/τ}), τ = RC</li>
  <li>i(t) = (E/R)·e^{−t/τ}</li>
</ul>
<p>Interprétation de τ : à t=τ, u_C = E(1−1/e) ≈ 0,63E.</p>
<h3>III. Décharge du condensateur</h3>
<p>Condensateur initialement chargé à U₀, branché sur R seul :<br>
u_C(t) = U₀·e^{−t/τ} ; i(t) = −(U₀/R)·e^{−t/τ}</p>
<h3>IV. Constante de temps τ = RC</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse">
  <tr><th>t</th><th>u_C(t)/E (charge)</th></tr>
  <tr><td>τ</td><td>63%</td></tr>
  <tr><td>2τ</td><td>86%</td></tr>
  <tr><td>3τ</td><td>95%</td></tr>
  <tr><td>5τ</td><td>99% (≈ état final)</td></tr>
</table>`,
    examples: `<p><strong>Exemple 1 :</strong> R=10 kΩ, C=100 μF. τ=RC=10⁴×10⁻⁴=1 s. Sous E=12 V : à t=1 s, u_C=12(1−e⁻¹)≈7,6 V.</p>
<p><strong>Exemple 2 :</strong> Condensateur C=50 μF chargé à 20 V se décharge dans R=2 kΩ. τ=0,1 s. À t=0,2 s : u_C=20e⁻²≈2,71 V.</p>`,
  },
  {
    order: 11, series: "D", title: "Leçon 9 : Dipôle RL — réponse en courant d'un circuit inductif",
    duration: 50, isPremium: false,
    summary: "Étudier la réponse d'un circuit RL à un échelon de tension : équation différentielle, établissement et rupture du courant, constante de temps τ = L/R.",
    keyPoints: `Bobine (inductance) : L en henrys (H) ; u_L = L·di/dt
Énergie magnétique : E_L = ½L·I² (J)
Établissement du courant (E branché) : i(t) = (E/R)(1−e^{−t/τ}) ; τ = L/R
Rupture (court-circuit) : i(t) = I₀·e^{−t/τ}
À t=τ : i atteint 63% de la valeur finale I∞ = E/R
La bobine idéale s'oppose aux variations brusques du courant (anti-variation)
Tension aux bornes de la bobine : u_L = E·e^{−t/τ} (établissement) ; u_L = −RI₀·e^{−t/τ} (rupture)
Surtension à la rupture : u_L peut être très grande si L grand et Δt petit`,
    content: `<h2>Dipôle RL — Réponse en Courant</h2>
<h3>I. La bobine idéale</h3>
<p>L'inductance L mesure la résistance d'une bobine aux variations de courant :<br>
u_L = L·di/dt</p>
<p>Énergie magnétique stockée : E_L = ½·L·i² (J)</p>
<h3>II. Établissement du courant (circuit R-L-E)</h3>
<p>Loi des mailles : E = u_R + u_L = R·i + L·di/dt</p>
<p style="text-align:center">L·(di/dt) + R·i = E</p>
<p><strong>Solution (i(0)=0) :</strong> i(t) = (E/R)(1 − e^{−t/τ}), τ = L/R</p>
<ul>
  <li>i(∞) = E/R (état permanent)</li>
  <li>u_L(t) = E·e^{−t/τ} → 0 en régime permanent (bobine = fil)</li>
</ul>
<h3>III. Rupture du courant</h3>
<p>Courant initial I₀ : i(t) = I₀·e^{−t/τ}<br>
u_L(t) = −R·I₀·e^{−t/τ} → surtension importante si rupture brusque !</p>
<h3>IV. Constante de temps τ = L/R</h3>
<p>Plus L est grand ou R est petit, plus l'établissement du courant est lent.</p>
<table border="1" cellpadding="6" style="border-collapse:collapse">
  <tr><th>t</th><th>i(t)/I∞</th></tr>
  <tr><td>τ</td><td>63%</td></tr>
  <tr><td>5τ</td><td>≈ 99%</td></tr>
</table>`,
    examples: `<p><strong>Exemple 1 :</strong> L=0,2 H, R=100 Ω, E=10 V. τ=0,002 s=2 ms. I∞=0,1 A. À t=2 ms : i=0,1(1−e⁻¹)≈63 mA.</p>
<p><strong>Exemple 2 :</strong> La bobine assure la continuité du courant : lors de l'ouverture d'un interrupteur, elle génère une surtension qui peut endommager les composants → utiliser une diode de roue libre en protection.</p>`,
  },
  {
    order: 12, series: "D", title: "Leçon 10 : Dipôle RLC et résonance en tension",
    duration: 55, isPremium: false,
    summary: "Étudier le circuit RLC série en régime sinusoïdal : impédance, déphasage, résonance en tension et facteur de qualité.",
    keyPoints: `Régime sinusoïdal : u(t)=U_m·cos(ωt+φ), ω=2πf pulsation (rad/s)
Impédances complexes : Z_R=R ; Z_C=1/(jCω) ; Z_L=jLω
Circuit RLC série : Z=R+j(Lω−1/(Cω)) ; |Z|=√(R²+(Lω−1/(Cω))²)
Courant : I=U/|Z| ; déphasage φ=arctan((Lω−1/(Cω))/R)
Résonance en courant : ω₀=1/√(LC) (|Z| minimal = R → I maximal)
Tension à la résonance : U_L=U_C=Q·U (surtension !)
Facteur de qualité : Q=L·ω₀/R=1/(R·C·ω₀)=ω₀/Δω
Bande passante : Δω=R/L (large pour grand R, étroite pour petit R)`,
    content: `<h2>Dipôle RLC — Résonance en Tension</h2>
<h3>I. Rappels sur le régime sinusoïdal</h3>
<p>En régime sinusoïdal forcé de pulsation ω, on utilise les représentations complexes (phaseurs) :<br>
Z_R = R ; Z_C = 1/(jCω) = −j/(Cω) ; Z_L = jLω</p>
<h3>II. Circuit RLC série</h3>
<p>Impédance totale : Z = R + jLω + 1/(jCω) = R + j(Lω − 1/(Cω))</p>
<p>Module : |Z| = √(R² + (Lω − 1/(Cω))²)</p>
<p>Intensité efficace : I = U/|Z| (U = tension efficace appliquée)</p>
<p>Déphasage courant/tension : tan φ = (Lω − 1/(Cω))/R</p>
<h3>III. Résonance en courant</h3>
<p>Résonance quand Im(Z) = 0 ⟺ Lω = 1/(Cω) → <strong>ω₀ = 1/√(LC)</strong></p>
<ul>
  <li>À ω₀ : |Z| = R (minimal) → I maximal</li>
  <li>Courant en phase avec la tension (φ=0)</li>
</ul>
<h3>IV. Facteur de qualité Q et surtension</h3>
<p>Q = Lω₀/R = 1/(RCω₀) = ω₀/(R/L)</p>
<p>À la résonance :</p>
<ul>
  <li>U_L = U_C = Q·U (surtension si Q >> 1)</li>
  <li>Bande passante à −3dB : Δω = ω₀/Q = R/L</li>
</ul>`,
    examples: `<p><strong>Exemple 1 :</strong> R=10 Ω, L=0,1 H, C=100 μF. ω₀=1/√(0,1×10⁻⁴)=1/√(10⁻⁵)≈316 rad/s. Q=316×0,1/10≈3,16. Sous U=10 V à la résonance : U_L=U_C=31,6 V (surtension).</p>`,
  },
  {
    order: 13, series: "D", title: "Leçon 11 : Phénomènes électromagnétiques — champ magnétique, induction, force de Laplace",
    duration: 60, isPremium: false,
    summary: "Étudier le champ magnétique créé par des courants, la force de Laplace sur un conducteur, et le phénomène d'induction électromagnétique (loi de Faraday-Lenz).",
    keyPoints: `Champ magnétique B⃗ (tesla, T) ; créé par des courants ou des aimants
Champ d'un fil rectiligne infini : B = μ₀I/(2πd) (d = distance)
Champ d'un solénoïde : B = μ₀nI (n = nombre de spires/m)
Force de Laplace sur un conducteur de longueur L portant I dans B⃗ : F⃗ = I·L⃗∧B⃗ ; |F| = BIL sinθ
Flux magnétique : Φ = B·S·cosα (weber, Wb)
Loi de Faraday (induction) : e = −dΦ/dt (f.é.m. induite)
Loi de Lenz : le courant induit s'oppose à la variation du flux (cause)
Inductance mutuelle M : e₂ = −M·di₁/dt`,
    content: `<h2>Électromagnétisme — Champ, Induction, Laplace</h2>
<h3>I. Champ magnétique</h3>
<p>Créé par des charges en mouvement (courants), le champ magnétique B⃗ est en tesla (T = kg/(A·s²)).</p>
<ul>
  <li><strong>Fil rectiligne infini :</strong> B = μ₀I/(2πd), μ₀ = 4π×10⁻⁷ H/m</li>
  <li><strong>Solénoïde :</strong> B = μ₀·n·I (n = nombre de spires par mètre)</li>
  <li><strong>Règle de la main droite :</strong> pouce = sens du courant → doigts = sens de B⃗</li>
</ul>
<h3>II. Force de Laplace</h3>
<p>Un conducteur de longueur L portant un courant I dans un champ B⃗ subit :</p>
<p style="text-align:center">F⃗ = I·L⃗ ∧ B⃗, |F| = B·I·L·sin θ</p>
<p>Règle de la main gauche (moteur) : index = B⃗ ; majeur = I → pouce = F⃗</p>
<h3>III. Induction électromagnétique</h3>
<p>Flux magnétique à travers une surface S : Φ = B·S·cos α (weber)</p>
<p><strong>Loi de Faraday :</strong> une variation de flux induit une f.é.m. :<br>
e = −dΦ/dt</p>
<p><strong>Loi de Lenz :</strong> le courant induit s'oppose à la cause (variation de flux). Permet de déterminer le sens du courant induit.</p>
<h3>IV. Applications</h3>
<ul>
  <li><strong>Moteur électrique :</strong> force de Laplace → mouvement</li>
  <li><strong>Générateur (alternateur) :</strong> mouvement → variation de flux → f.é.m.</li>
  <li><strong>Transformateur :</strong> inductance mutuelle M : e₂ = −M·di₁/dt → U₂/U₁ = N₂/N₁</li>
</ul>`,
    examples: `<p><strong>Exemple 1 :</strong> Fil portant I=5 A dans B=0,2 T sur L=0,3 m (⊥). F=0,2×5×0,3=0,3 N.</p>
<p><strong>Exemple 2 (transformateur) :</strong> N₁=200 spires, N₂=800 spires, U₁=230 V. U₂=230×800/200=920 V (transformateur élévateur).</p>`,
  },
  // ─── Thème 3 : Ondes ──────────────────────────────────────────────────────
  {
    order: 14, series: "D", title: "Leçon 12 : Ondes mécaniques progressives",
    duration: 50, isPremium: false,
    summary: "Étudier la propagation des ondes mécaniques : définition, paramètres (longueur d'onde, fréquence, célérité), équation d'onde et types d'ondes.",
    keyPoints: `Onde mécanique : perturbation se propageant dans un milieu matériel (pas de transport de matière)
Transversale : oscillation ⊥ à la propagation (eau, corde)
Longitudinale : oscillation ∥ à la propagation (son dans l'air)
Célérité v (m/s) : vitesse de propagation de l'onde
Relation fondamentale : v = λ·f = λ/T (λ = longueur d'onde, f = fréquence, T = période)
Équation d'onde (1D) : y(x,t) = A·cos(ωt − kx + φ₀), k = 2π/λ (nombre d'onde)
Retard temporel : Δt = d/v (d = distance parcouru)
Déphasage spatial : Δφ = 2πd/λ`,
    content: `<h2>Ondes Mécaniques Progressives</h2>
<h3>I. Définition et types</h3>
<p>Une <strong>onde mécanique</strong> est la propagation d'une perturbation dans un milieu sans transport de matière, mais avec transport d'énergie.</p>
<ul>
  <li><strong>Transversale :</strong> la perturbation est perpendiculaire à la direction de propagation (onde sur une corde, vague d'eau)</li>
  <li><strong>Longitudinale :</strong> la perturbation est parallèle à la propagation (onde sonore dans l'air)</li>
</ul>
<h3>II. Paramètres d'une onde</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Paramètre</th><th>Symbole</th><th>Unité</th></tr>
  <tr><td>Période</td><td>T</td><td>seconde (s)</td></tr>
  <tr><td>Fréquence</td><td>f = 1/T</td><td>hertz (Hz)</td></tr>
  <tr><td>Longueur d'onde</td><td>λ</td><td>mètre (m)</td></tr>
  <tr><td>Célérité</td><td>v</td><td>m/s</td></tr>
  <tr><td>Amplitude</td><td>A</td><td>m (ou Pa, etc.)</td></tr>
</table>
<p><strong>Relation fondamentale :</strong> v = λ·f = λ/T</p>
<h3>III. Équation d'onde</h3>
<p>Onde sinusoïdale se propageant dans le sens +x :<br>
y(x, t) = A·cos(ωt − kx + φ₀)</p>
<p>Avec : ω = 2πf (pulsation) ; k = 2π/λ (nombre d'onde) ; v = ω/k</p>
<h3>IV. Retard et déphasage</h3>
<p>Un point M à distance d de la source O vibre avec un retard : Δt = d/v</p>
<p>Déphasage entre O et M : Δφ = 2π·d/λ (en radians)</p>`,
    examples: `<p><strong>Exemple 1 :</strong> Onde sonore dans l'air (v=340 m/s), f=440 Hz (la₃). λ=340/440≈0,77 m.</p>
<p><strong>Exemple 2 :</strong> Deux points A et B séparés de d=3 m sur une corde (λ=4 m). Déphasage: Δφ=2π×3/4=3π/2 rad. Retard Δt=3/v.</p>`,
  },
  {
    order: 15, series: "D", title: "Leçon 13 : Ondes sonores et ondes lumineuses",
    duration: 50, isPremium: false,
    summary: "Comparer les ondes sonores et lumineuses : nature, gamme de fréquences, célérité, niveau sonore, spectre électromagnétique.",
    keyPoints: `Ondes sonores : mécaniques longitudinales, nécessitent un milieu ; 20 Hz–20 kHz (audibles)
Célérité du son dans l'air ≈ 340 m/s (à 20°C) ; dans l'eau ≈ 1500 m/s ; dans l'acier ≈ 5000 m/s
Niveau sonore : L = 10·log(I/I₀) (décibels, dB) ; I₀ = 10⁻¹² W/m²
Ondes lumineuses : électromagnétiques transversales, se propagent dans le vide
c = 3×10⁸ m/s dans le vide (célérité de la lumière)
Lumière visible : λ ≈ 400 nm (violet) à 700 nm (rouge)
Spectre EM : γ, X, UV, visible, IR, micro-ondes, radio (par ordre de λ croissante)
Effet Doppler : Δf/f = v_source/v_onde (rapprochement → fréquence ↑)`,
    content: `<h2>Ondes Sonores et Lumineuses</h2>
<h3>I. Ondes sonores</h3>
<p>Ondes mécaniques longitudinales de pression se propageant dans un milieu élastique.</p>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Gamme</th><th>Fréquences</th></tr>
  <tr><td>Infrasons</td><td>&lt; 20 Hz</td></tr>
  <tr><td>Sons audibles</td><td>20 Hz – 20 kHz</td></tr>
  <tr><td>Ultrasons</td><td>&gt; 20 kHz</td></tr>
</table>
<p>Célérité du son : v_air ≈ 340 m/s (T=20°C) ; v_eau ≈ 1 500 m/s ; v_acier ≈ 5 000 m/s.</p>
<p><strong>Niveau sonore :</strong> L = 10·log₁₀(I/I₀) [dB], avec I₀ = 10⁻¹² W/m².</p>
<h3>II. Ondes lumineuses</h3>
<p>Ondes électromagnétiques transversales : champs E⃗ et B⃗ perpendiculaires à la propagation et entre eux. Se propagent dans le vide à c = 3×10⁸ m/s.</p>
<p>Dans un milieu d'indice n : v = c/n, λ_milieu = λ_vide/n.</p>
<h3>III. Spectre électromagnétique</h3>
<table border="1" cellpadding="5" style="border-collapse:collapse;width:100%">
  <tr><th>Radiation</th><th>Longueur d'onde</th></tr>
  <tr><td>Rayons γ</td><td>&lt; 10⁻¹² m</td></tr>
  <tr><td>Rayons X</td><td>10⁻¹² – 10⁻⁸ m</td></tr>
  <tr><td>UV</td><td>10⁻⁸ – 400 nm</td></tr>
  <tr><td>Visible</td><td>400 – 700 nm</td></tr>
  <tr><td>Infrarouge</td><td>700 nm – 1 mm</td></tr>
  <tr><td>Micro-ondes</td><td>1 mm – 10 cm</td></tr>
  <tr><td>Radio</td><td>&gt; 10 cm</td></tr>
</table>`,
    examples: `<p><strong>Exemple 1 :</strong> Seuil de douleur à I=1 W/m². L=10·log(1/10⁻¹²)=10×12=120 dB.</p>
<p><strong>Exemple 2 (Doppler) :</strong> Ambulance (f₀=500 Hz, v=20 m/s) s'approchant. f_reçu = f₀×v_son/(v_son−v_source) = 500×340/320≈531 Hz.</p>`,
  },
  {
    order: 16, series: "D", title: "Leçon 14 : Réflexion, réfraction, dispersion, spectre lumineux",
    duration: 50, isPremium: false,
    summary: "Étudier les lois de la réflexion et de la réfraction de la lumière, la dispersion par un prisme, et la décomposition de la lumière blanche.",
    keyPoints: `Réflexion : angle d'incidence = angle de réflexion (i₁ = r, par rapport à la normale)
Réfraction (Snell-Descartes) : n₁·sin i₁ = n₂·sin i₂
Indice de réfraction : n = c/v (sans dimension, n ≥ 1)
Réflexion totale interne : i₁ > i_c avec sin i_c = n₂/n₁ (n₁ > n₂)
Applications : fibre optique, mirage
Dispersion : n dépend de λ → les couleurs se séparent à travers un prisme
Lumière blanche = superposition de toutes les radiations visibles (400–700 nm)
Arc-en-ciel : dispersion + réflexion interne dans les gouttes d'eau`,
    content: `<h2>Réflexion, Réfraction et Dispersion</h2>
<h3>I. Réflexion de la lumière</h3>
<p>Lorsqu'un rayon lumineux frappe une surface séparant deux milieux, une partie est réfléchie.</p>
<p><strong>Lois de la réflexion :</strong></p>
<ol>
  <li>Le rayon réfléchi est dans le plan d'incidence</li>
  <li>Angle de réflexion = angle d'incidence : r = i</li>
</ol>
<h3>II. Réfraction de la lumière</h3>
<p><strong>Loi de Snell-Descartes :</strong></p>
<p style="text-align:center">n₁·sin i₁ = n₂·sin i₂</p>
<p>Où i₁ = angle d'incidence, i₂ = angle de réfraction (par rapport à la normale), n₁, n₂ = indices.</p>
<ul>
  <li>n₁ < n₂ (passage vers milieu plus dense) → rayon se rapproche de la normale (i₂ < i₁)</li>
  <li>n₁ > n₂ → rayon s'éloigne de la normale (i₂ > i₁)</li>
</ul>
<h3>III. Réflexion totale interne</h3>
<p>Si n₁ > n₂ et i₁ > i_c : tout le rayon est réfléchi (pas de réfraction).</p>
<p>Angle critique : sin i_c = n₂/n₁</p>
<p>Application : <strong>fibre optique</strong> (n_cœur > n_gaine → guidage de la lumière).</p>
<h3>IV. Dispersion de la lumière</h3>
<p>L'indice n dépend de la longueur d'onde : n_violet > n_rouge.</p>
<p>À travers un prisme, les couleurs sont déviées différemment → <strong>décomposition de la lumière blanche</strong>.</p>`,
    examples: `<p><strong>Exemple 1 :</strong> Rayon passant de l'air (n₁=1) dans le verre (n₂=1,5) avec i₁=30°. sin i₂=sin30°/1,5=0,5/1,5=1/3 → i₂≈19,5°.</p>
<p><strong>Exemple 2 (réflexion totale) :</strong> n_verre=1,5 ; n_air=1. i_c=arcsin(1/1,5)=arcsin(0,667)≈41,8°. Pour i>41,8°, réflexion totale.</p>`,
  },
  {
    order: 17, series: "D", title: "Leçon 15 : Notions de son et de signal — fréquence, amplitude, intensité",
    duration: 45, isPremium: false,
    summary: "Caractériser un signal périodique et un son : période, fréquence, amplitude, analyse spectrale, hauteur et timbre d'un son musical.",
    keyPoints: `Signal périodique : se répète avec une période T
Fréquence : f = 1/T (Hz) ; pulsation ω = 2πf
Amplitude : valeur maximale du signal
Valeur efficace (RMS) : U_eff = U_m/√2 pour un signal sinusoïdal
Spectre de fréquences : représentation fréquence–amplitude (FFT)
Son pur : sinusoïdal (un seul harmonique) ; son complexe : superposition d'harmoniques
Hauteur d'un son : liée à sa fréquence fondamentale f₀
Timbre : lié à la composition en harmoniques (forme du spectre)
Intensité sonore : I = P/S (W/m²)`,
    content: `<h2>Notions de Son et de Signal</h2>
<h3>I. Signal périodique</h3>
<p>Un signal est <strong>périodique</strong> si s(t+T) = s(t) pour tout t. La plus petite valeur positive T est la période.</p>
<ul>
  <li>Fréquence : f = 1/T (Hz)</li>
  <li>Pulsation : ω = 2πf (rad/s)</li>
  <li>Amplitude : valeur maximale A</li>
</ul>
<p>Signal sinusoïdal : s(t) = A·cos(ωt + φ)</p>
<h3>II. Valeurs caractéristiques</h3>
<ul>
  <li>Valeur maximale (crête) : A</li>
  <li>Valeur crête-à-crête : 2A</li>
  <li>Valeur efficace (RMS) : pour un sinus, U_eff = U_m/√2 ≈ 0,707·U_m</li>
  <li>Valeur moyenne : nulle pour un signal sinusoïdal</li>
</ul>
<h3>III. Caractéristiques d'un son</h3>
<ul>
  <li><strong>Hauteur :</strong> liée à la fréquence fondamentale f₀ (note musicale)</li>
  <li><strong>Timbre :</strong> lié à la distribution des harmoniques (même note, instruments différents)</li>
  <li><strong>Intensité (sonie) :</strong> liée à l'amplitude (volume sonore)</li>
</ul>
<h3>IV. Analyse spectrale (Fourier)</h3>
<p>Tout signal périodique se décompose en une somme d'harmoniques :<br>
s(t) = a₀ + Σ Aₙ·cos(nω₀t + φₙ) (série de Fourier)</p>
<p>Le <strong>spectre</strong> représente les amplitudes Aₙ en fonction de la fréquence nf₀.</p>`,
    examples: `<p><strong>Exemple 1 :</strong> Signal électrique U=230 V (valeur efficace) du secteur ivoirien, f=50 Hz. U_m = 230√2 ≈ 325 V. T=0,02 s.</p>
<p><strong>Exemple 2 :</strong> La note La₃ (440 Hz) jouée au piano contient les harmoniques 440, 880, 1320 Hz... avec des amplitudes décroissantes qui donnent au piano son timbre particulier.</p>`,
  },
  // ─── Thème 4 : Optique géométrique ────────────────────────────────────────
  {
    order: 18, series: "D", title: "Leçon 16 : Réfraction, réflexion, lois de Snell-Descartes",
    duration: 50, isPremium: false,
    summary: "Appliquer rigoureusement les lois de Snell-Descartes pour tracer les rayons réfractés et réfléchis, étudier la réflexion totale et ses applications.",
    keyPoints: `Loi de la réflexion : i_r = i (angles par rapport à la normale)
Loi de Snell-Descartes : n₁ sin i₁ = n₂ sin i₂
Indices courants : air ≈ 1 ; eau ≈ 1,33 ; verre crown ≈ 1,5 ; diamant ≈ 2,42
Réflexion totale interne : i > i_c = arcsin(n₂/n₁) avec n₁ > n₂
Construction géométrique : tracer la normale, mesurer les angles par rapport à elle
Déviation d'un prisme : δ = (i₁+i₂) − (r₁+r₂) = (i₁+i₂) − A (A = angle au sommet)
Condition de réflexion totale dans une fibre optique : OA (ouverture angulaire) = arcsin(√(n₁²−n₂²))`,
    content: `<h2>Lois de Snell-Descartes — Applications</h2>
<h3>I. Rappels et conventions</h3>
<p>Les angles sont toujours mesurés par rapport à la <strong>normale</strong> à la surface au point d'incidence, dans le plan d'incidence.</p>
<h3>II. Loi de la réflexion</h3>
<ul>
  <li>Rayon incident, normale et rayon réfléchi dans le même plan</li>
  <li>Angle de réflexion = angle d'incidence : i_r = i</li>
</ul>
<h3>III. Loi de Snell-Descartes (réfraction)</h3>
<p>n₁·sin i₁ = n₂·sin i₂</p>
<p>Si i₂ > 90° → impossible → réflexion totale.</p>
<table border="1" cellpadding="5" style="border-collapse:collapse;width:100%">
  <tr><th>Milieu</th><th>Indice n</th></tr>
  <tr><td>Vide / air</td><td>1,000 / ≈1</td></tr>
  <tr><td>Eau (20°C)</td><td>1,333</td></tr>
  <tr><td>Verre crown</td><td>1,50 – 1,52</td></tr>
  <tr><td>Diamant</td><td>2,42</td></tr>
</table>
<h3>IV. Réflexion totale interne</h3>
<p>Condition : n₁ > n₂ et i₁ ≥ i_c. Angle critique : sin i_c = n₂/n₁.</p>
<p>Fibre optique : lumière guidée par réflexions totales successives dans le cœur (n_cœur > n_gaine).</p>
<h3>V. Déviation par un prisme</h3>
<p>Pour un prisme d'angle A et d'indice n, la déviation δ = i₁ + i₂ − A.<br>
Déviation minimale D_m : sin((A+D_m)/2) = n·sin(A/2)</p>`,
    examples: `<p><strong>Exemple 1 :</strong> Rayon incident dans l'eau (n₁=1,33) vers l'air (n₂=1) avec i₁=40°. sin i₂=1,33×sin40°=1,33×0,643=0,855 → i₂≈58,8°.</p>
<p><strong>Exemple 2 (angle critique eau-air) :</strong> sin i_c=1/1,33=0,752 → i_c≈48,8°. Pour i>48,8°, réflexion totale.</p>`,
  },
  {
    order: 19, series: "D", title: "Leçon 17 : Lentilles minces — images réelles et virtuelles",
    duration: 55, isPremium: false,
    summary: "Maîtriser la formation des images par les lentilles convergentes et divergentes : construction géométrique, relation de conjugaison, grandissement.",
    keyPoints: `Lentille convergente : distance focale f' > 0 ; vergence V = 1/f' > 0 (dioptries, δ)
Lentille divergente : f' < 0 ; V < 0
Foyers : F (objet, côté entrant) et F' (image, côté sortant). OF' = f'
Relation de conjugaison (Descartes) : 1/OA' − 1/OA = 1/f' (= V)
Grandissement transversal : γ = OA'/OA = A'B'/AB
Image réelle : A' côté opposé à A (lumière passe par A') ; image virtuelle : A' même côté que A
Rayons particuliers : // à l'axe → passe par F' ; par O → non dévié ; par F → // à l'axe après`,
    content: `<h2>Lentilles Minces</h2>
<h3>I. Types de lentilles</h3>
<ul>
  <li><strong>Convergente (biconvexe, plan-convexe) :</strong> f' > 0, fait converger les rayons parallèles vers F'</li>
  <li><strong>Divergente (biconcave, plan-concave) :</strong> f' < 0, fait diverger les rayons</li>
</ul>
<p>Vergence V = 1/f' en dioptries (δ = m⁻¹).</p>
<h3>II. Construction des images</h3>
<p>Trois rayons remarquables pour une lentille convergente :</p>
<ol>
  <li>Rayon passant par O → non dévié</li>
  <li>Rayon parallèle à l'axe → dévié vers F'</li>
  <li>Rayon passant par F → ressort parallèle à l'axe</li>
</ol>
<h3>III. Relation de conjugaison et grandissement</h3>
<p>Convention : O = centre optique, abscisses algébriques de A et A' par rapport à O.</p>
<p style="text-align:center"><strong>1/OA' − 1/OA = 1/f' = V</strong></p>
<p>Grandissement : γ = OA'/OA = A'B'/AB</p>
<ul>
  <li>|γ| > 1 : image agrandie ; |γ| < 1 : image réduite</li>
  <li>γ < 0 : image renversée ; γ > 0 : image droite</li>
</ul>
<h3>IV. Cas particuliers</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Position objet (lentille convergente)</th><th>Image</th></tr>
  <tr><td>À l'infini</td><td>Réelle, ponctuelle en F'</td></tr>
  <tr><td>Au-delà de 2F</td><td>Réelle, renversée, réduite</td></tr>
  <tr><td>Entre F et 2F</td><td>Réelle, renversée, agrandie</td></tr>
  <tr><td>Entre F et O</td><td>Virtuelle, droite, agrandie (loupe)</td></tr>
</table>`,
    examples: `<p><strong>Exemple 1 :</strong> Lentille convergente f'=20 cm, objet à OA=−30 cm. 1/OA'=1/20+1/(−30)=3/60−2/60=1/60 → OA'=60 cm. γ=60/(−30)=−2 (renversée, agrandie x2).</p>
<p><strong>Exemple 2 :</strong> Lentille divergente f'=−15 cm, objet à OA=−45 cm. 1/OA'=1/(−15)+1/(−45)⁻¹... 1/OA'=−1/15−(−1/45)=−3/45+1/45=−2/45 → OA'=−22,5 cm. Image virtuelle, côté objet.</p>`,
  },
  {
    order: 20, series: "D", title: "Leçon 18 : Instruments d'optique simples — loupe, appareil photo, lunette",
    duration: 50, isPremium: false,
    summary: "Étudier les principes optiques de la loupe, de l'appareil photo et d'un rudiment de lunette/microscope.",
    keyPoints: `Loupe : lentille convergente utilisée avec objet entre F et O → image virtuelle, agrandie
Grossissement loupe : G = d/f' (d = distance vision claire = 25 cm conventionnellement)
Appareil photo : lentille convergente formant une image réelle sur le capteur/film
Mise au point : régler la distance lentille-capteur selon 1/OA'−1/OA=1/f'
Lunette astronomique : objectif (grande f') + oculaire (petite f') ; grossissement G=f_obj/f_oc
Microscope : objectif (courte f') + oculaire (25 cm/f'_oc) ; G=L·25/(f'_obj·f'_oc) (L=longueur du tube)
Œil normal : voit net de 25 cm (punctum proximum) à l'infini (punctum remotum)`,
    content: `<h2>Instruments d'Optique Simples</h2>
<h3>I. L'œil humain</h3>
<p>L'œil est modélisé par un système de lentilles convergentes (cristallin, cornée) formant une image sur la rétine.</p>
<ul>
  <li>Vision nette : de 25 cm (PP, punctum proximum) à ∞ (PR)</li>
  <li>Myopie : PR fini → correction par lentille divergente</li>
  <li>Hypermétropie : PP > 25 cm → correction par lentille convergente</li>
</ul>
<h3>II. La loupe</h3>
<p>Lentille convergente (f' court) avec objet entre F et O → image virtuelle droite agrandie.</p>
<p>Grossissement commercial : G = d/f' (d = 25 cm = distance conventionnelle de vision claire)</p>
<h3>III. L'appareil photo</h3>
<p>Lentille convergente formant une image <strong>réelle renversée</strong> sur le capteur numérique (ou film).</p>
<p>Mise au point : ajuster OA' selon 1/OA' = 1/f' + 1/OA.</p>
<p>Profondeur de champ : zone de netteté en avant et en arrière du plan mis au point.</p>
<h3>IV. La lunette astronomique (afocale)</h3>
<p>Composée d'un objectif (f'_obj grand) et d'un oculaire (f'_oc petit), image finale à l'infini.</p>
<p>Grossissement : G = f'_obj / f'_oc (sans unité)</p>
<h3>V. Le microscope</h3>
<p>Objectif courte focale → image intermédiaire réelle agrandie.<br>
Oculaire → amplifie comme une loupe.</p>
<p>Grossissement total : G ≈ (L / f'_obj) × (d / f'_oc) où L = longueur du tube optique (≈ 16 cm).</p>`,
    examples: `<p><strong>Exemple 1 (loupe) :</strong> f'=5 cm. G=25/5=5. Objet à OA=−4 cm (entre F et O). 1/OA'=1/5−1/4=−1/20 → OA'=−20 cm. Image virtuelle à 20 cm.</p>
<p><strong>Exemple 2 (lunette) :</strong> f'_obj=1 m, f'_oc=25 mm. G=1000/25=40. La Lune semble 40× plus proche.</p>`,
  },
  // ─── Thème 5 : Physique nucléaire ─────────────────────────────────────────
  {
    order: 21, series: "D", title: "Leçon 19 : Structure du noyau, isotopes, nucléides",
    duration: 45, isPremium: false,
    summary: "Décrire la structure du noyau atomique : protons, neutrons, nucléides, isotopes, unité de masse atomique et énergie de liaison.",
    keyPoints: `Noyau = protons (Z) + neutrons (N) ; A = Z + N (nombre de masse)
Notation du nucléide : ᴬ_Ζ X (X = symbole chimique)
Isotopes : même Z (même élément), N différent (ex. ¹²C, ¹³C, ¹⁴C)
Unité de masse atomique : 1 u = 1,66×10⁻²⁷ kg ≈ 931,5 MeV/c²
Énergie de liaison : E_L = Δm·c² (défaut de masse × c²) ; Δm = Z·m_p + N·m_n − m_noyau
Énergie de liaison par nucléon : E_L/A (maximum ≈ 8,8 MeV pour Fe-56 → noyau le plus stable)
Force nucléaire forte : responsable de la cohésion du noyau (porte courte ≈ 10⁻¹⁵ m)
Rayon du noyau : R ≈ R₀·A^(1/3), R₀ ≈ 1,2×10⁻¹⁵ m`,
    content: `<h2>Structure du Noyau, Isotopes, Nucléides</h2>
<h3>I. Composition du noyau atomique</h3>
<ul>
  <li><strong>Proton :</strong> charge +e, masse m_p = 1,673×10⁻²⁷ kg</li>
  <li><strong>Neutron :</strong> neutre, masse m_n = 1,675×10⁻²⁷ kg</li>
  <li><strong>Nucléon :</strong> terme générique pour proton ou neutron</li>
  <li>Notation : ᴬ_Ζ X → Z = numéro atomique (protons) ; A = nombre de masse (nucléons) ; N = A−Z (neutrons)</li>
</ul>
<h3>II. Isotopes</h3>
<p>Des isotopes d'un même élément ont le même Z mais des A différents. Exemples :</p>
<ul>
  <li>Hydrogène : ¹₁H (protium), ²₁H (deutérium), ³₁H (tritium)</li>
  <li>Carbone : ¹²₆C (stable), ¹³₆C (stable), ¹⁴₆C (radioactif)</li>
  <li>Uranium : ²³⁵₉₂U (fissile), ²³⁸₉₂U (fertile)</li>
</ul>
<h3>III. Unité de masse atomique (u.m.a.)</h3>
<p>1 u = 1/12 de la masse du ¹²C = 1,66054×10⁻²⁷ kg = 931,5 MeV/c²</p>
<h3>IV. Énergie de liaison</h3>
<p>Le défaut de masse Δm = Z·m_p + N·m_n − M_noyau > 0 (les nucléons liés pèsent moins que libres).</p>
<p>Énergie de liaison : E_L = Δm·c² (relation Einstein)</p>
<p>Énergie de liaison par nucléon : ε = E_L/A → plus ε est grand, plus le noyau est stable. Maximum ≈ 8,8 MeV/nucléon pour le fer-56.</p>`,
    examples: `<p><strong>Exemple 1 :</strong> ⁴₂He : Z=2, N=2, A=4. Δm = 2×1,00728+2×1,00867−4,00260 = 0,03037 u. E_L = 0,03037×931,5≈28,3 MeV. E_L/A=7,07 MeV.</p>
<p><strong>Exemple 2 :</strong> Le ¹⁴C (carbone-14) a Z=6, A=14, N=8. Même élément que ¹²C car même Z=6.</p>`,
  },
  {
    order: 22, series: "D", title: "Leçon 20 : Radioactivité α, β, γ — lois de décroissance",
    duration: 55, isPremium: false,
    summary: "Décrire les trois types de radioactivité, énoncer les lois de conservation, et étudier la loi de décroissance radioactive exponentielle.",
    keyPoints: `Radioactivité α : émission de ⁴₂He → A−4, Z−2
Radioactivité β⁻ : émission d'un électron + anti-neutrino → A constant, Z+1
Radioactivité β⁺ : émission d'un positon + neutrino → A constant, Z−1
Rayonnement γ : photon de haute énergie (désexcitation nucléaire) → A et Z inchangés
Conservation : numéro de charge (Z), nombre de masse (A), énergie-impulsion
Loi de décroissance : N(t) = N₀·e^{−λt} ; A(t) = λN(t) = A₀·e^{−λt}
Constante de désintégration : λ (s⁻¹) ; demi-vie : t₁/₂ = ln2/λ
Activité : A (becquerels, Bq = désintégration/s)`,
    content: `<h2>Radioactivité et Loi de Décroissance</h2>
<h3>I. Types de radioactivité</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Type</th><th>Particule émise</th><th>Effet sur Z</th><th>Effet sur A</th></tr>
  <tr><td>α</td><td>⁴₂He (noyau hélium)</td><td>Z → Z−2</td><td>A → A−4</td></tr>
  <tr><td>β⁻</td><td>e⁻ + ν̄_e</td><td>Z → Z+1</td><td>A = const</td></tr>
  <tr><td>β⁺</td><td>e⁺ + ν_e</td><td>Z → Z−1</td><td>A = const</td></tr>
  <tr><td>γ</td><td>Photon (hν)</td><td>Z = const</td><td>A = const</td></tr>
</table>
<p>Lois de conservation : ΣZ = const ; ΣA = const ; énergie-impulsion conservée.</p>
<h3>II. Loi de décroissance radioactive</h3>
<p>La désintégration est un processus aléatoire : dN/dt = −λN</p>
<p style="text-align:center">N(t) = N₀·e^{−λt}</p>
<p>Activité A(t) = λN(t) = A₀·e^{−λt} (en becquerels, Bq)</p>
<h3>III. Demi-vie (période radioactive)</h3>
<p>t₁/₂ = ln 2 / λ ≈ 0,693/λ</p>
<p>Après n demi-vies : N = N₀/2ⁿ ; A = A₀/2ⁿ</p>
<p>Ordres de grandeur : ²²²Rn (radon) : 3,8 jours ; ¹⁴C : 5 730 ans ; ²³⁸U : 4,5×10⁹ ans.</p>
<h3>IV. Unités</h3>
<ul>
  <li>Becquerel (Bq) : 1 désintégration par seconde</li>
  <li>Curie (Ci) : 1 Ci = 3,7×10¹⁰ Bq</li>
  <li>Gray (Gy) : énergie déposée par kg de tissu</li>
  <li>Sievert (Sv) : dose équivalente (Gy × facteur de qualité)</li>
</ul>`,
    examples: `<p><strong>Exemple 1 (α) :</strong> ²²⁶₈₈Ra → ²²²₈₆Rn + ⁴₂He. Z: 88=86+2 ✓ ; A: 226=222+4 ✓.</p>
<p><strong>Exemple 2 (décroissance) :</strong> ¹⁴C : t₁/₂=5730 ans, λ=ln2/5730≈1,21×10⁻⁴ an⁻¹. Après 11460 ans (2 demi-vies) : N=N₀/4 → 25% restant.</p>`,
  },
  {
    order: 23, series: "D", title: "Leçon 21 : Réactions nucléaires — fission, fusion, applications",
    duration: 55, isPremium: false,
    summary: "Étudier les réactions de fission et de fusion nucléaires, calculer l'énergie libérée via E=mc², et présenter les applications civiles et militaires.",
    keyPoints: `Réaction nucléaire : transformation de noyaux avec conservation de Z, A, énergie
Équation de bilan énergétique : Q = (Σm_réactifs − Σm_produits)·c² = Δm·c²
Si Q > 0 : réaction exoénergétique (libère de l'énergie)
Fission : noyau lourd (²³⁵U) + neutron → 2 fragments + 2-3 neutrons + énergie ≈ 200 MeV
Réaction en chaîne : si k≥1 (facteur de multiplication), auto-entretien possible
Centrale nucléaire : fission contrôlée, chaleur → vapeur → turbine → électricité
Fusion : noyaux légers (D+T → ⁴He + n) ; libère ≈ 17,6 MeV ; nécessite T > 10⁷ K
Énergie solaire : fusion H en He dans le cœur du Soleil`,
    content: `<h2>Réactions Nucléaires — Fission, Fusion</h2>
<h3>I. Bilan énergétique (relation d'Einstein)</h3>
<p>E = m·c² (c = 3×10⁸ m/s)</p>
<p>Énergie libérée : Q = Δm·c² = (masse_réactifs − masse_produits)·c²</p>
<p>Si Q > 0 : réaction exoénergétique → libère de l'énergie. Conversion : 1 u ↔ 931,5 MeV.</p>
<h3>II. Fission nucléaire</h3>
<p>Un neutron lent frappe ²³⁵₉₂U → noyaux composé instable → 2 fragments + 2-3 neutrons + énergie ≈ 200 MeV.</p>
<p>Exemple : ²³⁵U + n → ¹³⁹Ba + ⁹⁴Kr + 3n</p>
<p>Les 2-3 neutrons libérés peuvent déclencher d'autres fissions → <strong>réaction en chaîne</strong>.</p>
<ul>
  <li>Masse critique : masse minimale pour que la chaîne soit auto-entretenue</li>
  <li>Centrale : k=1 (réaction contrôlée par barres de contrôle)</li>
  <li>Bombe : k >> 1 (réaction incontrôlée)</li>
</ul>
<h3>III. Fusion nucléaire</h3>
<p>Noyaux légers fusionnent à très haute température :</p>
<p>²₁H + ³₁H → ⁴₂He + n + 17,6 MeV</p>
<ul>
  <li>Nécessite T > 10⁷ K (plasma) pour vaincre la répulsion électrostatique</li>
  <li>Énergie par nucléon libérée > fission (fusion = 3,5 MeV/n vs fission ≈ 0,85 MeV/n)</li>
  <li>Recherche actuelle : ITER (Cadarache) → tokamak</li>
</ul>
<h3>IV. Applications</h3>
<ul>
  <li>Médecine : isotopes radioactifs pour imagerie (⁹⁹mTc) et radiothérapie</li>
  <li>Datation (¹⁴C, U-Pb)</li>
  <li>Énergie électrique : centrales nucléaires (13% de l'électricité mondiale)</li>
</ul>`,
    examples: `<p><strong>Exemple :</strong> ²H + ³H → ⁴He + n. Δm = (2,01410+3,01605)−(4,00260+1,00867) = 0,01888 u. Q=0,01888×931,5≈17,6 MeV. Énergie extraordinaire pour si peu de masse !</p>`,
  },
  // ─── Thème 6 : Chimie générale ────────────────────────────────────────────
  {
    order: 24, series: "D", title: "Leçon 22 : Avancement d'une réaction chimique — tableau d'avancement",
    duration: 50, isPremium: false,
    summary: "Introduire la notion d'avancement d'une réaction chimique, construire le tableau d'avancement et déterminer le réactif limitant.",
    keyPoints: `Avancement x (mol) : mesure la progression de la réaction
Tableau d'avancement : état initial → en cours → état final
Réactif limitant : celui qui est totalement consommé en premier (x_max)
x_max : résoudre n_A − aX = 0 pour chaque réactif A (coefficient a)
Taux d'avancement final : τ = x_f/x_max (τ=1 si réaction totale)
Réaction totale (irréversible) : au moins un réactif entièrement consommé
Réaction limitée (réversible) : équilibre chimique → τ < 1
Bilan de matière : appliquer la stœchiométrie de l'équation`,
    content: `<h2>Avancement d'une Réaction Chimique</h2>
<h3>I. Équation chimique et stœchiométrie</h3>
<p>Pour : aA + bB → cC + dD</p>
<p>Les coefficients a, b, c, d sont les coefficients stœchiométriques. La réaction est équilibrée si les atomes de chaque élément sont conservés.</p>
<h3>II. Avancement x</h3>
<p>L'avancement x (en mol) décrit la progression de la réaction :</p>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Espèce</th><th>A</th><th>B</th><th>C</th><th>D</th></tr>
  <tr><td>État initial (x=0)</td><td>n_A</td><td>n_B</td><td>n_C</td><td>n_D</td></tr>
  <tr><td>En cours</td><td>n_A−ax</td><td>n_B−bx</td><td>n_C+cx</td><td>n_D+dx</td></tr>
  <tr><td>Conditions</td><td>n_A−ax ≥ 0</td><td>n_B−bx ≥ 0</td><td>—</td><td>—</td></tr>
</table>
<h3>III. Avancement maximal et réactif limitant</h3>
<p>x_max = min(n_A/a, n_B/b, …) → le réactif correspondant est le <strong>réactif limitant</strong>.</p>
<p>À l'état final (réaction totale) : x_f = x_max, réactif limitant entièrement consommé.</p>
<h3>IV. Taux d'avancement</h3>
<p>τ = x_f/x_max. Si τ=1 : réaction totale. Si τ<1 : réaction limitée (équilibre).</p>`,
    examples: `<p><strong>Exemple :</strong> N₂ + 3H₂ → 2NH₃. n(N₂)=1 mol, n(H₂)=2 mol.<br>
x_max par N₂ = 1/1 = 1 mol ; x_max par H₂ = 2/3 ≈ 0,667 mol.<br>
x_max = 0,667 mol → H₂ est le réactif limitant. n(NH₃) produit = 2×0,667 ≈ 1,33 mol. N₂ restant = 1−0,667=0,333 mol.</p>`,
  },
  {
    order: 25, series: "D", title: "Leçon 23 : Réactions acido-basiques — pH, indicateurs colorés",
    duration: 55, isPremium: false,
    summary: "Maîtriser les définitions de Brønsted des acides et bases, le calcul du pH pour solutions fortes et faibles, et l'utilisation des indicateurs colorés.",
    keyPoints: `Acide de Brønsted : donne un proton H⁺ ; base : accepte H⁺
Couple acide/base : AH/A⁻ (ex. CH₃COOH/CH₃COO⁻)
Constante d'acidité Ka = [A⁻][H₃O⁺]/[AH] ; pKa = −log Ka
pH = −log[H₃O⁺] ; à 25°C : pH + pOH = 14
Acide fort (Ka→∞) : dissociation totale. pH = −log C_a
Base forte : pOH = −log C_b → pH = 14+log C_b
Acide faible : [H₃O⁺] = √(Ka·C) → pH = ½(pKa − log C)
Solution tampon (demi-neutralisation) : pH = pKa (mélange AH + A⁻ en quantités égales)
Indicateurs colorés : changent de couleur autour de leur pT ≈ pKa_ind`,
    content: `<h2>Réactions Acido-Basiques</h2>
<h3>I. Théorie de Brønsted-Lowry</h3>
<p><strong>Acide :</strong> espèce capable de céder un proton H⁺ (donneur de proton).<br>
<strong>Base :</strong> espèce capable d'accepter un proton H⁺ (accepteur de proton).<br>
<strong>Couple acide/base :</strong> AH ⇌ A⁻ + H⁺</p>
<p>Exemples : CH₃COOH/CH₃COO⁻ (pKa=4,75) ; NH₄⁺/NH₃ (pKa=9,25) ; H₃O⁺/H₂O (pKa=0) ; H₂O/HO⁻ (pKa=14).</p>
<h3>II. pH et constantes d'acidité</h3>
<p>pH = −log[H₃O⁺] ; [H₃O⁺]·[HO⁻] = Ke = 10⁻¹⁴ (à 25°C) → pH + pOH = 14</p>
<p>Ka = [A⁻][H₃O⁺]/[AH] ; pKa = −log Ka</p>
<h3>III. Calcul du pH</h3>
<table border="1" cellpadding="5" style="border-collapse:collapse;width:100%">
  <tr><th>Type</th><th>Formule</th></tr>
  <tr><td>Acide fort (conc. C_a)</td><td>pH = −log C_a</td></tr>
  <tr><td>Base forte (conc. C_b)</td><td>pH = 14 + log C_b</td></tr>
  <tr><td>Acide faible (pKa, C)</td><td>pH ≈ ½(pKa − log C)</td></tr>
  <tr><td>Base faible</td><td>pH ≈ 14 − ½(pKe−pKa−log C)</td></tr>
  <tr><td>Solution tampon</td><td>pH = pKa + log([A⁻]/[AH])</td></tr>
</table>
<h3>IV. Indicateurs colorés</h3>
<p>L'indicateur HIn/In⁻ (pKa_ind) change de couleur autour de pH ≈ pKa_ind ± 1.</p>`,
    examples: `<p><strong>Exemple 1 :</strong> HCl 0,01 mol/L (acide fort). pH=−log(0,01)=2.</p>
<p><strong>Exemple 2 :</strong> CH₃COOH (pKa=4,75), C=0,1 mol/L (acide faible). pH=½(4,75−log0,1)=½(4,75+1)=½×5,75≈2,87.</p>
<p><strong>Exemple 3 :</strong> Tampon acétate : n(CH₃COOH)=n(CH₃COO⁻) → pH=pKa=4,75.</p>`,
  },
  {
    order: 26, series: "D", title: "Leçon 24 : Réactions d'oxydoréduction simples",
    duration: 50, isPremium: false,
    summary: "Identifier les agents oxydants et réducteurs, équilibrer les équations rédox par la méthode des demi-équations, et étudier les piles électrochimiques.",
    keyPoints: `Oxydation : perte d'électrons (OIL : Oxidation Is Loss)
Réduction : gain d'électrons (RIG : Reduction Is Gain)
Couple rédox : Ox/Red (Ex : Fe³⁺/Fe²⁺ ; MnO₄⁻/Mn²⁺ ; Cu²⁺/Cu)
Potentiel standard d'électrode E° (volts, vs. ESH)
Réaction spontanée : Ox le plus fort (E° le plus grand) oxyde Red le plus fort
Demi-équations d'oxydation et de réduction → équation bilan (ajuster e⁻, H⁺, H₂O)
Pile électrochimique : anode (oxydation, −) et cathode (réduction, +) ; f.é.m. = E°_cathode − E°_anode
Nombre d'oxydation (n.o.) : aide à identifier les atomes oxydés ou réduits`,
    content: `<h2>Réactions d'Oxydoréduction</h2>
<h3>I. Définitions</h3>
<ul>
  <li><strong>Oxydant :</strong> capte des électrons (il est réduit) ; Red_Ox → Ox + ne⁻</li>
  <li><strong>Réducteur :</strong> donne des électrons (il est oxydé) ; Red → Ox + ne⁻</li>
  <li><strong>Couple rédox :</strong> Ox/Red (ex. Cu²⁺/Cu, MnO₄⁻/Mn²⁺, Fe³⁺/Fe²⁺)</li>
</ul>
<h3>II. Équilibrage par demi-équations</h3>
<ol>
  <li>Écrire la demi-équation de réduction : Ox + n e⁻ → Red (ajuster O avec H₂O, H avec H⁺)</li>
  <li>Écrire la demi-équation d'oxydation</li>
  <li>Multiplier pour égaliser les électrons échangés</li>
  <li>Additionner les deux demi-équations</li>
</ol>
<h3>III. Potentiel standard et spontanéité</h3>
<p>Plus E°(Ox/Red) est élevé, plus l'oxydant est fort.<br>
La réaction spontanée est celle où l'oxydant le plus fort (E° le plus grand) oxyde le réducteur le plus fort (E° le plus faible).<br>
ΔE° = E°_réducteur − E°_oxydant → si ΔE° < 0 : réaction spontanée (convention chimie).</p>
<h3>IV. Piles électrochimiques</h3>
<ul>
  <li><strong>Anode (−) :</strong> oxydation du réducteur</li>
  <li><strong>Cathode (+) :</strong> réduction de l'oxydant</li>
  <li>f.é.m. = E°(cathode) − E°(anode) > 0 pour pile spontanée</li>
</ul>`,
    examples: `<p><strong>Exemple :</strong> Réaction Fe²⁺ avec MnO₄⁻ (milieu acide).<br>
Réduction : MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O (×1)<br>
Oxydation : Fe²⁺ → Fe³⁺ + e⁻ (×5)<br>
Bilan : MnO₄⁻ + 8H⁺ + 5Fe²⁺ → Mn²⁺ + 4H₂O + 5Fe³⁺</p>`,
  },
  {
    order: 27, series: "D", title: "Leçon 25 : Équilibres chimiques et constante d'équilibre",
    duration: 55, isPremium: false,
    summary: "Étudier les réactions réversibles, la constante d'équilibre K, le quotient réactionnel Q et le principe de Le Chatelier.",
    keyPoints: `Réaction réversible : aA + bB ⇌ cC + dD (double flèche)
Constante d'équilibre : K = [C]ᶜ[D]^d / ([A]ᵃ[B]ᵇ) (sans unité, en concentrations adimensionnées)
Quotient réactionnel Q : même expression que K, mais hors équilibre
Si Q < K : réaction avance dans le sens direct (→) ; si Q > K : sens indirect (←)
Taux d'avancement τ : plus K est grand, plus la réaction est déplacée vers les produits
Principe de Le Chatelier : tout système à l'équilibre perturbé évolue pour s'opposer à la perturbation
Effet de la température : T↑ déplace l'équilibre dans le sens endothermique
Effet de la pression (gaz) : P↑ déplace vers le côté avec moins de moles de gaz`,
    content: `<h2>Équilibres Chimiques</h2>
<h3>I. Réaction réversible et état d'équilibre</h3>
<p>Une réaction est réversible (⇌) quand elle peut se produire dans les deux sens. L'équilibre est atteint quand les vitesses directe et inverse sont égales → les concentrations ne varient plus.</p>
<h3>II. Constante d'équilibre K</h3>
<p>Pour aA + bB ⇌ cC + dD :</p>
<p style="text-align:center">K = [C]^c·[D]^d / ([A]^a·[B]^b)</p>
<p>(concentrations en mol/L divisées par c° = 1 mol/L pour adimensionner)</p>
<ul>
  <li>K >> 1 : équilibre très déplacé vers les produits (réaction quasi-totale)</li>
  <li>K ≈ 1 : mélange équimolaire à l'équilibre</li>
  <li>K << 1 : réaction quasi-inexistante</li>
</ul>
<h3>III. Quotient réactionnel Q</h3>
<p>Q = même expression que K, calculé pour un état quelconque :</p>
<ul>
  <li>Q < K → la réaction avance dans le sens direct (→)</li>
  <li>Q > K → la réaction avance dans le sens inverse (←)</li>
  <li>Q = K → état d'équilibre</li>
</ul>
<h3>IV. Principe de Le Chatelier</h3>
<p>Toute perturbation d'un système à l'équilibre provoque un déplacement de cet équilibre dans le sens qui tend à s'opposer à la perturbation.</p>
<ul>
  <li>Ajout d'un réactif → déplacement vers les produits</li>
  <li>Augmentation de la température → déplacement dans le sens endothermique</li>
  <li>Augmentation de pression (gaz) → déplacement vers le côté avec moins de moles de gaz</li>
</ul>`,
    examples: `<p><strong>Exemple :</strong> N₂(g) + 3H₂(g) ⇌ 2NH₃(g) (synthèse de Haber). ΔH < 0 (exothermique).<br>
Pour maximiser NH₃ : haute pression (4 → 2 moles de gaz), température modérée (compromis vitesse/équilibre). En pratique : 200 atm, 450°C avec catalyseur Fe.</p>`,
  },
  // ─── Thème 7 : Chimie organique ────────────────────────────────────────────
  {
    order: 28, series: "D", title: "Leçon 26 : Généralités sur les composés organiques",
    duration: 50, isPremium: false,
    summary: "Définir les composés organiques, maîtriser les types de liaisons C-C, les chaînes carbonées et les principales fonctions chimiques.",
    keyPoints: `Composé organique : contient du carbone (sauf CO₂, carbonates, etc.)
Carbone tétravalent : 4 liaisons (simple, double, triple)
Chaîne carbonée : linéaire, ramifiée ou cyclique
Groupes fonctionnels : −OH (alcool), −COOH (acide), −CHO (aldéhyde), −C=O (cétone), −NH₂ (amine)
Isomérie : même formule brute, structures différentes (structure, position, fonction, géométrique)
Formules : brute (CₙHₘOₚ) ; développée (toutes les liaisons) ; semi-développée ; topologique
Homologue : série de composés différant de −CH₂− ; propriétés physiques évoluent régulièrement
Nomenclature IUPAC : chaîne principale la plus longue, numéroter depuis l'extrémité la plus proche du substituant`,
    content: `<h2>Généralités sur les Composés Organiques</h2>
<h3>I. Définition et liaisons</h3>
<p>La chimie organique étudie les composés contenant du carbone (C), généralement associé à H, O, N, S, halogènes.</p>
<p><strong>Carbone (valence 4) :</strong></p>
<ul>
  <li>Liaison simple C−C (σ) : tétrahédrique sp³</li>
  <li>Liaison double C=C (σ+π) : planaire sp²</li>
  <li>Liaison triple C≡C (σ+2π) : linéaire sp</li>
</ul>
<h3>II. Chaînes carbonées</h3>
<ul>
  <li><strong>Linéaire (ou normale) :</strong> alcane CH₃−CH₂−…−CH₃</li>
  <li><strong>Ramifiée :</strong> avec des groupes alkyle latéraux</li>
  <li><strong>Cyclique :</strong> cycloalcanes, benzène (aromatiques)</li>
</ul>
<h3>III. Principaux groupes fonctionnels</h3>
<table border="1" cellpadding="5" style="border-collapse:collapse;width:100%">
  <tr><th>Famille</th><th>Groupe</th><th>Exemple</th></tr>
  <tr><td>Alcool</td><td>−OH</td><td>CH₃OH (méthanol)</td></tr>
  <tr><td>Aldéhyde</td><td>−CHO</td><td>HCHO (méthanal)</td></tr>
  <tr><td>Cétone</td><td>C=O (interne)</td><td>CH₃COCH₃ (propanone)</td></tr>
  <tr><td>Acide carboxylique</td><td>−COOH</td><td>CH₃COOH (acide éthanoïque)</td></tr>
  <tr><td>Ester</td><td>−COO−</td><td>CH₃COOC₂H₅</td></tr>
  <tr><td>Amine</td><td>−NH₂</td><td>CH₃NH₂ (méthylamine)</td></tr>
  <tr><td>Halogénoalcane</td><td>−X (F,Cl,Br,I)</td><td>CH₃Cl</td></tr>
</table>
<h3>IV. Isomérie</h3>
<ul>
  <li><strong>Isomérie de chaîne :</strong> chaîne principale différente</li>
  <li><strong>Isomérie de position :</strong> même groupe, position différente</li>
  <li><strong>Isomérie de fonction :</strong> groupes fonctionnels différents (ex. alcool / éther)</li>
  <li><strong>Stéréoisomérie :</strong> même formule plane, arrangement spatial différent</li>
</ul>`,
    examples: `<p><strong>Exemple :</strong> C₄H₁₀ a deux isomères de chaîne : n-butane (CH₃CH₂CH₂CH₃) et isobutane (CH₃CH(CH₃)CH₃). C₃H₈O a 3 isomères de fonction : 1-propanol, 2-propanol (alcools) et éther méthyléthylique.</p>`,
  },
  {
    order: 29, series: "D", title: "Leçon 27 : Hydrocarbures — alcanes, alcènes, alcynes",
    duration: 55, isPremium: false,
    summary: "Étudier les trois familles d'hydrocarbures, leur nomenclature, leurs propriétés physiques et leurs réactions caractéristiques.",
    keyPoints: `Alcanes (CₙH₂ₙ₊₂) : liaisons simples, saturés ; réaction de substitution (halogénation sous UV)
Alcènes (CₙH₂ₙ) : une double liaison C=C ; réaction d'addition (H₂, HX, X₂, H₂O)
Alcynes (CₙH₂ₙ₋₂) : une triple liaison C≡C ; addition × 2
Test des alcènes : décolore le brome (Br₂/CCl₄) et le permanganate dilué (KMnO₄)
Règle de Markovnikov (HX sur alcène non symétrique) : H va sur le C le plus hydrogéné
Hydrogénation catalytique : alcène + H₂ → alcane (catalyseur Ni, Pt, Pd)
Halogénation des alcanes : CH₄ + Cl₂ → CH₃Cl + HCl (radicaux libres, lumière UV)
Points d'ébullition augmentent avec la masse moléculaire ; les isomères ramifiés ont Teb plus bas`,
    content: `<h2>Hydrocarbures — Alcanes, Alcènes, Alcynes</h2>
<h3>I. Alcanes (paraffines)</h3>
<p>Formule générale : CₙH₂ₙ₊₂. Chaîne saturée (que des liaisons simples).</p>
<p>Nomenclature : méthane (C1), éthane (C2), propane (C3), butane (C4), pentane (C5), hexane (C6)…</p>
<p><strong>Réaction caractéristique — substitution radicalaire (halogénation) :</strong><br>
CH₄ + Cl₂ → CH₃Cl + HCl (sous UV ou chaleur)</p>
<p>Mécanisme radicalaire (initiation / propagation / terminaison).</p>
<h3>II. Alcènes (oléfines)</h3>
<p>Formule : CₙH₂ₙ. Contiennent une double liaison C=C.</p>
<p><strong>Réactions d'addition (plus courantes) :</strong></p>
<ul>
  <li>Hydrogénation : R−CH=CH₂ + H₂ → R−CH₂−CH₃ (catalyseur)</li>
  <li>Halogénation : −CH=CH₂ + Br₂ → −CHBr−CH₂Br (décoloration → test)</li>
  <li>Hydrohalogénation (HX) : CH₂=CH₂ + HBr → CH₃−CH₂Br</li>
  <li>Hydratation : alcène + H₂O → alcool (acide catalyseur)</li>
</ul>
<p><strong>Règle de Markovnikov :</strong> lors de l'addition de HX sur un alcène asymétrique, H se fixe sur le carbone le plus riche en H.</p>
<h3>III. Alcynes</h3>
<p>Formule : CₙH₂ₙ₋₂. Contiennent une triple liaison C≡C. Réactions d'addition × 2 (via alcène intermédiaire).</p>
<p>Exemple : HC≡CH + Br₂ → CHBr=CHBr → CHBr₂−CHBr₂</p>`,
    examples: `<p><strong>Exemple 1 (Markovnikov) :</strong> CH₃−CH=CH₂ + HBr → CH₃−CHBr−CH₃ (2-bromopropane, produit majoritaire) et non CH₃−CH₂−CH₂Br.</p>
<p><strong>Exemple 2 (test alcène) :</strong> Un alcène inconnu décolore le dibrome Br₂(CCl₄) → présence d'une double liaison confirmée.</p>`,
  },
  {
    order: 30, series: "D", title: "Leçon 28 : Alcools, dérivés halogénés, aldéhydes, cétones, acides carboxyliques",
    duration: 55, isPremium: false,
    summary: "Étudier les propriétés et réactions des principales familles de composés organiques fonctionnalisés.",
    keyPoints: `Alcools R−OH : primaire (−CH₂OH), secondaire (R−CHOH−R'), tertiaire (R₃C−OH)
Alcools : acidité faible ; réactions avec Na (libère H₂) ; déshydratation (alcène) ; estérification
Aldéhydes R−CHO : réducteurs (test de Tollens → miroir d'argent, test de Fehling)
Cétones R−CO−R' : non réducteurs ; ne donnent pas le test de Tollens
Test de distinction aldéhyde/cétone : réactif de Tollens (aldéhyde seul réduit Ag⁺)
Acide carboxylique R−COOH : acide faible ; estérification (acide + alcool → ester + eau)
Estérification-saponification : réaction équilibrée (τ ≈ 2/3 si proportions stœchiométriques)
Dérivés halogénés R−X : substitution nucléophile (SN) avec OH⁻, CN⁻ ; élimination (HX)`,
    content: `<h2>Familles de Composés Organiques Fonctionnalisés</h2>
<h3>I. Alcools</h3>
<p>Groupe caractéristique : −OH. Classification selon le carbone portant −OH :</p>
<ul>
  <li><strong>1° :</strong> −CH₂OH (ex. éthanol CH₃CH₂OH)</li>
  <li><strong>2° :</strong> >CHOH (ex. propan-2-ol)</li>
  <li><strong>3° :</strong> >C(OH)< (ex. 2-méthylpropan-2-ol)</li>
</ul>
<p>Réactions : avec Na → H₂↑ ; déshydratation → alcène (H₂SO₄, T°) ; oxydation → aldéhyde ou acide.</p>
<h3>II. Aldéhydes et cétones (carbonylés)</h3>
<p><strong>Aldéhyde :</strong> R−CHO. <strong>Cétone :</strong> R−CO−R'.</p>
<p>Distinction : les aldéhydes sont <strong>réducteurs</strong> → test de Tollens (Ag miroir) et Fehling (Cu²⁺ rouge).<br>
Les cétones ne réagissent pas avec ces réactifs.</p>
<h3>III. Acides carboxyliques</h3>
<p>Groupe −COOH. Acides faibles (pKa ≈ 4–5). Propriétés : acidité, estérification.</p>
<p>Estérification : RCOOH + R'OH ⇌ RCOOR' + H₂O (acide cat., équilibre, τ≈2/3)</p>
<h3>IV. Dérivés halogénés</h3>
<p>R−X (X = F, Cl, Br, I). Réactifs :</p>
<ul>
  <li><strong>Substitution nucléophile (SN) :</strong> R−X + OH⁻ → R−OH + X⁻ (alcool)</li>
  <li><strong>Élimination (E2) :</strong> R−X + base forte → alcène + HX</li>
</ul>`,
    examples: `<p><strong>Exemple 1 (Tollens) :</strong> Éthanal (aldéhyde) + Ag(NH₃)₂⁺ → CH₃COOH + Ag (miroir). Propanone (cétone) → pas de réaction.</p>
<p><strong>Exemple 2 (estérification) :</strong> CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ (acétate d'éthyle) + H₂O. τ_eq ≈ 2/3 (66%) à proportions stœchiométriques.</p>`,
  },
  {
    order: 31, series: "D", title: "Leçon 29 : Réactions caractéristiques des familles organiques",
    duration: 55, isPremium: false,
    summary: "Synthétiser les principales réactions en chimie organique : oxydation des alcools, substitution, estérification, saponification et réactions de reconnaissance.",
    keyPoints: `Oxydation des alcools primaires : R−CH₂OH → R−CHO (aldéhyde) → R−COOH (acide)
Oxydation des alcools secondaires : R−CHOH−R' → R−CO−R' (cétone)
Oxydation des alcools tertiaires : pas d'oxydation directe dans les conditions douces
Agents oxydants : KMnO₄, K₂Cr₂O₇/H⁺ (en acidité)
Estérification : RCOOH + HOR' → RCOOR' + H₂O (réaction lente, équilibré, catalyseur acide)
Saponification : RCOOR' + NaOH → RCOONa + R'OH (totale, irréversible — savon)
Substitution nucléophile SN1 (3°) vs SN2 (1°) : mécanismes différents
Tests de reconnaissance : Tollens (aldéhyde), Fehling (aldéhyde), Na/alcool (dégagement H₂), eau de brome (alcène)`,
    content: `<h2>Réactions Caractéristiques des Familles Organiques</h2>
<h3>I. Oxydation des alcools</h3>
<p>Les agents oxydants courants : KMnO₄ (acidifié), K₂Cr₂O₇/H₂SO₄ (dichromate).</p>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Alcool</th><th>Produit d'oxydation ménagée</th><th>Produit d'oxydation totale</th></tr>
  <tr><td>Primaire (1°)</td><td>Aldéhyde (R−CHO)</td><td>Acide carboxylique (R−COOH)</td></tr>
  <tr><td>Secondaire (2°)</td><td>Cétone (R−CO−R')</td><td>Coupure de chaîne (rupture C−C)</td></tr>
  <tr><td>Tertiaire (3°)</td><td>Résistant dans conditions douces</td><td>Coupure seulement en conditions très fortes</td></tr>
</table>
<h3>II. Estérification et saponification</h3>
<p><strong>Estérification :</strong> RCOOH + R'OH ⇌ RCOOR' + H₂O</p>
<ul>
  <li>Lente, équilibrée, exothermique</li>
  <li>Catalyseur : H₂SO₄ concentré (accélère sans déplacer l'équilibre)</li>
  <li>Pour déplacer l'équilibre : excès d'un réactif ou retirer un produit</li>
</ul>
<p><strong>Saponification :</strong> RCOOR' + NaOH → RCOONa + R'OH</p>
<ul>
  <li>Rapide, totale, irréversible (l'ion carboxylate RCOONa ne s'estérifie pas)</li>
  <li>Principe du savon : la tête carboxylate est hydrophile, la chaîne R est hydrophobe</li>
</ul>
<h3>III. Synthèse des tests de reconnaissance</h3>
<table border="1" cellpadding="5" style="border-collapse:collapse;width:100%">
  <tr><th>Réactif</th><th>Résultat positif</th><th>Famille identifiée</th></tr>
  <tr><td>Eau de brome (Br₂/H₂O)</td><td>Décoloration</td><td>Alcène, alcyne</td></tr>
  <tr><td>Réactif de Tollens (Ag(NH₃)₂⁺)</td><td>Dépôt d'argent (miroir)</td><td>Aldéhyde</td></tr>
  <tr><td>Réactif de Fehling (Cu²⁺ bleu)</td><td>Précipité rouge Cu₂O</td><td>Aldéhyde</td></tr>
  <tr><td>Sodium (Na)</td><td>Effervescence H₂</td><td>Alcool, acide carboxylique</td></tr>
  <tr><td>Indicateur pH/papier</td><td>pH acide</td><td>Acide carboxylique</td></tr>
  <tr><td>DNPH (2,4-dinitrophénylhydrazine)</td><td>Précipité jaune/orange</td><td>Aldéhyde ou cétone (carbonylé)</td></tr>
</table>`,
    examples: `<p><strong>Exemple 1 :</strong> Oxydation de l'éthanol (1°) : CH₃CH₂OH → CH₃CHO (éthanal) puis → CH₃COOH (acide éthanoïque). Utilisé dans la vinification (vinaigre).</p>
<p><strong>Exemple 2 :</strong> Fabrication du savon (saponification) : huile (triglycéride) + NaOH → glycérol + savon (carboxylate de sodium).</p>`,
  },
];

const physChimDExercises = [
  // Leçon 1 : Référentiel
  { lo: 3, q: "Quel est le référentiel le plus adapté pour décrire le mouvement d'un satellite artificiel autour de la Terre ?", t: "mcq", d: "medium", o: ["Référentiel terrestre", "Référentiel géocentrique", "Référentiel héliocentrique", "Référentiel lié au satellite"], a: "Référentiel géocentrique", e: "Le référentiel géocentrique (centre = Terre, axes fixes par rapport aux étoiles lointaines) est galilléen pour les durées courtes et adapté à l'étude des satellites. Le référentiel terrestre tourne avec la Terre (non galilléen) ; le référentiel héliocentrique serait inutilement complexe." },
  { lo: 3, q: "La trajectoire d'un mobile dépend du référentiel choisi pour la décrire.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "La trajectoire est l'ensemble des positions successives d'un mobile dans un référentiel donné. La même expérience peut donner des trajectoires différentes selon le référentiel : un passager assis dans un train a une trajectoire droite dans le référentiel du train, mais une trajectoire curviligne dans le référentiel terrestre si le train tourne." },
  { lo: 3, q: "Le vecteur vitesse v⃗ d'un mobile est :", t: "mcq", d: "easy", o: ["La dérivée de l'accélération par rapport au temps", "La dérivée du vecteur position par rapport au temps", "L'intégrale de l'accélération par rapport au déplacement", "La valeur absolue du déplacement"], a: "La dérivée du vecteur position par rapport au temps", e: "v⃗ = d(OM⃗)/dt. Le vecteur vitesse est la dérivée temporelle du vecteur position. Il est tangent à la trajectoire et son module est la vitesse scalaire." },

  // Leçon 2 : MRU et MRUV
  { lo: 4, q: "Un objet en chute libre (sans résistance de l'air) depuis le repos parcourt h = ½gt². Quelle hauteur parcourt-il en 3 s ? (g = 10 m/s²)", t: "mcq", d: "easy", o: ["15 m", "30 m", "45 m", "90 m"], a: "45 m", e: "h = ½×10×3² = ½×10×9 = 45 m. En chute libre depuis le repos, l'objet suit un MRUV avec a=g=10 m/s², v₀=0, donc h=½gt²." },
  { lo: 4, q: "Dans un MRU, le graphe de la vitesse en fonction du temps est une droite horizontale.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "Par définition du MRU, v=constante → le graphe v(t) est une droite horizontale (pente nulle, donc a=0). Le graphe x(t) est, lui, une droite oblique de pente v." },
  { lo: 4, q: "Une voiture accélère de 0 à 100 km/h en 10 s. Quelle est son accélération moyenne (supposée constante) ?", t: "mcq", d: "medium", o: ["2,78 m/s²", "10 m/s²", "100 m/s²", "0,1 m/s²"], a: "2,78 m/s²", e: "v₀=0 ; v_f=100 km/h=100/3,6≈27,78 m/s. a=(v_f−v₀)/t=27,78/10≈2,78 m/s²." },

  // Leçon 3 : Rotation
  { lo: 5, q: "Une roue tourne à 600 tr/min. Quelle est sa vitesse angulaire en rad/s ?", t: "mcq", d: "medium", o: ["10π rad/s", "20π rad/s", "600π rad/s", "2π rad/s"], a: "20π rad/s", e: "ω = 2πn/60 = 2π×600/60 = 2π×10 = 20π ≈ 62,8 rad/s. On convertit d'abord en tours par seconde (600/60=10 tr/s) puis en rad/s (×2π)." },
  { lo: 5, q: "Pour un point M sur un solide en rotation uniforme, l'accélération centripète aₙ est dirigée vers l'axe de rotation.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "L'accélération centripète aₙ = Rω² = v²/R est toujours dirigée vers le centre de rotation (vers l'axe), perpendiculairement à la vitesse. C'est elle qui 'courbe' la trajectoire circulaire. En rotation uniforme, l'accélération tangentielle est nulle, donc a⃗ = aₙ uniquement." },
  { lo: 5, q: "La relation entre vitesse linéaire v et vitesse angulaire ω pour un point à distance R de l'axe est :", t: "mcq", d: "easy", o: ["v = ω/R", "v = R/ω", "v = R·ω", "v = R²·ω"], a: "v = R·ω", e: "v = R·ω. En une seconde, le point M tourne d'un angle ω (radians), ce qui correspond à un arc de longueur R·ω. Donc la distance parcourue par unité de temps est v=Rω." },

  // Leçon 4 : Lois de Newton
  { lo: 6, q: "Un bloc de 10 kg est poussé par une force nette de 30 N. Quelle est son accélération ?", t: "mcq", d: "easy", o: ["300 m/s²", "3 m/s²", "0,33 m/s²", "30 m/s²"], a: "3 m/s²", e: "D'après la 2e loi de Newton : a = ΣF/m = 30/10 = 3 m/s²." },
  { lo: 6, q: "La portée maximale d'un projectile lancé dans le vide est obtenue pour un angle de 45°.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "Portée R = v₀²·sin(2α)/g. R est maximale quand sin(2α)=1, soit 2α=90°, donc α=45°. C'est un résultat classique en balistique, valable en l'absence de résistance de l'air." },
  { lo: 6, q: "Selon la 3e loi de Newton, si un livre pose sur une table, la force exercée par le livre sur la table est :", t: "mcq", d: "medium", o: ["Plus grande que le poids du livre", "Égale et opposée à la force de la table sur le livre", "Nulle car le livre est en équilibre", "Dans le même sens que le poids"], a: "Égale et opposée à la force de la table sur le livre", e: "La 3e loi (action-réaction) : la force du livre sur la table et la force de la table sur le livre sont égales en intensité, opposées en sens, et ont la même droite d'action. Elles s'exercent sur des objets différents donc ne s'annulent pas entre elles." },

  // Leçon 5 : Énergie mécanique
  { lo: 7, q: "Un objet de 2 kg tombe d'une hauteur de 5 m. Quelle est sa vitesse juste avant de toucher le sol (g=10 m/s²) ?", t: "mcq", d: "easy", o: ["5 m/s", "10 m/s", "20 m/s", "50 m/s"], a: "10 m/s", e: "Conservation de l'énergie mécanique : mgh = ½mv² → v = √(2gh) = √(2×10×5) = √100 = 10 m/s." },
  { lo: 7, q: "La puissance d'une force est maximale quand la force est perpendiculaire au déplacement.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Faux", e: "P = F·v·cosθ. Quand θ=90° (force perpendiculaire au déplacement), P=0 (la force ne travaille pas). La puissance est maximale quand θ=0°, c'est-à-dire quand la force est parallèle au déplacement (sens identique). Exemple : la force normale ne travaille jamais." },
  { lo: 7, q: "Le travail de la force de pesanteur lors d'un déplacement de h=3 m vers le bas pour un objet de m=4 kg (g=10 m/s²) est :", t: "mcq", d: "easy", o: ["12 J", "120 J", "−120 J", "1,2 J"], a: "120 J", e: "W(P) = mgh = 4×10×3 = 120 J. Le poids et le déplacement sont dans le même sens (vers le bas) → W > 0 (force motrice). W = F·d·cosθ = mgh×cos(0°) = mgh." },

  // Leçon 6 : Lois d'Ohm
  { lo: 8, q: "Dans un circuit série, deux résistances R₁=30 Ω et R₂=70 Ω. La résistance équivalente est :", t: "mcq", d: "easy", o: ["21 Ω", "100 Ω", "40 Ω", "3 Ω"], a: "100 Ω", e: "En série : R_eq = R₁ + R₂ = 30 + 70 = 100 Ω. En série, les résistances s'additionnent ; le courant est le même dans toutes les résistances." },
  { lo: 8, q: "La loi des nœuds de Kirchhoff est une conséquence de la conservation de la charge électrique.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "La loi des nœuds stipule que la somme des courants entrants = somme des courants sortants en tout nœud. C'est bien une expression de la conservation de la charge : les charges ne s'accumulent pas dans un nœud en régime permanent." },
  { lo: 8, q: "Sous une tension de 12 V, une résistance dissipe une puissance de 6 W. Sa valeur est :", t: "mcq", d: "medium", o: ["2 Ω", "24 Ω", "72 Ω", "0,5 Ω"], a: "24 Ω", e: "P = U²/R → R = U²/P = 144/6 = 24 Ω. On aurait aussi pu calculer I = P/U = 6/12 = 0,5 A, puis R = U/I = 12/0,5 = 24 Ω." },

  // Leçon 7 : Dipôles
  { lo: 9, q: "Un générateur réel de f.é.m. E=10 V et de résistance interne r=2 Ω alimente une charge R=8 Ω. L'intensité du courant est :", t: "mcq", d: "medium", o: ["10 A", "5 A", "1 A", "0,5 A"], a: "1 A", e: "I = E/(R+r) = 10/(8+2) = 10/10 = 1 A. La résistance interne r se met en série avec la charge R, réduisant le courant disponible." },
  { lo: 9, q: "La tension aux bornes d'un générateur réel est toujours inférieure à sa f.é.m. quand il débite du courant.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "U = E − rI. Puisque r > 0 et I > 0, on a toujours U < E quand le générateur débite un courant. La chute de tension interne rI est perdue par effet Joule dans la résistance interne r." },
  { lo: 9, q: "Le rendement d'un générateur est maximum quand :", t: "mcq", d: "medium", o: ["La résistance de charge est nulle (court-circuit)", "La résistance de charge est très grande devant r", "La résistance de charge est égale à r", "Le courant est maximum"], a: "La résistance de charge est très grande devant r", e: "η = R/(R+r). Plus R >> r, plus η → 1 (100%). En court-circuit (R=0), η=0. Pour R=r, η=50% (adaptation d'impédance, mais pas rendement maximal). En pratique, on veut R >> r pour maximiser le rendement." },

  // Leçon 8 : RC
  { lo: 10, q: "La constante de temps d'un circuit RC avec R=5 kΩ et C=200 μF est :", t: "mcq", d: "easy", o: ["1 s", "2,5 s", "40 s", "0,04 s"], a: "1 s", e: "τ = RC = 5×10³ × 200×10⁻⁶ = 5×10³ × 2×10⁻⁴ = 1 s. La constante de temps donne le 'temps caractéristique' du circuit : à t=τ, u_C atteint 63% de sa valeur finale." },
  { lo: 10, q: "Lors de la décharge d'un condensateur, la tension u_C décroît exponentiellement.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "u_C(t) = U₀·e^{−t/τ} lors de la décharge. C'est bien une décroissance exponentielle, solution de l'équation différentielle RC·du_C/dt + u_C = 0." },
  { lo: 10, q: "À t = 5τ lors de la charge d'un condensateur, u_C représente environ :", t: "mcq", d: "easy", o: ["50% de E", "63% de E", "86% de E", "99% de E"], a: "99% de E", e: "u_C(5τ) = E(1−e⁻⁵) = E(1−0,0067) ≈ 0,993E ≈ 99% de E. En pratique, on considère le condensateur comme chargé à partir de t=5τ. À t=τ : 63% ; à t=2τ : 86% ; à t=3τ : 95%." },

  // Leçon 9 : RL
  { lo: 11, q: "Dans un circuit RL (R=100 Ω, L=0,5 H), la constante de temps est :", t: "mcq", d: "easy", o: ["50 s", "5 ms", "5 s", "0,2 s"], a: "5 ms", e: "τ = L/R = 0,5/100 = 5×10⁻³ s = 5 ms. Pour un circuit RL, la constante de temps est L/R (à ne pas confondre avec RC pour le circuit RC)." },
  { lo: 11, q: "Au moment de l'établissement du courant dans une bobine, celle-ci s'oppose à toute augmentation brutale du courant.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "La f.é.m. d'induction de la bobine est e_L = −L·di/dt. Elle s'oppose (loi de Lenz) à toute variation du courant, ce qui ralentit l'établissement. C'est le principe de 'l'inertie électrique' de la bobine." },
  { lo: 11, q: "En régime permanent (très longtemps après la mise en marche), une bobine idéale se comporte comme :", t: "mcq", d: "easy", o: ["Un circuit ouvert", "Un condensateur chargé", "Un fil conducteur (court-circuit)", "Une résistance de valeur L"], a: "Un fil conducteur (court-circuit)", e: "En régime permanent, di/dt = 0 → u_L = L·di/dt = 0. La bobine idéale ne présente aucune chute de tension → se comporte comme un fil conducteur. Le courant permanent est I∞ = E/R (seule R limite le courant)." },

  // Leçon 10 : RLC
  { lo: 12, q: "La pulsation de résonance ω₀ d'un circuit RLC série est :", t: "mcq", d: "easy", o: ["ω₀ = RC", "ω₀ = 1/√(LC)", "ω₀ = √(R/L)", "ω₀ = L/R"], a: "ω₀ = 1/√(LC)", e: "A la résonance, la réactance inductive compense la réactance capacitive : Lω₀ = 1/(Cω₀) → ω₀² = 1/(LC) → ω₀ = 1/√(LC)." },
  { lo: 12, q: "À la résonance d'un circuit RLC série, l'impédance Z est minimale et égale à R.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "Z = √(R²+(Lω−1/(Cω))²). À la résonance, Lω₀ = 1/(Cω₀) → Z = √(R²+0) = R (minimum). Le courant est donc maximal : I = U/R. C'est pour ça qu'on parle de 'résonance en courant'." },
  { lo: 12, q: "Plus le facteur de qualité Q est élevé, plus la bande passante du circuit RLC est :", t: "mcq", d: "medium", o: ["Large", "Étroite (sélectivité élevée)", "Nulle", "Égale à ω₀"], a: "Étroite (sélectivité élevée)", e: "Q = ω₀/Δω → Δω = ω₀/Q. Plus Q est grand, plus Δω (bande passante) est faible → circuit très sélectif (filtre fin). Les circuits à fort Q sont utilisés dans les récepteurs radio pour sélectionner une station précise." },

  // Leçon 11 : Électromagnétisme
  { lo: 13, q: "La force de Laplace sur un conducteur de longueur L=0,5 m portant I=4 A dans un champ B=0,3 T (perpendiculaire) est :", t: "mcq", d: "easy", o: ["0,6 N", "0,06 N", "6 N", "60 N"], a: "0,6 N", e: "F = BIL·sinθ = 0,3×4×0,5×sin90° = 0,3×4×0,5×1 = 0,6 N." },
  { lo: 13, q: "La loi de Lenz stipule que le courant induit s'oppose à la variation du flux qui lui donne naissance.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "C'est exactement l'énoncé de la loi de Lenz : le courant induit crée un champ magnétique qui s'oppose à la variation du flux inducteur. C'est une manifestation du principe de conservation de l'énergie (le courant induit ne peut pas amplifier ce qui le crée)." },
  { lo: 13, q: "Un transformateur idéal a N₁=100 spires au primaire et N₂=500 spires au secondaire. Si U₁=220 V, alors U₂=:", t: "mcq", d: "medium", o: ["44 V", "220 V", "1100 V", "4,4 V"], a: "1100 V", e: "U₂/U₁ = N₂/N₁ → U₂ = 220×500/100 = 1100 V. C'est un transformateur élévateur (N₂>N₁). Par conservation de l'énergie : I₁U₁=I₂U₂ → I₂=I₁/5 (courant réduit)." },

  // Leçon 12 : Ondes mécanique
  { lo: 14, q: "Une onde sonore (v=340 m/s) a une fréquence de 850 Hz. Sa longueur d'onde est :", t: "mcq", d: "easy", o: ["0,4 m", "0,04 m", "4 m", "290 000 m"], a: "0,4 m", e: "λ = v/f = 340/850 = 0,4 m. Relation fondamentale des ondes : v = λ·f → λ = v/f." },
  { lo: 14, q: "Les ondes mécaniques peuvent se propager dans le vide.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Faux", e: "Les ondes mécaniques nécessitent un milieu matériel (solide, liquide ou gaz) pour se propager : elles sont la propagation d'une perturbation de la matière. Seules les ondes électromagnétiques (lumière, radio, etc.) se propagent dans le vide." },
  { lo: 14, q: "Deux points A et B d'une onde sont en phase si la distance AB est :", t: "mcq", d: "medium", o: ["Un multiple impair de λ/2", "Un multiple entier de λ", "Égale à λ/4", "Indépendante de λ"], a: "Un multiple entier de λ", e: "Deux points sont en phase si leur déphasage Δφ = 2πAB/λ = 2kπ (k entier), soit AB = kλ. Ils vibrent exactement de la même façon (même phase à tout instant). Si AB = (2k+1)λ/2, ils sont en opposition de phase." },

  // Leçon 13 : Ondes sonores/lumineuses
  { lo: 15, q: "Le niveau sonore d'un bruit passe de I₀=10⁻¹² W/m² à I=10⁻¹⁰ W/m². Le niveau sonore en dB est :", t: "mcq", d: "medium", o: ["10 dB", "20 dB", "100 dB", "2 dB"], a: "20 dB", e: "L = 10·log(I/I₀) = 10·log(10⁻¹⁰/10⁻¹²) = 10·log(10²) = 10×2 = 20 dB." },
  { lo: 15, q: "La lumière visible est une onde électromagnétique pouvant se propager dans le vide.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "La lumière est une onde électromagnétique (champs E⃗ et B⃗ couplés oscillants). Contrairement aux ondes mécaniques, elle ne nécessite pas de milieu matériel et se propage dans le vide à c = 3×10⁸ m/s. C'est ce qui permet à la lumière du Soleil d'atteindre la Terre à travers l'espace." },
  { lo: 15, q: "La fréquence de la lumière rouge visible est environ :", t: "mcq", d: "medium", o: ["4×10¹⁴ Hz", "4×10⁸ Hz", "340 Hz", "4×10²⁰ Hz"], a: "4×10¹⁴ Hz", e: "λ_rouge ≈ 700 nm = 7×10⁻⁷ m. f = c/λ = 3×10⁸/(7×10⁻⁷) ≈ 4,3×10¹⁴ Hz. Le domaine visible s'étend de 4×10¹⁴ Hz (rouge) à 7,5×10¹⁴ Hz (violet)." },

  // Leçon 14 : Réflexion/réfraction
  { lo: 16, q: "Un rayon lumineux passe de l'eau (n=1,33) vers l'air (n=1) avec un angle d'incidence de 60°. sin(i_réfracté) = :", t: "mcq", d: "medium", o: ["0,578", "1,152", "0,750", "1,330"], a: "1,152", e: "n₁·sin i₁ = n₂·sin i₂ → sin i₂ = 1,33×sin60°/1 = 1,33×0,866 ≈ 1,152. Comme sin i₂ > 1 : impossible → il y a réflexion totale interne (i > angle critique). L'angle critique de l'eau : sin i_c = 1/1,33 ≈ 0,75 → i_c ≈ 48,8°; ici 60° > 48,8°." },
  { lo: 16, q: "La réflexion totale interne se produit quand la lumière passe d'un milieu moins dense vers un milieu plus dense.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Faux", e: "C'est l'inverse : la réflexion totale interne se produit quand la lumière passe d'un milieu PLUS dense (grand n) vers un milieu MOINS dense (petit n), ET si l'angle d'incidence dépasse l'angle critique i_c = arcsin(n₂/n₁). Exemple : verre → air, eau → air." },
  { lo: 16, q: "L'angle critique pour la réflexion totale à l'interface verre (n=1,5) / air est :", t: "mcq", d: "medium", o: ["30°", "41,8°", "45°", "60°"], a: "41,8°", e: "sin i_c = n_air/n_verre = 1/1,5 = 0,667 → i_c = arcsin(0,667) ≈ 41,8°. Pour tout rayon arrivant avec i > 41,8° depuis le verre, il y a réflexion totale. C'est le principe de la fibre optique." },

  // Leçon 15 : Son et signal
  { lo: 17, q: "La valeur efficace d'un signal sinusoïdal d'amplitude U_m = 325 V est :", t: "mcq", d: "medium", o: ["325 V", "230 V", "162,5 V", "460 V"], a: "230 V", e: "U_eff = U_m/√2 = 325/√2 ≈ 325/1,414 ≈ 230 V. C'est la tension du secteur électrique en Côte d'Ivoire (et dans la plupart des pays). U_m ≈ 325 V est la valeur crête." },
  { lo: 17, q: "Le timbre d'un son est lié à sa fréquence fondamentale.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Faux", e: "Le timbre est lié à la composition en harmoniques (la forme du spectre), pas à la fréquence fondamentale. La hauteur (note perçue) est liée à la fréquence fondamentale. Deux instruments jouant la même note (même fréquence) ont des timbres différents parce que leurs spectres harmoniques diffèrent." },
  { lo: 17, q: "La période d'un signal électrique de fréquence 50 Hz est :", t: "mcq", d: "easy", o: ["50 s", "0,02 s", "2 s", "0,5 s"], a: "0,02 s", e: "T = 1/f = 1/50 = 0,02 s = 20 ms. C'est la période du courant alternatif du réseau électrique (50 Hz en Europe et en Afrique de l'Ouest)." },

  // Leçon 16 : Snell-Descartes (optique géométrique)
  { lo: 18, q: "La loi de Snell-Descartes à l'interface entre deux milieux s'écrit :", t: "mcq", d: "easy", o: ["n₁·cos i₁ = n₂·cos i₂", "n₁·sin i₁ = n₂·sin i₂", "n₁/sin i₁ = n₂/sin i₂", "n₁²·sin i₁ = n₂²·sin i₂"], a: "n₁·sin i₁ = n₂·sin i₂", e: "C'est la loi fondamentale de la réfraction (Snell-Descartes). Les angles i₁ et i₂ sont mesurés par rapport à la normale à la surface au point d'incidence. Cette loi permet de calculer l'angle de réfraction connaissant l'angle d'incidence et les indices." },
  { lo: 18, q: "En passant de l'air vers le verre (n=1,5), un rayon lumineux s'approche de la normale.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "n_air < n_verre (1 < 1,5). Par Snell-Descartes : sin i₂ = (n₁/n₂)sin i₁ = sin i₁/1,5 < sin i₁ → i₂ < i₁. Le rayon se rapproche de la normale en entrant dans le milieu plus dense. Inversement, en sortant du verre vers l'air, il s'éloigne de la normale." },
  { lo: 18, q: "La déviation minimale d'un prisme équilatéral (A=60°) de verre (n=1,5) vaut :", t: "mcq", d: "medium", o: ["30°", "37°", "60°", "45°"], a: "37°", e: "Formule : sin((A+D_m)/2) = n·sin(A/2). sin((60°+D_m)/2) = 1,5×sin30° = 1,5×0,5 = 0,75. (60°+D_m)/2 = arcsin(0,75) ≈ 48,6°. D_m ≈ 2×48,6°−60° = 37,2° ≈ 37°." },

  // Leçon 17 : Lentilles
  { lo: 19, q: "Une lentille convergente de vergence 4 δ (dioptries) a une distance focale de :", t: "mcq", d: "easy", o: ["4 m", "25 cm", "40 cm", "0,4 cm"], a: "25 cm", e: "f' = 1/V = 1/4 = 0,25 m = 25 cm. Vergence V (en dioptries) = 1/f' (en mètres). Plus V est grand, plus la lentille est convergente et f' est petite." },
  { lo: 19, q: "Une lentille divergente donne toujours une image virtuelle d'un objet réel.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "Pour une lentille divergente (f' < 0), quelle que soit la position de l'objet réel (OA < 0), la relation 1/OA' = 1/f' + 1/OA donne OA' < 0 → image toujours virtuelle, droite et réduite. C'est pourquoi les lunettes pour myopes (lentilles divergentes) donnent des images plus petites." },
  { lo: 19, q: "Le grandissement algébrique γ = OA'/OA = −2 signifie que l'image est :", t: "mcq", d: "medium", o: ["Droite et agrandie", "Renversée et agrandie (2×)", "Droite et réduite", "Renversée et réduite"], a: "Renversée et agrandie (2×)", e: "γ = −2 : |γ| = 2 → image 2× plus grande que l'objet (agrandie) ; γ < 0 → image renversée (inversée par rapport à l'objet). C'est le cas d'un objet placé entre F et 2F d'une lentille convergente." },

  // Leçon 18 : Instruments optiques
  { lo: 20, q: "Une loupe de focale f'=5 cm. Son grossissement commercial (pour d=25 cm) est :", t: "mcq", d: "easy", o: ["5", "0,2", "25", "125"], a: "5", e: "G = d/f' = 25/5 = 5 (sans unité). La loupe grossit 5 fois l'objet par rapport à l'œil nu à 25 cm." },
  { lo: 20, q: "Dans une lunette astronomique afocale, l'objet est à l'infini et l'image finale est aussi à l'infini.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "La lunette afocale est réglée pour observer des objets à l'infini (étoiles, planètes) en produisant une image finale à l'infini, ce qui est confortable pour l'œil. L'objectif forme une image intermédiaire dans le plan focal de l'oculaire, qui la grossit et la projette à l'infini." },
  { lo: 20, q: "Le grossissement d'une lunette astronomique avec f'_obj=1 m et f'_oc=2,5 cm est :", t: "mcq", d: "medium", o: ["2,5", "25", "40", "400"], a: "40", e: "G = f'_obj/f'_oc = 1/0,025 = 40. La Lune paraît 40 fois plus proche. Pour une bonne lunette d'amateur : f'_obj long (gain sur G) et f'_oc court (augmente G)." },

  // Leçon 19 : Structure noyau
  { lo: 21, q: "Le nucléide ¹⁴₆C (carbone-14) contient :", t: "mcq", d: "easy", o: ["6 protons et 6 neutrons", "14 protons et 6 neutrons", "6 protons et 8 neutrons", "8 protons et 6 neutrons"], a: "6 protons et 8 neutrons", e: "Z=6 → 6 protons. N = A−Z = 14−6 = 8 neutrons. Les isotopes du carbone ont tous Z=6 (ce qui en fait du carbone) mais des nombres de neutrons différents : ¹²C(N=6), ¹³C(N=7), ¹⁴C(N=8)." },
  { lo: 21, q: "Des isotopes d'un même élément ont le même nombre de protons mais des nombres de neutrons différents.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "Par définition, les isotopes sont des nuclides d'un même élément chimique (même Z = même nombre de protons) mais avec des nombres de masse A différents (donc des nombres de neutrons N=A−Z différents). Ils ont les mêmes propriétés chimiques mais des masses et propriétés nucléaires différentes." },
  { lo: 21, q: "La stabilité d'un noyau est maximale pour le nucléide de la courbe d'Aston qui a l'énergie de liaison par nucléon la plus :", t: "mcq", d: "medium", o: ["Faible (noyaux légers)", "Élevée (autour du fer, Fe-56)", "Nulle", "Négative"], a: "Élevée (autour du fer, Fe-56)", e: "L'énergie de liaison par nucléon ε = E_L/A est maximale pour les noyaux de masse intermédiaire, notamment le fer-56 (⁵⁶Fe, ε ≈ 8,8 MeV/nucléon). C'est le noyau le plus stable. Les noyaux très légers et très lourds sont moins stables → fission (noyaux lourds → fragments plus stables) et fusion (noyaux légers → noyaux plus stables)." },

  // Leçon 20 : Radioactivité
  { lo: 22, q: "La désintégration β⁻ transforme un neutron en :", t: "mcq", d: "medium", o: ["Un proton (Z+1)", "Un proton (Z−1)", "Un neutron supplémentaire", "Un noyau d'hélium"], a: "Un proton (Z+1)", e: "Radioactivité β⁻ : n → p + e⁻ + ν̄_e. Un neutron se transforme en proton → Z augmente de 1, A reste constant. Exemple : ¹⁴C → ¹⁴N + e⁻ + ν̄_e." },
  { lo: 22, q: "Après 3 demi-vies, il reste 1/8 de la quantité initiale d'un radionucléide.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "Après n demi-vies : N = N₀/2ⁿ. Après 3 demi-vies : N = N₀/2³ = N₀/8. Vrai. (Après 1 : N₀/2=50% ; après 2 : N₀/4=25% ; après 3 : N₀/8=12,5%.)" },
  { lo: 22, q: "L'activité d'un échantillon radioactif est exprimée en :", t: "mcq", d: "easy", o: ["Gray (Gy)", "Sievert (Sv)", "Becquerel (Bq)", "Tesla (T)"], a: "Becquerel (Bq)", e: "L'activité A = λN est le nombre de désintégrations par seconde. Elle s'exprime en becquerels (Bq) : 1 Bq = 1 désintégration par seconde. Le gray (Gy) mesure la dose absorbée (J/kg) et le sievert (Sv) la dose équivalente (effets biologiques)." },

  // Leçon 21 : Fission/fusion
  { lo: 23, q: "La fission de l'²³⁵U libère environ :", t: "mcq", d: "easy", o: ["1 eV", "1 MeV", "200 MeV", "1 GeV"], a: "200 MeV", e: "Une fission de l'²³⁵U libère en moyenne ≈200 MeV par noyau fissuré. C'est considérable : à titre de comparaison, la combustion d'un atome de carbone ne libère que quelques eV, soit ~10 millions de fois moins." },
  { lo: 23, q: "La réaction de fusion D+T→He+n produit plus d'énergie par nucléon que la fission de l'uranium.", t: "true_false", d: "medium", o: ["Vrai", "Faux"], a: "Vrai", e: "Fusion D+T : 17,6 MeV pour 5 nucléons → 3,5 MeV/nucléon. Fission ²³⁵U : ~200 MeV pour 236 nucléons → ~0,85 MeV/nucléon. La fusion libère bien plus d'énergie par nucléon. Mais elle nécessite des températures extrêmes (plasma à 100 millions de degrés), d'où la difficulté de la fusion contrôlée." },
  { lo: 23, q: "Dans une centrale nucléaire, l'énergie est extraite par :", t: "mcq", d: "easy", o: ["Fusion de l'uranium", "Fission contrôlée de l'uranium ou du plutonium", "Combustion de l'uranium", "Radioactivité gamma directe"], a: "Fission contrôlée de l'uranium ou du plutonium", e: "Les centrales nucléaires actuelles utilisent la fission contrôlée de ²³⁵U ou ²³⁹Pu dans un réacteur (facteur de multiplication k=1 maintenu par les barres de contrôle). La chaleur produite transforme l'eau en vapeur qui entraîne une turbine couplée à un alternateur." },

  // Leçon 22 : Avancement
  { lo: 24, q: "Dans la réaction 2H₂ + O₂ → 2H₂O, avec n(H₂)=4 mol et n(O₂)=1 mol, le réactif limitant est :", t: "mcq", d: "medium", o: ["H₂", "O₂", "H₂O", "Aucun des deux"], a: "O₂", e: "x_max(H₂) = 4/2 = 2 mol ; x_max(O₂) = 1/1 = 1 mol. x_max = min(2,1) = 1 mol → O₂ est le réactif limitant. À x_max=1 : H₂ consommé = 2×1=2 mol (reste 2 mol) ; O₂ consommé = 1 mol (reste 0) ; H₂O produit = 2×1=2 mol." },
  { lo: 24, q: "Le taux d'avancement τ = 1 correspond à une réaction chimique totale (irréversible).", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "τ = x_f/x_max. Si τ=1 (ou 100%), la réaction est totale : au moins un réactif est entièrement consommé (réactif limitant épuisé). Si τ<1, c'est une réaction limitée qui atteint un équilibre avant la consommation totale du réactif limitant." },
  { lo: 24, q: "Pour la réaction CH₄ + 2O₂ → CO₂ + 2H₂O, si l'avancement est x=0,5 mol, la quantité de H₂O produite est :", t: "mcq", d: "easy", o: ["0,5 mol", "1 mol", "2 mol", "0,25 mol"], a: "1 mol", e: "Le coefficient stœchiométrique de H₂O est 2. Quantité produite = 2×x = 2×0,5 = 1 mol. En général : n_produit = coefficient_stœchio × x." },

  // Leçon 23 : Acide-base
  { lo: 25, q: "Le pH d'une solution d'acide chlorhydrique HCl à 0,01 mol/L est :", t: "mcq", d: "easy", o: ["1", "2", "7", "12"], a: "2", e: "HCl est un acide fort (dissociation totale) : [H₃O⁺] = C_a = 0,01 mol/L. pH = −log(0,01) = −log(10⁻²) = 2." },
  { lo: 25, q: "Une solution tampon résiste aux changements de pH lors d'ajout de petites quantités d'acide ou de base.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "Une solution tampon (mélange acide faible + base conjuguée en proportions comparables) résiste aux variations de pH. Elle est utilisée en biologie (sang pH≈7,4 tamponné par H₂CO₃/HCO₃⁻) et en chimie analytique." },
  { lo: 25, q: "Le pKa du couple CH₃COOH/CH₃COO⁻ est 4,75. Pour une solution d'acide acétique à 0,1 mol/L, le pH est environ :", t: "mcq", d: "medium", o: ["4,75", "2,87", "7", "1"], a: "2,87", e: "Pour un acide faible : pH ≈ ½(pKa − log C) = ½(4,75 − log0,1) = ½(4,75+1) = ½×5,75 = 2,875 ≈ 2,87." },

  // Leçon 24 : Oxydoréduction
  { lo: 26, q: "Dans la réaction Zn + Cu²⁺ → Zn²⁺ + Cu, l'espèce oxydée est :", t: "mcq", d: "easy", o: ["Cu²⁺", "Zn²⁺", "Zn", "Cu"], a: "Zn", e: "Zn perd 2 électrons (Zn → Zn²⁺ + 2e⁻) → Zn est oxydé (OIL : Oxidation Is Loss). Cu²⁺ gagne 2 électrons → Cu²⁺ est réduit (RIG : Reduction Is Gain). Le zinc est le réducteur ; Cu²⁺ est l'oxydant." },
  { lo: 26, q: "Dans une pile électrochimique, l'oxydation a lieu à l'anode (électrode négative).", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "Convention : anode = lieu de l'oxydation (pôle −) ; cathode = lieu de la réduction (pôle +). Mnémotechnique : 'OILANCAT' (Oxidation Is Loss At aNode, Cathode Accepts electrons). Le courant conventionnel sort de l'anode dans le circuit extérieur." },
  { lo: 26, q: "Pour équilibrer une réaction d'oxydoréduction, on utilise la méthode des :", t: "mcq", d: "easy", o: ["Tableaux d'avancement", "Demi-équations électroniques", "Lois de Kirchhoff", "Constantes d'équilibre"], a: "Demi-équations électroniques", e: "La méthode des demi-équations : (1) écrire la demi-équation de réduction (Ox + ne⁻ → Red, équilibrée avec H⁺ et H₂O en milieu acide), (2) écrire la demi-équation d'oxydation, (3) multiplier pour égaliser les électrons, (4) additionner." },

  // Leçon 25 : Équilibres chimiques
  { lo: 27, q: "Pour la réaction N₂ + 3H₂ ⇌ 2NH₃, la constante d'équilibre K s'écrit :", t: "mcq", d: "medium", o: ["K = [NH₃]²/([N₂][H₂]³)", "K = [N₂][H₂]³/[NH₃]²", "K = [NH₃]/([N₂]+[H₂])", "K = 2[NH₃]/(1·[N₂]+3·[H₂])"], a: "K = [NH₃]²/([N₂][H₂]³)", e: "K = [produits]^(coefficients) / [réactifs]^(coefficients) = [NH₃]²/([N₂]¹·[H₂]³). Les concentrations sont adimensionnées (divisées par 1 mol/L)." },
  { lo: 27, q: "Augmenter la pression dans un système gazeux à l'équilibre déplace cet équilibre vers le côté ayant moins de moles de gaz.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "Principe de Le Chatelier : augmenter la pression revient à comprimer le système → il réagit en diminuant le nombre de moles de gaz (pour 'absorber' la compression). Exemple : N₂+3H₂⇌2NH₃ (4 moles→2 moles de gaz) → haute pression favorise la formation de NH₃." },
  { lo: 27, q: "Si le quotient réactionnel Q est supérieur à la constante d'équilibre K, la réaction évolue dans le sens :", t: "mcq", d: "medium", o: ["Sens direct (→)", "Sens inverse (←)", "Elle est déjà à l'équilibre", "Elle ne peut pas évoluer"], a: "Sens inverse (←)", e: "Si Q > K : il y a trop de produits par rapport à l'équilibre → la réaction recule (sens inverse, ←) pour diminuer Q jusqu'à ce que Q = K. Si Q < K : la réaction avance (→). Si Q = K : équilibre atteint." },

  // Leçon 26 : Composés organiques
  { lo: 28, q: "Un atome de carbone peut former au maximum combien de liaisons covalentes ?", t: "mcq", d: "easy", o: ["2", "4", "6", "1"], a: "4", e: "Le carbone a 4 électrons de valence et est tétravalent : il forme toujours 4 liaisons covalentes (simples, doubles ou triples). C'est cette tétravalence qui permet la diversité infinie des composés organiques (chaînes, cycles, fonctions variées)." },
  { lo: 28, q: "Deux composés ayant la même formule brute mais des structures différentes sont des isomères.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "L'isomérie est le phénomène par lequel plusieurs composés différents ont la même formule brute (même composition) mais des structures (enchaînements d'atomes) différentes. Exemple : C₂H₆O peut être l'éthanol (CH₃CH₂OH) ou le diméthyléther (CH₃−O−CH₃)." },
  { lo: 28, q: "Le groupe fonctionnel −COOH caractérise la famille des :", t: "mcq", d: "easy", o: ["Alcools", "Aldéhydes", "Acides carboxyliques", "Esters"], a: "Acides carboxyliques", e: "Le groupe carboxyle −COOH (aussi noté −C(=O)OH) est le groupe caractéristique des acides carboxyliques. Exemples : HCOOH (acide méthanoïque / formique), CH₃COOH (acide éthanoïque / acétique), C₁₇H₃₅COOH (acide stéarique)." },

  // Leçon 27 : Hydrocarbures
  { lo: 29, q: "La réaction caractéristique des alcènes est :", t: "mcq", d: "easy", o: ["La substitution radicalaire", "L'addition électrophile", "L'estérification", "La saponification"], a: "L'addition électrophile", e: "Les alcènes réagissent principalement par addition électrophile sur la double liaison C=C. Exemples : addition de H₂ (hydrogénation), Br₂ (bromation), HX (hydrohalogénation), H₂O (hydratation). Les alcanes (saturés) réagissent eux par substitution radicalaire." },
  { lo: 29, q: "Le test permettant de distinguer un alcène d'un alcane est l'action du dibrome Br₂.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "En présence d'un alcène, le dibrome (solution orangée) se décolore rapidement par addition : R−CH=CH₂ + Br₂ → R−CHBr−CH₂Br (incolore). Un alcane ne réagit pas avec Br₂ sans lumière UV (pas de décoloration). C'est un test simple et efficace." },
  { lo: 29, q: "La formule générale des alcanes est :", t: "mcq", d: "easy", o: ["CₙH₂ₙ", "CₙH₂ₙ₋₂", "CₙH₂ₙ₊₂", "CₙH₂ₙ₊₁OH"], a: "CₙH₂ₙ₊₂", e: "Les alcanes sont des hydrocarbures saturés (uniquement des liaisons C−C simples) de formule générale CₙH₂ₙ₊₂. Exemples : CH₄ (méthane, n=1), C₂H₆ (éthane, n=2), C₃H₈ (propane, n=3). Les alcènes (CₙH₂ₙ) ont une double liaison, les alcynes (CₙH₂ₙ₋₂) une triple." },

  // Leçon 28 : Familles organiques
  { lo: 30, q: "Un alcool est dit primaire lorsque :", t: "mcq", d: "easy", o: ["Le groupe −OH est sur un carbone portant 3 autres carbones", "Le groupe −OH est sur un carbone portant 2 autres carbones", "Le groupe −OH est sur un carbone portant 1 autre carbone ou à l'extrémité de chaîne (CH₂OH)", "Le groupe −OH est sur un carbone benzénique"], a: "Le groupe −OH est sur un carbone portant 1 autre carbone ou à l'extrémité de chaîne (CH₂OH)", e: "Alcool primaire : groupe −OH sur un carbone relié à 1 seul autre carbone (−CH₂OH) ; alcool secondaire : −CHOH− (2 C voisins) ; alcool tertiaire : −C(OH)− (3 C voisins). Cette distinction est cruciale pour les réactions d'oxydation (1° → aldéhyde ; 2° → cétone ; 3° → résistant)." },
  { lo: 30, q: "Les aldéhydes peuvent être oxydés en acides carboxyliques, mais les cétones résistent à l'oxydation ménagée.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "Les aldéhydes (R−CHO) portent un H sur le carbone carbonylé → facilement oxydés en acides (R−COOH). Les cétones (R−CO−R') n'ont pas cet H → résistent à l'oxydation ménagée. C'est pourquoi le réactif de Tollens distingue les deux : il oxyde les aldéhydes, pas les cétones." },
  { lo: 30, q: "L'estérification est une réaction totale et irréversible.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Faux", e: "L'estérification (RCOOH + R'OH ⇌ RCOOR' + H₂O) est une réaction LENTE, ÉQUILIBRÉE et ATHERMIQUE. C'est la saponification (RCOOR' + NaOH → RCOONa + R'OH) qui est totale et irréversible. Le taux d'avancement de l'estérification à l'équilibre est ≈ 2/3 pour des proportions stœchiométriques." },

  // Leçon 29 : Réactions organiques
  { lo: 31, q: "L'oxydation ménagée d'un alcool secondaire donne :", t: "mcq", d: "easy", o: ["Un alcène", "Un aldéhyde", "Une cétone", "Un acide carboxylique"], a: "Une cétone", e: "Oxydation d'un alcool secondaire (R−CHOH−R') → cétone (R−CO−R'). L'oxydation d'un alcool primaire donne d'abord un aldéhyde (R−CHO) puis (si poursuivie) un acide carboxylique (R−COOH). Un alcool tertiaire résiste à l'oxydation ménagée." },
  { lo: 31, q: "La saponification est la réaction d'un ester avec une base forte (NaOH), donnant un sel de carboxylate et un alcool.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "Saponification : RCOOR' + NaOH → RCOONa (savon) + R'OH. Contrairement à l'estérification, c'est une réaction totale et irréversible car le carboxylate RCOONa (base forte) ne peut pas se ré-estérifier. C'est le principe de fabrication des savons à partir de corps gras (triglycérides)." },
  { lo: 31, q: "Le réactif de Tollens (liqueur argentique) permet de distinguer :", t: "mcq", d: "easy", o: ["Les alcools primaires des alcools secondaires", "Les alcènes des alcanes", "Les aldéhydes des cétones", "Les acides des esters"], a: "Les aldéhydes des cétones", e: "Le réactif de Tollens [Ag(NH₃)₂]OH est réduit par les aldéhydes (qui sont eux-mêmes oxydés) → dépôt d'argent métallique (miroir). Les cétones ne réagissent pas. Même chose pour le réactif de Fehling (Cu²⁺ → Cu₂O rouge) : positif avec les aldéhydes, négatif avec les cétones." },
];

export async function seedPhysChimDLessons(): Promise<void> {
  const [{ lessonCount }] = await db
    .select({ lessonCount: count() })
    .from(lessonsTable)
    .where(
      and(
        eq(lessonsTable.subjectId, PC_D_SUBJECT_ID),
        gte(lessonsTable.order, SEED_MARKER_ORDER_START)
      )
    );

  if (lessonCount >= TOTAL_LESSONS) {
    logger.info("Physique-Chimie D seed lessons already present — skipping");
    return;
  }

  logger.info("Seeding Physique-Chimie D lessons and exercises …");

  for (const lesson of physChimDLessons) {
    const existing = await db.execute(
      `SELECT id FROM lessons WHERE subject_id = ${PC_D_SUBJECT_ID} AND "order" = ${lesson.order} AND series = 'D' LIMIT 1`
    );
    if (existing.rows.length > 0) continue;

    const [inserted] = await db
      .insert(lessonsTable)
      .values({
        subjectId: lesson.subjectId ?? PC_D_SUBJECT_ID,
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

    const exercises = physChimDExercises.filter(e => e.lo === lesson.order);
    for (const ex of exercises) {
      await db.insert(exercisesTable).values({
        lessonId: inserted.id,
        subjectId: PC_D_SUBJECT_ID,
        series: "D",
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

  logger.info("Physique-Chimie D lessons and exercises seeded successfully");
}
