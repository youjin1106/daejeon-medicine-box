import { MouseEvent } from "react";
import {
  대덕구_수거함_좌표,
  동구_수거함_좌표,
  서구_수거함_좌표,
  유성구_수거함_좌표,
  중구_수거함_좌표,
} from "../medicinboxCode";
import IconMarker from "./IconMarker";

type MapProps = {
  map: naver.maps.Map;
};

const LocationMenu = (props: MapProps) => {
  const { map } = props;
  const markers: naver.maps.Marker[] = [];
  const infoWindows: naver.maps.InfoWindow[] = [];

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

        const infoWindow = new naver.maps.InfoWindow({
          content: `<div class="flex flex-col bg-white w-fit p-[18px] border-solid border-[1px]">
          <span class="font-bold text-xl mb-2">${location_info[i].위치명}</span>
          <span>${location_info[i].도로명주소}</span>
          <span>${
            validateTelNum(location_info[i].전화번호) &&
            location_info[i].전화번호
          }</span>
          </div>`,
          borderWidth: 0,
          disableAnchor: true,
          backgroundColor: "transparent",
        });

        markers.push(marker);
        infoWindows.push(infoWindow);
        naver.maps.Event.addListener(marker, "click", getClickHandler(i));
      }
    } else {
      Error("data-id 속성이 존재하지 않음");
    }
  };

  naver.maps.Event.addListener(map, "idle", function () {
    updateMarkers(map, markers);
  });

  function updateMarkers(map: naver.maps.Map, markers: naver.maps.Marker[]) {
    const mapBounds: naver.maps.Bounds = map.getBounds();
    let marker, position;
    for (let i = 0; i < markers.length; i++) {
      marker = markers[i];
      position = marker.getPosition();

      if (mapBounds && mapBounds.hasLatLng(position)) {
        showMarker(map, marker);
      } else {
        hideMarker(map, marker);
      }
    }
  }

  function showMarker(map: naver.maps.Map, marker: naver.maps.Marker) {
    if (marker.getMap()) return;
    marker.setMap(map);
  }

  function hideMarker(map: naver.maps.Map, marker: naver.maps.Marker) {
    if (!marker.getMap()) return;
    marker.setMap(null);
  }

  function getClickHandler(index: number) {
    return function () {
      const marker = markers[index],
        infoWindow = infoWindows[index];

      if (infoWindow.getMap()) {
        infoWindow.close();
      } else {
        infoWindow.open(map, marker);
      }
    };
  }

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

  function validateTelNum(checkNumber: string | null | undefined) {
    if (
      checkNumber === "" ||
      checkNumber === "undefined" ||
      checkNumber === "null" ||
      checkNumber === null ||
      checkNumber === undefined
    ) {
      return "";
    }
    return checkNumber;
  }

  return (
    <ul className="flex flex-row mx-auto font-semibold text-gray-700">
      <li onClick={getAddress} data-id="서구" className="text-[25px] py-2 px-4">
        서구
      </li>
      <li
        onClick={getAddress}
        data-id="유성구"
        className="text-[25px] p-2 px-4"
      >
        유성구
      </li>
      <li onClick={getAddress} data-id="중구" className="text-[25px] py-2 px-4">
        중구
      </li>
      <li
        onClick={getAddress}
        data-id="대덕구"
        className="text-[25px] py-2 px-4"
      >
        대덕구
      </li>
      <li onClick={getAddress} data-id="동구" className="text-[25px] py-2 px-4">
        동구
      </li>
    </ul>
  );
};

export default LocationMenu;
