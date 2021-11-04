import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
// import BalancesContext from "Contexts/BalancesContext";
// import CurrenciesContext from "Contexts/CurrenciesContext";
import CurrencyEntry from "../Components/CurrencyEntry";
// import CMCCurrencyMapContext from "Contexts/CMCCurrencyMapContext";
// import { getCurrencyIdFromMap } from "utils/DataManager";
import { useAppStateContext } from "contexts/app-context";
const Main = () => {
  const [cumulatedBalances, setCumulatedBalances] = useState({});

  const { balances } = useAppStateContext();
  // const { allCurrencies } = useContext(CurrenciesContext);
  // const CMCCurrencyMap = useContext(CMCCurrencyMapContext);

  // useEffect(() => {
  //   const cumulatedCurrencies = {};
  //   balances.forEach((balance) => {
  //     const id = getCurrencyIdFromMap(balance, CMCCurrencyMap);
  //     if (allCurrencies[id]) {
  //       cumulatedCurrencies[allCurrencies[id].symbol] = {
  //         balance_all: 0,
  //         states: {},
  //       };
  //     }
  //   });

  //   allBalances.forEach((balance) => {
  //     const currentBalance = balance.balance;
  //     const currentState = balance.balance_state;
  //     const id = getCurrencyIdFromMap(balance, CMCCurrencyMap);
  //     if (allCurrencies[id].symbol) {
  //       cumulatedCurrencies[allCurrencies[id].symbol].balance_all +=
  //         currentBalance;
  //       if (
  //         cumulatedCurrencies[allCurrencies[id].symbol].states[currentState]
  //       ) {
  //         cumulatedCurrencies[allCurrencies[id].symbol].states[currentState] +=
  //           currentBalance;
  //       } else {
  //         cumulatedCurrencies[allCurrencies[id].symbol].states[currentState] =
  //           currentBalance;
  //       }
  //     }
  //   });

  //   allBalances.forEach((balance) => {
  //     const id = getCurrencyIdFromMap(balance, CMCCurrencyMap);
  //     if (id && allCurrencies[id]) {
  //       cumulatedCurrencies[allCurrencies[id].symbol].price =
  //         allCurrencies[id].price;
  //       cumulatedCurrencies[allCurrencies[id].symbol].logo =
  //         allCurrencies[id].logo;
  //       cumulatedCurrencies[allCurrencies[id].symbol].name =
  //         allCurrencies[id].name;
  //     } else {
  //       cumulatedCurrencies[balance.symbol].price = 0;
  //       cumulatedCurrencies[balance.symbol].logo = "";
  //       cumulatedCurrencies[balance.symbol].name =
  //         balance.symbol + " (UNKNOWN)";
  //     }
  //   });

  //   setCumulatedBalances(cumulatedCurrencies);
  // }, [allCurrencies, allBalances]);

  // useEffect(() => console.log(allCurrencies), [allCurrencies]);

  return (
    <Container>
      {balances.map((balance) => balance.symbol + ": " + balance.balance)}
    </Container>
  );
};

export default Main;
