export function formatCurrency(amount: number): string {
  let formattedAmount: string;

  if (Math.abs(amount) >= 1e15) {
    formattedAmount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(amount / 1e15) + " Quadrillion";
  } else if (Math.abs(amount) >= 1e12) {
    formattedAmount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(amount / 1e12) + " Trillion";
  } else if (Math.abs(amount) >= 1e9) {
    formattedAmount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(amount / 1e9) + " Billion";
  } else if (Math.abs(amount) >= 1e6) {
    formattedAmount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(amount / 1e6) + " Million";
  } else {
    formattedAmount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
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
    if (emotionalImpactNumber < 0.01) {
      return "less than a penny";
    } else return formatCurrency(emotionalImpactNumber);
  } else {
    const emotionalImpactNumber = itemPrice * netWorthRatio;
    return formatCurrency(emotionalImpactNumber);
  }
}
