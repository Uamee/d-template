import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../@d/auth/AuthContext";
import ProtectedRoute from "../@d/components/organisms/ProtectedRoute";
import Home from "../pages/example/Home";
import Login from "../pages/example/Login";

export default function AppRoutes() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}