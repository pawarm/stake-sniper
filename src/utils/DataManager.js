import supportedCurrencyAddresses from "utils/SupportedCurrencyAddresses";
import getCurrencyBalances from "API/Currencies";
import ls from "local-storage";
import supportedExchanges from "utils/SupportedExchanges";
import getExchangesBalances from "API/Exchanges";
import {
  getCMCCurrenciesInfo,
  getCMCCurrenciesMap,
  getCMCCurrenciesPrices,
} from "API/CoinMarketCap";

const addBalance = (prevBalances, newCurrency) => {
  const allBalancesCopy = prevBalances.filter(
    (currency) =>
      newCurrency.symbol !== currency.symbol ||
      newCurrency.origin !== currency.origin ||
      newCurrency.origin_details !== currency.origin_details ||
      newCurrency.balance_state !== currency.balance_state
  );
  allBalancesCopy.push(newCurrency);
  return allBalancesCopy;
};

export const addBalances = (prevBalances, newCurrencies) => {
  var allBalancesCopy = prevBalances;
  for (const key in newCurrencies) {
    allBalancesCopy = addBalance(allBalancesCopy, newCurrencies[key]);
  }
  return allBalancesCopy;
};

export const addCurrency = (prevCurrencies, newCurrencies) => {
  const allCurrenciesCopy = prevCurrencies;
  Object.keys(newCurrencies).forEach((currency) => {
    if (!allCurrenciesCopy[currency]) allCurrenciesCopy[currency] = {};
    Object.keys(newCurrencies[currency]).forEach((key) => {
      allCurrenciesCopy[currency][key] = newCurrencies[currency][key];
    });
  });
  return allCurrenciesCopy;
};

const getCurrenciesFromAddresses = async () => {
  const promises = await Promise.all(
    supportedCurrencyAddresses.map(async (currency) => {
      if (ls.get(currency.value + "Addresses")) {
        const addresses = ls.get(currency.value + "Addresses");
        const addressesPromises = await Promise.all(
          addresses.map((address) =>
            getCurrencyBalances(currency.value, address)
          )
        );
        return addressesPromises.flat();
      }
      return [];
    })
  );
  return promises.flat();
};

const getCurrenciesFromExchanges = async () => {
  const promises = await Promise.all(
    supportedExchanges.map(async (exchange) => {
      if (
        ls.get(exchange.value + "APIKey") &&
        ls.get(exchange.value + "Secret")
      ) {
        const APIKey = ls.get(exchange.value + "APIKey");
        const secret = ls.get(exchange.value + "Secret");
        const exchangePromise = await getExchangesBalances(
          exchange.value,
          APIKey,
          secret
        );
        return exchangePromise.flat();
      }
      return [];
    })
  );
  return promises.flat();
};

export const getCurrencyIdFromMap = (balance, currencyMap) => {
  const fixedSymbols = ls.get("FixedSymbols") || {};
  for (const [symbol, id] of Object.entries(fixedSymbols)) {
    if (balance.symbol === symbol) {
      return id;
    }
  }
  for (const currency of currencyMap) {
    if (balance.symbol === currency.symbol) {
      return currency.id;
    }
  }
};

export const rerender = async (
  setCMCCurrencyMap,
  addToBalances,
  addToCurrencies
) => {
  const lastUpdated = ls.get("lastUpdated") || 0;
  const shouldDownload = lastUpdated + 600 * 1000 < Date.now();
  var currencyMap = [];
  var addressesBalances = [];
  var exchangesBalances = [];
  var tmpAllBalances = [];
  if (!shouldDownload && ls.get("CMCCurrencyMap")) {
    currencyMap = ls.get("CMCCurrencyMap");
    setCMCCurrencyMap(currencyMap);
  } else {
    currencyMap = await getCMCCurrenciesMap();
    ls.set("CMCCurrencyMap", currencyMap);
    setCMCCurrencyMap(currencyMap);
  }

  if (!shouldDownload && ls.get("AddressesBalances")) {
    addressesBalances = ls.get("AddressesBalances");
    addToBalances(addressesBalances);
  } else {
    addressesBalances = await getCurrenciesFromAddresses();
    ls.set("AddressesBalances", addressesBalances);
    addToBalances(addressesBalances);
  }
  tmpAllBalances = tmpAllBalances.concat(addressesBalances);

  if (!shouldDownload && ls.get("ExchangesBalances")) {
    exchangesBalances = ls.get("ExchangesBalances");
    addToBalances(exchangesBalances);
  } else {
    exchangesBalances = await getCurrenciesFromExchanges();
    ls.set("ExchangesBalances", exchangesBalances);
    addToBalances(exchangesBalances);
  }
  tmpAllBalances = tmpAllBalances.concat(exchangesBalances);

  const currenciesIds = {};
  tmpAllBalances.forEach((balance) => {
    const id = getCurrencyIdFromMap(balance, currencyMap);
    if (id) {
      currenciesIds[id] = {};
    }
  });
  if (Object.keys(currenciesIds).length) {
    var prices = {};
    if (!shouldDownload && ls.get("CMCCurrenciesPrices")) {
      prices = ls.get("CMCCurrenciesPrices");
      addToCurrencies({ ...prices });
    } else {
      prices = await getCMCCurrenciesPrices(Object.keys(currenciesIds), "PLN");
      ls.set("CMCCurrenciesPrices", prices);
      addToCurrencies(prices);
    }

    var info = {};

    if (!shouldDownload && ls.get("CMCCurrenciesInfo")) {
      info = ls.get("CMCCurrenciesInfo");
      addToCurrencies(info);
    } else {
      info = await getCMCCurrenciesInfo(Object.keys(currenciesIds));
      ls.set("CMCCurrenciesInfo", info);
      addToCurrencies(info);
    }
  }

  ls.set("lastUpdated", Date.now());
};
