import { getADABalanceFromAPI } from 'endpoints/addresses/ADA';
import { useAddressesBalance } from 'endpoints/addresses';
import { FC, useContext, createContext, useReducer, useEffect } from 'react';
import { Balance } from 'shared-types/balance';
import { getAddressesFromLS } from 'utils/helper-functions';
import { useCMCMap } from 'endpoints/coin-market-cap';
import { CoinMarketCapMapItem } from 'endpoints/coin-market-cap/responses/cryptocurrency-map';

interface AppStateContext {
  CMCMap: CoinMarketCapMapItem[];
  balances: Balance[];
}

const initialState: AppStateContext = {
  CMCMap: [],
  balances: []
};

const appStateContext = createContext<AppStateContext>(initialState);
const useAppStateContext = (): AppStateContext => useContext(appStateContext);
const { Provider, Consumer: AppStateConsumer } = appStateContext;

const AppStateProvider: FC = ({ children }) => {
  const CMCMap = useCMCMap();
  // const ADAAddresses = getAddressesFromLS('ADA');

  const [balances, addToBalances] = useReducer(
    (prevBalances: Balance[], newCurrencies: Balance[]) =>
      prevBalances.concat(newCurrencies),
    []
  );
  // const ADAAddressesBalances = useAddressesBalance(
  //   getADABalanceFromAPI,
  //   'ADA',
  //   ADAAddresses
  // );
  // useEffect(() => {
  //   // if (ADAAddressesBalances.length) addToBalances(ADAAddressesBalances);
  // }, [ADAAddressesBalances]);

  const value = {
    CMCMap,
    balances
  };

  return <Provider value={value}>{children}</Provider>;
};

export { AppStateProvider, useAppStateContext, AppStateConsumer };
