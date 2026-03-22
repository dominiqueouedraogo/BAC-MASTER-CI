/**
 * seedCourses.js
 * Standalone seed script for BAC MASTER CI — Terminale D courses.
 *
 * Prerequisites:
 *   npm install mongoose   (if not already installed)
 *
 * Usage:
 *   node seedCourses.js
 *
 * Update MONGODB_URI below to match your connection string.
 */

const mongoose = require("mongoose");

// ─── Configuration ───────────────────────────────────────────────────────────
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/bac_master_ci";

// ─── Course Schema ────────────────────────────────────────────────────────────
// Mirrors the fields your existing Course model uses.
// If your model already exists, remove this block and import it instead:
//   const Course = require("./models/Course");
const exerciseSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    type: {
      type: String,
      enum: ["mcq", "open", "true_false"],
      default: "mcq",
    },
    options: [String],
    answer: { type: String, required: true },
    explanation: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },
  },
  { _id: false }
);

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    series: { type: String, enum: ["A", "C", "D", "ALL"], required: true },
    subject: { type: String, required: true },
    level: { type: String, default: "Terminale" },
    content: { type: String, required: true },
    summary: { type: String },
    videoUrl: { type: String },
    audioUrl: { type: String },
    pdfUrl: { type: String },
    isPremium: { type: Boolean, default: false },
    duration: { type: Number },
    order: { type: Number, default: 0 },
    exercises: [exerciseSchema],
  },
  { timestamps: true }
);

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

// ─── Seed Data ────────────────────────────────────────────────────────────────
const courses = [
  // ════════════════════════════════════════
  //  MATHÉMATIQUES
  // ════════════════════════════════════════
  {
    title: "Les Suites Numériques",
    series: "D",
    subject: "Mathématiques",
    level: "Terminale",
    summary: "Suites arithmétiques et géométriques : définitions, formules et applications.",
    videoUrl: "https://www.youtube.com/embed/bbc9gbXBkk4",
    audioUrl: "https://example.com/audio/suites-numeriques.mp3",
    pdfUrl: "https://example.com/pdf/suites-numeriques.pdf",
    isPremium: false,
    duration: 45,
    order: 1,
    content: `
<h1>Les Suites Numériques</h1>

<h2>1. Définition</h2>
<p>Une <strong>suite numérique</strong> est une fonction définie sur <strong>ℕ</strong> (ou une partie de ℕ) à valeurs dans <strong>ℝ</strong>.</p>
<p>On note une suite <em>(u<sub>n</sub>)</em> où <em>n</em> est un entier naturel appelé <strong>rang</strong> ou <strong>indice</strong>.</p>

<h2>2. Suites arithmétiques</h2>
<p>Une suite <em>(u<sub>n</sub>)</em> est <strong>arithmétique</strong> si la différence entre deux termes consécutifs est constante :</p>
<blockquote><strong>u<sub>n+1</sub> − u<sub>n</sub> = r</strong> (raison)</blockquote>

<h3>Formule du terme général</h3>
<pre>u<sub>n</sub> = u<sub>0</sub> + n × r</pre>

<h3>Somme des n+1 premiers termes</h3>
<pre>S = (n + 1) × (u<sub>0</sub> + u<sub>n</sub>) / 2</pre>

<h3>Exemple</h3>
<p>Suite : 3, 7, 11, 15, … → raison r = 4, terme initial u<sub>0</sub> = 3</p>
<p>u<sub>10</sub> = 3 + 10 × 4 = <strong>43</strong></p>

<h2>3. Suites géométriques</h2>
<p>Une suite <em>(u<sub>n</sub>)</em> est <strong>géométrique</strong> si le rapport entre deux termes consécutifs est constant :</p>
<blockquote><strong>u<sub>n+1</sub> / u<sub>n</sub> = q</strong> (raison)</blockquote>

<h3>Formule du terme général</h3>
<pre>u<sub>n</sub> = u<sub>0</sub> × q<sup>n</sup></pre>

<h3>Somme des n+1 premiers termes (q ≠ 1)</h3>
<pre>S = u<sub>0</sub> × (1 − q<sup>n+1</sup>) / (1 − q)</pre>

<h3>Exemple</h3>
<p>Suite : 2, 6, 18, 54, … → raison q = 3, terme initial u<sub>0</sub> = 2</p>
<p>u<sub>5</sub> = 2 × 3<sup>5</sup> = 2 × 243 = <strong>486</strong></p>

<h2>4. Suites monotones</h2>
<ul>
  <li>Suite arithmétique croissante si r &gt; 0 ; décroissante si r &lt; 0</li>
  <li>Suite géométrique de termes positifs croissante si q &gt; 1 ; décroissante si 0 &lt; q &lt; 1</li>
</ul>

<h2>5. Convergence</h2>
<p>Une suite arithmétique converge seulement si r = 0 (suite constante).</p>
<p>Une suite géométrique converge vers 0 si |q| &lt; 1 et diverge si |q| ≥ 1 (sauf q = 1).</p>
    `,
    exercises: [
      {
        question: "La suite (u<sub>n</sub>) est arithmétique avec u<sub>0</sub> = 5 et r = 3. Quelle est la valeur de u<sub>7</sub> ?",
        type: "mcq",
        options: ["23", "26", "29", "32"],
        answer: "26",
        explanation: "u₇ = u₀ + 7 × r = 5 + 7 × 3 = 5 + 21 = 26.",
        difficulty: "easy",
      },
      {
        question: "Soit la suite géométrique (u<sub>n</sub>) avec u<sub>0</sub> = 4 et q = 2. Calculez u<sub>4</sub>.",
        type: "mcq",
        options: ["32", "48", "64", "128"],
        answer: "64",
        explanation: "u₄ = u₀ × q⁴ = 4 × 2⁴ = 4 × 16 = 64.",
        difficulty: "medium",
      },
      {
        question: "La somme des 5 premiers termes d'une suite arithmétique de premier terme 2 et de raison 3 vaut :",
        type: "mcq",
        options: ["30", "40", "42", "50"],
        answer: "30",
        explanation: "u₀=2, u₁=5, u₂=8, u₃=11, u₄=14. S = 2+5+8+11+14 = 40. Alternative : S = 5×(u₀+u₄)/2 = 5×(2+14)/2 = 5×8 = 40.",
        difficulty: "medium",
      },
    ],
  },

  {
    title: "Dérivation et Applications",
    series: "D",
    subject: "Mathématiques",
    level: "Terminale",
    summary: "Calcul des dérivées et étude des variations d'une fonction.",
    videoUrl: "https://www.youtube.com/embed/rAof9Ld5sOg",
    audioUrl: "https://example.com/audio/derivation.mp3",
    pdfUrl: "https://example.com/pdf/derivation.pdf",
    isPremium: false,
    duration: 50,
    order: 2,
    content: `
<h1>Dérivation et Applications</h1>

<h2>1. Nombre dérivé</h2>
<p>Le <strong>nombre dérivé</strong> de f en a est :</p>
<pre>f'(a) = lim<sub>h→0</sub> [f(a+h) − f(a)] / h</pre>

<h2>2. Dérivées usuelles</h2>
<table border="1" style="border-collapse:collapse; width:100%">
  <tr><th>Fonction</th><th>Dérivée</th></tr>
  <tr><td>f(x) = c</td><td>f'(x) = 0</td></tr>
  <tr><td>f(x) = xⁿ</td><td>f'(x) = n·xⁿ⁻¹</td></tr>
  <tr><td>f(x) = √x</td><td>f'(x) = 1/(2√x)</td></tr>
  <tr><td>f(x) = eˣ</td><td>f'(x) = eˣ</td></tr>
  <tr><td>f(x) = ln x</td><td>f'(x) = 1/x</td></tr>
  <tr><td>f(x) = sin x</td><td>f'(x) = cos x</td></tr>
  <tr><td>f(x) = cos x</td><td>f'(x) = −sin x</td></tr>
</table>

<h2>3. Règles de dérivation</h2>
<ul>
  <li><strong>(u + v)' = u' + v'</strong></li>
  <li><strong>(ku)' = ku'</strong></li>
  <li><strong>(uv)' = u'v + uv'</strong></li>
  <li><strong>(u/v)' = (u'v − uv') / v²</strong></li>
  <li><strong>(f∘g)' = (f'∘g) × g'</strong> (dérivée de la composée)</li>
</ul>

<h2>4. Tableau de variations</h2>
<p>Pour étudier les variations de f sur [a, b] :</p>
<ol>
  <li>Calculer f'(x)</li>
  <li>Résoudre f'(x) = 0 et trouver les racines</li>
  <li>Étudier le signe de f'(x) sur chaque intervalle</li>
  <li>Si f'(x) &gt; 0 → f croissante ; si f'(x) &lt; 0 → f décroissante</li>
</ol>

<h2>5. Tangente à la courbe</h2>
<p>L'équation de la tangente à la courbe de f au point d'abscisse a est :</p>
<pre>y = f'(a)(x − a) + f(a)</pre>
    `,
    exercises: [
      {
        question: "Quelle est la dérivée de f(x) = 3x⁴ − 2x² + 5 ?",
        type: "mcq",
        options: ["12x³ − 4x", "12x³ + 4x", "3x³ − 2x", "12x⁴ − 4x²"],
        answer: "12x³ − 4x",
        explanation: "f'(x) = 4×3x³ − 2×2x + 0 = 12x³ − 4x.",
        difficulty: "easy",
      },
      {
        question: "La fonction f(x) = x³ − 3x + 2 est croissante sur l'intervalle :",
        type: "mcq",
        options: ["[−1 ; 1]", "[−∞ ; −1] ∪ [1 ; +∞]", "[0 ; +∞]", "[−∞ ; 0]"],
        answer: "[−∞ ; −1] ∪ [1 ; +∞]",
        explanation: "f'(x) = 3x² − 3 = 3(x²−1) = 3(x−1)(x+1). f'(x) > 0 quand x < −1 ou x > 1.",
        difficulty: "medium",
      },
      {
        question: "L'équation de la tangente à la courbe de f(x) = x² au point d'abscisse 2 est :",
        type: "mcq",
        options: ["y = 4x − 4", "y = 4x + 4", "y = 2x − 4", "y = 2x + 4"],
        answer: "y = 4x − 4",
        explanation: "f'(x) = 2x donc f'(2) = 4 et f(2) = 4. Tangente : y = 4(x−2)+4 = 4x−8+4 = 4x−4.",
        difficulty: "medium",
      },
    ],
  },

  {
    title: "Intégration et Calcul d'Aires",
    series: "D",
    subject: "Mathématiques",
    level: "Terminale",
    summary: "Primitives, intégrale définie et calcul d'aires de surfaces planes.",
    videoUrl: "https://www.youtube.com/embed/rfG8ce4nNh0",
    audioUrl: "https://example.com/audio/integration.mp3",
    pdfUrl: "https://example.com/pdf/integration.pdf",
    isPremium: false,
    duration: 55,
    order: 3,
    content: `
<h1>Intégration et Calcul d'Aires</h1>

<h2>1. Primitives</h2>
<p>F est une <strong>primitive</strong> de f sur I si F'(x) = f(x) pour tout x ∈ I.</p>

<h2>2. Primitives usuelles</h2>
<table border="1" style="border-collapse:collapse; width:100%">
  <tr><th>f(x)</th><th>F(x)</th></tr>
  <tr><td>xⁿ (n ≠ −1)</td><td>xⁿ⁺¹/(n+1) + C</td></tr>
  <tr><td>1/x</td><td>ln|x| + C</td></tr>
  <tr><td>eˣ</td><td>eˣ + C</td></tr>
  <tr><td>sin x</td><td>−cos x + C</td></tr>
  <tr><td>cos x</td><td>sin x + C</td></tr>
</table>

<h2>3. Intégrale définie</h2>
<p>Si F est une primitive de f sur [a, b] :</p>
<pre>∫<sub>a</sub><sup>b</sup> f(x) dx = F(b) − F(a) = [F(x)]<sub>a</sub><sup>b</sup></pre>

<h2>4. Propriétés de l'intégrale</h2>
<ul>
  <li>Linéarité : ∫(αf + βg) = α∫f + β∫g</li>
  <li>Relation de Chasles : ∫<sub>a</sub><sup>c</sup> = ∫<sub>a</sub><sup>b</sup> + ∫<sub>b</sub><sup>c</sup></li>
  <li>Si f ≥ 0 sur [a,b], alors ∫<sub>a</sub><sup>b</sup> f(x) dx ≥ 0</li>
</ul>

<h2>5. Calcul d'aire</h2>
<p>L'aire en unités d'aire (u.a.) de la surface délimitée par la courbe de f, l'axe des abscisses et les droites x = a et x = b est :</p>
<pre>A = |∫<sub>a</sub><sup>b</sup> f(x) dx|</pre>
<p>Si la courbe change de signe, on découpe l'intégrale aux points d'annulation.</p>
    `,
    exercises: [
      {
        question: "Calculez ∫₀² (3x² + 2) dx",
        type: "mcq",
        options: ["8", "12", "10", "14"],
        answer: "12",
        explanation: "∫₀²(3x²+2)dx = [x³+2x]₀² = (8+4)−(0+0) = 12.",
        difficulty: "easy",
      },
      {
        question: "Une primitive de f(x) = cos x + 2x est :",
        type: "mcq",
        options: ["sin x + x² + C", "−sin x + x² + C", "sin x + 2 + C", "cos x + 2 + C"],
        answer: "sin x + x² + C",
        explanation: "∫(cos x + 2x)dx = sin x + x² + C.",
        difficulty: "easy",
      },
      {
        question: "L'aire sous la courbe de f(x) = x² entre x = 0 et x = 3 vaut :",
        type: "mcq",
        options: ["9 u.a.", "27 u.a.", "9 u.a.", "3 u.a."],
        answer: "9 u.a.",
        explanation: "∫₀³ x² dx = [x³/3]₀³ = 27/3 − 0 = 9 u.a.",
        difficulty: "medium",
      },
    ],
  },

  {
    title: "Probabilités et Statistiques",
    series: "D",
    subject: "Mathématiques",
    level: "Terminale",
    summary: "Probabilités conditionnelles, variables aléatoires et loi binomiale.",
    videoUrl: "https://www.youtube.com/embed/uzkc-qNVoOk",
    audioUrl: "https://example.com/audio/probabilites.mp3",
    pdfUrl: "https://example.com/pdf/probabilites.pdf",
    isPremium: false,
    duration: 50,
    order: 4,
    content: `
<h1>Probabilités et Statistiques</h1>

<h2>1. Probabilités conditionnelles</h2>
<p>La probabilité de A sachant B est :</p>
<pre>P(A|B) = P(A ∩ B) / P(B)  avec P(B) &gt; 0</pre>

<h2>2. Formule des probabilités totales</h2>
<p>Si {B₁, B₂, …, Bₙ} est une partition de l'univers :</p>
<pre>P(A) = P(A|B₁)P(B₁) + P(A|B₂)P(B₂) + … + P(A|Bₙ)P(Bₙ)</pre>

<h2>3. Indépendance de deux événements</h2>
<p>A et B sont <strong>indépendants</strong> si : <strong>P(A ∩ B) = P(A) × P(B)</strong></p>

<h2>4. Variable aléatoire</h2>
<p>Une variable aléatoire X est une fonction qui associe à chaque issue un nombre réel.</p>
<ul>
  <li><strong>Espérance :</strong> E(X) = Σ xᵢ × P(X = xᵢ)</li>
  <li><strong>Variance :</strong> V(X) = E(X²) − [E(X)]²</li>
  <li><strong>Écart-type :</strong> σ(X) = √V(X)</li>
</ul>

<h2>5. Loi binomiale B(n, p)</h2>
<p>X suit une loi binomiale B(n, p) si X est le nombre de succès dans n épreuves indépendantes de Bernoulli de probabilité p.</p>
<pre>P(X = k) = C(n, k) × pᵏ × (1−p)ⁿ⁻ᵏ</pre>
<ul>
  <li>E(X) = np</li>
  <li>V(X) = np(1−p)</li>
</ul>
    `,
    exercises: [
      {
        question: "Une urne contient 3 boules rouges et 2 boules bleues. On tire une boule au hasard. Quelle est la probabilité d'obtenir une boule rouge ?",
        type: "mcq",
        options: ["2/5", "3/5", "1/2", "3/2"],
        answer: "3/5",
        explanation: "Il y a 3 boules rouges sur 5 au total : P(rouge) = 3/5.",
        difficulty: "easy",
      },
      {
        question: "X suit B(10 ; 0,4). Quelle est l'espérance E(X) ?",
        type: "mcq",
        options: ["2", "4", "6", "8"],
        answer: "4",
        explanation: "E(X) = np = 10 × 0,4 = 4.",
        difficulty: "easy",
      },
      {
        question: "On lance un dé équilibré 3 fois. La probabilité d'obtenir exactement deux fois le chiffre 6 est :",
        type: "mcq",
        options: ["1/72", "15/216", "1/36", "5/72"],
        answer: "15/216",
        explanation: "X ∼ B(3 ; 1/6). P(X=2) = C(3,2)×(1/6)²×(5/6)¹ = 3×(1/36)×(5/6) = 15/216.",
        difficulty: "hard",
      },
    ],
  },

  // ════════════════════════════════════════
  //  PHYSIQUE-CHIMIE
  // ════════════════════════════════════════
  {
    title: "Les Ondes Mécaniques",
    series: "D",
    subject: "Physique-Chimie",
    level: "Terminale",
    summary: "Propagation des ondes mécaniques, périodiques et sonores.",
    videoUrl: "https://www.youtube.com/embed/kKKM8Y-u7ds",
    audioUrl: "https://example.com/audio/ondes-mecaniques.mp3",
    pdfUrl: "https://example.com/pdf/ondes-mecaniques.pdf",
    isPremium: false,
    duration: 45,
    order: 5,
    content: `
<h1>Les Ondes Mécaniques</h1>

<h2>1. Définition</h2>
<p>Une <strong>onde mécanique</strong> est une perturbation qui se propage dans un milieu matériel sans transport de matière, mais avec transport d'énergie.</p>

<h2>2. Types d'ondes</h2>
<ul>
  <li><strong>Ondes transversales :</strong> la perturbation est perpendiculaire à la direction de propagation (ex : corde vibrante)</li>
  <li><strong>Ondes longitudinales :</strong> la perturbation est parallèle à la direction de propagation (ex : son dans l'air)</li>
</ul>

<h2>3. Caractéristiques d'une onde périodique</h2>
<ul>
  <li><strong>Période T</strong> (s) : durée d'un cycle complet</li>
  <li><strong>Fréquence f = 1/T</strong> (Hz)</li>
  <li><strong>Longueur d'onde λ = v × T</strong> (m)</li>
  <li><strong>Célérité v</strong> (m/s) : vitesse de propagation</li>
</ul>

<h2>4. Relation fondamentale</h2>
<pre>v = λ × f = λ / T</pre>

<h2>5. Ondes sonores</h2>
<ul>
  <li>Fréquence audible : 20 Hz à 20 000 Hz</li>
  <li>Infrasons : f &lt; 20 Hz</li>
  <li>Ultrasons : f &gt; 20 000 Hz</li>
  <li>Vitesse du son dans l'air à 20°C : v ≈ 340 m/s</li>
</ul>

<h2>6. Niveau sonore</h2>
<pre>L = 10 × log(I / I₀)   (en décibels, dB)</pre>
<p>avec I₀ = 10⁻¹² W/m² (seuil d'audibilité)</p>
    `,
    exercises: [
      {
        question: "Une onde sonore de fréquence 440 Hz se propage dans l'air à 340 m/s. Quelle est sa longueur d'onde ?",
        type: "mcq",
        options: ["0,57 m", "0,77 m", "0,87 m", "0,97 m"],
        answer: "0,77 m",
        explanation: "λ = v/f = 340/440 ≈ 0,77 m.",
        difficulty: "easy",
      },
      {
        question: "Une onde a une période de 0,02 s. Quelle est sa fréquence ?",
        type: "mcq",
        options: ["20 Hz", "50 Hz", "100 Hz", "200 Hz"],
        answer: "50 Hz",
        explanation: "f = 1/T = 1/0,02 = 50 Hz.",
        difficulty: "easy",
      },
      {
        question: "Les ultrasons ont une fréquence :",
        type: "mcq",
        options: ["Inférieure à 20 Hz", "Entre 20 Hz et 20 kHz", "Supérieure à 20 kHz", "Égale à 440 Hz"],
        answer: "Supérieure à 20 kHz",
        explanation: "Les ultrasons ont une fréquence supérieure à 20 000 Hz (20 kHz), au-delà du seuil d'audibilité humaine.",
        difficulty: "easy",
      },
    ],
  },

  {
    title: "Électricité : Circuits en Courant Continu",
    series: "D",
    subject: "Physique-Chimie",
    level: "Terminale",
    summary: "Lois de Kirchhoff, résistances et puissance électrique.",
    videoUrl: "https://www.youtube.com/embed/mc979OhitAg",
    audioUrl: "https://example.com/audio/circuits-cc.mp3",
    pdfUrl: "https://example.com/pdf/circuits-cc.pdf",
    isPremium: false,
    duration: 50,
    order: 6,
    content: `
<h1>Électricité : Circuits en Courant Continu</h1>

<h2>1. Grandeurs électriques fondamentales</h2>
<ul>
  <li><strong>Intensité I</strong> (A) : charge par unité de temps — I = Q/t</li>
  <li><strong>Tension U</strong> (V) : différence de potentiel entre deux points</li>
  <li><strong>Résistance R</strong> (Ω) : opposition au courant — loi d'Ohm : U = R × I</li>
</ul>

<h2>2. Lois de Kirchhoff</h2>
<h3>Loi des nœuds</h3>
<p>La somme des intensités des courants entrant en un nœud est égale à la somme des intensités des courants sortant.</p>
<pre>ΣI<sub>entrants</sub> = ΣI<sub>sortants</sub></pre>

<h3>Loi des mailles</h3>
<p>La somme algébrique des tensions dans une maille fermée est nulle.</p>
<pre>ΣU = 0</pre>

<h2>3. Résistances en série</h2>
<pre>R<sub>éq</sub> = R₁ + R₂ + … + Rₙ</pre>

<h2>4. Résistances en parallèle</h2>
<pre>1/R<sub>éq</sub> = 1/R₁ + 1/R₂ + … + 1/Rₙ</pre>

<h2>5. Puissance et énergie électrique</h2>
<ul>
  <li>Puissance : <strong>P = U × I = R × I² = U²/R</strong> (Watts)</li>
  <li>Énergie : <strong>E = P × t</strong> (Joules)</li>
  <li>Effet Joule : la puissance dissipée en chaleur — P<sub>J</sub> = R × I²</li>
</ul>
    `,
    exercises: [
      {
        question: "Un résistor de 100 Ω est soumis à une tension de 12 V. Quelle est l'intensité qui le traverse ?",
        type: "mcq",
        options: ["0,12 A", "0,8 A", "1,2 A", "8,3 A"],
        answer: "0,12 A",
        explanation: "D'après la loi d'Ohm : I = U/R = 12/100 = 0,12 A.",
        difficulty: "easy",
      },
      {
        question: "Deux résistances R₁ = 20 Ω et R₂ = 30 Ω sont montées en série. Quelle est la résistance équivalente ?",
        type: "mcq",
        options: ["10 Ω", "12 Ω", "50 Ω", "600 Ω"],
        answer: "50 Ω",
        explanation: "En série : R_éq = R₁ + R₂ = 20 + 30 = 50 Ω.",
        difficulty: "easy",
      },
      {
        question: "Un appareil de 500 W fonctionne pendant 2 heures. Quelle énergie consomme-t-il ?",
        type: "mcq",
        options: ["250 J", "1000 J", "3 600 000 J", "1 000 000 J"],
        answer: "3 600 000 J",
        explanation: "E = P × t = 500 × (2 × 3600) = 500 × 7200 = 3 600 000 J.",
        difficulty: "medium",
      },
    ],
  },

  {
    title: "Optique Géométrique",
    series: "D",
    subject: "Physique-Chimie",
    level: "Terminale",
    summary: "Lois de la réfraction, lentilles convergentes et divergentes.",
    videoUrl: "https://www.youtube.com/embed/MvT3GFInzs4",
    audioUrl: "https://example.com/audio/optique.mp3",
    pdfUrl: "https://example.com/pdf/optique.pdf",
    isPremium: true,
    duration: 55,
    order: 7,
    content: `
<h1>Optique Géométrique</h1>

<h2>1. Lois de Snell-Descartes</h2>
<p>Lors de la réfraction à l'interface de deux milieux d'indices n₁ et n₂ :</p>
<pre>n₁ × sin θ₁ = n₂ × sin θ₂</pre>
<ul>
  <li>Si n₂ &gt; n₁ : le rayon se rapproche de la normale (θ₂ &lt; θ₁)</li>
  <li>Si n₂ &lt; n₁ : le rayon s'éloigne de la normale (θ₂ &gt; θ₁)</li>
</ul>

<h2>2. Réflexion totale interne</h2>
<p>Se produit quand n₁ &gt; n₂ et θ₁ ≥ θ<sub>c</sub> avec :</p>
<pre>sin θ<sub>c</sub> = n₂ / n₁</pre>

<h2>3. Lentilles minces</h2>
<h3>Lentilles convergentes (convexes)</h3>
<ul>
  <li>Vergence C = 1/f' (en dioptries, δ)</li>
  <li>Foyer image F' : point où convergent les rayons parallèles</li>
</ul>

<h3>Relation de conjugaison (convention algébrique)</h3>
<pre>1/OA' − 1/OA = 1/f'</pre>

<h3>Grandissement transversal</h3>
<pre>γ = A'B' / AB = OA' / OA</pre>

<h2>4. Construction d'images</h2>
<p>Trois rayons particuliers pour une lentille convergente :</p>
<ol>
  <li>Rayon parallèle à l'axe optique → passe par F'</li>
  <li>Rayon passant par le centre optique O → non dévié</li>
  <li>Rayon passant par F → émerge parallèle à l'axe</li>
</ol>
    `,
    exercises: [
      {
        question: "Un rayon passe de l'eau (n=1,33) à l'air (n=1) avec un angle d'incidence de 30°. Quel est l'angle de réfraction ?",
        type: "mcq",
        options: ["30°", "41,8°", "48,2°", "22°"],
        answer: "41,8°",
        explanation: "n₁sinθ₁ = n₂sinθ₂ → sin θ₂ = 1,33 × sin30° / 1 = 1,33 × 0,5 = 0,665 → θ₂ = arcsin(0,665) ≈ 41,8°.",
        difficulty: "medium",
      },
      {
        question: "Une lentille convergente a une distance focale f' = 10 cm. Quelle est sa vergence ?",
        type: "mcq",
        options: ["0,1 δ", "1 δ", "10 δ", "100 δ"],
        answer: "10 δ",
        explanation: "Vergence C = 1/f' = 1/0,10 m = 10 dioptries.",
        difficulty: "easy",
      },
      {
        question: "Vrai ou faux : La réflexion totale interne peut se produire quand un rayon passe d'un milieu moins dense vers un milieu plus dense.",
        type: "true_false",
        options: [],
        answer: "false",
        explanation: "FAUX. La réflexion totale interne se produit uniquement quand le rayon passe d'un milieu PLUS dense (n₁ > n₂) vers un milieu moins dense, et que l'angle d'incidence dépasse l'angle critique.",
        difficulty: "medium",
      },
    ],
  },

  // ════════════════════════════════════════
  //  SVT
  // ════════════════════════════════════════
  {
    title: "La Division Cellulaire : Mitose et Méiose",
    series: "D",
    subject: "SVT",
    level: "Terminale",
    summary: "Mécanismes de la mitose et de la méiose, rôle dans la reproduction.",
    videoUrl: "https://www.youtube.com/embed/L0k-enzoeOM",
    audioUrl: "https://example.com/audio/division-cellulaire.mp3",
    pdfUrl: "https://example.com/pdf/division-cellulaire.pdf",
    isPremium: false,
    duration: 60,
    order: 8,
    content: `
<h1>La Division Cellulaire : Mitose et Méiose</h1>

<h2>1. La Mitose</h2>
<p>La <strong>mitose</strong> est la division cellulaire assurant la multiplication des cellules somatiques. Elle maintient la ploïdie (2n).</p>

<h3>Phases de la mitose</h3>
<ol>
  <li><strong>Prophase :</strong> condensation des chromosomes, disparition de l'enveloppe nucléaire, formation du fuseau mitotique</li>
  <li><strong>Métaphase :</strong> alignement des chromosomes sur la plaque équatoriale</li>
  <li><strong>Anaphase :</strong> séparation des chromatides sœurs, migration vers les pôles</li>
  <li><strong>Télophase :</strong> formation de deux noyaux fils, cytokinèse</li>
</ol>
<p><strong>Résultat :</strong> 2 cellules filles génétiquement identiques à la cellule mère (2n chromosomes)</p>

<h2>2. La Méiose</h2>
<p>La <strong>méiose</strong> est la division cellulaire produisant les gamètes. Elle réduit la ploïdie de 2n à n.</p>

<h3>Méiose I (division réductionnelle)</h3>
<ul>
  <li>Prophase I : synapsis, crossing-over (brassage intrachromosomique)</li>
  <li>Métaphase I : alignement des bivalents</li>
  <li>Anaphase I : séparation des chromosomes homologues</li>
  <li>Télophase I : 2 cellules à n chromosomes dupliqués</li>
</ul>

<h3>Méiose II (division équationnelle)</h3>
<ul>
  <li>Similaire à une mitose sur les chromosomes dupliqués</li>
  <li>Résultat : 4 cellules haploïdes (n chromosomes)</li>
</ul>

<h2>3. Sources de variation génétique</h2>
<ul>
  <li><strong>Crossing-over</strong> (prophase I) : échange de segments entre chromosomes homologues</li>
  <li><strong>Ségrégation indépendante</strong> : orientation aléatoire des bivalents en métaphase I</li>
  <li><strong>Fécondation</strong> : combinaison aléatoire de gamètes</li>
</ul>
    `,
    exercises: [
      {
        question: "Durant quelle phase de la mitose les chromosomes s'alignent-ils sur la plaque équatoriale ?",
        type: "mcq",
        options: ["Prophase", "Métaphase", "Anaphase", "Télophase"],
        answer: "Métaphase",
        explanation: "La métaphase est caractérisée par l'alignement des chromosomes sur la plaque équatoriale (plaque métaphasique) sous l'action du fuseau mitotique.",
        difficulty: "easy",
      },
      {
        question: "Le crossing-over a lieu lors de la :",
        type: "mcq",
        options: ["Prophase de la mitose", "Métaphase II de la méiose", "Prophase I de la méiose", "Anaphase II de la méiose"],
        answer: "Prophase I de la méiose",
        explanation: "Le crossing-over (enjambement) se produit lors de la prophase I de la méiose, au stade pachytène, entre chromatides de chromosomes homologues.",
        difficulty: "medium",
      },
      {
        question: "La méiose produit combien de cellules filles haploïdes à partir d'une cellule diploïde ?",
        type: "mcq",
        options: ["2", "4", "8", "1"],
        answer: "4",
        explanation: "La méiose comprend deux divisions successives (méiose I et méiose II) produisant 4 cellules haploïdes (n chromosomes) à partir d'une cellule mère diploïde (2n chromosomes).",
        difficulty: "easy",
      },
    ],
  },

  {
    title: "La Génétique Mendélienne",
    series: "D",
    subject: "SVT",
    level: "Terminale",
    summary: "Lois de Mendel, monohybridisme, dihybridisme et liaisons génétiques.",
    videoUrl: "https://www.youtube.com/embed/Mehz7tCxjSE",
    audioUrl: "https://example.com/audio/genetique-mendelienne.mp3",
    pdfUrl: "https://example.com/pdf/genetique-mendelienne.pdf",
    isPremium: false,
    duration: 65,
    order: 9,
    content: `
<h1>La Génétique Mendélienne</h1>

<h2>1. Notions fondamentales</h2>
<ul>
  <li><strong>Gène :</strong> segment d'ADN contrôlant un caractère héréditaire</li>
  <li><strong>Allèle :</strong> forme alternative d'un gène</li>
  <li><strong>Génotype :</strong> constitution génétique (ex : AA, Aa, aa)</li>
  <li><strong>Phénotype :</strong> caractère observable</li>
  <li><strong>Homozygote :</strong> deux allèles identiques (AA ou aa)</li>
  <li><strong>Hétérozygote :</strong> deux allèles différents (Aa)</li>
  <li><strong>Dominance :</strong> l'allèle dominant s'exprime en présence de l'allèle récessif</li>
</ul>

<h2>2. Lois de Mendel</h2>
<h3>1ère loi : Uniformité des hybrides F1</h3>
<p>Le croisement de deux lignées pures différentes donne une F1 uniforme pour le caractère étudié.</p>

<h3>2ème loi : Ségrégation des allèles en F2</h3>
<p>Les allèles se séparent lors de la formation des gamètes : ratio phénotypique 3/4 dominant : 1/4 récessif en monohybridisme.</p>

<h3>3ème loi : Assortiment indépendant</h3>
<p>Quand deux paires de gènes sont indépendantes, elles se séparent indépendamment : ratio 9:3:3:1 en dihybridisme.</p>

<h2>3. Monohybridisme</h2>
<p>Étude d'un seul caractère. Échiquier de Punnett :</p>
<pre>
    A    a
A  AA   Aa
a  Aa   aa
</pre>
<p>F2 : 1/4 AA + 2/4 Aa + 1/4 aa → 3/4 phénotype dominant + 1/4 phénotype récessif</p>

<h2>4. Dihybridisme et gènes liés</h2>
<p>Si les gènes sont sur des chromosomes différents → ségrégation indépendante (ratio 9:3:3:1).</p>
<p>Si les gènes sont sur le même chromosome (liés) → recombinaison par crossing-over.</p>
    `,
    exercises: [
      {
        question: "Dans un croisement monohybride F1 × F1 (Aa × Aa), quelle est la proportion de génotype homozygote dominant AA en F2 ?",
        type: "mcq",
        options: ["1/4", "1/2", "3/4", "2/4"],
        answer: "1/4",
        explanation: "L'échiquier de Punnett donne : 1/4 AA + 2/4 Aa + 1/4 aa. La proportion de AA est donc 1/4.",
        difficulty: "easy",
      },
      {
        question: "Un individu de génotype AaBb est croisé avec aabb. Combien de classes phénotypiques différentes peut-on obtenir si les deux gènes sont indépendants ?",
        type: "mcq",
        options: ["2", "3", "4", "9"],
        answer: "4",
        explanation: "AaBb produit les gamètes AB, Ab, aB, ab. Croisés avec ab : AaBb, Aabb, aaBb, aabb → 4 phénotypes si les deux gènes sont indépendants.",
        difficulty: "medium",
      },
      {
        question: "Le phénotype d'un organisme est :",
        type: "mcq",
        options: [
          "L'ensemble de ses gènes",
          "L'ensemble de ses allèles",
          "Les caractères observables résultant de son génotype et de l'environnement",
          "Uniquement la séquence d'ADN",
        ],
        answer: "Les caractères observables résultant de son génotype et de l'environnement",
        explanation: "Le phénotype désigne l'ensemble des caractères observables d'un individu, résultant de l'expression de son génotype en interaction avec l'environnement.",
        difficulty: "easy",
      },
    ],
  },

  {
    title: "L'Immunologie : Le Système Immunitaire",
    series: "D",
    subject: "SVT",
    level: "Terminale",
    summary: "Immunité innée, immunité adaptative, anticorps et mémoire immunitaire.",
    videoUrl: "https://www.youtube.com/embed/GIJK3dwCL1g",
    audioUrl: "https://example.com/audio/immunologie.mp3",
    pdfUrl: "https://example.com/pdf/immunologie.pdf",
    isPremium: false,
    duration: 60,
    order: 10,
    content: `
<h1>L'Immunologie : Le Système Immunitaire</h1>

<h2>1. Les deux lignes de défense</h2>
<h3>Immunité innée (non spécifique)</h3>
<ul>
  <li><strong>Barrières physiques :</strong> peau, muqueuses, cils</li>
  <li><strong>Réaction inflammatoire :</strong> vasodilatation, recrutement des phagocytes</li>
  <li><strong>Phagocytose :</strong> ingestion et destruction des agents pathogènes par les macrophages et les polynucléaires</li>
</ul>

<h3>Immunité adaptative (spécifique)</h3>
<ul>
  <li>Répond spécifiquement à chaque antigène</li>
  <li>Met en jeu les lymphocytes B et T</li>
  <li>Développe une mémoire immunitaire</li>
</ul>

<h2>2. Immunité humorale (lymphocytes B)</h2>
<ol>
  <li>Reconnaissance de l'antigène par le lymphocyte B</li>
  <li>Activation et prolifération (expansion clonale)</li>
  <li>Différenciation en plasmocytes (production d'anticorps)</li>
  <li>Formation de lymphocytes B mémoire</li>
</ol>

<h2>3. Les anticorps (immunoglobulines)</h2>
<p>Structure en Y : 2 chaînes lourdes + 2 chaînes légères, régions variables et constantes.</p>
<p>Le site de liaison à l'antigène (paratope) est complémentaire à l'épitope de l'antigène.</p>

<h2>4. Immunité cellulaire (lymphocytes T)</h2>
<ul>
  <li><strong>Lymphocytes T4 (CD4+) :</strong> coordonnent la réponse immunitaire (sécrètent des interleukines)</li>
  <li><strong>Lymphocytes T8 (CD8+) :</strong> cytotoxiques, détruisent les cellules infectées</li>
</ul>

<h2>5. Mémoire immunitaire et vaccination</h2>
<p>La <strong>vaccination</strong> introduit un antigène (vivant atténué, inactivé, ou fragment) pour créer une mémoire immunitaire sans déclencher la maladie.</p>
<p>Lors d'une seconde exposition, la réponse secondaire est plus rapide et plus intense grâce aux cellules mémoire.</p>
    `,
    exercises: [
      {
        question: "Quelle cellule est responsable de la production des anticorps ?",
        type: "mcq",
        options: ["Macrophage", "Lymphocyte T8", "Plasmocyte", "Phagocyte"],
        answer: "Plasmocyte",
        explanation: "Les plasmocytes sont des lymphocytes B différenciés spécialisés dans la sécrétion massive d'anticorps spécifiques d'un antigène.",
        difficulty: "easy",
      },
      {
        question: "La vaccination repose sur :",
        type: "mcq",
        options: [
          "L'administration d'anticorps prêts à l'emploi",
          "La création d'une mémoire immunitaire par exposition contrôlée à un antigène",
          "La destruction immédiate des agents pathogènes",
          "L'augmentation du nombre de phagocytes",
        ],
        answer: "La création d'une mémoire immunitaire par exposition contrôlée à un antigène",
        explanation: "La vaccination stimule le système immunitaire en introduisant un antigène (affaibli ou inactivé) pour créer des cellules mémoire, sans provoquer la maladie.",
        difficulty: "medium",
      },
      {
        question: "Vrai ou faux : Les lymphocytes T8 (cytotoxiques) produisent des anticorps.",
        type: "true_false",
        options: [],
        answer: "false",
        explanation: "FAUX. Les lymphocytes T8 (CD8+) sont des lymphocytes cytotoxiques qui détruisent directement les cellules infectées. Ce sont les plasmocytes (lymphocytes B différenciés) qui produisent les anticorps.",
        difficulty: "medium",
      },
    ],
  },
];

// ─── Main Seeder ──────────────────────────────────────────────────────────────
async function seed() {
  console.log("🔌 Connecting to MongoDB...");

  await mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
  });

  console.log(`✅ Connected to: ${mongoose.connection.name}\n`);

  // Optional: clear existing Terminale D courses before inserting
  // Uncomment the next line to reset before each run:
  // await Course.deleteMany({ series: "D" });

  let inserted = 0;
  let skipped = 0;

  for (const courseData of courses) {
    const exists = await Course.findOne({
      title: courseData.title,
      series: courseData.series,
    });

    if (exists) {
      console.log(`⏭  Skipping (already exists): ${courseData.title}`);
      skipped++;
      continue;
    }

    const course = new Course(courseData);
    await course.save();
    console.log(`✅ Inserted: ${courseData.title} (${courseData.subject})`);
    inserted++;
  }

  console.log(`
════════════════════════════════════════
  Seeding complete!
  Inserted : ${inserted}
  Skipped  : ${skipped}
  Total    : ${courses.length}
════════════════════════════════════════
  `);

  await mongoose.disconnect();
  console.log("🔌 Disconnected from MongoDB.");
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err.message);
  mongoose.disconnect();
  process.exit(1);
});
