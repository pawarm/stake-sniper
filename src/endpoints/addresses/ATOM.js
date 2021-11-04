import axios from "axios";

export async function getUnboundingATOMDataFromAPI(address) {
  try {
    return await axios.get(
      "https://lcd-cosmoshub.keplr.app/staking/delegators/" +
        address +
        "/unbonding_delegations"
    );
  } catch (error) {
    console.error(error);
  }
}

export const getUnboundingATOMBalance = (result, address) => {
  if (!result.data.result[0]) {
    return {
      symbol: "ATOM",
      origin: "address",
      origin_details: address,
      balance: 0,
      balance_state: "unbounding",
      state: "fulfilled",
      last_update: Date.now(),
    };
  }
  var balance = result.data.result.reduce(
    (sum1, val1) =>
      sum1 +
      parseFloat(
        val1.entries.reduce((sum2, val2) => sum2 + parseFloat(val2.balance), 0)
      ),
    0
  );

  const decimals = 6;
  for (let i = decimals; i > 0; i--) balance /= 10;
  return {
    symbol: "ATOM",
    origin: "address",
    origin_details: address,
    balance: balance,
    balance_state: "unbounding",
    state: "fulfilled",
    last_update: Date.now(),
  };
};

export async function getDelegatedATOMDataFromAPI(address) {
  try {
    return await axios.get(
      "https://lcd-cosmoshub.keplr.app/staking/delegators/" +
        address +
        "/delegations"
    );
  } catch (error) {
    console.error(error);
  }
}

export const getDelegatedATOMBalance = (result, address) => {
  if (!result.data.result.length)
    return {
      symbol: "ATOM",
      origin: "address",
      origin_details: address,
      balance: 0,
      balance_state: "delegated",
      state: "fulfilled",
      last_update: Date.now(),
    };
  var balance = result.data.result.reduce(
    (sum, val) => sum + parseFloat(val.balance.amount),
    0
  );
  const decimals = 6;
  for (let i = decimals; i > 0; i--) balance /= 10;
  return {
    symbol: "ATOM",
    origin: "address",
    origin_details: address,
    balance: balance,
    balance_state: "delegated",
    state: "fulfilled",
    last_update: Date.now(),
  };
};

export async function getAvailableATOMDataFromAPI(address) {
  try {
    return await axios.get(
      "https://lcd-cosmoshub.keplr.app/bank/balances/" + address
    );
  } catch (error) {
    console.error(error);
  }
}

export const getAvailableATOMBalance = (result, address) => {
  if (!result.data.result.length)
    return {
      symbol: "ATOM",
      origin: "address",
      origin_details: address,
      balance: 0,
      balance_state: "available",
      state: "fulfilled",
      last_update: Date.now(),
    };
  var balance = result.data.result.reduce(
    (sum, val) => sum + parseFloat(val.amount),
    0
  );
  const decimals = 6;
  for (let i = decimals; i > 0; i--) balance /= 10;
  return {
    symbol: "ATOM",
    origin: "address",
    origin_details: address,
    balance: balance,
    balance_state: "available",
    state: "fulfilled",
    last_update: Date.now(),
  };
};
