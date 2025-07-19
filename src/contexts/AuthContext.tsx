import { PublicClientApplication, type AccountInfo } from "@azure/msal-browser";
import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { loginRequest, msalConfig } from "../config/msalConfig";

interface User {
  id: string;
  email: string;
  name: string;
  provider?: "local" | "microsoft";
}

interface AuthContextData {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithMicrosoft: () => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  msalInstance: PublicClientApplication;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const msalInstance = new PublicClientApplication(msalConfig);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeMsal();
  }, []);

  const initializeMsal = async () => {
    try {
      await msalInstance.initialize();

      const accounts = msalInstance.getAllAccounts();
      if (accounts.length > 0) {
        msalInstance.setActiveAccount(accounts[0]);
        await handleMicrosoftAccount(accounts[0]);
      } else {
        checkLocalAuth();
      }
    } catch (error) {
      console.error("Erro ao inicializar MSAL:", error);
      checkLocalAuth();
    }
  };

  const checkLocalAuth = () => {
    const storedToken = localStorage.getItem("@app:token");
    const storedUser = localStorage.getItem("@app:user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }

    setIsLoading(false);
  };

  const handleMicrosoftAccount = async (account: AccountInfo) => {
    try {
      const response = await msalInstance.acquireTokenSilent({
        ...loginRequest,
        account: account,
      });

      const userResponse = await axios.get(
        "https://graph.microsoft.com/v1.0/me",
        {
          headers: {
            Authorization: `Bearer ${response.accessToken}`,
          },
        }
      );

      const microsoftUser = userResponse.data;

      const userData: User = {
        id: microsoftUser.id,
        email: microsoftUser.mail || microsoftUser.userPrincipalName,
        name: microsoftUser.displayName,
        provider: "microsoft",
      };

      // TODO: criar/validar o usuário no backend
      // const backendResponse = await axios.post('/api/auth/microsoft', {
      //   microsoftToken: response.accessToken,
      //   userData,
      // });

      // TODO: remover esse backendToken simulado
      const backendToken = `backend_token_${response.accessToken.substring(
        0,
        20
      )}`;

      localStorage.setItem("@app:token", backendToken);
      localStorage.setItem("@app:user", JSON.stringify(userData));

      setToken(backendToken);
      setUser(userData);
      axios.defaults.headers.common["Authorization"] = `Bearer ${backendToken}`;
    } catch (error) {
      console.error("Erro ao processar conta Microsoft:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });

      const { token: authToken, user: userData } = response.data;

      localStorage.setItem("@app:token", authToken);
      localStorage.setItem(
        "@app:user",
        JSON.stringify({
          ...userData,
          provider: "local",
        })
      );

      axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;

      setToken(authToken);
      setUser({ ...userData, provider: "local" });
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithMicrosoft = async () => {
    try {
      setIsLoading(true);

      const response = await msalInstance.loginPopup(loginRequest);

      if (response.account) {
        msalInstance.setActiveAccount(response.account);
        await handleMicrosoftAccount(response.account);
      }
    } catch (error) {
      console.error("Erro no login Microsoft:", error);
      throw new Error("Erro ao fazer login com Microsoft");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    localStorage.removeItem("@app:token");
    localStorage.removeItem("@app:user");

    delete axios.defaults.headers.common["Authorization"];

    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      await msalInstance.logoutPopup({
        account: accounts[0],
      });
    }

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        loginWithMicrosoft,
        logout,
        isAuthenticated: !!token,
        msalInstance,
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
