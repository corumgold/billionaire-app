import React from "react";
import { useSelector } from "react-redux";
import {
  actions,
  selectCelebrityName,
  selectCelebrityNetWorth,
} from "../store/celebritySlice";
import { selectNetWorth } from "../store/userSlice";
import { formatName, getEmotionalImpactNumber } from "../helperFuncs";
import { useDispatch } from "react-redux";

const WriteUp: React.FC = () => {
  const userNetWorth = useSelector(selectNetWorth);
  const selectedCelebrityName = useSelector(selectCelebrityName);
  const selectedCelebrityNetWorth = useSelector(selectCelebrityNetWorth);

  const dispatch = useDispatch();

  let celebrityName = null;

  const handleResetGame = () => {
    dispatch(actions.setCelebrityName(null));
    dispatch(actions.setCelebrityNetWorth(null));
  };

  if (selectedCelebrityName) {
    celebrityName = formatName(selectedCelebrityName);
  }

  return (
    <div>
      <p>
        When {celebrityName} purchases an iPhone for $1400, for you this would
        feel like buying an iPhone for{" "}
        {getEmotionalImpactNumber(
          selectedCelebrityNetWorth,
          userNetWorth,
          1400,
          "personal"
        )}
        .
      </p>
      <p>
        In other words, in order to elicit the same emotional response as you
        when purchasing an iPhone, {celebrityName} would need to pay{" "}
        {getEmotionalImpactNumber(
          selectedCelebrityNetWorth,
          userNetWorth,
          1400,
          "celebrity"
        )}
      </p>
      <button onClick={handleResetGame}>Start Over</button>
    </div>
  );
};

export default WriteUp;
