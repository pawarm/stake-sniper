import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import MyNavbar from 'components/navbar';
// import AddressesSelection from "../screens/AddressesSelection";
// import ExchangeSelection from "../screens/ExchangeSelection";
// import ManualSelection from "../screens/ManualSelection";
import Main from '../screens/main';

const Router = () => {
  return (
    <BrowserRouter>
      <MyNavbar />

      <Switch>
        <Route path="/main">
          <Main />
        </Route>
        <Route path="/addresses">{/* <AddressesSelection /> */}</Route>
        <Route path="/exchanges">{/* <ExchangeSelection /> */}</Route>
        <Route path="/yield"></Route>
        <Route path="/manual">{/* <ManualSelection /> */}</Route>
        <Redirect from="/" to="/main" />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
