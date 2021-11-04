import axios from "axios";

export async function getALGODataFromAPI(address) {
  try {
    return await axios.get("https://algoexplorerapi.io/v2/accounts/" + address);
  } catch (error) {
    console.error(error);
  }
}

export const getALGOBalance = (result, address) => {
  var balance = result.data.amount;
  const decimals = 6;
  for (let i = decimals; i > 0; i--) balance /= 10;
  return {
    symbol: "ALGO",
    origin: "address",
    origin_details: address,
    balance: balance,
    balance_state: "available",
    state: "fulfilled",
    last_update: Date.now(),
  };
};
