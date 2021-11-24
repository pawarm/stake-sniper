import axios from 'axios';
import { CoinMarketCapResponse } from 'types/coin-market-cap';

export const getCMCCurrenciesMapDataFromAPI = async () => {
  return await axios.get<CoinMarketCapResponse>(
    'https://coin-slate.herokuapp.com/cmc/cryptocurrency/map'
  );
};

export const getCMCCurrenciesMap = async () => {
  const result = await getCMCCurrenciesMapDataFromAPI();
  if (result.data.status.error_code === 0) {
    return result.data.data;
  }
};
