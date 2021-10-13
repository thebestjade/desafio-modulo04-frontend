/* eslint-disable react-hooks/exhaustive-deps */
import { Alert } from "@material-ui/lab";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import ChargesContext from "../../contexts/charge/ChargesContexts";
import ClientsContext from "../../contexts/client/ClientsContext";
import TokenContext from "../../contexts/token/TokenContext";
import IconPhone from '../../assets/IconPhone';
import IconMessage from '../../assets/IconMessage';
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
        <div className='container-form flex-column modal-form'>
            <form>
                <a className='align-self-end' href='#close'
                    onClick={() => history.goBack()}
                >x</a>
                <div className='container-detail-modal label-form'>
                    <div className=''>
                        <div className='client-content-header'>
                            <h2 className='detail-name'>
                                {clients.name}
                            </h2>
                            <div>
                                {clients.cpf}
                            </div>
                        </div>
                        <div>
                            <ul className='client-content-body  flex-row items-center'>
                                <li className='flex-row items-center'>
                                    <IconMessage />
                                    {clients.email}
                                </li>
                                <li className='list flex-row items-center'>
                                    <IconPhone />
                                    {clients.phone}
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul className='list flex-column label-content-detail'>
                                <li>
                                    <h4 className='label-content-detail'>CEP</h4>
                                    {clients.cep}
                                </li>
                                <li>
                                    {clients.district}
                                </li>
                                <li>
                                    {clients.city}
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul className='list flex-column items-center'>

                                <li>
                                    {clients.public_place}
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul className='list flex-column items-center'>
                                <li>
                                    {clients.complement}
                                </li>
                                <li>
                                    {clients.reference}
                                </li>
                                <li>
                                    {clients.uf}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
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
                    </div>
                </div>
                {reqError && (<Alert severity="error" onClose={closeAlert}>
                    {reqError}
                </Alert>)}
            </form>
        </div>
    );
}

export default DetailClient;