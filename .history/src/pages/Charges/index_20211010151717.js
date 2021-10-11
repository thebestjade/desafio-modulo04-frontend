import { useLocation } from 'react-router';
import { useHistory } from "react-router-dom";

import './styles.css';
import Logo from '../../assets/logo-white.svg';
import MenuSideBar from '../../components/MenuSideBar';
import ButtonProfile from '../../components/ButtonProfile';
import IconHome from "../../assets/IconHome";
import IconMoney from "../../assets/IconMoney";
import IconUser from "../../assets/IconUser";
import HeaderTable from '../../components/HeaderTable';
import ContainerCharge from '../../components/ContainerCharge';

function Charges() {
    const location = useLocation();
    const history = useHistory();

    const { charge, setCharge } = useContext(UserContext);
    const { token } = useContext(TokenContext);

    useEffect(() => {
        async function GetClient() {

            const response = await fetch('https://desafio04-backend.herokuapp.com/cobrancas', {
                headers: {
                    "Content-type": "application/json",
                    Authorization: token,
                },
            });
            const data = await response.json();
            console.log(data);
            console.log(data);


        }
        GetClient();
    }, [token, setUser]);


    return (
        <div className="container-client flex-row">
            <div className='side-bar-client text-center' >
                <img className='logo-form pt-md' src={Logo} alt="Logo da Cubos Academy" />

                <MenuSideBar
                    label='HOME'
                    url={'/'}
                    icon={<IconHome />}
                    color={location.pathname === '/' && '#374952'}
                />

                <MenuSideBar
                    color={location.pathname === '/contratacoes' && '#374952'}
                    label='CONTRATAÇÕES'
                    url='/contratacoes'
                    icon={<IconMoney />}
                />

                <MenuSideBar
                    color={location.pathname === '/clientes' && '#374952'}
                    label='CLIENTES'
                    url='/clientes'
                    icon={<IconUser />}
                />

                <button
                    className='btn-enable-charges items-center'
                    onClick={() => history.push('/criarCobranca')}
                >Criar cobrança</button>

            </div>
            <div className=' container-home flex-column'>
                <ButtonProfile />

                <div className='container-charge '>
                    <HeaderTable titles={['ID', 'Cliente', 'Descrição', 'Valor', 'Status', 'Vencimento']} />
                    {/* TODO - Lista de container com map pegando do fetch */}
                    <ContainerCharge />
                </div>
            </div>
        </div>
    )
}

export default Charges;