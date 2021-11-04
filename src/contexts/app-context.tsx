import { useADABalance } from "endpoints/addresses/ADA";
import { useAddresses } from "endpoints/addresses/addresses";
import React from "react";
import {
  FC,
  useContext,
  createContext,
  useReducer,
  useEffect,
  useMemo,
} from "react";
import { Balance } from "shared-types/balance";

interface AppStateContext {
  balances: Balance[];
}

const initialState: AppStateContext = {
  balances: [],
};

const appStateContext = createContext<AppStateContext>(initialState);
const useAppStateContext = (): AppStateContext => useContext(appStateContext);
const { Provider, Consumer: AppStateConsumer } = appStateContext;

const AppStateProvider: FC = ({ children }) => {
  const ADAAddresses = useAddresses("ADA");
  const addBalance = (prevBalances: Balance[], newCurrency: Balance) => {
    const allBalancesCopy = prevBalances.filter(
      (currency) =>
        newCurrency.symbol !== currency.symbol ||
        newCurrency.origin !== currency.origin ||
        newCurrency.origin_details !== currency.origin_details ||
        newCurrency.balance_state !== currency.balance_state
    );
    allBalancesCopy.push(newCurrency);
    return allBalancesCopy;
  };

  const addBalances = (prevBalances: Balance[], newCurrencies: Balance[]) => {
    var allBalancesCopy = prevBalances;
    for (const key in newCurrencies) {
      allBalancesCopy = addBalance(allBalancesCopy, newCurrencies[key]);
    }
    return allBalancesCopy;
  };

  const [balances, addToBalances] = useReducer(addBalances, []);
  const ADAAddressesBalances = useADABalance(ADAAddresses);
  useEffect(() => {
    // console.log(ADAAddressesBalances);
    if (ADAAddressesBalances.length) addToBalances(ADAAddressesBalances);
  }, [ADAAddressesBalances]);

  const value = {
    balances,
  };

  return <Provider value={value}>{children}</Provider>;
};

export { AppStateProvider, useAppStateContext, AppStateConsumer };
