/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { useLocation } from 'react-router';
import { useHistory } from "react-router-dom";

import './styles.css';
import UserContext from "../../contexts/user/UserContext";
import TokenContext from "../../contexts/token/TokenContext";
import Logo from '../../assets/logo-white.svg';
import MenuSideBar from '../../components/MenuSideBar';
import ButtonProfile from '../../components/ButtonProfile';
import IconHome from "../../assets/IconHome";
import IconMoney from "../../assets/IconMoney";
import IconUser from "../../assets/IconUser";
import HeaderTable from '../../components/HeaderTable';
import ContainerStatus from '../../components/ContainerStatus';

function Client() {
    const location = useLocation();
    const history = useHistory();

    const { client, setClient } = useContext(UserContext);
    const { token } = useContext(TokenContext);

    useEffect(() => {
        async function GetClient() {

            const response = await fetch('https://desafio04-backend.herokuapp.com/clientes', {
                headers: {
                    "Content-type": "application/json",
                    Authorization: token,
                },
            });
            const { clients } = await response.json();
            console.log(clients[0].name);

            if (response.ok) {
                return setClient(clients);
            }  
    }
     GetClient();
     
}, [token, setClient]);


return (
    <div>
        {Object.keys(clien]).length &&
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
                <div className='container-home flex-column'>
                    <ButtonProfile />

                    <button
                        className='btn-add-client mg-top-client'
                        onClick={() => history.push('/adicionarCliente')}>
                        Adicionar Cliente
                    </button>

                    <HeaderTable titles={['Cliente', 'Cobranças Feitas', 'Cobranças Recebidas', 'Status', '']} />
                    {/* TODO - Lista de container com map pegando do fetch */}
                    <ContainerStatus
                        name={client}
                        email='email'
                        phone='telefone'
                        titles={['cobrancasFeitas', 'cobrancasRecebidas']}
                        status='em aberto' />
                </div>
            </div>
        }
    </div>
);
}
export default Client;
