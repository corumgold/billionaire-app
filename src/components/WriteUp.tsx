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
      <div
        style={{
          ...globalStyles.container,
          maxWidth: "90%",
          textAlign: "center",
        }}
      >
        <p>
          If {celebrityName} spends{" "}
          <span style={globalStyles.spanAccent}>
            {formatCurrency(itemPrice)}
          </span>{" "}
          on a {itemName}, it's like you buying a {itemName} for{" "}
          <span style={globalStyles.spanAccent}>
            {getEmotionalImpactNumber(
              celebrityNetWorth,
              userNetWorth,
              itemPrice,
              "personal"
            )}
          </span>
          .
        </p>
        <p>
          To experience the same feeling as your{" "}
          <span style={globalStyles.spanAccent}>
            {formatCurrency(itemPrice)}
          </span>{" "}
          {itemName} purchase, {celebrityName} would need to spend{" "}
          <span style={globalStyles.spanAccent}>
            {getEmotionalImpactNumber(
              celebrityNetWorth,
              userNetWorth,
              itemPrice,
              "celebrity"
            )}
          </span>
        </p>
      </div>
      <button onClick={handleResetGame}>Start Over</button>
    </>
  );
};

export default WriteUp;
