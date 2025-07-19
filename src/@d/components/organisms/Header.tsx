import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header
      style={{
        padding: "10px 20px",
        borderBottom: "1px solid #ddd",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <nav>
        <Link to="/" style={{ marginRight: "20px" }}>
          Home
        </Link>
      </nav>

      <div>
        {isAuthenticated ? (
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <span>
              Olá, {user?.name}
              {user?.provider === "microsoft" && (
                <span style={{ fontSize: "12px", color: "#0078d4" }}>
                  {" "}
                  (Microsoft)
                </span>
              )}
            </span>
            <Link to="/dashboard">Dashboard</Link>
            <button
              onClick={logout}
              style={{
                padding: "5px 10px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Sair
            </button>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </header>
  );
}
