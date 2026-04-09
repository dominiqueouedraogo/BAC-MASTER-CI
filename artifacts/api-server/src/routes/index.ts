import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import authRouter from "./auth.js";
import usersRouter from "./users.js";
import subjectsRouter from "./subjects.js";
import lessonsRouter from "./lessons.js";
import exercisesRouter from "./exercises.js";
import examsRouter from "./exams.js";
import progressRouter from "./progress.js";
import gamificationRouter from "./gamification.js";
import reviewsRouter from "./reviews.js";
import chatRouter from "./chat.js";
import adminRouter from "./admin.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/subjects", subjectsRouter);
router.use("/lessons", lessonsRouter);
router.use("/exercises", exercisesRouter);
router.use("/exams", examsRouter);
router.use("/progress", progressRouter);
router.use(gamificationRouter);
router.use("/reviews", reviewsRouter);
router.use("/chat", chatRouter);
router.use("/admin", adminRouter);

export default router;
