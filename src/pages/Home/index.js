/* eslint-disable no-restricted-globals */
import { useContext } from 'react';
import { useHistory } from "react-router-dom";
import ButtonProfile from '../../components/ButtonProfile';
import IconMoney from '../../assets/IconMoney';
import IconUser from '../../assets/IconUser';
import SideBar from '../../components/SideBar';
import ModalContext from '../../contexts/modal/ModalContext'
import ReportContext from '../../contexts/report/ReportContext';
import './styles.css';
import EditUser from '../EditUser';
import ContainerHome from './ContainerHome';

function Home() {
  const history = useHistory();
  const { isOpenUser } = useContext(ModalContext);
  const { setEntity, setStatus } = useContext(ReportContext);

  const handleSetPageClientsInfo = (pageName = '', filter = '') => {
    setEntity(pageName);
    setStatus(filter);
    history.push("/relatorios");
  }
  return (
    <div className="container-home flex-row">
      {isOpenUser && <EditUser/>}
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
              <ContainerHome label='Em dia' cor='#4EC06E' value='10' onClick={() => handleSetPageClientsInfo('clientes', 'em dia')}/>
              <ContainerHome label='Inadimplentes' cor='#FF4D4D' value='10' onClick={() => handleSetPageClientsInfo('clientes', 'inadimplente')}/>
            </div>
          </div>
          <div className='flex-column'>
            <div className='flex-row items-center content-center gap-sm container-header'>
              {<IconMoney />}
              <h5>Cobranças</h5>
            </div>
            <div className='body container-body flex-column items-center gap-sm'>
              <ContainerHome label='Previstas' cor='#5197B5' value='1' onClick={() => handleSetPageClientsInfo('cobrancas', 'pendente')}/>
              <ContainerHome label='Vencidas' cor='#FF4D4D' value='3'onClick={() => handleSetPageClientsInfo('cobrancas', 'vencido')}/>
              <ContainerHome label='Pagas' cor='#4EC06E' value='5'onClick={() => handleSetPageClientsInfo('cobrancas', 'pago')}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;