import ccxt from "ccxt";
import BinanceLDTokenMap from "utils/BinanceLDTokensMap";

export async function getBinanceDataFromAPI(APIKey, secret) {
  try {
    var binanceObj = new ccxt.binance();
    binanceObj.apiKey = APIKey;
    binanceObj.secret = secret;
    binanceObj.enableRateLimit = true;
    return binanceObj;
  } catch (error) {
    console.error(error);
  }
}

export const getBinanceBalances = (binanceObj) => {
  return binanceObj.fetchBalance().then((balances) => {
    return Object.keys(balances)
      .map((key) => {
        var symbol = key;
        var staked = "";
        if (Object.keys(BinanceLDTokenMap).includes(key)) {
          symbol = BinanceLDTokenMap[key];
          staked = "staked ";
        }
        const used = balances[key].used
          ? [
              {
                symbol: symbol,
                origin: "exchange",
                origin_details: "binance",
                balance: balances[key].used,
                balance_state: staked + "used",
                state: "fulfilled",
                last_update: Date.now(),
              },
            ]
          : [];
        const free = balances[key].free
          ? [
              {
                symbol: symbol,
                origin: "exchange",
                origin_details: "binance",
                balance: balances[key].free,
                balance_state: staked + "available",
                state: "fulfilled",
                last_update: Date.now(),
              },
            ]
          : [];
        return used.concat(free);
      })
      .flat();
  });
};
