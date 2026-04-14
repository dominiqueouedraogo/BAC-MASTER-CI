import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useGetMe, getGetMeQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "src/hooks/use-toast";
const AuthContext = createContext(undefined);
export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem("bac_token"));
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
    const login = (newToken, userData) => {
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
    return (_jsx(AuthContext.Provider, { value: {
            user: user || null,
            isLoading: isLoading && !!token,
            login,
            logout,
            isAuthenticated,
        }, children: children }));
}
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
