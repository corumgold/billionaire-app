export function formatCurrency(amount: number): string {
  let formattedAmount: string;

  const formatOptions = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  };

  if (Math.abs(amount) >= 1e15) {
    formatOptions.maximumFractionDigits = 0;
    formattedAmount =
      new Intl.NumberFormat("en-US", formatOptions).format(amount / 1e15) +
      " Quadrillion";
  } else if (Math.abs(amount) >= 1e12) {
    formatOptions.maximumFractionDigits = 0;
    formattedAmount =
      new Intl.NumberFormat("en-US", formatOptions).format(amount / 1e12) +
      " Trillion";
  } else if (Math.abs(amount) >= 1e9) {
    formatOptions.maximumFractionDigits = 0;
    formattedAmount = new Intl.NumberFormat("en-US", formatOptions).format(amount / 1e9) +
      " Billion";
  } else if (Math.abs(amount) >= 1e6) {
    formatOptions.maximumFractionDigits = 0;
    formattedAmount = new Intl.NumberFormat("en-US", formatOptions).format(amount / 1e6) +
      " Million";
  } else {
    const decimalPlaces = Math.abs(amount) < 1 ? 2 : 0;

    formattedAmount = new Intl.NumberFormat("en-US", {
      ...formatOptions,
      minimumFractionDigits: decimalPlaces,
    }).format(amount);
  }
  
  if (formattedAmount.includes(".00")) {
    formattedAmount = formattedAmount.replace(".00", "");
  }

  return formattedAmount;
}



export function formatName(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatOccupation(occupation: string[]): string {
  if (occupation) {
    const firstThreeOccupations = occupation.slice(0, 3);

    return firstThreeOccupations
      .map((word) => {
        const formattedWord = word.replace(/_/g, " ");
        return formattedWord[0].toUpperCase() + formattedWord.slice(1);
      })
      .join(", ");
  } else {
    return "";
  }
}

export function getEmotionalImpactNumber(
  largerNetWorth: number | null,
  smallerNetWorth: number | null,
  itemPrice: number | null,
  personalOrCeleb: "personal" | "celebrity"
): number | string | null {
  if (!largerNetWorth || !smallerNetWorth || !itemPrice || !personalOrCeleb) {
    return null;
  }

  if (smallerNetWorth <= 0) {
    smallerNetWorth = 1;
  }

  const netWorthRatio = largerNetWorth / smallerNetWorth;

  if (personalOrCeleb === "personal") {
    const emotionalImpactNumber = itemPrice / netWorthRatio;
    console.log(emotionalImpactNumber)
    if (emotionalImpactNumber < 0.01) {
      return "less than a penny";
    } else return formatCurrency(emotionalImpactNumber);
  } else {
    const emotionalImpactNumber = itemPrice * netWorthRatio;
    return formatCurrency(emotionalImpactNumber);
  }
}
