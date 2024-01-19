import { sendRequest } from "../utils/request";

// export type OsmosisPoolData = {
//     symbol: string;
//     amount: number;
//     denom: string;
//     coingecko_id: string;
//     liquidity: number;
//     liquidity_24h_change: number;
//     volume_24h: number;
//     volume_24h_change: number;
//     price: number;
//     price_24h_change: number;
//     fees: string;
// }[]

export type OsmosisPoolData = {
  time: number,
  close: number,
  high: number,
  low: number,
  open: number
}

export const osmosisPoolDataRequest = async (pool: string, tokenDenom: string, lstDenom: string) => {
  const response = await sendRequest<OsmosisPoolData[]>({
    // url: `https://api-osmosis.imperator.co/pools/v2/${pool}`
    url: `https://api-osmosis.imperator.co/pairs/v1/historical/${pool}/chart?asset_in=${tokenDenom}&asset_out=${lstDenom}&range=1d&asset_type=denom`
  })
  if (!response.data.length) return undefined
  return response.data[response.data.length - 1]
}

// export const getOsmosisPoolRate = (pool: OsmosisPoolData, tokenDenom: string, lstDenom: string) => {
//   const tokenData = pool.find((token) => token.denom === tokenDenom)
//   const lstData = pool.find((token) => token.denom === lstDenom)
//   if (!tokenData?.price || !lstData?.price) {
//     return undefined
//   }
//   return lstData.price / tokenData.price
// }

export const getOsmosisPoolRate = (pool: OsmosisPoolData) => {
  return pool.close
}