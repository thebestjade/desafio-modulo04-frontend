/* eslint-disable react-hooks/exhaustive-deps */
import { Alert } from "@material-ui/lab";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import ChargesContext from "../../contexts/charge/ChargesContexts";
import ClientsContext from "../../contexts/client/ClientsContext";
import TokenContext from "../../contexts/token/TokenContext";
import './styles.css'


function DetailClient({ id, name, email, phone, totalCharges, totalChargesPaid, status, cpf }) {
    const history = useHistory();
    const { token } = useContext(TokenContext);
    const { clients, setClients } = useContext(ClientsContext);
    const { charges, setCharges } = useContext(ChargesContext);
    const { clienteId } = useParams();
    const [reqError, setReqError] = useState("");



    useEffect(() => {
        async function getClient() {

            const response = await fetch(`https://desafio04-backend.herokuapp.com/clientes/${clienteId}`, {
                headers: {
                    "Content-type": "application/json",
                    mode: 'cors',
                    Authorization: token,
                },
            });

            const { client, clientCharges } = await response.json();
            if (response.ok) {
                console.log({ client, clientCharges })
                setClients(client);
                return setCharges(clientCharges);
            }
            setReqError(client, clientCharges);


        }
        getClient();

    }, [token, setClients, setCharges]);

    const closeAlert = () => {
        setReqError("");
    };

    return (
        <div className='container-form flex-row'>
            <div className='container-form flex-column modal-form'>
                <form className='form width-lg label-form'>
                    <a className='align-self-end' href='#close'
                        onClick={() => history.goBack()}
                    >x</a>
                    <ul className='list flex-row items-center'>
                        <li>
                            nome {clients.name}
                        </li>
                        <li>
                            cpf {clients.cpf}
                        </li>
                        <li>
                            email {clients.email}
                        </li>
                        <li>
                            telefone {clients.phone}
                        </li>
                        <li>
                            cep {clients.cep}
                        </li>
                        <li>
                            bairro {clients.district}
                        </li>
                        <li>
                            cidade {clients.city}
                        </li>
                        <li>
                            logradouro {clients.public_place}
                        </li>
                        <li>
                            complemento {clients.complement}
                        </li>
                        <li>
                            referencia {clients.reference}
                        </li>
                        <li>
                            uf {clients.uf}
                        </li>
                        <li>
                            {charges.map(({ id, descripition, due_date, value, status }) => (
                                <li>
                                    {id}
                                    {descripition}
                                    {due_date}
                                    {value}
                                    {status}
                                </li>
                            ))}
                        </li>
                    </ul>
                    {reqError && (<Alert severity="error" onClose={closeAlert}>
                        {reqError}
                    </Alert>)}
                </form>
            </div>
        </div >
    );
}

export default DetailClient;