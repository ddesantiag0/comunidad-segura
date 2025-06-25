import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, BellOff, X } from 'lucide-react';

interface NotificationPermissionPromptProps {
  onPermissionResponse: (granted: boolean) => void;
}

const NotificationPermissionPrompt: React.FC<NotificationPermissionPromptProps> = ({
  onPermissionResponse
}) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if we've already asked for permission
    const hasAskedForPermission = localStorage.getItem('notification-permission-asked');
    const notificationSupported = 'Notification' in window;
    
    if (!hasAskedForPermission && notificationSupported && Notification.permission === 'default') {
      // Show prompt after a short delay (like app store apps)
      const timer = setTimeout(() => {
        setShow(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAllow = async () => {
    try {
      const permission = await Notification.requestPermission();
      const granted = permission === 'granted';
      
      localStorage.setItem('notification-permission-asked', 'true');
      localStorage.setItem('notifications-enabled', granted.toString());
      
      onPermissionResponse(granted);
      setShow(false);
      
      if (granted) {
        // Show a test notification
        new Notification('Comunidad Segura', {
          body: 'You will now receive safety alerts for your community',
          icon: '/favicon.ico'
        });
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      onPermissionResponse(false);
      setShow(false);
    }
  };

  const handleDeny = () => {
    localStorage.setItem('notification-permission-asked', 'true');
    localStorage.setItem('notifications-enabled', 'false');
    onPermissionResponse(false);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <Bell className="h-16 w-16 text-orange-500 mx-auto mb-4" />
              <CardTitle className="text-xl font-bold">
                Stay Safe with Alerts
              </CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDeny}
              className="p-1 h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            "Comunidad Segura" would like to send you notifications about ICE activity and safety alerts in your area.
          </p>
          
          <div className="space-y-3 pt-4">
            <Button 
              onClick={handleAllow}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3"
            >
              <Bell className="h-4 w-4 mr-2" />
              Allow Notifications
            </Button>
            
            <Button 
              onClick={handleDeny}
              variant="outline" 
              className="w-full py-3"
            >
              <BellOff className="h-4 w-4 mr-2" />
              Don't Allow
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 mt-4">
            You can change this in your browser settings later
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationPermissionPrompt;
