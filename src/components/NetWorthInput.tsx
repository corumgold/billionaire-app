import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../store/userSlice";

const NetWorthInput: React.FC = () => {
  const [userNetWorth, setUserNetWorth] = useState<number | null>(null);

  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Parse the string value to a number or set to null if it's not a valid number
    const parsedValue = /^\d+$/.test(value) ? parseInt(value, 10) : null;

    setUserNetWorth(parsedValue);
  };

  const handleSubmit = () => {
    dispatch(actions.setNetWorth(userNetWorth));
  };

  return (
    <div>
      <h2>Please Input Your Net Worth</h2>
      <input
        type="number"
        value={userNetWorth !== null ? userNetWorth : ""}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default NetWorthInput;
