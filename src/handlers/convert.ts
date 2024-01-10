import { APIGatewayProxyEventV2, Handler } from "aws-lambda";
import { Currency } from "../types/currency";
import { getRates } from "../helpers/rates";

type Event = {
  baseCurrency?: Currency;
  targetCurrencies?: Currency[];
  amount?: number;
};

export const handler: Handler<APIGatewayProxyEventV2> = async (event) => {
  const { baseCurrency, targetCurrencies, amount } = JSON.parse(
    event.body ?? "{}"
  ) as Event;

  if (
    !baseCurrency ||
    !targetCurrencies ||
    targetCurrencies.length <= 0 ||
    !amount
  ) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Missing required parameters",
      }),
    };
  }

  try {
    const rates = await getRates(baseCurrency, targetCurrencies);

    const convertedAmounts = targetCurrencies.map((curr) => ({
      currency: curr,
      amount: amount * rates[curr],
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(convertedAmounts),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal server error",
      }),
    };
  }
};
