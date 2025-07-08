import React, { useEffect, useRef } from 'react';

interface MapboxMapProps {
  address?: string;
  className?: string;
}

const MapboxMap: React.FC<MapboxMapProps> = ({ 
  address = "1287 Maplewood Drive, Los Angeles, CA 90026",
  className = ""
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapboxToken = "pk.eyJ1IjoiZmVyb3owMyIsImEiOiJjbThuYWRkY2wwM3B0MmtzNTAzOTBlNzhkIn0.hDr015g1tBkgheb3jMc8ow"; // Public demo token

  useEffect(() => {
    const loadMapbox = () => {
      if (window.mapboxgl) {
        initializeMap();
        return;
      }

      // Load Mapbox CSS
      const link = document.createElement('link');
      link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);

      // Load Mapbox JS
      const script = document.createElement('script');
      script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js';
      script.onload = initializeMap;
      document.head.appendChild(script);
    };

    const initializeMap = () => {
      if (!mapRef.current || !window.mapboxgl) return;

      window.mapboxgl.accessToken = mapboxToken;

      // Los Angeles coordinates (fallback)
      const coordinates = [-118.2437, 34.0522]; // [lng, lat]

      const map = new window.mapboxgl.Map({
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: coordinates,
        zoom: 15
      });

      // Add marker
      new window.mapboxgl.Marker({ color: '#3bb6b0' })
        .setLngLat(coordinates)
        .setPopup(
          new window.mapboxgl.Popup().setHTML(
            '<div style="padding: 8px;"><strong>Dr. Serena Blake\'s Office</strong><br/>1287 Maplewood Drive<br/>Los Angeles, CA 90026</div>'
          )
        )
        .addTo(map);

      // Add navigation controls
      map.addControl(new window.mapboxgl.NavigationControl());
    };

    loadMapbox();
  }, [mapboxToken]);

  return (
    <div className={`w-full ${className}`}>
      <div
        ref={mapRef}
        className="w-full h-[250px] md:h-[300px] lg:h-[350px] rounded-lg shadow-md bg-gray-200"
        style={{ minHeight: '250px' }}
      />
    </div>
  );
};

// Extend the Window interface to include mapboxgl
declare global {
  interface Window {
    mapboxgl: any;
  }
}

export default MapboxMap;
