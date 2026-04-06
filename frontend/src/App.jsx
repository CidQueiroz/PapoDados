// PapoDados/frontend/src/App.jsx
import React from 'react';
import { Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { Header, Footer } from '@cidqueiroz/cdkteck-ui';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import Privacidade from './pages/Privacidade';
import Termos from './pages/Termos';

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



  const ReactRouterLink = (props) => (
    <Link {...props} />
  );

  return (
    <div className="app-container bg-vitrine">
      <Header 
        LinkComponent={ReactRouterLink}
        usePathname={() => location.pathname}
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