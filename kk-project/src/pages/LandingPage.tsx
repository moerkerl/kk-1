import { useNavigate } from 'react-router-dom';
import { Shield, MessageCircle, Calculator, ArrowRight, CheckCircle, Users, Star } from 'lucide-react';
import Button from '../components/Button';
import Card, { CardContent } from '../components/Card';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen pt-16">
      {/* Hero Section */}
      <main className="flex-1">
        <section className="section-padding container-padding relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 -z-10" />
          <div className="max-w-7xl mx-auto text-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Finde deine ideale <span className="text-gradient">Krankenkasse</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Unser AI-Assistent hilft dir, die perfekte Krankenkassenkonfiguration 
                für deine Bedürfnisse in der Schweiz zu finden.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => navigate('/chat')}
                  leftIcon={<MessageCircle className="h-5 w-5" />}
                  rightIcon={<ArrowRight className="h-5 w-5" />}
                >
                  Kostenlose Beratung starten
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/offers')}
                >
                  Angebote ansehen
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-padding container-padding bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 animate-slide-up">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                So funktioniert's
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                In nur drei einfachen Schritten zu deiner optimalen Krankenversicherung
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: MessageCircle,
                  title: '1. Chat mit AI',
                  description: 'Beantworte einige Fragen zu deinen Bedürfnissen und Präferenzen',
                },
                {
                  icon: Calculator,
                  title: '2. Angebot erhalten',
                  description: 'Erhalte massgeschneiderte Angebote basierend auf deinen Angaben',
                },
                {
                  icon: Shield,
                  title: '3. Vergleichen & Wählen',
                  description: 'Vergleiche verschiedene Optionen und wähle die beste für dich',
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  variant="interactive"
                  className="text-center animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent>
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full mb-4">
                      <feature.icon className="h-8 w-8 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="section-padding container-padding bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-up">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  Warum KrankenkassenAssistent?
                </h2>
                <div className="space-y-4">
                  {[
                    'Personalisierte Empfehlungen basierend auf deinen Bedürfnissen',
                    'Unabhängiger Vergleich aller grossen Schweizer Krankenkassen',
                    'Kostenlose und unverbindliche Beratung',
                    'Datenschutz und Sicherheit garantiert',
                    'Expertenunterstützung bei Fragen',
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-secondary-600 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Button
                    size="lg"
                    onClick={() => navigate('/chat')}
                    rightIcon={<ArrowRight className="h-5 w-5" />}
                  >
                    Jetzt beraten lassen
                  </Button>
                </div>
              </div>
              <div className="relative animate-fade-in">
                <Card variant="elevated" padding="lg" className="relative z-10">
                  <CardContent className="text-center">
                    <div className="mb-4">
                      <Star className="h-12 w-12 text-yellow-500 mx-auto" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">98% Zufriedenheit</h3>
                    <p className="text-gray-600 mb-4">
                      Über 10.000 zufriedene Kunden vertrauen bereits auf unseren Service
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <Users className="h-5 w-5 text-gray-500" />
                      <span className="text-sm text-gray-500">10.000+ Beratungen</span>
                    </div>
                  </CardContent>
                </Card>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary-200 rounded-full blur-2xl opacity-50" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-200 rounded-full blur-2xl opacity-50" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 container-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-8 w-8 text-primary-400" />
                <span className="text-xl font-bold">KrankenkassenAssistent</span>
              </div>
              <p className="text-gray-400">
                Dein Partner für die perfekte Krankenversicherung in der Schweiz.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Service</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/chat" className="hover:text-white transition">Beratung</a></li>
                <li><a href="/offers" className="hover:text-white transition">Angebote</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Rechtliches</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Datenschutz</a></li>
                <li><a href="#" className="hover:text-white transition">Impressum</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kontakt</h4>
              <p className="text-gray-400">
                info@krankenkassenassistent.ch<br />
                +41 44 123 45 67
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 KrankenkassenAssistent. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}