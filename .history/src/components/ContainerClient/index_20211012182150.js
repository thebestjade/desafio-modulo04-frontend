/* eslint-disable no-unused-vars */
import { useHistory } from "react-router-dom";

import IconEdit from '../../assets/IconEdit';
import IconMenssage from '../../assets/IconMessage';
import IconPhone from '../../assets/IconPhone';
import './styles.css'


function ContainerStatus({ id, name, email, phone, totalCharges, totalChargesPaid, status, cpf }) {
    const history = useHistory();
    const cor = '#FFF'
    status.toUpperCase() === 'EM_DIA' ? cor='#4EC06E' : cor='#FF4D4D';
    
    return (
        <div className='container-status flex-row'>
            <ul className='list flex-row items-center'>
                <div className='flex-column first-column'>
                    <h5 className='pd-bt-mid'>
                       {name}
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
                <span className='totalCharges'>
                    {totalCharges}
                </span>
                <span className='totalChargesPaid'>
                    {totalChargesPaid}
                </span>
                <span className='status' style={{color: cor}}>
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