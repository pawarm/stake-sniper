import axios from "axios";

export async function getETHDataFromAPI(address) {
  try {
    return await axios.get(
      "https://api.blockchair.com/ethereum/dashboards/address/" +
        address +
        "?erc_20=true"
    );
  } catch (error) {
    console.error(error);
  }
}

export const getETHBalance = (result, address) => {
  var balance = result.data.data[address].address.balance;
  const decimals = 18;
  for (let i = decimals; i > 0; i--) balance /= 10;
  return {
    symbol: "ETH",
    origin: "address",
    origin_details: address,
    balance: balance,
    balance_state: "available",
    state: "fulfilled",
    last_update: Date.now(),
  };
};

export const getETHTokensAddresses = (result, address) => {
  return result.data.data[address].layer_2.erc_20.map((obj) => ({
    token_symbol: obj.token_symbol.toUpperCase(),
    address: obj.token_address,
    token_decimals: obj.token_decimals,
  }));
};

export async function getETHTokenDataFromAPI(ETHAddress, tokenAddress) {
  try {
    return await axios.get(
      "https://api.blockchair.com/ethereum/erc-20/" +
        tokenAddress +
        "/dashboards/address/" +
        ETHAddress
    );
  } catch (error) {
    console.error(error);
  }
}

export const getETHTokenBalance = (result, address, token_object) => {
  const decimals = token_object.token_decimals;
  var balance = result.data.data[address].address.balance;
  for (let i = decimals; i > 0; i--) balance /= 10;
  return {
    symbol: token_object.token_symbol,
    origin: "address",
    origin_details: address,
    balance: balance,
    balance_state: "available",
    state: "fulfilled",
    last_update: Date.now(),
  };
};
