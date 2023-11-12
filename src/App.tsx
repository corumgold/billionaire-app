import { useSelector } from "react-redux";
import "./App.css";
import CelebrityPicker from "./components/CelebrityPicker";
import {
  selectCelebrityName,
  selectCelebrityNetWorth,
} from "./store/celebritySlice";
import { formatCurrency, formatName } from "./helperFuncs";

function App() {
  const selectedCelebrityName = formatName(
    useSelector(selectCelebrityName)?.toString() ?? "Unknown Celebrity"
  );

  const selectedCelebrityNetWorth = formatCurrency(
    useSelector(selectCelebrityNetWorth) ?? 0
  );

  return (
    <>
      <h1> Hello World</h1>
      <h2>Selected Celebrity: {selectedCelebrityName}</h2>
      <h2>Selected Celebrity Net Worth: {selectedCelebrityNetWorth}</h2>

      <CelebrityPicker />
    </>
  );
}

export default App;
