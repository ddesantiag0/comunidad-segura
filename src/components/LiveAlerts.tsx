import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { formatTimeAgo } from '@/utils/timeFormat';

interface Alert {
  id: string;
  type: string;
  location: string;
  timestamp: any;
  notes: string;
}

const LiveAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'iceReports'),
      orderBy('timestamp', 'desc'),
      limit(2) // Further reduced for mobile
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const alertsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Alert[];
      
      setAlerts(alertsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-3">
      <h2 className="text-base font-bold mb-2 text-center flex items-center justify-center gap-2">
        🚨 <span>Live ICE Alerts</span>
      </h2>
      
      {loading ? (
        <div className="flex justify-center py-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
        </div>
      ) : alerts.length === 0 ? (
        <p className="text-center text-gray-600 py-2 text-xs">No recent alerts</p>
      ) : (
        <div className="space-y-2 max-h-20 overflow-y-auto">
          {alerts.map((alert) => (
            <div key={alert.id} className="border-l-3 border-red-500 pl-2 py-1 bg-gray-50 rounded-r-lg">
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1 min-w-0">
                  <span className="font-semibold text-red-600 text-xs">📍 {alert.type || 'ICE Activity'}</span>
                  {alert.location && (
                    <p className="text-xs text-gray-600 truncate">{alert.location}</p>
                  )}
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {formatTimeAgo(alert.timestamp)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LiveAlerts;
