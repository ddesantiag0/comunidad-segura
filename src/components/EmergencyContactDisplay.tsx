import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, Mail, X } from 'lucide-react';

interface Contact {
  name: string;
  phone: string;
  email?: string;
  relationship: string;
}

interface EmergencyContactDisplayProps {
  contacts: Contact[];
  isVisible: boolean;
  onClose: () => void;
}

const EmergencyContactDisplay = ({ contacts, isVisible, onClose }: EmergencyContactDisplayProps) => {
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePhoneCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="fixed inset-0 bg-red-900/95 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="bg-red-500 text-white p-4 rounded-t-lg flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">🚨 Emergency Active</h2>
            <p className="text-sm opacity-90">Time elapsed: {formatTime(timeElapsed)}</p>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="text-white hover:bg-red-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-4">
          <p className="text-gray-700 mb-4 text-sm">
            Emergency alert sent! Contact your emergency contacts immediately:
          </p>
          
          <div className="space-y-3">
            {contacts.map((contact, index) => (
              <div key={index} className="border rounded-lg p-3 bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                    {contact.relationship && (
                      <p className="text-xs text-gray-500">{contact.relationship}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {contact.phone && (
                    <Button
                      onClick={() => handlePhoneCall(contact.phone)}
                      className="flex-1 bg-green-500 hover:bg-green-600"
                      size="sm"
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Call {contact.phone}
                    </Button>
                  )}
                  
                  {contact.email && (
                    <Button
                      onClick={() => handleEmail(contact.email!)}
                      variant="outline"
                      size="sm"
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700">
              💡 <strong>Tip:</strong> Tap phone numbers to call directly. Emails have been sent automatically to contacts with email addresses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContactDisplay;
