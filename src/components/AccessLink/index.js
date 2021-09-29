import { Link } from 'react-router-dom';
import './styles.css'

function AccessLink({ text, label, url }) {
    return(
        <div className='mt-lg'>
            <span>{text}</span>
            <Link className='link' to={url}>{label}</Link>
        </div>
    );
}

export default AccessLink;