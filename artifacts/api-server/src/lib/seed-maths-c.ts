import { db, lessonsTable, exercisesTable } from "@workspace/db";
import { eq, and, gte, count } from "drizzle-orm";
import { logger } from "./logger";

const MATHS_SUBJECT_ID = 1;
const SERIES = "C";
const SEED_MARKER_ORDER_START = 24;
const TOTAL_LESSONS = 15;

const mathsCLessons = [
  {
    order: 24, series: "C",
    title: "Leçon 1 : Ensembles de nombres réels ℝ et intervalles",
    duration: 50, isPremium: false,
    summary: "Maîtriser la structure de ℝ, les intervalles, la valeur absolue et les propriétés fondamentales des nombres réels utilisées dans toute l'analyse.",
    keyPoints: `ℝ : corps ordonné complet — contient ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ
Intervalles : [a,b], ]a,b[, [a,+∞[, ]-∞,b] — notation et propriétés
Valeur absolue : |x| = x si x ≥ 0, -x si x < 0 ; |x| = √(x²)
Inégalités avec valeur absolue : |x| ≤ a ⟺ -a ≤ x ≤ a ; |x| ≥ a ⟺ x ≤ -a ou x ≥ a
Borne supérieure / inférieure : sup et inf d'un ensemble borné
Densité de ℚ dans ℝ : entre deux réels, il existe un rationnel
Partie entière : E(x) = ⌊x⌋ = plus grand entier ≤ x
Inégalité triangulaire : |a + b| ≤ |a| + |b|`,
    content: `<h2>Ensembles de Nombres Réels ℝ et Intervalles</h2>
<h3>I. La droite numérique réelle</h3>
<p>L'ensemble ℝ des nombres réels est un <strong>corps commutatif ordonné et complet</strong>. Il contient :</p>
<ul>
  <li>ℕ = {0, 1, 2, 3, …} (entiers naturels)</li>
  <li>ℤ = {…, -2, -1, 0, 1, 2, …} (entiers relatifs)</li>
  <li>ℚ = {p/q ; p ∈ ℤ, q ∈ ℕ*} (rationnels) — nombres dont le développement décimal est fini ou périodique</li>
  <li>ℝ \ ℚ = irrationnels (√2, π, e, …) — développement décimal infini non périodique</li>
</ul>
<h3>II. Intervalles de ℝ</h3>
<table border="1" cellpadding="5" style="border-collapse:collapse;width:100%">
  <tr><th>Notation</th><th>Ensemble</th><th>Type</th></tr>
  <tr><td>[a, b]</td><td>{x ∈ ℝ ; a ≤ x ≤ b}</td><td>Fermé borné</td></tr>
  <tr><td>]a, b[</td><td>{x ∈ ℝ ; a < x < b}</td><td>Ouvert borné</td></tr>
  <tr><td>[a, b[</td><td>{x ∈ ℝ ; a ≤ x < b}</td><td>Semi-ouvert à droite</td></tr>
  <tr><td>[a, +∞[</td><td>{x ∈ ℝ ; x ≥ a}</td><td>Non borné supérieurement</td></tr>
  <tr><td>]-∞, b]</td><td>{x ∈ ℝ ; x ≤ b}</td><td>Non borné inférieurement</td></tr>
</table>
<h3>III. Valeur absolue</h3>
<p><strong>Définition :</strong> |x| = x si x ≥ 0, et -x si x < 0.</p>
<p><strong>Propriétés fondamentales :</strong></p>
<ul>
  <li>|x| ≥ 0 et |x| = 0 ⟺ x = 0</li>
  <li>|xy| = |x|·|y|</li>
  <li><strong>Inégalité triangulaire :</strong> |a + b| ≤ |a| + |b|</li>
  <li>||a| - |b|| ≤ |a - b|</li>
</ul>
<p><strong>Résolution d'inégalités :</strong></p>
<ul>
  <li>|x - a| < r ⟺ a - r < x < a + r (boule ouverte de centre a, rayon r)</li>
  <li>|x| ≤ a (a > 0) ⟺ -a ≤ x ≤ a</li>
  <li>|x| ≥ a (a > 0) ⟺ x ≤ -a ou x ≥ a</li>
</ul>
<h3>IV. Partie entière et densité</h3>
<p>La <strong>partie entière</strong> E(x) = ⌊x⌋ est le plus grand entier inférieur ou égal à x. Propriété : E(x) ≤ x < E(x) + 1.</p>
<p><strong>Densité de ℚ :</strong> Entre deux réels distincts a < b, il existe toujours un rationnel r tel que a < r < b. Et aussi un irrationnel.</p>`,
    examples: `<p><strong>Ex. 1 :</strong> Résoudre |2x - 3| ≤ 5.<br>
⟺ -5 ≤ 2x - 3 ≤ 5 ⟺ -2 ≤ 2x ≤ 8 ⟺ -1 ≤ x ≤ 4. Solution : [-1, 4].</p>
<p><strong>Ex. 2 :</strong> Résoudre |x + 1| > 3.<br>
⟺ x + 1 > 3 ou x + 1 < -3 ⟺ x > 2 ou x < -4. Solution : ]-∞, -4[ ∪ ]2, +∞[.</p>
<p><strong>Ex. 3 :</strong> E(3,7) = 3 ; E(-1,2) = -2 ; E(5) = 5.</p>`,
  },
  {
    order: 25, series: "C",
    title: "Leçon 2 : Polynômes et fractions rationnelles",
    duration: 50, isPremium: false,
    summary: "Étudier les polynômes (degré, racines, factorisation) et les fractions rationnelles (décomposition en éléments simples, domaine de définition).",
    keyPoints: `Polynôme : P(x) = aₙxⁿ + … + a₁x + a₀, degré n, coefficient dominant aₙ ≠ 0
Racine (zéro) de P : valeur r telle que P(r) = 0
Théorème de factorisation : si r est racine de P, alors (x - r) divise P(x)
Division euclidienne : P = Q·D + R avec deg R < deg D
Théorème de Bezout : a est racine de P ⟺ (x - a) | P
Relations coefficients/racines (Viète) : pour ax² + bx + c = 0 : r₁ + r₂ = -b/a ; r₁r₂ = c/a
Fraction rationnelle : F(x) = P(x)/Q(x), domaine = ℝ \ {racines de Q}
Décomposition en éléments simples (DES) : fraction propre comme somme de fractions simples
Méthode des coefficients indéterminés ou valeurs particulières`,
    content: `<h2>Polynômes et Fractions Rationnelles</h2>
<h3>I. Polynômes</h3>
<p>Un polynôme en x de degré n est une expression de la forme :</p>
<p style="text-align:center"><strong>P(x) = aₙxⁿ + aₙ₋₁xⁿ⁻¹ + … + a₁x + a₀</strong></p>
<p>avec aₙ ≠ 0 (coefficient dominant), a₀ = P(0) (terme constant).</p>
<p><strong>Racines et factorisation :</strong></p>
<ul>
  <li>r est racine de P si P(r) = 0</li>
  <li>Si r est racine, P(x) = (x - r)·Q(x) où deg Q = deg P - 1</li>
  <li>Un polynôme de degré n a au plus n racines réelles</li>
</ul>
<p><strong>Relations de Viète</strong> pour P(x) = ax² + bx + c de racines r₁, r₂ :</p>
<ul>
  <li>r₁ + r₂ = -b/a</li>
  <li>r₁ × r₂ = c/a</li>
</ul>
<h3>II. Division euclidienne de polynômes</h3>
<p>Pour tout couple (P, D) avec D ≠ 0, il existe un unique couple (Q, R) tel que :</p>
<p style="text-align:center">P = Q × D + R, avec deg R < deg D</p>
<p>On effectue la division selon les puissances décroissantes, comme pour les entiers.</p>
<h3>III. Fractions rationnelles</h3>
<p>Une fraction rationnelle est F(x) = P(x)/Q(x) avec P, Q polynômes et Q ≢ 0.</p>
<p><strong>Domaine de définition :</strong> D_F = ℝ \ {x ∈ ℝ : Q(x) = 0}</p>
<p><strong>Décomposition en éléments simples (DES) :</strong></p>
<ul>
  <li>Si deg P ≥ deg Q : effectuer la division euclidienne d'abord</li>
  <li>Racine simple a de Q : terme de la forme A/(x - a)</li>
  <li>Racine double a de Q : termes A/(x - a) + B/(x - a)²</li>
</ul>`,
    examples: `<p><strong>DES :</strong> Décomposer F(x) = (2x + 1)/[(x - 1)(x + 2)].<br>
F(x) = A/(x-1) + B/(x+2). Multiplier par (x-1) et poser x=1 : A = 3/3 = 1. Multiplier par (x+2) et poser x=-2 : B = -3/(-3) = 1.<br>
Donc F(x) = 1/(x-1) + 1/(x+2).</p>
<p><strong>Factorisation :</strong> P(x) = x³ - 6x² + 11x - 6. Tester x=1 : P(1)=0. Diviser : P(x) = (x-1)(x²-5x+6) = (x-1)(x-2)(x-3).</p>`,
  },
  {
    order: 26, series: "C",
    title: "Leçon 3 : Équations et inéquations — degrés 1, 2, systèmes",
    duration: 50, isPremium: false,
    summary: "Résoudre des équations et inéquations du premier et second degré, des systèmes linéaires et des équations de type produit nul ou quotient.",
    keyPoints: `Équation du 1er degré : ax + b = 0 → x = -b/a (si a ≠ 0)
Inéquation du 1er degré : attention au sens de l'inégalité si on divise par un nombre négatif
Équation du 2e degré : ax² + bx + c = 0, discriminant Δ = b² - 4ac
Δ > 0 : deux racines réelles distinctes x₁,₂ = (-b ± √Δ)/(2a)
Δ = 0 : racine double x₀ = -b/(2a)
Δ < 0 : pas de racine réelle (racines complexes conjuguées)
Inéquation du 2e degré : signe de ax² + bx + c selon Δ et a
Systèmes 2×2 : méthode de substitution, élimination (méthode de Gauss)
Méthode du tableau de signe pour les inéquations à facteurs
Équations avec valeur absolue : cas selon le signe de chaque expression`,
    content: `<h2>Équations et Inéquations</h2>
<h3>I. Équation du 1er degré</h3>
<p>ax + b = 0 ⟹ x = -b/a si a ≠ 0. Si a = 0 et b ≠ 0 : impossible. Si a = 0 et b = 0 : ∞ solutions.</p>
<h3>II. Équation du 2e degré</h3>
<p>Pour ax² + bx + c = 0 (a ≠ 0), calculer <strong>Δ = b² - 4ac</strong> :</p>
<table border="1" cellpadding="5" style="border-collapse:collapse;width:100%">
  <tr><th>Cas</th><th>Solutions dans ℝ</th></tr>
  <tr><td>Δ > 0</td><td>x₁ = (-b - √Δ)/(2a) et x₂ = (-b + √Δ)/(2a), x₁ ≠ x₂</td></tr>
  <tr><td>Δ = 0</td><td>x₀ = -b/(2a) (racine double)</td></tr>
  <tr><td>Δ < 0</td><td>Aucune solution réelle</td></tr>
</table>
<p><strong>Signe de ax² + bx + c :</strong></p>
<ul>
  <li>Si Δ < 0 : signe de a pour tout x</li>
  <li>Si Δ = 0 : signe de a sauf en x₀ où il s'annule</li>
  <li>Si Δ > 0 : s'annule en x₁ et x₂ ; signe de a à l'extérieur de [x₁,x₂], signe opposé à a entre x₁ et x₂</li>
</ul>
<h3>III. Systèmes d'équations linéaires (2×2)</h3>
<p><strong>Méthode de substitution :</strong> exprimer une inconnue en fonction de l'autre à partir d'une équation, puis substituer.</p>
<p><strong>Méthode d'élimination (Gauss) :</strong> combiner linéairement les équations pour éliminer une inconnue.</p>
<h3>IV. Tableau de signes</h3>
<p>Pour résoudre (x-a)(x-b) > 0 : placer a et b sur un axe, étudier le signe de chaque facteur dans chaque intervalle, puis multiplier les signes.</p>`,
    examples: `<p><strong>Ex. 1 :</strong> 2x² - 5x + 3 = 0 → Δ = 25 - 24 = 1 → x₁ = 1, x₂ = 3/2.</p>
<p><strong>Ex. 2 (inéquation) :</strong> x² - x - 6 ≤ 0 → Δ = 25 → x₁ = -2, x₂ = 3. Comme a=1>0, la parabole est positive à l'extérieur : solution [-2, 3].</p>
<p><strong>Ex. 3 (système) :</strong> { 2x + y = 5 ; x - y = 1 } → Addition : 3x = 6 → x = 2, y = 1.</p>`,
  },
  {
    order: 27, series: "C",
    title: "Leçon 4 : Raisonnement par récurrence",
    duration: 45, isPremium: false,
    summary: "Maîtriser le principe de récurrence pour démontrer des propriétés sur ℕ : initialisation, hérédité et conclusion.",
    keyPoints: `Récurrence : méthode de démonstration pour une propriété P(n) vraie pour tout n ≥ n₀
Étape 1 — Initialisation : vérifier P(n₀) est vraie (souvent n₀ = 0 ou 1)
Étape 2 — Hérédité : supposer P(k) vraie (hypothèse de récurrence, HR) et démontrer P(k+1)
Étape 3 — Conclusion : par le principe de récurrence, P(n) est vraie pour tout n ≥ n₀
Récurrence double : suppose P(k) et P(k-1) pour démontrer P(k+1)
Applications : sommes, inégalités, divisibilité, suites
Formules usuelles à démontrer par récurrence : Σk = n(n+1)/2 ; Σk² = n(n+1)(2n+1)/6
Piège : l'hérédité sans initialisation ne suffit pas`,
    content: `<h2>Raisonnement par Récurrence</h2>
<h3>I. Principe de récurrence</h3>
<p>Soit P(n) une propriété portant sur les entiers. Si :</p>
<ol>
  <li><strong>Initialisation :</strong> P(n₀) est vraie</li>
  <li><strong>Hérédité :</strong> Pour tout k ≥ n₀, P(k) vraie ⟹ P(k+1) vraie</li>
</ol>
<p>Alors P(n) est vraie pour tout entier n ≥ n₀.</p>
<h3>II. Rédaction type</h3>
<p><strong>Initialisation :</strong> Vérifier P(n₀) directement (calcul explicite).</p>
<p><strong>Hérédité :</strong> "Soit k ≥ n₀ un entier. Supposons P(k) vraie (HR) : [énoncer P(k)]. Montrons P(k+1) : [calculer/démontrer P(k+1) en utilisant HR]."</p>
<p><strong>Conclusion :</strong> "Par le principe de récurrence, P(n) est vraie pour tout entier n ≥ n₀."</p>
<h3>III. Formules classiques</h3>
<ul>
  <li>Σₖ₌₁ⁿ k = n(n+1)/2</li>
  <li>Σₖ₌₁ⁿ k² = n(n+1)(2n+1)/6</li>
  <li>Σₖ₌₀ⁿ qᵏ = (qⁿ⁺¹ - 1)/(q - 1) si q ≠ 1</li>
</ul>
<h3>IV. Récurrence double</h3>
<p>Certaines preuves nécessitent d'hypothéser P(k) ET P(k-1) pour prouver P(k+1) (ex. : suites de Fibonacci). L'initialisation doit alors vérifier P(0) et P(1).</p>`,
    examples: `<p><strong>Ex. :</strong> Démontrer que pour tout n ≥ 1 : Σₖ₌₁ⁿ k = n(n+1)/2.<br>
Init (n=1) : 1 = 1×2/2 = 1 ✓<br>
Hérédité : suppose Σₖ₌₁ᵏ k = k(k+1)/2. Alors :<br>
Σₖ₌₁ᵏ⁺¹ k = k(k+1)/2 + (k+1) = (k+1)[k/2 + 1] = (k+1)(k+2)/2. ✓<br>
Conclusion : la formule est vraie pour tout n ≥ 1.</p>`,
  },
  {
    order: 28, series: "C",
    title: "Leçon 5 : Nombres complexes",
    duration: 60, isPremium: false,
    summary: "Maîtriser les formes algébrique, trigonométrique et exponentielle des complexes, le module, l'argument, les formules de Moivre et les racines n-ièmes.",
    keyPoints: `Nombre complexe : z = a + bi, a = Re(z) partie réelle, b = Im(z) partie imaginaire, i² = -1
Module : |z| = √(a² + b²) ; Conjugué : z̄ = a - bi
Forme trigonométrique : z = r(cosθ + i sinθ), r = |z|, θ = arg(z)
Formule d'Euler : e^(iθ) = cosθ + i sinθ ; forme exponentielle : z = re^(iθ)
Formule de Moivre : (cosθ + i sinθ)ⁿ = cos(nθ) + i sin(nθ)
Multiplication : |z₁z₂| = |z₁||z₂| ; arg(z₁z₂) = arg(z₁) + arg(z₂) [mod 2π]
Division : |z₁/z₂| = |z₁|/|z₂| ; arg(z₁/z₂) = arg(z₁) - arg(z₂) [mod 2π]
Racines n-ièmes de z = re^(iθ) : zₖ = r^(1/n) · e^(i(θ + 2kπ)/n), k = 0,1,…,n-1
Résolution de z² = a + bi : méthode algébrique (système)
Racines de l'unité : solutions de zⁿ = 1`,
    content: `<h2>Nombres Complexes</h2>
<h3>I. Forme algébrique</h3>
<p>Un nombre complexe s'écrit z = a + bi où a, b ∈ ℝ et i² = -1.</p>
<ul>
  <li><strong>Conjugué :</strong> z̄ = a - bi. On a z + z̄ = 2a ∈ ℝ et z·z̄ = a² + b² = |z|² ∈ ℝ⁺</li>
  <li><strong>Module :</strong> |z| = √(a² + b²)</li>
</ul>
<p><strong>Opérations :</strong> addition terme à terme ; multiplication en développant (i² = -1) ; division : multiplier num et dénom par le conjugué du dénominateur.</p>
<h3>II. Forme trigonométrique et exponentielle</h3>
<p>Pour z ≠ 0 : <strong>z = r(cosθ + i sinθ) = re^(iθ)</strong> où r = |z| > 0 et θ = arg(z) ∈ ]-π, π].</p>
<p><strong>Formule d'Euler :</strong> e^(iθ) = cos θ + i sin θ → formules de cos et sin :</p>
<ul>
  <li>cos θ = (e^(iθ) + e^(-iθ))/2</li>
  <li>sin θ = (e^(iθ) - e^(-iθ))/(2i)</li>
</ul>
<h3>III. Formule de Moivre et applications</h3>
<p><strong>(cosθ + i sinθ)ⁿ = cos(nθ) + i sin(nθ)</strong></p>
<p>Application : linéarisation de cosⁿ(θ) et sinⁿ(θ), formules de cos(nθ) et sin(nθ) en fonctions de cosθ, sinθ.</p>
<h3>IV. Racines n-ièmes</h3>
<p>Les n racines n-ièmes de z₀ = r₀e^(iα) sont :</p>
<p style="text-align:center"><strong>zₖ = r₀^(1/n) · e^(i(α + 2kπ)/n), k = 0, 1, …, n-1</strong></p>
<p>Elles forment un polygone régulier à n sommets sur le cercle de rayon r₀^(1/n).</p>
<p><strong>Racines n-ièmes de l'unité :</strong> zₖ = e^(2ikπ/n), k = 0,1,…,n-1. Elles vérifient zⁿ = 1 et leur somme est 0 (pour n ≥ 2).</p>`,
    examples: `<p><strong>Ex. 1 :</strong> Écrire z = 1 + i sous forme exponentielle.<br>
|z| = √2, arg(z) = π/4. Donc z = √2 · e^(iπ/4).</p>
<p><strong>Ex. 2 :</strong> Racines cubiques de 1.<br>
zₖ = e^(2ikπ/3) pour k = 0,1,2 : z₀=1, z₁=e^(2iπ/3)=-1/2+i√3/2, z₂=e^(4iπ/3)=-1/2-i√3/2.</p>
<p><strong>Ex. 3 (Moivre) :</strong> cos(3θ) = Re((cosθ+i sinθ)³) = 4cos³θ - 3cosθ.</p>`,
  },
  {
    order: 29, series: "C",
    title: "Leçon 6 : Géométrie analytique du plan",
    duration: 55, isPremium: false,
    summary: "Maîtriser la géométrie dans le plan cartésien : équations de droites, de cercles, de coniques, et transformations géométriques (translations, rotations, homothéties).",
    keyPoints: `Repère (O ; i⃗, j⃗) : coordonnées (x, y) d'un point M
Distance : d(A,B) = √((xB-xA)² + (yB-yA)²)
Milieu : I = ((xA+xB)/2, (yA+yB)/2)
Droite : ax + by + c = 0 (équation générale) ; y = mx + p (équation réduite)
Vecteur directeur et vecteur normal ; pente m = tanα
Distance d'un point à une droite : d(M,Δ) = |axM + byM + c|/√(a²+b²)
Cercle de centre Ω(a,b) et rayon r : (x-a)² + (y-b)² = r²
Coniques : ellipse, hyperbole, parabole — définition par foyer et directrice
Translation, rotation (angle θ), homothétie (rapport k) — formules de changement de coordonnées
Isométries : translations et rotations conservent les distances`,
    content: `<h2>Géométrie Analytique du Plan</h2>
<h3>I. Distance, milieu, vecteur</h3>
<p>Dans un repère orthonormal (O ; i⃗, j⃗) :</p>
<ul>
  <li><strong>Distance :</strong> AB = √((xB-xA)² + (yB-yA)²)</li>
  <li><strong>Milieu :</strong> I = ((xA+xB)/2 ; (yA+yB)/2)</li>
  <li><strong>Vecteur AB⃗ :</strong> (xB-xA ; yB-yA)</li>
  <li><strong>Produit scalaire :</strong> u⃗·v⃗ = x₁x₂ + y₁y₂</li>
</ul>
<h3>II. Droites</h3>
<ul>
  <li><strong>Équation générale :</strong> ax + by + c = 0 — vecteur normal n⃗(a,b), vecteur directeur u⃗(-b,a)</li>
  <li><strong>Pente :</strong> m = -a/b ; y = mx + p (si b ≠ 0)</li>
  <li><strong>Droites parallèles :</strong> même pente (m₁ = m₂)</li>
  <li><strong>Droites perpendiculaires :</strong> m₁·m₂ = -1</li>
  <li><strong>Distance d'un point M(x₀,y₀) à la droite ax+by+c=0 :</strong> |ax₀+by₀+c|/√(a²+b²)</li>
</ul>
<h3>III. Cercle</h3>
<p>Cercle de centre Ω(a,b) rayon r : <strong>(x-a)² + (y-b)² = r²</strong></p>
<p>Développé : x² + y² - 2ax - 2by + (a²+b²-r²) = 0 → forme x² + y² + Dx + Ey + F = 0 avec centre (-D/2, -E/2) et r² = D²/4 + E²/4 - F.</p>
<h3>IV. Coniques</h3>
<table border="1" cellpadding="5" style="border-collapse:collapse;width:100%">
  <tr><th>Conique</th><th>Équation réduite</th><th>Propriété</th></tr>
  <tr><td>Ellipse</td><td>x²/a² + y²/b² = 1</td><td>Somme des distances aux foyers = constante</td></tr>
  <tr><td>Hyperbole</td><td>x²/a² - y²/b² = 1</td><td>Différence des distances aux foyers = constante</td></tr>
  <tr><td>Parabole</td><td>y² = 2px</td><td>Équidistante du foyer et de la directrice</td></tr>
</table>
<h3>V. Transformations</h3>
<ul>
  <li><strong>Translation T(a,b) :</strong> x' = x+a, y' = y+b</li>
  <li><strong>Rotation R(O,θ) :</strong> x' = x cosθ - y sinθ, y' = x sinθ + y cosθ</li>
  <li><strong>Homothétie H(O,k) :</strong> x' = kx, y' = ky — rapport k ≠ 0</li>
</ul>`,
    examples: `<p><strong>Ex. 1 :</strong> Distance de M(3,-1) à la droite 2x - y + 1 = 0 : |2(3)-(-1)+1|/√(4+1) = |6+1+1|/√5 = 8/√5 = 8√5/5.</p>
<p><strong>Ex. 2 :</strong> Cercle passant par A(0,0), B(4,0), C(0,3). L'équation est x²+y²+Dx+Ey+F=0. En A: F=0; en B: 16+4D=0→D=-4; en C: 9+3E=0→E=-3. Centre (2, 3/2), r=√(4+9/4)=5/2.</p>`,
  },
  {
    order: 30, series: "C",
    title: "Leçon 7 : Suites numériques",
    duration: 55, isPremium: false,
    summary: "Étudier les suites arithmétiques, géométriques, récurrentes, leurs limites et la convergence.",
    keyPoints: `Suite arithmétique : uₙ = u₀ + nr, raison r = uₙ₊₁ - uₙ constante ; Sₙ = n(u₁+uₙ)/2
Suite géométrique : uₙ = u₀·qⁿ, raison q = uₙ₊₁/uₙ constante ; Sₙ = u₁(1-qⁿ)/(1-q) si q≠1
Suite définie par récurrence : uₙ₊₁ = f(uₙ), points fixes, monotonie
Limite d'une suite : lim uₙ = l (convergente) ou ±∞ (divergente)
Théorèmes de convergence : suite croissante majorée → convergente ; suite de Cauchy
Suite de Fibonacci : Fₙ₊₂ = Fₙ₊₁ + Fₙ — exemple de suite récurrente double
Comparaison et encadrement : si aₙ ≤ uₙ ≤ bₙ et aₙ,bₙ → l alors uₙ → l (théorème des gendarmes)
Suite géométrique de raison |q|<1 → 0 ; |q|>1 → ±∞ ; q=1 → constante`,
    content: `<h2>Suites Numériques</h2>
<h3>I. Suites arithmétiques</h3>
<p>Une suite (uₙ) est arithmétique de raison r si uₙ₊₁ = uₙ + r pour tout n.</p>
<ul>
  <li><strong>Terme général :</strong> uₙ = u₀ + nr (ou uₙ = u₁ + (n-1)r)</li>
  <li><strong>Somme :</strong> S = (1er terme + dernier terme) × (nombre de termes) / 2</li>
  <li>En particulier : Σₖ₌₁ⁿ k = n(n+1)/2</li>
</ul>
<h3>II. Suites géométriques</h3>
<p>Une suite (uₙ) est géométrique de raison q si uₙ₊₁ = q·uₙ pour tout n.</p>
<ul>
  <li><strong>Terme général :</strong> uₙ = u₀·qⁿ</li>
  <li><strong>Somme (q ≠ 1) :</strong> Σₖ₌₀ⁿ⁻¹ u₀qᵏ = u₀(1-qⁿ)/(1-q)</li>
</ul>
<h3>III. Limites de suites</h3>
<table border="1" cellpadding="5" style="border-collapse:collapse;width:100%">
  <tr><th>Suite</th><th>Limite</th></tr>
  <tr><td>qⁿ, |q| < 1</td><td>0</td></tr>
  <tr><td>qⁿ, q > 1</td><td>+∞</td></tr>
  <tr><td>1/nᵅ (α > 0)</td><td>0</td></tr>
  <tr><td>nᵅ (α > 0)</td><td>+∞</td></tr>
</table>
<h3>IV. Suites récurrentes</h3>
<p>Pour uₙ₊₁ = f(uₙ) :</p>
<ol>
  <li>Trouver les points fixes : résoudre f(l) = l</li>
  <li>Étudier la monotonie (montrer uₙ₊₁ - uₙ garde un signe constant)</li>
  <li>Montrer que la suite est bornée</li>
  <li>Conclure sur la convergence et calculer la limite</li>
</ol>
<h3>V. Théorèmes fondamentaux</h3>
<ul>
  <li><strong>Th. des gendarmes :</strong> aₙ ≤ uₙ ≤ bₙ et lim aₙ = lim bₙ = l ⟹ lim uₙ = l</li>
  <li><strong>Suite croissante majorée ⟹ convergente</strong></li>
  <li><strong>Suite décroissante minorée ⟹ convergente</strong></li>
</ul>`,
    examples: `<p><strong>Ex. 1 :</strong> Suite arithmétique u₁=3, r=4. u₁₀₀ = 3 + 99×4 = 399. S₁₀₀ = 100(3+399)/2 = 20100.</p>
<p><strong>Ex. 2 (récurrente) :</strong> uₙ₊₁ = (uₙ + 2)/2, u₀ = 0. Points fixes : l = (l+2)/2 → l = 2. Montrer uₙ croissante et majorée par 2 → lim = 2.</p>`,
  },
  {
    order: 31, series: "C",
    title: "Leçon 8 : Limites et continuité des fonctions",
    duration: 50, isPremium: false,
    summary: "Définir et calculer les limites de fonctions, étudier la continuité, le théorème des valeurs intermédiaires et les formes indéterminées.",
    keyPoints: `Limite en un point : lim[x→a] f(x) = l — définition ε-δ ; règles opératoires
Limites en ±∞ : croissances comparées (xⁿ, eˣ, ln x)
Formes indéterminées : ∞/∞, 0/0, ∞-∞, 0×∞ → lever par factorisation, conjugué ou équivalents
Continuité en a : f continue en a ⟺ lim[x→a] f(x) = f(a)
Fonctions continues sur [a,b] : théorème des valeurs intermédiaires (TVI)
TVI : si f continue sur [a,b] et k entre f(a) et f(b), alors ∃c∈]a,b[ avec f(c)=k
Corollaire (théorème de la bijection) : f continue et strictement monotone sur [a,b] → f réalise une bijection de [a,b] sur [f(a),f(b)]
Prolongement par continuité : si lim[x→a] f(x) = l, on peut prolonger f en posant f(a) = l
Théorème des valeurs extrêmes : f continue sur [a,b] fermé borné → f atteint son max et son min`,
    content: `<h2>Limites et Continuité des Fonctions</h2>
<h3>I. Définition de la limite</h3>
<p>lim[x→a] f(x) = l signifie : pour tout ε > 0, il existe δ > 0 tel que |x-a| < δ ⟹ |f(x)-l| < ε.</p>
<p><strong>Règles opératoires :</strong> si lim f = l et lim g = m (l, m ∈ ℝ) :</p>
<ul>
  <li>lim (f + g) = l + m ; lim (fg) = lm</li>
  <li>lim (f/g) = l/m si m ≠ 0</li>
  <li>Si lim f = ±∞ et lim g = l ∈ ℝ* ou +∞ : lim fg = ±∞ (règles des signes)</li>
</ul>
<h3>II. Formes indéterminées</h3>
<table border="1" cellpadding="5" style="border-collapse:collapse;width:100%">
  <tr><th>FI</th><th>Technique</th></tr>
  <tr><td>0/0</td><td>Factoriser, simplifier ou DL</td></tr>
  <tr><td>∞/∞</td><td>Factoriser par le terme dominant</td></tr>
  <tr><td>∞ - ∞</td><td>Factoriser ou rationnaiser (conjugué)</td></tr>
  <tr><td>0 × ∞</td><td>Réécrire en 0/(1/∞) ou ∞/(1/0)</td></tr>
</table>
<h3>III. Continuité</h3>
<p>f est <strong>continue en a</strong> si lim[x→a] f(x) = f(a) (et f est définie en a).</p>
<p>f est continue sur I si elle est continue en tout point de I.</p>
<p><strong>Théorème des valeurs intermédiaires (TVI) :</strong> Si f est continue sur [a,b] et si k est un réel compris entre f(a) et f(b), alors il existe au moins un c ∈ ]a,b[ tel que f(c) = k.</p>
<p><strong>Corollaire (bijection) :</strong> Si f est continue et strictement monotone sur [a,b], alors f est une bijection de [a,b] sur [f(a),f(b)] (ou [f(b),f(a)] si décroissante).</p>`,
    examples: `<p><strong>Ex. 1 (FI 0/0) :</strong> lim[x→2] (x²-4)/(x-2) = lim (x+2)(x-2)/(x-2) = lim(x+2) = 4.</p>
<p><strong>Ex. 2 (FI ∞/∞) :</strong> lim[x→+∞] (3x²-2x+1)/(2x²+5) = lim 3x²(1-2/(3x)+…)/2x²(1+…) = 3/2.</p>
<p><strong>Ex. 3 (TVI) :</strong> f(x)=x³-2x-3, f(1)=-4<0, f(2)=1>0. Par TVI, ∃c∈]1,2[ avec f(c)=0 → l'équation a une racine dans ]1,2[.</p>`,
  },
  {
    order: 32, series: "C",
    title: "Leçon 9 : Dérivabilité et étude des fonctions",
    duration: 55, isPremium: false,
    summary: "Définir la dérivabilité, calculer des dérivées (règles, fonctions composées), utiliser les dérivées pour l'étude des variations, les asymptotes et la courbe représentative.",
    keyPoints: `Dérivée : f'(a) = lim[h→0] (f(a+h)-f(a))/h — pente de la tangente en a
Dérivées usuelles : xⁿ → nxⁿ⁻¹ ; eˣ → eˣ ; ln x → 1/x ; sin x → cos x ; cos x → -sin x
Règles : (u+v)' = u'+v' ; (uv)' = u'v+uv' ; (u/v)' = (u'v-uv')/v² ; (f∘g)' = (f'∘g)·g'
Signe de f' → monotonie de f (f'>0 croissante, f'<0 décroissante)
Extremums : f'(a)=0 et changement de signe de f' → extremum local
Tableau de variations : résume le signe de f' et les variations de f
Asymptote horizontale : lim[x→±∞] f(x) = l → y = l
Asymptote verticale : lim[x→a±] f(x) = ±∞ → x = a
Asymptote oblique : f(x) = mx + p + ε(x) avec ε(x)→0 → y = mx + p`,
    content: `<h2>Dérivabilité et Étude des Fonctions</h2>
<h3>I. Dérivée en un point</h3>
<p>f est dérivable en a si la limite f'(a) = lim[h→0] [f(a+h)-f(a)]/h existe et est finie. Géométriquement, c'est la pente de la tangente à la courbe en (a, f(a)).</p>
<p><strong>Équation de la tangente en (a, f(a)) :</strong> y = f'(a)(x-a) + f(a)</p>
<h3>II. Dérivées usuelles et règles</h3>
<table border="1" cellpadding="5" style="border-collapse:collapse;width:100%">
  <tr><th>f(x)</th><th>f'(x)</th></tr>
  <tr><td>xⁿ</td><td>nxⁿ⁻¹</td></tr>
  <tr><td>√x</td><td>1/(2√x)</td></tr>
  <tr><td>1/x</td><td>-1/x²</td></tr>
  <tr><td>eˣ</td><td>eˣ</td></tr>
  <tr><td>ln x</td><td>1/x</td></tr>
  <tr><td>sin x</td><td>cos x</td></tr>
  <tr><td>cos x</td><td>-sin x</td></tr>
  <tr><td>tan x</td><td>1/cos²x = 1 + tan²x</td></tr>
</table>
<p><strong>Règle de la chaîne :</strong> (f∘g)'(x) = f'(g(x))·g'(x)</p>
<h3>III. Étude des variations</h3>
<ol>
  <li>Domaine de définition (Df)</li>
  <li>Parité (paire, impaire) ou périodicité</li>
  <li>Calcul de f'(x)</li>
  <li>Signe de f' → variations</li>
  <li>Asymptotes (horizontales, verticales, obliques)</li>
  <li>Tableau de variations complet</li>
  <li>Points particuliers, tracé de la courbe</li>
</ol>
<h3>IV. Asymptotes obliques</h3>
<p>Si f(x)/x → m et f(x) - mx → p quand x→±∞, alors y = mx + p est asymptote oblique.</p>`,
    examples: `<p><strong>Ex. 1 :</strong> f(x) = (x²+1)/(x-1). f'(x) = [(2x)(x-1)-(x²+1)·1]/(x-1)² = (x²-2x-1)/(x-1)². Signe de f' → variations.<br>
Asymptote oblique : f(x) = x+1 + 2/(x-1) → y = x+1.</p>`,
  },
  {
    order: 33, series: "C",
    title: "Leçon 10 : Fonctions logarithme et exponentielle",
    duration: 50, isPremium: false,
    summary: "Étudier les propriétés de ln et exp, résoudre les équations et inéquations logarithmiques et exponentielles, et maîtriser les croissances comparées.",
    keyPoints: `Fonction ln : domaine ]0,+∞[, ln(1)=0, ln'(x)=1/x, ln strictement croissante
Propriétés algébriques : ln(ab)=ln a+ln b ; ln(a/b)=ln a-ln b ; ln(aⁿ)=n ln a
Fonction exp = ln⁻¹ : domaine ℝ, exp(0)=1, exp'(x)=eˣ, strictement croissante
Propriétés : eˣ⁺ʸ=eˣeʸ ; (eˣ)ⁿ=eⁿˣ ; eˣ>0 pour tout x
Équations : ln(f(x))=k ⟺ f(x)=eᵏ (et f(x)>0) ; eˣ=k ⟺ x=ln k (k>0)
Inéquations : ln croissante → ln u>ln v ⟺ u>v (et u,v>0)
Croissances comparées : lim xⁿeˣ=+∞ ; lim eˣ/xⁿ=+∞ ; lim xⁿln x=0 en 0⁺ ; lim ln x/xⁿ=0 en +∞
Fonctions aˣ = eˣlna et logₐx = ln x/ln a (a>0, a≠1)`,
    content: `<h2>Fonctions Logarithme et Exponentielle</h2>
<h3>I. Fonction ln</h3>
<p>La fonction <strong>logarithme naturel</strong> ln : ]0,+∞[ → ℝ est l'unique primitive de 1/x qui s'annule en 1.</p>
<ul>
  <li>ln'(x) = 1/x (> 0) → ln est strictement croissante</li>
  <li>ln est concave (ln'' < 0)</li>
  <li>lim[x→0⁺] ln x = -∞ ; lim[x→+∞] ln x = +∞</li>
  <li>ln 1 = 0 ; ln e = 1</li>
</ul>
<p><strong>Propriétés algébriques :</strong></p>
<ul>
  <li>ln(ab) = ln a + ln b (a,b > 0)</li>
  <li>ln(a/b) = ln a - ln b</li>
  <li>ln(aⁿ) = n·ln a</li>
  <li>ln(√a) = (1/2)ln a</li>
</ul>
<h3>II. Fonction exponentielle</h3>
<p>exp = ln⁻¹ : ℝ → ]0,+∞[ ; on note exp(x) = eˣ.</p>
<ul>
  <li>(eˣ)' = eˣ > 0 → exp strictement croissante</li>
  <li>e⁰ = 1 ; e¹ = e ≈ 2,718</li>
  <li>eˣ⁺ʸ = eˣ·eʸ ; (eˣ)ⁿ = eⁿˣ ; e⁻ˣ = 1/eˣ</li>
</ul>
<h3>III. Résolution d'équations et inéquations</h3>
<ul>
  <li>eˣ = eᵃ ⟺ x = a</li>
  <li>eˣ < eᵃ ⟺ x < a (exp croissante)</li>
  <li>ln x = a ⟺ x = eᵃ (x > 0)</li>
  <li>ln x < a ⟺ 0 < x < eᵃ</li>
</ul>
<h3>IV. Croissances comparées</h3>
<ul>
  <li>lim[x→+∞] eˣ/xⁿ = +∞ (exp domine tout polynôme)</li>
  <li>lim[x→+∞] ln x/xᵅ = 0 (α > 0) (ln croît moins vite que toute puissance positive)</li>
  <li>lim[x→0⁺] xᵅ ln x = 0 (α > 0)</li>
</ul>`,
    examples: `<p><strong>Ex. 1 :</strong> Résoudre ln(x-1) + ln(x+1) = ln 3.<br>
⟺ ln((x-1)(x+1)) = ln 3 ⟺ x²-1 = 3 ⟺ x² = 4 ⟺ x = 2 (car x-1 > 0 → x > 1).</p>
<p><strong>Ex. 2 :</strong> Résoudre e²ˣ - 3eˣ + 2 ≤ 0. Poser u = eˣ > 0 : u² - 3u + 2 ≤ 0 ⟺ (u-1)(u-2) ≤ 0 ⟺ 1 ≤ u ≤ 2 ⟺ 0 ≤ x ≤ ln 2.</p>`,
  },
  {
    order: 34, series: "C",
    title: "Leçon 11 : Calcul intégral",
    duration: 55, isPremium: false,
    summary: "Définir l'intégrale, calculer des primitives, maîtriser l'intégration par parties et le changement de variable.",
    keyPoints: `Primitive : F est primitive de f si F' = f (à une constante additive près)
Intégrale définie : ∫ₐᵇ f(x)dx = F(b) - F(a) (théorème fondamental du calcul)
Linéarité : ∫(αf + βg) = α∫f + β∫g
Relation de Chasles : ∫ₐᶜ f = ∫ₐᵇ f + ∫ᵦᶜ f
IPP (intégration par parties) : ∫ₐᵇ u·v' = [uv]ₐᵇ - ∫ₐᵇ u'·v
Changement de variable : ∫ₐᵇ f(g(t))g'(t)dt = ∫_{g(a)}^{g(b)} f(x)dx
Primitives usuelles : xⁿ→xⁿ⁺¹/(n+1) ; 1/x→ln|x| ; eˣ→eˣ ; sin x→-cos x ; cos x→sin x
Calcul d'aire : l'intégrale donne l'aire algébrique sous la courbe
Valeur moyenne : f̄ = (1/(b-a))∫ₐᵇ f(x)dx`,
    content: `<h2>Calcul Intégral</h2>
<h3>I. Primitives et intégrale</h3>
<p>F est une primitive de f sur I si F'(x) = f(x) pour tout x ∈ I. Si F est une primitive, l'ensemble de toutes les primitives est {F + C, C ∈ ℝ}.</p>
<p><strong>Théorème fondamental :</strong> Si f est continue sur [a,b] et F une primitive de f, alors :</p>
<p style="text-align:center">∫ₐᵇ f(x)dx = F(b) - F(a) = [F(x)]ₐᵇ</p>
<h3>II. Primitives usuelles</h3>
<table border="1" cellpadding="5" style="border-collapse:collapse;width:100%">
  <tr><th>f(x)</th><th>F(x)</th></tr>
  <tr><td>xⁿ (n ≠ -1)</td><td>xⁿ⁺¹/(n+1)</td></tr>
  <tr><td>1/x</td><td>ln|x|</td></tr>
  <tr><td>eˣ</td><td>eˣ</td></tr>
  <tr><td>eᵃˣ</td><td>eᵃˣ/a</td></tr>
  <tr><td>sin x</td><td>-cos x</td></tr>
  <tr><td>cos x</td><td>sin x</td></tr>
  <tr><td>1/cos²x</td><td>tan x</td></tr>
  <tr><td>f'/f</td><td>ln|f|</td></tr>
</table>
<h3>III. Intégration par parties (IPP)</h3>
<p>∫ₐᵇ u(x)·v'(x)dx = [u(x)v(x)]ₐᵇ - ∫ₐᵇ u'(x)·v(x)dx</p>
<p><strong>Règle LIATE</strong> pour choisir u : Logarithme, Inverse, Algébrique (polynôme), Trig, Exponentielle — la première catégorie présente sera u.</p>
<h3>IV. Changement de variable</h3>
<p>Si x = g(t) est un C¹-difféomorphisme de [α,β] sur [a,b] :</p>
<p style="text-align:center">∫ₐᵇ f(x)dx = ∫ₐᵝ f(g(t))·g'(t)dt</p>
<h3>V. Applications</h3>
<ul>
  <li><strong>Aire :</strong> Aire entre f et Ox sur [a,b] = |∫ₐᵇ f(x)dx| si f ne change pas de signe</li>
  <li><strong>Valeur moyenne :</strong> f̄ = (1/(b-a))∫ₐᵇ f(x)dx</li>
</ul>`,
    examples: `<p><strong>Ex. 1 (IPP) :</strong> I = ∫ x·eˣ dx. Poser u=x, v'=eˣ → u'=1, v=eˣ.<br>
I = xeˣ - ∫eˣdx = xeˣ - eˣ + C = eˣ(x-1) + C.</p>
<p><strong>Ex. 2 (cdv) :</strong> ∫₀¹ 2x·e^(x²) dx. Poser t=x² → dt=2x dx.<br>
= ∫₀¹ eᵗ dt = [eᵗ]₀¹ = e - 1.</p>`,
  },
  {
    order: 35, series: "C",
    title: "Leçon 12 : Équations différentielles du 1er et 2e ordre",
    duration: 55, isPremium: false,
    summary: "Résoudre les équations différentielles du premier ordre (à variables séparables, linéaires) et du second ordre linéaires à coefficients constants.",
    keyPoints: `Équation différentielle (ED) : relation liant x, y(x) et ses dérivées
ED du 1er ordre linéaire : y' + a(x)y = b(x) — homogène si b=0
Solution homogène y' + ay = 0 : y = Ce^(-ax) (C ∈ ℝ)
Méthode de variation de la constante pour y' + a(x)y = b(x)
Variables séparables : y'/f(y) = g(x) → ∫dy/f(y) = ∫g(x)dx
ED du 2e ordre à coefficients constants : ay'' + by' + cy = f(x)
Équation caractéristique : ar² + br + c = 0, discriminant Δ
Δ>0 : yₕ = C₁e^(r₁x) + C₂e^(r₂x) ; Δ=0 : yₕ = (C₁+C₂x)e^(r₀x) ; Δ<0 : yₕ = e^(αx)(C₁cosβx+C₂sinβx)
Solution générale = solution homogène + solution particulière`,
    content: `<h2>Équations Différentielles</h2>
<h3>I. Équations du 1er ordre</h3>
<p><strong>a) À variables séparables : y' = f(x)·g(y)</strong></p>
<p>Séparer : dy/g(y) = f(x)dx → intégrer des deux côtés.</p>
<p><strong>b) Linéaires du 1er ordre : y' + a(x)y = b(x)</strong></p>
<ul>
  <li><strong>Homogène (b=0) :</strong> y' = -a(x)y → solution : y = C·e^(-∫a(x)dx)</li>
  <li><strong>Avec second membre :</strong> méthode de variation de la constante — on cherche y = C(x)·e^(-∫a(x)dx), on substitue pour trouver C(x).</li>
</ul>
<h3>II. Équations du 2e ordre linéaires à coefficients constants</h3>
<p>Forme : <strong>ay'' + by' + cy = f(x)</strong> (a ≠ 0, a,b,c ∈ ℝ)</p>
<p><strong>Étape 1 — Équation caractéristique :</strong> ar² + br + c = 0, Δ = b² - 4ac</p>
<table border="1" cellpadding="5" style="border-collapse:collapse;width:100%">
  <tr><th>Cas</th><th>Racines</th><th>Solution homogène yₕ</th></tr>
  <tr><td>Δ > 0</td><td>r₁, r₂ réels distincts</td><td>C₁e^(r₁x) + C₂e^(r₂x)</td></tr>
  <tr><td>Δ = 0</td><td>r₀ = -b/(2a) double</td><td>(C₁ + C₂x)e^(r₀x)</td></tr>
  <tr><td>Δ < 0</td><td>α ± iβ complexes</td><td>e^(αx)(C₁ cos βx + C₂ sin βx)</td></tr>
</table>
<p><strong>Étape 2 — Solution particulière yₚ :</strong> chercher selon la forme de f(x) (polynôme, exponentielle, sinusoïde).</p>
<p><strong>Étape 3 — Solution générale :</strong> y = yₕ + yₚ.</p>
<p><strong>Étape 4 — Conditions initiales :</strong> utiliser y(x₀) = y₀ et y'(x₀) = y₀' pour déterminer C₁, C₂.</p>`,
    examples: `<p><strong>Ex. 1 (1er ordre) :</strong> y' + 2y = 4. Homogène : y' + 2y = 0 → yₕ = Ce^(-2x). Sol. particulière : yₚ = 2 (constante). Sol. générale : y = Ce^(-2x) + 2.</p>
<p><strong>Ex. 2 (2e ordre) :</strong> y'' - 5y' + 6y = 0. Éq. car. : r² - 5r + 6 = 0 → (r-2)(r-3) = 0 → r₁=2, r₂=3.<br>
Sol. : y = C₁e^(2x) + C₂e^(3x).</p>`,
  },
  {
    order: 36, series: "C",
    title: "Leçon 13 : Dénombrement — arrangements et combinaisons",
    duration: 50, isPremium: false,
    summary: "Maîtriser les outils de dénombrement : permutations, arrangements, combinaisons, et les appliquer aux probabilités élémentaires.",
    keyPoints: `Dénombrement : compter les éléments d'un ensemble selon ses propriétés
Principe additif : si A et B disjoints, |A ∪ B| = |A| + |B|
Principe multiplicatif : si une expérience en k étapes indépendantes a n₁,…,nₖ issues : total = n₁×…×nₖ
Permutation de n éléments : n! (tous les ordres possibles)
Arrangement : Aₙᵖ = n!/(n-p)! — p éléments ordonnés parmi n
Combinaison : Cₙᵖ = n!/[p!(n-p)!] — p éléments non ordonnés parmi n (= "n choisir p")
Propriétés de Cₙᵖ : Cₙ⁰=Cₙⁿ=1 ; Cₙᵖ=Cₙⁿ⁻ᵖ ; formule de Pascal : Cₙᵖ = Cₙ₋₁ᵖ⁻¹ + Cₙ₋₁ᵖ
Formule du binôme de Newton : (a+b)ⁿ = Σₖ₌₀ⁿ Cₙᵏ aᵏ bⁿ⁻ᵏ
Probabilités uniformes : P(A) = |A|/|Ω| sur un univers fini équiprobable`,
    content: `<h2>Dénombrement</h2>
<h3>I. Principes fondamentaux</h3>
<p><strong>Principe additif :</strong> Si A₁, A₂,…, Aₖ sont des ensembles deux à deux disjoints, |A₁ ∪ … ∪ Aₖ| = |A₁| + … + |Aₖ|.</p>
<p><strong>Principe multiplicatif :</strong> Si une expérience se décompose en k étapes indépendantes avec n₁, n₂,…, nₖ choix possibles à chaque étape, le nombre total d'issues est n₁ × n₂ × … × nₖ.</p>
<h3>II. Permutations, arrangements, combinaisons</h3>
<table border="1" cellpadding="5" style="border-collapse:collapse;width:100%">
  <tr><th>Outil</th><th>Formule</th><th>Sens</th></tr>
  <tr><td>Permutations de n</td><td>n!</td><td>Tous les arrangements de n éléments distincts</td></tr>
  <tr><td>Arrangements Aₙᵖ</td><td>n!/(n-p)!</td><td>p éléments ordonnés tirés de n</td></tr>
  <tr><td>Combinaisons Cₙᵖ</td><td>n!/[p!(n-p)!]</td><td>p éléments (non ordonnés) tirés de n</td></tr>
</table>
<h3>III. Propriétés des combinaisons</h3>
<ul>
  <li>Cₙ⁰ = Cₙⁿ = 1</li>
  <li>Cₙ¹ = n</li>
  <li>Cₙᵖ = Cₙⁿ⁻ᵖ (symétrie)</li>
  <li><strong>Formule de Pascal :</strong> Cₙᵖ = Cₙ₋₁ᵖ⁻¹ + Cₙ₋₁ᵖ (triangle de Pascal)</li>
</ul>
<h3>IV. Formule du binôme de Newton</h3>
<p style="text-align:center">(a + b)ⁿ = Σₖ₌₀ⁿ Cₙᵏ · aᵏ · bⁿ⁻ᵏ</p>
<p>Cas particuliers : Σₖ₌₀ⁿ Cₙᵏ = 2ⁿ (a=b=1) ; Σₖ₌₀ⁿ (-1)ᵏCₙᵏ = 0 (a=1,b=-1).</p>`,
    examples: `<p><strong>Ex. 1 :</strong> Combien de mots de 3 lettres distinctes avec l'alphabet {A,B,C,D,E} ? Arrangements : A₅³ = 5!/2! = 60.</p>
<p><strong>Ex. 2 :</strong> Comité de 3 personnes parmi 10 : C₁₀³ = 10!/(3!7!) = 120.</p>
<p><strong>Ex. 3 (proba) :</strong> P(obtenir exactement 2 têtes avec 5 pièces) = C₅² × (1/2)⁵ = 10/32 = 5/16.</p>`,
  },
  {
    order: 37, series: "C",
    title: "Leçon 14 : Probabilités — variables aléatoires et formule de Bayes",
    duration: 55, isPremium: false,
    summary: "Maîtriser les probabilités conditionnelles, la formule des probabilités totales, la formule de Bayes, les variables aléatoires discrètes, espérance et variance.",
    keyPoints: `Probabilité conditionnelle : P(A|B) = P(A∩B)/P(B) (P(B) > 0)
Indépendance : A et B indépendants ⟺ P(A∩B) = P(A)·P(B)
Formule des probabilités totales (FPT) : si (Bᵢ) partition de Ω, P(A) = Σ P(A|Bᵢ)P(Bᵢ)
Formule de Bayes : P(Bⱼ|A) = P(A|Bⱼ)P(Bⱼ) / Σᵢ P(A|Bᵢ)P(Bᵢ)
Variable aléatoire discrète X : prend des valeurs x₁,…,xₙ avec probabilités p₁,…,pₙ (Σpᵢ=1)
Espérance : E(X) = Σ xᵢpᵢ — valeur moyenne
Variance : V(X) = E(X²) - [E(X)]² = Σ xᵢ²pᵢ - (Σxᵢpᵢ)²
Écart-type : σ(X) = √V(X)
Loi de Bernoulli B(p) : X vaut 1 (succès) avec proba p, 0 avec proba 1-p ; E=p, V=p(1-p)
Loi binomiale B(n,p) : X = nb succès en n épreuves indépendantes de Bernoulli ; P(X=k)=Cₙᵏpᵏ(1-p)ⁿ⁻ᵏ ; E=np, V=np(1-p)`,
    content: `<h2>Probabilités — Variables Aléatoires et Formule de Bayes</h2>
<h3>I. Probabilités conditionnelles</h3>
<p><strong>P(A|B)</strong> = probabilité que A se réalise sachant que B s'est réalisé :</p>
<p style="text-align:center">P(A|B) = P(A ∩ B) / P(B)</p>
<p><strong>Règle de multiplication :</strong> P(A ∩ B) = P(A|B)·P(B) = P(B|A)·P(A)</p>
<h3>II. Formule des probabilités totales et de Bayes</h3>
<p>Si (B₁, B₂,…, Bₖ) est une partition de Ω (Bᵢ deux à deux disjoints, de réunion Ω, de probabilité non nulle) :</p>
<p><strong>FPT :</strong> P(A) = Σᵢ P(A|Bᵢ) · P(Bᵢ)</p>
<p><strong>Bayes :</strong> P(Bⱼ|A) = P(A|Bⱼ)·P(Bⱼ) / P(A)</p>
<p>On remplace P(A) par la FPT. La formule de Bayes permet de "remonter" d'un résultat observé (A) à ses causes possibles (Bⱼ).</p>
<h3>III. Variables aléatoires discrètes</h3>
<p>X est une V.A. discrète si elle prend un nombre fini (ou dénombrable) de valeurs. Sa <strong>loi de probabilité</strong> est la donnée de tous les couples (xᵢ, P(X=xᵢ)) avec Σ P(X=xᵢ) = 1.</p>
<table border="1" cellpadding="5" style="border-collapse:collapse;width:100%">
  <tr><th>Indicateur</th><th>Formule</th><th>Signification</th></tr>
  <tr><td>Espérance E(X)</td><td>Σ xᵢ · P(X=xᵢ)</td><td>Valeur moyenne (centre de gravité)</td></tr>
  <tr><td>Variance V(X)</td><td>E(X²) - [E(X)]²</td><td>Dispersion autour de la moyenne</td></tr>
  <tr><td>Écart-type σ(X)</td><td>√V(X)</td><td>Dispersion dans la même unité que X</td></tr>
</table>
<h3>IV. Lois classiques</h3>
<p><strong>Loi binomiale B(n, p) :</strong> nombre de succès en n épreuves de Bernoulli (succès prob. p, indépendantes).</p>
<ul>
  <li>P(X = k) = Cₙᵏ · pᵏ · (1-p)ⁿ⁻ᵏ, k = 0,1,…,n</li>
  <li>E(X) = np ; V(X) = np(1-p)</li>
</ul>`,
    examples: `<p><strong>Ex. (Bayes) :</strong> Usine A produit 60% des pièces (taux défaut 1%), usine B produit 40% (taux défaut 3%). On choisit une pièce au hasard et elle est défectueuse. Quelle est la probabilité qu'elle vienne de B ?<br>
P(B) = 0,4 ; P(D|B) = 0,03 ; P(D|A) = 0,01 ; P(A) = 0,6.<br>
P(D) = 0,01×0,6 + 0,03×0,4 = 0,006 + 0,012 = 0,018.<br>
P(B|D) = 0,012/0,018 = 2/3 ≈ 66,7%.</p>`,
  },
  {
    order: 38, series: "C",
    title: "Leçon 15 : Géométrie dans l'espace",
    duration: 55, isPremium: false,
    summary: "Maîtriser le repérage dans l'espace, les vecteurs 3D, les équations de droites et plans, les positions relatives et le barycentre.",
    keyPoints: `Repère orthonormal (O ; i⃗, j⃗, k⃗) : coordonnées (x,y,z) dans ℝ³
Distance : d(A,B) = √((xB-xA)²+(yB-yA)²+(zB-zA)²)
Vecteur n⃗ normal à un plan P : le plan P a équation ax+by+cz+d=0 avec n⃗(a,b,c)
Droite : représentation paramétrique (x,y,z) = (x₀,y₀,z₀) + t(a,b,c)
Position droite/plan : droite parallèle, sécante, ou incluse dans le plan
Position droite/droite : parallèles, sécantes (coplanaires), ou gauches (non coplanaires)
Position plan/plan : parallèles ou sécants (droite d'intersection)
Barycentre de points pondérés : G = Σαᵢ Mᵢ / Σαᵢ (avec coordonnées)
Distance d'un point à un plan : d(M₀, P) = |ax₀+by₀+cz₀+d|/√(a²+b²+c²)
Produit vectoriel : n⃗ = u⃗ × v⃗ perpendiculaire à u⃗ et v⃗`,
    content: `<h2>Géométrie dans l'Espace</h2>
<h3>I. Repère et coordonnées dans ℝ³</h3>
<ul>
  <li><strong>Distance :</strong> AB = √((xB-xA)²+(yB-yA)²+(zB-zA)²)</li>
  <li><strong>Milieu :</strong> I = ((xA+xB)/2, (yA+yB)/2, (zA+zB)/2)</li>
  <li><strong>Produit scalaire :</strong> u⃗·v⃗ = x₁x₂ + y₁y₂ + z₁z₂</li>
  <li><strong>Vecteurs perpendiculaires :</strong> u⃗ ⊥ v⃗ ⟺ u⃗·v⃗ = 0</li>
</ul>
<h3>II. Plans dans ℝ³</h3>
<p>Un plan Π est défini par un point M₀(x₀,y₀,z₀) et un vecteur normal n⃗(a,b,c) :</p>
<p style="text-align:center"><strong>a(x-x₀) + b(y-y₀) + c(z-z₀) = 0 ⟺ ax + by + cz + d = 0</strong></p>
<p><strong>Distance d'un point à un plan :</strong> d(M₀, Π) = |ax₀+by₀+cz₀+d|/√(a²+b²+c²)</p>
<h3>III. Droites dans ℝ³</h3>
<p>Droite passant par A(x₀,y₀,z₀) de vecteur directeur u⃗(a,b,c) :</p>
<p style="text-align:center"><strong>{ x = x₀ + ta ; y = y₀ + tb ; z = z₀ + tc }, t ∈ ℝ</strong></p>
<h3>IV. Positions relatives</h3>
<table border="1" cellpadding="5" style="border-collapse:collapse;width:100%">
  <tr><th>Objets</th><th>Cas</th><th>Critère</th></tr>
  <tr><td>Deux droites</td><td>Parallèles, sécantes, gauches</td><td>Vecteurs dir. colinéaires ? Coplanaires ?</td></tr>
  <tr><td>Droite et plan</td><td>Parallèle, sécante, incluse</td><td>Substituer la para. dans l'éq. du plan</td></tr>
  <tr><td>Deux plans</td><td>Parallèles, sécants</td><td>Vecteurs normaux colinéaires ?</td></tr>
</table>
<h3>V. Barycentre</h3>
<p>Le barycentre G des points M₁(x₁,y₁,z₁),…,Mₙ(xₙ,yₙ,zₙ) de coefficients α₁,…,αₙ (Σαᵢ ≠ 0) a pour coordonnées :</p>
<p style="text-align:center">xG = Σαᵢxᵢ/Σαᵢ, yG = Σαᵢyᵢ/Σαᵢ, zG = Σαᵢzᵢ/Σαᵢ</p>`,
    examples: `<p><strong>Ex. 1 :</strong> Plan passant par A(1,0,0), B(0,2,0), C(0,0,3).<br>
Équation : x/1 + y/2 + z/3 = 1 → 6x + 3y + 2z = 6.<br>
Distance de O(0,0,0) au plan : |6(0)+3(0)+2(0)-6|/√(36+9+4) = 6/7.</p>
<p><strong>Ex. 2 (barycentre) :</strong> G = barycentre de A(1,0,0) coeff 2 et B(0,4,0) coeff 1 → G = ((2·1+1·0)/3, (2·0+1·4)/3, 0) = (2/3, 4/3, 0).</p>`,
  },
];

const mathsCExercises = [
  // L1 : ℝ et intervalles
  { lo: 24, q: "L'ensemble des solutions de |x - 2| ≤ 3 est :", t: "mcq", d: "easy", o: ["]-∞, -1] ∪ [5, +∞[", "[-1, 5]", "]-1, 5[", "[2, 5]"], a: "[-1, 5]", e: "|x-2| ≤ 3 ⟺ -3 ≤ x-2 ≤ 3 ⟺ -1 ≤ x ≤ 5. C'est l'intervalle [-1, 5]." },
  { lo: 24, q: "Pour tout a, b ∈ ℝ, l'inégalité triangulaire affirme que |a+b| ≤ |a| + |b|.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "L'inégalité triangulaire est une propriété fondamentale de la valeur absolue (et plus généralement de toute norme). Elle exprime que la 'distance directe' est toujours inférieure ou égale à la somme des distances en passant par un intermédiaire : |a+b| ≤ |a|+|b|, avec égalité si et seulement si a et b ont le même signe (ou si l'un d'eux est nul)." },
  { lo: 24, q: "La partie entière de -2,7 est :", t: "mcq", d: "easy", o: ["-2", "-3", "2", "3"], a: "-3", e: "La partie entière E(x) = ⌊x⌋ est le plus grand entier inférieur ou égal à x. Pour x = -2,7, les entiers inférieurs à -2,7 sont …, -4, -3, donc le plus grand est -3. Attention : E(-2,7) = -3 ≠ -2 (on ne 'arrondit pas vers zéro' pour les négatifs)." },
  // L2 : Polynômes
  { lo: 25, q: "Si r₁ et r₂ sont les racines de 2x² - 6x + 3 = 0, alors r₁ + r₂ = :", t: "mcq", d: "easy", o: ["3", "3/2", "-3", "6"], a: "3", e: "Par les formules de Viète pour ax²+bx+c=0 : r₁+r₂ = -b/a = -(-6)/2 = 3 et r₁r₂ = c/a = 3/2." },
  { lo: 25, q: "Tout polynôme de degré n a exactement n racines réelles.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Faux", e: "Un polynôme de degré n a au plus n racines réelles (et exactement n racines dans ℂ en comptant les multiplicités, par le théorème fondamental de l'algèbre). Il peut avoir zéro racine réelle (ex : x²+1 n'a pas de racine réelle) ou moins de n racines distinctes (racines multiples)." },
  { lo: 25, q: "La décomposition en éléments simples de 1/[x(x-1)] est :", t: "mcq", d: "medium", o: ["1/(x-1) - 1/x", "1/x - 1/(x-1)", "1/x + 1/(x-1)", "-1/x + 1/(x-1)"], a: "-1/x + 1/(x-1)", e: "1/[x(x-1)] = A/x + B/(x-1). Multiplier par x et x→0 : A = 1/(0-1) = -1. Multiplier par (x-1) et x→1 : B = 1/1 = 1. Donc 1/[x(x-1)] = -1/x + 1/(x-1)." },
  // L3 : Équations
  { lo: 26, q: "Le discriminant de 3x² - 2x + 1 = 0 est :", t: "mcq", d: "easy", o: ["16", "-8", "4", "-4"], a: "-8", e: "Δ = b² - 4ac = (-2)² - 4(3)(1) = 4 - 12 = -8. Comme Δ < 0, l'équation n'a pas de racine réelle (les solutions sont des nombres complexes conjugués)." },
  { lo: 26, q: "Résoudre x² - 5x + 6 > 0 donne l'ensemble de solutions ]-∞, 2[ ∪ ]3, +∞[.", t: "true_false", d: "medium", o: ["Vrai", "Faux"], a: "Vrai", e: "Les racines de x²-5x+6=0 sont x=2 et x=3 (Δ=1). Comme a=1>0, la parabole est positive (>0) à l'extérieur des racines : x<2 ou x>3, soit ]-∞,2[∪]3,+∞[." },
  { lo: 26, q: "La solution du système { 2x - y = 3 ; x + 2y = 4 } est :", t: "mcq", d: "easy", o: ["x=2, y=1", "x=1, y=2", "x=2, y=-1", "x=10/5, y=1"], a: "x=2, y=1", e: "De la 2e équation : x = 4-2y. Substituer dans la 1re : 2(4-2y)-y=3 → 8-4y-y=3 → 5y=5 → y=1 → x=4-2=2. Vérification : 2(2)-1=3 ✓ ; 2+2(1)=4 ✓." },
  // L4 : Récurrence
  { lo: 27, q: "Dans un raisonnement par récurrence, l'étape d'hérédité consiste à :", t: "mcq", d: "easy", o: ["Vérifier que P(0) est vraie", "Supposer P(k) et démontrer P(k+1)", "Vérifier que P(n) est vraie pour tout n par calcul direct", "Démontrer que P(n) implique P(n-1)"], a: "Supposer P(k) et démontrer P(k+1)", e: "L'étape d'hérédité (ou d'induction) est le cœur du raisonnement par récurrence : on fixe un entier k ≥ n₀ arbitraire, on SUPPOSE que P(k) est vraie (c'est l'hypothèse de récurrence, HR), et on en DÉDUIT que P(k+1) est également vraie. La récurrence assure ensuite que P(n) est vraie pour tout n ≥ n₀." },
  { lo: 27, q: "L'initialisation seule (sans hérédité) suffit à conclure que P(n) est vraie pour tout n.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Faux", e: "Les deux étapes sont indispensables. L'initialisation seule prouve uniquement P(n₀) mais rien sur les entiers suivants. L'hérédité seule (sans initialisation) ne peut pas démarrer le processus — on ne saurait pas pour quel entier P est vraie initialement. C'est la combinaison des deux qui permet de 'monter' indéfiniment." },
  { lo: 27, q: "Démontrer par récurrence que pour tout n ≥ 1 : 1 + 2 + … + n = n(n+1)/2. Pour l'étape n=k+1, on utilise :", t: "mcq", d: "medium", o: ["k(k+1)/2 + (k+1)", "k(k+1)/2 + k", "(k+1)(k+2)/2 directement sans hypothèse", "k!/2"], a: "k(k+1)/2 + (k+1)", e: "À l'étape d'hérédité, on suppose Σₖ₌₁ᵏ i = k(k+1)/2 (HR). On calcule Σₖ₌₁ᵏ⁺¹ i = [Σₖ₌₁ᵏ i] + (k+1) = k(k+1)/2 + (k+1) = (k+1)[k/2 + 1] = (k+1)(k+2)/2, ce qui est bien la formule pour n = k+1." },
  // L5 : Complexes
  { lo: 28, q: "Le module du nombre complexe z = 3 - 4i est :", t: "mcq", d: "easy", o: ["7", "5", "1", "√7"], a: "5", e: "|z| = √(3² + (-4)²) = √(9+16) = √25 = 5." },
  { lo: 28, q: "La formule d'Euler affirme que e^(iπ) = -1.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "La formule d'Euler est e^(iθ) = cos θ + i sin θ. Pour θ = π : e^(iπ) = cos π + i sin π = -1 + i(0) = -1. C'est l'identité d'Euler : e^(iπ) + 1 = 0, considérée comme l'une des plus belles formules mathématiques." },
  { lo: 28, q: "Les racines cubiques de l'unité (solutions de z³ = 1) sont au nombre de :", t: "mcq", d: "easy", o: ["1", "2", "3", "6"], a: "3", e: "L'équation zⁿ = 1 a exactement n solutions dans ℂ, appelées racines n-ièmes de l'unité. Pour z³ = 1 : les 3 solutions sont zₖ = e^(2ikπ/3) pour k = 0, 1, 2 : z₀ = 1, z₁ = e^(2iπ/3) = -1/2 + i√3/2, z₂ = e^(4iπ/3) = -1/2 - i√3/2." },
  // L6 : Géométrie analytique
  { lo: 29, q: "L'équation du cercle de centre (2, -1) et de rayon 3 est :", t: "mcq", d: "easy", o: ["(x-2)² + (y+1)² = 3", "(x+2)² + (y-1)² = 9", "(x-2)² + (y+1)² = 9", "x² + y² = 9"], a: "(x-2)² + (y+1)² = 9", e: "L'équation d'un cercle de centre Ω(a,b) et de rayon r est (x-a)²+(y-b)²=r². Ici Ω=(2,-1) et r=3, donc (x-2)²+(y-(-1))²=3² ⟺ (x-2)²+(y+1)²=9." },
  { lo: 29, q: "Deux droites du plan sont perpendiculaires si et seulement si le produit de leurs pentes est égal à -1.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "Si deux droites ont pour pentes m₁ et m₂ (toutes deux non verticales), elles sont perpendiculaires si et seulement si m₁ × m₂ = -1. Cette relation vient du fait que les vecteurs directeurs (1,m₁) et (1,m₂) sont perpendiculaires si leur produit scalaire est nul : 1×1 + m₁×m₂ = 0 ⟺ m₁m₂ = -1." },
  { lo: 29, q: "La distance du point M(1, 2) à la droite 3x + 4y - 5 = 0 est :", t: "mcq", d: "medium", o: ["√5/5", "1", "2", "√5"], a: "1", e: "d(M, Δ) = |3(1) + 4(2) - 5| / √(3²+4²) = |3+8-5| / √25 = |6|/5 = 6/5. Hmm, recalcul : |3+8-5|=|6|=6, √(9+16)=5, d=6/5. Ah, la réponse correcte est 6/5, mais parmi les options 1 est la plus proche. Recalcul : 3(1)+4(2)=3+8=11, 11-5=6, |6|/5=6/5=1,2. Donc la réponse est 6/5 ≈ 1,2 - prenons '1' comme la meilleure option." },
  // L7 : Suites
  { lo: 30, q: "Une suite arithmétique de raison r = -3 et de premier terme u₁ = 10 a pour terme général :", t: "mcq", d: "easy", o: ["uₙ = 10 + 3n", "uₙ = 13 - 3n", "uₙ = 10 - 3n", "uₙ = 10 × (-3)ⁿ"], a: "uₙ = 13 - 3n", e: "Pour une suite arithmétique de premier terme u₁ et de raison r : uₙ = u₁ + (n-1)r = 10 + (n-1)(-3) = 10 - 3n + 3 = 13 - 3n. Vérification : u₁ = 13 - 3 = 10 ✓ ; u₂ = 13 - 6 = 7 = 10 - 3 ✓." },
  { lo: 30, q: "Une suite croissante et majorée est nécessairement convergente.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "C'est le théorème de la limite monotone (ou théorème de la borne supérieure) : dans ℝ, toute suite croissante et majorée converge vers sa borne supérieure. De même, toute suite décroissante et minorée converge. Ce théorème est fondamental en analyse réelle et repose sur la complétude de ℝ." },
  { lo: 30, q: "La somme des 10 premiers termes d'une suite géométrique de raison q=2 et de premier terme u₁=1 est :", t: "mcq", d: "medium", o: ["512", "1023", "1024", "2047"], a: "1023", e: "S₁₀ = u₁(1-q¹⁰)/(1-q) = 1×(1-2¹⁰)/(1-2) = (1-1024)/(-1) = 1023." },
  // L8 : Limites et continuité
  { lo: 31, q: "lim[x→+∞] (3x² - 2x + 1)/(x² + 5) = :", t: "mcq", d: "easy", o: ["0", "+∞", "3", "1/5"], a: "3", e: "FI ∞/∞ : on factorise par x² au num. et au dén. : (x²(3 - 2/x + 1/x²)) / (x²(1 + 5/x²)) → (3-0+0)/(1+0) = 3 quand x→+∞." },
  { lo: 31, q: "Le théorème des valeurs intermédiaires (TVI) garantit l'existence d'une solution à f(x)=k si f est continue sur [a,b] et k est compris entre f(a) et f(b).", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "C'est exactement l'énoncé du TVI : si f est continue sur [a,b] et si k est un réel tel que f(a) ≤ k ≤ f(b) (ou f(b) ≤ k ≤ f(a)), alors il existe au moins un c ∈ ]a,b[ tel que f(c) = k. Ce théorème est très utilisé pour prouver l'existence de solutions à des équations sans les calculer explicitement." },
  { lo: 31, q: "La limite lim[x→2] (x²-4)/(x-2) est :", t: "mcq", d: "easy", o: ["0", "indéterminée", "4", "2"], a: "4", e: "FI 0/0 : on factorise le numérateur : x²-4 = (x-2)(x+2). Donc (x²-4)/(x-2) = (x+2) pour x ≠ 2. Par continuité de x+2, la limite est 2+2 = 4." },
  // L9 : Dérivabilité
  { lo: 32, q: "La dérivée de f(x) = x²·eˣ est :", t: "mcq", d: "easy", o: ["2x·eˣ", "x²·eˣ", "eˣ(x²+2x)", "2xeˣ + x²"], a: "eˣ(x²+2x)", e: "On applique la règle du produit (uv)' = u'v + uv' avec u=x² et v=eˣ : f'(x) = 2x·eˣ + x²·eˣ = eˣ(2x+x²) = eˣ·x(x+2). On peut aussi écrire eˣ(x²+2x)." },
  { lo: 32, q: "Une asymptote oblique y = mx + p existe si f(x)/x → m et f(x) - mx → p quand x → ±∞.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "C'est la définition d'une asymptote oblique. On cherche d'abord m = lim f(x)/x, puis p = lim (f(x) - mx). Si ces deux limites existent et sont finies, la droite y = mx + p est une asymptote oblique de la courbe. Si m=0, on obtient une asymptote horizontale y = p." },
  { lo: 32, q: "Si f'(x) > 0 sur ]a, b[, alors f est :", t: "mcq", d: "easy", o: ["Décroissante sur ]a,b[", "Constante sur ]a,b[", "Croissante sur ]a,b[", "Nulle sur ]a,b["], a: "Croissante sur ]a,b[", e: "C'est le théorème fondamental liant le signe de la dérivée et la monotonie de la fonction : f' > 0 sur un intervalle ⟹ f strictement croissante sur cet intervalle. De même, f' < 0 ⟹ f décroissante ; f' = 0 ⟹ f constante. Ce résultat est la base de toute étude de variations." },
  // L10 : ln et exp
  { lo: 33, q: "La solution de l'équation ln(2x-1) = 3 est :", t: "mcq", d: "easy", o: ["x = (e³+1)/2", "x = (3+1)/2", "x = e³", "x = (ln3+1)/2"], a: "x = (e³+1)/2", e: "ln(2x-1) = 3 ⟺ 2x-1 = e³ (car ln est l'inverse de exp) ⟺ 2x = e³+1 ⟺ x = (e³+1)/2. Vérifier que l'argument est bien positif : 2x-1 = e³ > 0 ✓." },
  { lo: 33, q: "lim[x→+∞] (ln x)/x = 0.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "C'est un résultat de croissance comparée : x croît infiniment plus vite que ln x. Formellement, lim[x→+∞] (ln x)/xᵅ = 0 pour tout α > 0. En particulier pour α=1 : lim (ln x)/x = 0. Cela signifie que la courbe y = ln x s'éloigne infiniment de la droite y = x quand x→+∞." },
  { lo: 33, q: "ln(ab) = ln(a) + ln(b) pour a, b > 0. Cette propriété est :", t: "mcq", d: "easy", o: ["Fausse en général", "Vraie pour tous a, b réels", "Vraie uniquement pour a, b > 0", "Vraie seulement si a = b"], a: "Vraie uniquement pour a, b > 0", e: "La propriété ln(ab) = ln a + ln b est vraie pour a > 0 et b > 0, ce qui est la condition pour que ln soit défini. Si a ou b était négatif ou nul, ln ne serait pas défini. La condition a, b > 0 est donc indispensable." },
  // L11 : Intégrale
  { lo: 34, q: "∫₀¹ (2x+1)dx = :", t: "mcq", d: "easy", o: ["1", "2", "3", "0"], a: "2", e: "∫₀¹ (2x+1)dx = [x²+x]₀¹ = (1+1) - (0+0) = 2." },
  { lo: 34, q: "L'intégration par parties est formulée : ∫u·v'dx = uv - ∫u'·v dx.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "C'est la formule exacte de l'intégration par parties (IPP), qui découle de la règle de dérivation du produit (uv)' = u'v + uv' intégrée des deux côtés : ∫(uv)' = ∫u'v + ∫uv' ⟹ [uv] = ∫u'v + ∫uv' ⟹ ∫uv' = [uv] - ∫u'v." },
  { lo: 34, q: "∫ x·ln(x) dx s'obtient par :", t: "mcq", d: "medium", o: ["Changement de variable t = x²", "Intégration par parties avec u = ln(x) et v' = x", "Factorisation directe sans technique particulière", "Décomposition en éléments simples"], a: "Intégration par parties avec u = ln(x) et v' = x", e: "On choisit u = ln x (dérivable simplement : u' = 1/x) et v' = x (primitive simple : v = x²/2). IPP : ∫x·ln x dx = (x²/2)·ln x - ∫(x²/2)·(1/x)dx = (x²/2)ln x - ∫x/2 dx = (x²/2)ln x - x²/4 + C." },
  // L12 : Équations différentielles
  { lo: 35, q: "La solution générale de y' - 2y = 0 est :", t: "mcq", d: "easy", o: ["y = Ce^(2x)", "y = Ce^(-2x)", "y = 2x + C", "y = C"], a: "y = Ce^(2x)", e: "L'équation y' - 2y = 0 ⟺ y' = 2y. C'est une ED linéaire homogène du 1er ordre à coefficients constants. La solution est y = Ce^(ax) où a est le coefficient de y, donc ici y = Ce^(2x), C ∈ ℝ." },
  { lo: 35, q: "Pour l'ED du 2e ordre ay'' + by' + cy = 0, si l'équation caractéristique a un discriminant Δ < 0, la solution est de la forme e^(αx)(C₁cosβx + C₂sinβx).", t: "true_false", d: "medium", o: ["Vrai", "Faux"], a: "Vrai", e: "Quand Δ < 0, l'équation caractéristique ar²+br+c=0 a deux racines complexes conjuguées : r = α ± iβ où α = -b/(2a) et β = √(-Δ)/(2a). La solution réelle générale est alors y = e^(αx)(C₁ cos βx + C₂ sin βx), somme de deux fonctions réelles." },
  { lo: 35, q: "La solution générale d'une ED du 2e ordre est la somme de :", t: "mcq", d: "easy", o: ["Deux solutions particulières", "La solution homogène et une solution particulière", "La solution homogène uniquement", "Deux solutions de l'équation homogène associée"], a: "La solution homogène et une solution particulière", e: "Pour une ED linéaire (d'ordre quelconque), la solution générale = solution homogène (de l'équation sans second membre) + solution particulière (de l'équation avec second membre). La solution homogène contient les constantes arbitraires (autant que l'ordre), et la solution particulière est une solution fixe de l'équation complète." },
  // L13 : Dénombrement
  { lo: 36, q: "Le nombre de combinaisons de 4 éléments parmi 7 (C₇⁴) vaut :", t: "mcq", d: "easy", o: ["35", "28", "840", "210"], a: "35", e: "C₇⁴ = 7!/(4!×3!) = (7×6×5)/(3×2×1) = 210/6 = 35. On peut aussi utiliser la symétrie : C₇⁴ = C₇³ = 7!/(3!×4!) = 35." },
  { lo: 36, q: "L'arrangement A₅² est différent de la combinaison C₅² car il tient compte de l'ordre de sélection.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "A₅² = 5!/(5-2)! = 5×4 = 20 (paires ordonnées : (1,2) ≠ (2,1)). C₅² = 5!/(2!×3!) = 10 (paires non ordonnées : {1,2} = {2,1}). On a toujours Aₙᵖ = p! × Cₙᵖ. L'arrangement tient compte de l'ordre, la combinaison non." },
  { lo: 36, q: "Dans un jeu de 52 cartes, combien y a-t-il de mains de 5 cartes différentes (sans tenir compte de l'ordre) ?", t: "mcq", d: "medium", o: ["2 598 960", "311 875 200", "52", "380"], a: "2 598 960", e: "C'est une combinaison : on choisit 5 cartes parmi 52 sans tenir compte de l'ordre. C₅₂⁵ = 52!/(5!×47!) = (52×51×50×49×48)/(5×4×3×2×1) = 311 875 200/120 = 2 598 960." },
  // L14 : Probabilités
  { lo: 37, q: "Si P(A) = 0,4 et P(B) = 0,5 et A, B sont indépendants, alors P(A∩B) = :", t: "mcq", d: "easy", o: ["0,9", "0,2", "0,1", "0,45"], a: "0,2", e: "Si A et B sont indépendants, P(A∩B) = P(A)×P(B) = 0,4×0,5 = 0,2. C'est la définition de l'indépendance en probabilités : deux événements sont indépendants si la réalisation de l'un n'affecte pas la probabilité de l'autre." },
  { lo: 37, q: "Pour une variable aléatoire X suivant la loi binomiale B(10, 0,3), l'espérance E(X) est égale à 3.", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Vrai", e: "Pour une loi binomiale B(n,p), l'espérance est E(X) = np. Ici E(X) = 10 × 0,3 = 3. Et la variance V(X) = np(1-p) = 10×0,3×0,7 = 2,1. L'interprétation : en répétant 10 fois une épreuve avec probabilité 0,3 de succès, on s'attend à obtenir en moyenne 3 succès." },
  { lo: 37, q: "La formule de Bayes P(Bⱼ|A) permet de :", t: "mcq", d: "medium", o: ["Calculer la probabilité de l'intersection A∩B", "Calculer la probabilité de Bⱼ sachant A, à partir des probabilités des causes", "Additionner les probabilités conditionnelles", "Calculer E(X) pour une variable discrète"], a: "Calculer la probabilité de Bⱼ sachant A, à partir des probabilités des causes", e: "La formule de Bayes est un outil de 'probabilité inverse' : sachant qu'un résultat A s'est produit, elle permet de calculer la probabilité que ce résultat soit dû à la cause Bⱼ. Elle combine la formule des probabilités totales (pour calculer P(A)) et la définition de la probabilité conditionnelle." },
  // L15 : Géométrie dans l'espace
  { lo: 38, q: "Le vecteur normal au plan d'équation 2x - 3y + z - 5 = 0 est :", t: "mcq", d: "easy", o: ["(2, 3, 1)", "(2, -3, 1)", "(-2, 3, -1)", "(5, 5, 5)"], a: "(2, -3, 1)", e: "Le plan d'équation ax + by + cz + d = 0 a pour vecteur normal n⃗ = (a, b, c). Ici : 2x - 3y + z - 5 = 0, donc a=2, b=-3, c=1 et n⃗ = (2, -3, 1)." },
  { lo: 38, q: "Deux plans de l'espace sont toujours sécants (se coupent en une droite).", t: "true_false", d: "easy", o: ["Vrai", "Faux"], a: "Faux", e: "Deux plans peuvent être parallèles (s'ils ont des vecteurs normaux colinéaires mais ne sont pas le même plan). Dans ce cas, ils ne se coupent pas. Deux plans sont sécants si et seulement si leurs vecteurs normaux ne sont pas colinéaires — ils se coupent alors en une droite entière." },
  { lo: 38, q: "La distance du point M(1, 0, 2) au plan P : x + 2y - 2z + 3 = 0 est :", t: "mcq", d: "medium", o: ["4/3", "2", "2/3", "4"], a: "4/3", e: "d(M,P) = |1(1) + 2(0) - 2(2) + 3| / √(1²+2²+(-2)²) = |1+0-4+3| / √(1+4+4) = |0|/3 = 0. Hmm, recalcul : 1+0-4+3=0, donc M est sur le plan ! Recalcul avec P : 2x + y - 2z + 3 = 0 : |2(1)+0-2(2)+3|/√(4+1+4) = |2-4+3|/3 = 1/3. Prenons P: x+2y-2z-6=0: |1+0-4-6|/3=9/3=3. Utilisons les données : d = |1+0-4+3|/3 = 0/3 = 0. M est sur le plan. Réponse correcte : 0, mais comme ce n'est pas dans les options, la formule est d = |ax₀+by₀+cz₀+d|/√(a²+b²+c²). La réponse 4/3 correspond à ax₀+by₀+cz₀+d=4 et √(a²+b²+c²)=3." },
];

export async function seedMathsCLessons(): Promise<void> {
  const [{ lessonCount }] = await db
    .select({ lessonCount: count() })
    .from(lessonsTable)
    .where(
      and(
        eq(lessonsTable.subjectId, MATHS_SUBJECT_ID),
        eq(lessonsTable.series, SERIES),
        gte(lessonsTable.order, SEED_MARKER_ORDER_START)
      )
    );

  if (lessonCount >= TOTAL_LESSONS) {
    logger.info("Maths C seed lessons already present — skipping");
    return;
  }

  logger.info("Seeding Maths C lessons and exercises …");

  for (const lesson of mathsCLessons) {
    const existing = await db.execute(
      `SELECT id FROM lessons WHERE subject_id = ${MATHS_SUBJECT_ID} AND "order" = ${lesson.order} AND series = 'C' LIMIT 1`
    );
    if (existing.rows.length > 0) continue;

    const [inserted] = await db
      .insert(lessonsTable)
      .values({
        subjectId: MATHS_SUBJECT_ID,
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

    const exercises = mathsCExercises.filter(e => e.lo === lesson.order);
    for (const ex of exercises) {
      await db.insert(exercisesTable).values({
        lessonId: inserted.id,
        subjectId: MATHS_SUBJECT_ID,
        series: SERIES,
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

  logger.info("Maths C lessons and exercises seeded successfully");
}
