import { MouseEvent, useEffect, useRef, useState } from "react";
// import InfoMarker from "../components/InfoMarker";
// import IconMarker from "../components/IconMarker";
import { getAllLocations } from "./MedicineBox";
import GeoCoder from "./GeoCoder";
import LocationMenu from "../components/LocationMenu";

const Map = () => {
  // let map: naver.maps.Map;
  const mapEl = useRef(null);
  const { naver } = window;
  // const [geoCode, setGeoCode] = useState([]);
  const [map, setMap] = useState<naver.maps.Map | null>();

  //임시 데이터
  // const title = "장소명";
  // const address = "내주소";
  // const telNumber = "234";

  const getAddress = async (e: MouseEvent<HTMLDivElement>) => {
    const location = e.currentTarget.getAttribute("data-id");
    if (location) {
      const YuSeongAddress = await getAllLocations(location);
      for (let i = 0; i < YuSeongAddress.length; i += 1) {
        map && GeoCoder(map, YuSeongAddress[i]);
      }
    } else {
      console.error("data-id 속성이 존재하지 않음");
    }
  };
  const initializeMap = () => {
    if (!mapEl.current || !naver) return;
    const firstLocation = new naver.maps.LatLng(36.2998001, 127.3163538);
    const mapOptions = {
      center: firstLocation,
      zoom: 15,
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
  // map.setCenter(jeju)

  return (
    <>
      <h1 className="m-10">대전 폐의약품 수거함 위치</h1>
      <div className="flex flex-row ">{map && <LocationMenu map={map} />}</div>
      <div ref={mapEl} />
    </>
  );
};

export default Map;
