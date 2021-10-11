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
import ClientsProvider from "./contexts/clients/ClientsProvider";
import Home from './pages/Home';
import Cadastre from './pages/Cadastre';
import Login from './pages/Login';
import AddClient from './pages/AddClient';
import EditUser from './pages/EditUser';
import EditClient from './pages/EditClient';
import Charges from './pages/Charges';
import Client from './pages/Client';
import CreateCharge from './pages/CreateCharge';


function ProtectedRoutes(props) {
    const { token } = useContext(TokenContext);
    return (
        <Route render={() => (token ? props.children : <Redirect to="/login" />)} />
    );

}

function RedirectToHome(props) {
    const { token } = useContext(TokenContext);
    const location = useLocation();
    if(location.pathname !== '/login') {
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
                    <Route path='/cadastro' exact component={Cadastre} />
                    <UserProvider>
                        <ClientsProvider>
                            <ProtectedRoutes>
                                <Route path='/adicionarCliente' exact component={AddClient} />
                                <Route path='/clientes' exact component={Client} />
                                <Route path="/contratacoes" exact component={Charges} />
                                <Route path='/' exact component={Home} />
                                <Route path="/editarUsuario" exact component={EditUser} />
                                <Route path="/editarCliente/clienteId" exact component={EditClient} />
                                <Route path="/criarCobranca" exact component={CreateCharge} />
                            </ProtectedRoutes>
                        </ClientsProvider>
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