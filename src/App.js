import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "src/components/ui/toaster";
import { TooltipProvider } from "src/components/ui/tooltip";
import { AuthProvider, useAuth } from "src/hooks/use-auth";
// Pages
import LandingPage from "src/pages/landing";
import Login from "src/pages/login";
import Register from "src/pages/register";
import Dashboard from "src/pages/dashboard";
import Courses from "src/pages/courses";
import LessonDetail from "src/pages/lesson";
import Exercises from "src/pages/exercises";
import Quiz from "src/pages/quiz";
import Exams from "src/pages/exams";
import Chatbot from "src/pages/chat";
import Leaderboard from "src/pages/leaderboard";
import Methodology from "src/pages/methodology";
import Profile from "src/pages/profile";
import AdminPanel from "src/pages/admin";
import AdminCourses from "src/pages/admin-courses";
import AdminAddCourse from "src/pages/admin-add-course";
import AdminStats from "src/pages/admin-stats";
import AdminUsers from "src/pages/admin-users";
import AdminExams from "src/pages/admin-exams";
import AdminAddExam from "src/pages/admin-add-exam";
import ExamDetail from "src/pages/exam-detail";
import ForgotPassword from "src/pages/forgot-password";
import ResetPassword from "src/pages/reset-password";
import NotFound from "src/pages/not-found";
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});
function ProtectedRoute({ component: Component, ...rest }) {
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading) {
        return _jsx("div", { className: "min-h-screen flex items-center justify-center bg-background text-primary", children: "Chargement..." });
    }
    if (!isAuthenticated) {
        window.location.href = import.meta.env.BASE_URL + "login";
        return null;
    }
    return _jsx(Component, { ...rest });
}
function Router() {
    return (_jsxs(Switch, { children: [_jsx(Route, { path: "/", component: LandingPage }), _jsx(Route, { path: "/login", component: Login }), _jsx(Route, { path: "/register", component: Register }), _jsx(Route, { path: "/forgot-password", component: ForgotPassword }), _jsx(Route, { path: "/reset-password", component: ResetPassword }), _jsx(Route, { path: "/dashboard", children: _jsx(ProtectedRoute, { component: Dashboard }) }), _jsx(Route, { path: "/courses", component: Courses }), _jsx(Route, { path: "/lessons/:id", children: _jsx(ProtectedRoute, { component: LessonDetail }) }), _jsx(Route, { path: "/exercises", children: _jsx(ProtectedRoute, { component: Exercises }) }), _jsx(Route, { path: "/exercises/:id", children: _jsx(ProtectedRoute, { component: Quiz }) }), _jsx(Route, { path: "/exams", children: _jsx(ProtectedRoute, { component: Exams }) }), _jsx(Route, { path: "/exams/:id", children: _jsx(ProtectedRoute, { component: ExamDetail }) }), _jsx(Route, { path: "/chat", children: _jsx(ProtectedRoute, { component: Chatbot }) }), _jsx(Route, { path: "/leaderboard", children: _jsx(ProtectedRoute, { component: Leaderboard }) }), _jsx(Route, { path: "/methodology", children: _jsx(ProtectedRoute, { component: Methodology }) }), _jsx(Route, { path: "/profile", children: _jsx(ProtectedRoute, { component: Profile }) }), _jsx(Route, { path: "/admin", children: _jsx(ProtectedRoute, { component: AdminPanel }) }), _jsx(Route, { path: "/admin/courses", children: _jsx(ProtectedRoute, { component: AdminCourses }) }), _jsx(Route, { path: "/admin/add-course", children: _jsx(ProtectedRoute, { component: AdminAddCourse }) }), _jsx(Route, { path: "/admin/edit-course/:id", children: _jsx(ProtectedRoute, { component: AdminAddCourse }) }), _jsx(Route, { path: "/admin/stats", children: _jsx(ProtectedRoute, { component: AdminStats }) }), _jsx(Route, { path: "/admin/users", children: _jsx(ProtectedRoute, { component: AdminUsers }) }), _jsx(Route, { path: "/admin/exams", children: _jsx(ProtectedRoute, { component: AdminExams }) }), _jsx(Route, { path: "/admin/add-exam", children: _jsx(ProtectedRoute, { component: AdminAddExam }) }), _jsx(Route, { path: "/admin/edit-exam/:id", children: _jsx(ProtectedRoute, { component: AdminAddExam }) }), _jsx(Route, { component: NotFound })] }));
}
export default function App() {
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsxs(TooltipProvider, { children: [_jsx(WouterRouter, { base: import.meta.env.BASE_URL.replace(/\/$/, ""), children: _jsx(AuthProvider, { children: _jsx(Router, {}) }) }), _jsx(Toaster, {})] }) }));
}
