import { Link } from 'react-router-dom';

import './styles.css'

function MenuSideBar({ label, icon, url }) {
    return (
        <div>
            <button className='btn-enable-secundary alignment-button' >
                <Link className='btn-enable-secundary alignment-button' to={url}>{label}</Link>
            </button>
        </div>
    );
}

export default MenuSideBar;