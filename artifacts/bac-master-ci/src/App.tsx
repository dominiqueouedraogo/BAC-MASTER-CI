import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { AuthProvider, useAuth } from "@/hooks/use-auth";

// Pages
import LandingPage from "@/pages/landing";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Dashboard from "@/pages/dashboard";
import Courses from "@/pages/courses";
import LessonDetail from "@/pages/lesson";
import Exercises from "@/pages/exercises";
import Quiz from "@/pages/quiz";
import Exams from "@/pages/exams";
import Chatbot from "@/pages/chat";
import Leaderboard from "@/pages/leaderboard";
import Methodology from "@/pages/methodology";
import Profile from "@/pages/profile";
import AdminPanel from "@/pages/admin";
import AdminCourses from "@/pages/admin-courses";
import AdminAddCourse from "@/pages/admin-add-course";
import AdminStats from "@/pages/admin-stats";
import AdminUsers from "@/pages/admin-users";
import AdminExams from "@/pages/admin-exams";
import AdminAddExam from "@/pages/admin-add-exam";
import ExamDetail from "@/pages/exam-detail";
import ForgotPassword from "@/pages/forgot-password";
import ResetPassword from "@/pages/reset-password";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function ProtectedRoute({ component: Component, ...rest }: any) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-background text-primary">Chargement...</div>;
  }

  if (!isAuthenticated) {
    window.location.href = import.meta.env.BASE_URL + "login";
    return null;
  }

  return <Component {...rest} />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password" component={ResetPassword} />

      {/* Student Routes */}
      <Route path="/dashboard"><ProtectedRoute component={Dashboard} /></Route>
      <Route path="/courses"><ProtectedRoute component={Courses} /></Route>
      <Route path="/lessons/:id"><ProtectedRoute component={LessonDetail} /></Route>
      <Route path="/exercises"><ProtectedRoute component={Exercises} /></Route>
      <Route path="/exercises/:id"><ProtectedRoute component={Quiz} /></Route>
      <Route path="/exams"><ProtectedRoute component={Exams} /></Route>
      <Route path="/exams/:id"><ProtectedRoute component={ExamDetail} /></Route>
      <Route path="/chat"><ProtectedRoute component={Chatbot} /></Route>
      <Route path="/leaderboard"><ProtectedRoute component={Leaderboard} /></Route>
      <Route path="/methodology"><ProtectedRoute component={Methodology} /></Route>
      <Route path="/profile"><ProtectedRoute component={Profile} /></Route>

      {/* Admin Routes */}
      <Route path="/admin"><ProtectedRoute component={AdminPanel} /></Route>
      <Route path="/admin/courses"><ProtectedRoute component={AdminCourses} /></Route>
      <Route path="/admin/add-course"><ProtectedRoute component={AdminAddCourse} /></Route>
      <Route path="/admin/edit-course/:id"><ProtectedRoute component={AdminAddCourse} /></Route>
      <Route path="/admin/stats"><ProtectedRoute component={AdminStats} /></Route>
      <Route path="/admin/users"><ProtectedRoute component={AdminUsers} /></Route>
      <Route path="/admin/exams"><ProtectedRoute component={AdminExams} /></Route>
      <Route path="/admin/add-exam"><ProtectedRoute component={AdminAddExam} /></Route>
      <Route path="/admin/edit-exam/:id"><ProtectedRoute component={AdminAddExam} /></Route>

      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
