import axios from "axios";

export async function getXRPDataFromAPI(address) {
  try {
    return await axios.get(
      "https://api.blockchair.com/ripple/raw/account/" + address
    );
  } catch (error) {
    console.error(error);
  }
}

export const getXRPBalance = (result, address) => {
  var balance = result.data.data[address].account.account_data.Balance;
  const decimals = 6;
  for (let i = decimals; i > 0; i--) balance /= 10;
  return {
    symbol: "XRP",
    origin: "address",
    origin_details: address,
    balance: balance,
    balance_state: "available",
    state: "fulfilled",
    last_update: Date.now(),
  };
};
