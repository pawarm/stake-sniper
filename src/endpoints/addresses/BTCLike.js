import axios from 'axios';

export async function getBTCLikeDataFromAPI(address, name) {
  try {
    return await axios.get(
      'https://api.blockchair.com/' + name + '/dashboards/address/' + address
    );
  } catch (error) {
    console.error(error);
  }
}

export const getBTCLikeBalance = (result, address, symbol) => {
  var balance = result.data.data[address].address.balance;
  const decimals = 8;
  for (let i = decimals; i > 0; i--) balance /= 10;
  return {
    symbol: symbol,
    origin: 'address',
    origin_details: address,
    balance: balance,
    balance_state: 'available',
    state: 'fulfilled',
    last_update: Date.now()
  };
};
