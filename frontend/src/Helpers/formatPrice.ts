export default function formatPrice(amount: number) {
  const parts = String(amount).split(".");
  let integerPart = parts[0];
  const decimalPart = parts[1] || "";

  const regex = /(\d+)(\d{3})/;
  while (regex.test(integerPart)) {
    integerPart = integerPart.replace(regex, "$1 $2");
  }

  if (decimalPart.length === 0) {
    return integerPart;
  }

  return `${integerPart}.${decimalPart}`;
}
