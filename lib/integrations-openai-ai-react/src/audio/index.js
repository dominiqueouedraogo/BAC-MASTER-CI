"use strict";
/**
 * Voice chat client utilities for Replit AI Integrations.
 *
 * Usage:
 * 1. Copy audio-playback-worklet.js to your public/ folder
 * 2. Pass the deployed worklet URL into the hooks
 *
 * Example:
 * ```tsx
 * import { useVoiceRecorder, useVoiceStream } from "./audio";
 *
 * function VoiceChat({ workletPath }: { workletPath: string }) {
 *   const [transcript, setTranscript] = useState("");
 *   const recorder = useVoiceRecorder();
 *   const stream = useVoiceStream({
 *     workletPath,
 *     onTranscript: (_, full) => setTranscript(full),
 *     onComplete: (text) => console.log("Done:", text),
 *   });
 *
 *   const handleClick = async () => {
 *     if (recorder.state === "recording") {
 *       const blob = await recorder.stopRecording();
 *       await stream.streamVoiceResponse("/api/openai/conversations/1/voice-messages", blob);
 *     } else {
 *       await recorder.startRecording();
 *     }
 *   };
 *
 *   return (
 *     <div>
 *       <button onClick={handleClick}>
 *         {recorder.state === "recording" ? "Stop" : "Record"}
 *       </button>
 *       <p>{transcript}</p>
 *     </div>
 *   );
 * }
 * ```
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useVoiceStream = exports.useAudioPlayback = exports.useVoiceRecorder = exports.createAudioPlaybackContext = exports.decodePCM16ToFloat32 = void 0;
var audio_utils_1 = require("./audio-utils");
Object.defineProperty(exports, "decodePCM16ToFloat32", { enumerable: true, get: function () { return audio_utils_1.decodePCM16ToFloat32; } });
Object.defineProperty(exports, "createAudioPlaybackContext", { enumerable: true, get: function () { return audio_utils_1.createAudioPlaybackContext; } });
var useVoiceRecorder_1 = require("./useVoiceRecorder");
Object.defineProperty(exports, "useVoiceRecorder", { enumerable: true, get: function () { return useVoiceRecorder_1.useVoiceRecorder; } });
var useAudioPlayback_1 = require("./useAudioPlayback");
Object.defineProperty(exports, "useAudioPlayback", { enumerable: true, get: function () { return useAudioPlayback_1.useAudioPlayback; } });
var useVoiceStream_1 = require("./useVoiceStream");
Object.defineProperty(exports, "useVoiceStream", { enumerable: true, get: function () { return useVoiceStream_1.useVoiceStream; } });
