import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { chatMessagesTable, lessonsTable, usersTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { authMiddleware, type AuthRequest } from "../middlewares/auth.js";
import { openai } from "@workspace/integrations-openai-ai-server";

const router: IRouter = Router();

const EDUCATIONAL_SYSTEM_PROMPT = `Tu es un tuteur IA spécialisé pour les lycéens en Terminale (A, C, D) en Côte d'Ivoire. 
Tu t'appelles "BAC Assistant".
Tu réponds UNIQUEMENT aux questions éducatives: mathématiques, physique-chimie, SVT, français, philosophie, anglais, histoire-géographie, et toute autre matière du programme scolaire ivoirien.
Si la question n'est pas éducative, refuse poliment en disant: "Je suis désolé, je suis uniquement disponible pour répondre aux questions éducatives liées aux programmes scolaires. Posez-moi une question sur vos cours!"
Réponds toujours en français, de manière claire et pédagogique, comme un professeur bienveillant.
Donne des explications détaillées, des exemples concrets et des conseils pratiques.`;

function isEducationalQuestion(message: string): boolean {
  const nonEducationalPatterns = [
    /\b(recette|cuisine|restaurant|film|movie|musique|sport|football|jeu|game|politique|religion|argent|money|amour|love|date|rencontre|blague|joke)\b/i,
    /\b(hack|pirater|tricher|cheat|voler|steal)\b/i,
  ];
  
  const educationalPatterns = [
    /\b(math|calcul|équation|fonction|géométrie|algèbre|trigonométrie|statistique)\b/i,
    /\b(physique|chimie|atome|molécule|réaction|force|énergie|électricité)\b/i,
    /\b(svt|biologie|cellule|plante|animal|corps humain|reproduction|écologie)\b/i,
    /\b(français|littérature|grammaire|conjugaison|dissertation|texte|lecture)\b/i,
    /\b(philosophie|philo|pensée|argument|thèse|antithèse)\b/i,
    /\b(anglais|english|grammar|vocabulary|traduction)\b/i,
    /\b(histoire|géographie|géo|guerre|révolution|pays|capitale|continent)\b/i,
    /\b(bac|terminal|exercice|cours|leçon|devoirs|examen|révision|étude)\b/i,
    /\b(comment|expliquer|définition|qu'est-ce|pourquoi|résoudre|calculer)\b/i,
  ];
  
  const hasNonEducational = nonEducationalPatterns.some(p => p.test(message));
  const hasEducational = educationalPatterns.some(p => p.test(message));
  
  if (hasEducational) return true;
  if (hasNonEducational) return false;
  return true;
}

router.post("/message", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { message, context } = req.body;
    if (!message) { res.status(400).json({ error: "Message required" }); return; }

    await db.insert(chatMessagesTable).values({
      userId: req.userId!,
      role: "user",
      content: message,
    });

    const isEducational = isEducationalQuestion(message);
    
    let reply: string;
    if (!isEducational) {
      reply = "Je suis désolé, je suis uniquement disponible pour répondre aux questions éducatives liées aux programmes scolaires. Posez-moi une question sur vos cours de Terminale!";
    } else {
      const systemContent = context
        ? `${EDUCATIONAL_SYSTEM_PROMPT}\n\nContexte du cours actuel: ${context}`
        : EDUCATIONAL_SYSTEM_PROMPT;

      const history = await db.select().from(chatMessagesTable)
        .where(eq(chatMessagesTable.userId, req.userId!))
        .orderBy(desc(chatMessagesTable.createdAt))
        .limit(10);

      const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
        { role: "system", content: systemContent },
        ...history.reverse().map(m => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
        { role: "user", content: message },
      ];

      const completion = await openai.chat.completions.create({
        model: "gpt-5.2",
        max_completion_tokens: 8192,
        messages,
      });

      reply = completion.choices[0]?.message?.content || "Je n'ai pas pu générer une réponse. Réessayez.";
    }

    await db.insert(chatMessagesTable).values({
      userId: req.userId!,
      role: "assistant",
      content: reply,
    });

    res.json({ reply, isEducational });
  } catch (err) {
    req.log.error({ err }, "ChatMessage error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/history", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const messages = await db.select().from(chatMessagesTable)
      .where(eq(chatMessagesTable.userId, req.userId!))
      .orderBy(chatMessagesTable.createdAt)
      .limit(50);
    res.json(messages);
  } catch (err) {
    req.log.error({ err }, "GetChatHistory error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/quiz-generate", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { lessonId, series } = req.body;
    if (!lessonId) { res.status(400).json({ error: "lessonId required" }); return; }

    const [lesson] = await db.select().from(lessonsTable).where(eq(lessonsTable.id, lessonId)).limit(1);
    if (!lesson) { res.status(404).json({ error: "Lesson not found" }); return; }

    const contentPreview = lesson.content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 3000);
    const seriesLabel = series || lesson.series || "D";

    const prompt = `Tu es un enseignant qui crée des quiz pour des élèves de Terminale ${seriesLabel} en Côte d'Ivoire.

Basé sur ce contenu de cours:
---
${contentPreview}
---

Génère exactement 5 questions à choix multiples (QCM) en français. 

RÉPONDS UNIQUEMENT avec un JSON valide, sans texte avant ou après. Format exact:
{
  "questions": [
    {
      "question": "Question ici?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option A",
      "explanation": "Explication courte ici."
    }
  ]
}

Règles:
- 5 questions obligatoires
- 4 options par question
- Niveau adapté à la Terminale ${seriesLabel}
- Questions variées couvrant différents aspects du cours
- Réponses claires et univoques`;

    const completion = await openai.chat.completions.create({
      model: "gpt-5.2",
      max_completion_tokens: 2000,
      messages: [
        { role: "system", content: "Tu génères des quiz éducatifs. Réponds uniquement en JSON valide." },
        { role: "user", content: prompt },
      ],
    });

    const rawContent = completion.choices[0]?.message?.content || "";
    const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
    if (!jsonMatch) { res.status(500).json({ error: "Failed to parse quiz response" }); return; }

    const quizData = JSON.parse(jsonMatch[0]);
    res.json({
      lessonTitle: lesson.title,
      questions: quizData.questions || [],
    });
  } catch (err) {
    req.log.error({ err }, "QuizGenerate error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/quiz-complete", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { correctAnswers } = req.body;
    const pts = Math.max(0, parseInt(correctAnswers) || 0) * 10;

    if (pts > 0) {
      const [user] = await db.select().from(usersTable).where(eq(usersTable.id, req.userId!)).limit(1);
      if (user) {
        await db.update(usersTable).set({ points: user.points + pts }).where(eq(usersTable.id, req.userId!));
      }
    }

    res.json({ pointsEarned: pts, message: pts > 0 ? `+${pts} points gagnés !` : "Aucun point gagné." });
  } catch (err) {
    req.log.error({ err }, "QuizComplete error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
