import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import AddressInput from '@/components/AddressInput';
import DateTimePicker from '@/components/DateTimePicker';
import { geocodeAddress } from '@/utils/geocoding';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const ReportPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    type: '',
    timeSeen: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Geocode the address to get coordinates
      let lat, lng;
      if (formData.location) {
        const geocodeResult = await geocodeAddress(formData.location);
        if (geocodeResult) {
          lat = geocodeResult.lat;
          lng = geocodeResult.lng;
        }
      }

      await addDoc(collection(db, 'iceReports'), {
        ...formData,
        lat,
        lng,
        timestamp: serverTimestamp()
      });
      
      toast({
        title: "Report Submitted",
        description: "Your report has been submitted successfully and will help keep the community safe.",
      });
      
      setSubmitted(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error submitting report:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50 flex items-center justify-center p-3">
        <div className="bg-white rounded-2xl shadow-xl p-5 text-center max-w-sm w-full">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-green-600 mb-2">
            {t('thankYou')}
          </h2>
          <p className="text-gray-600 text-sm">Your report helps keep our community safe</p>
          <div className="mt-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-500 mx-auto"></div>
            <p className="text-xs text-gray-500 mt-1">Redirecting...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-b from-orange-50 to-red-50 flex flex-col overflow-hidden">
      {/* Compact header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200 p-3 flex-shrink-0">
        <div className="flex items-center gap-3 max-w-md mx-auto">
          <Link to="/">
            <Button variant="outline" size="sm" className="p-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-lg font-bold text-gray-900">
            {t('reportTitle')}
          </h1>
        </div>
      </div>

      {/* Main content - flex-1 to fill remaining space with scroll */}
      <div className="flex-1 p-3 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-xl p-4 max-w-md mx-auto">
          <div className="text-center mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl">🚨</span>
            </div>
            <p className="text-gray-600 text-sm">
              Help keep our community safe by reporting ICE activity
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <Label htmlFor="location" className="font-semibold mb-1 block text-sm">{t('location')}</Label>
              <AddressInput
                id="location"
                value={formData.location}
                onChange={(value) => setFormData(prev => ({ ...prev, location: value }))}
                placeholder="Example: 123 Main St, Los Angeles, CA"
              />
            </div>

            <div>
              <Label htmlFor="type" className="font-semibold mb-1 block text-sm">{t('activityType')}</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                required
              >
                <SelectTrigger className="h-10">
                  <SelectValue placeholder={t('selectOne')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Patrulla" className="py-2">{t('patrol')}</SelectItem>
                  <SelectItem value="Checkpoint" className="py-2">{t('checkpoint')}</SelectItem>
                  <SelectItem value="Raid" className="py-2">{t('raid')}</SelectItem>
                  <SelectItem value="Other" className="py-2">{t('other')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="timeSeen" className="font-semibold mb-1 block text-sm">{t('timeSeen')}</Label>
              <DateTimePicker
                id="timeSeen"
                value={formData.timeSeen}
                onChange={(value) => setFormData(prev => ({ ...prev, timeSeen: value }))}
              />
            </div>

            <div>
              <Label htmlFor="notes" className="font-semibold mb-1 block text-sm">{t('notes')}</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Describe what you saw..."
                rows={2}
                className="resize-none text-sm"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-red-500 hover:bg-red-600 h-10 font-bold rounded-xl mt-4"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Submitting...
                </div>
              ) : (
                t('submit')
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
