import { useEffect, useMemo } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L, { LatLngBoundsExpression } from 'leaflet';
import { Restaurant } from '../types';

import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icon paths for bundlers
const defaultIcon = new L.Icon({
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).toString(),
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).toString(),
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).toString(),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

interface MapViewProps {
  restaurants: Restaurant[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const MapEffects = ({ restaurants, selectedId }: { restaurants: Restaurant[]; selectedId: string | null }) => {
  const map = useMap();

  useEffect(() => {
    if (!restaurants.length) return;
    const bounds: LatLngBoundsExpression = restaurants.map((item) => [item.restaurant.lat, item.restaurant.lng]);
    map.fitBounds(bounds, { padding: [30, 30] });
  }, [map, restaurants]);

  useEffect(() => {
    if (!selectedId) return;
    const target = restaurants.find((item) => item.id === selectedId);
    if (target) {
      map.flyTo([target.restaurant.lat, target.restaurant.lng], 15, { duration: 0.7 });
    }
  }, [map, restaurants, selectedId]);

  return null;
};

export function MapView({ restaurants, selectedId, onSelect }: MapViewProps) {
  const center = useMemo<[number, number]>(() => {
    if (!restaurants.length) return [37.5665, 126.978];
    const avgLat = restaurants.reduce((sum, cur) => sum + cur.restaurant.lat, 0) / restaurants.length;
    const avgLng = restaurants.reduce((sum, cur) => sum + cur.restaurant.lng, 0) / restaurants.length;
    return [avgLat, avgLng];
  }, [restaurants]);

  return (
    <div className="map-wrapper">
      <MapContainer center={center} zoom={12} scrollWheelZoom className="map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEffects restaurants={restaurants} selectedId={selectedId} />
        {restaurants.map((item) => (
          <Marker
            key={item.id}
            position={[item.restaurant.lat, item.restaurant.lng]}
            eventHandlers={{ click: () => onSelect(item.id) }}
          >
            <Popup>
              <div className="popup">
                <strong>{item.restaurant.name}</strong>
                <div className="muted">{item.chef.name}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
