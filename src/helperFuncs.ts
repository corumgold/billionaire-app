export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatName(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export function getNetWorthRatio(
  largerNetWorth: number | null,
  smallerNetWorth: number | null
): number | null {
  if (!largerNetWorth || !smallerNetWorth) {
    return null;
  }

  if (smallerNetWorth <= 0) {
    smallerNetWorth = 1;
  }
  return largerNetWorth / smallerNetWorth;
}
