import { Router, type IRouter } from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { db } from "@workspace/db";
import { usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { authMiddleware, generateToken, type AuthRequest } from "../middlewares/auth.js";

const router: IRouter = Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, series } = req.body;
    if (!name || !email || !password || !series) {
      res.status(400).json({ error: "Bad request", message: "Missing required fields" });
      return;
    }

    const existing = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
    if (existing.length > 0) {
      res.status(400).json({ error: "Bad request", message: "Email already in use" });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const [user] = await db.insert(usersTable).values({
      name,
      email,
      passwordHash,
      series,
      role: "student",
      points: 0,
      isPremium: false,
    }).returning();

    const token = generateToken(user.id, user.role);
    res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        series: user.series,
        role: user.role,
        avatarUrl: user.avatarUrl,
        points: user.points,
        isPremium: user.isPremium,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    req.log.error({ err }, "Register error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Bad request", message: "Missing email or password" });
      return;
    }

    const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
    if (!user) {
      res.status(401).json({ error: "Unauthorized", message: "Invalid credentials" });
      return;
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      res.status(401).json({ error: "Unauthorized", message: "Invalid credentials" });
      return;
    }

    const token = generateToken(user.id, user.role);
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        series: user.series,
        role: user.role,
        avatarUrl: user.avatarUrl,
        points: user.points,
        isPremium: user.isPremium,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    req.log.error({ err }, "Login error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/me", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const [user] = await db.select().from(usersTable).where(eq(usersTable.id, req.userId!)).limit(1);
    if (!user) {
      res.status(404).json({ error: "Not found" });
      return;
    }
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
    req.log.error({ err }, "GetMe error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ error: "Bad request", message: "Email requis" });
      return;
    }

    const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
    if (!user) {
      res.json({ message: "Si ce compte existe, un lien de réinitialisation a été créé." });
      return;
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 60 * 60 * 1000);

    await db.update(usersTable)
      .set({ resetToken: token, resetTokenExpiry: expiry })
      .where(eq(usersTable.id, user.id));

    res.json({ message: "Lien de réinitialisation créé.", resetToken: token });
  } catch (err) {
    req.log.error({ err }, "ForgotPassword error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      res.status(400).json({ error: "Bad request", message: "Token et mot de passe requis" });
      return;
    }

    const [user] = await db.select().from(usersTable).where(eq(usersTable.resetToken, token)).limit(1);
    if (!user || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
      res.status(400).json({ error: "Bad request", message: "Lien invalide ou expiré" });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await db.update(usersTable)
      .set({ passwordHash, resetToken: null, resetTokenExpiry: null })
      .where(eq(usersTable.id, user.id));

    res.json({ message: "Mot de passe réinitialisé avec succès." });
  } catch (err) {
    req.log.error({ err }, "ResetPassword error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
