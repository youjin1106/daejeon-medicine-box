import IconMarker from "../components/IconMarker";
import { 동구_수거함_좌표 } from "../medicinboxCode.ts";
let all = "";
const GeoCoder = (map: naver.maps.Map, info) => {
  naver.maps.Service.geocode(
    {
      query: "대전광역시 중구",
    },
    function (status, response) {
      if (status !== naver.maps.Service.Status.OK) {
        return alert("Something wrong!");
      }

      const result = response.v2; // 검색 결과의 컨테이너
      const { x, y, jibunAddress } = result.addresses[0]; // 검색 결과의 배열
      // console.log(result.addresses[0]);
      // console.log(동구_수거함_좌표.length);
      //동구
      console.log(x, y, jibunAddress);
      all += `{시군구명: '동구',위치명:'${info.명칭}' ,도로명주소: '${info.주소}', 지번주소: '${jibunAddress}', x: ${y} , y: ${x}, 전화번호:"${info.전화번호}" },\n`;
      //중구
      // all += `{시군구명: '중구',위치명:'${info.구분}' ,도로명주소: '${info.주소지}', 지번주소: '${jibunAddress}', x: ${y} , y: ${x}, 전화번호:"${info.전화번호}" },\n`;
      //대덕구 ///////////////
      // all += `{시군구명: '대덕구',위치명:'${info.폐의약품수거장소명}' ,도로명주소: '${info.소재지도로명주소}', 지번주소: '${jibunAddress}', x: ${y} , y: ${x}, 전화번호:"${info.전화번호}" },\n`;
      //서구 //////////////////
      // all += `{시군구명: '서구',위치명:'${info.수거장소명}' ,도로명주소: '${info.도로명주소}', 지번주소: '${info.지번주소}', x: ${y} , y: ${x}, 전화번호:"" },\n`;
      //유성구/////////////////
      // all += `{시군구명: '${info.시군구명}',위치명:'${info.위치명}' ,도로명주소: '${info.도로명주소}', 지번주소: '${info.지번주소}', x: ${y} , y: ${x}, 전화번호:"" },\n`;
      /////////////////////////
      //데이터합치기
      // console.log(all);
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
