import { MouseEvent } from "react";
import GeoCoder from "../api/GeoCoder";
import { getAllLocations } from "../api/MedicineBox";
import {
  대덕구_수거함_좌표,
  동구_수거함_좌표,
  서구_수거함_좌표,
  유성구_수거함_좌표,
  중구_수거함_좌표,
  수거함_정보,
} from "../medicinboxCode";
import IconMarker from "./IconMarker";

type MapProps = {
  map: naver.maps.Map;
};

const LocationMenu = (props: MapProps) => {
  const { map } = props;
  const markers: naver.maps.Marker[] = [];
  const getAddress = async (e: MouseEvent<HTMLLIElement>) => {
    const location_data_id = e.currentTarget.getAttribute("data-id");
    if (location_data_id) {
      const location_info = transLocationToUrl(location_data_id);
      if (markers.length > 0) {
        markers.map((marker) => marker.setMap(null));
      }
      for (let i = 0; i < location_info.length; i += 1) {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(
            location_info[i].x,
            location_info[i].y
          ),
          map,
          icon: {
            content: IconMarker(),
            size: new naver.maps.Size(38, 58),
            anchor: new naver.maps.Point(19, 58),
          },
          clickable: true,
          animation: naver.maps.Animation.DROP,
        });
        markers.push(marker);
      }
    } else {
      Error("data-id 속성이 존재하지 않음");
    }
  };

  const transLocationToUrl = (location: string) => {
    switch (location) {
      case "유성구":
        return 유성구_수거함_좌표;
      case "서구":
        return 서구_수거함_좌표;
      case "동구":
        return 동구_수거함_좌표;
      case "대덕구":
        return 대덕구_수거함_좌표;
      case "중구":
        return 중구_수거함_좌표;
      default:
        return 서구_수거함_좌표;
    }
  };

  return (
    <ul className="flex flex-row ">
      <li onClick={getAddress} data-id="서구">
        서구
      </li>
      <li onClick={getAddress} data-id="유성구">
        유성구
      </li>
      <li onClick={getAddress} data-id="중구">
        중구
      </li>
      <li onClick={getAddress} data-id="대덕구">
        대덕구
      </li>
      <li onClick={getAddress} data-id="동구">
        동구
      </li>
    </ul>
  );
};

export default LocationMenu;
