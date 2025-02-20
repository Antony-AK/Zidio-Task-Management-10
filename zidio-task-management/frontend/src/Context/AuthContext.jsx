import { createContext, useContext, useState, useEffect, useRef } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const logoutTimer = useRef(null);  

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
    
        let parsedUser = null;
        if (storedUser) {
            try {
                parsedUser = JSON.parse(storedUser); 
            } catch (error) {
                console.error("Error parsing user data from localStorage:", error);
                parsedUser = null;
            }
        }
    
        if (token && parsedUser) {
            setUser({ token, isAuthenticated: true, ...parsedUser });
        }
    }, []);
    

    const login = (token, userData) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData)); 
        setUser({ token, isAuthenticated: true, ...userData });

        if (logoutTimer.current) {
            clearTimeout(logoutTimer.current);
        }

        logoutTimer.current = setTimeout(() => {
            logout();
        }, 3600000);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
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
