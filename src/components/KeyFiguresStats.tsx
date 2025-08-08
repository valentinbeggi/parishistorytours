import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

type StatColor = 'blue' | 'green' | 'purple' | 'orange';

type Stat = {
  id: string;
  label: string;
  value: number;
  suffix: string;
  icon: string;
  color: StatColor;
};

const initialStats: Stat[] = [
  {
    id: 'participants',
    label: 'Total Participants',
    value: 0,
    suffix: '+',
    icon: '👥',
    color: 'blue'
  },
  {
    id: 'sessions',
    label: 'Tours Conducted',
    value: 0,
    suffix: '+',
    icon: '🚶',
    color: 'green'
  },
  {
    id: 'kilometers',
    label: 'Kilometers Walked',
    value: 0,
    suffix: '+',
    icon: '📍',
    color: 'purple'
  },
  {
    id: 'countries',
    label: 'Countries Represented',
    value: 0,
    suffix: '+',
    icon: '🌍',
    color: 'orange'
  }
];

export default function KeyFiguresStats() {
  const [realStats, setRealStats] = useState(initialStats);
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>(
    initialStats.reduce((acc, stat) => ({ ...acc, [stat.id]: 0 }), {} as Record<string, number>)
  );

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Vérification des variables d'environnement
        console.log('🔧 Supabase URL:', import.meta.env.PUBLIC_SUPABASE_URL);
        console.log('🔧 Supabase Key exists:', !!import.meta.env.PUBLIC_SUPABASE_ANON_KEY);
        
        console.log('🔍 Attempting to fetch from Supabase...');
        
        // Utilisons d'abord select('*') pour voir toutes les colonnes disponibles
        const { data, error } = await supabase
          .from('data_participants_tour')
          .select('*');

        console.log('📊 Supabase response:', { data, error });

        if (error) {
          console.error('❌ Supabase error:', error);
          return;
        }

        if (data && data.length > 0) {
          console.log(`✅ Found ${data.length} rows in database`);
          console.log('🔍 First row structure:', data[0]);
          console.log('🔍 Available columns:', Object.keys(data[0]));
          
          // Adaptons aux vraies colonnes de la table
          const sessionSet = new Set<number>();
          let totalParticipants = 0;
          const countryMap = new Map<string, number>();

          data.forEach(row => {
            // Utilisons les vraies colonnes de ta table
            if (row.id_session) sessionSet.add(row.id_session);
            
            // Cherchons la colonne qui contient le nombre de participants
            // Elle pourrait s'appeler différemment
            const participantCount = row.taille_du_groupe || row.participants || row.nombre_participants || 1;
            totalParticipants += participantCount;
            
            // Pour le pays
            const country = row.pays || row.country || row.nationalite;
            if (country) {
              const pays = String(country).trim();
              countryMap.set(pays, (countryMap.get(pays) || 0) + participantCount);
            }
          });

          const sessionsCount = sessionSet.size;
          const distanceKm = Math.round(sessionsCount * 2.5);
          const uniqueCountries = countryMap.size;

          console.log('📈 Final calculated stats:', {
            totalParticipants,
            sessionsCount,
            distanceKm,
            uniqueCountries,
            countriesFound: Array.from(countryMap.keys())
          });

          const updatedStats = [
            { ...initialStats[0], value: totalParticipants },
            { ...initialStats[1], value: sessionsCount },
            { ...initialStats[2], value: distanceKm },
            { ...initialStats[3], value: uniqueCountries }
          ];

          setRealStats(updatedStats);
        } else {
          console.warn('⚠️ No data found in data_participants_tour');
        }
      } catch (error) {
        console.error('💥 Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const animateValue = (id: string, start: number, end: number, duration: number) => {
      const startTimestamp = Date.now();
      const step = () => {
        const now = Date.now();
        const progress = Math.min((now - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);

        setAnimatedValues(prev => ({ ...prev, [id]: currentValue }));

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    };

    // Animate each stat value
    realStats.forEach((stat) => {
      animateValue(stat.id, 0, stat.value, 2000);
    });
  }, [realStats]);

  const getColorClasses = (color: 'blue' | 'green' | 'purple' | 'orange') => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600'
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {realStats.map((stat) => (
        <div
          key={stat.id}
          className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300"
        >
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl ${getColorClasses(stat.color)}`}>
            {stat.icon}
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {animatedValues[stat.id]}{stat.suffix}
          </div>
          <div className="text-gray-600 font-medium">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
