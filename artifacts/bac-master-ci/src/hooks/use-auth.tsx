import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useLocation } from "wouter";
import { User, useGetMe, getGetMeQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("bac_token"));
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // The generated hook for getting the current user
  const { data: user, isLoading, isError, error } = useGetMe({
    query: {
      enabled: !!token,
      retry: false,
    }
  });

  useEffect(() => {
    if (isError) {
      // Invalid token or session expired
      localStorage.removeItem("bac_token");
      setToken(null);
      queryClient.setQueryData(getGetMeQueryKey(), null);
      toast({
        title: "Session expirée",
        description: "Veuillez vous reconnecter.",
        variant: "destructive",
      });
      setLocation("/login");
    }
  }, [isError, setLocation, queryClient, toast]);

  const login = (newToken: string, userData: User) => {
    localStorage.setItem("bac_token", newToken);
    setToken(newToken);
    queryClient.setQueryData(getGetMeQueryKey(), userData);
    setLocation("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("bac_token");
    setToken(null);
    queryClient.setQueryData(getGetMeQueryKey(), null);
    queryClient.clear();
    setLocation("/login");
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isLoading: isLoading && !!token,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
