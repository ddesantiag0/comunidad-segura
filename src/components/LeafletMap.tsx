import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { calculateDistance, formatDistance } from '@/utils/distance';
import { formatTimeAgo } from '@/utils/timeFormat';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

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

interface LeafletMapProps {
  reports: Report[];
}

const LeafletMap: React.FC<LeafletMapProps> = ({ reports }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markersLayer = useRef<L.LayerGroup | null>(null);
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
          console.log('Location access denied or unavailable');
        }
      );
    }
  }, []);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    map.current = L.map(mapContainer.current).setView([34.0522, -118.2437], 10);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map.current);

    // Initialize markers layer
    markersLayer.current = L.layerGroup().addTo(map.current);

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update markers when reports change
  useEffect(() => {
    if (!map.current || !markersLayer.current) return;

    // Clear existing markers
    markersLayer.current.clearLayers();

    if (reports.length === 0) return;

    const validReports = reports.filter(report => report.lat && report.lng);
    
    if (validReports.length === 0) return;

    // Create marker cluster group (simple implementation)
    const markers: L.Marker[] = [];
    
    validReports.forEach((report) => {
      if (report.lat && report.lng) {
        // Create custom icon based on report type
        const iconColor = report.type?.toLowerCase().includes('raid') ? '#dc2626' : '#ef4444';
        
        const customIcon = L.divIcon({
          html: `<div style="background-color: ${iconColor}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
          className: 'custom-marker',
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });

        const marker = L.marker([report.lat, report.lng], { icon: customIcon });
        
        // Calculate distance if user location is available
        let distanceText = '';
        if (userLocation) {
          const distance = calculateDistance(
            userLocation.lat, 
            userLocation.lng, 
            report.lat, 
            report.lng
          );
          distanceText = `<p class="text-xs text-blue-600 font-medium">${formatDistance(distance)}</p>`;
        }

        const popupContent = `
          <div class="p-3 min-w-64">
            <h3 class="font-bold text-red-600 text-base mb-2">🚨 ${report.type || 'ICE Activity'}</h3>
            ${report.location ? `<p class="text-sm mb-1"><strong>📍 Location:</strong> ${report.location}</p>` : ''}
            ${report.timeSeen ? `<p class="text-sm mb-1"><strong>🕒 Time:</strong> ${report.timeSeen}</p>` : ''}
            <p class="text-xs text-gray-500 mb-2">${formatTimeAgo(report.timestamp || report.timeSeen)}</p>
            ${distanceText}
            ${report.notes ? `<p class="text-sm mt-2 p-2 bg-gray-50 rounded"><strong>Notes:</strong> ${report.notes}</p>` : ''}
          </div>
        `;
        
        marker.bindPopup(popupContent, {
          maxWidth: 300,
          className: 'custom-popup'
        });
        
        markers.push(marker);
        markersLayer.current.addLayer(marker);
      }
    });

    // Fit map to show all markers with padding
    if (markers.length > 0) {
      const group = new L.featureGroup(markers);
      map.current.fitBounds(group.getBounds().pad(0.1));
    }

    // Add user location marker if available
    if (userLocation) {
      const userIcon = L.divIcon({
        html: `<div style="background-color: #3b82f6; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        className: 'user-location-marker',
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });

      const userMarker = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon });
      userMarker.bindPopup('<div class="p-2"><strong>📍 Your Location</strong></div>');
      markersLayer.current.addLayer(userMarker);
    }

  }, [reports, userLocation]);

  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
      <div ref={mapContainer} className="absolute inset-0" />
      {reports.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
          <p className="text-gray-600">No reports to display</p>
        </div>
      )}
    </div>
  );
};

export default LeafletMap;
