import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Shield, Bell, MapPin, UserX } from 'lucide-react';

interface PrivacySettingsPromptProps {
  onSettingsComplete: (settings: {
    pushNotifications: boolean;
    locationSharing: boolean;
    anonymousReporting: boolean;
  }) => void;
}

const PrivacySettingsPrompt: React.FC<PrivacySettingsPromptProps> = ({
  onSettingsComplete
}) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [anonymousReporting, setAnonymousReporting] = useState(false);

  useEffect(() => {
    // Check if privacy settings have been configured before
    const hasConfiguredPrivacy = localStorage.getItem('privacy-settings-configured');
    
    if (!hasConfiguredPrivacy) {
      // Show prompt after a short delay
      const timer = setTimeout(() => {
        setShow(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSaveSettings = () => {
    const settings = {
      pushNotifications,
      locationSharing,
      anonymousReporting
    };

    // Save to localStorage
    localStorage.setItem('appSettings', JSON.stringify(settings));
    localStorage.setItem('privacy-settings-configured', 'true');
    
    onSettingsComplete(settings);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center pb-4">
          <Shield className="h-16 w-16 text-orange-500 mx-auto mb-4" />
          <CardTitle className="text-xl font-bold">
            🔒 Privacy & Safety
          </CardTitle>
          <p className="text-gray-600 text-sm">
            Control how your information is shared and used for community safety
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="h-5 w-5 text-orange-500" />
              <div>
                <Label className="text-sm font-medium">Push Notifications</Label>
                <p className="text-xs text-gray-500">Receive alerts about incidents in your area</p>
              </div>
            </div>
            <Switch
              checked={pushNotifications}
              onCheckedChange={setPushNotifications}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-orange-500" />
              <div>
                <Label className="text-sm font-medium">Location Sharing</Label>
                <p className="text-xs text-gray-500">Share general location for community safety features</p>
              </div>
            </div>
            <Switch
              checked={locationSharing}
              onCheckedChange={setLocationSharing}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <UserX className="h-5 w-5 text-orange-500" />
              <div>
                <Label className="text-sm font-medium">Anonymous Reporting</Label>
                <p className="text-xs text-gray-500">Submit reports without personal identification</p>
              </div>
            </div>
            <Switch
              checked={anonymousReporting}
              onCheckedChange={setAnonymousReporting}
            />
          </div>
          
          <div className="pt-4">
            <Button 
              onClick={handleSaveSettings}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3"
            >
              Save Privacy Settings
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 text-center">
            You can change these settings anytime in the Settings page
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacySettingsPrompt;