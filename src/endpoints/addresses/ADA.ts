import axios from 'axios';
import { AddresesBalances, Balance } from 'types/balance';
import { getBalanceByDecimals } from 'utils/helper-functions';
import { BlockchairADAData } from 'types/blockchair/ADA';
import { BlockchairResponse } from 'types/blockchair';

export const getADADataFromAPI = async (address: string) => {
  return await axios.get<BlockchairResponse>(
    'https://api.blockchair.com/cardano/raw/address/' + address
  );
};

export const getADABalanceFromAPI = async (addresses: string[]) => {
  var balances: AddresesBalances = {};
  const resolvedData = await Promise.all(
    addresses.map((address) => getADADataFromAPI(address))
  );
  resolvedData.forEach((response) => {
    if (response.data) {
      const responseData = response.data.data as BlockchairADAData;
      const addresses = Object.keys(responseData);
      addresses.forEach((address) => {
        const quote = getBalanceByDecimals(
          responseData[address].address.caBalance.getCoin,
          8
        );
        const balance: Balance = {
          symbol: 'ADA',
          balance: quote,
          balance_state: 'available'
        };
        balances[address] = [balance];
      });
    }
  });
  return balances;
};
