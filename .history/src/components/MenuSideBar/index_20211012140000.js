import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import Logo from '../../assets/logo-white.svg';
import IconMoney from "../../assets/IconMoney";
import IconUser from "../../assets/IconUser";
import IconHome from "../../assets/IconHome";


import './styles.css'

function MenuSideBar({ label, icon, url, color }) {
    const history = useHistory();

    return (
        <div>
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
    </div>
    );
           
}

export default MenuSideBar;