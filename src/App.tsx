import { useSelector } from "react-redux";
import "./App.css";
import CelebrityPicker from "./components/CelebrityPicker";
import { selectCelebrityName } from "./store/celebritySlice";
import { selectNetWorth } from "./store/userSlice";
import NetWorthInput from "./components/NetWorthInput";

function App() {
  const selectedCelebrityName = useSelector(selectCelebrityName);
  const userNetWorth = useSelector(selectNetWorth);

  return (
    <>
      <h1>Me vs. $B</h1>
      {!userNetWorth && <NetWorthInput />}
      {userNetWorth && !selectedCelebrityName && <CelebrityPicker />}
    </>
  );
}

export default App;
