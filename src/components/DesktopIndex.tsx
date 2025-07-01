import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LiveAlerts from '@/components/LiveAlerts';
import { Phone, Users, ExternalLink } from 'lucide-react';

const DesktopIndex = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="py-12 px-8 text-center">
        <img 
          src= {`${import.meta.env.BASE_URL}logo-image/logo.png`} 
          alt="Comunidad Segura Logo" 
          className="w-20 h-20 mx-auto mb-6"
        />
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          {t('title')}
        </h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          {t('description')}
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 pb-16">
        {/* Primary Action - Full Width */}
        <div className="mb-8">
          <Link to="/report" className="block">
            <Button className="w-full bg-red-500 hover:bg-red-600 text-white py-8 text-2xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              📢 {t('Report ICE Activity')}
            </Button>
          </Link>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <Link to="/map" className="block">
            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-8 text-xl font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              🗺️ {t('View Safety Map')}
            </Button>
          </Link>
          <Link to="/know-your-rights" className="block">
            <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-8 text-xl font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              ⚖️ {t('Know Your Rights')}
            </Button>
          </Link>
        </div>

        {/* Bottom Section - Two Columns */}
        <div className="grid grid-cols-2 gap-8">
          {/* Live Alerts */}
          <div>
            <LiveAlerts />
          </div>

          {/* Emergency Help */}
          <div>
            <Sheet>
              <SheetTrigger asChild>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-8 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3">
                  <Phone className="h-8 w-8" />
                  <span>{t('Get Help Now')}</span>
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
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/95 border-t border-gray-200 py-8">
        <div className="px-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img 
              src={`${import.meta.env.BASE_URL}logo-image/logo.png`} 
              alt="Comunidad Segura Logo" 
              className="h-8 w-8"
            />
            <h3 className="text-2xl font-extrabold text-gray-900">{t('title')}</h3>
          </div>
          <div className="flex justify-center gap-8 text-lg mb-3">
            <Link to="/map" className="text-gray-600 hover:text-blue-700 transition-colors">
              Safety Map
            </Link>
            <Link to="/report" className="text-gray-600 hover:text-blue-700 transition-colors">
              Report
            </Link>
            <Link to="/settings" className="text-gray-600 hover:text-blue-700 transition-colors">
              Settings
            </Link>
          </div>
          <p className="text-base text-gray-500 text-center">
            © 2025 Comunidad Segura
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DesktopIndex;
