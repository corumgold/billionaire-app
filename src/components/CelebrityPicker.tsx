import React, { useState, useEffect } from "react";
import { formatCurrency, formatName } from "../helperFuncs";
import { useDispatch } from "react-redux";
import { actions as celebrityActions } from "../store/celebritySlice";
import { actions as userActions } from "../store/userSlice";
import globalStyles from "../theme/globalStyles";

const apiKey = import.meta.env.VITE_CELEBRITY_API_KEY;

interface Styles {
  celebrityList: React.CSSProperties;
  celebrityListItem: React.CSSProperties;
}

const styles: Styles = {
  celebrityList: {
    display: "flex",
    flexDirection: "row",
    overflowX: "auto",
    maxWidth: "100vw",
    marginTop: "10px",
  },
  celebrityListItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    margin: "0 8px",
  },
};

const CelebrityPicker: React.FC = () => {
  const [celebrityName, setCelebrityName] = useState<string>("");
  const [celebrityData, setCelebrityData] = useState<
    { name: string; net_worth: number }[] | null
  >(null);

  const dispatch = useDispatch();

  const handleCelebrityClick = (selectedCelebrity: {
    name: string;
    net_worth: number;
  }) => {
    dispatch(celebrityActions.setCelebrityName(selectedCelebrity.name));
    dispatch(
      celebrityActions.setCelebrityNetWorth(selectedCelebrity.net_worth)
    );
  };

  useEffect(() => {
    const handleFetchCelebrity = async () => {
      try {
        const response = await fetch(
          `https://api.api-ninjas.com/v1/celebrity?name=${celebrityName}`,
          {
            method: "GET",
            headers: {
              "X-Api-Key": apiKey,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        const sortedCelebrities = result.sort(
          (
            a: { name: string; net_worth: number },
            b: { name: string; net_worth: number }
          ) => a.name.localeCompare(b.name)
        );

        setCelebrityData(sortedCelebrities);
        console.log(result);
      } catch (error) {
        console.error("Error fetching celebrity:", error);
      }
    };

    const debounceTimer = setTimeout(() => {
      celebrityName && handleFetchCelebrity();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [celebrityName]);

  return (
    <>
      <button
        style={globalStyles.backButton}
        onClick={() => dispatch(userActions.setNetWorth(null))}
      >
        Back
      </button>
      <div style={globalStyles.container}>
        <input
          type="text"
          value={celebrityName}
          onChange={(e) => setCelebrityName(e.target.value)}
        />
        {celebrityData && (
          <div style={styles.celebrityList}>
            {celebrityData.map((celebrity, index) => (
              <button
                style={{
                  ...styles.celebrityListItem,
                }}
                key={index}
                onClick={() => handleCelebrityClick(celebrity)}
              >
                <p style={{ margin: 5 }}>{formatName(celebrity.name)}</p>
                <p style={{ margin: 5 }}>
                  {formatCurrency(celebrity.net_worth)}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CelebrityPicker;
