import { useEffect, useRef, useState } from "react";
import InfoMarker from "../components/InfoMarker";
import IconMarker from "../components/IconMarker";
import { getUAdress } from "./MedicineBox";
import GeoCoder from "./GeoCoder";

const Map = () => {
  let map: naver.maps.Map;
  const mapEl = useRef(null);
  const { naver } = window;
  const [geoCode, setGeoCode] = useState([]);

  //임시 데이터
  const title = "장소명";
  const address = "내주소";
  const telNumber = "234";

  const getAddress = async () => {
    const YuSeongAddress = await getUAdress(1);
    for (let i = 0; i < YuSeongAddress.data.length; i += 1) {
      GeoCoder(YuSeongAddress.data[i].도로명주소, map);
    }
  };

  useEffect(() => {
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
    map = new naver.maps.Map(mapEl.current, mapOptions);
    // new naver.maps.Marker({
    //   position: new naver.maps.LatLng(36.2998001, 127.3163538),
    //   map,
    //   icon: {
    //     //
    //     content: IconMarker(),
    //     size: new naver.maps.Size(38, 58),
    //     anchor: new naver.maps.Point(19, 58),
    //   },
    //   clickable: true,
    //   animation: naver.maps.Animation.DROP,
    // });
    getAddress();
  }, []);
  // map.setCenter(jeju)

  return (
    <>
      <h1 className="m-10">대전 폐의약품 수거함 위치</h1>
      <div ref={mapEl} />
    </>
  );
};

export default Map;
