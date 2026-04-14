"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDailyGoals = exports.getGetDailyGoalsUrl = exports.useUpgradeToPremium = exports.getUpgradeToPremiumMutationOptions = exports.upgradeToPremium = exports.getUpgradeToPremiumUrl = exports.useUpdateProfile = exports.getUpdateProfileMutationOptions = exports.updateProfile = exports.getUpdateProfileUrl = exports.getGetMeQueryOptions = exports.getGetMeQueryKey = exports.getMe = exports.getGetMeUrl = exports.useLoginUser = exports.getLoginUserMutationOptions = exports.loginUser = exports.getLoginUserUrl = exports.useRegisterUser = exports.getRegisterUserMutationOptions = exports.registerUser = exports.getRegisterUserUrl = exports.useLogoutMobileSession = exports.getLogoutMobileSessionMutationOptions = exports.logoutMobileSession = exports.getLogoutMobileSessionUrl = exports.useExchangeMobileAuthorizationCode = exports.getExchangeMobileAuthorizationCodeMutationOptions = exports.exchangeMobileAuthorizationCode = exports.getExchangeMobileAuthorizationCodeUrl = exports.getLogoutBrowserSessionQueryOptions = exports.getLogoutBrowserSessionQueryKey = exports.logoutBrowserSession = exports.getLogoutBrowserSessionUrl = exports.getHandleBrowserLoginCallbackQueryOptions = exports.getHandleBrowserLoginCallbackQueryKey = exports.handleBrowserLoginCallback = exports.getHandleBrowserLoginCallbackUrl = exports.getBeginBrowserLoginQueryOptions = exports.getBeginBrowserLoginQueryKey = exports.beginBrowserLogin = exports.getBeginBrowserLoginUrl = exports.getGetCurrentAuthUserQueryOptions = exports.getGetCurrentAuthUserQueryKey = exports.getCurrentAuthUser = exports.getGetCurrentAuthUserUrl = exports.getHealthCheckQueryOptions = exports.getHealthCheckQueryKey = exports.healthCheck = exports.getHealthCheckUrl = void 0;
exports.getGetExerciseQueryOptions = exports.getGetExerciseQueryKey = exports.getExercise = exports.getGetExerciseUrl = exports.useCreateExercise = exports.getCreateExerciseMutationOptions = exports.createExercise = exports.getCreateExerciseUrl = exports.getGetExercisesQueryOptions = exports.getGetExercisesQueryKey = exports.getExercises = exports.getGetExercisesUrl = exports.useDeleteLesson = exports.getDeleteLessonMutationOptions = exports.deleteLesson = exports.getDeleteLessonUrl = exports.useUpdateLesson = exports.getUpdateLessonMutationOptions = exports.updateLesson = exports.getUpdateLessonUrl = exports.getGetLessonQueryOptions = exports.getGetLessonQueryKey = exports.getLesson = exports.getGetLessonUrl = exports.useCreateLesson = exports.getCreateLessonMutationOptions = exports.createLesson = exports.getCreateLessonUrl = exports.getGetLessonsQueryOptions = exports.getGetLessonsQueryKey = exports.getLessons = exports.getGetLessonsUrl = exports.getGetSubjectQueryOptions = exports.getGetSubjectQueryKey = exports.getSubject = exports.getGetSubjectUrl = exports.useCreateSubject = exports.getCreateSubjectMutationOptions = exports.createSubject = exports.getCreateSubjectUrl = exports.getGetSubjectsQueryOptions = exports.getGetSubjectsQueryKey = exports.getSubjects = exports.getGetSubjectsUrl = exports.useUpdateDailyGoals = exports.getUpdateDailyGoalsMutationOptions = exports.updateDailyGoals = exports.getUpdateDailyGoalsUrl = exports.getGetDailyGoalsQueryOptions = exports.getGetDailyGoalsQueryKey = void 0;
exports.getAdminStats = exports.getGetAdminStatsUrl = exports.getGetChatHistoryQueryOptions = exports.getGetChatHistoryQueryKey = exports.getChatHistory = exports.getGetChatHistoryUrl = exports.useSendChatMessage = exports.getSendChatMessageMutationOptions = exports.sendChatMessage = exports.getSendChatMessageUrl = exports.useCreateReview = exports.getCreateReviewMutationOptions = exports.createReview = exports.getCreateReviewUrl = exports.getGetReviewsQueryOptions = exports.getGetReviewsQueryKey = exports.getReviews = exports.getGetReviewsUrl = exports.getGetUserBadgesQueryOptions = exports.getGetUserBadgesQueryKey = exports.getUserBadges = exports.getGetUserBadgesUrl = exports.getGetLeaderboardQueryOptions = exports.getGetLeaderboardQueryKey = exports.getLeaderboard = exports.getGetLeaderboardUrl = exports.useMarkLessonComplete = exports.getMarkLessonCompleteMutationOptions = exports.markLessonComplete = exports.getMarkLessonCompleteUrl = exports.getGetProgressQueryOptions = exports.getGetProgressQueryKey = exports.getProgress = exports.getGetProgressUrl = exports.getGetExamQueryOptions = exports.getGetExamQueryKey = exports.getExam = exports.getGetExamUrl = exports.useCreateExam = exports.getCreateExamMutationOptions = exports.createExam = exports.getCreateExamUrl = exports.getGetExamsQueryOptions = exports.getGetExamsQueryKey = exports.getExams = exports.getGetExamsUrl = exports.useSubmitExercise = exports.getSubmitExerciseMutationOptions = exports.submitExercise = exports.getSubmitExerciseUrl = void 0;
exports.useModerateReview = exports.getModerateReviewMutationOptions = exports.moderateReview = exports.getModerateReviewUrl = exports.getGetAdminUsersQueryOptions = exports.getGetAdminUsersQueryKey = exports.getAdminUsers = exports.getGetAdminUsersUrl = exports.getGetAdminStatsQueryOptions = exports.getGetAdminStatsQueryKey = void 0;
exports.useHealthCheck = useHealthCheck;
exports.useGetCurrentAuthUser = useGetCurrentAuthUser;
exports.useBeginBrowserLogin = useBeginBrowserLogin;
exports.useHandleBrowserLoginCallback = useHandleBrowserLoginCallback;
exports.useLogoutBrowserSession = useLogoutBrowserSession;
exports.useGetMe = useGetMe;
exports.useGetDailyGoals = useGetDailyGoals;
exports.useGetSubjects = useGetSubjects;
exports.useGetSubject = useGetSubject;
exports.useGetLessons = useGetLessons;
exports.useGetLesson = useGetLesson;
exports.useGetExercises = useGetExercises;
exports.useGetExercise = useGetExercise;
exports.useGetExams = useGetExams;
exports.useGetExam = useGetExam;
exports.useGetProgress = useGetProgress;
exports.useGetLeaderboard = useGetLeaderboard;
exports.useGetUserBadges = useGetUserBadges;
exports.useGetReviews = useGetReviews;
exports.useGetChatHistory = useGetChatHistory;
exports.useGetAdminStats = useGetAdminStats;
exports.useGetAdminUsers = useGetAdminUsers;
/**
 * Generated by orval v8.5.3 🍺
 * Do not edit manually.
 * Api
 * BAC MASTER CI API specification
 * OpenAPI spec version: 0.1.0
 */
var react_query_1 = require("@tanstack/react-query");
var custom_fetch_1 = require("../custom-fetch");
/**
 * @summary Health check
 */
var getHealthCheckUrl = function () {
    return "/api/healthz";
};
exports.getHealthCheckUrl = getHealthCheckUrl;
var healthCheck = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getHealthCheckUrl)(), __assign(__assign({}, options), { method: "GET" }))];
    });
}); };
exports.healthCheck = healthCheck;
var getHealthCheckQueryKey = function () {
    return ["/api/healthz"];
};
exports.getHealthCheckQueryKey = getHealthCheckQueryKey;
var getHealthCheckQueryOptions = function (options) {
    var _a;
    var _b = options !== null && options !== void 0 ? options : {}, queryOptions = _b.query, requestOptions = _b.request;
    var queryKey = (_a = queryOptions === null || queryOptions === void 0 ? void 0 : queryOptions.queryKey) !== null && _a !== void 0 ? _a : (0, exports.getHealthCheckQueryKey)();
    var queryFn = function (_a) {
        var signal = _a.signal;
        return (0, exports.healthCheck)(__assign({ signal: signal }, requestOptions));
    };
    return __assign({ queryKey: queryKey, queryFn: queryFn }, queryOptions);
};
exports.getHealthCheckQueryOptions = getHealthCheckQueryOptions;
/**
 * @summary Health check
 */
function useHealthCheck(options) {
    var queryOptions = (0, exports.getHealthCheckQueryOptions)(options);
    var query = (0, react_query_1.useQuery)(queryOptions);
    return __assign(__assign({}, query), { queryKey: queryOptions.queryKey });
}
/**
 * @summary Get the currently authenticated user
 */
var getGetCurrentAuthUserUrl = function () {
    return "/api/auth/user";
};
exports.getGetCurrentAuthUserUrl = getGetCurrentAuthUserUrl;
var getCurrentAuthUser = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getGetCurrentAuthUserUrl)(), __assign(__assign({}, options), { method: "GET" }))];
    });
}); };
exports.getCurrentAuthUser = getCurrentAuthUser;
var getGetCurrentAuthUserQueryKey = function () {
    return ["/api/auth/user"];
};
exports.getGetCurrentAuthUserQueryKey = getGetCurrentAuthUserQueryKey;
var getGetCurrentAuthUserQueryOptions = function (options) {
    var _a;
    var _b = options !== null && options !== void 0 ? options : {}, queryOptions = _b.query, requestOptions = _b.request;
    var queryKey = (_a = queryOptions === null || queryOptions === void 0 ? void 0 : queryOptions.queryKey) !== null && _a !== void 0 ? _a : (0, exports.getGetCurrentAuthUserQueryKey)();
    var queryFn = function (_a) {
        var signal = _a.signal;
        return (0, exports.getCurrentAuthUser)(__assign({ signal: signal }, requestOptions));
    };
    return __assign({ queryKey: queryKey, queryFn: queryFn }, queryOptions);
};
exports.getGetCurrentAuthUserQueryOptions = getGetCurrentAuthUserQueryOptions;
/**
 * @summary Get the currently authenticated user
 */
function useGetCurrentAuthUser(options) {
    var queryOptions = (0, exports.getGetCurrentAuthUserQueryOptions)(options);
    var query = (0, react_query_1.useQuery)(queryOptions);
    return __assign(__assign({}, query), { queryKey: queryOptions.queryKey });
}
/**
 * @summary Start the browser OIDC login flow
 */
var getBeginBrowserLoginUrl = function (params) {
    var normalizedParams = new URLSearchParams();
    Object.entries(params || {}).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        if (value !== undefined) {
            normalizedParams.append(key, value === null ? "null" : value.toString());
        }
    });
    var stringifiedParams = normalizedParams.toString();
    return stringifiedParams.length > 0
        ? "/api/login?".concat(stringifiedParams)
        : "/api/login";
};
exports.getBeginBrowserLoginUrl = getBeginBrowserLoginUrl;
var beginBrowserLogin = function (params, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getBeginBrowserLoginUrl)(params), __assign(__assign({}, options), { method: "GET" }))];
    });
}); };
exports.beginBrowserLogin = beginBrowserLogin;
var getBeginBrowserLoginQueryKey = function (params) {
    return __spreadArray(["/api/login"], (params ? [params] : []), true);
};
exports.getBeginBrowserLoginQueryKey = getBeginBrowserLoginQueryKey;
var getBeginBrowserLoginQueryOptions = function (params, options) {
    var _a;
    var _b = options !== null && options !== void 0 ? options : {}, queryOptions = _b.query, requestOptions = _b.request;
    var queryKey = (_a = queryOptions === null || queryOptions === void 0 ? void 0 : queryOptions.queryKey) !== null && _a !== void 0 ? _a : (0, exports.getBeginBrowserLoginQueryKey)(params);
    var queryFn = function (_a) {
        var signal = _a.signal;
        return (0, exports.beginBrowserLogin)(params, __assign({ signal: signal }, requestOptions));
    };
    return __assign({ queryKey: queryKey, queryFn: queryFn }, queryOptions);
};
exports.getBeginBrowserLoginQueryOptions = getBeginBrowserLoginQueryOptions;
/**
 * @summary Start the browser OIDC login flow
 */
function useBeginBrowserLogin(params, options) {
    var queryOptions = (0, exports.getBeginBrowserLoginQueryOptions)(params, options);
    var query = (0, react_query_1.useQuery)(queryOptions);
    return __assign(__assign({}, query), { queryKey: queryOptions.queryKey });
}
/**
 * @summary Complete the browser OIDC login flow
 */
var getHandleBrowserLoginCallbackUrl = function (params) {
    var normalizedParams = new URLSearchParams();
    Object.entries(params || {}).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        if (value !== undefined) {
            normalizedParams.append(key, value === null ? "null" : value.toString());
        }
    });
    var stringifiedParams = normalizedParams.toString();
    return stringifiedParams.length > 0
        ? "/api/callback?".concat(stringifiedParams)
        : "/api/callback";
};
exports.getHandleBrowserLoginCallbackUrl = getHandleBrowserLoginCallbackUrl;
var handleBrowserLoginCallback = function (params, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getHandleBrowserLoginCallbackUrl)(params), __assign(__assign({}, options), { method: "GET" }))];
    });
}); };
exports.handleBrowserLoginCallback = handleBrowserLoginCallback;
var getHandleBrowserLoginCallbackQueryKey = function (params) {
    return __spreadArray(["/api/callback"], (params ? [params] : []), true);
};
exports.getHandleBrowserLoginCallbackQueryKey = getHandleBrowserLoginCallbackQueryKey;
var getHandleBrowserLoginCallbackQueryOptions = function (params, options) {
    var _a;
    var _b = options !== null && options !== void 0 ? options : {}, queryOptions = _b.query, requestOptions = _b.request;
    var queryKey = (_a = queryOptions === null || queryOptions === void 0 ? void 0 : queryOptions.queryKey) !== null && _a !== void 0 ? _a : (0, exports.getHandleBrowserLoginCallbackQueryKey)(params);
    var queryFn = function (_a) {
        var signal = _a.signal;
        return (0, exports.handleBrowserLoginCallback)(params, __assign({ signal: signal }, requestOptions));
    };
    return __assign({ queryKey: queryKey, queryFn: queryFn }, queryOptions);
};
exports.getHandleBrowserLoginCallbackQueryOptions = getHandleBrowserLoginCallbackQueryOptions;
/**
 * @summary Complete the browser OIDC login flow
 */
function useHandleBrowserLoginCallback(params, options) {
    var queryOptions = (0, exports.getHandleBrowserLoginCallbackQueryOptions)(params, options);
    var query = (0, react_query_1.useQuery)(queryOptions);
    return __assign(__assign({}, query), { queryKey: queryOptions.queryKey });
}
/**
 * @summary Clear the session and begin OIDC logout
 */
var getLogoutBrowserSessionUrl = function () {
    return "/api/logout";
};
exports.getLogoutBrowserSessionUrl = getLogoutBrowserSessionUrl;
var logoutBrowserSession = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getLogoutBrowserSessionUrl)(), __assign(__assign({}, options), { method: "GET" }))];
    });
}); };
exports.logoutBrowserSession = logoutBrowserSession;
var getLogoutBrowserSessionQueryKey = function () {
    return ["/api/logout"];
};
exports.getLogoutBrowserSessionQueryKey = getLogoutBrowserSessionQueryKey;
var getLogoutBrowserSessionQueryOptions = function (options) {
    var _a;
    var _b = options !== null && options !== void 0 ? options : {}, queryOptions = _b.query, requestOptions = _b.request;
    var queryKey = (_a = queryOptions === null || queryOptions === void 0 ? void 0 : queryOptions.queryKey) !== null && _a !== void 0 ? _a : (0, exports.getLogoutBrowserSessionQueryKey)();
    var queryFn = function (_a) {
        var signal = _a.signal;
        return (0, exports.logoutBrowserSession)(__assign({ signal: signal }, requestOptions));
    };
    return __assign({ queryKey: queryKey, queryFn: queryFn }, queryOptions);
};
exports.getLogoutBrowserSessionQueryOptions = getLogoutBrowserSessionQueryOptions;
/**
 * @summary Clear the session and begin OIDC logout
 */
function useLogoutBrowserSession(options) {
    var queryOptions = (0, exports.getLogoutBrowserSessionQueryOptions)(options);
    var query = (0, react_query_1.useQuery)(queryOptions);
    return __assign(__assign({}, query), { queryKey: queryOptions.queryKey });
}
/**
 * @summary Exchange a mobile OIDC code for a session token
 */
var getExchangeMobileAuthorizationCodeUrl = function () {
    return "/api/mobile-auth/token-exchange";
};
exports.getExchangeMobileAuthorizationCodeUrl = getExchangeMobileAuthorizationCodeUrl;
var exchangeMobileAuthorizationCode = function (mobileTokenExchangeRequest, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getExchangeMobileAuthorizationCodeUrl)(), __assign(__assign({}, options), { method: "POST", headers: __assign({ "Content-Type": "application/json" }, options === null || options === void 0 ? void 0 : options.headers), body: JSON.stringify(mobileTokenExchangeRequest) }))];
    });
}); };
exports.exchangeMobileAuthorizationCode = exchangeMobileAuthorizationCode;
var getExchangeMobileAuthorizationCodeMutationOptions = function (options) {
    var mutationKey = ["exchangeMobileAuthorizationCode"];
    var _a = options
        ? options.mutation &&
            "mutationKey" in options.mutation &&
            options.mutation.mutationKey
            ? options
            : __assign(__assign({}, options), { mutation: __assign(__assign({}, options.mutation), { mutationKey: mutationKey }) })
        : { mutation: { mutationKey: mutationKey }, request: undefined }, mutationOptions = _a.mutation, requestOptions = _a.request;
    var mutationFn = function (props) {
        var data = (props !== null && props !== void 0 ? props : {}).data;
        return (0, exports.exchangeMobileAuthorizationCode)(data, requestOptions);
    };
    return __assign({ mutationFn: mutationFn }, mutationOptions);
};
exports.getExchangeMobileAuthorizationCodeMutationOptions = getExchangeMobileAuthorizationCodeMutationOptions;
/**
 * @summary Exchange a mobile OIDC code for a session token
 */
var useExchangeMobileAuthorizationCode = function (options) {
    return (0, react_query_1.useMutation)((0, exports.getExchangeMobileAuthorizationCodeMutationOptions)(options));
};
exports.useExchangeMobileAuthorizationCode = useExchangeMobileAuthorizationCode;
/**
 * @summary Delete a mobile session token
 */
var getLogoutMobileSessionUrl = function () {
    return "/api/mobile-auth/logout";
};
exports.getLogoutMobileSessionUrl = getLogoutMobileSessionUrl;
var logoutMobileSession = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getLogoutMobileSessionUrl)(), __assign(__assign({}, options), { method: "POST" }))];
    });
}); };
exports.logoutMobileSession = logoutMobileSession;
var getLogoutMobileSessionMutationOptions = function (options) {
    var mutationKey = ["logoutMobileSession"];
    var _a = options
        ? options.mutation &&
            "mutationKey" in options.mutation &&
            options.mutation.mutationKey
            ? options
            : __assign(__assign({}, options), { mutation: __assign(__assign({}, options.mutation), { mutationKey: mutationKey }) })
        : { mutation: { mutationKey: mutationKey }, request: undefined }, mutationOptions = _a.mutation, requestOptions = _a.request;
    var mutationFn = function () {
        return (0, exports.logoutMobileSession)(requestOptions);
    };
    return __assign({ mutationFn: mutationFn }, mutationOptions);
};
exports.getLogoutMobileSessionMutationOptions = getLogoutMobileSessionMutationOptions;
/**
 * @summary Delete a mobile session token
 */
var useLogoutMobileSession = function (options) {
    return (0, react_query_1.useMutation)((0, exports.getLogoutMobileSessionMutationOptions)(options));
};
exports.useLogoutMobileSession = useLogoutMobileSession;
/**
 * @summary Register a new user
 */
var getRegisterUserUrl = function () {
    return "/api/auth/register";
};
exports.getRegisterUserUrl = getRegisterUserUrl;
var registerUser = function (registerRequest, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getRegisterUserUrl)(), __assign(__assign({}, options), { method: "POST", headers: __assign({ "Content-Type": "application/json" }, options === null || options === void 0 ? void 0 : options.headers), body: JSON.stringify(registerRequest) }))];
    });
}); };
exports.registerUser = registerUser;
var getRegisterUserMutationOptions = function (options) {
    var mutationKey = ["registerUser"];
    var _a = options
        ? options.mutation &&
            "mutationKey" in options.mutation &&
            options.mutation.mutationKey
            ? options
            : __assign(__assign({}, options), { mutation: __assign(__assign({}, options.mutation), { mutationKey: mutationKey }) })
        : { mutation: { mutationKey: mutationKey }, request: undefined }, mutationOptions = _a.mutation, requestOptions = _a.request;
    var mutationFn = function (props) {
        var data = (props !== null && props !== void 0 ? props : {}).data;
        return (0, exports.registerUser)(data, requestOptions);
    };
    return __assign({ mutationFn: mutationFn }, mutationOptions);
};
exports.getRegisterUserMutationOptions = getRegisterUserMutationOptions;
/**
 * @summary Register a new user
 */
var useRegisterUser = function (options) {
    return (0, react_query_1.useMutation)((0, exports.getRegisterUserMutationOptions)(options));
};
exports.useRegisterUser = useRegisterUser;
/**
 * @summary Login
 */
var getLoginUserUrl = function () {
    return "/api/auth/login";
};
exports.getLoginUserUrl = getLoginUserUrl;
var loginUser = function (loginRequest, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getLoginUserUrl)(), __assign(__assign({}, options), { method: "POST", headers: __assign({ "Content-Type": "application/json" }, options === null || options === void 0 ? void 0 : options.headers), body: JSON.stringify(loginRequest) }))];
    });
}); };
exports.loginUser = loginUser;
var getLoginUserMutationOptions = function (options) {
    var mutationKey = ["loginUser"];
    var _a = options
        ? options.mutation &&
            "mutationKey" in options.mutation &&
            options.mutation.mutationKey
            ? options
            : __assign(__assign({}, options), { mutation: __assign(__assign({}, options.mutation), { mutationKey: mutationKey }) })
        : { mutation: { mutationKey: mutationKey }, request: undefined }, mutationOptions = _a.mutation, requestOptions = _a.request;
    var mutationFn = function (props) {
        var data = (props !== null && props !== void 0 ? props : {}).data;
        return (0, exports.loginUser)(data, requestOptions);
    };
    return __assign({ mutationFn: mutationFn }, mutationOptions);
};
exports.getLoginUserMutationOptions = getLoginUserMutationOptions;
/**
 * @summary Login
 */
var useLoginUser = function (options) {
    return (0, react_query_1.useMutation)((0, exports.getLoginUserMutationOptions)(options));
};
exports.useLoginUser = useLoginUser;
/**
 * @summary Get current user
 */
var getGetMeUrl = function () {
    return "/api/auth/me";
};
exports.getGetMeUrl = getGetMeUrl;
var getMe = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getGetMeUrl)(), __assign(__assign({}, options), { method: "GET" }))];
    });
}); };
exports.getMe = getMe;
var getGetMeQueryKey = function () {
    return ["/api/auth/me"];
};
exports.getGetMeQueryKey = getGetMeQueryKey;
var getGetMeQueryOptions = function (options) {
    var _a;
    var _b = options !== null && options !== void 0 ? options : {}, queryOptions = _b.query, requestOptions = _b.request;
    var queryKey = (_a = queryOptions === null || queryOptions === void 0 ? void 0 : queryOptions.queryKey) !== null && _a !== void 0 ? _a : (0, exports.getGetMeQueryKey)();
    var queryFn = function (_a) {
        var signal = _a.signal;
        return (0, exports.getMe)(__assign({ signal: signal }, requestOptions));
    };
    return __assign({ queryKey: queryKey, queryFn: queryFn }, queryOptions);
};
exports.getGetMeQueryOptions = getGetMeQueryOptions;
/**
 * @summary Get current user
 */
function useGetMe(options) {
    var queryOptions = (0, exports.getGetMeQueryOptions)(options);
    var query = (0, react_query_1.useQuery)(queryOptions);
    return __assign(__assign({}, query), { queryKey: queryOptions.queryKey });
}
/**
 * @summary Update user profile
 */
var getUpdateProfileUrl = function () {
    return "/api/users/profile";
};
exports.getUpdateProfileUrl = getUpdateProfileUrl;
var updateProfile = function (updateProfileRequest, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getUpdateProfileUrl)(), __assign(__assign({}, options), { method: "PUT", headers: __assign({ "Content-Type": "application/json" }, options === null || options === void 0 ? void 0 : options.headers), body: JSON.stringify(updateProfileRequest) }))];
    });
}); };
exports.updateProfile = updateProfile;
var getUpdateProfileMutationOptions = function (options) {
    var mutationKey = ["updateProfile"];
    var _a = options
        ? options.mutation &&
            "mutationKey" in options.mutation &&
            options.mutation.mutationKey
            ? options
            : __assign(__assign({}, options), { mutation: __assign(__assign({}, options.mutation), { mutationKey: mutationKey }) })
        : { mutation: { mutationKey: mutationKey }, request: undefined }, mutationOptions = _a.mutation, requestOptions = _a.request;
    var mutationFn = function (props) {
        var data = (props !== null && props !== void 0 ? props : {}).data;
        return (0, exports.updateProfile)(data, requestOptions);
    };
    return __assign({ mutationFn: mutationFn }, mutationOptions);
};
exports.getUpdateProfileMutationOptions = getUpdateProfileMutationOptions;
/**
 * @summary Update user profile
 */
var useUpdateProfile = function (options) {
    return (0, react_query_1.useMutation)((0, exports.getUpdateProfileMutationOptions)(options));
};
exports.useUpdateProfile = useUpdateProfile;
/**
 * @summary Upgrade current user to premium
 */
var getUpgradeToPremiumUrl = function () {
    return "/api/users/upgrade-premium";
};
exports.getUpgradeToPremiumUrl = getUpgradeToPremiumUrl;
var upgradeToPremium = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getUpgradeToPremiumUrl)(), __assign(__assign({}, options), { method: "POST" }))];
    });
}); };
exports.upgradeToPremium = upgradeToPremium;
var getUpgradeToPremiumMutationOptions = function (options) {
    var mutationKey = ["upgradeToPremium"];
    var _a = options
        ? options.mutation &&
            "mutationKey" in options.mutation &&
            options.mutation.mutationKey
            ? options
            : __assign(__assign({}, options), { mutation: __assign(__assign({}, options.mutation), { mutationKey: mutationKey }) })
        : { mutation: { mutationKey: mutationKey }, request: undefined }, mutationOptions = _a.mutation, requestOptions = _a.request;
    var mutationFn = function () {
        return (0, exports.upgradeToPremium)(requestOptions);
    };
    return __assign({ mutationFn: mutationFn }, mutationOptions);
};
exports.getUpgradeToPremiumMutationOptions = getUpgradeToPremiumMutationOptions;
/**
 * @summary Upgrade current user to premium
 */
var useUpgradeToPremium = function (options) {
    return (0, react_query_1.useMutation)((0, exports.getUpgradeToPremiumMutationOptions)(options));
};
exports.useUpgradeToPremium = useUpgradeToPremium;
/**
 * @summary Get daily goals
 */
var getGetDailyGoalsUrl = function () {
    return "/api/users/goals";
};
exports.getGetDailyGoalsUrl = getGetDailyGoalsUrl;
var getDailyGoals = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getGetDailyGoalsUrl)(), __assign(__assign({}, options), { method: "GET" }))];
    });
}); };
exports.getDailyGoals = getDailyGoals;
var getGetDailyGoalsQueryKey = function () {
    return ["/api/users/goals"];
};
exports.getGetDailyGoalsQueryKey = getGetDailyGoalsQueryKey;
var getGetDailyGoalsQueryOptions = function (options) {
    var _a;
    var _b = options !== null && options !== void 0 ? options : {}, queryOptions = _b.query, requestOptions = _b.request;
    var queryKey = (_a = queryOptions === null || queryOptions === void 0 ? void 0 : queryOptions.queryKey) !== null && _a !== void 0 ? _a : (0, exports.getGetDailyGoalsQueryKey)();
    var queryFn = function (_a) {
        var signal = _a.signal;
        return (0, exports.getDailyGoals)(__assign({ signal: signal }, requestOptions));
    };
    return __assign({ queryKey: queryKey, queryFn: queryFn }, queryOptions);
};
exports.getGetDailyGoalsQueryOptions = getGetDailyGoalsQueryOptions;
/**
 * @summary Get daily goals
 */
function useGetDailyGoals(options) {
    var queryOptions = (0, exports.getGetDailyGoalsQueryOptions)(options);
    var query = (0, react_query_1.useQuery)(queryOptions);
    return __assign(__assign({}, query), { queryKey: queryOptions.queryKey });
}
/**
 * @summary Update daily goals
 */
var getUpdateDailyGoalsUrl = function () {
    return "/api/users/goals";
};
exports.getUpdateDailyGoalsUrl = getUpdateDailyGoalsUrl;
var updateDailyGoals = function (updateDailyGoalsRequest, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getUpdateDailyGoalsUrl)(), __assign(__assign({}, options), { method: "PUT", headers: __assign({ "Content-Type": "application/json" }, options === null || options === void 0 ? void 0 : options.headers), body: JSON.stringify(updateDailyGoalsRequest) }))];
    });
}); };
exports.updateDailyGoals = updateDailyGoals;
var getUpdateDailyGoalsMutationOptions = function (options) {
    var mutationKey = ["updateDailyGoals"];
    var _a = options
        ? options.mutation &&
            "mutationKey" in options.mutation &&
            options.mutation.mutationKey
            ? options
            : __assign(__assign({}, options), { mutation: __assign(__assign({}, options.mutation), { mutationKey: mutationKey }) })
        : { mutation: { mutationKey: mutationKey }, request: undefined }, mutationOptions = _a.mutation, requestOptions = _a.request;
    var mutationFn = function (props) {
        var data = (props !== null && props !== void 0 ? props : {}).data;
        return (0, exports.updateDailyGoals)(data, requestOptions);
    };
    return __assign({ mutationFn: mutationFn }, mutationOptions);
};
exports.getUpdateDailyGoalsMutationOptions = getUpdateDailyGoalsMutationOptions;
/**
 * @summary Update daily goals
 */
var useUpdateDailyGoals = function (options) {
    return (0, react_query_1.useMutation)((0, exports.getUpdateDailyGoalsMutationOptions)(options));
};
exports.useUpdateDailyGoals = useUpdateDailyGoals;
/**
 * @summary Get all subjects
 */
var getGetSubjectsUrl = function (params) {
    var normalizedParams = new URLSearchParams();
    Object.entries(params || {}).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        if (value !== undefined) {
            normalizedParams.append(key, value === null ? "null" : value.toString());
        }
    });
    var stringifiedParams = normalizedParams.toString();
    return stringifiedParams.length > 0
        ? "/api/subjects?".concat(stringifiedParams)
        : "/api/subjects";
};
exports.getGetSubjectsUrl = getGetSubjectsUrl;
var getSubjects = function (params, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getGetSubjectsUrl)(params), __assign(__assign({}, options), { method: "GET" }))];
    });
}); };
exports.getSubjects = getSubjects;
var getGetSubjectsQueryKey = function (params) {
    return __spreadArray(["/api/subjects"], (params ? [params] : []), true);
};
exports.getGetSubjectsQueryKey = getGetSubjectsQueryKey;
var getGetSubjectsQueryOptions = function (params, options) {
    var _a;
    var _b = options !== null && options !== void 0 ? options : {}, queryOptions = _b.query, requestOptions = _b.request;
    var queryKey = (_a = queryOptions === null || queryOptions === void 0 ? void 0 : queryOptions.queryKey) !== null && _a !== void 0 ? _a : (0, exports.getGetSubjectsQueryKey)(params);
    var queryFn = function (_a) {
        var signal = _a.signal;
        return (0, exports.getSubjects)(params, __assign({ signal: signal }, requestOptions));
    };
    return __assign({ queryKey: queryKey, queryFn: queryFn }, queryOptions);
};
exports.getGetSubjectsQueryOptions = getGetSubjectsQueryOptions;
/**
 * @summary Get all subjects
 */
function useGetSubjects(params, options) {
    var queryOptions = (0, exports.getGetSubjectsQueryOptions)(params, options);
    var query = (0, react_query_1.useQuery)(queryOptions);
    return __assign(__assign({}, query), { queryKey: queryOptions.queryKey });
}
/**
 * @summary Create a subject (admin)
 */
var getCreateSubjectUrl = function () {
    return "/api/subjects";
};
exports.getCreateSubjectUrl = getCreateSubjectUrl;
var createSubject = function (createSubjectRequest, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getCreateSubjectUrl)(), __assign(__assign({}, options), { method: "POST", headers: __assign({ "Content-Type": "application/json" }, options === null || options === void 0 ? void 0 : options.headers), body: JSON.stringify(createSubjectRequest) }))];
    });
}); };
exports.createSubject = createSubject;
var getCreateSubjectMutationOptions = function (options) {
    var mutationKey = ["createSubject"];
    var _a = options
        ? options.mutation &&
            "mutationKey" in options.mutation &&
            options.mutation.mutationKey
            ? options
            : __assign(__assign({}, options), { mutation: __assign(__assign({}, options.mutation), { mutationKey: mutationKey }) })
        : { mutation: { mutationKey: mutationKey }, request: undefined }, mutationOptions = _a.mutation, requestOptions = _a.request;
    var mutationFn = function (props) {
        var data = (props !== null && props !== void 0 ? props : {}).data;
        return (0, exports.createSubject)(data, requestOptions);
    };
    return __assign({ mutationFn: mutationFn }, mutationOptions);
};
exports.getCreateSubjectMutationOptions = getCreateSubjectMutationOptions;
/**
 * @summary Create a subject (admin)
 */
var useCreateSubject = function (options) {
    return (0, react_query_1.useMutation)((0, exports.getCreateSubjectMutationOptions)(options));
};
exports.useCreateSubject = useCreateSubject;
/**
 * @summary Get a subject by ID
 */
var getGetSubjectUrl = function (id) {
    return "/api/subjects/".concat(id);
};
exports.getGetSubjectUrl = getGetSubjectUrl;
var getSubject = function (id, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getGetSubjectUrl)(id), __assign(__assign({}, options), { method: "GET" }))];
    });
}); };
exports.getSubject = getSubject;
var getGetSubjectQueryKey = function (id) {
    return ["/api/subjects/".concat(id)];
};
exports.getGetSubjectQueryKey = getGetSubjectQueryKey;
var getGetSubjectQueryOptions = function (id, options) {
    var _a;
    var _b = options !== null && options !== void 0 ? options : {}, queryOptions = _b.query, requestOptions = _b.request;
    var queryKey = (_a = queryOptions === null || queryOptions === void 0 ? void 0 : queryOptions.queryKey) !== null && _a !== void 0 ? _a : (0, exports.getGetSubjectQueryKey)(id);
    var queryFn = function (_a) {
        var signal = _a.signal;
        return (0, exports.getSubject)(id, __assign({ signal: signal }, requestOptions));
    };
    return __assign({ queryKey: queryKey, queryFn: queryFn, enabled: !!id }, queryOptions);
};
exports.getGetSubjectQueryOptions = getGetSubjectQueryOptions;
/**
 * @summary Get a subject by ID
 */
function useGetSubject(id, options) {
    var queryOptions = (0, exports.getGetSubjectQueryOptions)(id, options);
    var query = (0, react_query_1.useQuery)(queryOptions);
    return __assign(__assign({}, query), { queryKey: queryOptions.queryKey });
}
/**
 * @summary Get lessons
 */
var getGetLessonsUrl = function (params) {
    var normalizedParams = new URLSearchParams();
    Object.entries(params || {}).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        if (value !== undefined) {
            normalizedParams.append(key, value === null ? "null" : value.toString());
        }
    });
    var stringifiedParams = normalizedParams.toString();
    return stringifiedParams.length > 0
        ? "/api/lessons?".concat(stringifiedParams)
        : "/api/lessons";
};
exports.getGetLessonsUrl = getGetLessonsUrl;
var getLessons = function (params, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getGetLessonsUrl)(params), __assign(__assign({}, options), { method: "GET" }))];
    });
}); };
exports.getLessons = getLessons;
var getGetLessonsQueryKey = function (params) {
    return __spreadArray(["/api/lessons"], (params ? [params] : []), true);
};
exports.getGetLessonsQueryKey = getGetLessonsQueryKey;
var getGetLessonsQueryOptions = function (params, options) {
    var _a;
    var _b = options !== null && options !== void 0 ? options : {}, queryOptions = _b.query, requestOptions = _b.request;
    var queryKey = (_a = queryOptions === null || queryOptions === void 0 ? void 0 : queryOptions.queryKey) !== null && _a !== void 0 ? _a : (0, exports.getGetLessonsQueryKey)(params);
    var queryFn = function (_a) {
        var signal = _a.signal;
        return (0, exports.getLessons)(params, __assign({ signal: signal }, requestOptions));
    };
    return __assign({ queryKey: queryKey, queryFn: queryFn }, queryOptions);
};
exports.getGetLessonsQueryOptions = getGetLessonsQueryOptions;
/**
 * @summary Get lessons
 */
function useGetLessons(params, options) {
    var queryOptions = (0, exports.getGetLessonsQueryOptions)(params, options);
    var query = (0, react_query_1.useQuery)(queryOptions);
    return __assign(__assign({}, query), { queryKey: queryOptions.queryKey });
}
/**
 * @summary Create a lesson (admin)
 */
var getCreateLessonUrl = function () {
    return "/api/lessons";
};
exports.getCreateLessonUrl = getCreateLessonUrl;
var createLesson = function (createLessonRequest, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getCreateLessonUrl)(), __assign(__assign({}, options), { method: "POST", headers: __assign({ "Content-Type": "application/json" }, options === null || options === void 0 ? void 0 : options.headers), body: JSON.stringify(createLessonRequest) }))];
    });
}); };
exports.createLesson = createLesson;
var getCreateLessonMutationOptions = function (options) {
    var mutationKey = ["createLesson"];
    var _a = options
        ? options.mutation &&
            "mutationKey" in options.mutation &&
            options.mutation.mutationKey
            ? options
            : __assign(__assign({}, options), { mutation: __assign(__assign({}, options.mutation), { mutationKey: mutationKey }) })
        : { mutation: { mutationKey: mutationKey }, request: undefined }, mutationOptions = _a.mutation, requestOptions = _a.request;
    var mutationFn = function (props) {
        var data = (props !== null && props !== void 0 ? props : {}).data;
        return (0, exports.createLesson)(data, requestOptions);
    };
    return __assign({ mutationFn: mutationFn }, mutationOptions);
};
exports.getCreateLessonMutationOptions = getCreateLessonMutationOptions;
/**
 * @summary Create a lesson (admin)
 */
var useCreateLesson = function (options) {
    return (0, react_query_1.useMutation)((0, exports.getCreateLessonMutationOptions)(options));
};
exports.useCreateLesson = useCreateLesson;
/**
 * @summary Get a lesson by ID
 */
var getGetLessonUrl = function (id) {
    return "/api/lessons/".concat(id);
};
exports.getGetLessonUrl = getGetLessonUrl;
var getLesson = function (id, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getGetLessonUrl)(id), __assign(__assign({}, options), { method: "GET" }))];
    });
}); };
exports.getLesson = getLesson;
var getGetLessonQueryKey = function (id) {
    return ["/api/lessons/".concat(id)];
};
exports.getGetLessonQueryKey = getGetLessonQueryKey;
var getGetLessonQueryOptions = function (id, options) {
    var _a;
    var _b = options !== null && options !== void 0 ? options : {}, queryOptions = _b.query, requestOptions = _b.request;
    var queryKey = (_a = queryOptions === null || queryOptions === void 0 ? void 0 : queryOptions.queryKey) !== null && _a !== void 0 ? _a : (0, exports.getGetLessonQueryKey)(id);
    var queryFn = function (_a) {
        var signal = _a.signal;
        return (0, exports.getLesson)(id, __assign({ signal: signal }, requestOptions));
    };
    return __assign({ queryKey: queryKey, queryFn: queryFn, enabled: !!id }, queryOptions);
};
exports.getGetLessonQueryOptions = getGetLessonQueryOptions;
/**
 * @summary Get a lesson by ID
 */
function useGetLesson(id, options) {
    var queryOptions = (0, exports.getGetLessonQueryOptions)(id, options);
    var query = (0, react_query_1.useQuery)(queryOptions);
    return __assign(__assign({}, query), { queryKey: queryOptions.queryKey });
}
/**
 * @summary Update a lesson (admin)
 */
var getUpdateLessonUrl = function (id) {
    return "/api/lessons/".concat(id);
};
exports.getUpdateLessonUrl = getUpdateLessonUrl;
var updateLesson = function (id, createLessonRequest, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getUpdateLessonUrl)(id), __assign(__assign({}, options), { method: "PUT", headers: __assign({ "Content-Type": "application/json" }, options === null || options === void 0 ? void 0 : options.headers), body: JSON.stringify(createLessonRequest) }))];
    });
}); };
exports.updateLesson = updateLesson;
var getUpdateLessonMutationOptions = function (options) {
    var mutationKey = ["updateLesson"];
    var _a = options
        ? options.mutation &&
            "mutationKey" in options.mutation &&
            options.mutation.mutationKey
            ? options
            : __assign(__assign({}, options), { mutation: __assign(__assign({}, options.mutation), { mutationKey: mutationKey }) })
        : { mutation: { mutationKey: mutationKey }, request: undefined }, mutationOptions = _a.mutation, requestOptions = _a.request;
    var mutationFn = function (props) {
        var _a = props !== null && props !== void 0 ? props : {}, id = _a.id, data = _a.data;
        return (0, exports.updateLesson)(id, data, requestOptions);
    };
    return __assign({ mutationFn: mutationFn }, mutationOptions);
};
exports.getUpdateLessonMutationOptions = getUpdateLessonMutationOptions;
/**
 * @summary Update a lesson (admin)
 */
var useUpdateLesson = function (options) {
    return (0, react_query_1.useMutation)((0, exports.getUpdateLessonMutationOptions)(options));
};
exports.useUpdateLesson = useUpdateLesson;
/**
 * @summary Delete a lesson (admin)
 */
var getDeleteLessonUrl = function (id) {
    return "/api/lessons/".concat(id);
};
exports.getDeleteLessonUrl = getDeleteLessonUrl;
var deleteLesson = function (id, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getDeleteLessonUrl)(id), __assign(__assign({}, options), { method: "DELETE" }))];
    });
}); };
exports.deleteLesson = deleteLesson;
var getDeleteLessonMutationOptions = function (options) {
    var mutationKey = ["deleteLesson"];
    var _a = options
        ? options.mutation &&
            "mutationKey" in options.mutation &&
            options.mutation.mutationKey
            ? options
            : __assign(__assign({}, options), { mutation: __assign(__assign({}, options.mutation), { mutationKey: mutationKey }) })
        : { mutation: { mutationKey: mutationKey }, request: undefined }, mutationOptions = _a.mutation, requestOptions = _a.request;
    var mutationFn = function (props) {
        var id = (props !== null && props !== void 0 ? props : {}).id;
        return (0, exports.deleteLesson)(id, requestOptions);
    };
    return __assign({ mutationFn: mutationFn }, mutationOptions);
};
exports.getDeleteLessonMutationOptions = getDeleteLessonMutationOptions;
/**
 * @summary Delete a lesson (admin)
 */
var useDeleteLesson = function (options) {
    return (0, react_query_1.useMutation)((0, exports.getDeleteLessonMutationOptions)(options));
};
exports.useDeleteLesson = useDeleteLesson;
/**
 * @summary Get exercises
 */
var getGetExercisesUrl = function (params) {
    var normalizedParams = new URLSearchParams();
    Object.entries(params || {}).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        if (value !== undefined) {
            normalizedParams.append(key, value === null ? "null" : value.toString());
        }
    });
    var stringifiedParams = normalizedParams.toString();
    return stringifiedParams.length > 0
        ? "/api/exercises?".concat(stringifiedParams)
        : "/api/exercises";
};
exports.getGetExercisesUrl = getGetExercisesUrl;
var getExercises = function (params, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getGetExercisesUrl)(params), __assign(__assign({}, options), { method: "GET" }))];
    });
}); };
exports.getExercises = getExercises;
var getGetExercisesQueryKey = function (params) {
    return __spreadArray(["/api/exercises"], (params ? [params] : []), true);
};
exports.getGetExercisesQueryKey = getGetExercisesQueryKey;
var getGetExercisesQueryOptions = function (params, options) {
    var _a;
    var _b = options !== null && options !== void 0 ? options : {}, queryOptions = _b.query, requestOptions = _b.request;
    var queryKey = (_a = queryOptions === null || queryOptions === void 0 ? void 0 : queryOptions.queryKey) !== null && _a !== void 0 ? _a : (0, exports.getGetExercisesQueryKey)(params);
    var queryFn = function (_a) {
        var signal = _a.signal;
        return (0, exports.getExercises)(params, __assign({ signal: signal }, requestOptions));
    };
    return __assign({ queryKey: queryKey, queryFn: queryFn }, queryOptions);
};
exports.getGetExercisesQueryOptions = getGetExercisesQueryOptions;
/**
 * @summary Get exercises
 */
function useGetExercises(params, options) {
    var queryOptions = (0, exports.getGetExercisesQueryOptions)(params, options);
    var query = (0, react_query_1.useQuery)(queryOptions);
    return __assign(__assign({}, query), { queryKey: queryOptions.queryKey });
}
/**
 * @summary Create an exercise (admin)
 */
var getCreateExerciseUrl = function () {
    return "/api/exercises";
};
exports.getCreateExerciseUrl = getCreateExerciseUrl;
var createExercise = function (createExerciseRequest, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getCreateExerciseUrl)(), __assign(__assign({}, options), { method: "POST", headers: __assign({ "Content-Type": "application/json" }, options === null || options === void 0 ? void 0 : options.headers), body: JSON.stringify(createExerciseRequest) }))];
    });
}); };
exports.createExercise = createExercise;
var getCreateExerciseMutationOptions = function (options) {
    var mutationKey = ["createExercise"];
    var _a = options
        ? options.mutation &&
            "mutationKey" in options.mutation &&
            options.mutation.mutationKey
            ? options
            : __assign(__assign({}, options), { mutation: __assign(__assign({}, options.mutation), { mutationKey: mutationKey }) })
        : { mutation: { mutationKey: mutationKey }, request: undefined }, mutationOptions = _a.mutation, requestOptions = _a.request;
    var mutationFn = function (props) {
        var data = (props !== null && props !== void 0 ? props : {}).data;
        return (0, exports.createExercise)(data, requestOptions);
    };
    return __assign({ mutationFn: mutationFn }, mutationOptions);
};
exports.getCreateExerciseMutationOptions = getCreateExerciseMutationOptions;
/**
 * @summary Create an exercise (admin)
 */
var useCreateExercise = function (options) {
    return (0, react_query_1.useMutation)((0, exports.getCreateExerciseMutationOptions)(options));
};
exports.useCreateExercise = useCreateExercise;
/**
 * @summary Get exercise by ID
 */
var getGetExerciseUrl = function (id) {
    return "/api/exercises/".concat(id);
};
exports.getGetExerciseUrl = getGetExerciseUrl;
var getExercise = function (id, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getGetExerciseUrl)(id), __assign(__assign({}, options), { method: "GET" }))];
    });
}); };
exports.getExercise = getExercise;
var getGetExerciseQueryKey = function (id) {
    return ["/api/exercises/".concat(id)];
};
exports.getGetExerciseQueryKey = getGetExerciseQueryKey;
var getGetExerciseQueryOptions = function (id, options) {
    var _a;
    var _b = options !== null && options !== void 0 ? options : {}, queryOptions = _b.query, requestOptions = _b.request;
    var queryKey = (_a = queryOptions === null || queryOptions === void 0 ? void 0 : queryOptions.queryKey) !== null && _a !== void 0 ? _a : (0, exports.getGetExerciseQueryKey)(id);
    var queryFn = function (_a) {
        var signal = _a.signal;
        return (0, exports.getExercise)(id, __assign({ signal: signal }, requestOptions));
    };
    return __assign({ queryKey: queryKey, queryFn: queryFn, enabled: !!id }, queryOptions);
};
exports.getGetExerciseQueryOptions = getGetExerciseQueryOptions;
/**
 * @summary Get exercise by ID
 */
function useGetExercise(id, options) {
    var queryOptions = (0, exports.getGetExerciseQueryOptions)(id, options);
    var query = (0, react_query_1.useQuery)(queryOptions);
    return __assign(__assign({}, query), { queryKey: queryOptions.queryKey });
}
/**
 * @summary Submit exercise answer
 */
var getSubmitExerciseUrl = function (id) {
    return "/api/exercises/".concat(id, "/submit");
};
exports.getSubmitExerciseUrl = getSubmitExerciseUrl;
var submitExercise = function (id, submitExerciseRequest, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getSubmitExerciseUrl)(id), __assign(__assign({}, options), { method: "POST", headers: __assign({ "Content-Type": "application/json" }, options === null || options === void 0 ? void 0 : options.headers), body: JSON.stringify(submitExerciseRequest) }))];
    });
}); };
exports.submitExercise = submitExercise;
var getSubmitExerciseMutationOptions = function (options) {
    var mutationKey = ["submitExercise"];
    var _a = options
        ? options.mutation &&
            "mutationKey" in options.mutation &&
            options.mutation.mutationKey
            ? options
            : __assign(__assign({}, options), { mutation: __assign(__assign({}, options.mutation), { mutationKey: mutationKey }) })
        : { mutation: { mutationKey: mutationKey }, request: undefined }, mutationOptions = _a.mutation, requestOptions = _a.request;
    var mutationFn = function (props) {
        var _a = props !== null && props !== void 0 ? props : {}, id = _a.id, data = _a.data;
        return (0, exports.submitExercise)(id, data, requestOptions);
    };
    return __assign({ mutationFn: mutationFn }, mutationOptions);
};
exports.getSubmitExerciseMutationOptions = getSubmitExerciseMutationOptions;
/**
 * @summary Submit exercise answer
 */
var useSubmitExercise = function (options) {
    return (0, react_query_1.useMutation)((0, exports.getSubmitExerciseMutationOptions)(options));
};
exports.useSubmitExercise = useSubmitExercise;
/**
 * @summary Get past exams
 */
var getGetExamsUrl = function (params) {
    var normalizedParams = new URLSearchParams();
    Object.entries(params || {}).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        if (value !== undefined) {
            normalizedParams.append(key, value === null ? "null" : value.toString());
        }
    });
    var stringifiedParams = normalizedParams.toString();
    return stringifiedParams.length > 0
        ? "/api/exams?".concat(stringifiedParams)
        : "/api/exams";
};
exports.getGetExamsUrl = getGetExamsUrl;
var getExams = function (params, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getGetExamsUrl)(params), __assign(__assign({}, options), { method: "GET" }))];
    });
}); };
exports.getExams = getExams;
var getGetExamsQueryKey = function (params) {
    return __spreadArray(["/api/exams"], (params ? [params] : []), true);
};
exports.getGetExamsQueryKey = getGetExamsQueryKey;
var getGetExamsQueryOptions = function (params, options) {
    var _a;
    var _b = options !== null && options !== void 0 ? options : {}, queryOptions = _b.query, requestOptions = _b.request;
    var queryKey = (_a = queryOptions === null || queryOptions === void 0 ? void 0 : queryOptions.queryKey) !== null && _a !== void 0 ? _a : (0, exports.getGetExamsQueryKey)(params);
    var queryFn = function (_a) {
        var signal = _a.signal;
        return (0, exports.getExams)(params, __assign({ signal: signal }, requestOptions));
    };
    return __assign({ queryKey: queryKey, queryFn: queryFn }, queryOptions);
};
exports.getGetExamsQueryOptions = getGetExamsQueryOptions;
/**
 * @summary Get past exams
 */
function useGetExams(params, options) {
    var queryOptions = (0, exports.getGetExamsQueryOptions)(params, options);
    var query = (0, react_query_1.useQuery)(queryOptions);
    return __assign(__assign({}, query), { queryKey: queryOptions.queryKey });
}
/**
 * @summary Create a past exam (admin)
 */
var getCreateExamUrl = function () {
    return "/api/exams";
};
exports.getCreateExamUrl = getCreateExamUrl;
var createExam = function (createExamRequest, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getCreateExamUrl)(), __assign(__assign({}, options), { method: "POST", headers: __assign({ "Content-Type": "application/json" }, options === null || options === void 0 ? void 0 : options.headers), body: JSON.stringify(createExamRequest) }))];
    });
}); };
exports.createExam = createExam;
var getCreateExamMutationOptions = function (options) {
    var mutationKey = ["createExam"];
    var _a = options
        ? options.mutation &&
            "mutationKey" in options.mutation &&
            options.mutation.mutationKey
            ? options
            : __assign(__assign({}, options), { mutation: __assign(__assign({}, options.mutation), { mutationKey: mutationKey }) })
        : { mutation: { mutationKey: mutationKey }, request: undefined }, mutationOptions = _a.mutation, requestOptions = _a.request;
    var mutationFn = function (props) {
        var data = (props !== null && props !== void 0 ? props : {}).data;
        return (0, exports.createExam)(data, requestOptions);
    };
    return __assign({ mutationFn: mutationFn }, mutationOptions);
};
exports.getCreateExamMutationOptions = getCreateExamMutationOptions;
/**
 * @summary Create a past exam (admin)
 */
var useCreateExam = function (options) {
    return (0, react_query_1.useMutation)((0, exports.getCreateExamMutationOptions)(options));
};
exports.useCreateExam = useCreateExam;
/**
 * @summary Get exam by ID
 */
var getGetExamUrl = function (id) {
    return "/api/exams/".concat(id);
};
exports.getGetExamUrl = getGetExamUrl;
var getExam = function (id, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getGetExamUrl)(id), __assign(__assign({}, options), { method: "GET" }))];
    });
}); };
exports.getExam = getExam;
var getGetExamQueryKey = function (id) {
    return ["/api/exams/".concat(id)];
};
exports.getGetExamQueryKey = getGetExamQueryKey;
var getGetExamQueryOptions = function (id, options) {
    var _a;
    var _b = options !== null && options !== void 0 ? options : {}, queryOptions = _b.query, requestOptions = _b.request;
    var queryKey = (_a = queryOptions === null || queryOptions === void 0 ? void 0 : queryOptions.queryKey) !== null && _a !== void 0 ? _a : (0, exports.getGetExamQueryKey)(id);
    var queryFn = function (_a) {
        var signal = _a.signal;
        return (0, exports.getExam)(id, __assign({ signal: signal }, requestOptions));
    };
    return __assign({ queryKey: queryKey, queryFn: queryFn, enabled: !!id }, queryOptions);
};
exports.getGetExamQueryOptions = getGetExamQueryOptions;
/**
 * @summary Get exam by ID
 */
function useGetExam(id, options) {
    var queryOptions = (0, exports.getGetExamQueryOptions)(id, options);
    var query = (0, react_query_1.useQuery)(queryOptions);
    return __assign(__assign({}, query), { queryKey: queryOptions.queryKey });
}
/**
 * @summary Get user progress
 */
var getGetProgressUrl = function () {
    return "/api/progress";
};
exports.getGetProgressUrl = getGetProgressUrl;
var getProgress = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getGetProgressUrl)(), __assign(__assign({}, options), { method: "GET" }))];
    });
}); };
exports.getProgress = getProgress;
var getGetProgressQueryKey = function () {
    return ["/api/progress"];
};
exports.getGetProgressQueryKey = getGetProgressQueryKey;
var getGetProgressQueryOptions = function (options) {
    var _a;
    var _b = options !== null && options !== void 0 ? options : {}, queryOptions = _b.query, requestOptions = _b.request;
    var queryKey = (_a = queryOptions === null || queryOptions === void 0 ? void 0 : queryOptions.queryKey) !== null && _a !== void 0 ? _a : (0, exports.getGetProgressQueryKey)();
    var queryFn = function (_a) {
        var signal = _a.signal;
        return (0, exports.getProgress)(__assign({ signal: signal }, requestOptions));
    };
    return __assign({ queryKey: queryKey, queryFn: queryFn }, queryOptions);
};
exports.getGetProgressQueryOptions = getGetProgressQueryOptions;
/**
 * @summary Get user progress
 */
function useGetProgress(options) {
    var queryOptions = (0, exports.getGetProgressQueryOptions)(options);
    var query = (0, react_query_1.useQuery)(queryOptions);
    return __assign(__assign({}, query), { queryKey: queryOptions.queryKey });
}
/**
 * @summary Mark lesson as viewed/complete
 */
var getMarkLessonCompleteUrl = function (lessonId) {
    return "/api/progress/lesson/".concat(lessonId);
};
exports.getMarkLessonCompleteUrl = getMarkLessonCompleteUrl;
var markLessonComplete = function (lessonId, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getMarkLessonCompleteUrl)(lessonId), __assign(__assign({}, options), { method: "POST" }))];
    });
}); };
exports.markLessonComplete = markLessonComplete;
var getMarkLessonCompleteMutationOptions = function (options) {
    var mutationKey = ["markLessonComplete"];
    var _a = options
        ? options.mutation &&
            "mutationKey" in options.mutation &&
            options.mutation.mutationKey
            ? options
            : __assign(__assign({}, options), { mutation: __assign(__assign({}, options.mutation), { mutationKey: mutationKey }) })
        : { mutation: { mutationKey: mutationKey }, request: undefined }, mutationOptions = _a.mutation, requestOptions = _a.request;
    var mutationFn = function (props) {
        var lessonId = (props !== null && props !== void 0 ? props : {}).lessonId;
        return (0, exports.markLessonComplete)(lessonId, requestOptions);
    };
    return __assign({ mutationFn: mutationFn }, mutationOptions);
};
exports.getMarkLessonCompleteMutationOptions = getMarkLessonCompleteMutationOptions;
/**
 * @summary Mark lesson as viewed/complete
 */
var useMarkLessonComplete = function (options) {
    return (0, react_query_1.useMutation)((0, exports.getMarkLessonCompleteMutationOptions)(options));
};
exports.useMarkLessonComplete = useMarkLessonComplete;
/**
 * @summary Get leaderboard
 */
var getGetLeaderboardUrl = function (params) {
    var normalizedParams = new URLSearchParams();
    Object.entries(params || {}).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        if (value !== undefined) {
            normalizedParams.append(key, value === null ? "null" : value.toString());
        }
    });
    var stringifiedParams = normalizedParams.toString();
    return stringifiedParams.length > 0
        ? "/api/leaderboard?".concat(stringifiedParams)
        : "/api/leaderboard";
};
exports.getGetLeaderboardUrl = getGetLeaderboardUrl;
var getLeaderboard = function (params, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getGetLeaderboardUrl)(params), __assign(__assign({}, options), { method: "GET" }))];
    });
}); };
exports.getLeaderboard = getLeaderboard;
var getGetLeaderboardQueryKey = function (params) {
    return __spreadArray(["/api/leaderboard"], (params ? [params] : []), true);
};
exports.getGetLeaderboardQueryKey = getGetLeaderboardQueryKey;
var getGetLeaderboardQueryOptions = function (params, options) {
    var _a;
    var _b = options !== null && options !== void 0 ? options : {}, queryOptions = _b.query, requestOptions = _b.request;
    var queryKey = (_a = queryOptions === null || queryOptions === void 0 ? void 0 : queryOptions.queryKey) !== null && _a !== void 0 ? _a : (0, exports.getGetLeaderboardQueryKey)(params);
    var queryFn = function (_a) {
        var signal = _a.signal;
        return (0, exports.getLeaderboard)(params, __assign({ signal: signal }, requestOptions));
    };
    return __assign({ queryKey: queryKey, queryFn: queryFn }, queryOptions);
};
exports.getGetLeaderboardQueryOptions = getGetLeaderboardQueryOptions;
/**
 * @summary Get leaderboard
 */
function useGetLeaderboard(params, options) {
    var queryOptions = (0, exports.getGetLeaderboardQueryOptions)(params, options);
    var query = (0, react_query_1.useQuery)(queryOptions);
    return __assign(__assign({}, query), { queryKey: queryOptions.queryKey });
}
/**
 * @summary Get user badges
 */
var getGetUserBadgesUrl = function () {
    return "/api/badges";
};
exports.getGetUserBadgesUrl = getGetUserBadgesUrl;
var getUserBadges = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getGetUserBadgesUrl)(), __assign(__assign({}, options), { method: "GET" }))];
    });
}); };
exports.getUserBadges = getUserBadges;
var getGetUserBadgesQueryKey = function () {
    return ["/api/badges"];
};
exports.getGetUserBadgesQueryKey = getGetUserBadgesQueryKey;
var getGetUserBadgesQueryOptions = function (options) {
    var _a;
    var _b = options !== null && options !== void 0 ? options : {}, queryOptions = _b.query, requestOptions = _b.request;
    var queryKey = (_a = queryOptions === null || queryOptions === void 0 ? void 0 : queryOptions.queryKey) !== null && _a !== void 0 ? _a : (0, exports.getGetUserBadgesQueryKey)();
    var queryFn = function (_a) {
        var signal = _a.signal;
        return (0, exports.getUserBadges)(__assign({ signal: signal }, requestOptions));
    };
    return __assign({ queryKey: queryKey, queryFn: queryFn }, queryOptions);
};
exports.getGetUserBadgesQueryOptions = getGetUserBadgesQueryOptions;
/**
 * @summary Get user badges
 */
function useGetUserBadges(options) {
    var queryOptions = (0, exports.getGetUserBadgesQueryOptions)(options);
    var query = (0, react_query_1.useQuery)(queryOptions);
    return __assign(__assign({}, query), { queryKey: queryOptions.queryKey });
}
/**
 * @summary Get reviews for a lesson
 */
var getGetReviewsUrl = function (params) {
    var normalizedParams = new URLSearchParams();
    Object.entries(params || {}).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        if (value !== undefined) {
            normalizedParams.append(key, value === null ? "null" : value.toString());
        }
    });
    var stringifiedParams = normalizedParams.toString();
    return stringifiedParams.length > 0
        ? "/api/reviews?".concat(stringifiedParams)
        : "/api/reviews";
};
exports.getGetReviewsUrl = getGetReviewsUrl;
var getReviews = function (params, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getGetReviewsUrl)(params), __assign(__assign({}, options), { method: "GET" }))];
    });
}); };
exports.getReviews = getReviews;
var getGetReviewsQueryKey = function (params) {
    return __spreadArray(["/api/reviews"], (params ? [params] : []), true);
};
exports.getGetReviewsQueryKey = getGetReviewsQueryKey;
var getGetReviewsQueryOptions = function (params, options) {
    var _a;
    var _b = options !== null && options !== void 0 ? options : {}, queryOptions = _b.query, requestOptions = _b.request;
    var queryKey = (_a = queryOptions === null || queryOptions === void 0 ? void 0 : queryOptions.queryKey) !== null && _a !== void 0 ? _a : (0, exports.getGetReviewsQueryKey)(params);
    var queryFn = function (_a) {
        var signal = _a.signal;
        return (0, exports.getReviews)(params, __assign({ signal: signal }, requestOptions));
    };
    return __assign({ queryKey: queryKey, queryFn: queryFn }, queryOptions);
};
exports.getGetReviewsQueryOptions = getGetReviewsQueryOptions;
/**
 * @summary Get reviews for a lesson
 */
function useGetReviews(params, options) {
    var queryOptions = (0, exports.getGetReviewsQueryOptions)(params, options);
    var query = (0, react_query_1.useQuery)(queryOptions);
    return __assign(__assign({}, query), { queryKey: queryOptions.queryKey });
}
/**
 * @summary Create a review
 */
var getCreateReviewUrl = function () {
    return "/api/reviews";
};
exports.getCreateReviewUrl = getCreateReviewUrl;
var createReview = function (createReviewRequest, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getCreateReviewUrl)(), __assign(__assign({}, options), { method: "POST", headers: __assign({ "Content-Type": "application/json" }, options === null || options === void 0 ? void 0 : options.headers), body: JSON.stringify(createReviewRequest) }))];
    });
}); };
exports.createReview = createReview;
var getCreateReviewMutationOptions = function (options) {
    var mutationKey = ["createReview"];
    var _a = options
        ? options.mutation &&
            "mutationKey" in options.mutation &&
            options.mutation.mutationKey
            ? options
            : __assign(__assign({}, options), { mutation: __assign(__assign({}, options.mutation), { mutationKey: mutationKey }) })
        : { mutation: { mutationKey: mutationKey }, request: undefined }, mutationOptions = _a.mutation, requestOptions = _a.request;
    var mutationFn = function (props) {
        var data = (props !== null && props !== void 0 ? props : {}).data;
        return (0, exports.createReview)(data, requestOptions);
    };
    return __assign({ mutationFn: mutationFn }, mutationOptions);
};
exports.getCreateReviewMutationOptions = getCreateReviewMutationOptions;
/**
 * @summary Create a review
 */
var useCreateReview = function (options) {
    return (0, react_query_1.useMutation)((0, exports.getCreateReviewMutationOptions)(options));
};
exports.useCreateReview = useCreateReview;
/**
 * @summary Send a message to the AI tutor
 */
var getSendChatMessageUrl = function () {
    return "/api/chat/message";
};
exports.getSendChatMessageUrl = getSendChatMessageUrl;
var sendChatMessage = function (chatMessageRequest, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getSendChatMessageUrl)(), __assign(__assign({}, options), { method: "POST", headers: __assign({ "Content-Type": "application/json" }, options === null || options === void 0 ? void 0 : options.headers), body: JSON.stringify(chatMessageRequest) }))];
    });
}); };
exports.sendChatMessage = sendChatMessage;
var getSendChatMessageMutationOptions = function (options) {
    var mutationKey = ["sendChatMessage"];
    var _a = options
        ? options.mutation &&
            "mutationKey" in options.mutation &&
            options.mutation.mutationKey
            ? options
            : __assign(__assign({}, options), { mutation: __assign(__assign({}, options.mutation), { mutationKey: mutationKey }) })
        : { mutation: { mutationKey: mutationKey }, request: undefined }, mutationOptions = _a.mutation, requestOptions = _a.request;
    var mutationFn = function (props) {
        var data = (props !== null && props !== void 0 ? props : {}).data;
        return (0, exports.sendChatMessage)(data, requestOptions);
    };
    return __assign({ mutationFn: mutationFn }, mutationOptions);
};
exports.getSendChatMessageMutationOptions = getSendChatMessageMutationOptions;
/**
 * @summary Send a message to the AI tutor
 */
var useSendChatMessage = function (options) {
    return (0, react_query_1.useMutation)((0, exports.getSendChatMessageMutationOptions)(options));
};
exports.useSendChatMessage = useSendChatMessage;
/**
 * @summary Get chat history
 */
var getGetChatHistoryUrl = function () {
    return "/api/chat/history";
};
exports.getGetChatHistoryUrl = getGetChatHistoryUrl;
var getChatHistory = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getGetChatHistoryUrl)(), __assign(__assign({}, options), { method: "GET" }))];
    });
}); };
exports.getChatHistory = getChatHistory;
var getGetChatHistoryQueryKey = function () {
    return ["/api/chat/history"];
};
exports.getGetChatHistoryQueryKey = getGetChatHistoryQueryKey;
var getGetChatHistoryQueryOptions = function (options) {
    var _a;
    var _b = options !== null && options !== void 0 ? options : {}, queryOptions = _b.query, requestOptions = _b.request;
    var queryKey = (_a = queryOptions === null || queryOptions === void 0 ? void 0 : queryOptions.queryKey) !== null && _a !== void 0 ? _a : (0, exports.getGetChatHistoryQueryKey)();
    var queryFn = function (_a) {
        var signal = _a.signal;
        return (0, exports.getChatHistory)(__assign({ signal: signal }, requestOptions));
    };
    return __assign({ queryKey: queryKey, queryFn: queryFn }, queryOptions);
};
exports.getGetChatHistoryQueryOptions = getGetChatHistoryQueryOptions;
/**
 * @summary Get chat history
 */
function useGetChatHistory(options) {
    var queryOptions = (0, exports.getGetChatHistoryQueryOptions)(options);
    var query = (0, react_query_1.useQuery)(queryOptions);
    return __assign(__assign({}, query), { queryKey: queryOptions.queryKey });
}
/**
 * @summary Get admin statistics
 */
var getGetAdminStatsUrl = function () {
    return "/api/admin/stats";
};
exports.getGetAdminStatsUrl = getGetAdminStatsUrl;
var getAdminStats = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getGetAdminStatsUrl)(), __assign(__assign({}, options), { method: "GET" }))];
    });
}); };
exports.getAdminStats = getAdminStats;
var getGetAdminStatsQueryKey = function () {
    return ["/api/admin/stats"];
};
exports.getGetAdminStatsQueryKey = getGetAdminStatsQueryKey;
var getGetAdminStatsQueryOptions = function (options) {
    var _a;
    var _b = options !== null && options !== void 0 ? options : {}, queryOptions = _b.query, requestOptions = _b.request;
    var queryKey = (_a = queryOptions === null || queryOptions === void 0 ? void 0 : queryOptions.queryKey) !== null && _a !== void 0 ? _a : (0, exports.getGetAdminStatsQueryKey)();
    var queryFn = function (_a) {
        var signal = _a.signal;
        return (0, exports.getAdminStats)(__assign({ signal: signal }, requestOptions));
    };
    return __assign({ queryKey: queryKey, queryFn: queryFn }, queryOptions);
};
exports.getGetAdminStatsQueryOptions = getGetAdminStatsQueryOptions;
/**
 * @summary Get admin statistics
 */
function useGetAdminStats(options) {
    var queryOptions = (0, exports.getGetAdminStatsQueryOptions)(options);
    var query = (0, react_query_1.useQuery)(queryOptions);
    return __assign(__assign({}, query), { queryKey: queryOptions.queryKey });
}
/**
 * @summary Get all users (admin)
 */
var getGetAdminUsersUrl = function () {
    return "/api/admin/users";
};
exports.getGetAdminUsersUrl = getGetAdminUsersUrl;
var getAdminUsers = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getGetAdminUsersUrl)(), __assign(__assign({}, options), { method: "GET" }))];
    });
}); };
exports.getAdminUsers = getAdminUsers;
var getGetAdminUsersQueryKey = function () {
    return ["/api/admin/users"];
};
exports.getGetAdminUsersQueryKey = getGetAdminUsersQueryKey;
var getGetAdminUsersQueryOptions = function (options) {
    var _a;
    var _b = options !== null && options !== void 0 ? options : {}, queryOptions = _b.query, requestOptions = _b.request;
    var queryKey = (_a = queryOptions === null || queryOptions === void 0 ? void 0 : queryOptions.queryKey) !== null && _a !== void 0 ? _a : (0, exports.getGetAdminUsersQueryKey)();
    var queryFn = function (_a) {
        var signal = _a.signal;
        return (0, exports.getAdminUsers)(__assign({ signal: signal }, requestOptions));
    };
    return __assign({ queryKey: queryKey, queryFn: queryFn }, queryOptions);
};
exports.getGetAdminUsersQueryOptions = getGetAdminUsersQueryOptions;
/**
 * @summary Get all users (admin)
 */
function useGetAdminUsers(options) {
    var queryOptions = (0, exports.getGetAdminUsersQueryOptions)(options);
    var query = (0, react_query_1.useQuery)(queryOptions);
    return __assign(__assign({}, query), { queryKey: queryOptions.queryKey });
}
/**
 * @summary Moderate a review
 */
var getModerateReviewUrl = function (id) {
    return "/api/admin/reviews/".concat(id, "/moderate");
};
exports.getModerateReviewUrl = getModerateReviewUrl;
var moderateReview = function (id, moderateReviewRequest, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, custom_fetch_1.customFetch)((0, exports.getModerateReviewUrl)(id), __assign(__assign({}, options), { method: "PUT", headers: __assign({ "Content-Type": "application/json" }, options === null || options === void 0 ? void 0 : options.headers), body: JSON.stringify(moderateReviewRequest) }))];
    });
}); };
exports.moderateReview = moderateReview;
var getModerateReviewMutationOptions = function (options) {
    var mutationKey = ["moderateReview"];
    var _a = options
        ? options.mutation &&
            "mutationKey" in options.mutation &&
            options.mutation.mutationKey
            ? options
            : __assign(__assign({}, options), { mutation: __assign(__assign({}, options.mutation), { mutationKey: mutationKey }) })
        : { mutation: { mutationKey: mutationKey }, request: undefined }, mutationOptions = _a.mutation, requestOptions = _a.request;
    var mutationFn = function (props) {
        var _a = props !== null && props !== void 0 ? props : {}, id = _a.id, data = _a.data;
        return (0, exports.moderateReview)(id, data, requestOptions);
    };
    return __assign({ mutationFn: mutationFn }, mutationOptions);
};
exports.getModerateReviewMutationOptions = getModerateReviewMutationOptions;
/**
 * @summary Moderate a review
 */
var useModerateReview = function (options) {
    return (0, react_query_1.useMutation)((0, exports.getModerateReviewMutationOptions)(options));
};
exports.useModerateReview = useModerateReview;
