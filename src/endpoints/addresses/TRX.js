import axios from "axios";

export async function getTRXDataFromAPI(address) {
  try {
    return await axios.get(
      "https://apilist.tronscan.org/api/account?address=" + address
    );
  } catch (error) {
    console.error(error);
  }
}

export const getTRXTokens = (result) => {
  return result.data.tokens;
};

export const getTRXRewardBalance = (result, address) => {
  var balance = result.data.rewardNum;
  const decimals = 6;
  for (let i = decimals; i > 0; i--) balance /= 10;
  return {
    symbol: "TRX",
    origin: "address",
    origin_details: address,
    balance: balance,
    balance_state: "reward",
    state: "fulfilled",
    last_update: Date.now(),
  };
};

export const getTRXFrozenBalance = (result, address) => {
  var balance = result.data.totalFrozen;
  const decimals = 6;
  for (let i = decimals; i > 0; i--) balance /= 10;
  return {
    symbol: "TRX",
    origin: "address",
    origin_details: address,
    balance: balance,
    balance_state: "frozen",
    state: "fulfilled",
    last_update: Date.now(),
  };
};

export const getTRXTokenBalance = (token, address) => {
  var balance = token.balance;
  const decimals = token.tokenDecimal;
  for (let i = decimals; i > 0; i--) balance /= 10;
  return {
    symbol: token.tokenAbbr.toUpperCase(),
    origin: "address",
    origin_details: address,
    balance: balance,
    balance_state: "available",
    state: "fulfilled",
    last_update: Date.now(),
  };
};
