import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { subjectsTable, lessonsTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";
import { authMiddleware, adminMiddleware, type AuthRequest } from "../middlewares/auth.js";

const router: IRouter = Router();

router.get("/", async (req, res) => {
  try {
    const { series } = req.query;
    let subjects = await db.select().from(subjectsTable).orderBy(subjectsTable.order);

    if (series) {
      subjects = subjects.filter(s => s.series === series || s.series === "ALL");
    }

    const withCounts = await Promise.all(subjects.map(async (s) => {
      const [count] = await db.select({ count: sql<number>`count(*)` })
        .from(lessonsTable)
        .where(eq(lessonsTable.subjectId, s.id));
      return { ...s, lessonCount: Number(count?.count || 0) };
    }));

    res.json(withCounts);
  } catch (err) {
    req.log.error({ err }, "GetSubjects error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [subject] = await db.select().from(subjectsTable).where(eq(subjectsTable.id, id)).limit(1);
    if (!subject) { res.status(404).json({ error: "Not found" }); return; }
    const [count] = await db.select({ count: sql<number>`count(*)` }).from(lessonsTable).where(eq(lessonsTable.subjectId, id));
    res.json({ ...subject, lessonCount: Number(count?.count || 0) });
  } catch (err) {
    req.log.error({ err }, "GetSubject error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", authMiddleware, adminMiddleware, async (req: AuthRequest, res) => {
  try {
    const { name, series, description, icon, color } = req.body;
    const [subject] = await db.insert(subjectsTable).values({ name, series: series || "ALL", description, icon, color }).returning();
    res.status(201).json({ ...subject, lessonCount: 0 });
  } catch (err) {
    req.log.error({ err }, "CreateSubject error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
