/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import IconEdit from '../../assets/IconEdit';
import IconMenssage from '../../assets/IconMessage';
import IconPhone from '../../assets/IconPhone';
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

        }
        getClient();

    }, [token, setClients, setCharges]);

    console.log(charges)
    return (
        <div className='container-status flex-row'>
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
                    <ul>
                        {charges.map(({status}) => (
                            <li>
                                {id}
                            </li>
                                {descripition}
                                {due_date}
                                {value}
                                {status}
                        ))}
                    </ul>
                </li>
            </ul>
        </div>
    );
}

export default DetailClient;