/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import ClientsContext from "../../contexts/client/ClientsContext";
import TokenContext from "../../contexts/token/TokenContext";
import SideBar from '../../components/SideBar';
import ButtonProfile from '../../components/ButtonProfile';
import HeaderTable from '../../components/HeaderTable';
import ContainerClient from '../../components/ContainerClient';
import ModalContext from '../../contexts/modal/ModalContext'


import './styles.css';

function Client() {
    const history = useHistory();
    const { token } = useContext(TokenContext);
    const { clients, setClients } = useContext(ClientsContext);

    useEffect(() => {
        async function getClient() {

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
        getClient();

    }, [token, setClients]);

    const { isOpen } = useContext(ModalContext);

    return (
        <div className="container-client flex-row">
            {isOpen && <EditUser />}
            {Object.keys(clients).length &&
                <div className="container-client flex-row">
                    <SideBar />
                    <div className='container-home flex-column overflow-scroll'>
                        <ButtonProfile />

                        <button
                            className='btn-add-client mg-top-client'
                            onClick={() => history.push('/cadastrarCliente')}>
                            Adicionar Cliente
                        </button>

                        <HeaderTable titles={['Cliente', 'Cobranças Feitas', 'Cobranças Recebidas', 'Status', '']} />

                        {clients.map((client) =>
                            <div>
                                <ContainerClient
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