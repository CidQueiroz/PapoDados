import React from 'react';

const MainPage = () => {
  return (
    <div className="main-page-container" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      color: 'var(--cor-texto)'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
        Bem-vindo ao PapoDados!
      </h1>
      <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
        Seu parceiro de BI com Inteligência Artificial.
      </p>
      
      <div className="dashboard-placeholder" style={{ marginTop: '2rem' }}>
        <p>Acesse suas análises e gráficos através do chat conversacional.</p>
      </div>
    </div>
  );
};

export default MainPage;
