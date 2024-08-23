import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { login as loginApi } from "@/api/Auth";
import { User } from "@/types/User";
import { me } from "@/api/User";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const getInitialAuthState = (): boolean => {
  const storedAuthState = localStorage.getItem("isAuthenticated");
  return storedAuthState ? JSON.parse(storedAuthState) : false;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] =
    useState<boolean>(getInitialAuthState);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchUser = async () => {
        try {
          const data = await me();
          setUser(data);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          setIsAuthenticated(false);
          setUser(null);
        }
      };

      fetchUser();
    } else {
      setUser(null);
    }
  }, [isAuthenticated]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      await loginApi(email, password);
      const data = await me();
      setIsAuthenticated(true);
      setUser(data);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("isAuthenticated");
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
