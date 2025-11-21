
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Clients } from './pages/Clients';
import { Campaigns } from './pages/Campaigns';
import { NewCampaign } from './pages/NewCampaign';
import { CampaignDetail } from './pages/CampaignDetail';
import { ImportPage } from './pages/ImportPage';
import { ChatwootEmbed } from './pages/ChatwootEmbed';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Onboarding } from './pages/Onboarding';
import { Settings } from './pages/Settings';
import { Profile } from './pages/Profile';
import { PageView } from './types';

const App: React.FC = () => {
  // Initial page changed to Login for demo flow
  const [currentPage, setCurrentPage] = useState<PageView>('login');

  // Simple routing check for demo purposes
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/chatwoot-embed') {
      setCurrentPage('chatwoot-embed');
    }
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login onNavigate={setCurrentPage} />;
      case 'register':
        return <Register onNavigate={setCurrentPage} />;
      case 'onboarding':
        return <Onboarding onNavigate={setCurrentPage} />;
      case 'dashboard':
        return <Dashboard />;
      case 'clients':
        return <Clients />;
      case 'campaigns':
        return <Campaigns onNavigate={setCurrentPage} />;
      case 'new-campaign':
        return <NewCampaign onNavigate={setCurrentPage} />;
      case 'campaign-detail':
        return <CampaignDetail onNavigate={setCurrentPage} />;
      case 'import':
        return <ImportPage />;
      case 'chatwoot-embed':
        return <ChatwootEmbed />;
      case 'settings':
        return <Settings />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  // Pages that don't need the Main Layout (Sidebar/Header)
  const isStandalonePage = 
    currentPage === 'chatwoot-embed' || 
    currentPage === 'login' || 
    currentPage === 'register' || 
    currentPage === 'onboarding';

  if (isStandalonePage) {
    return renderPage();
  }

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
};

export default App;
