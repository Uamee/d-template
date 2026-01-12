import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./@d/auth/AuthContext";
import AppRoutes from "./routes";
import ThemeProvider from "./@d/theme/ThemeProvider";
import { LayoutProvider } from "./@d/hooks/LayoutContext";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LayoutProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </LayoutProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
