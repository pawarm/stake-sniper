import axios from "axios";

export async function getBNBDataFromAPI(address) {
  try {
    return await axios.get(
      "https://api.bscscan.com/api?module=account&action=balance&address=" +
        address +
        "&tag=latest&apikey="
    );
  } catch (error) {
    console.error(error);
  }
}

export const getBNBBalance = (result, address) => {
  var balance = result.data.result;
  const decimals = 18;
  for (let i = decimals; i > 0; i--) balance /= 10;
  return {
    symbol: "BNB",
    origin: "address",
    origin_details: address,
    balance: balance,
    balance_state: "available",
    state: "fulfilled",
    last_update: Date.now(),
  };
};

export async function getBSCTokenDataFromAPI(BNBAddress, tokenAddress) {
  try {
    return await axios.get(
      "https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=" +
        tokenAddress +
        "&address=" +
        BNBAddress +
        "&tag=latest&apikey="
    );
  } catch (error) {
    console.error(error);
  }
}

export const getBSCTokenBalance = (result, BNBAddress, token_object) => {
  const decimals = token_object.decimals;
  var balance = result.data.result;
  for (let i = decimals; i > 0; i--) balance /= 10;
  return {
    symbol: token_object.value,
    origin: "address",
    origin_details: BNBAddress,
    balance: balance,
    balance_state: "available",
    state: "fulfilled",
    last_update: Date.now(),
  };
};
