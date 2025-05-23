import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import PrivateLayout from "./layouts/PrivateLayout";
import AdminLayout from "./layouts/AdminLayout";
import { MainLayout } from "./layouts/MainLayout";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import ListPage from "./pages/ListPage";
import LoginPage from "./pages/LoginPage";
import StatisticsPage from "./pages/StatisticsPage";
import UserFormPage from "./pages/UserFormPage";
import UserPage from "./pages/UserPage";

const AppRouter = () => (
  <Router>
    <Routes>
      {/* Route publique */}
      <Route path="/login" element={<LoginPage />} />

      {/* Routes privées */}
      <Route element={<PrivateLayout />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/users" element={<ListPage />} />
          <Route path="/admin/users/statistics" element={<StatisticsPage />} />
          <Route path="/admin/user/:userId" element={<UserPage />} />
        </Route>

        {/* Routes nécessitant un accès administrateur */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/user/create" element={<UserFormPage />} />
          <Route path="/admin/user/edit/:userId" element={<UserFormPage />} />
        </Route>
      </Route>

      {/* Redirection si route inconnue */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Router>
);

export default AppRouter;
