import { memo, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useAppStateContext } from 'contexts/app-context';

const Main = () => {
  const { CMCMap, balances } = useAppStateContext();

  return (
    <>
      <Container>
        {Object.keys(balances.addresses).map((address) =>
          balances.addresses[address].map(
            (balance) => `${balance.symbol}: ${balance.balance}`
          )
        )}
      </Container>
      <Container> {CMCMap.length} </Container>
    </>
  );
};

export default memo(Main);
