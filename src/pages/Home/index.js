import Profile from '../../assets/img-profile.svg';
import ContainerHome from '../../components/ContainerHome';
import MenuSideBar from '../../components/MenuSideBar';
import Logo from '../../assets/logo-white.svg';

import './styles.css';

function Home() {
  return (
    <div className="container-home flex-row">
      <div className='side-bar' >
        <img className='logo-form pt-md' src={Logo} alt="Logo da Cubos Academy" />
        <MenuSideBar  label='HOME' icon='faHome' />
        <MenuSideBar  label='CONTRATAÇÕES' />
        <MenuSideBar  label='CLIENTES' />
      </div>
      <div className='body container-home'>
        <img className='img-profile' src={Profile} alt="Imagem de perfil" />
        <div className='flex-row content-center grid-gap-mid container-margin-lg'>
          <ContainerHome label='Clientes' />
          <ContainerHome label='Cobranças' />
        </div>
      </div>
    </div>
  );
}

export default Home;