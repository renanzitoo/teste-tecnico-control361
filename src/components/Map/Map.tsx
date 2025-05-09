import { GoogleMap, DirectionsRenderer} from '@react-google-maps/api';
import { Skeleton } from "@mui/material";
import { CustomMarker} from './CustomMarker';
import { CombinedVehicle } from '../../types/CombinedVehicle';
import { useCallback, useMemo, useState } from 'react';

interface Props {
    gMapsApiStatus: boolean;
    mapDirections: google.maps.DirectionsResult | undefined;
    vehicles: CombinedVehicle[],
    onPlateClick: (lat: number, lng: number) => void;
    onMapLoad: (map: google.maps.Map) => void;
    defaultCenter: google.maps.LatLngLiteral;
    defaultZoom: number;
}

const containerStyle = {
    width: '100%',
    height: '500px',
    borderRadius: '12px',
};


const Map = ({gMapsApiStatus, mapDirections, vehicles,onPlateClick,defaultCenter, defaultZoom, onMapLoad}: Props) => {

    const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);

    const handleLoad = useCallback((map: google.maps.Map) => {
        setMapRef(map);
        onMapLoad(map);
      }, [onMapLoad]);
    
      const originalCenter = useMemo(() => ({
        lat: -23.5489,
        lng: -46.6388
      }), []);
      
      return (
        <>
        {gMapsApiStatus ? (
            <GoogleMap
                data-testid="google-map"
                mapContainerStyle={containerStyle}
                center={defaultCenter || originalCenter}
                zoom={defaultZoom || 8}
                onLoad={handleLoad}
                options={{
                    disableDefaultUI: true,
                    zoomControl: true,
                }}
                >

      <CustomMarker vehicles={vehicles} mapRef={mapRef}></CustomMarker>    
                {mapDirections ?
                    <DirectionsRenderer directions={mapDirections} />
                : null }
                
            </GoogleMap>
        ) : 
            <Skeleton height={300} data-testid="skeleton-loading"/>
        }
        </>
      );

}

export default Map;