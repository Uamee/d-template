import {
  Box,
  Button,
  Card,
  TextField,
  Typography,
  useTheme,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../../@d/auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { loginWithEmail } = useAuth();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await loginWithEmail({ email, password });

      navigate("/home");
    } catch (err) {
      setError("Falha no login. Verifique suas credenciais.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #001e45 100%)`,
        p: 2,
      }}
    >
      <Card
        elevation={10}
        sx={{
          maxWidth: 400,
          width: "100%",
          p: 4,
          borderRadius: 4,
          textAlign: "center",
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Box
            sx={{
              width: 60,
              height: 60,
              bgcolor: "primary.main",
              borderRadius: "50%",
              mx: "auto",
              mb: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
            }}
          >
            M
          </Box>
          <Typography variant="h5" fontWeight="bold" color="primary">
            Bem-vindo de volta
          </Typography>
        </Box>

        <form onSubmit={handleLogin}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="E-mail Corporativo"
            variant="outlined"
            margin="normal"
            disabled={loading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
          <TextField
            fullWidth
            label="Senha"
            type="password"
            variant="outlined"
            margin="normal"
            disabled={loading}
            sx={{ mb: 3 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            type="submit"
            disabled={loading}
            sx={{
              height: 48,
              borderRadius: 2,
              boxShadow: "none",
              fontWeight: "bold",
            }}
          >
            {loading ? "Entrando..." : "Entrar na Plataforma"}
          </Button>

          <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 1 }}>
            <Button size="small" sx={{ textTransform: "none" }}>
              Esqueci minha senha
            </Button>
            <Button
              size="small"
              variant="outlined"
              sx={{ textTransform: "none" }}
            >
              Entrar com Microsoft
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
}
