import Cookies from "js-cookie";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import api from "../../services/api";
import {
  USE_AUTH_MOCK,
  mockLoginRequest,
  mockSessionRecovery,
} from "./auth.mock";

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatarImg: string;
  provider?: "local" | "microsoft";
  microsoftId: string;
  createdAt: string;
  updatedAt: string;
  isAdmin: boolean;
}

interface AuthContextData {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  loginWithMicrosoft: () => void;
  loginWithEmail: (credentials: SignInCredentials) => Promise<void>;
  logout: (singleSignOut?: boolean) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("app-token");

    if (token) {
      if (USE_AUTH_MOCK) {
        setUser(mockSessionRecovery());
        setIsLoading(false);
        return;
      }

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      api
        .get("/users/me")
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          logout();
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const loginWithMicrosoft = () => {
    if (USE_AUTH_MOCK) {
      alert("Mock: Login Microsoft não implementado no mock.");
      return;
    }
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/microsoft`;
  };

  const loginWithEmail = async ({ email, password }: SignInCredentials) => {
    if (USE_AUTH_MOCK) {
      const userMock = await mockLoginRequest(email);
      setUser(userMock);
      return;
    }

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;
      Cookies.set("app-token", token, { expires: 7, path: "/" });
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(user);
    } catch (error) {
      // Logger.error("Erro ao fazer login com email", error);
      throw error;
    }
  };

  const logout = (singleSignOut = false) => {
    setUser(null);
    Cookies.remove("app-token", { path: "/" });
    delete api.defaults.headers.common["Authorization"];

    if (USE_AUTH_MOCK) {
      window.location.href = "/login";
      return;
    }

    if (singleSignOut) {
      window.location.href = `${
        import.meta.env.VITE_API_URL
      }/auth/microsoft/logout`;
    } else {
      window.location.href = "/login";
    }
  };

  const refreshUser = async () => {
    if (USE_AUTH_MOCK) return;

    try {
      const response = await api.get("/users/me");
      setUser(response.data);
    } catch (error) {
      // Logger.error("Fail to refresh user", error);
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        loginWithMicrosoft,
        loginWithEmail,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
