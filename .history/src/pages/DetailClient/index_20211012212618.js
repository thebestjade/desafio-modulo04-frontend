/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

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

    return (
        <div className='container-status flex-row'>
            <ul className='list flex-row items-center'>
                <div className='flex-column first-column flex-basis-lg'>
                    <h5 className='pd-bt-mid'>
                        <a href={`/clientes/${id}`}>
                            {name}
                        </a>
                    </h5>
                    <span className='pd-bt-sm'>
                        <IconMenssage />
                        {email}
                    </span>
                    <span>
                        <IconPhone />
                        {phone}
                    </span>
                </div>
                <span className='totalCharges flex-basis-mid'>
                    {totalCharges}
                </span>
                <span className='totalChargesPaid flex-basis-mid'>
                    {totalChargesPaid}
                </span>
                <span className='status flex-basis-mid' style={status.toUpperCase() === 'EM_DIA' ? { color: '#4EC06E' } : { color: '#FF4D4D' }}>
                    {status.toUpperCase() === 'EM_DIA' ? 'EM DIA' : 'INADIMPLENTE'}
                </span>
                <button
                    className='button-edit-client'
                    onClick={() => history.push(`/editarCliente/${id}`)}
                >
                    {<IconEdit />}
                </button>
            </ul>
        </div>
    );
}

export default DetailClient;