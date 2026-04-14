"use strict";
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
exports.default = App;
var wouter_1 = require("wouter");
var react_query_1 = require("@tanstack/react-query");
var toaster_1 = require("@/components/ui/toaster");
var tooltip_1 = require("@/components/ui/tooltip");
var use_auth_1 = require("@/hooks/use-auth");
// Pages
var landing_1 = require("@/pages/landing");
var login_1 = require("@/pages/login");
var register_1 = require("@/pages/register");
var dashboard_1 = require("@/pages/dashboard");
var courses_1 = require("@/pages/courses");
var lesson_1 = require("@/pages/lesson");
var exercises_1 = require("@/pages/exercises");
var quiz_1 = require("@/pages/quiz");
var exams_1 = require("@/pages/exams");
var chat_1 = require("@/pages/chat");
var leaderboard_1 = require("@/pages/leaderboard");
var methodology_1 = require("@/pages/methodology");
var profile_1 = require("@/pages/profile");
var admin_1 = require("@/pages/admin");
var admin_courses_1 = require("@/pages/admin-courses");
var admin_add_course_1 = require("@/pages/admin-add-course");
var admin_stats_1 = require("@/pages/admin-stats");
var admin_users_1 = require("@/pages/admin-users");
var admin_exams_1 = require("@/pages/admin-exams");
var admin_add_exam_1 = require("@/pages/admin-add-exam");
var exam_detail_1 = require("@/pages/exam-detail");
var forgot_password_1 = require("@/pages/forgot-password");
var reset_password_1 = require("@/pages/reset-password");
var not_found_1 = require("@/pages/not-found");
var queryClient = new react_query_1.QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});
function ProtectedRoute(_a) {
    var Component = _a.component, rest = __rest(_a, ["component"]);
    var _b = (0, use_auth_1.useAuth)(), isAuthenticated = _b.isAuthenticated, isLoading = _b.isLoading;
    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center bg-background text-primary">Chargement...</div>;
    }
    if (!isAuthenticated) {
        window.location.href = import.meta.env.BASE_URL + "login";
        return null;
    }
    return <Component {...rest}/>;
}
function Router() {
    return (<wouter_1.Switch>
      <wouter_1.Route path="/" component={landing_1.default}/>
      <wouter_1.Route path="/login" component={login_1.default}/>
      <wouter_1.Route path="/register" component={register_1.default}/>
      <wouter_1.Route path="/forgot-password" component={forgot_password_1.default}/>
      <wouter_1.Route path="/reset-password" component={reset_password_1.default}/>

      {/* Student Routes */}
      <wouter_1.Route path="/dashboard"><ProtectedRoute component={dashboard_1.default}/></wouter_1.Route>
      <wouter_1.Route path="/courses" component={courses_1.default}/>
      <wouter_1.Route path="/lessons/:id"><ProtectedRoute component={lesson_1.default}/></wouter_1.Route>
      <wouter_1.Route path="/exercises"><ProtectedRoute component={exercises_1.default}/></wouter_1.Route>
      <wouter_1.Route path="/exercises/:id"><ProtectedRoute component={quiz_1.default}/></wouter_1.Route>
      <wouter_1.Route path="/exams"><ProtectedRoute component={exams_1.default}/></wouter_1.Route>
      <wouter_1.Route path="/exams/:id"><ProtectedRoute component={exam_detail_1.default}/></wouter_1.Route>
      <wouter_1.Route path="/chat"><ProtectedRoute component={chat_1.default}/></wouter_1.Route>
      <wouter_1.Route path="/leaderboard"><ProtectedRoute component={leaderboard_1.default}/></wouter_1.Route>
      <wouter_1.Route path="/methodology"><ProtectedRoute component={methodology_1.default}/></wouter_1.Route>
      <wouter_1.Route path="/profile"><ProtectedRoute component={profile_1.default}/></wouter_1.Route>

      {/* Admin Routes */}
      <wouter_1.Route path="/admin"><ProtectedRoute component={admin_1.default}/></wouter_1.Route>
      <wouter_1.Route path="/admin/courses"><ProtectedRoute component={admin_courses_1.default}/></wouter_1.Route>
      <wouter_1.Route path="/admin/add-course"><ProtectedRoute component={admin_add_course_1.default}/></wouter_1.Route>
      <wouter_1.Route path="/admin/edit-course/:id"><ProtectedRoute component={admin_add_course_1.default}/></wouter_1.Route>
      <wouter_1.Route path="/admin/stats"><ProtectedRoute component={admin_stats_1.default}/></wouter_1.Route>
      <wouter_1.Route path="/admin/users"><ProtectedRoute component={admin_users_1.default}/></wouter_1.Route>
      <wouter_1.Route path="/admin/exams"><ProtectedRoute component={admin_exams_1.default}/></wouter_1.Route>
      <wouter_1.Route path="/admin/add-exam"><ProtectedRoute component={admin_add_exam_1.default}/></wouter_1.Route>
      <wouter_1.Route path="/admin/edit-exam/:id"><ProtectedRoute component={admin_add_exam_1.default}/></wouter_1.Route>

      <wouter_1.Route component={not_found_1.default}/>
    </wouter_1.Switch>);
}
function App() {
    return (<react_query_1.QueryClientProvider client={queryClient}>
      <tooltip_1.TooltipProvider>
        <wouter_1.Router base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <use_auth_1.AuthProvider>
            <Router />
          </use_auth_1.AuthProvider>
        </wouter_1.Router>
        <toaster_1.Toaster />
      </tooltip_1.TooltipProvider>
    </react_query_1.QueryClientProvider>);
}
