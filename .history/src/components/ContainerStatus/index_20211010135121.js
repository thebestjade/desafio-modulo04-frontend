/* eslint-disable no-unused-vars */
import { useHistory } from "react-router-dom";

import IconEdit from '../../assets/IconEdit';
import IconMenssage from '../../assets/IconMessage';
import IconPhone from '../../assets/IconPhone';
import './styles.css'


function ContainerStatus({ name, email, phone, titles, status }) {
    const history = useHistory();

    const listItems = titles.map((title) =>
        <li className='li' key={title.toString()}>
            {title}
        </li>
    );

    console.log(email);
    console.log(phone);

    return (
        <div className='container-status flex-row'>
            <ul className='list flex-row items-center'>
                <div className='flex-column first-column'>
                    <h5 className='pd-bt-mid'>
                       {name}
                    </h5>
                    <span className='pd-bt-sm'>
                        <IconMenssage />
                        {{email} === 'null' ? {phone} :  '0000-000'}
                    </span>
                    <span>
                        <IconPhone />
                        {{phone} && '0000-000'}
                    </span>
                </div>
                {listItems}
                <span className='status'>
                    {status}
                </span>
                <button
                 className='button-edit-client'
                 onClick={() => history.push('/editarCliente')}
                >
                    {<IconEdit />}
                </button>
            </ul>
        </div>
    );
}

export default ContainerStatus;