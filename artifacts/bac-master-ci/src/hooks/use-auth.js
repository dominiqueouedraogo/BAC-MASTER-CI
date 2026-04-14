"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProvider = AuthProvider;
exports.useAuth = useAuth;
var react_1 = require("react");
var wouter_1 = require("wouter");
var api_client_react_1 = require("@workspace/api-client-react");
var react_query_1 = require("@tanstack/react-query");
var use_toast_1 = require("@/hooks/use-toast");
var AuthContext = (0, react_1.createContext)(undefined);
function AuthProvider(_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)(function () { return localStorage.getItem("bac_token"); }), token = _b[0], setToken = _b[1];
    var _c = (0, wouter_1.useLocation)(), setLocation = _c[1];
    var queryClient = (0, react_query_1.useQueryClient)();
    var toast = (0, use_toast_1.useToast)().toast;
    // The generated hook for getting the current user
    var _d = (0, api_client_react_1.useGetMe)({
        query: {
            enabled: !!token,
            retry: false,
        }
    }), user = _d.data, isLoading = _d.isLoading, isError = _d.isError, error = _d.error;
    (0, react_1.useEffect)(function () {
        if (isError) {
            // Invalid token or session expired
            localStorage.removeItem("bac_token");
            setToken(null);
            queryClient.setQueryData((0, api_client_react_1.getGetMeQueryKey)(), null);
            toast({
                title: "Session expirée",
                description: "Veuillez vous reconnecter.",
                variant: "destructive",
            });
            setLocation("/login");
        }
    }, [isError, setLocation, queryClient, toast]);
    var login = function (newToken, userData) {
        localStorage.setItem("bac_token", newToken);
        setToken(newToken);
        queryClient.setQueryData((0, api_client_react_1.getGetMeQueryKey)(), userData);
        setLocation("/dashboard");
    };
    var logout = function () {
        localStorage.removeItem("bac_token");
        setToken(null);
        queryClient.setQueryData((0, api_client_react_1.getGetMeQueryKey)(), null);
        queryClient.clear();
        setLocation("/login");
    };
    var isAuthenticated = !!user;
    return (<AuthContext.Provider value={{
            user: user || null,
            isLoading: isLoading && !!token,
            login: login,
            logout: logout,
            isAuthenticated: isAuthenticated,
        }}>
      {children}
    </AuthContext.Provider>);
}
function useAuth() {
    var context = (0, react_1.useContext)(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
