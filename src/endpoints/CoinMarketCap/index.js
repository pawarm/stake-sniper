import axios from "axios";

export const getCMCCurrenciesMapDataFromAPI = async () => {
  try {
    const url =
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=";
    const res = await axios.get(url);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getCMCCurrenciesMap = async () => {
  const resultPromise = getCMCCurrenciesMapDataFromAPI();
  return resultPromise.then((result) => {
    if (result.data.status.error_code !== 0) {
      return {};
    } else {
      return result.data.data;
    }
  });
};

export const getCMCCurrenciesInfoDataFromAPI = async (coins) => {
  try {
    const url =
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?CMC_PRO_API_KEY=" +
      "&id=" +
      coins;
    const res = await axios.get(url);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getCMCCurrenciesInfo = async (coins) => {
  const res = {};
  coins.forEach((id) => {
    res[id] = {};
  });
  return getCMCCurrenciesInfoDataFromAPI(coins).then((result) => {
    const coinsData = result.data.data;
    Object.keys(coinsData).forEach((coin) => {
      res[coin].logo = coinsData[coin].logo;
    });
    return res;
  });
};

export const getCMCCurrenciesPricesDataFromAPI = async (coins, convert) => {
  try {
    const url =
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=" +
      "&id=" +
      coins +
      "&convert=" +
      convert;
    const res = await axios.get(url);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getCMCCurrenciesPrices = async (coins, convert) => {
  const res = {};
  coins.forEach((id) => {
    res[id] = {};
  });
  return getCMCCurrenciesPricesDataFromAPI(coins, convert).then((result) => {
    const coinsData = result.data.data;
    Object.keys(coinsData).forEach((coin) => {
      res[coin].symbol = coinsData[coin].symbol;
      res[coin].name = coinsData[coin].name;
      res[coin].rank = coinsData[coin].cmc_rank;
      res[coin].price = coinsData[coin].quote[convert].price;
      res[coin].percentChange =
        coinsData[coin].quote[convert].percent_change_24h;
    });
    return res;
  });
};
