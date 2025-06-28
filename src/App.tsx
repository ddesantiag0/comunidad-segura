import React, { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nextProvider } from 'react-i18next';
import i18n from './lib/i18n';
import { getStoredLanguage, saveLanguage } from './utils/languageStorage';
import NotificationPermissionPrompt from './components/NotificationPermissionPrompt';
import PrivacySettingsPrompt from './components/PrivacySettingsPrompt';
import Index from "./pages/Index";
import ReportPage from "./pages/ReportPage";
import MapPage from "./pages/MapPage";
import SettingsPage from "./pages/SettingsPage";
import KnowYourRightsPage from "./pages/KnowYourRightsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [notificationPermissionGranted, setNotificationPermissionGranted] = useState<boolean | null>(null);
  const [privacySettingsConfigured, setPrivacySettingsConfigured] = useState<boolean | null>(null);

  useEffect(() => {
    // Load saved language on app start
    const savedLanguage = getStoredLanguage();
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }

    // Listen for language changes and save them
    const handleLanguageChange = (lng: string) => {
      saveLanguage(lng);
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  const handleNotificationPermission = (granted: boolean) => {
    setNotificationPermissionGranted(granted);
    console.log('Notification permission:', granted ? 'granted' : 'denied');
  };

  const handlePrivacySettings = (settings: {
    pushNotifications: boolean;
    locationSharing: boolean;
    anonymousReporting: boolean;
  }) => {
    setPrivacySettingsConfigured(true);
    console.log('Privacy settings configured:', settings);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <NotificationPermissionPrompt onPermissionResponse={handleNotificationPermission} />
          <PrivacySettingsPrompt onSettingsComplete={handlePrivacySettings} />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/report" element={<ReportPage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/know-your-rights" element={<KnowYourRightsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
};

export default App;