import {
  대덕구_수거함_좌표,
  동구_수거함_좌표,
  서구_수거함_좌표,
  유성구_수거함_좌표,
  중구_수거함_좌표,
} from "../medicinboxCode";
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
  const markerList = [];
  const distanceList = [];
  for (let i = 0; i < all_location.length; i += 1) {
    const distance =
      Math.abs(all_location[i].x - myLocation_x) +
      Math.abs(all_location[i].y - myLocation_y);
    if (markerList.length < 10) {
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

  console.log(markerList);
  console.log(distanceList);
  return <div>test MyLocation</div>;
};

export default MyLocation;
