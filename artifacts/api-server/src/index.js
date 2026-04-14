"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var logger_1 = require("./lib/logger");
var seed_anglais_1 = require("./lib/seed-anglais");
var seed_svt_d_1 = require("./lib/seed-svt-d");
var seed_maths_d_1 = require("./lib/seed-maths-d");
var seed_phys_chim_d_1 = require("./lib/seed-phys-chim-d");
var seed_philosophie_1 = require("./lib/seed-philosophie");
var seed_francais_1 = require("./lib/seed-francais");
var rawPort = process.env["PORT"];
if (!rawPort) {
    throw new Error("PORT environment variable is required but was not provided.");
}
var port = Number(rawPort);
if (Number.isNaN(port) || port <= 0) {
    throw new Error("Invalid PORT value: \"".concat(rawPort, "\""));
}
app_1.default.listen(port, function (err) {
    if (err) {
        logger_1.logger.error({ err: err }, "Error listening on port");
        process.exit(1);
    }
    logger_1.logger.info({ port: port }, "Server listening");
    (0, seed_anglais_1.seedAnglaisLessons)().catch(function (e) {
        return logger_1.logger.error({ err: e }, "Startup seed failed");
    });
    (0, seed_svt_d_1.seedSvtDLessons)().catch(function (e) {
        return logger_1.logger.error({ err: e }, "SVT D startup seed failed");
    });
    (0, seed_maths_d_1.seedMathsDLessons)().catch(function (e) {
        return logger_1.logger.error({ err: e }, "Maths D startup seed failed");
    });
    (0, seed_phys_chim_d_1.seedPhysChimDLessons)().catch(function (e) {
        return logger_1.logger.error({ err: e }, "Physique-Chimie D startup seed failed");
    });
    (0, seed_philosophie_1.seedPhiloLessons)().catch(function (e) {
        return logger_1.logger.error({ err: e }, "Philosophie startup seed failed");
    });
    (0, seed_francais_1.seedFrancaisLessons)().catch(function (e) {
        return logger_1.logger.error({ err: e }, "Français startup seed failed");
    });
});
