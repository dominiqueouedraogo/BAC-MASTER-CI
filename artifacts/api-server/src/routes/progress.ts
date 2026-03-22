import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { lessonProgressTable, exerciseProgressTable, lessonsTable, exercisesTable, usersTable, subjectsTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";
import { authMiddleware, type AuthRequest } from "../middlewares/auth.js";

const router: IRouter = Router();

router.get("/", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId!;

    const [totalLessonsCount] = await db.select({ count: sql<number>`count(*)` }).from(lessonsTable);
    const [totalExercisesCount] = await db.select({ count: sql<number>`count(*)` }).from(exercisesTable);
    const [completedLessonsCount] = await db.select({ count: sql<number>`count(*)` }).from(lessonProgressTable).where(eq(lessonProgressTable.userId, userId));
    const [completedExercisesCount] = await db.select({ count: sql<number>`count(*)` }).from(exerciseProgressTable).where(eq(exerciseProgressTable.userId, userId));
    const [correctExercisesCount] = await db.select({ count: sql<number>`count(*)` }).from(exerciseProgressTable).where(eq(exerciseProgressTable.userId, userId));

    const [user] = await db.select().from(usersTable).where(eq(usersTable.id, userId)).limit(1);

    const totalLessons = Number(totalLessonsCount?.count || 0);
    const completedLessons = Number(completedLessonsCount?.count || 0);
    const totalExercises = Number(totalExercisesCount?.count || 0);
    const completedExercises = Number(completedExercisesCount?.count || 0);
    const correctExercises = Number(correctExercisesCount?.count || 0);
    const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    const recentProgressRows = await db.select().from(lessonProgressTable)
      .where(eq(lessonProgressTable.userId, userId))
      .orderBy(lessonProgressTable.completedAt)
      .limit(5);

    const recentLessonIds = recentProgressRows.map(r => r.lessonId);
    let recentLessons: unknown[] = [];
    if (recentLessonIds.length > 0) {
      recentLessons = await db.select({
        id: lessonsTable.id,
        title: lessonsTable.title,
        subjectId: lessonsTable.subjectId,
        subjectName: subjectsTable.name,
        series: lessonsTable.series,
        content: lessonsTable.content,
        summary: lessonsTable.summary,
        videoUrl: lessonsTable.videoUrl,
        audioUrl: lessonsTable.audioUrl,
        pdfUrl: lessonsTable.pdfUrl,
        isPremium: lessonsTable.isPremium,
        duration: lessonsTable.duration,
        order: lessonsTable.order,
        createdAt: lessonsTable.createdAt,
      }).from(lessonsTable)
        .leftJoin(subjectsTable, eq(lessonsTable.subjectId, subjectsTable.id))
        .where(eq(lessonsTable.id, recentLessonIds[0]));
    }

    res.json({
      totalLessons,
      completedLessons,
      totalExercises,
      completedExercises,
      correctExercises,
      progressPercentage,
      points: user?.points || 0,
      streak: user?.streak || 0,
      recentLessons,
    });
  } catch (err) {
    req.log.error({ err }, "GetProgress error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/lesson/:lessonId", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const lessonId = parseInt(req.params.lessonId);
    const userId = req.userId!;

    const existing = await db.select().from(lessonProgressTable)
      .where(eq(lessonProgressTable.userId, userId))
      .limit(1);

    if (!existing.some(p => p.lessonId === lessonId)) {
      await db.insert(lessonProgressTable).values({ userId, lessonId, completed: true });
      await db.update(usersTable).set({ points: sql`${usersTable.points} + 10` }).where(eq(usersTable.id, userId));
    }

    res.json({ success: true, message: "Progress updated" });
  } catch (err) {
    req.log.error({ err }, "MarkLessonComplete error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
