import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface CountryData {
  country: string;
  participants: number;
  flag: string;
}

const countryFlags: Record<string, string> = {
  'USA': '🇺🇸',
  'United States': '🇺🇸',
  'Germany': '🇩🇪',
  'UK': '🇬🇧',
  'United Kingdom': '🇬🇧',
  'Spain': '🇪🇸',
  'Canada': '🇨🇦',
  'France': '🇫🇷',
  'Italy': '🇮🇹',
  'Australia': '🇦🇺',
  'Netherlands': '🇳🇱',
  'Japan': '🇯🇵'
};

export default function CountriesChart() {
  const [countriesData, setCountriesData] = useState<CountryData[]>([]);
  const [animatedData, setAnimatedData] = useState<CountryData[]>([]);

  useEffect(() => {
    const fetchCountriesData = async () => {
      try {
        const { data, error } = await supabase
          .from('data_participants_tour')
          .select('pays, taille_du_groupe');

        if (error) throw error;

        if (data) {
          // Regrouper par pays et calculer le total
          const countryMap = new Map<string, number>();
          
          data.forEach(row => {
            if (row.pays && row.taille_du_groupe) {
              const country = row.pays.trim();
              countryMap.set(country, (countryMap.get(country) || 0) + row.taille_du_groupe);
            }
          });

          // Convertir en array et trier par nombre de participants
          const sortedCountries = Array.from(countryMap.entries())
            .map(([country, participants]) => ({
              country,
              participants,
              flag: countryFlags[country] || '🌍'
            }))
            .sort((a, b) => b.participants - a.participants)
            .slice(0, 5); // Top 5 pays

          setCountriesData(sortedCountries);
          setAnimatedData(sortedCountries.map(item => ({ ...item, participants: 0 })));
        }
      } catch (error) {
        console.error('Error fetching countries data:', error);
      }
    };

    fetchCountriesData();
  }, []);

  const maxParticipants = Math.max(...countriesData.map(item => item.participants));

  useEffect(() => {
    const animateBar = (index: number, targetValue: number) => {
      const duration = 1500;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = Math.floor(progress * targetValue);
        
        setAnimatedData(prev => 
          prev.map((item, i) => 
            i === index ? { ...item, participants: currentValue } : item
          )
        );
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    };

    countriesData.forEach((item, index) => {
      setTimeout(() => {
        animateBar(index, item.participants);
      }, index * 200);
    });
  }, [countriesData]);

  return (
    <div className="space-y-6">
      {animatedData.map((item, index) => (
        <div key={item.country} className="flex items-center space-x-4">
          <div className="flex items-center space-x-3 w-32">
            <span className="text-2xl">{item.flag}</span>
            <span className="font-medium text-gray-700">{item.country}</span>
          </div>
          
          <div className="flex-1 relative">
            <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: maxParticipants > 0 ? `${(item.participants / maxParticipants) * 100}%` : '0%'
                }}
              />
            </div>
            <span className="absolute right-0 top-0 mt-2 text-sm font-semibold text-gray-600">
              {item.participants}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
