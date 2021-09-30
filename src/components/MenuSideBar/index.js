import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles.css'

function MenuSideBar({ label, icon, url }) {
    return (
        <div>
            <button className='btn-enable-secundary alignment-button' >
                <FontAwesomeIcon
                    className='mr-md'
                    icon={icon}
                    size='2x'
                />
                <Link className='btn-enable-secundary alignment-button' to={url}>{label}</Link>
            </button>
        </div>
    );
}

export default MenuSideBar;