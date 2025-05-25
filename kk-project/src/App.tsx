import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import OffersPage from './pages/OffersPage';
import Header from './components/Header';
import { AppProvider } from './contexts/AppContext';
import { ChatProvider } from './contexts/ChatContext';
import ModiSystem from './components/ModiSystem';

function App() {
  return (
    <Router>
      <AppProvider>
        <ChatProvider>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/offers" element={<OffersPage />} />
            </Routes>
            <ModiSystem />
          </div>
        </ChatProvider>
      </AppProvider>
    </Router>
  );
}

export default App;
