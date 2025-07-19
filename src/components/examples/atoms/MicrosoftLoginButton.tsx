import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";

interface MicrosoftLoginButtonProps {
  className?: string;
}

export default function MicrosoftLoginButton({
  className,
}: MicrosoftLoginButtonProps) {
  const { loginWithMicrosoft } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleMicrosoftLogin = async () => {
    try {
      setIsLoading(true);
      await loginWithMicrosoft();
    } catch (error) {
      console.error("Erro no login Microsoft:", error);
      alert("Erro ao fazer login com Microsoft");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleMicrosoftLogin}
      disabled={isLoading}
      className={`microsoft-login-btn ${className || ""}`}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        padding: "12px 24px",
        backgroundColor: "#0078d4",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "600",
        ...(!isLoading ? {} : { opacity: 0.7, cursor: "not-allowed" }),
      }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M8.5 0H0v8.5h8.5V0z" fill="#f25022" />
        <path d="M18 0H9.5v8.5H18V0z" fill="#00a4ef" />
        <path d="M8.5 9.5H0V18h8.5V9.5z" fill="#ffb900" />
        <path d="M18 9.5H9.5V18H18V9.5z" fill="#7fba00" />
      </svg>
      {isLoading ? "Entrando..." : "Entrar com Microsoft"}
    </button>
  );
}
