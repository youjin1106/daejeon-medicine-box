import axios from "axios";
const baseURL = "https://api.odcloud.kr/api";
const AddressAPIKEY = import.meta.env.VITE_ADDRESS_KEY;
const YUSEONGGU_GET_URL =
  "/15078180/v1/uddi:d4d649cd-b320-4b97-b237-bd95b330eea9";
//서구 위,경도 제공
const SEOGU_GET_URL = "/15077806/v1/uddi:1207b449-cc87-4c0d-93d7-d9dfae695a22";
const JUNGGU_GET_URL = "/15101285/v1/uddi:c12a8c10-3d51-4a6c-80ae-dc85acfbc100";
const DAEDUCKGU_GET_URL =
  "/15077823/v1/uddi:4e1b21e4-0b7a-431d-a576-e1c70a4dff3e";
const DONGGU_GET_URL = "/15077803/v1/uddi:d6790275-7eda-46af-bfc0-e954c4d78e46";

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
    url: baseURL + YUSEONGGU_GET_URL,
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
