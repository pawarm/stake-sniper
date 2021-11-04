import React, { useState } from "react";
import Select from "react-select";
import { Container, Form, Button, Col, Table } from "react-bootstrap";
import supportedCurrencyAddresses from "utils/SupportedCurrencyAddresses";
import ls from "local-storage";

const AddressesSelection = () => {
  const [chosenCurrency, setChosenCurrency] = useState("");

  const getAllAddresses = () =>
    supportedCurrencyAddresses
      .filter((currency) => ls.get(currency.value + "Addresses"))
      .map((currency) => ({
        value: currency.value,
        addresses: ls.get(currency.value + "Addresses"),
      }));

  const [currenciesAddresses, setCurrenciesAddresses] = useState(
    getAllAddresses() || []
  );

  const onChange = (e) => setChosenCurrency(e.value);
  const onSubmit = (e) => {
    e.preventDefault();
    const newAddress = e.target.currencyAddress.value;
    var changed = false;
    const tmpCurrenciesAddresses = currenciesAddresses.map((currency) => {
      if (
        currency.value === chosenCurrency &&
        !currency.addresses.includes(newAddress)
      ) {
        const tmpCurrency = currency;
        tmpCurrency.addresses.push(newAddress);
        ls.set(currency.value + "Addresses", tmpCurrency.addresses);
        changed = true;
        return tmpCurrency;
      }
      return currency;
    });
    if (changed) {
      setCurrenciesAddresses(
        JSON.parse(JSON.stringify(tmpCurrenciesAddresses))
      );
    } else {
      tmpCurrenciesAddresses.push({
        value: chosenCurrency,
        addresses: [newAddress],
      });
      ls.set(chosenCurrency + "Addresses", [newAddress]);
      setCurrenciesAddresses(tmpCurrenciesAddresses);
    }
  };

  const removeAddress = (currencyToRemove, addressToRemove) => {
    var remove = false;
    const tmpCurrenciesAddresses = currenciesAddresses.map((currency) => {
      if (currency.value === currencyToRemove) {
        const addresses = currency.addresses.filter(
          (address) => address !== addressToRemove
        );
        if (addresses.length) {
          ls.set(currencyToRemove + "Addresses", addresses);
          return {
            value: [currencyToRemove],
            addresses: addresses,
          };
        } else {
          remove = currencyToRemove;
          ls.remove(currencyToRemove + "Addresses");
        }
      }
      return currency;
    });
    if (remove) {
      setCurrenciesAddresses(
        currenciesAddresses.filter(
          (currency) => currency.value !== currencyToRemove
        )
      );
    } else {
      setCurrenciesAddresses(tmpCurrenciesAddresses);
    }
  };

  const renderAddressFields = () => {
    if (chosenCurrency) {
      return (
        <div>
          <Form.Group row className="mt-4">
            <Form.Label sm={3}>Put your {chosenCurrency} address</Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                name="currencyAddress"
                id="currencyAddress"
                placeholder={"Paste your " + chosenCurrency + " address here"}
              />
            </Col>
          </Form.Group>
          <Button type="submit" className="mt-4" color="info" outline>
            Add address
          </Button>
        </div>
      );
    }
  };

  const renderAddressesList = () =>
    currenciesAddresses
      .filter(
        (currency) => currency.value === chosenCurrency || !chosenCurrency
      )
      .map((currency) =>
        currency.addresses.map((address) => (
          <tr key={address}>
            <th scope="row">{currency.value}</th>
            <td>{address}</td>
            <td>
              <Button
                className="float-right"
                onClick={() => removeAddress(currency.value, address)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))
      );

  return (
    <div>
      <Container>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mt-4">
            <Form.Label sm={3}>Choose a cryptocurrency</Form.Label>
            <Col sm={9}>
              <Select
                name="chosenCurrency"
                id="chosenCurrency"
                options={supportedCurrencyAddresses}
                onChange={onChange}
              />
            </Col>
          </Form.Group>
          {renderAddressFields()}
        </Form>
        <Table striped responsive>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Address</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{renderAddressesList()}</tbody>
        </Table>
      </Container>
    </div>
  );
};

export default AddressesSelection;
