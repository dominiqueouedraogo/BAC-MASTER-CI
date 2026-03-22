import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { usersTable, lessonsTable, exercisesTable, examsTable, reviewsTable } from "@workspace/db";
import { sql } from "drizzle-orm";
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
    }).from(usersTable).orderBy(usersTable.createdAt);
    res.json(users);
  } catch (err) {
    req.log.error({ err }, "GetAdminUsers error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
