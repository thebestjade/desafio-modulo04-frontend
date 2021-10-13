/* eslint-disable no-restricted-globals */
import { useContext } from 'react';
import ButtonProfile from '../../components/ButtonProfile';
import IconMoney from '../../assets/IconMoney';
import IconUser from '../../assets/IconUser';
import SideBar from '../../components/SideBar';
import ModalContext from '../../contexts/modal/ModalContext'

import './styles.css';
import EditUser from '../EditUser';

function ContainerHome({ label, cor }) {
  return(
      <div style={{borderColor: cor, color: cor}} className='flex-row container-value content-around'>
          <h4>{label}</h4>
          <h4 className='number-zero '>0</h4>
      </div>
  );
}

function Home() {
  const { isOpen } = useContext(ModalContext);

  return (
    <div className="container-home flex-row">
      {/* {isOpen && <EditUser/>} */}
      <SideBar />
      <div className='body container-home overflow-scroll'>
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