import { ApiPromise, WsProvider } from "@polkadot/api";

const wsProvider = new WsProvider("wss://rpc.polkadot.io");
const apiPromise = ApiPromise.create({ provider: wsProvider });

export async function getDOTDataFromAPI(address) {
  return apiPromise.then((api) => api.query.system.account(address));
}

export const getDOTBalance = (result, address) => {
  var balance = result.data.free;
  const decimals = 10;
  for (let i = decimals; i > 0; i--) balance /= 10;
  return {
    symbol: "DOT",
    origin: "address",
    origin_details: address,
    balance: balance,
    balance_state: "available",
    state: "fulfilled",
    last_update: Date.now(),
  };
};
