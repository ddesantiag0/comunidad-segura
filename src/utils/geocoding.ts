export interface GeocodingResult {
  lat: number;
  lng: number;
  display_name: string;
}

export const geocodeAddress = async (address: string): Promise<GeocodingResult | null> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1&countrycodes=us`
    );
    const data = await response.json();
    
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
        display_name: data[0].display_name
      };
    }
    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
};

export const getAddressSuggestions = async (query: string): Promise<string[]> => {
  if (query.length < 3) return [];
  
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1&countrycodes=us`
    );
    const data = await response.json();
    
    return data.map((item: any) => item.display_name);
  } catch (error) {
    console.error('Address suggestions error:', error);
    return [];
  }
};
