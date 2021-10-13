/* eslint-disable no-unused-vars */
import { useHistory } from "react-router-dom";

import IconEdit from '../../assets/IconEdit';
import IconMenssage from '../../assets/IconMessage';
import IconPhone from '../../assets/IconPhone';
import './styles.css'


function ContainerStatus({ id, name, email, phone, totalcharges, totalchargespaid, status, cpf }) {
    const history = useHistory();

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
                    {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalcharges / 100)}
                </span>
                <span className='totalChargesPaid flex-basis-mid'>
                    {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalchargespaid / 100)}

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

export default ContainerStatus;