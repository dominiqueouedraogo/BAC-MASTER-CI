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
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Protected Route Component
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
      
      {/* Protected Routes */}
      <Route path="/dashboard"><ProtectedRoute component={Dashboard} /></Route>
      <Route path="/courses"><ProtectedRoute component={Courses} /></Route>
      <Route path="/lessons/:id"><ProtectedRoute component={LessonDetail} /></Route>
      <Route path="/exercises"><ProtectedRoute component={Exercises} /></Route>
      <Route path="/exercises/:id"><ProtectedRoute component={Quiz} /></Route>
      <Route path="/exams"><ProtectedRoute component={Exams} /></Route>
      <Route path="/chat"><ProtectedRoute component={Chatbot} /></Route>
      <Route path="/leaderboard"><ProtectedRoute component={Leaderboard} /></Route>
      <Route path="/methodology"><ProtectedRoute component={Methodology} /></Route>
      <Route path="/profile"><ProtectedRoute component={Profile} /></Route>
      <Route path="/admin"><ProtectedRoute component={AdminPanel} /></Route>

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
