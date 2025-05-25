import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Shield, Phone, Star, TrendingDown } from 'lucide-react';
import { useChat } from '../contexts/ChatContext';
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';

interface SupplementaryOffer {
  name: string;
  provider: string;
  monthlyPremium: number;
  coverage: string[];
}

export default function OffersPage() {
  const navigate = useNavigate();
  const { generatedOffers, collectedData } = useChat();
  
  const [selectedOffer, setSelectedOffer] = useState<number>(0);
  const [selectedSupplementary, setSelectedSupplementary] = useState<number[]>([]);

  useEffect(() => {
    if (!generatedOffers || generatedOffers.length === 0) {
      navigate('/chat');
    }
  }, [generatedOffers, navigate]);

  if (!generatedOffers || generatedOffers.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  // Generate supplementary offers based on collected data
  const generateSupplementaryOffers = (): SupplementaryOffer[] => {
    const offers: SupplementaryOffer[] = [];
    
    if (collectedData.needsComplementaryMedicine) {
      offers.push({
        name: 'COMPLETA',
        provider: 'CSS',
        monthlyPremium: 42.50,
        coverage: ['Komplementärmedizin', 'Naturheilpraktiker', 'TCM', 'Homöopathie']
      });
    }
    
    if (collectedData.needsDentalCare) {
      offers.push({
        name: 'DENTA',
        provider: 'Helsana',
        monthlyPremium: 28.90,
        coverage: ['Zahnbehandlungen', 'Dentalhygiene', 'Kieferorthopädie für Kinder']
      });
    }
    
    if (collectedData.needsGlasses || collectedData.needsFitness || collectedData.needsAbroadCoverage) {
      offers.push({
        name: 'TOP',
        provider: 'Swica',
        monthlyPremium: 65.80,
        coverage: [
          ...(collectedData.needsGlasses ? ['Brillen und Kontaktlinsen'] : []),
          ...(collectedData.needsFitness ? ['Fitness-Abo', 'Prävention'] : []),
          ...(collectedData.needsAbroadCoverage ? ['Weltweiter Schutz'] : [])
        ]
      });
    }
    
    return offers;
  };

  const supplementaryOffers = generateSupplementaryOffers();
  const selectedPrimaryOffer = generatedOffers[selectedOffer];
  const selectedSupplementarySum = supplementaryOffers
    .filter((_, index) => selectedSupplementary.includes(index))
    .reduce((sum, offer) => sum + offer.monthlyPremium, 0);
  const totalMonthly = selectedPrimaryOffer.monthlyPremium + selectedSupplementarySum;
  
  // Calculate annual savings
  const currentPremium = collectedData.currentMonthlyPremium || selectedPrimaryOffer.monthlyPremium * 1.1;
  const annualSavings = Math.max(0, (currentPremium - selectedPrimaryOffer.monthlyPremium) * 12);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/chat')}
              className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-semibold">Ihre personalisierten Angebote</h1>
          </div>
          <div className="text-sm text-gray-600">
            {collectedData.age} Jahre • {collectedData.canton}
          </div>
        </div>
      </header>

      <main className="p-4 max-w-7xl mx-auto">
        {/* Savings Banner */}
        {annualSavings > 0 && (
          <Card className="bg-green-50 border-green-200 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingDown className="h-6 w-6 text-green-600" />
                <div>
                  <p className="font-semibold text-green-900">
                    Sie können bis zu CHF {Math.round(annualSavings)} pro Jahr sparen!
                  </p>
                  <p className="text-sm text-green-700">
                    Im Vergleich zu Ihrer aktuellen Versicherung
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Offers List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Insurance Offers */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Grundversicherung</h2>
              <div className="space-y-4">
                {generatedOffers.map((offer, index) => (
                  <Card
                    key={offer.id}
                    onClick={() => setSelectedOffer(index)}
                    className={`cursor-pointer transition-all ${
                      selectedOffer === index
                        ? 'ring-2 ring-primary-600 shadow-lg'
                        : 'hover:shadow-md'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          {offer.providerName}
                          {offer.isRecommended && (
                            <span className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full">
                              Empfohlen
                            </span>
                          )}
                        </h3>
                        <p className="text-gray-600">{offer.insuranceModel}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary-600">
                          CHF {offer.monthlyPremium.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600">pro Monat</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="text-gray-600">
                          Franchise: CHF {offer.franchise}
                        </span>
                        {offer.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span>{offer.rating}</span>
                          </div>
                        )}
                      </div>
                      {offer.annualSavings > 0 && (
                        <span className="text-green-600 font-semibold">
                          Sparen: CHF {offer.annualSavings}/Jahr
                        </span>
                      )}
                    </div>
                    
                    {offer.keyFeatures && offer.keyFeatures.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {offer.keyFeatures.map((feature, i) => (
                          <span
                            key={i}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>

            {/* Supplementary Insurance */}
            {supplementaryOffers.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Zusatzversicherungen</h2>
                <div className="space-y-4">
                  {supplementaryOffers.map((offer, index) => (
                    <Card
                      key={index}
                      onClick={() => {
                        setSelectedSupplementary(prev =>
                          prev.includes(index)
                            ? prev.filter(i => i !== index)
                            : [...prev, index]
                        );
                      }}
                      className={`cursor-pointer transition-all ${
                        selectedSupplementary.includes(index)
                          ? 'ring-2 ring-primary-600 shadow-lg'
                          : 'hover:shadow-md'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">{offer.name}</h3>
                          <p className="text-gray-600 text-sm">{offer.provider}</p>
                          <ul className="mt-3 space-y-1">
                            {offer.coverage.map((item, i) => (
                              <li key={i} className="flex items-center text-sm text-gray-700">
                                <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-xl font-bold text-primary-600">
                            CHF {offer.monthlyPremium.toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-600">pro Monat</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20 shadow-lg">
              <h3 className="text-xl font-bold mb-4">Ihre Auswahl</h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Grundversicherung</p>
                  <p className="font-semibold">{selectedPrimaryOffer.providerName}</p>
                  <p className="text-sm text-gray-600">{selectedPrimaryOffer.insuranceModel}</p>
                  <p className="text-primary-600 font-semibold">
                    CHF {selectedPrimaryOffer.monthlyPremium.toFixed(2)}/Mt.
                  </p>
                </div>
                
                {selectedSupplementary.length > 0 && (
                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600 mb-2">Zusatzversicherungen</p>
                    {supplementaryOffers
                      .filter((_, index) => selectedSupplementary.includes(index))
                      .map((offer, i) => (
                        <div key={i} className="mb-2">
                          <p className="font-semibold text-sm">{offer.name}</p>
                          <p className="text-primary-600 text-sm">
                            CHF {offer.monthlyPremium.toFixed(2)}/Mt.
                          </p>
                        </div>
                      ))}
                  </div>
                )}
              </div>
              
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total pro Monat:</span>
                  <span className="text-2xl font-bold text-primary-600">
                    CHF {totalMonthly.toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  CHF {(totalMonthly * 12).toFixed(2)} pro Jahr
                </p>
              </div>
              
              <div className="space-y-3">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-full"
                  onClick={() => {/* TODO: Implement contact form */}}
                >
                  <Phone className="h-5 w-5" />
                  Beratung anfordern
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full"
                  onClick={() => {/* TODO: Implement save functionality */}}
                >
                  Angebot speichern
                </Button>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-blue-900">
                      Wechsel-Service inklusive
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      Wir kümmern uns um alle Formalitäten für Sie
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}