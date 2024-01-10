import { type Currency, SUPPORTED_CURRENCIES } from "../types/currency";

export const API_URL = "https://api.freecurrencyapi.com/v1/latest";
export const API_KEY = process.env.FREE_CURRENCY_API_KEY;

export async function getRates(
  baseCurrency: Currency,
  targetCurrencies: Currency[]
) {
  if (!SUPPORTED_CURRENCIES.includes(baseCurrency)) {
    throw new Error(`Unsupported currency: ${baseCurrency}`);
  } else if (
    !targetCurrencies.every((curr) => SUPPORTED_CURRENCIES.includes(curr))
  ) {
    throw new Error(`Unsupported currency: ${targetCurrencies}`);
  }

  const url = `${API_URL}?apikey=${API_KEY}&base_currency=${baseCurrency}&currencies=${targetCurrencies.join(
    ","
  )}`;

  const response = await fetch(url);
  const data = await response.json();

  return data.data;
}

export function convert(amount: number, rate: number) {
  return amount * rate;
}