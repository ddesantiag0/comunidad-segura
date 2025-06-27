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
        title: "⚠️ No Emergency Contacts Set Up",
        description: "You need to set up emergency contacts first. Redirecting you to Settings...",
        variant: "destructive",
      });
      
      // Show a more detailed alert dialog
      setIsEmergencyDialogOpen(false);
      
      setTimeout(() => {
        toast({
          title: "📋 Set Up Emergency Contacts",
          description: "Go to Settings to add emergency contacts with names, phone numbers, and email addresses for alerts.",
        });
        navigate('/settings');
      }, 1000);
      
      return;
    }

    // Validate that contacts have required information
    const validContacts = contacts.filter((c: any) => c.name && (c.phone || c.email));
    if (validContacts.length === 0) {
      toast({
        title: "⚠️ Incomplete Emergency Contacts",
        description: "Your emergency contacts are missing required information. Please update them in Settings.",
        variant: "destructive",
      });
      navigate('/settings');
      return;
    }

    try {
      // Send browser notifications and emergency emails
      const result = await sendEmergencyNotifications(validContacts);

      const contactsWithEmail = validContacts.filter((c: any) => c.email).length;
      const contactsWithPhone = result.phoneContacts.length;
      
      toast({
        title: "🚨 Emergency Alert Activated!",
        description: `Alert sent to ${validContacts.length} contacts. ${result.emailsSent}/${contactsWithEmail} emails sent. ${contactsWithPhone} phone contacts ready to call.`,
      });

      setEmergencyContacts(validContacts);
      setShowEmergencyContacts(true);
      setIsEmergencyDialogOpen(false);
    } catch (error) {
      console.error('Emergency alert failed:', error);
      toast({
        title: "❌ Emergency Alert Failed",
        description: "There was an issue sending your emergency alert. Please try again or call 911 directly.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <EmergencyContactDisplay
        contacts={emergencyContacts}
        isVisible={showEmergencyContacts}
        onClose={() => setShowEmergencyContacts(false)}
      />

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
                  <strong>Make sure you have set up your emergency contacts in Settings first.</strong>
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
