import React, { useState } from "react";
import Select from "react-select";
import { Container, Form, Button, Col, Table } from "react-bootstrap";
import supportedExchanges from "Utils/SupportedExchanges";
import ls from "local-storage";

const ExchangeSelection = () => {
  const [chosenExchange, setChosenExchange] = useState("");

  const getAllExchangesSecrets = () =>
    supportedExchanges
      .filter((exchange) => ls.get(exchange.value + "Secret"))
      .map((exchange) => ({
        value: exchange.value,
        apikey: ls.get(exchange.value + "APIKey"),
        secret: ls.get(exchange.value + "Secret"),
      }));

  const [exchangesSecrets, setExchangesSecrets] = useState(
    getAllExchangesSecrets() || []
  );

  const onChange = (e) => setChosenExchange(e.value);
  const onSubmit = (e) => {
    e.preventDefault();
    const newAPIKey = e.target.exchangeAPIKey.value;
    const newSecret = e.target.exchangeSecret.value;
    ls.set(chosenExchange + "APIKey", newAPIKey);
    ls.set(chosenExchange + "Secret", newSecret);
    setExchangesSecrets(getAllExchangesSecrets());
  };

  const removeAddress = (exchangeToRemove) => {
    ls.remove(exchangeToRemove + "APIKey");
    ls.remove(exchangeToRemove + "Secret");
    setExchangesSecrets(
      exchangesSecrets.filter((exchange) => exchange.value !== exchangeToRemove)
    );
  };

  const renderExchangeFields = () => {
    if (chosenExchange) {
      return (
        <div>
          <Form.Group row className="mt-4">
            <Form.Label sm={3}>Put your {chosenExchange} API KEY</Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                name="exchangeAPIKey"
                id="exchangeAPIKey"
                placeholder={"Paste your " + chosenExchange + " API key here"}
              />
            </Col>
          </Form.Group>
          <Form.Group row className="mt-4">
            <Form.Label sm={3}>Put your {chosenExchange} secret</Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                name="exchangeSecret"
                id="exchangeSecret"
                placeholder={"Paste your " + chosenExchange + " secret"}
              />
            </Col>
          </Form.Group>
          <Button type="submit" className="mt-4" color="info" outline>
            Add API keys
          </Button>
        </div>
      );
    }
  };

  const renderExhangesList = () => {
    return exchangesSecrets
      .filter(
        (exchange) => exchange.value === chosenExchange || !chosenExchange
      )
      .map((exchange) => (
        <tr key={exchange.apikey}>
          <th scope="row">{exchange.value}</th>
          <td>{exchange.apikey}</td>
          <td>
            <Button
              className="float-right"
              onClick={() => removeAddress(exchange.value)}
            >
              Delete
            </Button>
          </td>
        </tr>
      ));
  };

  return (
    <div>
      <Container>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mt-4">
            <Form.Label sm={3}>Choose an exchange</Form.Label>
            <Col sm={9}>
              <Select
                name="chosenExchange"
                id="chosenExchange"
                options={supportedExchanges}
                onChange={onChange}
              />
            </Col>
          </Form.Group>
          {renderExchangeFields()}
        </Form>
        <Table striped responsive>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Address</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{renderExhangesList()}</tbody>
        </Table>
      </Container>
    </div>
  );
};

export default ExchangeSelection;
