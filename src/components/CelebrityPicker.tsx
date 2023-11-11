import React, { useState } from "react";

const apiKey = import.meta.env.VITE_CELEBRITY_API_KEY;

const CelebrityPicker: React.FC = () => {
  const [celebrityName, setCelebrityName] = useState<string>(""); // State to store the selected celebrity name
  const [celebrityData, setCelebrityData] = useState<any | null>(null); // State to store the API response

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
      setCelebrityData(result);
      console.log(result);
    } catch (error) {
      console.error("Error fetching celebrity:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={celebrityName}
        onChange={(e) => setCelebrityName(e.target.value)}
      />
      <button onClick={handleFetchCelebrity}>Fetch Celebrity</button>

      {celebrityData && (
        <div>
          {/* Display celebrity data as needed */}
          <p>Name: {celebrityData[0].name}</p>
          <p>Net Worth: {celebrityData[0].net_worth}</p>
          {/* Add other relevant information */}
        </div>
      )}
    </div>
  );
};

export default CelebrityPicker;
