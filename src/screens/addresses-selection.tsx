import { FormEvent, memo, useState } from 'react';
import Select from 'react-select';
import { Container, Form, Button, Col, Table } from 'react-bootstrap';
import supportedCurrencyAddresses from 'utils/SupportedCurrencyAddresses';
import {
  addAddressToLS,
  getAddressesFromLS,
  removeAddressFromLS
} from 'utils/helper-functions';

const AddressesSelection = () => {
  const [chosenCurrency, setChosenCurrency] = useState('');

  const getAllAddresses = () =>
    supportedCurrencyAddresses
      .filter((currency) => getAddressesFromLS(currency.value))
      .map((currency) => ({
        value: currency.value,
        addresses: getAddressesFromLS(currency.value)
      }));

  const [currenciesAddresses, setCurrenciesAddresses] = useState(
    getAllAddresses() || []
  );

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newAddress: string = (e.target as any).currencyAddress.value;
    addAddressToLS(chosenCurrency, newAddress);
    setCurrenciesAddresses(getAllAddresses());
  };

  const removeAddress = (currencyToRemove: string, addressToRemove: string) => {
    removeAddressFromLS(currencyToRemove, addressToRemove);
    setCurrenciesAddresses(getAllAddresses());
  };

  const renderAddressFields = () => {
    if (chosenCurrency) {
      return (
        <div>
          <Form.Group className="mt-4">
            <Form.Label sm={3}>Put your {chosenCurrency} address</Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                name="currencyAddress"
                id="currencyAddress"
                placeholder={'Paste your ' + chosenCurrency + ' address here'}
              />
            </Col>
          </Form.Group>
          <Button type="submit" className="mt-4" color="info">
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
                onChange={(newValue) =>
                  newValue && setChosenCurrency(newValue.value)
                }
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

export default memo(AddressesSelection);
