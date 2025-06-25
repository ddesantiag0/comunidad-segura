import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useNavigate } from 'react-router-dom';
import { Phone, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { sendEmergencyNotifications } from '@/utils/notificationService';
import EmergencyContactDisplay from './EmergencyContactDisplay';

const EmergencyButton = () => {
  const { t } = useTranslation();
  const [isEmergencyDialogOpen, setIsEmergencyDialogOpen] = useState(false);
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false);
  const [emergencyContacts, setEmergencyContacts] = useState<Array<{name: string; phone: string; email?: string; relationship: string}>>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEmergencyTrigger = async () => {
    const contacts = JSON.parse(localStorage.getItem('emergencyContacts') || '[]');
    
    if (!contacts.length) {
      toast({
        title: "No Emergency Contacts",
        description: "Please set up your emergency contacts first.",
        variant: "destructive",
      });
      navigate('/settings');
      return;
    }

    // Send browser notifications and emergency emails
    const result = await sendEmergencyNotifications(contacts);

    const contactsWithEmail = contacts.filter((c: any) => c.email).length;
    const contactsWithPhone = result.phoneContacts.length;
    
    toast({
      title: "Emergency Alert Activated!",
      description: `${result.emailsSent}/${contactsWithEmail} emails sent. ${contactsWithPhone} phone contacts ready to call.`,
    });

    setEmergencyContacts(contacts);
    setShowEmergencyContacts(true);
    setIsEmergencyDialogOpen(false);
  };

  return (
    <>
      {/* Emergency Contact Display Overlay */}
      <EmergencyContactDisplay
        contacts={emergencyContacts}
        isVisible={showEmergencyContacts}
        onClose={() => setShowEmergencyContacts(false)}
      />

      {/* Floating buttons positioned to not block content - bottom left corner */}
      <div className="fixed bottom-3 left-3 z-50">
        <div className="flex flex-col gap-2">
          <Button
            onClick={() => navigate('/settings')}
            className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-full shadow-lg"
            size="icon"
          >
            <Settings className="h-4 w-4" />
          </Button>
          
          <AlertDialog open={isEmergencyDialogOpen} onOpenChange={setIsEmergencyDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-1 text-sm font-semibold">
                <Phone className="h-4 w-4" />
                SOS
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-md mx-4">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-center text-lg text-red-600">
                  🚨 Emergency Alert
                </AlertDialogTitle>
                <AlertDialogDescription className="text-center">
                  Are you sure you want to send an emergency alert? This will:
                  <br /><br />
                  • Show emergency contact phone numbers for immediate calling
                  <br />
                  • Send email alerts to contacts with email addresses
                  <br />
                  • Display a contact screen to help you reach help quickly
                  <br /><br />
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex flex-col gap-2 sm:flex-row">
                <AlertDialogCancel className="w-full sm:w-auto">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleEmergencyTrigger}
                  className="w-full sm:w-auto bg-red-500 hover:bg-red-600"
                >
                  Yes, Send Alert
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </>
  );
};

export default EmergencyButton;
