import { useRef, useState } from "react";
import { useVehicles } from "../hooks/useVehicles";
import { useScript } from "../utils/ExternalScriptProvider";
import { IGMapsApiStatus } from "../types/types";

import { Header } from "../components/Header/Header";
import TopBar from "../components/TopBar/TopBar";
import MapCard from "../components/Map/MapCard";
import { CustomTable } from "../components/Table/CustomTable";

type VehicleType = "tracked" | "others";

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [vehicleType, setVehicleType] = useState<VehicleType>("tracked");
  const [mapCenter] = useState({ lat: -23.5489, lng: -46.6388 });
  const [mapZoom] = useState(8);
  const mapRef = useRef<google.maps.Map | null>(null);

  const googleMapsKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY!;
  const technicalTestApiKey = process.env.REACT_APP_TECHNICAL_TEST_API_KEY!;
  
  const GMapsApiStatus: IGMapsApiStatus = useScript(
    `https://maps.googleapis.com/maps/api/js?key=${googleMapsKey}&libraries=places&callback=Function.prototype`
  );

  const {
    vehicles,
    reset,
  } = useVehicles(vehicleType, searchTerm, technicalTestApiKey);

  const handleRadioChange = (value: VehicleType) => {
    setVehicleType(value);
    reset();
  };

  const handlePlateClick = (lat: number, lng: number) => {
    if (mapRef.current) {
      mapRef.current.setCenter({ lat, lng });
      mapRef.current.setZoom(15);
    }
  };

  return (
    <div className="min-h-screen bg-[#000F17] flex flex-col">
      <Header />
      <div className="flex flex-col space-y-6 px-4 pb-8">
        <TopBar
          onRadioChange={handleRadioChange}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <MapCard
          gMapsApiStatus={GMapsApiStatus.status === "ready"}
          mapDirections={undefined}
          vehicles={vehicles}
          onPlateClick={handlePlateClick}
          onMapLoad={(map) => {
            mapRef.current = map;
          }}
          defaultCenter={mapCenter}
          defaultZoom={mapZoom}
        />
        <CustomTable
          locationVehicles={vehicles}
          onPlateClick={handlePlateClick}
        />
      </div>
    </div>
  );
};
