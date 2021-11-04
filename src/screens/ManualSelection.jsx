import React, { useState, useContext, useEffect } from "react";
import Select from "react-select";
import { Container, Form, Button, Col, Table } from "react-bootstrap";
import supportedExchanges from "utils/SupportedExchanges";
import ls from "local-storage";
import { CMCMapSelect } from "utils/CMCMapSelect";
import CMCCurrencyMapContext from "Contexts/CMCCurrencyMapContext";
import CurrenciesContext from "Contexts/CurrenciesContext";

const ManualSelection = () => {
  const [chosenCurrency, setChosenCurrency] = useState("");
  const CMCCurrencyMap = useContext(CMCCurrencyMapContext);
  const [currenciesList, setCurrenciesList] = useState([]);
  const { allCurrencies } = useContext(CurrenciesContext);

  const getAllCurrencyBalances = () =>
    currenciesList
      .filter(
        (currency) =>
          allCurrencies[currency.value] &&
          ls.get(allCurrencies[currency.value].symbol + "Manual")
      )
      .map((currency) => ({
        value: allCurrencies[currency.value].symbol,
        balances: ls.get(allCurrencies[currency.value].symbol + "Manual"),
      }));

  useEffect(() => {
    if (CMCCurrencyMap.length) {
      setCurrenciesList(CMCMapSelect(CMCCurrencyMap));
    }
  }, [CMCCurrencyMap]);

  useEffect(() => {
    setManualBalances(getAllCurrencyBalances());
  }, [allCurrencies, currenciesList]);

  const [manualBalances, setManualBalances] = useState([]);

  const onChange = (e) => setChosenCurrency(e.value);
  const onSubmit = (e) => {
    e.preventDefault();
    const newNote = e.target.manualNote.value;
    const newBalance = e.target.manualBalance.value;
    const balances =
      ls.get(allCurrencies[chosenCurrency].symbol + "Manual") || [];
    balances.push({ id: balances.length, note: newNote, balance: newBalance });
    ls.set(allCurrencies[chosenCurrency].symbol + "Manual", balances);
    setManualBalances(getAllCurrencyBalances());
  };

  const removeBalance = (currencyToRemove, idToRemove) => {
    manualBalances.forEach((currency) => {
      if (currency.value === currencyToRemove) {
        const balances = currency.balances.filter(
          (balance) => balance.id !== idToRemove
        );
        if (balances.length) {
          ls.set(currencyToRemove + "Manual", balances);
        } else {
          ls.remove(currencyToRemove + "Manual");
        }
      }
    });
    setManualBalances(getAllCurrencyBalances());
  };

  const renderManualFields = () => {
    if (chosenCurrency) {
      return (
        <div>
          <Form.Group className="mt-4">
            <Form.Label sm={3}>
              Put your {allCurrencies[chosenCurrency].symbol} balance
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                name="manualBalance"
                id="manualBalance"
                placeholder={
                  "Put your " +
                  allCurrencies[chosenCurrency].symbol +
                  " balance"
                }
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4">
            <Form.Label sm={3}>Put note here</Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                name="manualNote"
                id="manualNote"
                placeholder={"Paste your note here"}
              />
            </Col>
          </Form.Group>
          <Button type="submit" className="mt-4" color="info">
            Add balance
          </Button>
        </div>
      );
    }
  };

  const renderManualList = () => {
    return (
      manualBalances
        // .filter(currency =>
        //     currency.value === chosenCurrency || !chosenCurrency)
        .map((currency) =>
          currency.balances.map((balance) => (
            <tr key={balance.id}>
              <th scope="row">{currency.value}</th>
              <td>{balance.balance}</td>
              <td>{balance.note}</td>
              <td>
                <Button
                  className="float-right"
                  onClick={() => removeBalance(currency.value, balance.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))
        )
        .flat()
    );
  };

  return (
    <div>
      <Container>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mt-4">
            <Form.Label sm={3}>Choose a currency</Form.Label>
            <Col sm={9}>
              <Select
                name="chosenCurrency"
                id="chosenCurrency"
                options={currenciesList}
                onChange={onChange}
              />
            </Col>
          </Form.Group>
          {renderManualFields()}
        </Form>
        <Table striped responsive>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Amount</th>
              <th>Note</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{renderManualList()}</tbody>
        </Table>
      </Container>
    </div>
  );
};

export default ManualSelection;
