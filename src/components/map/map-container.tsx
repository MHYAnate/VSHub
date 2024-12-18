"use client";

import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import LocationMarker from './location-marker';
import MapControls from './map-controls';

interface MapProps {
  center: LatLngExpression;
  zoom: number;
}

export default function Map({ center, zoom }: MapProps) {
  return (
    <div className="h-screen w-full relative">
      <MapControls />
      <MapContainer
        center={center}
        zoom={zoom}
        className="h-full w-full"
        style={{ background: '#f0f0f0' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
}