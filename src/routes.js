import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import Home from './pages/Home';
import Cadastre from './pages/Cadastre';
import Login from './pages/Login';
import Client from './pages/Client';


function Routes() {
    return(
        <Router>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/cadastro' component={Cadastre} />
                <Route path='/login' component={Login} />
                <Route path='/clientes' component={Client} />
            </Switch>
        </Router>
    );
}

export default Routes;