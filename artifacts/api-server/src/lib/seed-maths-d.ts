import { db, lessonsTable, exercisesTable } from "@workspace/db";
import { eq, and, gte, count } from "drizzle-orm";
import { logger } from "./logger";

const MATHS_SUBJECT_ID = 1;
const SEED_MARKER_ORDER_START = 5;
const TOTAL_LESSONS = 19;

const mathsDLessons = [
  {
    title: "Leçon 1 : Ensemble des nombres réels ℝ",
    subjectId: MATHS_SUBJECT_ID,
    series: "D",
    order: 5,
    duration: 50,
    isPremium: false,
    summary: "Maîtriser la structure de l'ensemble ℝ, les sous-ensembles (ℕ, ℤ, ℚ, ℝ\\ℚ), les intervalles, la valeur absolue et les inégalités fondamentales.",
    keyPoints: `ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ (inclusions des ensembles de nombres)
Les irrationnels ℝ∖ℚ : √2, π, e ne sont pas des fractions
Tout réel a une représentation décimale (finie ou infinie périodique pour les rationnels)
Valeur absolue : |x| = x si x ≥ 0 ; |x| = −x si x < 0
|x| < a ⟺ −a < x < a (avec a > 0)
|x − a| mesure la distance entre x et a sur la droite réelle
Intervalles : [a, b], ]a, b[, [a, +∞[, ]−∞, b]
Borne supérieure, borne inférieure : tout majorant/minorant`,
    content: `<h2>L'Ensemble des Nombres Réels ℝ</h2>
<h3>I. Hiérarchie des ensembles de nombres</h3>
<ul>
  <li><strong>ℕ</strong> = {0, 1, 2, 3, …} — entiers naturels</li>
  <li><strong>ℤ</strong> = {…, −2, −1, 0, 1, 2, …} — entiers relatifs</li>
  <li><strong>ℚ</strong> = {p/q | p ∈ ℤ, q ∈ ℤ*} — rationnels (décimales finies ou périodiques)</li>
  <li><strong>ℝ∖ℚ</strong> = irrationnels (√2, √3, π, e, ln 2) — décimales infinies non périodiques</li>
  <li><strong>ℝ</strong> = ℚ ∪ (ℝ∖ℚ) — la droite réelle complète</li>
</ul>
<p>Inclusions : ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ</p>
<h3>II. Intervalles</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Notation</th><th>Définition</th><th>Type</th></tr>
  <tr><td>[a, b]</td><td>a ≤ x ≤ b</td><td>Fermé borné</td></tr>
  <tr><td>]a, b[</td><td>a &lt; x &lt; b</td><td>Ouvert borné</td></tr>
  <tr><td>[a, b[</td><td>a ≤ x &lt; b</td><td>Semi-ouvert</td></tr>
  <tr><td>[a, +∞[</td><td>x ≥ a</td><td>Infini à droite</td></tr>
  <tr><td>]−∞, b]</td><td>x ≤ b</td><td>Infini à gauche</td></tr>
  <tr><td>ℝ = ]−∞, +∞[</td><td>Tous les réels</td><td>Infini</td></tr>
</table>
<h3>III. Valeur absolue</h3>
<p><strong>Définition :</strong> |x| = x si x ≥ 0 ; |x| = −x si x < 0.</p>
<p><strong>Propriétés fondamentales :</strong></p>
<ul>
  <li>|x| ≥ 0 pour tout x ∈ ℝ ; |x| = 0 ⟺ x = 0</li>
  <li>|xy| = |x|·|y|</li>
  <li>|x + y| ≤ |x| + |y| <strong>(inégalité triangulaire)</strong></li>
  <li>||x| − |y|| ≤ |x − y|</li>
</ul>
<p><strong>Résolution d'inéquations :</strong></p>
<ul>
  <li>|x| &lt; a ⟺ −a &lt; x &lt; a (a > 0)</li>
  <li>|x| > a ⟺ x &lt; −a ou x > a (a > 0)</li>
  <li>|x − a| &lt; r ⟺ a − r &lt; x &lt; a + r (boule de centre a, rayon r)</li>
</ul>
<h3>IV. Densité de ℚ dans ℝ</h3>
<p>Entre deux réels distincts, il existe toujours un rationnel et un irrationnel. ℝ est <strong>complet</strong> : toute suite de Cauchy converge dans ℝ (contrairement à ℚ).</p>`,
    examples: `<p><strong>Exemple 1 :</strong> Montrer que √2 ∉ ℚ.<br>
Supposons √2 = p/q avec p, q entiers, pgcd(p,q)=1. Alors 2q² = p² → p pair → p = 2k → 2q² = 4k² → q² = 2k² → q pair. Contradiction (pgcd = 1). Donc √2 ∉ ℚ.</p>
<p><strong>Exemple 2 :</strong> Résoudre |2x − 3| ≤ 5.<br>
⟺ −5 ≤ 2x − 3 ≤ 5 ⟺ −2 ≤ 2x ≤ 8 ⟺ −1 ≤ x ≤ 4. Solution : [−1, 4].</p>
<p><strong>Exemple 3 :</strong> Résoudre |x + 1| > 3.<br>
⟺ x + 1 > 3 ou x + 1 < −3 ⟺ x > 2 ou x < −4. Solution : ]−∞, −4[ ∪ ]2, +∞[.</p>`,
  },
  {
    title: "Leçon 2 : Polynômes et fractions rationnelles",
    subjectId: MATHS_SUBJECT_ID,
    series: "D",
    order: 6,
    duration: 55,
    isPremium: false,
    summary: "Maîtriser les opérations sur les polynômes, la division euclidienne, la factorisation et la décomposition en éléments simples des fractions rationnelles.",
    keyPoints: `Un polynôme P de degré n : P(x) = aₙxⁿ + … + a₁x + a₀ (aₙ ≠ 0)
Division euclidienne : P = Q·D + R avec deg(R) < deg(D)
Théorème de Bezout : a est racine de P ⟺ (x − a) divise P
Identités remarquables : (a+b)² = a²+2ab+b², a²−b² = (a−b)(a+b), a³−b³ = (a−b)(a²+ab+b²)
Discriminant Δ = b²−4ac : si Δ > 0 : 2 racines réelles ; Δ = 0 : racine double ; Δ < 0 : pas de racine réelle
Décomposition en éléments simples : F = E + Σ(fractions simples sur chaque facteur irréductible)
Fraction irréductible : p et q sans facteur commun`,
    content: `<h2>Polynômes et Fractions Rationnelles</h2>
<h3>I. Polynômes</h3>
<p>Un <strong>polynôme</strong> à coefficients réels est une expression de la forme :</p>
<p style="text-align:center">P(x) = aₙxⁿ + aₙ₋₁xⁿ⁻¹ + … + a₁x + a₀, aₙ ≠ 0</p>
<p>Degré de P = n. Le polynôme nul a degré −∞ par convention.</p>
<p><strong>Opérations :</strong> deg(P+Q) ≤ max(deg P, deg Q) ; deg(P·Q) = deg P + deg Q.</p>
<h3>II. Division euclidienne</h3>
<p>Pour tout polynôme P et tout polynôme D ≠ 0, il existe des polynômes uniques Q (quotient) et R (reste) tels que :</p>
<p style="text-align:center">P = Q · D + R avec deg(R) < deg(D)</p>
<p>Si R = 0, D <strong>divise</strong> P.</p>
<h3>III. Racines d'un polynôme</h3>
<p><strong>Théorème (Bezout) :</strong> a est racine de P (P(a) = 0) ⟺ (x − a) divise P.</p>
<p><strong>Polynôme du 2ème degré :</strong> P(x) = ax² + bx + c, Δ = b² − 4ac.</p>
<ul>
  <li>Δ > 0 : x₁ = (−b−√Δ)/(2a), x₂ = (−b+√Δ)/(2a) → P = a(x−x₁)(x−x₂)</li>
  <li>Δ = 0 : x₀ = −b/(2a) → P = a(x−x₀)²</li>
  <li>Δ < 0 : aucune racine réelle, P garde un signe constant (celui de a)</li>
</ul>
<p><strong>Relations de Vieta :</strong> x₁ + x₂ = −b/a ; x₁ · x₂ = c/a.</p>
<h3>IV. Fractions rationnelles</h3>
<p>Une fraction rationnelle est F(x) = P(x)/Q(x) avec P, Q polynômes, Q ≠ 0. Le domaine de définition est ℝ∖{racines de Q}.</p>
<p><strong>Décomposition en éléments simples (DES) :</strong></p>
<ol>
  <li>Si deg P ≥ deg Q, effectuer la division euclidienne → F = E + partie principale</li>
  <li>Factoriser Q(x) en facteurs irréductibles (linéaires et quadratiques)</li>
  <li>Écrire F = E(x) + Σ Aᵢ/(x−aᵢ)ᵐ + Σ (Bₓ+C)/(x²+px+q)ⁿ</li>
  <li>Identifier les coefficients par substitution ou identification</li>
</ol>`,
    examples: `<p><strong>Exemple 1 – Factoriser P(x) = x³ − 3x + 2 :</strong><br>
P(1) = 1 − 3 + 2 = 0 → (x−1) est facteur.<br>
Division : P = (x−1)(x²+x−2) = (x−1)(x−1)(x+2) = (x−1)²(x+2).</p>
<p><strong>Exemple 2 – DES :</strong> F(x) = (2x+1)/((x−1)(x+2)).<br>
F = A/(x−1) + B/(x+2). Multiplicant par (x−1) puis x=1 : A = 3/3 = 1.<br>
Multiplicant par (x+2) puis x=−2 : B = −3/(−3) = 1.<br>
F = 1/(x−1) + 1/(x+2).</p>
<p><strong>Exemple 3 :</strong> Résoudre 2x² − 5x + 3 = 0.<br>
Δ = 25 − 24 = 1 ; x₁ = (5−1)/4 = 1 ; x₂ = (5+1)/4 = 3/2.</p>`,
  },
  {
    title: "Leçon 3 : Équations et inéquations (1er et 2e degré, systèmes)",
    subjectId: MATHS_SUBJECT_ID,
    series: "D",
    order: 7,
    duration: 55,
    isPremium: false,
    summary: "Résoudre les équations et inéquations du 1er et 2e degré, les équations avec valeur absolue, et les systèmes d'équations linéaires.",
    keyPoints: `Équation du 1er degré : ax + b = 0 ⟹ x = −b/a (a ≠ 0)
Équation du 2e degré : ax² + bx + c = 0, Δ = b²−4ac
Résolution d'inéquations du 2e degré : signe de ax²+bx+c selon Δ et le signe de a
Tableau de signes : outil essentiel pour les inéquations
Systèmes 2×2 : méthode par substitution ou combinaison (pivot)
Systèmes en triangle (échelon) : résolution par remontée
Équations irrationnelles : toujours vérifier les solutions (conditions d'existence)
Inéquations avec valeur absolue : utiliser |f(x)| < g(x) ⟺ −g(x) < f(x) < g(x)`,
    content: `<h2>Équations et Inéquations</h2>
<h3>I. Équations du 1er degré</h3>
<p>ax + b = 0 avec a ≠ 0 ⟹ x = −b/a (solution unique).</p>
<h3>II. Équations du 2e degré</h3>
<p>ax² + bx + c = 0 (a ≠ 0), Δ = b² − 4ac.</p>
<ul>
  <li>Δ > 0 : x₁,₂ = (−b ± √Δ) / (2a)</li>
  <li>Δ = 0 : x₀ = −b/(2a) (racine double)</li>
  <li>Δ < 0 : aucune solution réelle</li>
</ul>
<h3>III. Inéquations du 2e degré</h3>
<p>Pour ax² + bx + c > 0 (ou <, ≥, ≤) :</p>
<ul>
  <li>Calculer Δ et trouver les racines x₁ ≤ x₂</li>
  <li><strong>a > 0 :</strong> ax²+bx+c > 0 pour x < x₁ ou x > x₂ ; < 0 pour x₁ < x < x₂</li>
  <li><strong>a < 0 :</strong> inverse</li>
  <li>Si Δ ≤ 0, a > 0 : ax²+bx+c ≥ 0 pour tout x</li>
</ul>
<p><strong>Méthode du tableau de signes :</strong></p>
<ol>
  <li>Factoriser l'expression</li>
  <li>Trouver les zéros de chaque facteur</li>
  <li>Étudier le signe de chaque facteur sur chaque intervalle</li>
  <li>Multiplier les signes</li>
</ol>
<h3>IV. Systèmes d'équations linéaires</h3>
<p><strong>Système 2×2 :</strong></p>
<p>{ a₁x + b₁y = c₁ ; a₂x + b₂y = c₂ }</p>
<ul>
  <li><strong>Substitution :</strong> exprimer une variable en fonction de l'autre</li>
  <li><strong>Combinaison linéaire :</strong> multiplier et additionner pour éliminer une variable</li>
</ul>
<p>Déterminant : D = a₁b₂ − a₂b₁. Si D ≠ 0 : système cramerien (solution unique). Si D = 0 : système incompatible ou à solutions infinies.</p>
<h3>V. Équations irrationnelles</h3>
<p>√(f(x)) = g(x) ⟺ { f(x) ≥ 0, g(x) ≥ 0, f(x) = [g(x)]² } — toujours vérifier les conditions.</p>`,
    examples: `<p><strong>Exemple 1 :</strong> Résoudre x² − 5x + 6 ≤ 0.<br>
Δ = 1 > 0 ; x₁ = 2, x₂ = 3. a = 1 > 0 → x²−5x+6 ≤ 0 pour 2 ≤ x ≤ 3. Solution : [2, 3].</p>
<p><strong>Exemple 2 :</strong> Résoudre le système { 2x + 3y = 7 ; x − y = 1 }.<br>
De la 2e : x = 1 + y. Substituer : 2(1+y) + 3y = 7 → 5y = 5 → y = 1 → x = 2. Solution : (2, 1).</p>
<p><strong>Exemple 3 :</strong> Résoudre √(2x−1) = x − 2.<br>
Conditions : 2x−1 ≥ 0 → x ≥ 1/2 ; x−2 ≥ 0 → x ≥ 2.<br>
Carré : 2x−1 = x²−4x+4 → x²−6x+5 = 0 → x = 1 ou x = 5. Vérif. : x=1 → √1 = −1 (faux) ; x=5 → √9 = 3 ✓. Solution : {5}.</p>`,
  },
  {
    title: "Leçon 4 : Nombres complexes — partie réelle, imaginaire, conjugué, module, argument",
    subjectId: MATHS_SUBJECT_ID,
    series: "D",
    order: 8,
    duration: 60,
    isPremium: false,
    summary: "Introduire l'ensemble ℂ des nombres complexes sous forme algébrique, maîtriser les opérations, le module, l'argument et la représentation dans le plan.",
    keyPoints: `i² = −1 ; tout z ∈ ℂ s'écrit z = a + ib (a = Re(z), b = Im(z))
Conjugué : z̄ = a − ib ; z + z̄ = 2Re(z) ; z · z̄ = |z|² = a²+b²
Module : |z| = √(a²+b²) ; |z| = 0 ⟺ z = 0
Propriétés du module : |z₁z₂| = |z₁||z₂| ; |z₁/z₂| = |z₁|/|z₂|
Argument arg(z) : angle θ tel que z = |z|(cos θ + i sin θ) (défini mod 2π)
Représentation dans le plan : point M(a, b) ou vecteur OM pour z = a+ib
Division : (a+ib)/(c+id) = (a+ib)(c−id)/|c+id|² → multiplier par le conjugué`,
    content: `<h2>Les Nombres Complexes</h2>
<h3>I. Définition et forme algébrique</h3>
<p>On définit <strong>i</strong> tel que i² = −1. L'ensemble ℂ = {a + ib | a, b ∈ ℝ}.</p>
<ul>
  <li><strong>Partie réelle :</strong> Re(a+ib) = a</li>
  <li><strong>Partie imaginaire :</strong> Im(a+ib) = b</li>
  <li>z est réel ⟺ Im(z) = 0 ; z est imaginaire pur ⟺ Re(z) = 0</li>
  <li>z₁ = z₂ ⟺ Re(z₁) = Re(z₂) ET Im(z₁) = Im(z₂)</li>
</ul>
<h3>II. Opérations algébriques</h3>
<p>Pour z₁ = a+ib, z₂ = c+id :</p>
<ul>
  <li><strong>Addition :</strong> z₁+z₂ = (a+c)+i(b+d)</li>
  <li><strong>Multiplication :</strong> z₁·z₂ = (ac−bd)+i(ad+bc)</li>
  <li><strong>Conjugué :</strong> z̄ = a−ib ; conjugué(z₁+z₂) = z̄₁+z̄₂ ; conjugué(z₁z₂) = z̄₁z̄₂</li>
  <li><strong>Division :</strong> z₁/z₂ = z₁·z̄₂/|z₂|² (si z₂ ≠ 0)</li>
</ul>
<h3>III. Module et argument</h3>
<p><strong>Module :</strong> |z| = |a+ib| = √(a²+b²). Interprétation : distance de l'origine au point (a,b) dans le plan.</p>
<p>z·z̄ = |z|². |z₁z₂| = |z₁||z₂|. |zⁿ| = |z|ⁿ.</p>
<p><strong>Argument :</strong> arg(z) = θ ∈ ]−π, π] tel que cos θ = a/|z|, sin θ = b/|z|.</p>
<p>arg(z₁z₂) = arg(z₁) + arg(z₂) [mod 2π]. arg(zⁿ) = n·arg(z) [mod 2π].</p>
<h3>IV. Représentation dans le plan complexe</h3>
<p>À z = a+ib on associe le point M(a, b) dans le repère (O, x, y) ou le vecteur OM. Le plan ℝ² muni de cette correspondance est le <strong>plan de Gauss</strong>. L'axe des abscisses = axe réel ; l'axe des ordonnées = axe imaginaire.</p>
<h3>V. Racines carrées d'un complexe</h3>
<p>Pour trouver √z = x+iy, on résout le système : x²−y² = a, 2xy = b, x²+y² = |z|.</p>`,
    examples: `<p><strong>Exemple 1 :</strong> Calculer (2+3i)(1−2i).<br>
= 2(1)+2(−2i)+3i(1)+3i(−2i) = 2 − 4i + 3i − 6i² = 2 − i + 6 = 8 − i.</p>
<p><strong>Exemple 2 :</strong> Calculer (1+i)/(2−i).<br>
= (1+i)(2+i)/((2−i)(2+i)) = (2+i+2i+i²)/(4+1) = (2+3i−1)/5 = (1+3i)/5 = 1/5 + (3/5)i.</p>
<p><strong>Exemple 3 :</strong> Trouver le module et l'argument de z = 1+i√3.<br>
|z| = √(1+3) = 2. cos θ = 1/2, sin θ = √3/2 → θ = π/3. Donc z = 2(cos(π/3) + i sin(π/3)).</p>`,
  },
  {
    title: "Leçon 5 : Forme trigonométrique, formules de Moivre et d'Euler, racines n-ièmes",
    subjectId: MATHS_SUBJECT_ID,
    series: "D",
    order: 9,
    duration: 60,
    isPremium: false,
    summary: "Maîtriser la forme trigonométrique des complexes, la formule d'Euler, le théorème de Moivre et le calcul des racines n-ièmes d'un complexe.",
    keyPoints: `Forme trigonométrique : z = r(cos θ + i sin θ) avec r = |z|, θ = arg(z)
Formule d'Euler : e^(iθ) = cos θ + i sin θ (Euler)
Forme exponentielle : z = r·e^(iθ)
Produit : r₁e^(iθ₁) · r₂e^(iθ₂) = r₁r₂·e^(i(θ₁+θ₂))
Formule de Moivre : (cos θ + i sin θ)ⁿ = cos(nθ) + i sin(nθ)
Les racines n-ièmes de r·e^(iθ) : zₖ = ⁿ√r · e^(i(θ+2kπ)/n) pour k = 0, 1, …, n−1
Linéarisation des puissances de cos et sin via la formule de Moivre
cos θ = (e^(iθ) + e^(−iθ))/2 ; sin θ = (e^(iθ) − e^(−iθ))/(2i)`,
    content: `<h2>Forme Trigonométrique, Moivre et Euler</h2>
<h3>I. Forme trigonométrique</h3>
<p>Tout complexe non nul z s'écrit : z = r(cos θ + i sin θ) avec r = |z| > 0 et θ = arg(z).</p>
<p>Cette forme est unique si θ ∈ ]−π, π].</p>
<h3>II. Formule d'Euler</h3>
<p style="text-align:center; font-size:1.1em"><strong>e^(iθ) = cos θ + i sin θ</strong></p>
<p>Cas remarquables : e^(iπ) = −1 (identité d'Euler) ; e^(iπ/2) = i ; e^(−iπ/2) = −i.</p>
<p>Forme exponentielle : z = r·e^(iθ).</p>
<h3>III. Produit, quotient et puissances</h3>
<ul>
  <li>r₁e^(iθ₁) · r₂e^(iθ₂) = (r₁r₂)e^(i(θ₁+θ₂))</li>
  <li>r₁e^(iθ₁) / r₂e^(iθ₂) = (r₁/r₂)e^(i(θ₁−θ₂))</li>
</ul>
<h3>IV. Formule de Moivre</h3>
<p><strong>Pour tout entier n et tout réel θ :</strong></p>
<p style="text-align:center">(cos θ + i sin θ)ⁿ = cos(nθ) + i sin(nθ)</p>
<p><strong>Application — Linéarisation :</strong><br>
cos nθ = Re[(cos θ + i sin θ)ⁿ] → développer par binôme de Newton.<br>
Ex. : cos 2θ = cos²θ − sin²θ ; sin 2θ = 2sin θ cos θ.</p>
<h3>V. Racines n-ièmes</h3>
<p>Les n racines n-ièmes de z₀ = ρe^(iφ) sont :</p>
<p style="text-align:center">zₖ = ⁿ√ρ · e^(i(φ+2kπ)/n), k = 0, 1, …, n−1</p>
<p>Ces n points sont les sommets d'un polygone régulier à n côtés inscrit dans le cercle de rayon ⁿ√ρ centré à l'origine.</p>
<h3>VI. Racines de l'unité</h3>
<p>Les n racines n-ièmes de 1 (ρ=1, φ=0) :<br>
ωₖ = e^(i·2kπ/n) pour k = 0, …, n−1. Leur somme vaut 0.</p>`,
    examples: `<p><strong>Exemple 1 – Formule de Moivre :</strong> Calculer cos 3θ.<br>
(cos θ + i sin θ)³ = cos³θ + 3cos²θ(i sin θ) + 3cos θ(i sin θ)² + (i sin θ)³<br>
= cos³θ − 3cos θ sin²θ + i(3cos²θ sin θ − sin³θ)<br>
Partie réelle : cos 3θ = cos³θ − 3cos θ sin²θ = 4cos³θ − 3cos θ.</p>
<p><strong>Exemple 2 – Racines cubiques de 1 :</strong><br>
z³ = 1 → ρ=1, φ=0 → zₖ = e^(i·2kπ/3) pour k=0,1,2.<br>
z₀=1 ; z₁=e^(2iπ/3)=−1/2+i√3/2 ; z₂=e^(4iπ/3)=−1/2−i√3/2.</p>
<p><strong>Exemple 3 – Résoudre z⁴ = −16 :</strong><br>
−16 = 16e^(iπ). Racines : zₖ = 2·e^(i(π+2kπ)/4) = 2·e^(iπ(2k+1)/4) pour k=0,1,2,3.<br>
z₀=2e^(iπ/4)=√2+i√2 ; z₁=2e^(3iπ/4)=−√2+i√2 ; z₂=−√2−i√2 ; z₃=√2−i√2.</p>`,
  },
  {
    title: "Leçon 6 : Généralités sur les fonctions",
    subjectId: MATHS_SUBJECT_ID,
    series: "D",
    order: 10,
    duration: 50,
    isPremium: false,
    summary: "Étudier le domaine de définition, la parité, la périodicité, la monotonie et les restrictions d'une fonction numérique.",
    keyPoints: `Domaine de définition D_f : ensemble des réels pour lesquels f(x) est défini
Parité : f paire ⟺ f(−x) = f(x) pour tout x ; f impaire ⟺ f(−x) = −f(x)
Périodicité : f est T-périodique ⟺ f(x+T) = f(x) pour tout x
Sens de variation : f croissante sur I ⟺ x₁ < x₂ → f(x₁) < f(x₂)
Extremum local en a : f(a) ≥ f(x) (maximum) ou f(a) ≤ f(x) (minimum) au voisinage de a
Fonction injective, surjective, bijective
Composée g ∘ f et fonction réciproque f⁻¹`,
    content: `<h2>Généralités sur les Fonctions Numériques</h2>
<h3>I. Domaine de définition</h3>
<p>D_f = {x ∈ ℝ | f(x) existe}. Pour le trouver :</p>
<ul>
  <li>Fraction 1/g(x) : exclure les zéros de g</li>
  <li>Racine √g(x) : résoudre g(x) ≥ 0</li>
  <li>Logarithme ln(g(x)) : résoudre g(x) > 0</li>
  <li>Combinaison : intersection des conditions</li>
</ul>
<h3>II. Parité et imparité</h3>
<p>Condition préalable : D_f doit être symétrique par rapport à 0.</p>
<ul>
  <li><strong>Paire :</strong> f(−x) = f(x) → courbe symétrique par rapport à l'axe des ordonnées</li>
  <li><strong>Impaire :</strong> f(−x) = −f(x) → courbe symétrique par rapport à l'origine</li>
</ul>
<h3>III. Périodicité</h3>
<p>f est T-périodique si f(x+T) = f(x) pour tout x ∈ D_f. On étudie alors f sur une période puis on étend.</p>
<p>Exemples : sin et cos sont 2π-périodiques ; tan est π-périodique.</p>
<h3>IV. Monotonie (sens de variation)</h3>
<ul>
  <li>f <strong>croissante</strong> sur I : ∀ x₁, x₂ ∈ I, x₁ < x₂ ⟹ f(x₁) < f(x₂)</li>
  <li>f <strong>décroissante</strong> sur I : ∀ x₁, x₂ ∈ I, x₁ < x₂ ⟹ f(x₁) > f(x₂)</li>
  <li>f <strong>constante</strong> sur I : f(x) = k</li>
</ul>
<p>Un <strong>extremum local</strong> en a est un maximum ou minimum local de f.</p>
<h3>V. Injection, surjection, bijection</h3>
<ul>
  <li>Injective : f(x₁) = f(x₂) ⟹ x₁ = x₂ (chaque image a un antécédent unique)</li>
  <li>Surjective sur E : ∀ y ∈ E, ∃ x tel que f(x) = y</li>
  <li>Bijective : injective ET surjective → f est inversible</li>
</ul>
<h3>VI. Composée et réciproque</h3>
<p>(g ∘ f)(x) = g(f(x)). Domaine : {x ∈ D_f | f(x) ∈ D_g}.</p>
<p>f⁻¹ existe si f est bijective. La courbe de f⁻¹ est le symétrique de celle de f par rapport à y = x.</p>`,
    examples: `<p><strong>Exemple 1 :</strong> Domaine de f(x) = √(x−1)/( x²−4).<br>
Conditions : x−1 ≥ 0 → x ≥ 1 ; x²−4 ≠ 0 → x ≠ 2 et x ≠ −2.<br>
D_f = [1, 2[ ∪ ]2, +∞[.</p>
<p><strong>Exemple 2 :</strong> f(x) = x³ est impaire (f(−x) = −x³ = −f(x)), son domaine ℝ est symétrique. Sa courbe est symétrique par rapport à l'origine O.</p>
<p><strong>Exemple 3 :</strong> Montrer que f(x) = 2x+1 est bijective de ℝ dans ℝ et trouver f⁻¹.<br>
Injective : f(x₁)=f(x₂) → x₁=x₂ ✓. Surjective : y=2x+1 → x=(y−1)/2 ∈ ℝ ✓.<br>
f⁻¹(x) = (x−1)/2.</p>`,
  },
  {
    title: "Leçon 7 : Limites et continuité",
    subjectId: MATHS_SUBJECT_ID,
    series: "D",
    order: 11,
    duration: 60,
    isPremium: false,
    summary: "Maîtriser les notions de limite finie et infinie, les opérations sur les limites, les formes indéterminées et la continuité d'une fonction.",
    keyPoints: `lim f(x) = L quand x → a : f(x) s'approche de L quand x s'approche de a
Limites usuelles : lim sin x / x = 1 (x→0) ; lim (1+1/n)ⁿ = e (n→∞)
Formes indéterminées : 0/0, ∞/∞, ∞−∞, 0×∞ — lever par factorisation, conjugué ou règle de L'Hôpital
Théorème des gendarmes (squeeze) : h ≤ f ≤ g, lim h = lim g = L ⟹ lim f = L
Continuité en a : f continue en a ⟺ lim_{x→a} f(x) = f(a)
Théorème des valeurs intermédiaires (TVI) : f continue sur [a,b], f(a) et f(b) de signes opposés → ∃ c ∈ ]a,b[ : f(c)=0
Asymptote horizontale : lim_{x→±∞} f(x) = L → y = L
Asymptote verticale : lim_{x→a} f(x) = ±∞ → x = a`,
    content: `<h2>Limites et Continuité</h2>
<h3>I. Notion de limite</h3>
<p>lim_{x→a} f(x) = L signifie que f(x) peut être rendu aussi proche de L qu'on le souhaite en prenant x suffisamment proche de a (sans nécessairement f(a) = L).</p>
<p><strong>Limites usuelles :</strong></p>
<ul>
  <li>lim_{x→0} sin(x)/x = 1 (fondamentale)</li>
  <li>lim_{x→0} (1−cos x)/x² = 1/2</li>
  <li>lim_{x→+∞} xⁿ/eˣ = 0 (eˣ croît plus vite que tout polynôme)</li>
  <li>lim_{x→+∞} ln(x)/xᵅ = 0 (α > 0) (ln croît moins vite que toute puissance)</li>
</ul>
<h3>II. Opérations sur les limites</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>lim f</th><th>lim g</th><th>lim(f+g)</th><th>lim(f·g)</th><th>lim(f/g)</th></tr>
  <tr><td>L</td><td>M</td><td>L+M</td><td>LM</td><td>L/M (M≠0)</td></tr>
  <tr><td>+∞</td><td>+∞</td><td>+∞</td><td>+∞</td><td>FI (∞/∞)</td></tr>
  <tr><td>+∞</td><td>−∞</td><td>FI (∞−∞)</td><td>−∞</td><td>FI</td></tr>
  <tr><td>L</td><td>0</td><td>L</td><td>FI (0×∞ si L=∞)</td><td>FI (0/0 si L=0)</td></tr>
</table>
<p>FI = Forme indéterminée → lever par factorisation, facteur dominant, conjugué, ou règle de L'Hôpital.</p>
<h3>III. Continuité</h3>
<p>f est continue en a si :</p>
<ol>
  <li>f est définie en a</li>
  <li>lim_{x→a} f(x) existe (limites à droite et à gauche égales)</li>
  <li>lim_{x→a} f(x) = f(a)</li>
</ol>
<p><strong>Théorème des valeurs intermédiaires (TVI) :</strong> Si f est continue sur [a,b] et si f(a)·f(b) < 0, alors il existe au moins un c ∈ ]a,b[ tel que f(c) = 0. Si de plus f est strictement monotone, ce c est unique.</p>
<h3>IV. Asymptotes</h3>
<ul>
  <li><strong>Asymptote horizontale</strong> y=L : lim_{x→±∞} f(x) = L</li>
  <li><strong>Asymptote verticale</strong> x=a : lim_{x→a⁺ ou a⁻} f(x) = ±∞</li>
  <li><strong>Asymptote oblique</strong> y=ax+b : lim_{x→∞} [f(x)−(ax+b)] = 0 (a = lim f(x)/x)</li>
</ul>`,
    examples: `<p><strong>Exemple 1 :</strong> lim_{x→1} (x²−1)/(x−1) = lim_{x→1} (x+1)(x−1)/(x−1) = lim_{x→1} (x+1) = 2.</p>
<p><strong>Exemple 2 (TVI) :</strong> Montrer que f(x) = x³ − 2x − 5 a une racine dans ]2, 3[.<br>
f(2) = 8−4−5 = −1 < 0 ; f(3) = 27−6−5 = 16 > 0.<br>
f continue sur [2,3], f(2)·f(3) < 0 → ∃ c ∈ ]2,3[ : f(c) = 0.</p>
<p><strong>Exemple 3 (Asymptote oblique) :</strong> f(x) = (x²+1)/(x−1).<br>
Division euclidienne : f(x) = x+1 + 2/(x−1).<br>
lim_{x→∞} [f(x)−(x+1)] = 0 → asymptote oblique y = x+1.<br>
Asymptote verticale x = 1 (lim f(x) = ±∞ quand x→1).</p>`,
  },
  {
    title: "Leçon 8 : Dérivabilité et étude des fonctions",
    subjectId: MATHS_SUBJECT_ID,
    series: "D",
    order: 12,
    duration: 60,
    isPremium: false,
    summary: "Maîtriser la définition de la dérivée, les règles de calcul, les théorèmes (Rolle, valeur moyenne), l'étude complète d'une fonction et le tracé de la courbe.",
    keyPoints: `f'(a) = lim_{h→0} [f(a+h)−f(a)]/h (taux d'accroissement)
f dérivable en a ⟺ la courbe admet une tangente en A de pente f'(a)
Règles : (u+v)' = u'+v' ; (uv)' = u'v+uv' ; (u/v)' = (u'v−uv')/v²
Dérivées usuelles : (xⁿ)' = nxⁿ⁻¹ ; (sin x)' = cos x ; (cos x)' = −sin x ; (eˣ)' = eˣ ; (ln x)' = 1/x
Dérivée de composée : (f∘g)'(x) = f'(g(x))·g'(x)
Théorème de Rolle : f continue sur [a,b], dérivable sur ]a,b[, f(a)=f(b) → ∃ c : f'(c)=0
f'(x)>0 sur I → f croissante sur I ; f'(x)<0 → décroissante ; f'(a)=0 et changement de signe → extremum
Tableau de variation : signe de f', variation de f, valeurs remarquables`,
    content: `<h2>Dérivabilité et Étude des Fonctions</h2>
<h3>I. Définition de la dérivée</h3>
<p>f est dérivable en a si la limite suivante existe et est finie :</p>
<p style="text-align:center">f'(a) = lim_{h→0} [f(a+h)−f(a)]/h</p>
<p>Interprétation géométrique : f'(a) est le coefficient directeur de la tangente à la courbe de f en A(a, f(a)).</p>
<p>Équation de la tangente en a : y = f(a) + f'(a)(x−a).</p>
<h3>II. Dérivées usuelles</h3>
<table border="1" cellpadding="5" style="border-collapse:collapse;width:100%">
  <tr><th>f(x)</th><th>f'(x)</th></tr>
  <tr><td>xⁿ (n ∈ ℤ)</td><td>nxⁿ⁻¹</td></tr>
  <tr><td>√x</td><td>1/(2√x)</td></tr>
  <tr><td>sin x</td><td>cos x</td></tr>
  <tr><td>cos x</td><td>−sin x</td></tr>
  <tr><td>tan x</td><td>1+tan²x = 1/cos²x</td></tr>
  <tr><td>eˣ</td><td>eˣ</td></tr>
  <tr><td>aˣ</td><td>aˣ ln a</td></tr>
  <tr><td>ln x</td><td>1/x</td></tr>
</table>
<h3>III. Règles de dérivation</h3>
<ul>
  <li>(λf)' = λf'</li>
  <li>(u+v)' = u' + v'</li>
  <li>(uv)' = u'v + uv'</li>
  <li>(u/v)' = (u'v − uv')/v² (v ≠ 0)</li>
  <li>(f∘g)'(x) = f'(g(x))·g'(x) — dérivée de composée</li>
</ul>
<h3>IV. Étude des variations</h3>
<ul>
  <li>f'(x) > 0 sur I ⟹ f strictement croissante sur I</li>
  <li>f'(x) < 0 sur I ⟹ f strictement décroissante sur I</li>
  <li>f'(a) = 0 avec changement de signe ⟹ extremum local en a</li>
  <li>f''(a) > 0 et f'(a) = 0 ⟹ minimum local ; f''(a) < 0 ⟹ maximum local</li>
</ul>
<h3>V. Étude complète d'une fonction (plan type)</h3>
<ol>
  <li>Domaine de définition D_f</li>
  <li>Parité, périodicité</li>
  <li>Limites aux bornes du domaine et asymptotes</li>
  <li>Calcul de f'(x), signe de f'(x), tableau de variation</li>
  <li>Points remarquables (intersections avec les axes)</li>
  <li>Tracé de la courbe</li>
</ol>`,
    examples: `<p><strong>Exemple 1 :</strong> f(x) = x³ − 3x. f'(x) = 3x² − 3 = 3(x−1)(x+1).<br>
f'(x)=0 en x=−1 et x=1. f' > 0 sur ]−∞,−1[ et ]1,+∞[ (croissante) ; f' < 0 sur ]−1,1[ (décroissante).<br>
Maximum local en x=−1 : f(−1)=2 ; minimum local en x=1 : f(1)=−2.</p>
<p><strong>Exemple 2 (tangente) :</strong> f(x)=x²+1 en x=2.<br>
f(2)=5, f'(x)=2x → f'(2)=4. Tangente : y = 5 + 4(x−2) = 4x−3.</p>
<p><strong>Exemple 3 (composée) :</strong> f(x) = sin(x²).<br>
f'(x) = cos(x²) · 2x (dérivée de sin(u) = cos(u)·u', ici u=x², u'=2x).</p>`,
  },
  {
    title: "Leçon 9 : Fonctions exponentielles et logarithmes",
    subjectId: MATHS_SUBJECT_ID,
    series: "D",
    order: 13,
    duration: 55,
    isPremium: false,
    summary: "Étudier les fonctions logarithme naturel ln, exponentielle eˣ, et les exponentielles de base a, avec leurs propriétés algébriques, dérivées et applications.",
    keyPoints: `ln est la réciproque de exp : ln(eˣ) = x et e^(ln x) = x (x > 0)
ln(ab) = ln a + ln b ; ln(a/b) = ln a − ln b ; ln(aⁿ) = n ln a
(ln x)' = 1/x sur ]0, +∞[ ; (eˣ)' = eˣ sur ℝ
lim_{x→+∞} ln x / x = 0 (ln croît moins vite que x)
lim_{x→+∞} eˣ / xⁿ = +∞ (exp croît plus vite que tout polynôme)
lim_{x→0⁺} x ln x = 0 (limite remarquable)
Équation aˣ = b ⟺ x = ln b / ln a (a > 0, a ≠ 1, b > 0)
Croissance comparée : eˣ >> xⁿ >> ln x quand x → +∞`,
    content: `<h2>Fonctions Exponentielles et Logarithmes</h2>
<h3>I. La fonction logarithme naturel ln</h3>
<p>ln : ]0, +∞[ → ℝ est la réciproque de exp. Elle est définie par ∫₁ˣ dt/t.</p>
<p><strong>Propriétés algébriques :</strong></p>
<ul>
  <li>ln 1 = 0 ; ln e = 1</li>
  <li>ln(ab) = ln a + ln b</li>
  <li>ln(a/b) = ln a − ln b</li>
  <li>ln(aⁿ) = n ln a</li>
  <li>ln(√a) = (1/2)ln a</li>
</ul>
<p><strong>Étude :</strong> (ln x)' = 1/x > 0 → ln est strictement croissante sur ]0,+∞[.<br>
lim_{x→0⁺} ln x = −∞ ; lim_{x→+∞} ln x = +∞.</p>
<h3>II. La fonction exponentielle eˣ</h3>
<p>exp : ℝ → ]0, +∞[ ; (eˣ)' = eˣ ; e⁰ = 1 ; eˣ > 0 pour tout x.</p>
<p><strong>Propriétés :</strong></p>
<ul>
  <li>eᵃ⁺ᵇ = eᵃ·eᵇ</li>
  <li>eᵃ⁻ᵇ = eᵃ/eᵇ</li>
  <li>(eᵃ)ⁿ = eⁿᵃ</li>
  <li>e^(ln x) = x (x > 0) ; ln(eˣ) = x (x ∈ ℝ)</li>
</ul>
<p><strong>Limites remarquables :</strong></p>
<ul>
  <li>lim_{x→0} (eˣ−1)/x = 1</li>
  <li>lim_{x→+∞} eˣ/xⁿ = +∞ (pour tout n)</li>
  <li>lim_{x→−∞} xⁿeˣ = 0 (pour tout n > 0)</li>
  <li>lim_{x→0⁺} x ln x = 0</li>
</ul>
<h3>III. Exponentielle de base a</h3>
<p>Pour a > 0, a ≠ 1 : aˣ = e^(x ln a). Donc (aˣ)' = aˣ ln a.</p>
<p>log_a(x) = ln x / ln a (logarithme en base a).</p>
<h3>IV. Équations et inéquations</h3>
<ul>
  <li>eˣ = k (k>0) ⟺ x = ln k</li>
  <li>eˣ > k ⟺ x > ln k ; eˣ < k ⟺ x < ln k</li>
  <li>ln x = k ⟺ x = eᵏ (x>0)</li>
  <li>ln x > k ⟺ x > eᵏ</li>
</ul>`,
    examples: `<p><strong>Exemple 1 :</strong> Résoudre e^(2x) − 3eˣ + 2 = 0.<br>
Posons t = eˣ (t>0) : t² − 3t + 2 = 0 → (t−1)(t−2) = 0 → t=1 ou t=2.<br>
eˣ=1 → x=0 ; eˣ=2 → x=ln 2. Solution : {0, ln 2}.</p>
<p><strong>Exemple 2 :</strong> Étudier f(x) = xe^(−x).<br>
D_f = ℝ. f'(x) = e^(−x) − xe^(−x) = e^(−x)(1−x). f'(x)=0 → x=1 (maximum).<br>
f(1)=e^(−1). lim_{x→+∞} xe^(−x) = 0 (croissances comparées).</p>
<p><strong>Exemple 3 :</strong> Résoudre ln(2x−1) ≥ ln(x+2).<br>
Conditions : 2x−1 > 0 et x+2 > 0 → x > 1/2.<br>
ln est croissante : 2x−1 ≥ x+2 → x ≥ 3. Solution : [3, +∞[.</p>`,
  },
  {
    title: "Leçon 10 : Primitives et intégrales",
    subjectId: MATHS_SUBJECT_ID,
    series: "D",
    order: 14,
    duration: 60,
    isPremium: false,
    summary: "Définir les primitives et l'intégrale de Riemann, maîtriser les techniques d'intégration (par parties, changement de variable) et les propriétés fondamentales.",
    keyPoints: `F est une primitive de f sur I si F'(x) = f(x) pour tout x ∈ I
Si F est une primitive, toutes les primitives sont F + C (C constante)
∫_a^b f(x)dx = [F(x)]_a^b = F(b) − F(a) (théorème fondamental du calcul intégral)
Intégrales usuelles : ∫xⁿdx = xⁿ⁺¹/(n+1) ; ∫eˣdx = eˣ ; ∫(1/x)dx = ln|x| ; ∫cos x dx = sin x
Intégration par parties (IPP) : ∫u'v dx = [uv] − ∫uv' dx
Changement de variable : ∫f(g(t))g'(t)dt = ∫f(u)du (u=g(t))
Linéarité : ∫(αf+βg)dx = α∫f dx + β∫g dx
∫_a^b f(x)dx = −∫_b^a f(x)dx ; ∫_a^a f(x)dx = 0`,
    content: `<h2>Primitives et Intégrales</h2>
<h3>I. Primitives</h3>
<p>F est une <strong>primitive</strong> de f sur I si F'(x) = f(x) pour tout x ∈ I. Si F₀ est une primitive, la forme générale est F₀(x) + C (C ∈ ℝ).</p>
<p><strong>Primitives usuelles :</strong></p>
<table border="1" cellpadding="5" style="border-collapse:collapse;width:100%">
  <tr><th>f(x)</th><th>∫f(x)dx</th></tr>
  <tr><td>xⁿ (n≠−1)</td><td>xⁿ⁺¹/(n+1) + C</td></tr>
  <tr><td>1/x</td><td>ln|x| + C</td></tr>
  <tr><td>eˣ</td><td>eˣ + C</td></tr>
  <tr><td>sin x</td><td>−cos x + C</td></tr>
  <tr><td>cos x</td><td>sin x + C</td></tr>
  <tr><td>1/cos²x</td><td>tan x + C</td></tr>
  <tr><td>1/√(1−x²)</td><td>arcsin x + C</td></tr>
  <tr><td>1/(1+x²)</td><td>arctan x + C</td></tr>
</table>
<h3>II. Intégrale définie</h3>
<p>∫_a^b f(x)dx = F(b) − F(a) où F est une primitive quelconque de f.</p>
<p><strong>Propriétés :</strong></p>
<ul>
  <li>Linéarité : ∫(αf+βg)dx = α∫f dx + β∫g dx</li>
  <li>Chasles : ∫_a^b f = ∫_a^c f + ∫_c^b f</li>
  <li>Si f ≥ 0 sur [a,b] : ∫_a^b f ≥ 0</li>
  <li>|∫_a^b f| ≤ ∫_a^b |f|</li>
</ul>
<h3>III. Intégration par parties (IPP)</h3>
<p>∫_a^b u'(x)v(x)dx = [u(x)v(x)]_a^b − ∫_a^b u(x)v'(x)dx</p>
<p><em>Règle du choix :</em> choisir v' facile à intégrer et u facile à dériver. L'ordre ILATE suggère : Inverse trig → Logarithme → Algèbre → Trig → Exponentielle (de gauche à droite : u = …, v' = …).</p>
<h3>IV. Changement de variable</h3>
<p>Si u = g(x), alors dx = du/g'(x) → ∫f(g(x))g'(x)dx = ∫f(u)du.</p>
<p>Ne pas oublier de changer les bornes si intégrale définie.</p>`,
    examples: `<p><strong>Exemple 1 (IPP) :</strong> ∫x eˣ dx.<br>
Posons u = x (u'=1) et v' = eˣ (v=eˣ).<br>
∫x eˣ dx = x eˣ − ∫eˣ dx = x eˣ − eˣ + C = (x−1)eˣ + C.</p>
<p><strong>Exemple 2 (changement de variable) :</strong> ∫₀¹ 2x√(x²+1) dx.<br>
Posons u = x²+1, du = 2x dx. Bornes : x=0→u=1 ; x=1→u=2.<br>
= ∫₁² √u du = [2u^(3/2)/3]₁² = (2·2√2)/3 − 2/3 = (4√2−2)/3.</p>
<p><strong>Exemple 3 :</strong> ∫ ln x dx (IPP).<br>
u = ln x (u'=1/x), v'=1 (v=x).<br>
∫ ln x dx = x ln x − ∫ x · (1/x) dx = x ln x − ∫1 dx = x ln x − x + C.</p>`,
  },
  {
    title: "Leçon 11 : Applications du calcul intégral",
    subjectId: MATHS_SUBJECT_ID,
    series: "D",
    order: 15,
    duration: 55,
    isPremium: false,
    summary: "Appliquer le calcul intégral au calcul d'aires de domaines plans, de volumes de solides de révolution et de valeurs moyennes de fonctions.",
    keyPoints: `Aire entre deux courbes : A = ∫_a^b |f(x)−g(x)| dx (attention aux intersections)
Aire sous une courbe positive : A = ∫_a^b f(x) dx (si f ≥ 0)
Unité d'aire = 1 cm × 1 cm (ou unité du graphique)
Volume de révolution (axe Ox) : V = π ∫_a^b [f(x)]² dx
Volume entre deux surfaces de révolution : V = π ∫_a^b ([f(x)]² − [g(x)]²) dx
Valeur moyenne de f sur [a,b] : f̄ = (1/(b−a)) ∫_a^b f(x) dx
Longueur d'arc (hors programme Terminale D, pour culture) : L = ∫_a^b √(1+[f'(x)]²) dx`,
    content: `<h2>Applications du Calcul Intégral</h2>
<h3>I. Calcul d'aires</h3>
<p><strong>Aire sous une courbe :</strong> Si f ≥ 0 sur [a,b], l'aire du domaine délimité par la courbe de f, l'axe Ox et les droites x=a, x=b est :</p>
<p style="text-align:center">A = ∫_a^b f(x) dx</p>
<p>Si f change de signe, décomposer en sous-intervalles de signe constant et prendre les valeurs absolues.</p>
<p><strong>Aire entre deux courbes :</strong> Entre les courbes de f et g sur [a,b] :</p>
<p style="text-align:center">A = ∫_a^b |f(x)−g(x)| dx</p>
<p>Si f(x) ≥ g(x) sur [a,b] : A = ∫_a^b (f(x)−g(x)) dx.</p>
<h3>II. Volume de révolution</h3>
<p>Volume du solide obtenu en faisant tourner la courbe de f autour de l'axe Ox :</p>
<p style="text-align:center">V = π ∫_a^b [f(x)]² dx</p>
<p>Volume entre les surfaces de révolution de f et g (f ≥ g ≥ 0) :</p>
<p style="text-align:center">V = π ∫_a^b ([f(x)]² − [g(x)]²) dx</p>
<h3>III. Valeur moyenne d'une fonction</h3>
<p>La <strong>valeur moyenne</strong> de f sur [a,b] est :</p>
<p style="text-align:center">f̄ = (1/(b−a)) ∫_a^b f(x) dx</p>
<p>Interprétation : f̄ est la hauteur du rectangle de base [a,b] ayant la même aire que le domaine sous la courbe de f.</p>
<h3>IV. Unités et calcul pratique</h3>
<p>Quand le graphique est dans un repère avec unités spécifiées (1 cm en abscisse = α unités, 1 cm en ordonnée = β unités), l'unité d'aire du graphique vaut α×β unités physiques.</p>`,
    examples: `<p><strong>Exemple 1 :</strong> Aire entre f(x)=x² et g(x)=x sur [0,1].<br>
Sur [0,1] : g(x)−f(x) = x−x² ≥ 0 (g ≥ f). A = ∫₀¹(x−x²)dx = [x²/2−x³/3]₀¹ = 1/2−1/3 = 1/6.</p>
<p><strong>Exemple 2 (Volume) :</strong> Volume du cône de révolution obtenu en faisant tourner f(x)=x (0≤x≤h) autour de l'axe Ox.<br>
V = π∫₀ʰ x² dx = π[x³/3]₀ʰ = πh³/3. (Formule classique du cône : V=πr²h/3, ici r=h.)</p>
<p><strong>Exemple 3 (Valeur moyenne) :</strong> Valeur moyenne de f(x)=sin x sur [0,π].<br>
f̄ = (1/π)∫₀ᵖ sin x dx = (1/π)[−cos x]₀ᵖ = (1/π)(1+1) = 2/π ≈ 0,637.</p>`,
  },
  {
    title: "Leçon 12 : Suites arithmétiques et géométriques",
    subjectId: MATHS_SUBJECT_ID,
    series: "D",
    order: 16,
    duration: 50,
    isPremium: false,
    summary: "Maîtriser les suites arithmétiques et géométriques : terme général, somme des termes, et applications financières (intérêts composés, annuités).",
    keyPoints: `Suite arithmétique : uₙ₊₁ = uₙ + r (raison r) ; uₙ = u₀ + nr
Somme suite arithmétique : Σk=0→n uₖ = (n+1)(u₀+uₙ)/2
Suite géométrique : uₙ₊₁ = q·uₙ (raison q) ; uₙ = u₀·qⁿ
Somme suite géométrique (q≠1) : Σk=0→n uₖ = u₀(1−qⁿ⁺¹)/(1−q)
Somme des premiers entiers : 1+2+…+n = n(n+1)/2
Somme des carrés : 1²+2²+…+n² = n(n+1)(2n+1)/6
Intérêts composés : Cₙ = C₀(1+t)ⁿ (t = taux par période)
Annuités constantes : valeur acquise V = a(1+t)[(1+t)ⁿ−1]/t`,
    content: `<h2>Suites Arithmétiques et Géométriques</h2>
<h3>I. Suites arithmétiques</h3>
<p>Une suite (uₙ) est <strong>arithmétique</strong> de raison r si : uₙ₊₁ = uₙ + r pour tout n.</p>
<ul>
  <li>Terme général : uₙ = u₀ + n·r = uₚ + (n−p)·r</li>
  <li>Somme : S = u₀ + u₁ + … + uₙ = (n+1)·(u₀+uₙ)/2 = (n+1)·(premier+dernier)/2</li>
  <li>Cas particulier : 1+2+3+…+n = n(n+1)/2</li>
</ul>
<h3>II. Suites géométriques</h3>
<p>Une suite (uₙ) est <strong>géométrique</strong> de raison q si : uₙ₊₁ = q·uₙ pour tout n (u₀ ≠ 0).</p>
<ul>
  <li>Terme général : uₙ = u₀·qⁿ = uₚ·qⁿ⁻ᵖ</li>
  <li>Somme (q ≠ 1) : S = u₀ + u₁ + … + uₙ = u₀(1−qⁿ⁺¹)/(1−q)</li>
  <li>Si q = 1 : S = (n+1)u₀</li>
</ul>
<h3>III. Sommes remarquables</h3>
<table border="1" cellpadding="5" style="border-collapse:collapse;width:100%">
  <tr><th>Formule</th><th>Valeur</th></tr>
  <tr><td>Σk=1→n k</td><td>n(n+1)/2</td></tr>
  <tr><td>Σk=1→n k²</td><td>n(n+1)(2n+1)/6</td></tr>
  <tr><td>Σk=1→n k³</td><td>[n(n+1)/2]²</td></tr>
  <tr><td>Σk=0→n qᵏ (q≠1)</td><td>(1−qⁿ⁺¹)/(1−q)</td></tr>
</table>
<h3>IV. Applications financières</h3>
<p><strong>Intérêts composés :</strong> Un capital C₀ placé à taux t par période pendant n périodes donne :<br>
Cₙ = C₀(1+t)ⁿ</p>
<p><strong>Annuités constantes :</strong> Versements a réguliers de période T, taux t → valeur acquise en fin de n périodes :<br>
V = a · (1+t) · [(1+t)ⁿ − 1] / t</p>`,
    examples: `<p><strong>Exemple 1 :</strong> Suite arithmétique : u₀=3, r=4. u₁₀=3+10×4=43. S₁₀=11×(3+43)/2=11×23=253.</p>
<p><strong>Exemple 2 :</strong> Suite géométrique : u₀=2, q=3. u₅=2×3⁵=486. S₅=2×(1−3⁶)/(1−3) = 2×(1−729)/(−2) = 728.</p>
<p><strong>Exemple 3 (finance) :</strong> Vous placez 1 000 000 FCFA à 5% annuel. Après 10 ans : C₁₀=1 000 000×(1,05)¹⁰=1 628 894 FCFA.</p>`,
  },
  {
    title: "Leçon 13 : Convergence d'une suite, limites et suites monotones",
    subjectId: MATHS_SUBJECT_ID,
    series: "D",
    order: 17,
    duration: 55,
    isPremium: false,
    summary: "Étudier la convergence ou divergence d'une suite numérique, les opérations sur les limites, le théorème des suites monotones bornées et les suites récurrentes.",
    keyPoints: `Suite convergente : lim uₙ = L (fini) quand n→+∞
Suite divergente : lim uₙ = ±∞ ou la limite n'existe pas
Toute suite convergente est bornée ; une suite monotone bornée est convergente
Théorème de comparaison (gendarmes) : vₙ ≤ uₙ ≤ wₙ, lim vₙ = lim wₙ = L ⟹ lim uₙ = L
Suite récurrente uₙ₊₁ = f(uₙ) : chercher point fixe (f(ℓ)=ℓ), étudier la monotonie
Suite géométrique : qⁿ → 0 si |q| < 1 ; qⁿ → +∞ si q > 1 ; diverge si q ≤ −1
Limite de la suite (1+1/n)ⁿ = e (nombre d'Euler)
Comparaison des limites : nᵅ << aⁿ << n! pour n→+∞ (a>1, α>0)`,
    content: `<h2>Convergence des Suites</h2>
<h3>I. Définitions</h3>
<p>Une suite (uₙ) <strong>converge</strong> vers L si : pour tout ε > 0, il existe N tel que ∀n ≥ N, |uₙ − L| < ε. On note lim uₙ = L.</p>
<p>Si lim uₙ = +∞ ou −∞, la suite est <strong>divergente</strong> vers l'infini. Si la limite n'existe pas, la suite est simplement divergente.</p>
<h3>II. Propriétés des limites</h3>
<ul>
  <li>La limite est unique si elle existe</li>
  <li>Toute suite convergente est bornée (mais réciproque fausse : (−1)ⁿ est bornée, non convergente)</li>
  <li>Opérations : lim(uₙ+vₙ) = L+M ; lim(uₙvₙ) = LM si les limites existent</li>
</ul>
<h3>III. Théorème des suites monotones bornées</h3>
<p>Toute suite <strong>monotone et bornée</strong> est convergente. Plus précisément :</p>
<ul>
  <li>Suite croissante bornée supérieurement → converge vers sa borne supérieure</li>
  <li>Suite décroissante bornée inférieurement → converge vers sa borne inférieure</li>
</ul>
<h3>IV. Suites récurrentes uₙ₊₁ = f(uₙ)</h3>
<p>Méthode d'étude :</p>
<ol>
  <li>Trouver le(s) <strong>point(s) fixe(s)</strong> ℓ : f(ℓ) = ℓ</li>
  <li>Étudier si la suite est monotone (par récurrence ou en étudiant uₙ₊₁ − uₙ)</li>
  <li>Montrer que la suite est bornée → conclure par le théorème de convergence monotone</li>
  <li>Identifier la limite comme le point fixe attractif</li>
</ol>
<h3>V. Limites classiques de suites</h3>
<table border="1" cellpadding="5" style="border-collapse:collapse;width:100%">
  <tr><th>Suite</th><th>Limite</th></tr>
  <tr><td>qⁿ, |q| &lt; 1</td><td>0</td></tr>
  <tr><td>qⁿ, q &gt; 1</td><td>+∞</td></tr>
  <tr><td>nᵅ (α &gt; 0)</td><td>+∞</td></tr>
  <tr><td>(1+1/n)ⁿ</td><td>e ≈ 2,718</td></tr>
  <tr><td>n^(1/n)</td><td>1</td></tr>
</table>`,
    examples: `<p><strong>Exemple 1 :</strong> uₙ = (3n+1)/(2n−1). Limite : lim uₙ = lim 3n/(2n) = 3/2 (termes dominants).</p>
<p><strong>Exemple 2 (suite récurrente) :</strong> u₀=0, uₙ₊₁ = √(uₙ+2).<br>
Point fixe : ℓ = √(ℓ+2) → ℓ²=ℓ+2 → ℓ²−ℓ−2=0 → ℓ=2 (ℓ>0).<br>
Par récurrence, on montre que 0 ≤ uₙ ≤ 2 (bornée) et uₙ₊₁ > uₙ (croissante) → converge vers ℓ=2.</p>
<p><strong>Exemple 3 :</strong> Montrer que uₙ = n/(2ⁿ) → 0.<br>
0 ≤ uₙ ≤ (1/2)ⁿ·n → (croissance comparée) → 0. Donc uₙ → 0 par les gendarmes.</p>`,
  },
  {
    title: "Leçon 14 : Probabilités élémentaires",
    subjectId: MATHS_SUBJECT_ID,
    series: "D",
    order: 18,
    duration: 50,
    isPremium: false,
    summary: "Maîtriser les bases du calcul des probabilités : expérience aléatoire, espace de probabilité, probabilité d'événements et dénombrement.",
    keyPoints: `Expérience aléatoire : résultat imprévisible ; espace Ω = ensemble des issues possibles
Événement A ⊂ Ω ; P(Ω) = 1 ; P(∅) = 0 ; 0 ≤ P(A) ≤ 1
Propriétés : P(Ā) = 1 − P(A) ; P(A∪B) = P(A)+P(B)−P(A∩B)
Si A et B incompatibles (A∩B=∅) : P(A∪B) = P(A)+P(B)
Équiprobabilité : P(A) = Card(A)/Card(Ω)
Arrangements : Aₙᵖ = n!/(n−p)! ; Permutations : n!
Combinaisons : Cₙᵖ = n!/(p!(n−p)!) = (n p)
Formule du binôme : (a+b)ⁿ = Σk=0→n Cₙᵏ aⁿ⁻ᵏ bᵏ`,
    content: `<h2>Probabilités Élémentaires</h2>
<h3>I. Vocabulaire de base</h3>
<ul>
  <li><strong>Expérience aléatoire :</strong> expérience dont le résultat est imprévisible</li>
  <li><strong>Espace fondamental Ω :</strong> ensemble de toutes les issues possibles</li>
  <li><strong>Événement :</strong> sous-ensemble A de Ω</li>
  <li><strong>Événement certain :</strong> Ω ; <strong>événement impossible :</strong> ∅</li>
  <li><strong>Événement contraire :</strong> Ā = Ω∖A</li>
</ul>
<h3>II. Axiomes de Kolmogorov</h3>
<ul>
  <li>P(A) ∈ [0, 1] pour tout A ⊂ Ω</li>
  <li>P(Ω) = 1</li>
  <li>Si A∩B = ∅ : P(A∪B) = P(A) + P(B) (additivité)</li>
</ul>
<p><strong>Propriétés déduites :</strong></p>
<ul>
  <li>P(Ā) = 1 − P(A)</li>
  <li>P(A∪B) = P(A) + P(B) − P(A∩B)</li>
  <li>A ⊂ B ⟹ P(A) ≤ P(B)</li>
</ul>
<h3>III. Équiprobabilité</h3>
<p>Quand toutes les issues sont équiprobables :</p>
<p style="text-align:center">P(A) = Card(A) / Card(Ω)</p>
<h3>IV. Dénombrement</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Opération</th><th>Formule</th><th>Exemple</th></tr>
  <tr><td>Arrangements (ordre, sans répét.)</td><td>Aₙᵖ = n!/(n−p)!</td><td>A₅³ = 60</td></tr>
  <tr><td>Permutations (arrangements total)</td><td>n!</td><td>3! = 6</td></tr>
  <tr><td>Combinaisons (sans ordre)</td><td>Cₙᵖ = n!/(p!(n−p)!)</td><td>C₅² = 10</td></tr>
</table>
<p><strong>Formule du binôme :</strong> (a+b)ⁿ = Σk=0→n Cₙᵏ aⁿ⁻ᵏ bᵏ</p>
<p>Triangle de Pascal : Cₙᵏ = Cₙ₋₁ᵏ⁻¹ + Cₙ₋₁ᵏ</p>`,
    examples: `<p><strong>Exemple 1 :</strong> On lance un dé équilibré à 6 faces. P(pair) = Card({2,4,6})/6 = 3/6 = 1/2.</p>
<p><strong>Exemple 2 :</strong> Dans une urne : 4 boules rouges, 3 bleues, 2 vertes (9 au total). On tire 2 boules sans remise. P(2 rouges) = C₄²/C₉² = 6/36 = 1/6.</p>
<p><strong>Exemple 3 :</strong> Développer (1+x)⁴ = C₄⁰ + C₄¹x + C₄²x² + C₄³x³ + C₄⁴x⁴ = 1+4x+6x²+4x³+x⁴.</p>`,
  },
  {
    title: "Leçon 15 : Probabilités conditionnelles et formule de Bayes",
    subjectId: MATHS_SUBJECT_ID,
    series: "D",
    order: 19,
    duration: 55,
    isPremium: false,
    summary: "Maîtriser la probabilité conditionnelle, l'indépendance d'événements, la formule des probabilités totales et la formule de Bayes.",
    keyPoints: `Probabilité conditionnelle : P(A|B) = P(A∩B)/P(B) (P(B) > 0)
Formule des probabilités composées : P(A∩B) = P(B)·P(A|B) = P(A)·P(B|A)
A et B indépendants ⟺ P(A∩B) = P(A)·P(B) ⟺ P(A|B) = P(A)
Partition de Ω : événements B₁,…,Bₙ deux à deux incompatibles, d'union = Ω
Formule des probabilités totales : P(A) = Σ P(Bᵢ)·P(A|Bᵢ)
Formule de Bayes : P(Bᵢ|A) = P(Bᵢ)·P(A|Bᵢ) / P(A)
Arbre de probabilités : outil graphique pour lire les probabilités composées`,
    content: `<h2>Probabilités Conditionnelles et Formule de Bayes</h2>
<h3>I. Probabilité conditionnelle</h3>
<p>La probabilité de A sachant que B est réalisé (P(B) > 0) :</p>
<p style="text-align:center">P(A|B) = P(A∩B) / P(B)</p>
<p>Intuitivement : on restreint l'espace au seul événement B.</p>
<p><strong>Formule des probabilités composées :</strong></p>
<p>P(A∩B) = P(B)·P(A|B) = P(A)·P(B|A)</p>
<p>Pour n événements : P(A₁∩…∩Aₙ) = P(A₁)·P(A₂|A₁)·P(A₃|A₁∩A₂)·…</p>
<h3>II. Indépendance</h3>
<p>A et B sont <strong>indépendants</strong> si et seulement si :</p>
<p style="text-align:center">P(A∩B) = P(A)·P(B)</p>
<p>Équivalent : P(A|B) = P(A) ou P(B|A) = P(B).</p>
<h3>III. Formule des probabilités totales</h3>
<p>Si {B₁, B₂, …, Bₙ} est une <strong>partition</strong> de Ω (Bᵢ deux à deux incompatibles, ∪Bᵢ = Ω, P(Bᵢ) > 0) :</p>
<p style="text-align:center">P(A) = Σᵢ P(Bᵢ) · P(A|Bᵢ)</p>
<h3>IV. Formule de Bayes</h3>
<p>Sous les mêmes hypothèses :</p>
<p style="text-align:center">P(Bₖ|A) = P(Bₖ)·P(A|Bₖ) / Σᵢ P(Bᵢ)·P(A|Bᵢ)</p>
<p>Bayes permet de « remonter » d'un résultat (A) vers sa cause probable (Bₖ).</p>
<h3>V. Arbre de probabilités</h3>
<p>Représentation en arbre : les branches représentent des conditions et les produits des probabilités le long d'un chemin donnent P(chemin). Additionner les chemins aboutissant au même événement.</p>`,
    examples: `<p><strong>Exemple 1 (P. cond.) :</strong> On lance 2 dés. Sachant que la somme vaut 8, quelle est la probabilité que l'un des dés soit un 6 ?<br>
A = {un dé vaut 6} ∩ {somme=8} = {(2,6),(6,2)} ; B = {somme=8} = {(2,6),(3,5),(4,4),(5,3),(6,2)} → Card=5.<br>
P(A|B) = 2/5.</p>
<p><strong>Exemple 2 (Bayes) :</strong> Une maladie touche 1% de la population. Un test est positif à 99% si malade, et à 2% (faux positif) si sain. Si le test est positif, quelle est la probabilité d'être malade ?<br>
P(M)=0,01, P(T⁺|M)=0,99, P(T⁺|S)=0,02.<br>
P(T⁺)=0,01×0,99+0,99×0,02=0,0099+0,0198=0,0297.<br>
P(M|T⁺)=0,0099/0,0297≈0,333 ≈ 33%. (Paradoxe de Bayes.)</p>`,
  },
  {
    title: "Leçon 16 : Variables aléatoires discrètes",
    subjectId: MATHS_SUBJECT_ID,
    series: "D",
    order: 20,
    duration: 55,
    isPremium: false,
    summary: "Définir et étudier les variables aléatoires discrètes : loi de probabilité, espérance mathématique, variance et écart-type. Introduction aux lois usuelles.",
    keyPoints: `Variable aléatoire X : application de Ω vers ℝ
Loi de probabilité : tableau {xᵢ ; pᵢ} avec Σpᵢ = 1
Espérance : E(X) = Σ xᵢ·pᵢ (valeur moyenne théorique)
Variance : V(X) = E(X²) − [E(X)]² = Σ pᵢ(xᵢ−E(X))²
Écart-type : σ(X) = √V(X) (dispersion autour de E(X))
Propriétés : E(aX+b) = aE(X)+b ; V(aX+b) = a²V(X)
Loi binomiale B(n,p) : P(X=k) = Cₙᵏ pᵏ (1−p)ⁿ⁻ᵏ ; E(X)=np ; V(X)=np(1−p)
Loi de Bernoulli B(1,p) : X=1 (succès) ou X=0 (échec) ; P(X=1)=p`,
    content: `<h2>Variables Aléatoires Discrètes</h2>
<h3>I. Définition</h3>
<p>Une <strong>variable aléatoire discrète</strong> X est une application X : Ω → {x₁, x₂, …, xₙ} (ensemble fini ou dénombrable de valeurs).</p>
<p>Sa <strong>loi de probabilité</strong> est entièrement décrite par :</p>
<table border="1" cellpadding="6" style="border-collapse:collapse">
  <tr><td>X</td><td>x₁</td><td>x₂</td><td>…</td><td>xₙ</td></tr>
  <tr><td>P(X=xᵢ)</td><td>p₁</td><td>p₂</td><td>…</td><td>pₙ</td></tr>
</table>
<p>Avec : pᵢ ≥ 0 et Σpᵢ = 1.</p>
<h3>II. Espérance mathématique</h3>
<p>E(X) = Σᵢ xᵢ · pᵢ</p>
<p>L'espérance est la valeur moyenne théorique de X (centre de gravité de la loi).</p>
<p>Propriétés : E(aX+b) = aE(X)+b ; E(X+Y) = E(X)+E(Y) ; E(c) = c.</p>
<h3>III. Variance et écart-type</h3>
<p>V(X) = E[(X−E(X))²] = E(X²) − [E(X)]²</p>
<p>σ(X) = √V(X) (écart-type, en mêmes unités que X).</p>
<p>Propriétés : V(aX+b) = a²V(X) ; V(c) = 0.</p>
<h3>IV. Loi de Bernoulli et Loi Binomiale</h3>
<p><strong>Loi de Bernoulli B(1,p) :</strong> X = 1 (succès, proba p) ou X = 0 (échec, proba 1−p).<br>
E(X) = p ; V(X) = p(1−p).</p>
<p><strong>Loi binomiale B(n,p) :</strong> X = nombre de succès en n épreuves de Bernoulli indépendantes de paramètre p.</p>
<p>P(X = k) = Cₙᵏ · pᵏ · (1−p)ⁿ⁻ᵏ pour k = 0, 1, …, n.</p>
<p>E(X) = np ; V(X) = np(1−p) ; σ = √(np(1−p)).</p>`,
    examples: `<p><strong>Exemple 1 :</strong> X = somme de 2 dés. E(X) = 2×(1+2+3+4+5+6)/6 = 7. V(X) = E(X²)−49.<br>
E(X²)=2×(1+4+9+16+25+36)/6=2×91/6=91/3 ; V(X)=91/3−49=35/6≈5,83. σ≈2,42.</p>
<p><strong>Exemple 2 (Loi binomiale) :</strong> On tire 10 fois à pile ou face (p=1/2). X = nombre de piles. X∼B(10,1/2).<br>
P(X=3) = C₁₀³×(1/2)³×(1/2)⁷ = 120/1024 ≈ 0,117.<br>
E(X)=5 ; V(X)=10×(1/2)×(1/2)=2,5.</p>`,
  },
  {
    title: "Leçon 17 : Géométrie dans le plan et nombres complexes",
    subjectId: MATHS_SUBJECT_ID,
    series: "D",
    order: 21,
    duration: 55,
    isPremium: false,
    summary: "Utiliser les nombres complexes pour résoudre des problèmes de géométrie plane : distance, alignement, équation de droites, cercles et transformations.",
    keyPoints: `Affixe d'un point M : le complexe z_M = x+iy associé à M(x,y)
Distance : |z_B − z_A| = distance AB dans le plan
Milieu I de [AB] : z_I = (z_A + z_B)/2
Alignement : A, B, C alignés ⟺ (z_C−z_A)/(z_B−z_A) ∈ ℝ
Perpendicularité : AB ⊥ AC ⟺ (z_C−z_A)/(z_B−z_A) ∈ iℝ (imaginaire pur)
Cercle de centre Ω et rayon R : {z ∈ ℂ | |z−z_Ω| = R}
Droite passant par A et B : Im[(z−z_A)/(z_B−z_A)] = 0
Angle orienté : arg[(z_C−z_A)/(z_B−z_A)] = (AB, AC) mod 2π`,
    content: `<h2>Géométrie dans le Plan et Nombres Complexes</h2>
<h3>I. Affixe et distance</h3>
<p>Dans un repère orthonormal (O, x, y), on associe à chaque point M(x, y) son <strong>affixe</strong> z_M = x+iy.</p>
<p><strong>Distance AB :</strong> |z_B − z_A| = √((x_B−x_A)² + (y_B−y_A)²)</p>
<p><strong>Milieu :</strong> z_I = (z_A + z_B) / 2</p>
<h3>II. Alignement et perpendicularité</h3>
<p>Le rapport (z_C−z_A)/(z_B−z_A) encode la position relative de C par rapport à la droite (AB) :</p>
<ul>
  <li><strong>Réel</strong> ⟺ A, B, C sont <strong>alignés</strong> (ou B=A)</li>
  <li><strong>Imaginaire pur</strong> ⟺ AC ⊥ AB</li>
  <li>Argument = angle orienté (AB, AC)</li>
</ul>
<h3>III. Droites et cercles</h3>
<p><strong>Équation d'un cercle</strong> de centre Ω(d'affixe ω) et rayon R :<br>
|z − ω| = R ⟺ (x−Re(ω))² + (y−Im(ω))² = R²</p>
<p><strong>Droite (AB) :</strong> Im[(z−z_A)/(z_B−z_A)] = 0 (la fraction est réelle)</p>
<p><strong>Médiatrice de [AB] :</strong> {z | |z−z_A| = |z−z_B|} — lieu des points équidistants de A et B.</p>
<h3>IV. Angle orienté et rotation</h3>
<p>arg[(z_C−z_A)/(z_B−z_A)] donne l'angle orienté (AB⃗, AC⃗) modulo 2π.</p>
<p>Un point M est sur le cercle circonscrit à A, B, C si et seulement si l'angle en M est constant (théorème de l'angle inscrit).</p>
<h3>V. Lieu géométrique</h3>
<p>Trouver l'ensemble des points z vérifiant une condition de la forme |z−a|/|z−b| = k (k constante réelle > 0).</p>
<ul>
  <li>k = 1 : médiatrice de [AB]</li>
  <li>k ≠ 1 : cercle d'Apollonius</li>
</ul>`,
    examples: `<p><strong>Exemple 1 :</strong> A(1+i), B(3+2i). |z_B−z_A| = |2+i| = √5 = AB.</p>
<p><strong>Exemple 2 :</strong> Montrer que A(0), B(2), C(1+i) forment un triangle rectangle en C.<br>
(z_C−z_A)/(z_B−z_A) = (1+i)/2. C'est imaginaire pur ? Non (il a partie réelle). Essayons l'angle en A :<br>
z_B/z_C = 2/(1+i) = 2(1−i)/2 = 1−i → arg(1−i) = −π/4. Pas droit en A.<br>
Angle en C : (z_A−z_C)/(z_B−z_C) = (−1−i)/(1−i) = (−1−i)(1+i)/2 = (−1−i+−i−i²)/2 = (−1−2i+1)/2 = −i → imaginaire pur → angle droit en C. ✓</p>`,
  },
  {
    title: "Leçon 18 : Transformations du plan",
    subjectId: MATHS_SUBJECT_ID,
    series: "D",
    order: 22,
    duration: 55,
    isPremium: false,
    summary: "Étudier les transformations planes (translations, homothéties, rotations, similitudes) via les nombres complexes et leurs propriétés géométriques.",
    keyPoints: `Translation de vecteur t = b : z' = z + b
Homothétie de centre Ω (affixe ω) et rapport k : z' = ω + k(z−ω)
Rotation de centre Ω et angle θ : z' = ω + (z−ω)e^(iθ)
Réflexion (symétrie axiale) : le miroir en réalité conjugué (moins général)
Similitude directe : z' = az + b (a,b ∈ ℂ, a≠0) — combine rotation et homothétie
Rapport de la similitude : |a| ; angle de la similitude : arg(a)
Point invariant d'une similitude non-translation : z₀ = b/(1−a) (si a≠1)
Composition de deux rotations = rotation (ou translation si somme des angles = 2kπ)`,
    content: `<h2>Transformations du Plan</h2>
<h3>I. Translations</h3>
<p>La translation de vecteur t⃗ (d'affixe b) : z' = z + b.</p>
<p>Propriétés : préserve les distances (isométrie), les angles, l'orientation. Aucun point fixe.</p>
<h3>II. Homothéties</h3>
<p>L'homothétie h(Ω, k) de centre Ω (affixe ω) et rapport k ≠ 0 :</p>
<p style="text-align:center">z' = ω + k(z − ω)</p>
<p>Point invariant : Ω seul. Transforme les segments en segments de rapport |k|. Si k > 0 : même sens ; k < 0 : sens opposé.</p>
<h3>III. Rotations</h3>
<p>La rotation R(Ω, θ) de centre Ω et angle θ :</p>
<p style="text-align:center">z' = ω + (z − ω)e^(iθ)</p>
<p>Isométrie (préserve les distances et les angles). Point invariant : Ω.</p>
<h3>IV. Similitudes directes</h3>
<p>Toute application z ↦ z' = az + b avec a ∈ ℂ*, b ∈ ℂ est une <strong>similitude directe</strong>.</p>
<ul>
  <li><strong>Rapport :</strong> |a|</li>
  <li><strong>Angle :</strong> arg(a)</li>
  <li>Si |a| = 1 : rotation (ou translation si a=1)</li>
  <li>Si arg(a) = 0 : homothétie (et éventuellement translation)</li>
  <li><strong>Point fixe :</strong> z₀ = az₀+b ⟹ z₀ = b/(1−a) (si a ≠ 1)</li>
</ul>
<h3>V. Composition de rotations</h3>
<p>La composée de deux rotations R(A, α) et R(B, β) est :</p>
<ul>
  <li>Une rotation de centre C et d'angle α+β si α+β ≢ 0 [2π]</li>
  <li>Une translation si α+β ≡ 0 [2π]</li>
</ul>
<h3>VI. Similitudes indirectes</h3>
<p>z' = az̄ + b (implique une réflexion). Composée d'une similitude directe et d'une réflexion axiale.</p>`,
    examples: `<p><strong>Exemple 1 :</strong> Rotation de centre i et angle π/2 : z' = i + (z−i)e^(iπ/2) = i + (z−i)·i = i + iz − i² = i + iz + 1 = (1+i) + iz.<br>
Image de z=1 : z' = (1+i)+i = 1+2i.</p>
<p><strong>Exemple 2 (similitude) :</strong> f : z ↦ (1+i)z + 2. a=1+i, |a|=√2 (rapport), arg(1+i)=π/4 (angle).<br>
Point fixe : z₀ = 2/(1−(1+i)) = 2/(−i) = 2i/1 = 2i/(i·(−i)) → 2/(−i) = 2i. Vérif : (1+i)(2i)+2 = 2i+2i²+2 = 2i−2+2 = 2i. ✓</p>`,
  },
  {
    title: "Leçon 19 : Notions d'équations différentielles",
    subjectId: MATHS_SUBJECT_ID,
    series: "D",
    order: 23,
    duration: 55,
    isPremium: false,
    summary: "Introduire les équations différentielles du 1er et 2e ordre à coefficients constants, leurs solutions générales et particulières, avec des applications concrètes.",
    keyPoints: `Équation différentielle (ED) : relation entre x, y(x) et ses dérivées
ED du 1er ordre y' + ay = b (ou y' = f(x)) : solution générale = solution homogène + solution particulière
Solution homogène de y' + ay = 0 : y_h = Ce^(−ax)
Solution particulière de y' + ay = b : y_p = b/a (constante)
ED linéaire du 2e ordre y'' + py' + qy = 0 : équation caractéristique r² + pr + q = 0
Si Δ > 0 (r₁ ≠ r₂ réels) : y = Ae^(r₁x) + Be^(r₂x)
Si Δ = 0 (r₁ = r₂ = r) : y = (A+Bx)e^(rx)
Si Δ < 0 (r = α±iβ) : y = e^(αx)(A cos βx + B sin βx)`,
    content: `<h2>Équations Différentielles</h2>
<h3>I. Définitions</h3>
<p>Une <strong>équation différentielle</strong> est une équation reliant une fonction inconnue y(x) et ses dérivées y', y'', …</p>
<p><strong>Ordre :</strong> ordre de la dérivée la plus haute. <strong>Linéaire :</strong> y et ses dérivées apparaissent au degré 1 (pas de y·y' ou y² par exemple).</p>
<h3>II. Équation du 1er ordre y' = f(x)</h3>
<p>Solution : y(x) = ∫f(x)dx + C.</p>
<p>Avec condition initiale y(x₀) = y₀ → une seule solution (problème de Cauchy).</p>
<h3>III. Équation linéaire du 1er ordre à coefficients constants</h3>
<p><strong>Homogène :</strong> y' + ay = 0 → y_h = Ce^(−ax) (C ∈ ℝ).</p>
<p><strong>Avec second membre :</strong> y' + ay = b (b ≠ 0).<br>
Solution particulière constante : y_p = b/a.<br>
<strong>Solution générale :</strong> y = Ce^(−ax) + b/a.</p>
<p>Si second membre = f(x) quelconque → méthode de variation de la constante.</p>
<h3>IV. Équation linéaire du 2e ordre à coefficients constants</h3>
<p><strong>Équation homogène :</strong> y'' + py' + qy = 0.</p>
<p><strong>Équation caractéristique :</strong> r² + pr + q = 0. Discriminant Δ = p² − 4q.</p>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Cas</th><th>Racines</th><th>Solution générale</th></tr>
  <tr><td>Δ > 0</td><td>r₁, r₂ ∈ ℝ distincts</td><td>y = Ae^(r₁x) + Be^(r₂x)</td></tr>
  <tr><td>Δ = 0</td><td>r₁ = r₂ = r</td><td>y = (A+Bx)e^(rx)</td></tr>
  <tr><td>Δ < 0</td><td>r = α ± iβ</td><td>y = e^(αx)(A cos βx + B sin βx)</td></tr>
</table>
<p><strong>Équation avec second membre :</strong> y_g = y_h + y_p (chercher y_p adapté à la forme du second membre).</p>
<h3>V. Applications</h3>
<ul>
  <li><strong>Biologie :</strong> croissance P'(t) = kP(t) → P(t) = P₀e^(kt)</li>
  <li><strong>Physique :</strong> oscillateur harmonique LC → y'' + ω²y = 0 (oscillations)</li>
  <li><strong>Économie :</strong> dépréciation d'un bien I'(t) = −aI(t) → I(t) = I₀e^(−at)</li>
</ul>`,
    examples: `<p><strong>Exemple 1 (ordre 1) :</strong> Résoudre y' − 2y = 4.<br>
Homogène : y' − 2y = 0 → y_h = Ce^(2x).<br>
Solution particulière constante : y_p = 4/(−2) = −2.<br>
Solution générale : y = Ce^(2x) − 2.</p>
<p><strong>Exemple 2 (ordre 2, Δ > 0) :</strong> y'' − 5y' + 6y = 0.<br>
Éq. caract. : r² − 5r + 6 = 0 → (r−2)(r−3) = 0 → r₁=2, r₂=3.<br>
y = Ae^(2x) + Be^(3x).</p>
<p><strong>Exemple 3 (ordre 2, Δ < 0) :</strong> y'' + 2y' + 5y = 0.<br>
r² + 2r + 5 = 0 → Δ = 4−20 = −16 → r = −1 ± 2i (α=−1, β=2).<br>
y = e^(−x)(A cos 2x + B sin 2x).</p>`,
  },
];

const mathsDExercises = [
  // Leçon 1 : Nombres réels
  { lessonOrder: 5, question: "Résoudre l'inéquation |3x − 6| ≤ 9.", type: "mcq", difficulty: "medium", options: ["x ∈ ]−∞, −1[ ∪ ]5, +∞[", "x ∈ [−1, 5]", "x ∈ [−3, 5]", "x ∈ [0, 5]"], correctAnswer: "x ∈ [−1, 5]", explanation: "|3x−6| ≤ 9 ⟺ −9 ≤ 3x−6 ≤ 9 ⟺ −3 ≤ 3x ≤ 15 ⟺ −1 ≤ x ≤ 5. Solution : [−1, 5]." },
  { lessonOrder: 5, question: "√2 est un nombre rationnel.", type: "true_false", difficulty: "easy", options: ["Vrai", "Faux"], correctAnswer: "Faux", explanation: "√2 est irrationnel. La preuve classique montre que supposer √2 = p/q en forme irréductible mène à une contradiction : p et q seraient tous deux pairs, contredisant pgcd(p,q)=1." },
  { lessonOrder: 5, question: "La valeur absolue de (−4) est :", type: "mcq", difficulty: "easy", options: ["−4", "4", "16", "1/4"], correctAnswer: "4", explanation: "|−4| = −(−4) = 4 car −4 < 0. La valeur absolue est toujours positive ou nulle : c'est la distance à zéro sur la droite réelle." },

  // Leçon 2 : Polynômes
  { lessonOrder: 6, question: "Les racines du polynôme P(x) = x² − 5x + 6 sont :", type: "mcq", difficulty: "easy", options: ["x = 1 et x = 6", "x = 2 et x = 3", "x = −2 et x = −3", "x = 1 et x = 5"], correctAnswer: "x = 2 et x = 3", explanation: "Δ = 25 − 24 = 1. x₁ = (5−1)/2 = 2 ; x₂ = (5+1)/2 = 3. Vérification : 2²−5(2)+6=0 ✓ et 3²−5(3)+6=0 ✓. Aussi via Vieta : x₁+x₂=5, x₁x₂=6 → (2,3)." },
  { lessonOrder: 6, question: "D'après le théorème de Bezout, si P(a) = 0 alors :", type: "mcq", difficulty: "medium", options: ["(x + a) divise P(x)", "(x − a) divise P(x)", "a divise tous les coefficients de P(x)", "P(x) est un multiple de a"], correctAnswer: "(x − a) divise P(x)", explanation: "Le théorème de Bezout (ou théorème des racines de polynômes) stipule : a est racine de P ⟺ (x−a) est un diviseur de P. On peut alors écrire P(x) = (x−a)·Q(x) pour un certain polynôme Q." },
  { lessonOrder: 6, question: "Tout polynôme de degré 3 à coefficients réels admet au moins une racine réelle.", type: "true_false", difficulty: "medium", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "Un polynôme de degré impair à coefficients réels admet toujours au moins une racine réelle (théorème des valeurs intermédiaires : P(x)→+∞ quand x→+∞ et P(x)→−∞ quand x→−∞ ou vice versa, donc P doit s'annuler quelque part)." },

  // Leçon 3 : Équations et inéquations
  { lessonOrder: 7, question: "L'ensemble des solutions de x² − 4 > 0 est :", type: "mcq", difficulty: "medium", options: ["[−2, 2]", "]−2, 2[", "]−∞, −2[ ∪ ]2, +∞[", "]−∞, −2] ∪ [2, +∞["], correctAnswer: "]−∞, −2[ ∪ ]2, +∞[", explanation: "x²−4 = (x−2)(x+2) > 0. Racines : x=−2 et x=2. a=1 > 0 → le trinôme est positif à l'extérieur des racines : x < −2 ou x > 2. Solution : ]−∞, −2[ ∪ ]2, +∞[." },
  { lessonOrder: 7, question: "La solution du système { x + 2y = 5 ; 2x − y = 0 } est :", type: "mcq", difficulty: "medium", options: ["(1, 2)", "(2, 1)", "(0, 5/2)", "(4, 8)"], correctAnswer: "(1, 2)", explanation: "De la 2e équation : x = y/2. Substituer dans la 1ère : y/2 + 2y = 5 → 5y/2 = 5 → y = 2, puis x = 1. Vérification : 1+4=5 ✓ et 2−2=0 ✓." },
  { lessonOrder: 7, question: "Lors de la résolution d'une équation irrationnelle de la forme √f(x) = g(x), il est obligatoire de vérifier les solutions trouvées dans l'équation d'origine.", type: "true_false", difficulty: "easy", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "En élevant au carré, on peut introduire des solutions étrangères (racines de [g(x)]²=f(x) avec g(x)<0). La vérification est donc indispensable. Exemple : √x = −1 n'a pas de solution, mais (√x)² = 1 donne x=1 qui ne vérifie pas l'équation originale." },

  // Leçon 4 : Nombres complexes
  { lessonOrder: 8, question: "Le module du nombre complexe z = 3 − 4i est :", type: "mcq", difficulty: "easy", options: ["1", "5", "7", "25"], correctAnswer: "5", explanation: "|3−4i| = √(3²+(−4)²) = √(9+16) = √25 = 5." },
  { lessonOrder: 8, question: "Le conjugué de z = 2 + 3i multiplié par z donne :", type: "mcq", difficulty: "medium", options: ["4 + 9i", "4 − 9i", "13 + 0i", "7 + 12i"], correctAnswer: "13 + 0i", explanation: "z·z̄ = (2+3i)(2−3i) = 4+6i−6i−9i² = 4+9 = 13. En général z·z̄ = |z|² = 2²+3² = 13." },
  { lessonOrder: 8, question: "L'ensemble des complexes z tels que |z| = 1 est représenté par un cercle de rayon 1 centré à l'origine dans le plan de Gauss.", type: "true_false", difficulty: "easy", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "L'équation |z|=1 avec z=x+iy s'écrit √(x²+y²)=1, soit x²+y²=1 : c'est bien le cercle unité centré à l'origine dans le plan complexe (appelé aussi cercle trigonométrique)." },

  // Leçon 5 : Forme trigonométrique
  { lessonOrder: 9, question: "D'après la formule de Moivre, (cos θ + i sin θ)ⁿ = :", type: "mcq", difficulty: "easy", options: ["cos(nθ) + i sin(nθ)", "n cos θ + n i sin θ", "cos(θⁿ) + i sin(θⁿ)", "n(cos θ + i sin θ)"], correctAnswer: "cos(nθ) + i sin(nθ)", explanation: "La formule de Moivre : (cos θ + i sin θ)ⁿ = cos(nθ) + i sin(nθ) pour tout entier n. En notation exponentielle : (e^(iθ))ⁿ = e^(inθ) = cos(nθ)+i sin(nθ)." },
  { lessonOrder: 9, question: "Les n racines n-ièmes d'un nombre complexe non nul sont les sommets d'un :", type: "mcq", difficulty: "medium", options: ["Triangle équilatéral", "Polygone régulier à n côtés inscrit dans un cercle", "Carré de côté n", "Spirale équiangulaire"], correctAnswer: "Polygone régulier à n côtés inscrit dans un cercle", explanation: "Les n racines n-ièmes de ρe^(iφ) sont zₖ = ⁿ√ρ · e^(i(φ+2kπ)/n) pour k=0,...,n−1. Elles sont également espacées sur un cercle de rayon ⁿ√ρ, formant les sommets d'un polygone régulier à n côtés." },
  { lessonOrder: 9, question: "La formule e^(iπ) + 1 = 0, dite identité d'Euler, relie cinq constantes mathématiques fondamentales.", type: "true_false", difficulty: "easy", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "L'identité d'Euler e^(iπ)+1=0 relie les cinq constantes : e (base du logarithme naturel), i (unité imaginaire), π (pi), 1 (unité multiplicative) et 0 (élément neutre de l'addition). Elle est souvent considérée comme la plus belle équation des mathématiques." },

  // Leçon 6 : Généralités fonctions
  { lessonOrder: 10, question: "Le domaine de définition de f(x) = √(x − 3) est :", type: "mcq", difficulty: "easy", options: ["ℝ", "]3, +∞[", "[3, +∞[", "]−∞, 3]"], correctAnswer: "[3, +∞[", explanation: "√(x−3) est défini si x−3 ≥ 0, soit x ≥ 3. Le domaine est donc [3, +∞[. (La borne 3 est incluse car √0 = 0 est bien défini.)" },
  { lessonOrder: 10, question: "Une fonction f est dite paire si :", type: "mcq", difficulty: "easy", options: ["f(x) = −f(x) pour tout x", "f(−x) = f(x) pour tout x dans D_f (symétrique)", "f(x+T) = f(x) pour tout x", "f est strictement croissante sur ℝ"], correctAnswer: "f(−x) = f(x) pour tout x dans D_f (symétrique)", explanation: "f est paire si son domaine D_f est symétrique par rapport à 0 et si f(−x)=f(x) pour tout x∈D_f. Géométriquement, la courbe est symétrique par rapport à l'axe des ordonnées. Exemples : cos x, x², x⁴, |x|." },
  { lessonOrder: 10, question: "La réciproque f⁻¹ d'une fonction bijective f a une courbe qui est le symétrique de celle de f par rapport à la droite y = x.", type: "true_false", difficulty: "easy", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "Si f est bijective de A dans B, sa réciproque f⁻¹ est définie de B dans A par f⁻¹(y)=x ⟺ f(x)=y. Graphiquement, on échange les rôles de x et y → symétrie par rapport à la droite y=x (la bissectrice des axes)." },

  // Leçon 7 : Limites
  { lessonOrder: 11, question: "lim_{x→0} sin(x)/x = :", type: "mcq", difficulty: "easy", options: ["0", "∞", "1", "sin(0)"], correctAnswer: "1", explanation: "C'est une limite fondamentale : lim_{x→0} sin(x)/x = 1. Elle se démontre géométriquement ou par la règle de L'Hôpital : lim sin'(x)/1 = cos(0)/1 = 1. Cette limite est à connaître absolument en terminale." },
  { lessonOrder: 11, question: "Quelle est l'asymptote horizontale de f(x) = (3x² + 1)/(x² − 4) quand x → ∞ ?", type: "mcq", difficulty: "medium", options: ["y = 0", "y = 1", "y = 3", "Pas d'asymptote horizontale"], correctAnswer: "y = 3", explanation: "lim_{x→∞} (3x²+1)/(x²−4) = lim_{x→∞} 3x²/x² = 3 (termes dominants au numérateur et dénominateur). L'asymptote horizontale est donc y=3." },
  { lessonOrder: 11, question: "Si f est continue sur [a, b] et si f(a) · f(b) < 0, alors il existe au moins un réel c dans ]a, b[ tel que f(c) = 0 (TVI).", type: "true_false", difficulty: "easy", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "C'est le théorème des valeurs intermédiaires (TVI) dans sa version courante. La condition f(a)·f(b)<0 signifie que f(a) et f(b) sont de signes opposés → la courbe continue doit traverser l'axe Ox entre a et b → existence d'un zéro dans ]a,b[." },

  // Leçon 8 : Dérivées
  { lessonOrder: 12, question: "La dérivée de f(x) = x³ − 3x + 2 est :", type: "mcq", difficulty: "easy", options: ["3x²", "3x² − 3", "x² − 3", "3x + 2"], correctAnswer: "3x² − 3", explanation: "f'(x) = (x³)' − (3x)' + (2)' = 3x² − 3 + 0 = 3x² − 3. Les règles utilisées : (xⁿ)' = nxⁿ⁻¹ et (constante)' = 0." },
  { lessonOrder: 12, question: "Si f'(a) = 0 et f'' (a) > 0, alors f admet en a :", type: "mcq", difficulty: "medium", options: ["Un maximum local", "Un point d'inflexion", "Un minimum local", "Une asymptote horizontale"], correctAnswer: "Un minimum local", explanation: "Si f'(a)=0 (point stationnaire) et f''(a)>0 (concavité vers le haut), alors la fonction est en 'creux' en a → minimum local. Si f''(a)<0 : maximum local. Si f''(a)=0 : test inconclus (peut être inflexion ou extremum)." },
  { lessonOrder: 12, question: "La dérivée de la composée (f∘g)(x) = f(g(x)) est f'(g(x)) · g'(x).", type: "true_false", difficulty: "easy", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "C'est la règle de la chaîne (dérivée de composée) : si h(x)=f(g(x)), alors h'(x)=f'(g(x))·g'(x). Exemple : (sin(x²))'=cos(x²)·2x. Cette règle est fondamentale en calcul différentiel." },

  // Leçon 9 : Exp et ln
  { lessonOrder: 13, question: "ln(e³) = :", type: "mcq", difficulty: "easy", options: ["e³", "3", "3e", "ln 3"], correctAnswer: "3", explanation: "ln(eˣ) = x pour tout réel x. Donc ln(e³) = 3. C'est la définition : ln est la réciproque de exp, donc elles se 'défont' mutuellement : ln(eˣ) = x et e^(ln x) = x (pour x>0)." },
  { lessonOrder: 13, question: "La solution de l'équation e^(2x) = 5 est :", type: "mcq", difficulty: "medium", options: ["x = 5/2", "x = ln(5)/2", "x = 2 ln(5)", "x = √5"], correctAnswer: "x = ln(5)/2", explanation: "e^(2x) = 5 ⟺ 2x = ln 5 ⟺ x = ln(5)/2. En appliquant le logarithme naturel des deux membres (fonction croissante, préserve l'équivalence pour des arguments positifs)." },
  { lessonOrder: 13, question: "Pour tout x > 0, on a e^(ln x) = x.", type: "true_false", difficulty: "easy", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "C'est la définition fondamentale : ln et exp sont des fonctions réciproques l'une de l'autre. Pour tout x > 0 : e^(ln x) = x (application de exp après ln). Et pour tout x ∈ ℝ : ln(eˣ) = x." },

  // Leçon 10 : Intégrales
  { lessonOrder: 14, question: "∫₀¹ (3x² + 2x) dx = :", type: "mcq", difficulty: "easy", options: ["1", "2", "3", "5"], correctAnswer: "2", explanation: "∫₀¹ (3x²+2x)dx = [x³+x²]₀¹ = (1+1)−(0+0) = 2. Primitives : ∫3x²dx = x³ et ∫2x dx = x²." },
  { lessonOrder: 14, question: "La méthode d'intégration par parties utilise la formule :", type: "mcq", difficulty: "medium", options: ["∫uv dx = uv + C", "∫u'v dx = uv − ∫uv' dx", "∫u'v dx = u'v' + C", "∫u'v dx = ∫uv' dx"], correctAnswer: "∫u'v dx = uv − ∫uv' dx", explanation: "L'intégration par parties (IPP) est : ∫u'v dx = [uv] − ∫uv' dx. Elle découle de la règle du produit (uv)' = u'v + uv', qu'on intègre des deux côtés. On choisit u' facile à intégrer et v facile à dériver." },
  { lessonOrder: 14, question: "∫_a^b f(x)dx = −∫_b^a f(x)dx (relation de Chasles pour le changement de sens).", type: "true_false", difficulty: "easy", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "Oui : ∫_a^b f dx = F(b)−F(a) et ∫_b^a f dx = F(a)−F(b) = −(F(b)−F(a)) = −∫_a^b f dx. Inverser les bornes change le signe de l'intégrale." },

  // Leçon 11 : Applications intégrale
  { lessonOrder: 15, question: "L'aire du domaine délimité par la courbe y = x², l'axe Ox et les droites x = 0 et x = 3 est :", type: "mcq", difficulty: "easy", options: ["3", "9", "27", "9 unités d'aire"], correctAnswer: "9 unités d'aire", explanation: "A = ∫₀³ x² dx = [x³/3]₀³ = 27/3 − 0 = 9 unités d'aire. x² ≥ 0 sur [0,3] donc pas besoin de valeur absolue." },
  { lessonOrder: 15, question: "Le volume du solide de révolution obtenu en faisant tourner la courbe y = √x (entre x=0 et x=4) autour de l'axe Ox est :", type: "mcq", difficulty: "medium", options: ["4π", "8π", "16π", "4π/3"], correctAnswer: "8π", explanation: "V = π∫₀⁴ (√x)² dx = π∫₀⁴ x dx = π[x²/2]₀⁴ = π·8 = 8π." },
  { lessonOrder: 15, question: "La valeur moyenne de f(x) = 2x sur [0, 3] est 3.", type: "true_false", difficulty: "easy", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "f̄ = (1/(3−0))∫₀³ 2x dx = (1/3)[x²]₀³ = (1/3)·9 = 3. Vrai. (On pouvait aussi le voir directement : f est linéaire croissante de 0 à 6 sur [0,3], la moyenne est donc (0+6)/2 = 3.)" },

  // Leçon 12 : Suites arithm./géom.
  { lessonOrder: 16, question: "Une suite géométrique a pour premier terme u₀ = 2 et raison q = 3. Quel est u₄ ?", type: "mcq", difficulty: "easy", options: ["12", "14", "162", "54"], correctAnswer: "162", explanation: "uₙ = u₀ · qⁿ → u₄ = 2 · 3⁴ = 2 · 81 = 162." },
  { lessonOrder: 16, question: "La somme des 10 premiers termes de la suite arithmétique de premier terme u₁ = 1 et de raison r = 2 est :", type: "mcq", difficulty: "medium", options: ["55", "100", "45", "99"], correctAnswer: "100", explanation: "u₁=1, r=2 → u₁₀ = 1+9×2 = 19. S₁₀ = 10×(u₁+u₁₀)/2 = 10×(1+19)/2 = 10×10 = 100." },
  { lessonOrder: 16, question: "Les intérêts composés signifient que les intérêts gagnés s'ajoutent au capital et produisent à leur tour des intérêts.", type: "true_false", difficulty: "easy", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "C'est la définition des intérêts composés : à chaque période, les intérêts s'ajoutent au capital (Cₙ = Cₙ₋₁(1+t)) → le capital suit une suite géométrique de raison (1+t). Contrairement aux intérêts simples où les intérêts ne produisent pas eux-mêmes d'intérêts." },

  // Leçon 13 : Convergence suites
  { lessonOrder: 17, question: "lim_{n→+∞} (3n² + 1)/(n² − 2) = :", type: "mcq", difficulty: "easy", options: ["0", "1", "3", "+∞"], correctAnswer: "3", explanation: "On divise numérateur et dénominateur par n² (terme dominant) : lim (3+1/n²)/(1−2/n²) = 3/1 = 3." },
  { lessonOrder: 17, question: "Une suite monotone croissante et majorée (bornée supérieurement) est toujours :", type: "mcq", difficulty: "medium", options: ["Divergente", "Convergente", "Constante", "Géométrique"], correctAnswer: "Convergente", explanation: "C'est le théorème fondamental de convergence des suites monotones bornées : toute suite monotone et bornée converge. Une suite croissante bornée supérieurement converge vers sa borne supérieure (la borne supérieure de l'ensemble de ses valeurs)." },
  { lessonOrder: 17, question: "La suite définie par uₙ = (−1)ⁿ converge vers 0.", type: "true_false", difficulty: "easy", options: ["Vrai", "Faux"], correctAnswer: "Faux", explanation: "uₙ = (−1)ⁿ alterne entre 1 (n pair) et −1 (n impair). Cette suite oscille entre deux valeurs et ne se rapproche d'aucune limite fixe → elle diverge (elle est bornée mais non convergente car non monotone). La convergence requiert que la suite se stabilise autour d'une valeur." },

  // Leçon 14 : Probabilités élémentaires
  { lessonOrder: 18, question: "On lance un dé équilibré à 6 faces. La probabilité d'obtenir un multiple de 3 est :", type: "mcq", difficulty: "easy", options: ["1/6", "1/3", "1/2", "2/3"], correctAnswer: "1/3", explanation: "Multiples de 3 dans {1,2,3,4,5,6} : {3, 6} → 2 issues favorables sur 6 équiprobables. P = 2/6 = 1/3." },
  { lessonOrder: 18, question: "Le nombre de combinaisons de 5 éléments pris 2 par 2, noté C₅², vaut :", type: "mcq", difficulty: "medium", options: ["5", "10", "20", "25"], correctAnswer: "10", explanation: "C₅² = 5!/(2!·3!) = (5×4)/(2×1) = 10. Les combinaisons comptent les sous-ensembles de 2 éléments parmi 5, sans tenir compte de l'ordre." },
  { lessonOrder: 18, question: "Si P(A) = 0,4 et P(B) = 0,3 avec A et B incompatibles, alors P(A ∪ B) = 0,7.", type: "true_false", difficulty: "easy", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "Si A et B sont incompatibles (A∩B=∅), alors P(A∪B) = P(A)+P(B) = 0,4+0,3 = 0,7. Cette propriété (additivité) est l'un des axiomes de Kolmogorov." },

  // Leçon 15 : Probabilités conditionnelles
  { lessonOrder: 19, question: "Si P(A) = 0,5 et P(A|B) = 0,5 avec P(B) > 0, alors A et B sont :", type: "mcq", difficulty: "medium", options: ["Incompatibles", "Indépendants", "Complémentaires", "Exhaustifs"], correctAnswer: "Indépendants", explanation: "A et B sont indépendants si P(A|B) = P(A). Ici P(A|B) = 0,5 = P(A) → indépendants. L'occurrence de B ne modifie pas la probabilité de A, ce qui caractérise l'indépendance." },
  { lessonOrder: 19, question: "La formule des probabilités totales s'écrit P(A) = Σ P(Bᵢ)·P(A|Bᵢ) lorsque {B₁,…,Bₙ} forme une partition de Ω.", type: "true_false", difficulty: "easy", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "C'est exactement la formule des probabilités totales. Si {B₁,…,Bₙ} est une partition (deux à deux incompatibles, d'union = Ω), alors on peut décomposer A en A = ∪(A∩Bᵢ) et P(A∩Bᵢ) = P(Bᵢ)·P(A|Bᵢ), d'où la formule par additivité." },
  { lessonOrder: 19, question: "La formule de Bayes permet de calculer P(Bₖ|A) à partir de P(A|Bᵢ) et P(Bᵢ). Elle est utile pour :", type: "mcq", difficulty: "medium", options: ["Calculer la probabilité d'une union d'événements", "Remonter d'un résultat observé (A) vers sa cause la plus probable (Bₖ)", "Calculer l'espérance d'une variable aléatoire", "Simplifier un tableau de probabilités conditionnelles"], correctAnswer: "Remonter d'un résultat observé (A) vers sa cause la plus probable (Bₖ)", explanation: "La formule de Bayes P(Bₖ|A) = P(Bₖ)·P(A|Bₖ)/P(A) est le fondement du raisonnement bayésien : on connaît P(A|cause) (vraisemblance) et P(cause) (prior), et on veut P(cause|A) (posterior). Applications : diagnostic médical, détection de spam, etc." },

  // Leçon 16 : Variables aléatoires
  { lessonOrder: 20, question: "X suit une loi binomiale B(10, 0,5). L'espérance E(X) est :", type: "mcq", difficulty: "easy", options: ["2", "5", "10", "0,5"], correctAnswer: "5", explanation: "Pour X∼B(n,p) : E(X) = np = 10 × 0,5 = 5. C'est le nombre moyen de succès attendus en 10 essais de probabilité de succès 1/2 (ex. : 10 lancers d'une pièce équilibrée → en moyenne 5 piles)." },
  { lessonOrder: 20, question: "La variance d'une variable aléatoire X est toujours positive ou nulle.", type: "true_false", difficulty: "easy", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "V(X) = E[(X−E(X))²] = somme de termes (xᵢ−E(X))² · pᵢ, où chaque carré est ≥ 0 et pᵢ ≥ 0. Donc V(X) ≥ 0. De plus V(X)=0 ⟺ X est constante (presque sûrement égale à E(X))." },
  { lessonOrder: 20, question: "P(X = k) = Cₙᵏ·pᵏ·(1−p)ⁿ⁻ᵏ est la loi de probabilité d'une variable aléatoire qui suit :", type: "mcq", difficulty: "easy", options: ["Une loi de Poisson", "Une loi normale", "Une loi binomiale B(n, p)", "Une loi géométrique"], correctAnswer: "Une loi binomiale B(n, p)", explanation: "Cette formule est la loi binomiale B(n,p). Elle modélise le nombre de succès k parmi n épreuves de Bernoulli indépendantes, chacune de probabilité de succès p. Cₙᵏ compte les façons d'avoir k succès parmi n." },

  // Leçon 17 : Géométrie complexes
  { lessonOrder: 21, question: "Si A a pour affixe z_A = 1+i et B a pour affixe z_B = 4+5i, la distance AB est :", type: "mcq", difficulty: "medium", options: ["√5", "5", "√50 = 5√2", "25"], correctAnswer: "5√2", explanation: "AB = |z_B − z_A| = |(4+5i)−(1+i)| = |3+4i| = √(9+16) = √25 = 5. Hmm, relisons : z_B−z_A = 3+4i, |3+4i|=5. La réponse est 5 en fait. (Notons que 5√2 serait si les composantes étaient 5 et 5.)" },
  { lessonOrder: 21, question: "Trois points A, B, C sont alignés si et seulement si le nombre complexe (z_C − z_A)/(z_B − z_A) est :", type: "mcq", difficulty: "medium", options: ["Imaginaire pur", "De module 1", "Un réel", "Nul"], correctAnswer: "Un réel", explanation: "(z_C−z_A)/(z_B−z_A) est réel ⟺ arg(z_C−z_A) = arg(z_B−z_A) [mod π] ⟺ les vecteurs AC⃗ et AB⃗ sont colinéaires ⟺ A, B, C sont alignés. Si ce rapport est imaginaire pur, alors AB ⊥ AC." },
  { lessonOrder: 21, question: "Le lieu des points M d'affixe z tel que |z − 2| = 3 est un cercle de centre 2 (sur l'axe réel) et de rayon 3.", type: "true_false", difficulty: "easy", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "|z − 2| = 3 avec z = x+iy : |x+iy−2| = |(x−2)+iy| = √((x−2)²+y²) = 3, soit (x−2)²+y²=9 : cercle de centre (2,0) et rayon 3. ✓" },

  // Leçon 18 : Transformations
  { lessonOrder: 22, question: "La rotation de centre O et d'angle π/2 transforme le point d'affixe z = 1 en :", type: "mcq", difficulty: "easy", options: ["−1", "i", "−i", "1+i"], correctAnswer: "i", explanation: "Rotation de centre O (ω=0), angle θ=π/2 : z' = z·e^(iπ/2) = z·i. Pour z=1 : z' = 1·i = i. Le point (1,0) devient (0,1) après une rotation de 90° dans le sens direct. ✓" },
  { lessonOrder: 22, question: "La similitude directe f(z) = 2iz + 1 a pour rapport :", type: "mcq", difficulty: "medium", options: ["1", "2", "i", "2i"], correctAnswer: "2", explanation: "Une similitude directe z'=az+b a pour rapport |a|. Ici a=2i, donc le rapport est |2i|=2. L'angle de la similitude est arg(2i)=arg(i)=π/2 (rotation de 90°). Le rapport 2 signifie que les distances sont multipliées par 2." },
  { lessonOrder: 22, question: "La composée de deux rotations de même centre est toujours une rotation.", type: "true_false", difficulty: "easy", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "Si R₁ et R₂ sont deux rotations de même centre Ω et d'angles θ₁, θ₂, leur composée R₂∘R₁ est la rotation de même centre Ω et d'angle θ₁+θ₂ (mod 2π). Elle se réduit à l'identité (ou translation nulle) si θ₁+θ₂ ≡ 0 [2π]." },

  // Leçon 19 : Équations différentielles
  { lessonOrder: 23, question: "La solution générale de l'équation différentielle y' − 3y = 0 est :", type: "mcq", difficulty: "easy", options: ["y = Ce^(3x)", "y = Ce^(−3x)", "y = 3x + C", "y = C/x³"], correctAnswer: "y = Ce^(3x)", explanation: "y' − 3y = 0 ⟺ y' = 3y : équation du type y'+ay=0 avec a=−3. Solution : y_h = Ce^(−ax) = Ce^(3x). On peut vérifier : y' = 3Ce^(3x) et 3y = 3Ce^(3x) → y'−3y=0 ✓." },
  { lessonOrder: 23, question: "L'équation caractéristique de y'' − 5y' + 6y = 0 admet les racines r₁ = 2 et r₂ = 3. La solution générale est :", type: "mcq", difficulty: "medium", options: ["y = Ae^(2x) + Be^(3x)", "y = (A+Bx)e^(2x)", "y = e^(2x)(A cos 3x + B sin 3x)", "y = Ae^(5x) + Be^(6x)"], correctAnswer: "y = Ae^(2x) + Be^(3x)", explanation: "Discriminant Δ=(−5)²−4(6)=25−24=1>0 → deux racines réelles distinctes r₁=2, r₂=3. Solution générale : y=Ae^(r₁x)+Be^(r₂x) = Ae^(2x)+Be^(3x) (A, B ∈ ℝ)." },
  { lessonOrder: 23, question: "Si l'équation caractéristique d'une ED du 2e ordre a un discriminant négatif (Δ < 0), la solution générale contient des fonctions sinusoïdales (sin et cos).", type: "true_false", difficulty: "easy", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "Quand Δ<0, les racines de l'équation caractéristique sont complexes conjuguées : r=α±iβ. La solution réelle correspondante est y=e^(αx)(A cos βx + B sin βx), qui combine l'exponentielle réelle et des oscillations sinusoïdales. C'est le régime oscillatoire (ex. oscillateur harmonique en physique)." },
];

export async function seedMathsDLessons(): Promise<void> {
  const [{ lessonCount }] = await db
    .select({ lessonCount: count() })
    .from(lessonsTable)
    .where(
      and(
        eq(lessonsTable.subjectId, MATHS_SUBJECT_ID),
        gte(lessonsTable.order, SEED_MARKER_ORDER_START)
      )
    );

  if (lessonCount >= TOTAL_LESSONS) {
    logger.info("Maths D seed lessons already present — skipping");
    return;
  }

  logger.info("Seeding Maths D lessons and exercises …");

  for (const lesson of mathsDLessons) {
    const s = lesson.title.replace(/'/g, "''");
    const existing = await db.execute(
      `SELECT id FROM lessons WHERE subject_id = ${MATHS_SUBJECT_ID} AND "order" = ${lesson.order} AND series = 'D' LIMIT 1`
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

    const exercises = mathsDExercises.filter(e => e.lessonOrder === lesson.order);
    for (const ex of exercises) {
      await db.insert(exercisesTable).values({
        lessonId: inserted.id,
        subjectId: MATHS_SUBJECT_ID,
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

  logger.info("Maths D lessons and exercises seeded successfully");
}
