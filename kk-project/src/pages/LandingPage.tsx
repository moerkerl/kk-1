import { useNavigate } from 'react-router-dom';
import { Shield, MessageCircle, Calculator } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <main className="flex-1">
        <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Finde deine ideale Krankenkasse
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Unser AI-Assistent hilft dir, die perfekte Krankenkassenkonfiguration 
              für deine Bedürfnisse in der Schweiz zu finden.
            </p>
            <button
              onClick={() => navigate('/chat')}
              className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Jetzt starten
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              So funktioniert's
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                  <MessageCircle className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">1. Chat mit AI</h3>
                <p className="text-gray-600">
                  Beantworte einige Fragen zu deinen Bedürfnissen und Präferenzen
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                  <Calculator className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">2. Angebot erhalten</h3>
                <p className="text-gray-600">
                  Erhalte massgeschneiderte Angebote basierend auf deinen Angaben
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                  <Shield className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">3. Vergleichen & Wählen</h3>
                <p className="text-gray-600">
                  Vergleiche verschiedene Optionen und wähle die beste für dich
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <p>&copy; 2024 KrankenkassenAssistent. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </div>
  );
}