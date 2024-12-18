'use client';

import { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { ProfileValues } from '@/lib/store/features/profileSlice';
import Image from 'next/image';

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

interface VendorLocation extends ProfileValues {
  coordinates?: [number, number];
  distance?: number;
}

interface VendorMapProps {
  vendors: ProfileValues[];
  height?: string;
  className?: string;
}

const DEFAULT_CENTER: [number, number] = [51.505, -0.09];

function ChangeView({ coords }: { coords: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, 13);
  }, [coords, map]);
  return null;
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export default function VendorsMap({ vendors = [], height = '600px', className = '' }: VendorMapProps) {
  const [vendorLocations, setVendorLocations] = useState<VendorLocation[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [selectedVendor, setSelectedVendor] = useState<VendorLocation | null>(null);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  // Fetch vendor coordinates
  useEffect(() => {
    const fetchVendorCoordinates = async () => {
      const updatedVendors = await Promise.all(
        vendors.map(async (vendor) => {
          if (vendor.coordinates) return vendor;

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                `${vendor.address}, ${vendor.area}, ${vendor.state}`
              )}`
            );
            const data = await response.json();

            if (data?.[0]) {
              const coordinates: [number, number] = [
                parseFloat(data[0].lat),
                parseFloat(data[0].lon)
              ];

              const distance = userLocation
                ? calculateDistance(
                    userLocation[0],
                    userLocation[1],
                    coordinates[0],
                    coordinates[1]
                  )
                : undefined;

              return {
                ...vendor,
                coordinates,
                distance
              };
            }
            return vendor;
          } catch (error) {
            console.error('Error geocoding address:', error);
            return vendor;
          }
        })
      );

      setVendorLocations(updatedVendors.filter((v): v is VendorLocation => v.coordinates !== undefined));
    };

    if (vendors?.length > 0) {
      fetchVendorCoordinates();
    }
  }, [vendors, userLocation]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      const mapContainer = document.querySelector('.leaflet-container');
      if (mapContainer) {
        (mapContainer as HTMLElement & { _leaflet_id?: string | null })._leaflet_id = null;
      }
    };
  }, []);

  const mapCenter = useMemo(() => userLocation || DEFAULT_CENTER, [userLocation]);

  return (
    <div className={`w-full rounded-lg overflow-hidden relative ${className}`} style={{ height }}>
      <MapContainer
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {userLocation && <ChangeView coords={userLocation} />}

        {userLocation && (
          <Marker
            position={userLocation}
            icon={L.divIcon({
              className: 'bg-blue-500 rounded-full w-4 h-4 border-2 border-white',
              iconSize: [16, 16],
            })}
          >
            <Popup>
              <div className="text-sm font-medium">Your Location</div>
            </Popup>
          </Marker>
        )}

        {vendorLocations.map((vendor) => 
          vendor.coordinates ? (
            <Marker
              key={vendor.docid}
              position={vendor.coordinates}
              eventHandlers={{
                mouseover: () => setSelectedVendor(vendor),
                mouseout: () => setSelectedVendor(null),
                click: () => setSelectedVendor(vendor),
              }}
            >
              <Popup>
                <div className="min-w-[200px] p-4 bg-white rounded-lg shadow-md">
                  <div className="flex items-start gap-3">
                    <Image
                      src={vendor.src}
                      alt={vendor.name}
                      className="w-10 h-10 rounded-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(vendor.name)}`;
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{vendor.name}</h3>
                      <p className="text-sm text-gray-600">{vendor.specialty}</p>
                      {vendor.distance && (
                        <div className="flex items-center gap-1 mt-2 text-sm text-gray-600">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span>{vendor.distance.toFixed(1)} km away</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>

      {selectedVendor && (
        <div className="absolute bottom-4 left-4 z-[1000]">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="flex items-start gap-3">
              <Image
                src={selectedVendor.src}
                alt={selectedVendor.name}
                className="w-12 h-12 rounded-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedVendor.name)}`;
                }}
              />
              <div>
                <h3 className="font-semibold">{selectedVendor.name}</h3>
                <p className="text-sm text-gray-600">{selectedVendor.specialty}</p>
                {selectedVendor.distance && (
                  <div className="flex items-center gap-1 mt-1 text-sm text-gray-600">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{selectedVendor.distance.toFixed(1)} km away</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}