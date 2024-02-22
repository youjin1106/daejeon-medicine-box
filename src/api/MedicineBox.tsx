import axios from "axios";
const baseURL = "https://api.odcloud.kr/api";
const AddressAPIKEY = import.meta.env.VITE_ADDRESS_KEY;
const MedicineBox = () => {
  return;
};

const getUAdress = async (page: number) => {
  const res = await axios({
    url: `${baseURL}/15078180/v1/uddi:d4d649cd-b320-4b97-b237-bd95b330eea9`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Infuser ${AddressAPIKEY}`,
    },
    params: { page },
  });
  return res.data;
};

export { MedicineBox, getUAdress };
