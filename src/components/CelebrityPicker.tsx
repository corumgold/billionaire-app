import React, { useState, useEffect } from "react";
import { formatCurrency, formatName, formatOccupation } from "../helperFuncs";
import { useDispatch } from "react-redux";
import { actions as celebrityActions } from "../store/celebritySlice";
import { actions as userActions } from "../store/userSlice";
import globalStyles from "../theme/globalStyles";

const apiKey = import.meta.env.VITE_CELEBRITY_API_KEY;

const CelebrityPicker: React.FC = () => {
  const [celebrityName, setCelebrityName] = useState<string>("");
  const [celebrityData, setCelebrityData] = useState<
    { name: string; net_worth: number; occupation: string[] }[] | null
  >(null);

  const dispatch = useDispatch();

  const handleCelebrityClick = (selectedCelebrity: {
    name: string;
    net_worth: number;
    occupation: string[];
  }) => {
    dispatch(celebrityActions.setCelebrity(selectedCelebrity));
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
        <div style={globalStyles.list}>
          {celebrityData?.map((celebrity, index) => (
            <button
              style={{
                ...globalStyles.listItem,
              }}
              key={index}
              onClick={() => handleCelebrityClick(celebrity)}
            >
              <h3>{formatName(celebrity.name)}</h3>
              <p>{formatCurrency(celebrity.net_worth)}</p>
              <p>{formatOccupation(celebrity.occupation)}</p>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default CelebrityPicker;
