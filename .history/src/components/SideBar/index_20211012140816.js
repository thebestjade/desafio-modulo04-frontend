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

    const MenuSideBar = <div>
        <button
            style={{ backgroundColor: color }}
            className='btn-enable-secundary alignment-side-menu'
            onClick={() => history.push({ url })}
        >
            {icon}
            <Link
                style={{ backgroundColor: color }}
                className='btn-enable-secundary alignment-icon-menu'
                to={url}>{label}</Link>
        </button>
    </div>)


    return (
        <div className="container-client flex-row">
            <div className='side-bar-client text-center' >
                <img className='logo-form pt-md' src={Logo} alt="Logo da Cubos Academy" />

                <MenuSideBar
                    label='HOME'
                    url={'/'}
                    icon={<IconHome />}
                    color={location.pathname === '/' && '#374952'}
                />

                <MenuSideBar
                    color={location.pathname === '/cobrancas' && '#374952'}
                    label='CONTRATAÇÕES'
                    url='/cobrancas'
                    icon={<IconMoney />}
                />

                <MenuSideBar
                    color={location.pathname === '/clientes' && '#374952'}
                    label='CLIENTES'
                    url='/clientes'
                    icon={<IconUser />}
                />

                <button
                    className='btn-enable-charges items-center'
                    onClick={() => history.push('/criarCobranca')}
                >Criar cobrança</button>

            </div>
        </div>
    );
           
}

export default SideBar;