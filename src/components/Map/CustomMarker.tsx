import { useState } from "react";
import { Marker, OverlayView } from "@react-google-maps/api";
import { CombinedVehicle } from "../../types/CombinedVehicle";
import { format } from "date-fns";

interface CustomMarkerProps {
  vehicles: CombinedVehicle[];
  mapRef: google.maps.Map | null;
}

export const CustomMarker = ({ vehicles, mapRef }: CustomMarkerProps) => {
  const [selectedVehicle, setSelectedVehicle] = useState<CombinedVehicle | null>(null);

  const handleMarkerClick = (vehicle: CombinedVehicle) => {
    setSelectedVehicle(vehicle);
    
  };

  const date = selectedVehicle?.createdAt;
  const formattedDate = date
    ? format(new Date(date), "dd/MM/yyyy - HH:mm")
    : "12/12/2025 - 15:32";

  return (
    <>
      {vehicles.map((vehicle) => (
        <Marker
          key={vehicle.id}
          position={{ lat: vehicle.lat, lng: vehicle.lng }}
          onClick={() => handleMarkerClick(vehicle)}
          icon={{
            url: "/icons/car.svg",
            scaledSize: new window.google.maps.Size(50, 50),
            
          }}
          data-testid="custom-marker"
        />
      ))}

      {selectedVehicle && (
        <OverlayView
          position={{ lat: selectedVehicle.lat, lng: selectedVehicle.lng }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          
        >
          <div className="relative bg-[#001e2d] text-white p-4 rounded-xl shadow-lg w-[240px] font-sans text-sm leading-snug border border-[#ffffff22]">
            <button
              onClick={() => setSelectedVehicle(null)}
              className="absolute top-2 right-2 text-white hover:text-red-400 text-lg font-bold"
              aria-label="Fechar"
            >
              ×
            </button>

            <div className="font-semibold text-base mb-1">
              Placa: {selectedVehicle.plate}
            </div>

            {selectedVehicle.fleet && (
              <div className="mb-1">Frota: {selectedVehicle.fleet}</div>
            )}

            <div className="mb-1">
              {formattedDate || "12/12/2025 - 15:32"}
            </div>

            <div className="text-xs text-gray-300">
              {selectedVehicle.lat.toFixed(6)}, {selectedVehicle.lng.toFixed(6)}
            </div>
          </div>
        </OverlayView>
      )}
    </>
  );
};
