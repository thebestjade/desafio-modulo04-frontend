import { useContext } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import TokenContext from "./contexts/token/TokenContext";
import TokenProvider from "./contexts/token/TokenProvider";
import UserProvider from "./contexts/user/UserProvider";
import ClientsProvider from "./contexts/client/ClientsProvider";
import ChargesProvider from "./contexts/charge/ChargesProvider";
import ModalProvider from "./contexts/modal/ModalProvider";
import Charges from "./pages/Charges";
import Clients from "./pages/Clients";
import Login from "./pages/Login";
import Home from "./pages/Home";
import DetailClient from "./pages/DetailClient";
import RegisterUser from "./pages/RegisterUser";
import RegisterClient from "./pages/RegisterClient";
import RegisterCharge from "./pages/RegisterCharge";
import EditCharge from "./pages/EditCharge";
import Report from "./pages/Report";
import ReportProvider from "./contexts/report/ReportProvider";
import ReportContext from "./contexts/report/ReportContext";

function ProtectedRoutes(props) {
  const { token } = useContext(TokenContext);
  return (
    <Route render={() => (token ? props.children : <Redirect to="/login" />)} />
  );
}

function RedirectToHome(props) {
  const { token } = useContext(TokenContext);
  const location = useLocation();
  if (location.pathname !== "/login") {
    return props.children;
  }
  return (
    <Route render={() => (token ? <Redirect to="/" /> : props.children)} />
  );
}

function RedirectFromReport(props) {
  const { entity, status } = useContext(ReportContext);

  const location = useLocation();
  if (location.pathname !== "/relatorios") {
    return props.children;
  }
  return (
    <Route
      render={() =>
        entity === "" && status === "" ? <Redirect to="/" /> : props.children
      }
    />
  );
}
function Routes() {
  return (
    <TokenProvider>
      <Router>
        <Switch>
          <Route path="/cadastro" exact component={RegisterUser} />
          <UserProvider>
            <ChargesProvider>
              <ClientsProvider>
                <ModalProvider>
                  <ProtectedRoutes>
                    <ReportProvider>
                      <RedirectFromReport>
                        <Route path="/" exact component={Home} />
                        <Route path="/relatorios" exact component={Report} />
                      </RedirectFromReport>
                    </ReportProvider>
                    <Route
                      path="/cadastrarCobranca"
                      exact
                      component={RegisterCharge}
                    />
                    <Route
                      path="/cadastrarCliente"
                      exact
                      component={RegisterClient}
                    />
                    <Route path="/clientes" exact component={Clients} />
                    <Route path="/cobrancas" exact component={Charges} />
                    <Route
                      path="/editarCharge/:chargeId"
                      exact
                      component={EditCharge}
                    />
                    <Route
                      path="/clientes/:clienteId"
                      exact
                      component={DetailClient}
                    />
                  </ProtectedRoutes>
                </ModalProvider>
              </ClientsProvider>
            </ChargesProvider>
            <RedirectToHome>
              <Route path="/login" exact component={Login} />
            </RedirectToHome>
          </UserProvider>
        </Switch>
      </Router>
    </TokenProvider>
  );
}

export default Routes;
