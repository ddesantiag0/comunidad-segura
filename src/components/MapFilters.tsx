import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

interface MapFiltersProps {
  onTimeFilterChange: (filter: string) => void;
  onTypeFilterChange: (filter: string) => void;
  onToggleQuickHide: () => void;
  isHidden: boolean;
  reportTypes: string[];
}

const MapFilters: React.FC<MapFiltersProps> = ({
  onTimeFilterChange,
  onTypeFilterChange,
  onToggleQuickHide,
  isHidden,
  reportTypes
}) => {
  const { t } = useTranslation();

  // All possible report types (not just from existing reports)
  const allReportTypes = ['patrol', 'checkpoint', 'raid', 'other'];

  // Map report types to translations
  const getTranslatedType = (type: string) => {
    switch (type.toLowerCase()) {
      case 'patrol':
        return t('patrol');
      case 'checkpoint':
        return t('checkpoint');
      case 'raid':
        return t('raid');
      case 'other':
        return t('other');
      default:
        return type;
    }
  };

  return (
    <Card className="mb-3">
      <CardContent className="p-3">
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <Select onValueChange={onTimeFilterChange}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder={t('timeFilter')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allTime')}</SelectItem>
                <SelectItem value="1h">{t('lastHour')}</SelectItem>
                <SelectItem value="24h">{t('last24Hours')}</SelectItem>
                <SelectItem value="7d">{t('last7Days')}</SelectItem>
                <SelectItem value="30d">{t('last30Days')}</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={onTypeFilterChange}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder={t('typeFilter')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allTypes')}</SelectItem>
                {allReportTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {getTranslatedType(type)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={onToggleQuickHide}
            variant={isHidden ? "destructive" : "outline"}
            size="sm"
            className="w-full"
          >
            {isHidden ? t('showMap') : t('quickHide')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapFilters;
