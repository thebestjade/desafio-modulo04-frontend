import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import Logo from '../../assets/logo-white.svg';
import IconMoney from "../../assets/IconMoney";
import IconUser from "../../assets/IconUser";
import IconHome from "../../assets/IconHome";


import './styles.css'

function SideBar({ label, icon, url, color }) {
    const history = useHistory();
    const location = useLocation();

   


    return (
        <div className="container-client flex-row">
            <div className='side-bar-client text-center' >
                <img className='logo-form pt-md' src={Logo} alt="Logo da Cubos Academy" />

             
                <button
                    className='btn-enable-charges items-center'
                    onClick={() => history.push('/criarCobranca')}
                >Criar cobrança</button>

            </div>
        </div>
    );
           
}

export default SideBar;