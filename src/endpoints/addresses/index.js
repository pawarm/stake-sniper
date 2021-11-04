import { getBTCLikeDataFromAPI, getBTCLikeBalance } from "./BTCLike";
import { getDOTDataFromAPI, getDOTBalance } from "./DOT";
import {
  getAvailableATOMDataFromAPI,
  getAvailableATOMBalance,
  getDelegatedATOMDataFromAPI,
  getDelegatedATOMBalance,
  getUnboundingATOMDataFromAPI,
  getUnboundingATOMBalance,
} from "./ATOM";
import { getADADataFromAPI, getADABalance } from "./ADA";
import { getXRPDataFromAPI, getXRPBalance } from "./XRP";
import { getXLMDataFromAPI, getXLMBalance } from "./XLM";
import { getXTZDataFromAPI, getXTZBalance } from "./XTZ";
import { getALGODataFromAPI, getALGOBalance } from "./ALGO";
import {
  getTRXDataFromAPI,
  getTRXTokens,
  getTRXTokenBalance,
  getTRXFrozenBalance,
  getTRXRewardBalance,
} from "./TRX";
import {
  getETHDataFromAPI,
  getETHBalance,
  getETHTokensAddresses,
  getETHTokenDataFromAPI,
  getETHTokenBalance,
} from "./ETH";
import {
  getBNBDataFromAPI,
  getBNBBalance,
  getBSCTokenDataFromAPI,
  getBSCTokenBalance,
} from "./BSC";
import supportedBSCTokens from "utils/SupportedBSCTokens";

const getCurrencyBalances = (currency, address) => {
  switch (currency) {
    case "BTC":
      return getBTCLikeDataFromAPI(address, "bitcoin").then((result) => [
        getBTCLikeBalance(result, address, "BTC"),
      ]);
    case "BCH":
      return getBTCLikeDataFromAPI(address, "bitcoin-cash").then((result) => [
        getBTCLikeBalance(result, address, "BCH"),
      ]);
    case "LTC":
      return getBTCLikeDataFromAPI(address, "litecoin").then((result) => [
        getBTCLikeBalance(result, address, "LTC"),
      ]);
    case "BSV":
      return getBTCLikeDataFromAPI(address, "bitcoin-sv").then((result) => [
        getBTCLikeBalance(result, address, "BSV"),
      ]);
    case "DOGE":
      return getBTCLikeDataFromAPI(address, "dogecoin").then((result) => [
        getBTCLikeBalance(result, address, "DOGE"),
      ]);
    case "DASH":
      return getBTCLikeDataFromAPI(address, "dash").then((result) => [
        getBTCLikeBalance(result, address, "DASH"),
      ]);
    case "GRS":
      return getBTCLikeDataFromAPI(address, "groestlcoin").then((result) => [
        getBTCLikeBalance(result, address, "GRS"),
      ]);
    case "ZEC":
      return getBTCLikeDataFromAPI(address, "zcash").then((result) => [
        getBTCLikeBalance(result, address, "ZEC"),
      ]);
    case "XEC":
      return getBTCLikeDataFromAPI(address, "ecash").then((result) => [
        getBTCLikeBalance(result, address, "XEC"),
      ]);
    case "DOT":
      return getDOTDataFromAPI(address).then((result) => [
        getDOTBalance(result, address),
      ]);
    case "ATOM":
      return Promise.all([
        getAvailableATOMDataFromAPI(address).then((result) =>
          getAvailableATOMBalance(result, address)
        ),
        getDelegatedATOMDataFromAPI(address).then((result) =>
          getDelegatedATOMBalance(result, address)
        ),
        getUnboundingATOMDataFromAPI(address).then((result) =>
          getUnboundingATOMBalance(result, address)
        ),
      ]);
    case "ADA":
      return getADADataFromAPI(address).then((result) => [
        getADABalance(result, address),
      ]);
    case "XRP":
      return getXRPDataFromAPI(address).then((result) => [
        getXRPBalance(result, address),
      ]);
    case "XLM":
      return getXLMDataFromAPI(address).then((result) => [
        getXLMBalance(result, address),
      ]);
    case "XTZ":
      return getXTZDataFromAPI(address).then((result) => [
        getXTZBalance(result, address),
      ]);
    case "ALGO":
      return getALGODataFromAPI(address).then((result) => [
        getALGOBalance(result, address),
      ]);
    case "TRX":
      return getTRXDataFromAPI(address).then((result) =>
        getTRXTokens(result, address)
          .map((token) => getTRXTokenBalance(token, address))
          .concat([
            getTRXFrozenBalance(result, address),
            getTRXRewardBalance(result, address),
          ])
      );

    case "ETH":
      const lowerAddress = address.toLowerCase();
      return getETHDataFromAPI(lowerAddress).then((result) => {
        const tokensAddresses = getETHTokensAddresses(result, lowerAddress);
        return Promise.all(
          tokensAddresses
            .map((tokenObject) => {
              return getETHTokenDataFromAPI(
                lowerAddress,
                tokenObject.address
              ).then((res) =>
                getETHTokenBalance(res, lowerAddress, tokenObject)
              );
            })
            .flat()
        ).then((tokensBalances) =>
          [getETHBalance(result, lowerAddress)].concat(tokensBalances)
        );
      });
    case "BNB":
      return Promise.all(
        supportedBSCTokens
          .map((tokenObject) =>
            getBSCTokenDataFromAPI(address, tokenObject.address).then(
              (result) => getBSCTokenBalance(result, address, tokenObject)
            )
          )
          .concat(
            getBNBDataFromAPI(address).then((result) =>
              getBNBBalance(result, address)
            )
          )
          .flat()
      );
    default:
      return new Promise(() => [{}]);
  }
};

export default getCurrencyBalances;
