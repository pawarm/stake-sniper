import { memo, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useAppStateContext } from 'contexts/app-context';

const Main = () => {
  const [cumulatedBalances, setCumulatedBalances] = useState({});

  const { CMCMap, balances } = useAppStateContext();

  return (
    <>
      <Container>
        {balances.map((balance) => balance.symbol + ': ' + balance.balance)}
      </Container>
      <Container> {CMCMap.length} </Container>
    </>
  );
};

export default memo(Main);
