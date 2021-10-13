import { useContext } from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
    useLocation
} from 'react-router-dom'
import TokenContext from "./contexts/token/TokenContext";
import TokenProvider from "./contexts/token/TokenProvider";
import UserProvider from "./contexts/user/UserProvider";
import ClientsProvider from "./contexts/client/ClientsProvider";
import ChargesProvider from "./contexts/charge/ChargesProvider";
import Charges from './pages/Charges';
import Clients from './pages/Clients';
import Login from './pages/Login';
import Home from './pages/Home';
import EditUser from './pages/EditUser';
import EditClient from './pages/EditClient';
import DetailClient from './pages/DetailClient';
import RegisterUser from './pages/RegisterUser';
import RegisterClient from './pages/RegisterClient';
import RegisterCharge from './pages/RegisterCharge';


function ProtectedRoutes(props) {
    const { token } = useContext(TokenContext);
    return (
        <Route render={() => (token ? props.children : <Redirect to="/login" />)} />
    );

}

function RedirectToHome(props) {
    const { token } = useContext(TokenContext);
    const location = useLocation();
    if (location.pathname !== '/login') {
        return props.children;
    }
    return (
        <Route render={() => (token ? <Redirect to="/" /> : props.children)} />
    );
}

function Routes() {
    return (
        <TokenProvider>
            <Router>
                <Switch>
                    <Route path='/cadastro' exact component={RegisterUser} />
                    <UserProvider>
                        <ChargesProvider>
                            <ClientsProvider>
                                <ProtectedRoutes>
                                    <Route path='/' exact component={Home} />
                                    <Route path="/cadastrarCobranca" exact component={RegisterCharge} />
                                    <Route path='/cadastrarCliente' exact component={RegisterClient} />
                                    <Route path='/clientes' exact component={Clients} />
                                    <Route path="/cobrancas" exact component={Charges} />
                                    <Route path="/editarUsuario" exact component={EditUser} />
                                    <Route path="/editarCliente/:clienteId" exact component={EditClient} />
                                    <Route path="/clientes/:clienteId" exact component={DetailClient} />
                                </ProtectedRoutes>
                            </ClientsProvider>
                        </ChargesProvider>
                        <RedirectToHome>
                            <Route path='/login' exact component={Login} />
                        </RedirectToHome>
                    </UserProvider>
                </Switch>
            </Router>
        </TokenProvider>
    );
}

export default Routes;