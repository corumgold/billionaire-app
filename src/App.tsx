import { useSelector } from "react-redux";
import "./App.css";
import CelebrityPicker from "./components/CelebrityPicker";
import { selectCelebrityName } from "./store/celebritySlice";
import { selectNetWorth } from "./store/userSlice";
import { selectItem } from "./store/itemSlice";
import NetWorthInput from "./components/NetWorthInput";
import WriteUp from "./components/WriteUp";
import ItemPicker from "./components/ItemPicker";

function App() {
  const selectedCelebrityName = useSelector(selectCelebrityName);
  const userNetWorth = useSelector(selectNetWorth);
  const item = useSelector(selectItem);
  console.log(item);

  return (
    <>
      <h1>Me vs. $B</h1>
      {!userNetWorth && <NetWorthInput />}
      {userNetWorth && !selectedCelebrityName && <CelebrityPicker />}
      {userNetWorth && selectedCelebrityName && !item && <ItemPicker />}
      {userNetWorth && selectedCelebrityName && item && <WriteUp />}
    </>
  );
}

export default App;
