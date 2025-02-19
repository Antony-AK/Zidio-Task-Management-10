import { createContext, useContext, useState, useEffect, useRef } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const logoutTimer = useRef(null);  

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setUser({ token, isAuthenticated: true });

            logoutTimer.current = setTimeout(() => {
                logout();
            }, 3600000);
        }

        return () => clearTimeout(logoutTimer.current);
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        setUser({ token, isAuthenticated: true });

        if (logoutTimer.current) {
            clearTimeout(logoutTimer.current);
        }

        logoutTimer.current = setTimeout(() => {
            logout();
        }, 3600000);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);

        clearTimeout(logoutTimer.current);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
