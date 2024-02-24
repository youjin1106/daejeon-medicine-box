import axios from "axios";
const baseURL = "https://api.odcloud.kr/api";
const AddressAPIKEY = import.meta.env.VITE_ADDRESS_KEY;

type LocationRequestResult = {
  도로명주소: string;
  위치명: string;
  지번주소: string;
  시군구명: string;
  시도명: string;
};

const MedicineBox = () => {
  return;
};

const getUAdress = async (
  targetPage: number,
  array: Array<LocationRequestResult>
) => {
  const res = await axios({
    url: `${baseURL}/15078180/v1/uddi:d4d649cd-b320-4b97-b237-bd95b330eea9`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Infuser ${AddressAPIKEY}`,
    },
    params: { page: targetPage },
  });
  // console.log(res.data);
  const { page, totalCount, data } = res.data;
  console.log(page, totalCount, data);
  // result.push(data)
  // array.push(...data);
  if (targetPage === 1) {
    array.push(...data);
  }

  if (page * 10 < totalCount) {
    // array.push(...res.data.data);
    const { data } = await getUAdress(page + 1, array);
    if (data) {
      array.push(...data);
    }
  }
  return res.data;
  // console.log(result);
};

const getAllLocations = async (): Promise<LocationRequestResult[]> => {
  const array: Array<LocationRequestResult> = [];
  await getUAdress(1, array);
  // console.log(array);
  // console.log(array.length);
  return array;
};

export { MedicineBox, getUAdress, getAllLocations };
