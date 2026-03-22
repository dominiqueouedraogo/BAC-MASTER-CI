import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { reviewsTable, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { authMiddleware, adminMiddleware, type AuthRequest } from "../middlewares/auth.js";

const router: IRouter = Router();

router.get("/", async (req, res) => {
  try {
    const lessonId = parseInt(req.query.lessonId as string);
    if (!lessonId) { res.status(400).json({ error: "lessonId required" }); return; }

    const reviews = await db.select({
      id: reviewsTable.id,
      lessonId: reviewsTable.lessonId,
      userId: reviewsTable.userId,
      userName: usersTable.name,
      rating: reviewsTable.rating,
      comment: reviewsTable.comment,
      isApproved: reviewsTable.isApproved,
      createdAt: reviewsTable.createdAt,
    }).from(reviewsTable)
      .leftJoin(usersTable, eq(reviewsTable.userId, usersTable.id))
      .where(eq(reviewsTable.lessonId, lessonId));

    res.json(reviews.filter(r => r.isApproved));
  } catch (err) {
    req.log.error({ err }, "GetReviews error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { lessonId, rating, comment } = req.body;
    const [review] = await db.insert(reviewsTable).values({
      lessonId,
      userId: req.userId!,
      rating,
      comment,
      isApproved: false,
    }).returning();

    const [user] = await db.select().from(usersTable).where(eq(usersTable.id, req.userId!)).limit(1);
    res.status(201).json({ ...review, userName: user?.name || "Utilisateur" });
  } catch (err) {
    req.log.error({ err }, "CreateReview error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id/moderate", authMiddleware, adminMiddleware, async (req: AuthRequest, res) => {
  try {
    const id = parseInt(req.params.id);
    const { approved } = req.body;
    await db.update(reviewsTable).set({ isApproved: approved }).where(eq(reviewsTable.id, id));
    res.json({ success: true, message: "Review moderated" });
  } catch (err) {
    req.log.error({ err }, "ModerateReview error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
