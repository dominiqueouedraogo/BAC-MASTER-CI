import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { usersTable, badgesTable, userBadgesTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { authMiddleware, type AuthRequest } from "../middlewares/auth.js";

const router: IRouter = Router();

router.get("/leaderboard", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string || "20");
    const users = await db.select({
      id: usersTable.id,
      name: usersTable.name,
      series: usersTable.series,
      points: usersTable.points,
      avatarUrl: usersTable.avatarUrl,
    }).from(usersTable).orderBy(desc(usersTable.points)).limit(limit);

    const leaderboard = users.map((u, i) => ({
      rank: i + 1,
      userId: u.id,
      name: u.name,
      avatarUrl: u.avatarUrl,
      series: u.series,
      points: u.points,
      badges: 0,
    }));

    res.json(leaderboard);
  } catch (err) {
    req.log.error({ err }, "GetLeaderboard error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/badges", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const allBadges = await db.select().from(badgesTable);
    const userBadges = await db.select().from(userBadgesTable).where(eq(userBadgesTable.userId, req.userId!));

    const earnedBadgeIds = new Set(userBadges.map(ub => ub.badgeId));
    const result = allBadges.map(b => ({
      ...b,
      earned: earnedBadgeIds.has(b.id),
      earnedAt: userBadges.find(ub => ub.badgeId === b.id)?.earnedAt || null,
    }));

    res.json(result);
  } catch (err) {
    req.log.error({ err }, "GetBadges error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
