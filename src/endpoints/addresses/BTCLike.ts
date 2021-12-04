import axios from 'axios';
import { AddresesBalances, Balance } from 'types/balance';
import { BlockchairResponse } from 'types/blockchair';
import { BlockchairBTCLikeData } from 'types/blockchair/BTCLike';
import { getBalanceByDecimals } from 'utils/helper-functions';
import { supportedCurrencyAddressesSymbols } from 'utils/SupportedCurrencyAddresses';

const BTCLikeCurrencyMap = (symbol: string) => {
  switch (symbol) {
    case 'BTC':
      return 'bitcoin';
    case 'BCH':
      return 'bitcoin-cash';
    case 'LTC':
      return 'litecoin';
    case 'BSV':
      return 'bitcoin-sv';
    case 'DOGE':
      return 'dogecoin';
    case 'DASH':
      return 'dash';
    case 'GRS':
      return 'groestlcoin';
    case 'ZEC':
      return 'zcash';
    case 'XEC':
      return 'ecash';
    default:
      return undefined;
  }
};

export async function getBTCLikeDataFromAPI(address: string, name: string) {
  return await axios.get<BlockchairResponse>(
    'https://api.blockchair.com/' + name + '/dashboards/address/' + address
  );
}
export const getBTCLikeBalancesFromAPI = async (
  addresses: string[],
  symbol: supportedCurrencyAddressesSymbols
) => {
  const name = BTCLikeCurrencyMap(symbol);
  if (!name) return;
  var balances: AddresesBalances = {};
  const resolvedData = await Promise.all(
    addresses.map((address) => getBTCLikeDataFromAPI(address, name))
  );
  resolvedData.forEach((response) => {
    if (response.data) {
      const responseData = response.data.data as BlockchairBTCLikeData;
      const addresses = Object.keys(responseData);
      addresses.forEach((address) => {
        const quote = getBalanceByDecimals(
          responseData[address].address.balance.toString(),
          8
        );
        const balance: Balance = {
          symbol: symbol,
          balance: quote,
          balance_state: 'available'
        };
        balances[address] = [balance];
      });
    }
  });
  return balances;
};
