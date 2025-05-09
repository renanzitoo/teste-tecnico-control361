export const getMapViewState = (map: google.maps.Map | null) => {
  if (!map) return { lat: 0, lng: 0, zoom: 8 };
  const center = map.getCenter();
  return {
    lat: center?.lat() || 0,
    lng: center?.lng() || 0,
    zoom: map.getZoom() || 8,
  };
};
