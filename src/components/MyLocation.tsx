import {
  대덕구_수거함_좌표,
  동구_수거함_좌표,
  서구_수거함_좌표,
  수거함_정보,
  유성구_수거함_좌표,
  중구_수거함_좌표,
} from "../medicinboxCode";
import IconMarker from "./IconMarker";
import { MapProps } from "./LocationMenu";
import useGeoLocation from "./useGeoLocation";

const MyLocation = (props: MapProps) => {
  const { map } = props;
  const all_location = [
    ...대덕구_수거함_좌표,
    ...동구_수거함_좌표,
    ...서구_수거함_좌표,
    ...유성구_수거함_좌표,
    ...중구_수거함_좌표,
  ];
  const position = useGeoLocation();

  const myLocation_x = position.coordinates!.latitude;
  const myLocation_y = position.coordinates!.longitude;
  map.setCenter(new naver.maps.LatLng(myLocation_x, myLocation_y));
  const markerList: 수거함_정보[] = [];
  const distanceList = [];
  const infoWindows: naver.maps.InfoWindow[] = [];

  for (let i = 0; i < all_location.length; i += 1) {
    const distance =
      Math.abs(all_location[i].x - myLocation_x) +
      Math.abs(all_location[i].y - myLocation_y);
    if (markerList.length < 5) {
      markerList.push(all_location[i]);
      distanceList.push(distance);
    } else {
      for (let j = 0; j < markerList.length; j += 1) {
        if (distanceList[j] > distance) {
          markerList[j] = all_location[i];
          distanceList[j] = distance;
          break;
        }
      }
    }
  }

  for (let i = 0; i < markerList.length; i += 1) {
    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(markerList[i].x, markerList[i].y),
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
      <p class="font-bold text-xl mb-2">${markerList[i].위치명}</p>
      <p>${markerList[i].도로명주소}</p>
      <p>${validateTelNum(markerList[i].전화번호) && markerList[i].전화번호}</p>
      </div>`,
      borderWidth: 0,
      disableAnchor: true,
      backgroundColor: "transparent",
    });

    infoWindows.push(infoWindow);
    naver.maps.Event.addListener(marker, "click", getClickHandler(i));
  }
  function getClickHandler(index: number) {
    return function () {
      const marker = markerList[index],
        infoWindow = infoWindows[index];

      if (infoWindow.getMap()) {
        infoWindow.close();
      } else {
        infoWindow.open(map, new naver.maps.LatLng(marker.x, marker.y));
      }
    };
  }

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
  return <div>test MyLocation</div>;
};

export default MyLocation;
