import React from "react";
import { useSelector } from "react-redux";
import {
  selectCelebrityName,
  selectCelebrityNetWorth,
} from "../store/celebritySlice";
import { selectNetWorth } from "../store/userSlice";
import { formatCurrency, formatName, getNetWorthRatio } from "../helperFuncs";

const WriteUp: React.FC = () => {
  const userNetWorth = useSelector(selectNetWorth);
  const selectedCelebrityName = useSelector(selectCelebrityName);
  const selectedCelebrityNetWorth = useSelector(selectCelebrityNetWorth);

  let celebrityName = null;

  const netWorthRatio = getNetWorthRatio(
    selectedCelebrityNetWorth,
    userNetWorth
  );

  if (selectedCelebrityName) {
    celebrityName = formatName(selectedCelebrityName);
  }

  return (
    <div>
      <p>
        When {celebrityName} purchases an iPhone for $1400, for you this would
        feel like buying an iPhone for {formatCurrency(1400 / netWorthRatio)}
      </p>
      <p>
        In other words, in order for {celebrityName} to feel the same emotions
        when they buy an iPhone, {celebrityName} would need to pay{" "}
        {formatCurrency(1400 * netWorthRatio)}
      </p>
    </div>
  );
};

export default WriteUp;
