import {
    FC,
    useState,
    useEffect,
    useMemo,
    ReactNode,
  } from 'react';
import { appStateContext, initialState } from './AppStateContext';
import { StrideHostZoneData, strideHostZoneDataRequest } from '../api/stride';
// import { OsmosisPoolData, getOsmosisPoolRate, osmosisPoolDataRequest } from '../api/osmosis';

import { PairCardData } from '../components/PairCard';
// import { supportedMarkets } from '../constants/market';
// import { supportedTokens } from '../constants/token';
// import { supportedLSPs } from '../constants/liquid-staking-protocol';
import { ChainData, chainDataRequest } from '../api/chains';
import { OsmosisPoolsData, getLSTPoolsData, osmosisPoolsDataRequest } from '../api/osmosis';
import { SupportedLSP, SupportedToken, supportedLSPs, supportedTokens } from '../constants/liquid-staking-protocol';
import { QuicksilverHostZoneData, quicksilverHostZoneDataRequest } from '../api/quicksilver';

const { Provider } = appStateContext;
const AppStateProvider: FC<{ children: ReactNode }> = ({ children: _children }) => {
  const [strideHostZoneData, setStrideHostZoneData] = useState<StrideHostZoneData>();
  const [quicksilverHostZoneData, setQuicksilverHostZoneData] = useState<QuicksilverHostZoneData>();
  const [osmosisPoolsData, setOsmosisPoolsData] = useState<OsmosisPoolsData['data']>();
  const [chainsData, setChainsData] = useState<{ [T in SupportedToken]?: ChainData }>({});
  const [lspChainsData, setLspChainsData] = useState<{ [T in SupportedLSP]?: ChainData }>({});
  const [cardsData, setCardsData] = useState<PairCardData[]>(initialState.cardsData);


  useEffect(() => {
    strideHostZoneDataRequest().then((data) => {
      setStrideHostZoneData(data);
      console.log(data);
    });
    quicksilverHostZoneDataRequest().then((data) => {
      setQuicksilverHostZoneData(data)
    })
  }, [])

  useEffect(() => {
    Object.values(supportedTokens).forEach((token) => {
      chainDataRequest(token.chainName).then((data) => {
        setChainsData((prev) => ({...prev, [token.symbol]: data}))
      })
    })
    Object.keys(supportedLSPs).forEach((lsp) => {
      chainDataRequest(lsp).then((data) => {
        setLspChainsData((prev) => ({...prev, [lsp]: data}))
      })
    })
  }, [])

  useEffect(() => {
    osmosisPoolsDataRequest().then((data) => {
      setOsmosisPoolsData(data.data);
    })
  }, [])

  useEffect(() => {
    if (!strideHostZoneData || !quicksilverHostZoneData || !lspChainsData || !osmosisPoolsData || !chainsData) return;
    const _cardsData: PairCardData[] = []
    supportedLSPs['stride'].forEach((lst) => {
      const zone = strideHostZoneData.host_zone.find((zoneData) => zoneData.ibc_denom === lst.ibcDenom);
      if (!zone) return;
      const token = chainsData[lst.symbol]
      if (!token) return
      const tokenSVG = token.images?.find((i) => i.svg)?.svg
      const tokenAPR = token.params.estimated_apr
      const unbounding_time = token.params.unbonding_time / 60 / 60 / 24
      const lstSVG = lspChainsData['stride']?.assets.find((asset) => asset.symbol === lst.lstSymbol)?.logo_URIs.svg
      const redemptionRate = Number(zone.redemption_rate);
      const lstPools = getLSTPoolsData(osmosisPoolsData, lst.symbol, lst.lstSymbol)
      // console.log(`Pools found for ${lst.symbol}/${lst.lstSymbol} pair: ${lstPools.length}`)
      lstPools.forEach((pool) => {
        const profit = (redemptionRate / pool.price - 1) * (365 / (unbounding_time + 3));
        _cardsData.push({
          tokenName: lst.symbol,
          tokenUrl: tokenSVG,
          tokenAPR: tokenAPR,
          lspName: lst.lstSymbol,
          lstUrl: lstSVG,
          redemptionRate,
          poolName: pool.poolId,
          price: pool.price,
          profit
        })
      })
    })

    supportedLSPs['quicksilver'].forEach((lst) => {
      const zone = quicksilverHostZoneData.zones.find((zoneData) => zoneData.chain_id.includes(lst.chainName));
      if (!zone) return;
      const token = chainsData[lst.symbol]
      if (!token) return
      const tokenSVG = token.images?.find((i) => i.svg)
      const tokenAPR = token.params.estimated_apr
      const unbounding_time = token.params.unbonding_time / 60 / 60 / 24
      const lstSVG = lspChainsData['quicksilver']?.assets.find((asset) => asset.symbol === lst.lstSymbol)?.logo_URIs.svg
      const redemptionRate = Number(zone.redemption_rate);
      const lstPools = getLSTPoolsData(osmosisPoolsData, lst.symbol, lst.lstSymbol)
      lstPools.forEach((pool) => {
        const profit = (redemptionRate / pool.price - 1) * (365 / (unbounding_time + 3));
        _cardsData.push({
          tokenName: lst.symbol,
          tokenUrl: tokenSVG?.svg,
          tokenAPR: tokenAPR,
          lspName: lst.lstSymbol,
          lstUrl: lstSVG,
          redemptionRate,
          poolName: pool.poolId,
          price: pool.price,
          profit
        })
      })
    })
    

    setCardsData(_cardsData)
  }, [chainsData, osmosisPoolsData, lspChainsData, strideHostZoneData, quicksilverHostZoneData])

  const value = useMemo(
    () => ({ cardsData }),
    [cardsData],
  );
  
  return <Provider value={value}>{_children}</Provider>;
};

export { AppStateProvider };
  