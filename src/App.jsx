import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import { AppDataProvider, useAppData } from "./context/AppDataContext";
import { AuthProvider } from "./context/AuthContext";
import BrowsePage from "./pages/BrowsePage";
import LoginPage from "./pages/LoginPage";
import MyListPage from "./pages/MyListPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilesPage from "./pages/ProfilesPage";
import SearchPage from "./pages/SearchPage";

function AppRoutes() {
  const { activeProfile, loadingData } = useAppData();
  const location = useLocation();

  if (loadingData) {
    return <div className="fullscreen-loader">Loading your catalog...</div>;
  }

  if (!activeProfile && location.pathname !== "/profiles") {
    return <Navigate to="/profiles" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<BrowsePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/my-list" element={<MyListPage />} />
      <Route path="/profiles" element={<ProfilesPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <AppDataProvider>
                  <AppRoutes />
                </AppDataProvider>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
