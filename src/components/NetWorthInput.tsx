import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../store/userSlice";
import globalStyles from "../theme/globalStyles";

interface Styles {
  footNote: React.CSSProperties;
  submitButton: React.CSSProperties;
}

const styles: Styles = {
  footNote: {
    position: "absolute",
    bottom: 0,
  },
  submitButton: {
    marginTop: 10,
  },
};

const NetWorthInput: React.FC = () => {
  const [userNetWorth, setUserNetWorth] = useState<number | null>(null);

  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsedValue = /^\d+$/.test(value) ? parseInt(value, 10) : null;

    setUserNetWorth(parsedValue);
  };

  const handleSubmit = () => {
    dispatch(actions.setNetWorth(userNetWorth));
  };

  return (
    <>
      <div style={globalStyles.container}>
        <h2>Please Input Your Net Worth*</h2>
        <input
          type="text"
          value={userNetWorth !== null ? userNetWorth : ""}
          onChange={handleInputChange}
        />
        <button style={styles.submitButton} onClick={handleSubmit}>
          Let's Go!
        </button>
      </div>
      <div style={styles.footNote}>
        <p>
          *This is just for fun and the sake of the exercise. Your information
          will not be stored.
        </p>
      </div>
    </>
  );
};

export default NetWorthInput;
