import React, { useState, useEffect } from "react";
import { formatCurrency, formatName } from "../helperFuncs";
import { useDispatch } from "react-redux";
import { actions } from "../store/celebritySlice";

const apiKey = import.meta.env.VITE_CELEBRITY_API_KEY;

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
    dispatch(actions.setCelebrityName(selectedCelebrity.name));
    dispatch(actions.setCelebrityNetWorth(selectedCelebrity.net_worth));
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
    <div>
      <h2>Please Select a Celebrity</h2>
      <input
        type="text"
        value={celebrityName}
        onChange={(e) => setCelebrityName(e.target.value)}
      />
      {celebrityData && (
        <div>
          {celebrityData.map((celebrity, index) => (
            <div key={index} onClick={() => handleCelebrityClick(celebrity)}>
              <p>Name: {formatName(celebrity.name)}</p>
              <p>Net Worth: {formatCurrency(celebrity.net_worth)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CelebrityPicker;