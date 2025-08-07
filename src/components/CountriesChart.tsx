import { useEffect, useState } from 'react';

const countriesData = [
  { country: 'USA', participants: 125, flag: '🇺🇸' },
  { country: 'Germany', participants: 98, flag: '🇩🇪' },
  { country: 'UK', participants: 87, flag: '🇬🇧' },
  { country: 'Spain', participants: 76, flag: '🇪🇸' },
  { country: 'Canada', participants: 64, flag: '🇨🇦' }
];

export default function CountriesChart() {
  const [animatedData, setAnimatedData] = useState(
    countriesData.map(item => ({ ...item, animatedParticipants: 0 }))
  );

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
            i === index ? { ...item, animatedParticipants: currentValue } : item
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
  }, []);

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
                  width: `${(item.animatedParticipants / maxParticipants) * 100}%`
                }}
              />
            </div>
            <span className="absolute right-0 top-0 mt-2 text-sm font-semibold text-gray-600">
              {item.animatedParticipants}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
