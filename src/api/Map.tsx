import { useEffect, useRef } from "react";

const Map = () => {
  let map: naver.maps.Map;
  const mapEl = useRef(null);
  const { naver } = window;

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
    // new naver.maps.Marker({
    //   position: new naver.maps.LatLng(36.321655, 127.378953),
    //   map,
    // });
  }, []);
  // map.setCenter(jeju)

  return (
    <>
      <h1 className="m-20">대전 폐의약품 수거함 위치</h1>
      <div ref={mapEl} />
    </>
  );
};

export default Map;
