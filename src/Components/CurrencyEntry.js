import CMCCurrencyMapContext from "Contexts/CMCCurrencyMapContext";
import React, { useContext, useState } from "react";
import { ListGroup, Image, Row, Col, Modal, Button } from "react-bootstrap";
import smartRound from "smart-round";
import { CMCMapSelect } from "Utils/CMCMapSelect";
import Select from "react-select";
import ls from "local-storage";

const rounder = smartRound(8, 0, 6);
const rounderFiat = smartRound(8, 0, 2);

const CurrencyEntry = ({ cumulatedBalances }) => {
  const [isOpen, setIsOpen] = useState({});
  const toggle = (key) => setIsOpen({ ...isOpen, [key]: !isOpen[key] });
  const CMCCurrencyMap = useContext(CMCCurrencyMapContext);
  const [chosenCurrency, setChosenCurrency] = useState(0);
  const onChange = (e) => setChosenCurrency(e.value);

  const addToFixed = (key) => {
    const fixed = ls.get("FixedSymbols") || {};
    fixed[key] = chosenCurrency;
    ls.set("FixedSymbols", fixed);
  };

  return Object.keys(cumulatedBalances).map((key) => (
    <>
      <ListGroup.Item key={key} onClick={() => toggle(key)}>
        <Row>
          <Col>
            <Image
              src={cumulatedBalances[key].logo}
              width="32"
              height="32"
              rounded
              alt={key + " image"}
            />
            {cumulatedBalances[key].name}
          </Col>
          <Col>{rounder(cumulatedBalances[key].balance_all)}</Col>
          <Col>Price: {rounder(cumulatedBalances[key].price)} PLN</Col>
          <Col>
            Holding:{" "}
            {rounderFiat(
              cumulatedBalances[key].balance_all * cumulatedBalances[key].price,
              true
            )}{" "}
            PLN
          </Col>
        </Row>
      </ListGroup.Item>
      <Modal show={isOpen[key]} onHide={() => toggle(key)}>
        <Modal.Header>
          <Modal.Title>
            <Image
              src={cumulatedBalances[key].logo}
              width="32"
              height="32"
              rounded
              alt={key + " image"}
            />
            {cumulatedBalances[key].name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          If currency is unknown or wrongly assigned, you can change it here
        </Modal.Body>
        <Select
          name="chosenCurrency"
          id="chosenCurrency"
          options={CMCMapSelect(CMCCurrencyMap)}
          onChange={onChange}
        />
        <Modal.Footer>
          <Button variant="secondary" onClick={() => toggle(key)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              addToFixed(key);
              toggle(key);
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  ));

  // {/* <Collapse isOpen={isOpen[key]}>
  //         <Row>
  //             <Col sm={4}>
  //             <ListGroupItemText>
  //                 Addresses:
  //                 {Object.keys(cumulatedBalances[key].states).map((k) =>
  //                     " "+k+": "+cumulatedBalances[key].states[k])}
  //             </ListGroupItemText>
  //             </Col>
  //         </Row>
  // </Collapse> */}
};

export default CurrencyEntry;
