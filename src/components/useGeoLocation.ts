import { useEffect, useState } from "react";

type LocationType = {
  loaded: boolean;
  coordinates?: { latitude: number; longitude: number };
  error?: string;
};

const useGeoLocation = () => {
  const [position, setPosition] = useState<LocationType>({
    loaded: false,
    coordinates: { latitude: 36.355504, longitude: 127.383844 },
  });

  const getPositionSuccess = (position: {
    coords: { latitude: number; longitude: number };
  }) => {
    setPosition({
      loaded: true,
      coordinates: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
    });
  };

  const getPositionError = () => {
    setPosition({
      loaded: true,
      coordinates: { latitude: 36.355504, longitude: 127.383844 },
      error:
        "현재 위치를 확인할 수 없습니다. 위의 메뉴에서 지역을 직접 선택해주세요.",
    });
  };
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      getPositionError();
    }
    navigator.geolocation.getCurrentPosition(
      getPositionSuccess,
      getPositionError
    );
  }, []);
  return position;
};

export default useGeoLocation;
