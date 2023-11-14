import { useSelector } from "react-redux";
import CelebrityPicker from "./components/CelebrityPicker";
import { selectCelebrityName } from "./store/celebritySlice";
import { selectNetWorth } from "./store/userSlice";
import { selectItem } from "./store/itemSlice";
import NetWorthInput from "./components/NetWorthInput";
import WriteUp from "./components/WriteUp";
import ItemPicker from "./components/ItemPicker";
import globalStyles from "./theme/globalStyles";
import { useEffect, useState } from "react";

function App() {
  const selectedCelebrityName = useSelector(selectCelebrityName);
  const userNetWorth = useSelector(selectNetWorth);
  const item = useSelector(selectItem);

  const [pageText, setPageText] = useState<string>("");

  console.log(userNetWorth, pageText);

  useEffect(() => {
    function handleChangePageText() {
      if (!userNetWorth) {
        setPageText("Please Input Your Net Worth*");
      } else if (!selectedCelebrityName) {
        setPageText("Please Select a Celebrity");
      } else if (!item) {
        setPageText("Please Select an Item");
      } else {
        setPageText("");
      }
    }

    handleChangePageText();
  });

  return (
    <div style={{ ...globalStyles.screen, ...globalStyles.container }}>
      <h1>Me vs. $B</h1>
      <h2>{pageText}</h2>
      {!userNetWorth && <NetWorthInput />}
      {userNetWorth && !selectedCelebrityName && <CelebrityPicker />}
      {userNetWorth && selectedCelebrityName && !item && <ItemPicker />}
      {userNetWorth && selectedCelebrityName && item && <WriteUp />}
    </div>
  );
}

export default App;
