import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Report {
  id: string;
  location: string;
  type: string;
  notes: string;
  timeSeen: string;
  lat?: number;
  lng?: number;
}

interface MapboxMapProps {
  reports: Report[];
}

const MapboxMap: React.FC<MapboxMapProps> = ({ reports }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [tokenEntered, setTokenEntered] = useState(false);

  const initializeMap = async () => {
    if (!mapContainer.current || !mapboxToken) return;

    try {
      const mapboxgl = await import('mapbox-gl');
      await import('mapbox-gl/dist/mapbox-gl.css');

      (mapboxgl.default as any).accessToken = mapboxToken;
      
      map.current = new (mapboxgl.default as any).Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-118.2437, 34.0522], // Los Angeles coordinates
        zoom: 10,
      });

      // Add navigation controls
      map.current.addControl(
        new (mapboxgl.default as any).NavigationControl(),
        'top-right'
      );

      // Add markers for reports
      reports.forEach((report, index) => {
        const lat = report.lat || (34.0522 + (Math.random() - 0.5) * 0.1);
        const lng = report.lng || (-118.2437 + (Math.random() - 0.5) * 0.1);

        // Create a popup
        const popup = new (mapboxgl.default as any).Popup({ offset: 25 }).setHTML(`
          <div class="p-2">
            <h3 class="font-bold text-red-600">🚨 ${report.type || 'ICE Activity'}</h3>
            ${report.location ? `<p class="text-sm"><strong>Location:</strong> ${report.location}</p>` : ''}
            ${report.timeSeen ? `<p class="text-sm"><strong>Time:</strong> ${report.timeSeen}</p>` : ''}
            ${report.notes ? `<p class="text-sm"><strong>Notes:</strong> ${report.notes}</p>` : ''}
          </div>
        `);

        // Create a marker
        new (mapboxgl.default as any).Marker({ color: '#ef4444' })
          .setLngLat([lng, lat])
          .setPopup(popup)
          .addTo(map.current);
      });

    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setTokenEntered(true);
      initializeMap();
    }
  };

  if (!tokenEntered) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Enter Mapbox Token</h3>
        <p className="text-sm text-gray-600 mb-4 text-center max-w-md">
          To display the interactive map, please enter your Mapbox public token. 
          You can get one from <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">mapbox.com</a>
        </p>
        <div className="flex gap-2 w-full max-w-md">
          <Input
            type="text"
            placeholder="Enter your Mapbox public token"
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleTokenSubmit}>Load Map</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default MapboxMap;
