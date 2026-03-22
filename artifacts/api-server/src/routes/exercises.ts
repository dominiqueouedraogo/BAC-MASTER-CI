import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { exercisesTable, subjectsTable, exerciseProgressTable, usersTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { authMiddleware, adminMiddleware, type AuthRequest } from "../middlewares/auth.js";

const router: IRouter = Router();

router.get("/", async (req, res) => {
  try {
    const { lessonId, subjectId, difficulty, series } = req.query;
    const conditions = [];
    if (lessonId) conditions.push(eq(exercisesTable.lessonId, parseInt(lessonId as string)));
    if (subjectId) conditions.push(eq(exercisesTable.subjectId, parseInt(subjectId as string)));
    if (difficulty) conditions.push(eq(exercisesTable.difficulty, difficulty as string));
    if (series) conditions.push(eq(exercisesTable.series, series as string));

    const rows = await db.select().from(exercisesTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(exercisesTable.createdAt);

    res.json(rows);
  } catch (err) {
    req.log.error({ err }, "GetExercises error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [exercise] = await db.select().from(exercisesTable).where(eq(exercisesTable.id, id)).limit(1);
    if (!exercise) { res.status(404).json({ error: "Not found" }); return; }
    res.json(exercise);
  } catch (err) {
    req.log.error({ err }, "GetExercise error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/:id/submit", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const id = parseInt(req.params.id);
    const { answer } = req.body;

    const [exercise] = await db.select().from(exercisesTable).where(eq(exercisesTable.id, id)).limit(1);
    if (!exercise) { res.status(404).json({ error: "Not found" }); return; }

    const correct = answer.trim().toLowerCase() === exercise.correctAnswer.trim().toLowerCase();
    const pointsEarned = correct ? (exercise.difficulty === "hard" ? 30 : exercise.difficulty === "medium" ? 20 : 10) : 0;

    await db.insert(exerciseProgressTable).values({
      userId: req.userId!,
      exerciseId: id,
      correct,
      pointsEarned,
    });

    if (pointsEarned > 0) {
      const [user] = await db.select().from(usersTable).where(eq(usersTable.id, req.userId!)).limit(1);
      if (user) {
        await db.update(usersTable).set({ points: user.points + pointsEarned }).where(eq(usersTable.id, req.userId!));
      }
    }

    res.json({
      correct,
      explanation: exercise.explanation,
      correctAnswer: exercise.correctAnswer,
      pointsEarned,
    });
  } catch (err) {
    req.log.error({ err }, "SubmitExercise error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", authMiddleware, adminMiddleware, async (req: AuthRequest, res) => {
  try {
    const { lessonId, subjectId, series, question, type, difficulty, options, correctAnswer, explanation, isPremium } = req.body;
    const [exercise] = await db.insert(exercisesTable).values({
      lessonId, subjectId, series: series || "ALL", question, type, difficulty,
      options, correctAnswer, explanation, isPremium: isPremium || false,
    }).returning();
    res.status(201).json(exercise);
  } catch (err) {
    req.log.error({ err }, "CreateExercise error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
