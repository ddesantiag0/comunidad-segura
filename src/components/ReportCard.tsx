import React from 'react';
import { formatTimeAgo } from '@/utils/timeFormat';
import { calculateDistance, formatDistance } from '@/utils/distance';

interface Report {
  id: string;
  location: string;
  type: string;
  notes: string;
  timeSeen: string;
  timestamp?: any;
  lat?: number;
  lng?: number;
}

interface ReportCardProps {
  report: Report;
  userLocation?: { lat: number; lng: number } | null;
  onClick?: () => void;
}

const ReportCard: React.FC<ReportCardProps> = ({ report, userLocation, onClick }) => {
  const getDistanceText = () => {
    if (!userLocation || !report.lat || !report.lng) return null;
    
    const distance = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      report.lat,
      report.lng
    );
    
    return formatDistance(distance);
  };

  const distanceText = getDistanceText();

  return (
    <div 
      className={`border-l-4 border-red-500 pl-4 py-3 bg-gray-50 rounded-r-lg hover:bg-gray-100 transition-colors ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-red-600 text-sm sm:text-base">
            🚨 {report.type || 'ICE Activity'}
          </div>
          
          {report.location && (
            <div className="text-xs sm:text-sm text-gray-600 mt-1 truncate">
              📍 {report.location}
            </div>
          )}
          
          <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500">
            <span>🕒 {formatTimeAgo(report.timestamp || report.timeSeen)}</span>
            {distanceText && (
              <>
                <span>•</span>
                <span className="text-blue-600 font-medium">{distanceText}</span>
              </>
            )}
          </div>
          
          {report.notes && (
            <div className="text-xs sm:text-sm text-gray-700 mt-2 break-words line-clamp-2">
              {report.notes}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-1 text-xs text-gray-400 flex-shrink-0">
          <span>Tap to locate</span>
          <span>📍</span>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
