import { Navigate, Route, Routes } from "react-router-dom";
import AdminDashboardPage from "../modules/example/admin/AdminDashboardPage";
import LoginPage from "../modules/example/auth/LoginPage";
import HomePage from "../modules/example/home/HomePage";
import MainLayout from "../@d/components/layouts/MainLayout";
import ProtectedRoute from "../@d/components/organisms/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
