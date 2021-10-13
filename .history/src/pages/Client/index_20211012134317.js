/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { useLocation } from 'react-router';
import { useHistory } from "react-router-dom";

import './styles.css';
import ClientsContext from "../../contexts/clients/ClientsContext";
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

    const { clients, setClients } = useContext(ClientsContext);
    const { token } = useContext(TokenContext);



    console.log('hey',clients)

    useEffect(() => {
        async function GetClient() {

            const response = await fetch('https://desafio04-backend.herokuapp.com/clientes', {
                headers: {
                    "Content-type": "application/json",
                    mode: 'cors',
                    Authorization: token,
                },
            });

            const data = await response.json();
            if (response.ok) {
                return setClients(data.clients);
            }

        }
        GetClient();

    }, [token, setClients]);

    return (
        <div className="container-client flex-row">
            {Object.keys(clients).length &&
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
                            color={location.pathname === '/cobrancas' && '#374952'}
                            label='CONTRATAÇÕES'
                            url='/cobrancas'
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
                    <div className='container-home flex-column overflow-scroll'>
                        <ButtonProfile />

                        <button
                            className='btn-add-client mg-top-client'
                            onClick={() => history.push('/adicionarCliente')}>
                            Adicionar Cliente
                        </button>

                        <HeaderTable titles={['Cliente', 'Cobranças Feitas', 'Cobranças Recebidas', 'Status', '']} />
                      
                        { clients.map((client) =>
                        <div>
                            <ContainerStatus
                                id={client.id}
                                name={client.name}
                                email={client.email}
                                phone={client.phone}
                                cpf={client.cpf}
                                totalcharges={client.totalCharges}
                                totalchargespaid={client.totalChargesPaid}
                                status={client.status}
                            />
                        </div>
        
                        )}
                    </div>
                </div>
            }
        </div>
    );
}

export default Client;