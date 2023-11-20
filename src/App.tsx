import { useSelector } from "react-redux";
import CelebrityPicker from "./components/CelebrityPicker";
import { selectCelebrity } from "./store/celebritySlice";
import { selectNetWorth } from "./store/userSlice";
import { selectItem } from "./store/itemSlice";
import NetWorthInput from "./components/NetWorthInput";
import WriteUp from "./components/WriteUp";
import ItemPicker from "./components/ItemPicker";
import globalStyles from "./theme/globalStyles";
import { useEffect, useState } from "react";

function App() {
  const selectedCelebrity = useSelector(selectCelebrity);
  const userNetWorth = useSelector(selectNetWorth);
  const item = useSelector(selectItem);

  const [pageText, setPageText] = useState<string>("");

  console.log(userNetWorth, pageText);

  useEffect(() => {
    function handleChangePageText() {
      if (!userNetWorth) {
        setPageText("Please Input Your Net Worth*");
      } else if (!selectedCelebrity) {
        setPageText("Please Select a Celebrity");
      } else if (!item) {
        setPageText("Please Select an Item");
      } else {
        setPageText("Results");
      }
    }

    handleChangePageText();
  });

  return (
    <div style={{ ...globalStyles.screen, ...globalStyles.container }}>
      <h1>Me vs. $B</h1>
      <h2>{pageText}</h2>
      {!userNetWorth && <NetWorthInput />}
      {userNetWorth && !selectedCelebrity && <CelebrityPicker />}
      {userNetWorth && selectedCelebrity && !item && <ItemPicker />}
      {userNetWorth && selectedCelebrity && item && <WriteUp />}
    </div>
  );
}

export default App;
