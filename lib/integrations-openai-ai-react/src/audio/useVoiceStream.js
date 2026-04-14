"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useVoiceStream = useVoiceStream;
var react_1 = require("react");
var useAudioPlayback_1 = require("./useAudioPlayback");
var SSE_EVENT_DELIMITER = /\r\n\r\n|\n\n|\r\r/g;
function createAbortError() {
    var error = new Error("The operation was aborted");
    error.name = "AbortError";
    return error;
}
function toError(error) {
    if (error instanceof Error)
        return error;
    return new Error(typeof error === "string" ? error : "Unknown error");
}
function notifyError(callbacks, error) {
    var _a;
    try {
        (_a = callbacks.onError) === null || _a === void 0 ? void 0 : _a.call(callbacks, error);
    }
    catch (_b) {
        // Do not let onError mask the original error.
    }
}
function isVoiceStreamEvent(value) {
    if (!value || typeof value !== "object")
        return false;
    var record = value;
    if (record.done === true)
        return true;
    switch (record.type) {
        case "user_transcript":
        case "transcript":
        case "audio":
            return typeof record.data === "string";
        case "error":
            return typeof record.error === "string";
        default:
            return false;
    }
}
function parseVoiceStreamEvent(raw) {
    var parsed;
    try {
        parsed = JSON.parse(raw);
    }
    catch (_a) {
        throw new Error("Received malformed SSE JSON payload");
    }
    if (!isVoiceStreamEvent(parsed)) {
        throw new Error("Received unexpected SSE event shape");
    }
    return parsed;
}
function readSseDataFromBlock(block) {
    var normalizedBlock = block.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    var dataLines = [];
    for (var _i = 0, _a = normalizedBlock.split("\n"); _i < _a.length; _i++) {
        var line = _a[_i];
        if (!line.startsWith("data:")) {
            continue;
        }
        // SSE allows one optional leading space after the colon.
        dataLines.push(line.slice(5).replace(/^ /, ""));
    }
    if (dataLines.length === 0) {
        return null;
    }
    return dataLines.join("\n");
}
function extractCompleteSseBlocks(buffer) {
    var blocks = [];
    var lastIndex = 0;
    SSE_EVENT_DELIMITER.lastIndex = 0;
    var match;
    while ((match = SSE_EVENT_DELIMITER.exec(buffer)) !== null) {
        blocks.push(buffer.slice(lastIndex, match.index));
        lastIndex = match.index + match[0].length;
    }
    return {
        blocks: blocks,
        remaining: buffer.slice(lastIndex),
    };
}
function isDoneEvent(event) {
    return "done" in event && event.done === true;
}
function handleVoiceStreamEvent(event, playback, callbacks, state) {
    var _a, _b, _c;
    if (isDoneEvent(event)) {
        if (!state.didComplete) {
            state.didComplete = true;
            playback.signalComplete();
            (_a = callbacks.onComplete) === null || _a === void 0 ? void 0 : _a.call(callbacks, state.fullTranscript);
        }
        return;
    }
    switch (event.type) {
        case "user_transcript":
            (_b = callbacks.onUserTranscript) === null || _b === void 0 ? void 0 : _b.call(callbacks, event.data);
            return;
        case "transcript":
            state.fullTranscript += event.data;
            (_c = callbacks.onTranscript) === null || _c === void 0 ? void 0 : _c.call(callbacks, event.data, state.fullTranscript);
            return;
        case "audio":
            playback.pushAudio(event.data);
            return;
        case "error":
            throw new Error(event.error);
    }
}
function blobToBase64(blob, signal) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (signal === null || signal === void 0 ? void 0 : signal.aborted) {
                throw createAbortError();
            }
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var reader = new FileReader();
                    var cleanup = function () {
                        signal === null || signal === void 0 ? void 0 : signal.removeEventListener("abort", onAbort);
                        reader.onload = null;
                        reader.onerror = null;
                        reader.onabort = null;
                    };
                    var onAbort = function () {
                        cleanup();
                        try {
                            reader.abort();
                        }
                        catch (_a) {
                            // Ignore abort races if the read already finished.
                        }
                        reject(createAbortError());
                    };
                    signal === null || signal === void 0 ? void 0 : signal.addEventListener("abort", onAbort, { once: true });
                    reader.onload = function () {
                        var result = reader.result;
                        cleanup();
                        if (typeof result !== "string") {
                            reject(new Error("Failed to read audio blob"));
                            return;
                        }
                        var commaIndex = result.indexOf(",");
                        if (commaIndex === -1) {
                            reject(new Error("Failed to parse audio data URL"));
                            return;
                        }
                        resolve(result.slice(commaIndex + 1));
                    };
                    reader.onerror = function () {
                        var _a;
                        var error = (_a = reader.error) !== null && _a !== void 0 ? _a : new Error("Failed to read audio blob");
                        cleanup();
                        reject(error);
                    };
                    reader.onabort = function () {
                        cleanup();
                        reject(createAbortError());
                    };
                    reader.readAsDataURL(blob);
                })];
        });
    });
}
function readErrorText(response) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, response.text()];
                case 1: return [2 /*return*/, (_b.sent()).trim()];
                case 2:
                    _a = _b.sent();
                    return [2 /*return*/, ""];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function useVoiceStream(_a) {
    var _this = this;
    var workletPath = _a.workletPath, callbacks = __rest(_a, ["workletPath"]);
    var playback = (0, useAudioPlayback_1.useAudioPlayback)(workletPath);
    var callbacksRef = (0, react_1.useRef)(callbacks);
    callbacksRef.current = callbacks;
    var playbackRef = (0, react_1.useRef)(playback);
    playbackRef.current = playback;
    var activeRequestRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        return function () {
            var _a;
            (_a = activeRequestRef.current) === null || _a === void 0 ? void 0 : _a.abort();
        };
    }, []);
    var streamVoiceResponse = (0, react_1.useCallback)(function (url, audioBlob) { return __awaiter(_this, void 0, void 0, function () {
        var abortController, throwIfNotCurrent, processBlocks, state, base64Audio, response, detail, reader, decoder, buffer, _a, done, value, _b, blocks_1, remaining_1, _c, blocks, remaining, finalData, event_1, _d, error_1, err;
        var _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    (_e = activeRequestRef.current) === null || _e === void 0 ? void 0 : _e.abort();
                    abortController = new AbortController();
                    activeRequestRef.current = abortController;
                    throwIfNotCurrent = function () {
                        if (abortController.signal.aborted ||
                            activeRequestRef.current !== abortController) {
                            throw createAbortError();
                        }
                    };
                    processBlocks = function (blocks, state) {
                        for (var _i = 0, blocks_2 = blocks; _i < blocks_2.length; _i++) {
                            var block = blocks_2[_i];
                            throwIfNotCurrent();
                            var rawData = readSseDataFromBlock(block);
                            if (!rawData) {
                                continue;
                            }
                            var event_2 = parseVoiceStreamEvent(rawData);
                            handleVoiceStreamEvent(event_2, playbackRef.current, callbacksRef.current, state);
                        }
                    };
                    state = {
                        fullTranscript: "",
                        didComplete: false,
                    };
                    _f.label = 1;
                case 1:
                    _f.trys.push([1, 16, 17, 18]);
                    return [4 /*yield*/, playbackRef.current.init()];
                case 2:
                    _f.sent();
                    throwIfNotCurrent();
                    playbackRef.current.clear();
                    return [4 /*yield*/, blobToBase64(audioBlob, abortController.signal)];
                case 3:
                    base64Audio = _f.sent();
                    throwIfNotCurrent();
                    return [4 /*yield*/, fetch(url, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Accept: "text/event-stream",
                            },
                            body: JSON.stringify({ audio: base64Audio }),
                            signal: abortController.signal,
                        })];
                case 4:
                    response = _f.sent();
                    throwIfNotCurrent();
                    if (!!response.ok) return [3 /*break*/, 6];
                    return [4 /*yield*/, readErrorText(response)];
                case 5:
                    detail = _f.sent();
                    throw new Error(detail
                        ? "Voice request failed (".concat(response.status, " ").concat(response.statusText, "): ").concat(detail)
                        : "Voice request failed (".concat(response.status, " ").concat(response.statusText, ")"));
                case 6:
                    if (!response.body) {
                        throw new Error("Voice request failed: response body is missing");
                    }
                    reader = response.body.getReader();
                    decoder = new TextDecoder();
                    buffer = "";
                    _f.label = 7;
                case 7:
                    _f.trys.push([7, , 11, 15]);
                    _f.label = 8;
                case 8:
                    if (!true) return [3 /*break*/, 10];
                    return [4 /*yield*/, reader.read()];
                case 9:
                    _a = _f.sent(), done = _a.done, value = _a.value;
                    throwIfNotCurrent();
                    if (done) {
                        return [3 /*break*/, 10];
                    }
                    buffer += decoder.decode(value, { stream: true });
                    _b = extractCompleteSseBlocks(buffer), blocks_1 = _b.blocks, remaining_1 = _b.remaining;
                    buffer = remaining_1;
                    processBlocks(blocks_1, state);
                    return [3 /*break*/, 8];
                case 10:
                    // Flush any trailing UTF-8 bytes.
                    buffer += decoder.decode();
                    _c = extractCompleteSseBlocks(buffer), blocks = _c.blocks, remaining = _c.remaining;
                    processBlocks(blocks, state);
                    finalData = readSseDataFromBlock(remaining);
                    if (finalData) {
                        throwIfNotCurrent();
                        event_1 = parseVoiceStreamEvent(finalData);
                        handleVoiceStreamEvent(event_1, playbackRef.current, callbacksRef.current, state);
                    }
                    return [3 /*break*/, 15];
                case 11:
                    _f.trys.push([11, 13, , 14]);
                    return [4 /*yield*/, reader.cancel()];
                case 12:
                    _f.sent();
                    return [3 /*break*/, 14];
                case 13:
                    _d = _f.sent();
                    return [3 /*break*/, 14];
                case 14:
                    reader.releaseLock();
                    return [7 /*endfinally*/];
                case 15: return [3 /*break*/, 18];
                case 16:
                    error_1 = _f.sent();
                    err = toError(error_1);
                    if (err.name === "AbortError") {
                        return [2 /*return*/];
                    }
                    notifyError(callbacksRef.current, err);
                    throw err;
                case 17:
                    if (activeRequestRef.current === abortController) {
                        activeRequestRef.current = null;
                    }
                    return [7 /*endfinally*/];
                case 18: return [2 /*return*/];
            }
        });
    }); }, []);
    return { streamVoiceResponse: streamVoiceResponse, playbackState: playback.state };
}
