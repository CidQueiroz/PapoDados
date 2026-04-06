import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { Header, Footer, useTheme, CDKFavicon } from '@cidqueiroz/cdkteck-ui';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import Privacidade from './pages/Privacidade';
import Termos from './pages/Termos';
import '@cidqueiroz/cdkteck-ui/global.css';

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

function App() {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // Sincroniza o tema inicial com localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && savedTheme !== theme) {
      toggleTheme();
    }
  }, []);

  const handleThemeToggle = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', nextTheme);
    toggleTheme();
  };

  const ReactRouterLink = (props) => (
    <Link {...props} />
  );

  return (
    <div className="app-container bg-vitrine">
      <CDKFavicon />
      <Header 
        LinkComponent={ReactRouterLink}
        usePathname={() => location.pathname}
        onThemeToggle={handleThemeToggle}
      />
      <main className="flex-grow">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/privacidade" element={<Privacidade />} />
          <Route path="/termos" element={<Termos />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      <Footer 
        LinkComponent={ReactRouterLink}
      />
    </div>
  );
}

export default App;