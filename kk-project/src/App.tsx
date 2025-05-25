import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import OffersPage from './pages/OffersPage';
import Header from './components/Header';
import { ChatProvider } from './contexts/ChatContext';
import ModiSystem from './components/ModiSystem';

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
