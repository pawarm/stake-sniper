import axios from 'axios';
import { Balance } from '@custom-types/balance';
import { getBalanceByDecimals } from 'utils/helper-functions';
import { BlockchairADAData } from '@custom-types/blockchair/ADA';
import { BlockchairResponse } from '@custom-types/blockchair';

export const getADADataFromAPI = async (address: string) => {
  return await axios.get<BlockchairResponse>(
    'https://api.blockchair.com/cardano/raw/address/' + address
  );
};

export const getADABalanceFromAPI = async (addresses: string[]) => {
  const resolvedBalances = await Promise.all(
    addresses.map(async (address) => {
      const response = await getADADataFromAPI(address);
      if (response.data) {
        const responseData = response.data.data as BlockchairADAData;
        const balance = getBalanceByDecimals(
          responseData[address].address.caBalance.getCoin,
          8
        );
        const ret: Balance = {
          symbol: 'ADA',
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
