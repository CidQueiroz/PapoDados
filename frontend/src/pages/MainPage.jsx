import React from 'react';
import { Button, Card } from '@cidqueiroz/cdkteck-ui';

const MainPage = () => {
  return (
    <div className="main-page-container" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center'
    }}>
      <Card className="max-w-2xl p-8" hoverEffect>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--cor-texto)' }}>
          Bem-vindo ao PapoDados!
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.8, color: 'var(--cor-texto)', marginBottom: '2rem' }}>
          Seu parceiro de BI com Inteligência Artificial.
        </p>
        
        <div className="dashboard-placeholder">
          <p style={{ color: 'var(--cor-texto)', marginBottom: '1.5rem' }}>
            Acesse suas análises e gráficos através do chat conversacional.
          </p>
          <Button variant="primary">Iniciar Chat de Dados</Button>
        </div>
      </Card>
    </div>
  );
};

export default MainPage;
