import GeoCoder from "./api/GeoCoder";
import Map from "./api/Map";
import { getUAdress } from "./api/MedicineBox";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Map />
    </>
  );
}

export default App;
