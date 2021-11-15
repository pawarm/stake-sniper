import axios from 'axios';
import { CoinMarketCapResponse } from '../../../types/coin-market-cap';

export const getCMCCurrenciesMapDataFromAPI = async () => {
  try {
    return await axios.get<CoinMarketCapResponse>(
      'https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY='
    );
  } catch (error) {
    console.error(error);
  }
};

export const getCMCCurrenciesMap = async () => {
  const result = await getCMCCurrenciesMapDataFromAPI();
  if (result?.data.status.error_code === 0) {
    return result.data.data;
  }
};
