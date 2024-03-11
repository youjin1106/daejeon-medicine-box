import { MouseEvent } from "react";
import {
  대덕구_수거함_좌표,
  동구_수거함_좌표,
  서구_수거함_좌표,
  유성구_수거함_좌표,
  중구_수거함_좌표,
  지역구_지도_좌표,
  수거함_정보,
} from "../medicinboxCode";
import IconMarker from "./IconMarker";
import useLocationStore from "../store/useLocationStore";

export type MapProps = {
  map: naver.maps.Map;
};

const LocationMenu = (props: MapProps) => {
  const { map } = props;
  let markers: naver.maps.Marker[] = [];
  let infoWindows: naver.maps.InfoWindow[] = [];
  const { locations } = useLocationStore();

  const getAddress = async (e: MouseEvent<HTMLLIElement>) => {
    const location_data_id = e.currentTarget.getAttribute("data-id");
    if (location_data_id) {
      const location_info = transLocationToUrl2(
        location_data_id as 지역
      ).수거함_좌표;
      const center = transLocationToUrl2(
        location_data_id as 지역
      ).지역중앙_좌표;
      const centerCode = new naver.maps.LatLng(center.x, center.y);
      map.setCenter(centerCode);
      if (markers.length > 0) {
        markers.map((marker) => marker.setMap(null));
        markers = [];
        infoWindows = [];
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
            anchor: new naver.maps.Point(15, 20),
          },
          clickable: true,
          animation: naver.maps.Animation.DROP,
        });

        const infoWindow = new naver.maps.InfoWindow({
          content: `<div class="flex flex-col bg-white w-fit p-[18px] border-solid border-[1px]">
          <p class="font-bold text-xl mb-2">${location_info[i].위치명}</p>
          <p>${location_info[i].도로명주소}</p>
          <p>${
            validateTelNum(location_info[i].전화번호) &&
            location_info[i].전화번호
          }</p>
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      if (mapBounds && mapBounds.hasLatLng(position)) {
        showMarker(map, marker);
      } else {
        hideMarker(marker);
      }
    }
  }

  function showMarker(map: naver.maps.Map, marker: naver.maps.Marker) {
    if (marker.getMap()) return;
    marker.setMap(map);
  }

  function hideMarker(marker: naver.maps.Marker) {
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

  // const transLocationToUrl = (location: string) => {
  //   switch (location) {
  //     case "유성구":
  //       return {
  //         수거함_좌표: 유성구_수거함_좌표,
  //         지역중앙_좌표: 지역구_지도_좌표.유성구,
  //       };
  //     case "서구":
  //       return {
  //         수거함_좌표: 서구_수거함_좌표,
  //         지역중앙_좌표: 지역구_지도_좌표.서구,
  //       };
  //     case "동구":
  //       return {
  //         수거함_좌표: 동구_수거함_좌표,
  //         지역중앙_좌표: 지역구_지도_좌표.동구,
  //       };
  //     case "대덕구":
  //       return {
  //         수거함_좌표: 대덕구_수거함_좌표,
  //         지역중앙_좌표: 지역구_지도_좌표.대덕구,
  //       };
  //     case "중구":
  //       return {
  //         수거함_좌표: 중구_수거함_좌표,
  //         지역중앙_좌표: 지역구_지도_좌표.중구,
  //       };
  //     default:
  //       return {
  //         수거함_좌표: 서구_수거함_좌표,
  //         지역중앙_좌표: 지역구_지도_좌표.서구,
  //       };
  //   }
  // };

  type 지역 = "유성구" | "서구" | "동구" | "대덕구" | "중구";
  type TranslatedType = {
    [index in 지역]: {
      수거함_좌표: 수거함_정보[];
      지역중앙_좌표: { x: number; y: number };
    };
  };
  const transLocationToUrl2 = (location: 지역) => {
    const translated: TranslatedType = {
      유성구: {
        수거함_좌표: 유성구_수거함_좌표,
        지역중앙_좌표: 지역구_지도_좌표.유성구,
      },
      서구: {
        수거함_좌표: 서구_수거함_좌표,
        지역중앙_좌표: 지역구_지도_좌표.서구,
      },
      동구: {
        수거함_좌표: 동구_수거함_좌표,
        지역중앙_좌표: 지역구_지도_좌표.동구,
      },
      대덕구: {
        수거함_좌표: 대덕구_수거함_좌표,
        지역중앙_좌표: 지역구_지도_좌표.대덕구,
      },
      중구: {
        수거함_좌표: 중구_수거함_좌표,
        지역중앙_좌표: 지역구_지도_좌표.중구,
      },
    };

    return translated[location];
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
    <ul className="flex flex-row mx-auto my-1 font-semibold text-gray-700">
      <li
        onClick={getAddress}
        data-id="서구"
        className="text-[25px] py-2 px-4 hover:bg-orange-300 rounded-lg"
      >
        서구
      </li>
      <li
        onClick={getAddress}
        data-id="유성구"
        className="text-[25px] p-2 px-4 hover:bg-orange-300 rounded-lg"
      >
        유성구
      </li>
      <li
        onClick={getAddress}
        data-id="중구"
        className="text-[25px] py-2 px-4 hover:bg-orange-300 rounded-lg"
      >
        중구
      </li>
      <li
        onClick={getAddress}
        data-id="대덕구"
        className="text-[25px] py-2 px-4 hover:bg-orange-300 rounded-lg"
      >
        대덕구
      </li>
      <li
        onClick={getAddress}
        data-id="동구"
        className="text-[25px] py-2 px-4 hover:bg-orange-300 rounded-lg"
      >
        동구
      </li>
    </ul>
  );
};

export default LocationMenu;
