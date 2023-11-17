import React from "react";
import { useSelector } from "react-redux";
import {
  actions as celebrityActions,
  selectCelebrity,
} from "../store/celebritySlice";
import { actions as itemActions } from "../store/itemSlice";
import { actions as userActions } from "../store/userSlice";
import { selectNetWorth } from "../store/userSlice";
import {
  formatCurrency,
  formatName,
  getEmotionalImpactNumber,
} from "../helperFuncs";
import { useDispatch } from "react-redux";
import { selectItem } from "../store/itemSlice";
import globalStyles from "../theme/globalStyles";

const WriteUp: React.FC = () => {
  const userNetWorth = useSelector(selectNetWorth);
  const selectedCelebrity = useSelector(selectCelebrity);
  const selectedItem = useSelector(selectItem);

  const dispatch = useDispatch();

  let celebrityName = "";
  let celebrityNetWorth = 0;
  let itemName = "";
  let itemPrice = 0;

  const handleResetGame = () => {
    dispatch(celebrityActions.setCelebrity(null));
    dispatch(itemActions.setItem(null));
    dispatch(userActions.setNetWorth(null));
  };

  if (selectedCelebrity) {
    celebrityName = formatName(selectedCelebrity.name);
    celebrityNetWorth = selectedCelebrity.net_worth;
  }

  if (selectedItem) {
    itemName = selectedItem.name;
    itemPrice = selectedItem.price;
  }

  return (
    <>
      <button
        style={globalStyles.backButton}
        onClick={() => dispatch(itemActions.setItem(null))}
      >
        Back
      </button>
      <div>
        <p>
          If {celebrityName} spends {formatCurrency(itemPrice)} on a {itemName},
          it's like you buying a {itemName} for{" "}
          {getEmotionalImpactNumber(
            celebrityNetWorth,
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
            celebrityNetWorth,
            userNetWorth,
            itemPrice,
            "celebrity"
          )}
        </p>
        <button onClick={handleResetGame}>Start Over</button>
      </div>
    </>
  );
};

export default WriteUp;
