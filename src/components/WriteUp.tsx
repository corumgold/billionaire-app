import React from "react";
import { useSelector } from "react-redux";
import {
  actions,
  selectCelebrityName,
  selectCelebrityNetWorth,
} from "../store/celebritySlice";
import { selectNetWorth } from "../store/userSlice";
import {
  formatCurrency,
  formatName,
  getEmotionalImpactNumber,
} from "../helperFuncs";
import { useDispatch } from "react-redux";
import { selectItem } from "../store/itemSlice";

const WriteUp: React.FC = () => {
  const userNetWorth = useSelector(selectNetWorth);
  const selectedCelebrityName = useSelector(selectCelebrityName);
  const selectedCelebrityNetWorth = useSelector(selectCelebrityNetWorth);
  const selectedItem = useSelector(selectItem);

  const dispatch = useDispatch();

  let celebrityName;
  let itemName;
  let itemPrice;

  const handleResetGame = () => {
    dispatch(actions.setCelebrityName(null));
    dispatch(actions.setCelebrityNetWorth(null));
  };

  if (selectedCelebrityName) {
    celebrityName = formatName(selectedCelebrityName);
  }

  if (selectedItem) {
    itemName = selectedItem.name;
    itemPrice = selectedItem.price;
  }

  return (
    <div>
      <p>
        If {celebrityName} spends {formatCurrency(itemPrice)} on a {itemName},
        it's like you buying a {itemName} for{" "}
        {getEmotionalImpactNumber(
          selectedCelebrityNetWorth,
          userNetWorth,
          itemPrice,
          "personal"
        )}
        .
      </p>
      <p>
        To experience the same feeling as your {formatCurrency(itemPrice)}{" "}
        {itemName} purchase, {celebrityName} would need to spend{" "}
        {getEmotionalImpactNumber(
          selectedCelebrityNetWorth,
          userNetWorth,
          itemPrice,
          "celebrity"
        )}
      </p>
      <button onClick={handleResetGame}>Start Over</button>
    </div>
  );
};

export default WriteUp;
