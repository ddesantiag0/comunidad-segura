import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { collection, getDocs, query, orderBy, where, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import EmergencyButton from '@/components/EmergencyButton';
import LeafletMap from '@/components/LeafletMap';
import MapFilters from '@/components/MapFilters';
import ReportCard from '@/components/ReportCard';

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

const MapPage = () => {
  const [allReports, setAllReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isMapHidden, setIsMapHidden] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied');
        }
      );
    }
  }, []);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const q = query(collection(db, 'iceReports'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const reportsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Report[];
        
        setAllReports(reportsData);
        setFilteredReports(reportsData);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Filter reports based on time and type
  useEffect(() => {
    let filtered = [...allReports];

    // Time filter
    if (timeFilter !== 'all') {
      const now = new Date();
      let cutoffTime = new Date();

      switch (timeFilter) {
        case '1h':
          cutoffTime.setHours(now.getHours() - 1);
          break;
        case '24h':
          cutoffTime.setDate(now.getDate() - 1);
          break;
        case '7d':
          cutoffTime.setDate(now.getDate() - 7);
          break;
        case '30d':
          cutoffTime.setDate(now.getDate() - 30);
          break;
      }

      filtered = filtered.filter(report => {
        const reportTime = report.timestamp?.toDate ? report.timestamp.toDate() : new Date(report.timeSeen);
        return reportTime >= cutoffTime;
      });
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(report => report.type === typeFilter);
    }

    setFilteredReports(filtered);
  }, [allReports, timeFilter, typeFilter]);

  const handleReportClick = (report: Report) => {
    if (report.lat && report.lng) {
      // Scroll to map and center on report
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // You could also emit an event to center the map on this report
    }
  };

  const uniqueTypes = Array.from(new Set(allReports.map(report => report.type).filter(Boolean)));

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50 flex flex-col">
      {/* Compact header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              ← Back
            </Button>
          </Link>
          <h1 className="text-lg font-bold text-center flex-1">
            ICE Activity Map
          </h1>
          <div className="w-16"></div>
        </div>
      </div>

      {/* Main content area - flex-1 to fill remaining space */}
      <div className="flex-1 p-4 flex flex-col">
        <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
          <MapFilters
            onTimeFilterChange={setTimeFilter}
            onTypeFilterChange={setTypeFilter}
            onToggleQuickHide={() => setIsMapHidden(!isMapHidden)}
            isHidden={isMapHidden}
            reportTypes={uniqueTypes}
          />

          {!isMapHidden && (
            <div className="bg-white rounded-lg shadow-md p-3 mb-4">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500 mx-auto mb-2"></div>
                    <p>Loading reports...</p>
                  </div>
                </div>
              ) : (
                <LeafletMap reports={filteredReports} />
              )}
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md p-4 flex-1 flex flex-col">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
              <h2 className="font-semibold">
                Recent Reports ({filteredReports.length})
              </h2>
              {userLocation && (
                <p className="text-xs text-blue-600">Showing distances from your location</p>
              )}
            </div>
            
            {loading ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
              </div>
            ) : filteredReports.length === 0 ? (
              <p className="text-gray-500 text-center py-4 text-sm">
                {allReports.length === 0 ? 'No reports available' : 'No reports match your filters'}
              </p>
            ) : (
              <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 flex-1 overflow-y-auto max-h-64">
                {filteredReports.map((report) => (
                  <ReportCard
                    key={report.id}
                    report={report}
                    userLocation={userLocation}
                    onClick={() => handleReportClick(report)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <EmergencyButton />
    </div>
  );
};

export default MapPage;
