/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Alert } from '@material-ui/lab';
import ClientsContext from "../../contexts/client/ClientsContext";
import TokenContext from "../../contexts/token/TokenContext";
import SideBar from '../../components/SideBar';
import ButtonProfile from '../../components/ButtonProfile';
import HeaderTable from '../../components/HeaderTable';
import ContainerClient from '../../components/ContainerClient';
import ModalContext from '../../contexts/modal/ModalContext';
import EditUser from "../EditUser";


import './styles.css';
import { useState } from "react";

function Client() {
    const history = useHistory();
    const { token } = useContext(TokenContext);
    const { clients, setClients } = useContext(ClientsContext);
    const [reqError, setReqError] = useState("");
    const { isOpen } = useContext(ModalContext);

    useEffect(() => {
        async function getClient() {

            setReqError("");

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
            setReqError(data);

        }
        getClient();

    }, [token, setClients]);


    const closeAlert = () => {
        setReqError("");
        setReqSuccess("");
    };


    return (
        <div className="container-client flex-row">
            {isOpen && <EditUser />}
            <SideBar />
            <div className='container-home flex-column overflow-scroll'>

                <ButtonProfile />

                <button
                    className='btn-add-client mg-top-client'
                    onClick={() => history.push('/cadastrarCliente')}>
                    Adicionar Cliente
                </button>

                <HeaderTable titles={['Cliente', 'Cobranças Feitas', 'Cobranças Recebidas', 'Status', '']} />
                {!!Object.keys(clients).length &&
                    <div className="container-client flex-row">
                        <div className='container-home flex-column overflow-scroll'>

                            {clients.map((client) =>
                                <div>
                                    <ContainerClient
                                        id={client.id}
                                        name={client.name}
                                        email={client.email}
                                        phone={client.phone}
                                        cpf={client.cpf}
                                        totalcharges={client.totalcharges}
                                        totalchargespaid={client.totalchargespaid}
                                        status={client.status}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                }
                <div className='items-center'>
                    {reqError && (<Alert severity="error" onClose={closeAlert}>
                        {reqError}
                    </Alert>)}
                </div>
            </div>
        </div>
    );
}

export default Client;