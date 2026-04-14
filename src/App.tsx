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
      <Route path="/courses" component={Courses} />
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
