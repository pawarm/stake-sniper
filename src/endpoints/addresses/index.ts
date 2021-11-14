import { useEffect, useState } from 'react';
import { Balance } from 'shared-types/balance';
import { AddressesExpireTime, refreshRate } from 'utils/constants';
import {
  getAddressesBalancesFromLS,
  setAddressesBalancesInLS
} from 'utils/helper-functions';

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
    const localbalances = getAddressesBalancesFromLS(currency);
    if (
      !localbalances.length ||
      localbalances.some(
        (balance) =>
          Date.now() - balance.last_update > AddressesExpireTime[currency]
      )
    ) {
      getBalanceFromAPI(addresses).then((newBalances) => {
        if (newBalances) {
          setBalances(newBalances);
          setAddressesBalancesInLS(newBalances);
        }
      });
    } else {
      setBalances(localbalances);
    }
  }, [addresses, update]);

  return balances;
};
