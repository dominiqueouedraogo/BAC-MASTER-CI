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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAudioPlayback = useAudioPlayback;
/**
 * React hook for streaming audio playback using AudioWorklet.
 * Supports real-time PCM16 audio streaming from SSE responses.
 * Includes sequence buffer for reordering out-of-order chunks.
 */
var react_1 = require("react");
var audio_utils_1 = require("./audio-utils");
/**
 * Reorders audio chunks that may arrive out of sequence.
 * Buffers chunks until they can be played in correct order.
 *
 * Example: If chunks arrive as seq 2, seq 0, seq 1:
 * - seq 2 arrives → buffered (waiting for seq 0)
 * - seq 0 arrives → played immediately, then check buffer
 * - seq 1 arrives → played immediately (seq 0 done), seq 2 now plays
 */
var SequenceBuffer = /** @class */ (function () {
    function SequenceBuffer() {
        this.pending = new Map();
        this.nextSeq = 0;
    }
    /** Add chunk with sequence number, returns chunks ready to play in order */
    SequenceBuffer.prototype.push = function (seq, data) {
        // Store the chunk under its sequence number
        if (!this.pending.has(seq)) {
            this.pending.set(seq, []);
        }
        this.pending.get(seq).push(data);
        // Drain consecutive ready sequences
        var ready = [];
        while (this.pending.has(this.nextSeq)) {
            ready.push.apply(ready, this.pending.get(this.nextSeq));
            this.pending.delete(this.nextSeq);
            this.nextSeq++;
        }
        return ready;
    };
    SequenceBuffer.prototype.reset = function () {
        this.pending.clear();
        this.nextSeq = 0;
    };
    return SequenceBuffer;
}());
function useAudioPlayback(workletPath) {
    var _this = this;
    if (workletPath === void 0) { workletPath = "/audio-playback-worklet.js"; }
    var _a = (0, react_1.useState)("idle"), state = _a[0], setState = _a[1];
    var ctxRef = (0, react_1.useRef)(null);
    var workletRef = (0, react_1.useRef)(null);
    var readyRef = (0, react_1.useRef)(false);
    var seqBufferRef = (0, react_1.useRef)(new SequenceBuffer());
    var init = (0, react_1.useCallback)(function () { return __awaiter(_this, void 0, void 0, function () {
        var ctx, worklet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (readyRef.current)
                        return [2 /*return*/];
                    ctx = new AudioContext({ sampleRate: 24000 });
                    return [4 /*yield*/, ctx.audioWorklet.addModule(workletPath)];
                case 1:
                    _a.sent();
                    worklet = new AudioWorkletNode(ctx, "audio-playback-processor");
                    worklet.connect(ctx.destination);
                    worklet.port.onmessage = function (e) {
                        if (e.data.type === "ended")
                            setState("idle");
                    };
                    ctxRef.current = ctx;
                    workletRef.current = worklet;
                    readyRef.current = true;
                    return [2 /*return*/];
            }
        });
    }); }, [workletPath]);
    /** Push audio directly (no sequencing) - for simple streaming */
    var pushAudio = (0, react_1.useCallback)(function (base64Audio) {
        if (!workletRef.current)
            return;
        var samples = (0, audio_utils_1.decodePCM16ToFloat32)(base64Audio);
        workletRef.current.port.postMessage({ type: "audio", samples: samples });
        setState("playing");
    }, []);
    /** Push audio with sequence number - reorders before playback */
    var pushSequencedAudio = (0, react_1.useCallback)(function (seq, base64Audio) {
        if (!workletRef.current)
            return;
        var readyChunks = seqBufferRef.current.push(seq, base64Audio);
        for (var _i = 0, readyChunks_1 = readyChunks; _i < readyChunks_1.length; _i++) {
            var chunk = readyChunks_1[_i];
            var samples = (0, audio_utils_1.decodePCM16ToFloat32)(chunk);
            workletRef.current.port.postMessage({ type: "audio", samples: samples });
        }
        if (readyChunks.length > 0) {
            setState("playing");
        }
    }, []);
    var signalComplete = (0, react_1.useCallback)(function () {
        var _a;
        (_a = workletRef.current) === null || _a === void 0 ? void 0 : _a.port.postMessage({ type: "streamComplete" });
    }, []);
    var clear = (0, react_1.useCallback)(function () {
        var _a;
        (_a = workletRef.current) === null || _a === void 0 ? void 0 : _a.port.postMessage({ type: "clear" });
        seqBufferRef.current.reset();
        setState("idle");
    }, []);
    return { state: state, init: init, pushAudio: pushAudio, pushSequencedAudio: pushSequencedAudio, signalComplete: signalComplete, clear: clear };
}
