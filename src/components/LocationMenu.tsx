import GeoCoder from "../api/GeoCoder";
import { getAllLocations } from "../api/MedicineBox";

type MapProps = {
  map: naver.maps.Map;
};

const LocationMenu: React.FC<MapProps> = (props) => {
  const { map } = props;
  const handleClickSeogu = () => {};
  const handleClickYuseonggu = () => {
    getAddress();
  };

  const getAddress = async () => {
    const YuSeongAddress = await getAllLocations();
    // const YuSeongAddress = await getUAdress(2);
    // for (let i = 0; i < YuSeongAddress.data.length; i += 1) {
    //   GeoCoder(YuSeongAddress.data[i].도로명주소, map);
    // }
    console.log(YuSeongAddress);
    for (let i = 0; i < YuSeongAddress.length; i += 1) {
      GeoCoder(YuSeongAddress[i].도로명주소, map);
    }
  };

  return (
    <div className="flex flex-row ">
      <div onClick={handleClickSeogu}>서구</div>
      <div onClick={getAddress}>유성구</div>
      <div>중구</div>
      <div>대덕구</div>
      <div>동구</div>
    </div>
  );
};

export default LocationMenu;
