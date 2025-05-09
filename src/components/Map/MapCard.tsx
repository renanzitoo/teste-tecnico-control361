import Map from './Map'; 
import { CombinedVehicle } from '../../types/CombinedVehicle';
import { useMemo } from 'react';

interface Props {
  gMapsApiStatus: boolean;
  mapDirections: google.maps.DirectionsResult | undefined;
  vehicles: CombinedVehicle[];
  onPlateClick: (lat: number, lng: number) => void;
  onMapLoad: (map: google.maps.Map) => void;
  defaultCenter?: google.maps.LatLngLiteral;
  defaultZoom?: number;
}

export default function MapCard({
  gMapsApiStatus,
  mapDirections,
  vehicles,
  onPlateClick,
  onMapLoad,
  defaultCenter,
  defaultZoom,
}: Props) {
  const originalCenter = useMemo(() => ({
          lat: -23.5489,
          lng: -46.6388
        }), []);

  return (
    <div className="bg-[#001622] border-2 border-[#002D44] rounded-2xl p-4 mb-4">
      <h3 className="text-white font-semibold mb-2">Mapa rastreador</h3>
      <div className="rounded-xl overflow-hidden shadow-lg border border-gray-800 flex justify-center">
        <Map
          gMapsApiStatus={gMapsApiStatus}
          mapDirections={mapDirections}
          vehicles={vehicles}
          onPlateClick={onPlateClick}
          onMapLoad={onMapLoad}
          defaultCenter={defaultCenter || originalCenter }
          defaultZoom={defaultZoom || 8}
        />
      </div>
    </div>
  );
}
