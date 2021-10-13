/* eslint-disable no-restricted-globals */
import { useLocation } from 'react-router';
import { useHistory } from "react-router-dom";

import ContainerHome from '../../components/ContainerHome';
import MenuSideBar from '../../components/MenuSideBar';
import Logo from '../../assets/logo-white.svg';
import ButtonProfile from '../../components/ButtonProfile';
import IconMoney from '../../assets/IconMoney';
import IconHome from '../../assets/IconHome';
import IconUser from '../../assets/IconUser';

import './styles.css';
import SideBar from '../../components/SideBar';

function Home() {
  const location = useLocation();
  const history = useHistory();


  return (
    <div className="container-home flex-row">
      <SideBar />
      
      <div className='body container-home'>
        <ButtonProfile />
        <div className='containers content-center grid-gap-mid container-margin-lg'>
          <div className='flex-column'>
            <div className='flex-row items-center content-center gap-sm container-header'>
              {<IconUser />}
              <h5>Clientes</h5>
            </div>
            <div className='body container-body flex-column items-center gap-sm'>
              <ContainerHome label='Em dia' cor='#4EC06E' />
              <ContainerHome label='Inadimplentes' cor='#FF4D4D' />
            </div>
          </div>
          <div className='flex-column'>
            <div className='flex-row items-center content-center gap-sm container-header'>
              {<IconMoney />}
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