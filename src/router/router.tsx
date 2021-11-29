import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import MyNavbar from 'components/navbar';
// import AddressesSelection from "../screens/AddressesSelection";
// import ExchangeSelection from "../screens/ExchangeSelection";
// import ManualSelection from "../screens/ManualSelection";
import Main from '../screens/main';

const Router = () => (
  <HashRouter>
    <MyNavbar />

    <Switch>
      <Route path="/main">
        <Main />
      </Route>
      <Route path="/addresses">
        <div>hehe</div>
      </Route>
      <Route path="/exchanges" />
      <Route path="/yield" />
      <Route path="/manual" />
      <Redirect from="/" to="/main" />
    </Switch>
  </HashRouter>
);

export default Router;
