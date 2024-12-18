'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';

interface VendorMapProps {
  address: string;
  area: string;
  state: string;
}

// Fix for default marker icons in Next.js
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

export default function VendorMap({ address, area, state }: VendorMapProps) {

  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  
  const [isClient, setIsClient] = useState(false);

  // const [position, setPosition] = useState<LatLng | null>(null);

  // const map = useMap();

  // const calculateDistance = (coord1: LatLng, coord2: LatLng): number => {
  //   return coord1.distanceTo(coord2); // Returns distance in meters
  // };
  
  // Example usage
  // const user1 = new L.LatLng(51.505, -0.09);
  // const user2 = new L.LatLng(51.515, -0.1);
  // const distance = calculateDistance(user1, user2);
  // console.log("Distance between users:", distance, "meters");

  // const RoutingComponent: React.FC<{ start: L.LatLng; end: L.LatLng }> = ({ start, end }) => {
  //   const map = useMap();
  
  //   useEffect(() => {
  //     if (start && end) {
  //       L.Routing.control({
  //         waypoints: [start, end],
  //         routeWhileDragging: true
  //       }).addTo(map);
  //     }
  //   }, [map, start, end]);
  
  //   return null;
  // };

  // useEffect(() => {
  //   if (!navigator.geolocation) {
  //     console.error("Geolocation is not supported by this browser.");
  //     return;
  //   }
    
  //   navigator.geolocation.getCurrentPosition(
  //     (location) => {
  //       const { latitude, longitude } = location.coords;
  //       const userPosition = new L.LatLng(latitude, longitude);
  //       setPosition(userPosition);
  //       map.setView(userPosition, 13); // Center map on user location
  //     },
  //     (error) => console.error("Error getting location:", error),
  //     { enableHighAccuracy: true }
  //   );
  // }, [map]);

  useEffect(() => {
    setIsClient(true);
    // Geocode the address to get coordinates
    const geocodeAddress = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            `${address}, ${area}, ${state}`
          )}`
        );
        const data = await response.json();
        
        if (data && data[0]) {
          setCoordinates([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        }
      } catch (error) {
        console.error('Error geocoding address:', error);
      }
    };

    geocodeAddress();
  }, [address, area, state]);

  if (!isClient || !coordinates) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  return (
    <MapContainer
      center={coordinates}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coordinates}>
        <Popup>
          <div className="text-sm">
            <p className="font-semibold">Location</p>
            <p>{address}</p>
            <p>{area}, {state}</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}