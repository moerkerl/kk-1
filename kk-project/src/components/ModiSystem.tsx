import { useState } from 'react';
import { Settings, X } from 'lucide-react';
import { useChat } from '../contexts/ChatContext';
import Modal from './Modal';
import Button from './Button';
import { ChatFormData } from '../types/chat';

interface TestProfile {
  name: string;
  data: Partial<ChatFormData>;
}

const testProfiles: TestProfile[] = [
  {
    name: 'Young Professional (Zürich)',
    data: {
      age: 28,
      canton: 'Zürich',
      currentProvider: 'CSS',
      currentMonthlyPremium: 380,
      hasAccidentInsuranceThroughEmployer: true,
      doctorChoice: 'family-doctor',
      chronicConditions: false,
      needsComplementaryMedicine: false,
      needsDentalCare: true,
      needsGlasses: true,
      needsFitness: true,
      needsAbroadCoverage: false
    }
  },
  {
    name: 'Family with Kids (Bern)',
    data: {
      age: 42,
      canton: 'Bern',
      currentProvider: 'Helsana',
      currentMonthlyPremium: 450,
      hasAccidentInsuranceThroughEmployer: true,
      doctorChoice: 'free',
      chronicConditions: false,
      needsComplementaryMedicine: true,
      needsDentalCare: true,
      needsGlasses: false,
      needsFitness: false,
      needsAbroadCoverage: true
    }
  },
  {
    name: 'Senior (Geneva)',
    data: {
      age: 68,
      canton: 'Genf',
      currentProvider: 'Assura',
      currentMonthlyPremium: 520,
      hasAccidentInsuranceThroughEmployer: false,
      doctorChoice: 'family-doctor',
      chronicConditions: true,
      needsComplementaryMedicine: true,
      needsDentalCare: false,
      needsGlasses: true,
      needsFitness: false,
      needsAbroadCoverage: false
    }
  },
  {
    name: 'Student (Basel)',
    data: {
      age: 22,
      canton: 'Basel-Stadt',
      currentProvider: 'Swica',
      currentMonthlyPremium: 250,
      hasAccidentInsuranceThroughEmployer: false,
      doctorChoice: 'hmo',
      chronicConditions: false,
      needsComplementaryMedicine: false,
      needsDentalCare: false,
      needsGlasses: false,
      needsFitness: true,
      needsAbroadCoverage: false
    }
  }
];

export default function ModiSystem() {
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const { resetChat } = useChat();

  const applyTestProfile = (profile: TestProfile) => {
    // Reset chat first
    resetChat();
    
    // Apply test data - ChatContext will handle the rest
    const mockEvent = new CustomEvent('apply-test-data', { 
      detail: profile.data 
    });
    window.dispatchEvent(mockEvent);
    
    setIsOpen(false);
  };

  if (!showButton) return null;

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-all hover:scale-110 z-50"
        title="Modi System"
      >
        <Settings className="h-6 w-6" />
      </button>

      {/* Modi Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Modi System - Test Profiles"
      >
        <div className="space-y-6">
          <p className="text-gray-600">
            Wählen Sie ein Testprofil aus, um verschiedene Szenarien zu testen:
          </p>

          <div className="space-y-3">
            {testProfiles.map((profile, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 hover:border-primary-500 hover:bg-primary-50 transition-all cursor-pointer"
                onClick={() => applyTestProfile(profile)}
              >
                <h3 className="font-semibold mb-2">{profile.name}</h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <div>Alter: {profile.data.age} Jahre</div>
                  <div>Kanton: {profile.data.canton}</div>
                  <div>Aktuell: CHF {profile.data.currentMonthlyPremium}/Mt.</div>
                  <div>Modell: {profile.data.doctorChoice}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-3">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => {
                resetChat();
                setIsOpen(false);
              }}
            >
              Chat zurücksetzen
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-red-600 hover:text-red-700"
              onClick={() => {
                setShowButton(false);
                setIsOpen(false);
              }}
            >
              Modi System ausblenden
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}