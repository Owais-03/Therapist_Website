import React, { useEffect, useRef } from 'react';

interface MapboxMapProps {
  className?: string;
  mapboxToken: string;
}

declare global {
  interface Window {
    mapboxgl: typeof import('mapbox-gl');
  }
}

const MapboxMap: React.FC<MapboxMapProps> = ({ className = "", mapboxToken }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: any;
    let marker: any;

    const loadMapbox = () => {
      if (window.mapboxgl) {
        initializeMap();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js';
      script.onload = initializeMap;
      document.head.appendChild(script);

      const link = document.createElement('link');
      link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    };

    const initializeMap = () => {
      if (!mapRef.current || !window.mapboxgl) return;

      // Los Angeles coordinates (fallback)
      const coordinates: [number, number] = [-118.2437, 34.0522];

      // Remove window.mapboxgl.accessToken assignment, only use accessToken in Map constructor
      map = new window.mapboxgl.Map({
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: coordinates,
        zoom: 15,
        accessToken: mapboxToken // This is valid in mapbox-gl v3+
      });

      map.on('load', () => {
        marker = new window.mapboxgl.Marker({ color: '#3bb6b0' })
          .setLngLat(coordinates)
          .setPopup(
            new window.mapboxgl.Popup().setHTML(
              '<div style="padding: 8px;"><strong>Dr. Serena Blake&apos;s Office</strong><br/>1287 Maplewood Drive<br/>Los Angeles, CA 90026</div>'
            )
          )
          .addTo(map);

        const markerElement = marker.getElement();
        markerElement.style.cursor = 'pointer';
      });

      map.addControl(new window.mapboxgl.NavigationControl());
    };

    loadMapbox();

    return () => {
      if (marker) marker.remove();
      if (map) map.remove();
    };
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

export default MapboxMap;
