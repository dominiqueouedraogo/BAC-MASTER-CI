"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
exports.adminMiddleware = adminMiddleware;
exports.generateToken = generateToken;
var jsonwebtoken_1 = require("jsonwebtoken");
var JWT_SECRET = process.env.JWT_SECRET || "bac-master-ci-secret-key-2024";
function authMiddleware(req, res, next) {
    var authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ error: "Unauthorized", message: "No token provided" });
        return;
    }
    var token = authHeader.split(" ")[1];
    try {
        var payload = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.userId = payload.userId;
        req.userRole = payload.role;
        next();
    }
    catch (_a) {
        res.status(401).json({ error: "Unauthorized", message: "Invalid token" });
    }
}
function adminMiddleware(req, res, next) {
    if (req.userRole !== "admin") {
        res.status(403).json({ error: "Forbidden", message: "Admin access required" });
        return;
    }
    next();
}
function generateToken(userId, role) {
    return jsonwebtoken_1.default.sign({ userId: userId, role: role }, JWT_SECRET, { expiresIn: "30d" });
}
