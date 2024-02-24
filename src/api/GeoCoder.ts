import IconMarker from "../components/IconMarker";

const GeoCoder = (도로명주소: string, map: naver.maps.Map) => {
  naver.maps.Service.geocode(
    {
      query: 도로명주소,
    },
    function (status, response) {
      if (status !== naver.maps.Service.Status.OK) {
        return alert("Something wrong!");
      }

      const result = response.v2; // 검색 결과의 컨테이너
      const { x, y } = result.addresses[0]; // 검색 결과의 배열
      // console.log(result.addresses[0]);
      new naver.maps.Marker({
        position: new naver.maps.LatLng(Number(y), Number(x)),
        map,
        icon: {
          //
          content: IconMarker(),
          size: new naver.maps.Size(38, 58),
          anchor: new naver.maps.Point(19, 58),
        },
        clickable: true,
        animation: naver.maps.Animation.DROP,
      });
    }
  );
};

export default GeoCoder;
