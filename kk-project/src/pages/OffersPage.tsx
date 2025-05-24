import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';

export default function OffersPage() {
  const navigate = useNavigate();

  const mockOffer = {
    grundversicherung: {
      anbieter: 'Helsana',
      modell: 'Hausarzt-Modell',
      franchise: 2500,
      praemie: 245.60
    },
    zusatzversicherungen: [
      {
        name: 'Completa',
        anbieter: 'Helsana',
        praemie: 51.20,
        leistungen: ['Brillen/Kontaktlinsen', 'Komplementärmedizin', 'Auslandschutz']
      }
    ],
    total: 296.80
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex items-center">
          <button
            onClick={() => navigate('/chat')}
            className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-semibold">Dein persönliches Angebot</h1>
        </div>
      </header>

      {/* Offer Details */}
      <main className="p-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Offer Card */}
          <div className="lg:col-span-2 space-y-6">
            {/* Grundversicherung */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">Grundversicherung</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Anbieter:</span>
                  <span className="font-semibold">{mockOffer.grundversicherung.anbieter}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Modell:</span>
                  <span className="font-semibold">{mockOffer.grundversicherung.modell}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Franchise:</span>
                  <span className="font-semibold">CHF {mockOffer.grundversicherung.franchise}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">Monatliche Prämie:</span>
                  <span className="font-bold text-primary-600">
                    CHF {mockOffer.grundversicherung.praemie.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Zusatzversicherungen */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">Zusatzversicherungen</h2>
              {mockOffer.zusatzversicherungen.map((zusatz, index) => (
                <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                  <h3 className="font-semibold text-lg mb-2">{zusatz.name}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Anbieter:</span>
                      <span>{zusatz.anbieter}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Prämie:</span>
                      <span className="font-semibold">CHF {zusatz.praemie.toFixed(2)}/Monat</span>
                    </div>
                    <div className="mt-3">
                      <span className="text-gray-600">Enthaltene Leistungen:</span>
                      <ul className="mt-1 space-y-1">
                        {zusatz.leistungen.map((leistung, i) => (
                          <li key={i} className="flex items-center text-sm">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            {leistung}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h3 className="text-xl font-bold mb-4">Zusammenfassung</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Grundversicherung:</span>
                  <span>CHF {mockOffer.grundversicherung.praemie.toFixed(2)}</span>
                </div>
                {mockOffer.zusatzversicherungen.map((zusatz, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{zusatz.name}:</span>
                    <span>CHF {zusatz.praemie.toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Total pro Monat:</span>
                  <span className="text-primary-600">CHF {mockOffer.total.toFixed(2)}</span>
                </div>
              </div>
              <button className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold">
                Angebot anpassen
              </button>
              <button className="w-full mt-3 border border-primary-600 text-primary-600 py-3 rounded-lg hover:bg-primary-50 transition-colors font-semibold">
                Weitere Angebote
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}