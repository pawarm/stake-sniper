import { CoinMarketCapMapItem } from '@custom-types/coin-market-cap';
import { Balance } from '@custom-types/balance';

export const getBalanceByDecimals = (balance: string, decimals: number) => {
  var numBalance = parseFloat(balance);
  for (let i = decimals; i > 0; i--) numBalance /= 10;
  return numBalance;
};

export const getCMCMapFromLS = () =>
  JSON.parse(
    localStorage.getItem('CMCCurrencyMap') || '[]'
  ) as CoinMarketCapMapItem[];

export const setCMCMapInLS = (map: CoinMarketCapMapItem[]) =>
  localStorage.setItem('CMCCurrencyMap', JSON.stringify(map));

export const getAddressesFromLS = (currency: string) =>
  JSON.parse(localStorage.getItem(currency + 'Addresses') || '[]') as string[];

export const getAddressesBalancesFromLS = (currency: string) =>
  JSON.parse(
    localStorage.getItem(currency + 'AddressesBalances') || '[]'
  ) as Balance[];

export const setAddressesBalancesInLS = (balances: Balance[]) =>
  localStorage.setItem(
    balances[0].symbol + 'AddressesBalances',
    JSON.stringify(balances)
  );
