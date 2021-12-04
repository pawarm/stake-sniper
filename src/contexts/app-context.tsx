import {
  FC,
  useContext,
  createContext,
  useEffect,
  useState,
  useMemo
} from 'react';
import { AllBalances } from '../types/balance';
import { getAddressesFromLS } from 'utils/helper-functions';
import { useCMCMap } from 'endpoints/coin-market-cap';
import { CoinMarketCapMapItem } from 'types/coin-market-cap';
import supportedCurrencyAddresses from 'utils/SupportedCurrencyAddresses';

interface AppStateContext {
  CMCMap: CoinMarketCapMapItem[];
  balances: AllBalances;
}

const initialState: AppStateContext = {
  CMCMap: [],
  balances: {
    addresses: {},
    exchanges: {},
    manual: {}
  }
};

const appStateContext = createContext<AppStateContext>(initialState);
const useAppStateContext = (): AppStateContext => useContext(appStateContext);
const { Provider, Consumer: AppStateConsumer } = appStateContext;

const AppStateProvider: FC = ({ children }) => {
  const [balances, setBalances] = useState<AllBalances>({
    addresses: {},
    exchanges: {},
    manual: {}
  });
  const CMCMap = useCMCMap();
  const currencyAddresses = useMemo(
    () =>
      supportedCurrencyAddresses.map((currency) => ({
        ...currency,
        addresses: getAddressesFromLS(currency.value)
      })),
    []
  );

  useEffect(() => {
    currencyAddresses.forEach((currency) => {
      currency
        .balanceFunction(currency.addresses, currency.value)
        .then((addressesBalances) => {
          setBalances((prev) => ({
            ...prev,
            addresses: { ...prev.addresses, ...addressesBalances }
          }));
        });
    });
  }, [currencyAddresses]);

  const value = {
    CMCMap,
    balances
  };

  return <Provider value={value}>{children}</Provider>;
};

export { AppStateProvider, useAppStateContext, AppStateConsumer };
