/* eslint-disable no-unused-vars */
import { useHistory } from "react-router-dom";

import IconEdit from '../../assets/IconEdit';
import IconMenssage from '../../assets/IconMessage';
import IconPhone from '../../assets/IconPhone';
import './styles.css'


function ContainerStatus({ titles, status }) {
    const history = useHistory();

    const listItems = titles.map((title) =>
        <li className='li' key={title.toString()}>
            {title}
        </li>
    );

    return (
        <div className='container-status flex-row'>
            <ul className='list flex-row items-center'>
                <div className='flex-column first-column'>
                    <h5 className='pd-bt-mid'>
                        Nome e Sobrenome <br /> da Cliente
                    </h5>
                    <span className='pd-bt-sm'>
                        <IconMenssage />
                        email@gmail.com
                    </span>
                    <span>
                        <IconPhone />
                        (DDD) 00000-0000
                    </span>
                </div>
                {listItems}
                <span className='status'>
                    {status}
                </span>
                <button
              
                 onClick={() => history.push('/editarCliente')}
                >
                    {<IconEdit />}
                </button>
            </ul>
        </div>
    );
}

export default ContainerStatus;