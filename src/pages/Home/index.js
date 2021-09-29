import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

import Logo from '../../assets/logo-white.svg';
import Profile from '../../assets/img-profile.svg';
import ContainerHome from '../../components/ContainerHome';
import './styles.css';

function Home() {
  return (
    <div className="container-home flex-column">
      <div className='side-bar' >
        <img className='logo-form pt-md' src={Logo} alt="Logo da Cubos Academy" />
        <div>
          <button className='btn-enable-secundary alignment-button' > 
            <FontAwesomeIcon 
              className='mr-md'
              icon={faHome}
              size='2x'
            />
            HOME
          </button>
        </div>
      </div>
      <img className='img-profile' src={Profile} alt="Imagem de perfil" />
      {/* <ContainerHome label='Clientes' /> */}
    </div>
  );
}

export default Home;