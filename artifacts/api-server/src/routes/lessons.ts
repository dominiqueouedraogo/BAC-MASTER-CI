import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { lessonsTable, subjectsTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { authMiddleware, adminMiddleware, type AuthRequest } from "../middlewares/auth.js";

const router: IRouter = Router();

router.get("/", async (req, res) => {
  try {
    const { subjectId, series } = req.query;
    
    const conditions = [];
    if (subjectId) conditions.push(eq(lessonsTable.subjectId, parseInt(subjectId as string)));
    if (series) conditions.push(eq(lessonsTable.series, series as string));

    const rows = await db
      .select({
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
      })
      .from(lessonsTable)
      .leftJoin(subjectsTable, eq(lessonsTable.subjectId, subjectsTable.id))
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(lessonsTable.order);

    res.json(rows);
  } catch (err) {
    req.log.error({ err }, "GetLessons error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [row] = await db
      .select({
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
      })
      .from(lessonsTable)
      .leftJoin(subjectsTable, eq(lessonsTable.subjectId, subjectsTable.id))
      .where(eq(lessonsTable.id, id))
      .limit(1);

    if (!row) { res.status(404).json({ error: "Not found" }); return; }
    res.json(row);
  } catch (err) {
    req.log.error({ err }, "GetLesson error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", authMiddleware, adminMiddleware, async (req: AuthRequest, res) => {
  try {
    const { title, subjectId, series, content, summary, videoUrl, audioUrl, pdfUrl, isPremium, duration, order } = req.body;
    const [lesson] = await db.insert(lessonsTable).values({
      title, subjectId, series: series || "ALL", content, summary, videoUrl, audioUrl, pdfUrl,
      isPremium: isPremium || false, duration, order: order || 0,
    }).returning();

    const [subject] = await db.select().from(subjectsTable).where(eq(subjectsTable.id, subjectId)).limit(1);
    res.status(201).json({ ...lesson, subjectName: subject?.name || "" });
  } catch (err) {
    req.log.error({ err }, "CreateLesson error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", authMiddleware, adminMiddleware, async (req: AuthRequest, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, subjectId, series, content, summary, videoUrl, audioUrl, pdfUrl, isPremium, duration, order } = req.body;
    const [lesson] = await db.update(lessonsTable).set({
      title, subjectId, series, content, summary, videoUrl, audioUrl, pdfUrl, isPremium, duration, order,
    }).where(eq(lessonsTable.id, id)).returning();

    const [subject] = await db.select().from(subjectsTable).where(eq(subjectsTable.id, lesson.subjectId)).limit(1);
    res.json({ ...lesson, subjectName: subject?.name || "" });
  } catch (err) {
    req.log.error({ err }, "UpdateLesson error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", authMiddleware, adminMiddleware, async (req: AuthRequest, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(lessonsTable).where(eq(lessonsTable.id, id));
    res.json({ success: true, message: "Lesson deleted" });
  } catch (err) {
    req.log.error({ err }, "DeleteLesson error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
