import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { getAddressSuggestions } from '@/utils/geocoding';
import { getCaliforniaAddressSuggestions } from '@/data/californiaAddresses';

interface AddressInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
}

const AddressInput: React.FC<AddressInputProps> = ({ value, onChange, placeholder, id }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (value.length >= 2) {
      setIsLoading(true);
      timeoutRef.current = setTimeout(async () => {
        try {
          // First try California-specific suggestions for faster response
          const californiaSuggestions = getCaliforniaAddressSuggestions(value);
          
          if (californiaSuggestions.length > 0) {
            setSuggestions(californiaSuggestions);
            setShowSuggestions(true);
            setIsLoading(false);
          } else {
            // Fallback to general suggestions
            const results = await getAddressSuggestions(value);
            setSuggestions(results);
            setShowSuggestions(true);
            setIsLoading(false);
          }
        } catch (error) {
          console.error('Error getting suggestions:', error);
          setSuggestions([]);
          setShowSuggestions(false);
          setIsLoading(false);
        }
      }, 150); // Reduced timeout for better UX
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsLoading(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value]);

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (suggestions.length > 0) {
            setShowSuggestions(true);
          }
        }}
        placeholder={placeholder || "Enter address in California..."}
        className="pr-10"
      />
      
      {isLoading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
        </div>
      )}

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none text-sm border-b border-gray-100 last:border-b-0 transition-colors"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="flex items-center gap-2">
                <span className="text-gray-400">📍</span>
                <span className="truncate">{suggestion}</span>
              </div>
            </button>
          ))}
          {suggestions.length === 10 && (
            <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50 border-t">
              Keep typing for more specific results
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddressInput;
