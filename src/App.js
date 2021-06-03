import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import MainRoutes from './routes/MainRoutes';
import NavRoutes from './routes/NavRoutes';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Main from './components/Main';
import Hesaplar from './components/Hesaplar';
import Profil from './components/Profil';
import NotFound from './components/NotFound';
import GelirGider from './components/GelirGider';
import Raporlar from './components/Raporlar';
import Kur from './components/Kur';

import { useSelector } from 'react-redux';
import { loadUser } from './redux/actions/authAction'
import store from "./redux/store";
import setAuthToken from './utils/setAuthToken';
function App() {
  const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated);
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: "LOGOUT" });
    });
    if (isAuthenticated) {
      return <Redirect to="/main" />;
    } else {
      return <Redirect to="/login" />;
    }
  }, []);

  return (
    <Router>
      <Switch>
        <NavRoutes exact path="/" component={Home} />
        <NavRoutes exact path="/login" component={Login} />
        <NavRoutes exact path="/signup" component={Signup} />
        <MainRoutes exact path="/main" component={Main} />
        <MainRoutes exact path="/hesaplar" component={Hesaplar} />
        <MainRoutes exact path="/gelirgider" component={GelirGider} />
        <MainRoutes exact path="/raporlar" component={Raporlar} />
        <MainRoutes exact path="/kur" component={Kur} />
        <MainRoutes exact path="/profil" component={Profil} />
        <NavRoutes component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;