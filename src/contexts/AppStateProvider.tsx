import {
    FC,
    useState,
    useEffect,
    useMemo,
    ReactNode,
  } from 'react';
import { appStateContext, initialState } from './AppStateContext';
import { StrideHostZoneData, getStrideRedemptionRate, strideHostZoneDataRequest } from '../api/stride';
import { OsmosisPoolData, getOsmosisPoolRate, osmosisPoolDataRequest } from '../api/osmosis';
import { tokens } from '../constants/tokens';
import { PairCardData } from '../components/PairCard';
  

const { Provider } = appStateContext;
const AppStateProvider: FC<{ children: ReactNode }> = ({ children: _children }) => {
  const [strideHostZoneData, setStrideHostZoneData] = useState<StrideHostZoneData>();
  const [osmosisPoolsData, setOsmosisPoolsData] = useState<{[pool: string]: OsmosisPoolData} >({});
  const [cardsData, setCardsData] = useState<PairCardData[]>(initialState.cardsData)

  useEffect(() => {
    strideHostZoneDataRequest().then((data) => 
      setStrideHostZoneData(data)
    );
  }, [setStrideHostZoneData])

  useEffect(() => {
    tokens.forEach((token) => {
      const osmosis = token.dexes.find((dex) => dex.name === 'osmosis');
      osmosis?.pools.forEach((pool) => {
        osmosisPoolDataRequest(pool, token.ibc_denom, token.liquidStakingProtocols[0].ibc_denom).then((poolData) =>
          poolData && setOsmosisPoolsData((prev) => ({...prev, [pool]: poolData})))
      })
    })
  }, [setOsmosisPoolsData])

  useEffect(() => {
    if (!strideHostZoneData) {
      return
    }
    const _cardsData = Object.entries(osmosisPoolsData).map(([, poolData]) => {
      const price = getOsmosisPoolRate(poolData)
      const redemptionRate = getStrideRedemptionRate(strideHostZoneData, tokens[0].ibc_denom)
      return { price, redemptionRate }
    })
    setCardsData(_cardsData)
  }, [strideHostZoneData, osmosisPoolsData])

  const value = useMemo(
    () => ({ cardsData }),
    [cardsData],
  );
  
  return <Provider value={value}>{_children}</Provider>;
};

export { AppStateProvider };
  