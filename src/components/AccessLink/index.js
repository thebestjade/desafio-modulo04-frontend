import { Link } from 'react-router-dom';
import './styles.css'

function AccessLink() {
    return(
        <div className='mt-lg'>
            <span>Não tem uma conta? </span>
            <Link className='link' to='/cadastre'>Cadastre-se</Link>
        </div>
    );
}

export default AccessLink;