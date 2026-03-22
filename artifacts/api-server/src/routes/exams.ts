import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { examsTable, subjectsTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { authMiddleware, adminMiddleware, type AuthRequest } from "../middlewares/auth.js";

const router: IRouter = Router();

router.get("/", async (req, res) => {
  try {
    const { series, year, subjectId } = req.query;
    const conditions = [];
    if (series) conditions.push(eq(examsTable.series, series as string));
    if (year) conditions.push(eq(examsTable.year, parseInt(year as string)));
    if (subjectId) conditions.push(eq(examsTable.subjectId, parseInt(subjectId as string)));

    const rows = await db
      .select({
        id: examsTable.id,
        title: examsTable.title,
        subjectId: examsTable.subjectId,
        subjectName: subjectsTable.name,
        series: examsTable.series,
        year: examsTable.year,
        content: examsTable.content,
        correction: examsTable.correction,
        pdfUrl: examsTable.pdfUrl,
        isPremium: examsTable.isPremium,
        createdAt: examsTable.createdAt,
      })
      .from(examsTable)
      .leftJoin(subjectsTable, eq(examsTable.subjectId, subjectsTable.id))
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(examsTable.year);

    res.json(rows);
  } catch (err) {
    req.log.error({ err }, "GetExams error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [row] = await db
      .select({
        id: examsTable.id,
        title: examsTable.title,
        subjectId: examsTable.subjectId,
        subjectName: subjectsTable.name,
        series: examsTable.series,
        year: examsTable.year,
        content: examsTable.content,
        correction: examsTable.correction,
        pdfUrl: examsTable.pdfUrl,
        isPremium: examsTable.isPremium,
        createdAt: examsTable.createdAt,
      })
      .from(examsTable)
      .leftJoin(subjectsTable, eq(examsTable.subjectId, subjectsTable.id))
      .where(eq(examsTable.id, id))
      .limit(1);

    if (!row) { res.status(404).json({ error: "Not found" }); return; }
    res.json(row);
  } catch (err) {
    req.log.error({ err }, "GetExam error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", authMiddleware, adminMiddleware, async (req: AuthRequest, res) => {
  try {
    const { title, subjectId, series, year, content, correction, pdfUrl, isPremium } = req.body;
    const [exam] = await db.insert(examsTable).values({
      title, subjectId, series, year, content, correction, pdfUrl, isPremium: isPremium || false,
    }).returning();

    const [subject] = await db.select().from(subjectsTable).where(eq(subjectsTable.id, subjectId)).limit(1);
    res.status(201).json({ ...exam, subjectName: subject?.name || "" });
  } catch (err) {
    req.log.error({ err }, "CreateExam error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
