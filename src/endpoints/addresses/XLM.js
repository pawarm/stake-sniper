import axios from "axios";

export async function getXLMDataFromAPI(address) {
  try {
    return await axios.get(
      "https://api.blockchair.com/stellar/raw/account/" + address
    );
  } catch (error) {
    console.error(error);
  }
}

export const getXLMBalance = (result, address) => {
  var balance = result.data.data[address].balances.balance;
  return {
    symbol: "XLM",
    origin: "address",
    origin_details: address,
    balance: balance,
    balance_state: "available",
    state: "fulfilled",
    last_update: Date.now(),
  };
};
