import { useEffect, useState } from 'react';

const stats = [
  {
    id: 'participants',
    label: 'Total Participants',
    value: 500,
    suffix: '+',
    icon: '👥',
    color: 'blue'
  },
  {
    id: 'sessions',
    label: 'Tours Conducted',
    value: 80,
    suffix: '+',
    icon: '🚶',
    color: 'green'
  },
  {
    id: 'kilometers',
    label: 'Kilometers Walked',
    value: 200,
    suffix: '+',
    icon: '📍',
    color: 'purple'
  },
  {
    id: 'countries',
    label: 'Countries Represented',
    value: 25,
    suffix: '+',
    icon: '🌍',
    color: 'orange'
  }
];

export default function KeyFiguresStats() {
  const [animatedValues, setAnimatedValues] = useState(
    stats.reduce((acc, stat) => ({ ...acc, [stat.id]: 0 }), {})
  );

  useEffect(() => {
    const animateValue = (id: string, start: number, end: number, duration: number) => {
      const startTimestamp = Date.now();
      const step = (timestamp: number) => {
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        
        setAnimatedValues(prev => ({ ...prev, [id]: currentValue }));
        
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    };

    // Start animations with staggered delays
    stats.forEach((stat, index) => {
      setTimeout(() => {
        animateValue(stat.id, 0, stat.value, 2000);
      }, index * 200);
    });
  }, []);

  const getColorClasses = (color: string) => {
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
      {stats.map((stat) => (
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
