import React, { useContext, useEffect } from "react";
import { useLocation } from 'react-router';
import { useHistory } from "react-router-dom";

import './styles.css';
import ChargesContext from "../../contexts/charges/ChargesContexts";
import TokenContext from "../../contexts/token/TokenContext";

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

    
    const { charges, setCharges } = useContext(ChargesContext);
    const { token } = useContext(TokenContext);

    const listCharges = charges.map((charge) =>
        <ContainerCharge
            id={charge.id}
            client={charge.client}
            description={charge.description}
            value={charge.value}
            status={charge.status}
         />
    );

    useEffect(() => {
        async function GetCharges() {

            const response = await fetch('https://desafio04-backend.herokuapp.com/cobrancas', {
                headers: {
                    "Content-type": "application/json",
                    Authorization: token,
                },
            });

            const { charges } = await response.json();
            console.log(charges);

            if (response.ok) {
                return setCharges(charges);
            }

        }
        GetCharges();

    }, [token, setCharges]);

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
                    {listCharges}
                </div>
            </div>
        </div>
    )
}

export default Charges;