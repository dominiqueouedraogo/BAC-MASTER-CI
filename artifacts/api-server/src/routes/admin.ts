import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { usersTable, lessonsTable, exercisesTable, examsTable, reviewsTable, subjectsTable, lessonProgressTable } from "@workspace/db";
import { eq, sql, desc } from "drizzle-orm";
import { authMiddleware, adminMiddleware, type AuthRequest } from "../middlewares/auth.js";

const router: IRouter = Router();

router.get("/stats", authMiddleware, adminMiddleware, async (req: AuthRequest, res) => {
  try {
    const [totalUsers] = await db.select({ count: sql<number>`count(*)` }).from(usersTable);
    const [premiumUsers] = await db.select({ count: sql<number>`count(*)` }).from(usersTable).where(sql`is_premium = true`);
    const [totalLessons] = await db.select({ count: sql<number>`count(*)` }).from(lessonsTable);
    const [totalExercises] = await db.select({ count: sql<number>`count(*)` }).from(exercisesTable);
    const [totalExams] = await db.select({ count: sql<number>`count(*)` }).from(examsTable);
    const [totalReviews] = await db.select({ count: sql<number>`count(*)` }).from(reviewsTable);

    res.json({
      totalUsers: Number(totalUsers?.count || 0),
      premiumUsers: Number(premiumUsers?.count || 0),
      totalLessons: Number(totalLessons?.count || 0),
      totalExercises: Number(totalExercises?.count || 0),
      totalExams: Number(totalExams?.count || 0),
      totalReviews: Number(totalReviews?.count || 0),
    });
  } catch (err) {
    req.log.error({ err }, "GetAdminStats error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/users", authMiddleware, adminMiddleware, async (req: AuthRequest, res) => {
  try {
    const users = await db.select({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
      series: usersTable.series,
      role: usersTable.role,
      avatarUrl: usersTable.avatarUrl,
      points: usersTable.points,
      isPremium: usersTable.isPremium,
      createdAt: usersTable.createdAt,
    }).from(usersTable).orderBy(desc(usersTable.createdAt));
    res.json(users);
  } catch (err) {
    req.log.error({ err }, "GetAdminUsers error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/activity", authMiddleware, adminMiddleware, async (req: AuthRequest, res) => {
  try {
    const dailyRegistrations = await db.execute(sql`
      SELECT TO_CHAR(created_at, 'Dy') AS day, COUNT(*) AS count
      FROM users
      WHERE created_at >= NOW() - INTERVAL '7 days'
      GROUP BY TO_CHAR(created_at, 'Dy'), DATE(created_at)
      ORDER BY DATE(created_at)
    `);

    const topLessons = await db
      .select({
        lessonId: lessonProgressTable.lessonId,
        title: lessonsTable.title,
        views: sql<number>`count(*)`,
      })
      .from(lessonProgressTable)
      .leftJoin(lessonsTable, eq(lessonProgressTable.lessonId, lessonsTable.id))
      .groupBy(lessonProgressTable.lessonId, lessonsTable.title)
      .orderBy(desc(sql`count(*)`))
      .limit(5);

    const seriesBreakdown = await db.execute(sql`
      SELECT series, COUNT(*) AS count
      FROM users
      WHERE role = 'student'
      GROUP BY series
      ORDER BY count DESC
    `);

    res.json({
      dailyRegistrations: dailyRegistrations.rows,
      topLessons,
      seriesBreakdown: seriesBreakdown.rows,
    });
  } catch (err) {
    req.log.error({ err }, "GetAdminActivity error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/subjects", authMiddleware, adminMiddleware, async (req: AuthRequest, res) => {
  try {
    const subjects = await db.select().from(subjectsTable).orderBy(subjectsTable.order);
    res.json(subjects);
  } catch (err) {
    req.log.error({ err }, "GetAdminSubjects error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/courses", authMiddleware, adminMiddleware, async (req: AuthRequest, res) => {
  try {
    const lessons = await db
      .select({
        id: lessonsTable.id,
        title: lessonsTable.title,
        subjectId: lessonsTable.subjectId,
        subjectName: subjectsTable.name,
        series: lessonsTable.series,
        isPremium: lessonsTable.isPremium,
        duration: lessonsTable.duration,
        order: lessonsTable.order,
        createdAt: lessonsTable.createdAt,
      })
      .from(lessonsTable)
      .leftJoin(subjectsTable, eq(lessonsTable.subjectId, subjectsTable.id))
      .orderBy(lessonsTable.order);
    res.json(lessons);
  } catch (err) {
    req.log.error({ err }, "GetAdminCourses error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/courses/:id", authMiddleware, adminMiddleware, async (req: AuthRequest, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(exercisesTable).where(eq(exercisesTable.lessonId, id));
    await db.delete(lessonsTable).where(eq(lessonsTable.id, id));
    res.json({ success: true, message: "Course and linked exercises deleted" });
  } catch (err) {
    req.log.error({ err }, "DeleteAdminCourse error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
