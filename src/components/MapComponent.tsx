'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet marker icons in Next.js
const customIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export interface FacilityMarker {
    id: string;
    position: [number, number];
    title: string;
    description: string;
    type: 'hospital' | 'police' | 'service' | 'other';
}

interface MapComponentProps {
    center: [number, number];
    zoom?: number;
    markers: FacilityMarker[];
    height?: string;
}

export default function MapComponent({ center, zoom = 13, markers, height = '400px' }: MapComponentProps) {
    return (
        <MapContainer
            center={center}
            zoom={zoom}
            style={{ height: height, width: '100%', borderRadius: '1rem', zIndex: 0 }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* User Location (Center) */}
            <Marker position={center} icon={customIcon}>
                <Popup>
                    <strong>You are here</strong>
                </Popup>
            </Marker>

            {/* Facility Markers */}
            {markers.map((marker) => (
                <Marker key={marker.id} position={marker.position} icon={customIcon}>
                    <Popup>
                        <div style={{ minWidth: '150px' }}>
                            <strong style={{ fontSize: '1.1rem', color: '#1e3a8a' }}>{marker.title}</strong>
                            <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>{marker.description}</p>
                            <span style={{
                                fontSize: '0.8rem',
                                padding: '2px 8px',
                                borderRadius: '10px',
                                background: '#f1f5f9',
                                fontWeight: 600
                            }}>
                                {marker.type.toUpperCase()}
                            </span>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
