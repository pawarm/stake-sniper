import axios from 'axios';
import { CoinMarketCapResponse } from 'types/coin-market-cap';

export const getCMCCurrenciesMapDataFromAPI = async () => {
  try {
    return await axios.get<CoinMarketCapResponse>(
      'https://coin-slate.herokuapp.com/cmc/cryptocurrency/map'
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
