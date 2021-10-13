/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import IconEdit from '../../assets/IconEdit';
import IconMenssage from '../../assets/IconMessage';
import IconPhone from '../../assets/IconPhone';
import ClientsContext from "../../contexts/client/ClientsContext";
import TokenContext from "../../contexts/token/TokenContext";
import './styles.css'


function DetailClient({ id, name, email, phone, totalCharges, totalChargesPaid, status, cpf }) {
    const history = useHistory();
    const { token } = useContext(TokenContext);
    const { clients, setClients } = useContext(ClientsContext);
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
                return setClients([ client, clientCharges ]);
            }
            
        }
        getClient();
        
    }, [token, setClients]);
    
    console.log(clients)
    return (
        <div className='container-status flex-row'>
            <ul className='list flex-row items-center'>
                <li>
                    {clients.name}
                </li>
                <li>
                    {clients.cpf}
                </li>
                <li>
                    {clients.email}
                </li>
                <li>
                    {clients.cep}
                </li>
                <li>
                    {clients.phone}
                </li>   
                {/* <li>
                    {clientCharges.status}
                </li>            */}
            </ul>
        </div>
    );
}

export default DetailClient;