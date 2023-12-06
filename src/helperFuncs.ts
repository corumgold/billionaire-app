export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
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
