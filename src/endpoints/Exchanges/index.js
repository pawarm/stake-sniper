import { getCCXTBalances, getCCXTDataFromAPI } from "API/Exchanges/CCXT";
import { getBinanceBalances, getBinanceDataFromAPI } from "./Binance";

const getExchangesBalances = (exchange, APIKey, secret) => {
  switch (exchange) {
    case "binance":
      return getBinanceDataFromAPI(APIKey, secret).then((result) =>
        getBinanceBalances(result)
      );
    default:
      return getCCXTDataFromAPI(exchange, APIKey, secret).then((result) =>
        getCCXTBalances(result)
      );
  }
};

export default getExchangesBalances;
