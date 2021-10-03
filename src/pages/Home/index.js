import ContainerHome from '../../components/ContainerHome';
import MenuSideBar from '../../components/MenuSideBar';
import Logo from '../../assets/logo-white.svg';
import ButtonProfile from '../../components/ButtonProfile';
import './styles.css';

function Home() {
  return (
    <div className="container-home flex-row">
      <div className='side-bar text-center' >
        <img className='logo-form pt-md' src={Logo} alt="Logo da Cubos Academy" />
        <MenuSideBar label='HOME'/>
        <MenuSideBar label='CONTRATAÇÕES' />
        <MenuSideBar label='CLIENTES' />
        <button className='btn-enable-primary items-center'>Criar cobrança</button>
      </div>
      <div className='body container-home'>
        <ButtonProfile />
        <div className='flex-row content-center grid-gap-mid container-margin-lg'>
          <div className='flex-column'>
            <div className='container-header'>
              <h5>Clientes</h5>
            </div>
            <div className='body container-body flex-column items-center gap-sm'>
              <ContainerHome label='Em dia' cor='#4EC06E' />
              <ContainerHome label='Inadimplentes' cor='#FF4D4D' />
            </div>
          </div>
          <div className='flex-column'>
            <div className='container-header'>
              <h5>Cobranças</h5>
            </div>
            <div className='body container-body flex-column items-center gap-sm'>
              <ContainerHome label='Previstas' cor='#5197B5' />
              <ContainerHome label='Vencidas' cor='#FF4D4D' />
              <ContainerHome label='Pagas' cor='#4EC06E' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;