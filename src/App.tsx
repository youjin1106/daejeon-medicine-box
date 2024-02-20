import GeoCoder from "./api/GeoCoder";
import Map from "./api/Map";
import { getUAdress } from "./api/MedicineBox";

function App() {
  getUAdress();
  // const nnn = GeoCoder();
  return <Map />;
}

export default App;
