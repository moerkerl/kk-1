import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Check, Shield, Phone, Star, TrendingDown } from 'lucide-react';
import { ChatFormData } from '../types/chat';
import { useEffect, useState } from 'react';

interface InsuranceOffer {
  provider: string;
  model: string;
  franchise: number;
  monthlyPremium: number;
  savings: number;
  rating: number;
  features: string[];
}

interface SupplementaryOffer {
  name: string;
  provider: string;
  monthlyPremium: number;
  coverage: string[];
}

export default function OffersPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData as ChatFormData;
  
  const [selectedOffer, setSelectedOffer] = useState<number>(0);
  const [selectedSupplementary, setSelectedSupplementary] = useState<number[]>([]);

  useEffect(() => {
    if (!formData) {
      navigate('/chat');
    }
  }, [formData, navigate]);

  if (!formData) {
    return null;
  }

  // Generate personalized offers based on collected data
  const generateOffers = (): InsuranceOffer[] => {
    const baseOffers: InsuranceOffer[] = [
      {
        provider: 'CSS',
        model: formData.doctorChoice === 'free' ? 'Standard' : 'myFlex Hausarzt',
        franchise: formData.age < 26 ? 1500 : 2500,
        monthlyPremium: 0,
        savings: 0,
        rating: 4.8,
        features: ['Beste Kundenzufriedenheit', 'Digitale Services', 'Schnelle Rückerstattung']
      },
      {
        provider: 'Helsana',
        model: formData.doctorChoice === 'free' ? 'BASIS' : 'BeneFit PLUS Hausarzt',
        franchise: formData.age < 26 ? 1500 : 2500,
        monthlyPremium: 0,
        savings: 0,
        rating: 4.6,
        features: ['Grösster Anbieter', 'Umfassende App', 'Bonusprogramm']
      },
      {
        provider: 'Swica',
        model: formData.doctorChoice === 'free' ? 'FAVORIT CASA' : 'FAVORIT MEDICA',
        franchise: formData.age < 26 ? 1000 : 2000,
        monthlyPremium: 0,
        savings: 0,
        rating: 4.7,
        features: ['Präventionsfokus', 'Gesundheitsförderung', 'Telemedizin inklusive']
      }
    ];

    // Calculate premiums based on age, canton, and model
    return baseOffers.map((offer, index) => {
      let basePremium = 320; // Base premium
      
      // Age adjustment
      if (formData.age < 19) basePremium *= 0.3;
      else if (formData.age < 26) basePremium *= 0.75;
      else if (formData.age > 65) basePremium *= 1.3;
      
      // Canton adjustment (simplified)
      const expensiveCantons = ['Genf', 'Basel-Stadt', 'Zürich'];
      if (expensiveCantons.includes(formData.canton)) {
        basePremium *= 1.2;
      }
      
      // Model discount
      if (offer.model.includes('Hausarzt')) basePremium *= 0.85;
      else if (offer.model.includes('HMO')) basePremium *= 0.75;
      else if (offer.model.includes('Telmed')) basePremium *= 0.8;
      
      // Franchise discount
      basePremium -= (offer.franchise / 100) * 2;
      
      // Accident insurance discount
      if (formData.hasAccidentInsuranceThroughEmployer) {
        basePremium *= 0.93;
      }
      
      // Add some variation
      basePremium += (index - 1) * 15;
      
      const currentPremium = formData.currentMonthlyPremium || basePremium * 1.1;
      const savings = Math.max(0, currentPremium - basePremium);
      
      return {
        ...offer,
        monthlyPremium: Math.round(basePremium * 100) / 100,
        savings: Math.round(savings * 12)
      };
    }).sort((a, b) => a.monthlyPremium - b.monthlyPremium);
  };

  const generateSupplementaryOffers = (): SupplementaryOffer[] => {
    const offers: SupplementaryOffer[] = [];
    
    if (formData.needsComplementaryMedicine) {
      offers.push({
        name: 'COMPLETA',
        provider: 'CSS',
        monthlyPremium: 42.50,
        coverage: ['Komplementärmedizin', 'Naturheilpraktiker', 'TCM', 'Homöopathie']
      });
    }
    
    if (formData.needsDentalCare) {
      offers.push({
        name: 'DENTA',
        provider: 'Helsana',
        monthlyPremium: 28.90,
        coverage: ['Zahnbehandlungen', 'Dentalhygiene', 'Kieferorthopädie für Kinder']
      });
    }
    
    if (formData.needsGlasses || formData.needsFitness || formData.needsAbroadCoverage) {
      offers.push({
        name: 'TOP',
        provider: 'Swica',
        monthlyPremium: 65.80,
        coverage: [
          ...(formData.needsGlasses ? ['Brillen und Kontaktlinsen'] : []),
          ...(formData.needsFitness ? ['Fitness-Abo', 'Prävention'] : []),
          ...(formData.needsAbroadCoverage ? ['Weltweiter Schutz'] : [])
        ]
      });
    }
    
    return offers;
  };

  const offers = generateOffers();
  const supplementaryOffers = generateSupplementaryOffers();
  const selectedPrimaryOffer = offers[selectedOffer];
  const selectedSupplementarySum = supplementaryOffers
    .filter((_, index) => selectedSupplementary.includes(index))
    .reduce((sum, offer) => sum + offer.monthlyPremium, 0);
  const totalMonthly = selectedPrimaryOffer.monthlyPremium + selectedSupplementarySum;

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
            {formData.age} Jahre • {formData.canton}
          </div>
        </div>
      </header>

      <main className="p-4 max-w-7xl mx-auto">
        {/* Savings Banner */}
        {selectedPrimaryOffer.savings > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingDown className="h-6 w-6 text-green-600" />
              <div>
                <p className="font-semibold text-green-900">
                  Sie können bis zu CHF {selectedPrimaryOffer.savings} pro Jahr sparen!
                </p>
                <p className="text-sm text-green-700">
                  Im Vergleich zu Ihrer aktuellen Versicherung
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Offers List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Insurance Offers */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Grundversicherung</h2>
              <div className="space-y-4">
                {offers.map((offer, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedOffer(index)}
                    className={`bg-white rounded-lg shadow-sm p-6 cursor-pointer transition-all ${
                      selectedOffer === index
                        ? 'ring-2 ring-primary-600 shadow-lg'
                        : 'hover:shadow-md'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          {offer.provider}
                          {index === 0 && (
                            <span className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full">
                              Empfohlen
                            </span>
                          )}
                        </h3>
                        <p className="text-gray-600">{offer.model}</p>
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
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{offer.rating}</span>
                        </div>
                      </div>
                      {offer.savings > 0 && (
                        <span className="text-green-600 font-semibold">
                          Sparen: CHF {offer.savings}/Jahr
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      {offer.features.map((feature, i) => (
                        <span
                          key={i}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Supplementary Insurance */}
            {supplementaryOffers.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Zusatzversicherungen</h2>
                <div className="space-y-4">
                  {supplementaryOffers.map((offer, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSelectedSupplementary(prev =>
                          prev.includes(index)
                            ? prev.filter(i => i !== index)
                            : [...prev, index]
                        );
                      }}
                      className={`bg-white rounded-lg shadow-sm p-6 cursor-pointer transition-all ${
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
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-20">
              <h3 className="text-xl font-bold mb-4">Ihre Auswahl</h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Grundversicherung</p>
                  <p className="font-semibold">{selectedPrimaryOffer.provider}</p>
                  <p className="text-sm text-gray-600">{selectedPrimaryOffer.model}</p>
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
                <button className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold flex items-center justify-center gap-2">
                  <Phone className="h-5 w-5" />
                  Beratung anfordern
                </button>
                <button className="w-full border border-primary-600 text-primary-600 py-3 rounded-lg hover:bg-primary-50 transition-colors font-semibold">
                  Angebot speichern
                </button>
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}