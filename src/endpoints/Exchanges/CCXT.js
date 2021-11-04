import ccxt from "ccxt";

export async function getCCXTDataFromAPI(exchange, APIKey, secret) {
  try {
    var exchangeObj = new ccxt[exchange]();
    exchangeObj.apiKey = APIKey;
    exchangeObj.secret = secret;
    exchangeObj.enableRateLimit = true;
    return exchangeObj;
  } catch (error) {
    console.error(error);
  }
}

export const getCCXTBalances = (exchangeObj) => {
  return exchangeObj.fetchBalance().then((balances) => {
    return Object.keys(balances)
      .map((key) => {
        const used = balances[key].used
          ? [
              {
                symbol: key,
                origin: "exchange",
                origin_details: exchangeObj.name,
                balance: balances[key].used,
                balance_state: "used",
                state: "fulfilled",
                last_update: Date.now(),
              },
            ]
          : [];
        const free = balances[key].free
          ? [
              {
                symbol: key,
                origin: "exchange",
                origin_details: exchangeObj.name,
                balance: balances[key].free,
                balance_state: "available",
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
