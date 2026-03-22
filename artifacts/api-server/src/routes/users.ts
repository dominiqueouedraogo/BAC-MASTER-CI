import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { authMiddleware, type AuthRequest } from "../middlewares/auth.js";

const router: IRouter = Router();

router.put("/profile", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { name, series, avatarUrl } = req.body;
    const updates: Record<string, unknown> = {};
    if (name) updates.name = name;
    if (series) updates.series = series;
    if (avatarUrl !== undefined) updates.avatarUrl = avatarUrl;

    const [user] = await db.update(usersTable)
      .set(updates)
      .where(eq(usersTable.id, req.userId!))
      .returning();

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      series: user.series,
      role: user.role,
      avatarUrl: user.avatarUrl,
      points: user.points,
      isPremium: user.isPremium,
      createdAt: user.createdAt,
    });
  } catch (err) {
    req.log.error({ err }, "UpdateProfile error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/goals", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const [user] = await db.select().from(usersTable).where(eq(usersTable.id, req.userId!)).limit(1);
    if (!user) { res.status(404).json({ error: "Not found" }); return; }

    const today = new Date().toISOString().split("T")[0];
    const isToday = user.lastActiveDate === today;

    res.json({
      lessonsPerDay: user.lessonsPerDay,
      exercisesPerDay: user.exercisesPerDay,
      studyMinutesPerDay: user.studyMinutesPerDay,
      lessonsCompletedToday: isToday ? 0 : 0,
      exercisesCompletedToday: isToday ? 0 : 0,
    });
  } catch (err) {
    req.log.error({ err }, "GetGoals error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/goals", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { lessonsPerDay, exercisesPerDay, studyMinutesPerDay } = req.body;
    const updates: Record<string, unknown> = {};
    if (lessonsPerDay) updates.lessonsPerDay = lessonsPerDay;
    if (exercisesPerDay) updates.exercisesPerDay = exercisesPerDay;
    if (studyMinutesPerDay) updates.studyMinutesPerDay = studyMinutesPerDay;

    await db.update(usersTable).set(updates).where(eq(usersTable.id, req.userId!));

    res.json({
      lessonsPerDay: lessonsPerDay || 3,
      exercisesPerDay: exercisesPerDay || 5,
      studyMinutesPerDay: studyMinutesPerDay || 60,
      lessonsCompletedToday: 0,
      exercisesCompletedToday: 0,
    });
  } catch (err) {
    req.log.error({ err }, "UpdateGoals error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
