import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function WorldMap() {
  const [participantsByCountry, setParticipantsByCountry] = useState<Record<string, number>>({});
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorldData = async () => {
      try {
        const { data, error } = await supabase
          .from('data_participants_tour')
          .select('pays, taille_du_groupe');

        if (error) throw error;

        if (data) {
          const countryMap: Record<string, number> = {};
          
          data.forEach(row => {
            if (row.pays && row.taille_du_groupe) {
              const country = row.pays.trim();
              countryMap[country] = (countryMap[country] || 0) + row.taille_du_groupe;
            }
          });

          setParticipantsByCountry(countryMap);
        }
      } catch (error) {
        console.error('Error fetching world data:', error);
      }
    };

    fetchWorldData();
  }, []);

  const getCountryColor = (participants: number) => {
    if (participants >= 100) return '#1e40af';
    if (participants >= 50) return '#3b82f6';
    if (participants >= 25) return '#60a5fa';
    return '#93c5fd';
  };

  return (
    <div className="relative">
      <div className="text-center mb-6">
        <p className="text-gray-600 mb-4">
          Interactive world map showing participant distribution
        </p>
        <div className="flex justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-900 rounded"></div>
            <span>100+ participants</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-600 rounded"></div>
            <span>50-99 participants</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-400 rounded"></div>
            <span>25-49 participants</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-200 rounded"></div>
            <span>1-24 participants</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-8 min-h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🗺️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Global Participation
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl">
            {Object.entries(participantsByCountry)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 12)
              .map(([country, count]) => (
              <div
                key={country}
                className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                style={{ backgroundColor: count > 0 ? getCountryColor(count) + '20' : '#f9fafb' }}
                onMouseEnter={() => setHoveredCountry(country)}
                onMouseLeave={() => setHoveredCountry(null)}
              >
                <div className="text-lg font-semibold text-gray-800">
                  {country}
                </div>
                <div className="text-sm text-gray-600">
                  {count} participants
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-6">
            Data sourced from Supabase database
          </p>
        </div>
      </div>

      {hoveredCountry && participantsByCountry[hoveredCountry] && (
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3">
          <div className="font-semibold">{hoveredCountry}</div>
          <div className="text-sm text-gray-600">
            {participantsByCountry[hoveredCountry]} participants
          </div>
        </div>
      )}
    </div>
  );
}
