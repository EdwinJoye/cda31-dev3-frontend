import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { AuthProvider } from "./context/auth/AuthProvider";
// import PrivateLayout from "./layouts/PrivateLayout";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ListPage from "./pages/ListPage";
import { MainLayout } from "./layouts/MainLayout";
import UserFormPage from "./pages/UserFormPage";

const AppRouter = () => (
  <AuthProvider>
    <Router>
      <Routes>
        {/* Route publique */}
        <Route path="/login" element={<LoginPage />} />

        {/* Routes privées */}
        {/* <Route element={<PrivateLayout />}> */}
        <Route>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/user/:userId" element={<UserPage />} />
            <Route path="/admin/users" element={<ListPage />} />
            <Route path="/admin/user/create" element={<UserFormPage />} />
            <Route path="/admin/user/edit/:userId" element={<UserFormPage />} />
          </Route>
        </Route>

        {/* Redirection si route inconnue */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default AppRouter;
