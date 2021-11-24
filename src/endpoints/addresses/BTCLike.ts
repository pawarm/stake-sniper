import axios from 'axios';
import { Balance } from 'types/balance';
import { BlockchairResponse } from 'types/blockchair';
import { BlockchairBTCLikeData } from 'types/blockchair/BTCLike';
import { getBalanceByDecimals } from 'utils/helper-functions';
type BTCLikeCurrencySymbol =
  | 'BTC'
  | 'BCH'
  | 'LTC'
  | 'BSV'
  | 'DOGE'
  | 'DASH'
  | 'GRS'
  | 'ZEC'
  | 'XEC';

const BTCLikeCurrencyMap = {
  BTC: 'bitcoin',
  BCH: 'bitcoin-cash',
  LTC: 'litecoin',
  BSV: 'bitcoin-sv',
  DOGE: 'dogecoin',
  DASH: 'dash',
  GRS: 'groestlcoin',
  ZEC: 'zcash',
  XEC: 'ecash'
};

export async function getBTCLikeDataFromAPI(address: string, name: string) {
  return await axios.get<BlockchairResponse>(
    'https://api.blockchair.com/' + name + '/dashboards/address/' + address
  );
}
export const getBTCLikeBalancesFromAPI = async (
  addresses: string[],
  symbol: BTCLikeCurrencySymbol
) => {
  const resolvedBalances = await Promise.all(
    addresses.map(async (address) => {
      const response = await getBTCLikeDataFromAPI(
        address,
        BTCLikeCurrencyMap[symbol]
      );
      if (response.data) {
        const responseData = response.data.data as BlockchairBTCLikeData;
        const balance = getBalanceByDecimals(
          responseData[address].address.balance.toString(),
          8
        );
        const ret: Balance = {
          symbol: symbol,
          origin: 'address',
          origin_details: address,
          balance: balance,
          balance_state: 'available',
          last_update: Date.now()
        };
        return ret;
      }
    })
  );
  const finalBalances: Balance[] = [];
  resolvedBalances.forEach((balance) => {
    if (balance) finalBalances.push(balance);
  });
  return finalBalances;
};
