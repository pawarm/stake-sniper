import { sendRequest } from "../utils/request";

export interface OsmosisPoolsData {
  updated_at: number;
  data: {
      pool_address: string;
      pool_id: string;
      base_name: string;
      base_symbol: string;
      base_address: string;
      quote_name: string;
      quote_symbol: string;
      quote_address: string;
      price: number;
      base_volume_24h: number;
      quote_volume_24h: number;
      volume_24h: number;
      volume_7d: number;
      liquidity: number;
      liquidity_atom: number;
  }[];
}

interface OsmosisPoolData {
  price: number;
  poolId: string;
}

export const osmosisPoolsDataRequest = async () => {
  const response = await sendRequest<OsmosisPoolsData>({
    url: `https://api-osmosis.imperator.co/pairs/v1/summary`
  })
  return response.data
}

export const getLSTPoolsData = (data: OsmosisPoolsData['data'], tokenSymbol: string, lstSymbol: string) => {
  const pools: OsmosisPoolData[] = [];
  const lstPools = data.filter((pool) => pool.quote_symbol === lstSymbol && pool.base_symbol === tokenSymbol)
  lstPools.forEach((pool) => {
    pools.push({
      price: pool.price,
      poolId: pool.pool_id
    })
  })
  const lstReversePools = data.filter((pool) => pool.quote_symbol === tokenSymbol && pool.base_symbol === lstSymbol)
  lstReversePools.forEach((pool) => {
    pools.push({
      price: 1 / pool.price,
      poolId: pool.pool_id
    })
  })
  return pools;
}
