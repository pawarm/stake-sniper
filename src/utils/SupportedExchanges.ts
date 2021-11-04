import ccxt from "ccxt";

const supportedExchanges = ccxt.exchanges;
// .map((exchange) => ({
//   label: new ccxt[exchange]().name,
//   value: exchange,
// }));

export default supportedExchanges;
