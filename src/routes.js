import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import Home from './pages/Home';
import Cadastre from './pages/Cadastre';
import Login from './pages/Login';

function Routes() {
    return(
        <Router>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/cadastre' component={Cadastre} />
                <Route path='/login' component={Login} />
            </Switch>
        </Router>
    );
}

export default Routes;