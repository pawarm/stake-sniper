import React, { useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';

const MyNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Navbar color="inverse" expand="md">
        <LinkContainer to="/">
          <Navbar.Brand>Coin Slate</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle onClick={() => setIsOpen(!isOpen)} />
        <Navbar.Collapse>
          <Nav className="ml-auto">
            <LinkContainer to="/addresses">
              <Nav.Link>Addresses</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/exchanges">
              <Nav.Link>Exchanges</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/yield">
              <Nav.Link>Yield</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/manual">
              <Nav.Link>Manual</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default MyNavbar;
