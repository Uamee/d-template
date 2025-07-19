import { useState } from 'react';
import Header from '../../@d/components/organisms/Header';
import LayoutWithSidebar from '../../@d/components/templates/LayoutWithSidebar';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sidebarContent = (
    <div>
      <h3>Menu</h3>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '10px' }}>
            <a href="#" style={{ textDecoration: 'none', color: '#333' }}>
              Dashboard
            </a>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <a href="#" style={{ textDecoration: 'none', color: '#333' }}>
              Perfil
            </a>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <a href="#" style={{ textDecoration: 'none', color: '#333' }}>
              Configurações
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );

  return (
    <LayoutWithSidebar
      sidebarContent={sidebarContent}
      sidebarOpen={sidebarOpen}
      sidebarVariant="permanent"
      sidebarPosition="left"
      onSidebarClose={() => setSidebarOpen(false)}
    >
      <Header />
      <div style={{ padding: '40px' }}>
        <div style={{ marginBottom: '20px' }}>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {sidebarOpen ? 'Fechar' : 'Abrir'} Sidebar
          </button>
        </div>
        
        <h1>Bem-vindo à Home!</h1>
        <p>Você está logado com sucesso.</p>
        <p>Esta página tem uma sidebar {sidebarOpen ? 'aberta' : 'fechada'}.</p>
      </div>
    </LayoutWithSidebar>
  );
}