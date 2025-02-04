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
            <form className='flex-column label-form'>
                <a className='align-self-end btn-out' href='#close'
                    onClick={() => history.goBack()}
                >x</a>
                <div className='container-detail-modal label-form'>
                    <div>
                        <div className='client-content-header pd-bt-mid'>
                            <h2 className='detail-name'>
                                {clients.name}
                            </h2>
                            <div>
                                {clients.cpf}
                            </div>
                        </div>
                        <div>
                            <ul className='client-content-body pd-bt-mid flex-row items-center'>
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
                        <div className='pd-bt-mid'>
                            <ul className='client-content flex-row pd-zero'>
                                <li>
                                    <h4 className='label-content-detail'>CEP</h4>
                                    <div className='detail-width-md flex-row'>
                                        {clients.cep}
                                    </div>
                                </li>
                                <li>
                                    <h4 className='label-content-detail'>BAIRRO</h4>
                                    <div className='detail-width-md flex-row'>
                                        {clients.district}
                                    </div>
                                </li>
                                <li>
                                    <h4 className='label-content-detail'>CIDADE</h4>
                                    <div className='detail-width-md flex-row'>
                                        {clients.city}
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className='pd-bt-mid'>
                            <ul className='client-content-body flex-row pd-zero'>
                                <li>
                                    <h4 className='label-content-detail'>LOGRADOURO</h4>
                                    <div className='detail-width-md flex-row'>
                                        {clients.public_place}
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className='pd-bt-mid'>
                            <ul className='client-content flex-row pd-zero'>
                                <li>
                                    <h4 className='label-content-detail'>COMPLEMENTO</h4>
                                    <div className='detail-width-md flex-row'>
                                        {clients.complement}
                                    </div>
                                </li>
                                <li>
                                    <h4 className='label-content-detail'>ESTADO</h4>
                                    <div className='detail-width-lg flex-row'>
                                        {clients.uf}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='charges-content'>
                        <li className='pd-right-sm detail-width-lg'>
                            {charges.map(({ id, description, due_date, value, status }) => (
                                <div className='container-charges-detail flex-row'>
                                    <div className='flex-column widht-container'>
                                        <span className='flex-row items-center'>
                                            <h4 className='pd-right-sm'>
                                                #{id}
                                            </h4>
                                            {description}
                                        </span>
                                        <span className='detail-date '>
                                            {Intl.DateTimeFormat('pt-br', { year: 'numeric', month: 'numeric', day: 'numeric' }).format(new Date(due_date))}
                                        </span>
                                    </div>
                                    <div className='flex-column align-items-end'>
                                        <h5 className='detail-value'>
                                            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}
                                        </h5>
                                        <span className='status'
                                            style={status.toUpperCase() === 'PAGO' ? { color: '#4EC06E' } : status.toUpperCase() === 'PENDENTE' ? { color: '#5197B5' } : { color: '#FF4D4D' }}
                                        >
                                            {status}
                                        </span>
                                    </div>
                                </div>
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