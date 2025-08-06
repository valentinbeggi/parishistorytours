import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface TourMapProps {
  tour: 'left-bank' | 'right-bank';
}

const TourMap: React.FC<TourMapProps> = ({ tour }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  // Coordonnées des stops Left Bank (corrigées)
  const leftBankStops = [
    { name: "Boulevard Saint-Michel", coords: [2.339351, 48.844696] },
    { name: "Palais du Luxembourg", coords: [2.338257, 48.847677] },
    { name: "La Sorbonne", coords: [2.343624, 48.849884] },
    { name: "Notre-Dame", coords: [2.347286, 48.853813] }
  ];

  const rightBankStops = [
    // À définir selon votre parcours Right Bank
  ];

  const stops = tour === 'left-bank' ? leftBankStops : rightBankStops;

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = import.meta.env.PUBLIC_MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [2.3444, 48.8500], // Centre sur Paris
      zoom: 14,
      attributionControl: false
    });

    map.current.on('load', () => {
      // Ajouter les markers pour chaque stop
      stops.forEach((stop, index) => {
        // Marker personnalisé
        const el = document.createElement('div');
        el.className = 'custom-marker';
        el.innerHTML = `
          <div class="w-10 h-10 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
            ${index + 1}
          </div>
        `;

        new mapboxgl.Marker(el)
          .setLngLat(stop.coords as [number, number])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(`
              <div class="p-2">
                <h3 class="font-bold text-gray-800">${stop.name}</h3>
                <p class="text-sm text-gray-600">Stop ${index + 1}</p>
              </div>
            `)
          )
          .addTo(map.current!);
      });

      // Tracer la route entre les stops
      const routeCoords = stops.map(stop => stop.coords);
      
      map.current!.addSource('route', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            'coordinates': routeCoords
          }
        }
      });

      map.current!.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': '#374151',
          'line-width': 4,
          'line-opacity': 0.8
        }
      });

      // Animation optionnelle du parcours
      animateRoute();
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [tour]);

  const animateRoute = () => {
    // Animation simple qui suit le parcours
    let counter = 0;
    const maxSteps = stops.length;

    const timer = setInterval(() => {
      if (counter < maxSteps) {
        map.current?.flyTo({
          center: stops[counter].coords as [number, number],
          zoom: 16,
          duration: 2000
        });
        counter++;
      } else {
        // Revenir à la vue d'ensemble
        setTimeout(() => {
          map.current?.flyTo({
            center: [2.3444, 48.8500],
            zoom: 14,
            duration: 1500
          });
        }, 2000);
        clearInterval(timer);
      }
    }, 3000);
  };

  return (
    <div className="relative">
      <div 
        ref={mapContainer} 
        className="w-full h-96 rounded-lg shadow-lg"
        style={{ minHeight: '400px' }}
      />
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
        <h4 className="font-semibold text-gray-800">
          {tour === 'left-bank' ? 'Left Bank Tour' : 'Right Bank Tour'}
        </h4>
        <p className="text-sm text-gray-600">2.5km • 4 stops • 2 hours</p>
      </div>
    </div>
  );
};

export default TourMap;
