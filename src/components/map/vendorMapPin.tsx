import { useEffect, useRef, useState  } from 'react';
import L from 'leaflet';
import {  useAppSelector } from '@/lib/store/store';
import {useSearchParams } from "next/navigation";

import { type ProfileValues } from '@/lib/store/features/profileSlice';

const MapPinComponent = () => {

  const [profileDetails, setProfileDetails] = useState<ProfileValues | null>(null);

	const { profiles } = useAppSelector((state) => state.profile);

	const searchParams = useSearchParams();

	const vendorId = searchParams.get("docid");

	const vendorDocId = vendorId ? vendorId : "";

    useEffect(() => {
      // Handle auth state changes
      const vendorDetail = profiles.find(
        (profile) => profile.docid.toLowerCase() === vendorDocId.toLowerCase()
      );
      setProfileDetails(vendorDetail || null);
      
    }, [profiles, vendorDocId]);

  const mapContainer = useRef<HTMLDivElement>(null); // Reference to the map container div
  const mapInstance = useRef<L.Map | null>(null);    // Reference to the Leaflet map instance

  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);

  const [lat, setLat] = useState(Number);

  const [lng, setLng] = useState(Number);

  if (coordinates) {
    const [latitude, longitude] = coordinates;
    setLat(latitude);
    setLng(longitude);
  }

  useEffect(() => {
    // Geocode the address to get coordinates
    const geocodeAddress = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            `${profileDetails?.address}, ${profileDetails?.area}, ${profileDetails?.state}`
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
  }, [profileDetails]);

  useEffect(() => {
    // Initialize the map only if it hasn't been initialized
    if (mapContainer.current && !mapInstance.current) {
      mapInstance.current = L.map(mapContainer.current).setView([lat, lng], 13);

      // Add a tile layer to the map
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstance.current);
      L.marker([lat, lng]).addTo(mapInstance.current);
    }

    // Cleanup function to remove the map when the component unmounts
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [lat, lng]);

  return <div ref={mapContainer} style={{ height: '100%', width: '100%' }} />;
};

export default MapPinComponent;
