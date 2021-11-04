import axios from "axios";
import { useEffect, useState } from "react";
import { Balance } from "shared-types/balance";
import { ADAAddressesExpireTime, refreshRate } from "utils/constants";
import { getBalanceByDecimals } from "utils/getBalanceByDecimals";
import { BlockchairADAData } from "./response-types/ADA";
import { BlockchairResponse } from "./response-types/blockchair";

export const useADABalance = (addresses: string[]) => {
  const [balances, setBalances] = useState<Balance[]>([]);
  const [update, setUpdate] = useState<boolean>(true);
  const triggerUpdate = () => {
    setUpdate(!update);
    setTimeout(() => triggerUpdate(), refreshRate);
  };
  useEffect(() => triggerUpdate(), []);

  const getADADataFromAPI = async (address: string) => {
    return await axios.get<BlockchairResponse>(
      "https://api.blockchair.com/cardano/raw/address/" + address
    );
  };

  const getADABalanceFromAPI = async () => {
    const resolvedBalances = await Promise.all(
      addresses.map(async (address) => {
        const response = await getADADataFromAPI(address);
        if (response.data) {
          const responseData = response.data.data as BlockchairADAData;
          const balance = getBalanceByDecimals(
            responseData[address].address.caBalance.getCoin,
            8
          );
          const ret = {
            symbol: "ADA",
            origin: "address",
            origin_details: address,
            balance: balance,
            balance_state: "available",
            last_update: Date.now(),
          } as Balance;
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

  useEffect(() => {
    if (!addresses.length) return;
    const localbalances = JSON.parse(
      localStorage.getItem("ADAAddressesBalances") || "[]"
    ) as Balance[];
    if (
      !localbalances.length ||
      localbalances.some(
        (balance) => Date.now() - balance.last_update > ADAAddressesExpireTime
      )
    ) {
      getADABalanceFromAPI().then((newBalances) => {
        if (newBalances) {
          setBalances(newBalances);
          localStorage.setItem(
            "ADAAddressesBalances",
            JSON.stringify(newBalances)
          );
        }
      });
    } else {
      setBalances(localbalances);
    }
  }, [addresses, update]);

  return balances;
};
