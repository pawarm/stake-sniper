import { useEffect, useState } from 'react';
import { Balance } from 'types/balance';
import { AddressesExpireTime, refreshRate } from 'utils/constants';

export const useAddressesBalance = (
  getBalanceFromAPI: (addresses: string[]) => Promise<Balance[]>,
  currency: Balance['symbol'],
  addresses: string[]
) => {
  const [balances, setBalances] = useState<Balance[]>([]);
  const [update, setUpdate] = useState<boolean>(true);
  const triggerUpdate = () => {
    setUpdate(!update);
    setTimeout(() => triggerUpdate(), refreshRate);
  };
  useEffect(() => triggerUpdate(), []);

  useEffect(() => {
    if (!addresses.length) return;
    getBalanceFromAPI(addresses).then((newBalances) => {
      if (newBalances) {
        setBalances(newBalances);
      }
    });
  }, [addresses, update]);

  return balances;
};
