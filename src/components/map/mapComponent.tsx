import { useEffect, useRef } from 'react';
import L from 'leaflet';

const MapComponent = () => {
  const mapContainer = useRef<HTMLDivElement>(null); // Reference to the map container div
  const mapInstance = useRef<L.Map | null>(null);    // Reference to the Leaflet map instance

  let  myIcon = L.icon({
    iconUrl: "/service/pin7e1.png",
    iconSize: [18, 65],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowUrl: "/service/pin8.jpg",
    shadowSize: [18, 65],
    shadowAnchor: [22, 94]
});

  useEffect(() => {
    // Initialize the map only if it hasn't been initialized
    if (mapContainer.current && !mapInstance.current) {
      mapInstance.current = L.map(mapContainer.current).setView([9.072264, 7.491302], 13);

      // Add a tile layer to the map
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstance.current);

      L.marker([9.072264, 7.491302], {icon: myIcon}).addTo(mapInstance.current);
    }

    // Cleanup function to remove the map when the component unmounts
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [myIcon]);

  return <div ref={mapContainer} style={{ height: '100%', width: '100%' }} />;
};

export default MapComponent;
