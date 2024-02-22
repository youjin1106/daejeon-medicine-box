import { useEffect, useRef } from "react";
import InfoMarker from "../components/InfoMarker";
import IconMarker from "../components/IconMarker";

const Map = () => {
  let map: naver.maps.Map;
  const mapEl = useRef(null);
  const { naver } = window;

  //임시 데이터
  const title = "장소명";
  const address = "내주소";
  const telNumber = "234";

  useEffect(() => {
    if (!mapEl.current || !naver) return;
    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    const firstLocation = new naver.maps.LatLng(36.321655, 127.378953);
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
    new naver.maps.Marker({
      position: new naver.maps.LatLng(36.321655, 127.378953),
      map,
      icon: {
        //
        content: IconMarker(),
        size: new naver.maps.Size(38, 58),
        anchor: new naver.maps.Point(19, 58),
      },
      clickable: true,
    });
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
