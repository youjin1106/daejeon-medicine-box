import { useEffect, useRef, useState } from "react";
import LocationMenu from "./LocationMenu";

const Map = () => {
  const mapEl = useRef(null);
  const { naver } = window;
  const [map, setMap] = useState<naver.maps.Map | null>();
  const initializeMap = () => {
    if (!mapEl.current || !naver) return;
    const firstLocation = new naver.maps.LatLng(36.355504, 127.383844);
    const mapOptions = {
      center: firstLocation,
      zoom: 16,
      minZoom: 14,
      maxZoom: 18,
      zoomControl: true,
      logoControl: false,
      mapDataControl: false,
      size: {
        width: 1100,
        height: 700,
      },
    };
    const map = new naver.maps.Map(mapEl.current, mapOptions);
    setMap(map);
  };
  useEffect(() => {
    initializeMap();
  }, []);

  return (
    <>
      <div className="flex flex-row">{map && <LocationMenu map={map} />}</div>
      <div ref={mapEl} className="mx-auto" />
    </>
  );
};

export default Map;
