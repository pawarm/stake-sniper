import axios from "axios";

export async function getXTZDataFromAPI(address) {
  try {
    return await axios.get(
      "https://api.blockchair.com/tezos/raw/account/" + address
    );
  } catch (error) {
    console.error(error);
  }
}

export const getXTZBalance = (result, address) => {
  var balance = result.data.data[address].account.total_balance;
  return {
    symbol: "XTZ",
    origin: "address",
    origin_details: address,
    balance: balance,
    balance_state: "available",
    state: "fulfilled",
    last_update: Date.now(),
  };
};
