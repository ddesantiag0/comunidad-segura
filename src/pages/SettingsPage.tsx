import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { sendEmergencyNotifications } from '@/utils/notificationService';

interface Contact {
  name: string;
  phone: string;
  email?: string;
  relationship: string;
}

const SettingsPage = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [contacts, setContacts] = useState<Contact[]>([
    { name: '', phone: '', email: '', relationship: '' },
    { name: '', phone: '', email: '', relationship: '' },
    { name: '', phone: '', email: '', relationship: '' }
  ]);
  const [saved, setSaved] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [anonymousReporting, setAnonymousReporting] = useState(false);
  const [appLanguage, setAppLanguage] = useState(i18n.language);

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('emergencyContacts') || '[]');
    if (savedContacts.length > 0) {
      const updatedContacts = [...contacts];
      savedContacts.forEach((contact: Contact, index: number) => {
        if (index < 3) {
          updatedContacts[index] = contact;
        }
      });
      setContacts(updatedContacts);
    }

    // Load other settings
    const savedSettings = JSON.parse(localStorage.getItem('appSettings') || '{}');
    setPushNotifications(savedSettings.pushNotifications ?? true);
    setLocationSharing(savedSettings.locationSharing ?? true);
    setAnonymousReporting(savedSettings.anonymousReporting ?? false);
  }, []);

  const handleContactChange = (index: number, field: 'name' | 'phone' | 'email' | 'relationship', value: string) => {
    const updatedContacts = [...contacts];
    updatedContacts[index][field] = value;
    setContacts(updatedContacts);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validContacts = contacts.filter(contact => contact.name.trim() && (contact.phone.trim() || contact.email?.trim()));
    
    if (validContacts.length === 0) {
      toast({
        title: "No Valid Contacts",
        description: "Please add at least one contact with a name and phone number or email.",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem('emergencyContacts', JSON.stringify(validContacts));
    
    // Save other settings
    const settings = {
      pushNotifications,
      locationSharing,
      anonymousReporting
    };
    localStorage.setItem('appSettings', JSON.stringify(settings));
    
    // Test emergency alert
    try {
      const result = await sendEmergencyNotifications(validContacts);
      toast({
        title: "Test Emergency Alert Sent!",
        description: `Alert sent to ${validContacts.length} contacts. ${result.emailsSent} emails sent successfully.`,
      });
    } catch (error) {
      console.error('Emergency alert test failed:', error);
      toast({
        title: "Emergency Alert Test Failed",
        description: "There was an issue sending the test alert. Please check your contacts and try again.",
        variant: "destructive",
      });
    }
    
    setSaved(true);
    setTimeout(() => setSaved(false), 5000);
  };

  const handleLanguageChange = (lang: string) => {
    setAppLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem('preferred-language', lang);
  };

  const saveAllSettings = () => {
    const validContacts = contacts.filter(contact => contact.name.trim() && (contact.phone.trim() || contact.email?.trim()));
    localStorage.setItem('emergencyContacts', JSON.stringify(validContacts));
    
    const settings = {
      pushNotifications,
      locationSharing,
      anonymousReporting
    };
    localStorage.setItem('appSettings', JSON.stringify(settings));
    
    toast({
      title: "Settings Saved",
      description: `${validContacts.length} emergency contacts saved successfully.`,
    });
    
    setSaved(true);
    setTimeout(() => setSaved(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50 p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="inline-block mb-6">
          <Button variant="outline">
            {t('back')}
          </Button>
        </Link>

        <div className="space-y-6">
          {/* Emergency Contacts */}
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <h2 className="text-xl font-bold mb-4">Emergency Contacts</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {contacts.map((contact, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg bg-gray-50">
                  <h3 className="font-semibold text-lg">Contact {index + 1}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`name-${index}`} className="text-sm font-medium">Name *</Label>
                      <Input
                        id={`name-${index}`}
                        value={contact.name}
                        onChange={(e) => handleContactChange(index, 'name', e.target.value)}
                        placeholder="Full name"
                        className="w-full"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`phone-${index}`} className="text-sm font-medium">Phone Number</Label>
                      <Input
                        id={`phone-${index}`}
                        type="tel"
                        value={contact.phone}
                        onChange={(e) => handleContactChange(index, 'phone', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`email-${index}`} className="text-sm font-medium">Email Address *</Label>
                    <Input
                      id={`email-${index}`}
                      type="email"
                      value={contact.email || ''}
                      onChange={(e) => handleContactChange(index, 'email', e.target.value)}
                      placeholder="contact@example.com"
                      className="w-full"
                      required
                    />
                    <p className="text-xs text-gray-500">Email is required for emergency notifications</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`relationship-${index}`} className="text-sm font-medium">Relationship</Label>
                    <Input
                      id={`relationship-${index}`}
                      value={contact.relationship}
                      onChange={(e) => handleContactChange(index, 'relationship', e.target.value)}
                      placeholder="Family, Friend, Colleague, etc."
                      className="w-full"
                    />
                  </div>
                </div>
              ))}

              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 py-3 text-lg">
                Save & Test Emergency Alert
              </Button>
            </form>
          </div>

          {/* Email Configuration Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">📧 Email Notifications</h3>
            <p className="text-sm text-blue-700 mb-2">
              Emergency alerts will be sent via email from <strong>comunidadsegura25@gmail.com</strong>. 
              Make sure your emergency contacts check their email regularly and add this address to their contacts 
              to prevent emails from going to spam.
            </p>
            <p className="text-xs text-blue-600">
              <strong>Note:</strong> If you're not receiving test emails, check your spam folder and ensure the email addresses are correct.
            </p>
          </div>

          {/* Language Preferences */}
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <h2 className="text-xl font-bold mb-4">🌍 Language Preferences</h2>
            <p className="text-gray-600 mb-4 text-sm">Choose your preferred language for interface and emergency messages</p>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">App Language</Label>
              <Select value={appLanguage} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="zh">中文</SelectItem>
                  <SelectItem value="vi">Tiếng Việt</SelectItem>
                  <SelectItem value="tl">Tagalog</SelectItem>
                  <SelectItem value="ar">العربية</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Privacy & Safety */}
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <h2 className="text-xl font-bold mb-4">🔒 Privacy & Safety</h2>
            <p className="text-gray-600 mb-4 text-sm">Control how your information is shared and used for community safety</p>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Push Notifications</Label>
                  <p className="text-xs text-gray-500">Receive alerts about incidents in your area</p>
                </div>
                <Switch
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Location Sharing</Label>
                  <p className="text-xs text-gray-500">Share general location for community safety features</p>
                </div>
                <Switch
                  checked={locationSharing}
                  onCheckedChange={setLocationSharing}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Anonymous Reporting</Label>
                  <p className="text-xs text-gray-500">Submit reports without personal identification</p>
                </div>
                <Switch
                  checked={anonymousReporting}
                  onCheckedChange={setAnonymousReporting}
                />
              </div>
            </div>
          </div>

          {/* Know Your Rights */}
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <h2 className="text-xl font-bold mb-4">📋 Know Your Rights</h2>
            <p className="text-gray-600 mb-4 text-sm">Access important legal information and resources</p>
            
            <div className="space-y-3">
              <Link to="/know-your-rights">
                <Button variant="outline" className="w-full justify-start">
                  Immigration Rights Information
                </Button>
              </Link>
              <Link to="/know-your-rights">
                <Button variant="outline" className="w-full justify-start">
                  Emergency Legal Contacts
                </Button>
              </Link>
              <Link to="/know-your-rights">
                <Button variant="outline" className="w-full justify-start">
                  What to Do During an Encounter
                </Button>
              </Link>
              <Link to="/know-your-rights">
                <Button variant="outline" className="w-full justify-start">
                  Community Resources
                </Button>
              </Link>
            </div>
          </div>

          {/* Save All Settings */}
          <Button 
            onClick={saveAllSettings}
            className="w-full bg-blue-500 hover:bg-blue-600 py-4 text-lg font-semibold"
          >
            Save All Settings
          </Button>

          {saved && (
            <div className="text-center p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-600 font-semibold">
                ✅ Settings saved successfully!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
