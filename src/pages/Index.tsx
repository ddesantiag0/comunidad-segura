import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import EmergencyButton from '@/components/EmergencyButton';
import LiveAlerts from '@/components/LiveAlerts';
import DesktopIndex from '@/components/DesktopIndex';
import { Phone, Users, ExternalLink } from 'lucide-react';

const Index = () => {
  const { t } = useTranslation();

  const volunteerOrganizations = [
    {
      name: "International Rescue Committee (IRC)",
      description: "Provides comprehensive services to refugees and immigrants",
      phone: "1-213-386-6700",
      website: "https://www.rescue.org/los-angeles"
    },
    {
      name: "Coalition for Humane Immigrant Rights (CHIRLA)",
      description: "Advocates for immigrant rights and provides legal services",
      phone: "1-213-201-8900",
      website: "https://chirla.org"
    },
    {
      name: "Interfaith Refugee and Immigration Service (IRIS)",
      description: "Faith-based organization supporting immigrants and refugees",
      phone: "1-203-336-0141",
      website: "https://irisct.org"
    },
    {
      name: "International Institute of Los Angeles (IILA)",
      description: "Provides immigration services and community support",
      phone: "1-213-385-7800",
      website: "https://internationalinstitutela.org"
    }
  ];

  return (
    <>
      {/* Desktop Version */}
      <div className="hidden lg:block">
        <DesktopIndex />
        <EmergencyButton />
      </div>

      {/* Mobile/Tablet Version */}
      <div className="lg:hidden h-screen bg-gradient-to-b from-orange-50 to-red-50 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 text-center">
          <img 
            src="/logo-image/logo.png" 
            alt="Comunidad Segura Logo" 
            className="w-12 h-12 mx-auto mb-2"
          />
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            {t('title')}
          </h1>
          <p className="text-xs text-gray-700 px-4 leading-tight">
            {t('description')}
          </p>
        </div>

        {/* Main content area */}
        <div className="flex-1 px-4 space-y-4 min-h-0">
          <div className="space-y-4">
            {/* Primary action - Report ICE Activity */}
            <Link to="/report" className="block">
              <Button className="w-full bg-red-500 hover:bg-red-600 text-white py-4 text-base font-semibold rounded-xl shadow-lg">
                📢 Report ICE Activity
              </Button>
            </Link>
            
            {/* Secondary actions */}
            <div className="space-y-3">
              <Link to="/map" className="block">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 text-base font-semibold rounded-xl shadow-lg">
                  🗺️ View Safety Map
                </Button>
              </Link>
              <Link to="/know-your-rights" className="block">
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-4 text-base font-semibold rounded-xl shadow-lg">
                  ⚖️ Know Your Rights
                </Button>
              </Link>
            </div>

            {/* Get Help Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 text-base font-semibold rounded-xl shadow-lg flex items-center justify-center gap-2">
                  <Phone className="h-5 w-5" />
                  <span>Get Help Now</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2 text-xl">
                    <Phone className="h-6 w-6 text-red-500" />
                    Emergency Help
                  </SheetTitle>
                  <SheetDescription className="text-base">
                    Choose an option below to get immediate help
                  </SheetDescription>
                </SheetHeader>
                
                <div className="space-y-4 mt-6">
                  {/* Emergency Contacts */}
                  <Card className="border-red-200 bg-red-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-red-800 flex items-center gap-2 text-lg">
                        <Phone className="h-5 w-5" />
                        Emergency Contacts
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button 
                        className="w-full bg-red-600 hover:bg-red-700 py-3 text-lg"
                        onClick={() => window.location.href = 'tel:911'}
                      >
                        📞 Call 911
                      </Button>
                      <Button 
                        variant="outline"
                        className="w-full py-3 text-lg"
                        onClick={() => {
                          const contacts = JSON.parse(localStorage.getItem('emergencyContacts') || '[]');
                          if (contacts.length > 0) {
                            window.location.href = `tel:${contacts[0].phone}`;
                          } else {
                            alert('No emergency contacts set. Please add them in Settings.');
                          }
                        }}
                      >
                        📱 Call My Emergency Contact
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Volunteer Organizations */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Users className="h-5 w-5 text-blue-500" />
                        Legal Help Organizations
                      </CardTitle>
                      <CardDescription className="text-sm">
                        Organizations that can provide support and assistance
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {volunteerOrganizations.map((org, index) => (
                        <div key={index} className="border rounded-lg p-3 space-y-2">
                          <h4 className="font-semibold text-sm">{org.name}</h4>
                          <p className="text-xs text-gray-600 leading-relaxed">{org.description}</p>
                          <div className="flex flex-col gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full py-2"
                              onClick={() => window.location.href = `tel:${org.phone}`}
                            >
                              📞 {org.phone}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full py-2"
                              onClick={() => window.open(org.website, '_blank')}
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Visit Website
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </SheetContent>
            </Sheet>

            {/* Live Alerts */}
            <div className="py-1">
              <LiveAlerts />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-auto">
          <div className="px-4 py-2 lg:px-8 lg:max-w-6xl lg:mx-auto">
            <div className="flex items-center justify-center gap-2 mb-1 lg:mb-3">
              <img 
                src="/logo-image/logo.png" 
                alt="Comunidad Segura Logo" 
                className="h-4 w-4 lg:h-6 lg:w-6"
              />
              <h3 className="text-sm font-bold text-gray-900 lg:text-lg lg:font-extrabold">{t('title')}</h3>
            </div>
            <div className="flex justify-center gap-4 text-xs mb-1 lg:gap-8 lg:text-sm lg:mb-2">
              <Link to="/map" className="text-gray-600 hover:text-blue-600 lg:hover:text-blue-700 lg:transition-colors">
                Safety Map
              </Link>
              <Link to="/report" className="text-gray-600 hover:text-blue-600 lg:hover:text-blue-700 lg:transition-colors">
                Report
              </Link>
              <Link to="/settings" className="text-gray-600 hover:text-blue-600 lg:hover:text-blue-700 lg:transition-colors">
                Settings
              </Link>
            </div>
            <p className="text-xs text-gray-600 text-center lg:text-sm lg:text-gray-500">
              © 2025 Comunidad Segura
            </p>
          </div>
        </footer>
        
        <EmergencyButton />
      </div>
    </>
  );
};

export default Index;
