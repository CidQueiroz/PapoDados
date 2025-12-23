// PapoDados/frontend/src/App.jsx
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { Header, Footer } from '@cidqueiroz/cdkteck-ui';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

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

  useEffect(() => {
    document.body.classList.add('logged-in'); // Keep the background always on for this app
    
    // Optional: return a cleanup function to remove the class if the App unmounts
    return () => {
        document.body.classList.remove('logged-in');
    };
  }, []); // Empty dependency array means this runs only once on mount

  const ReactRouterLink = (props) => (
    <Link {...props} />
  );

  return (
    <div className="app-container">
      <Header 
        LinkComponent={ReactRouterLink}
        usePathname={() => location.pathname}
      />
      <main className="flex-grow">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
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