import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Shield, Users, AlertTriangle, ArrowLeft } from 'lucide-react';

const KnowYourRightsPage = () => {
  const { t } = useTranslation();

  const rightsInfo = [
    {
      icon: Shield,
      title: "Your Basic Rights",
      content: [
        "You have the right to remain silent",
        "You do not have to answer questions about immigration status",
        "You do not have to let ICE into your home without a warrant",
        "You have the right to speak with a lawyer"
      ]
    },
    {
      icon: AlertTriangle,
      title: "During an ICE Encounter",
      content: [
        "Stay calm and don't run",
        "Keep your hands visible",
        "Ask 'Am I free to leave?'",
        "Say 'I want to remain silent'",
        "Don't sign anything without a lawyer",
        "Remember officer details"
      ]
    },
    {
      icon: Phone,
      title: "Emergency Legal Contacts",
      content: [
        "National Immigration Legal Hotline: 1-855-435-7693",
        "ACLU Immigration Rights: 1-877-336-2700",
        "LA Immigration Services: 1-213-251-3800",
        "United We Dream: 1-844-363-1423"
      ]
    },
    {
      icon: Users,
      title: "Community Resources",
      content: [
        "CHIRLA (Coalition for Humane Immigrant Rights)",
        "CARECEN (Central American Resource Center)",
        "LA County Office of Immigrant Affairs",
        "Local community centers offer workshops"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50">
      {/* Mobile-optimized header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-4 z-10">
        <div className="flex items-center gap-3">
          <Link to="/">
            <Button variant="outline" size="sm" className="p-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            🛡️ <span>Know Your Rights</span>
          </h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="text-center mb-4">
          <p className="text-sm text-gray-600 leading-relaxed">
            Important information about your rights and available resources.
          </p>
        </div>

        {rightsInfo.map((section, index) => (
          <Card key={index} className="shadow-sm border-l-4 border-l-orange-500">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <section.icon className="h-5 w-5 text-orange-600 flex-shrink-0" />
                <span className="text-base">{section.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-2">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}

        {/* Emergency Card */}
        <Card className="bg-red-50 border-red-200 border-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg text-red-800">
              <AlertTriangle className="h-5 w-5" />
              <span className="text-base">Emergency Reminder</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <p className="text-red-700 font-medium text-sm">
                If you are being detained or arrested:
              </p>
              <ul className="space-y-1 text-red-700 text-sm">
                <li>• Contact emergency contacts immediately</li>
                <li>• Call a lawyer or legal aid organization</li>
                <li>• Document everything: time, place, officers</li>
                <li>• Do not resist, even if arrest seems unfair</li>
              </ul>
              <div className="mt-4 p-3 bg-red-100 rounded-lg">
                <p className="text-red-800 font-semibold text-center text-sm">
                  You have rights regardless of immigration status
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KnowYourRightsPage;
